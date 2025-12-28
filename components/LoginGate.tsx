import React, { useState, useEffect, useRef } from 'react';
import { Lock, ArrowRight, ShieldCheck, ShieldAlert } from 'lucide-react';

interface Props {
  onLogin: () => void;
}

export const LoginGate: React.FC<Props> = ({ onLogin }) => {
  const [password, setPassword] = useState('');
  const [mood, setMood] = useState<'idle' | 'focus' | 'error' | 'success'>('idle');
  const [message, setMessage] = useState("Protocol Restricted. Identify yourself.");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Focus input on mount
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password.toLowerCase() === 'PeridotPump') {
      setMood('success');
      setMessage("Identity Verified. Welcome.");
      
      // Trigger local confetti for the modal
      if (window.confetti) {
        window.confetti({
          particleCount: 150,
          spread: 70,
          origin: { y: 0.5 },
          colors: ['#10b981', '#06b6d4', '#f59e0b']
        });
      }

      setTimeout(() => {
        onLogin();
      }, 1500);
    } else {
      setMood('error');
      setMessage("Hoot! Invalid Clearance Code!");
      // Reset mood after animation
      setTimeout(() => {
        setMood('idle');
        setMessage("Try again.");
        setPassword('');
      }, 1500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      {/* Backdrop with blur */}
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-xl transition-all duration-700"></div>

      {/* The Vault Container */}
      <div className={`
        relative w-full max-w-md bg-slate-900/80 border rounded-3xl p-8 shadow-2xl overflow-visible transition-all duration-500
        ${mood === 'error' ? 'border-red-500/50 shadow-red-500/20 translate-x-[-5px] animate-pulse' : ''}
        ${mood === 'success' ? 'border-emerald-500/50 shadow-emerald-500/20 scale-105 opacity-0 translate-y-[-20px]' : 'border-slate-700/50 shadow-emerald-500/10'}
      `}>
        
        {/* The Owl Mascot - Perched on top */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-32 h-32 flex flex-col items-center justify-end pointer-events-none">
           {/* Speech Bubble */}
           <div className={`
             mb-2 bg-white text-slate-900 text-xs font-bold py-1 px-3 rounded-full rounded-bl-none shadow-lg transition-all duration-300 transform origin-bottom-left
             ${mood === 'idle' ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}
           `}>
             {message}
           </div>

           {/* Owl Image Container */}
           <div className={`
              relative w-24 h-24 transition-all duration-300
              ${mood === 'focus' ? 'translate-y-2 scale-110' : 'animate-float'}
              ${mood === 'error' ? 'animate-bounce text-red-500 hue-rotate-[-50deg]' : ''}
              ${mood === 'success' ? 'animate-bounce hue-rotate-[50deg]' : ''}
           `}>
              <img 
                src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Animals/Owl.png" 
                alt="Guardian Owl"
                className="w-full h-full object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]"
              />
              {/* Eye Glows */}
              <div className={`absolute top-[35%] left-[25%] w-2 h-2 bg-white rounded-full blur-[1px] transition-all duration-300 ${mood === 'focus' ? 'scale-150' : 'scale-100'}`} />
              <div className={`absolute top-[35%] right-[25%] w-2 h-2 bg-white rounded-full blur-[1px] transition-all duration-300 ${mood === 'focus' ? 'scale-150' : 'scale-100'}`} />
           </div>
        </div>

        <div className="mt-8 text-center mb-8">
            <h2 className="text-2xl font-bold text-white mb-2 tracking-tight">Restricted Access</h2>
            <p className="text-slate-400 text-sm">Enter the password to view the Roadmap.</p>
            <p className="text-slate-600 text-[10px] mt-1">(Hint: It's the name of the project)</p>
        </div>

        <form onSubmit={handleSubmit} className="relative">
            <div className={`
                group relative flex items-center bg-slate-800/50 rounded-2xl border transition-all duration-300
                ${mood === 'focus' ? 'border-emerald-500 bg-slate-800 ring-2 ring-emerald-500/20' : 'border-slate-600 hover:border-slate-500'}
                ${mood === 'error' ? 'border-red-500 bg-red-900/10 ring-2 ring-red-500/20 shake' : ''}
            `}>
                <div className="pl-4 text-slate-400">
                    {mood === 'success' ? <ShieldCheck className="text-emerald-500" /> : 
                     mood === 'error' ? <ShieldAlert className="text-red-500" /> : 
                     <Lock size={20} />}
                </div>
                
                <input
                    ref={inputRef}
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={() => setMood('focus')}
                    onBlur={() => setMood(password ? 'focus' : 'idle')}
                    placeholder="Enter Password..."
                    className="w-full bg-transparent border-none text-white px-4 py-4 focus:ring-0 placeholder-slate-600 outline-none text-lg tracking-widest font-mono"
                />

                <button 
                    type="submit"
                    className={`
                        absolute right-2 p-2 rounded-xl transition-all duration-300
                        ${password ? 'bg-emerald-500 text-white translate-x-0 opacity-100' : 'bg-slate-700 text-slate-500 translate-x-2 opacity-0 pointer-events-none'}
                    `}
                >
                    <ArrowRight size={20} />
                </button>
            </div>
            
            {/* Decorative Scanning Line */}
            {mood === 'focus' && (
                <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden rounded-2xl">
                    <div className="w-full h-[2px] bg-emerald-400/50 shadow-[0_0_10px_rgba(52,211,153,0.8)] animate-[scan_2s_ease-in-out_infinite]" />
                </div>
            )}
        </form>

        <div className="mt-8 flex justify-center gap-2">
            <div className="w-2 h-2 rounded-full bg-slate-700 animate-pulse"></div>
            <div className="w-2 h-2 rounded-full bg-slate-700 animate-pulse delay-75"></div>
            <div className="w-2 h-2 rounded-full bg-slate-700 animate-pulse delay-150"></div>
        </div>

      </div>

      <style>{`
        .shake {
          animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
        }
        @keyframes shake {
          10%, 90% { transform: translate3d(-1px, 0, 0); }
          20%, 80% { transform: translate3d(2px, 0, 0); }
          30%, 50%, 70% { transform: translate3d(-4px, 0, 0); }
          40%, 60% { transform: translate3d(4px, 0, 0); }
        }
        @keyframes scan {
            0% { transform: translateY(0); opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { transform: translateY(80px); opacity: 0; }
        }
      `}</style>
    </div>
  );
};