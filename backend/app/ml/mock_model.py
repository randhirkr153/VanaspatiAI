import hashlib
from typing import Dict, Any
from PIL import Image
from app.ml.plant_model import PlantDiseaseModel
from app.ml.label_parser import parse_raw_label
from app.config import settings


class MockPlantDiseaseModel(PlantDiseaseModel):
    """
    Mock implementation of PlantDiseaseModel for development and offline testing.
    Uses image byte hashes to deterministically assign dynamic predictions per image.
    """

    MOCK_CLASSES = [
        ("Tomato___Late_blight", "Tomato", "Late Blight"),
        ("Tomato___Early_blight", "Tomato", "Early Blight"),
        ("Tomato___healthy", "Tomato", "Healthy"),
        ("Apple___Apple_scab", "Apple", "Apple Scab"),
        ("Apple___Black_rot", "Apple", "Black Rot"),
        ("Apple___healthy", "Apple", "Healthy"),
        ("Corn_(maize)___Common_rust_", "Corn (Maize)", "Common Rust"),
        ("Potato___Early_blight", "Potato", "Early Blight"),
        ("Potato___Late_blight", "Potato", "Late Blight"),
        ("Grape___Black_rot", "Grape", "Black Rot"),
        ("Peach___Bacterial_spot", "Peach", "Bacterial Spot"),
        ("Pepper,_bell___Bacterial_spot", "Pepper (Bell)", "Bacterial Spot"),
    ]

    def __init__(self):
        self._loaded = False
        self.model_id = "mock-plant-disease-v1"

    def load_model(self) -> None:
        self._loaded = True

    def preprocess(self, image: Image.Image) -> Any:
        return image

    def predict(self, image: Image.Image, top_k: int = 3) -> Dict[str, Any]:
        if not self._loaded:
            self.load_model()

        # Hash image bytes for dynamic selection per image file
        img_bytes = image.tobytes()
        img_hash = int(hashlib.md5(img_bytes).hexdigest(), 16)
        
        idx = img_hash % len(self.MOCK_CLASSES)
        primary_item = self.MOCK_CLASSES[idx]

        confidence = 94.2

        if confidence >= settings.CONFIDENCE_HIGH_THRESHOLD:
            conf_level = "High"
        elif confidence >= settings.CONFIDENCE_MODERATE_THRESHOLD:
            conf_level = "Moderate"
        else:
            conf_level = "Low"

        prediction = {
            "plant": primary_item[1],
            "disease": primary_item[2],
            "confidence": confidence,
            "confidence_level": conf_level,
            "raw_label": primary_item[0]
        }

        # Generate alternative predictions
        alternatives = []
        alt_indices = [(idx + 1) % len(self.MOCK_CLASSES), (idx + 2) % len(self.MOCK_CLASSES)]
        alt_confidences = [3.8, 2.0]

        for i, alt_idx in enumerate(alt_indices):
            alt_item = self.MOCK_CLASSES[alt_idx]
            parsed = parse_raw_label(alt_item[0])
            alternatives.append({
                "plant": parsed["plant"],
                "disease": parsed["disease"],
                "confidence": alt_confidences[i],
                "raw_label": alt_item[0]
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
            "classes_count": len(self.MOCK_CLASSES),
            "is_mock": True
        }
