import io
import os
import uuid
import logging
from typing import Optional
from fastapi import APIRouter, UploadFile, File, HTTPException, Depends, Request, Form
from sqlalchemy.orm import Session
from PIL import Image

from app.database.database import get_db
from app.models.analysis import AnalysisHistory
from app.services.disease_service import get_disease_report
from app.schemas.prediction import PredictResponse, PredictionResult, AlternativePrediction, DiseaseReport
from app.config import settings

router = APIRouter(prefix="/api/v1", tags=["Prediction"])
logger = logging.getLogger("plant_ai.predict")

ALLOWED_EXTENSIONS = {"jpg", "jpeg", "png", "webp"}
MAX_FILE_SIZE = 5 * 1024 * 1024  # 5 MB


@router.post("/predict", response_model=PredictResponse)
async def predict_plant_disease(
    file: UploadFile = File(...),
    session_id: Optional[str] = Form(None),
    request: Request = None,
    db: Session = Depends(get_db)
):
    # Validate filename & extension
    filename = file.filename or "uploaded_leaf.jpg"
    ext = filename.split(".")[-1].lower() if "." in filename else ""
    if ext not in ALLOWED_EXTENSIONS:
        raise HTTPException(
            status_code=400,
            detail=f"Unsupported file format '{ext}'. Allowed formats: JPG, JPEG, PNG, WEBP."
        )

    # Read bytes and validate file size
    contents = await file.read()
    if len(contents) > MAX_FILE_SIZE:
        raise HTTPException(
            status_code=400,
            detail="File size exceeds maximum allowed limit of 5MB."
        )

    if len(contents) == 0:
        raise HTTPException(
            status_code=400,
            detail="Uploaded file is empty."
        )

    # Validate image using Pillow
    try:
        image = Image.open(io.BytesIO(contents))
        image.verify()
        # Re-open after verify()
        image = Image.open(io.BytesIO(contents))
    except Exception as e:
        logger.error(f"Corrupted image upload: {e}")
        raise HTTPException(
            status_code=400,
            detail="The uploaded file is not a valid or readable image. Please upload a clear leaf photo."
        )

    # Get ML model from app state
    model = getattr(request.app.state, "model", None)
    if not model or not model.is_loaded():
        raise HTTPException(
            status_code=503,
            detail="ML plant disease model is currently loading or unavailable. Please try again shortly."
        )

    # Perform inference
    try:
        ml_result = model.predict(image, top_k=3)
    except Exception as e:
        logger.error(f"Inference error: {e}")
        raise HTTPException(
            status_code=500,
            detail=f"An error occurred during plant image analysis: {str(e)}"
        )

    pred_data = ml_result["prediction"]
    alt_data = ml_result.get("alternatives", [])

    plant = pred_data["plant"]
    disease = pred_data["disease"]
    confidence = pred_data["confidence"]
    confidence_level = pred_data["confidence_level"]
    raw_label = pred_data["raw_label"]

    # Warning for low confidence
    warning_msg = None
    if confidence < settings.CONFIDENCE_MODERATE_THRESHOLD:
        warning_msg = (
            "The model is uncertain about this prediction. "
            "Try uploading a clearer, well-lit image of the leaf or consult a plant-care professional."
        )

    # Fetch enriched disease report
    report_dict = get_disease_report(plant, disease)
    report_obj = DiseaseReport(**report_dict)

    # Generate safe filename for storage if needed
    saved_filename = f"{uuid.uuid4().hex[:12]}_{filename}"

    # Save to history database
    try:
        history_entry = AnalysisHistory(
            session_id=session_id or str(uuid.uuid4()),
            image_filename=saved_filename,
            plant=plant,
            disease=disease,
            confidence=confidence,
            confidence_level=confidence_level,
            model_id=model.get_info().get("model_id", settings.HUGGINGFACE_MODEL_ID)
        )
        db.add(history_entry)
        db.commit()
        db.refresh(history_entry)
    except Exception as e:
        logger.error(f"Failed to save analysis to history DB: {e}")
        db.rollback()

    prediction_obj = PredictionResult(
        plant=plant,
        disease=disease,
        confidence=confidence,
        confidence_level=confidence_level,
        raw_label=raw_label
    )

    alternatives_objs = [
        AlternativePrediction(
            plant=item["plant"],
            disease=item["disease"],
            confidence=item["confidence"],
            raw_label=item["raw_label"]
        )
        for item in alt_data
    ]

    return PredictResponse(
        success=True,
        prediction=prediction_obj,
        alternatives=alternatives_objs,
        report=report_obj,
        warning=warning_msg
    )
