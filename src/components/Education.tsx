import React from 'react';
import { GraduationCap, Calendar, MapPin, Award, CheckCircle2 } from 'lucide-react';
import { EDUCATION_LIST } from '../data/portfolioData';

export const Education: React.FC = () => {
  return (
    <section id="education" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-900">
      <div className="text-center mb-14">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono uppercase tracking-wider mb-3">
          <span>Academics</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Education Timeline
        </h2>
        <p className="mt-3 text-sm sm:text-base text-slate-400 max-w-2xl mx-auto">
          Academic foundation in Computer Science, Cyber Security, and Software Engineering.
        </p>
      </div>

      <div className="relative max-w-3xl mx-auto">
        {/* Central timeline spine */}
        <div className="absolute left-4 sm:left-8 top-6 bottom-6 w-0.5 bg-gradient-to-b from-blue-500 via-cyan-500/60 to-slate-800" />

        <div className="space-y-8 relative">
          {EDUCATION_LIST.map((item, index) => (
            <div
              key={item.degree}
              className="relative pl-12 sm:pl-20 group"
            >
              {/* Timeline marker icon */}
              <div className="absolute left-2 sm:left-6 -translate-x-1/2 top-1.5 w-6 h-6 rounded-full bg-[#070b14] border-2 border-blue-500 group-hover:border-cyan-400 group-hover:scale-110 transition-all duration-200 flex items-center justify-center shadow-[0_0_12px_rgba(59,130,246,0.4)]">
                <div className="w-2 h-2 rounded-full bg-cyan-400" />
              </div>

              {/* Education Card */}
              <div className="bg-[#0d1424] border border-slate-800/90 group-hover:border-blue-500/50 rounded-2xl p-5 sm:p-6 transition-all duration-200 group-hover:shadow-xl group-hover:shadow-blue-500/10">
                <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                  <div>
                    <span className="text-xs font-mono text-blue-400 font-semibold px-2.5 py-1 rounded-md bg-blue-500/10 border border-blue-500/20 inline-flex items-center gap-1.5 mb-2">
                      <Calendar className="w-3.5 h-3.5" />
                      {item.period}
                    </span>
                    <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-blue-300 transition-colors">
                      {item.degree}
                    </h3>
                    <div className="text-sm font-medium text-slate-300 flex items-center gap-2 mt-1">
                      <GraduationCap className="w-4 h-4 text-slate-400" />
                      <span>{item.institution}</span>
                      {item.location && (
                        <>
                          <span className="text-slate-600">•</span>
                          <span className="text-slate-400 flex items-center gap-1 text-xs">
                            <MapPin className="w-3.5 h-3.5" />
                            {item.location}
                          </span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Academic Score Badge */}
                  <div className="flex flex-col items-end justify-center bg-slate-900/90 border border-slate-700/60 rounded-xl px-3.5 py-2 shrink-0">
                    <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400 flex items-center gap-1">
                      <Award className="w-3 h-3 text-amber-400" />
                      {item.scoreLabel}
                    </span>
                    <span className="text-lg font-extrabold text-blue-400 font-mono">
                      {item.score}
                    </span>
                  </div>
                </div>

                {/* Highlights */}
                <div className="pt-3 border-t border-slate-800/80">
                  <ul className="space-y-1.5">
                    {item.highlights.map((highlight, hIndex) => (
                      <li key={hIndex} className="text-xs sm:text-sm text-slate-400 flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
