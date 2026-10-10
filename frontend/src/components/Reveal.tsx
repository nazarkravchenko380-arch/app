import { motion, useInView } from "motion/react";
import { useRef } from "react";
import type { ReactNode } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

export function Reveal({
  children,
  delay = 0,
  y = 44,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.9, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

export function MaskLines({
  lines,
  className = "",
  lineClassName = "",
  delay = 0,
  stagger = 0.12,
  mode = "view",
  when = true,
}: {
  lines: ReactNode[];
  className?: string;
  lineClassName?: string;
  delay?: number;
  stagger?: number;
  mode?: "view" | "load";
  when?: boolean;
}) {
  // Observe the container, never the translated span: an overflow-hidden mask clips the
  // span out of IntersectionObserver's intersection, so whileInView on it never fires.
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const show = when && (mode === "load" || inView);
  return (
    <div ref={ref} className={className}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.08em]">
          <motion.span
            className={`block ${lineClassName}`}
            initial={{ opacity: 0, y: "110%" }}
            animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: "110%" }}
            transition={{ duration: 1, delay: delay + i * stagger, ease: EASE }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </div>
  );
}

export function Eyebrow({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <p className={`font-mono uppercase tracking-[0.25em] text-xs text-crimson font-medium ${className}`}>
      {children}
    </p>
  );
}
