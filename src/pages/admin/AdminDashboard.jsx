import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FileText,
  Inbox,
  MessageSquare,
  Sparkles,
  ArrowRight,
  AlertCircle,
} from "lucide-react";
import AdminLayout from "../../components/admin/AdminLayout";
import SEO from "../../components/SEO";
import api, { ApiRequestError } from "../../lib/api";

const ease = [0.22, 1, 0.36, 1];

function StatCard({ icon: Icon, label, value, delay, accent }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay, ease }}
      whileHover={{ y: -3 }}
      className="min-w-0 rounded-[8px] border border-[#e5e9df] bg-[#fffdf9] p-4 shadow-[0_3px_10px_rgba(22,58,23,0.05)] transition-all duration-300 hover:shadow-[0_8px_18px_rgba(22,58,23,0.09)] sm:p-5"
    >
      <div className="flex items-center gap-3">
        <div
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[7px]"
          style={{ backgroundColor: accent }}
        >
          <Icon className="h-[19px] w-[19px] text-white" />
        </div>
        <div className="min-w-0">
          <p className="text-[22px] font-bold leading-none text-[#1b311d]">{value}</p>
          <p className="mt-1 truncate text-[11px] font-semibold text-[#5a6359]">{label}</p>
        </div>
      </div>
    </motion.div>
  );
}

const statusStyles = {
  new: "bg-[#e9f1df] text-[#397232]",
  read: "bg-[#e5eef7] text-[#2f5f8a]",
  under_review: "bg-[#fdf3d9] text-[#8a6a1a]",
  resolved: "bg-[#e5eef7] text-[#2f5f8a]",
  accepted: "bg-[#e5f2e6] text-[#227a2c]",
  revision_required: "bg-[#fdf3d9] text-[#8a6a1a]",
  rejected: "bg-[#fbe6e6] text-[#a12e2e]",
  published: "bg-[#e2ecff] text-[#2b4e9e]",
};

function StatusPill({ status }) {
  const label = status?.replace(/_/g, " ") || "new";
  return (
    <span
      className={`inline-block rounded-[4px] px-2 py-0.5 text-[10px] font-semibold capitalize ${
        statusStyles[status] || "bg-gray-100 text-gray-600"
      }`}
    >
      {label}
    </span>
  );
}

export default function AdminDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const res = await api.get("/admin/dashboard");
        if (!cancelled) setData(res.data);
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof ApiRequestError
              ? err.message
              : "Unable to load dashboard data."
          );
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <AdminLayout title="Dashboard">
      <SEO title="Admin Dashboard | Entomology Science Association" noindex />

      {error && (
        <div className="mb-4 flex items-start gap-2 rounded-[6px] border border-red-300 bg-red-50 px-3 py-2.5 text-[12px] font-medium text-red-600">
          <AlertCircle className="mt-[1px] h-[14px] w-[14px] shrink-0" />
          {error}
        </div>
      )}

      {loading ? (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="h-[78px] w-full animate-pulse rounded-[8px] bg-[#eef1ea]"
            />
          ))}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard
              icon={FileText}
              label="Total Paper Submissions"
              value={data?.totalSubmissions ?? 0}
              delay={0}
              accent="#0D3A11"
            />
            <StatCard
              icon={Sparkles}
              label="New Paper Submissions"
              value={data?.newSubmissions ?? 0}
              delay={0.05}
              accent="#496f30"
            />
            <StatCard
              icon={Inbox}
              label="Total Inquiries"
              value={data?.totalInquiries ?? 0}
              delay={0.1}
              accent="#d5ad54"
            />
            <StatCard
              icon={MessageSquare}
              label="New Inquiries"
              value={data?.newInquiries ?? 0}
              delay={0.15}
              accent="#406d2a"
            />
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1, ease }}
              className="min-w-0 rounded-[8px] border border-[#e5e9df] bg-[#fffdf9] p-4 shadow-[0_3px_10px_rgba(22,58,23,0.04)] sm:p-5"
            >
              <div className="mb-3 flex items-center justify-between">
                <h2 className="text-[14px] font-semibold text-[#1b311d]">
                  Recent Submissions
                </h2>
                <Link
                  to="/admin/submissions"
                  className="flex items-center gap-1 text-[11.5px] font-semibold text-[#347331] hover:text-[#174b1a]"
                >
                  View all <ArrowRight className="h-3 w-3" />
                </Link>
              </div>

              <div className="flex flex-col gap-2">
                {data?.recentSubmissions?.length ? (
                  data.recentSubmissions.map((item) => (
                    <div
                      key={item._id}
                      className="flex min-w-0 items-center justify-between gap-3 rounded-[6px] border border-[#eef1ea] px-3 py-2"
                    >
                      <div className="min-w-0">
                        <p className="truncate text-[12px] font-semibold text-[#25382a]">
                          {item.paperTitle}
                        </p>
                        <p className="truncate text-[10.5px] font-medium text-[#7a8278]">
                          {item.fullName} · {item.submissionId}
                        </p>
                      </div>
                      <StatusPill status={item.status} />
                    </div>
                  ))
                ) : (
                  <p className="text-[12px] font-medium text-[#7a8278]">
                    No submissions yet.
                  </p>
                )}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15, ease }}
              className="min-w-0 rounded-[8px] border border-[#e5e9df] bg-[#fffdf9] p-4 shadow-[0_3px_10px_rgba(22,58,23,0.04)] sm:p-5"
            >
              <div className="mb-3 flex items-center justify-between">
                <h2 className="text-[14px] font-semibold text-[#1b311d]">Recent Inquiries</h2>
                <Link
                  to="/admin/inquiries"
                  className="flex items-center gap-1 text-[11.5px] font-semibold text-[#347331] hover:text-[#174b1a]"
                >
                  View all <ArrowRight className="h-3 w-3" />
                </Link>
              </div>

              <div className="flex flex-col gap-2">
                {data?.recentInquiries?.length ? (
                  data.recentInquiries.map((item) => (
                    <div
                      key={item._id}
                      className="flex min-w-0 items-center justify-between gap-3 rounded-[6px] border border-[#eef1ea] px-3 py-2"
                    >
                      <div className="min-w-0">
                        <p className="truncate text-[12px] font-semibold text-[#25382a]">
                          {item.subject}
                        </p>
                        <p className="truncate text-[10.5px] font-medium text-[#7a8278]">
                          {item.fullName} · {item.inquiryId}
                        </p>
                      </div>
                      <StatusPill status={item.status} />
                    </div>
                  ))
                ) : (
                  <p className="text-[12px] font-medium text-[#7a8278]">No inquiries yet.</p>
                )}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AdminLayout>
  );
}
