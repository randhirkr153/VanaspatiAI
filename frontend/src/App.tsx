import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Chatbot } from './components/Chatbot';
import { Home } from './pages/Home';
import { Detect } from './pages/Detect';
import { History } from './pages/History';
import { About } from './pages/About';
import { ModelInfoPage } from './pages/ModelInfo';
import { ChatContext } from './types/chat';

export const App: React.FC = () => {
  const [activeChatContext, setActiveChatContext] = useState<ChatContext | null>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const handleOpenChatWithContext = (ctx: ChatContext, openDrawer: boolean = true) => {
    setActiveChatContext(ctx);
    if (openDrawer) {
      setIsChatOpen(true);
    }
  };

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-[#F8FAF7]">
        <Navbar />

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/detect"
              element={<Detect onOpenChatWithContext={handleOpenChatWithContext} />}
            />
            <Route path="/history" element={<History />} />
            <Route path="/about" element={<About />} />
            <Route path="/model" element={<ModelInfoPage />} />
          </Routes>
        </main>

        <Footer />

        <Chatbot
          currentContext={activeChatContext}
          isOpenExternal={isChatOpen}
          onCloseExternal={() => setIsChatOpen(false)}
        />
      </div>
    </Router>
  );
};

export default App;
