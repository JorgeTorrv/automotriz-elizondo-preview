"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  /** Retardo en segundos para escalonar apariciones. */
  delay?: number;
  className?: string;
  as?: "div" | "li" | "section";
}

/**
 * Envoltura de aparición suave al entrar en pantalla.
 * Respeta prefers-reduced-motion: si está activo, renderiza sin animación.
 */
export function Reveal({ children, delay = 0, className, as = "div" }: RevealProps) {
  const reduce = useReducedMotion();

  if (reduce) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  const MotionTag = motion[as];

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.35, delay, ease: "easeOut" }}
    >
      {children}
    </MotionTag>
  );
}
