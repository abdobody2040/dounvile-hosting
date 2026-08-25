import { useAuth } from "@/_core/hooks/useAuth";
import DashboardLayout from "@/components/DashboardLayout";
import { CheckoutProgress } from "@/components/CheckoutProgress";
import { trpc } from "@/lib/trpc";
import { Boxes, CircleHelp, FileText, Globe2, PackageCheck, ReceiptText, Rocket, ShieldCheck } from "lucide-react";
import { useMemo } from "react";
import { Link, useLocation, useSearch } from "wouter";

export default function Account() {
  const { user, isAuthenticated } = useAuth();
  const [location] = useLocation();
  const search = useSearch();
  const orderIntent = useMemo(() => new URLSearchParams(search), [search]);
  const { data, isLoading } = trpc.account.summary.useQuery(undefined, { enabled: isAuthenticated });
  const hasIntent = Boolean(orderIntent.get("plan") || orderIntent.get("domain"));

  return <DashboardLayout mode="client"><div className="dash-page-head"><div><p className="eyebrow">منطقة العميل</p><h1>أهلًا {user?.name || "بك"}.</h1><p>كل ما يخص حضورك الرقمي، في مكان واحد.</p></div><div className="admin-status-line"><ShieldCheck /> {data?.configured ? "اتصال الفوترة مفعّل" : "بانتظار تهيئة اتصال الفوترة"}</div></div>
    {hasIntent && <div className="dash-order-intent"><Rocket /><div><b>توجد خطوة واحدة قبل المراجعة</b><span>{orderIntent.get("plan") ? `الخطة: ${orderIntent.get("plan")}` : ""}{orderIntent.get("domain") ? ` — النطاق: ${orderIntent.get("domain")}.com` : ""}</span></div><Link className="button neon-button" href={`/review?plan=${encodeURIComponent(orderIntent.get("plan") || "pro")}&domain=${encodeURIComponent(orderIntent.get("domain") || "")}`}>مراجعة الطلب</Link></div>}
    {hasIntent && <CheckoutProgress currentStep={3} />}
    <section className="dash-overview-grid"><Stat icon={Boxes} label="الخدمات" value={data?.services.length ?? "—"} /><Stat icon={Globe2} label="النطاقات" value={data?.domains.length ?? "—"} /><Stat icon={ReceiptText} label="الفواتير المعلقة" value={data?.invoices.length ?? "—"} /><Stat icon={CircleHelp} label="تذاكر الدعم" value={data?.tickets.length ?? "—"} /></section>
    <Panel title="خدماتك" icon={PackageCheck} description={isLoading ? "نجلب بيانات خدماتك بشكل آمن…" : data?.linked ? "لا توجد خدمات ظاهرة حاليًا." : "ستظهر خدماتك هنا بعد ربط حسابك في Dounvile بسجل العميل لدى WHMCS."} />
    <Panel title="النطاقات" icon={Globe2} description={data?.linked ? "لا توجد نطاقات ظاهرة حاليًا." : "يمكنك متابعة حالة النطاقات والتجديدات من هذه المساحة بعد اكتمال الربط."} />
    <Panel title="الفواتير والدعم" icon={FileText} description={data?.linked ? "لا توجد عناصر بحاجة إلى إجراء." : "ستظهر الفواتير وتحديثات تذاكر الدعم هنا مع بيانات WHMCS الحقيقية فقط."} />
  </DashboardLayout>;
}

function Stat({ icon: Icon, label, value }: { icon: typeof Boxes; label: string; value: string | number }) { return <article className="dash-stat"><Icon /><span>{label}</span><b>{value}</b><small>بيانات مباشرة عند الربط</small></article>; }
function Panel({ title, icon: Icon, description }: { title: string; icon: typeof Boxes; description: string }) { return <section className="dash-panel"><div className="dash-panel-head"><h2>{title}</h2><span>WHMCS</span></div><div className="dash-empty"><Icon /><span>{description}</span></div></section>; }
