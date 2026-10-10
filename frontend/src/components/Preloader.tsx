import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import { AmoWordmark } from "@/components/AmoLogo";

const IntroReadyContext = createContext(true);
export const useIntroReady = () => useContext(IntroReadyContext);

export function IntroProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || sessionStorage.getItem("amo-intro-seen") === "1") {
      setReady(true);
      return;
    }
    setShow(true);
    document.documentElement.style.overflow = "hidden";
    const t = setTimeout(() => {
      sessionStorage.setItem("amo-intro-seen", "1");
      setReady(true);
      setShow(false);
      document.documentElement.style.overflow = "";
    }, 2100);
    return () => {
      clearTimeout(t);
      document.documentElement.style.overflow = "";
    };
  }, []);

  return (
    <IntroReadyContext.Provider value={ready}>
      {children}
      <AnimatePresence>
        {show && (
          <motion.div
            key="amo-intro"
            data-testid="intro-overlay"
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ink"
            initial={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="relative">
              <motion.div
                initial={{ scale: 1 }}
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 0.7, delay: 1.3, ease: "easeInOut" }}
              >
                <AmoWordmark size={64} />
              </motion.div>
              {/* cover sweeps away left→right, revealing the mark */}
              <motion.div
                aria-hidden="true"
                className="absolute -inset-2 bg-ink"
                initial={{ scaleX: 1 }}
                animate={{ scaleX: 0 }}
                style={{ transformOrigin: "right" }}
                transition={{ duration: 1.1, delay: 0.15, ease: [0.76, 0, 0.24, 1] }}
              />
            </div>
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.05 }}
              className="mt-6 font-mono text-[10px] tracking-[0.45em] uppercase text-fog"
            >
              Love is paying attention
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </IntroReadyContext.Provider>
  );
}
