import { useAuth } from "@/_core/hooks/useAuth";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarInset, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import { startLogin } from "@/const";
import { useIsMobile } from "@/hooks/useMobile";
import { CircleHelp, FileText, Globe2, LayoutDashboard, LockKeyhole, LogOut, PackageCheck, UsersRound } from "lucide-react";
import { useLocation } from "wouter";
import { Brand } from "./Brand";
import { Button } from "./ui/button";
import "./dashboard.css";

type DashboardMode = "client" | "admin";

export default function DashboardLayout({ children, mode = "client" }: { children: React.ReactNode; mode?: DashboardMode }) {
  const { loading, user } = useAuth();
  if (loading) return <LoadingGate />;
  if (!user) return <AccessGate title="تسجيل الدخول مطلوب" description="للوصول إلى خدماتك وفواتيرك وتذاكر الدعم، سجّل دخولك أولًا بشكل آمن." />;
  if (mode === "admin" && user.role !== "admin") return <AccessGate title="هذه المساحة للمسؤولين فقط" description="تم منع الوصول إلى ملخصات العملاء والخدمات لأنها تتطلب دور مسؤول معتمد." />;
  return <SidebarProvider className="dashboard-shell" dir="rtl"><DashboardLayoutContent mode={mode}>{children}</DashboardLayoutContent></SidebarProvider>;
}

function LoadingGate() {
  return <div className="dashboard-lock" dir="rtl"><div className="dashboard-lock-card"><div className="dashboard-lock-icon"><LockKeyhole /></div><h1>نُحضّر مساحتك الآمنة</h1><p>يتم التحقق من الجلسة قبل إظهار أي بيانات للحساب.</p></div></div>;
}

function AccessGate({ title, description }: { title: string; description: string }) {
  return <div className="dashboard-lock" dir="rtl"><div className="dashboard-lock-card"><div className="dashboard-lock-icon"><LockKeyhole /></div><h1>{title}</h1><p>{description}</p><Button onClick={() => startLogin()} className="neon-button">متابعة آمنة</Button></div></div>;
}

function DashboardLayoutContent({ children, mode }: { children: React.ReactNode; mode: DashboardMode }) {
  const { user, logout } = useAuth();
  const [location, setLocation] = useLocation();
  const { toggleSidebar } = useSidebar();
  const isMobile = useIsMobile();
  const menuItems = mode === "admin"
    ? [{ icon: LayoutDashboard, label: "الملخص", path: "/admin" }, { icon: UsersRound, label: "العملاء", path: "/admin" }, { icon: PackageCheck, label: "الخدمات", path: "/admin" }, { icon: CircleHelp, label: "الدعم", path: "/admin" }]
    : [{ icon: LayoutDashboard, label: "نظرة عامة", path: "/account" }, { icon: PackageCheck, label: "خدماتي", path: "/account" }, { icon: Globe2, label: "نطاقاتي", path: "/account" }, { icon: FileText, label: "الفواتير", path: "/account" }, { icon: CircleHelp, label: "الدعم", path: "/account" }];

  return <>
    <Sidebar side="right" collapsible="icon">
      <SidebarHeader className="h-[70px] px-3 flex-row items-center"><Brand /><button onClick={toggleSidebar} className="dashboard-brand-home" aria-label="طي القائمة">طي</button></SidebarHeader>
      <SidebarContent><SidebarMenu className="px-2 py-3">{menuItems.map((item, index) => <SidebarMenuItem key={`${item.label}-${index}`}><SidebarMenuButton isActive={index === 0 || location === item.path} onClick={() => setLocation(item.path)} tooltip={item.label}><item.icon /><span>{item.label}</span></SidebarMenuButton></SidebarMenuItem>)}</SidebarMenu></SidebarContent>
      <SidebarFooter><DropdownMenu><DropdownMenuTrigger asChild><button className="dash-user group-data-[collapsible=icon]:justify-center"><Avatar className="h-8 w-8"><AvatarFallback>{user?.name?.charAt(0).toUpperCase() || "د"}</AvatarFallback></Avatar><div className="dash-user-copy group-data-[collapsible=icon]:hidden"><b>{user?.name || "—"}</b><span>{mode === "admin" ? "مسؤول النظام" : user?.email || "حساب Dounvile"}</span></div></button></DropdownMenuTrigger><DropdownMenuContent align="start"><DropdownMenuItem onClick={logout} className="cursor-pointer text-destructive"><LogOut className="ml-2 h-4 w-4" />تسجيل الخروج</DropdownMenuItem></DropdownMenuContent></DropdownMenu></SidebarFooter>
    </Sidebar>
    <SidebarInset>
      <div className="dashboard-topbar flex items-center px-4">{isMobile && <SidebarTrigger className="dashboard-mobile-trigger" />}<span className="text-xs text-muted-foreground mr-3">Dounvile / {mode === "admin" ? "الإدارة" : "الحساب"}</span></div>
      <main className="dashboard-content">{children}</main>
    </SidebarInset>
  </>;
}
