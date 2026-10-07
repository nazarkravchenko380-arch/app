import { Play } from "lucide-react";

export function VideoPlaceholder({
  label,
  path,
  ratio = "16/9",
  className = "",
  quote,
}: {
  label: string;
  path: string;
  ratio?: "16/9" | "9/16";
  className?: string;
  quote?: string;
}) {
  return (
    <div
      data-testid={`video-placeholder-${label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
      className={`grain relative overflow-hidden bg-panel border border-border ${className}`}
      style={{ aspectRatio: ratio === "16/9" ? "16 / 9" : "9 / 16" }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(230,59,72,0.10),transparent_65%)]" />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-6 text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-full border border-crimson/50 bg-wine/60">
          <Play className="h-5 w-5 text-crimson-soft" fill="currentColor" />
        </span>
        <p className="font-serif text-lg sm:text-xl text-bone">{label}</p>
        {quote && <p className="font-serif italic text-sm text-fog">“{quote}”</p>}
        <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-fog/70 max-w-xs leading-relaxed">
          Video placeholder — drop final asset at {path}
        </p>
      </div>
    </div>
  );
}
