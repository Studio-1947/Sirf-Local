'use client';

import { motion, useMotionValue, useMotionTemplate, useSpring } from 'framer-motion';
import { useEffect, useRef } from 'react';

export default function TopographicBg() {
  const containerRef = useRef<HTMLDivElement>(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  const x = useSpring(rawX, { stiffness: 60, damping: 30 });
  const y = useSpring(rawY, { stiffness: 60, damping: 30 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      rawX.set(e.clientX - rect.left);
      rawY.set(e.clientY - rect.top);
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, [rawX, rawY]);

  const maskImage = useMotionTemplate`radial-gradient(450px circle at ${x}px ${y}px, black 0%, transparent 80%)`;

  return (
    <div ref={containerRef} className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden bg-bg-primary">
      {/* Background blobs */}
      <div className="absolute top-[-10%] -left-[10%] w-[60%] h-[60%] bg-accent/10 blur-[120px] rounded-full animate-pulse" />
      <div className="absolute bottom-[-10%] -right-[10%] w-[50%] h-[50%] bg-accent-secondary/5 blur-[100px] rounded-full animate-pulse" style={{ animationDelay: '2s' }} />

      {/* Topographic Lines */}
      <motion.div 
        style={{ maskImage, WebkitMaskImage: maskImage }}
        className="absolute inset-0 opacity-20"
      >
        <svg width="100%" height="100%" className="absolute inset-0">
          <pattern id="topo-pattern" x="0" y="0" width="400" height="400" patternUnits="userSpaceOnUse">
            {/* Group 1: Peaks */}
            <path d="M50 100 Q 100 50 150 100 T 250 100" fill="none" stroke="var(--accent)" strokeWidth="0.5" opacity="0.5" />
            <path d="M30 110 Q 100 40 170 110 T 310 110" fill="none" stroke="var(--accent)" strokeWidth="0.5" opacity="0.3" />
            
            {/* Group 2: Ridge */}
            <path d="M0 250 Q 150 150 300 250 T 600 250" fill="none" stroke="var(--accent)" strokeWidth="0.5" opacity="0.4" />
            <path d="M0 270 Q 150 170 300 270 T 600 270" fill="none" stroke="var(--accent)" strokeWidth="0.5" opacity="0.2" />

            {/* Group 3: Valley */}
            <path d="M100 350 Q 250 450 400 350" fill="none" stroke="var(--accent)" strokeWidth="0.5" opacity="0.3" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#topo-pattern)" />
        </svg>
      </motion.div>

      {/* Vignette gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-bg-primary via-transparent to-bg-primary opacity-60" />
      <div className="absolute inset-0 bg-gradient-to-r from-bg-primary via-transparent to-bg-primary opacity-40" />
    </div>
  );
}
