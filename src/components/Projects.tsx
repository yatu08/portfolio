import React, { useState } from 'react';
import { 
  LuArrowUpRight as ArrowUpRight, 
  LuShieldCheck as ShieldCheck 
} from 'react-icons/lu';
import { projectsList } from '../data/projects';
import { Project } from '../types';
import { ProjectModal } from './ProjectModal';

export const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>('All');

  const filterOptions = ['All', 'React', 'Angular', 'Next.js', 'Enterprise'];

  const getCount = (filter: string) => {
    if (filter === 'All') return projectsList.length;
    if (filter === 'React') return projectsList.filter((p) => p.technologies.some((t) => t.includes('React'))).length;
    if (filter === 'Angular') return projectsList.filter((p) => p.technologies.some((t) => t.includes('Angular'))).length;
    if (filter === 'Next.js') return projectsList.filter((p) => p.technologies.some((t) => t.includes('Next.js'))).length;
    if (filter === 'Enterprise') return projectsList.filter((p) => p.category.includes('Enterprise') || p.badge.includes('Company')).length;
    return 0;
  };

  const filteredProjects = projectsList.filter((project) => {
    if (activeFilter === 'All') return true;
    if (activeFilter === 'React') return project.technologies.some((t) => t.includes('React'));
    if (activeFilter === 'Angular') return project.technologies.some((t) => t.includes('Angular'));
    if (activeFilter === 'Next.js') return project.technologies.some((t) => t.includes('Next.js'));
    if (activeFilter === 'Enterprise') return project.category.includes('Enterprise') || project.badge.includes('Company');
    return true;
  });

  return (
    <section id="projects" className="py-20 sm:py-28 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 w-full min-w-0">
        {/* Section Header */}
        <div className="flex items-start sm:items-end justify-between flex-wrap gap-4 sm:gap-6">
          <div>
            <div className="text-xs font-mono uppercase tracking-[0.25em] text-muted-foreground font-semibold">
              03 / Selected Works
            </div>
            <h2 className="mt-3 text-3xl sm:text-5xl font-display font-bold tracking-tight text-foreground break-words">
              Featured <span className="text-gradient">Projects</span>
            </h2>
          </div>
          <div className="flex items-center gap-2 glass px-3.5 py-1.5 rounded-xl border border-border text-xs text-muted-foreground max-w-full">
            <ShieldCheck className="h-3.5 w-3.5 text-foreground shrink-0" strokeWidth={1.75} />
            <span className="truncate">Enterprise systems &amp; client IP protected under NDA.</span>
          </div>
        </div>

        {/* Filter Badges */}
        <div className="mt-8 sm:mt-10 flex flex-wrap items-center gap-2 min-w-0">
          {filterOptions.map((filter) => {
            const count = getCount(filter);
            const isActive = activeFilter === filter;
            return (
              <button
                key={filter}
                type="button"
                onClick={() => setActiveFilter(filter)}
                className={`text-xs px-3.5 py-1.5 rounded-lg font-mono transition-all flex items-center gap-2 whitespace-nowrap ${
                  isActive
                    ? 'bg-foreground text-background font-medium'
                    : 'glass border border-border text-muted-foreground hover:text-foreground hover:bg-muted/40'
                }`}
              >
                <span>{filter}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${
                    isActive ? 'bg-background/20 text-background' : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
          <span className="text-xs font-mono text-muted-foreground ml-auto hidden sm:inline">
            Showing {filteredProjects.length} of {projectsList.length}
          </span>
        </div>

        {/* Projects Grid */}
        <div className="mt-10 grid md:grid-cols-2 gap-8">
          {filteredProjects.map((project) => (
            <article
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card shadow-card hover:shadow-spotlight hover:border-foreground/30 transition-all duration-200 cursor-pointer flex flex-col justify-between"
            >
              {/* Visual Architectural Canvas Banner */}
              <div>
                <div className="relative h-52 bg-gradient-to-br from-zinc-900 to-black p-6 flex flex-col justify-between overflow-hidden border-b border-border/80">
                  <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />
                  
                  {/* Subtle architectural radial lighting */}
                  <div className="absolute top-0 right-0 w-64 h-64 bg-white/[0.04] rounded-full blur-2xl pointer-events-none" />

                  {/* Top Bar inside banner */}
                  <div className="flex items-center justify-between z-10">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-300 bg-white/10 backdrop-blur-md rounded px-2.5 py-0.5 border border-white/15">
                      {project.category}
                    </span>
                    <div
                      className="h-8 w-8 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white group-hover:bg-white group-hover:text-black group-hover:rotate-45 transition-all duration-200 border border-white/15"
                      title="Inspect Details"
                    >
                      <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.75} />
                    </div>
                  </div>

                  {/* Big Stylized Artwork Title */}
                  <div className="z-10 mt-auto">
                    <h3 className="font-display font-bold text-2xl sm:text-3xl text-white tracking-tight">
                      {project.name}
                    </h3>
                    <p className="text-xs font-mono text-zinc-400 mt-1">
                      {project.subtitle}
                    </p>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6">
                  <p className="text-sm text-foreground/80 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Role Highlight */}
                  <div className="mt-4 text-xs font-mono text-muted-foreground flex items-center gap-2 bg-secondary/50 p-2.5 rounded-lg border border-border">
                    <span className="text-foreground font-semibold">Role:</span>
                    <span className="text-foreground/90">{project.role}</span>
                  </div>
                </div>
              </div>

              {/* Technologies Badges */}
              <div className="px-6 pb-6 pt-0">
                <div className="flex flex-wrap gap-1.5 border-t border-border/70 pt-4 items-center justify-between">
                  <div className="flex flex-wrap gap-1.5">
                    {project.technologies.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="text-xs font-mono px-2.5 py-1 rounded-md bg-secondary text-foreground font-medium border border-border"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 4 && (
                      <span className="text-xs font-mono px-2 py-1 rounded-md bg-secondary text-muted-foreground border border-border">
                        +{project.technologies.length - 4}
                      </span>
                    )}
                  </div>

                  <span className="text-xs font-mono text-foreground font-medium flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                    <span>View</span>
                    <ArrowUpRight className="h-3 w-3" strokeWidth={1.75} />
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Project Modal Dialog */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};
