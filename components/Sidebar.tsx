
import React from 'react';
import { EDIVALDO_RESUME } from '../constants';
import { SidebarProps } from '../types';

const Sidebar: React.FC<SidebarProps> = ({ onQuery, onReset, onOpenConsultant }) => {
  return (
    <aside className="hidden md:flex flex-col w-80 h-full bg-slate-900 border-r border-slate-800 overflow-y-auto">
      <div className="p-6 border-b border-slate-800">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.5)]">
             <img src="https://github.com/Edivaldo-Junior-Dev.png" alt="Profile" className="w-full h-full object-cover" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-white leading-tight">{EDIVALDO_RESUME.personalInfo.name}</h2>
            <p className="text-[9px] text-blue-400 font-bold uppercase tracking-tighter mt-1">Dev Python Jr | Consultor | Telecom</p>
          </div>
        </div>
        
        <button 
          onClick={onOpenConsultant}
          className="w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-blue-700 to-indigo-900 hover:from-blue-600 hover:to-indigo-800 text-white text-xs font-bold rounded-xl transition-all shadow-lg shadow-blue-900/40 mb-4 border border-blue-400/20 group"
        >
          <span className="text-lg group-hover:scale-110 transition-transform">💎</span>
          Consultoria de Carreira
        </button>

        <div className="flex gap-2">
          <button onClick={onReset} className="flex-1 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs rounded-lg border border-slate-700 transition-colors">
            🔄 Reiniciar
          </button>
        </div>
      </div>

      <div className="flex-1 p-4">
        <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4 px-2">Base de Conhecimento (RAG)</h3>
        <div className="space-y-1">
          {EDIVALDO_RESUME.sections.map((section, index) => (
            <button 
              key={index} 
              onClick={() => onQuery(section.query)}
              className="w-full group flex items-start gap-3 p-3 rounded-xl hover:bg-slate-800 transition-all text-left border border-transparent hover:border-slate-700"
            >
              <span className="text-xl">{section.icon}</span>
              <div>
                <h4 className="text-sm font-medium text-slate-200 group-hover:text-blue-400 transition-colors">{section.title}</h4>
                <p className="text-[10px] text-slate-500">Dados atualizados</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="p-4 border-t border-slate-800 bg-slate-900/50">
        <div className="p-3 bg-slate-800/40 rounded-xl border border-slate-700/50">
           <p className="text-[10px] text-slate-500 text-center uppercase tracking-widest font-bold mb-2">AWS Cloud Skills</p>
           <div className="w-full bg-slate-700 h-1.5 rounded-full overflow-hidden">
              <div className="bg-emerald-500 h-full w-[100%] shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
           </div>
           <p className="text-[9px] text-emerald-400 text-right mt-1 font-bold">AWS Re/Start: Concluído (2026)</p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;