
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./components/ThemeProvider";
import Navigation from "./components/Navigation";
import Dashboard from "./pages/Dashboard";
import Habits from "./pages/Habits";
import Coach from "./pages/Coach";
import Biomarkers from "./pages/Biomarkers";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="flex flex-col md:flex-row min-h-screen bg-gray-50 dark:bg-gray-900">
            <Navigation />
            <div className="flex-1 pb-20 md:pb-0">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/habits" element={<Habits />} />
                <Route path="/coach" element={<Coach />} />
                <Route path="/biomarkers" element={<Biomarkers />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
