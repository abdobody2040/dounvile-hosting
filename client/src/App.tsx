import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Discovery from "./pages/Discovery";
import Order from "./pages/Order";
import Account from "./pages/Account";
import Admin from "./pages/Admin";

const DomainsRoute = () => <Discovery />;
const HostingRoute = () => <Discovery type="hosting" />;
const ServicesRoute = () => <Discovery type="service" />;

function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/domains"} component={DomainsRoute} />
      <Route path={"/hosting"} component={HostingRoute} />
      <Route path={"/vps"} component={ServicesRoute} />
      <Route path={"/servers"} component={ServicesRoute} />
      <Route path={"/email"} component={ServicesRoute} />
      <Route path={"/security"} component={ServicesRoute} />
      <Route path={"/order"} component={Order} />
      <Route path={"/account"} component={Account} />
      <Route path={"/admin"} component={Admin} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
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
