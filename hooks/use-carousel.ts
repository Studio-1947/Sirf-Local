import { useRef, useState, useEffect, useCallback } from "react";
import { animate } from "framer-motion";

interface UseCarouselOptions {
  itemCount: number;
  gap?: number;
  breakpoints?: {
    sm?: number;
    lg?: number;
  };
}

export function useCarousel({
  itemCount,
  gap = 20,
  breakpoints = { sm: 1, lg: 3 },
}: UseCarouselOptions) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(breakpoints.lg || 3);
  
  const activeAnim = useRef<any>(null);
  const isProgrammaticScroll = useRef(false);

  /* Responsive items-per-view */
  useEffect(() => {
    const update = () => {
      if (window.innerWidth < 640) setItemsPerView(breakpoints.sm || 1);
      else if (window.innerWidth < 1024) setItemsPerView(2);
      else setItemsPerView(breakpoints.lg || 3);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [breakpoints]);

  const maxIndex = Math.max(0, itemCount - itemsPerView);

  const scrollTo = useCallback(
    (index: number) => {
      const clamped = Math.max(0, Math.min(index, maxIndex));
      setCurrentIndex(clamped);
      if (!trackRef.current) return;

      const itemWidth =
        (trackRef.current.offsetWidth - gap * (itemsPerView - 1)) /
        itemsPerView;
      const offset = clamped * (itemWidth + gap);

      if (activeAnim.current) {
        activeAnim.current.stop();
      }

      isProgrammaticScroll.current = true;
      const from = trackRef.current.scrollLeft;

      trackRef.current.style.scrollSnapType = "none";

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
    [maxIndex, itemsPerView, gap],
  );

  const prev = () => scrollTo(currentIndex - 1);
  const next = () => scrollTo(currentIndex + 1);

  const onScroll = useCallback(() => {
    if (isProgrammaticScroll.current) return;
    if (!trackRef.current) return;
    const itemWidth =
      (trackRef.current.offsetWidth - gap * (itemsPerView - 1)) / itemsPerView;
    const idx = Math.round(trackRef.current.scrollLeft / (itemWidth + gap));
    setCurrentIndex(Math.max(0, Math.min(idx, maxIndex)));
  }, [itemsPerView, maxIndex, gap]);

  return {
    trackRef,
    currentIndex,
    maxIndex,
    itemsPerView,
    scrollTo,
    prev,
    next,
    onScroll,
  };
}
