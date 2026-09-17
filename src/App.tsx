import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Experience } from './components/Experience';
import { Education } from './components/Education';
import { Certifications } from './components/Certifications';
import { ResumeSection } from './components/ResumeSection';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { StoredResume } from './types';
import { downloadActiveResume } from './utils/resumeStorage';
import { CheckCircle2 } from 'lucide-react';

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('home');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Monitor active scroll section
  useEffect(() => {
    const sections = [
      'home',
      'about',
      'skills',
      'projects',
      'experience',
      'education',
      'certifications',
      'resume',
      'contact',
    ];

    const handleScroll = () => {
      const scrollY = window.scrollY + 200;
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el) {
          const top = el.offsetTop;
          if (scrollY >= top) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const navOffset = 80;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  const handleDownloadResume = async () => {
    try {
      await downloadActiveResume();
      showToast('Downloading Ashish_Bhoite_Resume.pdf...');
    } catch {
      showToast('Failed to download resume.');
    }
  };

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const handleResumeUpdated = (resume: StoredResume) => {
    showToast(`Resume "${resume.fileName}" uploaded and set active.`);
  };

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 flex flex-col selection:bg-blue-600 selection:text-white">
      {/* Sticky Navigation Bar */}
      <Navbar
        activeSection={activeSection}
        onNavigate={scrollToSection}
        onDownloadResume={handleDownloadResume}
      />

      {/* Main Content Sections */}
      <main className="flex-grow">
        <Hero
          onViewProjects={() => scrollToSection('projects')}
          onContactMe={() => scrollToSection('contact')}
          onDownloadResume={handleDownloadResume}
        />

        <About />

        <Skills />

        <Projects />

        <Experience />

        <Education />

        <Certifications />

        <ResumeSection
          onDownloadResume={handleDownloadResume}
          onResumeUpdated={handleResumeUpdated}
        />

        <Contact />
      </main>

      {/* Footer */}
      <Footer onScrollToTop={() => scrollToSection('home')} />

      {/* Global Toast Notification */}
      {toastMessage && (
        <div
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-xl bg-slate-900/95 border border-blue-500/40 text-white text-xs sm:text-sm font-medium shadow-2xl shadow-black/80 backdrop-blur-md animate-in fade-in slide-in-from-bottom-4 duration-200"
          role="status"
        >
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
