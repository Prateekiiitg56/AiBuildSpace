"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ExternalLink,
  Github,
  Sparkles,
  Clock,
  Globe,
  Radio,
} from "lucide-react";
import Link from "next/link";

// ─── Project Data Interface ────────────────────────
interface Project {
  id: number;
  title: string;
  category: string; // Display category label
  filterCategory: "all" | "ai" | "fullstack" | "automation" | "ml";
  description: string;
  technologies: string;
  link: string;
  deploy?: string;
  image?: string;
}

const PROJECTS: Project[] = [
  {
    id: 1,
    title: "BizInsight AI",
    category: "AI / Analytics",
    filterCategory: "ai",
    technologies: "Python, Streamlit, NLP, Pandas, Matplotlib, Plotly",
    link: "https://github.com/Prateekiiitg56/BizInsight-AI",
    deploy: "https://biz-insight-ai-eight.vercel.app/",
    description:
      "An AI-powered customer feedback analytics platform for business intelligence. Performs sentiment analysis, identifies key issues, and generates automated improvement suggestions.",
  },
  {
    id: 2,
    title: "Red Fizz 3D Interactive Brand Portfolio",
    category: "3D Web / Interactive",
    filterCategory: "fullstack",
    technologies: "React 18, Vite, Three.js, React Three Fiber (R3F), Drei, Tailwind CSS, GSAP",
    link: "https://github.com/Prateekiiitg56/Red-Fizz",
    deploy: "https://red-fizz.vercel.app",
    description:
      "A premium, high-fidelity responsive web application showcasing carbonated beverages with real-time interactive WebGL elements. Features 3D product inspectors, custom Can3D models with cinematic rendering, and glass material physics.",
  },
  {
    id: 3,
    title: "StudyBuddy Chrome Extension",
    category: "Browser Extension",
    filterCategory: "automation",
    technologies: "JavaScript, Chrome Extension API (v3), HTML5, CSS3",
    link: "https://github.com/Prateekiiitg56/StudyBuddy-Chrome-Extension",
    description:
      "A productivity side-panel extension that provides AI-driven educational assistance and answers student queries in real-time.",
  },
  {
    id: 4,
    title: "Music Prediction Model",
    category: "Machine Learning",
    filterCategory: "ml",
    technologies: "Python, Pandas, Scikit-Learn, Matplotlib, NumPy",
    link: "https://github.com/Prateekiiitg56/Music-Prediction-using-ML.git",
    description:
      "A machine learning pipeline that analyzes listener data to predict music preferences and genres, with reporting and visualization.",
  },
  {
    id: 5,
    title: "CodeCapsule",
    category: "Full Stack",
    filterCategory: "fullstack",
    technologies: "React, Node.js, Local Storage, IndexedDB, Express",
    link: "https://github.com/Prateekiiitg56/CodeCapsule",
    description:
      "A secure environment for code storage and management, designed for handling sensitive snippets and rapid project documentation.",
  },
  {
    id: 6,
    title: "The Matrix (LateCode)",
    category: "Full Stack / EdTech",
    filterCategory: "fullstack",
    technologies: "React, Vite, Tailwind CSS, Node.js, Express.js, MongoDB, Pyodide (WASM), Monaco Editor",
    link: "https://github.com/Prateekiiitg56/The-Matrix.git",
    deploy: "https://the-matrix-rho.vercel.app/",
    description:
      "A dual-world gamified learning OS. The Red Pill launches a brutalist DSA tracker with MongoDB-backed problem sets. The Blue Pill opens The Construct — a Python curriculum with in-browser WASM execution via Pyodide.",
  },
  {
    id: 7,
    title: "SmartScribe",
    category: "AI / Full Stack",
    filterCategory: "ai",
    technologies: "React, Vite, FastAPI, Python, SQLite, JWT, Google OAuth, OpenRouter API",
    link: "https://github.com/Prateekiiitg56/SmartScribe.git",
    description:
      "AI-powered essay evaluator that provides instant feedback on grammar, coherence, and argumentation strength. Features Google OAuth, JWT authentication, Monaco-style editor, and user evaluation history.",
  },
  {
    id: 8,
    title: "Sketch-to-Color GAN",
    category: "Deep Learning / Computer Vision",
    filterCategory: "ml",
    technologies: "Python, PyTorch, Torchvision, Pix2Pix (U-Net + PatchGAN), Albumentations",
    link: "https://github.com/Prateekiiitg56/SketchColured.git",
    description:
      "A conditional GAN (cGAN) that colorizes anime-style sketches using Pix2Pix architecture. The U-Net generator maps black-and-white sketches to full-color images while PatchGAN discriminator enforces fine-grained realism.",
  },
  {
    id: 9,
    title: "Automated Documentation Agent",
    category: "AI / Automation",
    filterCategory: "automation",
    technologies: "n8n, GitHub Webhooks, Groq AI, Node.js, Markdown",
    link: "https://github.com/Prateekiiitg56/automated-documentation-agent",
    description:
      "Automated agent that generates docs, blogs, and video scripts on every GitHub PR merge using n8n and Groq AI. Automatically turns code merges into complete documentation in seconds.",
  },
  {
    id: 10,
    title: "AuraSpot",
    category: "Full Stack / Real-time",
    filterCategory: "fullstack",
    technologies: "React, Next.js, Firebase (Realtime DB & Auth), CSS Modules",
    link: "https://github.com/Prateekiiitg56/auraspot",
    deploy: "https://auraspotfrontend.vercel.app/",
    description:
      "A real-time real estate platform for finding, buying, or selling hostels, PGs, and houses with localized discovery and seamless user interaction.",
  },
  {
    id: 11,
    title: "Matinee",
    category: "AI / Recommender System",
    filterCategory: "ai",
    technologies: "JavaScript (ES6), Vite, Vanilla CSS, TMDB API, Pearson Correlation, Cosine Similarity, LocalStorage",
    link: "https://github.com/Prateekiiitg56/Matinee",
    deploy: "https://matinee-peach.vercel.app/",
    description:
      "A self-contained, hybrid movie recommendation engine with Tinder-style swipe physics. Features dual algorithms (Content-Based & Collaborative Filtering via Pearson Correlation), real-time TMDB API catalog fetching, and dynamic blending.",
  },
];

export default function PortfolioPage() {
  const [filter, setFilter] = useState<"all" | "ai" | "fullstack" | "automation" | "ml">("all");
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const filteredProjects = PROJECTS.filter(
    (p) => filter === "all" || p.filterCategory === filter
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
    const handleChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    }
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (prefersReducedMotion) {
      video.pause();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, [prefersReducedMotion]);

  return (
    <main className="relative min-h-screen overflow-hidden bg-background text-white font-sans">
      {/* Slow zoom keyframes */}
      <style>{`
        @keyframes slowZoom {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        .animate-slow-zoom {
          animation: slowZoom 25s ease-in-out infinite alternate;
        }
      `}</style>

      {/* Ambient Looping Video Background */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <video
          ref={videoRef}
          autoPlay={!prefersReducedMotion}
          muted
          loop
          playsInline
          poster="/ambient-bg-poster.jpg"
          className={`w-full h-full object-cover opacity-35 transition-opacity duration-1000 ${
            prefersReducedMotion ? "" : "animate-slow-zoom"
          }`}
        >
          <source src="/ambient-bg.webm" type="video/webm" />
          <source src="/ambient-bg.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/60 to-transparent" />
        <div className="absolute inset-0 bg-radial-gradient from-accent/8 via-transparent to-black/85 mix-blend-overlay" />
        <div className="absolute bottom-0 inset-x-0 h-64 bg-gradient-to-b from-transparent via-background/80 to-background pointer-events-none z-10" />
      </div>

      {/* Atmospheric Overlays */}
      <div className="mesh-bg-1 opacity-60" />
      <div className="mesh-bg-3 opacity-60" />
      <div className="bg-dotgrid opacity-40" />

      {/* Navigation Header */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/40 backdrop-blur-md border-b border-white/5 px-6 py-5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors group text-sm font-mono uppercase tracking-wider"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>Back to Home</span>
          </Link>
          <div className="text-sm font-mono tracking-widest text-accent flex items-center gap-2">
            <Radio className="w-3.5 h-3.5 animate-pulse" />
            PORTFOLIO SHOWCASE
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-24 lg:pt-40">

        {/* Hero Intro */}
        <div className="max-w-3xl mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/10 text-xs uppercase tracking-widest text-accent mb-6 shadow-md"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Featured Works ({PROJECTS.length})</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl md:text-7xl font-extrabold tracking-tight leading-[1.05] mb-6"
          >
            Crafted Software. <br />
            <span className="bg-gradient-to-r from-white via-white/80 to-white/40 bg-clip-text text-transparent italic font-normal">
              AI systems, 3D web & automation.
            </span>
          </motion.h1>
        </div>

        {/* Filter Category Pills */}
        <div className="flex flex-wrap gap-2.5 mb-12 border-b border-white/10 pb-8">
          {[
            { value: "all", label: "All Projects" },
            { value: "ai", label: "AI & NLP" },
            { value: "fullstack", label: "Full Stack & 3D Web" },
            { value: "automation", label: "Automation & Tools" },
            { value: "ml", label: "Machine Learning & Vision" },
          ].map((cat, idx) => (
            <motion.button
              key={cat.value}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              onClick={() => setFilter(cat.value as any)}
              className={`px-5 py-2.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider transition-all border ${
                filter === cat.value
                  ? "bg-accent border-accent text-black shadow-[0_0_20px_rgba(204,255,0,0.25)]"
                  : "bg-white/5 border-white/10 text-white/50 hover:text-white hover:border-white/20"
              }`}
            >
              {cat.label}
            </motion.button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((p) => {
              const techList = p.technologies.split(", ");
              const isDeployed = Boolean(p.deploy);

              return (
                <motion.div
                  layout
                  key={p.id}
                  initial={{ opacity: 0, scale: 0.96, y: 30 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96, y: 30 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="glass rounded-[32px] border border-white/10 p-8 md:p-10 flex flex-col justify-between group hover:border-accent/40 transition-all duration-300 relative overflow-hidden shadow-xl hover:shadow-[0_20px_50px_rgba(204,255,0,0.12)]"
                >
                  {/* Hover ambient glow */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none duration-500" />
                  <div className="absolute top-0 right-0 -mr-16 -mt-16 h-64 w-64 rounded-full bg-accent/5 blur-3xl pointer-events-none group-hover:bg-accent/15 transition-colors duration-500" />

                  {/* Top Header & Actions */}
                  <div className="relative z-10">
                    <div className="flex justify-between items-start gap-4 mb-6">
                      {/* Category tag */}
                      <span className="text-[10px] font-mono tracking-widest text-accent uppercase bg-accent/10 border border-accent/20 px-3 py-1 rounded-full shadow-sm">
                        {p.category}
                      </span>

                      {/* External links & Deployment Status Badge */}
                      <div className="flex items-center gap-2">
                        {/* GitHub Source Code */}
                        <a
                          href={p.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          title="View Source Code on GitHub"
                          className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 hover:border-accent/30 transition-all"
                        >
                          <Github className="w-4 h-4" />
                        </a>

                        {/* Live Demo or Deploying Soon Button */}
                        {isDeployed ? (
                          <a
                            href={p.deploy}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group/link inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-accent text-black font-mono font-bold text-[11px] uppercase tracking-wider transition-all hover:bg-[#b8e600] shadow-[0_0_12px_rgba(204,255,0,0.3)] active:scale-95"
                          >
                            <Globe className="w-3.5 h-3.5" />
                            <span>Live Demo</span>
                            <ExternalLink className="w-3 h-3 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                          </a>
                        ) : (
                          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/50 font-mono text-[10px] uppercase tracking-wider">
                            <Clock className="w-3 h-3 text-white/40 animate-spin" style={{ animationDuration: '8s' }} />
                            <span>Deploying Soon</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Title & Description */}
                    <h3 className="text-2xl font-bold tracking-tight text-white mb-3 group-hover:text-accent transition-colors">
                      {p.title}
                    </h3>
                    <p className="text-white/60 text-sm leading-relaxed mb-6">
                      {p.description}
                    </p>
                  </div>

                  {/* Footer & Tech Tags */}
                  <div className="relative z-10 border-t border-white/10 pt-6">
                    <div className="text-[10px] font-mono uppercase tracking-wider text-white/30 mb-3">
                      Technologies & Stack
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {techList.map((t) => (
                        <span
                          key={t}
                          className="text-[10px] font-mono bg-white/5 border border-white/10 px-2.5 py-1 rounded-md text-white/60 group-hover:border-accent/20 group-hover:text-white/80 transition-colors"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

      </div>

      {/* Footer */}
      <footer className="border-t border-white/5 bg-black/40 py-12 px-6 overflow-hidden relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
          <div className="text-sm font-mono text-white/30">
            AiBuildSpace © 2026. ALL RIGHTS RESERVED.
          </div>
          <div className="flex gap-8 text-xs font-mono text-white/30">
            <a
              href="https://instagram.com/aibuild.space"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-accent transition-colors flex items-center gap-1"
            >
              INSTAGRAM <ExternalLink className="w-3 h-3" />
            </a>
            <a
              href="https://prateek-portfolio-tau.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-accent transition-colors flex items-center gap-1"
            >
              PORTFOLIO <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
