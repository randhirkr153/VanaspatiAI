import datetime
from sqlalchemy import Column, Integer, String, Float, DateTime, Text
from app.database.database import Base


class AnalysisHistory(Base):
    __tablename__ = "analysis_history"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    session_id = Column(String(100), index=True, nullable=True)
    image_filename = Column(String(255), nullable=True)
    plant = Column(String(100), nullable=False, index=True)
    disease = Column(String(150), nullable=False, index=True)
    confidence = Column(Float, nullable=False)
    confidence_level = Column(String(50), nullable=False)
    model_id = Column(String(150), nullable=False)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    def to_dict(self):
        return {
            "id": self.id,
            "session_id": self.session_id,
            "image_filename": self.image_filename,
            "plant": self.plant,
            "disease": self.disease,
            "confidence": self.confidence,
            "confidence_level": self.confidence_level,
            "model_id": self.model_id,
            "created_at": self.created_at.isoformat() if self.created_at else None,
        }
