import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  FileText,
  MessageSquare,
  Settings,
  LogOut,
  Menu,
  X,
  Leaf,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const navItems = [
  { label: "Dashboard", to: "/admin/dashboard", icon: LayoutDashboard, end: true },
  { label: "Paper Submissions", to: "/admin/submissions", icon: FileText },
  { label: "Contact Inquiries", to: "/admin/inquiries", icon: MessageSquare },
  { label: "Site / Contact Details", to: "/admin/settings", icon: Settings },
];

export default function AdminLayout({ children, title }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { admin, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/admin/login", { replace: true });
  };

  const linkClasses = ({ isActive }) =>
    `group flex items-center gap-3 rounded-[6px] px-3 py-2.5 text-[13px] font-semibold transition-all duration-200 ${
      isActive
        ? "bg-[#173b20] text-white shadow-[0_2px_8px_rgba(9,40,13,0.25)]"
        : "text-[#dce8d5] hover:bg-[#173b20]/60 hover:text-white"
    }`;

  const SidebarContent = () => (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-2.5 px-5 py-6">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#b7d264]">
          <Leaf className="h-5 w-5 text-[#0D3A11]" />
        </div>
        <div className="min-w-0">
          <p className="truncate text-[13.5px] font-bold leading-tight text-white">
            ICEBIS Admin
          </p>
          <p className="truncate text-[10.5px] font-medium text-[#a9c39c]">
            Entomology Science Assoc.
          </p>
        </div>
      </div>

      <nav className="flex-1 space-y-1.5 px-3">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={linkClasses}
            onClick={() => setMobileOpen(false)}
          >
            <item.icon className="h-[17px] w-[17px] shrink-0" strokeWidth={1.8} />
            <span className="truncate">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="border-t border-[#1d4a25] px-3 py-4">
        <div className="mb-2 flex items-center gap-2.5 rounded-[6px] bg-[#0a2e10] px-3 py-2.5">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#d5ad54] text-[12px] font-bold text-[#0D3A11]">
            {admin?.name?.[0]?.toUpperCase() || "A"}
          </div>
          <div className="min-w-0">
            <p className="truncate text-[12px] font-semibold text-white">
              {admin?.name || "Administrator"}
            </p>
            <p className="truncate text-[10px] font-medium text-[#a9c39c]">{admin?.email}</p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleLogout}
          className="flex w-full items-center justify-center gap-2 rounded-[6px] border border-[#3a5a3f] bg-transparent px-3 py-2 text-[12.5px] font-semibold text-[#f0f4ec] transition-all duration-200 hover:border-[#d5ad54] hover:bg-[#173b20]"
        >
          <LogOut className="h-[15px] w-[15px]" />
          Logout
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen w-full min-w-0 bg-[#f7f9f5]">
      {/* Desktop sidebar */}
      <aside className="hidden w-[250px] shrink-0 bg-[linear-gradient(180deg,#0D3A11_0%,#06250b_100%)] lg:block">
        <SidebarContent />
      </aside>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 z-40 bg-black/40 lg:hidden"
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-y-0 left-0 z-50 w-[260px] bg-[linear-gradient(180deg,#0D3A11_0%,#06250b_100%)] lg:hidden"
            >
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="absolute right-3 top-4 rounded-full p-1.5 text-white/80 hover:bg-white/10"
              >
                <X className="h-5 w-5" />
              </button>
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main content */}
      <div className="flex min-h-screen min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex min-w-0 items-center justify-between border-b border-[#e5e9df] bg-[#fffdf9] px-4 py-3.5 sm:px-6">
          <div className="flex min-w-0 items-center gap-3">
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className="rounded-[6px] border border-[#dfe5da] p-2 text-[#25382a] lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
            <h1 className="truncate text-[16px] font-semibold text-[#1b311d] sm:text-[18px]">
              {title}
            </h1>
          </div>
        </header>

        <main className="min-w-0 flex-1 px-4 py-5 sm:px-6 sm:py-6">{children}</main>
      </div>
    </div>
  );
}
