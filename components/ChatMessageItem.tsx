import React from 'react';
import { ChatMessage, Sender } from '../types';
import ReactMarkdown from 'react-markdown';

interface Props {
  message: ChatMessage;
  onFeedback?: (id: string, type: 'positive' | 'negative') => void;
}

const ChatMessageItem: React.FC<Props> = ({ message, onFeedback }) => {
  const isUser = message.sender === Sender.USER;
  const isSystem = message.sender === Sender.SYSTEM;

  if (isSystem) {
    return (
      <div className="flex justify-center my-4 animate-fade-in">
        <span className="px-3 py-1 text-xs font-medium text-slate-500 bg-slate-900/50 rounded-full border border-slate-800">
          {message.text}
        </span>
      </div>
    );
  }

  return (
    <div className={`flex w-full ${isUser ? 'justify-end' : 'justify-start'} mb-6 animate-slide-up`}>
      <div className={`flex max-w-[85%] md:max-w-[75%] gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
        
        {/* Avatar */}
        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center overflow-hidden ${
          isUser ? 'bg-indigo-600' : 'bg-emerald-600 border border-emerald-500'
        } shadow-lg`}>
          {isUser ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          ) : (
            <img 
               src="https://github.com/Edivaldo-Junior-Dev.png" 
               alt="Agente" 
               className="w-full h-full object-cover"
               onError={(e) => {
                 (e.target as HTMLImageElement).src = "https://ui-avatars.com/api/?name=Edivaldo.Junior&background=10b981&color=fff";
               }}
             />
          )}
        </div>

        {/* Bubble & Actions */}
        <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
          <div className={`px-5 py-3 rounded-2xl shadow-sm text-sm leading-relaxed ${
            isUser 
              ? 'bg-indigo-600 text-white rounded-tr-none' 
              : 'bg-slate-800 text-slate-200 border border-slate-700 rounded-tl-none'
          }`}>
            {message.isThinking ? (
              <div className="flex gap-1 h-5 items-center px-2">
                <div className="w-1.5 h-1.5 bg-current rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-1.5 h-1.5 bg-current rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-1.5 h-1.5 bg-current rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            ) : (
              <div className="prose prose-invert prose-sm max-w-none">
                <ReactMarkdown>{message.text}</ReactMarkdown>
              </div>
            )}
          </div>
          
          <div className="flex items-center justify-between w-full mt-1 px-1">
            <span className="text-[10px] text-slate-500">
              {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              {!isUser && !message.isThinking && " • Agente v1.0"}
            </span>

            {/* Feedback Buttons (Only for Agent) */}
            {!isUser && !message.isThinking && onFeedback && (
              <div className="flex items-center gap-2 ml-2">
                <button 
                  onClick={() => onFeedback(message.id, 'positive')}
                  className={`p-1 rounded transition-colors ${
                    message.feedback === 'positive' 
                      ? 'text-emerald-400 bg-emerald-400/10' 
                      : 'text-slate-600 hover:text-emerald-400'
                  }`}
                  title="Resposta útil"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill={message.feedback === 'positive' ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                  </svg>
                </button>
                <button 
                  onClick={() => onFeedback(message.id, 'negative')}
                  className={`p-1 rounded transition-colors ${
                    message.feedback === 'negative' 
                      ? 'text-red-400 bg-red-400/10' 
                      : 'text-slate-600 hover:text-red-400'
                  }`}
                  title="Resposta não útil"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill={message.feedback === 'negative' ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.095c.5 0 .905-.405.905-.905 0-.714.211-1.412.608-2.006L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5" />
                  </svg>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatMessageItem;