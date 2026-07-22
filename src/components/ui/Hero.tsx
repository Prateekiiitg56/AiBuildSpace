"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  Play,
  Target,
  Crown,
  Star,
  Hexagon,
  Triangle,
  Command,
  Cpu,
  Volume2,
  VolumeX,
  ShieldCheck,
  Zap,
  Rocket,
  Globe,
  Code2,
  Sparkles,
  BarChart3,
  CheckCircle2
} from "lucide-react";
import { useParallax } from "@/hooks/useParallax";

// --- TRUST & CAPABILITY PILLARS ---
const TRUST_PILLARS = [
  { name: "Enterprise Security", icon: ShieldCheck },
  { name: "Sub-100ms Latency", icon: Zap },
  { name: "100% Custom Code", icon: Code2 },
  { name: "Groq AI & PyTorch", icon: Cpu },
  { name: "Next.js 14 & WASM", icon: Globe },
  { name: "99.9% Uptime SLA", icon: Rocket },
  { name: "Pixel-Perfect 3D", icon: Sparkles },
  { name: "Data-Driven ROI", icon: BarChart3 },
];

// --- FRAMER MOTION VARIANTS ---
const fadeSlideUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay, ease: "easeOut" },
  }),
};

const cardReveal = {
  hidden: { opacity: 0, y: 30, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.8, delay: 0.5, ease: "easeOut" },
  },
};

// --- SUB-COMPONENTS ---
const StatItem = ({ value, label }: { value: string; label: string }) => (
  <div className="flex flex-col items-center justify-center transition-transform hover:-translate-y-1 cursor-default">
    <span className="text-xl font-bold text-white sm:text-2xl">{value}</span>
    <span className="text-[10px] uppercase tracking-wider text-white/40 font-medium sm:text-xs">{label}</span>
  </div>
);

export default function HeroSection() {
  const {
    containerRef,
    rotateX,
    rotateY,
    prefersReducedMotion,
    handleMouseEnter,
    handleMouseLeave,
  } = useParallax({ maxTilt: 6, springStiffness: 100, springDamping: 16 });

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [hasInteracted, setHasInteracted] = useState(false);

  // Playback Speed: Set 0.5x playback rate on loaded metadata
  const handleLoadedMetadata = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.5;
    }
  }, []);

  // Toggle Mute handler
  const toggleMute = useCallback(() => {
    if (videoRef.current) {
      const newMutedState = !videoRef.current.muted;
      videoRef.current.muted = newMutedState;
      setIsMuted(newMutedState);
      setHasInteracted(true);
    }
  }, []);

  // Auto-unmute on first user gesture
  useEffect(() => {
    const handleFirstInteraction = () => {
      if (videoRef.current && !hasInteracted) {
        videoRef.current.muted = false;
        setIsMuted(false);
        setHasInteracted(true);
      }
    };

    window.addEventListener("click", handleFirstInteraction, { once: true });
    window.addEventListener("keydown", handleFirstInteraction, { once: true });
    window.addEventListener("touchstart", handleFirstInteraction, { once: true });

    return () => {
      window.removeEventListener("click", handleFirstInteraction);
      window.removeEventListener("keydown", handleFirstInteraction);
      window.removeEventListener("touchstart", handleFirstInteraction);
    };
  }, [hasInteracted]);

  // IntersectionObserver to pause video when out of viewport
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
            video.play().then(() => {
              if (videoRef.current) {
                videoRef.current.playbackRate = 0.5;
              }
            }).catch(() => {});
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.15 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, [prefersReducedMotion]);

  return (
    <div
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative w-full min-h-screen bg-background text-white overflow-hidden font-sans flex items-center"
      style={{ perspective: "1000px" }}
    >
      {/* SCOPED MARQUEE ANIMATION */}
      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
      `}</style>

      {/* 
        ========================================================================
        1. FLAT VIDEO BACKGROUND LAYER (Fix 1: Eliminates over-zoom & cropping)
        ========================================================================
        Kept flat outside translateZ projection so object-fit: cover preserves 
        exact video framing without over-scaling or losing composition.
      */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Looping 3D Video Background */}
        <video
          ref={videoRef}
          autoPlay={!prefersReducedMotion}
          muted={isMuted}
          loop
          playsInline
          onLoadedMetadata={handleLoadedMetadata}
          poster="/3d-design-poster.jpg"
          className="w-full h-full object-cover opacity-45 transition-opacity duration-1000"
        >
          <source src="/3d-design.webm" type="video/webm" />
          <source src="/3d-design.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Top/Middle Ambient Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/50 to-transparent" />
        <div className="absolute inset-0 bg-radial-gradient from-accent/10 via-transparent to-black/80 mix-blend-overlay" />

        {/* 
          ========================================================================
          2. BOTTOM SEAM GRADIENT FADE (Fix 2: Eliminates hard seam between sections)
          ========================================================================
          Smooth 250px gradient melting video into exact #050505 section background.
        */}
        <div className="absolute bottom-0 inset-x-0 h-64 bg-gradient-to-b from-transparent via-background/70 to-background pointer-events-none z-10" />
      </div>

      {/* 
        ========================================================================
        3D PARALLAX CONTENT CONTAINER
        ========================================================================
        Tilt rotation applied to layered text, buttons, and stats cards.
      */}
      <motion.div
        className="relative z-10 w-full h-full py-16 md:py-24"
        style={{
          transformStyle: "preserve-3d",
          rotateX: prefersReducedMotion ? 0 : rotateX,
          rotateY: prefersReducedMotion ? 0 : rotateY,
        }}
      >
        {/* --- MAIN HERO CONTENT GRID --- */}
        <div className="relative z-10 mx-auto max-w-7xl px-4 pt-12 pb-12 sm:px-6 md:pt-20 md:pb-20 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8 items-center">

            {/* --- LEFT COLUMN --- */}
            <div className="lg:col-span-7 flex flex-col justify-center space-y-8">

              {/* LAYER 1: Badge (Z: 20px) */}
              <motion.div
                variants={fadeSlideUp}
                initial="hidden"
                animate="visible"
                custom={0.1}
                style={{
                  transformStyle: "preserve-3d",
                  transform: "translateZ(20px)",
                }}
              >
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 backdrop-blur-md transition-colors hover:bg-white/10 shadow-lg">
                  <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-accent flex items-center gap-2">
                    Award-Winning Design
                    <Star className="w-3.5 h-3.5 text-accent fill-accent" />
                  </span>
                </div>
              </motion.div>

              {/* LAYER 1: Heading (Z: 30px) */}
              <motion.h1
                variants={fadeSlideUp}
                initial="hidden"
                animate="visible"
                custom={0.2}
                className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-medium tracking-tighter leading-[0.9]"
                style={{
                  transformStyle: "preserve-3d",
                  transform: "translateZ(30px)",
                }}
              >
                Crafting Digital<br />
                <span className="bg-gradient-to-br from-white via-white to-accent bg-clip-text text-transparent drop-shadow-sm">
                  Experiences
                </span><br />
                That Matter
              </motion.h1>

              {/* LAYER 1: Description (Z: 25px) */}
              <motion.p
                variants={fadeSlideUp}
                initial="hidden"
                animate="visible"
                custom={0.3}
                className="max-w-xl text-lg text-white/60 leading-relaxed drop-shadow-sm"
                style={{
                  transformStyle: "preserve-3d",
                  transform: "translateZ(25px)",
                }}
              >
                We design interfaces that combine beauty with functionality,
                creating seamless experiences that users love and businesses thrive on.
              </motion.p>

              {/* LAYER 2: CTA Buttons (Z: 50px) */}
              <motion.div
                variants={fadeSlideUp}
                initial="hidden"
                animate="visible"
                custom={0.4}
                className="flex flex-col sm:flex-row gap-4 pt-2"
                style={{
                  transformStyle: "preserve-3d",
                  transform: "translateZ(50px)",
                }}
              >
                <Link href="/portfolio" passHref legacyBehavior>
                  <motion.a
                    whileHover={{ scale: 1.06, translateZ: 60 }}
                    whileTap={{ scale: 0.98 }}
                    className="group inline-flex items-center justify-center gap-2 rounded-full bg-accent px-8 py-4 text-sm font-bold text-black transition-all hover:bg-[#b8e600] shadow-[0_10px_30px_rgba(204,255,0,0.3)] cursor-pointer"
                  >
                    View Portfolio
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </motion.a>
                </Link>

                <motion.button
                  whileHover={{ scale: 1.05, translateZ: 60 }}
                  whileTap={{ scale: 0.98 }}
                  className="group inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/10 px-8 py-4 text-sm font-bold text-white backdrop-blur-md transition-colors hover:bg-white/20 hover:border-accent/40 shadow-lg"
                >
                  <Play className="w-4 h-4 fill-current" />
                  Watch Showreel
                </motion.button>
              </motion.div>
            </div>

            {/* --- RIGHT COLUMN (LAYER 2: FOREGROUND CARDS) --- */}
            <div className="lg:col-span-5 space-y-6 lg:mt-6">

              {/* LAYER 2: Stats Card (Z: 60px) */}
              <motion.div
                variants={cardReveal}
                initial="hidden"
                animate="visible"
                whileHover={{
                  scale: 1.03,
                  y: -6,
                  transition: { duration: 0.3, ease: "easeOut" }
                }}
                className="glass relative overflow-hidden rounded-[32px] border border-white/10 p-8 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.6)] group transition-shadow hover:shadow-[0_30px_70px_rgba(204,255,0,0.15)]"
                style={{
                  transformStyle: "preserve-3d",
                  transform: "translateZ(60px)",
                }}
              >
                {/* Card Glow Effect */}
                <div className="absolute top-0 right-0 -mr-16 -mt-16 h-64 w-64 rounded-full bg-accent/10 blur-3xl pointer-events-none group-hover:bg-accent/20 transition-colors" />

                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/10 ring-1 ring-accent/30 shadow-inner">
                      <Target className="h-6 w-6 text-accent" />
                    </div>
                    <div>
                      <div className="text-3xl font-bold tracking-tight text-white">150+</div>
                      <div className="text-sm text-white/50">Projects Delivered</div>
                    </div>
                  </div>

                  {/* Progress Bar Section */}
                  <div className="space-y-3 mb-8">
                    <div className="flex justify-between text-sm">
                      <span className="text-white/50">Client Satisfaction</span>
                      <span className="text-white font-semibold">98%</span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-800/80 p-0.5">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "98%" }}
                        transition={{ duration: 1.4, delay: 0.7, ease: "easeOut" }}
                        className="h-full rounded-full bg-gradient-to-r from-accent via-accent to-accent/60 shadow-[0_0_12px_rgba(204,255,0,0.5)]"
                      />
                    </div>
                  </div>

                  <div className="h-px w-full bg-white/10 mb-6" />

                  {/* Mini Stats Grid */}
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <StatItem value="3+" label="Years" />
                    <div className="w-px h-full bg-white/10 mx-auto" />
                    <StatItem value="24/7" label="Support" />
                    <div className="w-px h-full bg-white/10 mx-auto" />
                    <StatItem value="100%" label="Quality" />
                  </div>

                  {/* Tag Pills */}
                  <div className="mt-8 flex flex-wrap gap-2">
                    <div className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[10px] font-medium tracking-wide text-zinc-200 backdrop-blur-sm">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
                      </span>
                      ACTIVE
                    </div>
                    <div className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[10px] font-medium tracking-wide text-zinc-200 backdrop-blur-sm">
                      <Crown className="w-3 h-3 text-accent" />
                      PREMIUM
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* LAYER 2: Marquee Card (Z: 45px) */}
              <motion.div
                variants={cardReveal}
                initial="hidden"
                animate="visible"
                className="glass relative overflow-hidden rounded-[32px] border border-white/10 py-8 backdrop-blur-xl shadow-xl"
                style={{
                  transformStyle: "preserve-3d",
                  transform: "translateZ(45px)",
                }}
              >
                <h3 className="mb-6 px-8 text-xs font-mono uppercase tracking-widest text-accent flex items-center gap-2 font-bold">
                  <CheckCircle2 className="w-4 h-4 text-accent" />
                  <span>Production Standards & Trust Guarantees</span>
                </h3>

                <div
                  className="relative flex overflow-hidden"
                  style={{
                    maskImage: "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
                    WebkitMaskImage: "linear-gradient(to right, transparent, black 15%, black 85%, transparent)"
                  }}
                >
                  <div className="animate-marquee flex gap-8 whitespace-nowrap px-4">
                    {[...TRUST_PILLARS, ...TRUST_PILLARS, ...TRUST_PILLARS].map((pillar, i) => (
                      <motion.div
                        key={i}
                        whileHover={{ scale: 1.05 }}
                        className="flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/80 hover:text-accent hover:border-accent/30 transition-all cursor-default"
                      >
                        <pillar.icon className="h-4 w-4 text-accent" />
                        <span className="text-xs font-mono font-bold tracking-wider uppercase">
                          {pillar.name}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>

            </div>
          </div>
        </div>

        {/* 
          ========================================================================
          3. GLASSMOPHIC SOUND TOGGLE BUTTON (Fix 3: Premium theme-matched controls)
          ========================================================================
          Styled with theme lime accent, glass background, smooth icon swap, 
          and floating z-30 position.
        */}
        <motion.div
          className="absolute bottom-8 right-8 z-30"
          style={{
            transformStyle: "preserve-3d",
            transform: "translateZ(70px)",
          }}
        >
          <button
            onClick={toggleMute}
            aria-label={isMuted ? "Unmute audio" : "Mute audio"}
            className="group relative flex items-center justify-center w-11 h-11 rounded-full glass border border-white/10 bg-black/50 text-white hover:border-accent/40 hover:bg-black/70 backdrop-blur-xl transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_0_25px_rgba(0,0,0,0.5)] hover:shadow-[0_0_25px_rgba(204,255,0,0.2)]"
          >
            <AnimatePresence mode="wait">
              {isMuted ? (
                <motion.div
                  key="muted"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.2 }}
                >
                  <VolumeX className="w-4 h-4 text-white/50 group-hover:text-accent transition-colors" />
                </motion.div>
              ) : (
                <motion.div
                  key="unmuted"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.2 }}
                >
                  <Volume2 className="w-4 h-4 text-accent animate-pulse" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </motion.div>

      </motion.div>
    </div>
  );
}