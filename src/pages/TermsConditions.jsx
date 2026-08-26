import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import SEO from "../components/SEO";

import {
  Leaf,
  FileText,
  UserCheck,
  BookOpen,
  ShieldCheck,
  Copyright,
  Link2,
  Ban,
  Scale,
  RefreshCw,
  Mail,
  ChevronRight,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";

import { siteInfo } from "../data/siteData";
import bg from "../assets/img/contactbg.png"
import bgcta from "../assets/img/subcta.png"


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
   TERMS DATA
========================================================= */

const termsSections = [
  {
    id: "acceptance",
    number: "01",
    icon: CheckCircle2,
    title: "Acceptance of Terms",
    content: (
      <>
        <p>
          By accessing or using this website, submitting a manuscript,
          registering for the conference, downloading resources, or using any
          of our services, you agree to comply with these Terms and Conditions.
        </p>

        <p>
          If you do not agree with these terms, please discontinue use of the
          website and its associated services.
        </p>
      </>
    ),
  },

  {
    id: "website-use",
    number: "02",
    icon: UserCheck,
    title: "Use of the Website",
    content: (
      <>
        <p>
          This website is provided for academic, scientific, conference,
          research, submission and publication-related purposes. Users must use
          the website lawfully and responsibly.
        </p>

        <p>
          You must not attempt to interfere with website functionality,
          compromise security, misuse submission systems, distribute harmful
          software, or use the website in a way that may damage our services or
          other users.
        </p>
      </>
    ),
  },

  {
    id: "registration",
    number: "03",
    icon: FileText,
    title: "Registration & Submitted Information",
    content: (
      <>
        <p>
          Where registration or submission forms are provided, you are
          responsible for ensuring that all information submitted is accurate,
          complete and current.
        </p>

        <p>
          We may contact you using the information provided for matters related
          to registration, conference participation, manuscript processing,
          publication, review or administrative support.
        </p>
      </>
    ),
  },

  {
    id: "manuscript-submission",
    number: "04",
    icon: BookOpen,
    title: "Manuscript Submission",
    content: (
      <>
        <p>
          Authors are responsible for ensuring that submitted manuscripts are
          original, appropriately cited and compliant with the stated
          submission and formatting requirements.
        </p>

        <p>
          Submitting plagiarized, fraudulent, misleading, previously published
          or improperly attributed material may result in rejection,
          withdrawal, cancellation or other appropriate action.
        </p>
      </>
    ),
  },

  {
    id: "peer-review",
    number: "05",
    icon: ShieldCheck,
    title: "Peer Review & Editorial Decisions",
    content: (
      <>
        <p>
          Manuscripts may be subject to editorial assessment and peer review.
          Submission of a manuscript does not guarantee acceptance,
          presentation or publication.
        </p>

        <p>
          Editorial and review decisions are made according to the applicable
          conference or publication procedures. Authors may be asked to revise
          their manuscripts before a final decision is made.
        </p>
      </>
    ),
  },

  {
    id: "intellectual-property",
    number: "06",
    icon: Copyright,
    title: "Intellectual Property",
    content: (
      <>
        <p>
          Unless otherwise stated, website content including design elements,
          text, graphics, logos, documents and downloadable resources is
          protected by applicable intellectual property rights.
        </p>

        <p>
          You may not reproduce, redistribute, modify, republish or
          commercially exploit protected website content without appropriate
          permission.
        </p>
      </>
    ),
  },

  {
    id: "external-links",
    number: "07",
    icon: Link2,
    title: "Third-Party & External Links",
    content: (
      <>
        <p>
          Our website may contain links to journals, indexing databases,
          publishers, partner organizations, payment services or other
          third-party websites.
        </p>

        <p>
          We are not responsible for the content, availability, security,
          accuracy or policies of external websites. Users should review the
          applicable terms and privacy policies of those services.
        </p>
      </>
    ),
  },

  {
    id: "prohibited-use",
    number: "08",
    icon: Ban,
    title: "Prohibited Activities",
    content: (
      <>
        <p>
          Users must not misuse this website for unlawful activity,
          impersonation, unauthorized data collection, fraudulent submissions,
          malicious interference, intellectual property infringement or any
          activity that may harm the conference, organization or other users.
        </p>
      </>
    ),
  },

  {
    id: "liability",
    number: "09",
    icon: AlertCircle,
    title: "Limitation of Liability",
    content: (
      <>
        <p>
          We aim to keep website information accurate and services available,
          but we do not guarantee uninterrupted access, error-free operation or
          the complete accuracy of all information at all times.
        </p>

        <p>
          To the extent permitted by applicable law, we are not responsible
          for indirect or consequential loss resulting from reliance on website
          information, technical interruptions or third-party services.
        </p>
      </>
    ),
  },

  {
    id: "changes",
    number: "10",
    icon: RefreshCw,
    title: "Changes to These Terms",
    content: (
      <>
        <p>
          These Terms and Conditions may be updated from time to time to
          reflect changes in website functionality, conference procedures,
          publication requirements or applicable policies.
        </p>

        <p>
          Updated terms become effective when published on this page unless
          otherwise stated.
        </p>
      </>
    ),
  },

  {
    id: "governing-terms",
    number: "11",
    icon: Scale,
    title: "Applicable Rules & Policies",
    content: (
      <>
        <p>
          These Terms and Conditions should be read together with our Privacy
          Policy, submission requirements, publication guidelines and other
          policies made available through this website.
        </p>
      </>
    ),
  },
];

/* =========================================================
   PAGE
========================================================= */

export default function TermsConditions() {
  const contactEmail =
    siteInfo?.email || "info@entomologyscience.org";

  return (
    <>
      <SEO
        title="Terms & Conditions | Entomology Science Association"
        description="Review the terms and conditions governing use of the Entomology Science Association website and conference services."
        canonical="/terms"
      />
      {/* =====================================================
          PAGE WIDTH
      ====================================================== */}

      <style>{`
        .terms-page-container {
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
          .terms-page-container {
            padding-left: 20px;
            padding-right: 20px;
          }
        }

        @media (max-width: 390px) {
          .terms-page-container {
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
        {/* Background image */}

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

            bg-[linear-gradient(90deg,rgba(2,34,8,0.98)_0%,rgba(3,38,9,0.93)_32%,rgba(3,38,9,0.63)_52%,rgba(3,38,9,0.16)_71%,rgba(3,38,9,0)_100%)]

            max-[640px]:bg-[linear-gradient(90deg,rgba(2,31,7,0.98)_0%,rgba(3,37,9,0.94)_48%,rgba(3,37,9,0.73)_76%,rgba(3,37,9,0.55)_100%)]
          "
        />

        {/* Bottom depth */}

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            inset-x-0
            bottom-0
            -z-10

            h-[35%]

            bg-[linear-gradient(180deg,transparent_0%,rgba(1,22,5,0.10)_100%)]
          "
        />

        <div className="terms-page-container">
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
                max-w-[590px]
              "
            >
              {/* Title */}

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
                  text-[31px]
                  font-semibold
                  leading-[1.05]
                  tracking-[-0.8px]

                  text-white

                  sm:text-[37px]
                  md:text-[41px]
                  lg:text-[44px]

                  max-[360px]:text-[28px]
                "
              >
                Terms &amp; Conditions
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
                  min-w-0
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
                  strokeWidth={1.8}
                  className="
                    h-[13px]
                    w-[13px]

                    shrink-0

                    text-[#aeca62]
                  "
                />

                <span className="text-[#b7d264]">
                  Terms &amp; Conditions
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
                  max-w-[535px]

                  text-[12px]
                  font-medium
                  leading-[1.65]

                  text-white/90

                  sm:text-[13px]
                  md:text-[13.5px]
                "
              >
                Please review the terms that govern your use of our
                conference website, manuscript submission services and
                related academic resources.
              </motion.p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* =========================================================
          02. INTRO CARD
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
        <div className="terms-page-container">
          <motion.div
            {...reveal}
            whileHover={{
              y: -2,
            }}
            className="
              group
              relative

              overflow-hidden

              rounded-[9px]

              border
              border-[#dfe6d9]

              bg-[#f6f8f2]

              px-5
              py-5

              shadow-[0_3px_12px_rgba(22,61,24,0.045)]

              transition-all
              duration-300

              hover:border-[#cedbc7]

              hover:shadow-[0_8px_20px_rgba(22,61,24,0.08)]

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

                  transition-all
                  duration-300

                  group-hover:scale-105
                  group-hover:bg-[#dce9cd]
                "
              >
                <FileText
                  strokeWidth={1.6}
                  className="
                    h-[21px]
                    w-[21px]
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
                  Agreement Between You and Our Organization
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
                  These Terms and Conditions describe the rules applicable
                  when using the {siteInfo?.name || "Entomology Science Association"} website,
                  participating in conference-related activities, accessing
                  resources or submitting academic material through our
                  services.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* =========================================================
          03. MAIN TERMS CONTENT
      ========================================================== */}

      <section
        className="
          w-full

          bg-white

          pb-10

          sm:pb-12
          lg:pb-14
        "
      >
        <div className="terms-page-container">
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
                LEFT NAVIGATION
            ================================================== */}

            <motion.aside
              {...reveal}
              className="
                min-w-0

                min-[960px]:sticky
                min-[960px]:top-[95px]
                min-[960px]:self-start
              "
            >
              <div
                className="
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

                      shrink-0

                      text-[#39722b]
                    "
                  />

                  <h2
                    className="
                      text-[13px]
                      font-semibold

                      text-[#17301b]

                      sm:text-[14px]
                    "
                  >
                    Terms &amp; Conditions
                  </h2>
                </div>

                <div
                  className="
                    ml-[26px]
                    mt-[7px]

                    h-[2px]
                    w-[38px]

                    rounded-full

                    bg-[#5d8d3e]
                  "
                />

                <nav
                  aria-label="Terms and Conditions sections"
                  className="
                    mt-[14px]

                    grid
                    grid-cols-1

                    gap-[5px]

                    min-[440px]:grid-cols-2

                    min-[960px]:grid-cols-1
                  "
                >
                  {termsSections.map((section) => (
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

                          text-[7px]
                          font-semibold

                          text-[#477539]

                          transition-colors
                          duration-300

                          group-hover/nav:bg-[#d7e7c9]
                        "
                      >
                        {section.number}
                      </span>

                      <span className="min-w-0">
                        {section.title}
                      </span>
                    </a>
                  ))}
                </nav>
              </div>
            </motion.aside>

            {/* =================================================
                RIGHT CONTENT
            ================================================== */}

            <div
              className="
                flex
                min-w-0
                flex-col

                gap-[12px]
              "
            >
              {termsSections.map((section, index) => {
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

                      scroll-mt-[110px]

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

                        max-[390px]:gap-[10px]
                      "
                    >
                      {/* ICON */}

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

                          max-[360px]:h-[36px]
                          max-[360px]:w-[36px]
                        "
                      >
                        <SectionIcon
                          strokeWidth={1.6}
                          className="
                            h-[19px]
                            w-[19px]

                            sm:h-[20px]
                            sm:w-[20px]

                            max-[360px]:h-[17px]
                            max-[360px]:w-[17px]
                          "
                        />
                      </div>

                      {/* CONTENT */}

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
                              min-w-0

                              text-[14px]
                              font-semibold
                              leading-[1.25]

                              text-[#17301b]

                              sm:text-[15px]

                              md:text-[16px]

                              max-[360px]:text-[13px]
                            "
                          >
                            {section.title}
                          </h2>
                        </div>

                        <div
                          className="
                            mt-[9px]

                            flex
                            min-w-0
                            flex-col

                            gap-[8px]

                            text-[10px]
                            font-medium
                            leading-[1.7]

                            text-[#465047]

                            sm:text-[10.5px]

                            md:text-[11px]

                            max-[360px]:text-[9.5px]
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
                  CONTACT BOX
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
                      Questions About These Terms?
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
                      If you have questions regarding these Terms and
                      Conditions, conference participation or our website
                      policies, please contact our team.
                    </p>

                    <a
                      href={`mailto:${contactEmail}`}
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
                        {contactEmail}
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
        <div className="terms-page-container">
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
              min-w-0

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

            <motion.div
              aria-hidden="true"
              initial={{
                scale: 1.015,
              }}
              whileInView={{
                scale: 1,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 1.1,
                ease,
              }}
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

            {/* Content */}

            <div
              className="
                relative
                z-10

                flex
                min-h-[115px]
                w-full
                min-w-0

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
                  max-w-[450px]

                  text-[14px]
                  font-semibold
                  leading-[1.3]

                  text-[#15311a]

                  sm:text-[15px]

                  lg:text-[16px]

                  max-[640px]:text-white
                "
              >
                Have questions about our conference policies?
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

                  max-w-[430px]

                  text-[9px]
                  font-medium
                  leading-[1.5]

                  text-[#435045]

                  sm:text-[9.5px]

                  max-[640px]:text-white/90
                "
              >
                Our team is available to assist with terms, submissions,
                publications and conference-related queries.
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

                    text-[9px]
                    font-semibold

                    text-white

                    shadow-[0_3px_8px_rgba(7,45,11,0.15)]

                    transition-all
                    duration-300

                    hover:-translate-y-[2px]

                    hover:bg-[#216625]

                    hover:shadow-[0_6px_13px_rgba(7,45,11,0.22)]

                    active:translate-y-0
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