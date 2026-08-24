import { Brand } from "@/components/Brand";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "wouter";
import { startLogin } from "@/const";

const navigation = [
  { label: "النطاقات", path: "/domains" },
  { label: "الاستضافة", path: "/hosting" },
  { label: "خوادم VPS", path: "/vps" },
  { label: "الخوادم", path: "/servers" },
  { label: "البريد", path: "/email" },
  { label: "الحماية", path: "/security" },
];

export function PublicLayout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [location] = useLocation();

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
          <button className="mobile-menu-button" aria-label={open ? "إغلاق القائمة" : "فتح القائمة"} onClick={() => setOpen((value) => !value)}>
            {open ? <X /> : <Menu />}
          </button>
        </div>
        {open && (
          <div className="mobile-nav">
            {navigation.map((item) => (
              <Link key={item.path} href={item.path} onClick={() => setOpen(false)}>{item.label}</Link>
            ))}
            <button onClick={() => startLogin()}>تسجيل الدخول</button>
            <Link href="/hosting" className="button neon-button" onClick={() => setOpen(false)}>ابدأ الآن</Link>
          </div>
        )}
      </header>
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
