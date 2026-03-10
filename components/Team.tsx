'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';

const team = [
  { name: 'Anjali Chettri',     role: 'Co-Founder',          img: '/images/team/anjali.png',      color: '#A463EE' },
  { name: 'Nikhil Raj Subba',   role: 'Marketing',           img: '/images/team/nikhil.png',      color: '#780FF0' },
  { name: 'Anushiya Thapa',     role: 'Content Manager',     img: '/images/team/anushiya.png',    color: '#9E9E9E' },
  { name: 'Zahid Ansari',       role: 'Storytelling',        img: '/images/team/zahid.png',       color: '#A463EE' },
  { name: 'Rahul Chetrii',      role: 'Data & Tech',         img: '/images/team/rahul.png',       color: '#780FF0' },
  { name: 'Ankita Chettri',     role: 'Sales',               img: '/images/team/ankita.png',      color: '#9E9E9E' },
  { name: 'Sankhadipta Bose',   role: 'Data & Tech',         img: '/images/team/sankhadipta.png', color: '#A463EE' },
  { name: 'Astha Chettri',      role: 'Multimedia Designer', img: '/images/team/astha.png',       color: '#780FF0' },
];

function TeamCard({ member, index }: { member: typeof team[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: (index % 4) * 0.1 }}
      className="group relative overflow-hidden rounded-2xl bg-[#1F1E1F] border border-[#525252] hover:border-[#780FF0]/40 transition-all"
    >
      {/* Image */}
      <div className="aspect-square overflow-hidden">
        <Image
          src={member.img}
          alt={member.name}
          width={400}
          height={400}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Gradient overlay — transparent top → solid black bottom */}
      <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, #000000 0%, rgba(0,0,0,0.6) 40%, transparent 100%)' }} />

      {/* Info */}
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <p className="text-[#FFFFFF] font-bold text-base leading-tight">{member.name}</p>
        <p
          className="text-xs font-mono-display tracking-widest mt-0.5"
          style={{ color: member.color }}
        >
          {member.role}
        </p>
      </div>
    </motion.div>
  );
}

export default function Team() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="team" className="bg-[#1F1E1F] py-28 border-t border-[#525252]">
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
            className="text-4xl md:text-6xl font-black text-[#FFFFFF] leading-tight"
          >
            People Behind{' '}
            <span className="text-[#780FF0]">Your Growth</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {team.map((member, i) => (
            <TeamCard key={member.name} member={member} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
