import React from 'react';
import { Briefcase, Calendar, MapPin, CheckCircle, Code } from 'lucide-react';
import { EXPERIENCE_LIST } from '../data/portfolioData';

export const Experience: React.FC = () => {
  return (
    <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-900">
      <div className="text-center mb-14">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono uppercase tracking-wider mb-3">
          <span>Work History</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Internship Experience
        </h2>
        <p className="mt-3 text-sm sm:text-base text-slate-400 max-w-2xl mx-auto">
          Industry software engineering experience collaborating on production modules and backend services.
        </p>
      </div>

      <div className="max-w-3xl mx-auto">
        {EXPERIENCE_LIST.map((exp, index) => (
          <div
            key={index}
            className="bg-[#0b1120] border border-slate-800/90 hover:border-blue-500/50 rounded-2xl p-6 sm:p-8 transition-all duration-200 shadow-xl shadow-black/30 relative overflow-hidden"
          >
            {/* Subtle glow accent */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

            <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
              <div>
                <span className="text-xs font-mono text-cyan-400 font-semibold px-2.5 py-1 rounded-md bg-cyan-950/40 border border-cyan-500/30 inline-flex items-center gap-1.5 mb-2">
                  <Calendar className="w-3.5 h-3.5" />
                  Duration: {exp.duration}
                </span>

                <h3 className="text-xl font-bold text-white tracking-tight">
                  {exp.role}
                </h3>

                <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-sm font-medium text-slate-300 mt-1">
                  <span className="text-blue-400 font-semibold">{exp.company}</span>
                  <span className="text-slate-600">•</span>
                  <span className="text-slate-400 flex items-center gap-1 text-xs">
                    <MapPin className="w-3.5 h-3.5 text-slate-500" />
                    {exp.location}
                  </span>
                </div>
              </div>

              <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-700/60 flex items-center justify-center shrink-0">
                <Briefcase className="w-6 h-6 text-blue-400" />
              </div>
            </div>

            <div className="bg-[#080d19] border border-slate-850 rounded-xl p-4 mb-6">
              <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
                Core Contribution:
              </h4>
              <p className="text-sm text-slate-300 leading-relaxed">
                {exp.description}
              </p>
            </div>

            <div>
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block mb-2">
                Technologies Utilized:
              </span>
              <div className="flex flex-wrap gap-2">
                {exp.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs px-3 py-1 rounded-lg bg-slate-900 border border-slate-700 text-slate-200 font-mono"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
