import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { MaskLines } from "@/components/Reveal";
import { useIntroReady } from "@/components/Preloader";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const ready = useIntroReady();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const glowY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section ref={ref} data-testid="hero" className="grain relative flex min-h-svh flex-col overflow-hidden">
      <motion.div
        aria-hidden="true"
        style={{ y: glowY, scale }}
        className="absolute left-1/2 top-1/2 h-[80vmin] w-[80vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(230,59,72,0.22),rgba(230,59,72,0.05)_45%,transparent_70%)] blur-2xl animate-pulse-soft"
      />
      <motion.div style={{ opacity: fade }} className="relative z-10 flex flex-1 flex-col items-center justify-center px-5 text-center">
        <motion.p
          initial={{ opacity: 0 }}
          animate={ready ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.4, duration: 1 }}
          className="mb-8 font-mono text-[11px] tracking-[0.4em] uppercase text-fog"
        >
          AMO — Feel seen
        </motion.p>
        <h1 className="font-serif font-medium leading-[1.02] tracking-tight text-bone text-[13.5vw] sm:text-[11vw] lg:text-[8.5rem]">
          <MaskLines
            mode="load"
            when={ready}
            delay={0.25}
            stagger={0.16}
            lines={[
              <span key="a">LOVE IS</span>,
              <span key="b">
                PAYING <span className="italic text-crimson">ATTENTION.</span>
              </span>,
            ]}
          />
        </h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 1.1, duration: 0.9 }}
          className="mt-8 max-w-md text-base text-fog leading-relaxed sm:text-lg"
        >
          One place for the little things that make a relationship feel big.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 1.35, duration: 0.9 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <button
            data-testid="hero-get-amo"
            onClick={() => scrollTo("get-amo")}
            className="rounded-full bg-crimson px-8 py-3.5 font-mono text-xs tracking-[0.22em] uppercase text-white transition-transform hover:scale-105"
          >
            Get AMO
          </button>
          <button
            data-testid="hero-explore"
            onClick={() => scrollTo("story-start")}
            className="rounded-full border border-border px-8 py-3.5 font-mono text-xs tracking-[0.22em] uppercase text-bone transition-colors hover:border-crimson/60 hover:text-crimson-soft"
          >
            Explore AMO ↓
          </button>
        </motion.div>
      </motion.div>
      <motion.div style={{ opacity: fade }} className="relative z-10 flex flex-col items-center gap-2 pb-8">
        <span className="font-mono text-[10px] tracking-[0.35em] uppercase text-fog/70">Scroll — the story controls the timeline</span>
        <motion.span
          aria-hidden="true"
          className="block h-10 w-px bg-gradient-to-b from-crimson to-transparent"
          animate={{ scaleY: [0.3, 1, 0.3], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
}
