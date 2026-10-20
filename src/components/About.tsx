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
    <section id="about" className="pt-8 sm:pt-10 pb-20 sm:pb-24 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="mb-3">
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-muted-foreground font-semibold">
            01 / Philosophy
          </span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-display font-bold tracking-tight text-foreground max-w-3xl">
          Engineering intuitive, high-performance <span className="text-gradient">interfaces</span>
        </h2>

        {/* Narrative & Highlights */}
        <div className="grid lg:grid-cols-12 gap-12 mt-12 items-start">
          {/* Detailed Narrative */}
          <div className="lg:col-span-7 space-y-5 text-muted-foreground text-base sm:text-lg leading-relaxed">
            {profileData.aboutDetailed.map((paragraph, idx) => (
              <p key={idx} className="leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Core Philosophy Cards */}
          <div className="lg:col-span-5 grid sm:grid-cols-2 gap-4">
            {profileData.coreValues.map((val, idx) => (
              <div
                key={idx}
                className="glass rounded-2xl p-5 border border-border hover:border-foreground/30 hover:shadow-spotlight transition-all duration-200 group"
              >
                <div className="h-10 w-10 rounded-xl bg-card border border-border shadow-subtle flex items-center justify-center group-hover:border-foreground/40 transition-colors">
                  {iconMap[val.icon] || <Code2 className="h-4 w-4 text-foreground" strokeWidth={1.75} />}
                </div>
                <h4 className="mt-4 font-display font-semibold text-base sm:text-lg text-foreground">
                  {val.title}
                </h4>
                <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">
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
