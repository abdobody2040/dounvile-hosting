import DashboardLayout from "@/components/DashboardLayout";
import { CheckoutProgress } from "@/components/CheckoutProgress";
import { BadgeCheck, CreditCard, Globe2, PackageCheck, ShieldCheck } from "lucide-react";
import { useMemo } from "react";
import { Link, useLocation, useSearch } from "wouter";

export default function Review() {
  const [location] = useLocation();
  const search = useSearch();
  const intent = useMemo(() => new URLSearchParams(search), [search]);
  const plan = intent.get("plan") || "pro";
  const domain = intent.get("domain") || "سيُحدد لاحقًا";

  return <DashboardLayout mode="client"><section className="checkout-review" dir="rtl"><div className="checkout-review-head"><div><p className="eyebrow">المراجعة والدفع</p><h1>خطوتك الأخيرة<br /><em>قبل الانطلاق.</em></h1><p>راجع اختياراتك، ثم أكمل الدفع من بوابة الفوترة الآمنة بعد تفعيلها.</p></div><BadgeCheck /></div><CheckoutProgress currentStep={4} /><div className="review-grid"><article className="review-card"><div><PackageCheck /><span>الاستضافة</span></div><b>Dounvile {plan.charAt(0).toUpperCase() + plan.slice(1)}</b><small>الخطة المختارة جاهزة للإضافة إلى حسابك.</small></article><article className="review-card"><div><Globe2 /><span>النطاق</span></div><bdi>{domain === "سيُحدد لاحقًا" ? domain : `${domain}.com`}</bdi><small>{domain === "سيُحدد لاحقًا" ? "أكمل اختيار النطاق قبل إصدار الفاتورة." : "سيتم التحقق النهائي من التوفر عبر WHMCS."}</small></article><article className="review-card payment-card"><div><CreditCard /><span>الدفع</span></div><b>بوابة الفوترة الآمنة</b><small>تظهر وسائل الدفع الحقيقية عند اتصال WHMCS.</small></article></div><div className="review-action"><ShieldCheck /><div><b>مراجعة آمنة ومفهومة</b><span>لن يُنشأ طلب أو تُخصم دفعة قبل ظهور تأكيد الفاتورة في بوابة الفوترة.</span></div><Link href={`/account?plan=${encodeURIComponent(plan)}&domain=${encodeURIComponent(domain === "سيُحدد لاحقًا" ? "" : domain)}`} className="button dark-button">العودة للحساب</Link></div></section></DashboardLayout>;
}
