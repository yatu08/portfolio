import React, { useState, useEffect } from 'react';
import { useTheme } from './hooks/useTheme';
import { useScrollSpy } from './hooks/useScrollSpy';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Experience } from './components/Experience';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { ResumeModal } from './components/ResumeModal';
import { ScrollProgress } from './components/ScrollProgress';
import { BackToTop } from './components/BackToTop';
import { AIAssistant } from './components/AIAssistant';
import { ComponentSandbox } from './components/ComponentSandbox';

export const App: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { activeSection } = useScrollSpy(['about', 'skills', 'projects', 'experience', 'contact']);
  const [isResumeOpen, setIsResumeOpen] = useState<boolean>(false);
  // Pathname-based routing without hash: / and /sandbox
  const [currentRoute, setCurrentRoute] = useState<'home' | 'sandbox'>(() => {
    if (typeof window === 'undefined') return 'home';
    const path = window.location.pathname.toLowerCase();
    const hash = window.location.hash.toLowerCase();
    return (path === '/sandbox' || path.startsWith('/sandbox') || hash === '#/sandbox' || hash === '#sandbox')
      ? 'sandbox'
      : 'home';
  });

  useEffect(() => {
    // If loaded with legacy hash like #/sandbox or #sandbox, immediately normalize to /sandbox
    const path = window.location.pathname.toLowerCase();
    const hash = window.location.hash.toLowerCase();

    if (hash === '#/sandbox' || hash === '#sandbox' || path === '/sandbox') {
      if (window.location.hash) {
        window.history.replaceState({}, '', '/sandbox');
      }
      setCurrentRoute('sandbox');
    } else if (hash === '#/' || hash === '#') {
      window.history.replaceState({}, '', '/');
      setCurrentRoute('home');
    }

    const handlePopState = () => {
      const currentPath = window.location.pathname.toLowerCase();
      const currentHash = window.location.hash.toLowerCase();
      if (currentPath === '/sandbox' || currentPath.startsWith('/sandbox') || currentHash.includes('sandbox')) {
        setCurrentRoute('sandbox');
      } else {
        setCurrentRoute('home');
      }
    };

    window.addEventListener('popstate', handlePopState);
    window.addEventListener('hashchange', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('hashchange', handlePopState);
    };
  }, []);

  const navigateTo = (route: 'home' | 'sandbox') => {
    const targetUrl = route === 'sandbox' ? '/sandbox' : '/';
    if (window.location.pathname !== targetUrl || window.location.hash) {
      window.history.pushState({}, '', targetUrl);
    }
    setCurrentRoute(route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background text-foreground relative selection:bg-primary selection:text-primary-foreground font-sans overflow-x-hidden w-full max-w-full">
      {/* Real-time reading & scroll progress indicator */}
      <ScrollProgress />

      {/* Fixed Navigation Bar */}
      <Navbar
        theme={theme}
        toggleTheme={toggleTheme}
        activeSection={activeSection}
        currentRoute={currentRoute}
        onNavigate={navigateTo}
      />

      {currentRoute === 'sandbox' ? (
        <ComponentSandbox
          onBack={() => navigateTo('home')}
        />
      ) : (
        /* Main Content Sections */
        <main className="overflow-x-hidden w-full max-w-full min-w-0">
          {/* Hero Section */}
          <Hero onOpenResume={() => setIsResumeOpen(true)} />

          {/* About Section */}
          <About />

          {/* Skills & Toolbox Section */}
          <Skills onOpenSandbox={() => navigateTo('sandbox')} />

          {/* Projects Showcase Section */}
          <Projects />

          {/* Experience Section */}
          <Experience />

          {/* Contact Section */}
          <Contact />
        </main>
      )}

      {/* Footer */}
      <Footer />

      {/* Floating Back to Top Action */}
      <BackToTop />

      {/* 100% Free Client-Side AI Portfolio Copilot */}
      <AIAssistant onOpenResume={() => setIsResumeOpen(true)} />

      {/* Resume Preview & Download Modal */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />
    </div>
  );
};

export default App;
