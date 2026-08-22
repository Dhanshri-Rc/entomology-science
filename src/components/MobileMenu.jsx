import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { X, Mail, Phone } from "lucide-react";
import Icon from "./Icon";
import PrimaryButton from "./PrimaryButton";
import { navigation, siteInfo, socialLinks } from "../data/siteData";

export default function MobileMenu({ open, onClose }) {
  useEffect(() => {
    if (open) {
      document.body.classList.add("menu-open");
    } else {
      document.body.classList.remove("menu-open");
    }
    return () => document.body.classList.remove("menu-open");
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/50 z-50 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            aria-hidden="true"
          />
          <motion.aside
            className="fixed top-0 right-0 h-full w-[82%] max-w-sm bg-white z-50 shadow-2xl flex flex-col lg:hidden"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-border">
              <p className="font-display font-semibold text-heading">Menu</p>
              <button
                type="button"
                aria-label="Close navigation menu"
                onClick={onClose}
                className="p-2 rounded-md hover:bg-surface transition-colors duration-300"
              >
                <X className="w-6 h-6 text-heading" aria-hidden="true" />
              </button>
            </div>

            <nav aria-label="Mobile primary" className="flex-1 overflow-y-auto px-5 py-4">
              <ul className="flex flex-col gap-1">
                {navigation.map((item) => (
                  <li key={item.path}>
                    <NavLink
                      to={item.path}
                      end={item.path === "/"}
                      onClick={onClose}
                      className={({ isActive }) =>
                        `block py-3 px-3 rounded-md text-base font-medium transition-colors duration-300 ${
                          isActive ? "bg-surface text-secondary" : "text-heading hover:bg-surface"
                        }`
                      }
                    >
                      {item.label}
                    </NavLink>
                  </li>
                ))}
              </ul>

              <div className="mt-6">
                <PrimaryButton to="/submit-paper" icon="Send" onClick={onClose} className="w-full">
                  Submit Paper
                </PrimaryButton>
              </div>

              <div className="mt-8 pt-6 border-t border-border flex flex-col gap-3 text-sm text-body">
                <a href={`mailto:${siteInfo.email}`} className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-secondary" aria-hidden="true" />
                  {siteInfo.email}
                </a>
                <a href={`tel:${siteInfo.phone.replace(/[^+\d]/g, "")}`} className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-secondary" aria-hidden="true" />
                  {siteInfo.phone}
                </a>
              </div>

              <div className="mt-6 flex items-center gap-4">
                {socialLinks.map((s) => (
                  <a
                    key={s.label}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="text-primary hover:text-secondary transition-colors duration-300"
                  >
                    <Icon name={s.icon} className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </nav>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
