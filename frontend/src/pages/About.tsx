import { Eyebrow, MaskLines, Reveal } from "@/components/Reveal";
import { VideoPlaceholder } from "@/components/VideoPlaceholder";
import { AmoBears } from "@/components/AmoBears";

export default function About() {
  return (
    <div data-testid="about-page" className="mx-auto max-w-5xl px-5 pb-32 pt-32 sm:px-8">
      <Eyebrow className="mb-6">About AMO</Eyebrow>
      <MaskLines
        className="font-serif text-5xl leading-[1.08] text-bone sm:text-7xl"
        lines={["WE DIDN'T BUILD AMO TO", "TEACH PEOPLE", <span key="a" className="italic text-crimson">HOW TO LOVE.</span>]}
      />
      <Reveal delay={0.25} className="mt-8 max-w-2xl text-lg leading-relaxed text-fog">
        We built it to create more opportunities to show it. AMO is one place for the little things — the questions, the signals, the ordinary Tuesdays — that make a relationship feel big.
      </Reveal>

      <Reveal delay={0.15} className="mt-20">
        <VideoPlaceholder
          label="The AMO brand film"
          path="/public/videos/amo-brand-film-placeholder.mp4"
          quote="What AMO is, why it exists, and why attention matters — told by two bears."
        />
        <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.25em] text-fog/60">
          16:9 · subtitles + captions ready · muted preview, sound on tap — final film drops in without layout changes
        </p>
      </Reveal>

      <div className="mt-28 grid items-center gap-12 lg:grid-cols-2">
        <Reveal>
          <h2 className="font-serif text-3xl text-bone sm:text-4xl">Meet Kodi & Mimi.</h2>
          <p className="mt-5 text-base leading-relaxed text-fog">
            A large, calm, slightly confused dark-brown bear. And a smaller, expressive light-brown bear with a pink bow.
            They star in AMO Stories, the brand film, and the occasional quiet corner of this site. They never shout — they notice.
          </p>
          <p className="mt-4 font-serif italic text-lg text-crimson-soft">Go ahead, tap them. They don't mind.</p>
        </Reveal>
        <Reveal delay={0.15} className="flex justify-center rounded-3xl border border-border bg-panel/50 py-16">
          <AmoBears size={120} />
        </Reveal>
      </div>

      <Reveal className="mt-28 rounded-3xl border border-border bg-panel/50 p-8 sm:p-12">
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-crimson">Contact</p>
        <p className="mt-4 max-w-xl font-serif text-xl leading-relaxed text-bone/90">
          Building AMO is a conversation. Write to us at <span className="text-crimson-soft">hello@amo.love</span> — every message is read by a human who cares.
        </p>
      </Reveal>
    </div>
  );
}
