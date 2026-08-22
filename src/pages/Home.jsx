import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, CalendarDays, MapPin, Globe2 } from "lucide-react";
import Container from "../components/Container";
import PrimaryButton from "../components/PrimaryButton";
import SectionTitle from "../components/SectionTitle";
import Icon from "../components/Icon";
import CtaBanner from "../components/CtaBanner";
import { reveal, revealStagger, heroItem } from "../lib/motion";
import {
  heroStats,
  homeHighlights,
  conferenceThemes,
  homeImportantDates,
  mainJournal,
} from "../data/siteData";

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-primary">
        <div className="absolute inset-0">
          <img
            src="/images/hero-home-beetle.jpg"
            alt="Iridescent leaf beetle on a green leaf, representing entomological biodiversity"
            className="absolute inset-0 w-full h-full object-cover opacity-70"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/85 to-primary/40" />
        </div>

        <Container className="relative z-10 py-16 sm:py-20 lg:py-24">
          <div className="max-w-2xl">
            <motion.p {...heroItem(0)} className="text-white/85 font-medium mb-3">
              International Conference on
            </motion.p>
            <motion.h1
              {...heroItem(0.08)}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight"
            >
              Entomology: <br className="hidden sm:block" />
              Science for a Sustainable Future
            </motion.h1>
            <motion.p {...heroItem(0.16)} className="mt-4 text-xl sm:text-2xl font-semibold text-accent-light">
              Exploring Diversity, Innovation and Impact
            </motion.p>

            <motion.div
              {...heroItem(0.24)}
              className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 text-white/85 text-sm"
            >
              <span className="flex items-center gap-2">
                <CalendarDays className="w-4 h-4 text-accent-light" aria-hidden="true" />
                10 &ndash; 12 November 2025
              </span>
              <span className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-accent-light" aria-hidden="true" />
                Washington, DC, USA
              </span>
              <span className="flex items-center gap-2">
                <Globe2 className="w-4 h-4 text-accent-light" aria-hidden="true" />
                Hybrid Conference
              </span>
            </motion.div>

            <motion.p {...heroItem(0.32)} className="mt-5 text-white/80 max-w-lg leading-relaxed">
              A global platform for researchers, academicians and industry professionals to exchange
              knowledge and advance entomological science for a sustainable world.
            </motion.p>

            <motion.div {...heroItem(0.4)} className="mt-8 flex flex-wrap gap-4">
              <PrimaryButton to="/submit-paper" icon="Send">
                Submit Your Paper
              </PrimaryButton>
              <PrimaryButton to="/call-for-papers" icon="CalendarDays" variant="outline">
                View Important Dates
              </PrimaryButton>
            </motion.div>
          </div>

          {/* Floating stats card */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            className="hidden lg:flex flex-col gap-4 absolute right-8 xl:right-16 top-1/2 -translate-y-1/2 bg-primary-dark/60 backdrop-blur-sm border border-white/10 rounded-xl p-5 w-56"
          >
            {heroStats.map((s) => (
              <div key={s.label} className="flex items-center gap-3 text-white">
                <span className="text-accent-light">
                  <Icon name={s.icon} className="w-6 h-6" />
                </span>
                <div>
                  <p className="font-semibold leading-tight">{s.value}</p>
                  <p className="text-xs text-white/70 leading-tight">{s.label}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </Container>

        {/* Highlights strip */}
        <div className="relative z-10">
          <Container>
            <motion.div
              {...reveal}
              className="bg-white rounded-t-2xl sm:rounded-2xl shadow-card grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-y-8 gap-x-4 px-6 sm:px-10 py-8 sm:-mb-12 relative"
            >
              {homeHighlights.map((h) => (
                <div key={h.label} className="flex flex-col items-center text-center gap-2">
                  <span className="text-secondary">
                    <Icon name={h.icon} className="w-7 h-7" />
                  </span>
                  <p className="text-sm font-medium text-heading whitespace-pre-line leading-snug">
                    {h.label}
                  </p>
                </div>
              ))}
            </motion.div>
          </Container>
        </div>
      </section>

      {/* ABOUT THE CONFERENCE */}
      <section className="pt-20 sm:pt-24 pb-16 sm:pb-20">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div {...reveal}>
              <SectionTitle icon="Leaf" title="About the Conference" />
              <p className="mt-5 text-body leading-relaxed">
                The International Conference on Entomology brings together leading experts, researchers
                and practitioners to discuss the latest advancements in entomological research and its
                applications in a rapidly changing world.
              </p>
              <p className="mt-4 text-body leading-relaxed">
                This conference aims to foster collaboration, share innovative ideas and inspire solutions
                for the challenges impacting insects, ecosystems and human well-being.
              </p>
              <div className="mt-7">
                <PrimaryButton to="/about" icon="ArrowRight" variant="primary">
                  Learn More About the Conference
                </PrimaryButton>
              </div>
            </motion.div>

            <motion.div {...revealStagger(0.1)} className="relative rounded-2xl overflow-hidden shadow-card">
              <img
                src="/images/about-home-butterfly.jpg"
                alt="Monarch butterfly feeding on a white daisy flower"
                loading="lazy"
                className="w-full h-80 object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-primary/85 backdrop-blur-sm px-5 py-4 flex items-center gap-3">
                <Icon name="Leaf" className="w-5 h-5 text-accent-light shrink-0" />
                <div>
                  <p className="text-white font-semibold text-sm sm:text-base">
                    Entomology for People, Planet and Prosperity
                  </p>
                  <p className="text-white/70 text-xs sm:text-sm">Research. Innovate. Sustain.</p>
                </div>
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* CONFERENCE THEMES */}
      <section className="py-16 sm:py-20 bg-surface">
        <Container>
          <SectionTitle title="Conference Themes" align="center" ornament className="mb-10" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {conferenceThemes.map((theme, i) => (
              <motion.div
                key={theme.title}
                {...revealStagger(i * 0.05)}
                className="bg-white rounded-xl p-6 flex flex-col items-center text-center gap-3 shadow-card hover:shadow-cardHover hover:-translate-y-1 transition-all duration-300"
              >
                <span className="w-12 h-12 rounded-full bg-secondary/10 text-secondary flex items-center justify-center">
                  <Icon name={theme.icon} className="w-6 h-6" />
                </span>
                <p className="font-semibold text-heading text-sm leading-snug">{theme.title}</p>
              </motion.div>
            ))}
          </div>
          <motion.div {...reveal} className="flex justify-center mt-9">
            <PrimaryButton to="/aim-scope" variant="outlineDark">
              View Aims &amp; Scope
            </PrimaryButton>
          </motion.div>
        </Container>
      </section>

      {/* IMPORTANT DATES + PUBLICATION PARTNER */}
      <section className="py-16 sm:py-20">
        <Container>
          <div className="grid lg:grid-cols-2 gap-6">
            <motion.div {...reveal} className="bg-surface rounded-xl p-6 sm:p-8 shadow-card">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2.5">
                  <Icon name="CalendarDays" className="w-5 h-5 text-secondary" />
                  <h3 className="text-lg font-semibold text-heading">Important Dates</h3>
                </div>
                <PrimaryButton to="/call-for-papers" variant="outlineDark" className="!px-4 !py-2 text-xs">
                  View All Dates
                </PrimaryButton>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {homeImportantDates.map((d) => (
                  <div key={d.label} className="text-center flex flex-col items-center gap-2">
                    <Icon name={d.icon} className="w-6 h-6 text-secondary" />
                    <p className="font-semibold text-heading text-sm">{d.date}</p>
                    <p className="text-xs text-muted leading-snug">{d.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div {...revealStagger(0.1)} className="bg-surface rounded-xl p-6 sm:p-8 shadow-card">
              <div className="flex items-center gap-2.5 mb-5">
                <Icon name="BookOpen" className="w-5 h-5 text-secondary" />
                <h3 className="text-lg font-semibold text-heading">Publication Partner</h3>
              </div>
              <div className="flex gap-5">
                <img
                  src="/images/journal-cover.jpg"
                  alt="Journal of Entomological Research cover"
                  loading="lazy"
                  className="w-24 h-32 object-cover rounded-md shrink-0 shadow-card"
                />
                <div>
                  <p className="font-semibold text-heading">{mainJournal.title}</p>
                  <span className="inline-block bg-secondary/10 text-secondary text-xs font-semibold px-2.5 py-1 rounded mt-1.5">
                    Scopus Indexed
                  </span>
                  <p className="text-sm text-body mt-2.5 leading-relaxed">
                    Selected high-quality papers will be recommended for publication in the Journal of
                    Entomological Research and other reputed Scopus indexed journals.
                  </p>
                  <Link to="/publication" className="inline-flex items-center gap-1.5 text-sm font-medium text-secondary mt-2.5 hover:underline">
                    Learn more about publication <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      <div className="pb-16 sm:pb-20">
        <CtaBanner
          image="/images/cta-ladybug.jpg"
          imageAlt="Ladybug on a green leaf"
          title="Be a part of advancing entomological science and building a sustainable future."
          buttonText="Submit Your Paper Today"
          buttonTo="/submit-paper"
        />
      </div>
    </>
  );
}
