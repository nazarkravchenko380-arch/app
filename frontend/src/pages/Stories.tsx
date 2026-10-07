import { Eyebrow, MaskLines, Reveal } from "@/components/Reveal";
import { VideoPlaceholder } from "@/components/VideoPlaceholder";
import { STORIES } from "@/content/stories";

export default function Stories() {
  return (
    <div data-testid="stories-page" className="pb-32 pt-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Eyebrow className="mb-6">AMO Stories</Eyebrow>
        <MaskLines className="font-serif text-5xl leading-[1.05] text-bone sm:text-7xl" lines={["STORIES ABOUT", <span key="s" className="italic text-crimson">THE LITTLE THINGS.</span>]} />
        <Reveal delay={0.2} className="mt-6 max-w-xl text-base text-fog leading-relaxed">
          Small films about ordinary relationship moments — long distance, forgotten plans, the flowers nobody needed a reason for. Swipe through. Kodi and Mimi star in most of them.
        </Reveal>
      </div>

      <Reveal delay={0.15} className="mt-16">
        <div className="flex snap-x snap-mandatory gap-6 overflow-x-auto px-5 pb-6 sm:px-8 [scrollbar-width:none]">
          {STORIES.map((s, i) => (
            <article key={s.id} data-testid={`story-${s.id}`} className="w-[230px] shrink-0 snap-start sm:w-[260px]">
              <div className="relative">
                <VideoPlaceholder ratio="9/16" label={s.title} path={s.placeholder} />
                <span className="absolute right-3 top-3 rounded-full bg-ink/70 px-2.5 py-1 font-mono text-[10px] text-fog backdrop-blur-md">{s.duration}</span>
                <span className="absolute left-3 top-3 font-mono text-[10px] tracking-[0.25em] text-fog/70">{String(i + 1).padStart(2, "0")}</span>
              </div>
              <p className="mt-4 font-serif text-lg text-bone">{s.title}</p>
              <p className="mt-1 font-serif italic text-sm text-fog">“{s.quote}”</p>
            </article>
          ))}
        </div>
      </Reveal>

      <div className="mx-auto mt-20 max-w-6xl px-5 sm:px-8">
        <Reveal className="rounded-3xl border border-border bg-panel/60 p-8 sm:p-12">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-crimson">A note on the frames</p>
          <p className="mt-4 max-w-2xl font-serif text-xl leading-relaxed text-bone/90 sm:text-2xl">
            Every frame above is a labeled placeholder. Final 9:16 films drop into <span className="font-mono text-sm text-crimson-soft">/public/videos/</span> — no layout changes needed.
          </p>
        </Reveal>
      </div>
    </div>
  );
}
