from abc import ABC, abstractmethod
from typing import Dict, Any, List
from PIL import Image


class PlantDiseaseModel(ABC):
    """
    Abstract base class interface for plant disease classification models.
    """

    @abstractmethod
    def load_model(self) -> None:
        """Loads model weights and processor into memory."""
        pass

    @abstractmethod
    def preprocess(self, image: Image.Image) -> Any:
        """Preprocesses PIL image for inference."""
        pass

    @abstractmethod
    def predict(self, image: Image.Image, top_k: int = 3) -> Dict[str, Any]:
        """
        Runs inference on PIL image and returns normalized predictions.
        
        Returns dictionary structure:
        {
            "prediction": {
                "plant": "Tomato",
                "disease": "Late Blight",
                "confidence": 92.4,
                "confidence_level": "High",
                "raw_label": "Tomato___Late_blight"
            },
            "alternatives": [
                ...
            ]
        }
        """
        pass

    @abstractmethod
    def is_loaded(self) -> bool:
        """Returns whether model is currently loaded in memory."""
        pass

    @abstractmethod
    def get_info(self) -> Dict[str, Any]:
        """Returns safe metadata about the model."""
        pass
