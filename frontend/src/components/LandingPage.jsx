import { useState, useRef, useEffect } from "react";

function GoogleIcon({ className = "w-5 h-5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path
        fill="#4285F4"
        d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
      />
      <path
        fill="#FBBC05"
        d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.98 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
      />
      <path
        fill="#EA4335"
        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
      />
    </svg>
  );
}

export default function LandingPage({ onLogin, isLoggingIn }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null); // 'features' | 'agents' | 'sandbox' | 'pricing' | 'faq' | null
  const [mobileExpanded, setMobileExpanded] = useState(null);
  const dropdownTimerRef = useRef(null);
  const navContainerRef = useRef(null);

  const handleMouseEnter = (key) => {
    if (dropdownTimerRef.current) clearTimeout(dropdownTimerRef.current);
    setActiveDropdown(key);
  };

  const handleMouseLeave = () => {
    dropdownTimerRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 200);
  };

  const handleDropdownMouseEnter = () => {
    if (dropdownTimerRef.current) clearTimeout(dropdownTimerRef.current);
  };

  const toggleDropdown = (key) => {
    setActiveDropdown((prev) => (prev === key ? null : key));
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (navContainerRef.current && !navContainerRef.current.contains(e.target)) {
        setActiveDropdown(null);
      }
    };
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setActiveDropdown(null);
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const featuresList = [
    {
      title: "Full-Stack Web App Generation",
      tag: "HTML / CSS / JS",
      desc: "Describe any dashboard, utility tool, game, or SaaS frontend. Grid outputs clean, responsive HTML, CSS, and vanilla JS that runs natively in the browser.",
      work: "Direct code synthesis with zero framework overhead and instant DOM rendering in Monaco preview."
    },
    {
      title: "Conversational Intelligence & Reasoning",
      tag: "DeepSeek & Llama 3.3",
      desc: "Fast, multi-turn reasoning for software architecture, code reviews, algorithms, and deep technical problem solving with retained memory.",
      work: "Contextual token retention across multi-turn sessions with sub-second execution latency."
    },
    {
      title: "Live Web Intelligence & Search",
      tag: "Tavily Real-Time API",
      desc: "Real-time web queries extract verified documentation, live benchmarks, breaking tech news, and synthesized citations with zero hallucination.",
      work: "Autonomous search queries with factual ground truth cross-referencing and source links."
    },
    {
      title: "Vector PDF RAG & Report Synthesis",
      tag: "PDFKit & Embeddings",
      desc: "Upload PDFs to execute semantic vector Q&A with chunked embeddings, or generate structured, print-ready PDF reports with headers and download links.",
      work: "500-token chunk vector indexing with cosine similarity retrieval plus PDFKit binary document creation."
    },
    {
      title: "Presentation Deck Generation",
      tag: "PptxGenJS (.pptx)",
      desc: "Create comprehensive 8-slide pitch decks, market reviews, or technical slides with structured agendas, metric callouts, and conclusion slides.",
      work: "Direct export into genuine Microsoft PowerPoint (.pptx) binary files editable in MS Office and Google Slides."
    },
    {
      title: "Multimodal Vision & Generative Art",
      tag: "Gemini 2.5 & Pollinations",
      desc: "Inspect architecture diagrams and code screenshots to find bugs or bottlenecks, or generate high-fidelity 8K visual images from natural text.",
      work: "High-resolution multimodal visual tensor comprehension and Pollinations generative AI rendering."
    },
    {
      title: "Supervisor Graph Orchestration",
      tag: "LangGraph DAG",
      desc: "Zero-configuration automated dispatch. A stateful supervisor graph parses user intent and routes tasks to the appropriate specialist agent node.",
      work: "Deterministic intent routing, isolated graph states, and coordinated tool execution."
    }
  ];

  const agentSpecs = [
    {
      name: "Coding Agent",
      rate: "10 Credits / task",
      capability: "Generates full single-page web applications with modern HTML, clean CSS, and vanilla JS. Interactive state and responsive layouts.",
      capacity: "Up to 1,500 lines of verified code per turn. Auto-mounted in live Monaco sandbox with zero server build step.",
      badge: "Full-Stack Dev"
    },
    {
      name: "Conversational Agent",
      rate: "1 Credit / task",
      capability: "Deep architectural reasoning, code review, algorithmic explanation, bug diagnosis, and general technical consulting.",
      capacity: "Handles 128k context token windows with sub-second execution latency via Llama 3.3 70B & DeepSeek reasoning.",
      badge: "Core Reasoner"
    },
    {
      name: "Live Web Search Agent",
      rate: "5 Credits / task",
      capability: "Autonomous web reconnaissance, developer documentation lookup, factual verification, and real-time news extraction.",
      capacity: "Executes parallel Tavily API search queries, filters duplicate domains, and formats citations with sources.",
      badge: "Real-Time Web"
    },
    {
      name: "PDF Generator & RAG Agent",
      rate: "10 Credits / task",
      capability: "Semantic Q&A across user-uploaded PDF manuals, research papers, and books; automated PDF report compilation.",
      capacity: "Chunks documents into 500-token vector embeddings for semantic retrieval; compiles multi-page PDFKit documents.",
      badge: "Vector RAG"
    },
    {
      name: "Presentation Deck Agent",
      rate: "10 Credits / task",
      capability: "Crafts cohesive 8-slide slide decks with title, agendas, key metrics, feature comparisons, and closing summaries.",
      capacity: "Direct binary compilation into Microsoft PowerPoint (.pptx) files with customizable color schemes.",
      badge: "Slides (.pptx)"
    },
    {
      name: "Vision & Image Gen Agent",
      rate: "10 Credits / task",
      capability: "Multimodal screenshot analysis, diagram reverse engineering, bug pinpointing, and 8K visual asset generation.",
      capacity: "Processes complex images through Gemini 2.5 Flash multimodal vision and Pollinations AI image generation.",
      badge: "Vision & 8K Art"
    }
  ];

  const sandboxChainSteps = [
    {
      step: "01",
      title: "Ingestion & Intent Classification",
      desc: "Supervisor Graph receives user prompt and detects attachments. An LLM classifier identifies whether the task is coding, search, PDF, slides, or chat.",
      detail: "Zero manual agent selection needed. Automatic payload routing based on prompt semantics."
    },
    {
      step: "02",
      title: "Stateful Memory & Context Injection",
      desc: "LangChain memory buffers retrieve relevant conversation history, active project constraints, and previous artifact state into the DAG execution graph.",
      detail: "Preserves full multi-turn awareness across iterative code adjustments and document edits."
    },
    {
      step: "03",
      title: "Specialist Toolchain Invocation",
      desc: "The designated agent invokes specialized toolchains: Tavily web search, LangChain vector embeddings, PDFKit document builder, or PptxGenJS compiler.",
      detail: "Isolated worker sub-graphs ensure zero context leakage and predictable tool execution."
    },
    {
      step: "04",
      title: "Isolated In-Browser Sandbox Execution",
      desc: "For web code tasks, generated HTML, CSS, and JS stream into a secure browser iframe sandbox. Monaco editor reflects code live with instant hot-reloading.",
      detail: "Zero build dependencies or cold starts. Immediate in-browser execution with responsive preview controls."
    },
    {
      step: "05",
      title: "Artifact Finalization & Direct Download",
      desc: "Deliverables are compiled into downloadable files (.pptx PowerPoint decks, .pdf documents) or live interactive preview instances stored with the chat session.",
      detail: "One-click download or instant code inspection directly from the workspace sidebar."
    }
  ];

  const pricingDetails = [
    {
      name: "Free Tier",
      price: "₹0",
      period: "forever",
      credits: "100 Credits",
      limit: "100 chat queries or 10 full coding/PDF/PPT runs",
      features: [
        "100 Credits granted on signup",
        "Live in-browser Monaco sandbox",
        "Access to all 6 specialized agents",
        "Community forum support",
        "Standard execution priority"
      ],
      badge: "Free"
    },
    {
      name: "Starter Tier",
      price: "₹199",
      period: "30 days",
      credits: "500 Credits",
      limit: "500 chat queries, 50 coding runs, or 50 slide decks",
      features: [
        "500 Credits added immediately",
        "Unlimited sandbox live reloads",
        "Full-stack code generation",
        "Downloadable .pptx & .pdf files",
        "Fast-lane execution queue",
        "Email support with 24h response"
      ],
      badge: "Value"
    },
    {
      name: "Pro Tier",
      price: "₹499",
      period: "30 days",
      credits: "1,500 Credits",
      limit: "1,500 chat queries, 150 full-stack app builds, or 150 decks",
      features: [
        "1,500 Credits added immediately",
        "Highest queue priority dispatch",
        "Priority token throughput",
        "Unlimited conversation history",
        "Full commercial usage license",
        "Direct developer support"
      ],
      badge: "Popular"
    }
  ];

  const agentRateTable = [
    { agent: "Conversational Agent", cost: "1 Credit", desc: "Fast reasoning & chat" },
    { agent: "Live Web Search Agent", cost: "5 Credits", desc: "Tavily real-time research" },
    { agent: "Coding Agent", cost: "10 Credits", desc: "Full app + Sandbox preview" },
    { agent: "PDF Generator & RAG", cost: "10 Credits", desc: "Vector search & PDFKit doc" },
    { agent: "Presentation Deck Agent", cost: "10 Credits", desc: "8-slide PowerPoint .pptx" },
    { agent: "Vision & Image Gen Agent", cost: "10 Credits", desc: "Gemini vision & 8K art" }
  ];

  const faqTheoryDetails = [
    {
      q: "How does the LangGraph supervisor orchestration operate under the hood?",
      a: "Grid utilizes a stateful LangGraph Directed Acyclic Graph (DAG) architecture. When a request is received, the Supervisor node performs semantic intent analysis on the prompt and any file attachments. Rather than relying on a monolithic prompt, it delegates work to purpose-built autonomous worker sub-graphs. Each worker has isolated memory, specific tool schemas (Tavily search, PDFKit, Monaco sandbox), and output validation, ensuring deterministic execution with optimal token efficiency."
    },
    {
      q: "How are credits deducted and calculated across different agents?",
      a: "Credits are deducted atomically from your MongoDB user balance prior to agent execution. The deduction directly reflects computational and API overhead: standard conversational queries cost 1 credit; web search queries requiring external Tavily API synthesis cost 5 credits; and compute-heavy multimodal runs (such as full-stack code synthesis, vector PDF indexing, and PowerPoint deck generation) consume 10 credits. Failed executions automatically refund unused credits."
    },
    {
      q: "How does the in-browser sandbox render generated code safely without backend builds?",
      a: "The Sandbox utilizes an isolated browser iframe environment configured with restricted permissions (allow-scripts, allow-same-origin). The coding agent synthesizes self-contained HTML5, inline modern CSS, and vanilla ES6+ JavaScript. The client injects this payload dynamically via srcdoc and blob URLs, providing immediate sub-millisecond hot-reloading with zero server compilation delays."
    },
    {
      q: "How does document RAG search over user-uploaded PDF files without hallucinating?",
      a: "When a PDF is uploaded, our preprocessing pipeline parses raw text streams, partitions content into semantically coherent 500-token chunks with 50-token overlap, and computes high-dimensional vector embeddings. When you ask a query, a cosine-similarity search retrieves only the most relevant document chunks and provides them as ground truth in the agent's context window, ensuring cited, factual answers."
    },
    {
      q: "Can I export and modify generated presentations and PDFs in external software?",
      a: "Yes. Generated presentations are built directly into genuine binary Microsoft PowerPoint (.pptx) file structures using PptxGenJS, which are fully compatible with MS Office, Google Slides, and Apple Keynote. PDF documents are assembled through PDFKit with proper typography, margin bounding boxes, and embedded metadata, ready for instant export and printing."
    }
  ];

  const agents = [
    {
      id: "coding",
      name: "Coding Agent",
      tag: "10 Credits",
      color: "from-blue-500 to-indigo-600",
      description: "Generates full single-page web applications with clean HTML, modern CSS, and vanilla JS. Provides instant in-browser code previews.",
      samplePrompt: "Build a responsive SaaS analytics dashboard with interactive charts and dark theme"
    },
    {
      id: "chat",
      name: "Conversational Agent",
      tag: "1 Credit",
      color: "from-indigo-500 to-violet-600",
      description: "Fast, intelligent, context-aware conversations for learning, brainstorming, debugging, and general problem solving.",
      samplePrompt: "Explain how Redis key expiry and eviction policies work under heavy write load"
    },
    {
      id: "search",
      name: "Live Web Search",
      tag: "5 Credits",
      color: "from-emerald-500 to-teal-600",
      description: "Real-time web research powered by Tavily Search. Retrieves the latest documentation, live news, and synthesized citations.",
      samplePrompt: "What are the latest ECMAScript 2026 features finalized this quarter?"
    },
    {
      id: "pdf",
      name: "PDF Generator & RAG",
      tag: "10 Credits",
      color: "from-amber-500 to-orange-600",
      description: "Create publication-ready PDF reports with headers and download links, or upload PDFs to ask context-grounded questions with vector search.",
      samplePrompt: "Generate a comprehensive executive brief on cloud migration strategies"
    },
    {
      id: "ppt",
      name: "Presentation Deck",
      tag: "10 Credits",
      color: "from-purple-500 to-pink-600",
      description: "Craft professional 8-slide PowerPoint decks (.pptx) complete with metric stats, bullet breakdowns, and conclusion slides.",
      samplePrompt: "Create a modern 8-slide pitch deck for an autonomous AI developer tool"
    },
    {
      id: "vision",
      name: "Vision & Image Gen",
      tag: "10 Credits",
      color: "from-rose-500 to-red-600",
      description: "Analyze uploaded screenshots and architecture diagrams with Gemini 2.5 Flash, or generate photorealistic 8K imagery with Pollinations AI.",
      samplePrompt: "Analyze this system architecture diagram and pinpoint single points of failure"
    }
  ];

  const plans = [
    {
      name: "Free",
      id: "free",
      price: "₹0",
      period: "forever",
      credits: "100 Credits",
      badge: "Starter",
      description: "Ideal for trying out Grid agents and personal experiments.",
      features: [
        "100 Credits on sign-up",
        "Fast Chat agent access",
        "Coding agent with live preview",
        "Single-file PDF generation",
        "Community support",
        "Standard latency"
      ],
      popular: false,
      buttonText: "Start Free"
    },
    {
      name: "Starter",
      id: "starter",
      price: "₹199",
      period: "per 30 days",
      credits: "500 Credits",
      badge: "Great Value",
      description: "For active builders requiring routine code, document, and slide generation.",
      features: [
        "500 Credits added immediately",
        "Access to all 6 specialized agents",
        "Full-stack code generation",
        "PowerPoint (.pptx) deck export",
        "Real-time Tavily search agent",
        "30 days plan validity"
      ],
      popular: false,
      buttonText: "Get Starter"
    },
    {
      name: "Pro",
      id: "pro",
      price: "₹499",
      period: "per 30 days",
      credits: "1,000 Credits",
      badge: "Most Popular",
      description: "For developers and teams building mission-critical prototypes and documents.",
      features: [
        "1,000 High-priority credits",
        "Unlimited conversation memory",
        "DeepSeek & Gemini Flash models",
        "Vector-indexed PDF RAG analyzer",
        "Priority queue & highest limits",
        "Instant support"
      ],
      popular: true,
      buttonText: "Get Pro Plan"
    }
  ];

  return (
    <div className="min-h-screen bg-[#0d0f14] text-slate-100 flex flex-col font-sans selection:bg-indigo-500/30 selection:text-indigo-200">
      {/* Background glow effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[720px] h-[480px] bg-gradient-to-b from-indigo-600/20 via-violet-600/10 to-transparent blur-[140px] rounded-full" />
        <div className="absolute top-[45%] -left-32 w-[420px] h-[420px] bg-indigo-500/10 blur-[130px] rounded-full" />
        <div className="absolute top-[65%] -right-32 w-[420px] h-[420px] bg-violet-600/10 blur-[130px] rounded-full" />
      </div>

      {/* Sticky Top Navbar */}
      <header className="sticky top-0 z-40 backdrop-blur-md bg-[#0d0f14]/90 border-b border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Brand Logo - Text Only */}
          <div className="flex items-center">
            <span className="text-xl font-bold tracking-tight text-white">Grid</span>
          </div>

          {/* Desktop Navigation Links with Interactive Hover & Click Dropdowns */}
          <nav ref={navContainerRef} className="hidden md:flex items-center gap-7 text-[13.5px] font-medium text-slate-400">
            {/* FEATURES DROPDOWN */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter("features")}
              onMouseLeave={handleMouseLeave}
            >
              <button
                onClick={() => toggleDropdown("features")}
                className={`hover:text-white transition-colors duration-150 py-2 flex items-center gap-1 cursor-pointer ${
                  activeDropdown === "features" ? "text-white font-semibold" : ""
                }`}
              >
                <span>Features</span>
                <span className="text-[9px] text-slate-500">▾</span>
              </button>

              {activeDropdown === "features" && (
                <div
                  onMouseEnter={handleDropdownMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  className="absolute top-full left-0 mt-3 w-[620px] max-w-[92vw] z-50 rounded-2xl bg-[#11131c]/98 backdrop-blur-2xl border border-white/[0.12] shadow-2xl p-6 text-left before:absolute before:-top-3 before:left-0 before:right-0 before:h-3 before:content-['']"
                >
                  <div className="absolute top-0 left-6 right-6 h-[2px] bg-gradient-to-r from-indigo-500 via-violet-400 to-purple-500 rounded-full" />
                  <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/[0.08]">
                    <div>
                      <div className="text-sm font-bold text-white flex items-center gap-2">
                        <span>Platform Features</span>
                        <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full bg-indigo-500/15 text-indigo-300 border border-indigo-500/25">
                          Capabilities
                        </span>
                      </div>
                      <div className="text-xs text-slate-400 mt-0.5">
                        Everything you can build, generate, and automate with Grid agents.
                      </div>
                    </div>
                    <button
                      onClick={() => setActiveDropdown(null)}
                      className="text-xs text-slate-500 hover:text-white px-2 py-1 rounded-lg hover:bg-white/[0.05] cursor-pointer"
                    >
                      ✕
                    </button>
                  </div>

                  <div className="max-h-[62vh] overflow-y-auto space-y-3 pr-1 no-scrollbar [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                    {featuresList.map((item, idx) => (
                      <div
                        key={idx}
                        className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.05] hover:border-indigo-500/30 hover:bg-white/[0.05] transition-all"
                      >
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-xs font-bold text-white">{item.title}</span>
                          <span className="text-[10px] font-medium text-indigo-400 px-2 py-0.5 rounded bg-indigo-500/10 border border-indigo-500/20">
                            {item.tag}
                          </span>
                        </div>
                        <p className="text-xs text-slate-300 leading-relaxed mb-2">
                          {item.desc}
                        </p>
                        <div className="text-[11px] text-slate-400 bg-[#0c0e14] px-2.5 py-1.5 rounded-lg border border-white/[0.04] font-mono">
                          <span className="text-indigo-400 font-semibold">How it works: </span>{item.work}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs">
                    <a
                      href="#preview"
                      onClick={() => setActiveDropdown(null)}
                      className="text-indigo-400 hover:text-indigo-300 font-medium"
                    >
                      Explore interactive sandbox preview below ↓
                    </a>
                    <button
                      onClick={() => {
                        setActiveDropdown(null);
                        onLogin();
                      }}
                      className="px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-medium cursor-pointer"
                    >
                      Try Now Free
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* AGENTS DROPDOWN */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter("agents")}
              onMouseLeave={handleMouseLeave}
            >
              <button
                onClick={() => toggleDropdown("agents")}
                className={`hover:text-white transition-colors duration-150 py-2 flex items-center gap-1 cursor-pointer ${
                  activeDropdown === "agents" ? "text-white font-semibold" : ""
                }`}
              >
                <span>Agents</span>
                <span className="text-[9px] text-slate-500">▾</span>
              </button>

              {activeDropdown === "agents" && (
                <div
                  onMouseEnter={handleDropdownMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  className="absolute top-full left-[-100px] md:left-[-140px] mt-3 w-[620px] max-w-[92vw] z-50 rounded-2xl bg-[#11131c]/98 backdrop-blur-2xl border border-white/[0.12] shadow-2xl p-6 text-left before:absolute before:-top-3 before:left-0 before:right-0 before:h-3 before:content-['']"
                >
                  <div className="absolute top-0 left-6 right-6 h-[2px] bg-gradient-to-r from-indigo-500 via-violet-400 to-purple-500 rounded-full" />
                  <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/[0.08]">
                    <div>
                      <div className="text-sm font-bold text-white flex items-center gap-2">
                        <span>Agent Capabilities & Capacity</span>
                        <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full bg-violet-500/15 text-violet-300 border border-violet-500/25">
                          6 Autonomous Workers
                        </span>
                      </div>
                      <div className="text-xs text-slate-400 mt-0.5">
                        Operational capacities, model backends, and credit usage per agent.
                      </div>
                    </div>
                    <button
                      onClick={() => setActiveDropdown(null)}
                      className="text-xs text-slate-500 hover:text-white px-2 py-1 rounded-lg hover:bg-white/[0.05] cursor-pointer"
                    >
                      ✕
                    </button>
                  </div>

                  <div className="max-h-[62vh] overflow-y-auto space-y-3 pr-1 no-scrollbar [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                    {agentSpecs.map((item, idx) => (
                      <div
                        key={idx}
                        className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.05] hover:border-violet-500/30 hover:bg-white/[0.05] transition-all"
                      >
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-xs font-bold text-white">{item.name}</span>
                          <div className="flex items-center gap-1.5">
                            <span className="text-[10px] text-slate-400 bg-white/[0.05] px-2 py-0.5 rounded">
                              {item.badge}
                            </span>
                            <span className="text-[10px] font-bold text-violet-400 px-2 py-0.5 rounded bg-violet-500/10 border border-violet-500/25">
                              {item.rate}
                            </span>
                          </div>
                        </div>
                        <p className="text-xs text-slate-300 leading-relaxed mb-2">
                          <strong className="text-slate-200">Capabilities: </strong>{item.capability}
                        </p>
                        <div className="text-[11px] text-slate-400 bg-[#0c0e14] px-2.5 py-1.5 rounded-lg border border-white/[0.04]">
                          <strong className="text-violet-300">Operational Capacity: </strong>{item.capacity}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs">
                    <a
                      href="#agents"
                      onClick={() => setActiveDropdown(null)}
                      className="text-violet-400 hover:text-violet-300 font-medium"
                    >
                      View full agent cards on page ↓
                    </a>
                    <button
                      onClick={() => {
                        setActiveDropdown(null);
                        onLogin();
                      }}
                      className="px-3.5 py-1.5 rounded-lg bg-violet-600 hover:bg-violet-500 text-white font-medium cursor-pointer"
                    >
                      Launch Workspace
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* SANDBOX DROPDOWN */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter("sandbox")}
              onMouseLeave={handleMouseLeave}
            >
              <button
                onClick={() => toggleDropdown("sandbox")}
                className={`hover:text-white transition-colors duration-150 py-2 flex items-center gap-1 cursor-pointer ${
                  activeDropdown === "sandbox" ? "text-white font-semibold" : ""
                }`}
              >
                <span>Sandbox</span>
                <span className="text-[9px] text-slate-500">▾</span>
              </button>

              {activeDropdown === "sandbox" && (
                <div
                  onMouseEnter={handleDropdownMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  className="absolute top-full left-[-160px] md:left-[-180px] mt-3 w-[560px] max-w-[92vw] z-50 rounded-2xl bg-[#11131c]/98 backdrop-blur-2xl border border-white/[0.12] shadow-2xl p-6 text-left before:absolute before:-top-3 before:left-0 before:right-0 before:h-3 before:content-['']"
                >
                  <div className="absolute top-0 left-6 right-6 h-[2px] bg-gradient-to-r from-indigo-500 via-violet-400 to-purple-500 rounded-full" />
                  <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/[0.08]">
                    <div>
                      <div className="text-sm font-bold text-white flex items-center gap-2">
                        <span>Chain System Workflow</span>
                        <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/25">
                          5 Chain Stages
                        </span>
                      </div>
                      <div className="text-xs text-slate-400 mt-0.5">
                        How requests flow through the Supervisor DAG into the isolated live sandbox.
                      </div>
                    </div>
                    <button
                      onClick={() => setActiveDropdown(null)}
                      className="text-xs text-slate-500 hover:text-white px-2 py-1 rounded-lg hover:bg-white/[0.05] cursor-pointer"
                    >
                      ✕
                    </button>
                  </div>

                  <div className="max-h-[62vh] overflow-y-auto space-y-3 pr-1 no-scrollbar [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                    {sandboxChainSteps.map((item, idx) => (
                      <div
                        key={idx}
                        className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.05] hover:border-emerald-500/30 hover:bg-white/[0.05] transition-all flex gap-3.5"
                      >
                        <div className="w-8 h-8 rounded-lg bg-emerald-500/15 border border-emerald-500/25 text-emerald-400 flex items-center justify-center font-mono font-bold text-xs shrink-0 mt-0.5">
                          {item.step}
                        </div>
                        <div className="flex-1">
                          <div className="text-xs font-bold text-white mb-1">
                            {item.title}
                          </div>
                          <p className="text-xs text-slate-300 leading-relaxed mb-1.5">
                            {item.desc}
                          </p>
                          <div className="text-[11px] text-emerald-300/80 bg-[#0c0e14] px-2.5 py-1 rounded-md border border-white/[0.04] font-mono">
                            {item.detail}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs">
                    <a
                      href="#preview"
                      onClick={() => setActiveDropdown(null)}
                      className="text-emerald-400 hover:text-emerald-300 font-medium"
                    >
                      View live sandbox simulation ↓
                    </a>
                    <button
                      onClick={() => {
                        setActiveDropdown(null);
                        onLogin();
                      }}
                      className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-medium cursor-pointer"
                    >
                      Open Sandbox
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* PRICING DROPDOWN */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter("pricing")}
              onMouseLeave={handleMouseLeave}
            >
              <button
                onClick={() => toggleDropdown("pricing")}
                className={`hover:text-white transition-colors duration-150 py-2 flex items-center gap-1 cursor-pointer ${
                  activeDropdown === "pricing" ? "text-white font-semibold" : ""
                }`}
              >
                <span>Pricing</span>
                <span className="text-[9px] text-slate-500">▾</span>
              </button>

              {activeDropdown === "pricing" && (
                <div
                  onMouseEnter={handleDropdownMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  className="absolute top-full right-[-80px] md:right-[-60px] mt-3 w-[580px] max-w-[92vw] z-50 rounded-2xl bg-[#11131c]/98 backdrop-blur-2xl border border-white/[0.12] shadow-2xl p-6 text-left before:absolute before:-top-3 before:left-0 before:right-0 before:h-3 before:content-['']"
                >
                  <div className="absolute top-0 left-6 right-6 h-[2px] bg-gradient-to-r from-indigo-500 via-violet-400 to-purple-500 rounded-full" />
                  <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/[0.08]">
                    <div>
                      <div className="text-sm font-bold text-white flex items-center gap-2">
                        <span>Plans, Work Limits & Details</span>
                        <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/25">
                          Transparent Billing
                        </span>
                      </div>
                      <div className="text-xs text-slate-400 mt-0.5">
                        Credit limits, plan durations, and per-agent cost schedules.
                      </div>
                    </div>
                    <button
                      onClick={() => setActiveDropdown(null)}
                      className="text-xs text-slate-500 hover:text-white px-2 py-1 rounded-lg hover:bg-white/[0.05] cursor-pointer"
                    >
                      ✕
                    </button>
                  </div>

                  <div className="max-h-[62vh] overflow-y-auto space-y-4 pr-1 no-scrollbar [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {pricingDetails.map((tier, idx) => (
                        <div
                          key={idx}
                          className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:border-amber-500/30 transition-all flex flex-col justify-between"
                        >
                          <div>
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-xs font-bold text-white">{tier.name}</span>
                              <span className="text-[10px] text-amber-300 px-1.5 py-0.5 rounded bg-amber-500/10 font-semibold">
                                {tier.badge}
                              </span>
                            </div>
                            <div className="text-lg font-extrabold text-white">
                              {tier.price}{" "}
                              <span className="text-[10px] font-normal text-slate-400">/ {tier.period}</span>
                            </div>
                            <div className="text-[11px] font-semibold text-indigo-400 mt-0.5">
                              {tier.credits}
                            </div>
                            <div className="text-[10px] text-slate-400 mt-2 border-t border-white/[0.06] pt-1.5">
                              <strong className="text-slate-300">Work Limit: </strong>{tier.limit}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="p-3 rounded-xl bg-[#0c0e14] border border-white/[0.05]">
                      <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                        Per-Agent Credit Cost Schedule
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {agentRateTable.map((item, idx) => (
                          <div key={idx} className="p-2 rounded-lg bg-white/[0.02] border border-white/[0.03]">
                            <div className="text-[11px] font-semibold text-slate-200">{item.agent}</div>
                            <div className="text-[11px] font-bold text-indigo-400">{item.cost}</div>
                            <div className="text-[10px] text-slate-500">{item.desc}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs">
                    <a
                      href="#pricing"
                      onClick={() => setActiveDropdown(null)}
                      className="text-amber-400 hover:text-amber-300 font-medium"
                    >
                      View full pricing cards ↓
                    </a>
                    <button
                      onClick={() => {
                        setActiveDropdown(null);
                        onLogin();
                      }}
                      className="px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-medium cursor-pointer"
                    >
                      Sign In & Upgrade
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* FAQ DROPDOWN */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter("faq")}
              onMouseLeave={handleMouseLeave}
            >
              <button
                onClick={() => toggleDropdown("faq")}
                className={`hover:text-white transition-colors duration-150 py-2 flex items-center gap-1 cursor-pointer ${
                  activeDropdown === "faq" ? "text-white font-semibold" : ""
                }`}
              >
                <span>FAQ</span>
                <span className="text-[9px] text-slate-500">▾</span>
              </button>

              {activeDropdown === "faq" && (
                <div
                  onMouseEnter={handleDropdownMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  className="absolute top-full right-0 mt-3 w-[600px] max-w-[92vw] z-50 rounded-2xl bg-[#11131c]/98 backdrop-blur-2xl border border-white/[0.12] shadow-2xl p-6 text-left before:absolute before:-top-3 before:left-0 before:right-0 before:h-3 before:content-['']"
                >
                  <div className="absolute top-0 left-6 right-6 h-[2px] bg-gradient-to-r from-indigo-500 via-violet-400 to-purple-500 rounded-full" />
                  <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/[0.08]">
                    <div>
                      <div className="text-sm font-bold text-white flex items-center gap-2">
                        <span>Detailed Theoretical FAQ</span>
                        <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full bg-cyan-500/15 text-cyan-300 border border-cyan-500/25">
                          In-Depth Theory
                        </span>
                      </div>
                      <div className="text-xs text-slate-400 mt-0.5">
                        Architecture, sandbox sandboxing, vector embeddings, and binary compilation.
                      </div>
                    </div>
                    <button
                      onClick={() => setActiveDropdown(null)}
                      className="text-xs text-slate-500 hover:text-white px-2 py-1 rounded-lg hover:bg-white/[0.05] cursor-pointer"
                    >
                      ✕
                    </button>
                  </div>

                  <div className="max-h-[62vh] overflow-y-auto space-y-3.5 pr-1 no-scrollbar [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                    {faqTheoryDetails.map((item, idx) => (
                      <div
                        key={idx}
                        className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.05] hover:border-cyan-500/30 hover:bg-white/[0.05] transition-all"
                      >
                        <div className="text-xs font-bold text-white mb-2 flex items-start gap-2">
                          <span className="text-cyan-400 font-mono">Q{idx + 1}:</span>
                          <span>{item.q}</span>
                        </div>
                        <p className="text-xs text-slate-300 leading-relaxed bg-[#0c0e14] p-3 rounded-lg border border-white/[0.04]">
                          {item.a}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs">
                    <a
                      href="#faq"
                      onClick={() => setActiveDropdown(null)}
                      className="text-cyan-400 hover:text-cyan-300 font-medium"
                    >
                      View FAQ section on page ↓
                    </a>
                    <button
                      onClick={() => {
                        setActiveDropdown(null);
                        onLogin();
                      }}
                      className="px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-medium cursor-pointer"
                    >
                      Ask Questions in Chat
                    </button>
                  </div>
                </div>
              )}
            </div>
          </nav>

          {/* Desktop Login Actions */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={onLogin}
              disabled={isLoggingIn}
              className="text-sm font-medium text-slate-300 hover:text-white px-3.5 py-2 rounded-xl transition-colors duration-150 cursor-pointer"
            >
              Sign In
            </button>
            <button
              onClick={onLogin}
              disabled={isLoggingIn}
              title="Continue with Google"
              aria-label="Continue with Google"
              className="w-10 h-10 rounded-full bg-[#13151f] hover:bg-[#1a1c2b] active:scale-95 transition-all duration-150 flex items-center justify-center shadow-md shadow-indigo-500/15 hover:shadow-lg hover:shadow-indigo-500/30 border border-white/[0.12] hover:border-indigo-500/50 cursor-pointer group"
            >
              <GoogleIcon className="w-5 h-5 transition-transform group-hover:scale-105" />
            </button>
          </div>

          {/* Mobile Menu 4-Point Circle Symbol (No background, No border line) */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 flex items-center justify-center active:scale-90 transition-transform text-slate-300 hover:text-white cursor-pointer focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <span className="text-lg font-bold text-slate-200 leading-none">✕</span>
            ) : (
              <span className="grid grid-cols-2 gap-1.5 w-4 h-4 items-center justify-center" aria-hidden="true">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-200"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-slate-200"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-slate-200"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-slate-200"></span>
              </span>
            )}
          </button>
        </div>

        {/* Mobile Dropdown Menu with Accordion Cards */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#10121a] border-b border-white/[0.08] px-4 pt-3 pb-6 flex flex-col gap-3 max-h-[85vh] overflow-y-auto no-scrollbar [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            {/* Features accordion */}
            <div className="border border-white/[0.06] rounded-xl p-3 bg-white/[0.02]">
              <button
                onClick={() => setMobileExpanded(mobileExpanded === "features" ? null : "features")}
                className="w-full flex items-center justify-between text-sm font-semibold text-white"
              >
                <span>Features (What you can do)</span>
                <span className="text-xs text-slate-400 font-mono">{mobileExpanded === "features" ? "−" : "+"}</span>
              </button>
              {mobileExpanded === "features" && (
                <div className="mt-3 pt-3 border-t border-white/[0.06] space-y-2.5 text-xs text-slate-300">
                  {featuresList.map((f, i) => (
                    <div key={i} className="p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.04]">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-bold text-white text-[11px]">{f.title}</span>
                        <span className="text-[9px] text-indigo-400 bg-indigo-500/10 px-1.5 py-0.5 rounded">{f.tag}</span>
                      </div>
                      <p className="text-[10px] text-slate-400 leading-relaxed mb-1">{f.desc}</p>
                      <div className="text-[10px] text-indigo-300/80 font-mono"><span className="text-slate-500">How: </span>{f.work}</div>
                    </div>
                  ))}
                  <a href="#preview" onClick={() => setMobileMenuOpen(false)} className="inline-block text-indigo-400 text-[11px] font-semibold mt-1">
                    Explore live sandbox preview ↓
                  </a>
                </div>
              )}
            </div>

            {/* Agents accordion */}
            <div className="border border-white/[0.06] rounded-xl p-3 bg-white/[0.02]">
              <button
                onClick={() => setMobileExpanded(mobileExpanded === "agents" ? null : "agents")}
                className="w-full flex items-center justify-between text-sm font-semibold text-white"
              >
                <span>Agents (Capabilities & Capacity)</span>
                <span className="text-xs text-slate-400 font-mono">{mobileExpanded === "agents" ? "−" : "+"}</span>
              </button>
              {mobileExpanded === "agents" && (
                <div className="mt-3 pt-3 border-t border-white/[0.06] space-y-2.5 text-xs text-slate-300">
                  {agentSpecs.map((a, i) => (
                    <div key={i} className="p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.04]">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-bold text-white text-[11px]">{a.name}</span>
                        <span className="text-[10px] font-bold text-violet-400">{a.rate}</span>
                      </div>
                      <p className="text-[10px] text-slate-300 leading-relaxed mb-1"><strong className="text-slate-200">Capable of: </strong>{a.capability}</p>
                      <div className="text-[10px] text-violet-300/80"><strong className="text-slate-400">Capacity: </strong>{a.capacity}</div>
                    </div>
                  ))}
                  <a href="#agents" onClick={() => setMobileMenuOpen(false)} className="inline-block text-violet-400 text-[11px] font-semibold mt-1">
                    View on-page agent cards ↓
                  </a>
                </div>
              )}
            </div>

            {/* Sandbox accordion */}
            <div className="border border-white/[0.06] rounded-xl p-3 bg-white/[0.02]">
              <button
                onClick={() => setMobileExpanded(mobileExpanded === "sandbox" ? null : "sandbox")}
                className="w-full flex items-center justify-between text-sm font-semibold text-white"
              >
                <span>Sandbox (Chain System Workflow)</span>
                <span className="text-xs text-slate-400 font-mono">{mobileExpanded === "sandbox" ? "−" : "+"}</span>
              </button>
              {mobileExpanded === "sandbox" && (
                <div className="mt-3 pt-3 border-t border-white/[0.06] space-y-2.5 text-xs text-slate-300">
                  {sandboxChainSteps.map((s, i) => (
                    <div key={i} className="p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.04] flex gap-2.5">
                      <div className="w-6 h-6 rounded bg-emerald-500/15 border border-emerald-500/25 text-emerald-400 flex items-center justify-center font-mono font-bold text-[10px] shrink-0">
                        {s.step}
                      </div>
                      <div>
                        <div className="font-bold text-white text-[11px] mb-0.5">{s.title}</div>
                        <p className="text-[10px] text-slate-400 leading-relaxed mb-1">{s.desc}</p>
                        <div className="text-[10px] text-emerald-300/80 font-mono">{s.detail}</div>
                      </div>
                    </div>
                  ))}
                  <a href="#preview" onClick={() => setMobileMenuOpen(false)} className="inline-block text-emerald-400 text-[11px] font-semibold mt-1">
                    View sandbox simulation ↓
                  </a>
                </div>
              )}
            </div>

            {/* Pricing accordion */}
            <div className="border border-white/[0.06] rounded-xl p-3 bg-white/[0.02]">
              <button
                onClick={() => setMobileExpanded(mobileExpanded === "pricing" ? null : "pricing")}
                className="w-full flex items-center justify-between text-sm font-semibold text-white"
              >
                <span>Pricing (Plans & Limits)</span>
                <span className="text-xs text-slate-400 font-mono">{mobileExpanded === "pricing" ? "−" : "+"}</span>
              </button>
              {mobileExpanded === "pricing" && (
                <div className="mt-3 pt-3 border-t border-white/[0.06] space-y-2.5 text-xs text-slate-300">
                  <div className="grid grid-cols-1 gap-2">
                    {pricingDetails.map((p, i) => (
                      <div key={i} className="p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.04]">
                        <div className="flex justify-between items-center mb-0.5">
                          <span className="text-white text-[10px]">{p.name} ({p.price})</span>
                          <span className="text-amber-400 text-[10px]">{p.credits}</span>
                        </div>
                        <div className="text-[10px] text-slate-400">{p.limit}</div>
                      </div>
                    ))}
                  </div>
                  <div className="p-2.5 rounded-lg bg-[#0c0e14] border border-white/[0.04]">
                    <div className="font-bold text-[10px] text-slate-400 uppercase tracking-wider mb-1.5">Per-Agent Rates</div>
                    <div className="grid grid-cols-2 gap-1 text-[10px]">
                      {agentRateTable.map((r, i) => (
                        <div key={i} className="text-slate-300"><span className="text-indigo-400 font-semibold">{r.cost}: </span>{r.agent}</div>
                      ))}
                    </div>
                  </div>
                  <a href="#pricing" onClick={() => setMobileMenuOpen(false)} className="inline-block text-amber-400 text-[11px] font-semibold mt-1">
                    View full pricing plans ↓
                  </a>
                </div>
              )}
            </div>

            {/* FAQ accordion */}
            <div className="border border-white/[0.06] rounded-xl p-3 bg-white/[0.02]">
              <button
                onClick={() => setMobileExpanded(mobileExpanded === "faq" ? null : "faq")}
                className="w-full flex items-center justify-between text-sm font-semibold text-white"
              >
                <span>FAQ (Theoretical Q&A)</span>
                <span className="text-xs text-slate-400 font-mono">{mobileExpanded === "faq" ? "−" : "+"}</span>
              </button>
              {mobileExpanded === "faq" && (
                <div className="mt-3 pt-3 border-t border-white/[0.06] space-y-2.5 text-xs text-slate-300">
                  {faqTheoryDetails.map((f, i) => (
                    <div key={i} className="p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.04]">
                      <div className="font-bold text-white text-[11px] mb-1">Q{i + 1}: {f.q}</div>
                      <p className="text-[10px] text-slate-400 leading-relaxed bg-[#0c0e14] p-2 rounded">{f.a}</p>
                    </div>
                  ))}
                  <a href="#faq" onClick={() => setMobileMenuOpen(false)} className="inline-block text-cyan-400 text-[11px] font-semibold mt-1">
                    View full FAQ on page ↓
                  </a>
                </div>
              )}
            </div>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onLogin();
              }}
              disabled={isLoggingIn}
              className="w-full flex items-center justify-center gap-2.5 py-3 rounded-xl text-sm font-semibold text-white bg-gradient-to-br from-indigo-500 to-violet-700 border border-indigo-400/30 shadow-lg shadow-indigo-500/25 mt-2 active:scale-95 transition-all"
            >
              <span className="w-5 h-5 rounded-full bg-[#10121a] border border-white/[0.1] flex items-center justify-center shrink-0">
                <GoogleIcon className="w-3.5 h-3.5" />
              </span>
              <span>Continue with Google</span>
            </button>
          </div>
        )}
      </header>

      {/* Main Content Area */}
      <main className="flex-1 relative z-10">
        {/* HERO SECTION */}
        <section className="pt-8 pb-12 sm:pt-14 sm:pb-18 md:pt-20 md:pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">

          {/* Subtitle */}
          <p className="text-sm sm:text-base md:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Grid orchestrates specialized AI agents for full-stack code generation with instant live previews, presentation creation, vector PDF search, web intelligence, and multimodal vision.
          </p>

          {/* CTA Button - Real Colorful Google Icon in Circle (Theme Styled) */}
          <div className="mt-7 sm:mt-9 flex items-center justify-center relative">
            {/* Ambient theme glow */}
            <div className="absolute w-20 h-20 bg-gradient-to-r from-indigo-500/25 via-violet-500/25 to-purple-500/25 rounded-full blur-xl pointer-events-none" />
            
            <button
              onClick={onLogin}
              disabled={isLoggingIn}
              title="Continue with Google"
              aria-label="Continue with Google"
              className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#13151f] hover:bg-[#191c2b] active:scale-95 transition-all duration-200 flex items-center justify-center shadow-xl shadow-indigo-500/25 hover:shadow-2xl hover:shadow-indigo-500/40 hover:scale-105 border border-white/[0.14] hover:border-indigo-500/60 cursor-pointer group backdrop-blur-md"
            >
              <GoogleIcon className="w-7 h-7 sm:w-8 sm:h-8 transition-transform group-hover:scale-110" />
            </button>
          </div>


          {/* Interactive UI Mockup Preview */}
          <div id="preview" className="mt-10 sm:mt-16 md:mt-20 relative max-w-5xl mx-auto text-left">
            {/* Ambient backlight glow */}
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500/20 via-violet-500/20 to-purple-500/20 rounded-2xl blur-xl opacity-75" />
            
            <div className="relative rounded-xl sm:rounded-2xl bg-[#12141c] border border-white/[0.08] shadow-2xl overflow-hidden">
              {/* Window Header */}
              <div className="h-9 sm:h-11 px-3 sm:px-4 bg-[#161824] border-b border-white/[0.06] flex items-center justify-between gap-2 select-none">
                <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
                  <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-rose-500/80 shrink-0" />
                  <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-amber-500/80 shrink-0" />
                  <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-emerald-500/80 shrink-0" />
                  <span className="ml-1.5 sm:ml-2.5 text-[10px] sm:text-xs font-mono text-slate-400 whitespace-nowrap truncate">
                    grid-workspace<span className="hidden sm:inline"> / active-session</span>
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-slate-400 shrink-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping shrink-0" />
                  <span className="text-[10px] sm:text-[11px] font-medium text-emerald-400 whitespace-nowrap">
                    <span className="hidden sm:inline">All Agents </span>Online
                  </span>
                </div>
              </div>

              {/* Window Body (Simulated Grid Workspace) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[290px] sm:min-h-[380px] md:min-h-[420px]">
                {/* Simulated Sidebar */}
                <div className="hidden sm:block lg:col-span-3 bg-[#0d0f14] border-r border-white/[0.06] p-4 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs font-semibold text-slate-300">
                      <span>Chats</span>
                      <span className="text-slate-500 font-mono text-xs cursor-pointer">+</span>
                    </div>
                    <div className="space-y-1.5">
                      <div className="px-3 py-2 rounded-lg bg-indigo-500/15 border border-indigo-500/30 text-xs font-medium text-indigo-300">
                        Modern Netflix Clone
                      </div>
                      <div className="px-3 py-2 rounded-lg text-xs text-slate-400 hover:bg-white/[0.03]">
                        Quarterly Slide Deck
                      </div>
                      <div className="px-3 py-2 rounded-lg text-xs text-slate-400 hover:bg-white/[0.03]">
                        Cloud Architecture PDF
                      </div>
                      <div className="px-3 py-2 rounded-lg text-xs text-slate-400 hover:bg-white/[0.03]">
                        Redis Performance Deep Dive
                      </div>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-white/[0.06] flex items-center gap-3">
                    <div className="w-7 h-7 rounded-full bg-indigo-600 flex items-center justify-center text-xs font-bold text-white">
                      G
                    </div>
                    <div className="text-xs">
                      <div className="font-semibold text-slate-200">Developer</div>
                      <div className="text-[10px] text-indigo-400">Pro Plan • 1000 Credits</div>
                    </div>
                  </div>
                </div>

                {/* Simulated Chat Area */}
                <div className="lg:col-span-5 p-3 sm:p-5 flex flex-col justify-between bg-[#12141c] border-r border-white/[0.06]">
                  <div className="space-y-3 sm:space-y-4">
                    {/* User message */}
                    <div className="flex justify-end">
                      <div className="max-w-[85%] bg-gradient-to-br from-indigo-500 to-violet-700 text-white text-[11px] sm:text-xs px-3 py-2 sm:px-3.5 sm:py-2.5 rounded-2xl rounded-tr-sm shadow-md leading-relaxed">
                        Build an interactive responsive dashboard with dark theme and statistics cards.
                      </div>
                    </div>
                    {/* Assistant message */}
                    <div className="flex justify-start">
                      <div className="max-w-[95%] bg-white/[0.04] border border-white/[0.06] text-slate-200 text-[11px] sm:text-xs p-3 sm:p-3.5 rounded-2xl rounded-tl-sm space-y-1.5 sm:space-y-2">
                        <div className="text-indigo-400 font-semibold text-[10px] sm:text-[11px]">
                          Grid Coding Agent • Generating Single Page App
                        </div>
                        <p className="text-slate-300 text-[11px] sm:text-[11.5px] leading-relaxed">
                          Generated <code className="text-indigo-300">index.html</code>, <code className="text-indigo-300">style.css</code>, and <code className="text-indigo-300">script.js</code>. The interactive dashboard is ready in your Sandbox panel.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Simulated Input Bar */}
                  <div className="mt-3 sm:mt-4 pt-2 sm:pt-3 border-t border-white/[0.06]">
                    <div className="flex items-center justify-between px-3 py-1.5 sm:py-2 rounded-xl bg-white/[0.04] border border-white/[0.08] text-[11px] sm:text-xs text-slate-400">
                      <span>Ask Grid...</span>
                      <div className="px-2 py-0.5 rounded text-[10px] sm:text-[11px] font-medium bg-indigo-500 text-white">
                        Send
                      </div>
                    </div>
                  </div>
                </div>

                {/* Simulated Artifact Sandbox */}
                <div className="hidden lg:col-span-4 lg:flex flex-col bg-[#0b0c10] p-4">
                  <div className="flex items-center justify-between pb-3 border-b border-white/[0.06] text-xs font-semibold text-slate-300">
                    <div>
                      <span>Live Sandbox Preview</span>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/20">
                      Running
                    </span>
                  </div>
                  <div className="flex-1 mt-3 rounded-lg border border-white/[0.06] bg-[#14161f] p-3 text-[11px] font-mono text-slate-300 space-y-2">
                    <div className="text-slate-500">// index.html (Live Render)</div>
                    <div className="p-2.5 rounded bg-white/[0.04] border border-white/[0.06]">
                      <div className="text-[10px] font-sans font-bold text-slate-200">Revenue Analytics</div>
                      <div className="text-[14px] font-bold text-indigo-400 mt-1">₹ 2,48,500 <span className="text-[10px] text-emerald-400">+28%</span></div>
                      <div className="w-full bg-white/[0.1] h-1.5 rounded-full mt-2">
                        <div className="bg-indigo-500 h-1.5 rounded-full w-[70%]" />
                      </div>
                    </div>
                    <div className="text-[10px] text-slate-400">
                      ✓ Monaco Editor Synced<br />
                      ✓ Responsive Breakpoints Active<br />
                      ✓ 0 External Dependencies
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SPECIALIZED AGENTS SECTION */}
        <section id="agents" className="py-8 sm:py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/[0.06]">
          <div className="text-center max-w-3xl mx-auto mb-4 sm:mb-8 md:mb-12">
            <h2 className="text-xs font-bold uppercase tracking-wider text-indigo-400">Multi-Agent Architecture</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-6">
            {agents.map((agent) => (
              <div
                key={agent.id}
                className="rounded-xl sm:rounded-2xl p-4 sm:p-6 bg-[#13151c] border border-white/[0.07] hover:border-indigo-500/40 transition-all duration-200 hover:-translate-y-1 flex flex-col justify-between group shadow-lg"
              >
                <div>
                  <div className="flex items-center justify-between mb-2.5 sm:mb-4">
                    <h4 className="text-base sm:text-lg font-bold text-white group-hover:text-indigo-300 transition-colors">
                      {agent.name}
                    </h4>
                    <span className="text-[10px] sm:text-[11px] font-semibold text-slate-400 bg-white/[0.05] border border-white/[0.08] px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full">
                      {agent.tag}
                    </span>
                  </div>
                  <p className="mt-1 sm:mt-2 text-slate-400 text-xs sm:text-sm leading-relaxed">
                    {agent.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 sm:mt-6 sm:pt-4 border-t border-white/[0.06]">
                  <div className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-slate-500 mb-1">Example Prompt</div>
                  <div className="text-[11px] sm:text-xs text-slate-300 bg-white/[0.03] p-2 sm:p-2.5 rounded-lg border border-white/[0.04] italic leading-relaxed">
                    "{agent.samplePrompt}"
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* WORKFLOW / HOW IT WORKS */}
        <section id="workflow" className="py-8 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/[0.06]">
          <div className="text-center max-w-3xl mx-auto mb-4 sm:mb-8 md:mb-12">
            <h2 className="text-xs font-bold uppercase tracking-wider text-indigo-400 mb-1.5 sm:mb-2">Workflow</h2>
            <p className="mt-1 sm:mt-2 text-slate-400 text-xs sm:text-sm md:text-base leading-relaxed max-w-xl mx-auto">
              How Grid powers end-to-end production deliverables with stateful agent coordination.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-6 md:gap-8">
            <div className="p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-[#13151c] border border-white/[0.07] relative">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-xs sm:text-base mb-2.5 sm:mb-4">
                01
              </div>
              <h4 className="text-base sm:text-lg font-bold text-white mb-1 sm:mb-2">Intent Detection</h4>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                The Supervisor Graph detects whether your prompt requires full-stack code, live search results, presentation slides, PDF document compilation, or image inspection.
              </p>
            </div>

            <div className="p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-[#13151c] border border-white/[0.07] relative">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-violet-500/10 border border-violet-500/20 text-violet-400 flex items-center justify-center font-bold text-xs sm:text-base mb-2.5 sm:mb-4">
                02
              </div>
              <h4 className="text-base sm:text-lg font-bold text-white mb-1 sm:mb-2">Autonomous Execution</h4>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                The assigned agent invokes specialized toolchains: Tavily search, LangChain memory buffers, PDFKit doc builders, PptxGenJS presentation creators, or DeepSeek coders.
              </p>
            </div>

            <div className="p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-[#13151c] border border-white/[0.07] relative">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center font-bold text-xs sm:text-base mb-2.5 sm:mb-4">
                03
              </div>
              <h4 className="text-base sm:text-lg font-bold text-white mb-1 sm:mb-2">Interactive Artifacts</h4>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Results aren't just text on a screen. You receive downloadable presentations, exportable PDFs, presigned S3 assets, and hot-reloading code previews.
              </p>
            </div>
          </div>
        </section>

        {/* PRICING SECTION */}
        <section id="pricing" className="py-8 sm:py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/[0.06]">
          <div className="text-center max-w-3xl mx-auto mb-4 sm:mb-8 md:mb-12">
            <h2 className="text-xs font-bold uppercase tracking-wider text-indigo-400 mb-1.5 sm:mb-2">Flexible Billing</h2>
            <p className="mt-1 sm:mt-2 text-slate-400 text-xs sm:text-sm md:text-base leading-relaxed max-w-xl mx-auto">
              Start free with 100 credits. Upgrade whenever you need more bandwidth and high-priority access.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-6 md:gap-8 max-w-6xl mx-auto">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={`rounded-xl sm:rounded-2xl p-4 sm:p-6 flex flex-col justify-between transition-all duration-200 relative ${
                  plan.popular
                    ? "bg-[#161824] border-2 border-indigo-500/60 shadow-2xl shadow-indigo-500/20 md:-translate-y-2"
                    : "bg-[#13151c] border border-white/[0.07] hover:border-white/[0.15]"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-indigo-500 to-violet-600 text-white text-[10px] sm:text-[11px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-md">
                    {plan.badge}
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between">
                    <h4 className="text-lg sm:text-xl font-bold text-white">{plan.name}</h4>
                    {!plan.popular && (
                      <span className="text-[10px] sm:text-[11px] font-medium text-slate-400 bg-white/[0.05] px-2 py-0.5 rounded-full border border-white/[0.06]">
                        {plan.badge}
                      </span>
                    )}
                  </div>

                  <p className="mt-1 sm:mt-2 text-xs text-slate-400 leading-relaxed">{plan.description}</p>

                  <div className="mt-3 sm:mt-5 flex items-baseline gap-1.5 sm:gap-2">
                    <span className="text-3xl sm:text-4xl text-white tracking-tight">{plan.price}</span>
                    <span className="text-xs text-slate-500 font-medium">/ {plan.period}</span>
                  </div>

                  <div className="mt-1 sm:mt-1.5 text-xs font-semibold text-indigo-400">
                    {plan.credits}
                  </div>

                  <div className="mt-4 sm:mt-6 space-y-2 sm:space-y-2.5">
                    {plan.features.map((f, i) => (
                      <div key={i} className="text-xs text-slate-300">
                        • {f}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-4 sm:mt-6 pt-3.5 sm:pt-5 border-t border-white/[0.06]">
                  <button
                    onClick={onLogin}
                    disabled={isLoggingIn}
                    className={`w-full py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-150 cursor-pointer flex items-center justify-center ${
                      plan.popular
                        ? "bg-gradient-to-br from-indigo-500 to-violet-700 text-white shadow-lg shadow-indigo-500/30 hover:opacity-95"
                        : "bg-white/[0.05] text-slate-200 hover:bg-white/[0.08] hover:text-white border border-white/[0.08]"
                    }`}
                  >
                    <span>{plan.buttonText}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>


      </main>

      {/* FOOTER */}
      <footer className="border-t border-white/[0.06] bg-[#090a0f] py-6 sm:py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6">
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="flex items-center gap-2">
              <span className="grid grid-cols-2 gap-1 w-3.5 h-3.5" aria-hidden="true">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-violet-400"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-violet-400"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400"></span>
              </span>
              <span className="text-base font-bold text-white tracking-tight">Grid</span>
            </div>
            <p className="text-[11px] sm:text-xs text-slate-400 mt-1">
              Autonomous multi-agent intelligence
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-medium text-slate-300">
            <a href="#features" className="hover:text-white transition-colors py-1">Features</a>
            <a href="#agents" className="hover:text-white transition-colors py-1">Agents</a>
            <a href="#pricing" className="hover:text-white transition-colors py-1">Pricing</a>
            <button
              onClick={() => {
                window.scrollTo({ top: 0, behavior: "smooth" });
                setActiveDropdown("faq");
              }}
              className="hover:text-white transition-colors py-1 cursor-pointer"
            >
              FAQ
            </button>
            <button onClick={onLogin} className="hover:text-white transition-colors py-1 cursor-pointer">Login</button>
          </div>

          <div className="text-[11px] text-slate-500 text-center md:text-right">
            © {new Date().getFullYear()} Grid Platform. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
