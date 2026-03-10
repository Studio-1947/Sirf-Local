'use client';

import { motion, useInView, useAnimationFrame } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import type { ComponentType } from 'react';
import { Target, Command, Component } from 'lucide-react';

type IconComponent = ComponentType<{ size?: number; color?: string; strokeWidth?: number }>;

function HoverBorderBeam({ isHovered, filterId }: { isHovered: boolean; filterId: string }) {
  const glowRef = useRef<SVGRectElement>(null);
  const sharpRef = useRef<SVGRectElement>(null);
  const offsetRef = useRef(0);
  const perimeterRef = useRef(0);
  const duration = 7000;

  useEffect(() => {
    if (sharpRef.current) {
      perimeterRef.current = sharpRef.current.getTotalLength();
    }
  }, []);

  useAnimationFrame((_, delta) => {
    if (!sharpRef.current || !glowRef.current || perimeterRef.current === 0 || !isHovered) return;
    const p = perimeterRef.current;
    offsetRef.current = (offsetRef.current - (p / duration) * delta + p) % p;
    const pill = p * 0.03;
    const dashArray = `${pill} ${p - pill}`;
    const dashOffset = String(offsetRef.current);
    sharpRef.current.setAttribute('stroke-dasharray', dashArray);
    sharpRef.current.setAttribute('stroke-dashoffset', dashOffset);
    glowRef.current.setAttribute('stroke-dasharray', dashArray);
    glowRef.current.setAttribute('stroke-dashoffset', dashOffset);
  });

  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ overflow: 'visible' }}>
      <defs>
        <filter id={filterId} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
      <rect
        ref={glowRef}
        x="1" y="1"
        width="calc(100% - 2px)" height="calc(100% - 2px)"
        rx={16} ry={16}
        fill="none"
        stroke="#780FF0"
        strokeWidth={6}
        strokeLinecap="round"
        strokeOpacity={0.6}
        strokeDasharray="0 9999"
        filter={`url(#${filterId})`}
        style={{ opacity: isHovered ? 1 : 0, transition: 'opacity 0.3s' }}
      />
      <rect
        ref={sharpRef}
        x="1" y="1"
        width="calc(100% - 2px)" height="calc(100% - 2px)"
        rx={16} ry={16}
        fill="none"
        stroke="#8E3AEE"
        strokeWidth={2}
        strokeLinecap="round"
        strokeDasharray="0 9999"
        style={{ opacity: isHovered ? 1 : 0, transition: 'opacity 0.3s' }}
      />
    </svg>
  );
}

const services: { id: string; title: string; description: string; tags: string[]; icon: string | IconComponent }[] = [
  {
    id: '01',
    title: 'Brand Identity',
    description:
      'Professional logos, comprehensive brand guidelines, and premium packaging that perfectly capture your local essence.',
    tags: ['Logo Design', 'Brand Guidelines', 'Packaging'],
    icon: Target,
  },
  {
    id: '02',
    title: 'Web Development',
    description:
      'Fast, high-converting one-page websites and seamless OTA setups designed to turn your visitors into loyal customers.',
    tags: ['One-Page Sites', 'OTA Setup', 'SEO'],
    icon: Command,
  },
  {
    id: '03',
    title: 'Digital Marketing',
    description:
      'Engaging social media posts, high-quality Reels, and smart WhatsApp automations to build your audience and drive sales.',
    tags: ['Social Media', 'Reels', 'WhatsApp Automation'],
    icon: Component,
  },
];

function ServiceCard({ svc, index }: { svc: typeof services[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [isHovered, setIsHovered] = useState(false);
  const IconComp = typeof svc.icon !== 'string' ? svc.icon as IconComponent : null;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.12 }}
      className="group relative flex flex-col gap-5 border border-[#525252] rounded-2xl p-8 bg-[#1F1E1F] hover:bg-[#383838] transition-all card-glow"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <HoverBorderBeam isHovered={isHovered} filterId={`hbg-${svc.id}`} />
      <div className="flex items-start justify-between relative z-10">
        {IconComp ? (
          <IconComp
            size={28}
            color={isHovered ? '#780FF0' : '#FFFFFF'}
            strokeWidth={1.5}
          />
        ) : (
          <span className="font-mono-display text-[#780FF0] text-2xl">{svc.icon as string}</span>
        )}
        <span className="font-mono-display text-[#525252] text-sm">{svc.id}</span>
      </div>

      <div className="relative z-10">
        <h3 className="text-2xl font-black text-[#FFFFFF] mb-3 group-hover:text-[#780FF0] transition-colors">
          {svc.title}
        </h3>
        <p className="text-[#9E9E9E] leading-relaxed text-base">{svc.description}</p>
      </div>

      <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-[#525252] relative z-10">
        {svc.tags.map((tag) => (
          <span
            key={tag}
            className="px-3 py-1 text-xs rounded-full bg-[#383838] text-[#9E9E9E] border border-[#525252] font-mono-display tracking-wide"
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

export default function Services() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="services" className="bg-[#1F1E1F] py-28 border-t border-[#525252]">
      <div className="max-w-7xl mx-auto px-6">
        <div ref={ref} className="mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            className="section-tag block mb-4"
          >
            Services
          </motion.span>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.7 }}
              className="text-4xl md:text-6xl font-black text-[#FFFFFF] leading-tight max-w-lg"
            >
              Everything You Need to{' '}
              <span className="text-[#780FF0]">Grow Online</span>
            </motion.h2>
            <motion.a
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.4 }}
              href="#contact"
              className="shrink-0 px-6 py-3 border border-[#525252] text-[#9E9E9E] rounded-full hover:border-[#780FF0] hover:text-[#780FF0] transition-all text-sm font-medium"
            >
              View All Services →
            </motion.a>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {services.map((svc, i) => (
            <ServiceCard key={svc.id} svc={svc} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
