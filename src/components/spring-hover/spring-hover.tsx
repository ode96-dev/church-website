"use client";

import React, { useEffect, useRef } from "react";
import { useSpring, animated } from "@react-spring/web";

interface SpringCardProps {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
  scale?: number;
  onClick?: () => void;
}

interface SpringButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  ariaLabel?: string;
}

const CARD_REST = [0, 0, 1];
const CARD_PRESS_SCALE = 0.98;

const BUTTON_REST = { scale: 1, y: 0 };
const BUTTON_HOVER = { scale: 1.06, y: -2 };
const BUTTON_PRESS = { scale: 0.94, y: 1 };

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function SpringCard({
  children,
  className = "",
  intensity = 8,
  scale = 1.02,
  onClick,
}: SpringCardProps) {
  const rectRef = useRef<DOMRect | null>(null);

  const [springProps, api] = useSpring(() => ({
    xys: [0, 0, 1],
    config: { mass: 1, tension: 280, friction: 24 },
  }));

  useEffect(() => {
    const invalidate = () => {
      rectRef.current = null;
    };
    window.addEventListener("scroll", invalidate, { passive: true });
    window.addEventListener("resize", invalidate);
    return () => {
      window.removeEventListener("scroll", invalidate);
      window.removeEventListener("resize", invalidate);
    };
  }, []);

  const handlePointerEnter = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return;
    rectRef.current = e.currentTarget.getBoundingClientRect();
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse" || prefersReducedMotion()) return;
    const rect = rectRef.current ?? e.currentTarget.getBoundingClientRect();
    rectRef.current = rect;

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = clamp((y - centerY) / centerY, -1, 1) * -intensity;
    const rotateY = clamp((x - centerX) / centerX, -1, 1) * intensity;

    api.start({ xys: [rotateX, rotateY, scale] });
  };

  const handlePointerLeave = () => {
    rectRef.current = null;
    api.start({ xys: CARD_REST });
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "mouse" || prefersReducedMotion()) return;
    api.start({ xys: [0, 0, CARD_PRESS_SCALE] });
  };

  const handlePointerRelease = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "mouse") return;
    api.start({ xys: CARD_REST });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (!onClick || e.target !== e.currentTarget) return;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <animated.div
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      onPointerEnter={handlePointerEnter}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerRelease}
      onPointerCancel={handlePointerRelease}
      style={{
        transform: springProps.xys.to(
          (rx, ry, s) =>
            `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) scale(${s})`,
        ),
      }}
      className={`transition-shadow will-change-transform ${
        onClick
          ? "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8C48E]"
          : ""
      } ${className}`}
    >
      {children}
    </animated.div>
  );
}

export function SpringButton({
  children,
  className = "",
  onClick,
  ariaLabel,
}: SpringButtonProps) {
  const hoveredRef = useRef(false);

  const [springProps, api] = useSpring(() => ({
    ...BUTTON_REST,
    config: { tension: 400, friction: 17 },
  }));

  const animateTo = (state: typeof BUTTON_REST) => {
    if (!prefersReducedMotion()) api.start(state);
  };

  return (
    <animated.button
      type="button"
      aria-label={ariaLabel}
      onClick={onClick}
      onPointerEnter={(e) => {
        if (e.pointerType !== "mouse") return;
        hoveredRef.current = true;
        animateTo(BUTTON_HOVER);
      }}
      onPointerLeave={() => {
        hoveredRef.current = false;
        animateTo(BUTTON_REST);
      }}
      onPointerDown={() => animateTo(BUTTON_PRESS)}
      onPointerUp={() =>
        animateTo(hoveredRef.current ? BUTTON_HOVER : BUTTON_REST)
      }
      onPointerCancel={() => animateTo(BUTTON_REST)}
      style={springProps}
      className={className}
    >
      {children}
    </animated.button>
  );
}
