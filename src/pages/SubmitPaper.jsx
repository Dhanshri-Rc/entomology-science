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
  AlertCircle,
} from "lucide-react";

import Icon from "../components/Icon";
import SEO from "../components/SEO";
import api, { ApiRequestError } from "../lib/api";
import bg from "../assets/img/subpaperbg.png"
import bgcta from "../assets/img/subpapercta.png"
import cover from "../assets/img/home3.png"



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
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submittedId, setSubmittedId] = useState("");

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

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (submitting) return;

    const newErrors = validate();

    setErrors(newErrors);
    setSubmitError("");

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

    setSubmitting(true);

    try {
      const formData = new FormData();

      formData.append("fullName", form.fullName);
      formData.append("email", form.email);
      formData.append("affiliation", form.affiliation);
      formData.append("country", form.country);

      formData.append("corrFullName", form.corrFullName);
      formData.append("corrEmail", form.corrEmail);
      formData.append("corrPhone", form.corrPhone || "");
      formData.append("corrAddress", form.corrAddress || "");

      formData.append("paperTitle", form.paperTitle);
      formData.append("researchArea", form.researchArea);
      formData.append("abstract", form.abstract);
      formData.append("keywords", form.keywords);
      formData.append("presentationType", form.presentationType);

      formData.append("notes", form.notes || "");
      formData.append("agree", form.agree ? "true" : "false");

      if (form.paperFile) {
        formData.append("manuscriptFile", form.paperFile);
      }

      if (form.coverLetterFile) {
        formData.append("coverLetterFile", form.coverLetterFile);
      }

      const response = await api.postForm(
        "/submissions",
        formData
      );

      // Only clear the form and draft AFTER the backend confirms success.
      localStorage.removeItem(DRAFT_KEY);

      setSubmittedId(response?.submissionId || "");
      setSubmitted(true);
      setDraftSaved(false);
      setErrors({});
      setForm(initialForm);

      window.scrollTo({
        top: 0,
        behavior: "smooth",
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

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const cleanPhone =
    siteInfo?.phone?.replace(
      /[^+\d]/g,
      ""
    ) || "";

  return (
    <>
      <SEO
        title="Submit Your Paper | International Conference on Entomology"
        description="Submit your original research paper to ICEBIS. Complete the author, corresponding author and manuscript details to begin your submission."
        canonical="/submit-paper"
      />

      {/* =====================================================
          EXACT WIDTH SYSTEM
      ====================================================== */}

      <style>{`
        .submit-paper-container {
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

              sm:min-h-[340px]
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

                  text-[13px]
                  font-medium

                  text-white/90

                  sm:text-[13.5px]
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
                  mt-[15px]
                  max-w-[435px]

                  text-[13px]
                  font-medium
                  leading-[1.6]

                  text-white/90

                  sm:text-[13.5px]

                 
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

              Thank you. Your paper has been submitted successfully.
              {submittedId
                ? ` Your Submission ID is ${submittedId}.`
                : ""}{" "}
              You will receive a confirmation email shortly.
            </motion.div>
          </div>
        </section>
      )}

      {submitError && (
        <section className="bg-[#f9faf7] pt-5">
          <div className="submit-paper-container">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="
                flex
                items-start
                gap-[10px]

                rounded-[7px]

                border
                border-red-300

                bg-red-50

                px-4
                py-3

                text-[10.5px]
                font-medium
                leading-[1.5]

                text-red-600
              "
            >
              <AlertCircle
                className="
                  mt-[1px]
                  h-[16px]
                  w-[16px]
                  shrink-0
                "
              />
              {submitError}
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
                  mt-[10px]
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

                    text-[11px]
                    font-medium
                    leading-[1.5]

                    text-[#40483e]

                    sm:text-[11.5px]
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
                  disabled={submitting}
                  whileHover={submitting ? {} : {
                    y: -2,
                  }}
                  whileTap={submitting ? {} : {
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

                    px-[26px]
                    py-[7px]

                    text-[12.5px]
                    font-semibold

                    text-white

                    shadow-[0_3px_8px_rgba(9,52,14,0.16)]

                    transition-all
                    duration-300

                    hover:border-[#347b35]

                    hover:bg-[linear-gradient(180deg,#2a772d_0%,#1a5e20_100%)]

                    hover:shadow-[0_6px_13px_rgba(9,52,14,0.22)]

                    disabled:cursor-not-allowed
                    disabled:opacity-70

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

                  {submitting ? (
                    <span
                      className="
                        relative
                        z-10
                        h-[15px]
                        w-[15px]
                        animate-spin
                        rounded-full
                        border-2
                        border-white/40
                        border-t-white
                      "
                    />
                  ) : (
                    <Send
                      className="
                        relative
                        z-10
                        h-[16px]
                        w-[16px]
                      "
                    />
                  )}

                  <span className="relative z-10">
                    {submitting ? "Submitting..." : "Submit Paper"}
                  </span>
                </motion.button>

                <button
                  type="button"
                  disabled={submitting}
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

                    text-[11px]
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
                      h-[15px]
                      w-[15px]
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

                    text-[10px]
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

                  text-[10.5px]
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

                    gap-[8px]
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

                          sm:text-[11px]
                        "
                      >
                        <Check
                          strokeWidth={2}
                          className="
                            mt-[1px]
                            h-[11px]
                            w-[11px]

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

                    px-[11px]
                    py-[7px]

                    text-[11px]
                    font-semibold

                    text-[#37533a]

                    transition-all
                    duration-300

                    hover:-translate-y-[1px]

                    hover:border-[#66895d]

                    hover:bg-[#eef4e9]
                  "
                >
                  <Download className="h-[11px] w-[11px]" />

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

                        text-[9.5px]

                        sm:text-[11px]
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

                    text-[11.5px]
                    font-semibold

                    text-[#316d2e]

                    transition-colors

                    hover:text-[#174b1a]
                  "
                >
                  View All Important Dates

                  <ArrowRight
                    className="
                      h-[11px]
                      w-[11px]

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

                          text-[10.5px]
                          font-medium

                          text-[#444d44]

                          sm:text-[11px]
                        "
                      >
                        <span
                          className="
                            mt-[4px]
                            h-[4px]
                            w-[4px]

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

                    text-[11px]
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
                    gap-[9px]
                  "
                >
                  <Headphones
                    className="
                      h-[18px]
                      w-[18px]

                      text-[#326d31]
                    "
                  />

                  <h3
                    className="
                      text-[16px]
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

                    text-[11.5px]
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

                    text-[11px]
                    font-medium

                    text-[#325f33]

                    hover:text-[#174a1a]
                  "
                >
                  <Mail
                    className="
                      mt-[1px]
                      h-[11px]
                      w-[11px]

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

                      text-[11px]
                      font-medium

                      text-[#325f33]

                      hover:text-[#174a1a]
                    "
                  >
                    <Phone className="h-[11px] w-[11px]" />

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

                    px-[11px]
                    py-[6px]

                    text-[11px]
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
                      h-[11px]
                      w-[11px]

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

                    text-[11.5px]
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
                    src={cover}
                    alt="Journal of Entomological Research cover"
                    loading="lazy"
                    className="
                      h-[124px]
                      w-[89px]

                      shrink-0

                      rounded-[2px]

                      object-cover

                      shadow-[0_2px_5px_rgba(0,0,0,0.12)]
                    "
                  />

                  <div className="min-w-0">
                    <p
                      className="
                        text-[12.5px]
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
                        mt-[7px]

                        inline-block

                        rounded-[3px]

                        bg-[#e9f1df]

                        px-[11px]
                        py-[3px]

                        text-[11px]
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

                        text-[11.5px]
                        font-semibold

                        text-[#347131]

                        hover:text-[#17491b]
                      "
                    >
                      Learn more

                      <ArrowRight
                        className="
                          h-[11px]
                          w-[11px]

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


       {/* =========================================================
    SUBMISSION PROCESS
========================================================= */}

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
    duration: 0.65,
    ease: [0.22, 1, 0.36, 1],
  }}
  className="
    relative
    mt-[18px]
    w-full
    min-w-0

    overflow-hidden

    rounded-[8px]

    border
    border-[#e7dfcb]

    bg-[#fffdf9]

    px-[14px]
    py-[14px]

    shadow-[0_2px_10px_rgba(69,66,40,0.035)]

    sm:px-[18px]
    sm:py-[15px]

    lg:px-[22px]
    lg:py-[16px]
  "
>
  {/* =====================================================
      TITLE
  ====================================================== */}

  <motion.div
    initial={{
      opacity: 0,
      y: -6,
    }}
    whileInView={{
      opacity: 1,
      y: 0,
    }}
    viewport={{ once: true }}
    transition={{
      duration: 0.5,
      delay: 0.05,
    }}
    className="
      flex
      w-full
      items-center
      justify-center

      gap-[8px]

      sm:gap-[10px]
    "
  >
    {/* Left gold ornament */}

    <div
      aria-hidden="true"
      className="
        flex
        items-center

        gap-[3px]

        text-[#d5ad54]
      "
    >
      <span
        className="
          h-[2px]
          w-[52px]

          rounded-full

          bg-[linear-gradient(90deg,transparent,#d5ad54)]

         
        "
      />

      <span className="text-[15px] leading-none">
        ❧
      </span>
    </div>

    <h2
      className="
        whitespace-nowrap

        text-[17px]
        font-semibold
        leading-none

        tracking-[-0.18px]

        text-[#25382a]

        sm:text-[17px]

        md:text-[18px]

        lg:text-[19px]
      "
    >
      Submission Process
    </h2>

    {/* Right gold ornament */}

    <div
      aria-hidden="true"
      className="
        flex
        items-center

        gap-[3px]

        text-[#d5ad54]
      "
    >
      <span className="text-[17px] leading-none">
        ❧
      </span>

      <span
        className="
          h-[2px]
          w-[52px]

          rounded-full

          bg-[linear-gradient(90deg,#d5ad54,transparent)]

      
        "
      />
    </div>
  </motion.div>

  {/* =====================================================
      STEPS
  ====================================================== */}

  <div
    className="
      relative

      mt-[16px]

      grid
      w-full
      min-w-0

      grid-cols-1

      gap-x-[10px]
      gap-y-[18px]

      min-[430px]:grid-cols-2

      sm:grid-cols-3

      min-[900px]:grid-cols-5
      min-[900px]:gap-x-0

      lg:mt-[18px]
    "
  >
    {/* ===================================================
        DESKTOP CONNECTOR LINE

        Visible only when all 5 items are one row.
    ==================================================== */}

    <div
      aria-hidden="true"
      className="
        pointer-events-none
        absolute

        left-[10%]
        right-[10%]

        top-[25px]

        hidden

        border-t-[1.5px]
        border-dashed
        border-[#788a62]

        opacity-80

        min-[900px]:block
      "
    />

    {/* ===================================================
        ITEMS
    ==================================================== */}

    {submitPaperProcess.map((step, index) => (
      <motion.div
        key={step.title}
        initial={{
          opacity: 0,
          y: 15,
          scale: 0.98,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
          scale: 1,
        }}
        viewport={{
          once: true,
        }}
        transition={{
          duration: 0.45,
          delay: index * 0.06,
          ease: [0.22, 1, 0.36, 1],
        }}
        whileHover={{
          y: -3,
        }}
        className="
          group
          relative
          z-10

          flex
          min-w-0
          flex-col

          items-center

          px-[6px]

          text-center

          sm:px-[8px]
        "
      >
        {/* =================================================
            ICON CIRCLE
        ================================================== */}

        <motion.div
          whileHover={{
            scale: 1.08,
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 20,
          }}
          className="
            relative
            z-20

            flex
            h-[50px]
            w-[50px]

            shrink-0

            items-center
            justify-center

            rounded-full

            border
            border-[#b89b49]

            bg-[linear-gradient(145deg,#19551e_0%,#0b4213_100%)]

            text-white

            shadow-[0_3px_8px_rgba(16,65,21,0.17),inset_0_1px_0_rgba(255,255,255,0.06)]

            transition-all
            duration-300

            group-hover:border-[#d0b45f]

            group-hover:bg-[linear-gradient(145deg,#266b2b_0%,#15551b_100%)]

            group-hover:shadow-[0_6px_14px_rgba(16,65,21,0.23)]

            sm:h-[52px]
            sm:w-[52px]
          "
        >
          <Icon
            name={step.icon}
            className="
              h-[23px]
              w-[23px]

              text-white

              transition-transform
              duration-300

              group-hover:scale-110

              sm:h-[24px]
              sm:w-[24px]
            "
          />
        </motion.div>

        {/* =================================================
            STEP TITLE
        ================================================== */}

        <p
          className="
            mt-[9px]

            min-w-0

            text-[11px]
            font-semibold
            leading-[1.25]

            tracking-[-0.08px]

            text-[#263329]

            sm:text-[11.5px]

            md:text-[12px]

            lg:text-[12.5px]
          "
        >
          {index + 1}. {step.title}
        </p>

        {/* =================================================
            DESCRIPTION
        ================================================== */}

        <p
          className="
            mt-[5px]

            max-w-[155px]

            text-[9px]
            font-medium
            leading-[1.45]

            text-[#596259]

            sm:text-[10.5px]

            lg:max-w-[165px]
            lg:text-[11px]
          "
        >
          {step.description}
        </p>
      </motion.div>
    ))}
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
                      py-[19px]

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
                        h-[32px]
                        w-[32px]

                        text-[#315f31]

                        transition-transform
                        duration-300

                        group-hover:scale-110
                      "
                    />

                    <p
                      className="
                        mt-[7px]

                        text-[12.5px]
                        font-semibold
                        leading-[1.3]

                        text-[#263427]

                        sm:text-[13px]
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
    BOTTOM CTA - EXACT REFERENCE STYLE
========================================================= */}

<section
  className="
    w-full
    overflow-hidden
    bg-[#f9faf7]

    pb-10
   
  "
>
  <div className="submit-paper-container">
    <motion.div
      initial={{
        opacity: 0,
        y: 18,
        scale: 0.994,
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
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{
        y: -2,
      }}
      className="
        group
        relative
        mx-auto

        w-full
        min-w-0

        overflow-hidden

        rounded-[7px]

        border
        border-[#758a49]/40

        bg-[#0b3b1a]

        shadow-[0_4px_14px_rgba(17,54,21,0.08)]

        transition-all
        duration-300

        hover:shadow-[0_9px_22px_rgba(17,54,21,0.15)]

        min-h-[118px]

        sm:min-h-[118px]

        lg:aspect-[1516/153]
        lg:min-h-0

        max-[760px]:min-h-[150px]
        max-[640px]:min-h-[185px]
        max-[390px]:min-h-[195px]
      "
    >
      {/* =====================================================
          BACKGROUND

          Desktop:
          fills exactly like reference.

          Mobile:
          switches to cover so butterfly remains visible.
      ====================================================== */}

      <motion.img
        src={bgcta}
        alt=""
        aria-hidden="true"
        initial={{
          scale: 1.015,
        }}
        whileInView={{
          scale: 1,
        }}
        viewport={{ once: true }}
        transition={{
          duration: 1.2,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="
          pointer-events-none
          absolute
          inset-0

          h-full
          w-full

          object-fill

          transition-transform
          duration-700
          ease-out

          group-hover:scale-[1.008]

          max-[760px]:object-cover
          max-[760px]:object-[22%_center]

          max-[480px]:object-[20%_center]
        "
      />

      {/* =====================================================
          MOBILE/TABLET OVERLAY ONLY

          No overlay on desktop because your bg image
          already contains the correct green gradient.
      ====================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0

          hidden

          max-[760px]:block

          max-[760px]:bg-[linear-gradient(90deg,rgba(4,42,11,0.38)_0%,rgba(4,42,11,0.72)_38%,rgba(4,42,11,0.92)_100%)]

          max-[640px]:bg-[linear-gradient(90deg,rgba(4,42,11,0.68)_0%,rgba(4,42,11,0.82)_52%,rgba(4,42,11,0.94)_100%)]
        "
      />

      {/* =====================================================
          DESKTOP CONTENT
      ====================================================== */}

      <div
        className="
          relative
          z-10

          hidden
          h-full
          min-h-[118px]
          w-full

          grid-cols-[27.5%_46%_26.5%]

          items-center

          md:grid
        "
      >
        {/* Empty left area keeps butterfly clear */}

        <div aria-hidden="true" />

        {/* =================================================
            CENTER TEXT
        ================================================== */}

        <div
          className="
            min-w-0

            px-[10px]

            lg:px-[14px]
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
            viewport={{ once: true }}
            transition={{
              duration: 0.5,
              delay: 0.08,
            }}
            className="
              max-w-[540px]

              text-[17px]
              font-semibold
              leading-[1.2]

              tracking-[-0.2px]

              text-white

              sm:text-[18px]
              md:text-[18px]
              lg:text-[19px]
              xl:text-[20px]
            "
          >
            Ready to Share Your Research with the World?
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
              delay: 0.14,
            }}
            className="
              mt-[9px]

              max-w-[530px]

              text-[10px]
              font-medium
              leading-[1.5]

              text-white/90

              md:text-[10px]
              lg:text-[11px]
              xl:text-[11.5px]
            "
          >
            Submit your paper today and be part of ICEBIS 2027.
            Together, let&apos;s advance
            <br className="hidden lg:block" />
            entomological science for a better tomorrow.
          </motion.p>
        </div>

        {/* =================================================
            RIGHT BUTTON
        ================================================== */}

        <motion.div
          initial={{
            opacity: 0,
            x: 15,
          }}
          whileInView={{
            opacity: 1,
            x: 0,
          }}
          viewport={{ once: true }}
          transition={{
            duration: 0.55,
            delay: 0.19,
          }}
          className="
            flex
            min-w-0

            items-center
            justify-center

            px-[14px]

            lg:px-[20px]
          "
        >
          <motion.button
            type="button"
            onClick={() => {
              document
                .getElementById("paper-submission-form")
                ?.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                });
            }}
            whileHover={{
              y: -2,
              scale: 1.015,
            }}
            whileTap={{
              scale: 0.98,
            }}
            className="
              group/button
              relative

              inline-flex
              min-h-[36px]

              w-full
              max-w-[215px]

              items-center
              justify-center

              gap-[10px]

              overflow-hidden

              rounded-[6px]

              border
              border-[#d39f23]

              bg-[linear-gradient(180deg,#f3c747_0%,#e2ad2c_100%)]

              px-[16px]
              py-[8px]

              text-[12.5px]
              font-semibold
              leading-none

              text-[#173518]

              shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_4px_10px_rgba(0,0,0,0.20)]

              transition-all
              duration-300

              hover:border-[#f0ca56]

              hover:bg-[linear-gradient(180deg,#f8d158_0%,#eeba36_100%)]

              hover:shadow-[0_7px_15px_rgba(0,0,0,0.26)]

              lg:min-h-[39px]
              lg:text-[12.5px]
hover:text-white
              xl:max-w-[230px]
              xl:text-[13px]
            "
          >
            {/* shine */}

            <span
              aria-hidden="true"
              className="
                pointer-events-none
                absolute
                inset-y-0
                -left-[35%]

                w-[26%]

                -skew-x-[20deg]

                bg-white/20

                transition-all
                duration-700

                group-hover/button:left-[120%]
              "
            />

            <span className="relative z-10 whitespace-nowrap">
              Submit Your Paper Now
            </span>

            <Send
              strokeWidth={1.8}
              className="
                relative
                z-10

                h-[16px]
                w-[16px]

                shrink-0

                transition-transform
                duration-300

                group-hover/button:translate-x-[3px]
                group-hover/button:-translate-y-[1px]
              "
            />
          </motion.button>
        </motion.div>
      </div>

      {/* =====================================================
          MOBILE CONTENT
      ====================================================== */}

      <div
        className="
          relative
          z-10

          flex
          min-h-[185px]
          w-full

          flex-col

          items-center
          justify-center

          px-5
          py-5

          text-center

          md:hidden

          max-[390px]:min-h-[195px]
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
          viewport={{ once: true }}
          transition={{
            duration: 0.5,
            delay: 0.08,
          }}
          className="
            max-w-[470px]

            text-[16px]
            font-semibold
            leading-[1.25]

            tracking-[-0.15px]

            text-white

            sm:text-[17px]

            max-[390px]:text-[15px]
          "
        >
          Ready to Share Your Research with the World?
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
            delay: 0.14,
          }}
          className="
            mt-[8px]

            max-w-[470px]

            text-[10px]
            font-medium
            leading-[1.5]

            text-white/90

            sm:text-[10.5px]

            max-[390px]:text-[9.5px]
          "
        >
          Submit your paper today and be part of ICEBIS 2027.
          Together, let&apos;s advance entomological science for a
          better tomorrow.
        </motion.p>

        <motion.button
          type="button"
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
            delay: 0.19,
          }}
          whileHover={{
            y: -2,
          }}
          whileTap={{
            scale: 0.98,
          }}
          onClick={() => {
            document
              .getElementById("paper-submission-form")
              ?.scrollIntoView({
                behavior: "smooth",
                block: "start",
              });
          }}
          className="
            group/button
            relative

            mt-[13px]

            inline-flex
            min-h-[36px]

            max-w-full

            items-center
            justify-center

            gap-[8px]

            overflow-hidden

            rounded-[5px]

            border
            border-[#d39f23]

            bg-[linear-gradient(180deg,#f3c747_0%,#e2ad2c_100%)]

            px-[16px]
            py-[8px]

            text-[12px]
            font-semibold

            text-[#173518]

            shadow-[0_4px_10px_rgba(0,0,0,0.20)]

            transition-all
            duration-300

            hover:bg-[linear-gradient(180deg,#f8d158_0%,#eeba36_100%)]

            hover:shadow-[0_7px_15px_rgba(0,0,0,0.26)]
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

              bg-white/20

              transition-all
              duration-700
   
              group-hover/button:left-[120%]
            "
          />

          <span className="relative z-10">
            Submit Your Paper Now
          </span>

          <Send
            className="
              relative
              z-10

              h-[14px]
              w-[14px]

              transition-transform
              duration-300

              group-hover/button:translate-x-[3px]
            "
          />
        </motion.button>
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
    h-[39px]
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

    text-[11px]
    font-medium

    text-[#2c362d]

    outline-none

    transition-all
    duration-300

    placeholder:text-[#8c938b]

   

    

   

    sm:text-[11.5px]
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
            h-[18px]
            w-[18px]

            shrink-0

            text-[#4d7251]
          "
        />

        <h2
          className="
            text-[15px]
            font-semibold
            leading-none

            text-[#253629]

            sm:text-[15.5px]
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

          text-[10.5px]
          font-semibold

          text-[#3f4840]

          sm:text-[11px]
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

        text-[11px]
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
          text-[10.5px]
          font-semibold

          text-[#3e473e]

          sm:text-[11px]
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

            text-[11px]
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
            text-[10px]
            font-medium

            text-[#848b83]
          "
        >
          {description}
        </span>

        <span
          className="
            text-[10px]
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

        p-[14px]

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

          gap-[9px]
        "
      >
        <CardIcon
          strokeWidth={1.65}
          className="
            h-[20px]
            w-[20px]

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

            text-[15px]
            font-semibold
            leading-[1.25]

            text-[#263628]

            sm:text-[16.5px]
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
          h-[2px]
          w-[52px]

          bg-[linear-gradient(90deg,transparent,#c6a644)]

          sm:block
        "
      />

      <span
        className="
          text-[27px]

          text-[#c6a644]
        "
      >
        ~
      </span>

      <h2
        className="
          text-center

          text-[18px]
          font-semibold

          text-[#2c3c2f]

          sm:text-[19px]
        "
      >
        {children}
      </h2>

      <span
        className="
          text-[27px]
          text-[#c6a644]
        "
      >
        ~
      </span>

      <span
        className="
          hidden
          h-[2px]
          w-[52px]

          bg-[linear-gradient(90deg,#c6a644,transparent)]

          sm:block
        "
      />
    </div>
  );
}