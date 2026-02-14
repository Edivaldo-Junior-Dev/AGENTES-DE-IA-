
import React, { useState } from 'react';
import { ChatMessage, Sender } from '../types';
import ReactMarkdown from 'react-markdown';

interface Props {
  message: ChatMessage;
  onFeedback?: (id: string, type: 'positive' | 'negative') => void;
}

const ChatMessageItem: React.FC<Props> = ({ message, onFeedback }) => {
  const [copied, setCopied] = useState(false);
  const isUser = message.sender === Sender.USER;
  const isSystem = message.sender === Sender.SYSTEM;

  const handleCopy = () => {
    navigator.clipboard.writeText(message.text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

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
        
        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center overflow-hidden ${
          isUser ? 'bg-indigo-600 shadow-indigo-900/40' : 'bg-slate-800 border border-slate-700'
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
                 (e.target as HTMLImageElement).src = "https://ui-avatars.com/api/?name=E.J&background=1e293b&color=fff";
               }}
             />
          )}
        </div>

        <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} group relative min-w-0`}>
          <div className={`px-5 py-3 rounded-2xl shadow-sm text-sm leading-relaxed transition-all w-full ${
            isUser 
              ? 'bg-indigo-600 text-white rounded-tr-none' 
              : 'bg-slate-800/80 backdrop-blur-sm text-slate-200 border border-slate-700 rounded-tl-none'
          }`}>
            
            {/* Render Attachments */}
            {message.attachments && message.attachments.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-3">
                {message.attachments.map((att) => (
                  <div key={att.id} className="relative group/att rounded-lg overflow-hidden border border-white/10">
                    {att.type === 'image' ? (
                      <img src={att.url} alt="Attachment" className="max-w-[200px] max-h-[200px] object-cover" />
                    ) : att.type === 'audio' ? (
                      <audio controls src={att.url} className="w-[200px] h-10" />
                    ) : (
                      <div className="flex items-center gap-2 p-3 bg-slate-900/50">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <span className="text-xs truncate max-w-[120px]">{att.name}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {message.isThinking ? (
              <div className="flex gap-1.5 h-5 items-center px-2">
                <div className="w-1.5 h-1.5 bg-current rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-1.5 h-1.5 bg-current rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-1.5 h-1.5 bg-current rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            ) : (
              <div className="prose prose-invert prose-sm max-w-none break-words">
                <ReactMarkdown>{message.text}</ReactMarkdown>
              </div>
            )}
          </div>
          
          <div className="flex items-center justify-between w-full mt-1.5 px-1 opacity-60 group-hover:opacity-100 transition-opacity">
            <span className="text-[10px] text-slate-500 font-medium">
              {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>

            <div className="flex items-center gap-2">
               {!isUser && !message.isThinking && (
                 <button 
                   onClick={handleCopy}
                   className="p-1 rounded hover:bg-slate-800 text-slate-500 hover:text-slate-200 transition-colors"
                   title="Copiar texto"
                 >
                   {copied ? (
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                     </svg>
                   ) : (
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                     </svg>
                   )}
                 </button>
               )}

              {!isUser && !message.isThinking && onFeedback && (
                <div className="flex items-center gap-1">
                  <button 
                    onClick={() => onFeedback(message.id, 'positive')}
                    className={`p-1 rounded transition-colors ${message.feedback === 'positive' ? 'text-emerald-400' : 'text-slate-600 hover:text-emerald-500'}`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                    </svg>
                  </button>
                  <button 
                    onClick={() => onFeedback(message.id, 'negative')}
                    className={`p-1 rounded transition-colors ${message.feedback === 'negative' ? 'text-red-400' : 'text-slate-600 hover:text-red-500'}`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.095c.5 0 .905-.405.905-.905 0-.714.211-1.412.608-2.006L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5" />
                    </svg>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatMessageItem;
