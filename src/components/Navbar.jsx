import { NavLink, Link } from "react-router-dom";
import { Menu, ChevronDown } from "lucide-react";
import Container from "./Container";
import PrimaryButton from "./PrimaryButton";
import { navigation, siteInfo } from "../data/siteData";

function LogoMark() {
  return (
    <svg viewBox="0 0 48 48" className="w-11 h-11 shrink-0" aria-hidden="true">
      <circle cx="24" cy="24" r="23" fill="none" stroke="#0d2b16" strokeWidth="1.5" opacity="0.15" />
      <path
        d="M24 6c3 5 3 9 0 12-3-3-3-7 0-12Z"
        fill="#5f8f34"
      />
      <path
        d="M24 42c-3-5-3-9 0-12 3 3 3 7 0 12Z"
        fill="#5f8f34"
      />
      <path
        d="M6 24c5-3 9-3 12 0-3 3-7 3-12 0Z"
        fill="#5f8f34"
      />
      <path
        d="M42 24c-5 3-9 3-12 0 3-3 7-3 12 0Z"
        fill="#5f8f34"
      />
      <circle cx="24" cy="24" r="5.5" fill="#0d2b16" />
    </svg>
  );
}

export default function Navbar({ onMenuOpen }) {
  return (
    <div className="bg-white shadow-sm sticky top-0 z-40">
      <Container className="flex items-center justify-between py-3">
        <Link to="/" className="flex items-center gap-3 group">
          <LogoMark />
          <div className="leading-tight">
            <p className="font-display font-semibold text-heading text-lg sm:text-xl leading-tight">
              {siteInfo.name}
            </p>
            <p className="text-[11px] sm:text-xs text-muted">{siteInfo.tagline}</p>
          </div>
        </Link>

        <nav aria-label="Primary" className="hidden lg:flex items-center gap-7">
          {navigation.map((item) =>
            item.dropdown ? (
              <div key={item.label} className="relative group">
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center gap-1 text-sm font-medium transition-colors duration-300 py-2 border-b-2 ${
                      isActive
                        ? "text-secondary border-secondary"
                        : "text-heading border-transparent hover:text-secondary"
                    }`
                  }
                >
                  {item.label}
                  <ChevronDown className="w-3.5 h-3.5" aria-hidden="true" />
                </NavLink>
                <div className="absolute left-0 top-full pt-2 hidden group-hover:block group-focus-within:block min-w-[200px]">
                  <div className="bg-white rounded-md shadow-card border border-border py-2">
                    {item.dropdown.map((sub) => (
                      <NavLink
                        key={sub.path}
                        to={sub.path}
                        className={({ isActive }) =>
                          `block px-4 py-2 text-sm transition-colors duration-300 ${
                            isActive ? "text-secondary bg-surface" : "text-heading hover:bg-surface hover:text-secondary"
                          }`
                        }
                      >
                        {sub.label}
                      </NavLink>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === "/"}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors duration-300 py-2 border-b-2 ${
                    isActive
                      ? "text-secondary border-secondary"
                      : "text-heading border-transparent hover:text-secondary"
                  }`
                }
              >
                {item.label}
              </NavLink>
            )
          )}
        </nav>

        <div className="hidden lg:block">
          <PrimaryButton to="/submit-paper" icon="Send" variant="primary">
            Submit Paper
          </PrimaryButton>
        </div>

        <button
          type="button"
          aria-label="Open navigation menu"
          onClick={onMenuOpen}
          className="lg:hidden p-2 rounded-md text-heading hover:bg-surface transition-colors duration-300"
        >
          <Menu className="w-6 h-6" aria-hidden="true" />
        </button>
      </Container>
    </div>
  );
}
