export interface ChatContext {
  plant?: string;
  disease?: string;
  confidence?: number;
  symptoms?: string[];
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  contextUsed?: string;
}

export interface ChatRequestPayload {
  message: string;
  context?: ChatContext;
  session_id?: string;
}

export interface ChatResponsePayload {
  success: boolean;
  response: string;
  context_used?: string;
}
