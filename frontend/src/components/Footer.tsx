import { Link } from "react-router-dom";
import { SiInstagram, SiTiktok, SiYoutube } from "@icons-pack/react-simple-icons";
import { AmoWordmark } from "@/components/AmoLogo";
import { AmoBears } from "@/components/AmoBears";

const COLUMNS = [
  {
    title: "AMO",
    links: [
      { label: "Why AMO", to: "/philosophy" },
      { label: "Explore", to: "/explore" },
      { label: "AMO Map", to: "/map" },
      { label: "About", to: "/about" },
    ],
  },
  {
    title: "WORLD",
    links: [
      { label: "Stories", to: "/stories" },
      { label: "Journal", to: "/journal" },
      { label: "Community", to: "/community" },
      { label: "Share an Idea", to: "/community" },
    ],
  },
  {
    title: "LEGAL",
    links: [
      { label: "Contact", to: "/about" },
      { label: "Privacy", to: "/privacy" },
      { label: "Terms", to: "/terms" },
    ],
  },
];

export function Footer() {
  return (
    <footer data-testid="footer" className="border-t border-border bg-ink">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="flex flex-col gap-12 md:flex-row md:justify-between">
          <div className="max-w-xs space-y-4">
            <AmoWordmark size={30} />
            <p className="font-mono text-xs tracking-[0.3em] uppercase text-crimson">Feel seen.</p>
            <div className="flex gap-4 pt-2">
              <a data-testid="social-instagram" href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-fog transition-colors hover:text-crimson-soft">
                <SiInstagram size={18} />
              </a>
              <a data-testid="social-tiktok" href="https://tiktok.com" target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="text-fog transition-colors hover:text-crimson-soft">
                <SiTiktok size={18} />
              </a>
              <a data-testid="social-youtube" href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="text-fog transition-colors hover:text-crimson-soft">
                <SiYoutube size={18} />
              </a>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
            {COLUMNS.map((col) => (
              <div key={col.title}>
                <p className="mb-4 font-mono text-[10px] tracking-[0.3em] uppercase text-fog/70">{col.title}</p>
                <ul className="space-y-2.5">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <Link to={l.to} className="text-sm text-fog transition-colors hover:text-bone">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-14 flex items-center justify-between border-t border-border pt-8">
          <p className="text-xs text-fog/70">Made for two. <span className="text-crimson">♥</span></p>
          <AmoBears size={40} className="opacity-70 hover:opacity-100 transition-opacity" />
        </div>
      </div>
    </footer>
  );
}
