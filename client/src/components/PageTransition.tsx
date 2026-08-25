import { useEffect } from "react";
import { useLocation } from "wouter";

export function PageTransition({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const pathname = location.split("?")[0] || "/";
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [pathname]);

  return <div key={pathname} className="page-transition" data-route={pathname}>{children}</div>;
}
