import io
from PIL import Image
from fastapi.testclient import TestClient

from app.main import app


def run_tests():
    print("Initializing TestClient with FastAPI lifespan context...")
    with TestClient(app) as client:
        print("--- 1. Testing Health Endpoint ---")
        resp = client.get("/api/v1/health")
        print("Health Status Code:", resp.status_code)
        print("Health Response:", resp.json())
        assert resp.status_code == 200
        assert resp.json()["status"] == "healthy"
        assert resp.json()["model_loaded"] is True

        print("\n--- 2. Testing Model Info Endpoint ---")
        resp = client.get("/api/v1/model-info")
        print("Model Info Status Code:", resp.status_code)
        print("Model Info Response:", resp.json())
        assert resp.status_code == 200
        assert resp.json()["model_loaded"] is True

        print("\n--- 3. Testing Predict Endpoint ---")
        # Create a synthetic test leaf image (RGB 224x224 green leaf image)
        img = Image.new("RGB", (224, 224), color=(34, 139, 34))
        img_byte_arr = io.BytesIO()
        img.save(img_byte_arr, format="JPEG")
        img_bytes = img_byte_arr.getvalue()

        files = {"file": ("test_leaf.jpg", img_bytes, "image/jpeg")}
        resp = client.post("/api/v1/predict", files=files)
        print("Predict Status Code:", resp.status_code)
        pred_data = resp.json()
        print("Predict Response:", pred_data)
        assert resp.status_code == 200
        assert pred_data["success"] is True
        assert "prediction" in pred_data
        assert "plant" in pred_data["prediction"]
        assert "disease" in pred_data["prediction"]
        assert "confidence" in pred_data["prediction"]
        assert "report" in pred_data
        assert len(pred_data["report"]["symptoms"]) > 0

        print("\n--- 4. Testing Chat Endpoint ---")
        chat_payload = {
            "message": "How should I treat this condition?",
            "context": {
                "plant": pred_data["prediction"]["plant"],
                "disease": pred_data["prediction"]["disease"],
                "confidence": pred_data["prediction"]["confidence"]
            }
        }
        resp = client.post("/api/v1/chat", json=chat_payload)
        print("Chat Status Code:", resp.status_code)
        print("Chat Response:", resp.json())
        assert resp.status_code == 200
        assert resp.json()["success"] is True

        print("\n--- 5. Testing History Endpoint ---")
        resp = client.get("/api/v1/history")
        print("History Status Code:", resp.status_code)
        history_data = resp.json()
        print(f"History Records Count: {history_data.get('total')}")
        assert resp.status_code == 200
        assert history_data["total"] >= 1

        print("\n[SUCCESS] ALL BACKEND TESTS PASSED SUCCESSFULLY!")


if __name__ == "__main__":
    run_tests()
