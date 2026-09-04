import logging
from abc import ABC, abstractmethod
from typing import Optional, Dict, Any
from app.config import settings
from app.schemas.chat import ChatContext
import requests

logger = logging.getLogger("plant_ai.chat")


class LLMProvider(ABC):
    @abstractmethod
    def generate_response(self, user_message: str, context: Optional[ChatContext] = None) -> str:
        pass


class PlantExpertBotProvider(LLMProvider):
    """
    Built-in intelligent botanical assistant when no external LLM API key is configured.
    Provides context-aware expert advice, disease explanations, symptoms, and care tips.
    """

    def generate_response(self, user_message: str, context: Optional[ChatContext] = None) -> str:
        msg_lower = user_message.lower()

        # Check if user message is completely unrelated to plants
        unrelated_keywords = ["movie", "bitcoin", "crypto", "sports", "football", "politics", "president", "math problem"]
        if any(kw in msg_lower for kw in unrelated_keywords):
            return (
                "I am Plant Assistant, specialized in plant health, disease diagnosis, and garden care. "
                "Please ask me anything about your plant leaf analysis, symptoms, watering, fertilization, or disease prevention!"
            )

        # Context details
        plant_str = context.plant if context and context.plant else None
        disease_str = context.disease if context and context.disease else None
        conf_str = f"{context.confidence:.1f}%" if context and context.confidence else None

        ctx_intro = ""
        if plant_str and disease_str:
            ctx_intro = f"Regarding your **{plant_str}** with suspected **{disease_str}**"
            if conf_str:
                ctx_intro += f" (Model Confidence: {conf_str})"
            ctx_intro += ":\n\n"

        # General greetings
        if msg_lower in ["hi", "hello", "hey", "help", "start"]:
            if plant_str and disease_str:
                return (
                    f"Hello! I see you analyzed a **{plant_str}** leaf affected by **{disease_str}**. "
                    "How can I help you manage this condition, treat your plant, or prevent future outbreaks?"
                )
            return "Hello! I am your AI Plant Assistant. Upload a leaf photo or ask me any plant care and disease questions!"

        # Treatment / Management queries
        if any(w in msg_lower for w in ["manage", "treat", "cure", "fix", "spray", "fungicide", "remedy", "what to do"]):
            if plant_str and disease_str:
                if disease_str.lower() == "healthy":
                    return (
                        f"{ctx_intro}Since your {plant_str} is healthy, focus on preventive care:\n"
                        "1. **Watering**: Water deeply at soil level; keep leaves dry.\n"
                        "2. **Sunlight**: Provide 6-8 hours of direct or bright indirect light.\n"
                        "3. **Pruning**: Trim overcrowded branches for airflow.\n"
                        "4. **Nutrition**: Apply balanced organic fertilizer during active growing seasons."
                    )
                return (
                    f"{ctx_intro}Here are recommended management steps:\n"
                    f"1. **Prune Affected Foliage**: Carefully cut away infected leaves using shears sanitized with 70% isopropyl alcohol.\n"
                    f"2. **Targeted Fungicide / Treatment**: Apply suitable organic or copper-based sprays early in the morning.\n"
                    f"3. **Air Circulation**: Space plants out to decrease humidity around leaves.\n"
                    f"4. **Moisture Control**: Switch to drip irrigation or water early so leaves dry quickly in sunlight."
                )
            return (
                "For most plant diseases, effective treatment involves:\n"
                "• Immediately isolating and pruning infected leaf areas.\n"
                "• Applying copper hydroxide, sulfur, or neem oil fungicides for fungal issues.\n"
                "• Improving airflow and shifting to base/soil watering.\n"
                "Would you like advice for a specific plant or disease?"
            )

        # Cause / Origin queries
        if any(w in msg_lower for w in ["why", "cause", "origin", "how did", "spores", "fungus", "bacteria"]):
            if plant_str and disease_str:
                return (
                    f"{ctx_intro}**{disease_str}** in {plant_str} plants is typically triggered by:\n"
                    "• High relative humidity or leaves remaining wet for extended hours.\n"
                    "• Fungal spores or bacterial pathogens splashed from soil during rain/watering.\n"
                    "• Windblown spores from neighboring infected vegetation.\n"
                    "• Overcrowded foliage preventing quick evaporation of moisture."
                )
            return "Plant diseases usually stem from excess canopy moisture, poor air circulation, infected soil splash, or pest insect vectors."

        # Prevention queries
        if any(w in msg_lower for w in ["prevent", "avoid", "protect", "stop", "future"]):
            if plant_str and disease_str:
                return (
                    f"{ctx_intro}To protect your {plant_str} from future occurrences:\n"
                    "• **Crop Rotation**: Rotate crop locations every 2 to 3 years.\n"
                    "• **Organic Mulch**: Apply a 2-inch layer of straw or wood chips to suppress soil splashing.\n"
                    "• **Resistant Varieties**: Choose disease-resistant cultivars when planting next season.\n"
                    "• **Regular Inspection**: Inspect leaf undersides weekly for early symptom spots."
                )

        # Default contextual response
        if plant_str and disease_str:
            return (
                f"{ctx_intro}Based on the analysis, **{disease_str}** can impact overall plant vigor if untreated. "
                "Would you like detailed advice on organic remedies, chemical sprays, watering schedules, or soil management?"
            )

        return (
            "I'm here to help with all your plant care needs! You can ask about disease treatments, "
            "symptoms, watering guidelines, fertilizer needs, or pest management."
        )


class OpenAICompatibleProvider(LLMProvider):
    """
    Connects to an OpenAI-compatible API (OpenAI, Groq, Ollama, DeepSeek, etc.)
    using backend environment settings.
    """

    def __init__(self, api_key: str, base_url: str):
        self.api_key = api_key
        self.base_url = base_url.rstrip("/")

    def generate_response(self, user_message: str, context: Optional[ChatContext] = None) -> str:
        system_prompt = (
            "You are Plant Assistant, an expert AI agriculturalist and plant pathologist.\n"
            "Your job is to assist users with plant disease diagnosis, care advice, symptoms, and prevention.\n"
            "Guidelines:\n"
            "1. Be helpful, concise, warm, and highly practical.\n"
            "2. If context contains plant disease prediction data, tailor your response to that specific plant and condition.\n"
            "3. Always clarify that AI predictions are diagnostic assistance and recommend professional advice for high-value agricultural crops.\n"
            "4. Politely redirect non-plant related queries to plant care topics."
        )

        context_prompt = ""
        if context and (context.plant or context.disease):
            context_prompt = f"\nCurrent Analysis Context:\nPlant: {context.plant or 'Unknown'}\nDisease: {context.disease or 'Unknown'}\nConfidence: {context.confidence or 'N/A'}%"

        messages = [
            {"role": "system", "content": system_prompt + context_prompt},
            {"role": "user", "content": user_message}
        ]

        url = f"{self.base_url}/chat/completions"
        headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json"
        }
        payload = {
            "model": "gpt-3.5-turbo",
            "messages": messages,
            "max_tokens": 500,
            "temperature": 0.7
        }

        try:
            resp = requests.post(url, json=payload, headers=headers, timeout=15)
            if resp.status_code == 200:
                data = resp.json()
                return data["choices"][0]["message"]["content"].strip()
            else:
                logger.warning(f"OpenAI API returned status {resp.status_code}, falling back to built-in expert bot.")
                fallback = PlantExpertBotProvider()
                return fallback.generate_response(user_message, context)
        except Exception as e:
            logger.error(f"Error connecting to OpenAI compatible API: {e}")
            fallback = PlantExpertBotProvider()
            return fallback.generate_response(user_message, context)


def get_chat_provider() -> LLMProvider:
    if settings.OPENAI_API_KEY and settings.OPENAI_API_KEY.strip():
        return OpenAICompatibleProvider(settings.OPENAI_API_KEY, settings.OPENAI_BASE_URL)
    return PlantExpertBotProvider()
