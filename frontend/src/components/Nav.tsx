import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { AmoWordmark } from "@/components/AmoLogo";

const LINKS = [
  { label: "WHY AMO", to: "/philosophy" },
  { label: "EXPLORE", to: "/explore" },
  { label: "STORIES", to: "/stories" },
  { label: "JOURNAL", to: "/journal" },
  { label: "COMMUNITY", to: "/community" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMenuOpen(false), [location.pathname]);

  const goGetAmo = () => {
    setMenuOpen(false);
    if (location.pathname === "/") {
      document.getElementById("get-amo")?.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/#get-amo");
    }
  };

  return (
    <>
      <header
        data-testid="main-nav"
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
          scrolled ? "border-b border-white/10 bg-[#0A0A0B]/80 backdrop-blur-xl" : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
          <Link to="/" data-testid="nav-logo" aria-label="AMO home">
            <AmoWordmark size={26} />
          </Link>
          <nav className="hidden items-center gap-8 lg:flex">
            {LINKS.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                data-testid={`nav-${l.label.toLowerCase().replace(" ", "-")}`}
                className={`font-mono text-[11px] tracking-[0.22em] transition-colors hover:text-crimson-soft ${
                  location.pathname.startsWith(l.to) ? "text-crimson" : "text-fog"
                }`}
              >
                {l.label}
              </Link>
            ))}
            <button
              data-testid="nav-get-amo"
              onClick={goGetAmo}
              className="rounded-full bg-crimson px-5 py-2 font-mono text-[11px] tracking-[0.22em] text-white transition-transform hover:scale-105"
            >
              GET AMO
            </button>
          </nav>
          <button
            data-testid="nav-menu-button"
            className="lg:hidden text-bone"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            data-testid="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 flex flex-col justify-center bg-[#0A0A0B]/97 px-8 backdrop-blur-2xl lg:hidden"
          >
            <nav className="flex flex-col gap-6">
              {LINKS.map((l, i) => (
                <motion.div
                  key={l.to}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 * i, duration: 0.5 }}
                >
                  <Link to={l.to} className="font-serif text-4xl text-bone" data-testid={`mobile-nav-${l.label.toLowerCase().replace(" ", "-")}`}>
                    {l.label}
                  </Link>
                </motion.div>
              ))}
              <motion.button
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                data-testid="mobile-nav-get-amo"
                onClick={goGetAmo}
                className="mt-4 w-fit rounded-full bg-crimson px-8 py-3 font-mono text-sm tracking-[0.22em] text-white"
              >
                GET AMO
              </motion.button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
