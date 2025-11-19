import React, { useState, useEffect } from 'react';
import { INSIGHTS, APP_NAME, APP_DESCRIPTION } from './constants';
import InsightCard from './components/InsightCard';

const CountUp = ({ end, duration = 2000 }: { end: number, duration?: number }) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [end, duration]);

  return <>{count}</>;
};

const App: React.FC = () => {
  return (
    <div className="min-h-screen w-full bg-[#050505] flex flex-col relative overflow-x-hidden">
      
      {/* Background with Gradient and Grid */}
      <div className="fixed inset-0 z-0">
         {/* Cinematic Background Image */}
         <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center opacity-10 mix-blend-screen"></div>

         {/* Radial Gradient Base - slightly colored */}
         <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-950/40 via-[#050505] to-black"></div>
         
         {/* Technical Grid Pattern */}
         <div className="absolute inset-0 bg-grid-pattern opacity-20 mask-image-gradient"></div>
      </div>

      {/* Animated Background Blobs - Brighter Colors */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-cyan-500/20 rounded-full mix-blend-screen filter blur-[100px] opacity-30 animate-blob"></div>
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-fuchsia-500/20 rounded-full mix-blend-screen filter blur-[100px] opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-32 left-1/3 w-[600px] h-[600px] bg-amber-500/10 rounded-full mix-blend-screen filter blur-[100px] opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      {/* Hero Section */}
      <header className="relative z-10 pt-20 pb-10 px-6 lg:px-12 flex flex-col items-center text-center max-w-5xl mx-auto">
        <div className="inline-flex items-center space-x-2 bg-zinc-900/50 backdrop-blur-md border border-white/10 rounded-full px-4 py-1.5 mb-8 animate-fade-in hover:bg-zinc-800/50 transition-colors cursor-default shadow-[0_0_20px_rgba(0,0,0,0.3)]">
            <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse shadow-[0_0_10px_#4ade80]"></span>
            <span className="text-xs font-bold text-zinc-300 uppercase tracking-widest">Validation Complete</span>
        </div>
        
        <h1 className="text-5xl sm:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-fuchsia-300 to-amber-300 mb-6 tracking-tight drop-shadow-sm animate-fade-in leading-tight pb-2">
          {APP_NAME}
        </h1>
        
        <p className="text-lg sm:text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed animate-fade-in font-light" style={{ animationDelay: '0.1s' }}>
          {APP_DESCRIPTION}
        </p>
      </header>

      {/* Key Stats / Conclusion Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 w-full mb-16 animate-fade-in" style={{ animationDelay: '0.2s' }}>
        <div className="glass-panel rounded-3xl p-8 sm:p-12 border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden transform transition-transform hover:scale-[1.005] duration-500 group">
            {/* Background glow inside card */}
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-fuchsia-500/20 blur-[80px] rounded-full pointer-events-none group-hover:bg-fuchsia-500/30 transition-colors duration-700"></div>
            <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-cyan-500/20 blur-[80px] rounded-full pointer-events-none group-hover:bg-cyan-500/30 transition-colors duration-700"></div>

            <div className="flex flex-col lg:flex-row items-center justify-between gap-12 relative z-10">
                <div className="flex-1 text-center lg:text-left space-y-6">
                    <h2 className="text-3xl font-bold text-white">Validation Conclusion</h2>
                    <p className="text-zinc-300 leading-relaxed text-lg">
                        The model demonstrates <span className="text-fuchsia-300 font-bold">exceptional robustness</span>. 
                        Extensive testing across multiple random splits and K-Fold cross-validation confirms that the 
                        observed performance is not a statistical anomaly.
                    </p>
                    <div className="flex flex-wrap justify-center lg:justify-start gap-3 text-sm text-zinc-400 mt-4">
                         <span className="px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-200 font-medium">No Data Leakage</span>
                         <span className="px-3 py-1.5 rounded-full bg-fuchsia-500/10 border border-fuchsia-500/30 text-fuchsia-200 font-medium">Generalizes Well</span>
                         <span className="px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-200 font-medium">Balanced Support</span>
                    </div>
                </div>

                <div className="relative cursor-default">
                    <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500 to-fuchsia-500 blur-[60px] opacity-20 animate-pulse"></div>
                    <div className="relative w-52 h-52 sm:w-64 sm:h-64 rounded-full border-4 border-white/10 bg-black/50 backdrop-blur-xl flex flex-col items-center justify-center shadow-2xl ring-1 ring-white/20">
                        <span className="text-sm font-bold text-zinc-400 uppercase tracking-widest mb-2">Accuracy</span>
                        <span className="text-7xl sm:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white via-zinc-200 to-zinc-400">
                          <CountUp end={100} />%
                        </span>
                        <div className="absolute bottom-8 px-4 py-1 bg-white/5 rounded-full border border-white/10 backdrop-blur-md">
                             <span className="text-xs font-mono text-cyan-300">σ = 0.00</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* Insights Grid */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pb-24">
        <div className="flex items-center space-x-4 mb-8 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <h3 className="text-2xl font-bold text-white">Detailed Insights</h3>
            <div className="h-px flex-1 bg-gradient-to-r from-zinc-800 via-zinc-700 to-transparent"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {INSIGHTS.map((insight, index) => (
            <InsightCard key={insight.id} insight={insight} index={index} />
          ))}
        </div>
      </main>

      <footer className="relative z-10 py-8 border-t border-white/5 text-center">
        <p className="text-zinc-600 text-sm">
          Powered by Google Colab • React • Tailwind CSS
        </p>
        <p className="text-zinc-700 text-xs mt-2">
            &copy; 2024 AI Validation Dashboard
        </p>
      </footer>
    </div>
  );
};

export default App;