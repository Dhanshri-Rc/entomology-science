import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Save,
  RotateCcw,
  AlertCircle,
  CheckCircle2,
  Building2,
  Mail,
  Phone,
  Globe2,
  MapPin,
  AtSign,
  Link2,
  Share2,
} from "lucide-react";
import AdminLayout from "../../components/admin/AdminLayout";
import SEO from "../../components/SEO";
import api, { ApiRequestError } from "../../lib/api";
import { useSiteSettings } from "../../context/SiteSettingsContext";

const FIELD_CONFIG = [
  { key: "organizationName", label: "Organization Name", icon: Building2, type: "text" },
  { key: "email", label: "Email", icon: Mail, type: "email" },
  { key: "phone", label: "Phone", icon: Phone, type: "text" },
  { key: "website", label: "Website", icon: Globe2, type: "text" },
  { key: "addressShort", label: "Address (Short)", icon: MapPin, type: "text" },
  { key: "addressFull", label: "Address (Full)", icon: MapPin, type: "text" },
  { key: "facebook", label: "Facebook URL", icon: Share2, type: "text" },
  { key: "instagram", label: "Instagram URL", icon: AtSign, type: "text" },
  { key: "x", label: "X / Twitter URL", icon: Link2, type: "text" },
];

export default function AdminSettings() {
  const { refresh } = useSiteSettings();
  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [resetting, setResetting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [confirmReset, setConfirmReset] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const res = await api.get("/admin/settings");
        if (!cancelled) setForm(res.data);
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof ApiRequestError ? err.message : "Unable to load settings.");
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

  const handleChange = (key) => (e) => {
    setForm((prev) => ({ ...prev, [key]: e.target.value }));
    setSuccess("");
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSuccess("");
    try {
      const res = await api.put("/admin/settings", form);
      setForm(res.data);
      setSuccess("Site settings updated successfully.");
      refresh();
    } catch (err) {
      setError(err instanceof ApiRequestError ? err.message : "Failed to update settings.");
    } finally {
      setSaving(false);
    }
  };

  const handleReset = async () => {
    setResetting(true);
    setError("");
    try {
      const res = await api.post("/admin/settings/reset");
      setForm(res.data.data);
      setSuccess("Site settings reset to defaults.");
      setConfirmReset(false);
      refresh();
    } catch (err) {
      setError(err instanceof ApiRequestError ? err.message : "Failed to reset settings.");
    } finally {
      setResetting(false);
    }
  };

  return (
    <AdminLayout title="Site / Contact Details">
      <SEO title="Site Settings | Admin" noindex />

      {error && (
        <div className="mb-4 flex items-start gap-2 rounded-[6px] border border-red-300 bg-red-50 px-3 py-2.5 text-[12px] font-medium text-red-600">
          <AlertCircle className="mt-[1px] h-[14px] w-[14px] shrink-0" />
          {error}
        </div>
      )}

      {success && (
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 flex items-start gap-2 rounded-[6px] border border-[#7fa86b]/40 bg-[#eaf3e5] px-3 py-2.5 text-[12px] font-medium text-[#246225]"
        >
          <CheckCircle2 className="mt-[1px] h-[14px] w-[14px] shrink-0" />
          {success}
        </motion.div>
      )}

      {loading || !form ? (
        <div className="h-[420px] w-full animate-pulse rounded-[8px] bg-[#eef1ea]" />
      ) : (
        <form
          onSubmit={handleSave}
          className="max-w-[640px] min-w-0 rounded-[8px] border border-[#e5e9df] bg-[#fffdf9] p-5 sm:p-6"
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {FIELD_CONFIG.map(({ key, label, icon: Icon, type }) => (
              <div key={key} className={key.includes("address") ? "sm:col-span-2" : ""}>
                <label className="mb-1.5 flex items-center gap-1.5 text-[11.5px] font-semibold text-[#3f4840]">
                  <Icon className="h-[13px] w-[13px] text-[#4d7251]" />
                  {label}
                </label>
                <input
                  type={type}
                  value={form[key] || ""}
                  onChange={handleChange(key)}
                  className="h-[38px] w-full rounded-[5px] border border-[#ccd4c8] bg-white px-3 text-[12px] font-medium text-[#2c362d] outline-none transition-all duration-300 focus:border-[#4d7251]"
                />
              </div>
            ))}
          </div>

          <div className="mt-6 flex flex-col gap-3 border-t border-[#e6e9e1] pt-4 sm:flex-row sm:items-center sm:justify-between">
            <button
              type="button"
              onClick={() => setConfirmReset(true)}
              className="flex items-center justify-center gap-1.5 rounded-[5px] border border-[#dfe5da] px-3 py-2 text-[11.5px] font-semibold text-[#5a6359] hover:border-[#c8d7c2] hover:bg-[#f3f7ef]"
            >
              <RotateCcw className="h-[13px] w-[13px]" /> Reset to Defaults
            </button>

            <motion.button
              type="submit"
              disabled={saving}
              whileHover={saving ? {} : { y: -2 }}
              whileTap={saving ? {} : { scale: 0.98 }}
              className="flex min-h-[38px] items-center justify-center gap-2 rounded-[5px] border border-[#174d1a] bg-[linear-gradient(180deg,#1e6421_0%,#124c17_100%)] px-5 text-[12.5px] font-semibold text-white shadow-[0_4px_10px_rgba(9,52,14,0.2)] transition-all duration-300 hover:border-[#347b35] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {saving ? (
                <>
                  <span className="h-[14px] w-[14px] animate-spin rounded-full border-2 border-white/40 border-t-white" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-[14px] w-[14px]" /> Save Changes
                </>
              )}
            </motion.button>
          </div>
        </form>
      )}

      {/* Reset confirmation */}
      {confirmReset && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-[380px] rounded-[10px] border border-[#e5e9df] bg-[#fffdf9] p-5">
            <div className="flex items-center gap-2 text-[#8a6a1a]">
              <AlertCircle className="h-5 w-5" />
              <h3 className="text-[14.5px] font-semibold text-[#1b311d]">
                Reset to default values?
              </h3>
            </div>
            <p className="mt-2 text-[12px] font-medium text-[#5a6359]">
              This will restore the organization name, contact details and social links to their
              original defaults. This does not delete the settings record.
            </p>
            <div className="mt-4 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setConfirmReset(false)}
                disabled={resetting}
                className="rounded-[5px] border border-[#dfe5da] px-3 py-1.5 text-[11.5px] font-semibold text-[#25382a]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleReset}
                disabled={resetting}
                className="rounded-[5px] bg-[#8a6a1a] px-3 py-1.5 text-[11.5px] font-semibold text-white hover:bg-[#725513] disabled:opacity-60"
              >
                {resetting ? "Resetting..." : "Reset"}
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
