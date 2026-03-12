"use client";

import { motion, useInView, useAnimationFrame } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import type { ReactNode } from "react";
import CountUp from "./CountUp";
import { Mountains, Planet, Eye } from "@phosphor-icons/react";

/* ── Traveling border beam component ─────────────────────────── */
function BorderBeam({
  rx = 16,
  duration = 7000,
}: {
  rx?: number;
  duration?: number;
}) {
  const svgRef = useRef<SVGSVGElement>(null);
  const rectRef = useRef<SVGRectElement>(null);
  const rectGlowRef = useRef<SVGRectElement>(null);
  const [perimeter, setPerimeter] = useState(0);
  const offsetRef = useRef(0);

  useEffect(() => {
    if (!rectRef.current) return;
    const p = rectRef.current.getTotalLength();
    setPerimeter(p);
    offsetRef.current = p;
  }, []);

  useAnimationFrame((_, delta) => {
    if (!perimeter || !rectRef.current || !rectGlowRef.current) return;
    offsetRef.current -= (perimeter / duration) * delta;
    if (offsetRef.current <= 0) offsetRef.current = perimeter;
    const o = String(offsetRef.current);
    rectRef.current.setAttribute("stroke-dashoffset", o);
    rectGlowRef.current.setAttribute("stroke-dashoffset", o);
  });

  const pillLength = perimeter * 0.03;

  return (
    <svg
      ref={svgRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ overflow: "visible" }}
    >
      <defs>
        <filter id="beam-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Dim base border — uses design token via CSS var */}
      <rect
        x="1"
        y="1"
        width="calc(100% - 2px)"
        height="calc(100% - 2px)"
        rx={rx}
        ry={rx}
        fill="none"
        stroke="var(--border)"
        strokeWidth="1"
      />

      {/* Glow layer */}
      <rect
        ref={rectGlowRef}
        x="1"
        y="1"
        width="calc(100% - 2px)"
        height="calc(100% - 2px)"
        rx={rx}
        ry={rx}
        fill="none"
        stroke="var(--accent)"
        strokeWidth="6"
        strokeLinecap="round"
        strokeDasharray={`${pillLength} ${perimeter - pillLength}`}
        strokeDashoffset={perimeter}
        filter="url(#beam-glow)"
        style={{ opacity: 0.6 }}
      />

      {/* Sharp bright pill layer */}
      <rect
        ref={rectRef}
        x="1"
        y="1"
        width="calc(100% - 2px)"
        height="calc(100% - 2px)"
        rx={rx}
        ry={rx}
        fill="none"
        stroke="var(--accent-hover)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray={`${pillLength} ${perimeter - pillLength}`}
        strokeDashoffset={perimeter}
      />
    </svg>
  );
}

const pillars = [
  {
    title: "Local Roots",
    description:
      "We start by understanding the heartbeat of your business. Your story, our craft, and your local community are the foundation of our strategy.",
    icon: <Mountains size={36} weight="fill" color="var(--text-primary)" />,
    color: "var(--accent-secondary)",
  },
  {
    title: "Digital Bridge",
    description:
      "We build the infrastructure from websites, social media to SEO that acts as the bridge connecting your physical store to the digital highway.",
    icon: <Planet size={36} weight="fill" color="var(--text-primary)" />,
    color: "var(--accent)",
  },
  {
    title: "Global Bridge",
    description:
      "Unlock new markets. From a customer down the street to a collector across the ocean, we ensure your business is visible everywhere.",
    icon: <Eye size={36} weight="fill" color="var(--text-primary)" />,
    color: "var(--text-secondary)",
  },
];

function PillarCard({
  pillar,
  index,
}: {
  pillar: {
    title: string;
    description: string;
    icon: ReactNode;
    color: string;
  };
  index: number;
}) {
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
      {/* Background ID Watermark (Technical/Studio Look) */}
      <div className="absolute -top-4 -right-2 font-mono-display text-[120px] font-black text-white/[0.02] select-none leading-none pointer-events-none">
        {watermarkId}
      </div>

      {/* Top: Icon Container */}
      <div className="relative z-10">
        <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-gradient-to-br from-white/10 to-white/5 border border-white/10 shadow-[0_0_25px_rgba(255,255,255,0.05)] group-hover:shadow-[0_0_35px_rgba(255,255,255,0.1)] transition-all duration-500">
          <div className="flex items-center justify-center">
            {pillar.icon}
          </div>
        </div>
      </div>

      {/* Bottom: Title + Description */}
      <div className="relative z-10 flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <span className="font-mono-display text-text-secondary text-[10px] uppercase tracking-[0.2em] font-bold">
            Pillar {watermarkId}
          </span>
        </div>
        
        <h3 className="text-xl font-bold text-text-primary group-hover:text-white transition-colors leading-tight">
          {pillar.title}
        </h3>
        
        <p className="text-text-secondary leading-relaxed text-sm opacity-70 group-hover:opacity-100 transition-opacity duration-500 max-w-[90%]">
          {pillar.description}
        </p>
      </div>

      {/* Subtle corner accent */}
      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/10 rounded-tl-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </motion.div>
  );
}

export default function Mission() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="bg-bg-primary py-28 border-t border-border">
      <div className="max-w-7xl mx-auto px-6">
        <div ref={ref} className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            className="section-tag block mb-4"
          >
            Our Mission
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="text-4xl md:text-6xl font-black text-text-primary leading-tight"
          >
            Bridging Tradition{" "}
            <span className="text-accent">&amp; Technology</span>
          </motion.h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {pillars.map((pillar, i) => (
            <PillarCard key={pillar.title} pillar={pillar} index={i} />
          ))}
        </div>

        {/* Success rate banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-12 relative rounded-2xl"
        >
          <BorderBeam />
          <div className="relative m-[1px] rounded-2xl bg-bg-secondary p-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <p className="text-text-secondary text-sm font-mono-display tracking-widest uppercase mb-1">
                Success Rate · Last 12 months
              </p>
              <p className="text-7xl font-black text-text-primary">
                <CountUp value={98} suffix="%" />
              </p>
            </div>
            <div className="max-w-sm">
              <p className="text-text-primary text-lg font-semibold mb-2">
                We measure what matters
              </p>
              <p className="text-text-secondary text-sm leading-relaxed">
                Our success is defined by your growth — every project we take
                on, we finish. Every business we work with, grows.
              </p>
            </div>
            <div className="hidden md:block">
              <div className="relative w-32 h-32">
                <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
                  <circle
                    cx="60"
                    cy="60"
                    r="50"
                    fill="none"
                    stroke="var(--border)"
                    strokeWidth="8"
                  />
                  <motion.circle
                    cx="60"
                    cy="60"
                    r="50"
                    fill="none"
                    stroke="var(--accent)"
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeDasharray={`${2 * Math.PI * 50}`}
                    initial={{ strokeDashoffset: 2 * Math.PI * 50 }}
                    whileInView={{ strokeDashoffset: 2 * Math.PI * 50 * 0.02 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
                  />
                </svg>
                <span className="absolute inset-0 flex items-center justify-center text-2xl font-black text-text-primary">
                  <CountUp value={98} suffix="%" />
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
