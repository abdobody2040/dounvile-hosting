import { useEffect } from "react";

const revealSelector = [
  ".hero-copy", ".assurance-item", ".section-heading", ".plan-card", ".architecture-copy",
  ".architecture-board", ".domain-showcase-card", ".step-card", ".cta-banner", ".subhero .container",
  ".availability-panel", ".domain-result", ".helpful-grid article", ".hosting-package", ".comparison-table",
  ".product-intro", ".order-header", ".order-summary", ".order-section", ".dashboard-card",
].join(",");

/** Reveals page sections only when they approach the viewport, avoiding expensive scroll listeners. */
export function useRevealMotion(routeKey: string) {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>(".site-shell");
    if (!root) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let order = 0;
    const observer = reduceMotion ? null : new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer?.unobserve(entry.target);
        }
      }),
      { rootMargin: "0px 0px -8%", threshold: 0.08 },
    );

    const observeTarget = (element: HTMLElement) => {
      if (element.dataset.reveal) return;
      element.dataset.reveal = "";
      element.style.setProperty("--reveal-delay", `${Math.min(order * 48, 336)}ms`);
      order += 1;
      if (reduceMotion) element.classList.add("is-visible");
      else observer?.observe(element);
    };

    const scan = (node: ParentNode) => node.querySelectorAll<HTMLElement>(revealSelector).forEach(observeTarget);
    scan(root);
    const mutations = new MutationObserver((records) => records.forEach((record) => {
      record.addedNodes.forEach((node) => {
        if (node instanceof HTMLElement) {
          if (node.matches(revealSelector)) observeTarget(node);
          scan(node);
        }
      });
    }));
    mutations.observe(root, { childList: true, subtree: true });

    return () => {
      mutations.disconnect();
      observer?.disconnect();
    };
  }, [routeKey]);
}
