"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowUpRight, Layout, Cpu, Sparkles, Database, Zap, Terminal, GitBranch, Code } from "lucide-react";

// --- 3D ENTRANCE VARIANTS ---
const headerVariants = {
  hidden: { opacity: 0, y: 40, rotateX: 10 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { duration: 0.8, ease: [0.215, 0.61, 0.355, 1.0] },
  },
};

const card3DVariant = {
  hidden: {
    opacity: 0,
    y: 60,
    rotateX: 15,
    scale: 0.96,
  },
  visible: (customDelay: number) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    scale: 1,
    transition: {
      duration: 0.85,
      delay: customDelay,
      ease: [0.215, 0.61, 0.355, 1.0],
    },
  }),
};

// --- CUSTOM 3D TILT CARD COMPONENT ---
function TiltCard({
  children,
  className,
  id,
  delay = 0,
  prefersReducedMotion = false,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
  delay?: number;
  prefersReducedMotion?: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const springConfig = { stiffness: 140, damping: 18 };

  const rotateX = useSpring(useMotionValue(0), springConfig);
  const rotateY = useSpring(useMotionValue(0), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    // Subtle ~5 degree tilt mapped to mouse coordinates
    rotateX.set(-y * 10);
    rotateY.set(x * 10);

    // Custom CSS glow coordinates
    cardRef.current.style.setProperty("--x", `${e.clientX - rect.left}px`);
    cardRef.current.style.setProperty("--y", `${e.clientY - rect.top}px`);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.div
      variants={card3DVariant}
      initial="hidden"
      whileInView="visible"
      custom={delay}
      viewport={{ once: true, margin: "-50px" }}
      style={{ perspective: "1000px" }}
      className={className}
    >
      <motion.div
        id={id}
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transformStyle: "preserve-3d",
          rotateX: prefersReducedMotion ? 0 : rotateX,
          rotateY: prefersReducedMotion ? 0 : rotateY,
        }}
        whileHover={{
          scale: prefersReducedMotion ? 1 : 1.015,
          transition: { duration: 0.3, ease: "easeOut" },
        }}
        className="glass glass-hover accent-glow-card rounded-[32px] transition-all duration-300 relative overflow-hidden group border border-white/10 hover:border-accent/30 shadow-xl hover:shadow-[0_20px_50px_rgba(204,255,0,0.12)] h-full flex flex-col justify-between"
      >
        {/* Subtle Lime Ambient Accent Glow on Hover */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 h-64 w-64 rounded-full bg-accent/5 blur-3xl pointer-events-none group-hover:bg-accent/15 transition-colors duration-500" />
        <div className="relative z-10 flex flex-col justify-between h-full">{children}</div>
      </motion.div>
    </motion.div>
  );
}

export default function BentoServices() {
  const [activeStep, setActiveStep] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 4);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
    const handleChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    }
  }, []);

  return (
    <section id="services" className="py-24 lg:py-36 relative z-10 px-6 max-w-7xl mx-auto overflow-hidden">
      {/* 
        ========================================================================
        BACKGROUND CONTINUITY: Seamless Top Ambient Glow & Slow Gradient Drift
        ========================================================================
      */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-full max-w-4xl h-80 bg-radial-gradient from-accent/8 via-accent/2 to-transparent blur-3xl pointer-events-none z-0" />
      <div className="mesh-bg-2 opacity-70 animate-pulse duration-[10000ms]" />

      {/* HEADER SECTION WITH 3D TILT REVEAL */}
      <div className="mb-20 md:mb-28 max-w-3xl relative z-10" style={{ perspective: "1000px" }}>
        <motion.div
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          style={{ transformStyle: "preserve-3d" }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/10 text-xs uppercase tracking-widest text-accent mb-6 shadow-md">
            <Sparkles className="w-3.5 h-3.5" />
            <span>What We Do</span>
          </div>

          <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-[1.1] mb-6">
            Everything you need to grow. <br />
            <span className="bg-gradient-to-r from-white via-white/80 to-white/40 bg-clip-text text-transparent italic font-normal">
              Stunning sites. Smart workflows.
            </span>
          </h2>
        </motion.div>
      </div>

      {/* BENTO GRID WITH STAGGERED 3D TILT CARDS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch relative z-10">

        {/* --- CARD 1: High-Converting Websites --- */}
        <TiltCard
          id="web-design-card"
          delay={0.1}
          prefersReducedMotion={prefersReducedMotion}
          className="col-span-1 lg:col-span-7"
        >
          <div className="p-8 md:p-12 pb-4">
            <div className="flex justify-between items-start mb-10">
              {/* Icon with Subtle Hover Float & Glow */}
              <div className="w-12 h-12 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent group-hover:scale-110 group-hover:-translate-y-1 group-hover:border-accent/40 group-hover:shadow-[0_0_20px_rgba(204,255,0,0.3)] transition-all duration-300">
                <Layout className="w-5.5 h-5.5" />
              </div>
              <a
                href="#contact"
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:border-accent group-hover:bg-accent group-hover:text-black transition-all duration-300 shadow-md"
              >
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>

            <h3 className="text-2xl md:text-3.5xl font-bold tracking-tight mb-4 text-white">
              High-Converting Websites
            </h3>
            <p className="text-white/60 text-sm md:text-base leading-relaxed max-w-xl">
              We design custom, modern websites that look stunning and load instantly. Built to turn casual visitors into paying customers and rank at the top of Google search results.
            </p>

            <ul className="flex flex-wrap gap-2.5 mt-6">
              {["Custom Web Design", "Google Search SEO", "Mobile Optimized", "Fast Page Loading", "Stunning Animations"].map((tech) => (
                <li key={tech} className="text-xs bg-white/5 border border-white/5 px-3 py-1 rounded-full text-white/80">
                  {tech}
                </li>
              ))}
            </ul>
          </div>

          {/* Interactive Browser Mockup */}
          <div className="px-8 md:px-12 pb-12 pt-6 overflow-hidden">
            <div className="w-full h-56 md:h-64 rounded-2xl border border-white/10 bg-black/60 relative overflow-hidden flex flex-col shadow-2xl">
              <div className="h-9 border-b border-white/10 px-4 flex items-center gap-1.5 bg-neutral-900/50">
                <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                <div className="w-36 h-4 bg-white/5 rounded-md ml-4 text-[9px] text-white/30 flex items-center px-2">
                  aibuildspace.agency
                </div>
              </div>
              <div className="flex-1 p-4 flex gap-4">
                <div className="w-1/4 border-r border-white/5 flex flex-col gap-2 pr-2">
                  <div className="h-3 w-12 bg-accent rounded" />
                  <div className="h-2 w-16 bg-white/5 rounded" />
                  <div className="h-2 w-10 bg-white/5 rounded" />
                  <div className="h-2 w-14 bg-white/5 rounded" />
                </div>
                <div className="flex-1 flex flex-col gap-3">
                  <div className="h-5 w-3/4 bg-white/10 rounded-md" />
                  <div className="h-3 w-1/2 bg-white/5 rounded" />
                  <div className="flex-1 rounded-xl border border-dashed border-white/10 p-3 flex items-center justify-center relative">
                    <div className="absolute inset-0 bg-gradient-to-tr from-accent/5 to-transparent pointer-events-none" />
                    <span className="text-[10px] tracking-wider text-accent/80 font-mono font-bold flex items-center gap-1.5 animate-pulse">
                      <Terminal className="w-3 h-3" /> WEBSITE LIVE & CONVERTING
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TiltCard>

        {/* --- CARD 2: Time-Saving Automations --- */}
        <TiltCard
          id="automation-card"
          delay={0.2}
          prefersReducedMotion={prefersReducedMotion}
          className="col-span-1 lg:col-span-5"
        >
          <div className="p-8 md:p-12 pb-4">
            <div className="flex justify-between items-start mb-10">
              <div className="w-12 h-12 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent group-hover:scale-110 group-hover:-translate-y-1 group-hover:border-accent/40 group-hover:shadow-[0_0_20px_rgba(204,255,0,0.3)] transition-all duration-300">
                <Cpu className="w-5.5 h-5.5" />
              </div>
              <a
                href="#contact"
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:border-accent group-hover:bg-accent group-hover:text-black transition-all duration-300 shadow-md"
              >
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>

            <h3 className="text-2xl md:text-3.5xl font-bold tracking-tight mb-4 text-white">
              Time-Saving Automations
            </h3>
            <p className="text-white/60 text-sm md:text-base leading-relaxed">
              We take repetitive tasks off your plate. By automating your lead follow-ups, client emails, calendar scheduling, and CRM entry, we save you 30+ manual hours every single week.
            </p>

            <ul className="flex flex-wrap gap-2.5 mt-6">
              {["Auto Lead Reply", "CRM Integrations", "Client Onboarding", "Email Follow-ups", "AI Assistant Sync"].map((tech) => (
                <li key={tech} className="text-xs bg-white/5 border border-white/5 px-3 py-1 rounded-full text-white/80">
                  {tech}
                </li>
              ))}
            </ul>
          </div>

          {/* Workflow Interactive Grid */}
          <div className="px-8 md:px-12 pb-12 pt-6 overflow-hidden">
            <div className="w-full h-56 md:h-64 rounded-2xl border border-white/10 bg-black/40 p-5 flex flex-col justify-center relative">
              <div className="absolute inset-0 bg-[radial-gradient(#1a1a1a_1px,transparent_1px)] [background-size:16px_16px] opacity-40" />

              <div className="relative flex flex-col gap-5 z-10">
                <div className={`flex items-center gap-3 p-2.5 rounded-xl border transition-all duration-300 ${activeStep === 0 ? 'bg-accent/10 border-accent' : 'bg-neutral-900/40 border-white/5'}`}>
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs ${activeStep === 0 ? 'bg-accent text-black font-bold' : 'bg-white/5 text-white/60'}`}>
                    <Zap className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-white leading-tight">New Lead Fills Contact Form</p>
                    <p className="text-[9px] text-white/40 leading-none">Instant capture from your website</p>
                  </div>
                </div>

                <div className={`flex items-center gap-3 p-2.5 rounded-xl border transition-all duration-300 ${activeStep === 1 || activeStep === 2 ? 'bg-accent/10 border-accent' : 'bg-neutral-900/40 border-white/5'}`}>
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs ${activeStep === 1 || activeStep === 2 ? 'bg-accent text-black font-bold' : 'bg-white/5 text-white/60'}`}>
                    <Cpu className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-white leading-tight">AI Auto-Qualifies & Saves Lead</p>
                    <p className="text-[9px] text-white/40 leading-none">AI qualifies lead & saves details</p>
                  </div>
                </div>

                <div className={`flex items-center gap-3 p-2.5 rounded-xl border transition-all duration-300 ${activeStep === 3 ? 'bg-accent/10 border-accent' : 'bg-neutral-900/40 border-white/5'}`}>
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs ${activeStep === 3 ? 'bg-accent text-black font-bold' : 'bg-white/5 text-white/60'}`}>
                    <Database className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-white leading-tight">Sends Automated Email & Alert</p>
                    <p className="text-[9px] text-white/40 leading-none">Email scheduled & team alerted</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TiltCard>

        {/* --- CARD 3: Battle-Tested Code --- */}
        <TiltCard
          id="open-source-card"
          delay={0.3}
          prefersReducedMotion={prefersReducedMotion}
          className="col-span-1 lg:col-span-5"
        >
          <div className="p-8 md:p-12 pb-4">
            <div className="flex justify-between items-start mb-10">
              <div className="w-12 h-12 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent group-hover:scale-110 group-hover:-translate-y-1 group-hover:border-accent/40 group-hover:shadow-[0_0_20px_rgba(204,255,0,0.3)] transition-all duration-300">
                <GitBranch className="w-5.5 h-5.5" />
              </div>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:border-accent group-hover:bg-accent group-hover:text-black transition-all duration-300 shadow-md"
              >
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>

            <h3 className="text-2xl md:text-3.5xl font-bold tracking-tight mb-4 text-white">
              Battle-Tested Code
            </h3>
            <p className="text-white/60 text-sm md:text-base leading-relaxed">
              We build with clean, secure code that never breaks. Our background in active open-source contributions means your website is fast, safe, and ready for future growth.
            </p>

            <ul className="flex flex-wrap gap-2.5 mt-6">
              {["Clean Coding", "Future-Proof Web", "No Page Crashes", "Active Maintenance"].map((tech) => (
                <li key={tech} className="text-xs bg-white/5 border border-white/5 px-3 py-1 rounded-full text-white/80">
                  {tech}
                </li>
              ))}
            </ul>
          </div>

          {/* GitHub Commit Grid Mockup */}
          <div className="px-8 md:px-12 pb-12 pt-6 overflow-hidden">
            <div className="w-full h-44 rounded-2xl border border-white/10 bg-black/40 p-4 flex flex-col justify-between">
              <div className="flex items-center justify-between border-b border-white/5 pb-2.5">
                <span className="text-[10px] font-mono tracking-widest text-white/40 font-bold uppercase">Active Contributions</span>
                <span className="text-[9px] font-mono text-accent">500+ commits this year</span>
              </div>
              <div className="grid grid-flow-col grid-rows-4 gap-1.5 justify-center py-2">
                {Array.from({ length: 48 }).map((_, i) => {
                  const colors = [
                    "bg-white/5 border-transparent",
                    "bg-accent/10 border-accent/5",
                    "bg-accent/30 border-accent/10",
                    "bg-accent/60 border-accent/20",
                    "bg-accent border-accent/40 shadow-[0_0_8px_#ccff00]",
                  ];
                  const colorIdx = (i * 7 + (i % 3) + (i % 5 === 0 ? 4 : 0)) % colors.length;
                  return (
                    <div
                      key={i}
                      className={`w-3.5 h-3.5 rounded-sm border transition-all duration-500 hover:scale-125 ${colors[colorIdx]}`}
                    />
                  );
                })}
              </div>
              <div className="flex justify-between items-center text-[9px] font-mono text-white/30">
                <span>Jan</span>
                <span>Mar</span>
                <span>May</span>
                <span>Jul</span>
                <span>Sep</span>
                <span>Nov</span>
              </div>
            </div>
          </div>
        </TiltCard>

        {/* --- CARD 4: Startup-Grade Speed --- */}
        <TiltCard
          id="startup-card"
          delay={0.4}
          prefersReducedMotion={prefersReducedMotion}
          className="col-span-1 lg:col-span-7"
        >
          <div className="p-8 md:p-12 pb-4">
            <div className="flex justify-between items-start mb-10">
              <div className="w-12 h-12 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent group-hover:scale-110 group-hover:-translate-y-1 group-hover:border-accent/40 group-hover:shadow-[0_0_20px_rgba(204,255,0,0.3)] transition-all duration-300">
                <Code className="w-5.5 h-5.5" />
              </div>
              <a
                href="#contact"
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:border-accent group-hover:bg-accent group-hover:text-black transition-all duration-300 shadow-md"
              >
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>

            <h3 className="text-2xl md:text-3.5xl font-bold tracking-tight mb-4 text-white">
              Startup-Grade Speed
            </h3>
            <p className="text-white/60 text-sm md:text-base leading-relaxed max-w-xl">
              We move fast and deliver results. Having built software for fast-growing startups, we know how to launch high-performance systems that get your business results from day one.
            </p>

            <ul className="flex flex-wrap gap-2.5 mt-6">
              {["Fast Delivery", "Reliable Systems", "Connected Tools", "Data Dashboards"].map((tech) => (
                <li key={tech} className="text-xs bg-white/5 border border-white/5 px-3 py-1 rounded-full text-white/80">
                  {tech}
                </li>
              ))}
            </ul>
          </div>

          {/* Performance Metrics Display */}
          <div className="px-8 md:px-12 pb-12 pt-6 overflow-hidden">
            <div className="grid grid-cols-3 gap-4">
              <div className="glass p-4 rounded-xl border border-white/5 flex flex-col items-center justify-center text-center group/metric transition-colors hover:border-accent/20">
                <span className="text-2xl md:text-3.5xl font-black text-accent tracking-tight leading-none mb-1 font-display group-hover/metric:scale-105 transition-transform">
                  15x
                </span>
                <span className="text-[9px] uppercase tracking-wider text-white/40 font-mono font-bold">
                  API Speedup
                </span>
              </div>

              <div className="glass p-4 rounded-xl border border-white/5 flex flex-col items-center justify-center text-center group/metric transition-colors hover:border-accent/20">
                <span className="text-2xl md:text-3.5xl font-black text-accent tracking-tight leading-none mb-1 font-display group-hover/metric:scale-105 transition-transform">
                  99.9%
                </span>
                <span className="text-[9px] uppercase tracking-wider text-white/40 font-mono font-bold">
                  System Uptime
                </span>
              </div>

              <div className="glass p-4 rounded-xl border border-white/5 flex flex-col items-center justify-center text-center group/metric transition-colors hover:border-accent/20">
                <span className="text-2xl md:text-3.5xl font-black text-accent tracking-tight leading-none mb-1 font-display group-hover/metric:scale-105 transition-transform">
                  30hr+
                </span>
                <span className="text-[9px] uppercase tracking-wider text-white/40 font-mono font-bold">
                  Saved Weekly
                </span>
              </div>
            </div>
          </div>
        </TiltCard>

      </div>
    </section>
  );
}
