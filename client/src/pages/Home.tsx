import { DomainSearch } from "@/components/DomainSearch";
import { PublicLayout } from "@/components/PublicLayout";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowUpLeft, BadgeCheck, Check, Cloud, Cpu, Globe2, Headphones, LockKeyhole, Server, ShieldCheck, Sparkles, Zap } from "lucide-react";
import { Link } from "wouter";

const plans = [
  { name: "Start", price: "2.99", note: "لكل بداية بسيطة", features: ["موقع واحد", "10GB SSD NVMe", "نطاق مجاني لسنة", "SSL مجاني"], action: "ابدأ صغيرًا" },
  { name: "Pro", price: "5.99", note: "الأكثر اختيارًا", features: ["10 مواقع", "50GB SSD NVMe", "زيارات بلا حدود", "نسخ احتياطي يومي", "دعم أولوية"], action: "اختر Pro", featured: true },
  { name: "Business", price: "9.99", note: "للمتاجر والفرق", features: ["مواقع بلا حدود", "100GB SSD NVMe", "بريد أعمال", "جدار حماية متقدم", "بيئة staging"], action: "ابنِ بثقة" },
];

const assurance = [
  { icon: Zap, title: "سرعة حقيقية", body: "تقنيات NVMe وشبكة مصممة للاستجابة السريعة." },
  { icon: ShieldCheck, title: "حماية هادئة", body: "طبقات أمن تلقائية تعمل في الخلفية باستمرار." },
  { icon: Headphones, title: "دعم حاضر", body: "فريق جاهز لمساعدتك في كل مرحلة من رحلتك." },
];

export default function Home() {
  return (
    <PublicLayout>
      <main>
        <section className="hero-section">
          <div className="container hero-grid">
            <div className="hero-copy">
              <p className="eyebrow"><span /> مساحة رقمية بلا حدود</p>
              <h1>موقعك.<br />نطاقك.<br /><em>عالمك الرقمي.</em></h1>
              <p className="hero-description">استضافة سريعة وآمنة تمنح فكرتك قاعدة ثابتة لتنمو، من أول نطاق حتى أكثر المشاريع طموحًا.</p>
              <div className="hero-trust">
                <span><BadgeCheck size={17} /> نطاق مجاني</span>
                <span><LockKeyhole size={17} /> SSL مجاني</span>
                <span><Headphones size={17} /> دعم 24/7</span>
              </div>
              <DomainSearch large />
              <div className="popular-tlds"><span>شائع:</span><b>.com</b><b>.net</b><b>.org</b><b>.io</b><b>.ai</b></div>
            </div>
            <ServerWorld />
          </div>
        </section>

        <section className="assurance-band">
          <div className="container assurance-grid">
            {assurance.map(({ icon: Icon, title, body }) => (
              <article key={title} className="assurance-item"><Icon /><div><h3>{title}</h3><p>{body}</p></div></article>
            ))}
            <div className="assurance-item"><Globe2 /><div><h3>شبكة عالمية</h3><p>وصول سلس لجمهورك أينما كان.</p></div></div>
          </div>
        </section>

        <section className="section pricing-section" id="comparison">
          <div className="container section-heading centered">
            <p className="eyebrow">استضافة تنمو معك</p>
            <h2>اختر الإيقاع المناسب لمشروعك.</h2>
            <p>خطط مباشرة وشفافة، تبدأ بما تحتاجه اليوم وتمنحك مساحة حقيقية للغد.</p>
            <div className="billing-switch"><button className="active">شهري</button><button>سنوي <small>وفّر حتى 40%</small></button></div>
          </div>
          <div className="container plan-grid">
            {plans.map((plan) => <PlanCard key={plan.name} {...plan} />)}
          </div>
          <div className="container plan-footnote"><span><Check /> ضمان استرداد 30 يومًا</span><span><Check /> بدون رسوم مفاجئة</span><span><Check /> ترحيل مجاني</span></div>
        </section>

        <section className="section architecture-section">
          <div className="container architecture-grid">
            <div className="architecture-copy">
              <p className="eyebrow">بنية تعمل بصمت</p>
              <h2>كل ما تحتاجه لتبدو فكرتك احترافية.</h2>
              <p>من النطاق وحتى طبقات الأمان والنسخ الاحتياطي، تتكامل خدماتنا بهدوء حتى تبقى أنت مركزًا على ما تصنعه.</p>
              <div className="feature-list">
                {["لوحة تحكم واضحة بلا تعقيد", "نسخ احتياطي يومي قابل للاسترجاع", "مراقبة استباقية للخدمة", "أدوات جاهزة للتوسع"].map((item) => <span key={item}><Check /> {item}</span>)}
              </div>
              <Link href="/hosting" className="text-link">استكشف الاستضافة <ArrowLeft size={17} /></Link>
            </div>
            <div className="architecture-board" aria-label="رسم توضيحي للبنية السحابية">
              <div className="board-glow" />
              <div className="cloud-node"><Cloud /><span>Cloud</span></div>
              <div className="flow-line flow-one" /><div className="flow-line flow-two" />
              <div className="infra-node node-one"><Server /><span>Hosting</span></div>
              <div className="infra-node node-two"><ShieldCheck /><span>Secure</span></div>
              <div className="infra-node node-three"><Cpu /><span>Compute</span></div>
              <div className="architecture-stat"><strong>99.9%</strong><span>استمرارية الخدمة</span></div>
            </div>
          </div>
        </section>

        <section className="section domain-showcase">
          <div className="container domain-showcase-card">
            <div>
              <p className="eyebrow">النطاق المثالي أقرب مما تتوقع</p>
              <h2>اجعل اسمك<br /><em>وجهتك الأولى.</em></h2>
              <p>تحقق من توفر اسمك في ثوانٍ، ثم أضف حماية الخصوصية وكل ما يحتاجه للانطلاق.</p>
              <Link href="/domains" className="button neon-button">ابحث عن نطاقك <ArrowUpLeft size={17} /></Link>
            </div>
            <div className="orbital-domains" aria-hidden="true">
              <div className="orbit orbit-one" /><div className="orbit orbit-two" />
              <div className="domain-orb">.com</div><b className="tag tag-net">.net</b><b className="tag tag-org">.org</b><b className="tag tag-io">.io</b><b className="tag tag-ai">.ai</b>
            </div>
          </div>
        </section>

        <section className="section steps-section">
          <div className="container section-heading centered"><p className="eyebrow">بداية سلسة</p><h2>من الفكرة إلى الإنترنت في دقائق.</h2></div>
          <div className="container steps-grid">
            {[{ n: "01", title: "اختر نطاقك", body: "ابدأ باسم يرسخ في الذاكرة ويعبّر عن فكرتك." }, { n: "02", title: "حدّد خطتك", body: "اختر الموارد التي تناسب ما تبنيه اليوم." }, { n: "03", title: "انطلق بأمان", body: "دع البنية تعمل في الخلفية بينما تركز على النمو." }].map((step) => <article className="step-card" key={step.n}><span>{step.n}</span><h3>{step.title}</h3><p>{step.body}</p></article>)}
          </div>
        </section>

        <section className="container cta-banner">
          <div><Sparkles /><div><p className="eyebrow">جاهز لفكرتك القادمة؟</p><h2>ابنِ بيتك الرقمي على أساس قوي.</h2></div></div>
          <Link href="/hosting" className="button white-button">ابدأ الآن <ArrowLeft size={18} /></Link>
        </section>
      </main>
    </PublicLayout>
  );
}

function PlanCard({ name, price, note, features, action, featured = false }: { name: string; price: string; note: string; features: string[]; action: string; featured?: boolean }) {
  return <article className={`plan-card ${featured ? "featured" : ""}`}>
    {featured && <div className="popular-ribbon">الخيار المفضل</div>}
    <p className="plan-name">Dounvile <b>{name}</b></p><p className="plan-note">{note}</p>
    <div className="plan-price"><strong>${price}</strong><span>/ شهريًا</span></div>
    <div className="plan-rule" />
    <ul>{features.map((feature) => <li key={feature}><Check size={16} /> {feature}</li>)}</ul>
    <Link href={`/order?plan=${name.toLowerCase()}`} className={`button plan-action ${featured ? "neon-button" : "dark-button"}`}>{action}</Link>
  </article>;
}

function ServerWorld() {
  return <div className="server-world" aria-label="رسم توضيحي لخوادم سحابية مؤمنة">
    <div className="world-grid" /><div className="world-halo halo-one" /><div className="world-halo halo-two" />
    <div className="world-cloud"><Cloud fill="currentColor" /><i /><i /><i /></div>
    <div className="server-stack stack-left"><span /><span /><span /><span /><b /></div>
    <div className="server-stack stack-right"><span /><span /><span /><span /><b /></div>
    <div className="server-stack stack-center"><span /><span /><span /><b><ShieldCheck /></b></div>
    <div className="world-pulse pulse-a" /><div className="world-pulse pulse-b" />
  </div>;
}
