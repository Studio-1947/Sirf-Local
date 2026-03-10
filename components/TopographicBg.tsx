'use client';

import { motion, useMotionValue, useMotionTemplate, useSpring } from 'framer-motion';
import { useEffect, useRef } from 'react';

export default function TopographicBg() {
  const containerRef = useRef<HTMLDivElement>(null);

  const rawX = useMotionValue(-999);
  const rawY = useMotionValue(-999);
  const springX = useSpring(rawX, { stiffness: 80, damping: 18 });
  const springY = useSpring(rawY, { stiffness: 80, damping: 18 });

  const maskImage = useMotionTemplate`radial-gradient(circle 220px at ${springX}px ${springY}px, black 0%, transparent 100%)`;

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

  const topoPaths = (
    <>
      {/* Contour group 1 — bottom-left hills */}
      <g opacity="0.8">
        <path d="M-100,820 Q180,760 400,800 Q620,840 820,780 Q1020,720 1200,760 Q1380,800 1540,750"/>
        <path d="M-100,760 Q200,690 440,730 Q660,770 860,710 Q1060,650 1240,690 Q1400,730 1540,680"/>
        <path d="M-100,700 Q220,620 480,660 Q700,700 900,640 Q1100,580 1280,620 Q1440,660 1540,610"/>
        <path d="M-100,640 Q240,550 520,590 Q740,630 940,570 Q1140,510 1320,550 Q1480,590 1540,540"/>
        <path d="M-100,580 Q260,480 560,520 Q780,560 980,500 Q1180,440 1360,480 Q1520,520 1540,470"/>
      </g>
      {/* Contour group 2 — mid peaks */}
      <g opacity="0.6">
        <path d="M100,900 Q300,820 500,860 Q650,880 750,820 Q900,740 1050,780 Q1200,820 1340,760 Q1460,710 1540,720"/>
        <path d="M-100,500 Q100,410 340,450 Q540,490 700,420 Q880,340 1060,390 Q1220,440 1380,400 Q1480,370 1540,380"/>
        <path d="M-100,440 Q120,340 380,380 Q580,420 740,350 Q920,270 1100,320 Q1260,370 1420,330 Q1500,310 1540,320"/>
        <path d="M200,900 Q360,840 480,870 Q600,900 720,860 Q860,810 980,840 Q1100,870 1220,830 Q1360,785 1440,800"/>
      </g>
      {/* Contour group 3 — top mountain peaks */}
      <g opacity="0.4">
        <path d="M-100,380 Q80,280 280,320 Q460,360 620,290 Q800,210 960,260 Q1120,310 1300,270 Q1440,240 1540,250"/>
        <path d="M-100,320 Q60,210 260,250 Q440,290 600,220 Q780,140 940,195 Q1100,250 1280,210 Q1420,178 1540,185"/>
        <path d="M-100,260 Q80,150 300,185 Q500,220 660,155 Q840,85  1000,135 Q1160,185 1340,145 Q1460,115 1540,120"/>
        <path d="M200,0   Q380,60  520,30  Q660,-10 800,45  Q960,110 1100,70  Q1240,30 1380,60  Q1480,82 1540,70"/>
      </g>
    </>
  );

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none select-none">
      {/* Dim base layer */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.07]"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
        viewBox="0 0 1440 900"
        fill="none"
        stroke="#D4A853"
        strokeWidth="1"
      >
        {topoPaths}
      </svg>

      {/* Mouse glow reveal layer — bright version masked to cursor radius */}
      <motion.div
        className="absolute inset-0"
        style={{
          maskImage,
          WebkitMaskImage: maskImage,
        }}
      >
        <svg
          className="absolute inset-0 w-full h-full opacity-60"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid slice"
          viewBox="0 0 1440 900"
          fill="none"
          stroke="#D4A853"
          strokeWidth="1.5"
        >
          {topoPaths}
        </svg>
        {/* Extra glow bloom at cursor */}
        <div className="absolute inset-0 opacity-30">
          <svg
            className="absolute inset-0 w-full h-full"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMidYMid slice"
            viewBox="0 0 1440 900"
            fill="none"
            stroke="#F0C878"
            strokeWidth="3"
            style={{ filter: 'blur(3px)' }}
          >
            {topoPaths}
          </svg>
        </div>
      </motion.div>

      {/* Animated glowing orbs that drift slowly */}
      <motion.div
        animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-[#D4A853]/4 blur-[100px]"
      />
      <motion.div
        animate={{ x: [0, -50, 0], y: [0, 40, 0] }}
        transition={{ duration: 24, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
        className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] rounded-full bg-[#7C9A5E]/4 blur-[120px]"
      />
      <motion.div
        animate={{ x: [0, 30, -20, 0], y: [0, 20, -10, 0] }}
        transition={{ duration: 30, repeat: Infinity, ease: 'easeInOut', delay: 8 }}
        className="absolute top-2/3 left-1/2 w-[300px] h-[300px] rounded-full bg-[#D4A853]/3 blur-[80px]"
      />

      {/* Vignette edges */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0C0C0C] via-transparent to-[#0C0C0C] opacity-60" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0C0C0C] via-transparent to-[#0C0C0C] opacity-40" />
    </div>
  );
}
