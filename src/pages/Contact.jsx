import { useState } from "react";
import { motion } from "framer-motion";
import { User, Mail, MapPin, Phone, Globe, CheckCircle2 } from "lucide-react";
import PageHero from "../components/PageHero";
import Container from "../components/Container";
import SectionTitle from "../components/SectionTitle";
import CtaBanner from "../components/CtaBanner";
import PrimaryButton from "../components/PrimaryButton";
import Icon from "../components/Icon";
import { reveal, revealStagger } from "../lib/motion";
import { siteInfo, contactSubjects, contactCategories } from "../data/siteData";

const inputClasses =
  "w-full rounded-md border border-border px-4 py-3 text-sm text-heading outline-none transition focus:ring-2 focus:ring-secondary focus:border-secondary placeholder:text-muted/70";

export default function Contact() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    subject: "",
    message: "",
    agree: false,
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (field) => (e) => {
    const value = field === "agree" ? e.target.checked : e.target.value;
    setForm((f) => ({ ...f, [field]: value }));
    setErrors((er) => ({ ...er, [field]: undefined }));
  };

  const validate = () => {
    const newErrors = {};
    if (!form.fullName.trim()) newErrors.fullName = "Full name is required.";
    if (!form.email.trim()) {
      newErrors.email = "Email address is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (!form.subject) newErrors.subject = "Please select a subject.";
    if (!form.message.trim()) newErrors.message = "Your message is required.";
    if (!form.agree) newErrors.agree = "Please agree to the privacy policy.";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      setSubmitted(true);
      setForm({ fullName: "", email: "", subject: "", message: "", agree: false });
    }
  };

  return (
    <>
      <PageHero
        breadcrumb={[{ label: "Home", path: "/" }, { label: "Contact Us" }]}
        title="Contact Us"
        subtitle="We are here to help!"
        description="Have questions about the conference, submission, publication, or collaboration? Reach out to us."
        image="/images/hero-contact-butterfly.jpg"
        imageAlt="Monarch butterfly feeding on a white daisy"
        compact
      />

      <section className="py-16 sm:py-20">
        <Container>
          <div className="grid lg:grid-cols-[1fr_380px] gap-8">
            <motion.div {...reveal} className="bg-surface rounded-xl p-6 sm:p-8 shadow-card">
              <SectionTitle icon="Leaf" title="Send Us a Message" />
              <p className="mt-3 text-body text-sm mb-6">
                Fill out the form below and our team will get back to you shortly.
              </p>

              {submitted && (
                <div className="mb-6 flex items-start gap-3 bg-secondary/10 border border-secondary/30 text-secondary rounded-md px-4 py-3.5 text-sm font-medium">
                  <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" aria-hidden="true" />
                  Thank you. Your message has been submitted successfully.
                </div>
              )}

              <form noValidate onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="fullName" className="block text-sm font-medium text-heading mb-1.5">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-muted absolute left-3.5 top-1/2 -translate-y-1/2" aria-hidden="true" />
                      <input
                        id="fullName"
                        type="text"
                        value={form.fullName}
                        onChange={handleChange("fullName")}
                        placeholder="Enter your full name"
                        className={`${inputClasses} pl-10`}
                        aria-invalid={!!errors.fullName}
                        aria-describedby={errors.fullName ? "fullName-error" : undefined}
                      />
                    </div>
                    {errors.fullName && (
                      <p id="fullName-error" className="text-xs text-red-500 mt-1.5">
                        {errors.fullName}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-heading mb-1.5">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-muted absolute left-3.5 top-1/2 -translate-y-1/2" aria-hidden="true" />
                      <input
                        id="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange("email")}
                        placeholder="Enter your email"
                        className={`${inputClasses} pl-10`}
                        aria-invalid={!!errors.email}
                        aria-describedby={errors.email ? "email-error" : undefined}
                      />
                    </div>
                    {errors.email && (
                      <p id="email-error" className="text-xs text-red-500 mt-1.5">
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-heading mb-1.5">
                    Subject <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="subject"
                    value={form.subject}
                    onChange={handleChange("subject")}
                    className={inputClasses}
                    aria-invalid={!!errors.subject}
                    aria-describedby={errors.subject ? "subject-error" : undefined}
                  >
                    <option value="">Select a subject</option>
                    {contactSubjects.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                  {errors.subject && (
                    <p id="subject-error" className="text-xs text-red-500 mt-1.5">
                      {errors.subject}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-heading mb-1.5">
                    Your Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    value={form.message}
                    onChange={handleChange("message")}
                    placeholder="Write your message here..."
                    className={inputClasses}
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? "message-error" : undefined}
                  />
                  {errors.message && (
                    <p id="message-error" className="text-xs text-red-500 mt-1.5">
                      {errors.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="flex items-start gap-2.5 text-sm text-body">
                    <input
                      type="checkbox"
                      checked={form.agree}
                      onChange={handleChange("agree")}
                      className="mt-0.5 w-4 h-4 accent-secondary"
                      aria-invalid={!!errors.agree}
                    />
                    I agree to the{" "}
                    <a href="/privacy-policy" className="text-secondary hover:underline">
                      privacy policy
                    </a>
                  </label>
                  {errors.agree && <p className="text-xs text-red-500 mt-1.5">{errors.agree}</p>}
                </div>

                <PrimaryButton type="submit" icon="Send" variant="dark" className="w-full sm:w-auto">
                  Send Message
                </PrimaryButton>
              </form>
            </motion.div>

            <motion.div {...revealStagger(0.1)} className="flex flex-col gap-6">
              <div className="bg-surface rounded-xl p-6 shadow-card">
                <SectionTitle icon="Leaf" title="Contact Information" size="sm" />
                <ul className="mt-6 flex flex-col gap-5">
                  <li className="flex items-start gap-3">
                    <span className="w-10 h-10 rounded-full bg-secondary/10 text-secondary flex items-center justify-center shrink-0">
                      <MapPin className="w-4.5 h-4.5" aria-hidden="true" />
                    </span>
                    <div>
                      <p className="font-semibold text-heading text-sm">{siteInfo.name}</p>
                      <p className="text-sm text-muted mt-0.5">{siteInfo.address}</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-10 h-10 rounded-full bg-secondary/10 text-secondary flex items-center justify-center shrink-0">
                      <Mail className="w-4.5 h-4.5" aria-hidden="true" />
                    </span>
                    <div>
                      <p className="font-semibold text-heading text-sm">Email</p>
                      <a href={`mailto:${siteInfo.email}`} className="text-sm text-secondary hover:underline">
                        {siteInfo.email}
                      </a>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-10 h-10 rounded-full bg-secondary/10 text-secondary flex items-center justify-center shrink-0">
                      <Phone className="w-4.5 h-4.5" aria-hidden="true" />
                    </span>
                    <div>
                      <p className="font-semibold text-heading text-sm">Phone</p>
                      <p className="text-sm text-muted">{siteInfo.phone}</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-10 h-10 rounded-full bg-secondary/10 text-secondary flex items-center justify-center shrink-0">
                      <Globe className="w-4.5 h-4.5" aria-hidden="true" />
                    </span>
                    <div>
                      <p className="font-semibold text-heading text-sm">Website</p>
                      <p className="text-sm text-secondary">{siteInfo.website}</p>
                    </div>
                  </li>
                </ul>

                <div className="mt-6 rounded-lg overflow-hidden border border-border h-40 relative bg-[linear-gradient(135deg,#eef2ea_25%,#e4ece0_25%,#e4ece0_50%,#eef2ea_50%,#eef2ea_75%,#e4ece0_75%,#e4ece0_100%)] bg-[length:24px_24px]">
                  <div className="absolute inset-0 flex items-center justify-center flex-col gap-1 text-primary">
                    <MapPin className="w-6 h-6" aria-hidden="true" />
                    <p className="text-xs font-semibold">Entomology Science Association</p>
                    <p className="text-[11px] text-muted">Washington, DC, USA</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div {...reveal} className="grid grid-cols-2 lg:grid-cols-4 gap-5 mt-8 bg-surface rounded-xl p-6 sm:p-8">
            {contactCategories.map((c) => (
              <div key={c.title} className="flex flex-col items-center text-center gap-2.5">
                <span className="w-12 h-12 rounded-full bg-white shadow-card flex items-center justify-center text-secondary">
                  <Icon name={c.icon} className="w-5 h-5" />
                </span>
                <p className="font-semibold text-heading text-sm">{c.title}</p>
                <a href={`mailto:${c.email}`} className="text-xs text-secondary hover:underline break-all">
                  {c.email}
                </a>
              </div>
            ))}
          </motion.div>
        </Container>
      </section>

      <div className="pb-16 sm:pb-20">
        <CtaBanner
          image="/images/cta-ladybug.jpg"
          imageAlt="Ladybug on a leaf with dew drops"
          title="Let's work together to advance entomological science."
          description="We look forward to connecting with you!"
          dark={false}
        />
      </div>
    </>
  );
}
