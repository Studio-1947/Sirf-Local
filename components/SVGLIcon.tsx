"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { searchLogos, getLogoUrl, type SVGLLogo } from "@/lib/api/svgl";

interface SVGLIconProps {
  name: string;
  size?: number;
  className?: string;
  theme?: 'light' | 'dark';
  alt?: string;
}

/**
 * A component that fetches and displays a brand logo from the SVGL API
 * @param name The name of the brand to search for (e.g., 'React', 'Tailwind')
 * @param size The size of the icon in pixels (default: 24)
 * @param className Additional Tailwind classes
 * @param theme The theme to use for dual-theme logos (default: 'dark')
 * @param alt Alt text for the icon
 */
export default function SVGLIcon({ 
  name, 
  size = 24, 
  className = "", 
  theme = 'dark',
  alt
}: SVGLIconProps) {
  const [logo, setLogo] = useState<SVGLLogo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchLogo() {
      setLoading(true);
      setError(false);
      try {
        const results = await searchLogos(name);
        if (results && results.length > 0) {
          // Find the best match (exact or first result)
          const match = results.find(r => r.title.toLowerCase() === name.toLowerCase()) || results[0];
          setLogo(match);
        } else {
          setError(true);
        }
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchLogo();
  }, [name]);

  if (loading) {
    return (
      <div 
        style={{ width: size, height: size }} 
        className={`bg-white/5 animate-pulse rounded-md ${className}`} 
      />
    );
  }

  if (error || !logo) {
    return (
      <div 
        style={{ width: size, height: size }} 
        className={`bg-red-500/10 flex items-center justify-center rounded-md border border-red-500/20 ${className}`}
        title={`Logo not found: ${name}`}
      >
        <span className="text-[8px] text-red-500 font-mono">?</span>
      </div>
    );
  }

  const url = getLogoUrl(logo, theme);

  return (
    <div 
      className={`relative flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
    >
      <Image
        src={url}
        alt={alt || logo.title}
        width={size}
        height={size}
        className="object-contain"
        unoptimized // SVGs from external APIs should be unoptimized by Next.js Image
      />
    </div>
  );
}
