import { useAuth } from "@/_core/hooks/useAuth";
import DashboardLayout from "@/components/DashboardLayout";
import { trpc } from "@/lib/trpc";
import { CircleHelp, FileClock, PackageCheck, ShieldCheck, UsersRound } from "lucide-react";

export default function Admin() {
  const { user, isAuthenticated } = useAuth();
  const canView = isAuthenticated && user?.role === "admin";
  const { data, isLoading } = trpc.admin.summary.useQuery(undefined, { enabled: canView });
  return <DashboardLayout mode="admin"><div className="dash-page-head"><div><p className="eyebrow">الإدارة الداخلية</p><h1>نظرة تشغيلية هادئة.</h1><p>ملخص العملاء والخدمات والطلبات والدعم من مصدر البيانات الحقيقي.</p></div><div className={`admin-status-line ${canView ? "" : "dash-access-denied"}`}><ShieldCheck /> {canView ? (data?.configured ? "اتصال WHMCS مفعّل" : "بيانات WHMCS لم تُربط بعد") : "وصول المسؤول مطلوب"}</div></div>
    <section className="dash-overview-grid"><AdminStat icon={UsersRound} label="العملاء" value={data?.customers ?? "—"} /><AdminStat icon={PackageCheck} label="الخدمات النشطة" value={data?.activeServices ?? "—"} /><AdminStat icon={FileClock} label="الطلبات المفتوحة" value={data?.openOrders ?? "—"} /><AdminStat icon={CircleHelp} label="تذاكر الدعم" value={data?.openTickets ?? "—"} /></section>
    <section className="dash-panel"><div className="dash-panel-head"><h2>مصدر البيانات</h2><span>{isLoading ? "جارٍ التحقق" : "وصول مقيّد"}</span></div><div className="dash-empty"><ShieldCheck /><span>لا تعرض هذه اللوحة أرقامًا تجريبية. ستظهر مجاميع العملاء والخدمات والطلبات والتذاكر هنا فور إكمال ربط هوية المسؤول ومصدر WHMCS في الخادم.</span></div><p className="dashboard-help">التحكم في الأدوار يُنفذ على الخادم قبل إعادة أي ملخص إداري للواجهة.</p></section>
  </DashboardLayout>;
}
function AdminStat({ icon: Icon, label, value }: { icon: typeof UsersRound; label: string; value: string | number }) { return <article className="dash-stat"><Icon /><span>{label}</span><b>{value}</b><small>لا توجد بيانات مصطنعة</small></article>; }
