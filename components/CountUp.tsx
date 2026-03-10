'use client';

import { useRef, useEffect, useState } from 'react';
import { useInView } from 'framer-motion';

export default function CountUp({
  value,
  suffix = '',
  duration = 1400,
  className,
}: {
  value: number;
  suffix?: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    // Linear: fixed increment per 16ms frame
    const totalFrames = Math.round(duration / 16);
    const increment = value / totalFrames;
    let current = 0;
    let frame = 0;
    const timer = setInterval(() => {
      frame++;
      current += increment;
      if (frame >= totalFrames) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, value, duration]);

  return (
    <span ref={ref} className={className}>
      {count}{suffix}
    </span>
  );
}
