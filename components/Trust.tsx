'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import { MapPin, Users, Lightbulb, TreeDeciduous } from 'lucide-react';

interface Value {
  icon: React.ReactNode;
  label: string;
  code: string;
}

const values: Value[] = [
  { icon: <MapPin size={18} strokeWidth={1.5} />, label: 'Based in Mirik, Darjeeling', code: 'LOC-01' },
  { icon: <Users size={18} strokeWidth={1.5} />, label: 'Community-First Approach', code: 'SOC-02' },
  { icon: <Lightbulb size={18} strokeWidth={1.5} />, label: 'Local Youth Empowerment', code: 'EDU-03' },
  { icon: <TreeDeciduous size={18} strokeWidth={1.5} />, label: 'Himal Nagrik Fellowship', code: 'INIT-04' },
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

function ValueModule({ value, index }: { value: Value; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="group relative p-6 rounded-3xl border border-white/5 bg-white/[0.01] backdrop-blur-xl hover:bg-white/[0.02] transition-all duration-500 overflow-hidden flex flex-col justify-between min-h-[160px]"
    >
       <div className="relative z-10">
          <div className="mt-4 w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/40 group-hover:bg-accent group-hover:text-white transition-all duration-500 group-hover:border-accent/40">
             {value.icon}
          </div>
       </div>
       <p className="relative z-10 text-white font-bold text-sm leading-snug mt-4">{value.label}</p>
       <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
       <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </motion.div>
  );
}

export default function Trust() {
  const containerRef = useRef(null);
  const inView = useInView(containerRef, { once: true, margin: '-100px' });

  return (
    <section id="trust" className="bg-bg-primary py-32 border-t border-border overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        <div ref={containerRef} className="mb-16">
          <motion.span initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} className="section-tag block mb-4">Verification & Community</motion.span>
          <motion.h2 initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2 }} className="text-5xl md:text-7xl font-black text-white leading-tight tracking-tighter">
            Rooted in <span className="text-accent italic">Mirik.</span> <br />
            Designed for the World.
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
            className="lg:col-span-2 relative p-10 md:p-16 rounded-[2.5rem] border border-white/5 bg-white/[0.01] backdrop-blur-2xl overflow-hidden flex flex-col justify-center"
          >
            <div className="absolute -top-10 -right-10 font-mono-display text-[200px] font-black text-white/[0.01] select-none pointer-events-none uppercase">Trust</div>
            <h3 className="text-3xl font-bold text-white mb-6 leading-tight max-w-lg">We aren&apos;t a faceless corporation. We are your neighbors.</h3>
            <p className="text-text-secondary text-lg leading-relaxed max-w-xl opacity-80">Sirf Local empowers local businesses with Data, Design, and Tech. When you work with us, you are a partner in the regional ecosystem.</p>
          </motion.div>

          <div className="grid grid-cols-2 gap-4">
             {values.map((v, i) => (
               <ValueModule key={v.label} value={v} index={i} />
             ))}
          </div>
        </div>

        <div className="relative mt-20">
           <div className="absolute inset-y-0 left-0 w-32 z-10 pointer-events-none bg-gradient-to-r from-bg-primary to-transparent" />
           <div className="absolute inset-y-0 right-0 w-32 z-10 pointer-events-none bg-gradient-to-l from-bg-primary to-transparent" />

           <div className="flex overflow-hidden">
              <div className="flex animate-marquee gap-6">
                 {[...images, ...images].map((src, i) => (
                   <div 
                     key={i} 
                     className="relative w-[300px] md:w-[450px] aspect-[16/10] rounded-3xl overflow-hidden border border-white/5 grayscale hover:grayscale-0 transition-all duration-700"
                   >
                      <Image src={src} alt="Community" fill className="object-cover transition-transform duration-1000 hover:scale-110" />
                   </div>
                 ))}
              </div>
           </div>
        </div>

      </div>
    </section>
  );
}
