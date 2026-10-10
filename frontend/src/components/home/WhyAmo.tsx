import { MaskLines, Reveal, Eyebrow } from "@/components/Reveal";
import { VideoPlaceholder } from "@/components/VideoPlaceholder";

const NOT_LIST = ["AMO does not automate love.", "AMO does not replace effort.", "AMO does not tell people how to love."];
const DOES_LIST = [
  "Remember what matters.",
  "Discover something new.",
  "Ask another question.",
  "Find somewhere new.",
  "Plan something unexpected.",
  "Capture an ordinary moment.",
  "Understand how your partner feels.",
  "Create another shared memory.",
];

export function WhyAmo() {
  return (
    <section data-testid="chapter-why-amo" className="py-32 sm:py-44">
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <Eyebrow className="mb-6">Chapter 03 — Why AMO exists</Eyebrow>
        <MaskLines className="font-serif text-4xl leading-[1.1] text-bone sm:text-6xl" lines={["THAT IS WHY", "WE BUILT AMO."]} />
        <div className="mt-14 space-y-2">
          {NOT_LIST.map((line, i) => (
            <Reveal key={line} delay={i * 0.1}>
              <p className="text-lg text-fog line-through decoration-crimson/50 decoration-1">{line}</p>
            </Reveal>
          ))}
          <Reveal delay={0.35}>
            <p className="pt-4 font-serif text-2xl text-bone sm:text-3xl">AMO creates more opportunities to <span className="text-crimson italic">pay attention.</span></p>
          </Reveal>
        </div>
        <div className="mt-14 grid grid-cols-1 gap-x-10 gap-y-3 sm:grid-cols-2">
          {DOES_LIST.map((item, i) => (
            <Reveal key={item} delay={i * 0.05} y={20}>
              <p className="flex items-baseline gap-3 text-base text-bone/85">
                <span className="text-crimson">♥</span> {item}
              </p>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-14 max-w-xl text-base text-fog leading-relaxed">
          <p>Because life gets busy. And sometimes the smallest reminder creates the biggest moment.</p>
        </Reveal>

        <div className="mt-32">
          <Eyebrow className="mb-6">The film — Why AMO?</Eyebrow>
          <div className="grid items-center gap-10 lg:grid-cols-[1.5fr_1fr]">
            <Reveal>
              <VideoPlaceholder
                label="Why AMO — the brand film"
                path="/public/videos/amo-brand-film-placeholder.mp4"
                quote="What AMO is, why it exists, and what changes after the beginning."
              />
            </Reveal>
            <Reveal delay={0.15}>
              <p className="font-serif text-2xl leading-snug text-bone sm:text-3xl">
                WE DIDN'T BUILD AMO TO TEACH PEOPLE HOW TO LOVE.
              </p>
              <p className="mt-4 text-base text-fog leading-relaxed">
                We built it to create more opportunities to show it. Kodi and Mimi — our two bears — will explain the rest, soon.
              </p>
            </Reveal>
          </div>
        </div>

        <div className="mt-32 text-center">
          <MaskLines className="font-serif text-4xl leading-[1.1] text-bone sm:text-6xl" lines={["LOVE IS PAYING ATTENTION."]} />
          <Reveal delay={0.25}>
            <p className="mt-4 text-lg text-fog">AMO helps you keep paying attention.</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
