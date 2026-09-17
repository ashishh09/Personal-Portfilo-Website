import React from 'react';
import { Award, CheckCircle2, Shield, Cpu, Code2, Sparkles } from 'lucide-react';
import { CERTIFICATIONS_LIST } from '../data/portfolioData';

export const Certifications: React.FC = () => {
  const getBadgeIcon = (category: string) => {
    switch (category) {
      case 'Programming':
        return <Code2 className="w-5 h-5 text-blue-400" />;
      case 'Job Simulation':
        return <Shield className="w-5 h-5 text-cyan-400" />;
      case 'Web':
        return <Sparkles className="w-5 h-5 text-emerald-400" />;
      default:
        return <Award className="w-5 h-5 text-blue-400" />;
    }
  };

  return (
    <section id="certifications" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-900">
      <div className="text-center mb-14">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono uppercase tracking-wider mb-3">
          <span>Credentials</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Certifications & Simulations
        </h2>
        <p className="mt-3 text-sm sm:text-base text-slate-400 max-w-2xl mx-auto">
          Technical certifications and professional industry simulation training programs.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {CERTIFICATIONS_LIST.map((cert) => (
          <div
            key={cert.title}
            className="bg-[#0b1120] border border-slate-800/90 hover:border-blue-500/50 rounded-2xl p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/10 flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-700/60 flex items-center justify-center group-hover:scale-105 transition-transform">
                  {getBadgeIcon(cert.category)}
                </div>
                <span className="text-[11px] font-mono font-medium px-2.5 py-0.5 rounded-full bg-slate-900 text-slate-300 border border-slate-700/60">
                  {cert.category}
                </span>
              </div>

              <h3 className="text-base font-bold text-white group-hover:text-blue-300 transition-colors">
                {cert.title}
              </h3>

              <div className="text-xs text-slate-400 mt-2 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
                <span>{cert.issuer}</span>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-500 font-mono">
              <span className="flex items-center gap-1 text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                Completed
              </span>
              <span className="text-slate-400">Verified Curriculum</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
