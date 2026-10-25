import React from 'react';
import { 
  LuArrowUp as ArrowUp, 
  LuGithub as Github, 
  LuLinkedin as Linkedin, 
  LuMail as Mail 
} from 'react-icons/lu';
import { profileData } from '../data/profile';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-border/60 py-12 sm:py-16 mt-16 sm:mt-24 bg-background/50 overflow-hidden w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full min-w-0">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Copyright & Brand */}
          <div className="flex flex-col items-center sm:items-start gap-1">
            <div className="flex items-center gap-2.5">
              <span className="h-6 w-6 rounded-lg bg-foreground text-background flex items-center justify-center font-mono text-xs font-bold shadow-subtle">
                Y
              </span>
              <span className="text-sm font-semibold text-foreground tracking-tight">{profileData.name}</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              © {new Date().getFullYear()} {profileData.name}. All rights reserved.
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-2.5 text-muted-foreground">
            <a
              href={profileData.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="h-9 w-9 rounded-xl glass border border-border flex items-center justify-center hover:text-foreground transition-all text-foreground/80 shadow-subtle active:scale-95"
              title="GitHub"
            >
              <Github className="h-4 w-4" strokeWidth={1.75} />
            </a>
            <a
              href={profileData.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="h-9 w-9 rounded-xl glass border border-border flex items-center justify-center hover:text-foreground transition-all text-foreground/80 shadow-subtle active:scale-95"
              title="LinkedIn"
            >
              <Linkedin className="h-4 w-4" strokeWidth={1.75} />
            </a>
            <a
              href={`mailto:${profileData.email}`}
              aria-label="Email"
              className="h-9 w-9 rounded-xl glass border border-border flex items-center justify-center hover:text-foreground transition-all text-foreground/80 shadow-subtle active:scale-95"
              title="Email"
            >
              <Mail className="h-4 w-4" strokeWidth={1.75} />
            </a>
          </div>

          {/* Back to top button */}
          <button
            type="button"
            onClick={scrollToTop}
            className="flex items-center gap-2 text-xs font-mono text-muted-foreground hover:text-foreground px-4 py-1.5 rounded-xl glass border border-border transition active:scale-95 shadow-subtle"
            aria-label="Back to top"
          >
            <span>Top</span>
            <ArrowUp className="h-3.5 w-3.5" strokeWidth={1.75} />
          </button>
        </div>

        <div className="mt-10 pt-6 border-t border-border/40 text-center text-xs font-mono text-muted-foreground flex items-center justify-center gap-2 flex-wrap">
          <span>React 18</span>
          <span>·</span>
          <span>TypeScript</span>
          <span>·</span>
          <span>Tailwind CSS</span>
          <span>·</span>
          <span>Apple Human Interface Glass Architecture</span>
        </div>
      </div>
    </footer>
  );
};
