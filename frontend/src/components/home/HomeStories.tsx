import { Link } from "react-router-dom";
import { Eyebrow, MaskLines, Reveal } from "@/components/Reveal";
import { VideoPlaceholder } from "@/components/VideoPlaceholder";
import { STORIES } from "@/content/stories";

export function HomeStories() {
  return (
    <section data-testid="chapter-stories" className="border-t border-border bg-panel/40 py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Eyebrow className="mb-6">Chapter 07 — AMO Stories</Eyebrow>
        <MaskLines className="font-serif text-4xl leading-[1.08] text-bone sm:text-5xl" lines={["STORIES ABOUT", "THE LITTLE THINGS."]} />
      </div>
      <Reveal delay={0.15} className="mt-14">
        <div className="flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-4 sm:px-8 [scrollbar-width:none]">
          {STORIES.slice(0, 6).map((s) => (
            <div key={s.id} className="w-[200px] shrink-0 snap-start sm:w-[230px]">
              <VideoPlaceholder ratio="9/16" label={s.title} path={s.placeholder} />
              <p className="mt-3 font-serif italic text-sm text-fog">“{s.quote}”</p>
            </div>
          ))}
          <Link
            to="/stories"
            data-testid="stories-see-all"
            className="flex w-[200px] shrink-0 snap-start items-center justify-center rounded-none border border-dashed border-border font-mono text-xs uppercase tracking-[0.2em] text-fog transition-colors hover:border-crimson hover:text-crimson-soft"
            style={{ aspectRatio: "9 / 16" }}
          >
            All stories →
          </Link>
        </div>
      </Reveal>
    </section>
  );
}
