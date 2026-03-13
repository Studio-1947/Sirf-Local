"use client";

import { motion, AnimatePresence, useInView } from "framer-motion";
import { useRef, useState, useMemo } from "react";
import Image from "next/image";
import { Play, X, ArrowLeft, ArrowRight } from "lucide-react";
import { useCarousel } from "@/hooks/use-carousel";

type Category = "Photos" | "Branding" | "Logo" | "Packaging" | "Videos";

interface GalleryItem {
  id: string;
  category: Category;
  label: string;
  sublabel: string;
  src?: string;
}

const TABS: Category[] = ["Photos", "Branding", "Logo", "Packaging", "Videos"];

const items: GalleryItem[] = [
  // Photos
  { id: 'p1', category: 'Photos', label: 'Landscape Study', sublabel: 'Photography', src: '/images/gallery/photos/1.png' },
  { id: 'p2', category: 'Photos', label: 'Local Portraits', sublabel: 'Photography', src: '/images/gallery/photos/2.png' },
  { id: 'p3', category: 'Photos', label: 'Studio Capture', sublabel: 'Photography', src: '/images/gallery/photos/3.png' },
  { id: 'p4', category: 'Photos', label: 'Himalayan Light', sublabel: 'Photography', src: '/images/gallery/photos/4.png' },
  { id: 'p5', category: 'Photos', label: 'Local Context', sublabel: 'Photography', src: '/images/gallery/photos/5.png' },
  { id: 'p6', category: 'Photos', label: 'Shadow Play', sublabel: 'Photography', src: '/images/gallery/photos/6.png' },
  { id: 'p7', category: 'Photos', label: 'Atmospheric Depth', sublabel: 'Photography', src: '/images/gallery/photos/7.png' },
  { id: 'p8', category: 'Photos', label: 'Regional Narrative', sublabel: 'Photography', src: '/images/gallery/photos/8.png' },
  // Branding
  { id: 'b1', category: 'Branding', label: 'Studio Identity', sublabel: 'Brand System', src: '/images/gallery/branding/1.png' },
  { id: 'b2', category: 'Branding', label: 'Visual Audit', sublabel: 'Strategy', src: '/images/gallery/branding/2.png' },
  { id: 'b3', category: 'Branding', label: 'Brand Book', sublabel: 'Design', src: '/images/gallery/branding/3.png' },
  { id: 'b4', category: 'Branding', label: 'Market Study', sublabel: 'Positioning', src: '/images/gallery/branding/4.png' },
  { id: 'b5', category: 'Branding', label: 'Color Theory', sublabel: 'Identity', src: '/images/gallery/branding/5.png' },
  { id: 'b6', category: 'Branding', label: 'Typography Stack', sublabel: 'System', src: '/images/gallery/branding/6.png' },
  { id: 'b7', category: 'Branding', label: 'Digital Presence', sublabel: 'Social', src: '/images/gallery/branding/7.png' },
  { id: 'b8', category: 'Branding', label: 'Brand Guidelines', sublabel: 'Manual', src: '/images/gallery/branding/8.png' },
  { id: 'b9', category: 'Branding', label: 'Visual Language', sublabel: 'Aesthetic', src: '/images/gallery/branding/9.png' },
  { id: 'b10', category: 'Branding', label: 'Studio Showcase', sublabel: 'Portfolio', src: '/images/gallery/branding/10.png' },
  // Logo
  { id: 'l1', category: 'Logo', label: 'Modern Script', sublabel: 'Identity', src: '/images/gallery/logo/1.png' },
  { id: 'l2', category: 'Logo', label: 'Geometric Mark', sublabel: 'Symbol', src: '/images/gallery/logo/2.png' },
  { id: 'l3', category: 'Logo', label: 'Technical Logomark', sublabel: 'Precision', src: '/images/gallery/logo/3.png' },
  { id: 'l4', category: 'Logo', label: 'Minimalist Icon', sublabel: 'Branding', src: '/images/gallery/logo/4.png' },
  { id: 'l5', category: 'Logo', label: 'Corporate Mark', sublabel: 'Identity', src: '/images/gallery/logo/5.png' },
  { id: 'l6', category: 'Logo', label: 'Custom Letterform', sublabel: 'Typography', src: '/images/gallery/logo/6.png' },
  // Packaging
  { id: 'pk1', category: 'Packaging', label: 'SKU System', sublabel: 'Print Design', src: '/images/gallery/packaging/1.png' },
  { id: 'pk2', category: 'Packaging', label: 'Structure', sublabel: 'Design', src: '/images/gallery/packaging/2.png' },
  { id: 'pk3', category: 'Packaging', label: 'Product Label', sublabel: 'Packaging', src: '/images/gallery/packaging/3.png' },
  { id: 'pk4', category: 'Packaging', label: 'Custom Wrap', sublabel: 'Print', src: '/images/gallery/packaging/4.png' },
  { id: 'pk5', category: 'Packaging', label: 'Retail System', sublabel: 'Commerce', src: '/images/gallery/packaging/5.png' },
  { id: 'pk6', category: 'Packaging', label: 'Branded Parcel', sublabel: 'Logistics', src: '/images/gallery/packaging/6.png' },
  // Videos
  { id: 'v1', category: 'Videos', label: 'Studio Reel', sublabel: 'Motion', src: '/images/gallery/videos/1.mp4' },
  { id: 'v2', category: 'Videos', label: 'Local Story', sublabel: 'Film', src: '/images/gallery/videos/2.mp4' },
  { id: 'v3', category: 'Videos', label: 'Promo Capture', sublabel: 'Advertising', src: '/images/gallery/videos/3.mp4' },
  { id: 'v4', category: 'Videos', label: 'Technical Flow', sublabel: 'Animation', src: '/images/gallery/videos/4.mp4' },
];

function GalleryCard({ item, index, onClick }: { item: GalleryItem; index: number; onClick: () => void }) {
  const isVideo = item.src?.endsWith(".mp4");
  const watermarkId = `${item.category.slice(0, 3).toUpperCase()}-${String(index + 1).padStart(2, "0")}`;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      onClick={onClick}
      className="group relative aspect-[4/3] rounded-3xl overflow-hidden border border-white/5 bg-white/[0.01] backdrop-blur-xl cursor-zoom-in transition-all duration-500 hover:border-white/10 h-full"
    >
      <div className="absolute inset-0 flex items-center justify-center font-mono-display text-[80px] font-black text-white/[0.01] select-none leading-none pointer-events-none group-hover:text-white/[0.03] group-hover:scale-110 transition-all duration-700">
        {watermarkId}
      </div>

      <div className="absolute inset-0 z-10 overflow-hidden">
        {isVideo ? (
          <div className="w-full h-full relative">
             <video src={item.src} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-700" muted loop playsInline />
             <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white group-hover:scale-110 transition-all">
                   <Play size={20} fill="currentColor" />
                </div>
             </div>
          </div>
        ) : (
          <Image src={item.src!} alt={item.label} fill className="object-cover opacity-80 group-hover:opacity-100 transition-all duration-1000 group-hover:scale-110" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-transparent to-transparent opacity-60" />
      </div>

      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-30">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
      </div>
    </motion.div>
  );
}

function Lightbox({ item, onClose }: { item: GalleryItem; onClose: () => void }) {
  const isVideo = item.src?.endsWith(".mp4");
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 z-[100] bg-bg-primary/95 backdrop-blur-2xl flex items-center justify-center p-6 md:p-12">
       <button className="absolute top-8 right-8 w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-accent transition-colors z-10"><X size={24} /></button>
       <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} onClick={e => e.stopPropagation()} className="relative max-w-6xl w-full aspect-video rounded-3xl overflow-hidden border border-white/5 shadow-2xl">
          {isVideo ? (
            <video src={item.src} controls autoPlay className="w-full h-full object-contain" />
          ) : (
            <Image src={item.src!} alt={item.label} fill className="object-contain" />
          )}
       </motion.div>
    </motion.div>
  );
}

export default function Gallery() {
  const containerRef = useRef(null);
  const inView = useInView(containerRef, { once: true, margin: "-100px" });
  const [activeTab, setActiveTab] = useState<Category>("Photos");
  const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null);

  const filteredItems = useMemo(() => items.filter(i => i.category === activeTab), [activeTab]);
  const GAP = 24;

  const {
    trackRef,
    currentIndex,
    maxIndex,
    itemsPerView,
    scrollTo,
    prev,
    next,
    onScroll,
  } = useCarousel({
    itemCount: filteredItems.length,
    gap: GAP,
  });

  return (
    <section id="gallery" className="bg-bg-primary py-32 border-t border-white/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header row */}
        <div ref={containerRef} className="flex flex-col md:flex-row items-end justify-between mb-12 gap-8">
          <div className="max-w-2xl">
            <motion.span initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} className="section-tag block mb-4">Studio Portfolio</motion.span>
            <motion.h2 initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2 }} className="text-5xl md:text-7xl font-black text-white leading-tight tracking-tighter">
              Visual <span className="text-accent">Artifacts.</span>
            </motion.h2>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={prev}
              disabled={currentIndex === 0}
              className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white hover:border-white/40 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              aria-label="Previous artifacts"
            >
              <ArrowLeft size={18} />
            </button>
            <button
              onClick={next}
              disabled={currentIndex >= maxIndex}
              className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white hover:border-white/40 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              aria-label="Next artifacts"
            >
              <ArrowRight size={18} />
            </button>
          </div>
        </div>

        {/* Technical Tabs (Static for easy selection) */}
        <div className="flex flex-wrap gap-2 mb-16">
           {TABS.map(tab => (
             <button
               key={tab}
               onClick={() => {
                 setActiveTab(tab);
                 scrollTo(0); // Reset carousel on tab change
               }}
               className={`px-6 py-2.5 rounded-full text-xs font-bold font-mono-display uppercase tracking-widest transition-all duration-300 border shrink-0 ${
                 activeTab === tab ? 'bg-white border-white text-bg-primary shadow-[0_0_20px_rgba(255,255,255,0.3)]' : 'bg-white/5 border-white/10 text-white/30 hover:border-white/20'
               }`}
             >
               {tab}
             </button>
           ))}
        </div>

        {/* Portfolio Carousel */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="relative group/carousel"
        >
           {/* Fade Masks */}
           <div className="absolute inset-y-0 left-0 w-24 z-10 pointer-events-none bg-gradient-to-r from-bg-primary to-transparent opacity-0 group-hover/carousel:opacity-100 transition-opacity" />
           <div className="absolute inset-y-0 right-0 w-24 z-10 pointer-events-none bg-gradient-to-l from-bg-primary to-transparent opacity-0 group-hover/carousel:opacity-100 transition-opacity" />

           <div
             ref={trackRef}
             onScroll={onScroll}
             className="flex overflow-x-auto no-scrollbar scroll-smooth-manual grab-cursor"
             style={{
               gap: GAP,
               scrollSnapType: "x mandatory",
             }}
           >
             {filteredItems.map((item, i) => (
               <div 
                 key={item.id} 
                 className="shrink-0 scroll-snap-start"
                 style={{
                   flex: `0 0 calc((100% - ${GAP * (itemsPerView - 1)}px) / ${itemsPerView})`,
                   minWidth: 0,
                 }}
               >
                 <GalleryCard item={item} index={i} onClick={() => setLightboxItem(item)} />
               </div>
             ))}
           </div>
        </motion.div>

        {/* Lightbox */}
        <AnimatePresence>
           {lightboxItem && <Lightbox item={lightboxItem} onClose={() => setLightboxItem(null)} />}
        </AnimatePresence>

      </div>
    </section>
  );
}
