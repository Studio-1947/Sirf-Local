"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import CountUp from "./CountUp";

interface Step {
  num: string;
  title: string;
  text: string;
}

const steps: Step[] = [
  { num: "01", title: "Project Brief", text: "You provide the vision, we define the strategy." },
  { num: "02", title: "Local Audit", text: "We survey the market to ensure regional relevance." },
  { num: "03", title: "Fellowship", text: "We activate local talent via Himal Nagrik Fellows." },
  { num: "04", title: "Studio Build", text: "Our experts engineer your digital infrastructure." },
  { num: "05", title: "Revenue Flow", text: "Wealth stays and grows within the local community." },
  { num: "06", title: "Shared Growth", text: "We grow together as a sustainable regional ecosystem." },
];

function ProtocolTab({ step, active, onHover }: { step: Step; active: boolean; onHover: () => void }) {
  return (
    <div 
      onMouseEnter={onHover}
      className={`group relative py-6 border-b border-white/5 cursor-pointer transition-all duration-500 ${active ? 'pl-8' : 'pl-0'}`}
    >
       <div className="flex items-center gap-6">
          <span className={`font-mono-display text-xs transition-colors duration-500 ${active ? 'text-accent' : 'text-text-muted'}`}>
            CODE-{step.num}
          </span>
          <h4 className={`text-xl font-bold transition-colors duration-500 ${active ? 'text-white' : 'text-text-secondary group-hover:text-white'}`}>
            {step.title}
          </h4>
       </div>

       <AnimatePresence>
          {active && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: "circOut" }}
              className="overflow-hidden"
            >
               <p className="text-text-secondary text-sm leading-relaxed mt-4 max-w-sm opacity-80">
                 {step.text}
               </p>
            </motion.div>
          )}
       </AnimatePresence>

       {/* Interactive Vertical Beam */}
       <div className={`absolute left-0 top-0 bottom-0 w-1 bg-accent transition-all duration-500 transform origin-top ${active ? 'scale-y-100' : 'scale-y-0'}`} />
    </div>
  );
}

export default function About() {
  const containerRef = useRef(null);
  const inView = useInView(containerRef, { once: true, margin: "-100px" });
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section id="about" className="bg-bg-primary py-40 border-t border-border relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        <div className="grid lg:grid-cols-2 gap-24 items-start">
          
          {/* Left: The Manifesto */}
          <div ref={containerRef}>
            <motion.span initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} className="section-tag block mb-8">Initiative by Studio 1947</motion.span>
            
            <motion.h2 
              initial={{ opacity: 0, y: 30 }} 
              animate={inView ? { opacity: 1, y: 0 } : {}} 
              transition={{ delay: 0.2 }}
              className="text-6xl md:text-8xl font-black text-white leading-[0.9] tracking-tighter mb-12"
            >
              Inclusive. <br />
              <span className="text-accent italic">Affordable.</span> <br />
              Global.
            </motion.h2>

            <motion.p 
              initial={{ opacity: 0, y: 20 }} 
              animate={inView ? { opacity: 1, y: 0 } : {}} 
              transition={{ delay: 0.4 }}
              className="text-text-secondary text-lg leading-relaxed max-w-lg opacity-80"
            >
              Sirf Local is a Himalayan design studio empowering regional brands through world-class data, design, and technology. Rooted in Mirik, built for impact.
            </motion.p>

            {/* Stats Row (Bolder & More Prominent) */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={inView ? { opacity: 1, y: 0 } : {}} 
              transition={{ delay: 0.5 }}
              className="flex flex-wrap items-center gap-16 mt-16 pt-12 border-t border-white/5"
            >
               {[
                 { val: 10, suffix: "+", label: "Partners" },
                 { val: 98, suffix: "%", label: "Success" },
                 { val: 2, suffix: "+", label: "Months" }
               ].map((stat) => (
                 <div key={stat.label} className="relative last:after:hidden after:content-[''] after:absolute after:-right-8 after:top-1/2 after:-translate-y-1/2 after:w-px after:h-10 after:bg-white/10">
                    <p className="text-white font-black text-5xl tracking-tighter leading-none"><CountUp value={stat.val} suffix={stat.suffix} /></p>
                    <p className="text-[10px] font-mono-display text-accent font-bold uppercase tracking-[0.3em] mt-3">{stat.label}</p>
                 </div>
               ))}
            </motion.div>
          </div>

          {/* Right: Interactive Protocol Tabs */}
          <div className="relative pt-12">
             <div className="flex items-center gap-4 mb-12">
                <span className="font-mono-display text-[10px] text-text-muted uppercase tracking-[0.3em]">Operational Protocol</span>
                <div className="h-px flex-1 bg-white/5" />
             </div>

             <div className="flex flex-col">
                {steps.map((step, i) => (
                  <ProtocolTab 
                    key={step.num} 
                    step={step} 
                    active={activeIndex === i} 
                    onHover={() => setActiveIndex(i)} 
                  />
                ))}
             </div>
          </div>

        </div>

        {/* End of section spacing */}
        <div className="mt-20" />
      </div>
    </section>
  );
}
