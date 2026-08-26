import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Eye,
  Trash2,
  Download,
  X,
  AlertCircle,
  FileText,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import AdminLayout from "../../components/admin/AdminLayout";
import SEO from "../../components/SEO";
import api, { fileUrl, ApiRequestError } from "../../lib/api";

const ease = [0.22, 1, 0.36, 1];

const STATUS_OPTIONS = [
  { value: "all", label: "All Statuses" },
  { value: "new", label: "New" },
  { value: "under_review", label: "Under Review" },
  { value: "accepted", label: "Accepted" },
  { value: "revision_required", label: "Revision Required" },
  { value: "rejected", label: "Rejected" },
  { value: "published", label: "Published" },
];

const statusStyles = {
  new: "bg-[#e9f1df] text-[#397232]",
  under_review: "bg-[#fdf3d9] text-[#8a6a1a]",
  accepted: "bg-[#e5f2e6] text-[#227a2c]",
  revision_required: "bg-[#fdf3d9] text-[#8a6a1a]",
  rejected: "bg-[#fbe6e6] text-[#a12e2e]",
  published: "bg-[#e2ecff] text-[#2b4e9e]",
};

function StatusPill({ status }) {
  return (
    <span
      className={`inline-block whitespace-nowrap rounded-[4px] px-2 py-0.5 text-[10px] font-semibold capitalize ${
        statusStyles[status] || "bg-gray-100 text-gray-600"
      }`}
    >
      {status?.replace(/_/g, " ")}
    </span>
  );
}

export default function AdminSubmissions() {
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
      const params = new URLSearchParams({
        page: String(page),
        limit: "10",
        status,
      });
      if (search.trim()) params.set("search", search.trim());

      const res = await api.get(`/admin/submissions?${params.toString()}`);
      setItems(res.data || []);
      setPagination(res.pagination || { page: 1, pages: 1, total: 0 });
    } catch (err) {
      setError(err instanceof ApiRequestError ? err.message : "Unable to load submissions.");
    } finally {
      setLoading(false);
    }
  }, [page, status, search]);

  useEffect(() => {
    const timeout = setTimeout(load, 300);
    return () => clearTimeout(timeout);
  }, [load]);

  const handleStatusChange = async (id, newStatus) => {
    setStatusSaving(true);
    try {
      const res = await api.patch(`/admin/submissions/${id}/status`, { status: newStatus });
      setItems((prev) => prev.map((it) => (it._id === id ? res.data : it)));
      setSelected((prev) => (prev && prev._id === id ? res.data : prev));
    } catch (err) {
      setError(err instanceof ApiRequestError ? err.message : "Failed to update status.");
    } finally {
      setStatusSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await api.delete(`/admin/submissions/${deleteTarget._id}`);
      setDeleteTarget(null);
      setSelected(null);
      load();
    } catch (err) {
      setError(err instanceof ApiRequestError ? err.message : "Failed to delete submission.");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <AdminLayout title="Paper Submissions">
      <SEO title="Paper Submissions | Admin" noindex />

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
            placeholder="Search by name, email, title or submission ID..."
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
        <table className="w-full min-w-[900px] text-left text-[12px]">
          <thead>
            <tr className="border-b border-[#e5e9df] bg-[#f7f9f5] text-[10.5px] font-semibold uppercase tracking-wide text-[#5a6359]">
              <th className="px-4 py-3">Submission ID</th>
              <th className="px-4 py-3">Author</th>
              <th className="px-4 py-3">Paper Title</th>
              <th className="px-4 py-3">Area</th>
              <th className="px-4 py-3">Type</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={8} className="px-4 py-8 text-center text-[#7a8278]">
                  Loading submissions...
                </td>
              </tr>
            ) : items.length === 0 ? (
              <tr>
                <td colSpan={8} className="px-4 py-8 text-center text-[#7a8278]">
                  No submissions found.
                </td>
              </tr>
            ) : (
              items.map((item) => (
                <tr key={item._id} className="border-b border-[#eef1ea] hover:bg-[#f8faf5]">
                  <td className="px-4 py-3 font-semibold text-[#25382a]">
                    {item.submissionId}
                  </td>
                  <td className="max-w-[160px] truncate px-4 py-3">
                    <p className="truncate font-semibold text-[#25382a]">{item.fullName}</p>
                    <p className="truncate text-[10.5px] text-[#7a8278]">{item.email}</p>
                  </td>
                  <td className="max-w-[220px] truncate px-4 py-3">{item.paperTitle}</td>
                  <td className="max-w-[140px] truncate px-4 py-3">{item.researchArea}</td>
                  <td className="max-w-[120px] truncate px-4 py-3">{item.presentationType}</td>
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
                        onClick={() => setSelected(item)}
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
          <p className="py-6 text-center text-[12px] text-[#7a8278]">Loading submissions...</p>
        ) : items.length === 0 ? (
          <p className="py-6 text-center text-[12px] text-[#7a8278]">No submissions found.</p>
        ) : (
          items.map((item) => (
            <div
              key={item._id}
              className="min-w-0 rounded-[8px] border border-[#e5e9df] bg-[#fffdf9] p-4"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <p className="truncate text-[12.5px] font-semibold text-[#25382a]">
                    {item.paperTitle}
                  </p>
                  <p className="truncate text-[10.5px] text-[#7a8278]">
                    {item.submissionId}
                  </p>
                </div>
                <StatusPill status={item.status} />
              </div>
              <p className="mt-2 truncate text-[11px] font-medium text-[#40483e]">
                {item.fullName} · <span className="break-all">{item.email}</span>
              </p>
              <p className="mt-1 text-[10.5px] text-[#7a8278]">
                {new Date(item.createdAt).toLocaleDateString()} · {item.presentationType}
              </p>
              <div className="mt-3 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setSelected(item)}
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

      {/* Pagination */}
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
              className="max-h-[88vh] w-full max-w-[640px] min-w-0 overflow-y-auto rounded-[10px] border border-[#e5e9df] bg-[#fffdf9] p-5 sm:p-6"
            >
              <div className="mb-4 flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-[11px] font-semibold text-[#7a8278]">
                    {selected.submissionId}
                  </p>
                  <h2 className="mt-0.5 text-[16px] font-semibold leading-snug text-[#1b311d]">
                    {selected.paperTitle}
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

              <div className="mb-4 flex flex-wrap items-center gap-2">
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
              </div>

              <div className="grid grid-cols-1 gap-4 text-[12px] sm:grid-cols-2">
                <DetailBlock title="Author Information">
                  <DetailRow label="Full Name" value={selected.fullName} />
                  <DetailRow label="Email" value={selected.email} />
                  <DetailRow label="Affiliation" value={selected.affiliation} />
                  <DetailRow label="Country" value={selected.country} />
                </DetailBlock>

                <DetailBlock title="Corresponding Author">
                  <DetailRow label="Full Name" value={selected.correspondingAuthor?.fullName} />
                  <DetailRow label="Email" value={selected.correspondingAuthor?.email} />
                  <DetailRow label="Phone" value={selected.correspondingAuthor?.phone || "—"} />
                  <DetailRow
                    label="Address"
                    value={selected.correspondingAuthor?.address || "—"}
                  />
                </DetailBlock>
              </div>

              <DetailBlock title="Paper Information" className="mt-4">
                <DetailRow label="Research Area" value={selected.researchArea} />
                <DetailRow label="Presentation Type" value={selected.presentationType} />
                <DetailRow label="Keywords" value={selected.keywords} />
                <div className="mt-2">
                  <p className="text-[10.5px] font-semibold text-[#5a6359]">Abstract</p>
                  <p className="mt-1 whitespace-pre-wrap text-[11.5px] leading-relaxed text-[#2c362d]">
                    {selected.abstract}
                  </p>
                </div>
                {selected.notes && (
                  <div className="mt-2">
                    <p className="text-[10.5px] font-semibold text-[#5a6359]">
                      Message to Organizers
                    </p>
                    <p className="mt-1 whitespace-pre-wrap text-[11.5px] leading-relaxed text-[#2c362d]">
                      {selected.notes}
                    </p>
                  </div>
                )}
              </DetailBlock>

              <div className="mt-4 flex flex-wrap gap-2">
                {selected.manuscriptFile?.originalName && (
                  <a
                    href={fileUrl(`/admin/submissions/${selected._id}/manuscript`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 rounded-[5px] border border-[#9cad93] bg-white px-3 py-1.5 text-[11px] font-semibold text-[#37533a] hover:bg-[#eef4e9]"
                  >
                    <Download className="h-[13px] w-[13px]" /> Manuscript
                  </a>
                )}
                {selected.coverLetterFile?.originalName && (
                  <a
                    href={fileUrl(`/admin/submissions/${selected._id}/cover-letter`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 rounded-[5px] border border-[#9cad93] bg-white px-3 py-1.5 text-[11px] font-semibold text-[#37533a] hover:bg-[#eef4e9]"
                  >
                    <Download className="h-[13px] w-[13px]" /> Cover Letter
                  </a>
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
                <h3 className="text-[14.5px] font-semibold text-[#1b311d]">Delete submission?</h3>
              </div>
              <p className="mt-2 text-[12px] font-medium text-[#5a6359]">
                Are you sure you want to delete{" "}
                <strong>{deleteTarget.submissionId}</strong>? This action cannot be undone and
                will remove the manuscript and cover letter files permanently.
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

function DetailBlock({ title, children, className = "" }) {
  return (
    <div className={`min-w-0 rounded-[7px] border border-[#eef1ea] bg-white p-3 ${className}`}>
      <p className="mb-2 flex items-center gap-1.5 text-[11px] font-semibold text-[#25382a]">
        <FileText className="h-[12px] w-[12px] text-[#4d7251]" />
        {title}
      </p>
      <div className="flex flex-col gap-1.5">{children}</div>
    </div>
  );
}

function DetailRow({ label, value }) {
  return (
    <div className="flex min-w-0 items-start justify-between gap-2 text-[11.5px]">
      <span className="shrink-0 font-medium text-[#7a8278]">{label}</span>
      <span className="min-w-0 break-words text-right font-semibold text-[#2c362d]">
        {value || "—"}
      </span>
    </div>
  );
}
