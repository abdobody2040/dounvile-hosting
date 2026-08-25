import { Brand } from "@/components/Brand";
import { Button } from "@/components/ui/button";
import { resolveDrawerOpenState } from "@/lib/mobileSwipe";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { type PointerEvent as ReactPointerEvent, useEffect, useRef, useState } from "react";
import { Link, useLocation } from "wouter";
import { startLogin } from "@/const";
import { useRevealMotion } from "@/hooks/useRevealMotion";

const navigation = [
  { label: "النطاقات", path: "/domains" },
  { label: "الاستضافة", path: "/hosting" },
  { label: "خوادم VPS", path: "/vps" },
  { label: "الخوادم", path: "/servers" },
  { label: "البريد", path: "/email" },
  { label: "الحماية", path: "/security" },
];

export function PublicLayout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(() => new URLSearchParams(window.location.search).get("drawer") === "open");
  const [location] = useLocation();
  const shouldReduceMotion = useReducedMotion();
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLElement>(null);
  const edgeSwipeRef = useRef<{ x: number; y: number } | null>(null);
  const drawerSwipeRef = useRef<{ x: number; y: number } | null>(null);
  useRevealMotion(location);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    const previouslyFocused = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const backgroundTargets = Array.from(document.querySelectorAll<HTMLElement>(".site-shell > main, .site-shell > footer, .topbar-inner"));
    const backgroundState = backgroundTargets.map((element) => ({ element, ariaHidden: element.getAttribute("aria-hidden") }));
    backgroundTargets.forEach((element) => { element.setAttribute("inert", ""); element.setAttribute("aria-hidden", "true"); });
    const getFocusable = () => Array.from(drawerRef.current?.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])') ?? []).filter((element) => !element.hasAttribute("disabled"));
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setOpen(false); return; }
      if (event.key !== "Tab") return;
      const focusable = getFocusable();
      if (!focusable.length) { event.preventDefault(); return; }
      const first = focusable[0]; const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && (document.activeElement === last || !drawerRef.current?.contains(document.activeElement))) { event.preventDefault(); first.focus(); }
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    requestAnimationFrame(() => closeButtonRef.current?.focus());
    return () => { document.body.style.overflow = previousOverflow; window.removeEventListener("keydown", onKeyDown); backgroundState.forEach(({ element, ariaHidden }) => { element.removeAttribute("inert"); if (ariaHidden === null) element.removeAttribute("aria-hidden"); else element.setAttribute("aria-hidden", ariaHidden); }); previouslyFocused?.focus(); };
  }, [open]);

  const drawerTransition = shouldReduceMotion ? { duration: 0 } : { type: "spring" as const, stiffness: 380, damping: 34, mass: 0.72 };
  const startEdgeSwipe = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "mouse" || window.innerWidth > 700) return;
    edgeSwipeRef.current = { x: event.clientX, y: event.clientY };
    event.currentTarget.setPointerCapture(event.pointerId);
  };
  const finishEdgeSwipe = (event: ReactPointerEvent<HTMLDivElement>) => {
    const start = edgeSwipeRef.current;
    edgeSwipeRef.current = null;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
    if (!start || !resolveDrawerOpenState(false, event.clientX - start.x, event.clientY - start.y)) return;
    setOpen(true);
  };
  const startDrawerSwipe = (event: ReactPointerEvent<HTMLElement>) => {
    if (event.pointerType === "mouse" || window.innerWidth > 700) return;
    drawerSwipeRef.current = { x: event.clientX, y: event.clientY };
  };
  const finishDrawerSwipe = (event: ReactPointerEvent<HTMLElement>) => {
    const start = drawerSwipeRef.current;
    drawerSwipeRef.current = null;
    if (!start || resolveDrawerOpenState(true, event.clientX - start.x, event.clientY - start.y)) return;
    setOpen(false);
  };

  return (
    <div className="site-shell" dir="rtl">
      <header className="topbar">
        <div className="topbar-inner">
          <Link href="/" className="brand-link" onClick={() => setOpen(false)}><Brand /></Link>
          <nav className="desktop-nav" aria-label="التنقل الرئيسي">
            {navigation.map((item) => (
              <Link key={item.path} href={item.path} className={location === item.path ? "active" : ""}>{item.label}</Link>
            ))}
            <a href="#comparison">المقارنة</a>
          </nav>
          <div className="nav-actions">
            <button className="text-action" onClick={() => startLogin()}>تسجيل الدخول</button>
            <Link href="/hosting" className="button neon-button">ابدأ الآن</Link>
          </div>
          <button className="mobile-menu-button" aria-label="فتح القائمة" aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen(true)}>
            <Menu />
          </button>
        </div>
      </header>
      {!open && <div className="mobile-edge-swipe-zone" aria-hidden="true" onPointerDown={startEdgeSwipe} onPointerUp={finishEdgeSwipe} onPointerCancel={() => { edgeSwipeRef.current = null; }} />}
      <AnimatePresence>
        {open && <>
          <motion.button className="mobile-nav-scrim" type="button" aria-label="إغلاق القائمة" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.18 }} onClick={() => setOpen(false)} />
          <motion.aside ref={drawerRef} id="mobile-navigation" className="mobile-nav mobile-nav-drawer" role="dialog" aria-modal="true" aria-label="قائمة Dounvile للجوال" drag="x" dragConstraints={{ left: 0, right: 120 }} dragElastic={0.08} onPointerDown={startDrawerSwipe} onPointerUp={finishDrawerSwipe} onDragEnd={(_, info) => { if (!resolveDrawerOpenState(true, info.offset.x, info.offset.y, info.velocity.x)) setOpen(false); }} initial={shouldReduceMotion ? false : { x: "100%", opacity: 0.7 }} animate={{ x: 0, opacity: 1 }} exit={shouldReduceMotion ? undefined : { x: "100%", opacity: 0.7 }} transition={drawerTransition}>
            <div className="mobile-drawer-head"><Brand /><button ref={closeButtonRef} type="button" aria-label="إغلاق القائمة" onClick={() => setOpen(false)}><X /></button></div>
            <p className="mobile-drawer-kicker">انتقل إلى ما تحتاجه</p>
            <nav className="mobile-drawer-links" aria-label="روابط الجوال">{navigation.map((item, index) => <motion.div key={item.path} initial={shouldReduceMotion ? false : { opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={shouldReduceMotion ? { duration: 0 } : { delay: 0.06 + index * 0.035, duration: 0.24, ease: [0.23, 1, 0.32, 1] }}><Link href={item.path} onClick={() => setOpen(false)}>{item.label}<span>←</span></Link></motion.div>)}</nav>
            <div className="mobile-drawer-actions"><button onClick={() => { setOpen(false); startLogin(); }}>تسجيل الدخول</button><Link href="/hosting" className="button neon-button" onClick={() => setOpen(false)}>ابدأ الآن</Link></div>
          </motion.aside>
        </>}
      </AnimatePresence>
      {children}
      <Footer />
    </div>
  );
}

function Footer() {
  const columns = [
    { heading: "المنتجات", links: ["تسجيل النطاقات", "استضافة المواقع", "خوادم VPS", "شهادات SSL"] },
    { heading: "الشركة", links: ["عن Dounvile", "مركز البيانات", "الوظائف", "تواصل معنا"] },
    { heading: "المساعدة", links: ["مركز الدعم", "قاعدة المعرفة", "حالة الخدمات", "فتح تذكرة"] },
    { heading: "القانونية", links: ["شروط الخدمة", "سياسة الخصوصية", "سياسة الاسترجاع", "الاستخدام المقبول"] },
  ];
  return (
    <footer className="site-footer">
      <div className="container footer-newsletter">
        <div>
          <span className="eyebrow">ابقَ في الصدارة</span>
          <h2>ابدأ رحلتك الرقمية بثقة.</h2>
          <p>رسائل موجزة عن العروض والتحديثات المهمة، عندما تكون مفيدة فقط.</p>
        </div>
        <form className="subscribe-form" onSubmit={(event) => event.preventDefault()}>
          <label className="sr-only" htmlFor="footer-email">بريدك الإلكتروني</label>
          <input id="footer-email" type="email" placeholder="بريدك الإلكتروني" />
          <Button type="submit" className="neon-button">اشترك</Button>
        </form>
      </div>
      <div className="container footer-grid">
        <div className="footer-brand">
          <Brand />
          <p>بنية رقمية واضحة وسريعة وآمنة للأفكار التي تستحق أن تكون على الإنترنت.</p>
          <span>© 2026 Dounvile. جميع الحقوق محفوظة.</span>
        </div>
        {columns.map((column) => (
          <section key={column.heading}>
            <h3>{column.heading}</h3>
            {column.links.map((link) => <a href="#footer" key={link}>{link}</a>)}
          </section>
        ))}
      </div>
    </footer>
  );
}
