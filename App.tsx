import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import ChatInterface from './components/ChatInterface';
import Background from './components/Background';

const App: React.FC = () => {
  const [chatKey, setChatKey] = useState(0);
  const [pendingQuery, setPendingQuery] = useState<string | null>(null);

  const handleReset = () => {
    setChatKey(prev => prev + 1);
    setPendingQuery(null);
  };

  const handleSidebarQuery = (query: string) => {
    setPendingQuery(query);
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-slate-950">
      <Background />
      
      <div className="relative z-10 flex w-full h-full">
        <Sidebar onQuery={handleSidebarQuery} onReset={handleReset} />
        <ChatInterface 
          key={chatKey} 
          pendingQuery={pendingQuery}
          onClearPendingQuery={() => setPendingQuery(null)}
          onReset={handleReset}
        />
      </div>
    </div>
  );
};

export default App;