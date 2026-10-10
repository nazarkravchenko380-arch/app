import { useRef, useState } from "react";
import { motion, useScroll, useMotionValueEvent, useTransform } from "motion/react";
import { MaskLines, Reveal, Eyebrow } from "@/components/Reveal";

const STAGES = ["12 MONTHS", "18 MONTHS", "24 MONTHS", "", "AND THEN?"];

export function Research() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const [stage, setStage] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setStage(Math.min(STAGES.length - 1, Math.floor(v * STAGES.length)));
  });

  return (
    <>
      <section data-testid="chapter-research" className="relative">
        <div className="mx-auto max-w-4xl px-5 pt-28 sm:px-8">
          <Eyebrow className="mb-6">Chapter 02 — What researchers noticed</Eyebrow>
          <MaskLines
            className="font-serif text-3xl leading-[1.2] text-bone sm:text-4xl lg:text-5xl"
            lines={[
              "Italian researchers studying people who had recently",
              "fallen in love found measurable biological differences",
              "associated with early-stage romantic love.",
            ]}
          />
          <Reveal delay={0.25} className="mt-6 max-w-2xl text-base text-fog leading-relaxed">
            Examined again roughly 12–24 months later, many were still with the same partner — but the biological marker of that intense early stage had returned toward ordinary levels.
          </Reveal>
        </div>

        <div ref={ref} className="relative h-[320vh]">
          <div className="sticky top-0 flex h-svh flex-col items-center justify-center px-5 text-center">
            <div className="mb-10 flex gap-2">
              {STAGES.map((_, i) => (
                <span key={i} className={`h-1 w-8 rounded-full transition-colors duration-500 ${i <= stage ? "bg-crimson" : "bg-border"}`} />
              ))}
            </div>
            <div className="relative flex h-40 items-center justify-center sm:h-52">
              {STAGES.map((label, i) => (
                <motion.p
                  key={label || "silence"}
                  initial={false}
                  animate={{ opacity: stage === i ? 1 : 0, y: stage === i ? 0 : 24, filter: stage === i ? "blur(0px)" : "blur(6px)" }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className={`absolute font-serif leading-none ${
                    i === STAGES.length - 1
                      ? "text-6xl text-crimson sm:text-8xl"
                      : label === ""
                        ? "text-2xl italic text-fog/60"
                        : "text-5xl text-bone sm:text-7xl"
                  }`}
                >
                  {label === "" ? "· · ·" : label}
                </motion.p>
              ))}
            </div>
            <motion.p animate={{ opacity: stage === STAGES.length - 1 ? 1 : 0.35 }} className="mt-8 max-w-md text-sm text-fog leading-relaxed">
              The relationship remained. The beginning had changed.
            </motion.p>
            <motion.a
              data-testid="research-reference-link"
              href="https://doi.org/10.1016/j.psyneuen.2005.09.002"
              target="_blank"
              rel="noopener noreferrer"
              animate={{ opacity: stage === STAGES.length - 1 ? 1 : 0 }}
              className="pointer-events-auto mt-6 font-mono text-[11px] tracking-[0.2em] uppercase text-fog/70 underline decoration-crimson/50 underline-offset-4 hover:text-crimson-soft"
            >
              Read the research ↗
            </motion.a>
          </div>
        </div>
      </section>

      <section data-testid="chapter-transition" className="mx-auto max-w-4xl px-5 py-36 sm:px-8 sm:py-48">
        <MaskLines
          className="font-serif text-4xl leading-[1.1] text-bone sm:text-6xl lg:text-7xl"
          lines={["THE RELATIONSHIP REMAINED.", <span key="b" className="text-outline">THE BEGINNING DIDN'T.</span>]}
          stagger={0.3}
        />
        <Reveal delay={0.4} className="mt-10 max-w-xl">
          <p className="font-serif text-xl italic text-crimson-soft sm:text-2xl">And maybe that's where the most interesting part begins.</p>
          <div className="mt-8 space-y-3 text-base text-fog leading-relaxed">
            <p>At first, attention is almost automatic. Later, attention becomes something we choose.</p>
            <p>Curiosity becomes a choice. Dates become something we create. Questions become something we remember to ask. Surprises become something we decide to make. Memories become something we protect.</p>
            <p className="text-bone">Love stops being only something that happens to us.</p>
          </div>
        </Reveal>
      </section>
    </>
  );
}
