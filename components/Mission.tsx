"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import type { ReactNode } from "react";
import CountUp from "./CountUp";
import { Mountain, Globe, Zap } from "lucide-react";

const pillars = [
  {
    title: "Local Roots",
    description: "We start by understanding the heartbeat of your business. Your story and your community are the foundation of our strategy.",
    icon: <Mountain size={36} strokeWidth={1.5} />,
    color: "var(--accent-secondary)",
  },
  {
    title: "Digital Bridge",
    description: "We build the infrastructure from websites to SEO that acts as the bridge connecting your physical store to the digital highway.",
    icon: <Zap size={36} strokeWidth={1.5} />,
    color: "var(--accent)",
  },
  {
    title: "Global Bridge",
    description: "Unlock new markets. From a customer down the street to a collector across the ocean, we ensure your business is visible.",
    icon: <Globe size={36} strokeWidth={1.5} />,
    color: "var(--text-secondary)",
  },
];

function PillarCard({ pillar, index }: { pillar: any; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const watermarkId = String(index + 1).padStart(2, "0");

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="group relative flex flex-col justify-between gap-8 border border-white/5 rounded-3xl p-8 bg-white/[0.02] backdrop-blur-xl transition-all duration-500 hover:bg-white/[0.04] hover:border-white/10 overflow-hidden h-full"
    >
      <div className="absolute -top-4 -right-2 font-mono-display text-[120px] font-black text-white/[0.02] select-none leading-none pointer-events-none group-hover:text-white/[0.04] group-hover:scale-110 transition-all duration-700">
        {watermarkId}
      </div>
      <div className="relative z-10">
        <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-white/5 border border-white/10 transition-all duration-500 group-hover:bg-accent group-hover:border-accent/40 shadow-[0_0_25px_rgba(255,255,255,0.05)] group-hover:shadow-[0_0_35px_rgba(255,255,255,0.3)]">
          <div className="flex items-center justify-center text-white/40 group-hover:text-white transition-colors duration-500">
            {pillar.icon}
          </div>
        </div>
      </div>
      <div className="relative z-10 flex flex-col gap-3">
        <span className="font-mono-display text-text-secondary text-[10px] uppercase tracking-[0.2em] font-bold">Pillar {watermarkId}</span>
        <h3 className="text-xl font-bold text-text-primary transition-colors duration-500 leading-tight">{pillar.title}</h3>
        <p className="text-text-secondary leading-relaxed text-sm opacity-70 group-hover:opacity-100 transition-opacity duration-500 max-w-[90%]">{pillar.description}</p>
      </div>
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
      </div>
      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/10 rounded-tl-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </motion.div>
  );
}

export default function Mission() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="bg-bg-primary py-28 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6">
        <div ref={ref} className="text-center mb-16">
          <motion.span initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} className="section-tag block mb-4">Our Mission</motion.span>
          <motion.h2 initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2, duration: 0.7 }} className="text-4xl md:text-6xl font-black text-text-primary leading-tight">Bridging Tradition <span className="text-accent">&amp; Technology</span></motion.h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {pillars.map((pillar, i) => (
            <PillarCard key={pillar.title} pillar={pillar} index={i} />
          ))}
        </div>
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1 }} className="mt-32 relative py-20 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-white/5 blur-[120px] rounded-full pointer-events-none" />
          <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] select-none pointer-events-none" style={{ WebkitTextStroke: "2px white", color: "transparent" }}><span className="text-[300px] font-black leading-none">98%</span></div>
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="flex-1 text-left">
              <div className="flex items-center gap-4 mb-6">
                <div className="h-px w-12 bg-accent" />
                <span className="font-mono-display text-accent text-xs uppercase tracking-[0.3em] font-bold">The Studio Standard</span>
              </div>
              <h2 className="text-5xl md:text-7xl font-black text-white leading-[0.9] mb-8 tracking-tighter">Unmatched <br /><span className="text-white/40">Success Rate.</span></h2>
              <p className="text-text-secondary text-lg leading-relaxed max-w-md opacity-80">Our commitment to growth is absolute. We measure success by the tangible impact we deliver to our partners.</p>
            </div>
            <div className="flex-shrink-0 flex flex-col items-center md:items-end gap-2">
              <div className="flex items-baseline gap-2"><span className="text-[120px] font-black text-white leading-none tracking-tighter"><CountUp value={98} /></span><span className="text-4xl font-bold text-accent">%</span></div>
              <div className="flex flex-col items-center md:items-end">
                <p className="text-white font-bold text-sm uppercase tracking-widest">Project Completion</p>
                <p className="text-white/30 text-[10px] font-mono-display uppercase tracking-widest mt-1">Verified · 2025-26</p>
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </motion.div>
      </div>
    </section>
  );
}
