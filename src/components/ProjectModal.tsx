import React, { useEffect } from 'react';
import { 
  LuX as X, 
  LuShieldCheck as ShieldCheck, 
  LuCheck as Check 
} from 'react-icons/lu';
import { Project } from '../types';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (project) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8 bg-black/75 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl glass rounded-2xl overflow-hidden shadow-2xl border border-border/90 bg-card text-card-foreground my-auto flex flex-col max-h-[calc(100vh-3.5rem)] sm:max-h-[calc(100vh-5rem)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Banner with architectural canvas */}
        <div className="relative shrink-0 h-40 sm:h-44 bg-gradient-to-br from-zinc-900 to-black p-5 sm:p-6 flex flex-col justify-between overflow-hidden border-b border-border/80">
          <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />
          
          <div className="flex items-center justify-between z-10">
            <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-300 bg-white/10 backdrop-blur-md rounded px-2.5 py-0.5 border border-white/15">
              {project.badge}
            </span>
            <button
              onClick={onClose}
              className="h-8 w-8 rounded-full bg-white/10 text-white backdrop-blur-md flex items-center justify-center hover:bg-white/20 transition border border-white/15"
              aria-label="Close modal"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="z-10">
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-white tracking-tight">
              {project.name}
            </h2>
            <p className="text-zinc-400 text-xs sm:text-sm mt-1 font-mono">
              {project.subtitle}
            </p>
          </div>
        </div>

        {/* Modal Content - scrollable body */}
        <div className="p-5 sm:p-7 space-y-5 flex-1 overflow-y-auto">
          {/* Overview */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-wider text-primary font-semibold mb-2">
              Project Overview
            </h3>
            <p className="text-sm sm:text-base text-foreground/85 leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Frontend Role & Contributions */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-wider text-primary font-semibold mb-3">
              Frontend Role &amp; Contributions
            </h3>
            <div className="text-xs font-mono text-muted-foreground mb-3 flex items-center gap-2">
              <span className="text-foreground font-semibold">Role:</span>
              <span className="text-foreground font-medium">{project.role}</span>
            </div>
            <ul className="space-y-2">
              {project.contributions.map((c, idx) => (
                <li key={idx} className="text-sm text-foreground/80 flex items-start gap-2.5">
                  <Check className="h-3.5 w-3.5 text-foreground/80 shrink-0 mt-0.5" strokeWidth={2} />
                  <span className="leading-relaxed">{c}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Tech Stack */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-wider text-primary font-semibold mb-3">
              Technologies &amp; Tools Used
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="text-xs px-3 py-1 rounded-full bg-muted text-foreground border border-border font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Highlights */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-wider text-primary font-semibold mb-2.5">
              Architectural Highlights
            </h3>
            <div className="grid sm:grid-cols-2 gap-2">
              {project.highlights.map((h) => (
                <div key={h} className="glass rounded-xl p-2.5 border border-border text-xs text-muted-foreground flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                  <span>{h}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Confidentiality Notice */}
          <div className="rounded-2xl p-4 bg-muted/60 border border-border/80 flex items-start gap-3">
            <ShieldCheck className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
            <div className="text-xs text-muted-foreground leading-relaxed">
              <span className="font-semibold text-foreground">Confidentiality Protected:</span>
              <br />
              This project was delivered for enterprise/commercial clients. In accordance with organizational confidentiality and IP agreements, source code and internal URLs remain confidential.
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-3.5 sm:px-7 border-t border-border flex justify-end shrink-0 bg-secondary/30">
          <button
            onClick={onClose}
            className="h-9 px-5 rounded-lg bg-foreground text-background text-xs sm:text-sm font-medium hover:opacity-90 transition active:scale-95 shadow-subtle whitespace-nowrap"
          >
            Close Details
          </button>
        </div>
      </div>
    </div>
  );
};
