"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Services", href: "/#services" },
    { label: "Methodology", href: "/#process" },
    { label: "Case Studies", href: "/#testimonials" },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-6 py-4 md:py-6 ${
          scrolled 
            ? "bg-black/50 backdrop-blur-md border-b border-white/5 py-4" 
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="text-xl font-black tracking-widest text-white flex items-center gap-1.5 font-display select-none">
            AiBuildSpace<span className="text-accent animate-pulse">.</span>
          </a>

          {/* Links (Desktop) */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm text-white/60 hover:text-white transition-colors relative group py-2"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-accent transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          {/* CTA Button (Desktop) */}
          <div className="hidden md:block">
            <Link
              href="/book"
              className="inline-flex items-center gap-2 bg-accent text-black px-6 py-2.5 rounded-full text-sm font-bold transition-transform duration-300 hover:scale-[1.04] active:scale-[0.98]"
            >
              <span>Book a Free Call</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Toggle (Mobile) */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white hover:text-accent transition-colors"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black z-40 pt-28 px-8 flex flex-col justify-between pb-12 md:hidden"
          >
            <div className="flex flex-col gap-6">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-3xl font-bold tracking-tight text-white hover:text-accent transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div className="flex flex-col gap-6">
              <Link
                href="/book"
                onClick={() => setIsOpen(false)}
                className="w-full text-center bg-accent text-black py-4 rounded-full font-bold flex items-center justify-center gap-2"
              >
                <span>Book a Free Call</span>
                <ArrowUpRight className="w-5 h-5" />
              </Link>
              <div className="text-[10px] uppercase tracking-widest text-white/30 font-mono text-center">
                AiBuildSpace © 2026
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
