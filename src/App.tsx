import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import SpamDetector from "./pages/SpamDetector";
import DigitRecognizer from "./pages/DigitRecognizer";
import ScorePredictor from "./pages/ScorePredictor";
import TaskManager from "./pages/TaskManager";
import CovidDashboard from "./pages/CovidDashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/$/, '') || '/'}>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/projects/spam-detector" element={<SpamDetector />} />
          <Route path="/projects/digit-recognizer" element={<DigitRecognizer />} />
          <Route path="/projects/score-predictor" element={<ScorePredictor />} />
          <Route path="/projects/task-manager" element={<TaskManager />} />
          <Route path="/projects/covid-dashboard" element={<CovidDashboard />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
