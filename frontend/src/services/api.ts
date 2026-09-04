import axios from 'axios';
import { PredictResponse, HistoryResponse, ModelInfo } from '../types/prediction';
import { ChatContext, ChatResponsePayload } from '../types/chat';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const apiClient = axios.create({
  baseURL: `${API_BASE_URL}/api/v1`,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000,
});

export const predictDisease = async (file: File, sessionId?: string): Promise<PredictResponse> => {
  const formData = new FormData();
  formData.append('file', file);
  if (sessionId) {
    formData.append('session_id', sessionId);
  }

  const response = await apiClient.post<PredictResponse>('/predict', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};

export const sendChatMessage = async (
  message: string,
  context?: ChatContext,
  sessionId?: string
): Promise<ChatResponsePayload> => {
  const response = await apiClient.post<ChatResponsePayload>('/chat', {
    message,
    context,
    session_id: sessionId,
  });

  return response.data;
};

export const getHistory = async (params?: {
  plant?: string;
  disease?: string;
  search?: string;
}): Promise<HistoryResponse> => {
  const response = await apiClient.get<HistoryResponse>('/history', { params });
  return response.data;
};

export const getHealth = async (): Promise<{ status: string; model_loaded: boolean }> => {
  const response = await apiClient.get<{ status: string; model_loaded: boolean }>('/health');
  return response.data;
};

export const getModelInfo = async (): Promise<ModelInfo> => {
  const response = await apiClient.get<ModelInfo>('/model-info');
  return response.data;
};
