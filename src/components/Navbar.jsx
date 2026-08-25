import { useEffect, useState } from "react";
import {
  Link,
  NavLink,
  useLocation,
} from "react-router-dom";

import {
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

import logo from "../assets/img/logo.png";

/* =====================================================
   NAVIGATION
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
   NAVBAR
===================================================== */

export default function Navbar() {
  const location = useLocation();

  const [mobileMenuOpen, setMobileMenuOpen] =
    useState(false);

  /* ===================================================
     CLOSE MENU AFTER ROUTE CHANGE
  ==================================================== */

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  /* ===================================================
     STOP BODY SCROLL
  ==================================================== */

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

  /* ===================================================
     ESCAPE KEY
  ==================================================== */

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener(
      "keydown",
      handleEscape
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleEscape
      );
    };
  }, []);

  return (
    <>
      {/* =================================================
          MAIN NAVBAR
      ================================================= */}

      <header
        className="
          fixed
          left-0
          right-0
          top-0
          z-50

          w-full

          border-b
          border-[#e8ece6]

          bg-white/95

          shadow-[0_1px_6px_rgba(12,45,18,0.06)]

          backdrop-blur-[10px]
        "
      >
        <div
          className="
            mx-auto

            flex
            h-[72px]
            w-full
            min-w-0
            max-w-[1180px]

            items-center
            justify-between

            px-4

            sm:px-6

            lg:px-6

            max-[390px]:px-4
          "
        >
          {/* =============================================
              LOGO
          ============================================= */}

          <Link
            to="/"
            aria-label="Entomology Science Association Home"
            className="
              group/logo

              flex
              min-w-0
              shrink-0
              items-center

              gap-[8px]

              max-[390px]:gap-[6px]
            "
          >
            {/* Logo image */}

            <div
              className="
                flex
                h-[96px]
                w-[116px]

                shrink-0

                items-center
                justify-center

                overflow-hidden

                transition-all
                duration-500
                ease-out

                group-hover/logo:scale-[1.05]

                sm:h-[98px]
                sm:w-[148px]

                max-[390px]:h-[92px]
                max-[390px]:w-[102px]
              "
            >
              <img
                src={logo}
                alt="Entomology Science Association"
                className="
                  block
                  h-full
                  w-full

                  object-contain
                "
              />
            </div>

           
          </Link>

          {/* =============================================
              DESKTOP NAVIGATION
          ============================================= */}

          <nav
            aria-label="Primary navigation"
            className="
              hidden
              items-center

              min-[1080px]:flex
            "
          >
            <div
              className="
                flex
                items-center

                gap-[18px]

                min-[1180px]:gap-[23px]

                xl:gap-[27px]
              "
            >
              {navigation.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === "/"}
                  className={({ isActive }) => `
                    group/nav
                    relative

                    flex
                    h-[72px]

                    items-center

                    whitespace-nowrap

                    text-[12.5px]
                    font-semibold

                    tracking-[-0.1px]

                    transition-colors
                    duration-300

                    min-[1180px]:text-[13px]

                    xl:text-[14px]

                    ${
                      isActive
                        ? "text-[#406d2a]"
                        : "text-[#151915] hover:text-[#406d2a]"
                    }
                  `}
                >
                  {({ isActive }) => (
                    <>
                      <span>
                        {item.label}
                      </span>

                      {/* animated underline */}

                      <span
                        className={`
                          absolute
                          bottom-[19px]
                          left-0

                          h-[2px]

                          rounded-full

                          bg-[#496f30]

                          transition-all
                          duration-300
                          ease-out

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
              ))}
            </div>
          </nav>

          {/* =============================================
              MOBILE / TABLET MENU BUTTON
          ============================================= */}

          <button
            type="button"
            aria-label={
              mobileMenuOpen
                ? "Close navigation menu"
                : "Open navigation menu"
            }
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation"
            onClick={() =>
              setMobileMenuOpen(true)
            }
            className="
              flex
              h-[40px]
              w-[40px]

              shrink-0

              items-center
              justify-center

              rounded-[7px]

              text-[#173b20]

              transition-all
              duration-300

              hover:bg-[#f0f5ed]
              hover:text-[#4f7936]

              active:scale-95

              min-[1080px]:hidden
            "
          >
            <Menu
              className="h-[23px] w-[23px]"
              strokeWidth={1.8}
            />
          </button>
        </div>
      </header>

      {/* =================================================
          MOBILE OVERLAY
      ================================================= */}

      <div
        aria-hidden={!mobileMenuOpen}
        onClick={() =>
          setMobileMenuOpen(false)
        }
        className={`
          fixed
          inset-0
          z-[60]

          bg-black/35

          backdrop-blur-[2px]

          transition-all
          duration-300

          min-[1080px]:hidden

          ${
            mobileMenuOpen
              ? "visible opacity-100"
              : "invisible opacity-0"
          }
        `}
      />

      {/* =================================================
          MOBILE / TABLET DRAWER
      ================================================= */}

      <aside
        id="mobile-navigation"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
        className={`
          fixed
          right-0
          top-0
          z-[70]

          flex
          h-[100dvh]

          w-[86%]
          max-w-[350px]

          flex-col

          overflow-hidden

          bg-white

          shadow-[-15px_0_40px_rgba(0,0,0,0.14)]

          transition-transform
          duration-500

          ease-[cubic-bezier(0.22,1,0.36,1)]

          min-[1080px]:hidden

          max-[360px]:w-[90%]

          ${
            mobileMenuOpen
              ? "translate-x-0"
              : "translate-x-full"
          }
        `}
      >
        {/* ===============================================
            MOBILE HEADER
        ================================================ */}

        <div
          className="
            flex
            min-h-[72px]
            w-full
            min-w-0

            items-center
            justify-between

            border-b
            border-[#ebeee9]

            px-4

            sm:px-5
          "
        >
          <Link
            to="/"
            aria-label="Entomology Science Association Home"
            className="
              flex
              min-w-0
              items-center

              gap-[8px]
            "
          >
            {/* FIXED:
                LogoMark removed.
                Use imported logo here.
            */}

            <img
              src={logo}
              alt="Entomology Science Association"
              className="
                h-[42px]
                w-[42px]

                shrink-0

                object-contain
              "
            />

            <div
              className="
                min-w-0
                leading-tight
              "
            >
              <p
                className="
                  whitespace-nowrap

                  text-[13px]
                  font-semibold

                  text-[#173b20]

                  sm:text-[14px]

                  max-[340px]:text-[12px]
                "
              >
                Entomology Science
              </p>

              <p
                className="
                  whitespace-nowrap

                  text-[13px]
                  font-semibold

                  text-[#173b20]

                  sm:text-[14px]

                  max-[340px]:text-[12px]
                "
              >
                Association
              </p>
            </div>
          </Link>

          {/* Close */}

          <button
            type="button"
            aria-label="Close navigation menu"
            onClick={() =>
              setMobileMenuOpen(false)
            }
            className="
              flex
              h-[38px]
              w-[38px]

              shrink-0

              items-center
              justify-center

              rounded-[7px]

              text-[#173b20]

              transition-all
              duration-300

              hover:rotate-90

              hover:bg-[#f2f6ef]

              hover:text-[#4f7936]

              active:scale-95
            "
          >
            <X
              className="h-[21px] w-[21px]"
              strokeWidth={1.8}
            />
          </button>
        </div>

        {/* ===============================================
            MOBILE NAVIGATION
        ================================================ */}

        <nav
          className="
            flex-1

            overflow-y-auto
            overscroll-contain

            px-3
            py-5

            sm:px-4
          "
        >
          <div className="space-y-[5px]">
            {navigation.map(
              (item, index) => {
                const NavIcon = item.icon;

                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    end={item.path === "/"}
                    style={{
                      transitionDelay:
                        mobileMenuOpen
                          ? `${index * 45}ms`
                          : "0ms",
                    }}
                    className={({
                      isActive,
                    }) => `
                      group/mobile

                      flex
                      w-full
                      min-w-0

                      items-center

                      gap-[11px]

                      rounded-[7px]

                      px-3
                      py-[11px]

                      text-[13.5px]
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
                          ? "bg-[#edf4e9] text-[#416f2d]"
                          : "text-[#1d271d] hover:translate-x-[3px] hover:bg-[#f4f7f2] hover:text-[#416f2d]"
                      }
                    `}
                  >
                    <span
                      className="
                        flex
                        h-[29px]
                        w-[29px]

                        shrink-0

                        items-center
                        justify-center

                        rounded-[6px]

                        bg-[#f1f5ee]

                        text-[#517542]

                        transition-all
                        duration-300

                        group-hover/mobile:bg-[#e6efe0]

                        group-hover/mobile:scale-105
                      "
                    >
                      <NavIcon
                        className="
                          h-[16px]
                          w-[16px]
                        "
                        strokeWidth={1.8}
                      />
                    </span>

                    <span className="min-w-0">
                      {item.label}
                    </span>
                  </NavLink>
                );
              }
            )}
          </div>
        </nav>

        {/* ===============================================
            MOBILE BOTTOM
        ================================================ */}

        <div
          className="
            border-t
            border-[#ebeee9]

            bg-[#fafbf9]

            px-5
            py-4
          "
        >
          <p
            className="
              text-center

              text-[9.5px]
              leading-[1.5]

              text-[#7c887d]
            "
          >
            Advancing Entomological Discoveries
          </p>
        </div>
      </aside>
    </>
  );
}