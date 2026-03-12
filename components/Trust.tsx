'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import { MapPin, Handshake, Lightbulb, Leaf, BarChart2 } from 'lucide-react';

const pills = [
  { icon: MapPin,     label: 'Based in Mirik, Darjeeling' },
  { icon: Handshake,  label: 'Community-first approach' },
  { icon: Lightbulb,  label: 'Local youth empowerment' },
  { icon: Leaf,       label: 'Himal Nagrik Fellowship' },
  { icon: BarChart2,  label: 'Data-driven solutions' },
];

const images = [
  '/images/trust/community-1.jpg',
  '/images/trust/community-2.jpg',
  '/images/trust/community-3.jpg',
  '/images/trust/community-4.jpg',
  '/images/trust/community-5.jpg',
  '/images/trust/community-6.jpg',
  '/images/trust/community-7.jpg',
];

export default function Trust() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="bg-bg-primary border-t border-border overflow-hidden" style={{ padding: '96px 0' }}>
      <div className="max-w-7xl mx-auto px-6">

        {/* Two-column grid */}
        <div
          ref={ref}
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 420px',
            gap: '64px',
            alignItems: 'stretch',
          }}
        >
          {/* LEFT — Header + Pills */}
          <div>
            <motion.span
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              className="section-tag"
              style={{ display: 'inline-block', marginBottom: '16px' }}
            >
              Trust
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.7 }}
              style={{
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                fontWeight: 900,
                lineHeight: 1.15,
                letterSpacing: '-0.5px',
                marginBottom: '20px',
              }}
              className="text-text-primary"
            >
              Rooted in{' '}
              <span className="text-accent">Mirik,</span>
              <br />
              Designed for the{' '}
              <span className="text-accent">World</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 }}
              className="text-text-secondary"
              style={{
                fontSize: '16px',
                lineHeight: 1.7,
                maxWidth: '520px',
                marginBottom: '36px',
              }}
            >
              Sirf Local is an initiative by Studio 1947. We aren&apos;t a faceless
              corporation — we are your neighbors, focused on empowering local
              businesses with Data, Design, and Tech. When you work with us,
              you aren&apos;t just a client; you&apos;re a partner in the local ecosystem.
            </motion.p>

            {/* Pills */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {pills.map(({ icon: Icon, label }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 16 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.38 + i * 0.08, duration: 0.45 }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-pill-bg border border-accent-pill-border cursor-default"
                >
                  <Icon size={14} className="text-accent" strokeWidth={2} />
                  <span className="text-text-lavender text-[13px] font-semibold tracking-[0.1px]">
                    {label}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* RIGHT — Horizontal Marquee Photo Strip */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.7 }}
            style={{
              position: 'relative',
              height: '100%',
              overflow: 'hidden',
              borderRadius: '20px',
              minHeight: '300px',
            }}
          >
            {/* Left + right fade masks — must reference CSS var for gradient */}
            <div style={{
              position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none',
              background: 'linear-gradient(to right, var(--bg-primary) 0%, transparent 12%, transparent 88%, var(--bg-primary) 100%)',
            }} />

            {/* Scrolling row — doubled images for seamless loop */}
            <div
              className="animate-marquee"
              style={{
                display: 'flex',
                flexDirection: 'row',
                gap: '12px',
                height: '100%',
                width: 'max-content',
              }}
            >
              {[...images, ...images].map((src, i) => (
                <div
                  key={i}
                  style={{
                    position: 'relative',
                    width: '260px',
                    height: '100%',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    flexShrink: 0,
                    border: '1px solid var(--accent-border)',
                  }}
                  className="img-zoom"
                >
                  <Image
                    src={src}
                    alt={`Community photo ${(i % images.length) + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
