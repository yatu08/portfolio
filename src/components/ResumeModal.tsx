import React from 'react';
import { 
  LuX as X, 
  LuPrinter as Printer, 
  LuGraduationCap as GraduationCap, 
  LuMail as Mail, 
  LuMapPin as MapPin 
} from 'react-icons/lu';
import { profileData } from '../data/profile';
import { experienceList } from '../data/experience';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8 overflow-y-auto bg-black/75 backdrop-blur-md animate-fade-in">
      <div
        className="relative w-full max-w-5xl apple-glass-card rounded-3xl p-6 sm:p-8 my-auto shadow-elegant border border-border/80 overflow-hidden flex flex-col max-h-[calc(100vh-3.5rem)] sm:max-h-[calc(100vh-5rem)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Controls */}
        <div className="flex items-center justify-between pb-5 border-b border-border/70 shrink-0">
          <div className="flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
            <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground font-semibold">
              Curriculum Vitae · 4+ Years Experience
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 sm:gap-2 h-8 px-3.5 sm:px-4 rounded-xl bg-foreground text-background text-xs font-medium hover:opacity-90 active:scale-95 transition shadow-subtle whitespace-nowrap"
              title="Print or Save as PDF"
            >
              <Printer className="h-3.5 w-3.5" strokeWidth={1.75} />
              <span className="hidden sm:inline">Print / Save PDF</span>
              <span className="sm:hidden">Print</span>
            </button>
            <button
              onClick={onClose}
              className="h-8 w-8 rounded-xl glass-pill border border-border/70 flex items-center justify-center text-muted-foreground hover:text-foreground transition active:scale-95"
              aria-label="Close resume modal"
            >
              <X className="h-4 w-4" strokeWidth={1.75} />
            </button>
          </div>
        </div>

        {/* Resume Document Body */}
        <div className="py-6 space-y-8 flex-1 overflow-y-auto pr-2">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-display font-bold tracking-tight text-foreground">
                {profileData.name}
              </h1>
              <p className="text-foreground/80 font-medium text-base mt-1">
                Frontend Developer — React.js · Angular · Next.js · TypeScript
              </p>
            </div>
            <div className="text-xs font-mono space-y-1 text-muted-foreground">
              <div className="flex items-center gap-2">
                <Mail className="h-3.5 w-3.5 text-foreground/70" strokeWidth={1.75} />
                <a href={`mailto:${profileData.email}`} className="hover:text-foreground transition-colors">
                  {profileData.email}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-3.5 w-3.5 text-foreground/70" strokeWidth={1.75} />
                <span>India · Open to Remote / Hybrid Roles</span>
              </div>
            </div>
          </div>

          {/* Executive Summary */}
          <div>
            <h2 className="text-xs font-mono uppercase tracking-wider text-primary font-semibold mb-2">
              Professional Summary
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Frontend Developer with <strong>4+ years of hands-on professional experience</strong> building high-performance, responsive web applications in enterprise and SaaS environments. Proven track record transforming complex Figma designs into pixel-perfect, accessible user interfaces using React, Angular, Next.js, and TypeScript. Experienced with REST API integrations, state management, design systems, and incorporating modern AI frontend capabilities.
            </p>
          </div>

          {/* Technical Skills */}
          <div>
            <h2 className="text-xs font-mono uppercase tracking-wider text-primary font-semibold mb-3">
              Core Technical Competencies
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="apple-glass rounded-xl p-3.5 border border-border/70">
                <span className="font-semibold text-foreground">Frontend Frameworks:</span>
                <p className="text-muted-foreground mt-1">React.js, Next.js, Angular, RxJS</p>
              </div>
              <div className="apple-glass rounded-xl p-3.5 border border-border/70">
                <span className="font-semibold text-foreground">Languages &amp; Core:</span>
                <p className="text-muted-foreground mt-1">JavaScript (ES6+), TypeScript, HTML5, CSS3, SCSS</p>
              </div>
              <div className="apple-glass rounded-xl p-3.5 border border-border/70">
                <span className="font-semibold text-foreground">Styling &amp; UI Systems:</span>
                <p className="text-muted-foreground mt-1">Tailwind CSS, CSS Modules, Responsive Web Design, Component Architecture</p>
              </div>
              <div className="apple-glass rounded-xl p-3.5 border border-border/70">
                <span className="font-semibold text-foreground">Tools &amp; AI Frontend:</span>
                <p className="text-muted-foreground mt-1">Figma to Code, Git / GitHub, REST APIs, OpenAI / Claude API Integrations</p>
              </div>
            </div>
          </div>

          {/* Work Experience */}
          <div>
            <h2 className="text-xs font-mono uppercase tracking-wider text-primary font-semibold mb-4">
              Work History ({profileData.experienceYears} Years)
            </h2>
            <div className="space-y-6">
              {experienceList.map((exp) => (
                <div key={exp.id} className="border-l-2 border-primary/30 pl-4 space-y-2">
                  <div className="flex flex-wrap items-center justify-between gap-1">
                    <h3 className="font-display font-semibold text-base text-foreground">
                      {exp.role} <span className="text-primary font-normal">@ {exp.company}</span>
                    </h3>
                    <span className="text-xs font-mono text-primary font-medium">{exp.period}</span>
                  </div>
                  <ul className="space-y-1.5 mt-2">
                    {exp.responsibilities.map((resp, idx) => (
                      <li key={idx} className="text-xs text-muted-foreground flex items-start gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-primary shrink-0 mt-1" />
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div>
            <h2 className="text-xs font-mono uppercase tracking-wider text-primary font-semibold mb-2">
              Education & Professional Foundation
            </h2>
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <GraduationCap className="h-4 w-4 text-foreground/80" strokeWidth={1.75} />
                <span className="font-medium text-foreground">Bachelor's Degree in Computer Science / Engineering</span>
              </div>
              <span className="font-mono">Graduated with Distinction</span>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="pt-4 border-t border-border flex items-center justify-between flex-wrap gap-3">
          <p className="text-xs text-muted-foreground">
            Available immediately for full-time Frontend Developer positions.
          </p>
          <button
            onClick={onClose}
            className="h-9 px-5 rounded-xl border border-border text-xs font-medium hover:bg-muted transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
