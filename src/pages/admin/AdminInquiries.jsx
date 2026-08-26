import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Eye,
  Trash2,
  X,
  AlertCircle,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Mail,
} from "lucide-react";
import AdminLayout from "../../components/admin/AdminLayout";
import SEO from "../../components/SEO";
import api, { ApiRequestError } from "../../lib/api";

const ease = [0.22, 1, 0.36, 1];

const STATUS_OPTIONS = [
  { value: "all", label: "All Statuses" },
  { value: "new", label: "New" },
  { value: "read", label: "Read" },
  { value: "resolved", label: "Resolved" },
];

const statusStyles = {
  new: "bg-[#e9f1df] text-[#397232]",
  read: "bg-[#e5eef7] text-[#2f5f8a]",
  resolved: "bg-[#e5f2e6] text-[#227a2c]",
};

function StatusPill({ status }) {
  return (
    <span
      className={`inline-block whitespace-nowrap rounded-[4px] px-2 py-0.5 text-[10px] font-semibold capitalize ${
        statusStyles[status] || "bg-gray-100 text-gray-600"
      }`}
    >
      {status}
    </span>
  );
}

export default function AdminInquiries() {
  const [items, setItems] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, pages: 1, total: 0 });
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [selected, setSelected] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [statusSaving, setStatusSaving] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const params = new URLSearchParams({ page: String(page), limit: "10", status });
      if (search.trim()) params.set("search", search.trim());

      const res = await api.get(`/admin/inquiries?${params.toString()}`);
      setItems(res.data || []);
      setPagination(res.pagination || { page: 1, pages: 1, total: 0 });
    } catch (err) {
      setError(err instanceof ApiRequestError ? err.message : "Unable to load inquiries.");
    } finally {
      setLoading(false);
    }
  }, [page, status, search]);

  useEffect(() => {
    const timeout = setTimeout(load, 300);
    return () => clearTimeout(timeout);
  }, [load]);

  const openInquiry = async (item) => {
    setSelected(item);
    if (item.status === "new") {
      await handleStatusChange(item._id, "read", true);
    }
  };

  const handleStatusChange = async (id, newStatus, silent = false) => {
    if (!silent) setStatusSaving(true);
    try {
      const res = await api.patch(`/admin/inquiries/${id}`, { status: newStatus });
      setItems((prev) => prev.map((it) => (it._id === id ? res.data : it)));
      setSelected((prev) => (prev && prev._id === id ? res.data : prev));
    } catch (err) {
      if (!silent) {
        setError(err instanceof ApiRequestError ? err.message : "Failed to update status.");
      }
    } finally {
      if (!silent) setStatusSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await api.delete(`/admin/inquiries/${deleteTarget._id}`);
      setDeleteTarget(null);
      setSelected(null);
      load();
    } catch (err) {
      setError(err instanceof ApiRequestError ? err.message : "Failed to delete inquiry.");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <AdminLayout title="Contact Inquiries">
      <SEO title="Contact Inquiries | Admin" noindex />

      {error && (
        <div className="mb-4 flex items-start gap-2 rounded-[6px] border border-red-300 bg-red-50 px-3 py-2.5 text-[12px] font-medium text-red-600">
          <AlertCircle className="mt-[1px] h-[14px] w-[14px] shrink-0" />
          {error}
        </div>
      )}

      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1 min-w-0">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-[15px] w-[15px] -translate-y-1/2 text-[#7a8278]" />
          <input
            value={search}
            onChange={(e) => {
              setPage(1);
              setSearch(e.target.value);
            }}
            placeholder="Search by name, email or subject..."
            className="h-[38px] w-full rounded-[6px] border border-[#dfe5da] bg-white pl-9 pr-3 text-[12px] font-medium text-[#2c362d] outline-none focus:border-[#4d7251]"
          />
        </div>
        <select
          value={status}
          onChange={(e) => {
            setPage(1);
            setStatus(e.target.value);
          }}
          className="h-[38px] shrink-0 rounded-[6px] border border-[#dfe5da] bg-white px-3 text-[12px] font-medium text-[#2c362d] outline-none focus:border-[#4d7251]"
        >
          {STATUS_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {/* Desktop table */}
      <div className="hidden overflow-x-auto rounded-[8px] border border-[#e5e9df] bg-[#fffdf9] lg:block">
        <table className="w-full min-w-[820px] text-left text-[12px]">
          <thead>
            <tr className="border-b border-[#e5e9df] bg-[#f7f9f5] text-[10.5px] font-semibold uppercase tracking-wide text-[#5a6359]">
              <th className="px-4 py-3">Inquiry ID</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Subject</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-[#7a8278]">
                  Loading inquiries...
                </td>
              </tr>
            ) : items.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-[#7a8278]">
                  No inquiries found.
                </td>
              </tr>
            ) : (
              items.map((item) => (
                <tr key={item._id} className="border-b border-[#eef1ea] hover:bg-[#f8faf5]">
                  <td className="px-4 py-3 font-semibold text-[#25382a]">{item.inquiryId}</td>
                  <td className="max-w-[160px] truncate px-4 py-3">
                    <p className="truncate font-semibold text-[#25382a]">{item.fullName}</p>
                    <p className="truncate text-[10.5px] text-[#7a8278]">{item.email}</p>
                  </td>
                  <td className="max-w-[240px] truncate px-4 py-3">{item.subject}</td>
                  <td className="px-4 py-3">
                    <StatusPill status={item.status} />
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-[10.5px] text-[#7a8278]">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => openInquiry(item)}
                        className="rounded-[5px] border border-[#dfe5da] p-1.5 text-[#347331] hover:bg-[#eef4e9]"
                        title="View"
                      >
                        <Eye className="h-[14px] w-[14px]" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setDeleteTarget(item)}
                        className="rounded-[5px] border border-[#f3caca] p-1.5 text-red-500 hover:bg-red-50"
                        title="Delete"
                      >
                        <Trash2 className="h-[14px] w-[14px]" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="flex flex-col gap-3 lg:hidden">
        {loading ? (
          <p className="py-6 text-center text-[12px] text-[#7a8278]">Loading inquiries...</p>
        ) : items.length === 0 ? (
          <p className="py-6 text-center text-[12px] text-[#7a8278]">No inquiries found.</p>
        ) : (
          items.map((item) => (
            <div
              key={item._id}
              className="min-w-0 rounded-[8px] border border-[#e5e9df] bg-[#fffdf9] p-4"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <p className="truncate text-[12.5px] font-semibold text-[#25382a]">
                    {item.subject}
                  </p>
                  <p className="truncate text-[10.5px] text-[#7a8278]">{item.inquiryId}</p>
                </div>
                <StatusPill status={item.status} />
              </div>
              <p className="mt-2 truncate text-[11px] font-medium text-[#40483e]">
                {item.fullName} · <span className="break-all">{item.email}</span>
              </p>
              <p className="mt-1 text-[10.5px] text-[#7a8278]">
                {new Date(item.createdAt).toLocaleDateString()}
              </p>
              <div className="mt-3 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => openInquiry(item)}
                  className="flex flex-1 items-center justify-center gap-1.5 rounded-[5px] border border-[#dfe5da] py-1.5 text-[11px] font-semibold text-[#347331]"
                >
                  <Eye className="h-[13px] w-[13px]" /> View
                </button>
                <button
                  type="button"
                  onClick={() => setDeleteTarget(item)}
                  className="flex flex-1 items-center justify-center gap-1.5 rounded-[5px] border border-[#f3caca] py-1.5 text-[11px] font-semibold text-red-500"
                >
                  <Trash2 className="h-[13px] w-[13px]" /> Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {pagination.pages > 1 && (
        <div className="mt-4 flex items-center justify-center gap-3">
          <button
            type="button"
            disabled={page <= 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            className="flex items-center gap-1 rounded-[5px] border border-[#dfe5da] px-3 py-1.5 text-[11.5px] font-semibold text-[#25382a] disabled:opacity-40"
          >
            <ChevronLeft className="h-[13px] w-[13px]" /> Prev
          </button>
          <span className="text-[11.5px] font-medium text-[#5a6359]">
            Page {pagination.page} of {pagination.pages}
          </span>
          <button
            type="button"
            disabled={page >= pagination.pages}
            onClick={() => setPage((p) => Math.min(pagination.pages, p + 1))}
            className="flex items-center gap-1 rounded-[5px] border border-[#dfe5da] px-3 py-1.5 text-[11.5px] font-semibold text-[#25382a] disabled:opacity-40"
          >
            Next <ChevronRight className="h-[13px] w-[13px]" />
          </button>
        </div>
      )}

      {/* View modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.98 }}
              transition={{ duration: 0.3, ease }}
              onClick={(e) => e.stopPropagation()}
              className="max-h-[85vh] w-full max-w-[520px] min-w-0 overflow-y-auto rounded-[10px] border border-[#e5e9df] bg-[#fffdf9] p-5 sm:p-6"
            >
              <div className="mb-4 flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-[11px] font-semibold text-[#7a8278]">{selected.inquiryId}</p>
                  <h2 className="mt-0.5 text-[16px] font-semibold leading-snug text-[#1b311d]">
                    {selected.subject}
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => setSelected(null)}
                  className="shrink-0 rounded-full p-1.5 text-[#7a8278] hover:bg-[#eef1ea]"
                >
                  <X className="h-[18px] w-[18px]" />
                </button>
              </div>

              <div className="rounded-[7px] border border-[#eef1ea] bg-white p-3 text-[11.5px]">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-medium text-[#7a8278]">From</span>
                  <span className="font-semibold text-[#2c362d]">{selected.fullName}</span>
                </div>
                <div className="mt-1 flex items-center justify-between gap-2">
                  <span className="font-medium text-[#7a8278]">Email</span>
                  <a
                    href={`mailto:${selected.email}`}
                    className="flex items-center gap-1 font-semibold text-[#347331] hover:text-[#174b1a]"
                  >
                    <Mail className="h-[12px] w-[12px]" /> {selected.email}
                  </a>
                </div>
                <div className="mt-1 flex items-center justify-between gap-2">
                  <span className="font-medium text-[#7a8278]">Received</span>
                  <span className="font-semibold text-[#2c362d]">
                    {new Date(selected.createdAt).toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="mt-3">
                <p className="text-[10.5px] font-semibold text-[#5a6359]">Message</p>
                <p className="mt-1 whitespace-pre-wrap text-[12px] leading-relaxed text-[#2c362d]">
                  {selected.message}
                </p>
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-2">
                <span className="text-[11px] font-semibold text-[#5a6359]">Status:</span>
                <select
                  value={selected.status}
                  disabled={statusSaving}
                  onChange={(e) => handleStatusChange(selected._id, e.target.value)}
                  className="h-[30px] rounded-[5px] border border-[#dfe5da] bg-white px-2 text-[11.5px] font-medium text-[#2c362d]"
                >
                  {STATUS_OPTIONS.filter((o) => o.value !== "all").map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>

                {selected.status !== "resolved" && (
                  <button
                    type="button"
                    onClick={() => handleStatusChange(selected._id, "resolved")}
                    className="flex items-center gap-1.5 rounded-[5px] bg-[#164e19] px-3 py-1.5 text-[11px] font-semibold text-white hover:bg-[#216426]"
                  >
                    <CheckCircle2 className="h-[13px] w-[13px]" /> Mark Resolved
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => setDeleteTarget(selected)}
                  className="ml-auto flex items-center gap-1.5 rounded-[5px] border border-red-300 bg-white px-3 py-1.5 text-[11px] font-semibold text-red-500 hover:bg-red-50"
                >
                  <Trash2 className="h-[13px] w-[13px]" /> Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete confirmation */}
      <AnimatePresence>
        {deleteTarget && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              className="w-full max-w-[380px] rounded-[10px] border border-[#e5e9df] bg-[#fffdf9] p-5"
            >
              <div className="flex items-center gap-2 text-red-500">
                <AlertCircle className="h-5 w-5" />
                <h3 className="text-[14.5px] font-semibold text-[#1b311d]">Delete inquiry?</h3>
              </div>
              <p className="mt-2 text-[12px] font-medium text-[#5a6359]">
                Are you sure you want to delete this inquiry from{" "}
                <strong>{deleteTarget.fullName}</strong>? This action cannot be undone.
              </p>
              <div className="mt-4 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setDeleteTarget(null)}
                  disabled={deleting}
                  className="rounded-[5px] border border-[#dfe5da] px-3 py-1.5 text-[11.5px] font-semibold text-[#25382a]"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleDelete}
                  disabled={deleting}
                  className="rounded-[5px] bg-red-500 px-3 py-1.5 text-[11.5px] font-semibold text-white hover:bg-red-600 disabled:opacity-60"
                >
                  {deleting ? "Deleting..." : "Delete"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </AdminLayout>
  );
}
