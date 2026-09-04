export interface AlternativePrediction {
  plant: string;
  disease: string;
  confidence: number;
  raw_label: string;
}

export interface PredictionResult {
  plant: string;
  disease: string;
  confidence: number;
  confidence_level: 'High' | 'Moderate' | 'Low';
  raw_label: string;
}

export interface DiseaseReport {
  description: string;
  symptoms: string[];
  management: string[];
  prevention: string[];
  severity: string;
  disclaimer: string;
}

export interface PredictResponse {
  success: boolean;
  prediction: PredictionResult;
  alternatives: AlternativePrediction[];
  report: DiseaseReport;
  image_url?: string;
  warning?: string;
}

export interface HistoryItem {
  id: number;
  session_id: string;
  image_filename?: string;
  plant: string;
  disease: string;
  confidence: number;
  confidence_level: string;
  model_id: string;
  created_at: string;
}

export interface HistoryResponse {
  success: boolean;
  total: number;
  items: HistoryItem[];
}

export interface ModelInfo {
  model_id: string;
  model_loaded: boolean;
  classes_count: number;
  is_mock: boolean;
}
