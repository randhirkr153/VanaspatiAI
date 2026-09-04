from fastapi import APIRouter, Request

router = APIRouter(prefix="/api/v1", tags=["Health"])


@router.get("/health")
def health_check(request: Request):
    model = getattr(request.app.state, "model", None)
    model_loaded = model.is_loaded() if model else False

    return {
        "status": "healthy",
        "model_loaded": model_loaded
    }
