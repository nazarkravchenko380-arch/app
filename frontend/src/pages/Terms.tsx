import { MaskLines, Reveal, Eyebrow } from "@/components/Reveal";

export default function Terms() {
  return (
    <div data-testid="terms-page" className="mx-auto max-w-3xl px-5 pb-32 pt-32 sm:px-8">
      <Eyebrow className="mb-6">Terms</Eyebrow>
      <MaskLines className="font-serif text-5xl leading-[1.05] text-bone sm:text-6xl" lines={["THE SHORT", <span key="t" className="italic text-crimson">VERSION.</span>]} />
      <div className="mt-12 space-y-6 text-base leading-relaxed text-fog">
        {[
          "AMO is a product for two people in a relationship. Use it kindly.",
          "Content you submit to the community (ideas, date ideas, stories) remains yours. If you mark it public, you allow AMO to display it on the community board, attributed only as you choose.",
          "We may moderate public submissions. Private submissions stay private.",
          "AMO is not therapy, counselling, or medical advice. It is infrastructure for paying attention.",
          "This website is a pre-launch experience. Full terms of service will be published here before AMO ships. Questions: hello@amo.love.",
        ].map((p, i) => (
          <Reveal key={i} delay={i * 0.05}>
            <p>{p}</p>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
