import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import HomePage from "./pages/home/HomePage";
import AuthPage from "./pages/auth/AuthPage";
import ProfilePage from "./pages/profile/ProfilePage";
import NetworkPage from "./pages/network/NetworkPage";
import { useFetchUser } from "./hooks/auth/useFetchUser";
import Navigation from "./components/nav/Navigation";
import SavedPosts from "./components/saved/SavedPosts";
import Saved from "./components/saved/Saved";

const queryClient = new QueryClient();

const App = () => {
  useFetchUser();

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Navigation />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/profile/*" element={<ProfilePage />} />
            <Route path="/network" element={<NetworkPage />} />
            <Route path="/saved" element={<Saved />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
