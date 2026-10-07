export function AmoMark({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden="true">
      <path
        d="M32 50c-9.6-6.4-18-12.4-18-21.2 0-5.4 4.2-9.3 9.2-9.3 3.4 0 6.6 1.8 8.8 4.8 2.2-3 5.4-4.8 8.8-4.8 5 0 9.2 3.9 9.2 9.3C50 37.6 41.6 43.6 32 50z"
        fill="#E63B48"
      />
      <circle cx="32" cy="33" r="4.4" fill="#F5F3EF" />
    </svg>
  );
}

export function AmoWordmark({ size = 28 }: { size?: number }) {
  return (
    <span className="inline-flex items-center gap-2" data-testid="amo-wordmark">
      <AmoMark size={size} />
      <span
        className="font-serif font-medium tracking-[0.18em] text-bone"
        style={{ fontSize: size * 0.72 }}
      >
        AMO
      </span>
    </span>
  );
}
