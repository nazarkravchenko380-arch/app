import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { MaskLines, Reveal } from "@/components/Reveal";

const VERBS = ["NOTICE.", "ASK.", "LISTEN.", "REMEMBER.", "TOUCH.", "LAUGH.", "EXPLORE.", "SURPRISE.", "SUPPORT.", "CREATE.", "CHOOSE."];

export function Verbs() {
  const [agains, setAgains] = useState<number[]>([]);

  return (
    <section data-testid="chapter-verbs" className="relative border-t border-border py-36 sm:py-48">
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <MaskLines
          className="font-serif leading-[1.02] text-bone text-[13vw] sm:text-[10vw] lg:text-8xl"
          lines={["LOVE", "BECOMES", <span key="v" className="italic text-crimson">A VERB.</span>]}
          stagger={0.22}
        />
        <div className="mt-24 grid grid-cols-2 gap-x-8 gap-y-6 sm:grid-cols-3 lg:grid-cols-4">
          {VERBS.map((verb, i) => (
            <Reveal key={verb} delay={i * 0.05} y={26}>
              <p className="font-serif text-2xl text-bone/80 transition-colors hover:text-crimson sm:text-3xl">{verb}</p>
            </Reveal>
          ))}
        </div>
        <div className="relative mt-24 space-y-2">
          {["AGAIN.", "AND AGAIN.", "AND AGAIN."].map((line, i) => (
            <Reveal key={line} delay={i * 0.15}>
              <p
                data-testid={`again-${i}`}
                onMouseEnter={() => setAgains((a) => [...a.slice(-5), Date.now() + i])}
                className="w-fit cursor-default font-serif text-4xl text-outline transition-colors hover:text-crimson hover:[-webkit-text-stroke:0] sm:text-6xl"
              >
                {line}
              </p>
            </Reveal>
          ))}
          <AnimatePresence>
            {agains.map((a, i) => (
              <motion.span
                key={a}
                initial={{ opacity: 0, y: 10, rotate: -4 }}
                animate={{ opacity: 0.6, y: -6 }}
                exit={{ opacity: 0 }}
                className="pointer-events-none absolute font-serif italic text-crimson-soft text-lg"
                style={{ left: `${55 + i * 7}%`, top: `${10 + (i % 3) * 28}%` }}
              >
                again.
              </motion.span>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
