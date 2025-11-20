import React, { useState } from 'react';
import { EDIVALDO_RESUME } from '../constants';
import { SidebarProps } from '../types';

const Sidebar: React.FC<SidebarProps> = ({ onQuery, onReset }) => {
  const [showHelp, setShowHelp] = useState(false);

  return (
    <aside className="hidden md:flex flex-col w-80 h-full bg-slate-900 border-r border-slate-800 overflow-y-auto">
      <div className="p-6 border-b border-slate-800">
        <div className="flex items-center gap-3 mb-4">
          <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-emerald-500 shadow-lg shadow-emerald-500/20">
             <img 
               src="https://github.com/Edivaldo-Junior-Dev.png" 
               alt="Edivaldo.Junior Profile" 
               className="w-full h-full object-cover"
               onError={(e) => {
                 (e.target as HTMLImageElement).src = "https://ui-avatars.com/api/?name=Edivaldo.Junior&background=10b981&color=fff";
               }}
             />
             <div className="absolute bottom-0 right-0 w-4 h-4 bg-emerald-500 border-2 border-slate-900 rounded-full"></div>
          </div>
          <div>
            <h2 className="text-lg font-bold text-white leading-tight">{EDIVALDO_RESUME.personalInfo.name}</h2>
            <p className="text-xs text-emerald-400 mt-1 font-medium">Agente Autônomo v1.0</p>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="flex gap-2 mb-4">
          <button 
            onClick={onReset}
            className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium rounded-lg transition-colors border border-slate-700"
            title="Reiniciar conversa"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Início
          </button>
          <button 
            onClick={() => setShowHelp(!showHelp)}
            className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 text-xs font-medium rounded-lg transition-colors border ${showHelp ? 'bg-emerald-900/30 border-emerald-500/50 text-emerald-400' : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'}`}
            title="Ajuda"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Ajuda
          </button>
          <a 
            href={EDIVALDO_RESUME.personalInfo.contact.github} 
            target="_blank" 
            rel="noreferrer"
            className="flex items-center justify-center px-3 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-medium rounded-lg transition-colors border border-slate-700"
            title="GitHub Profile"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5">
              <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.223.694.825.576C20.566 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
            </svg>
          </a>
          <a 
            href={EDIVALDO_RESUME.personalInfo.contact.linkedin} 
            target="_blank" 
            rel="noreferrer"
            className="flex items-center justify-center px-3 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-medium rounded-lg transition-colors border border-blue-500 shadow-lg shadow-blue-900/20"
            title="LinkedIn Profile"
          >
            <svg fill="currentColor" viewBox="0 0 24 24" className="h-3.5 w-3.5">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
            </svg>
          </a>
        </div>

        {showHelp && (
          <div className="mb-4 p-3 bg-slate-800/50 rounded-lg border border-slate-700 animate-fade-in">
            <p className="text-[10px] text-slate-400 leading-relaxed">
              Este agente foi treinado com o currículo do Edivaldo. Clique nos itens abaixo para perguntar sobre tópicos específicos ou digite sua dúvida no chat.
            </p>
          </div>
        )}

        <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">
          {EDIVALDO_RESUME.personalInfo.role}
        </p>
      </div>

      <div className="flex-1 p-4 space-y-6">
        <div>
          <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3 px-2">Base de Conhecimento (RAG)</h3>
          <div className="space-y-2">
            {EDIVALDO_RESUME.sections.map((section, index) => (
              <button 
                key={index} 
                onClick={() => onQuery(section.query || `Fale sobre: ${section.title}`)}
                className="w-full group flex items-start gap-3 p-2 rounded-lg hover:bg-slate-800 hover:shadow-md border border-transparent hover:border-slate-700 transition-all cursor-pointer text-left"
              >
                <span className="text-lg group-hover:scale-110 transition-transform duration-200">{section.icon}</span>
                <div>
                  <h4 className="text-sm font-medium text-slate-200 group-hover:text-emerald-400 transition-colors">
                    {section.title}
                  </h4>
                  <p className="text-[10px] text-slate-500 line-clamp-1 mt-0.5 group-hover:text-slate-400">
                    Clique para visualizar
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3 px-2">Ferramentas Ativas</h3>
          <div className="grid gap-2">
             <div className="flex items-center gap-2 p-2 rounded bg-slate-800/50 border border-slate-700/50 text-xs text-slate-300">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                Memória Vetorial (Currículo)
             </div>
             <div className="flex items-center gap-2 p-2 rounded bg-slate-800/30 border border-slate-700/30 text-xs text-slate-500">
                <span className="w-2 h-2 rounded-full bg-yellow-500"></span>
                Análise de Compatibilidade
             </div>
          </div>
        </div>
      </div>

      <div className="p-4 border-t border-slate-800">
        <div className="text-[10px] text-center text-slate-600">
          Desenvolvido com React, Tailwind & Gemini 2.5
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;