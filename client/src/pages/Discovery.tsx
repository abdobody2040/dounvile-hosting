import { DomainSearch } from "@/components/DomainSearch";
import { PublicLayout } from "@/components/PublicLayout";
import { Check, CircleCheckBig, Globe2, ShieldCheck, Sparkles, Zap } from "lucide-react";
import { useMemo } from "react";
import { Link, useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import "./discovery.css";

export default function Discovery({ type = "domains" }: { type?: "domains" | "hosting" | "service" }) {
  const [location] = useLocation();
  const parameter = useMemo(() => new URLSearchParams(location.split("?")[1] || "").get("name") || "mybrand", [location]);
  const domainSearch = trpc.catalog.domainSearch.useQuery({ label: parameter }, { enabled: type === "domains" });
  if (type === "hosting") return <HostingPage />;
  if (type === "service") return <ServicePage />;
  const availability = domainSearch.data?.results.find((item) => item.availability === "available");
  const availabilityTitle = availability ? "اسم متاح للتسجيل" : domainSearch.isLoading ? "جارٍ التحقق من النطاق" : domainSearch.isError ? "تعذر إتمام التحقق" : domainSearch.data?.configured ? "لا توجد نتيجة متاحة حاليًا" : "يتطلب اتصال WHMCS للتحقق الحي";
  return <PublicLayout>
    <main className="discovery-page">
      <section className="subhero"><div className="container"><p className="eyebrow">ابدأ بالهوية</p><h1>اسمك يستحق<br /><em>مكانًا يلمع فيه.</em></h1><p>ابحث عن النطاق الذي يجعل حضورك الرقمي واضحًا ولا يُنسى.</p><DomainSearch large initialValue={parameter === "مشروعي" ? "" : parameter} /></div></section>
      <section className="section"><div className="container availability-panel"><div className="availability-title"><CircleCheckBig /><div><span>نتائج البحث عن</span><h2><bdi>{parameter}.com</bdi></h2></div></div><span className="available-label">{availabilityTitle}</span></div></section>
      <section className="container result-list section-tight">
        {domainSearch.isLoading && <div className="domain-query-state">نبحث بأمان في سجل النطاقات…</div>}
        {domainSearch.isError && <div className="domain-query-state error">تعذر الاتصال بخدمة التحقق. جرّب اسمًا آخر أو أعد المحاولة.</div>}
        {!domainSearch.isLoading && !domainSearch.isError && domainSearch.data?.results.length === 0 && <div className="domain-query-state">لم تصل أي نتائج لهذا الاسم. جرّب اسمًا أقصر أو امتدادًا مختلفًا.</div>}
        {!domainSearch.isLoading && !domainSearch.isError && domainSearch.data?.results.map((offer) => <article className="domain-result" key={offer.extension}><div className="tld-mark"><Globe2 /></div><div><h3><bdi>{offer.domain}</bdi></h3><p>{offer.availability === "available" ? "النطاق متاح ويمكن إضافته إلى طلبك." : offer.availability === "taken" ? "هذا الاسم مسجل بالفعل. جرّب امتدادًا آخر." : "التحقق الحي سيتوفر فور ربط WHMCS."}</p></div><span className={`state ${offer.availability}`}>{offer.availability === "available" ? "متاح" : offer.availability === "taken" ? "محجوز" : "قيد التحقق"}</span><strong>{offer.price ? `$${offer.price.toFixed(2)}` : "—"}<small>{offer.price ? "/سنة" : "حسب WHMCS"}</small></strong>{offer.availability === "available" ? <Link href={`/order?domain=${encodeURIComponent(offer.domain)}`} className="button dark-button">اختره</Link> : <Link href="/order" className="button dark-button">متابعة</Link>}</article>)}
      </section>
      <section className="section"><div className="container helpful-grid"><article><ShieldCheck /><div><h3>خصوصية مضمّنة</h3><p>أدوات حماية قابلة للتفعيل فورًا على اسمك الجديد.</p></div></article><article><Zap /><div><h3>إعداد فوري</h3><p>اربط نطاقك بالاستضافة بأقل عدد من الخطوات.</p></div></article><article><Sparkles /><div><h3>نقطة انطلاق</h3><p>ابدأ باستضافة متوافقة ومساعدة خبرائنا عند الحاجة.</p></div></article></div></section>
  </main>
  </PublicLayout>;
}

function HostingPage() {
  const packages = [
    { name: "Lite", price: "2.99", description: "لمواقع الهبوط والبدايات الهادئة", features: ["موقع واحد", "10GB NVMe", "SSL مجاني"] },
    { name: "Studio", price: "5.99", description: "للمبدعين والفرق الصغيرة", features: ["10 مواقع", "50GB NVMe", "نسخ يومي", "بريد أعمال"] },
    { name: "Scale", price: "12.99", description: "للمشاريع التي لا تقبل التوقف", features: ["مواقع بلا حدود", "150GB NVMe", "بيئة staging", "دعم أولوية"] },
  ];
  return <PublicLayout><main className="discovery-page"><section className="subhero hosting-subhero"><div className="container"><p className="eyebrow">استضافة بلا ضجيج</p><h1>كل السرعة التي<br /><em>تحتاجها فكرتك.</em></h1><p>خطط واضحة، ونقلة سلسة، وبنية متينة تواكب نمو جمهورك.</p></div></section><section className="section"><div className="container product-intro"><div><p className="eyebrow">ابحث عن تطابقك</p><h2>ثلاثة مسارات. هدف واحد: انطلاقة أقوى.</h2></div><p>أدوات تطوير عملية، حماية دائمة، ودعم شخصي يجعل إدارة موقعك أكثر بساطة.</p></div><div className="container hosting-package-grid">{packages.map((pack, index) => <article className={`hosting-package ${index === 1 ? "featured" : ""}`} key={pack.name}><span className="package-index">0{index + 1}</span><h3>Dounvile <b>{pack.name}</b></h3><p>{pack.description}</p><strong>${pack.price}<small>/ شهريًا</small></strong><ul>{pack.features.map((feature) => <li key={feature}><Check size={16} />{feature}</li>)}</ul><Link href={`/order?plan=${pack.name.toLowerCase()}`} className="button neon-button">اختر هذه الخطة</Link></article>)}</div></section><section className="section section-no-top"><div className="container comparison-table"><div className="table-heading"><h2>مقارنة سريعة</h2><p>تتعرف على الفرق قبل اتخاذ قرارك.</p></div>{[["نطاق مجاني", "—", "سنة كاملة", "سنة كاملة"], ["مواقع مستضافة", "1", "10", "بلا حدود"], ["تخزين NVMe", "10GB", "50GB", "150GB"], ["نسخ احتياطي", "أسبوعي", "يومي", "يومي + استعادة"], ["دعم أولوية", "—", "—", "متاح"]].map((row) => <div className="comparison-row" key={row[0]}>{row.map((item, index) => <span key={index}>{item}</span>)}</div>)}</div></section></main></PublicLayout>;
}

function ServicePage() {
  return <PublicLayout><main className="discovery-page"><section className="subhero"><div className="container"><p className="eyebrow">خدمات Dounvile</p><h1>تقنية واضحة.<br /><em>مساحة أكبر للنمو.</em></h1><p>استكشف خدمات الخوادم والبريد والحماية المصممة لتتكامل مع عالمك الرقمي.</p></div></section><section className="section"><div className="container service-cards">{[["VPS", "أداء منعزل للمشاريع ذات المتطلبات العالية."], ["خوادم مخصصة", "كل الموارد تحت سيطرتك الكاملة."], ["بريد أعمال", "عنوان احترافي يتوافق مع اسمك."], ["حماية متقدمة", "دروع ذكية تعمل خلف الكواليس."]].map(([title, body]) => <article key={title}><span><Globe2 /></span><h2>{title}</h2><p>{body}</p><Link href="/hosting" className="text-link">استكشف <span>←</span></Link></article>)}</div></section></main></PublicLayout>;
}
