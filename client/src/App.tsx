import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { lazy, Suspense } from "react";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { PageTransition } from "./components/PageTransition";
import { ThemeProvider } from "./contexts/ThemeContext";

const Home = lazy(() => import("./pages/Home"));
const Discovery = lazy(() => import("./pages/Discovery"));
const Order = lazy(() => import("./pages/Order"));
const Account = lazy(() => import("./pages/Account"));
const Admin = lazy(() => import("./pages/Admin"));
const Review = lazy(() => import("./pages/Review"));
const NotFound = lazy(() => import("./pages/NotFound"));
import "./refinement.css";
import "./interactions.css";
import "./motion.css";
import "./checkout.css";
import "./page-transition.css";
import "./mobile-drawer.css";

const DomainsRoute = () => <Discovery />;
const HostingRoute = () => <Discovery type="hosting" />;
const ServicesRoute = () => <Discovery type="service" />;

function Router() {
  // Route bundles load on demand so the landing page does not pay for dashboards and review flows.
  return (
    <PageTransition><Suspense fallback={<RouteFallback />}><Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/domains"} component={DomainsRoute} />
      <Route path={"/hosting"} component={HostingRoute} />
      <Route path={"/vps"} component={ServicesRoute} />
      <Route path={"/servers"} component={ServicesRoute} />
      <Route path={"/email"} component={ServicesRoute} />
      <Route path={"/security"} component={ServicesRoute} />
      <Route path={"/order"} component={Order} />
      <Route path={"/account"} component={Account} />
      <Route path={"/review"} component={Review} />
      <Route path={"/admin"} component={Admin} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch></Suspense></PageTransition>
  );
}

function RouteFallback() {
  return <div className="route-fallback" role="status" aria-live="polite"><span className="route-fallback-orbit" /><p>نجهّز مساحتك…</p></div>;
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="dark"
        // switchable
      >
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
