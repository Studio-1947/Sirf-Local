'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';

const team = [
  { name: 'Anjali Chettri',     role: 'Co-Founder',          img: '/images/team/anjali.png',      color: 'var(--accent-secondary)' },
  { name: 'Ankita Chettri',     role: 'Sales',               img: '/images/team/ankita.png',      color: 'var(--text-secondary)' },
  { name: 'Anushiya Thapa',     role: 'Content Manager',     img: '/images/team/anushiya.png',    color: 'var(--text-secondary)' },
  { name: 'Astha Chettri',      role: 'Multimedia Designer', img: '/images/team/astha.png',       color: 'var(--accent)' },
  { name: 'Nikhil Raj Subba',   role: 'Marketing',           img: '/images/team/nikhil.png',      color: 'var(--accent)' },
  { name: 'Rahul Chetrii',      role: 'Data & Tech',         img: '/images/team/rahul.png',       color: 'var(--accent)' },
  { name: 'Sankhadipta Bose',   role: 'Data & Tech',         img: '/images/team/sankhadipta.png', color: 'var(--accent-secondary)' },
  { name: 'Subhendu Kundu',     role: 'Co-Founder',          img: '/images/team/Subhendu.png',    color: 'var(--accent)' },
  { name: 'Zahid Ansari',       role: 'Storytelling',        img: '/images/team/zahid.png',       color: 'var(--accent-secondary)' },
];

function TeamCard({ member, index }: { member: typeof team[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const watermarkId = String(index + 1).padStart(2, "0");

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: (index % 4) * 0.1 }}
      className="group relative overflow-hidden rounded-2xl bg-white/[0.02] backdrop-blur-xl border border-white/5 hover:border-white/10 transition-all duration-500"
    >
      {/* Background ID Watermark */}
      <div className="absolute -top-2 -right-1 font-mono-display text-[80px] font-black text-white/[0.02] select-none leading-none pointer-events-none group-hover:text-white/[0.04] group-hover:scale-110 transition-all duration-700">
        {watermarkId}
      </div>

      {/* Image Container */}
      <div className="aspect-[2/3] overflow-hidden relative">
        <Image
          src={member.img}
          alt={member.name}
          width={300}
          height={400}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-bg-primary/10 to-transparent opacity-90" />
      </div>

      {/* Info Overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
        <span className="font-mono-display text-text-secondary text-[9px] uppercase tracking-[0.2em] font-bold block mb-1">
          {watermarkId}
        </span>
        <p className="text-white font-bold text-sm leading-tight">
          {member.name}
        </p>
        <p className="text-[10px] font-mono-display tracking-[0.12em] uppercase mt-0.5 text-text-secondary opacity-70">
          {member.role}
        </p>
      </div>

      {/* Hover Glow Accents (Top & Bottom Beams) */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent to-transparent" />
      </div>

      {/* Subtle corner light */}
      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/10 rounded-tl-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </motion.div>
  );
}

export default function Team() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="team" className="bg-bg-primary py-28 border-t border-border">
      <div className="max-w-7xl mx-auto px-6">
        <div ref={ref} className="mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            className="section-tag block mb-4"
          >
            The Team
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="text-4xl md:text-6xl font-black text-text-primary leading-tight"
          >
            People Behind<br />
            <span className="text-accent">Your Growth</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.35, duration: 0.6 }}
            className="mt-5 text-text-secondary text-lg max-w-xl leading-relaxed"
          >
            A small but mighty crew of designers, strategists, and storytellers — all obsessed with making local businesses thrive.
          </motion.p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
          {team.map((member, i) => (
            <TeamCard key={member.name} member={member} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
