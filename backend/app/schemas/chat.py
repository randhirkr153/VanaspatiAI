from typing import Optional, List
from pydantic import BaseModel


class ChatContext(BaseModel):
    plant: Optional[str] = None
    disease: Optional[str] = None
    confidence: Optional[float] = None
    symptoms: Optional[List[str]] = None


class ChatRequest(BaseModel):
    message: str
    context: Optional[ChatContext] = None
    session_id: Optional[str] = None


class ChatResponse(BaseModel):
    success: bool
    response: str
    context_used: Optional[str] = None
