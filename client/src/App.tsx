import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Collections from "@/pages/Collections";
import CollectionDetail from "@/pages/CollectionDetail";
import AdminAddCollection from "@/pages/AdminAddCollection";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home}/>
      <Route path="/collections" component={Collections}/>
      <Route path="/collections/:id" component={CollectionDetail}/>
      <Route path="/admin/collections/new" component={AdminAddCollection}/>
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
