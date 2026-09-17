import React from 'react';
import { Coffee, Server, Layers, Cpu, Code2, Globe, Sparkles, Compass } from 'lucide-react';
import { FOCUS_AREAS, PERSONAL_INFO } from '../data/portfolioData';

export const About: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Coffee':
        return <Coffee className="w-5 h-5 text-amber-400" />;
      case 'Server':
        return <Server className="w-5 h-5 text-blue-400" />;
      case 'Layers':
        return <Layers className="w-5 h-5 text-cyan-400" />;
      case 'Cpu':
        return <Cpu className="w-5 h-5 text-indigo-400" />;
      case 'Code2':
        return <Code2 className="w-5 h-5 text-emerald-400" />;
      default:
        return <Sparkles className="w-5 h-5 text-blue-400" />;
    }
  };

  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-900">
      <div className="text-center mb-14">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono uppercase tracking-wider mb-3">
          <span>Overview</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          About Me
        </h2>
        <p className="mt-3 text-sm sm:text-base text-slate-400 max-w-2xl mx-auto">
          Passionate engineering student blending core Java engineering with modern cloud infrastructure and machine learning.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Biography Card */}
        <div className="lg:col-span-5 bg-[#0b1120] border border-slate-800/90 rounded-2xl p-6 sm:p-8 relative overflow-hidden shadow-xl shadow-black/30">
          <div className="absolute -top-12 -right-12 w-40 h-40 bg-blue-600/10 rounded-full blur-2xl pointer-events-none" />

          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <span>Academic & Professional Profile</span>
          </h3>

          <div className="space-y-4 text-slate-300 text-sm leading-relaxed">
            {PERSONAL_INFO.aboutBio.map((paragraph, index) => (
              <p key={index} className="text-slate-300">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Long-term goal callout */}
          <div className="mt-6 pt-5 border-t border-slate-800 flex items-start gap-3 bg-blue-950/20 border border-blue-500/20 rounded-xl p-4">
            <Compass className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
            <div>
              <div className="text-xs font-semibold text-blue-300 uppercase tracking-wider font-mono">
                Long-Term Vision
              </div>
              <p className="text-xs text-slate-300 mt-1">
                To excel as a high-impact Software Engineer building reliable distributed systems while traveling and exploring diverse global cultures.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: 5 Small Visual Cards */}
        <div className="lg:col-span-7 flex flex-col justify-between h-full">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-bold text-white tracking-tight">
              Core Competency Areas
            </h3>
            <span className="text-xs text-slate-500 font-mono">5 Focus Domains</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {FOCUS_AREAS.map((card, index) => (
              <div
                key={card.title}
                className={`bg-[#0d1424]/90 border border-slate-800/80 hover:border-blue-500/50 hover:bg-[#111c33] rounded-xl p-4 sm:p-5 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-500/10 group ${
                  index === 4 ? 'sm:col-span-2' : ''
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-lg bg-slate-900 border border-slate-700/60 flex items-center justify-center group-hover:scale-105 transition-transform">
                    {getIcon(card.icon)}
                  </div>
                  <span className="text-[11px] font-mono font-medium px-2.5 py-0.5 rounded-full bg-slate-800/90 text-blue-300 border border-slate-700/60">
                    {card.tag}
                  </span>
                </div>

                <h4 className="text-base font-semibold text-white group-hover:text-blue-300 transition-colors">
                  {card.title}
                </h4>
                <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                  {card.description}
                </p>
              </div>
            ))}
          </div>

          {/* Quick Stats banner */}
          <div className="mt-5 grid grid-cols-3 gap-3 p-4 bg-[#090d18] border border-slate-800/80 rounded-xl text-center">
            <div>
              <div className="text-xl font-bold text-blue-400 font-mono">8.20</div>
              <div className="text-[11px] text-slate-400">B.Tech CGPA</div>
            </div>
            <div className="border-x border-slate-800">
              <div className="text-xl font-bold text-cyan-400 font-mono">83%</div>
              <div className="text-[11px] text-slate-400">Diploma Score</div>
            </div>
            <div>
              <div className="text-xl font-bold text-emerald-400 font-mono">6+</div>
              <div className="text-[11px] text-slate-400">Core Projects</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
