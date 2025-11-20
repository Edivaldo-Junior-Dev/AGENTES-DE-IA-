import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage, Sender, ChatInterfaceProps } from '../types';
import ChatMessageItem from './ChatMessageItem';
import { sendMessageToAgent } from '../services/geminiService';
import { EDIVALDO_RESUME } from '../constants';
import { feedbackService } from '../services/feedbackService';

const SUGGESTIONS = [
  { text: "Quais são suas principais habilidades?", icon: "⚡", color: "text-yellow-400", shadow: "shadow-yellow-500/20", bg: "bg-yellow-500/10" },
  { text: "Fale sobre o projeto Gerenciador Web.", icon: "🚀", color: "text-blue-400", shadow: "shadow-blue-500/20", bg: "bg-blue-500/10" },
  { text: "Por que devo te contratar?", icon: "🤝", color: "text-emerald-400", shadow: "shadow-emerald-500/20", bg: "bg-emerald-500/10" },
  { text: "Tem experiência com trabalho remoto?", icon: "🌎", color: "text-cyan-400", shadow: "shadow-cyan-500/20", bg: "bg-cyan-500/10" },
  { text: "Quais frameworks Python você usa?", icon: "🐍", color: "text-green-400", shadow: "shadow-green-500/20", bg: "bg-green-500/10" },
  { text: "Fale sobre sua liderança e certificado na APVO.", icon: "🎖️", color: "text-orange-400", shadow: "shadow-orange-500/20", bg: "bg-orange-500/10" },
];

const ChatInterface: React.FC<ChatInterfaceProps> = ({ pendingQuery, onClearPendingQuery, onReset }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      text: "Olá! Eu sou o Agente de Carreira do Edivaldo.Junior. Fui treinado com todos os dados do currículo dele. Como posso ajudar a entender melhor o perfil profissional dele hoje?",
      sender: Sender.AGENT,
      timestamp: new Date(),
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Handle query coming from Sidebar
  useEffect(() => {
    if (pendingQuery) {
      handleSend(pendingQuery);
      onClearPendingQuery();
    }
  }, [pendingQuery]);

  // Carousel Auto-Scroll Logic
  useEffect(() => {
    const container = carouselRef.current;
    if (!container) return;

    let animationId: number;
    
    const scroll = () => {
      if (container && !container.matches(':hover')) {
        container.scrollLeft += 0.5; // Speed
        
        // Infinite Loop Logic: Reset when we've scrolled past the first set of items
        // We have 3 sets. When we reach 1/3 of the scrollWidth, we reset to 0.
        if (container.scrollLeft >= container.scrollWidth / 3) {
          container.scrollLeft = 0;
        }
      }
      animationId = requestAnimationFrame(scroll);
    };

    animationId = requestAnimationFrame(scroll);

    return () => cancelAnimationFrame(animationId);
  }, []);

  const scrollCarousel = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = 300;
      carouselRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const handleFeedback = (messageId: string, feedbackType: 'positive' | 'negative') => {
    const msgIndex = messages.findIndex(m => m.id === messageId);
    if (msgIndex > 0) {
        const agentResponse = messages[msgIndex];
        const userRequest = messages[msgIndex - 1];
        
        feedbackService.logFeedback({
            userQuery: userRequest.text,
            agentResponse: agentResponse.text,
            feedbackType: feedbackType,
            timestamp: new Date()
        });
    }

    setMessages(prevMessages => 
      prevMessages.map(msg => 
        msg.id === messageId ? { ...msg, feedback: feedbackType } : msg
      )
    );
  };

  const handleSend = async (text: string = input) => {
    if (!text.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      text: text,
      sender: Sender.USER,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);
    setShowSuggestions(false);

    const thinkingId = 'thinking-' + Date.now();
    setMessages(prev => [...prev, {
      id: thinkingId,
      text: '',
      sender: Sender.AGENT,
      timestamp: new Date(),
      isThinking: true
    }]);

    try {
      const responseText = await sendMessageToAgent(text);

      setMessages(prev => {
        const filtered = prev.filter(m => m.id !== thinkingId);
        return [...filtered, {
          id: (Date.now() + 1).toString(),
          text: responseText,
          sender: Sender.AGENT,
          timestamp: new Date()
        }];
      });
    } catch (error) {
      setMessages(prev => prev.filter(m => m.id !== thinkingId));
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const shouldShowCarousel = messages.length < 3 || showSuggestions;

  return (
    <div className="flex flex-col flex-1 h-full bg-slate-950/90 backdrop-blur-sm relative transition-colors duration-500">
      {/* Header for Mobile */}
      <header className="md:hidden flex items-center justify-between p-4 border-b border-slate-800 bg-slate-900/90 backdrop-blur-md">
         <div className="flex items-center">
           <img 
             src="https://github.com/Edivaldo-Junior-Dev.png" 
             alt="Edivaldo.Junior" 
             className="w-10 h-10 rounded-full mr-3 object-cover border border-emerald-500"
             onError={(e) => {
               (e.target as HTMLImageElement).src = "https://ui-avatars.com/api/?name=Edivaldo.Junior&background=10b981&color=fff";
             }}
           />
           <div className="flex flex-col">
             <h1 className="text-sm font-bold text-white leading-tight">Agente Edivaldo.Junior</h1>
             <button 
               onClick={() => setShowHelpModal(true)}
               className="text-[10px] text-emerald-400 hover:text-emerald-300 flex items-center gap-1 mt-0.5 transition-colors"
             >
               <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
               </svg>
               Como utilizar?
             </button>
           </div>
         </div>
         <div className="flex items-center gap-2">
           <a 
              href={EDIVALDO_RESUME.personalInfo.contact.github} 
              target="_blank" 
              rel="noreferrer"
              className="p-2 text-slate-400 hover:text-white"
              title="GitHub"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.223.694.825.576C20.566 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
              </svg>
           </a>
           <a 
              href={EDIVALDO_RESUME.personalInfo.contact.linkedin} 
              target="_blank" 
              rel="noreferrer"
              className="p-2 text-blue-400 hover:text-blue-300"
              title="LinkedIn"
            >
              <svg fill="currentColor" viewBox="0 0 24 24" className="h-5 w-5">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
           </a>
           {onReset && (
             <button onClick={onReset} className="p-2 text-slate-400 hover:text-white" title="Início">
               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
               </svg>
             </button>
           )}
         </div>
      </header>

      {/* Help Modal */}
      {showHelpModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-md w-full shadow-2xl transform transition-all scale-100">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <span className="text-emerald-500">🤖</span> Career Agent
                </h2>
                <button 
                  onClick={() => setShowHelpModal(false)}
                  className="text-slate-500 hover:text-white transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="space-y-4 text-sm text-slate-300">
                <p>
                  Bem-vindo! Este é um agente autônomo treinado para responder perguntas sobre a carreira de <strong>Edivaldo.Junior</strong>.
                </p>
                
                <div className="space-y-2">
                  <h3 className="font-semibold text-emerald-400 text-xs uppercase tracking-wide">Como utilizar:</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="bg-slate-800 p-1 rounded text-emerald-500">💬</span>
                      <span><strong>Converse Naturalmente:</strong> Pergunte como se estivesse entrevistando o candidato. Ex: "Você tem experiência com Django?"</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="bg-slate-800 p-1 rounded text-blue-400">💡</span>
                      <span><strong>Sugestões:</strong> Use o carrossel acima da caixa de texto para ver perguntas recomendadas.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="bg-slate-800 p-1 rounded text-yellow-400">👍</span>
                      <span><strong>Feedback:</strong> Avalie as respostas do agente clicando nos ícones de "Joinha" após cada mensagem.</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-slate-800/50 p-3 rounded-lg border border-slate-700 mt-4">
                   <p className="text-[10px] text-slate-400 text-center">
                     Este sistema utiliza Inteligência Artificial (Gemini 2.5) e pode cometer erros. Para informações críticas, consulte o LinkedIn oficial.
                   </p>
                </div>
              </div>

              <button 
                onClick={() => setShowHelpModal(false)}
                className="w-full mt-6 bg-emerald-600 hover:bg-emerald-500 text-white py-2 rounded-lg font-medium transition-colors"
              >
                Entendi, vamos começar!
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 md:p-8 scroll-smooth">
        <div className="max-w-3xl mx-auto">
           {messages.map(msg => (
             <ChatMessageItem 
               key={msg.id} 
               message={msg} 
               onFeedback={handleFeedback}
             />
           ))}
           <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="p-4 md:p-6 bg-slate-900/80 border-t border-slate-800 backdrop-blur-md shadow-[0_-4px_20px_rgba(0,0,0,0.3)]">
        <div className="max-w-3xl mx-auto space-y-4">
          
          {/* Carousel Suggestions */}
          {shouldShowCarousel && (
            <div className="w-full overflow-hidden py-2 animate-fade-in-up relative group/carousel">
              {/* Left Arrow */}
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  scrollCarousel('left');
                }}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-20 p-2 bg-slate-900/80 hover:bg-emerald-500 text-white rounded-full shadow-lg backdrop-blur-sm border border-slate-600 transition-all hover:scale-110"
                aria-label="Anterior"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <div className="mask-fade w-full overflow-hidden">
                <div 
                  ref={carouselRef}
                  className="flex w-full overflow-x-hidden whitespace-nowrap py-2"
                >
                  {/* Duplicate 3 times for "infinite" loop effect */}
                  {[...SUGGESTIONS, ...SUGGESTIONS, ...SUGGESTIONS].map((sug, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSend(sug.text)}
                      className="inline-flex items-center gap-4 mx-3 pl-3 pr-6 py-4 bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700/50 hover:border-emerald-500/30 rounded-2xl transition-all duration-300 min-w-[260px] text-left shadow-lg hover:shadow-emerald-500/10 hover:-translate-y-0.5"
                    >
                      {/* Icon Container */}
                      <div className={`flex-shrink-0 w-12 h-12 rounded-2xl ${sug.bg} flex items-center justify-center text-2xl shadow-lg ${sug.shadow} group-hover:scale-105 transition-transform duration-300`}>
                        {sug.icon}
                      </div>
                      
                      {/* Text Content */}
                      <div className="flex flex-col z-10 whitespace-normal">
                        <span className={`text-sm font-bold ${sug.color} transition-colors line-clamp-2 leading-tight`}>
                          {sug.text}
                        </span>
                        <span className="text-[10px] text-slate-500 group-hover:text-slate-400 mt-1 font-medium uppercase tracking-wide">
                          Clique para perguntar
                        </span>
                      </div>

                       {/* Hover Glow Effect */}
                       <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Right Arrow */}
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  scrollCarousel('right');
                }}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-20 p-2 bg-slate-900/80 hover:bg-emerald-500 text-white rounded-full shadow-lg backdrop-blur-sm border border-slate-600 transition-all hover:scale-110"
                aria-label="Próximo"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          )}

          <div className="relative flex items-end gap-2 bg-slate-900 p-2 rounded-xl border border-slate-700 focus-within:border-emerald-500 focus-within:ring-1 focus-within:ring-emerald-500/50 transition-all shadow-xl">
            
            {/* Central Menu Button */}
            <button
               onClick={() => setShowSuggestions(!showSuggestions)}
               className={`p-2 rounded-lg transition-colors mb-0.5 ${showSuggestions ? 'bg-emerald-900/50 text-emerald-400' : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800'}`}
               title="Menu de Sugestões"
            >
               <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
               </svg>
            </button>

            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Pergunte sobre minha experiência em Python..."
              className="w-full bg-transparent text-slate-200 text-sm p-2 max-h-32 min-h-[44px] resize-none outline-none placeholder:text-slate-600"
              rows={1}
              style={{ height: 'auto', overflow: 'hidden' }}
              onInput={(e) => {
                 const target = e.target as HTMLTextAreaElement;
                 target.style.height = 'auto';
                 target.style.height = target.scrollHeight + 'px';
              }}
            />
            <button
              onClick={() => handleSend()}
              disabled={!input.trim() || isLoading}
              className={`p-2 rounded-lg transition-all duration-200 mb-0.5 ${
                input.trim() && !isLoading
                  ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-900/20'
                  : 'bg-slate-800 text-slate-600 cursor-not-allowed'
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
              </svg>
            </button>
          </div>
          <p className="text-center text-[10px] text-slate-600">
            Agente virtual pode cometer erros. Verifique as informações importantes no <a href={EDIVALDO_RESUME.personalInfo.contact.linkedin} target="_blank" rel="noreferrer" className="underline hover:text-emerald-500">LinkedIn</a>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;