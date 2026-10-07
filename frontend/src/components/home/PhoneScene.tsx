import { motion } from "motion/react";
import { MaskLines, Reveal, Eyebrow } from "@/components/Reveal";

const WIDGETS = [
  { label: "Tonight's idea", value: "Cook the thing from that video", accent: true },
  { label: "Question of the day", value: "What's a place that felt like ours?" },
  { label: "Coming up", value: "Anniversary in 11 days" },
  { label: "This day, back then", value: "Lisbon. The wrong turn. The right bar." },
];

const ORBITERS = ["AMO NOW", "How are they feeling?", "Something they saved", "Your next trip"];

export function PhoneScene() {
  return (
    <section data-testid="chapter-phone" className="relative overflow-hidden border-t border-border py-32 sm:py-44">
      <div className="mx-auto grid max-w-6xl items-center gap-16 px-5 sm:px-8 lg:grid-cols-2">
        <div>
          <Eyebrow className="mb-6">Chapter 04 — The product</Eyebrow>
          <MaskLines className="font-serif text-4xl leading-[1.08] text-bone sm:text-6xl" lines={["ONE RELATIONSHIP.", "ONE PLACE."]} />
          <Reveal delay={0.25} className="mt-8 max-w-md space-y-4 text-base text-fog leading-relaxed">
            <p>Tonight's idea. The question of the day. The anniversary that's coming. The memory from this exact day, years ago.</p>
            <p className="text-bone">Not features on a grid — one living place that knows what matters to you two.</p>
          </Reveal>
        </div>

        <Reveal delay={0.15} className="relative mx-auto w-full max-w-xs">
          {ORBITERS.map((o, i) => (
            <motion.span
              key={o}
              className="absolute z-10 hidden whitespace-nowrap rounded-full border border-crimson/40 bg-wine/70 px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.15em] text-crimson-soft backdrop-blur-md sm:block"
              style={{
                top: `${8 + i * 26}%`,
                [i % 2 === 0 ? "left" : "right"]: "-38%",
              }}
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3.5 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.6 }}
            >
              {o}
            </motion.span>
          ))}
          <motion.div
            data-testid="phone-mockup"
            whileHover={{ rotate: 0, scale: 1.02 }}
            initial={{ rotate: -2 }}
            transition={{ type: "spring", stiffness: 120, damping: 16 }}
            className="relative rounded-[2.8rem] border border-border bg-panel p-3 shadow-[0_40px_120px_-30px_rgba(230,59,72,0.25)]"
          >
            <div className="rounded-[2.2rem] bg-ink px-5 pb-8 pt-10">
              <div className="mx-auto mb-6 h-1.5 w-16 rounded-full bg-border" />
              <div className="mb-6 text-center">
                <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-crimson">AMO NOW</p>
                <p className="mt-2 font-serif text-2xl text-bone" data-testid="relationship-counter">2 years · 4 months · 11 days</p>
              </div>
              <div className="space-y-3">
                {WIDGETS.map((w, i) => (
                  <motion.div
                    key={w.label}
                    initial={{ opacity: 0, x: 24 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.15, duration: 0.7 }}
                    className={`rounded-2xl border p-4 ${w.accent ? "border-crimson/50 bg-wine/50" : "border-border bg-panel2/70"}`}
                  >
                    <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-fog">{w.label}</p>
                    <p className="mt-1.5 font-serif text-base leading-snug text-bone">{w.value}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </Reveal>
      </div>
    </section>
  );
}
