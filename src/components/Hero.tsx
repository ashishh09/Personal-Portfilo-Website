import React, { useEffect, useRef } from 'react';
import { FileDown, FolderGit2, Mail, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import { downloadActiveResume } from '../utils/resumeStorage';

interface HeroProps {
  onViewProjects: () => void;
  onContactMe: () => void;
  onDownloadResume?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onViewProjects, onContactMe, onDownloadResume }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Subtle, lightweight 2D interactive canvas (no heavy 3D)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener('resize', handleResize);

    // Particle nodes configuration
    const particleCount = Math.min(32, Math.floor(width / 35));
    const particles: { x: number; y: number; vx: number; vy: number; radius: number }[] = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        radius: Math.random() * 1.5 + 1,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw connecting lines between nearby particles
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        p1.x += p1.vx;
        p1.y += p1.vy;

        if (p1.x < 0 || p1.x > width) p1.vx *= -1;
        if (p1.y < 0 || p1.y > height) p1.vy *= -1;

        ctx.beginPath();
        ctx.arc(p1.x, p1.y, p1.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(59, 130, 246, 0.4)';
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 130) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            const alpha = (1 - dist / 130) * 0.15;
            ctx.strokeStyle = `rgba(56, 189, 248, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const handleDownload = async () => {
    if (onDownloadResume) {
      onDownloadResume();
    } else {
      await downloadActiveResume();
    }
  };

  const techBadges = [
    'Java',
    'Spring Boot',
    'Python',
    'MySQL',
    'Git',
    'GitHub',
    'DevOps',
    'Machine Learning'
  ];

  return (
    <section
      id="home"
      className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Background canvas for lightweight 2D particles */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none z-0 opacity-60"
      />

      {/* Subtle radial gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[300px] h-[250px] bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        {/* Recruiter Ready Status Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-700/80 text-slate-300 text-xs font-mono mb-6 shadow-sm shadow-blue-500/10">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-slate-300">Available for Software Engineer Roles & Internships</span>
          <span className="text-slate-500 hidden sm:inline">•</span>
          <span className="text-blue-400 font-medium hidden sm:inline flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" /> Verified Recruiter Portfolio
          </span>
        </div>

        {/* Primary Heading */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.15] mb-4">
          Ashish Satish Bhoite
        </h1>

        {/* Dynamic Subheading */}
        <div className="flex items-center justify-center gap-2 flex-wrap text-base sm:text-lg md:text-xl font-medium mb-6">
          <span className="text-blue-400 font-semibold">Java Developer</span>
          <span className="text-slate-600">|</span>
          <span className="text-cyan-300 font-semibold">DevOps Enthusiast</span>
          <span className="text-slate-600">|</span>
          <span className="text-indigo-300 font-semibold">ML Explorer</span>
        </div>

        {/* Professional Introduction */}
        <p className="max-w-2xl mx-auto text-base sm:text-lg text-slate-300 leading-relaxed mb-8">
          Computer Science Engineering student focused on Java development, backend technologies, DevOps and Machine Learning. Passionate about building practical software solutions, solving problems and continuously learning new technologies.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-10">
          {/* View My Projects */}
          <button
            id="hero-view-projects-btn"
            onClick={onViewProjects}
            className="min-h-[44px] inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-white bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-600/30 hover:shadow-blue-600/40 transition-all duration-200 cursor-pointer active:scale-95"
          >
            <FolderGit2 className="w-4 h-4" />
            <span>View My Projects</span>
            <ArrowRight className="w-4 h-4 text-blue-200" />
          </button>

          {/* Download Resume */}
          <button
            id="hero-download-resume-btn"
            onClick={handleDownload}
            className="min-h-[44px] inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-white bg-[#0f172a] hover:bg-slate-800 border border-slate-700 hover:border-blue-500/60 shadow-md shadow-black/40 hover:shadow-[0_0_15px_rgba(59,130,246,0.2)] transition-all duration-200 cursor-pointer active:scale-95"
          >
            <FileDown className="w-4 h-4 text-blue-400" />
            <span>Download Resume</span>
          </button>

          {/* Contact Me */}
          <button
            id="hero-contact-me-btn"
            onClick={onContactMe}
            className="min-h-[44px] inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-slate-300 hover:text-white bg-transparent hover:bg-slate-800/50 border border-slate-800 hover:border-slate-700 transition-all duration-200 cursor-pointer active:scale-95"
          >
            <Mail className="w-4 h-4 text-slate-400" />
            <span>Contact Me</span>
          </button>
        </div>

        {/* Technology Badges */}
        <div className="pt-6 border-t border-slate-800/80">
          <div className="flex items-center justify-center gap-1.5 text-xs text-slate-400 font-mono uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span>Core Toolset & Technical Stack</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 max-w-3xl mx-auto">
            {techBadges.map((badge) => (
              <span
                key={badge}
                className="inline-flex items-center px-3.5 py-1.5 rounded-lg text-xs font-medium text-slate-200 bg-[#0d1424]/80 border border-slate-800 hover:border-blue-500/50 hover:text-blue-300 hover:bg-[#111c33] transition-all duration-200 shadow-sm"
              >
                {badge}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
