export type PricingMode = "onetime" | "monthly" | "advance";

export type PricingCardData = {
  id: string;
  title: string;
  price?: string;
  period: string;
  body: string;
  icon: "video" | "grid" | "globe" | "zap" | "box" | "message" | "award" | "map" | "bell";
};

export const PRICING_TABS: Array<{ key: PricingMode; label: string }> = [
  { key: "onetime", label: "One-time" },
  { key: "monthly", label: "Monthly" },
  { key: "advance", label: "Advance" },
];

export const PRICING_COPY = {
  sectionTag: "Service Modules",
  titleLineOne: "Transparent",
  titleLineTwo: "Studio Rates.",
  sideNote: "Pick technical modules to scale your brand.",
  ctaTitle: "Complex Requirement?",
  ctaBody:
    "We architect custom end-to-end solutions for businesses with multi-layered digital needs.",
  ctaLabel: "Request Custom Blueprint",
};

export const PRICING_CARDS: Record<PricingMode, PricingCardData[]> = {
  monthly: [
    {
      id: "01",
      title: "Monthly Reels",
      price: "₹3,500",
      period: "monthly",
      body: "High-impact short-form video content designed for local virality.",
      icon: "video",
    },
    {
      id: "02",
      title: "Monthly Content",
      price: "₹3,500",
      period: "monthly",
      body: "8 professional monthly posts for owners too busy to worry about posting.",
      icon: "grid",
    },
    {
      id: "03",
      title: "Monthly Visibility Kit",
      price: "₹4,200",
      period: "monthly",
      body: "Placeholder: bundled social creatives and updates for steady growth.",
      icon: "globe",
    },
  ],
  onetime: [
    {
      id: "01",
      title: "One-Page Website",
      price: "₹5,000",
      period: "one-time",
      body: "A high-performance portal with WhatsApp sync and local maps.",
      icon: "globe",
    },
    {
      id: "02",
      title: "Brand Makeover",
      price: "₹5,000",
      period: "one-time",
      body: "Complete logo and color architecture.",
      icon: "zap",
    },
    {
      id: "03",
      title: "Premium Packaging",
      price: "₹3,500",
      period: "one-time",
      body: "Professional SKU label systems.",
      icon: "box",
    },
    {
      id: "04",
      title: "WhatsApp Shop",
      price: "₹3,000",
      period: "one-time",
      body: "Full catalogue and auto-replies.",
      icon: "message",
    },
    {
      id: "05",
      title: "Professional Look",
      price: "₹5,000",
      period: "one-time",
      body: "Logo and matching business cards.",
      icon: "award",
    },
    {
      id: "06",
      title: "Google Maps Audit",
      price: "₹2,000",
      period: "one-time",
      body: "Verified local search optimization.",
      icon: "map",
    },
  ],
  advance: [
    {
      id: "01",
      title: "ERP Implementation",
      period: "advance",
      body: "Custom ERP workflows for operations, inventory, finance, and reporting.",
      icon: "grid",
    },
    {
      id: "02",
      title: "AI/ML Solutions",
      period: "advance",
      body: "Use-case driven AI and ML systems for automation, forecasting, and personalization.",
      icon: "zap",
    },
    {
      id: "03",
      title: "Data Platforms",
      period: "advance",
      body: "End-to-end data architecture, pipelines, and dashboards for decision-ready insights.",
      icon: "bell",
    },
  ],
};