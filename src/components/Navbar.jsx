import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import {
  ChevronDown,
  Menu,
  X,
  Home,
  Info,
  Target,
  FileText,
  Send,
  BookOpen,
  Mail,
} from "lucide-react";

/* =====================================================
   NAVIGATION DATA
===================================================== */

const navigation = [
  {
    label: "Home",
    path: "/",
    icon: Home,
  },
  {
    label: "About",
    path: "/about",
    icon: Info,
   
  },
  {
    label: "Aims & Scope",
    path: "/aims-and-scope",
    icon: Target,
  },
  {
    label: "Call for Papers",
    path: "/call-for-papers",
    icon: FileText,
  },
  {
    label: "Submission",
    path: "/submission",
    icon: Send,
  },
  {
    label: "Publication",
    path: "/publication",
    icon: BookOpen,
  },
  {
    label: "Contact",
    path: "/contact",
    icon: Mail,
  },
];

/* =====================================================
   LOGO MARK
   Designed to visually match the insect mark
===================================================== */

function LogoMark() {
  return (
    <svg
      viewBox="0 0 64 64"
      className="h-[48px] w-[48px] shrink-0"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* antenna */}
      <path
        d="M29 14C25 8 24 5 25 2"
        stroke="#315f23"
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      <path
        d="M35 14C39 8 40 5 39 2"
        stroke="#315f23"
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      {/* head */}
      <path
        d="M32 8L38 14L32 19L26 14L32 8Z"
        stroke="#315f23"
        strokeWidth="1.5"
      />

      {/* body */}
      <ellipse
        cx="32"
        cy="28"
        rx="5"
        ry="9"
        stroke="#315f23"
        strokeWidth="1.5"
      />

      <path
        d="M32 37V55"
        stroke="#315f23"
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      <path
        d="M27 35C25 43 27 51 32 57"
        stroke="#315f23"
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      <path
        d="M37 35C39 43 37 51 32 57"
        stroke="#315f23"
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      {/* left wings */}
      <path
        d="M27 20C18 18 12 22 9 30C16 30 23 30 28 27"
        stroke="#315f23"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />

      <path
        d="M27 29C18 31 14 38 14 48C21 45 27 40 30 34"
        stroke="#315f23"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />

      {/* right wings */}
      <path
        d="M37 20C46 18 52 22 55 30C48 30 41 30 36 27"
        stroke="#315f23"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />

      <path
        d="M37 29C46 31 50 38 50 48C43 45 37 40 34 34"
        stroke="#315f23"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />

      {/* wing details */}
      <path
        d="M20 23L27 27M17 34L27 32M44 23L37 27M47 34L37 32"
        stroke="#315f23"
        strokeWidth="1"
        strokeLinecap="round"
      />

      {/* legs */}
      <path
        d="M27 27L20 31L17 36"
        stroke="#315f23"
        strokeWidth="1.3"
        strokeLinecap="round"
      />

      <path
        d="M37 27L44 31L47 36"
        stroke="#315f23"
        strokeWidth="1.3"
        strokeLinecap="round"
      />

      <path
        d="M28 33L21 39L19 46"
        stroke="#315f23"
        strokeWidth="1.3"
        strokeLinecap="round"
      />

      <path
        d="M36 33L43 39L45 46"
        stroke="#315f23"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
    </svg>
  );
}

/* =====================================================
   NAVBAR
===================================================== */

export default function Navbar() {
  const location = useLocation();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileAboutOpen, setMobileAboutOpen] = useState(false);

  /* Close mobile menu after route change */
  useEffect(() => {
    setMobileMenuOpen(false);
    setMobileAboutOpen(false);
  }, [location.pathname]);

  /* Stop page scroll when mobile menu is open */
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  /* Close with Escape key */
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <>
      {/* =================================================
          MAIN HEADER
      ================================================= */}

      <header className="fixed top-0 z-50 w-full border-b border-[#eeeeee] bg-white shadow-[0_1px_4px_rgba(0,0,0,0.05)]">
        <div
          className="
            mx-auto
            flex
            h-[72px]
            w-full
            max-w-[1440px]
            items-center
            justify-between
            px-4
            sm:px-6
            lg:px-[26px]
          "
        >
          {/* =============================================
              LOGO
          ============================================= */}

          <Link
            to="/"
            aria-label="Entomology Science Association Home"
            className="group flex shrink-0 items-center gap-[8px]"
          >
            <div
              className="
                transition-transform
                duration-500
                ease-out
                group-hover:scale-[1.06]
                group-hover:-rotate-3
              "
            >
              <LogoMark />
            </div>

            <div className="flex flex-col leading-none">
              <span
                className="
                  text-[16px]
                  font-semibold
                  leading-[18px]
                  tracking-[-0.25px]
                  text-[#173b20]
                  transition-colors
                  duration-300
                  group-hover:text-[#426f2d]
                  sm:text-[17px]
                "
              >
                Entomology Science
              </span>

              <span
                className="
                  text-[16px]
                  font-semibold
                  leading-[18px]
                  tracking-[-0.25px]
                  text-[#173b20]
                  transition-colors
                  duration-300
                  group-hover:text-[#426f2d]
                  sm:text-[17px]
                "
              >
                Association
              </span>

              <span
                className="
                  mt-[3px]
                  whitespace-nowrap
                  text-[9px]
                  font-normal
                  leading-[11px]
                  tracking-[0.05px]
                  text-[#768376]
                  sm:text-[10px]
                "
              >
                Advancing Entomological Discoveries
              </span>
            </div>
          </Link>

          {/* =============================================
              DESKTOP NAVIGATION
          ============================================= */}

          <nav
            aria-label="Primary navigation"
            className="hidden items-center lg:flex"
          >
            <div className="flex items-center gap-[27px] xl:gap-[39px]">
              {navigation.map((item) => {
                /* ABOUT DROPDOWN */
                if (item.dropdown) {
                  const dropdownActive =
                    location.pathname === item.path ||
                    item.dropdown.some(
                      (subItem) => subItem.path === location.pathname
                    );

                  return (
                    <div
                      key={item.label}
                      className="group relative flex h-[72px] items-center"
                    >
                      <NavLink
                        to={item.path}
                        className={`
                          relative
                          flex
                          h-full
                          items-center
                          gap-[4px]
                          whitespace-nowrap
                          text-[14px]
                          font-semibold
                          tracking-[-0.1px]
                          transition-colors
                          duration-300
                          ${
                            dropdownActive
                              ? "text-[#406d2a]"
                              : "text-[#0d0d0d] hover:text-[#406d2a]"
                          }
                        `}
                      >
                        <span>{item.label}</span>

                        <ChevronDown
                          strokeWidth={2}
                          className="
                            h-[13px]
                            w-[13px]
                            transition-transform
                            duration-300
                            ease-out
                            group-hover:rotate-180
                          "
                        />

                        {/* animated underline */}
                        <span
                          className={`
                            absolute
                            bottom-[22px]
                            left-0
                            h-[2px]
                            bg-[#496f30]
                            transition-all
                            duration-300
                            ease-out
                            ${
                              dropdownActive
                                ? "w-full opacity-100"
                                : "w-0 opacity-0 group-hover:w-full group-hover:opacity-100"
                            }
                          `}
                        />
                      </NavLink>

                      {/* ===================================
                          DROPDOWN
                      =================================== */}

                      <div
                        className="
                          invisible
                          absolute
                          left-1/2
                          top-[62px]
                          z-50
                          w-[220px]
                          -translate-x-1/2
                          translate-y-2
                          opacity-0
                          transition-all
                          duration-300
                          ease-out
                          group-hover:visible
                          group-hover:translate-y-0
                          group-hover:opacity-100
                          group-focus-within:visible
                          group-focus-within:translate-y-0
                          group-focus-within:opacity-100
                        "
                      >
                        {/* invisible hover bridge */}
                        <div className="h-[10px]" />

                        <div
                          className="
                            overflow-hidden
                            rounded-[7px]
                            border
                            border-[#e6ebe2]
                            bg-white
                            py-2
                            shadow-[0_12px_35px_rgba(13,43,22,0.12)]
                          "
                        >
                          {item.dropdown.map((subItem) => (
                            <NavLink
                              key={subItem.path}
                              to={subItem.path}
                              className={({ isActive }) =>
                                `
                                  relative
                                  mx-2
                                  flex
                                  items-center
                                  rounded-[5px]
                                  px-4
                                  py-[10px]
                                  text-[13px]
                                  font-medium
                                  transition-all
                                  duration-300
                                  ${
                                    isActive
                                      ? "bg-[#f2f6ef] text-[#416f2d]"
                                      : "text-[#1c241c] hover:translate-x-[3px] hover:bg-[#f5f8f3] hover:text-[#416f2d]"
                                  }
                                `
                              }
                            >
                              {subItem.label}
                            </NavLink>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                }

                /* NORMAL LINK */
                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    end={item.path === "/"}
                    className={({ isActive }) =>
                      `
                        group/nav
                        relative
                        flex
                        h-[72px]
                        items-center
                        whitespace-nowrap
                        text-[14px]
                        font-semibold
                        tracking-[-0.1px]
                        transition-colors
                        duration-300
                        ${
                          isActive
                            ? "text-[#406d2a]"
                            : "text-[#0d0d0d] hover:text-[#406d2a]"
                        }
                      `
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <span>{item.label}</span>

                        <span
                          className={`
                            absolute
                            bottom-[22px]
                            left-0
                            h-[2px]
                            bg-[#496f30]
                            transition-all
                            duration-300
                            ease-out
                            rounded-full
                            ${
                              isActive
                                ? "w-full opacity-100"
                                : "w-0 opacity-0 group-hover/nav:w-full group-hover/nav:opacity-100"
                            }
                          `}
                        />
                      </>
                    )}
                  </NavLink>
                );
              })}
            </div>
          </nav>

          {/* =============================================
              MOBILE MENU BUTTON
          ============================================= */}

          <button
            type="button"
            aria-label="Open navigation menu"
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen(true)}
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-lg
              text-[#173b20]
              transition-all
              duration-300
              hover:bg-[#f2f6ef]
              hover:text-[#4f7936]
              active:scale-95
              lg:hidden
            "
          >
            <Menu className="h-6 w-6" strokeWidth={1.8} />
          </button>
        </div>
      </header>

      {/* =================================================
          MOBILE OVERLAY
      ================================================= */}

      <div
        onClick={() => setMobileMenuOpen(false)}
        className={`
          fixed
          inset-0
          z-[60]
          bg-black/35
          backdrop-blur-[2px]
          transition-all
          duration-300
          lg:hidden
          ${
            mobileMenuOpen
              ? "visible opacity-100"
              : "invisible opacity-0"
          }
        `}
      />

      {/* =================================================
          MOBILE DRAWER
      ================================================= */}

      <aside
        className={`
          fixed
          right-0
          top-0
          z-[70]
          flex
          h-dvh
          w-[86%]
          max-w-[340px]
          flex-col
          bg-white
          shadow-[-15px_0_40px_rgba(0,0,0,0.12)]
          transition-transform
          duration-500
          ease-[cubic-bezier(0.22,1,0.36,1)]
          lg:hidden
          ${
            mobileMenuOpen
              ? "translate-x-0"
              : "translate-x-full"
          }
        `}
      >
        {/* Mobile header */}

        <div className="flex h-[72px] items-center justify-between border-b border-[#ebeee9] px-5">
          <Link
            to="/"
            className="flex items-center gap-2"
          >
            <LogoMark />

            <div className="leading-tight">
              <p className="text-[14px] font-semibold text-[#173b20]">
                Entomology Science
              </p>

              <p className="text-[14px] font-semibold text-[#173b20]">
                Association
              </p>
            </div>
          </Link>

          <button
            type="button"
            aria-label="Close navigation menu"
            onClick={() => setMobileMenuOpen(false)}
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-lg
              text-[#173b20]
              transition-all
              duration-300
              hover:rotate-90
              hover:bg-[#f2f6ef]
              hover:text-[#4f7936]
            "
          >
            <X className="h-[22px] w-[22px]" />
          </button>
        </div>

        {/* Mobile links */}

        <nav className="flex-1 overflow-y-auto px-4 py-5">
          <div className="space-y-[5px]">
            {navigation.map((item, index) => {
              const Icon = item.icon;

              if (item.dropdown) {
                const isDropdownActive =
                  location.pathname === item.path ||
                  item.dropdown.some(
                    (subItem) => subItem.path === location.pathname
                  );

                return (
                  <div
                    key={item.label}
                    style={{
                      transitionDelay: mobileMenuOpen
                        ? `${index * 45}ms`
                        : "0ms",
                    }}
                    className={`
                      transition-all
                      duration-500
                      ${
                        mobileMenuOpen
                          ? "translate-x-0 opacity-100"
                          : "translate-x-5 opacity-0"
                      }
                    `}
                  >
                    <button
                      type="button"
                      onClick={() =>
                        setMobileAboutOpen((previous) => !previous)
                      }
                      className={`
                        flex
                        w-full
                        items-center
                        justify-between
                        rounded-lg
                        px-3
                        py-[12px]
                        text-left
                        text-[14px]
                        font-medium
                        transition-all
                        duration-300
                        ${
                          isDropdownActive
                            ? "bg-[#f1f5ee] text-[#416f2d]"
                            : "text-[#1d271d] hover:bg-[#f5f8f3] hover:text-[#416f2d]"
                        }
                      `}
                    >
                      <span className="flex items-center gap-3">
                        <Icon className="h-[17px] w-[17px]" strokeWidth={1.8} />

                        {item.label}
                      </span>

                      <ChevronDown
                        className={`
                          h-4
                          w-4
                          transition-transform
                          duration-300
                          ${
                            mobileAboutOpen
                              ? "rotate-180"
                              : "rotate-0"
                          }
                        `}
                      />
                    </button>

                    {/* Mobile dropdown */}

                    <div
                      className={`
                        grid
                        overflow-hidden
                        transition-all
                        duration-300
                        ${
                          mobileAboutOpen
                            ? "grid-rows-[1fr] opacity-100"
                            : "grid-rows-[0fr] opacity-0"
                        }
                      `}
                    >
                      <div className="min-h-0">
                        <div className="ml-[24px] mt-1 border-l border-[#dce7d6] pl-4">
                          {item.dropdown.map((subItem) => (
                            <NavLink
                              key={subItem.path}
                              to={subItem.path}
                              className={({ isActive }) =>
                                `
                                  block
                                  rounded-md
                                  px-3
                                  py-[10px]
                                  text-[13px]
                                  transition-all
                                  duration-300
                                  ${
                                    isActive
                                      ? "bg-[#f2f6ef] text-[#416f2d]"
                                      : "text-[#596259] hover:translate-x-1 hover:bg-[#f5f8f3] hover:text-[#416f2d]"
                                  }
                                `
                              }
                            >
                              {subItem.label}
                            </NavLink>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === "/"}
                  style={{
                    transitionDelay: mobileMenuOpen
                      ? `${index * 45}ms`
                      : "0ms",
                  }}
                  className={({ isActive }) =>
                    `
                      flex
                      items-center
                      gap-3
                      rounded-lg
                      px-3
                      py-[12px]
                      text-[14px]
                      font-medium
                      transition-all
                      duration-500
                      ${
                        mobileMenuOpen
                          ? "translate-x-0 opacity-100"
                          : "translate-x-5 opacity-0"
                      }
                      ${
                        isActive
                          ? "bg-[#f1f5ee] text-[#416f2d]"
                          : "text-[#1d271d] hover:translate-x-1 hover:bg-[#f5f8f3] hover:text-[#416f2d]"
                      }
                    `
                  }
                >
                  <Icon className="h-[17px] w-[17px]" strokeWidth={1.8} />

                  {item.label}
                </NavLink>
              );
            })}
          </div>
        </nav>

        {/* Mobile bottom */}

        <div className="border-t border-[#ebeee9] px-5 py-5">
          <p className="text-center text-[10px] leading-4 text-[#7c887d]">
            Advancing Entomological Discoveries
          </p>
        </div>
      </aside>
    </>
  );
}