import React, { useState } from 'react';
import { 
  LuArrowRight as ArrowRight, 
  LuDownload as Download, 
  LuSparkles as Sparkles, 
  LuGithub as Github, 
  LuLinkedin as Linkedin, 
  LuMail as Mail, 
  LuCheck as Check, 
  LuCopy as Copy, 
  LuTerminal as Terminal, 
  LuCodeXml as Code2, 
  LuFileText as FileText 
} from 'react-icons/lu';
import { profileData } from '../data/profile';

interface HeroProps {
  onOpenResume: () => void;
}

type TabKey = 'engineer' | 'stack' | 'highlights';

export const Hero: React.FC<HeroProps> = ({ onOpenResume }) => {
  const [activeTab, setActiveTab] = useState<TabKey>('engineer');
  const [copiedCode, setCopiedCode] = useState(false);

  const snippets: Record<TabKey, { filename: string; language: string; content: string }> = {
    engineer: {
      filename: 'engineer.ts',
      language: 'typescript',
      content: `// Frontend Developer Profile
const engineer: FrontendDeveloper = {
  name: "${profileData.name}",
  experience: "${profileData.experienceYears} Years",
  frameworks: ["React.js", "Angular", "Next.js"],
  languages: ["TypeScript", "JavaScript (ES6+)"],
  styling: ["Tailwind CSS", "SCSS", "Figma-to-Code"],
  focus: ["Clean Architecture", "API Integration", "AI UI"],
  status: "Available for new opportunities"
};`
    },
    stack: {
      filename: 'stack.json',
      language: 'json',
      content: `{
  "core": ["React 18", "Angular 17", "Next.js 14"],
  "languages": ["TypeScript 5.x", "ES2024"],
  "styling": ["Tailwind CSS", "SCSS", "Radix UI"],
  "state": ["RxJS"],
  "ai_features": ["Streaming Chat", "LLM Search", "AI UI"],
  "testing": ["Jest", "React Testing Library"]
}`
    },
    highlights: {
      filename: 'career.md',
      language: 'markdown',
      content: `### Career Highlights
- 4+ Years frontend engineering experience
- UI Developer at Softobiz (Angular, React, Next.js)
- 6 Months at WebXTechnology as Web Designer
- Figma-to-code design fidelity & token architecture
- REST API integration & reactive state management`
    }
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(snippets[activeTab].content);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const quickSkills = [
    'React.js',
    'Angular',
    'Next.js',
    'TypeScript',
    'Tailwind CSS',
    'AI Frontend'
  ];

  const techStackPills = [
    'React 18',
    'Next.js 14',
    'Angular 17',
    'TypeScript 5.x',
    'Tailwind CSS',
    'RxJS Observables',
    'AI Streaming UX',
    'Figma-to-Code',
    'Micro-frontends',
    'REST & WebSocket APIs',
    'Jest & RTL',
    'Core Web Vitals'
  ];

  return (
    <section className="relative pt-32 sm:pt-40 pb-16 sm:pb-20 overflow-hidden">
      {/* Background Architectural Grid & Gentle Ambient Vignette */}
      <div className="absolute inset-0 -z-10 grid-bg opacity-30 pointer-events-none" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-background/60 to-background pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[320px] sm:w-[760px] h-[280px] sm:h-[400px] bg-gradient-to-b from-foreground/[0.035] to-transparent rounded-full blur-3xl pointer-events-none -z-10 max-w-full" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 w-full min-w-0">
        {/* Availability Badge */}
        <div className="inline-flex items-center gap-2.5 glass-pill rounded-full px-4 py-1.5 text-xs sm:text-[13px] font-mono mb-8 border border-border shadow-subtle hover:border-foreground/30 transition-colors">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-60" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="text-foreground font-medium">{profileData.availability}</span>
        </div>

        {/* Main Grid: Left copy, Right architectural developer card */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 items-center min-w-0 w-full">
          <div className="lg:col-span-7 min-w-0 w-full">
            {/* Main Headline */}
            <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold leading-[1.08] sm:leading-[1.04] tracking-tight break-words">
              Hi, I'm <span className="text-gradient">{profileData.name}</span>
            </h1>

            {/* Sub-headline: Clear Role Definition */}
            <div className="mt-3.5 sm:mt-4 text-lg sm:text-2xl font-display font-semibold text-foreground/90 tracking-tight flex items-center gap-2 flex-wrap">
              <span>Frontend Developer</span>
              <span className="text-muted-foreground/40 font-light">·</span>
              <span className="text-muted-foreground font-normal text-base sm:text-xl">React, Angular &amp; Next.js</span>
            </div>

            {/* Professional Summary */}
            <p className="mt-5 sm:mt-6 max-w-2xl text-sm sm:text-base lg:text-lg text-muted-foreground leading-relaxed break-words">
              Frontend Developer with <strong className="text-foreground font-semibold">{profileData.experienceYears} years of professional experience</strong> building 
              responsive, scalable, and user-friendly web applications with <strong className="text-foreground font-semibold">React.js</strong>, <strong className="text-foreground font-semibold">Angular</strong>, <strong className="text-foreground font-semibold">Next.js</strong>, 
              and <strong className="text-foreground font-semibold">TypeScript</strong>. Specializing in turning complex Figma designs into pixel-perfect, accessible interfaces, 
              integrating REST APIs, and crafting intelligent AI-driven frontend experiences.
            </p>

            {/* Quick Skills Badges */}
            <div className="mt-6 sm:mt-7 flex flex-wrap gap-2">
              {quickSkills.map((skill) => (
                <span
                  key={skill}
                  className="text-xs sm:text-[13px] font-mono px-3 py-1 rounded-full border border-border glass-pill text-foreground font-medium shadow-subtle"
                >
                  {skill}
                </span>
              ))}
            </div>

            {/* Action CTAs */}
            <div className="mt-8 sm:mt-9 flex flex-wrap items-center gap-3">
              {/* Primary CTA: Classy Solid Button */}
              <a
                href="#contact"
                className="group inline-flex items-center gap-2 h-11 px-6 rounded-full bg-foreground text-background font-medium hover:opacity-90 transition-all duration-150 active:scale-[0.98] shadow-elegant text-sm whitespace-nowrap"
              >
                <span>Hire me</span>
                <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" strokeWidth={1.75} />
              </a>

              {/* Secondary CTA: Clean Outline */}
              <a
                href="#projects"
                className="inline-flex items-center gap-2 h-11 px-6 rounded-full glass border border-border text-foreground transition-all duration-150 font-medium active:scale-[0.98] text-sm whitespace-nowrap hover:border-foreground/30"
              >
                <span>View Projects</span>
              </a>

              {/* Resume Button */}
              <button
                type="button"
                onClick={onOpenResume}
                className="inline-flex items-center gap-2 h-11 px-6 rounded-full glass border border-border text-foreground transition-all duration-150 font-medium active:scale-[0.98] text-sm whitespace-nowrap hover:border-foreground/30"
              >
                <Download className="h-3.5 w-3.5 text-muted-foreground" strokeWidth={1.75} />
                <span>Resume</span>
              </button>
            </div>

            {/* Verified Social Links */}
            <div className="mt-8 sm:mt-9 flex flex-wrap items-center gap-2.5 text-muted-foreground">
              <a
                href={profileData.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                className="h-10 w-10 rounded-full glass border border-border flex items-center justify-center hover:border-foreground/40 hover:text-foreground transition-all shadow-subtle text-foreground/80 shrink-0 active:scale-95"
                title="GitHub"
              >
                <Github className="h-4 w-4" strokeWidth={1.75} />
              </a>
              <a
                href={profileData.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                className="h-10 w-10 rounded-full glass border border-border flex items-center justify-center hover:border-foreground/40 hover:text-foreground transition-all shadow-subtle text-foreground/80 shrink-0 active:scale-95"
                title="LinkedIn"
              >
                <Linkedin className="h-4 w-4" strokeWidth={1.75} />
              </a>
              <a
                href={`mailto:${profileData.email}`}
                aria-label="Send Email"
                className="h-10 w-10 rounded-full glass border border-border flex items-center justify-center hover:border-foreground/40 hover:text-foreground transition-all shadow-subtle text-foreground/80 shrink-0 active:scale-95"
                title="Send Email"
              >
                <Mail className="h-4 w-4" strokeWidth={1.75} />
              </a>
              <span className="text-xs sm:text-[13px] font-mono text-foreground/80 pl-2 sm:pl-3 sm:border-l sm:border-border/60 font-medium break-all">
                {profileData.email}
              </span>
            </div>
          </div>

          {/* Right Column: Architectural Developer Window */}
          <div className="lg:col-span-5 min-w-0 w-full mt-6 lg:mt-0">
            <div className="apple-glass-card rounded-3xl p-4 sm:p-6 border border-border shadow-elegant overflow-hidden w-full min-w-0">
              {/* Window Title Bar */}
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-border/70">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <span className="h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full bg-rose-500/80 inline-block border border-rose-600/30" />
                  <span className="h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full bg-amber-500/80 inline-block border border-amber-600/30" />
                  <span className="h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full bg-emerald-500/80 inline-block border border-emerald-600/30" />
                  <span className="text-xs font-mono text-foreground/90 ml-1.5 sm:ml-2 flex items-center gap-1.5 font-medium truncate">
                    <Terminal className="h-3.5 w-3.5 text-foreground/70 shrink-0" strokeWidth={1.75} />
                    <span className="truncate">developer-profile.ts</span>
                  </span>
                </div>

                {/* Copy button */}
                <button
                  type="button"
                  onClick={handleCopyCode}
                  className="text-xs font-mono text-foreground/80 hover:text-foreground flex items-center gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg bg-secondary/80 border border-border hover:bg-muted transition shrink-0"
                  title="Copy code"
                >
                  {copiedCode ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-emerald-500" strokeWidth={2} />
                      <span className="text-emerald-500 text-xs font-medium">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5 text-muted-foreground" strokeWidth={1.75} />
                      <span className="text-xs font-medium">Copy</span>
                    </>
                  )}
                </button>
              </div>

              {/* Editor Tabs Row */}
              <div className="grid grid-cols-3 gap-1 p-1 rounded-xl bg-secondary/60 border border-border/80 mb-3.5 min-w-0">
                <button
                  type="button"
                  onClick={() => setActiveTab('engineer')}
                  className={`flex items-center justify-center gap-1 sm:gap-1.5 py-1.5 px-1.5 sm:px-2 rounded-lg text-[11px] sm:text-xs font-mono transition-all duration-150 min-w-0 ${
                    activeTab === 'engineer'
                      ? 'bg-foreground text-background font-semibold shadow-sm'
                      : 'text-muted-foreground hover:text-foreground hover:bg-card/60'
                  }`}
                >
                  <Terminal className="h-3 w-3 sm:h-3.5 sm:w-3.5 shrink-0" strokeWidth={1.75} />
                  <span className="truncate">engineer.ts</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('stack')}
                  className={`flex items-center justify-center gap-1 sm:gap-1.5 py-1.5 px-1.5 sm:px-2 rounded-lg text-[11px] sm:text-xs font-mono transition-all duration-150 min-w-0 ${
                    activeTab === 'stack'
                      ? 'bg-foreground text-background font-semibold shadow-sm'
                      : 'text-muted-foreground hover:text-foreground hover:bg-card/60'
                  }`}
                >
                  <Code2 className="h-3 w-3 sm:h-3.5 sm:w-3.5 shrink-0" strokeWidth={1.75} />
                  <span className="truncate">stack.json</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('highlights')}
                  className={`flex items-center justify-center gap-1 sm:gap-1.5 py-1.5 px-1.5 sm:px-2 rounded-lg text-[11px] sm:text-xs font-mono transition-all duration-150 min-w-0 ${
                    activeTab === 'highlights'
                      ? 'bg-foreground text-background font-semibold shadow-sm'
                      : 'text-muted-foreground hover:text-foreground hover:bg-card/60'
                  }`}
                >
                  <FileText className="h-3 w-3 sm:h-3.5 sm:w-3.5 shrink-0" strokeWidth={1.75} />
                  <span className="truncate">career.md</span>
                </button>
              </div>

              {/* Code Snippet View: Rich, High-Contrast Authentic Syntax Highlighting with Line Numbers */}
              <div className="rounded-xl p-3 sm:p-5 bg-card/90 dark:bg-card/70 border border-border shadow-inner font-mono text-[12px] sm:text-[13.5px] leading-[1.75] overflow-x-auto min-h-[260px] w-full min-w-0">
                {activeTab === 'engineer' && (
                  <div className="flex min-w-0">
                    {/* Line numbers column */}
                    <div className="select-none pr-2.5 sm:pr-3.5 mr-2.5 sm:mr-3.5 text-right text-zinc-400/80 dark:text-zinc-600 font-mono text-[12px] sm:text-[13.5px] leading-[1.75] border-r border-border/60 shrink-0">
                      <div>1</div>
                      <div>2</div>
                      <div>3</div>
                      <div>4</div>
                      <div>5</div>
                      <div>6</div>
                      <div>7</div>
                      <div>8</div>
                      <div>9</div>
                      <div>10</div>
                      <div>11</div>
                      <div>12</div>
                      <div>13</div>
                    </div>
                    {/* Code content column */}
                    <div className="flex-1 overflow-x-auto min-w-0">
                      <pre className="overflow-x-auto">
                        <code>
                          <span className="text-purple-600 dark:text-purple-400 font-semibold">const</span>{' '}
                          <span className="text-zinc-900 dark:text-zinc-100 font-bold">engineer</span>:{' '}
                          <span className="text-amber-600 dark:text-amber-400 font-medium">FrontendDeveloper</span>{' '}
                          <span className="text-zinc-700 dark:text-zinc-300 font-medium">= {'{\n'}</span>
                          {'  '}<span className="text-sky-700 dark:text-sky-400 font-semibold">name</span>:{' '}
                          <span className="text-emerald-700 dark:text-emerald-400 font-medium">"{profileData.name}"</span>,<br />
                          {'  '}<span className="text-sky-700 dark:text-sky-400 font-semibold">experience</span>:{' '}
                          <span className="text-emerald-700 dark:text-emerald-400 font-medium">"{profileData.experienceYears} Years"</span>,<br />
                          {'  '}<span className="text-sky-700 dark:text-sky-400 font-semibold">frameworks</span>:{' '}<span className="text-zinc-700 dark:text-zinc-300">[</span><br />
                          {'    '}<span className="text-emerald-700 dark:text-emerald-400 font-medium">"React.js"</span>,<br />
                          {'    '}<span className="text-emerald-700 dark:text-emerald-400 font-medium">"Angular"</span>,<br />
                          {'    '}<span className="text-emerald-700 dark:text-emerald-400 font-medium">"Next.js"</span><br />
                          {'  '}<span className="text-zinc-700 dark:text-zinc-300">]</span>,<br />
                          {'  '}<span className="text-sky-700 dark:text-sky-400 font-semibold">languages</span>:{' '}<span className="text-zinc-700 dark:text-zinc-300">[</span><span className="text-emerald-700 dark:text-emerald-400 font-medium">"TypeScript"</span>, <span className="text-emerald-700 dark:text-emerald-400 font-medium">"JavaScript"</span><span className="text-zinc-700 dark:text-zinc-300">]</span>,<br />
                          {'  '}<span className="text-sky-700 dark:text-sky-400 font-semibold">styling</span>:{' '}<span className="text-zinc-700 dark:text-zinc-300">[</span><span className="text-emerald-700 dark:text-emerald-400 font-medium">"Tailwind CSS"</span>, <span className="text-emerald-700 dark:text-emerald-400 font-medium">"SCSS"</span><span className="text-zinc-700 dark:text-zinc-300">]</span>,<br />
                          {'  '}<span className="text-sky-700 dark:text-sky-400 font-semibold">focus</span>:{' '}<span className="text-zinc-700 dark:text-zinc-300">[</span><span className="text-emerald-700 dark:text-emerald-400 font-medium">"Clean Architecture"</span>, <span className="text-emerald-700 dark:text-emerald-400 font-medium">"AI UI"</span><span className="text-zinc-700 dark:text-zinc-300">]</span>,<br />
                          {'  '}<span className="text-sky-700 dark:text-sky-400 font-semibold">status</span>:{' '}
                          <span className="inline-block text-emerald-800 dark:text-emerald-300 font-semibold bg-emerald-100 dark:bg-emerald-950/70 border border-emerald-300 dark:border-emerald-800/80 px-2 py-0.5 rounded text-xs sm:text-[13px]">
                            "{profileData.availability}"
                          </span><br />
                          <span className="text-zinc-700 dark:text-zinc-300 font-medium">{'}'};</span>
                        </code>
                      </pre>
                    </div>
                  </div>
                )}

                {activeTab === 'stack' && (
                  <div className="flex min-w-0">
                    {/* Line numbers column */}
                    <div className="select-none pr-2.5 sm:pr-3.5 mr-2.5 sm:mr-3.5 text-right text-zinc-400/80 dark:text-zinc-600 font-mono text-[12px] sm:text-[13.5px] leading-[1.75] border-r border-border/60 shrink-0">
                      <div>1</div>
                      <div>2</div>
                      <div>3</div>
                      <div>4</div>
                      <div>5</div>
                      <div>6</div>
                      <div>7</div>
                      <div>8</div>
                    </div>
                    {/* Code content column */}
                    <div className="flex-1 overflow-x-auto min-w-0">
                      <pre className="overflow-x-auto">
                        <code>
                          <span className="text-zinc-700 dark:text-zinc-300 font-medium">{`{\n`}</span>
                          {'  '}<span className="text-sky-700 dark:text-sky-400 font-semibold">"core"</span>:{' '}<span className="text-zinc-700 dark:text-zinc-300">[</span><span className="text-emerald-700 dark:text-emerald-400 font-medium">"React 18"</span>, <span className="text-emerald-700 dark:text-emerald-400 font-medium">"Angular 17"</span>, <span className="text-emerald-700 dark:text-emerald-400 font-medium">"Next.js 14"</span><span className="text-zinc-700 dark:text-zinc-300">]</span>,<br />
                          {'  '}<span className="text-sky-700 dark:text-sky-400 font-semibold">"languages"</span>:{' '}<span className="text-zinc-700 dark:text-zinc-300">[</span><span className="text-emerald-700 dark:text-emerald-400 font-medium">"TypeScript 5.x"</span>, <span className="text-emerald-700 dark:text-emerald-400 font-medium">"ES2024"</span><span className="text-zinc-700 dark:text-zinc-300">]</span>,<br />
                          {'  '}<span className="text-sky-700 dark:text-sky-400 font-semibold">"styling"</span>:{' '}<span className="text-zinc-700 dark:text-zinc-300">[</span><span className="text-emerald-700 dark:text-emerald-400 font-medium">"Tailwind CSS"</span>, <span className="text-emerald-700 dark:text-emerald-400 font-medium">"SCSS"</span>, <span className="text-emerald-700 dark:text-emerald-400 font-medium">"Radix UI"</span><span className="text-zinc-700 dark:text-zinc-300">]</span>,<br />
                          {'  '}<span className="text-sky-700 dark:text-sky-400 font-semibold">"state"</span>:{' '}<span className="text-zinc-700 dark:text-zinc-300">[</span><span className="text-emerald-700 dark:text-emerald-400 font-medium">"RxJS"</span><span className="text-zinc-700 dark:text-zinc-300">]</span>,<br />
                          {'  '}<span className="text-sky-700 dark:text-sky-400 font-semibold">"ai_features"</span>:{' '}<span className="text-zinc-700 dark:text-zinc-300">[</span><span className="text-emerald-700 dark:text-emerald-400 font-medium">"Streaming Chat"</span>, <span className="text-emerald-700 dark:text-emerald-400 font-medium">"LLM Search"</span><span className="text-zinc-700 dark:text-zinc-300">]</span>,<br />
                          {'  '}<span className="text-sky-700 dark:text-sky-400 font-semibold">"testing"</span>:{' '}<span className="text-zinc-700 dark:text-zinc-300">[</span><span className="text-emerald-700 dark:text-emerald-400 font-medium">"Jest"</span>, <span className="text-emerald-700 dark:text-emerald-400 font-medium">"RTL"</span><span className="text-zinc-700 dark:text-zinc-300">]</span><br />
                          <span className="text-zinc-700 dark:text-zinc-300 font-medium">{`}`}</span>
                        </code>
                      </pre>
                    </div>
                  </div>
                )}

                {activeTab === 'highlights' && (
                  <div className="space-y-3 font-sans text-[12px] sm:text-sm py-1 min-w-0">
                    <div className="font-semibold text-foreground font-mono text-xs mb-3 uppercase tracking-wider flex items-center gap-2 pb-2 border-b border-border/50">
                      <Sparkles className="h-3.5 w-3.5 text-foreground shrink-0" strokeWidth={2} />
                      <span className="truncate">Verified Track Record &amp; Impact</span>
                    </div>
                    <ul className="space-y-2.5 text-foreground/90 font-sans">
                      <li className="flex items-start gap-2 sm:gap-2.5">
                        <span className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-emerald-500 mt-2 shrink-0" />
                        <span className="leading-relaxed"><strong className="text-foreground font-semibold">4+ Years</strong> professional experience in frontend development</span>
                      </li>
                      <li className="flex items-start gap-2 sm:gap-2.5">
                        <span className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-emerald-500 mt-2 shrink-0" />
                        <span className="leading-relaxed"><strong className="text-foreground font-semibold">UI Developer at Softobiz</strong> (React, Angular &amp; Next.js)</span>
                      </li>
                      <li className="flex items-start gap-2 sm:gap-2.5">
                        <span className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-emerald-500 mt-2 shrink-0" />
                        <span className="leading-relaxed"><strong className="text-foreground font-semibold">6 Months at WebXTechnology</strong> as Web Designer</span>
                      </li>
                      <li className="flex items-start gap-2 sm:gap-2.5">
                        <span className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-emerald-500 mt-2 shrink-0" />
                        <span className="leading-relaxed">Pixel-perfect Figma conversion &amp; <strong className="text-foreground font-semibold">AI streaming interfaces</strong></span>
                      </li>
                    </ul>
                  </div>
                )}
              </div>

              {/* Status footer inside card */}
              <div className="mt-4 pt-3 border-t border-border/50 flex items-center justify-between text-xs text-foreground/80 font-mono">
                <span className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Ready to deploy &amp; collaborate</span>
                </span>
                <span className="text-muted-foreground text-xs hidden sm:inline">UTF-8 · TS 5.x</span>
              </div>
            </div>
          </div>
        </div>

        {/* Professional Statistics Cards */}
        <div className="mt-12 sm:mt-16 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 w-full min-w-0">
          {profileData.stats.map((stat, idx) => (
            <div
              key={idx}
              className="apple-glass-card rounded-2xl p-4 sm:p-6 border border-border shadow-subtle min-w-0"
            >
              <div className="text-2xl sm:text-4xl font-display font-bold text-foreground tracking-tight">
                {stat.value}
              </div>
              <div className="text-[11px] sm:text-xs text-muted-foreground mt-1.5 font-medium leading-tight">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Enterprise Competencies & Tech Stack Marquee */}
        <div className="mt-12 sm:mt-16 pt-8 border-t border-border/50 w-full min-w-0 overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono text-muted-foreground mb-3.5">
            <span className="flex items-center gap-2 text-foreground font-semibold uppercase tracking-wider text-[11px]">
              <Sparkles className="h-3.5 w-3.5 text-foreground" strokeWidth={1.75} />
              Core Competencies &amp; Production Stack
            </span>
            <span className="hidden sm:inline text-muted-foreground/80 text-[11px]">
              Hover to pause · High-performance reactive architecture
            </span>
          </div>

          <div className="relative overflow-hidden rounded-2xl border border-border/80 apple-glass py-3.5 w-full min-w-0">
            <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
            
            <div className="animate-marquee flex items-center gap-3 sm:gap-6 whitespace-nowrap">
              {techStackPills.concat(techStackPills).map((item, idx) => (
                <div
                  key={idx}
                  className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 rounded-full glass-pill text-[11px] sm:text-xs font-mono text-foreground font-medium shadow-subtle hover:border-foreground/40 transition shrink-0"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
