import re
from typing import Dict

KNOWN_PLANTS = [
    "tomato", "potato", "apple", "corn", "maize", "grape", "peach",
    "pepper", "strawberry", "cherry", "squash", "soybean", "blueberry",
    "raspberry", "orange", "cedar", "cassava"
]


def parse_raw_label(raw_label: str) -> Dict[str, str]:
    """
    Converts raw Hugging Face / PlantVillage model labels into clean structured plant & disease names.
    Handles triple underscores (Tomato___Late_blight), double, and single (Tomato_Leaf_Mold, Potato_Early_blight).
    """
    if not raw_label:
        return {"plant": "Unknown Plant", "disease": "Unknown Condition"}

    cleaned = raw_label.strip()

    # Case 1: Split by triple or double underscore
    if "___" in cleaned or "__" in cleaned:
        parts = re.split(r"_{2,3}", cleaned)
        raw_plant = parts[0]
        raw_disease = "_".join(parts[1:])
    else:
        # Case 2: Single underscore or space separated e.g. "Tomato_Leaf_Mold" or "Potato_Early_blight"
        parts = cleaned.split("_")
        
        # Check if first part matches a known plant species
        first_part_lower = parts[0].lower().replace(",", "").replace("(", "").replace(")", "")
        
        if len(parts) >= 2 and (first_part_lower in KNOWN_PLANTS or any(kp in first_part_lower for kp in KNOWN_PLANTS)):
            # Check if second part is also part of plant name like "Pepper_bell" or "Corn_maize"
            if len(parts) >= 3 and parts[1].lower() in ["bell", "maize"]:
                raw_plant = f"{parts[0]} ({parts[1]})"
                raw_disease = "_".join(parts[2:])
            else:
                raw_plant = parts[0]
                raw_disease = "_".join(parts[1:])
        elif len(parts) >= 2:
            raw_plant = parts[0]
            raw_disease = "_".join(parts[1:])
        else:
            raw_plant = cleaned
            raw_disease = "Condition"

    # Clean plant name
    plant = raw_plant.replace("_", " ").replace(",", " ").strip()
    plant = re.sub(r"\s+", " ", plant)
    plant = title_case_preserve(plant)

    # Clean disease name
    disease = raw_disease.replace("_", " ").strip()
    disease = re.sub(r"\s+", " ", disease)
    disease = title_case_preserve(disease)

    # Normalize "healthy" or "Healthy"
    if disease.lower() in ["healthy", "health"]:
        disease = "Healthy"

    return {
        "plant": plant,
        "disease": disease
    }


def title_case_preserve(text: str) -> str:
    """Helper to convert text into title case while handling parentheses cleanly."""
    words = text.split(" ")
    capitalized_words = []
    for w in words:
        if not w:
            continue
        if w.startswith("(") and len(w) > 1:
            capitalized_words.append("(" + w[1:].capitalize())
        else:
            capitalized_words.append(w.capitalize())
    return " ".join(capitalized_words)
