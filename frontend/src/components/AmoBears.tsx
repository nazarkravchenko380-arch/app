import { useState } from "react";
import { motion } from "motion/react";

// Kodi (calm dark-brown) & Mimi (expressive light-brown, pink bow) — AMO's recurring bears.
export function AmoBears({ size = 72, className = "" }: { size?: number; className?: string }) {
  const [hearts, setHearts] = useState<number[]>([]);
  const poke = () => setHearts((h) => [...h.slice(-4), Date.now()]);
  return (
    <button
      type="button"
      data-testid="amo-bears-easter-egg"
      onClick={poke}
      className={`relative inline-block cursor-pointer ${className}`}
      aria-label="Kodi and Mimi, the AMO bears"
      style={{ width: size * 1.7, height: size }}
    >
      {hearts.map((h) => (
        <motion.span
          key={h}
          className="absolute left-1/2 top-0 text-crimson text-sm pointer-events-none"
          initial={{ opacity: 1, y: 0 }}
          animate={{ opacity: 0, y: -28 }}
          transition={{ duration: 1.1 }}
        >
          ♥
        </motion.span>
      ))}
      <motion.svg
        viewBox="0 0 120 72"
        width="100%"
        height="100%"
        animate={{ y: [0, -2, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* Kodi */}
        <circle cx="26" cy="16" r="8" fill="#5C4033" />
        <circle cx="50" cy="16" r="8" fill="#5C4033" />
        <circle cx="38" cy="38" r="26" fill="#6B4A33" />
        <circle cx="30" cy="34" r="3" fill="#0A0A0B" />
        <circle cx="46" cy="34" r="3" fill="#0A0A0B" />
        <ellipse cx="38" cy="45" rx="8" ry="6" fill="#8A6A4F" />
        <circle cx="38" cy="43" r="2.4" fill="#0A0A0B" />
        {/* Mimi */}
        <circle cx="82" cy="26" r="6" fill="#A9825A" />
        <circle cx="102" cy="26" r="6" fill="#A9825A" />
        <circle cx="92" cy="44" r="19" fill="#C09A6B" />
        <circle cx="86" cy="41" r="2.4" fill="#0A0A0B" />
        <circle cx="98" cy="41" r="2.4" fill="#0A0A0B" />
        <ellipse cx="92" cy="49" rx="6" ry="4.5" fill="#D9BC93" />
        <circle cx="92" cy="47.5" r="1.8" fill="#0A0A0B" />
        {/* bow */}
        <path d="M92 22 l-7 -5 v10 z M92 22 l7 -5 v10 z" fill="#F2A0B0" />
        <circle cx="92" cy="22" r="2.6" fill="#E97E96" />
      </motion.svg>
    </button>
  );
}
