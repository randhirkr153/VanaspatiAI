import React, { useState, useRef, useEffect } from 'react';
import { Bot, X, Send, Sparkles, Leaf } from 'lucide-react';
import { ChatMessage as ChatMessageType, ChatContext } from '../types/chat';
import { ChatMessage } from './ChatMessage';
import { sendChatMessage } from '../services/api';

interface ChatbotProps {
  currentContext?: ChatContext | null;
  isOpenExternal?: boolean;
  onCloseExternal?: () => void;
}

export const Chatbot: React.FC<ChatbotProps> = ({
  currentContext,
  isOpenExternal,
  onCloseExternal,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const prevContextKeyRef = useRef<string>('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Sync external open state if controlled externally
  useEffect(() => {
    if (isOpenExternal !== undefined) {
      setIsOpen(isOpenExternal);
    }
  }, [isOpenExternal]);

  const handleToggle = () => {
    const nextState = !isOpen;
    setIsOpen(nextState);
    if (!nextState && onCloseExternal) {
      onCloseExternal();
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Context updates listener & Initial welcome message
  useEffect(() => {
    const currentKey = currentContext && currentContext.plant
      ? `${currentContext.plant}_${currentContext.disease}`
      : 'none';

    if (currentKey !== prevContextKeyRef.current) {
      prevContextKeyRef.current = currentKey;

      if (currentContext && currentContext.plant) {
        const contextUpdateMsg: ChatMessageType = {
          id: Date.now().toString(),
          sender: 'assistant',
          text: `Context Updated: I am now assisting with your **${currentContext.plant}** (${currentContext.disease}). How can I help you manage or care for this plant?`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          contextUsed: `${currentContext.plant} (${currentContext.disease})`,
        };
        setMessages((prev) => [...prev, contextUpdateMsg]);
      } else if (messages.length === 0) {
        setMessages([
          {
            id: 'welcome',
            sender: 'assistant',
            text: "Hello! I am your AI Plant Assistant. Upload a leaf image or ask me any plant care, disease diagnosis, or treatment questions!",
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          },
        ]);
      }
    }
  }, [currentContext]);

  const handleSend = async () => {
    if (!inputMessage.trim() || isTyping) return;

    const userText = inputMessage.trim();
    setInputMessage('');

    const userMsg: ChatMessageType = {
      id: Date.now().toString(),
      sender: 'user',
      text: userText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    try {
      const responsePayload = await sendChatMessage(
        userText,
        currentContext || undefined
      );

      const botMsg: ChatMessageType = {
        id: (Date.now() + 1).toString(),
        sender: 'assistant',
        text: responsePayload.response,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        contextUsed: responsePayload.context_used,
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      const errorMsg: ChatMessageType = {
        id: (Date.now() + 1).toString(),
        sender: 'assistant',
        text: "I'm having trouble connecting to the backend assistant service. Please check your connection and try again.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Floating Trigger Button in Bottom-Right */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={handleToggle}
          className="relative group w-14 h-14 rounded-full bg-forest border-2 border-emerald-400 text-white flex items-center justify-center shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300"
          aria-label="Toggle Plant Assistant Chatbot"
        >
          <Bot className="w-7 h-7 text-emerald-400 group-hover:rotate-12 transition-transform" />
          
          {/* Badge */}
          <span className="absolute -top-1 -right-1 bg-emerald-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full border border-forest shadow-sm">
            AI
          </span>
        </button>
      </div>

      {/* Floating Chat Drawer Window */}
      {isOpen && (
        <div className="fixed inset-x-4 bottom-24 sm:right-6 sm:left-auto sm:w-[420px] h-[540px] max-h-[80vh] z-50 bg-white rounded-3xl border border-emerald-900/20 shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-300">
          
          {/* Chat Header */}
          <div className="bg-[#063B22] text-white p-4 flex items-center justify-between border-b border-emerald-800">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-700/60 border border-emerald-500/30 flex items-center justify-center">
                <Bot className="w-6 h-6 text-emerald-300" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-white flex items-center space-x-1.5">
                  <span>Plant Assistant</span>
                  <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                </h3>
                <p className="text-[11px] text-emerald-300/80">AI Plant Care Assistant</p>
              </div>
            </div>

            <button
              onClick={handleToggle}
              className="p-1.5 rounded-lg text-emerald-300 hover:text-white hover:bg-emerald-800/60 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Active Context Banner */}
          {currentContext && currentContext.plant && (
            <div className="bg-emerald-50 px-4 py-2 border-b border-emerald-200/60 flex items-center justify-between text-xs text-emerald-900">
              <div className="flex items-center space-x-1.5 truncate">
                <Leaf className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                <span className="font-semibold truncate">
                  Context: {currentContext.plant} — {currentContext.disease} ({currentContext.confidence?.toFixed(1)}%)
                </span>
              </div>
            </div>
          )}

          {/* Messages Area */}
          <div className="flex-1 p-4 overflow-y-auto custom-scrollbar bg-slate-50/50">
            {messages.map((msg) => (
              <ChatMessage key={msg.id} message={msg} />
            ))}

            {isTyping && (
              <div className="flex items-center space-x-2 my-3 text-slate-400 text-xs pl-2">
                <Bot className="w-4 h-4 text-emerald-600 animate-pulse" />
                <span className="italic">Plant Assistant is typing...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Footer */}
          <div className="p-3 bg-white border-t border-slate-200">
            <div className="relative flex items-center">
              <textarea
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about your plant..."
                rows={1}
                className="w-full resize-none rounded-2xl border border-slate-300 bg-slate-50 pl-4 pr-12 py-3 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:bg-white focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
              />
              <button
                onClick={handleSend}
                disabled={!inputMessage.trim() || isTyping}
                className="absolute right-2 p-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white disabled:opacity-40 disabled:hover:bg-emerald-600 transition-colors shadow-sm"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
            <p className="text-[10px] text-slate-400 text-center mt-1.5">
              Enter to send • Shift+Enter for newline
            </p>
          </div>

        </div>
      )}
    </>
  );
};
