import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Eyebrow, MaskLines, Reveal } from "@/components/Reveal";
import { useAddToAmo } from "@/components/community/AddToAmo";
import { getBoard, getCommunityStats } from "@/lib/community";
import type { SubmissionStatus } from "@/lib/community";

const TABS: { id: SubmissionStatus | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "new", label: "New" },
  { id: "exploring", label: "Exploring" },
  { id: "planned", label: "Planned" },
  { id: "building", label: "Building" },
  { id: "shipped", label: "Shipped" },
];

const STATUS_STYLES: Record<string, string> = {
  new: "border-border text-fog",
  exploring: "border-crimson/50 text-crimson-soft",
  planned: "border-amber-500/40 text-amber-300",
  building: "border-sky-500/40 text-sky-300",
  shipped: "border-emerald-500/40 text-emerald-300",
};

const TYPE_LABELS: Record<string, string> = {
  idea: "Idea",
  date_idea: "Date idea",
  feature: "Feature",
  improvement: "Improvement",
  feedback: "Feedback",
  bug: "Bug",
  story: "AMO story",
};

export default function Community() {
  const { openSheet } = useAddToAmo();
  const [tab, setTab] = useState<SubmissionStatus | "all">("all");
  const statsQuery = useQuery({ queryKey: ["community-stats"], queryFn: getCommunityStats, retry: false });
  const boardQuery = useQuery({ queryKey: ["community-board"], queryFn: getBoard, retry: false });

  const board = boardQuery.data ?? [];
  const filtered = tab === "all" ? board : board.filter((s) => s.status === tab);
  const stats = statsQuery.data;

  return (
    <div data-testid="community-page" className="mx-auto max-w-6xl px-5 pb-32 pt-32 sm:px-8">
      <Eyebrow className="mb-6">Community</Eyebrow>
      <MaskLines className="font-serif text-5xl leading-[1.05] text-bone sm:text-7xl" lines={["HELP US", <span key="c" className="italic text-crimson">BUILD AMO.</span>]} />
      <Reveal delay={0.2} className="mt-6 max-w-xl text-base text-fog leading-relaxed">
        AMO is built for real relationships. So real relationships should help shape it. Share an idea, a date, a bug, a story — it all lands here.
      </Reveal>

      <Reveal delay={0.15} className="mt-12 flex flex-wrap gap-3">
        {(["idea", "date_idea", "feature", "improvement", "feedback", "bug", "story"] as const).map((t) => (
          <button
            key={t}
            data-testid={`community-add-${t}`}
            onClick={() => openSheet(t)}
            className="rounded-full border border-border px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.18em] text-bone transition-colors hover:border-crimson hover:text-crimson-soft"
          >
            + {TYPE_LABELS[t]}
          </button>
        ))}
      </Reveal>

      <Reveal delay={0.1} className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-4" data-testid="community-stats">
        {[
          { label: "Ideas submitted", value: stats?.submitted },
          { label: "Being explored", value: stats?.exploring },
          { label: "Currently building", value: stats?.building },
          { label: "Shipped", value: stats?.shipped },
        ].map((s) => (
          <div key={s.label} className="rounded-2xl border border-border bg-panel/50 p-5">
            <p className="font-serif text-3xl text-bone">{s.value ?? "—"}</p>
            <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-fog">{s.label}</p>
          </div>
        ))}
        <p className="col-span-full font-mono text-[10px] uppercase tracking-[0.25em] text-fog/60">
          Demo data — the board goes live with real community submissions at launch.
        </p>
      </Reveal>

      <div className="mt-16">
        <div className="flex flex-wrap gap-2 border-b border-border pb-4" role="tablist" aria-label="Filter by status">
          {TABS.map((t) => (
            <button
              key={t.id}
              role="tab"
              aria-selected={tab === t.id}
              data-testid={`board-tab-${t.id}`}
              onClick={() => setTab(t.id)}
              className={`rounded-full px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.18em] transition-colors ${
                tab === t.id ? "bg-crimson text-white" : "text-fog hover:text-bone"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="mt-8 space-y-4" data-testid="community-board">
          {boardQuery.isError && (
            <p className="rounded-2xl border border-dashed border-border p-8 text-center text-sm text-fog">
              The board is resting — submissions still work, the list just can't load right now.
            </p>
          )}
          {!boardQuery.isError && filtered.length === 0 && (
            <p className="rounded-2xl border border-dashed border-border p-8 text-center text-sm text-fog">
              Nothing here yet. The first {tab === "all" ? "public idea" : `${tab} idea`} could be yours.
            </p>
          )}
          {filtered.map((s, i) => (
            <Reveal key={s.id} delay={Math.min(i * 0.05, 0.3)}>
              <article data-testid={`board-item-${s.number}`} className="flex flex-col gap-3 rounded-2xl border border-border bg-panel/50 p-6 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="font-mono text-[10px] tracking-[0.25em] text-crimson">#{s.number}</span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-fog">{TYPE_LABELS[s.type]}</span>
                    {s.demo && <span className="rounded-full border border-border px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.2em] text-fog/60">demo</span>}
                  </div>
                  <p className="mt-3 max-w-2xl font-serif text-lg leading-snug text-bone/90">{s.content}</p>
                  <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-fog/60">{s.name ?? "Anonymous"}</p>
                </div>
                <span className={`w-fit shrink-0 rounded-full border px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] ${STATUS_STYLES[s.status]}`}>
                  {s.status}
                </span>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}
