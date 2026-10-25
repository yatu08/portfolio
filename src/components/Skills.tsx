import React, { useState } from 'react';
import { 
  LuCpu as Cpu,
  LuGitBranch as GitBranch,
  LuLayers as Layers,
  LuSparkles as Sparkles,
  LuChevronDown as ChevronDown,
  LuChevronUp as ChevronUp,
  LuArrowRight as ArrowRight,
  LuCodeXml as Code2
} from 'react-icons/lu';
import { skillsList, skillCategories } from '../data/skills';
import { ParticleCanvas } from './ParticleCanvas';

interface SkillsProps {
  onOpenSandbox?: () => void;
}

export const Skills: React.FC<SkillsProps> = ({ onOpenSandbox }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [showAllInAllView, setShowAllInAllView] = useState<boolean>(false);

  const filteredSkills = selectedCategory === 'All'
    ? skillsList
    : skillsList.filter((s) => s.category === selectedCategory);

  const displayedSkills = (selectedCategory === 'All' && !showAllInAllView)
    ? filteredSkills.slice(0, 8)
    : filteredSkills;

  const isExpanded = selectedCategory === 'All' && showAllInAllView;

  const componentPrimitives = [
    { full: 'Button Primitives', short: 'Buttons' },
    { full: 'Toast Feedback', short: 'Toasts' },
    { full: 'SaaS Metric KPI', short: 'Metric KPI' },
    { full: 'Tag Selector', short: 'Tag Input' },
    { full: 'Accordions', short: 'Accordion' },
    { full: 'Segmented Control', short: 'Segment Tabs' },
    { full: 'Streaming Bubble', short: 'AI Stream' },
    { full: 'Modal Dialog', short: 'Modals' }
  ];

  const renderDesignSystemCard = (isFullWidth: boolean) => (
    <div
      className={`apple-glass-card rounded-3xl border border-border shadow-elegant relative overflow-hidden group transition-all duration-300 ${
        isFullWidth ? 'p-6 sm:p-8 mt-12 sm:mt-16 w-full' : 'p-6'
      }`}
    >
      {/* Subtle ambient lighting vignette in full width mode */}
      {isFullWidth && (
        <div className="absolute top-0 right-0 w-96 h-96 bg-foreground/[0.03] rounded-full blur-3xl pointer-events-none -z-10" />
      )}

      {/* Header */}
      <div className="flex items-center justify-between mb-5 pb-4 border-b border-border/70 flex-wrap gap-4">
        <div className="flex items-center gap-3.5">
          <div className="h-10 w-10 rounded-xl bg-foreground text-background flex items-center justify-center shadow-subtle shrink-0">
            <Sparkles className="h-4 w-4" strokeWidth={1.75} />
          </div>
          <div>
            <h4 className="font-display font-semibold text-base sm:text-lg text-foreground flex items-center gap-2.5 flex-wrap">
              <span>Design System &amp; Component Lab</span>
              <span className="text-[11px] font-mono text-muted-foreground border border-border px-2.5 py-0.5 rounded-lg bg-secondary/50">
                8 Live Primitives
              </span>
            </h4>
            <p className="text-xs sm:text-[13px] text-muted-foreground mt-1">
              Explore full-screen interactive previews and inspectable TypeScript code
            </p>
          </div>
        </div>

        {isFullWidth && (
          <button
            type="button"
            onClick={onOpenSandbox}
            className="hidden md:inline-flex items-center gap-2 h-9 px-4 rounded-xl border border-border glass hover:border-foreground/40 text-foreground text-xs font-mono font-medium transition shadow-subtle"
          >
            <Code2 className="h-3.5 w-3.5" strokeWidth={1.75} />
            <span>Launch Lab</span>
            <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.75} />
          </button>
        )}
      </div>

      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-3xl">
        A modular suite of accessible, production-grade UI components engineered with React 18, TypeScript, and Tailwind CSS. Test real-time reactivity, responsive states, and inspect production source code.
      </p>

      {/* Teaser Badges Grid */}
      <div
        className={`grid gap-2.5 my-5 ${
          isFullWidth
            ? 'grid-cols-2 sm:grid-cols-4 lg:grid-cols-8'
            : 'grid-cols-2 sm:grid-cols-4'
        }`}
      >
        {componentPrimitives.map((item, idx) => (
          <div
            key={idx}
            className="p-3 rounded-lg border border-border glass-pill text-xs font-mono text-foreground/85 flex items-center gap-2 transition-colors shadow-subtle min-w-0"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shrink-0" />
            <span className="truncate" title={item.full}>
              {isFullWidth ? item.full : item.short}
            </span>
          </div>
        ))}
      </div>

      {/* Action Button to launch full screen */}
      <button
        type="button"
        onClick={onOpenSandbox}
        className="w-full mt-4 flex items-center justify-between p-4 rounded-xl bg-foreground text-background font-mono text-xs sm:text-sm font-semibold hover:opacity-95 transition-all active:scale-[0.99] shadow-elegant group"
      >
        <div className="flex items-center gap-2.5">
          <Code2 className="h-4 w-4" strokeWidth={1.75} />
          <span>Launch Component Sandbox &amp; Source Code</span>
        </div>
        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" strokeWidth={2} />
      </button>
    </div>
  );

  return (
    <section id="skills" className="py-24 sm:py-32 relative overflow-hidden">
      {/* Delicate Particle Canvas */}
      <ParticleCanvas />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full min-w-0">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="text-[11px] sm:text-xs font-mono uppercase tracking-[0.25em] text-muted-foreground font-semibold">
              02 / Capabilities
            </div>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-display font-bold tracking-tight text-foreground break-words">
              Skills &amp; <span className="text-gradient">Toolbox</span>
            </h2>
            <p className="mt-4 text-sm sm:text-base text-muted-foreground leading-relaxed max-w-xl">
              Production-hardened technical stacks across stateful UI, reactive streams, and modern frameworks.
            </p>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center gap-1 p-1 rounded-xl glass border border-border min-w-0">
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('All');
                setShowAllInAllView(false);
              }}
              className={`text-xs px-3.5 py-1.5 rounded-lg font-mono whitespace-nowrap transition-all ${
                selectedCategory === 'All'
                  ? 'bg-foreground text-background font-semibold shadow-subtle'
                  : 'text-muted-foreground hover:text-foreground hover:bg-card/40'
              }`}
            >
              All ({skillsList.length})
            </button>
            {skillCategories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`text-xs px-3.5 py-1.5 rounded-lg font-mono whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-foreground text-background font-semibold shadow-subtle'
                    : 'text-muted-foreground hover:text-foreground hover:bg-card/40'
                }`}
              >
                {cat.replace('Frontend ', '').replace(' Integrations', '')}
              </button>
            ))}
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 mt-12 sm:mt-16 items-start min-w-0 w-full">
          {/* Left Column: Skill Bars in a Compact 2-Column Grid */}
          <div className="lg:col-span-6">
            <div className="grid sm:grid-cols-2 gap-3">
              {displayedSkills.map((skill) => (
                <div
                  key={skill.name}
                  className="group apple-glass-card rounded-2xl p-3.5 sm:p-4 border border-border shadow-subtle flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between gap-1.5 mb-2.5">
                    <div className="flex items-center gap-1.5 min-w-0">
                      <span className="text-[10px] font-mono text-muted-foreground shrink-0">
                        {skill.index}
                      </span>
                      <span className="font-semibold text-foreground text-xs sm:text-[13px] truncate" title={skill.name}>
                        {skill.name}
                      </span>
                    </div>
                    <span className="text-xs font-mono text-foreground font-semibold shrink-0">
                      {skill.level}%
                    </span>
                  </div>
                  {/* Progress Track */}
                  <div className="h-1 rounded-full bg-secondary overflow-hidden">
                    <div
                      className="h-full bg-foreground rounded-full transition-all duration-700 ease-out opacity-85"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Show All / Show Less button when in 'All' view */}
            {selectedCategory === 'All' && filteredSkills.length > 8 && (
              <div className="mt-4 text-center">
                <button
                  type="button"
                  onClick={() => setShowAllInAllView((prev) => !prev)}
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-muted-foreground hover:text-foreground px-4 py-1.5 rounded-xl glass border border-border hover:border-foreground/30 transition shadow-subtle"
                >
                  <span>
                    {showAllInAllView 
                      ? 'Show curated top skills' 
                      : `View all skills (${filteredSkills.length - 8} more)`}
                  </span>
                  {showAllInAllView ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
                </button>
              </div>
            )}
          </div>

          {/* Right Column: Values & (if expanded) Interactive Component Lab */}
          <div className="lg:col-span-6 space-y-6">
            {/* Feature Cards Grid: Engineering Pillars */}
            <div className="grid sm:grid-cols-2 gap-3.5 sm:gap-4">
              <div className="apple-glass-card rounded-2xl p-5 border border-border shadow-card group">
                <div className="h-10 w-10 rounded-xl bg-card flex items-center justify-center border border-border shadow-subtle">
                  <Cpu className="h-4 w-4 text-foreground" strokeWidth={1.75} />
                </div>
                <h4 className="mt-4 font-display font-semibold text-sm sm:text-base text-foreground tracking-tight">Frontend Architecture</h4>
                <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">Modular, testable, typed React 18 &amp; Angular 17 patterns</p>
              </div>

              <div className="apple-glass-card rounded-2xl p-5 border border-border shadow-card group">
                <div className="h-10 w-10 rounded-xl bg-card flex items-center justify-center border border-border shadow-subtle">
                  <GitBranch className="h-4 w-4 text-foreground" strokeWidth={1.75} />
                </div>
                <h4 className="mt-4 font-display font-semibold text-sm sm:text-base text-foreground tracking-tight">Reactive State</h4>
                <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">Predictable reactive streams &amp; state pipelines with RxJS</p>
              </div>

              <div className="apple-glass-card rounded-2xl p-5 border border-border shadow-card group">
                <div className="h-10 w-10 rounded-xl bg-card flex items-center justify-center border border-border shadow-subtle">
                  <Layers className="h-4 w-4 text-foreground" strokeWidth={1.75} />
                </div>
                <h4 className="mt-4 font-display font-semibold text-sm sm:text-base text-foreground tracking-tight">Design Systems</h4>
                <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">Figma tokens, Tailwind CSS &amp; accessible UI components</p>
              </div>

              <div className="apple-glass-card rounded-2xl p-5 border border-border shadow-card group">
                <div className="h-10 w-10 rounded-xl bg-card flex items-center justify-center border border-border shadow-subtle">
                  <Sparkles className="h-4 w-4 text-foreground" strokeWidth={1.75} />
                </div>
                <h4 className="mt-4 font-display font-semibold text-sm sm:text-base text-foreground tracking-tight">AI UI Integrations</h4>
                <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">Real-time token streaming, prompt UX &amp; LLM search</p>
              </div>
            </div>

            {/* When skills list is expanded, show Design System Card in the right column */}
            {isExpanded && renderDesignSystemCard(false)}
          </div>
        </div>

        {/* When skills list is collapsed, show Design System Card across FULL WIDTH */}
        {!isExpanded && renderDesignSystemCard(true)}
      </div>
    </section>
  );
};
