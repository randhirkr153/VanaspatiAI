import React from 'react';
import { Bot, User } from 'lucide-react';
import { ChatMessage as ChatMessageType } from '../types/chat';

interface ChatMessageProps {
  message: ChatMessageType;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.sender === 'user';

  return (
    <div className={`flex items-start space-x-2.5 my-3 ${isUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
      {/* Avatar */}
      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-sm flex-shrink-0 ${
        isUser ? 'bg-emerald-600' : 'bg-forest border border-emerald-500/40'
      }`}>
        {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4 text-emerald-400" />}
      </div>

      {/* Bubble */}
      <div className={`max-w-[82%] rounded-2xl px-4 py-3 text-xs sm:text-sm leading-relaxed shadow-sm ${
        isUser
          ? 'bg-emerald-600 text-white rounded-tr-none font-medium'
          : 'bg-emerald-50/80 border border-emerald-200/80 text-forest rounded-tl-none'
      }`}>
        {/* Optional Context Used Pill */}
        {message.contextUsed && !isUser && (
          <div className="mb-2 pb-1.5 border-b border-emerald-200/60 text-[10px] font-semibold text-emerald-800 flex items-center space-x-1">
            <span>Context:</span>
            <span className="bg-emerald-200/60 px-1.5 py-0.5 rounded text-emerald-950 font-mono">
              {message.contextUsed}
            </span>
          </div>
        )}

        <div className="whitespace-pre-wrap">{message.text}</div>
        
        <div className={`text-[10px] mt-1.5 text-right ${isUser ? 'text-emerald-100/80' : 'text-slate-400'}`}>
          {message.timestamp}
        </div>
      </div>
    </div>
  );
};
