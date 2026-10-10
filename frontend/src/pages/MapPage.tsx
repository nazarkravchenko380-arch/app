import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";
import { Eyebrow, MaskLines, Reveal } from "@/components/Reveal";
import { FEATURES, GROUPS } from "@/content/features";
import type { Feature } from "@/content/features";

// Group hub positions (%) around the AMO core; children fan out from their hub.
const HUBS: Record<string, { x: number; y: number }> = {
  understand: { x: 20, y: 26 },
  discover: { x: 78, y: 22 },
  experience: { x: 84, y: 68 },
  remember: { x: 24, y: 74 },
  dream: { x: 50, y: 16 },
};
const CHILD_OFFSETS = [
  { dx: -9, dy: -8 },
  { dx: 9, dy: -6 },
  { dx: -2, dy: 11 },
  { dx: 10, dy: 8 },
];

interface Node {
  feature: Feature;
  x: number;
  y: number;
  hub: { x: number; y: number } | null;
}

export default function MapPage() {
  const [selected, setSelected] = useState<Feature | null>(null);
  const [eggFound, setEggFound] = useState(false);

  const nodes = useMemo<Node[]>(() => {
    const list: Node[] = [];
    for (const g of GROUPS) {
      const hub = HUBS[g.id];
      const children = FEATURES.filter((f) => f.group === g.id);
      children.forEach((f, i) => {
        const o = CHILD_OFFSETS[i % CHILD_OFFSETS.length];
        list.push({ feature: f, x: hub.x + o.dx, y: hub.y + o.dy, hub });
      });
    }
    return list;
  }, []);

  return (
    <div data-testid="map-page" className="mx-auto max-w-7xl px-5 pb-24 pt-32 sm:px-8">
      <Eyebrow className="mb-6">The whole universe</Eyebrow>
      <MaskLines className="font-serif text-5xl leading-[1.05] text-bone sm:text-7xl" lines={["AMO MAP."]} />
      <Reveal delay={0.2} className="mt-6 max-w-xl text-base text-fog leading-relaxed">
        Every system in AMO, connected. Hover the constellation — or tap a star to see what it holds.
      </Reveal>

      <Reveal delay={0.15} className="relative mt-14 h-[70svh] min-h-[480px] overflow-hidden rounded-3xl border border-border bg-panel/40">
        <svg className="absolute inset-0 h-full w-full" aria-hidden="true">
          {GROUPS.map((g) => (
            <line key={g.id} x1="50%" y1="48%" x2={`${HUBS[g.id].x}%`} y2={`${HUBS[g.id].y}%`} stroke="#E63030" strokeOpacity="0.25" strokeWidth="1" />
          ))}
          {nodes.filter((n) => n.hub).map((n) => (
            <line key={n.feature.id} x1={`${n.hub!.x}%`} y1={`${n.hub!.y}%`} x2={`${n.x}%`} y2={`${n.y}%`} stroke="#3F3F46" strokeWidth="1" strokeDasharray="2 5" />
          ))}
        </svg>

        {/* AMO core */}
        <div className="absolute -translate-x-1/2 -translate-y-1/2 text-center" style={{ left: "50%", top: "48%" }}>
          <div className="mx-auto h-16 w-16 rounded-full bg-[radial-gradient(circle,rgba(230,59,72,0.9),rgba(230,59,72,0.2)_70%)] shadow-[0_0_60px_rgba(230,59,72,0.5)] animate-pulse-soft" />
          <p className="mt-2 font-mono text-[10px] tracking-[0.35em] text-bone">AMO</p>
        </div>

        {/* group hubs */}
        {GROUPS.map((g) => (
          <div key={g.id} className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: `${HUBS[g.id].x}%`, top: `${HUBS[g.id].y}%` }}>
            <span className="rounded-full border border-crimson/50 bg-wine/60 px-3 py-1 font-mono text-[9px] uppercase tracking-[0.25em] text-crimson-soft">
              {g.label}
            </span>
          </div>
        ))}

        {/* feature nodes */}
        {nodes.map((n) => (
          <button
            key={n.feature.id}
            data-testid={`map-node-${n.feature.id}`}
            onClick={() => setSelected(n.feature)}
            className="group absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${n.x}%`, top: `${n.y}%` }}
          >
            <span className="block h-2.5 w-2.5 rounded-full bg-bone/70 transition-all group-hover:scale-[1.8] group-hover:bg-crimson group-hover:shadow-[0_0_18px_rgba(230,59,72,0.8)]" />
            <span className="pointer-events-none absolute left-1/2 top-4 -translate-x-1/2 whitespace-nowrap font-mono text-[9px] tracking-[0.2em] text-fog opacity-0 transition-opacity group-hover:opacity-100">
              {n.feature.name}
            </span>
          </button>
        ))}

        {/* easter egg */}
        <button
          data-testid="map-easter-egg"
          onClick={() => setEggFound(true)}
          className="absolute bottom-[6%] right-[4%] h-2 w-2 rounded-full bg-border transition-colors hover:bg-crimson"
          aria-label="A quiet corner of the map"
        />
        <AnimatePresence>
          {eggFound && (
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="absolute bottom-[11%] right-[4%] font-serif italic text-sm text-crimson-soft"
            >
              you found the quiet corner of the map ♥
            </motion.p>
          )}
        </AnimatePresence>
      </Reveal>

      <AnimatePresence>
        {selected && (
          <motion.aside
            data-testid="map-drawer"
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 60 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-0 right-0 top-0 z-50 w-full max-w-md border-l border-border bg-[#121215] p-8 pt-24 shadow-2xl"
          >
            <button data-testid="map-drawer-close" onClick={() => setSelected(null)} className="absolute right-6 top-6 text-fog hover:text-bone" aria-label="Close">
              <X className="h-5 w-5" />
            </button>
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-crimson">{selected.group}</p>
            <h2 className="mt-3 font-serif text-3xl text-bone">{selected.name}</h2>
            <p className="mt-2 font-serif italic text-lg text-crimson-soft">{selected.tagline}</p>
            <p className="mt-6 text-base leading-relaxed text-fog">{selected.description}</p>
          </motion.aside>
        )}
      </AnimatePresence>
    </div>
  );
}
