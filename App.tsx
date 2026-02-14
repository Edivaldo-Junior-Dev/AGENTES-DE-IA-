
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import ChatInterface from './components/ChatInterface';
import Background from './components/Background';
import Login from './components/Login';

const App: React.FC = () => {
  const [chatKey, setChatKey] = useState(0);
  const [pendingQuery, setPendingQuery] = useState<string | null>(null);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isConsultantMode, setIsConsultantMode] = useState(false);

  const handleReset = () => {
    setChatKey(prev => prev + 1);
    setPendingQuery(null);
    setIsConsultantMode(false);
  };

  const handleSidebarQuery = (query: string) => {
    setPendingQuery(query);
  };

  const handleLoginSuccess = (success: boolean) => {
    if (success) {
      setIsConsultantMode(true);
      setIsLoginOpen(false);
      setChatKey(prev => prev + 1);
    }
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-slate-950">
      <Background variant={isConsultantMode ? 'consultant' : 'public'} />
      
      {isLoginOpen && (
        <Login onLogin={handleLoginSuccess} onClose={() => setIsLoginOpen(false)} />
      )}

      <div className="relative z-10 flex w-full h-full transition-all duration-700">
        <Sidebar 
          onQuery={handleSidebarQuery} 
          onReset={handleReset} 
          onOpenConsultant={() => isConsultantMode ? handleReset() : setIsLoginOpen(true)}
        />
        <ChatInterface 
          key={chatKey} 
          pendingQuery={pendingQuery}
          onClearPendingQuery={() => setPendingQuery(null)}
          onReset={handleReset}
          isConsultantMode={isConsultantMode}
        />
      </div>

      {isConsultantMode && (
        <div className="fixed top-6 right-6 z-50 pointer-events-none animate-fade-in">
          <div className="bg-blue-600/20 backdrop-blur-md text-blue-400 px-5 py-2 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] shadow-2xl border border-blue-500/40 flex items-center gap-3">
            <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-ping"></span>
            Ambiente Estratégico Seguro
          </div>
        </div>
      )}
    </div>
  );
};

export default App;