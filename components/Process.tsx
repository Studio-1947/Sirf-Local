'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Lightbulb, Code, Rocket } from "lucide-react";

const steps = [
  {
    id: '01',
    icon: <Lightbulb size={32} strokeWidth={1.5} />,
    phase: 'Discovery',
    title: 'Brand DNA & Audit',
    description: 'We audit your current brand presence and identify the core local strengths that will drive your global strategy.',
    metrics: ['Market Analysis', 'Brand Voice', 'SWOT Report'],
  },
  {
    id: '02',
    icon: <Code size={32} strokeWidth={1.5} />,
    phase: 'Production',
    title: 'Custom Engineering',
    description: 'Our studio builds a bespoke digital ecosystem. From high-performance code to conversion-focused design.',
    metrics: ['React/Next.js', 'UI/UX Design', 'API Sync'],
    featured: true,
  },
  {
    id: '03',
    icon: <Rocket size={32} strokeWidth={1.5} />,
    phase: 'Delivery',
    title: 'Launch & Scale',
    description: 'We deploy your platform and activate a data-driven growth strategy that scales your business globally.',
    metrics: ['Cloud Hosting', 'SEO Setup', 'Growth Data'],
  },
];

export default function Process() {
  const containerRef = useRef(null);
  const inView = useInView(containerRef, { once: true, margin: '-100px' });

  return (
    <section id="process" className="bg-bg-primary py-32 border-t border-white/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div ref={containerRef} className="flex flex-col md:flex-row items-end justify-between mb-24 gap-8">
          <div className="max-w-2xl">
            <motion.span initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}} className="section-tag block mb-4">The Studio Process</motion.span>
            <motion.h2 initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2, duration: 0.7 }} className="text-5xl md:text-7xl font-black text-text-primary leading-tight tracking-tighter">From Blueprint <br /><span className="text-accent">To Breakthrough.</span></motion.h2>
          </div>
          <div className="hidden md:block">
            <p className="text-text-secondary text-lg font-mono-display uppercase tracking-widest max-w-[240px] text-right border-r-2 border-accent pr-6 leading-relaxed">A 3-Phase technical journey.</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-1 border border-white/5 rounded-[2.5rem] overflow-hidden bg-white/[0.01]">
          {steps.map((step, i) => (
            <motion.div key={step.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.1 }} className={`group relative flex flex-col p-10 md:p-12 transition-all duration-500 h-full ${i !== 2 ? 'border-b md:border-b-0 md:border-r border-white/5' : ''} hover:bg-white/[0.02]`}>
              <div className="absolute inset-0 flex items-center justify-center font-mono-display text-[180px] font-black text-white/[0.02] select-none leading-none pointer-events-none group-hover:text-white/[0.04] group-hover:scale-105 transition-all duration-700">{step.id}</div>
              {/* Icon & Phase */}
              <div className="relative z-10 flex items-center justify-between mb-16">
                 <div className={`w-12 h-12 rounded-xl flex items-center justify-center border transition-all duration-500 ${
                    step.featured 
                     ? 'bg-white text-bg-primary shadow-[0_0_30px_rgba(255,255,255,0.3)]' 
                     : 'bg-white/5 border-white/10 text-white/40 group-hover:bg-white group-hover:border-white/40 group-hover:text-bg-primary group-hover:shadow-[0_0_30px_rgba(255,255,255,0.3)]'
                  }`}>
                   {step.icon}
                 </div>
                 <span className="font-mono-display text-[10px] text-text-muted uppercase tracking-[0.3em] group-hover:text-accent transition-colors duration-300">{step.phase}</span>
              </div>

              {/* Title & Description */}
              <div className="relative z-10 mb-12">
                <h3 className="text-2xl font-bold text-white mb-4 tracking-tight">{step.title}</h3>
                <p className="text-text-secondary text-sm leading-relaxed opacity-70 group-hover:opacity-100 transition-opacity duration-500">{step.description}</p>
              </div>
              <div className="relative z-10 mt-auto pt-8 border-t border-white/5">
                 <div className="flex flex-wrap gap-2">
                   {step.metrics.map(metric => (
                     <span key={metric} className="text-[9px] font-mono-display text-text-muted border border-white/5 rounded-full px-3 py-1 uppercase tracking-widest bg-white/[0.01] group-hover:text-accent group-hover:border-accent-pill-border group-hover:bg-accent-pill-bg transition-all duration-300">{metric}</span>
                   ))}
                 </div>
              </div>
              <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
