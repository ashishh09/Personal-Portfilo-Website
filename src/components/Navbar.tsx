import React, { useState, useEffect } from 'react';
import { Menu, X, FileDown, Terminal, ChevronRight } from 'lucide-react';
import { downloadActiveResume } from '../utils/resumeStorage';

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onDownloadResume?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeSection, onNavigate, onDownloadResume }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'experience', label: 'Experience' },
    { id: 'education', label: 'Education' },
    { id: 'certifications', label: 'Certifications' },
    { id: 'resume', label: 'Resume' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleDownload = async (e: React.MouseEvent) => {
    e.preventDefault();
    setDownloading(true);
    try {
      if (onDownloadResume) {
        onDownloadResume();
      } else {
        await downloadActiveResume();
      }
    } finally {
      setTimeout(() => setDownloading(false), 800);
    }
  };

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#070b14]/85 backdrop-blur-md border-b border-slate-800/80 shadow-lg shadow-black/20 py-3'
          : 'bg-transparent border-b border-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo / Brand */}
          <button
            onClick={() => handleLinkClick('home')}
            className="flex items-center gap-2 text-left group cursor-pointer"
            aria-label="Ashish Satish Bhoite Home"
          >
            <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-blue-600 to-cyan-400 p-[1px] shadow-sm shadow-blue-500/30">
              <div className="w-full h-full bg-[#0a0f1d] rounded-[7px] flex items-center justify-center">
                <Terminal className="w-4 h-4 text-blue-400 group-hover:rotate-6 transition-transform duration-300" />
              </div>
            </div>
            <div>
              <span className="text-base font-bold tracking-tight text-white group-hover:text-blue-400 transition-colors">
                Ashish Satish Bhoite
              </span>
              <span className="block text-[11px] font-mono text-slate-400 tracking-wide">
                Java • DevOps • ML
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-[#0d1424]/60 border border-slate-800/70 px-3 py-1.5 rounded-full backdrop-blur-sm">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  id={`nav-${link.id}`}
                  onClick={() => handleLinkClick(link.id)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30 shadow-[0_0_12px_rgba(59,130,246,0.25)]'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/40'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Action CTA: Highlighted Download Resume */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              id="navbar-download-resume-btn"
              onClick={handleDownload}
              disabled={downloading}
              className="relative inline-flex items-center justify-center gap-2 px-4 py-2 text-xs font-semibold tracking-wide text-white bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 rounded-lg shadow-md shadow-blue-500/20 hover:shadow-blue-500/35 transition-all duration-200 cursor-pointer active:scale-95 disabled:opacity-75"
              aria-label="Download Resume"
            >
              <FileDown className={`w-4 h-4 ${downloading ? 'animate-bounce' : ''}`} />
              <span>{downloading ? 'Downloading...' : 'Download Resume'}</span>
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              id="mobile-download-btn"
              onClick={handleDownload}
              className="sm:hidden p-2 rounded-lg bg-blue-600/20 border border-blue-500/30 text-blue-400 hover:bg-blue-600/30"
              aria-label="Download Resume"
            >
              <FileDown className="w-4 h-4" />
            </button>

            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="min-h-[44px] min-w-[44px] flex items-center justify-center p-2 rounded-lg text-slate-300 hover:text-white bg-slate-900/80 border border-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          id="mobile-dropdown-menu"
          className="lg:hidden mt-3 px-4 pb-6 pt-2 bg-[#0a0f1d]/95 backdrop-blur-xl border-b border-slate-800 animate-in fade-in slide-in-from-top-2 duration-200 shadow-2xl"
        >
          <div className="flex flex-col space-y-1.5 max-w-md mx-auto">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  className={`min-h-[44px] flex items-center justify-between px-4 py-2.5 rounded-lg text-sm font-medium transition-colors text-left ${
                    isActive
                      ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30'
                      : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
                  }`}
                >
                  <span>{link.label}</span>
                  <ChevronRight className="w-4 h-4 text-slate-500" />
                </button>
              );
            })}

            <div className="pt-3 border-t border-slate-800 mt-2">
              <button
                onClick={handleDownload}
                disabled={downloading}
                className="w-full min-h-[44px] flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 shadow-md shadow-blue-500/20"
              >
                <FileDown className="w-4 h-4" />
                <span>{downloading ? 'Downloading...' : 'Download Resume (PDF)'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
