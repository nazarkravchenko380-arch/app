const DEFAULT_ITEMS = ["NOTICE", "ASK", "LISTEN", "REMEMBER", "CHOOSE", "SURPRISE", "EXPLORE", "CREATE", "TOUCH", "LAUGH"];

export function Marquee({ items = DEFAULT_ITEMS, className = "" }: { items?: string[]; className?: string }) {
  const row = [...items, ...items];
  return (
    <div className={`overflow-hidden border-y border-border py-5 select-none ${className}`} aria-hidden="true">
      <div className="flex w-max animate-marquee gap-0">
        {row.map((item, i) => (
          <span key={i} className="flex items-center gap-8 pr-8">
            <span className="font-serif text-2xl sm:text-3xl tracking-wide text-fog/70">{item}</span>
            <span className="text-crimson text-lg">♥</span>
          </span>
        ))}
      </div>
    </div>
  );
}
