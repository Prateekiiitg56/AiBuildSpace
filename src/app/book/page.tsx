"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, Phone, ExternalLink } from "lucide-react";
import BookCall from "@/components/BookCall";

export default function BookPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-background text-white font-sans">
      {/* Ambient Meshes */}
      <div className="mesh-bg-1 opacity-60" />
      <div className="mesh-bg-3 opacity-60" />
      <div className="bg-dotgrid opacity-40" />

      {/* Header Navigation */}
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
            <Phone className="w-3.5 h-3.5 animate-pulse" />
            BOOK A FREE CALL
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <div className="relative z-10 pt-20">
        <BookCall />
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
