"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import { motion, useInView, useAnimationFrame, animate } from "framer-motion";
import {
  MagnifyingGlass,
  Blueprint,
  ChartBar,
  Robot,
  CloudArrowUp,
  AppWindow,
  Palette,
  Megaphone,
  FilmStrip,
} from "@phosphor-icons/react";
import { ArrowLeft, ArrowRight } from "lucide-react";

/* ── Hover border beam ─────────────────────────────────────────── */
function HoverBorderBeam({
  isHovered,
  filterId,
}: {
  isHovered: boolean;
  filterId: string;
}) {
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
    if (
      !sharpRef.current ||
      !glowRef.current ||
      perimeterRef.current === 0 ||
      !isHovered
    )
      return;
    const p = perimeterRef.current;
    offsetRef.current = (offsetRef.current - (p / duration) * delta + p) % p;
    const pill = p * 0.03;
    const dashArray = `${pill} ${p - pill}`;
    const dashOffset = String(offsetRef.current);
    sharpRef.current.setAttribute("stroke-dasharray", dashArray);
    sharpRef.current.setAttribute("stroke-dashoffset", dashOffset);
    glowRef.current.setAttribute("stroke-dasharray", dashArray);
    glowRef.current.setAttribute("stroke-dashoffset", dashOffset);
  });

  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ overflow: "visible" }}
    >
      <defs>
        <filter id={filterId} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <rect
        ref={glowRef}
        x="1"
        y="1"
        width="calc(100% - 2px)"
        height="calc(100% - 2px)"
        rx={16}
        ry={16}
        fill="none"
        stroke="#780FF0"
        strokeWidth={6}
        strokeLinecap="round"
        strokeOpacity={0.6}
        strokeDasharray="0 9999"
        filter={`url(#${filterId})`}
        style={{ opacity: isHovered ? 1 : 0, transition: "opacity 0.3s" }}
      />
      <rect
        ref={sharpRef}
        x="1"
        y="1"
        width="calc(100% - 2px)"
        height="calc(100% - 2px)"
        rx={16}
        ry={16}
        fill="none"
        stroke="#8E3AEE"
        strokeWidth={2}
        strokeLinecap="round"
        strokeDasharray="0 9999"
        style={{ opacity: isHovered ? 1 : 0, transition: "opacity 0.3s" }}
      />
    </svg>
  );
}

/* ── Types ─────────────────────────────────────────────────────── */
type ServiceIconComponent = React.ComponentType<{
  size?: number;
  color?: string;
  weight?: string;
}>;

const services: {
  id: string;
  title: string;
  description: string;
  icon: ServiceIconComponent;
}[] = [
  {
    id: "01",
    title: "Survey & Research",
    description:
      "From market surveys with responses to deep user interviews, we provide SWOT reports, positioning strategy, and behavioural mapping.",
    icon: MagnifyingGlass as unknown as ServiceIconComponent,
  },
  {
    id: "02",
    title: "Service Blueprinting",
    description:
      "We map processes, optimise workflows, design lifecycle customer journeys, and create structured SOP documentation for scale.",
    icon: Blueprint as unknown as ServiceIconComponent,
  },
  {
    id: "03",
    title: "Data & Dashboard",
    description:
      "Transforming raw information into live KPI dashboards, structured datasets, and delivering monthly insight and recommendation reports.",
    icon: ChartBar as unknown as ServiceIconComponent,
  },
  {
    id: "04",
    title: "AI/ML Integration",
    description:
      "Deploying AI Chatbots Synced with CRMs, sales automation workflows, and advanced custom machine learning solutions.",
    icon: Robot as unknown as ServiceIconComponent,
  },
  {
    id: "05",
    title: "ERP & Cloud Systems",
    description:
      "Comprehensive ERP setups (HR, Billing, Inventory) alongside 24x7 monitored cloud hosting, security audits, and compliance.",
    icon: CloudArrowUp as unknown as ServiceIconComponent,
  },
  {
    id: "06",
    title: "Web & App Development",
    description:
      "Building responsive websites, e-commerce platforms with payment automation, and Android/iOS mobile applications.",
    icon: AppWindow as unknown as ServiceIconComponent,
  },
  {
    id: "07",
    title: "Brand Designs",
    description:
      "Crafting logo and identity basics, full brand manuals, and SKU packaging systems that resonate across all mediums.",
    icon: Palette as unknown as ServiceIconComponent,
  },
  {
    id: "08",
    title: "Social Media Storytelling",
    description:
      "Managing monthly content, PR media relations, influencer partnerships executing optimised performance marketing setups.",
    icon: Megaphone as unknown as ServiceIconComponent,
  },
  {
    id: "09",
    title: "Video Production",
    description:
      "Executing 1-2 day corporate shoots, scripting and cutting brand films, and directing impactful documentary storytelling.",
    icon: FilmStrip as unknown as ServiceIconComponent,
  },
];

/* ── Service Card ──────────────────────────────────────────────── */
function ServiceCard({ svc }: { svc: (typeof services)[0] }) {
  const [isHovered, setIsHovered] = useState(false);
  const IconComp = svc.icon;

  return (
    <div
      className="group relative flex flex-col gap-4 border border-[#525252] rounded-2xl p-7 bg-[#1F1E1F] hover:bg-[#383838] transition-all card-glow overflow-hidden h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <HoverBorderBeam isHovered={isHovered} filterId={`hbg-${svc.id}`} />

      {/* Icon + ID row */}
      <div className="flex items-start justify-between relative z-10">
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center"
          style={{
            background: isHovered
              ? "rgba(120,15,240,0.15)"
              : "rgba(255,255,255,0.05)",
            border: `1px solid ${isHovered ? "rgba(120,15,240,0.35)" : "rgba(255,255,255,0.08)"}`,
            transition: "background 0.3s, border-color 0.3s",
          }}
        >
          <IconComp
            size={22}
            color={isHovered ? "#780FF0" : "#FFFFFF"}
            weight="duotone"
          />
        </div>
        <span className="font-mono-display text-[#525252] text-xs tracking-widest">
          {svc.id}
        </span>
      </div>

      {/* Title + Description */}
      <div className="relative z-10">
        <h3 className="text-lg font-black text-[#FFFFFF] mb-2 group-hover:text-[#780FF0] transition-colors leading-snug">
          {svc.title}
        </h3>
        <p className="text-[#9E9E9E] leading-relaxed text-sm">
          {svc.description}
        </p>
      </div>
    </div>
  );
}

/* ── Main Section ──────────────────────────────────────────────── */
export default function Services() {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });

  const trackRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(3);
  const GAP = 20;

  /* Responsive cards-per-view */
  useEffect(() => {
    const update = () => {
      if (window.innerWidth < 640) setCardsPerView(1);
      else if (window.innerWidth < 1024) setCardsPerView(2);
      else setCardsPerView(3);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const maxIndex = Math.max(0, services.length - cardsPerView);

  // Ref to the in-flight Framer animation so we can cancel it if the user
  // clicks again before the previous scroll finishes.
  const activeAnim = useRef<ReturnType<typeof animate> | null>(null);

  // Guard flag — true while animate() is driving scrollLeft so the native
  // onScroll listener doesn't race the animation and cause counter flicker.
  const isProgrammaticScroll = useRef(false);

  const scrollTo = useCallback(
    (index: number) => {
      const clamped = Math.max(0, Math.min(index, maxIndex));
      setCurrentIndex(clamped);
      if (!trackRef.current) return;

      const cardWidth =
        (trackRef.current.offsetWidth - GAP * (cardsPerView - 1)) /
        cardsPerView;
      const offset = clamped * (cardWidth + GAP);

      // Cancel any in-flight animation immediately so rapid clicks don't stack.
      if (activeAnim.current) {
        activeAnim.current.stop();
        activeAnim.current = null;
      }

      // Raise the guard so onScroll ignores events fired during the animation.
      isProgrammaticScroll.current = true;

      // Capture current scrollLeft as the start point so the tween always
      // begins exactly where the track currently is.
      const from = trackRef.current.scrollLeft;

      // Disable scroll-snap for the duration of the spring animation.
      // scroll-snap intercepts programmatic scrollLeft writes and immediately
      // snaps to the nearest snap point, killing the animation mid-flight.
      // We restore it in onComplete so drag/swipe still snaps after.
      trackRef.current.style.scrollSnapType = "none";

      // animate() tweens a plain number and calls onUpdate every RAF tick.
      // type:"spring" gives physics-based easing with natural deceleration.
      activeAnim.current = animate(from, offset, {
        type: "spring",
        stiffness: 280,
        damping: 30,
        mass: 0.8,
        restDelta: 0.5,
        onUpdate(latest) {
          if (trackRef.current) {
            trackRef.current.scrollLeft = latest;
          }
        },
        onComplete() {
          if (trackRef.current) {
            trackRef.current.style.scrollSnapType = "x mandatory";
          }
          isProgrammaticScroll.current = false;
          activeAnim.current = null;
        },
      });
    },
    [maxIndex, cardsPerView],
  );

  const prev = () => scrollTo(currentIndex - 1);
  const next = () => scrollTo(currentIndex + 1);

  /* Sync currentIndex on native scroll (drag / touch) */
  const onScroll = useCallback(() => {
    if (isProgrammaticScroll.current) return;
    if (!trackRef.current) return;
    const cardWidth =
      (trackRef.current.offsetWidth - GAP * (cardsPerView - 1)) / cardsPerView;
    const idx = Math.round(trackRef.current.scrollLeft / (cardWidth + GAP));
    setCurrentIndex(Math.max(0, Math.min(idx, maxIndex)));
  }, [cardsPerView, maxIndex]);

  return (
    <section
      id="services"
      className="bg-[#1F1E1F] py-28 border-t border-[#525252]"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Header row */}
        <div
          ref={sectionRef}
          className="flex items-end justify-between mb-12 gap-6"
        >
          <div>
            <motion.span
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              className="section-tag block mb-4"
            >
              Services
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.7 }}
              className="text-4xl md:text-6xl font-black text-[#FFFFFF] leading-tight max-w-2xl"
            >
              Everything You Need to{" "}
              <span className="text-[#780FF0]">Grow Online</span>
            </motion.h2>
          </div>

          {/* Prev / Next buttons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4 }}
            className="flex items-center gap-2 shrink-0"
          >
            {/* Progress indicator */}
            <span className="text-[#525252] font-mono-display text-xs tracking-widest mr-2 hidden sm:block">
              {String(currentIndex + 1).padStart(2, "0")} /{" "}
              {String(maxIndex + 1).padStart(2, "0")}
            </span>

            <button
              onClick={prev}
              disabled={currentIndex === 0}
              className="w-10 h-10 rounded-full border border-[#525252] flex items-center justify-center text-[#9E9E9E] hover:border-[#780FF0] hover:text-[#780FF0] disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              aria-label="Previous services"
            >
              <ArrowLeft size={16} strokeWidth={2} />
            </button>
            <button
              onClick={next}
              disabled={currentIndex >= maxIndex}
              className="w-10 h-10 rounded-full border border-[#525252] flex items-center justify-center text-[#9E9E9E] hover:border-[#780FF0] hover:text-[#780FF0] disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              aria-label="Next services"
            >
              <ArrowRight size={16} strokeWidth={2} />
            </button>
          </motion.div>
        </div>

        {/* Carousel track */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.35, duration: 0.6 }}
        >
          <div
            ref={trackRef}
            onScroll={onScroll}
            className="flex overflow-x-auto"
            style={{
              gap: GAP,
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              cursor: "grab",
              scrollSnapType: "x mandatory",
              WebkitOverflowScrolling: "touch",
            }}
          >
            {services.map((svc) => (
              <div
                key={svc.id}
                style={{
                  flex: `0 0 calc((100% - ${GAP * (cardsPerView - 1)}px) / ${cardsPerView})`,
                  minWidth: 0,
                  scrollSnapAlign: "start",
                }}
              >
                <ServiceCard svc={svc} />
              </div>
            ))}
          </div>
        </motion.div>

        {/* Dot indicators — one dot per page (cardsPerView step) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="flex justify-center gap-2 mt-8"
        >
          {Array.from({
            length: Math.ceil(services.length / cardsPerView),
          }).map((_, i) => {
            const pageStart = i * cardsPerView;
            const isActive =
              currentIndex >= pageStart &&
              currentIndex < pageStart + cardsPerView;
            return (
              <button
                key={i}
                onClick={() => scrollTo(pageStart)}
                aria-label={`Go to page ${i + 1}`}
                className="transition-all rounded-full"
                style={{
                  width: isActive ? "24px" : "8px",
                  height: "8px",
                  background: isActive ? "#780FF0" : "#525252",
                }}
              />
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
