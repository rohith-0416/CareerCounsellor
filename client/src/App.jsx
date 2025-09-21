import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeToggle } from "@/components/theme-toggle";

// Pages
import Dashboard from "@/pages/dashboard";
import Analytics from "@/pages/analytics";
import Marks from "@/pages/marks";
import Skills from "@/pages/skills";
import LearningPathPage from "@/pages/learning-path";
import AIGuidancePage from "@/pages/ai-guidance";
import Courses from "@/pages/courses";
import News from "@/pages/news";
import Resume from "@/pages/resume";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Dashboard} />
      <Route path="/analytics" component={Analytics} />
      <Route path="/marks" component={Marks} />
      <Route path="/skills" component={Skills} />
      <Route path="/learning-path" component={LearningPathPage} />
      <Route path="/ai-guidance" component={AIGuidancePage} />
      <Route path="/courses" component={Courses} />
      <Route path="/news" component={News} />
      <Route path="/resume" component={Resume} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const style = {
    "--sidebar-width": "16rem",
    "--sidebar-width-icon": "3rem",
  };

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light" storageKey="career-counselor-theme">
        <TooltipProvider>
          <SidebarProvider style={style}>
            <div className="flex h-screen w-full">
              <AppSidebar />
              <div className="flex flex-col flex-1">
                <header className="flex items-center justify-between p-4 border-b bg-background">
                  <div className="flex items-center space-x-4">
                    <SidebarTrigger data-testid="button-sidebar-toggle" />
                    <div>
                      <h1 className="text-lg font-semibold">CareerCounsellor AI</h1>
                      <p className="text-sm text-muted-foreground">Your personalized career guidance platform</p>
                    </div>
                  </div>
                  <ThemeToggle />
                </header>
                <main className="flex-1 overflow-auto p-6">
                  <Router />
                </main>
              </div>
            </div>
          </SidebarProvider>
          <Toaster />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;