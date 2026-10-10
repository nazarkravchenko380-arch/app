import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Eyebrow, MaskLines, Reveal } from "@/components/Reveal";
import { useAddToAmo } from "@/components/community/AddToAmo";
import { getReviews } from "@/lib/community";
import { ARTICLES } from "@/content/journal";

export function JournalCommunity() {
  const { openSheet } = useAddToAmo();
  return (
    <section data-testid="chapter-journal-community" className="py-32">
      <div className="mx-auto grid max-w-6xl gap-20 px-5 sm:px-8 lg:grid-cols-2">
        <div>
          <Eyebrow className="mb-6">Chapter 08 — The journal</Eyebrow>
          <MaskLines className="font-serif text-4xl leading-[1.1] text-bone sm:text-5xl" lines={["WHAT'S HAPPENING", "AT AMO."]} />
          <div className="mt-10 space-y-6">
            {ARTICLES.slice(0, 3).map((a, i) => (
              <Reveal key={a.slug} delay={i * 0.08}>
                <Link to={`/journal/${a.slug}`} data-testid={`journal-card-${a.slug}`} className="group block border-b border-border pb-6">
                  <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-crimson">{a.category} · {a.minutes} min</p>
                  <p className="mt-2 font-serif text-2xl text-bone transition-colors group-hover:text-crimson-soft">{a.title}</p>
                  <p className="mt-1 text-sm text-fog">{a.excerpt}</p>
                </Link>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.2} className="mt-8">
            <Link to="/journal" data-testid="journal-see-all" className="font-mono text-xs uppercase tracking-[0.22em] text-crimson-soft hover:text-crimson">
              Open the journal →
            </Link>
          </Reveal>
        </div>

        <div className="lg:border-l lg:border-border lg:pl-20">
          <Eyebrow className="mb-6">Chapter 09 — Community</Eyebrow>
          <MaskLines className="font-serif text-4xl leading-[1.1] text-bone sm:text-5xl" lines={["HELP US", "BUILD AMO."]} />
          <Reveal delay={0.2} className="mt-6 text-base text-fog leading-relaxed">
            AMO is built for real relationships. So real relationships should help shape it.
          </Reveal>
          <div className="mt-10 flex flex-wrap gap-3">
            {([
              ["Share an idea", "idea"],
              ["Submit a date idea", "date_idea"],
              ["Request a feature", "feature"],
              ["Leave feedback", "feedback"],
            ] as const).map(([label, type], i) => (
              <Reveal key={type} delay={i * 0.06}>
                <button
                  data-testid={`community-cta-${type}`}
                  onClick={() => openSheet(type)}
                  className="rounded-full border border-border px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.18em] text-bone transition-colors hover:border-crimson hover:text-crimson-soft"
                >
                  {label}
                </button>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.25} className="mt-8">
            <Link to="/community" data-testid="community-board-link" className="font-mono text-xs uppercase tracking-[0.22em] text-crimson-soft hover:text-crimson">
              See the community board →
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function ReviewsWall() {
  const { openSheet } = useAddToAmo();
  const { data, isError } = useQuery({ queryKey: ["reviews"], queryFn: getReviews, retry: false });
  const reviews = !isError && data ? data : [];

  return (
    <section data-testid="chapter-reviews" className="py-32">
      <div className="mx-auto max-w-4xl px-5 text-center sm:px-8">
        <Eyebrow className="mb-6">Chapter 10 — Voices</Eyebrow>
        <MaskLines className="font-serif text-4xl leading-[1.1] text-bone sm:text-5xl" lines={["FROM PEOPLE USING AMO."]} />
        {reviews.length === 0 ? (
          <Reveal delay={0.2} className="mx-auto mt-12 max-w-lg rounded-3xl border border-dashed border-border p-10">
            <p className="font-serif text-2xl italic text-bone/85">This wall is waiting for real voices.</p>
            <p className="mt-4 text-sm text-fog leading-relaxed">
              We don't invent reviews. When couples share what AMO means to them — with permission — their words will live here.
            </p>
            <button
              data-testid="reviews-share-story"
              onClick={() => openSheet("story")}
              className="mt-6 rounded-full border border-crimson/50 px-6 py-2.5 font-mono text-[11px] uppercase tracking-[0.2em] text-crimson-soft transition-colors hover:bg-crimson hover:text-white"
            >
              Share your AMO story
            </button>
          </Reveal>
        ) : (
          <div className="mt-12 columns-1 gap-5 sm:columns-2">
            {reviews.map((r) => (
              <blockquote key={r.id} className="mb-5 break-inside-avoid rounded-2xl border border-border bg-panel p-6 text-left">
                <p className="font-serif text-lg italic text-bone">“{r.quote}”</p>
                <footer className="mt-3 font-mono text-[10px] uppercase tracking-[0.2em] text-fog">
                  {[r.first_names, r.relationship_duration, r.place].filter(Boolean).join(" · ")}
                </footer>
              </blockquote>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
