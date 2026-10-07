import { useEffect, useState } from "react";
import { useInView } from "motion/react";
import { useRef } from "react";
import { Eyebrow, MaskLines, Reveal } from "@/components/Reveal";

const STEPS = ["YOU TWO", "CONTEXT", "DISCOVERY", "ONE ACTION", "EXPERIENCE", "MEMORY", "FEEDBACK", "LEARN", "REPEAT"];

export function Engine() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-30% 0px -30% 0px" });
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const id = setInterval(() => setActive((a) => (a + 1) % STEPS.length), 1400);
    return () => clearInterval(id);
  }, [inView]);

  return (
    <section data-testid="chapter-engine" className="border-t border-border bg-panel/40 py-32 sm:py-44">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Eyebrow className="mb-6 text-center">Chapter 05 — How AMO thinks</Eyebrow>
        <MaskLines className="text-center font-serif text-4xl leading-[1.1] text-bone sm:text-5xl" lines={["WHAT COULD WE DO NEXT?"]} />
        <Reveal delay={0.2} className="mx-auto mt-6 max-w-xl text-center text-base text-fog leading-relaxed">
          Who you are + what you both like + what you've done + what you want to do + how you feel + what's happening now.
        </Reveal>

        <div ref={ref} className="relative mx-auto mt-20 aspect-square w-full max-w-lg">
          <div className="absolute inset-[14%] rounded-full border border-border" />
          <div className="absolute inset-[14%] rounded-full border border-crimson/20 blur-sm" />
          <div className="absolute inset-0 flex flex-col items-center justify-center px-16 text-center">
            <p className="font-serif text-2xl leading-tight text-bone sm:text-3xl">AMO LEARNS YOUR RELATIONSHIP.</p>
            <p className="mt-3 max-w-[240px] text-xs text-fog leading-relaxed">Not to understand love for you. To help you understand each other better.</p>
          </div>
          {STEPS.map((step, i) => {
            const angle = (i / STEPS.length) * Math.PI * 2 - Math.PI / 2;
            const x = 50 + 43 * Math.cos(angle);
            const y = 50 + 43 * Math.sin(angle);
            const isActive = i === active;
            return (
              <button
                key={step}
                data-testid={`engine-step-${step.toLowerCase().replace(/ /g, "-")}`}
                onClick={() => setActive(i)}
                className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full border px-3 py-1.5 font-mono text-[9px] tracking-[0.18em] transition-all duration-500 sm:text-[10px] ${
                  isActive
                    ? "border-crimson bg-crimson text-white scale-110 shadow-[0_0_30px_rgba(230,59,72,0.45)]"
                    : "border-border bg-panel2/80 text-fog hover:border-crimson/50"
                }`}
                style={{ left: `${x}%`, top: `${y}%` }}
              >
                {step}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
