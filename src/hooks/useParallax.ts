"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { useMotionValue, useSpring, MotionValue } from "framer-motion";

interface UseParallaxOptions {
  maxTilt?: number; // Maximum tilt angle in degrees (e.g. 5-8 degrees)
  springStiffness?: number;
  springDamping?: number;
}

interface UseParallaxReturn {
  containerRef: React.RefObject<HTMLDivElement>;
  rotateX: MotionValue<number>;
  rotateY: MotionValue<number>;
  isHovered: boolean;
  prefersReducedMotion: boolean;
  handleMouseEnter: () => void;
  handleMouseLeave: () => void;
}

export function useParallax({
  maxTilt = 6,
  springStiffness = 120,
  springDamping = 18,
}: UseParallaxOptions = {}): UseParallaxReturn {
  const containerRef = useRef<HTMLDivElement>(null!);
  const [isHovered, setIsHovered] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Raw target values normalized between -1 and 1
  const targetX = useMotionValue(0);
  const targetY = useMotionValue(0);

  // Smooth springs for fluid lerp easing
  const springConfig = { stiffness: springStiffness, damping: springDamping };
  const smoothX = useSpring(targetX, springConfig);
  const smoothY = useSpring(targetY, springConfig);

  const rotateX = useSpring(
    useMotionValue(0),
    springConfig
  );
  const rotateY = useSpring(
    useMotionValue(0),
    springConfig
  );

  // Sync targets to springs
  useEffect(() => {
    const unsubX = smoothY.on("change", (latestY) => {
      if (!prefersReducedMotion) {
        rotateX.set(-latestY * maxTilt);
      } else {
        rotateX.set(0);
      }
    });

    const unsubY = smoothX.on("change", (latestX) => {
      if (!prefersReducedMotion) {
        rotateY.set(latestX * maxTilt);
      } else {
        rotateY.set(0);
      }
    });

    return () => {
      unsubX();
      unsubY();
    };
  }, [smoothX, smoothY, maxTilt, prefersReducedMotion, rotateX, rotateY]);

  // Check reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    }
  }, []);

  // Mouse move handler (desktop)
  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (prefersReducedMotion) return;

      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const normX = Math.max(-1, Math.min(1, (e.clientX - centerX) / (rect.width / 2)));
        const normY = Math.max(-1, Math.min(1, (e.clientY - centerY) / (rect.height / 2)));

        targetX.set(normX);
        targetY.set(normY);
      }
    },
    [targetX, targetY, prefersReducedMotion]
  );

  // Device orientation handler (mobile)
  const handleOrientation = useCallback(
    (e: DeviceOrientationEvent) => {
      if (prefersReducedMotion) return;
      if (e.beta === null || e.gamma === null) return;

      const clampedGamma = Math.max(-30, Math.min(30, e.gamma)) / 30;
      const clampedBeta = Math.max(-30, Math.min(30, e.beta - 45)) / 30;

      targetX.set(clampedGamma);
      targetY.set(clampedBeta);
    },
    [targetX, targetY, prefersReducedMotion]
  );

  useEffect(() => {
    const element = containerRef.current;
    if (!element || prefersReducedMotion) return;

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    if (window.DeviceOrientationEvent) {
      window.addEventListener("deviceorientation", handleOrientation, { passive: true });
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (window.DeviceOrientationEvent) {
        window.removeEventListener("deviceorientation", handleOrientation);
      }
    };
  }, [handleMouseMove, handleOrientation, prefersReducedMotion]);

  const handleMouseEnter = useCallback(() => setIsHovered(true), []);
  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    targetX.set(0);
    targetY.set(0);
  }, [targetX, targetY]);

  return {
    containerRef,
    rotateX,
    rotateY,
    isHovered,
    prefersReducedMotion,
    handleMouseEnter,
    handleMouseLeave,
  };
}
