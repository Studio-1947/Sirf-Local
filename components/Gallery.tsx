'use client';

import { motion, AnimatePresence, useInView } from 'framer-motion';
import { useRef, useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { ArrowUpRight, Play, X, ChevronLeft, ChevronRight } from 'lucide-react';

type Category = 'All' | 'Photos' | 'Branding' | 'Logo' | 'Packaging' | 'Videos';

interface GalleryItem {
  id: string;
  category: Exclude<Category, 'All'>;
  label: string;
  sublabel: string;
  src?: string;
  accent: string;
  bg: string;
}

const TABS: Category[] = ['All', 'Photos', 'Branding', 'Logo', 'Packaging', 'Videos'];

const items: GalleryItem[] = [
  // Photos  →  public/images/gallery/photos/
  { id: 'p1', category: 'Photos', label: 'Photo 1', sublabel: 'Photography', accent: '#A463EE', bg: 'linear-gradient(135deg,#200050 0%,#5103AA 100%)', src: '/images/gallery/photos/1.png' },
  { id: 'p2', category: 'Photos', label: 'Photo 2', sublabel: 'Photography', accent: '#780FF0', bg: 'linear-gradient(135deg,#1A003A 0%,#3E0085 100%)', src: '/images/gallery/photos/2.png' },
  { id: 'p3', category: 'Photos', label: 'Photo 3', sublabel: 'Photography', accent: '#B98AEF', bg: 'linear-gradient(135deg,#2D0060 0%,#6509CE 100%)', src: '/images/gallery/photos/3.png' },
  { id: 'p4', category: 'Photos', label: 'Photo 4', sublabel: 'Photography', accent: '#8E3AEE', bg: 'linear-gradient(135deg,#1A003A 0%,#4A0090 100%)', src: '/images/gallery/photos/4.png' },
  { id: 'p5', category: 'Photos', label: 'Photo 5', sublabel: 'Photography', accent: '#A463EE', bg: 'linear-gradient(135deg,#200050 0%,#5103AA 100%)', src: '/images/gallery/photos/5.png' },
  { id: 'p6', category: 'Photos', label: 'Photo 6', sublabel: 'Photography', accent: '#780FF0', bg: 'linear-gradient(135deg,#1A003A 0%,#3E0085 100%)', src: '/images/gallery/photos/6.png' },
  { id: 'p7', category: 'Photos', label: 'Photo 7', sublabel: 'Photography', accent: '#B98AEF', bg: 'linear-gradient(135deg,#2D0060 0%,#6509CE 100%)', src: '/images/gallery/photos/7.png' },
  { id: 'p8', category: 'Photos', label: 'Photo 8', sublabel: 'Photography', accent: '#8E3AEE', bg: 'linear-gradient(135deg,#1A003A 0%,#4A0090 100%)', src: '/images/gallery/photos/8.png' },
  // Branding  →  public/images/gallery/branding/
  { id: 'b1',  category: 'Branding', label: 'Branding Work 1',  sublabel: 'Brand Identity', accent: '#780FF0', bg: 'linear-gradient(135deg,#1A003A 0%,#3E0085 100%)', src: '/images/gallery/branding/1.png' },
  { id: 'b2',  category: 'Branding', label: 'Branding Work 2',  sublabel: 'Brand Identity', accent: '#8E3AEE', bg: 'linear-gradient(135deg,#1A003A 0%,#4A0090 100%)', src: '/images/gallery/branding/2.png' },
  { id: 'b3',  category: 'Branding', label: 'Branding Work 3',  sublabel: 'Brand Identity', accent: '#A463EE', bg: 'linear-gradient(135deg,#200050 0%,#5103AA 100%)', src: '/images/gallery/branding/3.png' },
  { id: 'b4',  category: 'Branding', label: 'Branding Work 4',  sublabel: 'Brand Identity', accent: '#780FF0', bg: 'linear-gradient(135deg,#1A003A 0%,#3E0085 100%)', src: '/images/gallery/branding/4.png' },
  { id: 'b5',  category: 'Branding', label: 'Branding Work 5',  sublabel: 'Brand Identity', accent: '#8E3AEE', bg: 'linear-gradient(135deg,#1A003A 0%,#4A0090 100%)', src: '/images/gallery/branding/5.png' },
  { id: 'b6',  category: 'Branding', label: 'Branding Work 6',  sublabel: 'Brand Identity', accent: '#A463EE', bg: 'linear-gradient(135deg,#200050 0%,#5103AA 100%)', src: '/images/gallery/branding/6.png' },
  { id: 'b7',  category: 'Branding', label: 'Branding Work 7',  sublabel: 'Brand Identity', accent: '#780FF0', bg: 'linear-gradient(135deg,#1A003A 0%,#3E0085 100%)', src: '/images/gallery/branding/7.png' },
  { id: 'b8',  category: 'Branding', label: 'Branding Work 8',  sublabel: 'Brand Identity', accent: '#B98AEF', bg: 'linear-gradient(135deg,#2D0060 0%,#6509CE 100%)', src: '/images/gallery/branding/8.png' },
  { id: 'b9',  category: 'Branding', label: 'Branding Work 9',  sublabel: 'Brand Identity', accent: '#8E3AEE', bg: 'linear-gradient(135deg,#1A003A 0%,#4A0090 100%)', src: '/images/gallery/branding/9.png' },
  { id: 'b10', category: 'Branding', label: 'Branding Work 10', sublabel: 'Brand Identity', accent: '#A463EE', bg: 'linear-gradient(135deg,#200050 0%,#5103AA 100%)', src: '/images/gallery/branding/10.png' },
  // Logo  →  public/images/gallery/logo/
  { id: 'l1', category: 'Logo', label: 'Logo Design 1', sublabel: 'Logo Design', accent: '#780FF0', bg: 'linear-gradient(135deg,#1A003A 0%,#3E0085 100%)', src: '/images/gallery/logo/1.png' },
  { id: 'l2', category: 'Logo', label: 'Logo Design 2', sublabel: 'Logo Design', accent: '#A463EE', bg: 'linear-gradient(135deg,#200050 0%,#5103AA 100%)', src: '/images/gallery/logo/2.png' },
  { id: 'l3', category: 'Logo', label: 'Logo Design 3', sublabel: 'Logo Design', accent: '#8E3AEE', bg: 'linear-gradient(135deg,#1A003A 0%,#4A0090 100%)', src: '/images/gallery/logo/3.png' },
  { id: 'l4', category: 'Logo', label: 'Logo Design 4', sublabel: 'Logo Design', accent: '#780FF0', bg: 'linear-gradient(135deg,#1A003A 0%,#3E0085 100%)', src: '/images/gallery/logo/4.png' },
  { id: 'l5', category: 'Logo', label: 'Logo Design 5', sublabel: 'Logo Design', accent: '#B98AEF', bg: 'linear-gradient(135deg,#2D0060 0%,#6509CE 100%)', src: '/images/gallery/logo/5.png' },
  { id: 'l6', category: 'Logo', label: 'Logo Design 6', sublabel: 'Logo Design', accent: '#A463EE', bg: 'linear-gradient(135deg,#200050 0%,#5103AA 100%)', src: '/images/gallery/logo/6.png' },
  // Packaging  →  public/images/gallery/packaging/
  { id: 'pk1', category: 'Packaging', label: 'Packaging Design 1', sublabel: 'Packaging Design', accent: '#8E3AEE', bg: 'linear-gradient(135deg,#1A003A 0%,#4A0090 100%)', src: '/images/gallery/packaging/1.png' },
  { id: 'pk2', category: 'Packaging', label: 'Packaging Design 2', sublabel: 'Packaging Design', accent: '#780FF0', bg: 'linear-gradient(135deg,#1A003A 0%,#3E0085 100%)', src: '/images/gallery/packaging/2.png' },
  { id: 'pk3', category: 'Packaging', label: 'Packaging Design 3', sublabel: 'Packaging Design', accent: '#A463EE', bg: 'linear-gradient(135deg,#200050 0%,#5103AA 100%)', src: '/images/gallery/packaging/3.png' },
  { id: 'pk4', category: 'Packaging', label: 'Packaging Design 4', sublabel: 'Packaging Design', accent: '#B98AEF', bg: 'linear-gradient(135deg,#2D0060 0%,#6509CE 100%)', src: '/images/gallery/packaging/4.png' },
  { id: 'pk5', category: 'Packaging', label: 'Packaging Design 5', sublabel: 'Packaging Design', accent: '#8E3AEE', bg: 'linear-gradient(135deg,#1A003A 0%,#4A0090 100%)', src: '/images/gallery/packaging/5.png' },
  { id: 'pk6', category: 'Packaging', label: 'Packaging Design 6', sublabel: 'Packaging Design', accent: '#780FF0', bg: 'linear-gradient(135deg,#1A003A 0%,#3E0085 100%)', src: '/images/gallery/packaging/6.png' },
  // Videos  →  public/images/gallery/videos/
  { id: 'v1', category: 'Videos', label: 'Video 1', sublabel: 'Reel / Promo', accent: '#A463EE', bg: 'linear-gradient(135deg,#200050 0%,#5103AA 100%)', src: '/images/gallery/videos/1.mp4' },
  { id: 'v2', category: 'Videos', label: 'Video 2', sublabel: 'Reel / Promo', accent: '#780FF0', bg: 'linear-gradient(135deg,#1A003A 0%,#3E0085 100%)', src: '/images/gallery/videos/2.mp4' },
  { id: 'v3', category: 'Videos', label: 'Video 3', sublabel: 'Reel / Promo', accent: '#8E3AEE', bg: 'linear-gradient(135deg,#1A003A 0%,#4A0090 100%)', src: '/images/gallery/videos/3.mp4' },
  { id: 'v4', category: 'Videos', label: 'Video 4', sublabel: 'Reel / Promo', accent: '#B98AEF', bg: 'linear-gradient(135deg,#2D0060 0%,#6509CE 100%)', src: '/images/gallery/videos/4.mp4' },
];

/* ─── Lightbox ─────────────────────────────────────────────────────────────── */
function Lightbox({
  item,
  onClose,
  onPrev,
  onNext,
  hasPrev,
  hasNext,
}: {
  item: GalleryItem;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  hasPrev: boolean;
  hasNext: boolean;
}) {
  const isVideo = item.src?.endsWith('.mp4');

  return (
    <motion.div
      key="lightbox-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 1000,
        background: 'rgba(5,5,5,0.92)',
        backdropFilter: 'blur(12px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '24px',
      }}
    >
      {/* Modal content — stop propagation so clicks inside don't close */}
      <motion.div
        key={item.id}
        initial={{ opacity: 0, scale: 0.92, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 10 }}
        transition={{ type: 'spring', stiffness: 300, damping: 28 }}
        onClick={(e) => e.stopPropagation()}
        style={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '16px',
          maxWidth: '90vw',
          maxHeight: '90vh',
        }}
      >
        {/* Asset */}
        {isVideo ? (
          <video
            src={item.src}
            autoPlay
            controls
            loop
            playsInline
            style={{
              maxWidth: '85vw',
              maxHeight: '75vh',
              borderRadius: '16px',
              border: `1px solid ${item.accent}33`,
              background: item.bg,
            }}
          />
        ) : item.src ? (
          <div style={{ position: 'relative', maxWidth: '85vw', maxHeight: '75vh' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={item.src}
              alt={item.label}
              style={{
                maxWidth: '85vw',
                maxHeight: '75vh',
                objectFit: 'contain',
                borderRadius: '16px',
                border: `1px solid ${item.accent}33`,
                display: 'block',
              }}
            />
          </div>
        ) : (
          <div style={{
            width: '600px', height: '400px', borderRadius: '16px',
            background: item.bg, border: `1px solid ${item.accent}33`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <span style={{ color: item.accent, opacity: 0.4, fontSize: '14px' }}>No preview</span>
          </div>
        )}

        {/* Label row */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
          <span style={{ color: '#6B6B6B', fontSize: '11px', fontFamily: 'Fragment Mono, monospace', textTransform: 'uppercase', letterSpacing: '0.12em' }}>
            {item.sublabel}
          </span>
          <span style={{ color: '#FFFFFF', fontSize: '15px', fontWeight: 700 }}>
            {item.label}
          </span>
        </div>
      </motion.div>

      {/* Close button */}
      <button
        onClick={onClose}
        style={{
          position: 'fixed', top: '20px', right: '20px',
          width: '40px', height: '40px', borderRadius: '50%',
          background: 'rgba(30,30,30,0.9)', border: '1px solid #525252',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', zIndex: 1001,
        }}
      >
        <X size={18} color="#FFFFFF" />
      </button>

      {/* Prev arrow */}
      {hasPrev && (
        <button
          onClick={(e) => { e.stopPropagation(); onPrev(); }}
          style={{
            position: 'fixed', left: '20px', top: '50%', transform: 'translateY(-50%)',
            width: '44px', height: '44px', borderRadius: '50%',
            background: 'rgba(30,30,30,0.9)', border: '1px solid #525252',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', zIndex: 1001,
          }}
        >
          <ChevronLeft size={22} color="#FFFFFF" />
        </button>
      )}

      {/* Next arrow */}
      {hasNext && (
        <button
          onClick={(e) => { e.stopPropagation(); onNext(); }}
          style={{
            position: 'fixed', right: '20px', top: '50%', transform: 'translateY(-50%)',
            width: '44px', height: '44px', borderRadius: '50%',
            background: 'rgba(30,30,30,0.9)', border: '1px solid #525252',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', zIndex: 1001,
          }}
        >
          <ChevronRight size={22} color="#FFFFFF" />
        </button>
      )}
    </motion.div>
  );
}

/* ─── Card ──────────────────────────────────────────────────────────────────── */
function GalleryCard({ item, index, onClick }: { item: GalleryItem; index: number; onClick: () => void }) {
  const [hovered, setHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isVideo = item.src?.endsWith('.mp4');

  const handleMouseEnter = () => {
    setHovered(true);
    if (isVideo && videoRef.current) videoRef.current.play();
  };
  const handleMouseLeave = () => {
    setHovered(false);
    if (isVideo && videoRef.current) { videoRef.current.pause(); videoRef.current.currentTime = 0; }
  };

  return (
    <motion.div
      layout
      key={item.id}
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.88 }}
      transition={{ duration: 0.35, delay: index * 0.05 }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        position: 'relative',
        borderRadius: '16px',
        overflow: 'hidden',
        aspectRatio: '4/3',
        border: `1px solid ${hovered ? item.accent + '55' : '#525252'}`,
        background: item.bg,
        cursor: 'zoom-in',
        transition: 'border-color 0.3s, transform 0.2s',
        transform: hovered ? 'scale(1.02)' : 'scale(1)',
      }}
    >
      {/* Media */}
      {isVideo ? (
        <>
          <video
            ref={videoRef}
            src={item.src}
            muted
            loop
            playsInline
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.85 }}
          />
          <motion.div
            animate={{ opacity: hovered ? 0 : 1 }}
            transition={{ duration: 0.2 }}
            style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1 }}
          >
            <div style={{
              width: '52px', height: '52px', borderRadius: '50%',
              background: 'rgba(31,30,31,0.6)', backdropFilter: 'blur(8px)',
              border: `1px solid ${item.accent}55`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Play size={20} color={item.accent} fill={item.accent} />
            </div>
          </motion.div>
        </>
      ) : item.src ? (
        <Image src={item.src} alt={item.label} fill style={{ objectFit: 'cover', opacity: 0.85 }} />
      ) : (
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0.12 }}>
          <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
            <rect x="8" y="8" width="48" height="48" rx="8" stroke={item.accent} strokeWidth="2" />
            <circle cx="24" cy="24" r="6" stroke={item.accent} strokeWidth="2" />
            <path d="M8 44L22 30L30 38L42 26L56 40" stroke={item.accent} strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>
      )}

      {/* Category pill */}
      <div style={{
        position: 'absolute', top: '12px', left: '12px', zIndex: 3,
        padding: '4px 10px', borderRadius: '999px',
        background: 'rgba(31,30,31,0.75)', backdropFilter: 'blur(8px)',
        border: `1px solid ${item.accent}33`,
      }}>
        <span style={{ color: item.accent, fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em', fontFamily: 'Fragment Mono, monospace', textTransform: 'uppercase' }}>
          {item.category}
        </span>
      </div>

      {/* Hover overlay */}
      <motion.div
        initial={false}
        animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 10 }}
        transition={{ duration: 0.25 }}
        style={{
          position: 'absolute', inset: 0, zIndex: 2,
          background: 'linear-gradient(to top, rgba(31,30,31,0.92) 0%, rgba(31,30,31,0.4) 55%, transparent 100%)',
          display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
          padding: '18px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '8px' }}>
          <div>
            <p style={{ color: '#9E9E9E', fontSize: '11px', marginBottom: '4px', fontFamily: 'Fragment Mono, monospace', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              {item.sublabel}
            </p>
            <p style={{ color: '#FFFFFF', fontSize: '14px', fontWeight: 700, lineHeight: 1.3 }}>
              {item.label}
            </p>
          </div>
          <div style={{
            width: '32px', height: '32px', borderRadius: '50%', flexShrink: 0,
            background: item.accent, display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <ArrowUpRight size={16} color="#FFFFFF" strokeWidth={2.5} />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─── Main ──────────────────────────────────────────────────────────────────── */
export default function Gallery() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const [active, setActive] = useState<Category>('All');
  const [lightboxId, setLightboxId] = useState<string | null>(null);

  const filtered = active === 'All' ? items : items.filter(i => i.category === active);
  const lightboxIndex = filtered.findIndex(i => i.id === lightboxId);
  const lightboxItem = lightboxIndex >= 0 ? filtered[lightboxIndex] : null;

  const closeLightbox = useCallback(() => setLightboxId(null), []);
  const goPrev = useCallback(() => {
    if (lightboxIndex > 0) setLightboxId(filtered[lightboxIndex - 1].id);
  }, [lightboxIndex, filtered]);
  const goNext = useCallback(() => {
    if (lightboxIndex < filtered.length - 1) setLightboxId(filtered[lightboxIndex + 1].id);
  }, [lightboxIndex, filtered]);

  // ESC + arrow key navigation
  useEffect(() => {
    if (!lightboxId) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') goPrev();
      if (e.key === 'ArrowRight') goNext();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [lightboxId, closeLightbox, goPrev, goNext]);

  // Lock scroll when open
  useEffect(() => {
    document.body.style.overflow = lightboxId ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [lightboxId]);

  return (
    <section style={{ background: '#1F1E1F', padding: '96px 0', borderTop: '1px solid #525252' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>

        {/* Header */}
        <div ref={ref} style={{ marginBottom: '48px' }}>
          <motion.span
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            className="section-tag"
            style={{ display: 'inline-block', marginBottom: '14px' }}
          >
            Gallery
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.7 }}
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 900, color: '#FFFFFF', lineHeight: 1.15, letterSpacing: '-0.5px' }}
          >
            A Glimpse of{' '}
            <span style={{ color: '#780FF0' }}>Our Works</span>
          </motion.h2>
        </div>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.35 }}
          style={{ display: 'flex', gap: '4px', marginBottom: '40px', flexWrap: 'wrap' }}
        >
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActive(tab)}
              style={{
                position: 'relative', padding: '8px 20px', borderRadius: '999px',
                border: 'none', background: 'transparent',
                color: active === tab ? '#780FF0' : '#6B6B6B',
                fontSize: '13px', fontWeight: 600, cursor: 'pointer',
                transition: 'color 0.2s', outline: 'none',
              }}
            >
              {active === tab && (
                <motion.span
                  layoutId="tab-pill"
                  style={{
                    position: 'absolute', inset: 0, borderRadius: '999px',
                    border: '1px solid rgba(120,15,240,0.35)',
                    background: 'rgba(120,15,240,0.08)',
                  }}
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              <span style={{ position: 'relative', zIndex: 1 }}>{tab}</span>
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <AnimatePresence mode="popLayout">
          <motion.div
            key={active}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}
          >
            {filtered.map((item, i) => (
              <GalleryCard
                key={item.id}
                item={item}
                index={i}
                onClick={() => setLightboxId(item.id)}
              />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxItem && (
          <Lightbox
            item={lightboxItem}
            onClose={closeLightbox}
            onPrev={goPrev}
            onNext={goNext}
            hasPrev={lightboxIndex > 0}
            hasNext={lightboxIndex < filtered.length - 1}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
