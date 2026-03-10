"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import CountUp from "./CountUp";

const steps = [
  { num: "01", text: "You give us the project" },
  { num: "02", text: "We do your brand survey" },
  { num: "03", text: "We hire a local youth in Himal Nagrik Fellowship" },
  {
    num: "04",
    text: "We build solution with our experts and Himal Nagrik Fellow",
  },
  { num: "05", text: "Money flows within the community" },
  { num: "06", text: "We all grow" },
];

function StepItem({ step, index }: { step: (typeof steps)[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -30 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="flex items-start gap-6 py-6 border-b border-[#525252] group hover:border-[#780FF0]/40 transition-colors"
    >
      <span className="font-mono-display text-[#FFFFFF] group-hover:text-[#780FF0] transition-colors text-sm pt-1 min-w-[32px]">
        {step.num}
      </span>
      <p className="text-[#FFFFFF] text-lg font-medium group-hover:text-[#780FF0] transition-colors">
        {step.text}
      </p>
    </motion.div>
  );
}

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="bg-[#1F1E1F] py-28">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          {/* Left */}
          <div ref={ref}>
            <motion.span
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.1 }}
              className="section-tag block mb-5"
            >
              An Initiative by Studio1947
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.7 }}
              className="text-4xl md:text-5xl font-black text-[#FFFFFF] leading-tight mb-6"
            >
              Accessible, <span className="text-[#780FF0]">Affordable,</span>{" "}
              &amp; Inclusive for Local Businesses
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.35 }}
              className="text-[#9E9E9E] text-base leading-relaxed mb-8"
            >
              Sirf Local is an initiative by Studio 1947 for empowering local
              businesses through data, design, technology, communication &amp;
              research based solutions. We are based in Mirik, Darjeeling:
              rooted in local wisdom, designed for global impact.
            </motion.p>

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.45 }}
              className="flex gap-8"
            >
              <div>
                <p className="text-4xl font-black text-[#FFFFFF]">
                  <CountUp value={10} suffix="+" />
                </p>
                <p className="text-sm text-[#9E9E9E] mt-1">
                  Clients Across India
                </p>
              </div>
              <div className="w-px bg-[#525252]" />
              <div>
                <p className="text-4xl font-black text-[#FFFFFF]">
                  <CountUp value={98} suffix="%" />
                </p>
                <p className="text-sm text-[#9E9E9E] mt-1">Success Rate</p>
              </div>
              <div className="w-px bg-[#525252]" />
              <div>
                <p className="text-4xl font-black text-[#FFFFFF]">
                  <CountUp value={2} suffix="+" />
                </p>
                <p className="text-sm text-[#9E9E9E] mt-1">Years Building</p>
              </div>
            </motion.div>
          </div>

          {/* Right — How It Works */}
          <div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.2 }}
              className="text-[#9E9E9E] text-sm uppercase tracking-widest mb-6 font-mono-display"
            >
              How It Works
            </motion.p>
            {steps.map((step, i) => (
              <StepItem key={step.num} step={step} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
