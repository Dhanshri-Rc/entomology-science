import { useState } from "react";
import { motion } from "framer-motion";
import { UploadCloud, CheckCircle2 } from "lucide-react";
import PageHero from "../components/PageHero";
import Container from "../components/Container";
import SectionTitle from "../components/SectionTitle";
import CtaBanner from "../components/CtaBanner";
import PrimaryButton from "../components/PrimaryButton";
import Icon from "../components/Icon";
import { reveal, revealStagger } from "../lib/motion";
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

const inputClasses =
  "w-full rounded-md border border-border px-4 py-3 text-sm text-heading outline-none transition focus:ring-2 focus:ring-gold focus:border-gold placeholder:text-muted/70";

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

function FieldLabel({ htmlFor, required, children }) {
  return (
    <label htmlFor={htmlFor} className="block text-sm font-medium text-heading mb-1.5">
      {children} {required && <span className="text-red-500">*</span>}
    </label>
  );
}

function FieldError({ id, message }) {
  if (!message) return null;
  return (
    <p id={id} className="text-xs text-red-500 mt-1.5">
      {message}
    </p>
  );
}

export default function SubmitPaper() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const setField = (field) => (e) => {
    const value =
      field === "agree"
        ? e.target.checked
        : e.target.type === "file"
        ? e.target.files?.[0] || null
        : e.target.value;
    setForm((f) => ({ ...f, [field]: value }));
    setErrors((er) => ({ ...er, [field]: undefined }));
  };

  const validate = () => {
    const req = [
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
    const newErrors = {};
    req.forEach((f) => {
      if (!form[f]) newErrors[f] = "This field is required.";
    });
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (form.corrEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.corrEmail)) {
      newErrors.corrEmail = "Please enter a valid email address.";
    }
    if (!form.agree) newErrors.agree = "You must agree to the guidelines and terms.";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      setSubmitted(true);
      setForm(initialForm);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <>
      <PageHero
        breadcrumb={[
          { label: "Home", path: "/" },
          { label: "Submission", path: "/submission" },
          { label: "Submit Paper" },
        ]}
        title="Submit Paper"
        description="Share your original research and contribute to advancing entomological science at ICEBIS 2027."
        image="/images/hero-submitpaper-ant.jpg"
        imageAlt="Metallic jewel wasp on a leaf"
        compact
      />

      <section className="py-16 sm:py-20">
        <Container>
          {submitted && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8 flex items-start gap-3 bg-secondary/10 border border-secondary/30 text-secondary rounded-md px-5 py-4 text-sm font-medium"
            >
              <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" aria-hidden="true" />
              Thank you. Your paper has been submitted successfully. You will receive a confirmation
              email shortly.
            </motion.div>
          )}

          <div className="grid lg:grid-cols-[1fr_340px] gap-8">
            <motion.form {...reveal} noValidate onSubmit={handleSubmit} className="bg-surface rounded-xl p-6 sm:p-8 shadow-card flex flex-col gap-9">
              {/* Author Information */}
              <div>
                <SectionTitle icon="User" title="Author Information" />
                <div className="mt-5 grid sm:grid-cols-2 gap-5">
                  <div>
                    <FieldLabel htmlFor="fullName" required>
                      Full Name
                    </FieldLabel>
                    <input id="fullName" type="text" value={form.fullName} onChange={setField("fullName")} placeholder="Enter full name" className={inputClasses} aria-invalid={!!errors.fullName} />
                    <FieldError message={errors.fullName} />
                  </div>
                  <div>
                    <FieldLabel htmlFor="email" required>
                      Email Address
                    </FieldLabel>
                    <input id="email" type="email" value={form.email} onChange={setField("email")} placeholder="Enter email address" className={inputClasses} aria-invalid={!!errors.email} />
                    <FieldError message={errors.email} />
                  </div>
                  <div>
                    <FieldLabel htmlFor="affiliation" required>
                      Affiliation / Institution
                    </FieldLabel>
                    <input id="affiliation" type="text" value={form.affiliation} onChange={setField("affiliation")} placeholder="Enter your institution" className={inputClasses} aria-invalid={!!errors.affiliation} />
                    <FieldError message={errors.affiliation} />
                  </div>
                  <div>
                    <FieldLabel htmlFor="country" required>
                      Country
                    </FieldLabel>
                    <select id="country" value={form.country} onChange={setField("country")} className={inputClasses} aria-invalid={!!errors.country}>
                      <option value="">Select your country</option>
                      <option>United States</option>
                      <option>United Kingdom</option>
                      <option>India</option>
                      <option>Canada</option>
                      <option>Australia</option>
                      <option>Germany</option>
                      <option>Japan</option>
                      <option>Other</option>
                    </select>
                    <FieldError message={errors.country} />
                  </div>
                </div>
              </div>

              {/* Corresponding Author */}
              <div>
                <SectionTitle icon="UserCheck" title="Corresponding Author Details" />
                <div className="mt-5 grid sm:grid-cols-2 gap-5">
                  <div>
                    <FieldLabel htmlFor="corrFullName" required>
                      Full Name
                    </FieldLabel>
                    <input id="corrFullName" type="text" value={form.corrFullName} onChange={setField("corrFullName")} placeholder="Enter full name" className={inputClasses} aria-invalid={!!errors.corrFullName} />
                    <FieldError message={errors.corrFullName} />
                  </div>
                  <div>
                    <FieldLabel htmlFor="corrEmail" required>
                      Email Address
                    </FieldLabel>
                    <input id="corrEmail" type="email" value={form.corrEmail} onChange={setField("corrEmail")} placeholder="Enter email address" className={inputClasses} aria-invalid={!!errors.corrEmail} />
                    <FieldError message={errors.corrEmail} />
                  </div>
                  <div>
                    <FieldLabel htmlFor="corrPhone">Phone Number</FieldLabel>
                    <input id="corrPhone" type="tel" value={form.corrPhone} onChange={setField("corrPhone")} placeholder="Enter phone number" className={inputClasses} />
                  </div>
                  <div>
                    <FieldLabel htmlFor="corrAddress">Address</FieldLabel>
                    <input id="corrAddress" type="text" value={form.corrAddress} onChange={setField("corrAddress")} placeholder="Enter your institutional address" className={inputClasses} />
                  </div>
                </div>
              </div>

              {/* Paper Information */}
              <div>
                <SectionTitle icon="FileText" title="Paper Information" />
                <div className="mt-5 grid sm:grid-cols-2 gap-5">
                  <div>
                    <FieldLabel htmlFor="paperTitle" required>
                      Paper Title
                    </FieldLabel>
                    <input id="paperTitle" type="text" value={form.paperTitle} onChange={setField("paperTitle")} placeholder="Enter your paper title" className={inputClasses} aria-invalid={!!errors.paperTitle} />
                    <FieldError message={errors.paperTitle} />
                  </div>
                  <div>
                    <FieldLabel htmlFor="researchArea" required>
                      Research Area / Track
                    </FieldLabel>
                    <select id="researchArea" value={form.researchArea} onChange={setField("researchArea")} className={inputClasses} aria-invalid={!!errors.researchArea}>
                      <option value="">Select research area</option>
                      {researchAreas.map((r) => (
                        <option key={r}>{r}</option>
                      ))}
                    </select>
                    <FieldError message={errors.researchArea} />
                  </div>
                  <div className="sm:col-span-2">
                    <FieldLabel htmlFor="abstract" required>
                      Abstract
                    </FieldLabel>
                    <textarea id="abstract" rows={4} value={form.abstract} onChange={setField("abstract")} placeholder="Enter abstract (Max 300 words)" className={inputClasses} aria-invalid={!!errors.abstract} />
                    <FieldError message={errors.abstract} />
                  </div>
                  <div>
                    <FieldLabel htmlFor="keywords" required>
                      Keywords (comma separated)
                    </FieldLabel>
                    <input id="keywords" type="text" value={form.keywords} onChange={setField("keywords")} placeholder="e.g., biodiversity, pollinators, pest management" className={inputClasses} aria-invalid={!!errors.keywords} />
                    <FieldError message={errors.keywords} />
                  </div>
                  <div>
                    <FieldLabel htmlFor="presentationType" required>
                      Presentation Type
                    </FieldLabel>
                    <select id="presentationType" value={form.presentationType} onChange={setField("presentationType")} className={inputClasses} aria-invalid={!!errors.presentationType}>
                      <option value="">Select presentation type</option>
                      {presentationTypes.map((p) => (
                        <option key={p}>{p}</option>
                      ))}
                    </select>
                    <FieldError message={errors.presentationType} />
                  </div>
                </div>
              </div>

              {/* Upload Manuscript */}
              <div>
                <SectionTitle icon="Upload" title="Upload Manuscript" />
                <div className="mt-5 grid sm:grid-cols-2 gap-5">
                  <div>
                    <FieldLabel htmlFor="paperFile" required>
                      Upload Paper
                    </FieldLabel>
                    <label
                      htmlFor="paperFile"
                      className={`flex flex-col items-center justify-center gap-2 border-2 border-dashed rounded-md px-4 py-8 text-center cursor-pointer transition-colors duration-300 hover:border-gold hover:bg-gold/5 ${
                        errors.paperFile ? "border-red-300" : "border-border"
                      }`}
                    >
                      <UploadCloud className="w-6 h-6 text-secondary" aria-hidden="true" />
                      <span className="text-sm text-body">
                        {form.paperFile ? form.paperFile.name : "Click to upload your manuscript"}
                      </span>
                      <span className="text-xs text-muted">(PDF, DOCX) Max file size 10MB</span>
                      <input id="paperFile" type="file" accept=".pdf,.doc,.docx" onChange={setField("paperFile")} className="sr-only" />
                    </label>
                    <FieldError message={errors.paperFile} />
                  </div>
                  <div>
                    <FieldLabel htmlFor="coverLetterFile">Upload Cover Letter (Optional)</FieldLabel>
                    <label
                      htmlFor="coverLetterFile"
                      className="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-border rounded-md px-4 py-8 text-center cursor-pointer transition-colors duration-300 hover:border-gold hover:bg-gold/5"
                    >
                      <UploadCloud className="w-6 h-6 text-secondary" aria-hidden="true" />
                      <span className="text-sm text-body">
                        {form.coverLetterFile ? form.coverLetterFile.name : "Click to upload cover letter"}
                      </span>
                      <span className="text-xs text-muted">(PDF, DOCX) Max file size 5MB</span>
                      <input id="coverLetterFile" type="file" accept=".pdf,.doc,.docx" onChange={setField("coverLetterFile")} className="sr-only" />
                    </label>
                  </div>
                </div>
              </div>

              {/* Additional Notes */}
              <div>
                <SectionTitle icon="MessageSquare" title="Additional Notes" />
                <div className="mt-5">
                  <FieldLabel htmlFor="notes">Message to Organizers (Optional)</FieldLabel>
                  <textarea id="notes" rows={3} value={form.notes} onChange={setField("notes")} placeholder="Write any additional information for the organizers..." className={inputClasses} />
                </div>
              </div>

              <div>
                <label className="flex items-start gap-2.5 text-sm text-body">
                  <input type="checkbox" checked={form.agree} onChange={setField("agree")} className="mt-0.5 w-4 h-4 accent-gold" aria-invalid={!!errors.agree} />
                  I have read and agree to the{" "}
                  <a href="/submission" className="text-secondary hover:underline">
                    Submission Guidelines
                  </a>{" "}
                  and{" "}
                  <a href="/terms" className="text-secondary hover:underline">
                    Terms &amp; Conditions
                  </a>
                  . <span className="text-red-500">*</span>
                </label>
                <FieldError message={errors.agree} />
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <PrimaryButton type="submit" icon="Send" variant="gold">
                  Submit Paper
                </PrimaryButton>
                <PrimaryButton type="button" variant="outlineDark" icon="Bookmark">
                  Save as Draft
                </PrimaryButton>
              </div>
              <p className="text-xs text-muted -mt-2">All fields marked with * are required.</p>
            </motion.form>

            {/* Sidebar */}
            <div className="flex flex-col gap-6">
              <motion.div {...revealStagger(0.05)} className="bg-surface rounded-xl p-6 shadow-card">
                <div className="flex items-center gap-2.5 mb-4">
                  <Icon name="ShieldCheck" className="w-5 h-5 text-secondary" />
                  <h3 className="font-semibold text-heading text-sm">Submission Guidelines</h3>
                </div>
                <ul className="flex flex-col gap-2.5">
                  {submitPaperGuidelines.map((g) => (
                    <li key={g} className="flex items-start gap-2 text-xs text-body">
                      <Icon name="Check" className="w-3.5 h-3.5 text-secondary shrink-0 mt-0.5" />
                      {g}
                    </li>
                  ))}
                </ul>
                <PrimaryButton variant="outlineDark" icon="Download" className="w-full mt-5 text-xs !py-2.5">
                  Download Guidelines
                </PrimaryButton>
              </motion.div>

              <motion.div {...revealStagger(0.1)} className="bg-surface rounded-xl p-6 shadow-card">
                <div className="flex items-center gap-2.5 mb-4">
                  <Icon name="CalendarDays" className="w-5 h-5 text-secondary" />
                  <h3 className="font-semibold text-heading text-sm">Important Dates</h3>
                </div>
                <ul className="flex flex-col gap-3">
                  {importantDates.map((d) => (
                    <li key={d.label + d.date} className="flex items-center justify-between gap-3 text-xs">
                      <span className="text-muted">{d.label}</span>
                      <span className="font-semibold text-heading text-right shrink-0">{d.date}</span>
                    </li>
                  ))}
                </ul>
                <PrimaryButton to="/call-for-papers" variant="outlineDark" icon="ArrowRight" className="w-full mt-5 text-xs !py-2.5">
                  View All Important Dates
                </PrimaryButton>
              </motion.div>

              <motion.div {...revealStagger(0.15)} className="bg-surface rounded-xl p-6 shadow-card">
                <div className="flex items-center gap-2.5 mb-4">
                  <Icon name="FileType2" className="w-5 h-5 text-secondary" />
                  <h3 className="font-semibold text-heading text-sm">Accepted File Formats</h3>
                </div>
                <ul className="flex flex-col gap-2">
                  {acceptedFileFormats.map((f) => (
                    <li key={f} className="text-xs text-body flex items-start gap-2">
                      <Icon name="Dot" className="w-4 h-4 text-secondary shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </motion.div>

              <motion.div {...revealStagger(0.2)} className="bg-primary rounded-xl p-6 text-white">
                <div className="flex items-center gap-2.5 mb-3">
                  <Icon name="Headphones" className="w-5 h-5 text-accent-light" />
                  <h3 className="font-semibold text-sm">Need Help?</h3>
                </div>
                <p className="text-xs text-white/75 mb-4">
                  If you face any issues during submission, please reach out to our support team.
                </p>
                <p className="text-xs text-white/85 flex items-center gap-2 mb-2">
                  <Icon name="Mail" className="w-3.5 h-3.5 text-accent-light" /> submissions@entomologyscience.org
                </p>
                <p className="text-xs text-white/85 flex items-center gap-2 mb-4">
                  <Icon name="Phone" className="w-3.5 h-3.5 text-accent-light" /> {siteInfo.phone}
                </p>
                <PrimaryButton to="/contact" variant="primary" icon="ArrowRight" className="w-full text-xs !py-2.5">
                  Contact Support
                </PrimaryButton>
              </motion.div>

              <motion.div {...revealStagger(0.25)} className="bg-surface rounded-xl p-6 shadow-card">
                <div className="flex items-center gap-2.5 mb-4">
                  <Icon name="BookOpen" className="w-5 h-5 text-secondary" />
                  <h3 className="font-semibold text-heading text-sm">Publication Opportunity</h3>
                </div>
                <p className="text-xs text-body mb-4">
                  Selected high-quality papers will be published in Scopus indexed journals.
                </p>
                <div className="flex items-center gap-3">
                  <img src="/images/journal-cover.jpg" alt="Journal of Entomological Research cover" loading="lazy" className="w-12 h-16 object-cover rounded shadow-card shrink-0" />
                  <div>
                    <p className="text-xs font-semibold text-heading leading-snug">{mainJournal.title}</p>
                    <span className="inline-block bg-secondary/10 text-secondary text-[10px] font-semibold px-2 py-0.5 rounded mt-1">
                      Scopus Indexed
                    </span>
                    <a href="/publication" className="block text-xs text-secondary hover:underline mt-1">
                      Learn more about the journal &rarr;
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Submission Process */}
          <motion.div {...reveal} className="mt-16">
            <SectionTitle title="Submission Process" align="center" ornament className="mb-10" />
            <div className="grid sm:grid-cols-3 lg:grid-cols-5 gap-5">
              {submitPaperProcess.map((s) => (
                <div key={s.title} className="flex flex-col items-center text-center gap-2.5">
                  <span className="w-14 h-14 rounded-full bg-primary text-white flex items-center justify-center">
                    <Icon name={s.icon} className="w-6 h-6" />
                  </span>
                  <p className="font-semibold text-heading text-sm">{s.title}</p>
                  <p className="text-xs text-muted leading-relaxed">{s.description}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Conference Tracks */}
          <motion.div {...reveal} className="mt-16">
            <SectionTitle title="Conference Tracks" align="center" ornament className="mb-10" />
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-5">
              {conferenceTracks.map((t) => (
                <div key={t.label} className="bg-surface rounded-lg p-5 flex flex-col items-center text-center gap-2.5 hover:-translate-y-1 hover:shadow-cardHover transition-all duration-300">
                  <Icon name={t.icon} className="w-6 h-6 text-secondary" />
                  <p className="text-xs font-semibold text-heading leading-snug">{t.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </Container>
      </section>

      <div className="pb-16 sm:pb-20">
        <CtaBanner
          image="/images/hero-aimscope-butterfly.jpg"
          imageAlt="Monarch butterfly on a daisy flower"
          title="Ready to Share Your Research with the World?"
          description="Submit your paper today and be part of ICEBIS 2027. Together, let's advance entomological science for a better tomorrow."
          buttonText="Submit Your Paper Now"
          buttonTo="/submit-paper"
        />
      </div>
    </>
  );
}
