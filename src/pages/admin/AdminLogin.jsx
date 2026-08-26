import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Eye, EyeOff, Lock, Mail, Leaf, LogIn, AlertCircle } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import SEO from "../../components/SEO";
import { ApiRequestError } from "../../lib/api";

const ease = [0.22, 1, 0.36, 1];

export default function AdminLogin() {
  const { login, admin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  if (admin) {
    const redirectTo = location.state?.from?.pathname || "/admin/dashboard";
    navigate(redirectTo, { replace: true });
  }

  const handleChange = (field) => (event) => {
    setForm((prev) => ({ ...prev, [field]: event.target.value }));
    if (error) setError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (!form.email.trim() || !form.password) {
      setError("Please enter your email and password.");
      return;
    }

    setSubmitting(true);

    try {
      await login(form.email.trim(), form.password);
      const redirectTo = location.state?.from?.pathname || "/admin/dashboard";
      navigate(redirectTo, { replace: true });
    } catch (err) {
      if (err instanceof ApiRequestError) {
        setError(err.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <SEO title="Admin Login | Entomology Science Association" noindex />

      <div className="flex min-h-screen w-full min-w-0 items-center justify-center bg-[linear-gradient(160deg,#06250b_0%,#0D3A11_55%,#173b20_100%)] px-4 py-10">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
          className="w-full max-w-[400px] min-w-0 rounded-[10px] border border-[#e5e9df] bg-[#fffdf9] p-6 shadow-[0_10px_35px_rgba(4,20,7,0.35)] sm:p-8"
        >
          <div className="flex flex-col items-center text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#b7d264]">
              <Leaf className="h-6 w-6 text-[#0D3A11]" />
            </div>
            <h1 className="mt-4 text-[20px] font-semibold text-[#1b311d]">Admin Login</h1>
            <p className="mt-1.5 text-[12.5px] font-medium text-[#5a6359]">
              Sign in to manage submissions, inquiries and site settings.
            </p>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-5 flex items-start gap-2 rounded-[6px] border border-red-300 bg-red-50 px-3 py-2.5 text-[11.5px] font-medium text-red-600"
            >
              <AlertCircle className="mt-[1px] h-[14px] w-[14px] shrink-0" />
              {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4" noValidate>
            <div>
              <label
                htmlFor="email"
                className="mb-1.5 block text-[11.5px] font-semibold text-[#3f4840]"
              >
                Email
              </label>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-3 top-1/2 h-[15px] w-[15px] -translate-y-1/2 text-[#7a8278]" />
                <input
                  id="email"
                  type="email"
                  autoComplete="username"
                  value={form.email}
                  onChange={handleChange("email")}
                  placeholder="admin@entomologyscience.org"
                  className="h-[42px] w-full rounded-[5px] border border-[#ccd4c8] bg-white pl-9 pr-3 text-[12.5px] font-medium text-[#2c362d] outline-none transition-all duration-300 placeholder:text-[#8c938b] focus:border-[#4d7251]"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-1.5 block text-[11.5px] font-semibold text-[#3f4840]"
              >
                Password
              </label>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-3 top-1/2 h-[15px] w-[15px] -translate-y-1/2 text-[#7a8278]" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  value={form.password}
                  onChange={handleChange("password")}
                  placeholder="Enter your password"
                  className="h-[42px] w-full rounded-[5px] border border-[#ccd4c8] bg-white pl-9 pr-10 text-[12.5px] font-medium text-[#2c362d] outline-none transition-all duration-300 placeholder:text-[#8c938b] focus:border-[#4d7251]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#7a8278] hover:text-[#3f4840]"
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <EyeOff className="h-[16px] w-[16px]" />
                  ) : (
                    <Eye className="h-[16px] w-[16px]" />
                  )}
                </button>
              </div>
            </div>

            <motion.button
              type="submit"
              disabled={submitting}
              whileHover={submitting ? {} : { y: -2 }}
              whileTap={submitting ? {} : { scale: 0.98 }}
              className="mt-2 flex min-h-[42px] w-full items-center justify-center gap-2 rounded-[5px] border border-[#174d1a] bg-[linear-gradient(180deg,#1e6421_0%,#124c17_100%)] text-[13px] font-semibold text-white shadow-[0_4px_10px_rgba(9,52,14,0.2)] transition-all duration-300 hover:border-[#347b35] hover:bg-[linear-gradient(180deg,#2a772d_0%,#1a5e20_100%)] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {submitting ? (
                <>
                  <span className="h-[15px] w-[15px] animate-spin rounded-full border-2 border-white/40 border-t-white" />
                  Signing in...
                </>
              ) : (
                <>
                  <LogIn className="h-[16px] w-[16px]" />
                  Sign In
                </>
              )}
            </motion.button>
          </form>

          <Link
            to="/"
            className="mt-6 block text-center text-[11.5px] font-semibold text-[#347330] hover:text-[#174c1b]"
          >
            ← Back to website
          </Link>
        </motion.div>
      </div>
    </>
  );
}
