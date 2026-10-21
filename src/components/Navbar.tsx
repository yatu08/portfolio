import React, { useState } from 'react';
import { 
  LuSun as Sun, 
  LuMoon as Moon, 
  LuMenu as Menu, 
  LuX as X, 
  LuArrowUpRight as ArrowUpRight, 
  LuArrowLeft as ArrowLeft, 
  LuSparkles as Sparkles 
} from 'react-icons/lu';

interface NavbarProps {
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  activeSection: string;
  currentRoute?: 'home' | 'sandbox';
  onNavigate?: (route: 'home' | 'sandbox') => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  theme, 
  toggleTheme, 
  activeSection,
  currentRoute = 'home',
  onNavigate 
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'About', href: '#about', id: 'about' },
    { label: 'Skills', href: '#skills', id: 'skills' },
    { label: 'Projects', href: '#projects', id: 'projects' },
    { label: 'Experience', href: '#experience', id: 'experience' },
    { label: 'Contact', href: '#contact', id: 'contact' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    if (currentRoute === 'sandbox') {
      onNavigate?.('home');
      setTimeout(() => {
        const target = document.querySelector(href);
        if (target) target.scrollIntoView({ behavior: 'smooth' });
      }, 50);
      return;
    }
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-3 sm:px-6 pt-2.5 sm:pt-4 transition-all duration-200">
      <nav className="glass-nav max-w-6xl mx-auto rounded-2xl px-3.5 sm:px-6 py-2 sm:py-3 flex items-center justify-between border border-border shadow-subtle min-w-0">
        {/* Logo / Wordmark */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            if (currentRoute === 'sandbox') {
              onNavigate?.('home');
            } else {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }}
          className="font-display font-semibold text-base sm:text-lg tracking-tight hover:opacity-80 transition-opacity flex items-center gap-2.5"
          aria-label="Home"
        >
          <span className="h-7 w-7 rounded-lg bg-foreground text-background flex items-center justify-center font-mono text-xs font-bold shadow-subtle">
            Y
          </span>
          <div className="flex items-center gap-1.5">
            <span className="font-bold text-foreground">Yatin</span>
            <span className="text-muted-foreground text-xs font-mono hidden sm:inline">/ frontend</span>
          </div>
        </a>

        {/* Navigation / Route Status */}
        {currentRoute === 'sandbox' ? (
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onNavigate?.('home')}
              className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 rounded-lg text-xs font-mono font-medium bg-secondary border border-border hover:border-foreground/40 text-foreground transition active:scale-95 shadow-subtle whitespace-nowrap"
            >
              <ArrowLeft className="h-3 w-3" strokeWidth={1.75} />
              <span>Back to Portfolio</span>
            </button>
            <span className="hidden sm:inline text-xs font-mono text-muted-foreground whitespace-nowrap">/ Component Sandbox</span>
          </div>
        ) : (
          <ul className="hidden md:flex items-center gap-1 p-1 rounded-xl bg-secondary/60 border border-border/80 text-sm">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <li key={link.id}>
                  <a
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className={`relative px-3.5 py-1.5 rounded-lg text-xs transition-all duration-150 ${
                      isActive
                        ? 'bg-foreground text-background font-medium shadow-subtle'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted/40'
                    }`}
                  >
                    {link.label}
                  </a>
                </li>
              );
            })}
            {/* UI Sandbox Lab shortcut */}
            <li>
              <button
                type="button"
                onClick={() => onNavigate?.('sandbox')}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-mono font-medium text-foreground bg-card border border-border hover:border-foreground/40 transition shadow-subtle"
                title="Open Component Sandbox"
              >
                <Sparkles className="h-3 w-3" strokeWidth={1.75} />
                <span>Sandbox</span>
              </button>
            </li>
          </ul>
        )}

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Theme Toggle Button */}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            className="h-8 w-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/70 border border-border transition-colors"
          >
            {theme === 'dark' ? (
              <Sun className="h-3.5 w-3.5" strokeWidth={1.75} />
            ) : (
              <Moon className="h-3.5 w-3.5" strokeWidth={1.75} />
            )}
          </button>

          {/* Hire Me CTA Button */}
          <a
            href="#contact"
            onClick={(e) => handleLinkClick(e, '#contact')}
            className="hidden sm:inline-flex items-center gap-1.5 h-8 px-3.5 rounded-lg bg-foreground text-background text-xs font-medium hover:opacity-90 transition active:scale-95 shadow-subtle"
          >
            <span>Get in touch</span>
            <ArrowUpRight className="h-3 w-3" strokeWidth={1.75} />
          </a>

          {/* Mobile Menu Hamburger */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="md:hidden h-8 w-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted border border-border transition-colors"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="h-4 w-4" strokeWidth={1.75} /> : <Menu className="h-4 w-4" strokeWidth={1.75} />}
          </button>
        </div>
      </nav>

      {/* Mobile Dropdown Menu */}
      <div
        className={`md:hidden glass-nav max-w-6xl mx-auto mt-2 rounded-2xl overflow-hidden border border-border transition-all duration-200 ${
          mobileMenuOpen ? 'max-h-96 py-4 opacity-100 shadow-card' : 'max-h-0 py-0 opacity-0 pointer-events-none'
        }`}
      >
        <ul className="flex flex-col gap-1.5 px-6">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id && currentRoute === 'home';
            return (
              <li key={link.id}>
                <a
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className={`block py-2 px-3 rounded-xl text-sm transition-colors ${
                    isActive
                      ? 'bg-foreground text-background font-medium'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted/40'
                  }`}
                >
                  {link.label}
                </a>
              </li>
            );
          })}
          <li>
            {currentRoute === 'sandbox' ? (
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onNavigate?.('home');
                }}
                className="flex items-center gap-2 py-2 px-3 rounded-xl text-sm w-full text-left font-mono text-foreground hover:bg-muted/40 transition-colors"
              >
                <ArrowLeft className="h-3.5 w-3.5 text-foreground" strokeWidth={1.75} />
                <span>Back to Portfolio Overview</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onNavigate?.('sandbox');
                }}
                className="flex items-center gap-2 py-2 px-3 rounded-xl text-sm w-full text-left font-mono text-foreground hover:bg-muted/40 transition-colors"
              >
                <Sparkles className="h-3.5 w-3.5 text-foreground" strokeWidth={1.75} />
                <span>Component Sandbox (Lab)</span>
              </button>
            )}
          </li>
          <li className="pt-2 border-t border-border mt-1">
            <a
              href="#contact"
              onClick={(e) => handleLinkClick(e, '#contact')}
              className="flex items-center justify-center gap-2 h-9 w-full rounded-xl bg-foreground text-background text-xs font-medium hover:opacity-90 transition active:scale-95"
            >
              <span>Get in touch</span>
              <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.75} />
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
};
