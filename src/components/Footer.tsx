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
    <footer className="border-t border-border py-12 mt-12 bg-background">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Copyright & Brand */}
          <div className="flex flex-col items-center sm:items-start gap-1">
            <div className="flex items-center gap-2">
              <span className="h-6 w-6 rounded-md bg-foreground text-background flex items-center justify-center font-mono text-xs font-bold">
                Y
              </span>
              <span className="text-sm font-semibold text-foreground">{profileData.name}</span>
            </div>
            <p className="text-xs text-muted-foreground mt-0.5">
              © {new Date().getFullYear()} {profileData.name}. All rights reserved.
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-2 text-muted-foreground">
            <a
              href={profileData.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="h-8 w-8 rounded-lg border border-border flex items-center justify-center hover:bg-secondary hover:text-foreground hover:border-foreground/40 transition-all text-foreground/80 shadow-subtle"
              title="GitHub"
            >
              <Github className="h-3.5 w-3.5" strokeWidth={1.75} />
            </a>
            <a
              href={profileData.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="h-8 w-8 rounded-lg border border-border flex items-center justify-center hover:bg-secondary hover:text-foreground hover:border-foreground/40 transition-all text-foreground/80 shadow-subtle"
              title="LinkedIn"
            >
              <Linkedin className="h-3.5 w-3.5" strokeWidth={1.75} />
            </a>
            <a
              href={`mailto:${profileData.email}`}
              aria-label="Email"
              className="h-8 w-8 rounded-lg border border-border flex items-center justify-center hover:bg-secondary hover:text-foreground hover:border-foreground/40 transition-all text-foreground/80 shadow-subtle"
              title="Email"
            >
              <Mail className="h-3.5 w-3.5" strokeWidth={1.75} />
            </a>
          </div>

          {/* Back to top button */}
          <button
            type="button"
            onClick={scrollToTop}
            className="flex items-center gap-2 text-xs font-mono text-muted-foreground hover:text-foreground px-3 py-1.5 rounded-lg border border-border hover:bg-muted transition"
            aria-label="Back to top"
          >
            <span>Top</span>
            <ArrowUp className="h-3.5 w-3.5" strokeWidth={1.75} />
          </button>
        </div>

        <div className="mt-8 pt-6 border-t border-border/50 text-center text-xs font-mono text-muted-foreground flex items-center justify-center gap-2">
          <span>React</span>
          <span>·</span>
          <span>TypeScript</span>
          <span>·</span>
          <span>Tailwind CSS</span>
          <span>·</span>
          <span>Minimalist Architectural Design</span>
        </div>
      </div>
    </footer>
  );
};
