import React, { useState } from 'react';
import { Mail, Github, Linkedin, Phone, Send, CheckCircle2, AlertCircle, Copy, Check, ExternalLink } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedStatus, setSubmittedStatus] = useState<string | null>(null);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const validateForm = () => {
    const errs: { name?: string; email?: string; message?: string } = {};

    if (!formData.name.trim()) {
      errs.name = 'Please enter your name.';
    }

    if (!formData.email.trim()) {
      errs.email = 'Please enter your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = 'Please enter a valid email address.';
    }

    if (!formData.message.trim()) {
      errs.message = 'Please enter a message.';
    } else if (formData.message.trim().length < 10) {
      errs.message = 'Message must be at least 10 characters.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    // Realistic client-side handling without fake server claims
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmittedStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setErrors({});

      setTimeout(() => {
        setSubmittedStatus(null);
      }, 7000);
    }, 600);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.phoneRaw);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-900">
      <div className="text-center mb-14">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono uppercase tracking-wider mb-3">
          <span>Get In Touch</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Let's Build Something Together
        </h2>
        <p className="mt-3 text-sm sm:text-base text-slate-400 max-w-2xl mx-auto">
          Feel free to reach out for engineering opportunities, technical discussions, or software development collaborations.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-5xl mx-auto">
        {/* Contact Info Cards */}
        <div className="lg:col-span-5 space-y-4">
          {/* Direct Email Card */}
          <div className="bg-[#0b1120] border border-slate-800/90 rounded-2xl p-5 hover:border-blue-500/40 transition-all duration-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                Email
              </span>
              <button
                onClick={handleCopyEmail}
                className="p-1.5 rounded-md hover:bg-slate-800 text-slate-400 hover:text-white transition-colors flex items-center gap-1 text-[11px] font-mono cursor-pointer"
                title="Copy email to clipboard"
              >
                {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedEmail ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              className="text-base sm:text-lg font-bold text-white hover:text-blue-400 transition-colors flex items-center gap-2"
            >
              <Mail className="w-5 h-5 text-blue-400 shrink-0" />
              <span className="break-all">{PERSONAL_INFO.email}</span>
            </a>
          </div>

          {/* Direct Phone / WhatsApp Card */}
          <div className="bg-[#0b1120] border border-slate-800/90 rounded-2xl p-5 hover:border-blue-500/40 transition-all duration-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                Contact Number
              </span>
              <button
                onClick={handleCopyPhone}
                className="p-1.5 rounded-md hover:bg-slate-800 text-slate-400 hover:text-white transition-colors flex items-center gap-1 text-[11px] font-mono cursor-pointer"
                title="Copy phone number to clipboard"
              >
                {copiedPhone ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedPhone ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
            <a
              href={`tel:${PERSONAL_INFO.phoneTel}`}
              className="text-base sm:text-lg font-bold text-white hover:text-blue-400 transition-colors flex items-center gap-2"
            >
              <Phone className="w-5 h-5 text-emerald-400 shrink-0" />
              <span>{PERSONAL_INFO.phone}</span>
            </a>
            <div className="text-[11px] text-slate-500 mt-2 font-mono flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              Available for direct calls & WhatsApp messaging
            </div>
          </div>

          {/* LinkedIn Card */}
          <div className="bg-[#0b1120] border border-slate-800/90 rounded-2xl p-5 hover:border-blue-500/40 transition-all duration-200">
            <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block mb-2">
              LinkedIn Profile
            </span>
            <a
              href={PERSONAL_INFO.linkedInUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-base sm:text-lg font-bold text-white hover:text-blue-400 transition-colors flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <Linkedin className="w-5 h-5 text-cyan-400 shrink-0" />
                <span className="truncate">{PERSONAL_INFO.linkedInName}</span>
              </div>
              <ExternalLink className="w-4 h-4 text-slate-500 shrink-0 ml-2" />
            </a>
            <div className="text-[11px] text-slate-400 mt-2 font-mono truncate">
              in/{PERSONAL_INFO.linkedInDisplay}
            </div>
          </div>

          {/* GitHub Card */}
          <div className="bg-[#0b1120] border border-slate-800/90 rounded-2xl p-5 hover:border-blue-500/40 transition-all duration-200">
            <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block mb-2">
              GitHub
            </span>
            <a
              href={PERSONAL_INFO.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-base sm:text-lg font-bold text-white hover:text-blue-400 transition-colors flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <Github className="w-5 h-5 text-slate-300 shrink-0" />
                <span>{PERSONAL_INFO.githubUsername}</span>
              </div>
              <ExternalLink className="w-4 h-4 text-slate-500 shrink-0 ml-2" />
            </a>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-7 bg-[#0b1120] border border-slate-800/90 rounded-2xl p-6 sm:p-8 shadow-xl shadow-black/30">
          <h3 className="text-lg font-bold text-white mb-1">
            Send a Direct Message
          </h3>
          <p className="text-xs text-slate-400 mb-5">
            Fill out the form below with your inquiry or project opportunity.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name input */}
            <div>
              <label htmlFor="contact-name" className="block text-xs font-mono text-slate-300 mb-1.5">
                Your Name <span className="text-blue-400">*</span>
              </label>
              <input
                id="contact-name"
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g., Alex Johnson"
                className={`w-full px-4 py-2.5 rounded-xl bg-[#070b14] text-white text-sm border transition-colors outline-none focus:ring-1 focus:ring-blue-500 ${
                  errors.name ? 'border-rose-500' : 'border-slate-800 focus:border-blue-500'
                }`}
              />
              {errors.name && (
                <span className="text-xs text-rose-400 mt-1 block flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {errors.name}
                </span>
              )}
            </div>

            {/* Email input */}
            <div>
              <label htmlFor="contact-email" className="block text-xs font-mono text-slate-300 mb-1.5">
                Your Email <span className="text-blue-400">*</span>
              </label>
              <input
                id="contact-email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="e.g., alex@company.com"
                className={`w-full px-4 py-2.5 rounded-xl bg-[#070b14] text-white text-sm border transition-colors outline-none focus:ring-1 focus:ring-blue-500 ${
                  errors.email ? 'border-rose-500' : 'border-slate-800 focus:border-blue-500'
                }`}
              />
              {errors.email && (
                <span className="text-xs text-rose-400 mt-1 block flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {errors.email}
                </span>
              )}
            </div>

            {/* Message input */}
            <div>
              <label htmlFor="contact-message" className="block text-xs font-mono text-slate-300 mb-1.5">
                Message <span className="text-blue-400">*</span>
              </label>
              <textarea
                id="contact-message"
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Write your message or inquiry here..."
                className={`w-full px-4 py-2.5 rounded-xl bg-[#070b14] text-white text-sm border transition-colors outline-none focus:ring-1 focus:ring-blue-500 resize-none ${
                  errors.message ? 'border-rose-500' : 'border-slate-800 focus:border-blue-500'
                }`}
              />
              {errors.message && (
                <span className="text-xs text-rose-400 mt-1 block flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {errors.message}
                </span>
              )}
            </div>

            {/* Submit Button */}
            <button
              id="send-message-submit-btn"
              type="submit"
              disabled={isSubmitting}
              className="min-h-[46px] w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-white bg-blue-600 hover:bg-blue-500 shadow-md shadow-blue-600/30 transition-all duration-200 cursor-pointer disabled:opacity-50 active:scale-98"
            >
              <Send className="w-4 h-4" />
              <span>{isSubmitting ? 'Validating...' : 'Send Message'}</span>
            </button>
          </form>

          {/* Submission confirmation notification */}
          {submittedStatus === 'success' && (
            <div className="mt-4 p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-200 text-xs sm:text-sm flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold">Message validated and drafted successfully!</span>
                <p className="text-slate-300 text-xs mt-1">
                  You can also dispatch this note directly to{' '}
                  <a href={`mailto:${PERSONAL_INFO.email}`} className="text-cyan-300 underline font-mono">
                    {PERSONAL_INFO.email}
                  </a>{' '}
                  for immediate response.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
