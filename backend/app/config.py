import os
from typing import List
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    HUGGINGFACE_MODEL_ID: str = "gianlab/swin-tiny-patch4-window7-224-finetuned-plantdisease"
    HF_TOKEN: str = ""
    OPENAI_API_KEY: str = ""
    OPENAI_BASE_URL: str = "https://api.openai.com/v1"
    DATABASE_URL: str = "sqlite:///./plant_ai.db"
    USE_MOCK_MODEL: bool = False
    CORS_ORIGINS: str = "http://localhost:5173,http://127.0.0.1:5173,http://localhost:3000"

    # Confidence Thresholds
    CONFIDENCE_HIGH_THRESHOLD: float = 80.0
    CONFIDENCE_MODERATE_THRESHOLD: float = 60.0

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore"
    )

    @property
    def cors_origins_list(self) -> List[str]:
        return [origin.strip() for origin in self.CORS_ORIGINS.split(",") if origin.strip()]


settings = Settings()
