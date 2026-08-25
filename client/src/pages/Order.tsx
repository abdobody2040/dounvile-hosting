import { PublicLayout } from "@/components/PublicLayout";
import { Check, ChevronLeft, CircleCheckBig, CreditCard, Globe2, ReceiptText, Server, ShieldCheck } from "lucide-react";
import { useMemo, useState } from "react";
import { Link, useLocation, useSearch } from "wouter";
import "../order.css";

const plans = [
  { id: "start", name: "Dounvile Start", price: 2.99, description: "المساحة الصحيحة لفكرة تبدأ." },
  { id: "pro", name: "Dounvile Pro", price: 5.99, description: "توازن عملي للفرق والأعمال النامية." },
  { id: "business", name: "Dounvile Business", price: 9.99, description: "موارد أوسع للتجارب الجادة." },
  { id: "lite", name: "Dounvile Lite", price: 2.99, description: "بداية هادئة لمواقع الهبوط." },
  { id: "studio", name: "Dounvile Studio", price: 5.99, description: "مصمم للمبدعين والفرق الصغيرة." },
  { id: "scale", name: "Dounvile Scale", price: 12.99, description: "حرية أكبر لمشاريع لا تتوقف." },
];

type DomainMode = "register" | "existing" | "transfer";

export default function Order() {
  const [location, setLocation] = useLocation();
  const search = useSearch();
  const params = useMemo(() => new URLSearchParams(search), [search]);
  const planFromUrl = params.get("plan") || "pro";
  const domainFromUrl = params.get("domain") || "";
  const [selectedPlan, setSelectedPlan] = useState(plans.find((plan) => plan.id === planFromUrl) ?? plans[1]);
  const [domainMode, setDomainMode] = useState<DomainMode>(domainFromUrl ? "register" : "register");
  const [domain, setDomain] = useState(domainFromUrl.replace(/\.[a-z]{2,12}$/i, ""));
  const [domainVerified, setDomainVerified] = useState(Boolean(domainFromUrl));
  const domainPrice = domainMode === "register" ? 12.99 : 0;
  const total = selectedPlan.price + domainPrice;
  const currentStep = domainVerified ? 3 : 2;
  const progress = ((currentStep - 1) / 3) * 100;
  const stepLabels = ["اختر الخطة", "اختر النطاق", "الحساب", "المراجعة والدفع"];

  return <PublicLayout><main className="order-page">
    <section className="container order-header"><div><p className="eyebrow">خطوات بسيطة، بداية أوضح</p><h1>رتّب عالمك الرقمي<br /><em>بالطريقة التي تناسبك.</em></h1></div><Link href="/hosting" className="text-link">العودة إلى الخطط <ChevronLeft size={17} /></Link></section>
    <div className="container order-steps" aria-label="مراحل الطلب" role="progressbar" aria-valuemin={1} aria-valuemax={4} aria-valuenow={currentStep} aria-valuetext={`المرحلة الحالية: ${stepLabels[currentStep - 1]}`}>
      <div className="order-progress-track" aria-hidden="true"><i style={{ transform: `scaleX(${progress / 100})` }} /></div>
      {stepLabels.map((label, index) => { const step = index + 1; const state = step < currentStep ? "done" : step === currentStep ? "active" : ""; return <span key={label} className={state}><i>{step}</i>{label}</span>; })}
    </div>
    <p className="container order-progress-state" role="status">أنت الآن في مرحلة <b>{stepLabels[currentStep - 1]}</b> — أكمل البيانات للمتابعة.</p>
    <section className="container order-layout">
      <div className="order-main">
        <section className="order-section"><div className="order-section-title"><span><Server /></span><div><p>01 — الاستضافة</p><h2>اختر مساحتك</h2></div></div><div className="order-plan-list">{plans.map((plan) => <button key={plan.id} type="button" className={selectedPlan.id === plan.id ? "selected" : ""} aria-pressed={selectedPlan.id === plan.id} onClick={() => setSelectedPlan(plan)}><div><b>{plan.name}</b><small>{plan.description}</small></div><strong>${plan.price}<small>/ شهر</small></strong><i>{selectedPlan.id === plan.id && <Check />}</i></button>)}</div><p className="order-selection-feedback" role="status">تم اختيار <b>{selectedPlan.name}</b> — ${selectedPlan.price.toFixed(2)} شهريًا.</p></section>
        <section className="order-section"><div className="order-section-title"><span><Globe2 /></span><div><p>02 — النطاق</p><h2>كيف تريد ربط اسمك؟</h2></div></div><div className="domain-mode-list">
          <button type="button" className={domainMode === "register" ? "selected" : ""} onClick={() => setDomainMode("register")}><i>{domainMode === "register" && <Check />}</i><div><b>سجّل نطاقًا جديدًا</b><small>ابحث عن اسمك واحجزه الآن.</small></div></button>
          <button type="button" className={domainMode === "existing" ? "selected" : ""} onClick={() => setDomainMode("existing")}><i>{domainMode === "existing" && <Check />}</i><div><b>لدي نطاق بالفعل</b><small>اربط النطاق الحالي باستضافتك الجديدة.</small></div></button>
          <button type="button" className={domainMode === "transfer" ? "selected" : ""} onClick={() => setDomainMode("transfer")}><i>{domainMode === "transfer" && <Check />}</i><div><b>انقل نطاقي إلى Dounvile</b><small>انقل إدارة نطاقك من شركة أخرى.</small></div></button>
        </div>
        <div className="order-domain-input"><label htmlFor="order-domain">{domainMode === "register" ? "ابحث عن اسمك" : "أدخل اسم نطاقك"}</label><div><input id="order-domain" value={domain} onChange={(event) => { setDomainVerified(false); setDomain(event.target.value); }} placeholder="مثال: mybrand" /><span>.com</span><button type="button" onClick={() => setDomainVerified(Boolean(domain.trim()))}>{domainVerified ? "تم التحقق" : "تحقق"}</button></div>{domainVerified && domain && <p><CircleCheckBig /> <bdi>{domain}.com</bdi> {domainMode === "register" ? "متاح للتسجيل — $12.99 للسنة الأولى." : "جاهز للربط مع خطتك."}</p>}</div>
        </section>
        <section className="order-security"><ShieldCheck /><div><b>الأمان جزء من البداية.</b><span>تتضمن كل خطة شهادة SSL مجانية ومراقبة أساسية للحماية دون تكاليف مخفية.</span></div></section>
      </div>
      <aside className="order-summary"><div className="summary-title"><ReceiptText /><h2>ملخص طلبك</h2></div><div className="summary-item"><div><span>خطة الاستضافة</span><b>{selectedPlan.name}</b></div><strong>${selectedPlan.price.toFixed(2)}</strong></div><div className="summary-item"><div><span>النطاق</span><b>{domain ? <bdi>{domain}.com</bdi> : "يُحدد لاحقًا"}</b></div><strong>{domainPrice ? `$${domainPrice.toFixed(2)}` : "—"}</strong></div><div className="summary-item free"><div><span>SSL أساسي</span><b>مشمول</b></div><strong>مجانًا</strong></div><div className="summary-total"><span>الإجمالي اليوم</span><strong>${total.toFixed(2)}</strong></div><button type="button" className="button neon-button continue-order" onClick={() => setLocation(`/account?plan=${selectedPlan.id}&domain=${encodeURIComponent(domain)}`)}>المتابعة للحساب <ChevronLeft size={18} /></button><p className="secure-note"><CreditCard /> الدفع الآمن سيُنجز عبر نظام الفوترة المرتبط بحسابك.</p></aside>
    </section>
  </main></PublicLayout>;
}
