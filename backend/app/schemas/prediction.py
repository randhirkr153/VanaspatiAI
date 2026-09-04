from typing import List, Optional
from pydantic import BaseModel, Field


class AlternativePrediction(BaseModel):
    plant: str
    disease: str
    confidence: float
    raw_label: str


class PredictionResult(BaseModel):
    plant: str
    disease: str
    confidence: float
    confidence_level: str = Field(..., description="High, Moderate, or Low")
    raw_label: str


class DiseaseReport(BaseModel):
    description: str
    symptoms: List[str]
    management: List[str]
    prevention: List[str]
    severity: str = "Moderate"
    disclaimer: str = (
        "AI-generated plant analysis may be incorrect. For valuable crops or serious outbreaks, "
        "consider consulting a qualified agricultural professional."
    )


class PredictResponse(BaseModel):
    success: bool
    prediction: PredictionResult
    alternatives: List[AlternativePrediction]
    report: DiseaseReport
    image_url: Optional[str] = None
    warning: Optional[str] = None
