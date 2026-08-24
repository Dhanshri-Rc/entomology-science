import { Link } from "react-router-dom";
import {
  Mail,
  Phone,
  Globe2,
  MapPin,
  ArrowUpRight,
} from "lucide-react";

import Icon from "./Icon";

import {
  siteInfo,
  socialLinks,
  footerQuickLinks,
  footerResourceLinks,
} from "../data/siteData";

export default function Footer() {
  return (
    <footer
      className="
        relative
        w-full
        overflow-hidden

        border-t
        border-[#9fb864]/35

        bg-[linear-gradient(135deg,#072f0d_0%,#063810_48%,#05310c_100%)]

        text-white
      "
    >
      {/* =====================================================
          SUBTLE BACKGROUND DEPTH
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
          MAIN FOOTER
      ====================================================== */}
      <div
        className="
          relative
          z-10

          mx-auto
          w-full
          max-w-[1180px]

          px-4
          py-[28px]

          sm:px-6
          sm:py-[31px]

          lg:px-8
          lg:py-[32px]

          max-[380px]:px-[14px]
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
            min-[900px]:gap-x-[48px]
            min-[900px]:gap-y-0

            lg:gap-x-[60px]

            xl:grid-cols-[1.55fr_0.75fr_0.82fr_1.25fr]
            xl:gap-x-[68px]
          "
        >
          {/* =================================================
              01. BRAND
          ================================================== */}
          <div className="min-w-0">
            <Link
              to="/"
              className="
                group/logo
                inline-flex
                max-w-full
                items-center
                gap-[12px]
              "
            >
              {/* Entomology Logo */}
              <div
                className="
                  flex
                  h-[48px]
                  w-[48px]
                  shrink-0
                  items-center
                  justify-center

                  text-[#b7d264]

                  transition-all
                  duration-300

                  group-hover/logo:scale-105
                  group-hover/logo:text-[#d0e681]

                  sm:h-[50px]
                  sm:w-[50px]
                "
              >
                <svg
                  viewBox="0 0 64 64"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-full w-full"
                  aria-hidden="true"
                >
                  {/* antenna */}
                  <path
                    d="M28.5 14.5C25 9 21.5 7.5 18.5 7"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />

                  <path
                    d="M35.5 14.5C39 9 42.5 7.5 45.5 7"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />

                  <circle
                    cx="18"
                    cy="6.5"
                    r="1.4"
                    fill="currentColor"
                  />

                  <circle
                    cx="46"
                    cy="6.5"
                    r="1.4"
                    fill="currentColor"
                  />

                  {/* head */}
                  <ellipse
                    cx="32"
                    cy="18"
                    rx="5.5"
                    ry="5"
                    stroke="currentColor"
                    strokeWidth="1.6"
                  />

                  {/* body */}
                  <path
                    d="M27.5 23C27.5 20.8 29.5 20 32 20C34.5 20 36.5 20.8 36.5 23V43C36.5 48.5 34.8 53 32 57C29.2 53 27.5 48.5 27.5 43V23Z"
                    stroke="currentColor"
                    strokeWidth="1.6"
                  />

                  {/* body lines */}
                  <path
                    d="M28 30H36"
                    stroke="currentColor"
                    strokeWidth="1.3"
                  />

                  <path
                    d="M28 36H36"
                    stroke="currentColor"
                    strokeWidth="1.3"
                  />

                  <path
                    d="M28.5 42H35.5"
                    stroke="currentColor"
                    strokeWidth="1.3"
                  />

                  {/* upper wings */}
                  <path
                    d="M26.5 23C20 15.5 12 14 8 18C5 21 8 27.5 14 31C18 33.5 22.5 31.5 27 28"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  <path
                    d="M37.5 23C44 15.5 52 14 56 18C59 21 56 27.5 50 31C46 33.5 41.5 31.5 37 28"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  {/* lower wings */}
                  <path
                    d="M27 30C20 29 13 32 11 38C9.5 43 14 47 20 46C24 45.5 26.5 42.5 28 39"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  <path
                    d="M37 30C44 29 51 32 53 38C54.5 43 50 47 44 46C40 45.5 37.5 42.5 36 39"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  {/* legs */}
                  <path
                    d="M27.5 27L20 24L15 26"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                  />

                  <path
                    d="M36.5 27L44 24L49 26"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                  />

                  <path
                    d="M27.5 35L19 36L14 40"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                  />

                  <path
                    d="M36.5 35L45 36L50 40"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                  />
                </svg>
              </div>

              <span
                className="
                  min-w-0

                  text-[14px]
                  font-semibold
                  leading-[1.2]

                  text-white

                  transition-colors
                  duration-300

                  group-hover/logo:text-[#d5e78d]

                  sm:text-[14.5px]
                  lg:text-[15px]
                "
              >
                {siteInfo.name}
              </span>
            </Link>

            <p
              className="
                mt-[11px]

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

            {/* Social Icons */}
            <div
              className="
                mt-[14px]

                flex
                flex-wrap
                items-center

                gap-[9px]
              "
            >
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="
                    group/social

                    flex
                    h-[27px]
                    w-[27px]
                    shrink-0

                    items-center
                    justify-center

                    rounded-full

                    border
                    border-[#9bb75a]/60

                    bg-[#0a4210]/45

                    text-[#d0df9b]

                    shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]

                    transition-all
                    duration-300

                    hover:-translate-y-[2px]
                    hover:scale-105

                    hover:border-[#c0d96c]

                    hover:bg-[#547d21]

                    hover:text-white

                    hover:shadow-[0_5px_12px_rgba(0,0,0,0.18)]
                  "
                >
                  <Icon
                    name={social.icon}
                    className="
                      h-[12px]
                      w-[12px]

                      transition-transform
                      duration-300

                      group-hover/social:scale-110
                    "
                  />
                </a>
              ))}
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
                    group/link

                    inline-flex
                    items-center
                    gap-[3px]

                    text-[11px]
                    font-medium

                    text-white/85

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

                    text-white/85

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
                text-[12px]
                font-semibold
                leading-none

                text-white

                sm:text-[12.5px]
                lg:text-[13px]
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

                gap-[10px]
              "
            >
              {/* Email */}
              <li className="min-w-0">
                <a
                  href={`mailto:${siteInfo.email}`}
                  className="
                    group/contact

                    flex
                    min-w-0
                    items-start

                    gap-[9px]

                    text-[9.5px]
                    font-medium

                    text-white/85

                    transition-colors
                    duration-300

                    hover:text-[#c7dd79]

                    sm:text-[10px]
                    lg:text-[10.5px]
                  "
                >
                  <Mail
                    strokeWidth={1.8}
                    className="
                      mt-[1px]

                      h-[13px]
                      w-[13px]

                      shrink-0

                      text-[#b9d264]

                      transition-transform
                      duration-300

                      group-hover/contact:scale-110
                    "
                    aria-hidden="true"
                  />

                  <span className="min-w-0 break-all">
                    {siteInfo.email}
                  </span>
                </a>
              </li>

              {/* Phone */}
              <li>
                <a
                  href={`tel:${siteInfo.phone.replace(
                    /[^+\d]/g,
                    ""
                  )}`}
                  className="
                    group/contact

                    flex
                    items-center
                    gap-[9px]

                    text-[9.5px]
                    font-medium

                    text-white/85

                    transition-colors
                    duration-300

                    hover:text-[#c7dd79]

                    sm:text-[10px]
                    lg:text-[10.5px]
                  "
                >
                  <Phone
                    strokeWidth={1.8}
                    className="
                      h-[13px]
                      w-[13px]

                      shrink-0

                      text-[#b9d264]

                      transition-transform
                      duration-300

                      group-hover/contact:scale-110
                    "
                    aria-hidden="true"
                  />

                  <span>{siteInfo.phone}</span>
                </a>
              </li>

              {/* Website */}
              <li className="min-w-0">
                <a
                  href={
                    siteInfo.website.startsWith("http")
                      ? siteInfo.website
                      : `https://${siteInfo.website}`
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    group/contact

                    flex
                    min-w-0
                    items-center

                    gap-[9px]

                    text-[9.5px]
                    font-medium

                    text-white/85

                    transition-colors
                    duration-300

                    hover:text-[#c7dd79]

                    sm:text-[10px]
                    lg:text-[10.5px]
                  "
                >
                  <Globe2
                    strokeWidth={1.8}
                    className="
                      h-[13px]
                      w-[13px]

                      shrink-0

                      text-[#b9d264]

                      transition-transform
                      duration-300

                      group-hover/contact:rotate-[8deg]
                    "
                    aria-hidden="true"
                  />

                  <span className="min-w-0 break-all">
                    {siteInfo.website}
                  </span>

                  <ArrowUpRight
                    className="
                      hidden
                      h-[10px]
                      w-[10px]

                      shrink-0

                      opacity-0

                      transition-all
                      duration-300

                      group-hover/contact:translate-x-[1px]
                      group-hover/contact:-translate-y-[1px]
                      group-hover/contact:opacity-100

                      sm:block
                    "
                  />
                </a>
              </li>

              {/* Location */}
              <li
                className="
                  group/contact

                  flex
                  min-w-0
                  items-start

                  gap-[9px]

                  text-[9.5px]
                  font-medium

                  text-white/85

                  sm:text-[10px]
                  lg:text-[10.5px]
                "
              >
                <MapPin
                  strokeWidth={1.8}
                  className="
                    mt-[1px]

                    h-[13px]
                    w-[13px]

                    shrink-0

                    text-[#b9d264]

                    transition-transform
                    duration-300

                    group-hover/contact:-translate-y-[1px]
                  "
                  aria-hidden="true"
                />

                <span className="min-w-0">
                  {siteInfo.addressShort}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

    
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
          text-[12px]
          font-semibold
          leading-none

          text-white

          sm:text-[14.5px]
          lg:text-[15px]
        "
      >
        {title}
      </h3>

      <ul
        className="
          mt-[14px]

          flex
          flex-col

          gap-[8px]
        "
      >
        {children}
      </ul>
    </div>
  );
}