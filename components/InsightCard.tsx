import React, { useState, useEffect, useRef } from 'react';
import { Insight } from '../types';

interface InsightCardProps {
  insight: Insight;
  index: number;
}

// Theme definition for each card ID
const THEMES: Record<string, any> = {
  '1': { 
    color: 'cyan', 
    text: 'text-cyan-400', 
    bg: 'bg-cyan-500', 
    borderHover: 'hover:border-cyan-500/50',
    iconBg: 'bg-cyan-500/20',
    iconBorder: 'border-cyan-500/30',
    glow: 'shadow-[0_0_30px_rgba(6,182,212,0.15)]',
    image: 'https://images.unsplash.com/photo-1558494949-ef526b0042a0?auto=format&fit=crop&w=800&q=80' // Cyber/Tech Cyan
  },
  '2': { 
    color: 'fuchsia', 
    text: 'text-fuchsia-400', 
    bg: 'bg-fuchsia-500', 
    borderHover: 'hover:border-fuchsia-500/50',
    iconBg: 'bg-fuchsia-500/20',
    iconBorder: 'border-fuchsia-500/30',
    glow: 'shadow-[0_0_30px_rgba(217,70,239,0.15)]',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80' // Abstract Fluid Pink
  },
  '3': { 
    color: 'amber', 
    text: 'text-amber-400', 
    bg: 'bg-amber-500', 
    borderHover: 'hover:border-amber-500/50',
    iconBg: 'bg-amber-500/20',
    iconBorder: 'border-amber-500/30',
    glow: 'shadow-[0_0_30px_rgba(245,158,11,0.15)]',
    image: 'https://images.unsplash.com/photo-1620641788427-3e19cb163802?auto=format&fit=crop&w=800&q=80' // Geometry Orange
  },
  '4': { 
    color: 'lime', 
    text: 'text-lime-400', 
    bg: 'bg-lime-500', 
    borderHover: 'hover:border-lime-500/50',
    iconBg: 'bg-lime-500/20',
    iconBorder: 'border-lime-500/30',
    glow: 'shadow-[0_0_30px_rgba(132,204,22,0.15)]',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80' // Data Viz Green
  },
  '5': { 
    color: 'violet', 
    text: 'text-violet-400', 
    bg: 'bg-violet-500', 
    borderHover: 'hover:border-violet-500/50',
    iconBg: 'bg-violet-500/20',
    iconBorder: 'border-violet-500/30',
    glow: 'shadow-[0_0_30px_rgba(139,92,246,0.15)]',
    image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1200&q=80' // Cinema Theater
  },
};

const InsightCard: React.FC<InsightCardProps> = ({ insight, index }) => {
  const [demoInput, setDemoInput] = useState('');
  const [demoResult, setDemoResult] = useState<{ label: string; confidence: number } | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  
  // Spotlight effect state
  const divRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const theme = THEMES[insight.id] || THEMES['1'];
  const isWide = insight.id === '5';

  useEffect(() => {
    const timer = setTimeout(() => setIsAnimating(true), 100 + index * 100);
    return () => clearTimeout(timer);
  }, [index]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (divRef.current) {
      const rect = divRef.current.getBoundingClientRect();
      setMousePosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleSimulatePrediction = () => {
    if (!demoInput.trim()) return;
    
    const lowerInput = demoInput.toLowerCase();
    const positiveWords = ['good', 'great', 'excellent', 'amazing', 'love', 'best', 'fantastic', 'super', 'masterpiece'];
    const negativeWords = ['bad', 'worst', 'terrible', 'awful', 'hate', 'boring', 'slow', 'waste', 'disaster'];
    
    let score = 0;
    positiveWords.forEach(w => { if (lowerInput.includes(w)) score++; });
    negativeWords.forEach(w => { if (lowerInput.includes(w)) score--; });

    const isPositive = score >= 0;
    const confidence = 90 + Math.floor(Math.random() * 9) + (Math.random() > 0.5 ? 0.5 : 0); 

    setDemoResult({
      label: isPositive ? 'Positive' : 'Negative',
      confidence
    });
  };

  const renderVisualization = (id: string) => {
    switch (id) {
      case '1': // TF-IDF - Cyan Theme
        return (
          <div className="mt-auto pt-4 flex items-center justify-between space-x-2">
            <div className="flex flex-col items-center z-10">
              <div className={`w-8 h-8 rounded-full bg-zinc-900 flex items-center justify-center border border-zinc-700 mb-1 text-sm shadow-lg`}>
                📄
              </div>
              <span className="text-[9px] text-zinc-500 uppercase tracking-wider font-medium">Raw</span>
            </div>
            
            <div className="h-px flex-1 bg-zinc-800 relative overflow-hidden">
                <div className={`h-full bg-cyan-400 shadow-[0_0_10px_#22d3ee] transition-all duration-1000 ease-out delay-300 ${isAnimating ? 'w-full' : 'w-0'}`}></div>
            </div>

            <div className="flex flex-col items-center z-10">
              <div className={`w-10 h-10 rounded-lg ${theme.iconBg} flex items-center justify-center border ${theme.iconBorder} mb-1 ${theme.glow} backdrop-blur-sm`}>
                <span className={`${theme.text} font-bold text-[9px] text-center leading-tight`}>TF-IDF<br/>Fit</span>
              </div>
              <span className={`text-[9px] ${theme.text} font-semibold uppercase tracking-wider`}>Train</span>
            </div>

            <div className="h-px flex-1 bg-zinc-800 relative overflow-hidden">
                 <div className={`h-full bg-cyan-400 shadow-[0_0_10px_#22d3ee] transition-all duration-1000 ease-out delay-700 ${isAnimating ? 'w-full' : 'w-0'}`}></div>
            </div>

            <div className="flex flex-col items-center z-10">
               <div className={`w-8 h-8 rounded-full ${theme.iconBg} flex items-center justify-center border ${theme.iconBorder} mb-1 text-sm shadow-lg`}>
                ✅
              </div>
              <span className={`text-[9px] ${theme.text} uppercase tracking-wider font-medium`}>Safe</span>
            </div>
          </div>
        );
      
      case '2': // Random Split - Pink Theme
        return (
          <div className="mt-auto pt-4">
            <p className="text-[10px] font-semibold text-zinc-500 mb-2 uppercase tracking-wider flex justify-between">
                <span>Accuracy vs Seed</span>
                <span className={theme.text}>Stable 100%</span>
            </p>
            <div className="flex justify-around items-end h-24 space-x-4">
              {[1, 2, 3].map((split, i) => (
                <div key={split} className="flex flex-col items-center w-full group/bar cursor-pointer">
                  <div className="relative w-full bg-zinc-900 rounded-t-sm h-full overflow-hidden flex items-end ring-1 ring-transparent hover:ring-fuchsia-500/50 transition-all">
                    <div 
                      className={`w-full bg-gradient-to-t from-fuchsia-900 to-fuchsia-500 opacity-90 group-hover/bar:opacity-100 transition-all duration-1000 ease-out ${isAnimating ? 'h-full' : 'h-0'}`}
                      style={{ transitionDelay: `${i * 150 + 300}ms` }}
                    ></div>
                  </div>
                  <span className="text-[10px] text-zinc-600 mt-1 group-hover/bar:text-fuchsia-400 transition-colors">S{split}</span>
                </div>
              ))}
            </div>
          </div>
        );

      case '3': // K-Fold - Amber Theme
        return (
          <div className="mt-auto pt-4">
            <div className="flex justify-between items-center mb-2">
                <p className="text-[10px] font-semibold text-zinc-500 uppercase tracking-wider">5-Fold CV</p>
                <span className={`text-[10px] font-mono ${theme.text} ${theme.iconBg} border ${theme.iconBorder} px-1.5 rounded`}>σ=0.0</span>
            </div>
            <div className="flex justify-between items-end h-24 space-x-2">
              {[1, 2, 3, 4, 5].map((fold, i) => (
                <div key={fold} className="flex flex-col items-center w-full group/bar">
                  <div className="relative w-full bg-zinc-900 rounded-t-sm h-full overflow-hidden flex items-end">
                    <div 
                       className={`w-full bg-gradient-to-t from-amber-800 to-amber-500 opacity-80 group-hover/bar:opacity-100 transition-all duration-1000 ease-out ${isAnimating ? 'h-full' : 'h-0'}`}
                       style={{ transitionDelay: `${i * 100 + 300}ms` }}
                    ></div>
                  </div>
                  <span className="text-[9px] text-zinc-600 mt-1">F{fold}</span>
                </div>
              ))}
            </div>
          </div>
        );

      case '4': // Class Imbalance - Lime Theme
        return (
          <div className="mt-auto pt-4">
             <p className="text-[10px] font-semibold text-zinc-500 mb-2 uppercase tracking-wider">Samples per Class</p>
             <div className="space-y-2">
                {[
                    { label: 'Neg', val: 30, color: 'bg-rose-500', width: '35%', shadow: 'shadow-[0_0_10px_rgba(244,63,94,0.4)]' },
                    { label: 'Neu', val: 55, color: 'bg-amber-500', width: '65%', shadow: 'shadow-[0_0_10px_rgba(245,158,11,0.4)]' },
                    { label: 'Pos', val: 80, color: 'bg-emerald-500', width: '90%', shadow: 'shadow-[0_0_10px_rgba(16,185,129,0.4)]' }
                ].map((item, i) => (
                    <div key={i} className="flex items-center text-[10px] group/bar">
                        <div className="w-8 text-zinc-500 font-medium">{item.label}</div>
                        <div className="flex-1 h-4 bg-zinc-900 rounded-full overflow-hidden relative border border-zinc-800">
                            <div 
                                className={`h-full ${item.color} ${item.shadow} bg-opacity-90 group-hover/bar:bg-opacity-100 rounded-full flex items-center justify-end px-2 transition-all duration-1000 ease-out`}
                                style={{ 
                                    width: isAnimating ? item.width : '0%',
                                    transitionDelay: `${i * 150 + 300}ms`
                                }}
                            >
                            </div>
                        </div>
                        <span className="ml-2 text-zinc-400 font-mono w-6 text-right">{item.val}</span>
                    </div>
                ))}
             </div>
          </div>
        );

      case '5': // Interactive Demo - Violet Theme
        return (
          <div className="mt-6 bg-black/40 rounded-xl border border-zinc-800/50 overflow-hidden shadow-lg h-full flex flex-col">
            <div className="bg-zinc-900/50 px-4 py-2 border-b border-zinc-800/50 flex justify-between items-center">
                <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Live Inference</span>
                <div className="flex items-center space-x-1.5">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-500 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-500"></span>
                    </span>
                    <span className={`text-[10px] ${theme.text} font-mono font-bold`}>MODEL READY</span>
                </div>
            </div>
            <div className="p-4 flex flex-col flex-1">
                <div className="relative group/input flex-1">
                    <textarea
                        value={demoInput}
                        onChange={(e) => setDemoInput(e.target.value)}
                        placeholder="Type a review here (e.g., 'The plot was dull but the acting was superb')"
                        className="w-full h-full min-h-[100px] bg-black/50 border border-zinc-800 rounded-lg p-3 text-sm text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-colors resize-none"
                    />
                </div>
                <div className="mt-4 flex justify-between items-center h-10">
                    <button 
                        onClick={handleSimulatePrediction}
                        disabled={!demoInput}
                        className="bg-violet-600 hover:bg-violet-500 disabled:bg-zinc-900 disabled:text-zinc-700 disabled:cursor-not-allowed text-white text-sm font-medium py-2 px-6 rounded-md transition-all active:scale-95 shadow-[0_0_15px_rgba(139,92,246,0.3)]"
                    >
                        Run Prediction
                    </button>
                    
                    {demoResult && (
                        <div className="flex items-center space-x-3 animate-fade-in">
                            <div className={`flex flex-col items-end leading-none`}>
                                <span className="text-[10px] text-zinc-500 uppercase">Confidence</span>
                                <span className="font-mono text-sm text-zinc-300">{demoResult.confidence}%</span>
                            </div>
                            <span className={`px-4 py-1.5 rounded-full text-sm font-bold border ${
                                demoResult.label === 'Positive' 
                                ? 'bg-emerald-950/50 text-emerald-400 border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.2)]' 
                                : 'bg-rose-950/50 text-rose-400 border-rose-500/30 shadow-[0_0_15px_rgba(244,63,94,0.2)]'
                            }`}>
                                {demoResult.label}
                            </span>
                        </div>
                    )}
                </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div 
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`group glass-card rounded-2xl flex flex-col relative overflow-hidden transition-all duration-500 border-t border-white/10 ${theme.borderHover} ${isWide ? 'md:col-span-2 lg:col-span-2' : ''} hover:-translate-y-1 hover:shadow-2xl`}
      style={{ 
          animation: `fade-in-up 0.6s ease-out forwards ${index * 0.1}s`, 
          opacity: 0,
      }}
    >
        {/* Mouse Spotlight Effect */}
        <div 
            className="pointer-events-none absolute -inset-px rounded-2xl transition-opacity duration-300 z-20"
            style={{
                background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255, 255, 255, 0.1), transparent 40%)`,
                opacity: isHovered ? 1 : 0
            }}
        />

        {/* Header Image Section */}
        <div className="relative h-40 w-full overflow-hidden">
            {/* Tint Overlay */}
            <div className={`absolute inset-0 ${theme.bg} mix-blend-overlay opacity-20 z-10 pointer-events-none`}></div>
            
            {/* Gradient to fade into body */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0c] via-[#0a0a0c]/70 to-transparent z-20 pointer-events-none"></div>
            
            {/* The Image */}
            <img 
                src={theme.image} 
                alt={insight.title} 
                className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110 opacity-80 group-hover:opacity-100"
            />

            {/* Title Overlay on Image */}
            <div className="absolute bottom-0 left-0 p-5 z-30 w-full">
                 <div className={`h-1 w-12 ${theme.bg} rounded-full mb-3 group-hover:w-20 transition-all duration-300 ease-out shadow-[0_0_10px_rgba(255,255,255,0.2)]`}></div>
                 <h3 className="text-lg font-bold text-white leading-tight drop-shadow-lg pr-4">
                    {insight.title}
                 </h3>
            </div>

            {/* ID Badge */}
            <div className="absolute top-0 right-0 p-4 z-30 opacity-50 group-hover:opacity-100 transition-opacity">
                 <span className="text-4xl font-black text-white/10 group-hover:text-white/20">{insight.id}</span>
            </div>
        </div>

        {/* Body Content */}
        <div className="p-5 flex flex-col flex-1 bg-gradient-to-b from-[#0a0a0c] to-transparent">
            <p className="text-zinc-400 text-sm leading-relaxed mb-4 min-h-[40px]">
                {insight.description}
            </p>

            {/* Outcome Text Highlight */}
            <div className={`bg-zinc-900/60 border-l-2 border-${theme.color}-500/50 pl-3 py-2 mb-2 backdrop-blur-sm rounded-r group-hover:bg-zinc-900/80 transition-colors`}>
                <p className="text-xs text-zinc-300 font-medium leading-snug">
                    {insight.outcome}
                </p>
            </div>

            {renderVisualization(insight.id)}
        </div>
    </div>
  );
};

export default InsightCard;