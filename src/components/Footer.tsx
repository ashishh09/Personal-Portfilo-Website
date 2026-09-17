import React from 'react';
import { Mail, Github, Linkedin, Phone, ArrowUp, Terminal } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface FooterProps {
  onScrollToTop: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onScrollToTop }) => {
  return (
    <footer className="bg-[#05080f] border-t border-slate-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Identity */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-6 h-6 rounded-md bg-blue-600/20 border border-blue-500/40 flex items-center justify-center">
              <Terminal className="w-3.5 h-3.5 text-blue-400" />
            </div>
            <span className="text-lg font-bold text-white tracking-tight">
              {PERSONAL_INFO.name}
            </span>
          </div>
          <p className="text-xs font-mono text-slate-400">
            {PERSONAL_INFO.headline}
          </p>
        </div>

        {/* Social & Contact Icons */}
        <div className="flex items-center gap-3">
          {/* GitHub */}
          <a
            href={PERSONAL_INFO.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 hover:border-blue-500/60 hover:bg-slate-850 flex items-center justify-center text-slate-300 hover:text-white transition-all duration-200"
            aria-label="GitHub Profile"
            title="GitHub: ashishh09"
          >
            <Github className="w-4 h-4" />
          </a>

          {/* LinkedIn */}
          <a
            href={PERSONAL_INFO.linkedInUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 hover:border-blue-500/60 hover:bg-slate-850 flex items-center justify-center text-cyan-400 hover:text-cyan-300 transition-all duration-200"
            aria-label="LinkedIn Profile"
            title="LinkedIn Profile: Ashish Bhoite"
          >
            <Linkedin className="w-4 h-4" />
          </a>

          {/* Direct Phone */}
          <a
            href={`tel:${PERSONAL_INFO.phoneTel}`}
            className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 hover:border-emerald-500/60 hover:bg-slate-850 flex items-center justify-center text-emerald-400 hover:text-emerald-300 transition-all duration-200"
            aria-label={`Call ${PERSONAL_INFO.phone}`}
            title={`Call or WhatsApp: ${PERSONAL_INFO.phone}`}
          >
            <Phone className="w-4 h-4" />
          </a>

          {/* Email */}
          <a
            href={`mailto:${PERSONAL_INFO.email}`}
            className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 hover:border-blue-500/60 hover:bg-slate-850 flex items-center justify-center text-blue-400 hover:text-blue-300 transition-all duration-200"
            aria-label="Send Email"
            title={`Email: ${PERSONAL_INFO.email}`}
          >
            <Mail className="w-4 h-4" />
          </a>
        </div>

        {/* Copyright and Back to Top */}
        <div className="flex items-center gap-4 text-center md:text-right">
          <p className="text-xs text-slate-500 font-mono">
            © 2026 {PERSONAL_INFO.name}. All rights reserved.
          </p>

          <button
            onClick={onScrollToTop}
            className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 hover:border-blue-500/50 hover:bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Back to top"
            title="Scroll to top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
};
