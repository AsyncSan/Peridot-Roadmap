import React, { useState, useEffect } from 'react';
import { RoadmapMap } from './components/RoadmapMap';
import { Milestone } from './types';
import { geminiService } from './services/gemini';
import { liveClient } from './services/liveClient';
import { Mascot } from './components/Mascot';
import { X, MessageSquare, Search, ExternalLink, Volume2, VolumeX } from 'lucide-react';

// Declare canvas-confetti global
declare global {
  interface Window {
    confetti: any;
  }
}

const App: React.FC = () => {
  const [selectedMilestone, setSelectedMilestone] = useState<Milestone | null>(null);
  const [liveStatus, setLiveStatus] = useState<'disconnected' | 'connecting' | 'connected' | 'error'>('disconnected');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<{role: 'user'|'model', text: string, sources?: any[]}[]>([
    { role: 'model', text: 'Hoot! I\'m Peri the Owl. Ask me anything about our roadmap!' }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [mascotMessage, setMascotMessage] = useState<string>("Welcome to Peridot Finance!");

  // Trigger confetti
  const triggerConfetti = () => {
    if (window.confetti) {
      window.confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#10b981', '#06b6d4', '#f59e0b'] // Emerald, Cyan, Amber
      });
    }
  };

  const handleMilestoneSelect = (milestone: Milestone) => {
    setSelectedMilestone(milestone);
    triggerConfetti();
    setMascotMessage(`Wow! ${milestone.title} is exciting!`);
    
    if (!isMuted) {
      handleSpeak(`Let me tell you about ${milestone.title}`);
    }
  };

  // Handle Live API connection
  const toggleLive = async () => {
    if (liveStatus === 'connected') {
      await liveClient.disconnect();
      setLiveStatus('disconnected');
      setMascotMessage("Voice chat ended. Hoot!");
    } else {
      setLiveStatus('connecting');
      setMascotMessage("Connecting to the mothership...");
      await liveClient.connect((status) => {
        setLiveStatus(status as any);
        if (status === 'connected') {
            setMascotMessage("I'm listening! Ask me anything.");
            triggerConfetti();
        }
      });
    }
  };

  // Handle Text Chat
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const newMessage = { role: 'user' as const, text: chatInput };
    setChatMessages(prev => [...prev, newMessage]);
    setChatInput('');
    setMascotMessage("Thinking...");

    try {
        const history = chatMessages.slice(-5).map(m => ({
            role: m.role,
            parts: [{ text: m.text }]
        }));

        const response = await geminiService.generateChatResponse(history, newMessage.text);
        setChatMessages(prev => [...prev, { role: 'model', text: response.text || "Hoot? I didn't catch that.", sources: response.sources }]);
        setMascotMessage("Here is what I found!");
    } catch (err) {
        setChatMessages(prev => [...prev, { role: 'model', text: "Sorry, my feathers are ruffled. Error!" }]);
    }
  };

  // Handle TTS
  const handleSpeak = async (text: string) => {
    if (isSpeaking) return;
    setIsSpeaking(true);
    try {
      await geminiService.speakText(text);
      setTimeout(() => setIsSpeaking(false), 5000); 
    } catch (e) {
      setIsSpeaking(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-100 font-sans relative overflow-hidden">
      {/* Background Blobs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl blob" style={{ animationDelay: '0s' }}></div>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-3xl blob" style={{ animationDelay: '2s' }}></div>
      <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl blob" style={{ animationDelay: '4s' }}></div>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-[#0f172a]/80 backdrop-blur-lg border-b border-slate-800">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Custom Peridot Logo SVG */}
            <div className="relative w-10 h-10">
               <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-[0_0_10px_rgba(16,185,129,0.5)]">
                  {/* P Shape: Even-odd fill to cut out the hole */}
                  <path fillRule="evenodd" clipRule="evenodd" d="M25 10H55C75 10 90 25 90 45C90 65 75 80 55 80H45V90H25V10ZM45 60V30H55C63.2843 30 70 36.7157 70 45C70 53.2843 63.2843 60 55 60H45Z" fill="#10b981"/>
                  {/* The Dot */}
                  <circle cx="85" cy="85" r="10" fill="#10b981" />
               </svg>
            </div>
            <div className="flex flex-col">
                <h1 className="text-2xl font-bold tracking-tight text-white leading-none">
                  Peridot<span className="text-emerald-500">.</span>
                </h1>
                <span className="text-[10px] uppercase tracking-[0.2em] text-slate-400 font-medium">Finance</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
             <button 
               onClick={() => setIsMuted(!isMuted)}
               className="p-2.5 rounded-full bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-all border border-slate-700"
               title={isMuted ? "Unmute Mascot" : "Mute Mascot"}
             >
               {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
             </button>

             <button 
               onClick={toggleLive}
               className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-bold transition-all transform hover:scale-105 active:scale-95 shadow-lg ${
                 liveStatus === 'connected' 
                   ? 'bg-red-500 text-white shadow-red-500/20' 
                   : 'bg-emerald-500 text-slate-900 shadow-emerald-500/20'
               }`}
             >
               {liveStatus === 'connected' ? "Listening..." : "Talk to Peri"}
             </button>
          </div>
        </div>
      </header>

      {/* Main Roadmap */}
      <main className="pt-28 pb-32">
        <div className="text-center mb-16 relative">
            <h2 className="text-5xl md:text-7xl font-bold mb-6 text-white tracking-tight">
                Peridot Roadmap <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">2026</span> 🚀
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto px-4 leading-relaxed">
                Join us on our journey to revolutionize cross-chain lending. 
                <br className="hidden md:block"/>Click on the milestones to explore details.
            </p>
        </div>
        
        <RoadmapMap 
          onSelectMilestone={handleMilestoneSelect} 
          selectedId={selectedMilestone?.id || null} 
        />
      </main>

      {/* Mascot Component */}
      <Mascot 
        isSpeaking={isSpeaking || liveStatus === 'connected'} 
        isListening={liveStatus === 'connected'}
        onClick={() => setMascotMessage("Hoot hoot! I'm Peri!")}
        message={mascotMessage}
      />

      {/* Detail Modal/Panel */}
      {selectedMilestone && (
        <div className="fixed inset-0 z-40 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200" onClick={() => setSelectedMilestone(null)}>
          <div className="bg-slate-900 border border-slate-700 rounded-3xl w-full max-w-2xl shadow-2xl relative overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200" onClick={e => e.stopPropagation()}>
            {/* Removed rainbow gradient top bar */}
            
            <div className="p-8 overflow-y-auto custom-scrollbar">
              <button 
                onClick={() => setSelectedMilestone(null)}
                className="absolute top-6 right-6 p-2 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>

              <div className="flex items-center gap-3 mb-4">
                <span className="text-emerald-400 font-mono font-bold">{selectedMilestone.date}</span>
                <span className={`px-3 py-1 rounded-full text-xs font-bold border ${
                    selectedMilestone.category === 'Foundation' ? 'border-purple-500/50 text-purple-400 bg-purple-500/10' :
                    selectedMilestone.category === 'Product' ? 'border-amber-500/50 text-amber-400 bg-amber-500/10' :
                    selectedMilestone.category === 'Expansion' ? 'border-sky-500/50 text-sky-400 bg-sky-500/10' :
                    'border-pink-500/50 text-pink-400 bg-pink-500/10'
                }`}>
                    {selectedMilestone.category.toUpperCase()}
                </span>
              </div>

              <h2 className="text-4xl font-bold text-white mb-6 leading-tight">{selectedMilestone.title}</h2>
              
              <div className="prose prose-invert max-w-none">
                <p className="text-xl text-slate-300 leading-relaxed mb-8">
                  {selectedMilestone.longDescription}
                </p>
                
                <div className="bg-slate-800/40 rounded-2xl p-6 border border-slate-700/50 hover:bg-slate-800/60 transition-colors">
                    <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Technical Risk Assessment</h4>
                    <p className="text-slate-300">
                        {selectedMilestone.id === 'lp-boost' && "⚠️ High Complexity: Routing into external protocols requires precise valuation to prevent liquidations."}
                        {selectedMilestone.id === 'solana-mainnet' && "⚠️ High Complexity: Bridging execution environments (Seave vs EVM) and signature translation."}
                        {selectedMilestone.id === 'easy-mode' && "⚠️ UX Risk: Requires flawless Smart Account integration."}
                        {selectedMilestone.id !== 'lp-boost' && selectedMilestone.id !== 'solana-mainnet' && selectedMilestone.id !== 'easy-mode' && "✅ Standard implementation complexity."}
                    </p>
                </div>
              </div>

              <div className="mt-8 flex justify-end">
                 <button 
                   onClick={(e) => {
                     e.stopPropagation();
                     handleSpeak(selectedMilestone.longDescription);
                   }}
                   className="flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-500 rounded-xl text-white font-bold transition-all shadow-lg hover:shadow-emerald-500/20 active:scale-95"
                 >
                   {isSpeaking ? 'Reading...' : 'Read to me'}
                 </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Chat Widget */}
      <div className={`fixed bottom-0 left-6 z-40 transition-all duration-300 transform ${isChatOpen ? 'translate-y-0' : 'translate-y-[calc(100%-60px)]'} w-[350px] mb-4`}>
        <div className="bg-slate-900/95 backdrop-blur-xl border border-slate-700 w-full h-[450px] rounded-2xl shadow-2xl flex flex-col overflow-hidden">
            {/* Chat Header / Toggle */}
            <div 
              className="bg-emerald-900/30 p-4 flex items-center justify-between cursor-pointer border-b border-slate-700"
              onClick={() => setIsChatOpen(!isChatOpen)}
            >
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-slate-800 border-2 border-emerald-500 flex items-center justify-center overflow-hidden">
                        <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Animals/Owl.png" className="w-8 h-8 object-contain" />
                    </div>
                    <div>
                        <span className="font-bold text-white block text-sm">Peri the Owl</span>
                        <span className="text-[10px] text-emerald-400 font-mono">ONLINE</span>
                    </div>
                </div>
                <div className={`transition-transform duration-300 ${isChatOpen ? 'rotate-180' : ''}`}>
                    {isChatOpen ? <X size={20} className="text-slate-400"/> : <MessageSquare size={20} className="text-emerald-400"/>}
                </div>
            </div>

            {/* Chat Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-900/50 custom-scrollbar">
                {chatMessages.map((msg, i) => (
                    <div key={i} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                        <div className={`max-w-[85%] rounded-2xl p-3 text-sm shadow-sm ${
                            msg.role === 'user' 
                            ? 'bg-emerald-600 text-white rounded-tr-sm' 
                            : 'bg-slate-800 text-slate-200 rounded-tl-sm border border-slate-700'
                        }`}>
                            {msg.text}
                        </div>
                        {msg.sources && msg.sources.length > 0 && (
                            <div className="mt-1 flex flex-wrap gap-1">
                                {msg.sources.map((s, idx) => (
                                    <a 
                                      key={idx} 
                                      href={s.uri} 
                                      target="_blank" 
                                      rel="noreferrer"
                                      className="flex items-center gap-1 text-[10px] bg-slate-800 px-2 py-1 rounded-full text-blue-400 hover:text-blue-300 border border-slate-700"
                                    >
                                        <Search size={10} /> {s.title}
                                    </a>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Chat Input */}
            <form onSubmit={handleSendMessage} className="p-3 bg-slate-800 border-t border-slate-700">
                <div className="relative">
                    <input 
                      type="text" 
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      placeholder="Ask Peri..."
                      className="w-full bg-slate-900 border border-slate-600 rounded-full py-2 pl-4 pr-10 text-sm focus:outline-none focus:border-emerald-500 transition-colors placeholder-slate-500 text-white"
                    />
                    <button 
                      type="submit"
                      disabled={!chatInput.trim()}
                      className="absolute right-1 top-1 p-1.5 bg-emerald-600 rounded-full text-white hover:bg-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        <ExternalLink size={16} className="rotate-[-45deg]" />
                    </button>
                </div>
            </form>
        </div>
      </div>

    </div>
  );
};

export default App;