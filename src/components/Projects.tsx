import React, { useState } from 'react';
import { Github, ExternalLink, Filter, CheckCircle, Code, Info, X, Layers } from 'lucide-react';
import { Project, ProjectCategory } from '../types';
import { PROJECTS } from '../data/portfolioData';

export const Projects: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<ProjectCategory>('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const categories: ProjectCategory[] = ['All', 'Java', 'Web', 'AI/ML', 'Cybersecurity', 'Robotics'];

  const filteredProjects =
    activeFilter === 'All'
      ? PROJECTS
      : PROJECTS.filter((p) => p.categories.includes(activeFilter as any));

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-900">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono uppercase tracking-wider mb-3">
          <span>Portfolio Works</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Featured Engineering Projects
        </h2>
        <p className="mt-3 text-sm sm:text-base text-slate-400 max-w-2xl mx-auto">
          Practical software systems spanning Java enterprise backends, machine learning models, cybersecurity authentication, and embedded hardware.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
        {categories.map((cat) => {
          const count =
            cat === 'All'
              ? PROJECTS.length
              : PROJECTS.filter((p) => p.categories.includes(cat as any)).length;

          return (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`min-h-[40px] px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer flex items-center gap-2 ${
                activeFilter === cat
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                  : 'bg-[#0b1120] text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800/90'
              }`}
            >
              <span>{cat}</span>
              <span
                className={`text-[11px] px-2 py-0.5 rounded-full ${
                  activeFilter === cat
                    ? 'bg-blue-700/80 text-blue-100'
                    : 'bg-slate-800 text-slate-400'
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="group bg-[#0b1120] border border-slate-800/90 hover:border-blue-500/50 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-blue-500/10 flex flex-col justify-between"
          >
            <div>
              {/* Category tags & indicator */}
              <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                <div className="flex flex-wrap gap-1.5">
                  {project.categories.map((cat) => (
                    <span
                      key={cat}
                      className="text-[10px] font-mono uppercase tracking-wider font-semibold px-2 py-0.5 rounded-md bg-blue-950/60 text-blue-300 border border-blue-800/50"
                    >
                      {cat}
                    </span>
                  ))}
                </div>

                {project.isFeatured && (
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-300 border border-amber-500/20 font-medium">
                    Featured
                  </span>
                )}
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors mb-2.5">
                {project.title}
              </h3>

              {/* Short Description */}
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                {project.description}
              </p>

              {/* Key Features list */}
              <div className="mb-5 space-y-1.5 bg-[#080d19] border border-slate-850 p-3 rounded-xl">
                <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block mb-1">
                  Key Implementations:
                </span>
                {project.keyFeatures.slice(0, 3).map((feat, fIndex) => (
                  <div key={fIndex} className="flex items-start gap-1.5 text-xs text-slate-300">
                    <CheckCircle className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              {/* Technologies stack chips */}
              <div className="flex flex-wrap gap-1.5 mb-6">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="text-[11px] px-2.5 py-1 rounded-md bg-slate-900 border border-slate-700/80 text-slate-300 font-mono"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Card Footer Actions */}
            <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between gap-3">
              {/* Architecture Details Modal Trigger */}
              <button
                onClick={() => setSelectedProject(project)}
                className="text-xs font-semibold text-blue-400 hover:text-blue-300 flex items-center gap-1.5 py-1.5 transition-colors cursor-pointer"
                aria-label={`View architecture details for ${project.title}`}
              >
                <Info className="w-3.5 h-3.5" />
                <span>Architecture</span>
              </button>

              <div className="flex items-center gap-2">
                {project.githubUrl ? (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="min-h-[36px] inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-200 bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-slate-600 transition-colors"
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>GitHub</span>
                  </a>
                ) : (
                  <span className="text-[11px] text-slate-500 font-mono">Academic Hardware</span>
                )}

                {project.liveDemoUrl && (
                  <a
                    href={project.liveDemoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="min-h-[36px] inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-white bg-blue-600 hover:bg-blue-500 shadow-sm shadow-blue-600/30 transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Live Demo</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Architecture Detail Modal */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-[#0b1120] border border-slate-700/80 rounded-2xl max-w-xl w-full p-6 shadow-2xl relative">
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 p-2 rounded-lg text-slate-400 hover:text-white bg-slate-800/80 hover:bg-slate-700"
              aria-label="Close dialog"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2 text-xs font-mono text-blue-400 mb-1">
              <Layers className="w-4 h-4" />
              <span>System Design & Architecture</span>
            </div>

            <h3 className="text-xl font-bold text-white mb-2">
              {selectedProject.title}
            </h3>

            <p className="text-sm text-slate-300 leading-relaxed mb-4">
              {selectedProject.description}
            </p>

            <div className="mb-4">
              <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider font-mono mb-2">
                All Key Implementations & Components:
              </h4>
              <ul className="space-y-2">
                {selectedProject.keyFeatures.map((feat, idx) => (
                  <li key={idx} className="text-xs sm:text-sm text-slate-300 flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-6">
              <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider font-mono mb-2">
                Technology Stack:
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {selectedProject.technologies.map((t) => (
                  <span
                    key={t}
                    className="text-xs px-2.5 py-1 rounded-md bg-slate-900 border border-slate-700 text-blue-300 font-mono"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 flex justify-end gap-3">
              {selectedProject.githubUrl && (
                <a
                  href={selectedProject.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-lg text-xs font-semibold text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 flex items-center gap-2"
                >
                  <Github className="w-4 h-4" />
                  <span>GitHub Repository</span>
                </a>
              )}
              <button
                onClick={() => setSelectedProject(null)}
                className="px-4 py-2 rounded-lg text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500"
              >
                Done Reading
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
