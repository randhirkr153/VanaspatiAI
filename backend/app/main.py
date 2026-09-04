import logging
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config import settings
from app.database.database import init_db
from app.ml.mock_model import MockPlantDiseaseModel
from app.ml.huggingface_model import HuggingFacePlantDiseaseModel
from app.api import health, model_info, predict, chat, history

# Setup logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s"
)
logger = logging.getLogger("plant_ai.main")


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup phase
    logger.info("Initializing Plant AI backend services...")
    init_db()

    if settings.USE_MOCK_MODEL:
        logger.info("USE_MOCK_MODEL=true. Using MockPlantDiseaseModel.")
        model = MockPlantDiseaseModel()
        model.load_model()
    else:
        try:
            logger.info(f"Loading Hugging Face Vision model: {settings.HUGGINGFACE_MODEL_ID}")
            model = HuggingFacePlantDiseaseModel(
                model_id=settings.HUGGINGFACE_MODEL_ID,
                token=settings.HF_TOKEN
            )
            model.load_model()
        except Exception as e:
            logger.error(f"Failed to load Hugging Face model on startup: {e}")
            logger.info("Falling back to MockPlantDiseaseModel for development stability.")
            model = MockPlantDiseaseModel()
            model.load_model()

    app.state.model = model
    logger.info("Plant AI backend startup complete!")

    yield

    # Shutdown phase
    logger.info("Shutting down Plant AI backend services.")


app = FastAPI(
    title="🌱 Plant AI — AI Plant Disease Detection & Plant Care Assistant API",
    description="Production-style REST API for Hugging Face plant disease image classification and AI plant care assistant",
    version="1.0.0",
    lifespan=lifespan
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins_list or ["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API routers
app.include_router(health.router)
app.include_router(model_info.router)
app.include_router(predict.router)
app.include_router(chat.router)
app.include_router(history.router)


@app.get("/")
def root():
    return {
        "title": "🌱 Plant AI API",
        "version": "1.0.0",
        "docs_url": "/docs",
        "status": "running"
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
