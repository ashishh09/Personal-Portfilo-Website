import React, { useState } from 'react';
import { Terminal, Database, Wrench, Layers, Code, Sparkles, BookOpen } from 'lucide-react';
import { SKILL_GROUPS } from '../data/portfolioData';

export const Skills: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Programming Languages':
        return <Code className="w-4 h-4 text-blue-400" />;
      case 'Java & Backend':
        return <Terminal className="w-4 h-4 text-cyan-400" />;
      case 'Database':
        return <Database className="w-4 h-4 text-emerald-400" />;
      case 'Tools':
        return <Wrench className="w-4 h-4 text-amber-400" />;
      case 'Other Technologies':
        return <Layers className="w-4 h-4 text-indigo-400" />;
      default:
        return <Sparkles className="w-4 h-4 text-blue-400" />;
    }
  };

  const filteredGroups =
    selectedCategory === 'All'
      ? SKILL_GROUPS
      : SKILL_GROUPS.filter((group) => group.category === selectedCategory);

  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-900">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono uppercase tracking-wider mb-3">
          <span>Technical Toolkit</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Skills & Technologies
        </h2>
        <p className="mt-3 text-sm sm:text-base text-slate-400 max-w-2xl mx-auto">
          Honest, transparent overview of programming languages, frameworks, databases, and development tools with active learning designations.
        </p>
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
        <button
          onClick={() => setSelectedCategory('All')}
          className={`min-h-[38px] px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer ${
            selectedCategory === 'All'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-500/30'
              : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
          }`}
        >
          All Skills ({SKILL_GROUPS.reduce((acc, g) => acc + g.skills.length, 0)})
        </button>

        {SKILL_GROUPS.map((group) => (
          <button
            key={group.category}
            onClick={() => setSelectedCategory(group.category)}
            className={`min-h-[38px] px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
              selectedCategory === group.category
                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/30'
                : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
            }`}
          >
            {getCategoryIcon(group.category)}
            <span>{group.category}</span>
          </button>
        ))}
      </div>

      {/* Skills Groups Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredGroups.map((group) => (
          <div
            key={group.category}
            className="bg-[#0b1120] border border-slate-800/90 hover:border-blue-500/40 rounded-2xl p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/10 flex flex-col justify-between"
          >
            <div>
              {/* Header */}
              <div className="flex items-center gap-2.5 pb-4 border-b border-slate-800/80 mb-4">
                <div className="p-2 rounded-lg bg-slate-900 border border-slate-700/60">
                  {getCategoryIcon(group.category)}
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">
                    {group.category}
                  </h3>
                  <p className="text-[11px] text-slate-400">
                    {group.description}
                  </p>
                </div>
              </div>

              {/* Skill chips */}
              <div className="flex flex-wrap gap-2 pt-1">
                {group.skills.map((skill) => {
                  const isLearning = skill.status === 'learning';
                  const isBasic = skill.status === 'basic';

                  return (
                    <div
                      key={skill.name}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-150 ${
                        isLearning
                          ? 'bg-cyan-950/40 border border-cyan-500/40 text-cyan-200'
                          : isBasic
                          ? 'bg-slate-900 border border-slate-700/80 text-slate-300'
                          : 'bg-slate-850/80 border border-slate-700/60 text-white hover:border-blue-500/50 hover:bg-slate-800'
                      }`}
                    >
                      <span>{skill.name}</span>

                      {/* Status indicator tag */}
                      {isLearning && (
                        <span className="flex items-center gap-1 text-[10px] font-mono px-1.5 py-0.2 rounded bg-cyan-500/20 text-cyan-300 font-normal">
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                          Learning
                        </span>
                      )}

                      {isBasic && (
                        <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-800 text-slate-400 font-normal">
                          Basic
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Bottom note for honest skills representation */}
            <div className="mt-5 pt-3 border-t border-slate-900 text-[11px] text-slate-500 flex items-center justify-between font-mono">
              <span>{group.skills.length} competencies</span>
              {group.skills.some((s) => s.status === 'learning') && (
                <span className="text-cyan-400 flex items-center gap-1">
                  <BookOpen className="w-3 h-3" /> In active study
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Honest Transparency Note */}
      <div className="mt-10 max-w-2xl mx-auto p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 text-center">
        <p className="text-xs text-slate-400 leading-relaxed">
          <strong className="text-slate-300">Recruiter Note:</strong> Proficiency levels are stated accurately without exaggerated percentage bars. Technologies tagged with <span className="text-cyan-300 font-mono">Learning</span> represent ongoing coursework and practical lab implementations.
        </p>
      </div>
    </section>
  );
};
