'use client';

import { motion, useInView, useMotionValue, useMotionValueEvent, useAnimationFrame } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

const steps = [
  {
    emoji: '😊',
    phase: 'Phase 01',
    title: 'We Learn & Design',
    description: 'We understand your needs and create your logo and branding.',
    gold: false,
  },
  {
    emoji: '😎',
    phase: 'Phase 02',
    title: 'We Build',
    description: 'We build your digital presence and accordingly we craft social media posts.',
    gold: true,
  },
  {
    emoji: '🤩',
    phase: 'Phase 03',
    title: 'You Grow',
    description: 'Your business launches its new look, and customers start finding you.',
    gold: false,
  },
];

const DURATION = 3500;

export default function Process() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  const lineRef = useRef<HTMLDivElement>(null);
  const [lineWidth, setLineWidth] = useState(600);
  const lineWidthRef = useRef(600);

  const [activeCard, setActiveCard] = useState<number | null>(null);
  const activeCardRef = useRef<number | null>(null);

  useEffect(() => {
    if (!lineRef.current) return;
    const update = () => {
      const w = lineRef.current!.offsetWidth;
      setLineWidth(w);
      lineWidthRef.current = w;
    };
    const ro = new ResizeObserver(update);
    ro.observe(lineRef.current);
    update();
    return () => ro.disconnect();
  }, []);

  // Drive pill position via motion value for smooth sync
  const pillX = useMotionValue(-80);

  useAnimationFrame((_, delta) => {
    const lw = lineWidthRef.current;
    const next = pillX.get() + ((lw + 160) / DURATION) * delta;
    pillX.set(next >= lw + 80 ? -80 : next);
  });

  // Detect which card the pill is currently behind
  useMotionValueEvent(pillX, 'change', (x) => {
    const lw = lineWidthRef.current;
    const third = lw / 3;
    const center = x + 40; // pill center (pill is 80px wide)
    let next: number | null = null;
    if (center >= 0 && center < third) next = 0;
    else if (center >= third && center < third * 2) next = 1;
    else if (center >= third * 2 && center <= lw) next = 2;

    if (next !== activeCardRef.current) {
      activeCardRef.current = next;
      setActiveCard(next);
    }
  });

  return (
    <section id="process" className="bg-[#141414] py-28 border-t border-[#2A2A2A]">
      <div className="max-w-7xl mx-auto px-6">
        <div ref={ref} className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            className="section-tag block mb-4"
          >
            The Process
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="text-4xl md:text-6xl font-black text-[#F5F0E8] leading-tight"
          >
            Your Journey{' '}
            <span className="text-[#D4A853]">With Us</span>
          </motion.h2>
        </div>

        {/* Steps */}
        <div className="relative overflow-visible" ref={lineRef}>

          {/* Connector line */}
          <div style={{
            position: 'absolute', top: '50%', transform: 'translateY(-50%)',
            left: 0, width: lineWidth, height: '20px',
            zIndex: 0, pointerEvents: 'none', overflow: 'hidden',
            display: 'flex', alignItems: 'center',
          }}>
            {/* Base line */}
            <div style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg, transparent, #D4A853 20%, #D4A853 80%, transparent)' }} />
            {/* Traveling glow pill */}
            <motion.div style={{
              position: 'absolute', top: '50%', translateY: '-50%',
              x: pillX, width: 80, height: 4, borderRadius: 9999,
              background: 'linear-gradient(90deg, transparent, #D4A853, #FFE08A, #D4A853, transparent)',
              boxShadow: '0 0 14px 6px rgba(212,168,83,0.8)',
              zIndex: 1,
            }} />
          </div>

          <div className="grid md:grid-cols-3 gap-6 relative" style={{ zIndex: 1 }}>
            {steps.map((step, i) => (
              <motion.div
                key={step.title}
                animate={{
                  scale: activeCard === i ? 1.04 : 1,
                  y: activeCard === i ? -10 : 0,
                  boxShadow: activeCard === i
                    ? '0 20px 40px rgba(212,168,83,0.2)'
                    : '0 0px 0px rgba(0,0,0,0)',
                }}
                transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                className={`relative rounded-2xl p-8 border ${
                  step.gold
                    ? 'bg-[#D4A853] border-[#D4A853] text-[#0C0C0C]'
                    : 'bg-[#1A1A1A] border-[#2A2A2A] text-[#F5F0E8]'
                }`}
              >
                <div className={`absolute top-4 right-4 font-mono-display text-xs tracking-widest ${
                  step.gold ? 'text-[#0C0C0C]/50' : 'text-[#A89F8C]'
                }`}>
                  {step.phase}
                </div>

                <motion.span
                  className="text-5xl mb-6 block"
                  initial={{ scale: 0, rotate: -15 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{ type: 'spring', stiffness: 260, damping: 16, delay: i * 0.18 + 0.25 }}
                >
                  {step.emoji}
                </motion.span>

                <h3 className={`text-xl font-black mb-3 ${step.gold ? 'text-[#0C0C0C]' : 'text-[#F5F0E8]'}`}>
                  {step.title}
                </h3>
                <p className={`text-sm leading-relaxed ${step.gold ? 'text-[#0C0C0C]/70' : 'text-[#A89F8C]'}`}>
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}



