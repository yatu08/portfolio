import React, { useState, useRef, useEffect } from 'react';
import { 
  LuSparkles as Sparkles, 
  LuArrowUp as ArrowUp, 
  LuRotateCcw as RotateCcw, 
  LuChevronDown as ChevronDown,
  LuFileText as FileText
} from 'react-icons/lu';
import { profileData } from '../data/profile';
import { experienceList } from '../data/experience';
import { projectsList } from '../data/projects';

interface Message {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  isStreaming?: boolean;
}

interface AIAssistantProps {
  onOpenResume?: () => void;
}

const quickPrompts = [
  'Core Tech Stack',
  'Softobiz & WebX Experience',
  'Featured Projects',
  'AI Frontend Integration',
  'How to Hire Yatin'
];

export const AIAssistant: React.FC<AIAssistantProps> = ({ onOpenResume }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'ai',
      text: `Hello! I'm Yatin's AI Portfolio Assistant.`
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const streamIntervalRef = useRef<number | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  // Clean up streaming on unmount
  useEffect(() => {
    return () => {
      if (streamIntervalRef.current) {
        clearInterval(streamIntervalRef.current);
      }
    };
  }, []);

  // Knowledge base retrieval function (Runs 100% Free in the browser)
  const getAIResponse = (query: string): string => {
    const q = query.toLowerCase();

    if (q.includes('skill') || q.includes('stack') || q.includes('technolog') || q.includes('framework')) {
      return `Yatin has **4+ years of hands-on experience** in modern frontend engineering:\n\n• **Core Frameworks:** React.js, Angular, Next.js\n• **Languages:** TypeScript, JavaScript (ES6+), HTML5 / CSS3\n• **Styling:** Tailwind CSS, SCSS, Responsive Web Design\n• **State & Architecture:** RxJS, Component Libraries\n• **AI Features:** Streaming Chat, LLM Search, Prompt UX\n• **Tools:** Git, GitHub, Browser DevTools, Vite, Figma-to-Code.`;
    }

    if (q.includes('experience') || q.includes('softobiz') || q.includes('webx') || q.includes('job') || q.includes('work') || q.includes('company') || q.includes('journey')) {
      const exps = experienceList.map(e => `• **${e.role}** at **${e.company}** (${e.period}): ${e.responsibilities[0]}`).join('\n\n');
      return `Yatin has over **${profileData.experienceYears} years of professional frontend engineering experience**:\n\n${exps}\n\nHe specializes in Figma-to-code implementations, scalable React/Angular component architectures, and REST API integrations with clean, reactive state management.`;
    }

    if (q.includes('project') || q.includes('built') || q.includes('portfolio') || q.includes('app')) {
      const topProjects = projectsList.slice(0, 3).map(p => `• **${p.name}** (${p.category}): ${p.subtitle}. Tech: ${p.technologies.slice(0, 3).join(', ')}`).join('\n\n');
      return `Here are some of Yatin's key projects:\n\n${topProjects}\n\nYou can explore all projects and their full architecture breakdowns in the **Selected Works** section above!`;
    }

    if (q.includes('ai') || q.includes('llm') || q.includes('openai') || q.includes('streaming') || q.includes('chat')) {
      return `Yatin has active experience integrating **AI-driven features into frontend applications**:\n\n• **Streaming Chat Interfaces:** Real-time token streaming with cancel/retry support (like this assistant).\n• **LLM-Assisted Search:** Semantic searching and predictive prompt recommendations.\n• **REST API Integration:** Connecting OpenAI, Claude, and internal LLM endpoints with robust error handling.\n• **Predictive UX Workflows:** Smart autocomplete, markdown rendering, and responsive generative UI patterns.`;
    }

    if (q.includes('hire') || q.includes('contact') || q.includes('email') || q.includes('reach') || q.includes('interview') || q.includes('availab')) {
      return `Yatin is **${profileData.availability}**!\n\n• **Direct Email:** ${profileData.email}\n• **LinkedIn:** ${profileData.linkedin}\n• **GitHub:** ${profileData.github}\n\nYou can send a direct inquiry via the **Contact form** below, or copy his email with a single click.`;
    }

    if (q.includes('sandbox') || q.includes('component') || q.includes('lab') || q.includes('design system')) {
      return `Yatin has built a dedicated **Interactive Component Sandbox & Design System**!\n\nIt features 8 live, production-grade UI primitives with interactive controls and inspectable TypeScript source code:\n\n• **Button System** (4 variants, loading states)\n• **Toast Notifications** (auto-dismissing stacking alerts)\n• **SaaS Metric KPI Card** (dynamic period switching)\n• **Tag Input Selector** (instant filtering multiselect)\n• **Accordion Primitives** (smooth animated disclosure)\n• **Segmented Control** (sliding pill tabs)\n• **AI Streaming Bubble** (token-by-token simulator)\n• **Modal Dialog** (focus-trapped overlay)\n\nYou can launch it anytime by clicking **Sandbox** in the top navigation or from the Skills section!`;
    }

    if (q.includes('resume') || q.includes('cv') || q.includes('download')) {
      return `You can view and save Yatin's verified **Curriculum Vitae** using the Resume button in the hero section or top navigation! It contains full details of his 4+ years experience, education, and technical competencies.`;
    }

    if (q.includes('hello') || q.includes('hi') || q.includes('hey')) {
      return `Hello! Great to meet you. I can answer any question about Yatin's experience in React, Angular, Next.js, his enterprise projects at Softobiz, or help you schedule a chat with him. What would you like to know?`;
    }

    // Default contextual answer
    return `Yatin is a Frontend Developer with 4+ years of professional experience specializing in React.js, Angular, Next.js, and TypeScript. He builds responsive, high-performance web applications and AI-enhanced user interfaces.\n\nYou can ask me about his **experience at Softobiz**, his **enterprise projects**, his **AI frontend integrations**, or how to **hire him**!`;
  };

  // Stream AI response token by token
  const handleSendMessage = (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query || isTyping) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: query
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    const fullResponse = getAIResponse(query);
    const aiMessageId = (Date.now() + 1).toString();

    // Create empty streaming message
    setMessages((prev) => [
      ...prev,
      {
        id: aiMessageId,
        sender: 'ai',
        text: '',
        isStreaming: true
      }
    ]);

    // Token-by-token character streaming simulation
    let charIndex = 0;
    const chunkSize = 3;

    streamIntervalRef.current = window.setInterval(() => {
      charIndex += chunkSize;
      const currentChunk = fullResponse.slice(0, charIndex);

      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === aiMessageId
            ? { ...msg, text: currentChunk, isStreaming: charIndex < fullResponse.length }
            : msg
        )
      );

      if (charIndex >= fullResponse.length) {
        if (streamIntervalRef.current) {
          clearInterval(streamIntervalRef.current);
          streamIntervalRef.current = null;
        }
        setIsTyping(false);
      }
    }, 20);
  };

  const handleClear = () => {
    if (streamIntervalRef.current) {
      clearInterval(streamIntervalRef.current);
      streamIntervalRef.current = null;
    }
    setIsTyping(false);
    setMessages([
      {
        id: 'welcome',
        sender: 'ai',
        text: `Chat cleared. How can I assist you today?`
      }
    ]);
  };

  return (
    <>
      {/* Floating Trigger Pill */}
      <div className="fixed bottom-4 sm:bottom-6 left-4 sm:left-6 z-40 max-w-[calc(100vw-2rem)]">
        {!isOpen && (
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            aria-label="Open AI Portfolio Assistant"
            className="group flex items-center gap-2 sm:gap-2.5 px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-xl glass border border-border shadow-card hover:shadow-spotlight hover:border-foreground/40 transition-all duration-200 bg-card text-foreground"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <Sparkles className="h-3.5 w-3.5 text-foreground shrink-0" />
            <span className="text-xs font-mono font-medium tracking-tight">
              Ask Yatin's AI
            </span>
          </button>
        )}
      </div>

      {/* Floating Chat Modal */}
      {isOpen && (
        <div className="fixed bottom-4 sm:bottom-6 left-3 right-3 sm:right-auto sm:left-6 z-50 sm:w-[410px] h-[520px] sm:h-[550px] max-h-[85vh] glass rounded-2xl border border-border shadow-elegant flex flex-col bg-card overflow-hidden transition-all duration-200 animate-in fade-in slide-in-from-bottom-4">
          {/* Header */}
          <div className="px-4 py-3 border-b border-border flex items-center justify-between bg-secondary/50">
            <div className="flex items-center gap-2.5">
              <div className="h-7 w-7 rounded-lg bg-foreground text-background flex items-center justify-center">
                <Sparkles className="h-3.5 w-3.5" />
              </div>
              <div>
                <h3 className="font-display font-semibold text-xs text-foreground flex items-center gap-1.5 leading-none">
                  <span>Portfolio AI Copilot</span>
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                </h3>
                <span className="text-[10px] font-mono text-muted-foreground">
                  100% Free · Client-Side AI
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1">
              {onOpenResume && (
                <button
                  type="button"
                  onClick={onOpenResume}
                  title="View Resume"
                  className="h-7 px-2 rounded-md border border-border flex items-center gap-1 text-[11px] font-mono text-muted-foreground hover:text-foreground hover:bg-muted transition"
                >
                  <FileText className="h-3 w-3" />
                  <span>CV</span>
                </button>
              )}
              <button
                type="button"
                onClick={handleClear}
                title="Reset conversation"
                className="h-7 w-7 rounded-md border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition"
              >
                <RotateCcw className="h-3 w-3" />
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                title="Minimize chat"
                className="h-7 w-7 rounded-md border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition"
              >
                <ChevronDown className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Messages Scroll Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 text-xs font-sans">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex gap-2.5 items-start ${
                  m.sender === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {m.sender === 'ai' && (
                  <div className="h-6 w-6 rounded-lg bg-foreground text-background flex items-center justify-center shrink-0 mt-0.5 shadow-subtle">
                    <Sparkles className="h-3 w-3" strokeWidth={2} />
                  </div>
                )}

                <div
                  className={`rounded-2xl px-3.5 py-2.5 max-w-[85%] leading-relaxed ${
                    m.sender === 'user'
                      ? 'bg-foreground text-background font-medium rounded-tr-sm'
                      : 'glass border border-border text-foreground rounded-tl-sm bg-secondary/30'
                  }`}
                >
                  <div className="whitespace-pre-line">
                    {m.text}
                    {m.isStreaming && (
                      <span className="inline-block w-1.5 h-3.5 bg-foreground ml-1 animate-pulse align-middle" />
                    )}
                  </div>
                </div>

                {m.sender === 'user' && (
                  <div className="h-6 w-6 rounded-lg bg-secondary border border-border flex items-center justify-center shrink-0 mt-0.5 text-foreground text-[10px] font-mono font-bold">
                    You
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompt Suggestion Pills */}
          <div className="px-3 py-2 border-t border-border/70 bg-background/50 overflow-x-auto scrollbar-none flex gap-1.5">
            {quickPrompts.map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => handleSendMessage(p)}
                disabled={isTyping}
                className="text-[11px] font-mono whitespace-nowrap px-2.5 py-1 rounded-lg border border-border bg-card hover:bg-secondary hover:text-foreground text-muted-foreground transition active:scale-95 disabled:opacity-50 flex items-center gap-1.5"
              >
                <Sparkles className="h-2.5 w-2.5 text-foreground/70 shrink-0" strokeWidth={1.75} />
                <span>{p}</span>
              </button>
            ))}
          </div>

          {/* Input Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 border-t border-border bg-card flex items-center gap-2"
          >
            <input
              type="text"
              placeholder="Ask anything about Yatin..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isTyping}
              className="flex-1 h-9 px-3 rounded-xl border border-border bg-background/70 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground/50 transition"
            />
            <button
              type="submit"
              disabled={!input.trim() || isTyping}
              className="h-8 w-8 rounded-lg bg-foreground text-background flex items-center justify-center hover:opacity-90 active:scale-95 disabled:opacity-30 transition shrink-0 shadow-subtle"
              title="Send message"
            >
              <ArrowUp className="h-4 w-4" strokeWidth={2} />
            </button>
          </form>
        </div>
      )}
    </>
  );
};
