import { Link } from "react-router-dom";
import { Eyebrow, MaskLines, Reveal } from "@/components/Reveal";
import { FEATURES } from "@/content/features";

const POSITIONS = [
  { x: 12, y: 22 }, { x: 30, y: 10 }, { x: 52, y: 18 }, { x: 74, y: 8 }, { x: 88, y: 26 },
  { x: 20, y: 52 }, { x: 44, y: 44 }, { x: 66, y: 56 }, { x: 85, y: 62 },
  { x: 14, y: 80 }, { x: 40, y: 74 }, { x: 62, y: 84 },
];

export function ExploreTeaser() {
  return (
    <section data-testid="chapter-explore" className="border-t border-border py-32 sm:py-44">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Eyebrow className="mb-6">Chapter 06 — The product map</Eyebrow>
        <MaskLines className="font-serif text-4xl leading-[1.08] text-bone sm:text-6xl" lines={["EXPLORE YOUR WORLD."]} />
        <Reveal delay={0.2} className="mt-6 max-w-lg text-base text-fog leading-relaxed">
          These are not separate tools. They feed each other — every mood sharpens a suggestion, every trip feeds the timeline, every memory teaches the loop.
        </Reveal>

        <Reveal delay={0.15} className="relative mt-16 hidden h-[420px] rounded-3xl border border-border bg-panel/50 sm:block">
          <svg className="absolute inset-0 h-full w-full" aria-hidden="true">
            {POSITIONS.map((p, i) => {
              const next = POSITIONS[(i + 3) % POSITIONS.length];
              return (
                <line
                  key={i}
                  x1={`${p.x}%`} y1={`${p.y}%`} x2={`${next.x}%`} y2={`${next.y}%`}
                  stroke="#27272A" strokeWidth="1" strokeDasharray="3 6"
                />
              );
            })}
          </svg>
          {FEATURES.map((f, i) => (
            <Link
              key={f.id}
              to={`/explore?node=${f.id}`}
              data-testid={`teaser-node-${f.id}`}
              className="group absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${POSITIONS[i].x}%`, top: `${POSITIONS[i].y}%` }}
            >
              <span className="flex items-center gap-2 rounded-full border border-border bg-ink px-4 py-2 font-mono text-[10px] tracking-[0.2em] text-fog transition-all group-hover:border-crimson group-hover:text-bone group-hover:shadow-[0_0_24px_rgba(230,59,72,0.35)]">
                <span className="h-1.5 w-1.5 rounded-full bg-crimson transition-transform group-hover:scale-150" />
                {f.name}
              </span>
            </Link>
          ))}
        </Reveal>

        <Reveal delay={0.2} className="mt-10">
          <Link
            to="/explore"
            data-testid="explore-open-map"
            className="inline-flex items-center gap-3 rounded-full border border-crimson/50 px-7 py-3 font-mono text-xs tracking-[0.22em] uppercase text-crimson-soft transition-colors hover:bg-crimson hover:text-white"
          >
            Open the product map →
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
