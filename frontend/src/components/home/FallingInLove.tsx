import { Reveal, MaskLines, Eyebrow } from "@/components/Reveal";

const NOTICINGS = [
  "Their laugh.",
  "Their favourite drink.",
  "The stupid joke they repeat.",
  "The restaurant they mentioned three weeks ago.",
  "The place they want to visit.",
  "The tiny change in their expression.",
  "The song they keep replaying.",
  "The way they take their coffee.",
];

export function FallingInLove() {
  return (
    <section id="story-start" data-testid="chapter-falling-in-love" className="relative mx-auto max-w-4xl px-5 py-32 sm:px-8 sm:py-44">
      <Eyebrow className="mb-6">Chapter 01 — The beginning</Eyebrow>
      <MaskLines
        className="font-serif text-4xl leading-[1.12] text-bone sm:text-5xl lg:text-6xl"
        lines={["At first, attention happens", "almost automatically."]}
      />
      <Reveal delay={0.3} className="mt-6 max-w-xl text-lg text-fog leading-relaxed">
        You notice everything.
      </Reveal>
      <div className="mt-16 space-y-3">
        {NOTICINGS.map((line, i) => (
          <Reveal key={line} delay={i * 0.06} y={24}>
            <p className="font-serif text-2xl text-bone/85 italic sm:text-3xl">{line}</p>
          </Reveal>
        ))}
      </div>
      <Reveal delay={0.2} className="mt-16 max-w-xl space-y-4 text-base text-fog leading-relaxed">
        <p>You ask questions because there is still so much you don't know.</p>
        <p>You create memories because everything feels new. You surprise each other without needing a reason.</p>
        <p className="text-bone">You pay attention.</p>
      </Reveal>
    </section>
  );
}
