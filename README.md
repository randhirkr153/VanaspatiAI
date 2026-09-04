# 🌱 Plant AI — AI Plant Disease Detection & Plant Care Assistant

[![Python Version](https://img.shields.io/badge/python-3.10%2B-brightgreen.svg)](https://www.python.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.110.0-009688.svg)](https://fastapi.tiangolo.com/)
[![React](https://img.shields.io/badge/React-18-blue.svg)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.2-blue.svg)](https://www.typescriptlang.org/)
[![HuggingFace Transformers](https://img.shields.io/badge/Transformers-Vision%20Pipeline-yellow.svg)](https://huggingface.co/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38BDF8.svg)](https://tailwindcss.com/)

**Plant AI** is a production-style, full-stack AI SaaS web application for instant plant disease classification and interactive plant care assistance. Built with **React + TypeScript + Vite + Tailwind CSS** on the frontend, **FastAPI + PyTorch + Hugging Face Transformers** on the backend, **SQLite / PostgreSQL (SQLAlchemy)** for analysis history persistence, and a contextual **AI Plant Assistant** chatbot.

---

## 🏗️ Architecture Overview

```
                USER
                  │
                  ▼
          React + TypeScript (Vite + Tailwind CSS + Framer Motion)
                  │
                  ▼
              FastAPI (REST API + Uvicorn)
                  │
        ┌─────────┴──────────┐
        │                    │
        ▼                    ▼
 Hugging Face Model     Disease Knowledge
 (Loaded once on startup) Service (Symptoms, Care, Prevention)
        │                    │
        └─────────┬──────────┘
                  │
                  ▼
          Analysis Report (Top 3 predictions, Confidence Score)
                  │
          ┌───────┴───────┐
          ▼               ▼
   Database (SQLite)     AI Plant Assistant (Contextual Chatbot)
                          │
                          ▼
                     LLM Provider (OpenAI / Expert Bot Fallback)
```

---

## ✨ Features

- 🍃 **Leaf Image Classification**: Upload a leaf photograph (JPG, PNG, WEBP, up to 5MB) for instant AI inference.
- ⚡ **Single Startup Model Loading**: Loads Hugging Face vision models once during FastAPI startup for fast prediction responses without reloading weights per request.
- 🔍 **Structured Label Parsing**: Converts raw model output labels like `Tomato___Late_blight` into clean structured fields (`plant`: Tomato, `disease`: Late Blight).
- 📊 **Model Confidence vs Accuracy**: Clear visualization of prediction confidence scores (%) with threshold badges (High &ge;80%, Moderate 60-79%, Low &lt;60%) and uncertainty warnings.
- 🌿 **Disease Knowledge Enrichment**: Provides symptoms, organic treatment plans, preventative measures, and severity assessments for 38+ plant classes.
- 🤖 **Contextual AI Plant Assistant**: Floating chatbot equipped with LLM provider abstraction. Reads the current leaf analysis context to answer follow-up questions.
- 📜 **Analysis History**: Persists previous analyses with search, plant filters, and detailed report inspection.
- ⚙️ **Developer Model Evaluation Page**: Dedicated `/model` page displaying active Hugging Face model details, loaded status, and benchmark accuracy metrics.

---

## 🛠️ Technology Stack

### Frontend
- **Framework**: React 18 + Vite
- **Language**: TypeScript
- **Styling**: Tailwind CSS (Custom Nature/Forest palette)
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **HTTP Client**: Axios

### Backend
- **Framework**: FastAPI + Uvicorn
- **Language**: Python 3.10+
- **Machine Learning**: Hugging Face Transformers, PyTorch, torchvision, Pillow
- **Database / ORM**: SQLAlchemy (SQLite in Dev, PostgreSQL compatible)
- **Validation**: Pydantic v2 + Pydantic-Settings

---

## 📁 Project Structure

```
PlantAi/
├── backend/
│   ├── app/
│   │   ├── api/             # REST Endpoints (predict, chat, history, health, model-info)
│   │   ├── database/        # Database setup and SQLAlchemy session handling
│   │   ├── ml/              # ML abstraction (PlantDiseaseModel, HuggingFace, Mock, LabelParser)
│   │   ├── models/          # SQLAlchemy AnalysisHistory DB models
│   │   ├── schemas/         # Pydantic request & response schemas
│   │   ├── services/        # Disease Knowledge Base & LLM Chat Services
│   │   ├── config.py        # Environment settings configuration
│   │   └── main.py          # FastAPI application entrypoint with lifespan startup
│   ├── requirements.txt
│   └── .env.example
├── frontend/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/      # Navbar, UploadCard, ImagePreview, AnalysisResult, Chatbot, etc.
│   │   ├── pages/           # Home, Detect, History, About, ModelInfo
│   │   ├── services/        # Axios API client wrapper
│   │   ├── types/           # TypeScript interfaces for predictions and chat
│   │   ├── App.tsx          # Router setup and global chatbot state
│   │   ├── main.tsx
│   │   └── index.css        # Tailwind directives and custom animations
│   ├── package.json
│   ├── vite.config.ts
│   ├── tailwind.config.js
│   └── .env.example
├── .env.example
└── README.md
```

---

## 🚀 Quick Start & Installation

### 1. Prerequisites
- **Python**: 3.10 or higher
- **Node.js**: v18 or higher (with npm)

### 2. Backend Setup
```bash
# Navigate to backend directory
cd backend

# Create Python virtual environment
python -m venv venv

# Activate virtual environment
# Windows (PowerShell):
.\venv\Scripts\Activate.ps1
# Linux/macOS:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Copy environment variables file
cp .env.example .env

# Run FastAPI server with Uvicorn
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```
FastAPI Swagger documentation will be available at [http://localhost:8000/docs](http://localhost:8000/docs).

### 3. Frontend Setup
```bash
# Open a new terminal and navigate to frontend directory
cd frontend

# Install npm dependencies
npm install

# Copy environment variables file
cp .env.example .env

# Start Vite development server
npm run dev
```
The React web application will be accessible at [http://localhost:5173](http://localhost:5173).

---

## ⚙️ Environment Variables

### Backend Environment File (`backend/.env`)
```env
# Hugging Face Vision Model Identifier
HUGGINGFACE_MODEL_ID=linkanjarad/mobilenet_v2_1.0_224-plant-disease-identification

# Optional Hugging Face Token (required only for private models)
HF_TOKEN=

# Optional OpenAI API Key for Chatbot (if left empty, built-in botanical expert bot is used)
OPENAI_API_KEY=
OPENAI_BASE_URL=https://api.openai.com/v1

# Database Connection (SQLite default, PostgreSQL ready)
DATABASE_URL=sqlite:///./plant_ai.db

# Enable mock model for rapid development without loading PyTorch weights
USE_MOCK_MODEL=false

# Allowed CORS Origins
CORS_ORIGINS=http://localhost:5173,http://127.0.0.1:5173
```

---

## 🔄 Switching or Fine-Tuning Hugging Face Models

To change the vision classification model:
1. Update `HUGGINGFACE_MODEL_ID` in your `backend/.env` file.
2. Example alternatives from Hugging Face Hub:
   - `linkanjarad/mobilenet_v2_1.0_224-plant-disease-identification`
   - `dima806/plant_disease_detection`
   - `nateraw/vit-base-patch16-224-in21k-plant-disease`
3. Restart the FastAPI application. The backend dynamically initializes the model processor and label mappings upon lifespan startup.

---

## ⚠️ Important Agricultural UX Notice

Plant AI output represents AI diagnostic decision-support and rapid initial screening. Predictions should not be interpreted as guaranteed agricultural diagnoses. For commercial crops or serious outbreaks, always consult a certified extension agent or agricultural pathologist.
