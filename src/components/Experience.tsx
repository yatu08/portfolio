import React from 'react';
import { Briefcase, Building2, Calendar, Check, Code2 } from 'lucide-react';
import { experienceList } from '../data/experience';
import { profileData } from '../data/profile';

export const Experience: React.FC = () => {
  return (
    <section id="experience" className="py-28 relative">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="text-xs font-mono uppercase tracking-[0.25em] text-muted-foreground font-semibold">
              04 / Trajectory
            </div>
            <h2 className="mt-3 text-3xl sm:text-5xl font-display font-bold tracking-tight text-foreground">
              Work <span className="text-gradient">Experience</span>
            </h2>
          </div>
          <div className="glass rounded-xl px-3.5 py-1.5 border border-border inline-flex items-center gap-2.5">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            <span className="text-xs font-mono font-medium text-foreground">
              {profileData.experienceYears} Years Verified
            </span>
          </div>
        </div>

        {/* Timeline Container */}
        <div className="mt-14 relative">
          {/* Hairline Vertical Line */}
          <div className="absolute left-4 sm:left-5 top-3 bottom-6 w-[1px] bg-border" />

          {/* Timeline Items */}
          <div className="space-y-10">
            {experienceList.map((exp) => (
              <div
                key={exp.id}
                className="relative pl-12 sm:pl-16 group"
              >
                {/* Node Icon */}
                <div className="absolute left-0 top-1 h-9 w-9 rounded-xl bg-card border border-border grid place-items-center z-10 text-foreground group-hover:border-foreground/40 transition-colors shadow-subtle">
                  {exp.company.toLowerCase().includes('softobiz') ? (
                    <Briefcase className="h-4 w-4" strokeWidth={1.75} />
                  ) : (
                    <Code2 className="h-4 w-4" strokeWidth={1.75} />
                  )}
                </div>

                {/* Experience Glass Card */}
                <div className="glass rounded-2xl p-6 sm:p-7 border border-border hover:border-foreground/30 hover:shadow-spotlight transition-all duration-200 bg-card">
                  {/* Card Header */}
                  <div className="flex items-start justify-between flex-wrap gap-4 pb-4 border-b border-border/70">
                    <div>
                      <h3 className="font-display font-bold text-xl text-foreground">
                        {exp.role}
                      </h3>
                      <div className="flex items-center gap-2 mt-1.5 text-sm font-medium text-foreground/80">
                        <Building2 className="h-3.5 w-3.5 text-muted-foreground" strokeWidth={1.75} />
                        <span>{exp.company}</span>
                        <span className="text-muted-foreground font-normal">· {exp.badge}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 text-xs font-mono text-muted-foreground border border-border rounded-lg px-3 py-1 bg-secondary/50">
                      <Calendar className="h-3 w-3" strokeWidth={1.75} />
                      <span>{exp.period}</span>
                    </div>
                  </div>

                  {/* Description */}
                  {exp.description && (
                    <p className="mt-4 text-sm sm:text-base text-foreground/85 leading-relaxed">
                      {exp.description}
                    </p>
                  )}

                  {/* Responsibilities */}
                  <ul className="mt-4 space-y-2.5">
                    {exp.responsibilities.map((resp, idx) => (
                      <li
                        key={idx}
                        className="text-sm text-foreground/80 flex items-start gap-2.5 leading-relaxed"
                      >
                        <Check className="h-3.5 w-3.5 text-foreground/75 shrink-0 mt-0.5" strokeWidth={2} />
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Tech Stack Pills */}
                  {exp.techStack && (
                    <div className="mt-5 pt-4 border-t border-border/60 flex flex-wrap items-center gap-1.5">
                      <span className="text-xs font-mono text-muted-foreground mr-1">
                        Stack:
                      </span>
                      {exp.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="text-xs font-mono px-2.5 py-1 rounded-md bg-secondary text-foreground font-medium border border-border"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
