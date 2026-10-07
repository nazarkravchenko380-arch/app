import { Link } from "react-router-dom";
import { Eyebrow, MaskLines, Reveal } from "@/components/Reveal";
import { ARTICLES } from "@/content/journal";

export default function Journal() {
  const [featured, ...rest] = ARTICLES;
  return (
    <div data-testid="journal-page" className="mx-auto max-w-6xl px-5 pb-32 pt-32 sm:px-8">
      <Eyebrow className="mb-6">The AMO journal</Eyebrow>
      <MaskLines className="font-serif text-5xl leading-[1.05] text-bone sm:text-7xl" lines={["WHAT'S HAPPENING", <span key="j" className="italic text-crimson">AT AMO.</span>]} />
      <Reveal delay={0.2} className="mt-6 max-w-xl text-base text-fog leading-relaxed">
        Not corporate news — a living development journal. What we're building, what we're learning, what we're still figuring out.
      </Reveal>

      <Reveal delay={0.15} className="mt-16">
        <Link
          to={`/journal/${featured.slug}`}
          data-testid={`journal-featured-${featured.slug}`}
          className="group block rounded-3xl border border-border bg-panel/60 p-8 transition-colors hover:border-crimson/50 sm:p-12"
        >
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-crimson">Featured · {featured.category}</p>
          <h2 className="mt-4 max-w-2xl font-serif text-4xl leading-tight text-bone transition-colors group-hover:text-crimson-soft sm:text-5xl">{featured.title}</h2>
          <p className="mt-4 max-w-xl text-base text-fog">{featured.excerpt}</p>
          <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.25em] text-fog/70">{featured.date} · {featured.author} · {featured.minutes} min read</p>
        </Link>
      </Reveal>

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {rest.map((a, i) => (
          <Reveal key={a.slug} delay={i * 0.06}>
            <Link
              to={`/journal/${a.slug}`}
              data-testid={`journal-card-${a.slug}`}
              className="group flex h-full flex-col rounded-3xl border border-border bg-panel/40 p-7 transition-all hover:-translate-y-1 hover:border-crimson/50"
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-crimson">{a.category}</p>
              <h3 className="mt-3 font-serif text-2xl leading-snug text-bone transition-colors group-hover:text-crimson-soft">{a.title}</h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-fog">{a.excerpt}</p>
              <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.25em] text-fog/60">{a.date} · {a.minutes} min</p>
            </Link>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
