"use client";
import React from "react";
import { motion } from "framer-motion";
import { Search, PenTool, Code2, Rocket, ArrowRight } from "lucide-react";

interface Step {
  num: string;
  title: string;
  icon: React.ReactNode;
  description: string;
  details: string[];
}

const steps: Step[] = [
  {
    num: "01",
    title: "Audit & Strategy",
    icon: <Search className="w-5 h-5" />,
    description: "We audit your business processes to find where you lose time and map out a site structure built to bring in sales.",
    details: ["Time-Wasting Tasks Audit", "SEO Strategy Plan", "Website Layout Map"],
  },
  {
    num: "02",
    title: "Custom Design",
    icon: <PenTool className="w-5 h-5" />,
    description: "We design a custom, high-end website tailored to your brand identity. Absolutely zero boring templates.",
    details: ["Stunning Visual Mockups", "Mobile-Optimized Screen Design", "Clear Navigation Structure"],
  },
  {
    num: "03",
    title: "Build & Automate",
    icon: <Code2 className="w-5 h-5" />,
    description: "We build your lightning-fast website and set up automations to sync your lead lists, emails, and booking tools.",
    details: ["Fast-Loading Website Build", "Automated Client Flow", "App & CRM Integrations"],
  },
  {
    num: "04",
    title: "Launch & Handoff",
    icon: <Rocket className="w-5 h-5" />,
    description: "We publish your website with zero downtime, test all form links, and guide you on how to easily manage it.",
    details: ["Zero-Downtime Launch", "Simple Video Tutorial Handoff", "1-on-1 Walkthrough Call"],
  },
];
 
export default function TimelineProcess() {
  return (
    <section id="process" className="py-24 lg:py-36 relative z-10 overflow-hidden bg-black/30">
      {/* Cool atmospheric backgrounds */}
      <div className="bg-dotgrid" />
      <div className="bg-glow-right" />
      
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="mb-20 md:mb-28 max-w-3xl">
          <motion.div 
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/5 text-xs uppercase tracking-widest text-accent mb-6"
          >
            <span>How We Work</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl md:text-6xl font-extrabold tracking-tight leading-[1.1] mb-6"
          >
            A simple, clear road to <br />
            <span className="text-white/40 font-normal italic">growing your business.</span>
          </motion.h2>
        </div>

        {/* Timeline Grid */}
        <div className="relative">
          {/* Connecting Line (Desktop) */}
          <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-white/10 -translate-y-8 lg:block hidden z-0">
            {/* Glowing Trace Line */}
            <motion.div
              initial={{ left: "0%", width: "0%" }}
              whileInView={{ width: "100%" }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 2.2, ease: "easeInOut" }}
              className="absolute top-0 bottom-0 bg-gradient-to-r from-accent/20 via-accent to-accent/40 shadow-[0_0_10px_#ccff00]"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 lg:gap-8 relative z-10">
            {steps.map((step, idx) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: idx * 0.15 }}
                className="flex flex-col group"
              >
                {/* Node bubble */}
                <div className="flex items-center gap-4 mb-6 lg:mb-8 relative">
                  <div className="w-12 h-12 rounded-full bg-neutral-900 border border-white/10 flex items-center justify-center text-white/50 group-hover:border-accent group-hover:text-accent transition-all duration-500 z-10 bg-black">
                    {step.icon}
                  </div>
                  <div className="text-sm font-mono font-bold text-accent bg-accent/5 border border-accent/15 px-2.5 py-0.5 rounded-full">
                    {step.num}
                  </div>
                </div>

                {/* Content */}
                <div className="glass p-8 rounded-2xl flex-1 flex flex-col justify-between hover:border-white/10 transition-all duration-300">
                  <div>
                    <h3 className="text-xl font-bold mb-3 tracking-tight text-white">
                      {step.title}
                    </h3>
                    <p className="text-white/60 text-sm leading-relaxed mb-6">
                      {step.description}
                    </p>
                  </div>

                  <ul className="border-t border-white/5 pt-4 flex flex-col gap-2">
                    {step.details.map((detail) => (
                      <li key={detail} className="text-xs text-white/40 flex items-center gap-2">
                        <span className="w-1 h-1 bg-accent rounded-full" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
