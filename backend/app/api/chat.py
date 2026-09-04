from fastapi import APIRouter, HTTPException
from app.schemas.chat import ChatRequest, ChatResponse
from app.services.chat_service import get_chat_provider

router = APIRouter(prefix="/api/v1", tags=["Chat"])


@router.post("/chat", response_model=ChatResponse)
def plant_assistant_chat(request: ChatRequest):
    if not request.message or not request.message.strip():
        raise HTTPException(status_code=400, detail="Message cannot be empty.")

    provider = get_chat_provider()
    try:
        reply = provider.generate_response(request.message, request.context)
        context_desc = f"{request.context.plant} ({request.context.disease})" if request.context and request.context.plant else None

        return ChatResponse(
            success=True,
            response=reply,
            context_used=context_desc
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to generate assistant response: {str(e)}")
