import { useEffect, useRef } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Lenis from "lenis";
import { Toaster } from "@/components/ui/sonner";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { AddToAmoProvider } from "@/components/community/AddToAmo";
import Home from "@/pages/Home";
import Philosophy from "@/pages/Philosophy";
import Explore from "@/pages/Explore";
import MapPage from "@/pages/MapPage";
import Stories from "@/pages/Stories";
import Journal from "@/pages/Journal";
import JournalArticle from "@/pages/JournalArticle";
import Community from "@/pages/Community";
import About from "@/pages/About";
import Privacy from "@/pages/Privacy";
import Terms from "@/pages/Terms";

export default function App() {
  const location = useLocation();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ lerp: 0.09 });
    lenisRef.current = lenis;
    let id = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      id = requestAnimationFrame(raf);
    };
    id = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(id);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (location.hash) return; // hash navigation handled by target pages
    lenisRef.current?.scrollTo(0, { immediate: true });
    window.scrollTo(0, 0);
  }, [location.pathname, location.hash]);

  return (
    <AddToAmoProvider>
      <div className="min-h-svh bg-ink text-bone">
        <Nav />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/philosophy" element={<Philosophy />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/map" element={<MapPage />} />
            <Route path="/stories" element={<Stories />} />
            <Route path="/journal" element={<Journal />} />
            <Route path="/journal/:slug" element={<JournalArticle />} />
            <Route path="/community" element={<Community />} />
            <Route path="/about" element={<About />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
          </Routes>
        </main>
        <Footer />
      </div>
      <Toaster />
    </AddToAmoProvider>
  );
}
