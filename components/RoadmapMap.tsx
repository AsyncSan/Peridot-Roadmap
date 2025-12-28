import React, { useEffect, useRef, useState } from 'react';
import { ROADMAP_DATA } from '../constants';
import { Milestone, MilestoneStatus } from '../types';
import { Rocket, Code, Zap, Globe, Users, Lock, Bitcoin, Star, CheckCircle2, Circle, Tag } from 'lucide-react';

interface Props {
  onSelectMilestone: (m: Milestone) => void;
  selectedId: string | null;
}

const IconMap = {
  rocket: Rocket,
  code: Code,
  zap: Zap,
  globe: Globe,
  users: Users,
  lock: Lock,
  bitcoin: Bitcoin,
  star: Star
};

const categoryColors = {
  Foundation: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
  Expansion: 'text-sky-400 bg-sky-500/10 border-sky-500/20',
  Product: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
  Tech: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20'
};

export const RoadmapMap: React.FC<Props> = ({ onSelectMilestone, selectedId }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  // Auto-scroll to current item on mount
  useEffect(() => {
    if (containerRef.current) {
        const active = document.querySelector('[data-status="in_progress"]');
        if(active) {
            active.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }
  }, []);

  // Scroll listener for glowing line
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      
      // Calculate scroll progress relative to container center
      const scrollTop = -rect.top + (viewportHeight / 2);
      const totalHeight = rect.height;
      
      let progress = scrollTop / totalHeight;
      progress = Math.max(0, Math.min(1, progress));
      
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial calc
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div ref={containerRef} className="relative w-full max-w-5xl mx-auto py-20 px-4 md:px-0">
      
      {/* Central Line Track */}
      <div className="absolute left-8 md:left-1/2 top-10 bottom-10 w-1 bg-slate-800 md:-translate-x-1/2 rounded-full overflow-hidden">
         {/* Moving Glow Beam */}
         <div 
            className="absolute left-0 w-full bg-gradient-to-b from-transparent via-emerald-500 to-transparent blur-[2px] transition-transform duration-100 ease-out will-change-transform opacity-70"
            style={{ 
                height: '400px',
                top: `${scrollProgress * 100}%`,
                transform: 'translateY(-50%)' 
            }}
         />
      </div>

      {/* Moving Glow Point (On top of line) */}
      <div 
        className="absolute left-[30.5px] md:left-1/2 w-3 h-3 bg-emerald-400 rounded-full shadow-[0_0_20px_2px_rgba(52,211,153,0.8)] z-20 md:-translate-x-1/2 transition-all duration-100 ease-out pointer-events-none mix-blend-screen"
        style={{ 
            top: `${scrollProgress * 100}%`,
            marginTop: '40px' // Offset to align with visual center
        }}
      />

      {ROADMAP_DATA.map((milestone, index) => {
        const Icon = IconMap[milestone.icon];
        const isLeft = index % 2 === 0;
        const isActive = selectedId === milestone.id;
        const isHovered = hoveredId === milestone.id;
        const isCompleted = milestone.status === MilestoneStatus.Completed;
        const isInProgress = milestone.status === MilestoneStatus.In_Progress;

        return (
          <div 
            key={milestone.id}
            data-status={milestone.status}
            className={`relative flex items-center mb-16 md:mb-32 ${
              isLeft ? 'md:flex-row-reverse' : 'md:flex-row'
            } group/row`}
            onMouseEnter={() => setHoveredId(milestone.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            {/* Desktop Spacer */}
            <div className="hidden md:block w-1/2" />

            {/* Central Node */}
            <div 
              className={`absolute left-8 md:left-1/2 w-10 h-10 md:w-14 md:h-14 rounded-full border-4 z-20 flex items-center justify-center transform -translate-x-1/2 md:-translate-x-1/2 cursor-pointer transition-all duration-500 ${
                 isActive || isHovered ? 'scale-110 border-emerald-400 bg-emerald-900 shadow-[0_0_30px_rgba(16,185,129,0.4)]' : 
                 isCompleted ? 'border-emerald-500/50 bg-emerald-950 grayscale-[0.5]' :
                 isInProgress ? 'border-amber-400 bg-amber-950 animate-pulse-slow' :
                 'border-slate-800 bg-slate-900 group-hover/row:border-emerald-500/30'
              }`}
              onClick={() => onSelectMilestone(milestone)}
            >
              {isCompleted ? <CheckCircle2 size={20} className="text-emerald-400" /> : 
               isInProgress ? <Circle size={20} className="text-amber-400 fill-amber-400" /> :
               <Circle size={20} className={`transition-colors ${isHovered ? 'text-emerald-400' : 'text-slate-600'}`} />}
            </div>

            {/* Content Card */}
            <div className={`w-full md:w-1/2 pl-24 md:pl-0 ${isLeft ? 'md:pr-20' : 'md:pl-20'} relative perspective-1000`}>
              <div 
                onClick={() => onSelectMilestone(milestone)}
                className={`
                    relative p-6 rounded-2xl border transition-all duration-500 cursor-pointer overflow-hidden backdrop-blur-xl
                    transform hover:-translate-y-2 hover:scale-[1.02]
                    ${
                      isActive 
                        ? 'bg-slate-800/90 border-emerald-500 shadow-[0_10px_40px_-10px_rgba(16,185,129,0.3)]' 
                        : 'bg-slate-900/40 border-slate-800 hover:border-slate-600 hover:bg-slate-800/80 hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.5)]'
                    }
                `}
              >
                {/* Category Toggle/Badge */}
                <div className="absolute top-4 right-4 z-10">
                    <span className={`
                        text-[10px] font-bold tracking-wider uppercase px-3 py-1.5 rounded-full border flex items-center gap-1.5
                        ${categoryColors[milestone.category]}
                        shadow-sm transition-all duration-300 group-hover:shadow-md group-hover:scale-105
                    `}>
                        <Tag size={10} />
                        {milestone.category}
                    </span>
                </div>

                {/* Decorative sheen */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                <div className="flex items-start justify-between mb-4">
                   <div className={`
                       p-3 rounded-xl transition-all duration-300
                       ${isActive || isHovered ? 'bg-emerald-500 text-white shadow-lg scale-110 rotate-3' : 'bg-slate-800 text-slate-400'}
                   `}>
                     <Icon size={24} />
                   </div>
                </div>
                
                <span className="block text-xs font-mono text-emerald-500/80 mb-2 font-bold tracking-widest">
                     {milestone.date.toUpperCase()}
                </span>

                <h3 className={`text-2xl font-bold mb-3 leading-tight ${isActive ? 'text-white' : 'text-slate-100'}`}>
                  {milestone.title}
                </h3>
                
                <p className="text-sm text-slate-400 leading-relaxed line-clamp-3">
                  {milestone.description}
                </p>

                {isActive && (
                    <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-emerald-500 to-cyan-500 animate-slide-right w-full" />
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};