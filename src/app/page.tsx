"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Check, Send, Mail, Globe, Loader2, Instagram, ExternalLink } from "lucide-react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/ui/Hero";
import BentoServices from "@/components/BentoServices";
import TimelineProcess from "@/components/TimelineProcess";
import TestimonialCarousel from "@/components/TestimonialCarousel";

export default function Home() {
  const [formData, setFormData] = useState({ name: "", email: "", type: "both", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [contactError, setContactError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    setIsSubmitting(true);
    setContactError("");

    try {
      const res = await fetch("/api/notify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "contact",
          name: formData.name,
          email: formData.email,
          service: formData.type,
          message: formData.message,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to send");
      }

      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormData({ name: "", email: "", type: "both", message: "" });
      }, 4000);
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : "Something went wrong. Please try again.";
      setContactError(errorMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-background">
      {/* Background Meshes */}
      <div className="mesh-bg-1" />
      <div className="mesh-bg-3" />

      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <HeroSection />

      {/* Services Bento Grid Section */}
      <BentoServices />

      {/* Timeline Methodology Section */}
      <TimelineProcess />

      {/* Testimonials Carousel Section */}
      <TestimonialCarousel />

      {/* Contact Section */}
      <section id="contact" className="py-24 lg:py-36 relative z-10 px-6 max-w-7xl mx-auto overflow-hidden">
        {/* Cool atmospheric backgrounds */}
        <div className="bg-glow-topleft" />
        <div className="bg-finegrid" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">

          {/* Contact Left - Studio Info */}
          <div className="col-span-1 lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/5 text-xs uppercase tracking-widest text-accent mb-6"
            >
              <span>Get in touch</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-4xl md:text-6xl font-extrabold tracking-tight mb-8"
            >
              Let’s build something <br />
              <span className="text-white/40 font-normal italic">unforgettable.</span>
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-col gap-6 text-white/60 text-sm sm:text-base border-t border-white/5 pt-8 mt-8"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-accent">
                  <Mail className="w-5 h-5" />
                </div>
                <span>AiBuildSpacee@gmail.com</span>
              </div>
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-accent">
                  <Globe className="w-5 h-5" />
                </div>
                <span>Remote Operations Worldwide</span>
              </div>
              <a 
                href="https://instagram.com/aibuild.space" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-3.5 hover:text-accent transition-colors group"
              >
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-accent group-hover:border-accent/40 transition-colors">
                  <Instagram className="w-5 h-5" />
                </div>
                <span className="flex items-center gap-1.5">
                  @aibuild.space
                  <ExternalLink className="w-3.5 h-3.5 opacity-45 group-hover:opacity-100 transition-opacity" />
                </span>
              </a>
              <a 
                href="https://prateek-portfolio-tau.vercel.app/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-3.5 hover:text-accent transition-colors group"
              >
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-accent group-hover:border-accent/40 transition-colors">
                  <ExternalLink className="w-5 h-5" />
                </div>
                <span className="flex items-center gap-1.5">
                  Prateek's Portfolio
                  <ExternalLink className="w-3.5 h-3.5 opacity-45 group-hover:opacity-100 transition-opacity" />
                </span>
              </a>
            </motion.div>
          </div>

          {/* Contact Right - Interactive Form */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="col-span-1 lg:col-span-7 glass p-8 md:p-12 rounded-[32px] border border-white/5"
          >
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="text-xs uppercase tracking-widest text-white/40 font-mono font-bold">Your Name</label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="bg-white/5 border border-white/5 focus:border-accent/40 rounded-xl px-4 py-3 text-white placeholder-white/20 outline-none transition-colors"
                    placeholder="Enter your name"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-xs uppercase tracking-widest text-white/40 font-mono font-bold">Your Email</label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="bg-white/5 border border-white/5 focus:border-accent/40 rounded-xl px-4 py-3 text-white placeholder-white/20 outline-none transition-colors"
                    placeholder="Enter your email address"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <span className="text-xs uppercase tracking-widest text-white/40 font-mono font-bold">What do you need?</span>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { value: "design", label: "Web Design" },
                    { value: "automation", label: "Automation" },
                    { value: "both", label: "Both" }
                  ].map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => setFormData({ ...formData, type: opt.value })}
                      className={`py-3 rounded-xl border text-xs sm:text-sm uppercase tracking-wider font-mono font-bold transition-all ${formData.type === opt.value
                          ? "bg-accent text-black border-accent"
                          : "bg-white/5 border-white/5 text-white/60 hover:text-white"
                        }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="text-xs uppercase tracking-widest text-white/40 font-mono font-bold">Project Details</label>
                <textarea
                  id="message"
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="bg-white/5 border border-white/5 focus:border-accent/40 rounded-xl px-4 py-3 text-white placeholder-white/20 outline-none transition-colors resize-none"
                  placeholder="Tell us about your project or what you want to build..."
                />
              </div>

              {contactError && (
                <div className="text-sm text-red-400 bg-red-400/5 border border-red-400/10 rounded-xl px-4 py-3">
                  {contactError}
                </div>
              )}

              <button
                type="submit"
                disabled={submitted || isSubmitting}
                className={`py-4 rounded-xl font-bold flex items-center justify-center gap-2.5 transition-all duration-300 ${submitted
                    ? "bg-accent/20 text-accent cursor-default"
                    : isSubmitting
                      ? "bg-accent/40 text-black/60 cursor-wait"
                      : "bg-accent text-black hover:scale-[1.02] active:scale-[0.98]"
                  }`}
              >
                {submitted ? (
                  <>
                    <Check className="w-5 h-5" />
                    <span>Message Sent</span>
                  </>
                ) : isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
          </motion.div>

        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 bg-black/40 py-12 relative z-10 px-6 overflow-hidden">
        {/* Cool atmospheric backgrounds */}
        <div className="bg-crosshatch" />
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
          <div className="text-sm font-mono text-white/30">
            AiBuildSpace © 2026. ALL RIGHTS RESERVED.
          </div>
          <div className="flex gap-8 text-xs font-mono text-white/30">
            <a href="https://instagram.com/aibuild.space" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors flex items-center gap-1">INSTAGRAM <ExternalLink className="w-3 h-3" /></a>
            <a href="https://prateek-portfolio-tau.vercel.app/" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors flex items-center gap-1">PORTFOLIO <ExternalLink className="w-3 h-3" /></a>
          </div>
        </div>
      </footer>
    </main>
  );
}
