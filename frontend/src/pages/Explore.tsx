import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Eyebrow, MaskLines, Reveal } from "@/components/Reveal";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { FEATURES, GROUPS } from "@/content/features";
import type { Feature } from "@/content/features";

export default function Explore() {
  const [params, setParams] = useSearchParams();
  const [selected, setSelected] = useState<Feature | null>(null);

  useEffect(() => {
    const node = params.get("node");
    if (node) setSelected(FEATURES.find((f) => f.id === node) ?? null);
  }, [params]);

  const close = () => {
    setSelected(null);
    setParams({}, { replace: true });
  };

  return (
    <div data-testid="explore-page" className="mx-auto max-w-6xl px-5 pb-32 pt-32 sm:px-8">
      <Eyebrow className="mb-6">The product map</Eyebrow>
      <MaskLines className="font-serif text-5xl leading-[1.05] text-bone sm:text-7xl" lines={["EXPLORE", <span key="e" className="italic text-crimson">YOUR WORLD.</span>]} />
      <Reveal delay={0.2} className="mt-6 max-w-xl text-base text-fog leading-relaxed">
        Not twelve tools — one relationship, seen from twelve angles. Tap a node to open it.
      </Reveal>

      {GROUPS.map((group, gi) => (
        <div key={group.id} className="mt-20">
          <Reveal>
            <div className="flex items-baseline justify-between border-b border-border pb-4">
              <h2 className="font-serif text-2xl text-bone sm:text-3xl">{group.label}</h2>
              <p className="font-serif italic text-sm text-fog">{group.line}</p>
            </div>
          </Reveal>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.filter((f) => f.group === group.id).map((f, i) => (
              <Reveal key={f.id} delay={i * 0.07}>
                <button
                  data-testid={`explore-node-${f.id}`}
                  onClick={() => setSelected(f)}
                  className="group flex h-full w-full flex-col items-start gap-3 rounded-3xl border border-border bg-panel/60 p-6 text-left transition-all hover:-translate-y-1 hover:border-crimson/60 hover:shadow-[0_20px_60px_-20px_rgba(230,59,72,0.3)]"
                >
                  <span className="h-2 w-2 rounded-full bg-crimson transition-transform group-hover:scale-150" />
                  <span className="font-mono text-xs tracking-[0.25em] text-bone">{f.name}</span>
                  <span className="font-serif italic text-base leading-snug text-fog group-hover:text-bone/90">{f.tagline}</span>
                </button>
              </Reveal>
            ))}
          </div>
          {gi === GROUPS.length - 1 && (
            <Reveal className="mt-6">
              <button
                data-testid="explore-node-private-space"
                onClick={() => setSelected(FEATURES.find((f) => f.id === "private-space")!)}
                className="w-full rounded-3xl border border-dashed border-crimson/40 bg-wine/30 p-6 text-left transition-colors hover:bg-wine/50"
              >
                <span className="font-mono text-xs tracking-[0.25em] text-crimson-soft">PRIVATE SPACE</span>
                <p className="mt-2 font-serif italic text-base text-fog">Built for two. Only two.</p>
              </button>
            </Reveal>
          )}
        </div>
      ))}

      <Dialog open={!!selected} onOpenChange={(o) => !o && close()}>
        <DialogContent data-testid="feature-dialog" className="border-border bg-[#121215] text-bone sm:max-w-lg">
          {selected && (
            <>
              <DialogHeader>
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-crimson">{selected.group === "core" ? "At the center" : selected.group}</p>
                <DialogTitle className="font-serif text-3xl text-bone">{selected.name}</DialogTitle>
                <DialogDescription className="font-serif italic text-base text-crimson-soft">{selected.tagline}</DialogDescription>
              </DialogHeader>
              <p className="text-base leading-relaxed text-fog">{selected.description}</p>
              <p className="border-t border-border pt-4 font-mono text-[10px] uppercase tracking-[0.25em] text-fog/60">
                Every node feeds the others — that's the loop.
              </p>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
