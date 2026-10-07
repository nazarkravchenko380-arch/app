import { Link, useParams } from "react-router-dom";
import { Eyebrow, MaskLines, Reveal } from "@/components/Reveal";
import { getArticle, ARTICLES } from "@/content/journal";

export default function JournalArticle() {
  const { slug } = useParams();
  const article = getArticle(slug ?? "");

  if (!article) {
    return (
      <div className="mx-auto max-w-3xl px-5 pb-32 pt-40 text-center">
        <p className="font-serif text-4xl text-bone">This page wandered off.</p>
        <Link to="/journal" className="mt-6 inline-block font-mono text-xs uppercase tracking-[0.22em] text-crimson-soft" data-testid="article-back">
          ← Back to the journal
        </Link>
      </div>
    );
  }

  const related = ARTICLES.filter((a) => a.slug !== article.slug).slice(0, 2);

  return (
    <article data-testid="journal-article" className="mx-auto max-w-3xl px-5 pb-32 pt-32 sm:px-8">
      <Link to="/journal" data-testid="article-back" className="font-mono text-[11px] uppercase tracking-[0.25em] text-fog hover:text-crimson-soft">
        ← Journal
      </Link>
      <Eyebrow className="mt-10">{article.category}</Eyebrow>
      <MaskLines className="mt-4 font-serif text-4xl leading-[1.12] text-bone sm:text-6xl" lines={[article.title]} />
      <Reveal delay={0.2} className="mt-6 flex flex-wrap gap-3 font-mono text-[11px] uppercase tracking-[0.2em] text-fog">
        <span>{article.date}</span>
        <span className="text-crimson">·</span>
        <span>{article.author}</span>
        <span className="text-crimson">·</span>
        <span>{article.minutes} min read</span>
      </Reveal>

      <Reveal delay={0.1} className="grain mt-12 flex h-56 items-center justify-center rounded-3xl border border-border bg-panel/60 sm:h-72">
        <p className="px-6 text-center font-mono text-[10px] uppercase tracking-[0.25em] text-fog/70 leading-relaxed">
          Cover image placeholder — drop final asset at /public/images/journal/{article.slug}.webp
        </p>
      </Reveal>

      <div className="mt-14 space-y-7">
        {article.body.map((p, i) => (
          <Reveal key={i} delay={Math.min(i * 0.05, 0.2)}>
            <p className={`leading-relaxed ${i === 0 ? "font-serif text-xl text-bone/90 sm:text-2xl" : "text-base text-fog"}`}>{p}</p>
          </Reveal>
        ))}
      </div>

      <div className="mt-20 border-t border-border pt-10">
        <p className="mb-6 font-mono text-[10px] uppercase tracking-[0.3em] text-fog/70">Keep reading</p>
        <div className="grid gap-4 sm:grid-cols-2">
          {related.map((r) => (
            <Link key={r.slug} to={`/journal/${r.slug}`} data-testid={`related-${r.slug}`} className="group rounded-2xl border border-border bg-panel/40 p-6 transition-colors hover:border-crimson/50">
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-crimson">{r.category}</p>
              <p className="mt-2 font-serif text-xl text-bone group-hover:text-crimson-soft">{r.title}</p>
            </Link>
          ))}
        </div>
      </div>
    </article>
  );
}
