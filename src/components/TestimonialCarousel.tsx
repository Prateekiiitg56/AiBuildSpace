"use client";
import React from "react";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  text: string;
  avatarInitials: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Marcus Vance",
    role: "Founder",
    company: "Vance Logistics",
    text: "They redesigned our client portal and automated our dispatch scheduling. We went from spending 12 hours a week manually assigning drivers to practically zero. The ROI was clear in the first month.",
    avatarInitials: "MV",
  },
  {
    id: 2,
    name: "Elena Rostova",
    role: "Creative Director",
    company: "Aether Studio",
    text: "Unlike other agencies that reuse templates, they built us a custom Next.js showcase that captures our brand exactly. The performance is mindblowing — 100/100 Mobile PageSpeed score.",
    avatarInitials: "ER",
  },
  {
    id: 3,
    name: "Devon Carter",
    role: "Operations VP",
    company: "CoreTech Manufacturing",
    text: "Our pipeline automation was a complete mess of custom scripts. They came in, consolidated everything into n8n and integrated our legacy SQL databases. They are absolute wizards.",
    avatarInitials: "DC",
  },
  {
    id: 4,
    name: "Samantha Patel",
    role: "CEO",
    company: "Heirloom Goods",
    text: "Their aesthetic taste is second to none. If you want a website that feels like a premium design studio and not a template farm, look no further. Worth every single dollar.",
    avatarInitials: "SP",
  },
];

export default function TestimonialCarousel() {
  // Double the list for infinite looping marquee
  const items = [...testimonials, ...testimonials];

  return (
    <section id="testimonials" className="py-24 lg:py-36 relative z-10 overflow-hidden">
      {/* Background mesh */}
      <div className="mesh-bg-3" />
      <div className="bg-aurora" />

      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 mb-16">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/5 text-xs uppercase tracking-widest text-accent mb-6"
        >
          <span>Client Feedback</span>
        </motion.div>
        
        <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4 text-white">
          Client stories. <br />
          <span className="text-white/40 font-normal italic">Proof in performance.</span>
        </h2>
      </div>

      {/* Scrolling Marquee Container */}
      <div className="relative flex items-center w-full overflow-hidden py-10 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-20 md:before:w-48 before:bg-gradient-to-r before:from-background before:to-transparent before:z-20 after:absolute after:right-0 after:top-0 after:bottom-0 after:w-20 md:after:w-48 after:bg-gradient-to-l after:from-background after:to-transparent after:z-20">
        
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            ease: "linear",
            duration: 32,
            repeat: Infinity,
          }}
          className="flex gap-8 w-max pr-8 hover:[animation-play-state:paused]"
        >
          {items.map((item, idx) => (
            <div
              key={`${item.id}-${idx}`}
              className="w-[320px] md:w-[440px] glass p-8 md:p-10 rounded-3xl relative overflow-hidden transition-all duration-500 hover:border-accent/40 hover:scale-[1.03] hover:-rotate-1 group select-none flex flex-col justify-between"
            >
              {/* Card Glow */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-accent/5 rounded-full filter blur-xl group-hover:bg-accent/15 transition-all duration-500" />
              
              <div>
                <div className="flex justify-between items-start mb-6">
                  <div className="w-10 h-10 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center text-accent text-xs font-mono font-bold">
                    {item.avatarInitials}
                  </div>
                  <Quote className="w-6 h-6 text-white/10 group-hover:text-accent/20 transition-all duration-350" />
                </div>

                <p className="text-white/80 text-sm md:text-base leading-relaxed mb-8 italic">
                  "{item.text}"
                </p>
              </div>

              <div className="border-t border-white/5 pt-5">
                <h4 className="text-white font-bold text-sm md:text-base leading-tight">
                  {item.name}
                </h4>
                <p className="text-white/40 text-xs md:text-sm mt-1">
                  {item.role} @ <span className="text-white/60">{item.company}</span>
                </p>
              </div>
            </div>
          ))}
        </motion.div>
        
      </div>
    </section>
  );
}
