import React, { useEffect, useState } from 'react';
import { MessageSquare, Volume2 } from 'lucide-react';

interface Props {
  isSpeaking: boolean;
  isListening: boolean;
  onClick: () => void;
  message?: string;
}

export const Mascot: React.FC<Props> = ({ isSpeaking, isListening, onClick, message }) => {
  const [showBubble, setShowBubble] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    if (message) {
      setShowBubble(true);
      const timer = setTimeout(() => setShowBubble(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  useEffect(() => {
    const handleScroll = () => {
        setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Calculate dynamic floating position
  const floatY = Math.sin(scrollY * 0.003) * 15;
  const floatX = Math.cos(scrollY * 0.002) * 10;
  const rotate = Math.sin(scrollY * 0.005) * 5;

  return (
    <div className="fixed bottom-6 right-6 md:bottom-12 md:right-12 z-50 flex flex-col items-end pointer-events-none transition-transform duration-700 ease-out"
         style={{ transform: `translate(${floatX}px, ${floatY}px)` }}
    >
      
      {/* Speech Bubble */}
      {(showBubble || isSpeaking || isListening) && (
        <div className="bg-white text-slate-900 p-4 rounded-2xl rounded-br-none shadow-2xl mb-4 max-w-[250px] animate-in slide-in-from-bottom-5 fade-in duration-300 relative mr-4">
          <p className="font-medium text-sm">
            {isListening ? "I'm listening..." : isSpeaking ? "Speaking..." : message || "Hoot! Welcome to Peridot!"}
          </p>
          {isSpeaking && (
            <div className="flex gap-1 mt-2 justify-end">
              <div className="w-1 h-3 bg-emerald-500 animate-pulse" style={{animationDelay: '0ms'}}/>
              <div className="w-1 h-3 bg-emerald-500 animate-pulse" style={{animationDelay: '100ms'}}/>
              <div className="w-1 h-3 bg-emerald-500 animate-pulse" style={{animationDelay: '200ms'}}/>
            </div>
          )}
        </div>
      )}

      {/* The Owl */}
      <div 
        onClick={onClick}
        className={`relative w-24 h-24 md:w-32 md:h-32 cursor-pointer pointer-events-auto transition-transform duration-300 mascot-hover ${
          isSpeaking ? 'animate-bounce' : ''
        }`}
        style={{ transform: `rotate(${rotate}deg)` }}
      >
        {/* Glow behind */}
        <div className="absolute inset-0 bg-emerald-500/30 rounded-full blur-2xl animate-pulse-slow" />
        
        {/* Owl Image */}
        <img 
          src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Animals/Owl.png" 
          alt="Peridot Mascot"
          className="w-full h-full object-contain drop-shadow-2xl"
        />

        {/* Status Indicators */}
        {isListening && (
          <div className="absolute -top-2 -right-2 bg-red-500 text-white p-1.5 rounded-full animate-bounce shadow-lg border-2 border-[#0f172a]">
             <Volume2 size={16} />
          </div>
        )}
      </div>
    </div>
  );
};