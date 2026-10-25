import React from 'react';
import { 
  LuCodeXml as Code2, 
  LuBoxes as Boxes, 
  LuLayoutDashboard as Layout, 
  LuGauge as Gauge
} from 'react-icons/lu';
import { profileData } from '../data/profile';

export const About: React.FC = () => {
  const iconMap: Record<string, React.ReactNode> = {
    Code2: <Code2 className="h-4 w-4 text-foreground" strokeWidth={1.75} />,
    Boxes: <Boxes className="h-4 w-4 text-foreground" strokeWidth={1.75} />,
    Layout: <Layout className="h-4 w-4 text-foreground" strokeWidth={1.75} />,
    Gauge: <Gauge className="h-4 w-4 text-foreground" strokeWidth={1.75} />
  };

  return (
    <section id="about" className="py-24 sm:py-32 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 w-full min-w-0">
        {/* Section Header */}
        <div>
          <div className="text-[11px] sm:text-xs font-mono uppercase tracking-[0.25em] text-muted-foreground font-semibold">
            01 / Philosophy
          </div>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-display font-bold tracking-tight text-foreground max-w-3xl break-words">
            Engineering intuitive, high-performance <span className="text-gradient">interfaces</span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-muted-foreground leading-relaxed max-w-2xl">
            A deliberate balance of architectural discipline, atomic design tokens, and fluid user micro-interactions.
          </p>
        </div>

        {/* Narrative & Highlights */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 mt-12 sm:mt-16 items-start min-w-0 w-full">
          {/* Detailed Narrative */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-5 text-muted-foreground text-sm sm:text-base lg:text-lg leading-relaxed min-w-0 break-words">
            {profileData.aboutDetailed.map((paragraph, idx) => (
              <p key={idx} className="leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Core Philosophy Cards */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4 min-w-0 w-full">
            {profileData.coreValues.map((val, idx) => (
              <div
                key={idx}
                className="apple-glass-card rounded-2xl p-5 sm:p-6 border border-border shadow-card min-w-0"
              >
                <div className="h-11 w-11 rounded-xl bg-card/80 border border-border shadow-subtle flex items-center justify-center">
                  {iconMap[val.icon] || <Code2 className="h-4 w-4 text-foreground" strokeWidth={1.75} />}
                </div>
                <h4 className="mt-4 font-display font-semibold text-base sm:text-lg text-foreground tracking-tight">
                  {val.title}
                </h4>
                <p className="text-xs sm:text-[13px] text-muted-foreground mt-2 leading-relaxed">
                  {val.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
