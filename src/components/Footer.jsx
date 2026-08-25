import { Link } from "react-router-dom";

import {
  Mail,
  Phone,
  Globe2,
  MapPin,
  ArrowUpRight,
} from "lucide-react";

import {
  siteInfo,
  footerQuickLinks,
  footerResourceLinks,
} from "../data/siteData";

/* =========================================================
   LOGO
========================================================= */

import logo from "../assets/img/flogo.png";

/* =========================================================
   SOCIAL LINKS
   Direct links = guaranteed working
========================================================= */

const footerSocialLinks = [
  {
    label: "Facebook",
    url: "https://www.facebook.com/EntomologyScienceAssoc/",
    icon: FacebookIcon,
  },
  {
    label: "Instagram",
    url: "https://www.instagram.com/entomology_science_association/",
    icon: InstagramIcon,
  },
  {
    label: "X",
    url: "https://x.com/EntoSciAssoc",
    icon: XIcon,
  },
];

/* =========================================================
   FOOTER
========================================================= */

export default function Footer() {
  const websiteUrl =
    siteInfo?.website?.startsWith("http")
      ? siteInfo.website
      : `https://${siteInfo?.website || "www.entomologyscience.org"}`;

  const cleanPhone =
    siteInfo?.phone?.replace(/[^+\d]/g, "") || "";

  return (
    <footer
      className="
        relative
        w-full
        min-w-0
        overflow-hidden

        border-t
        border-[#9fb864]/35

        bg-[linear-gradient(135deg,#072f0d_0%,#063810_48%,#05310c_100%)]

        text-white
      "
    >
      {/* =====================================================
          BACKGROUND DECORATION
      ====================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0

          bg-[radial-gradient(circle_at_18%_10%,rgba(158,194,82,0.08),transparent_30%),radial-gradient(circle_at_82%_80%,rgba(128,170,59,0.05),transparent_32%)]
        "
      />

      {/* =====================================================
          MAIN FOOTER CONTAINER

          Matches your 1180px page alignment
      ====================================================== */}

      <div
        className="
          relative
          z-10

          mx-auto
          w-full
          min-w-0
          max-w-[1180px]

          px-4
          py-[28px]

          sm:px-6
          sm:py-[31px]

          lg:px-8
          lg:py-[32px]

          max-[390px]:px-4
        "
      >
        <div
          className="
            grid
            min-w-0
            grid-cols-1

            gap-x-8
            gap-y-9

            min-[560px]:grid-cols-2

            min-[900px]:grid-cols-[1.55fr_0.78fr_0.85fr_1.25fr]
            min-[900px]:gap-x-[40px]
            min-[900px]:gap-y-0

            lg:gap-x-[52px]

            xl:grid-cols-[1.55fr_0.75fr_0.82fr_1.25fr]
            xl:gap-x-[65px]
          "
        >
          {/* =================================================
              01. BRAND + LOGO
          ================================================== */}

          <div className="min-w-0">
            <Link
              to="/"
              aria-label="Entomology Science Association Home"
              className="
                group/logo

                inline-flex
                max-w-full
                min-w-0
                items-center

                gap-[10px]

                transition-all
                duration-300
              "
            >
              {/* =============================================
                  REAL LOGO IMAGE
              ============================================= */}

              <div
                className="
                  flex
                  h-[52px]
                  w-[122px]

                  shrink-0

                  items-center
                  justify-center

                  overflow-hidden

                  transition-all
                  duration-500
                  ease-out

                  group-hover/logo:scale-[1.06]

                  sm:h-[56px]
                  sm:w-[126px]

                  lg:h-[58px]
                  lg:w-[138px]

                  max-[390px]:h-[48px]
                  max-[390px]:w-[48px]
                "
              >
                <img
                  src={logo}
                  alt="Entomology Science Association"
                  loading="lazy"
                  className="
                    block
                    h-full
                    w-full

                    object-contain

                    transition-transform
                    duration-500

                    group-hover/logo:scale-[1.03]
                  "
                />
              </div>

            
            </Link>

            {/* Description */}

            <p
              className="
                mt-[5px]

                max-w-[275px]

                text-[10px]
                font-medium
                leading-[1.55]

                text-white/80

                sm:text-[10.5px]

                lg:text-[11px]
              "
            >
              A global platform dedicated to advancing
              entomological research, education and sustainable
              solutions for the future.
            </p>

            {/* =================================================
                WORKING SOCIAL LINKS
            ================================================== */}

            <div
              className="
                mt-[10px]

                flex
                flex-wrap
                items-center

                gap-[8px]
              "
            >
              {footerSocialLinks.map((social) => {
                const SocialIcon = social.icon;

                return (
                  <a
                    key={social.label}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visit our ${social.label}`}
                    title={social.label}
                    className="
                      group/social

                      flex
                      h-[29px]
                      w-[29px]

                      shrink-0

                      items-center
                      justify-center

                      rounded-full

                      border
                      border-[#9bb75a]/60

                      bg-[#0a4210]/45

                      text-[#d3e3a1]

                      shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]

                      transition-all
                      duration-300
                      ease-out

                      hover:-translate-y-[3px]
                      hover:scale-[1.06]

                      hover:border-[#c5dd72]

                      hover:bg-[#587e26]

                      hover:text-white

                      hover:shadow-[0_6px_15px_rgba(0,0,0,0.20)]

                      active:translate-y-0
                      active:scale-95
                    "
                  >
                    <SocialIcon
                      className="
                        h-[13px]
                        w-[13px]

                        transition-transform
                        duration-300

                        group-hover/social:scale-110
                      "
                    />
                  </a>
                );
              })}
            </div>
          </div>

          {/* =================================================
              02. QUICK LINKS
          ================================================== */}

          <FooterColumn title="Quick Links">
            {footerQuickLinks.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className="
                    inline-flex
                    items-center

                    text-[11px]
                    font-medium

                    text-white/95

                    transition-all
                    duration-300

                    hover:translate-x-[3px]
                    hover:text-[#c4dc72]

                    sm:text-[11.5px]

                    lg:text-[12px]
                  "
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </FooterColumn>

          {/* =================================================
              03. RESOURCES
          ================================================== */}

          <FooterColumn title="Resources">
            {footerResourceLinks.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className="
                    inline-flex
                    items-center

                    text-[11px]
                    font-medium

                    text-white/95

                    transition-all
                    duration-300

                    hover:translate-x-[3px]
                    hover:text-[#c4dc72]

                    sm:text-[11.5px]

                    lg:text-[12px]
                  "
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </FooterColumn>

          {/* =================================================
              04. CONTACT
          ================================================== */}

          <div className="min-w-0">
            <h3
              className="
                text-[15px]
                font-semibold
                leading-none

                text-white

                sm:text-[15px]

                lg:text-[16px]
              "
            >
              Contact
            </h3>

            <ul
              className="
                mt-[14px]

                flex
                min-w-0
                flex-col

                gap-[14px]
              "
            >
              {/* =============================================
                  EMAIL
              ============================================= */}

              <li className="min-w-0">
                <a
                  href={`mailto:${
                    siteInfo?.email ||
                    "info@entomologyscience.org"
                  }`}
                  className="
                    group/contact

                    flex
                    min-w-0
                    items-start

                    gap-[9px]

                    text-[10.5px]
                    font-medium

                    text-white/95

                    transition-all
                    duration-300

                    hover:translate-x-[2px]
                    hover:text-[#c7dd79]

                    sm:text-[11px]

                    lg:text-[12px]
                  "
                >
                  <Mail
                    strokeWidth={1.8}
                    className="
                      mt-[1px]

                      h-[18px]
                      w-[18px]

                      shrink-0

                      text-[#b9d264]

                      transition-transform
                      duration-300

                      group-hover/contact:scale-110
                    "
                    aria-hidden="true"
                  />

                  <span
                    className="
                      min-w-0
                      break-all
                    "
                  >
                    {siteInfo?.email ||
                      "info@entomologyscience.org"}
                  </span>
                </a>
              </li>

              {/* =============================================
                  PHONE
              ============================================= */}

              <li className="min-w-0">
                <a
                  href={
                    cleanPhone
                      ? `tel:${cleanPhone}`
                      : undefined
                  }
                  className="
                    group/contact

                    flex
                    min-w-0
                    items-center

                    gap-[9px]

                    text-[10.5px]
                    font-medium

                    text-white/95

                    transition-all
                    duration-300

                    hover:translate-x-[2px]
                    hover:text-[#c7dd79]

                    sm:text-[11px]

                    lg:text-[12px]
                  "
                >
                  <Phone
                    strokeWidth={1.8}
                    className="
                      h-[18px]
                      w-[18px]

                      shrink-0

                      text-[#b9d264]

                      transition-transform
                      duration-300

                      group-hover/contact:scale-110
                    "
                    aria-hidden="true"
                  />

                  <span>
                    {siteInfo?.phone ||
                      "+1 (202) 981-1088"}
                  </span>
                </a>
              </li>

              {/* =============================================
                  WEBSITE
              ============================================= */}

              <li className="min-w-0">
                <a
                  href={websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    group/contact

                    flex
                    min-w-0
                    items-center

                    gap-[9px]

                    text-[10.5px]
                    font-medium

                    text-white/95

                    transition-all
                    duration-300

                    hover:translate-x-[2px]
                    hover:text-[#c7dd79]

                    sm:text-[11px]

                    lg:text-[12px]
                  "
                >
                  <Globe2
                    strokeWidth={1.8}
                    className="
                      h-[18px]
                      w-[18px]

                      shrink-0

                      text-[#b9d264]

                      transition-transform
                      duration-300

                      group-hover/contact:rotate-[8deg]
                    "
                    aria-hidden="true"
                  />

                  <span
                    className="
                      min-w-0
                      break-all
                    "
                  >
                    {siteInfo?.website ||
                      "www.entomologyscience.org"}
                  </span>

                  <ArrowUpRight
                    strokeWidth={1.8}
                    className="
                      hidden

                      h-[18px]
                      w-[18px]

                      shrink-0

                      opacity-0

                      transition-all
                      duration-300

                      group-hover/contact:-translate-y-[1px]
                      group-hover/contact:translate-x-[1px]
                      group-hover/contact:opacity-100

                      sm:block
                    "
                  />
                </a>
              </li>

              {/* =============================================
                  ADDRESS
              ============================================= */}

              <li
                className="
                  group/contact

                  flex
                  min-w-0
                  items-start

                  gap-[9px]

                  text-[10.5px]
                  font-medium

                  text-white/95

                  transition-all
                  duration-300

                  hover:translate-x-[2px]
                  hover:text-[#c7dd79]

                  sm:text-[11px]

                  lg:text-[12px]
                "
              >
                <MapPin
                  strokeWidth={1.8}
                  className="
                    mt-[1px]

                    h-[18px]
                    w-[18px]

                    shrink-0

                    text-[#b9d264]

                    transition-transform
                    duration-300

                    group-hover/contact:-translate-y-[2px]
                  "
                  aria-hidden="true"
                />

                <span className="min-w-0">
                  {siteInfo?.addressShort ||
                    "Washington, DC, USA"}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* =====================================================
          COPYRIGHT
      ====================================================== */}

      {/* <div
        className="
          relative
          z-10

          border-t
          border-white/[0.07]
        "
      >
        <div
          className="
            mx-auto

            flex
            w-full
            max-w-[1180px]

            flex-col
            items-center
            justify-between

            gap-[8px]

            px-4
            py-[11px]

            text-center

            text-[8.5px]
            font-medium

            text-white/55

            sm:flex-row
            sm:px-6
            sm:text-left

            lg:px-8
            lg:text-[9px]
          "
        >
          <p>
            © 2026{" "}
            {siteInfo?.name ||
              "Entomology Science Association"}
            . All Rights Reserved.
          </p>

          <div
            className="
              flex
              flex-wrap
              items-center
              justify-center

              gap-[10px]
            "
          >
            <Link
              to="/privacy-policy"
              className="
                transition-colors
                duration-300

                hover:text-[#c5dc75]
              "
            >
              Privacy Policy
            </Link>

            <span
              className="
                h-[10px]
                w-px

                bg-white/20
              "
            />

            <Link
              to="/terms"
              className="
                transition-colors
                duration-300

                hover:text-[#c5dc75]
              "
            >
              Terms &amp; Conditions
            </Link>
          </div>
        </div>
      </div> */}
    </footer>
  );
}

/* =========================================================
   FOOTER COLUMN
========================================================= */

function FooterColumn({ title, children }) {
  return (
    <div className="min-w-0">
      <h3
        className="
          text-[14px]
          font-semibold
          leading-none

          text-white

          sm:text-[15px]

          lg:text-[16px]
        "
      >
        {title}
      </h3>

      <ul
        className="
          mt-[14px]

          flex
          flex-col

          gap-[6px]
        "
      >
        {children}
      </ul>
    </div>
  );
}

/* =========================================================
   SOCIAL SVG ICONS

   No dependency on your Icon component.
   This avoids icon-name errors.
========================================================= */

function FacebookIcon({ className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M13.5 22v-9h3l.45-3.5H13.5V7.26c0-1.01.28-1.7 1.74-1.7H17V2.43c-.31-.04-1.38-.13-2.62-.13-2.59 0-4.36 1.58-4.36 4.48V9.5H7v3.5h3.02v9h3.48Z" />
    </svg>
  );
}

function InstagramIcon({ className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect
        x="3"
        y="3"
        width="18"
        height="18"
        rx="5"
      />

      <circle
        cx="12"
        cy="12"
        r="4"
      />

      <circle
        cx="17.5"
        cy="6.5"
        r="1"
        fill="currentColor"
        stroke="none"
      />
    </svg>
  );
}

function XIcon({ className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M18.244 2H21.5l-7.11 8.13L22.75 22h-6.546l-5.126-6.704L5.214 22H1.956l7.605-8.693L1.542 2h6.712l4.633 6.124L18.244 2Zm-1.143 17.91h1.804L7.274 3.98H5.338L17.1 19.91Z" />
    </svg>
  );
}