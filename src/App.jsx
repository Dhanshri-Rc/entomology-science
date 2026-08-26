import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import AimScope from "./pages/AimScope";
import CallForPapers from "./pages/CallForPapers";
import Submission from "./pages/Submission";
import Publication from "./pages/Publication";
import Contact from "./pages/Contact";
import SubmitPaper from "./pages/SubmitPaper";
import NotFound from "./pages/NotFound";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsConditions from "./pages/TermsConditions";

import { AuthProvider } from "./context/AuthContext";
import { SiteSettingsProvider } from "./context/SiteSettingsContext";
import AdminProtectedRoute from "./components/admin/AdminProtectedRoute";

import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminSubmissions from "./pages/admin/AdminSubmissions";
import AdminInquiries from "./pages/admin/AdminInquiries";
import AdminSettings from "./pages/admin/AdminSettings";

function PublicSite() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/aims-and-scope" element={<AimScope />} />
        <Route path="/call-for-papers" element={<CallForPapers />} />
        <Route path="/submission" element={<Submission />} />
        <Route path="/publication" element={<Publication />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/submit-paper" element={<SubmitPaper />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsConditions />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
}

export default function App() {
  return (
    <SiteSettingsProvider>
      <AuthProvider>
        <Routes>
          {/* Admin auth */}
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* Protected admin area */}
          <Route
            path="/admin/dashboard"
            element={
              <AdminProtectedRoute>
                <AdminDashboard />
              </AdminProtectedRoute>
            }
          />
          <Route
            path="/admin/submissions"
            element={
              <AdminProtectedRoute>
                <AdminSubmissions />
              </AdminProtectedRoute>
            }
          />
          <Route
            path="/admin/inquiries"
            element={
              <AdminProtectedRoute>
                <AdminInquiries />
              </AdminProtectedRoute>
            }
          />
          <Route
            path="/admin/settings"
            element={
              <AdminProtectedRoute>
                <AdminSettings />
              </AdminProtectedRoute>
            }
          />

          {/* Public site (existing UI, untouched) */}
          <Route path="/*" element={<PublicSite />} />
        </Routes>
      </AuthProvider>
    </SiteSettingsProvider>
  );
}
