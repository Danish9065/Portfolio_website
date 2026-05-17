import { Navigate, Route, Routes } from "react-router-dom";
import { ToastProvider } from "./components/ToastProvider";
import { AdminLayout } from "./layouts/AdminLayout";
import { PublicLayout } from "./layouts/PublicLayout";
import { AboutPage } from "./pages/AboutPage";
import { ContactPage } from "./pages/ContactPage";
import { ExperiencePage } from "./pages/ExperiencePage";
import { HomePage } from "./pages/HomePage";
import { ProjectDetailPage } from "./pages/ProjectDetailPage";
import { ProjectsPage } from "./pages/ProjectsPage";
import { ResumePage } from "./pages/ResumePage";
import { ServicesPage } from "./pages/ServicesPage";
import { TestimonialsPage } from "./pages/TestimonialsPage";
import { AdminDashboardPage } from "./pages/admin/AdminDashboardPage";
import { AdminHomePage } from "./pages/admin/AdminHomePage";
import { AdminInquiriesPage } from "./pages/admin/AdminInquiriesPage";
import { AdminLoginPage } from "./pages/admin/AdminLoginPage";
import { AdminProjectsPage } from "./pages/admin/AdminProjectsPage";
import { AdminServicesPage } from "./pages/admin/AdminServicesPage";
import { AdminTestimonialsPage } from "./pages/admin/AdminTestimonialsPage";

export default function App() {
  return (
    <ToastProvider>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/projects/:slug" element={<ProjectDetailPage />} />
          <Route path="/experience" element={<ExperiencePage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/resume" element={<ResumePage />} />
          <Route path="/testimonials" element={<TestimonialsPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Route>
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboardPage />} />
          <Route path="home" element={<AdminHomePage />} />
          <Route path="projects" element={<AdminProjectsPage />} />
          <Route path="inquiries" element={<AdminInquiriesPage />} />
          <Route path="services" element={<AdminServicesPage />} />
          <Route path="testimonials" element={<AdminTestimonialsPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </ToastProvider>
  );
}
