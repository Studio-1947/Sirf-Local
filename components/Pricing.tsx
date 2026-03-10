"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import Image from "next/image";
import {
  Video,
  LayoutGrid,
  Sparkles,
  Package,
  Globe,
  Megaphone,
  MessageCircle,
  Award,
  MapPin,
  ShoppingCart,
  Check,
} from "lucide-react";
import type { ComponentType } from "react";
import { useCart, parsePrice } from "@/context/CartContext";

type IconComp = ComponentType<{
  size?: number;
  color?: string;
  strokeWidth?: number;
}>;

interface CardData {
  title: string;
  price: string;
  period: string;
  body: string;
  label: string;
  icon: IconComp;
  accent: string;
  thumbFrom: string;
  thumbTo: string;
  dotColor: string;
  thumbnail: string;
}

const cards: CardData[] = [
  {
    title: "Monthly Reels",
    price: "₹3,500",
    period: "monthly",
    body: "Short, engaging videos to trend locally",
    label: "4 ready-to-use reels created from your photos and clips",
    icon: Video,
    accent: "#780FF0",
    thumbFrom: "#3E0085",
    thumbTo: "#1A003A",
    dotColor: "rgba(120,15,240,0.12)",
    thumbnail: "/images/pricing/Image-1.png",
  },
  {
    title: "Monthly Content Posts",
    price: "₹3,500",
    period: "monthly",
    body: "For owners too busy to worry about posting",
    label: "8 ready-to-use posts per month — greetings, offers & highlights",
    icon: LayoutGrid,
    accent: "#A463EE",
    thumbFrom: "#5103AA",
    thumbTo: "#200050",
    dotColor: "rgba(164,99,238,0.12)",
    thumbnail: "/images/pricing/Image-2.png",
  },
  {
    title: "The Brand Makeover",
    price: "₹5,000",
    period: "one-time",
    body: 'Give your "Old" Shop a modern facelift',
    label: "New colors, a fresh logo, and updated social media banners",
    icon: Sparkles,
    accent: "#780FF0",
    thumbFrom: "#3E0085",
    thumbTo: "#1A003A",
    dotColor: "rgba(120,15,240,0.12)",
    thumbnail: "/images/pricing/Image-3.png",
  },
  {
    title: "Premium Product Packaging",
    price: "₹3,500",
    period: "one-time",
    body: "Perfect for local bakers, candle makers, or crafters",
    label:
      "A professional label or box design that makes your products look premium",
    icon: Package,
    accent: "#B98AEF",
    thumbFrom: "#6509CE",
    thumbTo: "#2D0060",
    dotColor: "rgba(185,138,239,0.12)",
    thumbnail: "/images/pricing/Image-4.png",
  },
  {
    title: "Your One-Page Website",
    price: "₹5,000",
    period: "one-time",
    body: "A simple, clean page that tells people who you are",
    label:
      'Mobile-friendly with a big "Call/WhatsApp us" button and map directions',
    icon: Globe,
    accent: "#780FF0",
    thumbFrom: "#3E0085",
    thumbTo: "#1A003A",
    dotColor: "rgba(120,15,240,0.12)",
    thumbnail: "/images/pricing/Image-5.png",
  },
  {
    title: "Catchy Social Media Posts",
    price: "₹800",
    period: "one-time",
    body: "Beautiful designs to bring customers through your door",
    label:
      'High-quality graphics for "Buy 1 Get 1" deals, flash sales & grand openings',
    icon: Megaphone,
    accent: "#A463EE",
    thumbFrom: "#5103AA",
    thumbTo: "#200050",
    dotColor: "rgba(164,99,238,0.12)",
    thumbnail: "/images/pricing/Image-6.png",
  },
  {
    title: "Your WhatsApp Shop",
    price: "₹3,000",
    period: "one-time",
    body: "People love shopping on WhatsApp — let's make it easy for them",
    label:
      "Product catalogue with photos & prices, plus auto-replies for instant answers",
    icon: MessageCircle,
    accent: "#780FF0",
    thumbFrom: "#3E0085",
    thumbTo: "#1A003A",
    dotColor: "rgba(120,15,240,0.12)",
    thumbnail: "/images/pricing/Image-7.png",
  },
  {
    title: "The Professional Look",
    price: "₹5,000",
    period: "one-time",
    body: 'Move from a "Small Shop" to a "Big Brand" look',
    label:
      "A unique logo designed just for you, plus a matching business card design",
    icon: Award,
    accent: "#B98AEF",
    thumbFrom: "#6509CE",
    thumbTo: "#2D0060",
    dotColor: "rgba(185,138,239,0.12)",
    thumbnail: "/images/pricing/Image-8.png",
  },
  {
    title: "Get Found on Google Maps",
    price: "₹2,000",
    period: "one-time",
    body: "If people can't find you on their phones, they can't visit you!",
    label:
      "Listed on Google Maps & search, verified, with accurate hours & location",
    icon: MapPin,
    accent: "#A463EE",
    thumbFrom: "#5103AA",
    thumbTo: "#200050",
    dotColor: "rgba(164,99,238,0.12)",
    thumbnail: "/images/pricing/Image-9.png",
  },
];

function PricingCard({ card, index }: { card: CardData; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [hovered, setHovered] = useState(false);
  const { isInCart, toggleItem, openDrawer } = useCart();
  const inCart = isInCart(card.title);

  const row = Math.floor(index / 3);
  const col = index % 3;

  function handleCartClick() {
    toggleItem({
      id: card.title,
      title: card.title,
      price: parsePrice(card.price),
      period: card.period,
      accent: card.accent,
    });
    if (!inCart) openDrawer();
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.5,
        delay: row * 0.15 + col * 0.07,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex",
        flexDirection: "column",
        borderRadius: "20px",
        border: `1px solid ${inCart ? card.accent + "70" : hovered ? card.accent + "55" : "#525252"}`,
        background: inCart ? "#1F1E1F" : hovered ? "#383838" : "#1F1E1F",
        overflow: "hidden",
        transition: "border-color 0.3s, background 0.3s, box-shadow 0.3s",
        boxShadow: hovered
          ? `0 8px 40px ${card.accent}18`
          : "0 2px 16px rgba(0,0,0,0.4)",
      }}
    >
      {/* Thumbnail */}
      <div
        style={{
          height: "152px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Image
          src={card.thumbnail}
          alt={card.title}
          fill
          style={{
            objectFit: "cover",
            transition: "transform 0.4s ease",
            transform: hovered ? "scale(1.05)" : "scale(1)",
          }}
          sizes="(max-width: 768px) 100vw, 33vw"
          priority={index < 3}
        />
      </div>

      {/* Content body */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          padding: "20px 22px",
          flex: 1,
        }}
      >
        {/* Price — above title */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "baseline",
            gap: "5px",
            padding: "4px 12px",
            borderRadius: "999px",
            background: `${card.accent}15`,
            border: `1px solid ${card.accent}30`,
            alignSelf: "flex-start",
          }}
        >
          <span
            style={{
              color: card.accent,
              fontWeight: 800,
              fontSize: "14px",
              letterSpacing: "-0.3px",
            }}
          >
            {card.price}
          </span>
          <span style={{ color: card.accent, opacity: 0.55, fontSize: "11px" }}>
            / {card.period}
          </span>
        </div>

        <h3
          style={{
            color: hovered ? card.accent : "#FFFFFF",
            fontWeight: 800,
            fontSize: "16px",
            lineHeight: 1.3,
            transition: "color 0.3s",
            margin: 0,
          }}
        >
          {card.title}
        </h3>
        <p
          style={{
            color: "#858585",
            fontSize: "13.5px",
            lineHeight: 1.6,
            margin: 0,
          }}
        >
          {card.body}
        </p>

        {/* Divider + label */}
        <div
          style={{
            marginTop: "auto",
            paddingTop: "14px",
            borderTop: "1px solid #525252",
            display: "flex",
            gap: "8px",
            alignItems: "flex-start",
          }}
        >
          <span
            style={{
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              background: card.accent,
              flexShrink: 0,
              marginTop: "5px",
            }}
          />
          <p
            style={{
              color: card.accent,
              fontSize: "12px",
              lineHeight: 1.55,
              margin: 0,
              opacity: 0.85,
            }}
          >
            {card.label}
          </p>
        </div>
      </div>

      {/* CTA */}
      <div style={{ padding: "0 22px 22px" }}>
        <button
          onClick={handleCartClick}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "7px",
            width: "100%",
            padding: "10px 0",
            borderRadius: "999px",
            fontSize: "13px",
            fontWeight: 700,
            cursor: "pointer",
            border: `1.5px solid ${inCart ? "#4CAF7D" : hovered ? card.accent : card.accent + "50"}`,
            color: inCart ? "#1F1E1F" : hovered ? "#FFFFFF" : card.accent,
            background: inCart
              ? "#4CAF7D"
              : hovered
                ? card.accent
                : "transparent",
            transition: "background 0.25s, color 0.25s, border-color 0.25s",
            letterSpacing: "0.3px",
          }}
        >
          {inCart ? (
            <Check size={14} strokeWidth={2.5} />
          ) : (
            <ShoppingCart size={13} strokeWidth={2} />
          )}
          {inCart ? "Added to Cart" : "Add to Cart"}
        </button>
      </div>
    </motion.div>
  );
}

export default function Pricing() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="pricing"
      style={{
        background: "#1F1E1F",
        paddingTop: "112px",
        paddingBottom: "112px",
        borderTop: "1px solid #383838",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>
        {/* Header */}
        <div ref={ref} style={{ textAlign: "center", marginBottom: "64px" }}>
          <motion.span
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            className="section-tag"
            style={{ display: "inline-block", marginBottom: "16px" }}
          >
            Pricing
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.15, duration: 0.65 }}
            style={{
              fontSize: "clamp(2rem, 5vw, 3rem)",
              fontWeight: 900,
              color: "#FFFFFF",
              lineHeight: 1.15,
              marginBottom: "14px",
              letterSpacing: "-0.5px",
            }}
          >
            Your Business Needs,
            <br />
            <span style={{ color: "#780FF0" }}>Pick What Fits</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.25 }}
            style={{
              color: "#858585",
              fontSize: "16px",
              maxWidth: "400px",
              margin: "0 auto",
              lineHeight: 1.6,
            }}
          >
            Start small, grow big. Every service is built for Indian local
            businesses.
          </motion.p>
        </div>

        {/* 3×3 grid — inline CSS to guarantee columns */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gridTemplateRows: "auto auto auto",
            gap: "20px",
          }}
        >
          {cards.map((card, i) => (
            <PricingCard key={card.title} card={card} index={i} />
          ))}
        </div>

        {/* Custom Pricing CTA Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          style={{
            marginTop: "40px",
            background: "linear-gradient(135deg, #1A003A 0%, #1F1E1F 60%)",
            border: "1px solid #3E0085",
            borderRadius: "20px",
            padding: "48px 40px",
            textAlign: "center",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Subtle glow */}
          <div
            style={{
              position: "absolute",
              top: "-60px",
              left: "50%",
              transform: "translateX(-50%)",
              width: "300px",
              height: "200px",
              background:
                "radial-gradient(ellipse, rgba(120,15,240,0.12) 0%, transparent 70%)",
              pointerEvents: "none",
            }}
          />
          <p
            style={{
              fontSize: "22px",
              fontWeight: 900,
              color: "#FFFFFF",
              marginBottom: "8px",
              position: "relative",
            }}
          >
            Need Something Custom?
          </p>
          <p
            style={{
              color: "#858585",
              marginBottom: "28px",
              maxWidth: "420px",
              margin: "0 auto 28px",
              lineHeight: 1.6,
              position: "relative",
            }}
          >
            We craft tailored packages for businesses with unique needs.
            Let&apos;s build exactly what you require.
          </p>
          <a
            href="#contact"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "13px 32px",
              background: "#780FF0",
              color: "#FFFFFF",
              fontWeight: 800,
              fontSize: "14px",
              borderRadius: "999px",
              textDecoration: "none",
              position: "relative",
              letterSpacing: "0.3px",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = "#8E3AEE";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = "#780FF0";
            }}
          >
            Get a Custom Quote →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
