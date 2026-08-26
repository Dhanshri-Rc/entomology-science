import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import SEO from "../components/SEO";
import bg from "../assets/img/contactbg.png"
import cta from "../assets/img/subcta.png"

import {
  Leaf,
  User,
  Mail,
  MapPin,
  Phone,
  Globe2,
  CheckCircle2,
  Send,
  Headphones,
  BookOpen,
  FileUp,
  MessagesSquare,
  ArrowRight,
  AlertCircle,
} from "lucide-react";

import {
  contactSubjects,
} from "../data/siteData";
import { useSiteSettings } from "../context/SiteSettingsContext";
import api, { ApiRequestError } from "../lib/api";

/* =========================================================
   ANIMATION
========================================================= */

const ease = [0.22, 1, 0.36, 1];

const fadeUp = {
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
    amount: 0.15,
  },
  transition: {
    duration: 0.55,
    ease,
  },
};

/* =========================================================
   CONTACT CATEGORY DATA
========================================================= */

const contactCards = [
  {
    icon: MessagesSquare,
    title: "General Inquiries",
    email: "contact@entomologyscience.org",
  },
  {
    icon: FileUp,
    title: "Submission Support",
    email: "submissions@entomologyscience.org",
  },
  {
    icon: BookOpen,
    title: "Publication Queries",
    email: "publication@entomologyscience.org",
  },
  {
    icon: Headphones,
    title: "Conference Support",
    email: "support@entomologyscience.org",
  },
];

/* =========================================================
   PAGE
========================================================= */

export default function Contact() {
  const { siteInfo } = useSiteSettings();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    subject: "",
    message: "",
    agree: false,
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const handleChange = (field) => (event) => {
    const value =
      field === "agree"
        ? event.target.checked
        : event.target.value;

    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [field]: undefined,
    }));

    if (submitted) {
      setSubmitted(false);
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!form.fullName.trim()) {
      newErrors.fullName = "Full name is required.";
    }

    if (!form.email.trim()) {
      newErrors.email = "Email address is required.";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)
    ) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!form.subject) {
      newErrors.subject = "Please select a subject.";
    }

    if (!form.message.trim()) {
      newErrors.message = "Your message is required.";
    }

    if (!form.agree) {
      newErrors.agree =
        "Please agree to the privacy policy.";
    }

    return newErrors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (submitting) return;

    const newErrors = validate();

    setErrors(newErrors);
    setSubmitError("");

    if (Object.keys(newErrors).length !== 0) {
      return;
    }

    setSubmitting(true);

    try {
      await api.post("/inquiries", {
        fullName: form.fullName.trim(),
        email: form.email.trim(),
        subject: form.subject,
        message: form.message.trim(),
        agree: form.agree,
      });

      // Only reset the form after the backend confirms success.
      setSubmitted(true);

      setForm({
        fullName: "",
        email: "",
        subject: "",
        message: "",
        agree: false,
      });
    } catch (error) {
      setSubmitted(false);

      if (error instanceof ApiRequestError) {
        setSubmitError(error.message);
      } else {
        setSubmitError(
          "Unable to reach the server. Please check your connection and try again."
        );
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <SEO
        title="Contact Us | Entomology Science Association"
        description="Get in touch with the Entomology Science Association for questions about ICEBIS, submissions, sponsorships or general inquiries."
        canonical="/contact"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Entomology Science Association",
          email: siteInfo?.email,
          telephone: siteInfo?.phone,
          url: "https://www.entomologyscience.org",
        }}
      />

      {/* =====================================================
          GLOBAL PAGE WIDTH
      ====================================================== */}

      <style>{`
        .contact-page-container {
          width: 100%;
          max-width: 1180px;
          margin-left: auto;
          margin-right: auto;
          padding-left: 28px;
          padding-right: 28px;
          box-sizing: border-box;
          min-width: 0;
        }

        @media (max-width: 640px) {
          .contact-page-container {
            padding-left: 20px;
            padding-right: 20px;
          }
        }

        @media (max-width: 390px) {
          .contact-page-container {
            padding-left: 16px;
            padding-right: 16px;
          }
        }
      `}</style>

      {/* =========================================================
          01. CONTACT HERO
      ========================================================== */}

      <section
        className="
          group
          relative
          isolate
          w-full
          min-w-0
          overflow-hidden
          bg-[#082d10]

          pt-[70px]
          sm:pt-[120px]
        "
      >
        {/* Background Image */}

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

            max-[480px]:bg-[position:73%_center]
          "
           style={{
                         backgroundImage: `url(${bg})`,
                       }}
        />

        {/* Desktop / tablet overlay */}

        {/* <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            inset-0
            -z-20

            bg-[linear-gradient(90deg,rgba(2,34,8,0.97)_0%,rgba(4,41,12,0.89)_31%,rgba(5,45,14,0.59)_49%,rgba(5,45,14,0.15)_68%,rgba(5,45,14,0)_100%)]

            max-[640px]:bg-[linear-gradient(90deg,rgba(2,34,8,0.98)_0%,rgba(4,41,12,0.91)_46%,rgba(4,41,12,0.71)_73%,rgba(4,41,12,0.50)_100%)]
          "
        /> */}

        <div className="contact-page-container">
          <div
            className="
              relative
              z-10

              flex
              min-h-[215px]
              w-full
              items-start

              pb-[26px]
              pt-[30px]

              sm:min-h-[218px]
              sm:pt-[31px]

              lg:min-h-[280px]

              max-[480px]:min-h-[230px]
              max-[480px]:pt-[27px]
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
                max-w-[470px]
              "
            >
              {/* Title */}

              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.55,
                  delay: 0.07,
                  ease,
                }}
                className="
                  text-[31px]
                  font-semibold
                  leading-[1.05]
                  tracking-[-0.8px]
                  text-white

                  sm:text-[36px]
                  md:text-[39px]
                  lg:text-[40px]

                  max-[360px]:text-[28px]
                "
              >
                Contact Us
              </motion.h1>

              {/* Green subtitle */}

              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: 0.14,
                }}
                className="
                  mt-[10px]

                  text-[15px]
                  font-medium
                  leading-none

                  text-[#b5d967]

                  sm:text-[16px]
                  lg:text-[17px]
                "
              >
                We are here to help!
              </motion.p>

              {/* Description */}

              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: 0.21,
                }}
                className="
                  mt-[18px]
                  max-w-[420px]

                  text-[13px]
                  font-medium
                  leading-[1.55]

                  text-white/90

                  sm:text-[13.5px]
                  md:text-[14px]
                "
              >
                Have questions about the conference, submission,
                <br className="hidden sm:block" />
                publication, or collaboration? Reach out to us.
              </motion.p>

              {/* Breadcrumb */}

              <motion.div
                initial={{ opacity: 0, y: 7 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: 0.28,
                }}
                className="
                  mt-[15px]

                  flex
                  items-center
                  gap-[9px]

                  text-[14px]
                  font-medium
                "
              >
                <Link
                  to="/"
                  className="
                    text-white

                    transition-colors
                    duration-300

                    hover:text-[#b7d264]
                  "
                >
                  Home
                </Link>

                <span className="text-[#acc963]">
                  ›
                </span>

                <span className="text-[#b7d264]">
                  Contact Us
                </span>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* =========================================================
          02. CONTACT MAIN
      ========================================================== */}

      <section
        className="
          w-full
          overflow-hidden
          bg-white

          py-[18px]

          sm:py-[20px]
          lg:py-[22px]
        "
      >
        <div className="contact-page-container">
          {/* =====================================================
              FORM + CONTACT INFORMATION
          ====================================================== */}

          <div
            className="
              grid
              min-w-0
              grid-cols-1
              gap-[15px]

              min-[930px]:grid-cols-[minmax(0,1.7fr)_minmax(300px,1fr)]
            "
          >
            {/* =================================================
                LEFT - FORM
            ================================================== */}

            <motion.div
              {...fadeUp}
              className="
                min-w-0

                rounded-[10px]

                border
                border-[#edf0e8]

                bg-[#f7f9f5]

                px-[18px]
                py-[18px]

                shadow-[0_3px_12px_rgba(24,65,25,0.045)]

                sm:px-[24px]
                sm:py-[20px]

                lg:px-[28px]
              "
            >
              {/* Heading */}

              <SectionHeading>
                Send Us a Message
              </SectionHeading>

              <p
                className="
                  mt-[9px]

                  text-[10.5px]
                  font-medium
                  leading-[1.45]

                  text-[#465048]

                  sm:text-[12px]
                "
              >
                Fill out the form below and our team will get
                back to you shortly.
              </p>

              {/* Success */}

              {submitted && (
                <motion.div
                  initial={{
                    opacity: 0,
                    y: -6,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  className="
                    mt-4

                    flex
                    items-start
                    gap-2

                    rounded-[5px]

                    border
                    border-[#7fa86b]/40

                    bg-[#eaf3e5]

                    px-3
                    py-2.5

                    text-[11px]
                    font-medium
                    text-[#246225]
                  "
                >
                  <CheckCircle2
                    className="
                      mt-[1px]
                      h-[14px]
                      w-[14px]
                      shrink-0
                    "
                  />

                  Thank you. Your message has been submitted
                  successfully.
                </motion.div>
              )}

              {/* Error */}

              {submitError && (
                <motion.div
                  initial={{
                    opacity: 0,
                    y: -6,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  className="
                    mt-4

                    flex
                    items-start
                    gap-2

                    rounded-[5px]

                    border
                    border-red-300

                    bg-red-50

                    px-3
                    py-2.5

                    text-[11px]
                    font-medium
                    text-red-600
                  "
                >
                  <AlertCircle
                    className="
                      mt-[1px]
                      h-[14px]
                      w-[14px]
                      shrink-0
                    "
                  />

                  {submitError}
                </motion.div>
              )}

              {/* FORM */}

              <form
                noValidate
                onSubmit={handleSubmit}
                className="
                  mt-[16px]
                  flex
                  flex-col
                  gap-[13px]
                "
              >
                {/* Name + Email */}

                <div
                  className="
                    grid
                    min-w-0
                    grid-cols-1
                    gap-[13px]

                    sm:grid-cols-2
                    sm:gap-[18px]
                  "
                >
                  {/* Full Name */}

                  <FormField
                    label="Full Name"
                    required
                    error={errors.fullName}
                  >
                    <User
                      className="
                        absolute
                        left-[10px]
                        top-1/2

                        h-[13px]
                        w-[13px]

                        -translate-y-1/2

                        text-[#5f6a61]
                      "
                    />

                    <input
                      type="text"
                      value={form.fullName}
                      onChange={handleChange("fullName")}
                      placeholder="Enter your full name"
                      className="
                        h-[35px]
                        w-full

                        rounded-[4px]

                        border
                        border-[#ccd5c9]

                        bg-white

                        pl-[31px]
                        pr-[10px]

                        text-[11.5px]
                        font-medium

                        text-[#263028]

                        outline-none

                        transition-all
                        duration-300

                        placeholder:text-[#7a837b]

                        hover:border-[#aaba9f]

                        focus:border-[#5b8a4d]
                        focus:ring-2
                        focus:ring-[#5b8a4d]/10
                      "
                    />
                  </FormField>

                  {/* Email */}

                  <FormField
                    label="Email Address"
                    required
                    error={errors.email}
                  >
                    <Mail
                      className="
                        absolute
                        left-[10px]
                        top-1/2

                        h-[13px]
                        w-[13px]

                        -translate-y-1/2

                        text-[#5f6a61]
                      "
                    />

                    <input
                      type="email"
                      value={form.email}
                      onChange={handleChange("email")}
                      placeholder="Enter your email"
                      className="
                        h-[35px]
                        w-full

                        rounded-[4px]

                        border
                        border-[#ccd5c9]

                        bg-white

                        pl-[31px]
                        pr-[10px]

                        text-[11.5px]
                        font-medium

                        text-[#263028]

                        outline-none

                        transition-all
                        duration-300

                        placeholder:text-[#7a837b]

                        hover:border-[#aaba9f]

                        focus:border-[#5b8a4d]
                        focus:ring-2
                        focus:ring-[#5b8a4d]/10
                      "
                    />
                  </FormField>
                </div>

                {/* Subject */}

                <FormField
                  label="Subject"
                  error={errors.subject}
                >
                  <select
                    value={form.subject}
                    onChange={handleChange("subject")}
                    className="
                      h-[35px]
                      w-full

                      rounded-[4px]

                      border
                      border-[#ccd5c9]

                      bg-white

                      px-[10px]

                      text-[11.5px]
                      font-medium

                      text-[#596159]

                      outline-none

                      transition-all
                      duration-300

                      hover:border-[#aaba9f]

                      focus:border-[#5b8a4d]
                      focus:ring-2
                      focus:ring-[#5b8a4d]/10
                    "
                  >
                    <option value="">
                      Select a subject
                    </option>

                    {contactSubjects.map((subject) => (
                      <option
                        value={subject}
                        key={subject}
                      >
                        {subject}
                      </option>
                    ))}
                  </select>
                </FormField>

                {/* Message */}

                <FormField
                  label="Your Message"
                  required
                  error={errors.message}
                >
                  <textarea
                    value={form.message}
                    onChange={handleChange("message")}
                    placeholder="Write your message here..."
                    rows={4}
                    className="
                      min-h-[86px]
                      w-full
                      resize-y

                      rounded-[4px]

                      border
                      border-[#ccd5c9]

                      bg-white

                      px-[10px]
                      py-[9px]

                      text-[11.5px]
                      font-medium

                      text-[#263028]

                      outline-none

                      transition-all
                      duration-300

                      placeholder:text-[#7a837b]

                      hover:border-[#aaba9f]

                      focus:border-[#5b8a4d]
                      focus:ring-2
                      focus:ring-[#5b8a4d]/10
                    "
                  />
                </FormField>

                {/* Privacy */}

                <div>
                  <label
                    className="
                      flex
                      cursor-pointer
                      items-center
                      gap-[7px]

                      text-[11.5px]
                      font-medium

                      text-[#3f4941]
                    "
                  >
                    <input
                      type="checkbox"
                      checked={form.agree}
                      onChange={handleChange("agree")}
                      className="
                        h-[13px]
                        w-[13px]

                        cursor-pointer

                        accent-[#245d25]
                      "
                    />

                    <span>
                      I agree to the{" "}
                      <Link
                        to="/privacy-policy"
                        className="
                          font-semibold
                          text-[#285f28]
                          underline

                          underline-offset-2

                          hover:text-[#143f17]
                        "
                      >
                        privacy policy
                      </Link>
                    </span>
                  </label>

                  {errors.agree && (
                    <p
                      className="
                        mt-1
                        text-[8px]
                        font-medium
                        text-red-500
                      "
                    >
                      {errors.agree}
                    </p>
                  )}
                </div>

                {/* Submit Button */}

                <motion.button
                  type="submit"
                  disabled={submitting}
                  whileHover={submitting ? {} : {
                    y: -2,
                  }}
                  whileTap={submitting ? {} : {
                    scale: 0.99,
                  }}
                  className="
                    group/button
                    relative

                    flex
                    min-h-[38px]
                    w-full

                    items-center
                    justify-center
                    gap-[8px]

                    overflow-hidden

                    rounded-[5px]

                    border
                    border-[#174c1a]

                    bg-[linear-gradient(180deg,#17551c_0%,#0d4112_100%)]

                    px-5
                    py-[9px]

                    text-[12.5px]
                    font-semibold
                    text-white

                    shadow-[0_4px_10px_rgba(10,52,14,0.15)]

                    transition-all
                    duration-300

                    hover:border-[#256e2a]
                    hover:bg-[linear-gradient(180deg,#216d27_0%,#15531b_100%)]

                    hover:shadow-[0_7px_15px_rgba(10,52,14,0.22)]

                    disabled:cursor-not-allowed
                    disabled:opacity-70
                  "
                >
                  {/* shine */}

                  <span
                    className="
                      pointer-events-none
                      absolute
                      inset-y-0
                      -left-[30%]

                      w-[20%]

                      -skew-x-[20deg]

                      bg-white/10

                      transition-all
                      duration-700

                      group-hover/button:left-[120%]
                    "
                  />

                  <span className="relative z-10">
                    {submitting ? "Sending..." : "Send Message"}
                  </span>

                  {submitting ? (
                    <span
                      className="
                        relative
                        z-10
                        h-[13px]
                        w-[13px]
                        animate-spin
                        rounded-full
                        border-2
                        border-white/40
                        border-t-white
                      "
                    />
                  ) : (
                    <Send
                      strokeWidth={1.8}
                      className="
                        relative
                        z-10

                        h-[13px]
                        w-[13px]

                        transition-transform
                        duration-300

                        group-hover/button:translate-x-[3px]
                      "
                    />
                  )}
                </motion.button>
              </form>
            </motion.div>

            {/* =================================================
                RIGHT - CONTACT INFORMATION
            ================================================== */}

            <motion.aside
              {...fadeUp}
              transition={{
                duration: 0.6,
                delay: 0.08,
                ease,
              }}
              className="
                min-w-0

                rounded-[10px]

                border
                border-[#edf0e8]

                bg-[#f7f9f5]

                px-[18px]
                py-[18px]

                shadow-[0_3px_12px_rgba(24,65,25,0.045)]

                sm:px-[22px]

                lg:px-[24px]
              "
            >
              <SectionHeading>
                Contact Information
              </SectionHeading>

              {/* Little green heading line */}

              <div
                className="
                  ml-[27px]
                  mt-[6px]

                  h-[2px]
                  w-[40px]

                  rounded-full

                  bg-[#4a8d36]
                "
              />

              <div className="mt-[15px]">
                {/* Address */}

                <ContactRow
                  icon={MapPin}
                  title="Entomology Science Association"
                >
                  <p>
                    B-6, DSIDC Packaging Complex, Kirti Nagar,

                  </p>
                  <p>Kirti Nagar, New Delhi, Delhi, 110015</p>
                  <p> New Delhi, Delhi, 110015</p>
                </ContactRow>

                {/* Email */}

                <ContactRow
                  icon={Mail}
                  title="Email"
                >
                  <a
                    href={`mailto:${
                      siteInfo?.email ||
                      "contact@entomologyscience.org"
                    }`}
                    className="
                      font-semibold
                      text-[#317229]

                      transition-colors
                      hover:text-[#174a19]
                    "
                  >
                    {siteInfo?.email ||
                      "contact@entomologyscience.org"}
                  </a>
                </ContactRow>

                {/* Phone */}

                <ContactRow
                  icon={Phone}
                  title="Phone"
                >
                  <a
                    href="tel:+12029811088"
                    className="
                      transition-colors
                      hover:text-[#2e6e2d]
                    "
                  >
                    {siteInfo?.phone ||
                      "+91 81098 09909"}
                  </a>
                </ContactRow>

                {/* Website */}

                <ContactRow
                  icon={Globe2}
                  title="Website"
                  border={false}
                >
                  <a
                    href="https://www.entomologyscience.org"
                    target="_blank"
                    rel="noreferrer"
                    className="
                      font-semibold
                      text-[#317229]

                      transition-colors
                      hover:text-[#174a19]
                    "
                  >
                    {siteInfo?.website ||
                      "www.entomologyscience.org"}
                  </a>
                </ContactRow>
              </div>

              {/* =================================================
                  MAP
              ================================================== */}

              <motion.div
                whileHover={{
                  scale: 1.008,
                }}
                transition={{
                  duration: 0.3,
                }}
                className="
                  relative
                  mt-[12px]

                  h-[122px]
                  w-full

                  overflow-hidden

                  rounded-[5px]

                  border
                  border-[#d7ded2]

                  bg-[#e9eee7]

                  shadow-[0_2px_7px_rgba(20,57,23,0.05)]

                  sm:h-[130px]
                "
              >
                <iframe
                  title="Entomology Science Association location"
                  src="https://www.google.com/maps?q=Delhi%20DC%20USA&z=13&output=embed"
                  loading="lazy"
                  className="
                    h-full
                    w-full
                    border-0
                  "
                />

                {/* marker label */}

                <div
                  className="
                    pointer-events-none

                    absolute
                    left-[51%]
                    top-[40%]

                    flex
                    -translate-x-1/2
                    -translate-y-1/2
                    items-center
                    gap-[5px]
                  "
                >
                  <div
                    className="
                      flex
                      h-[21px]
                      w-[21px]
                      items-center
                      justify-center

                      rounded-full

                      bg-[#dc382f]

                      text-white

                      shadow-[0_2px_7px_rgba(0,0,0,0.22)]
                    "
                  >
                    <MapPin className="h-[13px] w-[13px]" />
                  </div>

                  <span
                    className="
                      max-w-[100px]

                      text-[7px]
                      font-semibold
                      leading-[1.1]

                      text-[#dc382f]
                    "
                  >
                    Entomology Science Association
                  </span>
                </div>
              </motion.div>
            </motion.aside>
          </div>

          {/* =====================================================
              03. CONTACT CATEGORY STRIP
          ====================================================== */}

          <motion.section
            {...fadeUp}
            className="
              mt-[14px]

              grid
              min-w-0
              grid-cols-1

              overflow-hidden

              rounded-[9px]

              border
              border-[#edf0e8]

              bg-[#f7f9f5]

              px-[12px]
              py-[13px]

              shadow-[0_3px_12px_rgba(24,65,25,0.04)]

              min-[430px]:grid-cols-2

              lg:grid-cols-4

              sm:px-[16px]
            "
          >
            {contactCards.map((card, index) => {
              const CardIcon = card.icon;

              return (
                <motion.a
                  key={card.title}
                  href={`mailto:${card.email}`}
                  initial={{
                    opacity: 0,
                    y: 10,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                  }}
                  transition={{
                    duration: 0.4,
                    delay: index * 0.055,
                  }}
                  whileHover={{
                    y: -3,
                  }}
                  className={`
                    group/card

                    relative

                    flex
                    min-w-0
                    flex-col
                    items-center

                    px-[12px]
                    py-[10px]

                    text-center

                    transition-all
                    duration-300

                    hover:bg-white/55

                    ${
                      index !== 3
                        ? "lg:border-r lg:border-[#dfe5dc]"
                        : ""
                    }

                    ${
                      index === 0 || index === 1
                        ? "max-lg:border-b max-lg:border-[#dfe5dc]"
                        : ""
                    }

                    ${
                      index === 0 || index === 2
                        ? "min-[430px]:max-lg:border-r min-[430px]:max-lg:border-[#dfe5dc]"
                        : ""
                    }
                  `}
                >
                  {/* icon */}

                  <div
                    className="
                      flex
                      h-[40px]
                      w-[40px]

                      items-center
                      justify-center

                      rounded-full

                      border
                      border-[#4d7950]

                      bg-white/50

                      text-[#204d25]

                      transition-all
                      duration-300

                      group-hover/card:scale-110
                      group-hover/card:bg-[#edf5e8]
                    "
                  >
                    <CardIcon
                      strokeWidth={1.55}
                      className="
                        h-[22px]
                        w-[22px]
                      "
                    />
                  </div>

                  <h3
                    className="
                      mt-[8px]

                      text-[12px]
                      font-semibold
                      leading-[1.2]

                      text-[#17301c]

                      sm:text-[13.5px]
                    "
                  >
                    {card.title}
                  </h3>

                  <p
                    className="
                      mt-[3px]
                      max-w-full

                      break-all

                      text-[10.5px]
                      font-medium

                      text-[#465048]

                      sm:text-[11px]
                    "
                  >
                    {card.email}
                  </p>
                </motion.a>
              );
            })}
          </motion.section>
        </div>
      </section>

      {/* =========================================================
          04. CONTACT CTA
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
        <div className="contact-page-container">
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
              amount: 0.2,
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

              min-h-[125px]
              w-full
              min-w-0

              overflow-hidden

              rounded-[8px]

              border
              border-[#e1e6db]

              bg-[#eef1df]

              shadow-[0_4px_14px_rgba(23,63,25,0.06)]

              transition-all
              duration-300

              hover:shadow-[0_9px_22px_rgba(23,63,25,0.11)]

              max-[640px]:min-h-[165px]
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
                             backgroundImage: `url(${cta})`,
                           }}
            />

            {/* mobile overlay */}

            <div
              className="
                pointer-events-none
                absolute
                inset-0

                hidden

                max-[640px]:block

                max-[640px]:bg-[linear-gradient(90deg,rgba(6,45,11,0.86)_0%,rgba(6,45,11,0.73)_50%,rgba(6,45,11,0.50)_100%)]
              "
            />

            {/* CTA content */}

            <div
              className="
                relative
                z-10

                flex
                min-h-[125px]
                w-full

                flex-col

                justify-center

                py-[15px]

                pl-[46%]
                pr-[12%]

                max-[640px]:min-h-[165px]

                max-[640px]:items-center

                max-[640px]:px-5

                max-[640px]:text-center
              "
            >
              <motion.h2
                initial={{
                  opacity: 0,
                  y: 9,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: 0.1,
                }}
                className="
                  max-w-[410px]

                  text-[15px]
                  font-semibold
                  leading-[1.25]

                  tracking-[-0.15px]

                  text-[#143119]

                  sm:text-[16px]
                  lg:text-[18px]

                  max-[640px]:text-white
                "
              >
                Let&apos;s work together to advance
                <br className="hidden md:block" />
                entomological science.
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
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: 0.17,
                }}
                className="
                  mt-[9px]
                  text-[11px]
                  font-medium

                  text-[#354036]

                  sm:text-[11.5px]

                  max-[640px]:text-white/90
                "
              >
                We look forward to connecting with you!
              </motion.p>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}

/* =========================================================
   SECTION HEADING
========================================================= */

function SectionHeading({ children }) {
  return (
    <div
      className="
        flex
        min-w-0
        items-center
        gap-[10px]
      "
    >
      <Leaf
        strokeWidth={1.8}
        className="
          h-[22px]
          w-[22px]
          shrink-0
          text-[#39722b]
        "
      />

      <h2
        className="
          min-w-0

          text-[19px]
          font-semibold
          leading-none
          tracking-[-0.15px]

          text-[#17301b]

          sm:text-[20px]
        "
      >
        {children}
      </h2>
    </div>
  );
}

/* =========================================================
   FORM FIELD
========================================================= */

function FormField({
  label,
  required = false,
  error,
  children,
}) {
  return (
    <div className="min-w-0">
      <label
        className="
          mb-[6px]
          block

          text-[11px]
          font-semibold

          text-[#273329]

          sm:text-[11.5px]
        "
      >
        {label}

        {required && (
          <span className="ml-[2px] text-red-500">
            *
          </span>
        )}
      </label>

      <div className="relative">
        {children}
      </div>

      {error && (
        <p
          className="
            mt-[4px]
            text-[12px]
            font-medium
            text-red-500
          "
        >
          {error}
        </p>
      )}
    </div>
  );
}

/* =========================================================
   CONTACT INFORMATION ROW
========================================================= */

function ContactRow({
  icon: RowIcon,
  title,
  children,
  border = true,
}) {
  return (
    <motion.div
      whileHover={{
        x: 3,
      }}
      transition={{
        duration: 0.25,
      }}
      className={`
        group

        flex
        min-w-0
        items-start

        gap-[10px]

        py-[9px]

        ${
          border
            ? "border-b border-[#dfe5db]"
            : ""
        }
      `}
    >
      <div
        className="
          flex
          h-[33px]
          w-[33px]

          shrink-0

          items-center
          justify-center

          rounded-full

          bg-[#e4efd8]

          text-[#477237]

          transition-all
          duration-300

          group-hover:scale-105
          group-hover:bg-[#d9eacb]
        "
      >
        <RowIcon
          strokeWidth={1.7}
          className="
            h-[14px]
            w-[14px]
          "
        />
      </div>

      <div
        className="
          min-w-0
          pt-[1px]
        "
      >
        <h3
          className="
            text-[13.5px]
            font-semibold
            leading-[1.25]

            text-[#172b1b]

            sm:text-[14px]
          "
        >
          {title}
        </h3>

        <div
          className="
            mt-[2px]

            break-words

            text-[10.5px]
            font-medium
            leading-[1.4]

            text-[#465047]

            sm:text-[11px]
          "
        >
          {children}
        </div>
      </div>
    </motion.div>
  );
}