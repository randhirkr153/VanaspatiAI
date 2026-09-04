from typing import Dict, Any, List


# Pre-populated knowledge base for PlantVillage & common plant diseases
DISEASE_KNOWLEDGE_BASE: Dict[str, Dict[str, Any]] = {
    "Tomato_Late Blight": {
        "description": "Late blight is a destructive fungal-like pathogen (Phytophthora infestans) that quickly destroys tomato foliage and fruit during cool, moist weather.",
        "symptoms": [
            "Dark water-soaked spots on leaves that turn brown/black with pale halos",
            "White fuzzy fungal growth on the underside of leaves during high humidity",
            "Brown, sunken, leathery lesions on tomato fruits",
            "Rapid leaf collapse and stem dieback"
        ],
        "management": [
            "Prune infected leaves immediately and dispose of them in sealed trash bags (do not compost)",
            "Apply copper-based fungicides or bio-fungicides containing Bacillus subtilis",
            "Avoid overhead watering; use drip irrigation to keep foliage dry",
            "Ensure wide spacing between plants to maximize airflow"
        ],
        "prevention": [
            "Plant resistant tomato cultivars when available",
            "Rotate crops annually with non-solanaceous plants",
            "Apply organic mulch around plant bases to prevent soil splash",
            "Monitor foliage weekly during humid weather spells"
        ],
        "severity": "High"
    },
    "Tomato_Early Blight": {
        "description": "Early blight (Alternaria solani) affects tomato leaves, stems, and fruit, creating characteristic target-shaped concentric rings.",
        "symptoms": [
            "Concentric dark brown rings ('target board' pattern) on older lower leaves",
            "Yellowing around leaf spots leading to premature leaf drop",
            "Sunken dark spots with concentric rings near stem ends of tomato fruit",
            "Dark brown elongated spots on lower stems"
        ],
        "management": [
            "Remove lower leaves up to 12 inches above the soil line",
            "Spray copper or chlorothalonil fungicides at early symptom onset",
            "Maintain balanced nitrogen fertilization to avoid stress",
            "Stake or cage plants to elevate branches above soil"
        ],
        "prevention": [
            "Enforce a 2 to 3 year crop rotation cycle",
            "Use drip irrigation instead of spray nozzles",
            "Clear all crop residue at the end of the growing season",
            "Mulch heavily under plants to block fungal spore splash"
        ],
        "severity": "Moderate"
    },
    "Tomato_Bacterial Spot": {
        "description": "Bacterial spot (Xanthomonas species) causes dark spots on foliage and fruit, causing severe defoliation and sunscald.",
        "symptoms": [
            "Small, dark, water-soaked spots on leaves that turn brown and necrotic",
            "Scab-like, raised dark spots on green tomato fruits",
            "Yellowing foliage leading to extensive defoliation",
            "Leaf margins appearing scorched"
        ],
        "management": [
            "Apply copper hydroxide mixed with mancozeb for improved bacterial control",
            "Avoid handling foliage when plants are wet",
            "Remove infected debris immediately from the garden",
            "Sanitize garden tools with 70% isopropyl alcohol"
        ],
        "prevention": [
            "Purchase disease-free certified seeds and transplants",
            "Implement drip irrigation or soaker hoses",
            "Rotate crops with non-nightshade plants every 3 years",
            "Maintain optimal field drainage"
        ],
        "severity": "Moderate"
    },
    "Tomato_Yellow Leaf Curl Virus": {
        "description": "Tomato Yellow Leaf Curl Virus (TYLCV) is transmitted by whiteflies and causes severe stunting, leaf curling, and yield reduction.",
        "symptoms": [
            "Upward cupping and yellowing of leaf margins",
            "Stunted plant growth and bushy appearance",
            "Marked reduction in flower set and fruit production",
            "Thickened, leathery leaves"
        ],
        "management": [
            "Insecticidal soaps, neem oil, or yellow sticky traps to suppress whitefly vectors",
            "Remove and destroy severely infected plants immediately",
            "Reflective silver mulches to deter whiteflies from landing",
            "Cover young transplants with fine mesh floating row covers"
        ],
        "prevention": [
            "Select TYLCV-resistant tomato cultivars",
            "Eliminate weed hosts near tomato beds",
            "Isolate new seedlings from established solanaceous crops",
            "Clean greenhouse structures between crops"
        ],
        "severity": "High"
    },
    "Apple_Apple Scab": {
        "description": "Apple scab (Venturia inaequalis) is a common fungal disease causing velvety olive-green spots on leaves and scabby lesions on apples.",
        "symptoms": [
            "Olive-green to dark brown velvety spots on leaf uppersides",
            "Deformed, cracked, or corky brown lesions on apple fruits",
            "Early yellowing and premature leaf dropping in mid-summer",
            "Blistered bark on young twigs"
        ],
        "management": [
            "Apply neem oil, sulfur, or liquid copper fungicides in early spring at green tip stage",
            "Prune canopy tree branches to encourage sun penetration and airflow",
            "Rake and burn/dispose of fallen leaves in autumn to eliminate winter spores"
        ],
        "prevention": [
            "Plant scab-resistant cultivars (e.g., Liberty, Enterprise, Freedom)",
            "Ensure full sun planting location",
            "Apply compost tea or bio-fungicides preventatively during bloom",
            "Avoid sprinkler irrigation onto tree canopies"
        ],
        "severity": "Moderate"
    },
    "Apple_Black Rot": {
        "description": "Black rot (Botryosphaeria obtusa) causes leaf spots ('frog-eye'), fruit decay, and stem cankers on apple trees.",
        "symptoms": [
            "Concentric purple/brown leaf spots known as 'frog-eye leaf spot'",
            "Blackening, shriveling, and mummification of developing apples",
            "Sunken reddish-brown bark cankers on limbs and trunks",
            "Rotting fruit remaining attached to stems"
        ],
        "management": [
            "Prune out dead wood, fire blight cankers, and mummified fruits in winter",
            "Apply systemic fungicides during bloom and petal fall stages",
            "Burn or deeply bury all pruned branches"
        ],
        "prevention": [
            "Control insect damage that creates fruit entry wounds",
            "Maintain orchard sanitation year-round",
            "Protect trunks from winter injury and mechanical wounds"
        ],
        "severity": "High"
    },
    "Corn (Maize)_Common Rust": {
        "description": "Common rust (Puccinia sorghi) manifests as powdery cinnamon-brown pustules across corn leaf surfaces.",
        "symptoms": [
            "Golden-brown to cinnamon-colored powdery pustules on leaf uppers and lowers",
            "Pustules rupturing to release dark rust-colored spores",
            "Yellowing and premature death of heavily infected leaves",
            "Reduced ear size and stalk weakening"
        ],
        "management": [
            "Foliar fungicides (e.g., azoxystrobin or pyraclostrobin) if disease strikes before sweet corn silking",
            "Ensure adequate nitrogen and potassium fertility",
            "Destroy crop residue following harvest"
        ],
        "prevention": [
            "Plant resistant corn hybrids",
            "Plant early in the season to avoid peak spore rust flights",
            "Rotate corn with soybeans or small grains"
        ],
        "severity": "Low to Moderate"
    },
    "Potato_Early Blight": {
        "description": "Potato early blight (Alternaria solani) weakens potato foliage, reducing tuber yield and quality.",
        "symptoms": [
            "Dark brown concentric ring spots on mature lower foliage",
            "Chlorotic yellow halos surrounding leaf spots",
            "Sunken dark corky spots on potato tubers",
            "Premature foliage senescing"
        ],
        "management": [
            "Fungicide sprays (mancozeb, chlorothalonil, or copper formulations)",
            "Avoid vine injury during cultivation",
            "Proper nitrogen management to prevent plant weakness"
        ],
        "prevention": [
            "Use certified disease-free seed potatoes",
            "Maintain a 3-year crop rotation schedule",
            "Allow tubers to fully mature before harvest"
        ],
        "severity": "Moderate"
    },
    "Potato_Late Blight": {
        "description": "Potato late blight (Phytophthora infestans) is the historic cause of catastrophic potato crops losses, causing rapid foliage and tuber collapse.",
        "symptoms": [
            "Water-soaked dark green/black spots rapidly expanding across leaves",
            "White mildew growth on undersides during high moisture",
            "Reddish-brown dry rot extending into potato tuber flesh",
            "Foul smell from decaying foliage and tubers"
        ],
        "management": [
            "Immediately destroy infected vines before harvesting tubers",
            "Apply protective copper or systemic late blight fungicides",
            "Ensure tubers are well-covered with soil (hilled up) to prevent spore wash"
        ],
        "prevention": [
            "Plant resistant seed varieties",
            "Eliminate volunteer potato plants and cull piles nearby",
            "Avoid overhead irrigation during humid weather"
        ],
        "severity": "High"
    },
    "Grape_Black Rot": {
        "description": "Grape black rot (Guignardia bidwellii) infests leaves, stems, and berries, turning grapes into hard black shriveled mummies.",
        "symptoms": [
            "Small reddish-brown circular spots on leaf surfaces with tiny black dots",
            "Sunken dark purple lesions on young shoots and tendrils",
            "Grapes turning soft and brown, then rapidly shriveling into hard black mummies"
        ],
        "management": [
            "Apply protective fungicides (mancozeb, captan, or myclobutanil) starting at bud burst",
            "Rake and remove all fallen mummified berries from vine bases"
        ],
        "prevention": [
            "Prune grapevines for maximum sunlight penetration and air movement",
            "Keep canopy weed-free beneath trellis systems",
            "Destroy wild grapevines within 100 yards of cultivated vines"
        ],
        "severity": "High"
    },
    "Peach_Bacterial Spot": {
        "description": "Bacterial spot (Xanthomonas arboricola pv. pruni) causes shot-hole leaf damage and pitted fruit lesions on stone fruits.",
        "symptoms": [
            "Small angular purple/brown leaf spots that fall out, creating a 'shot-hole' appearance",
            "Pitted, sunken, cracked brown spots on peach skin",
            "Premature defoliation resulting in weakened trees"
        ],
        "management": [
            "Copper sprays applied during dormant season or early bud swelling",
            "Avoid high nitrogen applications that stimulate tender susceptible shoots"
        ],
        "prevention": [
            "Plant resistant peach cultivars",
            "Establish windbreaks to protect orchards from wind-driven rain",
            "Maintain balanced pruning and nutrition"
        ],
        "severity": "Moderate"
    },
    "Strawberry_Leaf Scorch": {
        "description": "Strawberry leaf scorch (Diplocarpon earlianum) infects strawberry foliage, turning leaves purple/red and scorch-like.",
        "symptoms": [
            "Purplish spots without dark borders on leaves",
            "Spots coalescing to give leaves a burned or scorched appearance",
            "Leaf margins curling upward and drying out",
            "Weakened crowns and smaller fruit yields"
        ],
        "management": [
            "Mow back foliage post-harvest and remove old leaf debris",
            "Apply copper-based fungicides after renovation"
        ],
        "prevention": [
            "Ensure plants are spaced properly in well-drained soil beds",
            "Avoid excessive nitrogen fertilizer in spring",
            "Use drip lines instead of overhead sprinklers"
        ],
        "severity": "Low to Moderate"
    }
}


def get_disease_report(plant: str, disease: str) -> Dict[str, Any]:
    """
    Looks up or dynamically generates structured disease knowledge, symptoms, management, and prevention recommendations.
    """
    key = f"{plant}_{disease}"

    # Direct match lookup
    if key in DISEASE_KNOWLEDGE_BASE:
        report_data = DISEASE_KNOWLEDGE_BASE[key]
        return {
            "description": report_data["description"],
            "symptoms": report_data["symptoms"],
            "management": report_data["management"],
            "prevention": report_data["prevention"],
            "severity": report_data.get("severity", "Moderate"),
            "disclaimer": (
                "AI-generated plant analysis may be incorrect. For valuable crops or serious outbreaks, "
                "consider consulting a qualified agricultural professional."
            )
        }

    # Handle "Healthy" condition
    if disease.lower() == "healthy":
        return {
            "description": f"The model detected no major disease symptoms on this {plant} leaf. The tissue appears healthy and vibrant.",
            "symptoms": [
                "Leaves display natural green coloration without prominent leaf spots",
                "No visible bacterial oozing, fungal spore pustules, or viral curling",
                "Foliage texture and stem connection appear normal"
            ],
            "management": [
                "Maintain consistent watering schedule appropriate for this species",
                "Provide recommended balanced fertilizer during active growth",
                "Prune dead or crowded inner stems occasionally to maintain good airflow"
            ],
            "prevention": [
                "Inspect foliage weekly for early signs of pests or discolored spots",
                "Use clean garden tools sanitized between different plants",
                "Keep soil mulched to preserve moisture and suppress weeds"
            ],
            "severity": "None (Healthy)",
            "disclaimer": (
                "AI-generated plant analysis may be incorrect. Regular visual monitoring remains best practice."
            )
        }

    # Fallback knowledge generator for any unmapped plant/disease combination
    return {
        "description": f"{disease} affecting {plant} foliage. This condition alters leaf cell structure and photo-assimilate production.",
        "symptoms": [
            f"Discolored lesions, mottling, or spot patterns on {plant} leaf blade",
            "Potential chlorosis (yellowing) around infected leaf tissue",
            "Reduced vegetative vigor or early leaf shedding"
        ],
        "management": [
            f"Isolate affected {plant} foliage and trim infected leaves with sanitized shears",
            "Apply appropriate organic fungicide or broad-spectrum plant care spray",
            "Water at the base of the plant to prevent foliage moisture accumulation"
        ],
        "prevention": [
            f"Ensure {plant} receives adequate sunlight and well-draining soil",
            "Practice crop rotation or clean soil potting practices",
            "Monitor plant health weekly for early intervention"
        ],
        "severity": "Moderate",
        "disclaimer": (
            "AI-generated plant analysis may be incorrect. For valuable crops or serious outbreaks, "
            "consider consulting a qualified agricultural professional."
        )
    }
