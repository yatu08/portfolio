import React from 'react';
import { 
  LuBriefcase as Briefcase, 
  LuBuilding2 as Building2, 
  LuCalendar as Calendar, 
  LuCheck as Check, 
  LuCodeXml as Code2 
} from 'react-icons/lu';
import { experienceList } from '../data/experience';
import { profileData } from '../data/profile';

export const Experience: React.FC = () => {
  return (
    <section id="experience" className="py-24 sm:py-32 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 w-full min-w-0">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="text-[11px] sm:text-xs font-mono uppercase tracking-[0.25em] text-muted-foreground font-semibold">
              04 / Trajectory
            </div>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-display font-bold tracking-tight text-foreground break-words">
              Work <span className="text-gradient">Experience</span>
            </h2>
            <p className="mt-4 text-sm sm:text-base text-muted-foreground leading-relaxed max-w-xl">
              Proven track record delivering mission-critical frontend architectures for high-growth tech firms.
            </p>
          </div>
          <div className="glass-pill rounded-full px-4 py-1.5 border border-border inline-flex items-center gap-2.5 self-start md:self-auto">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            <span className="text-xs font-mono font-medium text-foreground">
              {profileData.experienceYears} Years Verified
            </span>
          </div>
        </div>

        {/* Timeline Container */}
        <div className="mt-12 sm:mt-16 relative min-w-0">
          {/* Hairline Vertical Line */}
          <div className="absolute left-4 sm:left-5 top-3 bottom-6 w-[1px] bg-border/80" />

          {/* Timeline Items */}
          <div className="space-y-8 sm:space-y-12 min-w-0">
            {experienceList.map((exp) => (
              <div
                key={exp.id}
                className="relative pl-10 sm:pl-16 group min-w-0"
              >
                {/* Node Icon */}
                <div className="absolute left-0 top-1.5 h-8 w-8 sm:h-10 sm:w-10 rounded-2xl bg-card border border-border grid place-items-center z-10 text-foreground group-hover:border-foreground/40 transition-colors shadow-subtle">
                  {exp.company.toLowerCase().includes('softobiz') ? (
                    <Briefcase className="h-4 w-4 sm:h-4.5 sm:w-4.5" strokeWidth={1.75} />
                  ) : (
                    <Code2 className="h-4 w-4 sm:h-4.5 sm:w-4.5" strokeWidth={1.75} />
                  )}
                </div>

                {/* Experience Glass Card */}
                <div className="apple-glass-card rounded-3xl p-6 sm:p-8 border border-border hover:shadow-spotlight transition-all duration-300 min-w-0">
                  {/* Card Header */}
                  <div className="flex items-start justify-between flex-wrap gap-4 pb-4 border-b border-border/70">
                    <div>
                      <h3 className="font-display font-bold text-xl sm:text-2xl text-foreground tracking-tight">
                        {exp.role}
                      </h3>
                      <div className="flex items-center gap-2 mt-1.5 text-sm sm:text-base font-medium text-foreground/85">
                        <Building2 className="h-4 w-4 text-muted-foreground" strokeWidth={1.75} />
                        <span>{exp.company}</span>
                        <span className="text-muted-foreground font-normal">· {exp.badge}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 text-xs font-mono text-muted-foreground border border-border/80 rounded-full px-3.5 py-1.5 glass-pill">
                      <Calendar className="h-3 w-3" strokeWidth={1.75} />
                      <span>{exp.period}</span>
                    </div>
                  </div>

                  {/* Description */}
                  {exp.description && (
                    <p className="mt-5 text-sm sm:text-base text-foreground/85 leading-relaxed">
                      {exp.description}
                    </p>
                  )}

                  {/* Responsibilities */}
                  <ul className="mt-4 space-y-2.5">
                    {exp.responsibilities.map((resp, idx) => (
                      <li
                        key={idx}
                        className="text-sm sm:text-[15px] text-foreground/80 flex items-start gap-2.5 leading-relaxed"
                      >
                        <Check className="h-4 w-4 text-foreground/75 shrink-0 mt-0.5" strokeWidth={2} />
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Tech Stack Pills */}
                  {exp.techStack && (
                    <div className="mt-6 pt-4 border-t border-border/60 flex flex-wrap items-center gap-2">
                      <span className="text-xs font-mono text-muted-foreground mr-1">
                        Stack:
                      </span>
                      {exp.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="text-xs font-mono px-3 py-1 rounded-lg glass-pill text-foreground font-medium border border-border"
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
