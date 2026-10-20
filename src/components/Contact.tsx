import React, { useState } from 'react';
import { 
  LuArrowRight as ArrowRight, 
  LuMail as Mail, 
  LuLinkedin as Linkedin, 
  LuGithub as Github, 
  LuCircleCheck as CheckCircle2, 
  LuCircleAlert as AlertCircle, 
  LuLoaderCircle as Loader2,
  LuCopy as Copy,
  LuCheck as Check
} from 'react-icons/lu';
import confetti from 'canvas-confetti';
import { profileData } from '../data/profile';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [copiedEmail, setCopiedEmail] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    if (status === 'error') {
      setStatus('idle');
      setErrorMessage('');
    }
  };

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText(profileData.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2200);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Basic Validation
    if (!formData.name.trim()) {
      setStatus('error');
      setErrorMessage('Please enter your name.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email)) {
      setStatus('error');
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    if (!formData.message.trim() || formData.message.trim().length < 10) {
      setStatus('error');
      setErrorMessage('Please enter a message with at least 10 characters.');
      return;
    }

    // Simulate sending message
    setStatus('loading');
    setTimeout(() => {
      setStatus('success');
      // Fire subtle champagne & silver confetti
      try {
        confetti({
          particleCount: 70,
          spread: 60,
          origin: { y: 0.65 },
          colors: ['#d4af7a', '#ffffff', '#e4e4e7', '#a1a1aa', '#18181b'],
        });
      } catch (err) {
        // Fallback gracefully
      }
      setFormData({ name: '', email: '', message: '' });
    }, 850);
  };

  return (
    <section id="contact" className="py-28 relative">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto">
          <div className="text-xs font-mono uppercase tracking-[0.25em] text-muted-foreground font-semibold mb-3">
            05 / Dialogue
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-bold tracking-tight text-foreground">
            Let's build something <span className="text-gradient">exceptional</span>
          </h2>
          <p className="mt-4 text-muted-foreground text-base sm:text-lg leading-relaxed">
            Have an open engineering role, a high-growth product, or a technical inquiry? Send a message — I typically reply within 24 hours.
          </p>
        </div>

        {/* Content: Form + Quick Contact Cards */}
        <div className="mt-14 grid lg:grid-cols-5 gap-8 items-start">
          {/* Contact Form */}
          <form
            onSubmit={handleSubmit}
            className="lg:col-span-3 glass rounded-2xl p-6 sm:p-8 space-y-4 shadow-card border border-border"
          >
            {status === 'success' && (
              <div className="p-4 rounded-xl bg-secondary border border-border text-foreground text-sm flex items-start gap-3">
                <CheckCircle2 className="h-4 w-4 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold">Message dispatched.</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Thank you for reaching out. I will get back to you promptly.
                  </p>
                </div>
              </div>
            )}

            {status === 'error' && (
              <div className="p-4 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-sm flex items-center gap-3">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-mono uppercase tracking-wider text-muted-foreground font-medium">
                  Your Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Jane Doe"
                  maxLength={255}
                  required
                  className="mt-2 w-full rounded-lg border border-border bg-background/60 px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground/50 transition"
                />
              </div>

              <div>
                <label className="text-xs font-mono uppercase tracking-wider text-muted-foreground font-medium">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="jane@company.com"
                  maxLength={255}
                  required
                  className="mt-2 w-full rounded-lg border border-border bg-background/60 px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground/50 transition"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center">
                <label className="text-xs font-mono uppercase tracking-wider text-muted-foreground font-medium">
                  Project / Opportunity Details *
                </label>
                <span className="text-[10px] font-mono text-muted-foreground">
                  {formData.message.length}/1000
                </span>
              </div>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={5}
                maxLength={1000}
                placeholder="Describe your product, technical challenges, or team setup…"
                required
                className="mt-2 w-full rounded-lg border border-border bg-background/60 px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground/50 transition resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={status === 'loading'}
              className="inline-flex items-center justify-center gap-2 h-11 px-7 rounded-xl bg-foreground text-background font-medium hover:opacity-90 transition-all active:scale-95 disabled:opacity-60 cursor-pointer shadow-subtle text-sm"
            >
              {status === 'loading' ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Dispatching…</span>
                </>
              ) : (
                <>
                  <span>Send Message</span>
                  <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.75} />
                </>
              )}
            </button>
          </form>

          {/* Quick Contact Cards */}
          <div className="lg:col-span-2 space-y-3">
            {/* Email Card with 1-click copy */}
            <div className="glass rounded-xl p-4 border border-border flex items-center justify-between group hover:border-foreground/30 transition-all">
              <a
                href={`mailto:${profileData.email}`}
                className="flex items-center gap-3 min-w-0 flex-1"
              >
                <div className="h-10 w-10 rounded-xl bg-card border border-border shadow-subtle flex items-center justify-center shrink-0 group-hover:border-foreground/40 transition-colors">
                  <Mail className="h-4 w-4 text-foreground" strokeWidth={1.75} />
                </div>
                <div className="min-w-0">
                  <div className="text-[11px] uppercase tracking-wider text-muted-foreground font-mono">
                    Direct Email
                  </div>
                  <div className="font-medium truncate text-foreground text-xs sm:text-[13px] font-mono mt-0.5">
                    {profileData.email}
                  </div>
                </div>
              </a>

              <button
                type="button"
                onClick={handleCopyEmail}
                className="h-8 w-8 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition shrink-0 ml-2"
                title="Copy email to clipboard"
              >
                {copiedEmail ? (
                  <Check className="h-3.5 w-3.5 text-emerald-500" strokeWidth={2} />
                ) : (
                  <Copy className="h-3.5 w-3.5" strokeWidth={1.75} />
                )}
              </button>
            </div>

            {/* LinkedIn Card */}
            <a
              href={profileData.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="glass rounded-xl p-4 flex items-center gap-3 hover:border-foreground/30 transition-all group border border-border"
            >
              <div className="h-10 w-10 rounded-xl bg-card border border-border shadow-subtle flex items-center justify-center shrink-0 group-hover:border-foreground/40 transition-colors">
                <Linkedin className="h-4 w-4 text-foreground" strokeWidth={1.75} />
              </div>
              <div className="min-w-0">
                <div className="text-[11px] uppercase tracking-wider text-muted-foreground font-mono">
                  Network
                </div>
                <div className="font-semibold truncate text-foreground text-sm">
                  Connect on LinkedIn
                </div>
              </div>
            </a>

            {/* GitHub Card */}
            <a
              href={profileData.github}
              target="_blank"
              rel="noopener noreferrer"
              className="glass rounded-xl p-4 flex items-center gap-3 hover:border-foreground/30 transition-all group border border-border"
            >
              <div className="h-10 w-10 rounded-xl bg-card border border-border shadow-subtle flex items-center justify-center shrink-0 group-hover:border-foreground/40 transition-colors">
                <Github className="h-4 w-4 text-foreground" strokeWidth={1.75} />
              </div>
              <div className="min-w-0">
                <div className="text-[11px] uppercase tracking-wider text-muted-foreground font-mono">
                  Codebase
                </div>
                <div className="font-medium truncate text-foreground text-xs sm:text-[13px] font-mono">
                  github.com/{profileData.githubUsername}
                </div>
              </div>
            </a>

            {/* Availability Status Card */}
            <div className="glass rounded-xl p-4 border border-border bg-card">
              <div className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground">
                Status
              </div>
              <p className="mt-1.5 text-xs sm:text-[13px] text-foreground font-semibold flex items-center">
                <span className="h-2 w-2 rounded-full bg-emerald-500 mr-2 shrink-0" />
                Open for Frontend Opportunities
              </p>
              <p className="text-xs sm:text-[13px] text-muted-foreground mt-1 leading-relaxed">
                Full-time, contract, and high-impact remote engineering roles.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
