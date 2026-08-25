import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import {
  User,
  UserCheck,
  FileText,
  UploadCloud,
  MessageSquare,
  CheckCircle2,
  ShieldCheck,
  CalendarDays,
  FileType2,
  Headphones,
  Mail,
  Phone,
  BookOpen,
  Download,
  ArrowRight,
  Save,
  Send,
  Check,
  Leaf,
  ChevronRight,
} from "lucide-react";

import Icon from "../components/Icon";
import bg from "../assets/img/subpaperbg.png"
import bgcta from "../assets/img/subpapercta.png"


import {
  submitPaperGuidelines,
  importantDates,
  acceptedFileFormats,
  submitPaperProcess,
  conferenceTracks,
  researchAreas,
  presentationTypes,
  mainJournal,
  siteInfo,
} from "../data/siteData";

/* =========================================================
   CONFIG
========================================================= */

const ease = [0.22, 1, 0.36, 1];

const DRAFT_KEY = "icebis-submit-paper-draft";

const initialForm = {
  fullName: "",
  email: "",
  affiliation: "",
  country: "",

  corrFullName: "",
  corrEmail: "",
  corrPhone: "",
  corrAddress: "",

  paperTitle: "",
  researchArea: "",
  abstract: "",
  keywords: "",
  presentationType: "",

  paperFile: null,
  coverLetterFile: null,

  notes: "",
  agree: false,
};

/* =========================================================
   PAGE
========================================================= */

export default function SubmitPaper() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});

  const [submitted, setSubmitted] = useState(false);
  const [draftSaved, setDraftSaved] = useState(false);

  /* =======================================================
     LOAD SAVED DRAFT
  ======================================================== */

  useEffect(() => {
    try {
      const savedDraft = localStorage.getItem(DRAFT_KEY);

      if (!savedDraft) return;

      const parsed = JSON.parse(savedDraft);

      setForm((current) => ({
        ...current,
        ...parsed,

        // browsers do not allow restoring real File objects
        paperFile: null,
        coverLetterFile: null,
      }));
    } catch (error) {
      console.error("Unable to load saved draft:", error);
    }
  }, []);

  /* =======================================================
     WORD COUNT
  ======================================================== */

  const abstractWordCount = useMemo(() => {
    const value = form.abstract.trim();

    if (!value) return 0;

    return value.split(/\s+/).length;
  }, [form.abstract]);

  /* =======================================================
     NORMAL FIELD CHANGE
  ======================================================== */

  const setField = (field) => (event) => {
    const value =
      field === "agree"
        ? event.target.checked
        : event.target.value;

    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));

    setErrors((previous) => ({
      ...previous,
      [field]: undefined,
    }));

    setSubmitted(false);
    setDraftSaved(false);
  };

  /* =======================================================
     FILE CHANGE
  ======================================================== */

  const handleFileChange =
    (field, maxSizeMB) => (event) => {
      const file = event.target.files?.[0] || null;

      if (!file) {
        setForm((previous) => ({
          ...previous,
          [field]: null,
        }));

        return;
      }

      const allowedTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ];

      const allowedExtensions =
        /\.(pdf|doc|docx)$/i.test(file.name);

      if (
        !allowedTypes.includes(file.type) &&
        !allowedExtensions
      ) {
        setErrors((previous) => ({
          ...previous,
          [field]:
            "Only PDF, DOC and DOCX files are allowed.",
        }));

        event.target.value = "";
        return;
      }

      const maxBytes =
        maxSizeMB * 1024 * 1024;

      if (file.size > maxBytes) {
        setErrors((previous) => ({
          ...previous,
          [field]: `Maximum file size is ${maxSizeMB}MB.`,
        }));

        event.target.value = "";
        return;
      }

      setForm((previous) => ({
        ...previous,
        [field]: file,
      }));

      setErrors((previous) => ({
        ...previous,
        [field]: undefined,
      }));
    };

  /* =======================================================
     VALIDATION
  ======================================================== */

  const validate = () => {
    const newErrors = {};

    const requiredFields = [
      "fullName",
      "email",
      "affiliation",
      "country",

      "corrFullName",
      "corrEmail",

      "paperTitle",
      "researchArea",
      "abstract",
      "keywords",
      "presentationType",
      "paperFile",
    ];

    requiredFields.forEach((field) => {
      const value = form[field];

      if (
        value === null ||
        value === undefined ||
        (typeof value === "string" &&
          !value.trim())
      ) {
        newErrors[field] =
          "This field is required.";
      }
    });

    const emailPattern =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (
      form.email &&
      !emailPattern.test(form.email)
    ) {
      newErrors.email =
        "Please enter a valid email address.";
    }

    if (
      form.corrEmail &&
      !emailPattern.test(form.corrEmail)
    ) {
      newErrors.corrEmail =
        "Please enter a valid email address.";
    }

    if (abstractWordCount > 300) {
      newErrors.abstract =
        "Abstract must not exceed 300 words.";
    }

    if (!form.agree) {
      newErrors.agree =
        "You must agree to the Submission Guidelines and Terms & Conditions.";
    }

    return newErrors;
  };

  /* =======================================================
     SAVE DRAFT
  ======================================================== */

  const handleSaveDraft = () => {
    try {
      const {
        paperFile,
        coverLetterFile,
        ...draftData
      } = form;

      localStorage.setItem(
        DRAFT_KEY,
        JSON.stringify(draftData)
      );

      setDraftSaved(true);

      window.setTimeout(() => {
        setDraftSaved(false);
      }, 3500);
    } catch (error) {
      console.error("Unable to save draft:", error);
    }
  };

  /* =======================================================
     SUBMIT
  ======================================================== */

  const handleSubmit = (event) => {
    event.preventDefault();

    const newErrors = validate();

    setErrors(newErrors);

    if (Object.keys(newErrors).length) {
      const firstInvalid =
        document.querySelector(
          '[aria-invalid="true"]'
        );

      firstInvalid?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });

      return;
    }

    /*
      ================================================
      CONNECT YOUR BACKEND API HERE.

      Example:

      const formData = new FormData();

      Object.entries(form).forEach(([key, value]) => {
        formData.append(key, value);
      });

      await fetch("/api/submissions", {
        method: "POST",
        body: formData,
      });

      ================================================
    */

    localStorage.removeItem(DRAFT_KEY);

    setSubmitted(true);
    setDraftSaved(false);
    setErrors({});
    setForm(initialForm);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const cleanPhone =
    siteInfo?.phone?.replace(
      /[^+\d]/g,
      ""
    ) || "";

  return (
    <>
      {/* =====================================================
          EXACT WIDTH SYSTEM
      ====================================================== */}

      <style>{`
        .submit-paper-container {
          width: 100%;
          max-width: 1180px;
          margin-left: auto;
          margin-right: auto;
          padding-left: 32px;
          padding-right: 32px;
          box-sizing: border-box;
          min-width: 0;
        }

        @media (max-width: 640px) {
          .submit-paper-container {
            padding-left: 20px;
            padding-right: 20px;
          }
        }

        @media (max-width: 390px) {
          .submit-paper-container {
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
          bg-[#052a0b]

          pt-[72px]
        "
      >
        {/* Background */}

        <motion.div
          initial={{
            scale: 1.04,
            opacity: 0.96,
          }}
          animate={{
            scale: 1,
            opacity: 1,
          }}
          transition={{
            duration: 1.7,
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
            duration-[1400ms]

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

        {/* Overlay */}

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            inset-0
            -z-20

            bg-[linear-gradient(90deg,rgba(3,36,9,0.98)_0%,rgba(4,42,10,0.91)_31%,rgba(4,42,10,0.59)_50%,rgba(4,42,10,0.16)_69%,rgba(4,42,10,0)_100%)]

            max-[640px]:bg-[linear-gradient(90deg,rgba(3,33,8,0.98)_0%,rgba(4,39,9,0.92)_48%,rgba(4,39,9,0.72)_76%,rgba(4,39,9,0.51)_100%)]
          "
        />

        <div className="submit-paper-container">
          <div
            className="
              relative
              z-10

              flex
              min-h-[215px]
              w-full
              min-w-0

              items-center

              py-[27px]

              sm:min-h-[220px]
              sm:py-[30px]

              max-[480px]:min-h-[235px]
            "
          >
            <motion.div
              initial={{
                opacity: 0,
                x: -24,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                duration: 0.7,
                ease,
              }}
              className="
                w-full
                min-w-0
                max-w-[525px]
              "
            >
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
                  duration: 0.45,
                  delay: 0.1,
                }}
                className="
                  flex
                  min-w-0
                  flex-wrap
                  items-center

                  gap-[7px]

                  text-[9px]
                  font-medium

                  text-white/90

                  sm:text-[9.5px]
                "
              >
                <Link
                  to="/"
                  className="
                    transition-colors
                    hover:text-[#d1dc74]
                  "
                >
                  Home
                </Link>

                <ChevronRight
                  className="
                    h-[10px]
                    w-[10px]

                    text-[#b9cc63]
                  "
                />

                <Link
                  to="/submission"
                  className="
                    transition-colors
                    hover:text-[#d1dc74]
                  "
                >
                  Submission
                </Link>

                <ChevronRight
                  className="
                    h-[10px]
                    w-[10px]

                    text-[#b9cc63]
                  "
                />

                <span className="text-[#d2dd78]">
                  Submit Paper
                </span>
              </motion.div>

              {/* Title */}

              <motion.h1
                initial={{
                  opacity: 0,
                  y: 10,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.55,
                  delay: 0.16,
                  ease,
                }}
                className="
                  mt-[12px]

                  text-[29px]
                  font-semibold
                  leading-[1.05]

                  tracking-[-0.55px]

                  text-white

                  sm:text-[34px]

                  md:text-[37px]

                  lg:text-[39px]

                  max-[360px]:text-[27px]
                "
              >
                Submit Paper
                <span
                  className="
                    ml-[9px]
                    align-middle

                    text-[14px]
                    text-[#c5a842]

                    sm:text-[16px]
                  "
                >
                  ~
                </span>
              </motion.h1>

              {/* Description */}

              <motion.p
                initial={{
                  opacity: 0,
                  y: 8,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.5,
                  delay: 0.23,
                }}
                className="
                  mt-[14px]
                  max-w-[435px]

                  text-[10px]
                  font-medium
                  leading-[1.6]

                  text-white/90

                  sm:text-[10.5px]

                  md:text-[11px]
                "
              >
                Share your original research and contribute
                to advancing entomological science at
                ICEBIS 2027.
              </motion.p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* =========================================================
          SUCCESS MESSAGE
      ========================================================== */}

      {submitted && (
        <section className="bg-[#f9faf7] pt-5">
          <div className="submit-paper-container">
            <motion.div
              initial={{
                opacity: 0,
                y: -10,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              className="
                flex
                items-start
                gap-[10px]

                rounded-[7px]

                border
                border-[#76a65e]/35

                bg-[#ebf4e6]

                px-4
                py-3

                text-[10.5px]
                font-medium
                leading-[1.5]

                text-[#266028]
              "
            >
              <CheckCircle2
                className="
                  mt-[1px]
                  h-[16px]
                  w-[16px]
                  shrink-0
                "
              />

              Your paper has been submitted successfully.
              You will receive a confirmation email shortly.
            </motion.div>
          </div>
        </section>
      )}

      {/* =========================================================
          02. FORM + SIDEBAR
      ========================================================== */}

      <section
        className="
          w-full
          overflow-hidden

          bg-[#f9faf7]

          py-[18px]

          sm:py-[22px]
          lg:py-[25px]
        "
      >
        <div className="submit-paper-container">
          <div
            className="
              grid
              min-w-0
              grid-cols-1

              gap-[14px]

              min-[960px]:grid-cols-[minmax(0,1.8fr)_minmax(285px,0.92fr)]

              lg:gap-[17px]
            "
          >
            {/* =================================================
                LEFT FORM
            ================================================== */}

            <motion.form
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
                duration: 0.6,
                ease,
              }}
              noValidate
              onSubmit={handleSubmit}
              className="
                min-w-0

                rounded-[8px]

                border
                border-[#e5e9df]

                bg-[#fffdf9]

                px-[15px]
                py-[14px]

                shadow-[0_3px_13px_rgba(34,66,29,0.045)]

                sm:px-[19px]
                sm:py-[17px]

                md:px-[22px]
              "
            >
              {/* =================================================
                  AUTHOR INFORMATION
              ================================================== */}

              <FormSection
                icon={User}
                title="Author Information"
              >
                <div
                  className="
                    grid
                    min-w-0
                    grid-cols-1

                    gap-x-[13px]
                    gap-y-[10px]

                    sm:grid-cols-2
                  "
                >
                  <FormField
                    id="fullName"
                    label="Full Name"
                    required
                    error={errors.fullName}
                  >
                    <input
                      id="fullName"
                      type="text"
                      value={form.fullName}
                      onChange={setField("fullName")}
                      placeholder="Enter full name"
                      aria-invalid={!!errors.fullName}
                      className={inputClasses(
                        !!errors.fullName
                      )}
                    />
                  </FormField>

                  <FormField
                    id="email"
                    label="Email Address"
                    required
                    error={errors.email}
                  >
                    <input
                      id="email"
                      type="email"
                      value={form.email}
                      onChange={setField("email")}
                      placeholder="Enter email address"
                      aria-invalid={!!errors.email}
                      className={inputClasses(
                        !!errors.email
                      )}
                    />
                  </FormField>

                  <FormField
                    id="affiliation"
                    label="Affiliation / Institution"
                    required
                    error={errors.affiliation}
                  >
                    <input
                      id="affiliation"
                      type="text"
                      value={form.affiliation}
                      onChange={setField(
                        "affiliation"
                      )}
                      placeholder="Enter your institution"
                      aria-invalid={
                        !!errors.affiliation
                      }
                      className={inputClasses(
                        !!errors.affiliation
                      )}
                    />
                  </FormField>

                  <FormField
                    id="country"
                    label="Country"
                    required
                    error={errors.country}
                  >
                    <select
                      id="country"
                      value={form.country}
                      onChange={setField("country")}
                      aria-invalid={
                        !!errors.country
                      }
                      className={inputClasses(
                        !!errors.country
                      )}
                    >
                      <option value="">
                        Select your country
                      </option>

                      <option>
                        United States
                      </option>
                      <option>
                        United Kingdom
                      </option>
                      <option>India</option>
                      <option>Canada</option>
                      <option>Australia</option>
                      <option>Germany</option>
                      <option>Japan</option>
                      <option>Other</option>
                    </select>
                  </FormField>
                </div>
              </FormSection>

              {/* =================================================
                  CORRESPONDING AUTHOR
              ================================================== */}

              <FormSection
                icon={UserCheck}
                title="Corresponding Author Details"
              >
                <div
                  className="
                    grid
                    min-w-0
                    grid-cols-1

                    gap-x-[13px]
                    gap-y-[10px]

                    sm:grid-cols-2
                  "
                >
                  <FormField
                    id="corrFullName"
                    label="Full Name"
                    required
                    error={errors.corrFullName}
                  >
                    <input
                      id="corrFullName"
                      value={form.corrFullName}
                      onChange={setField(
                        "corrFullName"
                      )}
                      placeholder="Enter full name"
                      aria-invalid={
                        !!errors.corrFullName
                      }
                      className={inputClasses(
                        !!errors.corrFullName
                      )}
                    />
                  </FormField>

                  <FormField
                    id="corrEmail"
                    label="Email Address"
                    required
                    error={errors.corrEmail}
                  >
                    <input
                      id="corrEmail"
                      type="email"
                      value={form.corrEmail}
                      onChange={setField(
                        "corrEmail"
                      )}
                      placeholder="Enter email address"
                      aria-invalid={
                        !!errors.corrEmail
                      }
                      className={inputClasses(
                        !!errors.corrEmail
                      )}
                    />
                  </FormField>

                  <FormField
                    id="corrPhone"
                    label="Phone Number"
                  >
                    <input
                      id="corrPhone"
                      type="tel"
                      value={form.corrPhone}
                      onChange={setField(
                        "corrPhone"
                      )}
                      placeholder="Enter phone number"
                      className={inputClasses()}
                    />
                  </FormField>

                  <FormField
                    id="corrAddress"
                    label="Address"
                  >
                    <input
                      id="corrAddress"
                      value={form.corrAddress}
                      onChange={setField(
                        "corrAddress"
                      )}
                      placeholder="Enter your institutional address"
                      className={inputClasses()}
                    />
                  </FormField>
                </div>
              </FormSection>

              {/* =================================================
                  PAPER INFORMATION
              ================================================== */}

              <FormSection
                icon={FileText}
                title="Paper Information"
              >
                <div
                  className="
                    grid
                    min-w-0
                    grid-cols-1

                    gap-x-[13px]
                    gap-y-[10px]

                    sm:grid-cols-2
                  "
                >
                  <FormField
                    id="paperTitle"
                    label="Paper Title"
                    required
                    error={errors.paperTitle}
                  >
                    <input
                      id="paperTitle"
                      value={form.paperTitle}
                      onChange={setField(
                        "paperTitle"
                      )}
                      placeholder="Enter your paper title"
                      aria-invalid={
                        !!errors.paperTitle
                      }
                      className={inputClasses(
                        !!errors.paperTitle
                      )}
                    />
                  </FormField>

                  <FormField
                    id="researchArea"
                    label="Research Area / Track"
                    required
                    error={errors.researchArea}
                  >
                    <select
                      id="researchArea"
                      value={form.researchArea}
                      onChange={setField(
                        "researchArea"
                      )}
                      aria-invalid={
                        !!errors.researchArea
                      }
                      className={inputClasses(
                        !!errors.researchArea
                      )}
                    >
                      <option value="">
                        Select research area
                      </option>

                      {researchAreas.map(
                        (area) => (
                          <option
                            key={area}
                            value={area}
                          >
                            {area}
                          </option>
                        )
                      )}
                    </select>
                  </FormField>

                  <div className="sm:col-span-2">
                    <FormField
                      id="abstract"
                      label="Abstract"
                      required
                      error={errors.abstract}
                    >
                      <textarea
                        id="abstract"
                        rows={4}
                        value={form.abstract}
                        onChange={setField(
                          "abstract"
                        )}
                        placeholder="Enter abstract (Max 300 words)"
                        aria-invalid={
                          !!errors.abstract
                        }
                        className={`${inputClasses(
                          !!errors.abstract
                        )} min-h-[85px] resize-y py-[8px]`}
                      />

                      <p
                        className={`
                          mt-[4px]
                          text-right
                          text-[7.5px]
                          font-medium

                          ${
                            abstractWordCount >
                            300
                              ? "text-red-500"
                              : "text-[#7a8278]"
                          }
                        `}
                      >
                        {abstractWordCount}/300
                        words
                      </p>
                    </FormField>
                  </div>

                  <FormField
                    id="keywords"
                    label="Keywords (comma separated)"
                    required
                    error={errors.keywords}
                  >
                    <input
                      id="keywords"
                      value={form.keywords}
                      onChange={setField(
                        "keywords"
                      )}
                      placeholder="e.g., biodiversity, pollinators"
                      aria-invalid={
                        !!errors.keywords
                      }
                      className={inputClasses(
                        !!errors.keywords
                      )}
                    />
                  </FormField>

                  <FormField
                    id="presentationType"
                    label="Presentation Type"
                    required
                    error={
                      errors.presentationType
                    }
                  >
                    <select
                      id="presentationType"
                      value={
                        form.presentationType
                      }
                      onChange={setField(
                        "presentationType"
                      )}
                      aria-invalid={
                        !!errors.presentationType
                      }
                      className={inputClasses(
                        !!errors.presentationType
                      )}
                    >
                      <option value="">
                        Select presentation type
                      </option>

                      {presentationTypes.map(
                        (type) => (
                          <option
                            key={type}
                            value={type}
                          >
                            {type}
                          </option>
                        )
                      )}
                    </select>
                  </FormField>
                </div>
              </FormSection>

              {/* =================================================
                  UPLOAD
              ================================================== */}

              <FormSection
                icon={UploadCloud}
                title="Upload Manuscript"
              >
                <div
                  className="
                    grid
                    grid-cols-1
                    gap-[10px]

                    sm:grid-cols-2
                  "
                >
                  <FileUpload
                    id="paperFile"
                    label="Upload Paper"
                    required
                    file={form.paperFile}
                    error={errors.paperFile}
                    description="PDF, DOC, DOCX"
                    maxText="Max file size: 10MB"
                    onChange={handleFileChange(
                      "paperFile",
                      10
                    )}
                  />

                  <FileUpload
                    id="coverLetterFile"
                    label="Upload Cover Letter (Optional)"
                    file={
                      form.coverLetterFile
                    }
                    error={
                      errors.coverLetterFile
                    }
                    description="PDF, DOC, DOCX"
                    maxText="Max file size: 5MB"
                    onChange={handleFileChange(
                      "coverLetterFile",
                      5
                    )}
                  />
                </div>
              </FormSection>

              {/* =================================================
                  NOTES
              ================================================== */}

              <FormSection
                icon={MessageSquare}
                title="Additional Notes"
                last
              >
                <FormField
                  id="notes"
                  label="Message to Organizers (Optional)"
                >
                  <textarea
                    id="notes"
                    rows={3}
                    value={form.notes}
                    onChange={setField("notes")}
                    placeholder="Write any additional information for the organizers..."
                    className={`${inputClasses()} min-h-[64px] resize-y py-[8px]`}
                  />
                </FormField>
              </FormSection>

              {/* Agreement */}

              <div
                className="
                  mt-[12px]
                  border-t
                  border-[#e6e9e1]
                  pt-[11px]
                "
              >
                <label
                  className="
                    flex
                    cursor-pointer
                    items-start
                    gap-[7px]

                    text-[8px]
                    font-medium
                    leading-[1.5]

                    text-[#40483e]

                    sm:text-[8.5px]
                  "
                >
                  <input
                    type="checkbox"
                    checked={form.agree}
                    onChange={setField(
                      "agree"
                    )}
                    aria-invalid={
                      !!errors.agree
                    }
                    className="
                      mt-[1px]
                      h-[12px]
                      w-[12px]

                      shrink-0
                      cursor-pointer

                      accent-[#245f28]
                    "
                  />

                  <span>
                    I have read and agree to the{" "}
                    <Link
                      to="/submission"
                      className="
                        font-semibold
                        text-[#347330]
                        underline
                        underline-offset-2

                        hover:text-[#174c1b]
                      "
                    >
                      Submission Guidelines
                    </Link>{" "}
                    and{" "}
                    <Link
                      to="/terms"
                      className="
                        font-semibold
                        text-[#347330]
                        underline
                        underline-offset-2

                        hover:text-[#174c1b]
                      "
                    >
                      Terms &amp; Conditions
                    </Link>
                    .{" "}
                    <span className="text-red-500">
                      *
                    </span>
                  </span>
                </label>

                <FieldError
                  message={errors.agree}
                />
              </div>

              {/* Buttons */}

              <div
                className="
                  mt-[13px]

                  flex
                  min-w-0

                  flex-col

                  gap-[8px]

                  sm:flex-row
                  sm:items-center
                  sm:justify-between
                "
              >
                <motion.button
                  type="submit"
                  whileHover={{
                    y: -2,
                  }}
                  whileTap={{
                    scale: 0.98,
                  }}
                  className="
                    group/button
                    relative

                    inline-flex
                    min-h-[31px]

                    items-center
                    justify-center

                    gap-[7px]

                    overflow-hidden

                    rounded-[4px]

                    border
                    border-[#174d1a]

                    bg-[linear-gradient(180deg,#1e6421_0%,#124c17_100%)]

                    px-[16px]
                    py-[6px]

                    text-[8.5px]
                    font-semibold

                    text-white

                    shadow-[0_3px_8px_rgba(9,52,14,0.16)]

                    transition-all
                    duration-300

                    hover:border-[#347b35]

                    hover:bg-[linear-gradient(180deg,#2a772d_0%,#1a5e20_100%)]

                    hover:shadow-[0_6px_13px_rgba(9,52,14,0.22)]

                    sm:min-w-[124px]
                  "
                >
                  <span
                    aria-hidden="true"
                    className="
                      pointer-events-none
                      absolute
                      inset-y-0
                      -left-[35%]

                      w-[25%]

                      -skew-x-[20deg]

                      bg-white/10

                      transition-all
                      duration-700

                      group-hover/button:left-[120%]
                    "
                  />

                  <Send
                    className="
                      relative
                      z-10
                      h-[11px]
                      w-[11px]
                    "
                  />

                  <span className="relative z-10">
                    Submit Paper
                  </span>
                </motion.button>

                <button
                  type="button"
                  onClick={handleSaveDraft}
                  className="
                    group/draft

                    inline-flex
                    min-h-[31px]

                    items-center
                    justify-center

                    gap-[6px]

                    rounded-[4px]

                    border
                    border-[#9ca994]

                    bg-white

                    px-[13px]
                    py-[6px]

                    text-[8px]
                    font-semibold

                    text-[#344237]

                    transition-all
                    duration-300

                    hover:-translate-y-[1px]

                    hover:border-[#65835c]

                    hover:bg-[#f3f7ef]

                    hover:text-[#235826]
                  "
                >
                  <Save
                    className="
                      h-[11px]
                      w-[11px]

                      transition-transform
                      duration-300

                      group-hover/draft:scale-110
                    "
                  />

                  Save as Draft
                </button>
              </div>

              {draftSaved && (
                <motion.p
                  initial={{
                    opacity: 0,
                    y: 4,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  className="
                    mt-[8px]

                    flex
                    items-center
                    gap-[5px]

                    text-[8px]
                    font-semibold

                    text-[#347331]
                  "
                >
                  <CheckCircle2 className="h-[11px] w-[11px]" />

                  Draft saved successfully.
                </motion.p>
              )}

              <p
                className="
                  mt-[9px]

                  text-[7.5px]
                  font-medium

                  text-[#7b8178]
                "
              >
                All fields marked with * are
                required.
              </p>
            </motion.form>

            {/* =================================================
                RIGHT SIDEBAR
            ================================================== */}

            <aside
              className="
                flex
                min-w-0
                flex-col

                gap-[10px]
              "
            >
              {/* Submission Guidelines */}

              <SidebarCard
                icon={ShieldCheck}
                title="Submission Guidelines"
                delay={0.05}
              >
                <ul
                  className="
                    mt-[10px]

                    flex
                    flex-col

                    gap-[6px]
                  "
                >
                  {submitPaperGuidelines.map(
                    (guideline) => (
                      <li
                        key={guideline}
                        className="
                          flex
                          min-w-0
                          items-start

                          gap-[6px]

                          text-[7.5px]
                          font-medium
                          leading-[1.45]

                          text-[#424b42]

                          sm:text-[8px]
                        "
                      >
                        <Check
                          strokeWidth={2}
                          className="
                            mt-[1px]
                            h-[9px]
                            w-[9px]

                            shrink-0

                            text-[#357532]
                          "
                        />

                        <span>
                          {guideline}
                        </span>
                      </li>
                    )
                  )}
                </ul>

                <a
                  href="/downloads/submission-guidelines.pdf"
                  download
                  className="
                    group/download

                    mt-[10px]

                    inline-flex
                    min-h-[25px]

                    items-center
                    justify-center

                    gap-[5px]

                    rounded-[4px]

                    border
                    border-[#9cad93]

                    bg-white

                    px-[9px]
                    py-[5px]

                    text-[7px]
                    font-semibold

                    text-[#37533a]

                    transition-all
                    duration-300

                    hover:-translate-y-[1px]

                    hover:border-[#66895d]

                    hover:bg-[#eef4e9]
                  "
                >
                  <Download className="h-[9px] w-[9px]" />

                  Download Guidelines
                </a>
              </SidebarCard>

              {/* Important Dates */}

              <SidebarCard
                icon={CalendarDays}
                title="Important Dates"
                delay={0.1}
              >
                <ul
                  className="
                    mt-[10px]

                    flex
                    flex-col

                    gap-[7px]
                  "
                >
                  {importantDates.map((date) => (
                    <li
                      key={`${date.label}-${date.date}`}
                      className="
                        flex
                        min-w-0
                        items-start
                        justify-between

                        gap-[8px]

                        text-[7.5px]

                        sm:text-[8px]
                      "
                    >
                      <span
                        className="
                          min-w-0
                          font-medium

                          text-[#5a6359]
                        "
                      >
                        {date.label}
                      </span>

                      <span
                        className="
                          shrink-0
                          text-right

                          font-semibold

                          text-[#27342a]
                        "
                      >
                        {date.date}
                      </span>
                    </li>
                  ))}
                </ul>

                <Link
                  to="/call-for-papers"
                  className="
                    group/date

                    mt-[10px]

                    inline-flex
                    items-center

                    gap-[5px]

                    text-[7.5px]
                    font-semibold

                    text-[#316d2e]

                    transition-colors

                    hover:text-[#174b1a]
                  "
                >
                  View All Important Dates

                  <ArrowRight
                    className="
                      h-[9px]
                      w-[9px]

                      transition-transform
                      duration-300

                      group-hover/date:translate-x-[2px]
                    "
                  />
                </Link>
              </SidebarCard>

              {/* Accepted files */}

              <SidebarCard
                icon={FileType2}
                title="Accepted File Formats"
                delay={0.15}
              >
                <ul
                  className="
                    mt-[10px]

                    flex
                    flex-col

                    gap-[6px]
                  "
                >
                  {acceptedFileFormats.map(
                    (format) => (
                      <li
                        key={format}
                        className="
                          flex
                          items-start
                          gap-[6px]

                          text-[7.5px]
                          font-medium

                          text-[#444d44]

                          sm:text-[8px]
                        "
                      >
                        <span
                          className="
                            mt-[4px]
                            h-[3px]
                            w-[3px]

                            shrink-0

                            rounded-full

                            bg-[#4c8542]
                          "
                        />

                        {format}
                      </li>
                    )
                  )}
                </ul>

                <p
                  className="
                    mt-[8px]

                    text-[7px]
                    font-medium

                    text-[#788077]
                  "
                >
                  Max file size: 10MB per file
                </p>
              </SidebarCard>

              {/* Need Help */}

              <motion.div
                initial={{
                  opacity: 0,
                  y: 14,
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
                  ease,
                }}
                whileHover={{
                  y: -2,
                }}
                className="
                  rounded-[7px]

                  border
                  border-[#dce4d7]

                  bg-[#f7f8f2]

                  p-[12px]

                  shadow-[0_3px_10px_rgba(20,55,21,0.04)]

                  transition-all
                  duration-300

                  hover:border-[#c8d7c2]

                  hover:shadow-[0_7px_17px_rgba(20,55,21,0.09)]
                "
              >
                <div
                  className="
                    flex
                    items-center
                    gap-[7px]
                  "
                >
                  <Headphones
                    className="
                      h-[15px]
                      w-[15px]

                      text-[#326d31]
                    "
                  />

                  <h3
                    className="
                      text-[10px]
                      font-semibold

                      text-[#1b311d]
                    "
                  >
                    Need Help?
                  </h3>
                </div>

                <p
                  className="
                    mt-[7px]

                    text-[7.5px]
                    font-medium
                    leading-[1.45]

                    text-[#505a50]
                  "
                >
                  If you face any issues during
                  submission, please reach out to
                  our support team.
                </p>

                <a
                  href="mailto:submissions@entomologyscience.org"
                  className="
                    mt-[8px]

                    flex
                    min-w-0
                    items-start
                    gap-[5px]

                    text-[7px]
                    font-medium

                    text-[#325f33]

                    hover:text-[#174a1a]
                  "
                >
                  <Mail
                    className="
                      mt-[1px]
                      h-[9px]
                      w-[9px]

                      shrink-0
                    "
                  />

                  <span className="break-all">
                    submissions@entomologyscience.org
                  </span>
                </a>

                {siteInfo?.phone && (
                  <a
                    href={
                      cleanPhone
                        ? `tel:${cleanPhone}`
                        : undefined
                    }
                    className="
                      mt-[5px]

                      flex
                      items-center
                      gap-[5px]

                      text-[7px]
                      font-medium

                      text-[#325f33]

                      hover:text-[#174a1a]
                    "
                  >
                    <Phone className="h-[9px] w-[9px]" />

                    {siteInfo.phone}
                  </a>
                )}

                <Link
                  to="/contact"
                  className="
                    group/support

                    mt-[9px]

                    inline-flex
                    min-h-[25px]

                    items-center
                    justify-center

                    gap-[5px]

                    rounded-[4px]

                    bg-[#164e19]

                    px-[9px]
                    py-[5px]

                    text-[7px]
                    font-semibold

                    text-white

                    transition-all
                    duration-300

                    hover:-translate-y-[1px]

                    hover:bg-[#216426]
                  "
                >
                  Contact Support

                  <ArrowRight
                    className="
                      h-[9px]
                      w-[9px]

                      transition-transform
                      duration-300

                      group-hover/support:translate-x-[2px]
                    "
                  />
                </Link>
              </motion.div>

              {/* Publication */}

              <SidebarCard
                icon={BookOpen}
                title="Publication Opportunity"
                delay={0.25}
              >
                <p
                  className="
                    mt-[8px]

                    text-[7.5px]
                    font-medium
                    leading-[1.45]

                    text-[#505950]
                  "
                >
                  Selected high-quality papers will
                  be published in Scopus indexed
                  journals.
                </p>

                <div
                  className="
                    mt-[9px]

                    flex
                    min-w-0
                    items-center

                    gap-[8px]

                    rounded-[5px]

                    border
                    border-[#e1e6dc]

                    bg-white

                    p-[7px]
                  "
                >
                  <img
                    src="/images/journal-cover.jpg"
                    alt="Journal of Entomological Research cover"
                    loading="lazy"
                    className="
                      h-[54px]
                      w-[39px]

                      shrink-0

                      rounded-[2px]

                      object-cover

                      shadow-[0_2px_5px_rgba(0,0,0,0.12)]
                    "
                  />

                  <div className="min-w-0">
                    <p
                      className="
                        text-[7.5px]
                        font-semibold
                        leading-[1.25]

                        text-[#243327]
                      "
                    >
                      {mainJournal?.title ||
                        "Journal of Entomological Research"}
                    </p>

                    <span
                      className="
                        mt-[4px]

                        inline-block

                        rounded-[3px]

                        bg-[#e9f1df]

                        px-[5px]
                        py-[2px]

                        text-[6px]
                        font-semibold

                        text-[#397232]
                      "
                    >
                      Scopus Indexed
                    </span>

                    <Link
                      to="/publication"
                      className="
                        group/journal

                        mt-[4px]

                        flex
                        items-center

                        gap-[3px]

                        text-[6.5px]
                        font-semibold

                        text-[#347131]

                        hover:text-[#17491b]
                      "
                    >
                      Learn more

                      <ArrowRight
                        className="
                          h-[7px]
                          w-[7px]

                          transition-transform
                          duration-300

                          group-hover/journal:translate-x-[2px]
                        "
                      />
                    </Link>
                  </div>
                </div>
              </SidebarCard>
            </aside>
          </div>

          {/* =====================================================
              03. SUBMISSION PROCESS
          ====================================================== */}

          <motion.section
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
              amount: 0.15,
            }}
            transition={{
              duration: 0.6,
              ease,
            }}
            className="
              mt-[18px]

              rounded-[8px]

              border
              border-[#e6e9e0]

              bg-[#fffdf9]

              px-[14px]
              py-[14px]

              sm:px-[18px]
            "
          >
            <CenterTitle>
              Submission Process
            </CenterTitle>

            <div
              className="
                mt-[14px]

                grid
                min-w-0
                grid-cols-1

                gap-[12px]

                min-[420px]:grid-cols-2

                sm:grid-cols-3

                min-[950px]:grid-cols-5
              "
            >
              {submitPaperProcess.map(
                (step, index) => (
                  <motion.div
                    key={step.title}
                    initial={{
                      opacity: 0,
                      y: 12,
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
                      delay: index * 0.05,
                    }}
                    whileHover={{
                      y: -3,
                    }}
                    className="
                      group
                      relative

                      flex
                      min-w-0
                      flex-col
                      items-center

                      px-[6px]

                      text-center
                    "
                  >
                    <div
                      className="
                        flex
                        h-[42px]
                        w-[42px]

                        items-center
                        justify-center

                        rounded-full

                        bg-[#245b24]

                        text-white

                        shadow-[0_3px_9px_rgba(13,62,17,0.16)]

                        transition-all
                        duration-300

                        group-hover:scale-110

                        group-hover:bg-[#337632]
                      "
                    >
                      <Icon
                        name={step.icon}
                        className="
                          h-[18px]
                          w-[18px]
                        "
                      />
                    </div>

                    <p
                      className="
                        mt-[7px]

                        text-[8px]
                        font-semibold

                        text-[#273428]
                      "
                    >
                      {index + 1}.{" "}
                      {step.title}
                    </p>

                    <p
                      className="
                        mt-[4px]

                        max-w-[130px]

                        text-[6.5px]
                        font-medium
                        leading-[1.4]

                        text-[#677066]
                      "
                    >
                      {step.description}
                    </p>
                  </motion.div>
                )
              )}
            </div>
          </motion.section>

          {/* =====================================================
              04. CONFERENCE TRACKS
          ====================================================== */}

          <motion.section
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
              amount: 0.12,
            }}
            transition={{
              duration: 0.6,
              ease,
            }}
            className="mt-[16px]"
          >
            <CenterTitle>
              Conference Tracks
            </CenterTitle>

            <div
              className="
                mt-[13px]

                grid
                min-w-0

                grid-cols-2

                gap-[8px]

                min-[470px]:grid-cols-3

                min-[850px]:grid-cols-6
              "
            >
              {conferenceTracks.map(
                (track, index) => (
                  <motion.div
                    key={track.label}
                    initial={{
                      opacity: 0,
                      y: 12,
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
                      delay: index * 0.045,
                    }}
                    whileHover={{
                      y: -4,
                    }}
                    className="
                      group

                      flex
                      min-h-[93px]
                      min-w-0
                      flex-col

                      items-center
                      justify-center

                      rounded-[6px]

                      border
                      border-[#e4e8df]

                      bg-[#fffdf9]

                      px-[7px]
                      py-[10px]

                      text-center

                      shadow-[0_2px_7px_rgba(24,60,24,0.03)]

                      transition-all
                      duration-300

                      hover:border-[#cbd9c5]

                      hover:bg-[#f8faf5]

                      hover:shadow-[0_7px_15px_rgba(24,60,24,0.08)]
                    "
                  >
                    <Icon
                      name={track.icon}
                      className="
                        h-[24px]
                        w-[24px]

                        text-[#315f31]

                        transition-transform
                        duration-300

                        group-hover:scale-110
                      "
                    />

                    <p
                      className="
                        mt-[7px]

                        text-[7.5px]
                        font-semibold
                        leading-[1.3]

                        text-[#263427]

                        sm:text-[8px]
                      "
                    >
                      {track.label}
                    </p>
                  </motion.div>
                )
              )}
            </div>
          </motion.section>
        </div>
      </section>

      {/* =========================================================
          05. BOTTOM CTA
      ========================================================== */}

      <section
        className="
          w-full
          overflow-hidden

          bg-[#f9faf7]

          pb-10

          sm:pb-12
          lg:pb-14
        "
      >
        <div className="submit-paper-container">
          <motion.div
            initial={{
              opacity: 0,
              y: 17,
              scale: 0.993,
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

              min-h-[105px]
              w-full

              overflow-hidden

              rounded-[7px]

              border
              border-[#dce5d6]

              bg-[#123d17]

              shadow-[0_4px_14px_rgba(20,60,22,0.07)]

              transition-all
              duration-300

              hover:shadow-[0_9px_22px_rgba(20,60,22,0.13)]

              max-[640px]:min-h-[165px]
            "
          >
            {/* CTA image */}

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

                max-[640px]:bg-[position:30%_center]
              "
               style={{
                backgroundImage: `url(${bgcta})`,
              }}
            />

            {/* Green overlay */}

            <div
              aria-hidden="true"
              className="
                pointer-events-none
                absolute
                inset-0

                bg-[linear-gradient(90deg,rgba(5,53,13,0.12)_0%,rgba(5,53,13,0.16)_29%,rgba(5,53,13,0.82)_55%,rgba(4,46,11,0.96)_100%)]

                max-[640px]:bg-[linear-gradient(90deg,rgba(4,45,10,0.82)_0%,rgba(4,45,10,0.78)_50%,rgba(4,45,10,0.86)_100%)]
              "
            />

            <div
              className="
                relative
                z-10

                flex
                min-h-[105px]
                w-full

                flex-col

                justify-center

                pl-[41%]
                pr-[5%]

                py-[14px]

                max-[640px]:min-h-[165px]

                max-[640px]:items-center

                max-[640px]:px-5

                max-[640px]:text-center
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
                  leading-[1.25]

                  text-white

                  sm:text-[15px]

                  lg:text-[16px]
                "
              >
                Ready to Share Your Research with
                the World?
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
                  delay: 0.14,
                }}
                className="
                  mt-[5px]
                  max-w-[475px]

                  text-[7.5px]
                  font-medium
                  leading-[1.45]

                  text-white/85

                  sm:text-[8px]
                "
              >
                Submit your paper today and be
                part of ICEBIS 2027. Together,
                let&apos;s advance entomological
                science for a better tomorrow.
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
                  delay: 0.19,
                }}
                className="mt-[8px]"
              >
                <button
                  type="button"
                  onClick={() =>
                    window.scrollTo({
                      top: 0,
                      behavior: "smooth",
                    })
                  }
                  className="
                    group/cta

                    inline-flex
                    min-h-[28px]

                    items-center
                    justify-center

                    gap-[6px]

                    rounded-[4px]

                    bg-[#ddb228]

                    px-[12px]
                    py-[6px]

                    text-[7.5px]
                    font-semibold

                    text-[#173719]

                    shadow-[0_3px_8px_rgba(0,0,0,0.16)]

                    transition-all
                    duration-300

                    hover:-translate-y-[2px]

                    hover:bg-[#edc443]

                    hover:shadow-[0_6px_13px_rgba(0,0,0,0.21)]
                  "
                >
                  Submit Your Paper Now

                  <Send
                    className="
                      h-[9px]
                      w-[9px]

                      transition-transform
                      duration-300

                      group-hover/cta:translate-x-[2px]
                    "
                  />
                </button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}

/* =========================================================
   INPUT CLASS
========================================================= */

function inputClasses(error = false) {
  return `
    h-[31px]
    w-full
    min-w-0

    rounded-[3px]

    border

    ${
      error
        ? "border-red-400"
        : "border-[#ccd4c8]"
    }

    bg-white

    px-[9px]

    text-[8px]
    font-medium

    text-[#2c362d]

    outline-none

    transition-all
    duration-300

    placeholder:text-[#8c938b]

    hover:border-[#a6b49f]

    focus:border-[#658d58]

    focus:ring-2
    focus:ring-[#59864f]/10

    sm:text-[8.5px]
  `;
}

/* =========================================================
   FORM SECTION
========================================================= */

function FormSection({
  icon: SectionIcon,
  title,
  children,
  last = false,
}) {
  return (
    <section
      className={`
        ${last ? "" : "border-b border-[#e7e9e2] pb-[13px] mb-[13px]"}
      `}
    >
      <div
        className="
          mb-[10px]

          flex
          items-center
          gap-[7px]
        "
      >
        <SectionIcon
          strokeWidth={1.65}
          className="
            h-[14px]
            w-[14px]

            shrink-0

            text-[#4d7251]
          "
        />

        <h2
          className="
            text-[10px]
            font-semibold
            leading-none

            text-[#253629]

            sm:text-[10.5px]
          "
        >
          {title}
        </h2>

        <span
          className="
            h-px
            flex-1

            bg-[linear-gradient(90deg,#c6a947_0%,rgba(198,169,71,0.05)_100%)]
          "
        />
      </div>

      {children}
    </section>
  );
}

/* =========================================================
   FORM FIELD
========================================================= */

function FormField({
  id,
  label,
  required = false,
  error,
  children,
}) {
  return (
    <div className="min-w-0">
      <label
        htmlFor={id}
        className="
          mb-[4px]
          block

          text-[7.5px]
          font-semibold

          text-[#3f4840]

          sm:text-[8px]
        "
      >
        {label}

        {required && (
          <span className="ml-[2px] text-red-500">
            *
          </span>
        )}
      </label>

      {children}

      <FieldError message={error} />
    </div>
  );
}

/* =========================================================
   FIELD ERROR
========================================================= */

function FieldError({ message }) {
  if (!message) return null;

  return (
    <p
      className="
        mt-[3px]

        text-[7px]
        font-medium
        leading-[1.3]

        text-red-500
      "
    >
      {message}
    </p>
  );
}

/* =========================================================
   FILE UPLOAD
========================================================= */

function FileUpload({
  id,
  label,
  required,
  file,
  error,
  description,
  maxText,
  onChange,
}) {
  return (
    <div className="min-w-0">
      <label
        htmlFor={id}
        className="
          mb-[4px]
          block

          text-center
          text-[7.5px]
          font-semibold

          text-[#3e473e]

          sm:text-[8px]
        "
      >
        {label}

        {required && (
          <span className="ml-[2px] text-red-500">
            *
          </span>
        )}
      </label>

      <label
        htmlFor={id}
        className={`
          group/upload

          flex
          min-h-[92px]
          w-full

          cursor-pointer

          flex-col
          items-center
          justify-center

          gap-[4px]

          rounded-[5px]

          border
          border-dashed

          ${
            error
              ? "border-red-400"
              : "border-[#cdd6c8]"
          }

          bg-[#fbfcf9]

          px-[10px]
          py-[10px]

          text-center

          transition-all
          duration-300

          hover:-translate-y-[1px]

          hover:border-[#69945d]

          hover:bg-[#f2f7ee]

          hover:shadow-[0_5px_12px_rgba(24,67,25,0.06)]
        `}
      >
        <UploadCloud
          className="
            h-[16px]
            w-[16px]

            text-[#668064]

            transition-all
            duration-300

            group-hover/upload:scale-110

            group-hover/upload:text-[#3c7037]
          "
        />

        <span
          className="
            max-w-full
            break-all

            text-[7px]
            font-semibold

            text-[#4b574c]
          "
        >
          {file
            ? file.name
            : "Click to upload your manuscript"}
        </span>

        <span
          className="
            text-[6px]
            font-medium

            text-[#848b83]
          "
        >
          {description}
        </span>

        <span
          className="
            text-[6px]
            font-medium

            text-[#848b83]
          "
        >
          {maxText}
        </span>

        <input
          id={id}
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={onChange}
          className="sr-only"
        />
      </label>

      <FieldError message={error} />
    </div>
  );
}

/* =========================================================
   SIDEBAR CARD
========================================================= */

function SidebarCard({
  icon: CardIcon,
  title,
  delay = 0,
  children,
}) {
  return (
    <motion.section
      initial={{
        opacity: 0,
        y: 14,
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
        delay,
        ease,
      }}
      whileHover={{
        y: -2,
      }}
      className="
        group

        min-w-0

        rounded-[7px]

        border
        border-[#dfe5da]

        bg-[#f9faf5]

        p-[12px]

        shadow-[0_3px_10px_rgba(22,58,23,0.04)]

        transition-all
        duration-300

        hover:border-[#cbd9c5]

        hover:shadow-[0_7px_17px_rgba(22,58,23,0.085)]
      "
    >
      <div
        className="
          flex
          min-w-0
          items-center

          gap-[7px]
        "
      >
        <CardIcon
          strokeWidth={1.65}
          className="
            h-[14px]
            w-[14px]

            shrink-0

            text-[#397036]

            transition-transform
            duration-300

            group-hover:scale-110
          "
        />

        <h3
          className="
            min-w-0

            text-[9.5px]
            font-semibold
            leading-[1.25]

            text-[#263628]

            sm:text-[10px]
          "
        >
          {title}
        </h3>
      </div>

      {children}
    </motion.section>
  );
}

/* =========================================================
   CENTER TITLE
========================================================= */

function CenterTitle({ children }) {
  return (
    <div
      className="
        flex
        items-center
        justify-center

        gap-[8px]
      "
    >
      <span
        className="
          hidden
          h-px
          w-[42px]

          bg-[linear-gradient(90deg,transparent,#c6a644)]

          sm:block
        "
      />

      <span
        className="
          text-[11px]

          text-[#c6a644]
        "
      >
        ~
      </span>

      <h2
        className="
          text-center

          text-[11px]
          font-semibold

          text-[#2c3c2f]

          sm:text-[12px]
        "
      >
        {children}
      </h2>

      <span
        className="
          text-[11px]
          text-[#c6a644]
        "
      >
        ~
      </span>

      <span
        className="
          hidden
          h-px
          w-[42px]

          bg-[linear-gradient(90deg,#c6a644,transparent)]

          sm:block
        "
      />
    </div>
  );
}