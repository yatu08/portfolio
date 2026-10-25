import React, { useEffect, useState } from 'react';
import { LuArrowUp as ArrowUp } from 'react-icons/lu';

export const BackToTop: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 350) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility, { passive: true });
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Scroll back to top"
      className={`fixed bottom-6 right-6 z-40 h-10 w-10 rounded-full glass-pill border border-border/80 shadow-elegant hover:border-foreground/40 flex items-center justify-center text-muted-foreground hover:text-foreground transition-all duration-300 active:scale-95 ${
        visible
          ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto'
          : 'opacity-0 translate-y-3 scale-90 pointer-events-none'
      }`}
    >
      <ArrowUp className="h-4 w-4" strokeWidth={2} />
    </button>
  );
};
