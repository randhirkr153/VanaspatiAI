from fastapi import APIRouter, Request

router = APIRouter(prefix="/api/v1", tags=["Model"])


@router.get("/model-info")
def model_info(request: Request):
    model = getattr(request.app.state, "model", None)
    if not model:
        return {
            "model_id": "Unknown",
            "model_loaded": False,
            "classes_count": 0,
            "is_mock": False
        }

    info = model.get_info()
    return info
