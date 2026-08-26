import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import SEO from "../components/SEO";

import {
  Leaf,
  ShieldCheck,
  Database,
  LockKeyhole,
  Cookie,
  Share2,
  Clock3,
  UserCheck,
  Mail,
  ChevronRight,
  FileText,
  Globe2,
} from "lucide-react";

import { siteInfo } from "../data/siteData";
import bg from "../assets/img/entomology-science-beetle-hero-background.webp"
import bgcta from "../assets/img/entomology-submission-ladybug-cta.webp"


/* =========================================================
   ANIMATION
========================================================= */

const ease = [0.22, 1, 0.36, 1];

const reveal = {
  initial: {
    opacity: 0,
    y: 20,
  },

  whileInView: {
    opacity: 1,
    y: 0,
  },

  viewport: {
    once: true,
    amount: 0.12,
  },

  transition: {
    duration: 0.55,
    ease,
  },
};

/* =========================================================
   PRIVACY POLICY SECTIONS
========================================================= */

const privacySections = [
  {
    id: "information-we-collect",
    number: "01",
    icon: Database,
    title: "Information We Collect",
    content: (
      <>
        <p>
          We may collect personal information that you voluntarily provide
          when registering for the conference, submitting a manuscript,
          contacting us, subscribing to updates, or using services available
          through our website.
        </p>

        <p>
          This information may include your name, email address, phone number,
          institutional affiliation, professional details, manuscript-related
          information and other information you choose to provide.
        </p>
      </>
    ),
  },

  {
    id: "how-we-use-information",
    number: "02",
    icon: UserCheck,
    title: "How We Use Your Information",
    content: (
      <>
        <p>
          Information collected through our website is used to manage
          conference registrations, manuscript submissions, peer-review
          communication, publication-related correspondence and general
          enquiries.
        </p>

        <p>
          We may also use your information to provide important conference
          updates, respond to support requests and improve the quality and
          usability of our services.
        </p>
      </>
    ),
  },

  {
    id: "data-security",
    number: "03",
    icon: LockKeyhole,
    title: "Data Security",
    content: (
      <>
        <p>
          We use reasonable administrative and technical safeguards to protect
          personal information against unauthorized access, disclosure,
          alteration, misuse or loss.
        </p>

        <p>
          Although we take appropriate precautions, no electronic transmission
          or storage system can be guaranteed to be completely secure.
        </p>
      </>
    ),
  },

  {
    id: "cookies",
    number: "04",
    icon: Cookie,
    title: "Cookies & Website Technologies",
    content: (
      <>
        <p>
          Our website may use cookies and similar technologies to support
          essential website functions, remember user preferences, improve
          performance and understand how visitors interact with the website.
        </p>

        <p>
          You may control or disable cookies through your browser settings.
          Certain website features may not operate correctly if essential
          cookies are disabled.
        </p>
      </>
    ),
  },

  {
    id: "information-sharing",
    number: "05",
    icon: Share2,
    title: "Sharing of Information",
    content: (
      <>
        <p>
          We do not sell personal information. Information may be shared only
          when necessary for conference administration, manuscript review,
          publication processing, technical service delivery or compliance
          with applicable legal requirements.
        </p>

        <p>
          Where third-party service providers are used, they should receive
          only the information reasonably required to provide the relevant
          service.
        </p>
      </>
    ),
  },

  {
    id: "data-retention",
    number: "06",
    icon: Clock3,
    title: "Data Retention",
    content: (
      <>
        <p>
          Personal information may be retained for as long as reasonably
          necessary to fulfil the purpose for which it was collected,
          administer conference and publication records, resolve disputes and
          meet applicable administrative or legal obligations.
        </p>
      </>
    ),
  },

  {
    id: "your-rights",
    number: "07",
    icon: ShieldCheck,
    title: "Your Privacy Rights",
    content: (
      <>
        <p>
          Subject to applicable law, you may request access to, correction of,
          or deletion of personal information associated with you. You may
          also contact us if you believe information held by us is inaccurate
          or no longer required.
        </p>

        <p>
          Requests can be submitted using the contact information provided
          below.
        </p>
      </>
    ),
  },

  {
    id: "external-links",
    number: "08",
    icon: Globe2,
    title: "External Links",
    content: (
      <>
        <p>
          Our website may contain links to external journals, indexing
          services, partner institutions or other third-party websites.
          Their privacy practices are controlled by their respective
          operators.
        </p>

        <p>
          We encourage users to review the privacy policies of external
          websites before providing personal information.
        </p>
      </>
    ),
  },

  {
    id: "policy-updates",
    number: "09",
    icon: FileText,
    title: "Changes to This Privacy Policy",
    content: (
      <>
        <p>
          This Privacy Policy may be updated periodically to reflect changes
          in our services, website practices or applicable requirements.
          Updated versions will be published on this page.
        </p>
      </>
    ),
  },
];

/* =========================================================
   PAGE
========================================================= */

export default function PrivacyPolicy() {
  return (
    <>
      <SEO
        title="Privacy Policy | Entomology Science Association"
        description="Read the Entomology Science Association privacy policy covering how personal data is collected, used and protected."
        canonical="/privacy-policy"
      />
      {/* =====================================================
          SAME WIDTH SYSTEM AS YOUR OTHER PAGES
      ====================================================== */}

      <style>{`
        .privacy-page-container {
          width: 100%;
          max-width: 1180px;
          margin-left: auto;
          margin-right: auto;
          padding-left: 32px;
          padding-right: 32px;
          box-sizing: border-box;
          min-width: 0;
        }

        html {
          scroll-behavior: smooth;
        }

        @media (max-width: 640px) {
          .privacy-page-container {
            padding-left: 20px;
            padding-right: 20px;
          }
        }

        @media (max-width: 390px) {
          .privacy-page-container {
            padding-left: 16px;
            padding-right: 16px;
          }
        }
      `}</style>

      {/* =========================================================
          01. HERO
      ========================================================== */}

      <section
        className="
          group
          relative
          isolate
          w-full
          min-w-0
          overflow-hidden

          bg-[#06250b]

          pt-[70px]
          sm:pt-[140px]
        "
      >
        {/* Background */}

        <motion.div
          initial={{
            scale: 1.045,
            opacity: 0.96,
          }}
          animate={{
            scale: 1,
            opacity: 1,
          }}
          transition={{
            duration: 1.8,
            ease,
          }}
          className="
            absolute
            inset-0
            -z-30

            bg-cover
            bg-no-repeat

            bg-[position:70%_center]

            transition-transform
            duration-[1600ms]

            group-hover:scale-[1.012]

            sm:bg-[position:68%_center]
            md:bg-[position:66%_center]
            lg:bg-center

            max-[480px]:bg-[position:74%_center]
          "
         style={{
                        backgroundImage: `url(${bg})`,
                      }}
        />

        {/* Overlay */}

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            inset-0
            -z-20

            bg-[linear-gradient(90deg,rgba(2,34,8,0.98)_0%,rgba(3,38,9,0.93)_32%,rgba(3,38,9,0.62)_53%,rgba(3,38,9,0.17)_72%,rgba(3,38,9,0)_100%)]

            max-[640px]:bg-[linear-gradient(90deg,rgba(2,31,7,0.98)_0%,rgba(3,37,9,0.93)_48%,rgba(3,37,9,0.72)_76%,rgba(3,37,9,0.54)_100%)]
          "
        />

        <div className="privacy-page-container">
          <div
            className="
              relative
              z-10

              flex
              min-h-[245px]
              w-full
              min-w-0
              items-start

              pb-[30px]
              pt-[32px]

              sm:min-h-[250px]
              sm:pt-[34px]

              max-[480px]:min-h-[260px]
              max-[480px]:pt-[28px]
            "
          >
            <motion.div
              initial={{
                opacity: 0,
                x: -26,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                duration: 0.72,
                ease,
              }}
              className="
                w-full
                min-w-0
                max-w-[570px]
              "
            >
              <motion.h1
                initial={{
                  opacity: 0,
                  y: 12,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.6,
                  delay: 0.08,
                  ease,
                }}
                className="
                  text-[32px]
                  font-semibold
                  leading-[1.05]
                  tracking-[-0.8px]

                  text-white

                  sm:text-[38px]
                  md:text-[42px]
                  lg:text-[44px]

                  max-[360px]:text-[29px]
                "
              >
                Privacy Policy
              </motion.h1>

              {/* Breadcrumb */}

              <motion.div
                initial={{
                  opacity: 0,
                  y: 7,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.5,
                  delay: 0.17,
                }}
                className="
                  mt-[15px]

                  flex
                  flex-wrap
                  items-center
                  gap-[9px]

                  text-[11px]
                  font-medium

                  sm:text-[12px]
                "
              >
                <Link
                  to="/"
                  className="
                    text-white

                    transition-colors
                    duration-300

                    hover:text-[#bddb69]
                  "
                >
                  Home
                </Link>

                <ChevronRight
                  className="
                    h-[13px]
                    w-[13px]

                    text-[#aeca62]
                  "
                />

                <span className="text-[#b7d264]">
                  Privacy Policy
                </span>
              </motion.div>

              {/* Description */}

              <motion.p
                initial={{
                  opacity: 0,
                  y: 9,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.55,
                  delay: 0.24,
                }}
                className="
                  mt-[20px]
                  max-w-[515px]

                  text-[12px]
                  font-medium
                  leading-[1.65]

                  text-white/90

                  sm:text-[13px]
                  md:text-[13.5px]
                "
              >
                Your privacy matters to us. Learn how we collect, use,
                protect and manage information when you interact with our
                conference website and services.
              </motion.p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* =========================================================
          02. PRIVACY INTRO
      ========================================================== */}

      <section
        className="
          w-full
          overflow-hidden

          bg-white

          py-7

          sm:py-9
          lg:py-10
        "
      >
        <div className="privacy-page-container">
          <motion.div
            {...reveal}
            className="
              relative
              overflow-hidden

              rounded-[9px]

              border
              border-[#dfe6d9]

              bg-[#f6f8f2]

              px-5
              py-5

              shadow-[0_3px_12px_rgba(22,61,24,0.045)]

              sm:px-6
              sm:py-6
            "
          >
            <div
              className="
                flex
                min-w-0
                flex-col

                gap-4

                sm:flex-row
                sm:items-start
              "
            >
              <div
                className="
                  flex
                  h-[44px]
                  w-[44px]

                  shrink-0

                  items-center
                  justify-center

                  rounded-full

                  bg-[#e6efd8]

                  text-[#3f752e]
                "
              >
                <ShieldCheck
                  strokeWidth={1.6}
                  className="
                    h-[22px]
                    w-[22px]
                  "
                />
              </div>

              <div className="min-w-0">
                <h2
                  className="
                    text-[16px]
                    font-semibold
                    text-[#17301b]

                    sm:text-[17px]
                  "
                >
                  Our Commitment to Your Privacy
                </h2>

                <p
                  className="
                    mt-[8px]

                    max-w-[900px]

                    text-[10.5px]
                    font-medium
                    leading-[1.7]

                    text-[#445047]

                    sm:text-[11px]
                    md:text-[11.5px]
                  "
                >
                  {siteInfo.name} respects the privacy of conference
                  participants, researchers, authors, reviewers, visitors and
                  other users of our services. This policy explains the
                  general practices followed when personal information is
                  provided through our website.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* =========================================================
          03. MAIN PRIVACY CONTENT
      ========================================================== */}

      <section
        className="
          w-full
          overflow-visible

          bg-white

          pb-10

          sm:pb-12
          lg:pb-14
        "
      >
        <div className="privacy-page-container">
          <div
            className="
              grid
              min-w-0
              grid-cols-1

              gap-6

              min-[960px]:grid-cols-[245px_minmax(0,1fr)]

              lg:gap-8
            "
          >
            {/* =================================================
                LEFT TABLE OF CONTENTS
            ================================================== */}

            <motion.aside
              {...reveal}
              className="
                min-w-0

                min-[960px]:self-start
                min-[960px]:sticky
                min-[960px]:top-[110px]
              "
            >
              <div
                className="
                  overflow-hidden

                  rounded-[9px]

                  border
                  border-[#dfe6da]

                  bg-[#f6f8f2]

                  p-[16px]

                  shadow-[0_3px_12px_rgba(20,60,22,0.045)]

                  sm:p-[18px]
                "
              >
                <div
                  className="
                    flex
                    items-center
                    gap-[9px]
                  "
                >
                  <Leaf
                    strokeWidth={1.8}
                    className="
                      h-[17px]
                      w-[17px]

                      text-[#39722b]
                    "
                  />

                  <h2
                    className="
                      text-[15px]
                      font-semibold

                      text-[#17301b]

                      sm:text-[16px]
                    "
                  >
                    Privacy Policy
                  </h2>
                </div>

                <div
                  className="
                    ml-[26px]
                    mt-[4px]

                    h-[2px]
                    w-[38px]

                    rounded-full

                    bg-[#5d8d3e]
                  "
                />

                <nav
                  className="
                    mt-[14px]

                    grid
                    grid-cols-1

                    gap-[5px]

                    min-[440px]:grid-cols-2
                    min-[960px]:grid-cols-1
                  "
                >
                  {privacySections.map((section) => (
                    <a
                      key={section.id}
                      href={`#${section.id}`}
                      className="
                        group/nav

                        flex
                        min-w-0
                        items-center
                        gap-[8px]

                        rounded-[5px]

                        px-[8px]
                        py-[7px]

                        text-[9px]
                        font-medium

                        text-[#4a554b]

                        transition-all
                        duration-300

                        hover:translate-x-[2px]

                        hover:bg-[#eaf1e2]

                        hover:text-[#275d27]

                        sm:text-[9.5px]
                      "
                    >
                      <span
                        className="
                          flex
                          h-[20px]
                          w-[20px]

                          shrink-0

                          items-center
                          justify-center

                          rounded-full

                          bg-[#e3ecd9]

                          text-[9px]
                          font-semibold

                          text-[#477539]

                          transition-colors
                          duration-300

                          group-hover/nav:bg-[#d7e7c9]
                        "
                      >
                        {section.number}
                      </span>

                      <span className="min-w-0 text-[11px]">
                        {section.title}
                      </span>
                    </a>
                  ))}
                </nav>
              </div>
            </motion.aside>

            {/* =================================================
                RIGHT SECTIONS
            ================================================== */}

            <div
              className="
                flex
                min-w-0
                flex-col

                gap-[12px]
              "
            >
              {privacySections.map((section, index) => {
                const SectionIcon = section.icon;

                return (
                  <motion.article
                    id={section.id}
                    key={section.id}
                    initial={{
                      opacity: 0,
                      y: 20,
                    }}
                    whileInView={{
                      opacity: 1,
                      y: 0,
                    }}
                    viewport={{
                      once: true,
                      amount: 0.08,
                    }}
                    transition={{
                      duration: 0.5,
                      delay: Math.min(index * 0.025, 0.15),
                      ease,
                    }}
                    whileHover={{
                      y: -2,
                    }}
                    className="
                      group

                      scroll-mt-[120px]

                      min-w-0

                      rounded-[9px]

                      border
                      border-[#e1e6dc]

                      bg-white

                      px-[18px]
                      py-[18px]

                      shadow-[0_3px_10px_rgba(20,57,22,0.035)]

                      transition-all
                      duration-300

                      hover:border-[#d0dcc9]

                      hover:shadow-[0_8px_20px_rgba(20,57,22,0.08)]

                      sm:px-[22px]
                      sm:py-[20px]

                      md:px-[25px]
                    "
                  >
                    <div
                      className="
                        flex
                        min-w-0
                        items-start

                        gap-[12px]
                      "
                    >
                      {/* Icon */}

                      <div
                        className="
                          flex
                          h-[39px]
                          w-[39px]

                          shrink-0

                          items-center
                          justify-center

                          rounded-[7px]

                          bg-[#edf3e6]

                          text-[#386c30]

                          transition-all
                          duration-300

                          group-hover:scale-105

                          group-hover:bg-[#e2edd8]

                          sm:h-[42px]
                          sm:w-[42px]
                        "
                      >
                        <SectionIcon
                          strokeWidth={1.6}
                          className="
                            h-[19px]
                            w-[19px]

                            sm:h-[20px]
                            sm:w-[20px]
                          "
                        />
                      </div>

                      <div className="min-w-0 flex-1">
                        <div
                          className="
                            flex
                            min-w-0
                            flex-wrap
                            items-center

                            gap-x-[8px]
                            gap-y-[3px]
                          "
                        >
                          <span
                            className="
                              text-[8px]
                              font-semibold
                              tracking-[0.08em]

                              text-[#709254]
                            "
                          >
                            {section.number}
                          </span>

                          <h2
                            className="
                              text-[14px]
                              font-semibold
                              leading-[1.25]

                              text-[#17301b]

                              sm:text-[15px]
                              md:text-[16px]
                            "
                          >
                            {section.title}
                          </h2>
                        </div>

                        <div
                          className="
                            mt-[9px]

                            flex
                            flex-col
                            gap-[8px]

                            text-[10px]
                            font-medium
                            leading-[1.7]

                            text-[#465047]

                            sm:text-[10.5px]
                            md:text-[11px]
                          "
                        >
                          {section.content}
                        </div>
                      </div>
                    </div>
                  </motion.article>
                );
              })}

              {/* =================================================
                  CONTACT PRIVACY QUESTIONS
              ================================================== */}

              <motion.article
                {...reveal}
                whileHover={{
                  y: -2,
                }}
                className="
                  group

                  rounded-[9px]

                  border
                  border-[#d9e4d2]

                  bg-[linear-gradient(135deg,#f2f6ec_0%,#f7f8f2_100%)]

                  px-[18px]
                  py-[18px]

                  shadow-[0_4px_12px_rgba(20,57,22,0.045)]

                  transition-all
                  duration-300

                  hover:border-[#c9dac1]

                  hover:shadow-[0_8px_20px_rgba(20,57,22,0.08)]

                  sm:px-[22px]
                  sm:py-[20px]
                "
              >
                <div
                  className="
                    flex
                    min-w-0
                    items-start

                    gap-[12px]
                  "
                >
                  <div
                    className="
                      flex
                      h-[41px]
                      w-[41px]

                      shrink-0

                      items-center
                      justify-center

                      rounded-full

                      bg-[#e0ecd4]

                      text-[#39712f]

                      transition-transform
                      duration-300

                      group-hover:scale-105
                    "
                  >
                    <Mail
                      strokeWidth={1.7}
                      className="
                        h-[18px]
                        w-[18px]
                      "
                    />
                  </div>

                  <div className="min-w-0">
                    <h2
                      className="
                        text-[14px]
                        font-semibold

                        text-[#17301b]

                        sm:text-[15px]
                      "
                    >
                      Questions About Your Privacy?
                    </h2>

                    <p
                      className="
                        mt-[6px]

                        max-w-[680px]

                        text-[10px]
                        font-medium
                        leading-[1.6]

                        text-[#475148]

                        sm:text-[10.5px]
                      "
                    >
                      If you have questions about this Privacy Policy or
                      information associated with you, please contact our
                      team.
                    </p>

                    <a
                      href={`mailto:${siteInfo.email}`}
                      className="
                        group/email

                        mt-[10px]

                        inline-flex
                        max-w-full
                        items-center
                        gap-[7px]

                        rounded-[4px]

                        bg-[#174f1b]

                        px-[12px]
                        py-[7px]

                        text-[9px]
                        font-semibold

                        text-white

                        shadow-[0_3px_8px_rgba(8,45,12,0.14)]

                        transition-all
                        duration-300

                        hover:-translate-y-[1px]

                        hover:bg-[#216625]

                        hover:shadow-[0_5px_12px_rgba(8,45,12,0.20)]
                      "
                    >
                      <Mail
                        className="
                          h-[11px]
                          w-[11px]

                          shrink-0
                        "
                      />

                      <span className="break-all">
                        {siteInfo.email}
                      </span>
                    </a>
                  </div>
                </div>
              </motion.article>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          04. CTA
      ========================================================== */}

      <section
        className="
          w-full
          overflow-hidden

          bg-white

          pb-10

          sm:pb-12
          lg:pb-14
        "
      >
        <div className="privacy-page-container">
          <motion.div
            initial={{
              opacity: 0,
              y: 18,
              scale: 0.992,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            viewport={{
              once: true,
              amount: 0.15,
            }}
            transition={{
              duration: 0.65,
              ease,
            }}
            whileHover={{
              y: -2,
            }}
            className="
              group
              relative

              min-h-[115px]
              w-full

              overflow-hidden

              rounded-[8px]

              border
              border-[#dfe5d8]

              bg-[#eef2df]

              shadow-[0_4px_13px_rgba(20,60,22,0.055)]

              transition-all
              duration-300

              hover:shadow-[0_9px_22px_rgba(20,60,22,0.10)]

              max-[640px]:min-h-[155px]
            "
          >
            {/* Background */}

            <div
              aria-hidden="true"
              className="
                pointer-events-none
                absolute
                inset-0

                bg-cover
                bg-center
                bg-no-repeat

                transition-transform
                duration-700

                group-hover:scale-[1.012]

                max-[640px]:bg-[position:25%_center]
              "
             style={{
                            backgroundImage: `url(${bgcta})`,
                          }}
            />

            {/* Mobile overlay */}

            <div
              aria-hidden="true"
              className="
                pointer-events-none
                absolute
                inset-0

                hidden

                max-[640px]:block

                max-[640px]:bg-[linear-gradient(90deg,rgba(5,44,10,0.86)_0%,rgba(5,44,10,0.73)_50%,rgba(5,44,10,0.50)_100%)]
              "
            />

            <div
              className="
                relative
                z-10

                flex
                min-h-[115px]
                w-full

                flex-col

                justify-center

                py-[14px]

                pl-[43%]
                pr-[12%]

                max-[640px]:min-h-[155px]

                max-[640px]:items-center

                max-[640px]:px-5

                max-[640px]:text-center

                max-[390px]:px-4
              "
            >
              <motion.h2
                initial={{
                  opacity: 0,
                  y: 8,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  duration: 0.5,
                  delay: 0.08,
                }}
                className="
                  max-w-[440px]

                  text-[14px]
                  font-semibold
                  leading-[1.3]

                  text-[#15311a]

                  sm:text-[15px]
                  lg:text-[16px]

                  max-[640px]:text-white
                "
              >
                Your trust and privacy are important to us.
              </motion.h2>

              <motion.p
                initial={{
                  opacity: 0,
                  y: 7,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  duration: 0.5,
                  delay: 0.15,
                }}
                className="
                  mt-[6px]

                  max-w-[480px]

                  text-[9px]
                  font-medium
                  leading-[1.5]

                  text-[#435045]

                  sm:text-[11.5px]

                  max-[640px]:text-white/90
                "
              >
                Contact our team whenever you have questions about how
                information is handled.
              </motion.p>

              <motion.div
                initial={{
                  opacity: 0,
                  y: 7,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  duration: 0.5,
                  delay: 0.2,
                }}
                className="mt-[8px]"
              >
                <Link
                  to="/contact"
                  className="
                    group/button

                    inline-flex
                    items-center
                    justify-center

                    gap-[7px]

                    rounded-[4px]

                    bg-[#17521b]

                    px-[12px]
                    py-[7px]

                    text-[12px]
                    font-semibold

                    text-white

                    shadow-[0_3px_8px_rgba(7,45,11,0.15)]

                    transition-all
                    duration-300

                    hover:-translate-y-[2px]

                    hover:bg-[#216625]

                    hover:shadow-[0_6px_13px_rgba(7,45,11,0.22)]
                  "
                >
                  Contact Us

                  <ChevronRight
                    className="
                      h-[12px]
                      w-[12px]

                      transition-transform
                      duration-300

                      group-hover/button:translate-x-[3px]
                    "
                  />
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}