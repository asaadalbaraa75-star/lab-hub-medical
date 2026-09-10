import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Send, Bot, User as UserIcon, X, BookOpen, RefreshCw, Copy, Check } from 'lucide-react';
import { apiService } from '../../services/apiService';
import { LabSubjectId } from '../../types';

interface AiLabTutorModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentSubject?: LabSubjectId;
  currentTopic?: string;
}

interface Message {
  id: string;
  sender: 'user' | 'tutor';
  text: string;
  timestamp: string;
}

export const AiLabTutorModal: React.FC<AiLabTutorModalProps> = ({
  isOpen,
  onClose,
  currentSubject,
  currentTopic
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'tutor',
      text: `Hello! I am your **LAB HUB AI Medical Laboratory Tutor**. 🔬\n\nI can assist you with:\n- **Histological slide identification** (stains, cell layers, artifacts)\n- **Biochemistry practical tests** (Carbohydrate qualitative tests, Biuret test, Casein precipitation)\n- **Anatomical landmarks & relations** (bones, muscles, nerves, blood supply)\n- **OSPE spotter exam preparation**\n\nHow can I help you master your laboratory practical today?`,
      timestamp: 'Just now'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickPrompts = [
    'How do I distinguish skeletal vs cardiac muscle under light microscopy?',
    'Explain the chemical principle of the Biuret test for proteins.',
    'What are the key bony landmarks on the scapula for OSPE spotters?',
    'What is the mechanism of isoelectric precipitation of casein at pH 4.6?'
  ];

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  if (!isOpen) return null;

  const handleSend = async (textToSend?: string) => {
    const question = textToSend || inputValue;
    if (!question.trim() || isLoading) return;

    const userMsg: Message = {
      id: `usr_${Date.now()}`,
      sender: 'user',
      text: question.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputValue('');
    setIsLoading(true);

    try {
      const response = await apiService.askAiTutor(
        question,
        currentSubject,
        currentTopic
      );

      const tutorMsg: Message = {
        id: `tut_${Date.now()}`,
        sender: 'tutor',
        text: response.answer,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, tutorMsg]);
    } catch (err) {
      const errorMsg: Message = {
        id: `err_${Date.now()}`,
        sender: 'tutor',
        text: 'I apologize, an issue occurred while retrieving the laboratory answer. Please review the high-yield identification points in the practical module.',
        timestamp: 'Just now'
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div
        id="ai-tutor-dialog"
        className="bg-white border border-[#E2E8F0] rounded-xl w-full max-w-2xl h-[85vh] max-h-[700px] flex flex-col shadow-2xl overflow-hidden"
      >
        {/* Header */}
        <div className="p-4 sm:p-5 bg-white border-b border-[#E2E8F0] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-indigo-50 text-indigo-600 border border-indigo-100 shadow-2xs">
              <Sparkles className="w-5 h-5 text-indigo-600" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-slate-900">LAB HUB AI Medical Tutor</h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-teal-50 text-teal-700 border border-teal-200 font-bold">
                  Gemini 3.7
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium">
                Instant curriculum assistance for Anatomy, Histology & Biochemistry
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-lg bg-white hover:bg-slate-50 text-slate-400 hover:text-slate-700 border border-[#E2E8F0] transition-colors shadow-2xs"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Message Log */}
        <div className="flex-1 p-4 sm:p-5 overflow-y-auto space-y-4 bg-slate-50/50">
          {messages.map(msg => {
            const isUser = msg.sender === 'user';

            return (
              <div
                key={msg.id}
                className={`flex items-start gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
              >
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 text-xs shadow-2xs ${
                    isUser
                      ? 'bg-indigo-600 text-white font-bold'
                      : 'bg-white text-teal-700 border border-[#E2E8F0]'
                  }`}
                >
                  {isUser ? <UserIcon className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>

                <div
                  className={`max-w-[82%] rounded-xl p-4 text-xs sm:text-sm leading-relaxed space-y-2 relative group shadow-xs ${
                    isUser
                      ? 'bg-indigo-600 text-white font-medium rounded-tr-none'
                      : 'bg-white text-slate-800 border border-[#E2E8F0] rounded-tl-none'
                  }`}
                >
                  <div className="whitespace-pre-wrap font-sans">{msg.text}</div>

                  <div
                    className={`flex items-center justify-between pt-1 text-[10px] ${
                      isUser ? 'text-indigo-100' : 'text-slate-400'
                    }`}
                  >
                    <span>{msg.timestamp}</span>

                    {!isUser && (
                      <button
                        type="button"
                        onClick={() => handleCopy(msg.id, msg.text)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:text-slate-700"
                        title="Copy text"
                      >
                        {copiedId === msg.id ? (
                          <Check className="w-3 h-3 text-emerald-600" />
                        ) : (
                          <Copy className="w-3 h-3 text-slate-400" />
                        )}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}

          {isLoading && (
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-white text-teal-700 border border-[#E2E8F0] flex items-center justify-center shadow-2xs">
                <Bot className="w-4 h-4 animate-spin" />
              </div>
              <div className="bg-white border border-[#E2E8F0] rounded-xl p-3.5 text-xs text-slate-500 font-medium flex items-center gap-2 shadow-xs">
                <RefreshCw className="w-3.5 h-3.5 animate-spin text-indigo-600" />
                <span>Consulting laboratory medical literature...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Prompts Bar */}
        <div className="p-3 bg-white border-t border-[#E2E8F0] flex items-center gap-2 overflow-x-auto pb-2">
          <span className="text-[10px] uppercase font-bold text-slate-400 whitespace-nowrap pl-1">
            Try:
          </span>
          {quickPrompts.map((p, i) => (
            <button
              key={i}
              type="button"
              onClick={() => handleSend(p)}
              disabled={isLoading}
              className="px-2.5 py-1 rounded-md bg-slate-50 hover:bg-slate-100 border border-[#E2E8F0] text-[11px] text-slate-600 hover:text-indigo-600 whitespace-nowrap transition-colors shadow-2xs"
            >
              {p}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-3 sm:p-4 bg-white border-t border-[#E2E8F0] flex items-center gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter') handleSend();
            }}
            placeholder="Ask about histology stains, slide morphology, biochemical tests, anatomy landmarks..."
            className="flex-1 bg-slate-50 border border-[#E2E8F0] focus:border-indigo-500 focus:bg-white rounded-lg px-4 py-2.5 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none transition-colors"
          />
          <button
            type="button"
            onClick={() => handleSend()}
            disabled={!inputValue.trim() || isLoading}
            className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white p-2.5 rounded-lg transition-all font-bold shadow-xs active:scale-95"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
