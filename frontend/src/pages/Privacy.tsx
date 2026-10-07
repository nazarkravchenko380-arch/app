import { MaskLines, Reveal, Eyebrow } from "@/components/Reveal";

export default function Privacy() {
  return (
    <div data-testid="privacy-page" className="mx-auto max-w-3xl px-5 pb-32 pt-32 sm:px-8">
      <Eyebrow className="mb-6">Privacy</Eyebrow>
      <MaskLines className="font-serif text-5xl leading-[1.05] text-bone sm:text-6xl" lines={["YOUR MOMENTS.", <span key="p" className="italic text-crimson">STILL YOUR MOMENTS.</span>]} />
      <div className="mt-12 space-y-6 text-base leading-relaxed text-fog">
        {[
          "AMO is built for two people — not for advertisers, not for feeds, not for an audience. Everything you add exists for you and your partner.",
          "Community submissions are stored securely. If you choose \"keep it private\", your idea is never shown publicly. If you allow public sharing, only your first name (or nothing) ever appears — never your email.",
          "AMO NOW photos stay private until both partners participate. Where possible, unnecessary EXIF/GPS metadata is stripped from photographs.",
          "Moods are voluntary and temporary. They expire. They are never used for diagnosis, scoring, or anything resembling surveillance.",
          "This is a living page. The full legal privacy policy will be published here before launch. Questions: hello@amo.love.",
        ].map((p, i) => (
          <Reveal key={i} delay={i * 0.05}>
            <p>{p}</p>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
