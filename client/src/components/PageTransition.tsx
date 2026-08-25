import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect } from "react";
import { useLocation } from "wouter";

export function PageTransition({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const pathname = location.split("?")[0] || "/";
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [pathname]);

  const transition = { duration: 0.28, ease: [0.23, 1, 0.32, 1] as const };
  return <AnimatePresence mode="wait" initial={false}>
    <motion.div
      key={pathname}
      className="page-transition"
      initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={shouldReduceMotion ? undefined : { opacity: 0, y: -6 }}
      transition={shouldReduceMotion ? { duration: 0 } : transition}
    >
      {children}
    </motion.div>
  </AnimatePresence>;
}
