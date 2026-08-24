import { Brand } from "@/components/Brand";
import { ArrowLeft, Orbit, Search } from "lucide-react";
import { Link } from "wouter";
import "./not-found.css";
import "./not-found-mobile.css";

export default function NotFound() {
  return <main className="not-found-page" dir="rtl"><div className="not-found-grid" /><div className="not-found-content"><Brand /><div className="not-found-orbit"><Orbit /><span>404</span></div><p className="eyebrow">إشارة مفقودة</p><h1>هذه الصفحة خرجت<br /><em>من المدار.</em></h1><p>قد يكون الرابط قد تغيّر أو أن الوجهة لم تعد موجودة. لنعد إلى مساحة مألوفة.</p><Link href="/" className="button neon-button">العودة للرئيسية <ArrowLeft size={18} /></Link><Link href="/domains" className="not-found-search"><Search size={15} /> ابحث عن نطاقك بدلًا من ذلك</Link></div></main>;
}
