
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ChatMessage, Sender, ChatInterfaceProps, Attachment } from '../types';
import ChatMessageItem from './ChatMessageItem';
import { sendMessageToAgent } from '../services/geminiService';
import { feedbackService } from '../services/feedbackService';

const PUBLIC_SUGGESTIONS = [
  { text: "Quais são suas principais habilidades?", icon: "⚡" },
  { text: "Fale sobre sua experiência na Grupo Laug.", icon: "💼" },
  { text: "Quais projetos de IA você já criou?", icon: "🤖" },
];

const CONSULTANT_SUGGESTIONS = [
  { text: "Quais competências destacar para a vaga AWS?", icon: "☁️" },
  { text: "Ajude-me a preencher o formulário da Escola da Nuvem.", icon: "📝" },
  { text: "Simule uma entrevista técnica para júnior.", icon: "🎯" },
];

const ChatInterface: React.FC<ChatInterfaceProps> = ({ pendingQuery, onClearPendingQuery, onReset, isConsultantMode = false }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setMessages([{
      id: 'welcome-' + (isConsultantMode ? 'priv' : 'pub'),
      text: isConsultantMode 
        ? "Olá Edivaldo! Módulo Consultor Ativo. Como posso ajudar com sua estratégia de carreira e formulário AWS hoje?"
        : "Olá! Sou o Agente de Carreira do Edivaldo. Pergunte-me sobre sua experiência, projetos ou habilidades técnicas! Pode me enviar prints, fotos ou PDFs.",
      sender: Sender.AGENT,
      timestamp: new Date(),
    }]);
    setAttachments([]);
  }, [isConsultantMode]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (pendingQuery) {
      handleSend(pendingQuery);
      onClearPendingQuery();
    }
  }, [pendingQuery]);

  // --- Funções de Manipulação de Arquivos ---

  const processFiles = useCallback((files: FileList | File[]) => {
    const newAttachments: Attachment[] = [];
    Array.from(files).forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          const type = file.type.startsWith('image/') ? 'image' : file.type.startsWith('audio/') ? 'audio' : 'file';
          setAttachments(prev => [...prev, {
            id: Math.random().toString(36).substr(2, 9),
            type,
            url: e.target!.result as string,
            mimeType: file.type,
            name: file.name
          }]);
        }
      };
      reader.readAsDataURL(file);
    });
  }, []);

  const handlePaste = useCallback((e: React.ClipboardEvent) => {
    if (e.clipboardData.files.length > 0) {
      e.preventDefault();
      processFiles(e.clipboardData.files);
    }
  }, [processFiles]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files.length > 0) {
      processFiles(e.dataTransfer.files);
    }
  }, [processFiles]);

  const removeAttachment = (id: string) => {
    setAttachments(prev => prev.filter(att => att.id !== id));
  };

  // --- Envio de Mensagem ---

  const handleSend = async (text: string = input) => {
    if ((!text.trim() && attachments.length === 0) || isLoading) return;

    const currentAttachments = [...attachments]; // Copia para envio
    
    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      text: text,
      sender: Sender.USER,
      timestamp: new Date(),
      attachments: currentAttachments
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setAttachments([]); // Limpa anexos imediatamente
    setIsLoading(true);

    const thinkingId = 'thinking-' + Date.now();
    setMessages(prev => [...prev, {
      id: thinkingId,
      text: '',
      sender: Sender.AGENT,
      timestamp: new Date(),
      isThinking: true
    }]);

    try {
      const responseText = await sendMessageToAgent(text, isConsultantMode, currentAttachments);

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

  const handleFeedback = (id: string, type: 'positive' | 'negative') => {
    setMessages(prev => prev.map(m => m.id === id ? { ...m, feedback: type } : m));
    
    const msg = messages.find(m => m.id === id);
    const lastUserMsg = [...messages].reverse().find(m => m.sender === Sender.USER);

    if (msg && lastUserMsg) {
      feedbackService.logFeedback({
        timestamp: new Date(),
        feedbackType: type,
        userQuery: lastUserMsg.text,
        agentResponse: msg.text
      });
    }
  };

  const suggestions = isConsultantMode ? CONSULTANT_SUGGESTIONS : PUBLIC_SUGGESTIONS;

  return (
    <div 
      className={`flex flex-col flex-1 h-full relative transition-all duration-700 ${isConsultantMode ? 'bg-slate-900/40' : 'bg-slate-950/80'}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      
      {/* Overlay de Drag & Drop */}
      {isDragging && (
        <div className="absolute inset-0 z-50 bg-blue-500/20 backdrop-blur-sm border-2 border-dashed border-blue-400 flex items-center justify-center animate-pulse">
          <div className="bg-slate-900 p-6 rounded-2xl shadow-2xl pointer-events-none">
            <p className="text-xl font-bold text-blue-200 text-center">Solte os arquivos aqui</p>
          </div>
        </div>
      )}

      {isConsultantMode && (
        <div className="bg-blue-600/10 border-b border-blue-500/20 px-6 py-2 flex items-center justify-between backdrop-blur-md">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
            <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">Estrategista de Carreira Pessoal Ativo</span>
          </div>
          <button onClick={onReset} className="text-[10px] text-blue-400 hover:text-white transition-colors uppercase font-bold">Encerrar Sessão</button>
        </div>
      )}

      <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-2">
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

      <div className="p-4 md:p-6 border-t border-slate-800 bg-slate-900/60 backdrop-blur-xl">
        <div className="max-w-3xl mx-auto space-y-4">
          
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {suggestions.map((sug, i) => (
              <button
                key={i}
                onClick={() => handleSend(sug.text)}
                className={`flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-full border border-slate-700 hover:border-blue-500/50 text-xs text-slate-300 transition-all hover:bg-slate-800 ${isConsultantMode ? 'hover:border-blue-500 bg-blue-500/5' : 'hover:border-emerald-500 bg-emerald-500/5'}`}
              >
                <span>{sug.icon}</span>
                {sug.text}
              </button>
            ))}
          </div>

          {/* Área de Preview dos Anexos */}
          {attachments.length > 0 && (
            <div className="flex gap-3 overflow-x-auto py-2 px-1">
              {attachments.map(att => (
                <div key={att.id} className="relative flex-shrink-0 group">
                  {att.type === 'image' ? (
                    <img src={att.url} alt="preview" className="h-16 w-16 object-cover rounded-lg border border-slate-600" />
                  ) : (
                    <div className="h-16 w-16 bg-slate-800 rounded-lg border border-slate-600 flex items-center justify-center">
                      <span className="text-2xl">{att.type === 'audio' ? '🎵' : '📄'}</span>
                    </div>
                  )}
                  <button 
                    onClick={() => removeAttachment(att.id)}
                    className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-[10px] hover:bg-red-600 transition-colors"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}

          <div className={`flex items-end gap-2 p-2 rounded-2xl border transition-all duration-300 ${isConsultantMode ? 'bg-slate-800 border-blue-500/30 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500/20' : 'bg-slate-900 border-slate-700 focus-within:border-emerald-500 focus-within:ring-1 focus-within:ring-emerald-500/20'}`}>
            
            {/* Botão de Anexo */}
            <input 
              type="file" 
              multiple 
              className="hidden" 
              ref={fileInputRef}
              onChange={(e) => e.target.files && processFiles(e.target.files)} 
            />
            <button 
              onClick={() => fileInputRef.current?.click()}
              className="p-3 text-slate-400 hover:text-white transition-colors"
              title="Anexar arquivo, imagem ou áudio"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 6.375L8.557 17.318a1.5 1.5 0 01-2.121-2.121l9.536-9.536" />
              </svg>
            </button>

            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onPaste={handlePaste}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder={isConsultantMode ? "Cole uma imagem (Ctrl+V) ou digite..." : "Envie prints, PDFs ou pergunte algo..."}
              className="w-full bg-transparent text-slate-200 text-sm p-3 max-h-32 min-h-[48px] resize-none outline-none"
              rows={1}
            />
            <button
              onClick={() => handleSend()}
              disabled={(!input.trim() && attachments.length === 0) || isLoading}
              className={`p-3 rounded-xl transition-all ${isConsultantMode ? 'bg-blue-600 hover:bg-blue-500' : 'bg-emerald-600 hover:bg-emerald-500'} text-white shadow-lg disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
