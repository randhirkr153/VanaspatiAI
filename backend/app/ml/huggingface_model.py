import logging
from typing import Dict, Any, List
from PIL import Image
from app.ml.plant_model import PlantDiseaseModel
from app.ml.label_parser import parse_raw_label
from app.config import settings

logger = logging.getLogger("plant_ai.ml")


class HuggingFacePlantDiseaseModel(PlantDiseaseModel):
    """
    Production Hugging Face image classification model runner for plant disease detection.
    """

    def __init__(self, model_id: str = None, token: str = None):
        self.model_id = model_id or settings.HUGGINGFACE_MODEL_ID
        self.token = token or settings.HF_TOKEN
        self.classifier = None
        self._loaded = False
        self._labels: List[str] = []

    def load_model(self) -> None:
        if self._loaded and self.classifier is not None:
            return

        logger.info(f"Loading Hugging Face plant disease model: {self.model_id}")
        try:
            import torch
            from transformers import pipeline

            device = 0 if torch.cuda.is_available() else -1
            logger.info(f"Using device: {'GPU (cuda:0)' if device == 0 else 'CPU'}")

            pipeline_kwargs = {
                "task": "image-classification",
                "model": self.model_id,
                "device": device
            }
            if self.token:
                pipeline_kwargs["token"] = self.token

            self.classifier = pipeline(**pipeline_kwargs)
            self._loaded = True

            # Extract labels if available in model config
            if hasattr(self.classifier.model, "config") and hasattr(self.classifier.model.config, "id2label"):
                self._labels = list(self.classifier.model.config.id2label.values())

            logger.info(f"Successfully loaded model: {self.model_id} with {len(self._labels)} classes.")
        except Exception as e:
            logger.error(f"Failed to load Hugging Face model '{self.model_id}': {str(e)}")
            self._loaded = False
            raise e

    def preprocess(self, image: Image.Image) -> Image.Image:
        """Ensure image is in RGB format."""
        if image.mode != "RGB":
            return image.convert("RGB")
        return image

    def predict(self, image: Image.Image, top_k: int = 3) -> Dict[str, Any]:
        if not self._loaded or self.classifier is None:
            self.load_model()

        rgb_image = self.preprocess(image)

        # Run inference using HF pipeline
        raw_results = self.classifier(rgb_image, top_k=top_k)

        if not raw_results:
            raise ValueError("Model returned empty predictions")

        # Top prediction
        top_raw = raw_results[0]
        top_label = top_raw.get("label", "Unknown")
        top_score = float(top_raw.get("score", 0.0))
        top_confidence = round(top_score * 100.0, 1)

        parsed_top = parse_raw_label(top_label)

        if top_confidence >= settings.CONFIDENCE_HIGH_THRESHOLD:
            conf_level = "High"
        elif top_confidence >= settings.CONFIDENCE_MODERATE_THRESHOLD:
            conf_level = "Moderate"
        else:
            conf_level = "Low"

        prediction = {
            "plant": parsed_top["plant"],
            "disease": parsed_top["disease"],
            "confidence": top_confidence,
            "confidence_level": conf_level,
            "raw_label": top_label
        }

        # Alternatives
        alternatives = []
        for item in raw_results[1:top_k]:
            item_label = item.get("label", "Unknown")
            item_score = float(item.get("score", 0.0))
            parsed_item = parse_raw_label(item_label)

            alternatives.append({
                "plant": parsed_item["plant"],
                "disease": parsed_item["disease"],
                "confidence": round(item_score * 100.0, 1),
                "raw_label": item_label
            })

        return {
            "prediction": prediction,
            "alternatives": alternatives
        }

    def is_loaded(self) -> bool:
        return self._loaded

    def get_info(self) -> Dict[str, Any]:
        return {
            "model_id": self.model_id,
            "model_loaded": self._loaded,
            "classes_count": len(self._labels),
            "is_mock": False
        }
