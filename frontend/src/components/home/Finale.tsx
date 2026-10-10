import { Eyebrow, MaskLines, Reveal } from "@/components/Reveal";
import { AmoMark } from "@/components/AmoLogo";
import { AmoBears } from "@/components/AmoBears";

const LOOP = ["NOTICE", "ASK", "DO SOMETHING", "EXPERIENCE IT", "REMEMBER", "LEARN", "NOTICE AGAIN"];

const FINAL_LINES = [
  ["FALLING IN LOVE", "IS THE BEGINNING."],
  ["STAYING CURIOUS", "IS A CHOICE."],
  ["KEEP DISCOVERING."],
  ["KEEP NOTICING."],
  ["KEEP CHOOSING EACH OTHER."],
];

export function Finale() {
  return (
    <>
      <section data-testid="chapter-loop" className="py-32 sm:py-44">
        <div className="mx-auto max-w-3xl px-5 text-center sm:px-8">
          <Eyebrow className="mb-10">Chapter 11 — The loop</Eyebrow>
          <div className="space-y-0">
            {LOOP.map((step, i) => (
              <Reveal key={step} delay={i * 0.08}>
                <div className="flex flex-col items-center">
                  <p className={`font-serif ${i === LOOP.length - 1 ? "text-4xl text-crimson sm:text-5xl" : "text-3xl text-bone/85 sm:text-4xl"}`}>
                    {step}
                  </p>
                  {i < LOOP.length - 1 && <span className="my-2 block h-6 w-px bg-crimson/40" />}
                </div>
              </Reveal>
            ))}
          </div>
          <MaskLines
            className="mt-24 font-serif text-3xl leading-[1.15] text-bone sm:text-5xl"
            lines={["RELATIONSHIPS AREN'T A DESTINATION.", <span key="l2" className="italic text-crimson-soft">THEY'RE SOMETHING WE KEEP CREATING.</span>]}
            stagger={0.25}
          />
        </div>
      </section>

      <section data-testid="chapter-final">
        {FINAL_LINES.map((lines, i) => (
          <div key={i} className="flex min-h-[70svh] items-center justify-center px-5">
            <MaskLines
              className="text-center font-serif leading-[1.08] text-bone text-[9vw] sm:text-6xl lg:text-7xl"
              lines={lines.map((l, j) => (j === 1 ? <span key={j} className="italic text-crimson">{l}</span> : l))}
              stagger={0.25}
            />
          </div>
        ))}

        <div className="flex min-h-svh flex-col items-center justify-center px-5 text-center">
          <Reveal>
            <AmoMark size={56} />
          </Reveal>
          <MaskLines
            className="mt-8 font-serif leading-[1.05] text-bone text-[12vw] sm:text-7xl lg:text-8xl"
            lines={["LOVE IS", <span key="f" className="italic text-crimson">PAYING ATTENTION.</span>]}
            stagger={0.3}
          />
          <Reveal delay={0.4}>
            <p className="mt-6 font-mono text-xs tracking-[0.4em] uppercase text-fog">AMO — Feel seen</p>
          </Reveal>
        </div>

        <div id="get-amo" data-testid="get-amo" className="flex min-h-[80svh] scroll-mt-16 flex-col items-center justify-center px-5 text-center">
          <Eyebrow className="mb-6">The last chapter is yours</Eyebrow>
          <MaskLines className="font-serif text-5xl leading-[1.05] text-bone sm:text-7xl" lines={["AMO IS", <span key="g" className="italic text-crimson">COMING SOON.</span>]} />
          <Reveal delay={0.25} className="mt-6 max-w-md text-base text-fog leading-relaxed">
            One place for the little things that make a relationship feel big. Launching first on iOS and Android — built for two.
          </Reveal>
          <Reveal delay={0.35} className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <span data-testid="badge-ios" className="cursor-not-allowed rounded-full border border-border px-7 py-3 font-mono text-xs tracking-[0.2em] uppercase text-fog">
              App Store — Soon
            </span>
            <span data-testid="badge-android" className="cursor-not-allowed rounded-full border border-border px-7 py-3 font-mono text-xs tracking-[0.2em] uppercase text-fog">
              Google Play — Soon
            </span>
          </Reveal>
          <Reveal delay={0.45} className="mt-14">
            <AmoBears size={72} />
            <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.25em] text-fog/60">Kodi & Mimi are waiting too</p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
