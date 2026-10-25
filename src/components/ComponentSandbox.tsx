import React, { useState } from 'react';
import { 
  LuArrowLeft as ArrowLeft, 
  LuCopy as Copy, 
  LuCheck as Check, 
  LuCodeXml as Code2, 
  LuEye as Eye, 
  LuX as X, 
  LuCircleCheck as CheckCircle2, 
  LuCircleAlert as AlertCircle, 
  LuInfo as Info, 
  LuTrendingUp as TrendingUp, 
  LuChevronDown as ChevronDown, 
  LuSparkles as Sparkles, 
  LuMaximize2 as Maximize2,
} from 'react-icons/lu';

interface ComponentSandboxProps {
  onBack?: () => void;
  theme?: 'dark' | 'light';
  toggleTheme?: () => void;
}

type TabMode = 'preview' | 'code';
type CategoryFilter = 'All' | 'Actions' | 'Feedback' | 'Data' | 'Navigation' | 'AI UI';

export const ComponentSandbox: React.FC<ComponentSandboxProps> = ({ onBack }) => {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('All');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // States for interactive components:
  // 1. Button Sandbox
  const [btnVariant, setBtnVariant] = useState<'solid' | 'framed' | 'satin' | 'destructive'>('solid');
  const [btnLoading, setBtnLoading] = useState(false);
  const [btnClicks, setBtnClicks] = useState(0);

  // 2. Toast Sandbox
  const [toasts, setToasts] = useState<Array<{ id: string; type: 'success' | 'error' | 'info'; message: string }>>([
    { id: '1', type: 'success', message: 'API token successfully validated and synced.' }
  ]);

  // 3. KPI Metric Card
  const [metricRange, setMetricRange] = useState<'7D' | '30D' | '90D'>('30D');

  // 4. Autocomplete Tag Selector
  const [tags, setTags] = useState<string[]>(['React 18', 'TypeScript', 'Tailwind CSS']);
  const [tagInput, setTagInput] = useState('');
  const availableTags = ['Next.js 14', 'Angular 17', 'RxJS', 'TypeScript', 'Tailwind CSS', 'GraphQL', 'Vite', 'Jest', 'WebSockets'];

  // 5. Accordion
  const [openAccordion, setOpenAccordion] = useState<number | null>(0);

  // 6. Segmented Control
  const [activeSegment, setActiveSegment] = useState<'design' | 'api' | 'security'>('design');

  // 7. AI Streaming Simulator
  const [streamText, setStreamText] = useState('React 18 Concurrent Mode enables responsive rendering by interrupting background fiber trees when user inputs occur.');
  const [isStreaming, setIsStreaming] = useState(false);

  // 8. Reactive Modal
  const [modalOpen, setModalOpen] = useState(false);

  // Tab view states (Preview vs Code)
  const [viewModes, setViewModes] = useState<Record<string, TabMode>>({
    button: 'preview',
    toast: 'preview',
    metric: 'preview',
    autocomplete: 'preview',
    accordion: 'preview',
    segmented: 'preview',
    streaming: 'preview',
    modal: 'preview'
  });

  const toggleViewMode = (componentId: string, mode: TabMode) => {
    setViewModes(prev => ({ ...prev, [componentId]: mode }));
  };

  const handleCopyCode = (id: string, code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const triggerToast = (type: 'success' | 'error' | 'info') => {
    const messages = {
      success: 'Deployment live: All 1,599 modules cached cleanly.',
      error: 'Network timeout: Re-attempting WebSocket connection…',
      info: 'Cache re-validated with HTTP 304 Not Modified.'
    };
    const newToast = { id: Date.now().toString(), type, message: messages[type] };
    setToasts(prev => [newToast, ...prev.slice(0, 2)]);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Simulated AI Stream effect
  const startStreaming = (prompt: string) => {
    setIsStreaming(true);
    setStreamText('');
    let idx = 0;
    const interval = setInterval(() => {
      idx += 2;
      setStreamText(prompt.slice(0, idx));
      if (idx >= prompt.length) {
        clearInterval(interval);
        setIsStreaming(false);
      }
    }, 25);
  };

  const codeSnippets = {
    button: `import React, { useState } from 'react';
import { LuLoader2, LuArrowRight } from 'react-icons/lu';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'solid' | 'framed' | 'satin' | 'destructive';
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'solid',
  isLoading = false,
  children,
  className = '',
  disabled,
  ...props
}) => {
  const variantStyles = {
    solid: 'bg-foreground text-background font-semibold shadow-subtle hover:opacity-90',
    framed: 'border border-foreground bg-transparent text-foreground hover:bg-secondary',
    satin: 'bg-secondary text-foreground border border-border hover:border-foreground/40',
    destructive: 'bg-destructive text-destructive-foreground hover:opacity-90'
  };

  return (
    <button
      disabled={disabled || isLoading}
      className={\`inline-flex items-center justify-center gap-2 h-10 px-5 rounded-xl text-sm font-medium transition-all active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed \${variantStyles[variant]} \${className}\`}
      {...props}
    >
      {isLoading ? <LuLoader2 className="h-4 w-4 animate-spin" /> : null}
      {children}
    </button>
  );
};`,

    toast: `import React, { useState, useEffect } from 'react';
import { LuCheckCircle2, LuAlertCircle, LuInfo, LuX } from 'react-icons/lu';

export interface ToastItem {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
}

export const ToastNotification: React.FC<{
  toast: ToastItem;
  onDismiss: (id: string) => void;
}> = ({ toast, onDismiss }) => {
  useEffect(() => {
    const timer = setTimeout(() => onDismiss(toast.id), 5000);
    return () => clearTimeout(timer);
  }, [toast.id, onDismiss]);

  const icons = {
    success: <LuCheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />,
    error: <LuAlertCircle className="h-4 w-4 text-rose-500 shrink-0 mt-0.5" />,
    info: <LuInfo className="h-4 w-4 text-sky-500 shrink-0 mt-0.5" />
  };

  return (
    <div className="glass rounded-xl p-3.5 border border-border shadow-card flex items-start gap-3 animate-in fade-in slide-in-from-top-2">
      {icons[toast.type]}
      <p className="text-xs font-mono text-foreground flex-1 leading-relaxed">
        {toast.message}
      </p>
      <button onClick={() => onDismiss(toast.id)} className="text-muted-foreground hover:text-foreground">
        <LuX className="h-3.5 w-3.5" />
      </button>
    </div>
  );
};`,

    metric: `import React from 'react';
import { LuTrendingUp } from 'react-icons/lu';

interface MetricCardProps {
  label: string;
  value: string;
  trend: string;
  period: string;
}

export const MetricCard: React.FC<MetricCardProps> = ({ label, value, trend, period }) => {
  return (
    <div className="glass rounded-2xl p-5 border border-border shadow-subtle hover:border-foreground/30 transition-all">
      <div className="flex items-center justify-between text-xs font-mono text-muted-foreground">
        <span>{label}</span>
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold text-[11px]">
          <LuTrendingUp className="h-3 w-3" />
          {trend}
        </span>
      </div>
      <div className="mt-3 font-display text-3xl font-bold text-foreground">
        {value}
      </div>
      <div className="mt-2 text-[11px] font-mono text-muted-foreground">
        Compared to previous {period}
      </div>
    </div>
  );
};`,

    autocomplete: `import React, { useState } from 'react';
import { LuX, LuSearch } from 'react-icons/lu';

export const AutocompleteTagSelector: React.FC = () => {
  const [selected, setSelected] = useState<string[]>(['React 18', 'TypeScript']);
  const [query, setQuery] = useState('');
  const options = ['Angular', 'Next.js', 'Tailwind CSS', 'Zustand', 'RxJS', 'GraphQL'];

  const filtered = options.filter(
    opt => !selected.includes(opt) && opt.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-1.5 p-2 rounded-xl border border-border bg-card">
        {selected.map(item => (
          <span key={item} className="inline-flex items-center gap-1.5 text-xs font-mono px-2.5 py-1 rounded-lg bg-secondary text-foreground border border-border">
            {item}
            <button onClick={() => setSelected(selected.filter(s => s !== item))}>
              <LuX className="h-3 w-3 hover:text-foreground" />
            </button>
          </span>
        ))}
        <input
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Add technology..."
          className="bg-transparent text-xs font-mono px-2 py-1 focus:outline-none flex-1 min-w-[120px]"
        />
      </div>
      {query && (
        <div className="rounded-xl border border-border bg-card p-1 shadow-card">
          {filtered.map(opt => (
            <button
              key={opt}
              onClick={() => { setSelected([...selected, opt]); setQuery(''); }}
              className="w-full text-left text-xs font-mono px-3 py-1.5 rounded-lg hover:bg-secondary text-foreground"
            >
              + {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};`,

    accordion: `import React, { useState } from 'react';
import { LuChevronDown } from 'react-icons/lu';

interface AccordionItem {
  title: string;
  content: string;
}

export const Accordion: React.FC<{ items: AccordionItem[] }> = ({ items }) => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <div className="space-y-2">
      {items.map((item, idx) => {
        const isOpen = openIdx === idx;
        return (
          <div key={idx} className="rounded-xl border border-border glass overflow-hidden transition-all">
            <button
              onClick={() => setOpenIdx(isOpen ? null : idx)}
              className="w-full px-4 py-3 flex items-center justify-between text-left text-sm font-semibold text-foreground hover:bg-secondary/40 transition"
            >
              <span>{item.title}</span>
              <LuChevronDown className={\`h-4 w-4 transition-transform duration-200 \${isOpen ? 'rotate-180' : ''}\`} />
            </button>
            {isOpen && (
              <div className="px-4 pb-3 pt-1 text-xs text-muted-foreground leading-relaxed border-t border-border/50">
                {item.content}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};`,

    segmented: `import React, { useState } from 'react';

export const SegmentedControl: React.FC = () => {
  const [active, setActive] = useState<'Overview' | 'Analytics' | 'Settings'>('Overview');
  const tabs = ['Overview', 'Analytics', 'Settings'] as const;

  return (
    <div className="inline-flex p-1 rounded-xl bg-secondary/80 border border-border">
      {tabs.map(tab => (
        <button
          key={tab}
          onClick={() => setActive(tab)}
          className={\`relative px-4 py-1.5 rounded-lg text-xs font-mono transition-all \${
            active === tab
              ? 'bg-card text-foreground font-semibold shadow-subtle'
              : 'text-muted-foreground hover:text-foreground'
          }\`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};`,

    streaming: `import React, { useState, useEffect } from 'react';
import { LuSparkles } from 'react-icons/lu';

export const AIStreamingMessage: React.FC<{ prompt: string }> = ({ prompt }) => {
  const [output, setOutput] = useState('');
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    let i = 0;
    setOutput('');
    setIsDone(false);
    const interval = setInterval(() => {
      i += 2;
      setOutput(prompt.slice(0, i));
      if (i >= prompt.length) {
        clearInterval(interval);
        setIsDone(true);
      }
    }, 20);
    return () => clearInterval(interval);
  }, [prompt]);

  return (
    <div className="glass rounded-2xl p-4 border border-border shadow-subtle flex gap-3">
      <div className="h-7 w-7 rounded-lg bg-foreground text-background flex items-center justify-center shrink-0">
        <LuSparkles className="h-3.5 w-3.5" />
      </div>
      <div className="text-xs text-foreground font-mono leading-relaxed">
        {output}
        {!isDone && <span className="inline-block w-1.5 h-3.5 bg-foreground ml-1 animate-pulse align-middle" />}
      </div>
    </div>
  );
};`,

    modal: `import React, { useEffect } from 'react';
import { LuX } from 'react-icons/lu';

export const DialogModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}> = ({ isOpen, onClose, title, children }) => {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    if (isOpen) window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm" onClick={onClose}>
      <div className="relative w-full max-w-md glass rounded-2xl p-6 border border-border shadow-elegant bg-card" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between pb-3 border-b border-border">
          <h3 className="font-display font-semibold text-base text-foreground">{title}</h3>
          <button onClick={onClose} className="h-7 w-7 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground">
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="py-4 text-xs text-muted-foreground leading-relaxed">
          {children}
        </div>
        <div className="pt-3 border-t border-border flex justify-end gap-2">
          <button onClick={onClose} className="h-8 px-4 rounded-lg border border-border text-xs font-mono">Cancel</button>
          <button onClick={onClose} className="h-8 px-4 rounded-lg bg-foreground text-background text-xs font-mono">Confirm</button>
        </div>
      </div>
    </div>
  );
};`
  };

  const accordionContent = [
    {
      title: "Modular Component Architecture",
      content: "Components are isolated into atomic tokens, styled using Tailwind CSS utility classes, and strictly typed with TypeScript interfaces to guarantee seamless maintainability across enterprise codebases."
    },
    {
      title: "Predictable Reactive State Flow",
      content: "Asynchronous data lifecycles and client cache synchronization leverage reactive streams (RxJS Observables & custom reactive stores) to eliminate duplicate API requests and prevent UI frame drops."
    },
    {
      title: "Generative AI UI Patterns",
      content: "Real-time streaming LLM endpoints are connected with microsecond token dispatching, cancellation abort controllers, and error recovery fallbacks without requiring paid backend microservices."
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground font-sans pb-24">
      {/* Main Container - clears fixed Navbar */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-24 sm:pt-28">
        {/* Hero Banner inside Sandbox */}
        <div className="border border-border/80 rounded-3xl p-6 sm:p-10 apple-glass-card relative overflow-hidden shadow-elegant">
          <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />
          <div className="relative z-10 max-w-3xl">
            {onBack && (
              <button
                type="button"
                onClick={onBack}
                className="inline-flex items-center gap-1.5 text-xs font-mono text-muted-foreground hover:text-foreground mb-4 transition group"
              >
                <ArrowLeft className="h-3.5 w-3.5 group-hover:-translate-x-0.5 transition-transform" strokeWidth={1.75} />
                <span>Back to portfolio</span>
              </button>
            )}
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border/70 bg-card/60 backdrop-blur-md text-xs font-mono text-foreground mb-4 shadow-subtle">
                <Sparkles className="h-3.5 w-3.5 text-foreground" strokeWidth={1.75} />
                <span>Interactive Design System &amp; Component Lab</span>
              </div>
            </div>
            <h1 className="text-3xl sm:text-5xl font-display font-bold tracking-tight text-foreground">
              Component Sandbox &amp; <span className="text-gradient">Source Code</span>
            </h1>
            <p className="mt-4 text-muted-foreground text-sm sm:text-base leading-relaxed">
              Explore 8 production-grade UI components engineered by Yatin. Test interactive state reactivity, examine TypeScript source implementations, and copy snippets with a single click.
            </p>

            {/* Category Filter Pills */}
            <div className="mt-8 flex flex-wrap gap-2">
              {(['All', 'Actions', 'Feedback', 'Data', 'Navigation', 'AI UI'] as CategoryFilter[]).map(cat => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className={`text-xs font-mono px-4 py-2 rounded-full whitespace-nowrap transition-all active:scale-95 ${
                    activeCategory === cat
                      ? 'bg-foreground text-background font-semibold shadow-subtle'
                      : 'glass-pill border border-border/70 text-muted-foreground hover:text-foreground hover:border-foreground/30'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Components Grid */}
        <div className="mt-12 grid lg:grid-cols-2 gap-8 items-start">
          {/* ========================================================= */}
          {/* COMPONENT 1: Interactive Button System */}
          {/* ========================================================= */}
          {(activeCategory === 'All' || activeCategory === 'Actions') && (
            <div className="apple-glass-card rounded-3xl border border-border/80 shadow-elegant overflow-hidden transition-all duration-300">
              {/* Card Header */}
              <div className="p-4 sm:p-5 border-b border-border flex items-center justify-between flex-wrap gap-3 bg-secondary/30">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">Primitive 01</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-foreground/10 text-foreground font-semibold">Actions</span>
                  </div>
                  <h3 className="font-display font-bold text-base sm:text-lg text-foreground mt-1">Button System</h3>
                  <p className="text-xs text-muted-foreground">Tactile states, spinner reactivity, and variant tokens.</p>
                </div>
                <div className="flex items-center gap-1 bg-card/60 backdrop-blur-md border border-border/70 p-1 rounded-full shrink-0">
                  <button
                    type="button"
                    onClick={() => toggleViewMode('button', 'preview')}
                    className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-mono whitespace-nowrap transition ${
                      viewModes.button === 'preview' ? 'bg-foreground text-background font-medium' : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <Eye className="h-3 w-3" strokeWidth={1.75} />
                    <span>Preview</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => toggleViewMode('button', 'code')}
                    className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-mono whitespace-nowrap transition ${
                      viewModes.button === 'code' ? 'bg-foreground text-background font-medium' : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <Code2 className="h-3 w-3" strokeWidth={1.75} />
                    <span>Code</span>
                  </button>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-4 sm:p-6">
                {viewModes.button === 'preview' ? (
                  <div className="space-y-6">
                    {/* Interactive Controls */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 rounded-xl border border-border bg-background/50 text-xs font-mono">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-muted-foreground whitespace-nowrap text-[11px] sm:text-xs">Variant:</span>
                        <div className="flex flex-wrap items-center gap-1">
                          {(['solid', 'framed', 'satin', 'destructive'] as const).map(v => (
                            <button
                              key={v}
                              type="button"
                              onClick={() => setBtnVariant(v)}
                              className={`px-2.5 py-1 rounded-lg text-[11px] sm:text-xs font-mono whitespace-nowrap capitalize transition ${
                                btnVariant === v
                                  ? 'bg-foreground text-background font-bold shadow-subtle'
                                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                              }`}
                            >
                              {v}
                            </button>
                          ))}
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => setBtnLoading(!btnLoading)}
                        className={`px-3 py-1 rounded-lg text-[11px] sm:text-xs font-mono whitespace-nowrap border border-border transition self-start sm:self-auto ${
                          btnLoading
                            ? 'bg-foreground text-background font-bold shadow-subtle'
                            : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                        }`}
                      >
                        Toggle Loading
                      </button>
                    </div>

                    {/* Live Render Area */}
                    <div className="p-6 sm:p-8 rounded-xl border border-dashed border-border flex flex-col items-center justify-center gap-4 bg-card/40 min-h-[140px]">
                      <button
                        type="button"
                        disabled={btnLoading}
                        onClick={() => setBtnClicks(c => c + 1)}
                        className={`inline-flex items-center justify-center gap-2 h-11 px-6 rounded-xl text-xs font-mono whitespace-nowrap transition-all active:scale-95 shadow-subtle ${
                          btnVariant === 'solid' ? 'bg-foreground text-background font-semibold hover:opacity-90' :
                          btnVariant === 'framed' ? 'border border-foreground bg-transparent text-foreground hover:bg-secondary font-semibold' :
                          btnVariant === 'satin' ? 'bg-secondary text-foreground border border-border hover:border-foreground/40 font-semibold' :
                          'bg-destructive text-destructive-foreground font-semibold hover:opacity-90'
                        }`}
                      >
                        {btnLoading ? (
                          <span className="inline-block h-3.5 w-3.5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                        ) : null}
                        <span>Click Me ({btnClicks})</span>
                      </button>
                      <span className="text-[11px] font-mono text-muted-foreground text-center">
                        Current variant: <strong className="text-foreground">{btnVariant}</strong> · Active clicks: {btnClicks}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => handleCopyCode('button', codeSnippets.button)}
                      className="absolute top-3 right-3 text-xs font-mono flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-border bg-card hover:bg-muted text-muted-foreground hover:text-foreground transition"
                    >
                      {copiedId === 'button' ? <Check className="h-3 w-3 text-emerald-500" /> : <Copy className="h-3 w-3" />}
                      <span>{copiedId === 'button' ? 'Copied' : 'Copy'}</span>
                    </button>
                    <pre className="rounded-xl p-4 sm:p-5 bg-zinc-950 text-zinc-100 dark:bg-black/90 dark:text-zinc-100 border border-zinc-800 font-mono text-xs sm:text-[13px] overflow-x-auto leading-relaxed max-h-[320px] shadow-inner">
                      <code>{codeSnippets.button}</code>
                    </pre>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* COMPONENT 2: Toast & Notification Center */}
          {/* ========================================================= */}
          {(activeCategory === 'All' || activeCategory === 'Feedback') && (
            <div className="apple-glass-card rounded-3xl border border-border/80 shadow-elegant overflow-hidden transition-all duration-300">
              <div className="p-4 sm:p-5 border-b border-border flex items-center justify-between flex-wrap gap-3 bg-secondary/30">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">Primitive 02</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-foreground/10 text-foreground font-semibold">Feedback</span>
                  </div>
                  <h3 className="font-display font-bold text-base sm:text-lg text-foreground mt-1">Toast System</h3>
                  <p className="text-xs text-muted-foreground">Auto-dismissing, animated status feedback notifications.</p>
                </div>
                <div className="flex items-center gap-1 bg-card/60 backdrop-blur-md border border-border/70 p-1 rounded-full shrink-0">
                  <button
                    type="button"
                    onClick={() => toggleViewMode('toast', 'preview')}
                    className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-mono whitespace-nowrap transition ${
                      viewModes.toast === 'preview' ? 'bg-foreground text-background font-medium' : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <Eye className="h-3 w-3" strokeWidth={1.75} />
                    <span>Preview</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => toggleViewMode('toast', 'code')}
                    className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-mono whitespace-nowrap transition ${
                      viewModes.toast === 'code' ? 'bg-foreground text-background font-medium' : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <Code2 className="h-3 w-3" strokeWidth={1.75} />
                    <span>Code</span>
                  </button>
                </div>
              </div>

              <div className="p-4 sm:p-6">
                {viewModes.toast === 'preview' ? (
                  <div className="space-y-4">
                    {/* Triggers */}
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        type="button"
                        onClick={() => triggerToast('success')}
                        className="h-9 px-2 rounded-xl border border-border bg-card hover:bg-secondary text-[11px] sm:text-xs font-mono text-foreground flex items-center justify-center gap-1.5 whitespace-nowrap transition active:scale-95"
                      >
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                        <span>Success</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => triggerToast('error')}
                        className="h-9 px-2 rounded-xl border border-border bg-card hover:bg-secondary text-[11px] sm:text-xs font-mono text-foreground flex items-center justify-center gap-1.5 whitespace-nowrap transition active:scale-95"
                      >
                        <AlertCircle className="h-3.5 w-3.5 text-rose-500 shrink-0" />
                        <span>Error</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => triggerToast('info')}
                        className="h-9 px-2 rounded-xl border border-border bg-card hover:bg-secondary text-[11px] sm:text-xs font-mono text-foreground flex items-center justify-center gap-1.5 whitespace-nowrap transition active:scale-95"
                      >
                        <Info className="h-3.5 w-3.5 text-sky-500 shrink-0" />
                        <span>Info</span>
                      </button>
                    </div>

                    {/* Stacking Toasts Display */}
                    <div className="space-y-2.5 pt-2">
                      {toasts.map(t => (
                        <div
                          key={t.id}
                          className="glass rounded-xl p-3.5 border border-border flex items-start gap-3 shadow-subtle animate-in fade-in slide-in-from-top-2"
                        >
                          {t.type === 'success' && <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />}
                          {t.type === 'error' && <AlertCircle className="h-4 w-4 text-rose-500 shrink-0 mt-0.5" />}
                          {t.type === 'info' && <Info className="h-4 w-4 text-sky-500 shrink-0 mt-0.5" />}
                          <p className="text-xs font-mono text-foreground flex-1 leading-relaxed">
                            {t.message}
                          </p>
                          <button
                            type="button"
                            onClick={() => removeToast(t.id)}
                            className="text-muted-foreground hover:text-foreground p-0.5"
                          >
                            <X className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      ))}
                      {toasts.length === 0 && (
                        <div className="text-center py-6 text-xs font-mono text-muted-foreground border border-dashed border-border rounded-xl">
                          No active toasts. Click a trigger above to dispatch one.
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => handleCopyCode('toast', codeSnippets.toast)}
                      className="absolute top-3 right-3 text-xs font-mono flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-border bg-card hover:bg-muted text-muted-foreground hover:text-foreground transition whitespace-nowrap"
                    >
                      {copiedId === 'toast' ? <Check className="h-3 w-3 text-emerald-500" /> : <Copy className="h-3 w-3" />}
                      <span>{copiedId === 'toast' ? 'Copied' : 'Copy'}</span>
                    </button>
                    <pre className="rounded-xl p-4 sm:p-5 bg-zinc-950 text-zinc-100 dark:bg-black/90 dark:text-zinc-100 border border-zinc-800 font-mono text-xs sm:text-[13px] overflow-x-auto leading-relaxed max-h-[320px] shadow-inner">
                      <code>{codeSnippets.toast}</code>
                    </pre>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* COMPONENT 3: Metric KPI Card with Trend Badge */}
          {/* ========================================================= */}
          {(activeCategory === 'All' || activeCategory === 'Data') && (
            <div className="apple-glass-card rounded-3xl border border-border/80 shadow-elegant overflow-hidden transition-all duration-300">
              <div className="p-4 sm:p-5 border-b border-border flex items-center justify-between flex-wrap gap-3 bg-secondary/30">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">Primitive 03</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-foreground/10 text-foreground font-semibold">Data</span>
                  </div>
                  <h3 className="font-display font-bold text-base sm:text-lg text-foreground mt-1">SaaS Metric Card</h3>
                  <p className="text-xs text-muted-foreground">High-density data card with dynamic period switching.</p>
                </div>
                <div className="flex items-center gap-1 bg-card/60 backdrop-blur-md border border-border/70 p-1 rounded-full shrink-0">
                  <button
                    type="button"
                    onClick={() => toggleViewMode('metric', 'preview')}
                    className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-mono whitespace-nowrap transition ${
                      viewModes.metric === 'preview' ? 'bg-foreground text-background font-medium' : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <Eye className="h-3 w-3" strokeWidth={1.75} />
                    <span>Preview</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => toggleViewMode('metric', 'code')}
                    className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-mono whitespace-nowrap transition ${
                      viewModes.metric === 'code' ? 'bg-foreground text-background font-medium' : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <Code2 className="h-3 w-3" strokeWidth={1.75} />
                    <span>Code</span>
                  </button>
                </div>
              </div>

              <div className="p-4 sm:p-6">
                {viewModes.metric === 'preview' ? (
                  <div className="space-y-4">
                    {/* Time Window Switcher */}
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="text-xs font-mono text-muted-foreground whitespace-nowrap">Time Window:</span>
                      <div className="inline-flex gap-1 p-1 rounded-xl border border-border bg-background/50">
                        {(['7D', '30D', '90D'] as const).map(p => (
                          <button
                            key={p}
                            type="button"
                            onClick={() => setMetricRange(p)}
                            className={`px-3 py-1 rounded-lg text-xs font-mono whitespace-nowrap transition ${
                              metricRange === p ? 'bg-foreground text-background font-bold shadow-subtle' : 'text-muted-foreground hover:text-foreground'
                            }`}
                          >
                            {p}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Metric Card Live Display */}
                    <div className="glass rounded-2xl p-5 sm:p-6 border border-border shadow-subtle hover:border-foreground/30 transition-all bg-card/60">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
                          Core Web Vitals Score
                        </span>
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold text-xs font-mono whitespace-nowrap">
                          <TrendingUp className="h-3 w-3" />
                          {metricRange === '7D' ? '+4.2%' : metricRange === '30D' ? '+18.7%' : '+31.4%'}
                        </span>
                      </div>
                      <div className="mt-4 flex items-baseline gap-2">
                        <span className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-foreground">
                          {metricRange === '7D' ? '96.2' : metricRange === '30D' ? '99.4' : '99.8'}
                        </span>
                        <span className="text-xs font-mono text-muted-foreground">/ 100 benchmark</span>
                      </div>
                      <p className="mt-3 text-xs text-muted-foreground leading-relaxed">
                        Evaluated across 20+ production user journeys in past {metricRange}.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => handleCopyCode('metric', codeSnippets.metric)}
                      className="absolute top-3 right-3 text-xs font-mono flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-border bg-card hover:bg-muted text-muted-foreground hover:text-foreground transition"
                    >
                      {copiedId === 'metric' ? <Check className="h-3 w-3 text-emerald-500" /> : <Copy className="h-3 w-3" />}
                      <span>{copiedId === 'metric' ? 'Copied' : 'Copy'}</span>
                    </button>
                    <pre className="rounded-xl p-4 sm:p-5 bg-zinc-950 text-zinc-100 dark:bg-black/90 dark:text-zinc-100 border border-zinc-800 font-mono text-xs sm:text-[13px] overflow-x-auto leading-relaxed max-h-[320px] shadow-inner">
                      <code>{codeSnippets.metric}</code>
                    </pre>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* COMPONENT 4: Searchable Autocomplete Tag Selector */}
          {/* ========================================================= */}
          {(activeCategory === 'All' || activeCategory === 'Actions') && (
            <div className="apple-glass-card rounded-3xl border border-border/80 shadow-elegant overflow-hidden transition-all duration-300">
              <div className="p-4 sm:p-5 border-b border-border flex items-center justify-between flex-wrap gap-3 bg-secondary/30">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">Primitive 04</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-foreground/10 text-foreground font-semibold">Inputs</span>
                  </div>
                  <h3 className="font-display font-bold text-base sm:text-lg text-foreground mt-1">Tag Input Selector</h3>
                  <p className="text-xs text-muted-foreground">Filterable multiselect badge input with instant filtering.</p>
                </div>
                <div className="flex items-center gap-1 bg-card/60 backdrop-blur-md border border-border/70 p-1 rounded-full shrink-0">
                  <button
                    type="button"
                    onClick={() => toggleViewMode('autocomplete', 'preview')}
                    className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-mono whitespace-nowrap transition ${
                      viewModes.autocomplete === 'preview' ? 'bg-foreground text-background font-medium' : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <Eye className="h-3 w-3" strokeWidth={1.75} />
                    <span>Preview</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => toggleViewMode('autocomplete', 'code')}
                    className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-mono whitespace-nowrap transition ${
                      viewModes.autocomplete === 'code' ? 'bg-foreground text-background font-medium' : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <Code2 className="h-3 w-3" strokeWidth={1.75} />
                    <span>Code</span>
                  </button>
                </div>
              </div>

              <div className="p-4 sm:p-6">
                {viewModes.autocomplete === 'preview' ? (
                  <div className="space-y-4">
                    {/* Live Multiselect Pill Input */}
                    <div className="p-3 rounded-xl border border-border bg-card flex flex-wrap gap-2 items-center min-h-[48px]">
                      {tags.map(tag => (
                        <span
                          key={tag}
                          className="inline-flex items-center gap-1.5 text-xs font-mono px-3 py-1 rounded-lg bg-secondary text-foreground border border-border shadow-subtle whitespace-nowrap"
                        >
                          <span>{tag}</span>
                          <button
                            type="button"
                            onClick={() => setTags(tags.filter(t => t !== tag))}
                            className="text-muted-foreground hover:text-foreground p-0.5"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </span>
                      ))}
                      <input
                        type="text"
                        value={tagInput}
                        onChange={e => setTagInput(e.target.value)}
                        placeholder="Search frameworks..."
                        className="bg-transparent text-xs font-mono px-2 py-1 focus:outline-none flex-1 min-w-[130px] text-foreground placeholder:text-muted-foreground"
                      />
                    </div>

                    {/* Available Suggestions */}
                    <div className="space-y-1.5">
                      <div className="text-[11px] font-mono text-muted-foreground uppercase tracking-wider">
                        Quick Add Suggestions:
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {availableTags
                          .filter(t => !tags.includes(t) && t.toLowerCase().includes(tagInput.toLowerCase()))
                          .map(s => (
                            <button
                              key={s}
                              type="button"
                              onClick={() => {
                                setTags([...tags, s]);
                                setTagInput('');
                              }}
                              className="text-xs font-mono px-2.5 py-1 rounded-md border border-border bg-background/50 text-muted-foreground hover:text-foreground hover:bg-secondary transition active:scale-95 whitespace-nowrap"
                            >
                              + {s}
                            </button>
                          ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => handleCopyCode('autocomplete', codeSnippets.autocomplete)}
                      className="absolute top-3 right-3 text-xs font-mono flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-border bg-card hover:bg-muted text-muted-foreground hover:text-foreground transition"
                    >
                      {copiedId === 'autocomplete' ? <Check className="h-3 w-3 text-emerald-500" /> : <Copy className="h-3 w-3" />}
                      <span>{copiedId === 'autocomplete' ? 'Copied' : 'Copy'}</span>
                    </button>
                    <pre className="rounded-xl p-4 sm:p-5 bg-zinc-950 text-zinc-100 dark:bg-black/90 dark:text-zinc-100 border border-zinc-800 font-mono text-xs sm:text-[13px] overflow-x-auto leading-relaxed max-h-[320px] shadow-inner">
                      <code>{codeSnippets.autocomplete}</code>
                    </pre>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* COMPONENT 5: Smooth Accordion & Collapsible */}
          {/* ========================================================= */}
          {(activeCategory === 'All' || activeCategory === 'Navigation') && (
            <div className="apple-glass-card rounded-3xl border border-border/80 shadow-elegant overflow-hidden transition-all duration-300">
              <div className="p-4 sm:p-5 border-b border-border flex items-center justify-between flex-wrap gap-3 bg-secondary/30">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">Primitive 05</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-foreground/10 text-foreground font-semibold">Disclosure</span>
                  </div>
                  <h3 className="font-display font-bold text-base sm:text-lg text-foreground mt-1">Accordion Primitives</h3>
                  <p className="text-xs text-muted-foreground">Animated disclosure cards with fluid height expansion.</p>
                </div>
                <div className="flex items-center gap-1 bg-card/60 backdrop-blur-md border border-border/70 p-1 rounded-full shrink-0">
                  <button
                    type="button"
                    onClick={() => toggleViewMode('accordion', 'preview')}
                    className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-mono whitespace-nowrap transition ${
                      viewModes.accordion === 'preview' ? 'bg-foreground text-background font-medium' : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <Eye className="h-3 w-3" strokeWidth={1.75} />
                    <span>Preview</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => toggleViewMode('accordion', 'code')}
                    className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-mono whitespace-nowrap transition ${
                      viewModes.accordion === 'code' ? 'bg-foreground text-background font-medium' : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <Code2 className="h-3 w-3" strokeWidth={1.75} />
                    <span>Code</span>
                  </button>
                </div>
              </div>

              <div className="p-4 sm:p-6">
                {viewModes.accordion === 'preview' ? (
                  <div className="space-y-2.5">
                    {accordionContent.map((item, idx) => {
                      const isOpen = openAccordion === idx;
                      return (
                        <div
                          key={idx}
                          className="rounded-xl border border-border glass overflow-hidden transition-all duration-200"
                        >
                          <button
                            type="button"
                            onClick={() => setOpenAccordion(isOpen ? null : idx)}
                            className="w-full px-4 py-3 flex items-center justify-between text-left text-xs font-semibold text-foreground hover:bg-secondary/40 transition"
                          >
                            <span>{item.title}</span>
                            <ChevronDown
                              className={`h-4 w-4 text-muted-foreground transition-transform duration-200 shrink-0 ${isOpen ? 'rotate-180' : ''}`}
                              strokeWidth={1.75}
                            />
                          </button>
                          {isOpen && (
                            <div className="px-4 pb-3 pt-1 text-xs text-muted-foreground leading-relaxed border-t border-border/50 animate-in fade-in">
                              {item.content}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => handleCopyCode('accordion', codeSnippets.accordion)}
                      className="absolute top-3 right-3 text-xs font-mono flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-border bg-card hover:bg-muted text-muted-foreground hover:text-foreground transition"
                    >
                      {copiedId === 'accordion' ? <Check className="h-3 w-3 text-emerald-500" /> : <Copy className="h-3 w-3" />}
                      <span>{copiedId === 'accordion' ? 'Copied' : 'Copy'}</span>
                    </button>
                    <pre className="rounded-xl p-4 sm:p-5 bg-zinc-950 text-zinc-100 dark:bg-black/90 dark:text-zinc-100 border border-zinc-800 font-mono text-xs sm:text-[13px] overflow-x-auto leading-relaxed max-h-[320px] shadow-inner">
                      <code>{codeSnippets.accordion}</code>
                    </pre>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* COMPONENT 6: Segmented Control Slider Tabs */}
          {/* ========================================================= */}
          {(activeCategory === 'All' || activeCategory === 'Navigation') && (
            <div className="apple-glass-card rounded-3xl border border-border/80 shadow-elegant overflow-hidden transition-all duration-300">
              <div className="p-4 sm:p-5 border-b border-border flex items-center justify-between flex-wrap gap-3 bg-secondary/30">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">Primitive 06</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-foreground/10 text-foreground font-semibold">Navigation</span>
                  </div>
                  <h3 className="font-display font-bold text-base sm:text-lg text-foreground mt-1">Segmented Control</h3>
                  <p className="text-xs text-muted-foreground">Sliding pill indicator with keyboard-accessible tabs.</p>
                </div>
                <div className="flex items-center gap-1 bg-card/60 backdrop-blur-md border border-border/70 p-1 rounded-full shrink-0">
                  <button
                    type="button"
                    onClick={() => toggleViewMode('segmented', 'preview')}
                    className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-mono whitespace-nowrap transition ${
                      viewModes.segmented === 'preview' ? 'bg-foreground text-background font-medium' : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <Eye className="h-3 w-3" strokeWidth={1.75} />
                    <span>Preview</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => toggleViewMode('segmented', 'code')}
                    className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-mono whitespace-nowrap transition ${
                      viewModes.segmented === 'code' ? 'bg-foreground text-background font-medium' : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <Code2 className="h-3 w-3" strokeWidth={1.75} />
                    <span>Code</span>
                  </button>
                </div>
              </div>

              <div className="p-4 sm:p-6">
                {viewModes.segmented === 'preview' ? (
                  <div className="space-y-4">
                    {/* Segmented Controls */}
                    <div className="p-1 rounded-xl bg-secondary/80 border border-border flex flex-wrap sm:flex-nowrap gap-1">
                      {(['design', 'api', 'security'] as const).map(tab => (
                        <button
                          key={tab}
                          type="button"
                          onClick={() => setActiveSegment(tab)}
                          className={`flex-1 min-w-[80px] py-2 px-2.5 rounded-lg text-[11px] sm:text-xs font-mono capitalize whitespace-nowrap transition-all ${
                            activeSegment === tab
                              ? 'bg-card text-foreground font-bold shadow-subtle border border-border'
                              : 'text-muted-foreground hover:text-foreground'
                          }`}
                        >
                          {tab} Layer
                        </button>
                      ))}
                    </div>

                    {/* Tab Pane Content */}
                    <div className="p-4 rounded-xl border border-border bg-card/40 text-xs font-mono leading-relaxed">
                      {activeSegment === 'design' && (
                        <div className="space-y-1 text-muted-foreground">
                          <p className="font-bold text-foreground">Design Tokens &amp; Atoms</p>
                          <p>Configured using HSL variables, fluid typography, and dark/light contrast ratios exceeding WCAG AA standards.</p>
                        </div>
                      )}
                      {activeSegment === 'api' && (
                        <div className="space-y-1 text-muted-foreground">
                          <p className="font-bold text-foreground">REST &amp; Streaming Endpoints</p>
                          <p>Structured with exponential backoff retries, abort controllers, and optimistic UI updates.</p>
                        </div>
                      )}
                      {activeSegment === 'security' && (
                        <div className="space-y-1 text-muted-foreground">
                          <p className="font-bold text-foreground">Client Security Hardening</p>
                          <p>Zero eval vulnerabilities, sanitized Markdown sanitization, and strictly typed JSON contracts.</p>
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => handleCopyCode('segmented', codeSnippets.segmented)}
                      className="absolute top-3 right-3 text-xs font-mono flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-border bg-card hover:bg-muted text-muted-foreground hover:text-foreground transition"
                    >
                      {copiedId === 'segmented' ? <Check className="h-3 w-3 text-emerald-500" /> : <Copy className="h-3 w-3" />}
                      <span>{copiedId === 'segmented' ? 'Copied' : 'Copy'}</span>
                    </button>
                    <pre className="rounded-xl p-4 sm:p-5 bg-zinc-950 text-zinc-100 dark:bg-black/90 dark:text-zinc-100 border border-zinc-800 font-mono text-xs sm:text-[13px] overflow-x-auto leading-relaxed max-h-[320px] shadow-inner">
                      <code>{codeSnippets.segmented}</code>
                    </pre>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* COMPONENT 7: AI Streaming Response Simulator */}
          {/* ========================================================= */}
          {(activeCategory === 'All' || activeCategory === 'AI UI') && (
            <div className="apple-glass-card rounded-3xl border border-border/80 shadow-elegant overflow-hidden transition-all duration-300">
              <div className="p-4 sm:p-5 border-b border-border flex items-center justify-between flex-wrap gap-3 bg-secondary/30">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">Primitive 07</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-foreground/10 text-foreground font-semibold">AI UI</span>
                  </div>
                  <h3 className="font-display font-bold text-base sm:text-lg text-foreground mt-1">AI Streaming Bubble</h3>
                  <p className="text-xs text-muted-foreground">Token-by-token simulated generator with abort controls.</p>
                </div>
                <div className="flex items-center gap-1 bg-card/60 backdrop-blur-md border border-border/70 p-1 rounded-full shrink-0">
                  <button
                    type="button"
                    onClick={() => toggleViewMode('streaming', 'preview')}
                    className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-mono whitespace-nowrap transition ${
                      viewModes.streaming === 'preview' ? 'bg-foreground text-background font-medium' : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <Eye className="h-3 w-3" strokeWidth={1.75} />
                    <span>Preview</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => toggleViewMode('streaming', 'code')}
                    className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-mono whitespace-nowrap transition ${
                      viewModes.streaming === 'code' ? 'bg-foreground text-background font-medium' : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <Code2 className="h-3 w-3" strokeWidth={1.75} />
                    <span>Code</span>
                  </button>
                </div>
              </div>

              <div className="p-4 sm:p-6">
                {viewModes.streaming === 'preview' ? (
                  <div className="space-y-4">
                    {/* Prompt Trigger Buttons */}
                    <div className="flex flex-wrap gap-1.5">
                      <button
                        type="button"
                        onClick={() => startStreaming('React 18 Concurrent Features introduce useTransition and Suspense boundaries for zero-jank interface updates.')}
                        disabled={isStreaming}
                        className="text-[11px] sm:text-xs font-mono px-3 py-1.5 rounded-lg border border-border bg-card hover:bg-secondary text-foreground transition active:scale-95 disabled:opacity-50 text-left whitespace-normal sm:whitespace-nowrap"
                      >
                        Prompt A: React 18 Concurrency
                      </button>
                      <button
                        type="button"
                        onClick={() => startStreaming('Next.js 14 App Router unlocks Server Components, reducing client bundle weight by keeping data loaders on edge nodes.')}
                        disabled={isStreaming}
                        className="text-[11px] sm:text-xs font-mono px-3 py-1.5 rounded-lg border border-border bg-card hover:bg-secondary text-foreground transition active:scale-95 disabled:opacity-50 text-left whitespace-normal sm:whitespace-nowrap"
                      >
                        Prompt B: Next.js Server Components
                      </button>
                    </div>

                    {/* Live Streaming Bubble */}
                    <div className="glass rounded-2xl p-4 border border-border shadow-subtle flex gap-3 min-h-[110px] items-start">
                      <div className="h-8 w-8 rounded-xl bg-foreground text-background flex items-center justify-center shrink-0 shadow-subtle">
                        <Sparkles className="h-4 w-4" strokeWidth={1.75} />
                      </div>
                      <div className="text-xs text-foreground font-mono leading-relaxed flex-1">
                        {streamText}
                        {isStreaming && (
                          <span className="inline-block w-1.5 h-3.5 bg-foreground ml-1 animate-pulse align-middle" />
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => handleCopyCode('streaming', codeSnippets.streaming)}
                      className="absolute top-3 right-3 text-xs font-mono flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-border bg-card hover:bg-muted text-muted-foreground hover:text-foreground transition"
                    >
                      {copiedId === 'streaming' ? <Check className="h-3 w-3 text-emerald-500" /> : <Copy className="h-3 w-3" />}
                      <span>{copiedId === 'streaming' ? 'Copied' : 'Copy'}</span>
                    </button>
                    <pre className="rounded-xl p-4 sm:p-5 bg-zinc-950 text-zinc-100 dark:bg-black/90 dark:text-zinc-100 border border-zinc-800 font-mono text-xs sm:text-[13px] overflow-x-auto leading-relaxed max-h-[320px] shadow-inner">
                      <code>{codeSnippets.streaming}</code>
                    </pre>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* COMPONENT 8: Modal Dialog Primitive */}
          {/* ========================================================= */}
          {(activeCategory === 'All' || activeCategory === 'Feedback') && (
            <div className="apple-glass-card rounded-3xl border border-border/80 shadow-elegant overflow-hidden transition-all duration-300">
              <div className="p-4 sm:p-5 border-b border-border flex items-center justify-between flex-wrap gap-3 bg-secondary/30">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">Primitive 08</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-foreground/10 text-foreground font-semibold">Overlays</span>
                  </div>
                  <h3 className="font-display font-bold text-base sm:text-lg text-foreground mt-1">Modal Dialog</h3>
                  <p className="text-xs text-muted-foreground">Focus-trapped accessible dialog with backdrop dismiss.</p>
                </div>
                <div className="flex items-center gap-1 bg-card/60 backdrop-blur-md border border-border/70 p-1 rounded-full shrink-0">
                  <button
                    type="button"
                    onClick={() => toggleViewMode('modal', 'preview')}
                    className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-mono whitespace-nowrap transition ${
                      viewModes.modal === 'preview' ? 'bg-foreground text-background font-medium' : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <Eye className="h-3 w-3" strokeWidth={1.75} />
                    <span>Preview</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => toggleViewMode('modal', 'code')}
                    className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-mono whitespace-nowrap transition ${
                      viewModes.modal === 'code' ? 'bg-foreground text-background font-medium' : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <Code2 className="h-3 w-3" strokeWidth={1.75} />
                    <span>Code</span>
                  </button>
                </div>
              </div>

              <div className="p-4 sm:p-6">
                {viewModes.modal === 'preview' ? (
                  <div className="p-6 sm:p-8 rounded-xl border border-dashed border-border flex flex-col items-center justify-center gap-3 bg-card/40 min-h-[140px]">
                    <button
                      type="button"
                      onClick={() => setModalOpen(true)}
                      className="inline-flex items-center gap-2 h-10 px-5 rounded-xl bg-foreground text-background text-xs font-mono font-semibold hover:opacity-90 active:scale-95 transition shadow-subtle whitespace-nowrap"
                    >
                      <Maximize2 className="h-3.5 w-3.5" strokeWidth={1.75} />
                      <span>Trigger Dialog Modal</span>
                    </button>
                    <span className="text-[11px] font-mono text-muted-foreground text-center">
                      ESC key listener &amp; backdrop blur enabled
                    </span>
                  </div>
                ) : (
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => handleCopyCode('modal', codeSnippets.modal)}
                      className="absolute top-3 right-3 text-xs font-mono flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-border bg-card hover:bg-muted text-muted-foreground hover:text-foreground transition whitespace-nowrap"
                    >
                      {copiedId === 'modal' ? <Check className="h-3 w-3 text-emerald-500" /> : <Copy className="h-3 w-3" />}
                      <span>{copiedId === 'modal' ? 'Copied' : 'Copy'}</span>
                    </button>
                    <pre className="rounded-xl p-4 sm:p-5 bg-zinc-950 text-zinc-100 dark:bg-black/90 dark:text-zinc-100 border border-zinc-800 font-mono text-xs sm:text-[13px] overflow-x-auto leading-relaxed max-h-[320px] shadow-inner">
                      <code>{codeSnippets.modal}</code>
                    </pre>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Modal Dialog Instance */}
        {modalOpen && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in"
            onClick={() => setModalOpen(false)}
          >
            <div
              className="relative w-full max-w-md apple-glass-card rounded-3xl p-6 sm:p-7 border border-border/80 shadow-elegant"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center justify-between pb-3 border-b border-border/70">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                  <h3 className="font-display font-bold text-base text-foreground">Production Deployment</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="h-8 w-8 rounded-full glass-pill border border-border/70 flex items-center justify-center text-muted-foreground hover:text-foreground transition active:scale-95"
                >
                  <X className="h-4 w-4" strokeWidth={1.75} />
                </button>
              </div>
              <div className="py-4 text-xs font-mono text-muted-foreground leading-relaxed space-y-2">
                <p>Are you sure you want to trigger continuous deployment to the staging environment?</p>
                <div className="p-2.5 rounded-xl bg-secondary/50 border border-border/70 text-[11px] text-foreground">
                  Target: <code>cdn.softobiz-edge.prod</code> (Commit <code>#7f4a21</code>)
                </div>
              </div>
              <div className="pt-3 border-t border-border/70 flex justify-end gap-2 flex-wrap">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="h-9 px-4 rounded-full glass-pill border border-border/70 text-xs font-mono hover:text-foreground transition whitespace-nowrap active:scale-95"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setModalOpen(false);
                    triggerToast('success');
                  }}
                  className="h-9 px-5 rounded-full bg-foreground text-background text-xs font-mono font-semibold hover:opacity-90 transition active:scale-95 shadow-subtle whitespace-nowrap"
                >
                  Confirm Deploy
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
