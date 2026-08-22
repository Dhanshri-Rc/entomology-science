import { motion } from "framer-motion";
import PageHero from "../components/PageHero";
import Container from "../components/Container";
import SectionTitle from "../components/SectionTitle";
import CtaBanner from "../components/CtaBanner";
import Icon from "../components/Icon";
import { reveal, revealStagger } from "../lib/motion";
import { topicsFocusAreas } from "../data/siteData";

export default function AimScope() {
  const half = Math.ceil(topicsFocusAreas.length / 2);
  const colOne = topicsFocusAreas.slice(0, half);
  const colTwo = topicsFocusAreas.slice(half);

  return (
    <>
      <PageHero
        breadcrumb={[{ label: "Home", path: "/" }, { label: "Aims & Scope" }]}
        title="Aims & Scope"
        subtitle="Advancing knowledge. Inspiring innovation. Building a sustainable future through entomology."
        description="Our aim is to bring together researchers, academicians, students, and industry professionals to exchange knowledge and explore cutting-edge advancements in entomological science and its real-world applications."
        image="/images/hero-aimscope-butterfly.jpg"
        imageAlt="Monarch butterfly perched on a white daisy"
      />

      <section className="py-16 sm:py-20">
        <Container>
          <div className="grid sm:grid-cols-2 gap-6">
            <motion.div {...reveal} className="bg-surface rounded-xl p-7 sm:p-8 shadow-card relative overflow-hidden">
              <span className="w-14 h-14 rounded-full bg-primary text-white flex items-center justify-center mb-5">
                <Icon name="Target" className="w-7 h-7" />
              </span>
              <h3 className="text-xl font-semibold text-heading">Our Aim</h3>
              <span className="block h-[3px] w-10 bg-secondary rounded-full my-3" />
              <p className="text-body leading-relaxed">
                To promote and advance entomological research, education, and innovation by providing a
                global platform for the dissemination of knowledge and fostering collaborations that
                address challenges related to insects, ecosystems, and human well-being.
              </p>
            </motion.div>

            <motion.div {...revealStagger(0.1)} className="bg-surface rounded-xl p-7 sm:p-8 shadow-card relative overflow-hidden">
              <span className="w-14 h-14 rounded-full bg-primary text-white flex items-center justify-center mb-5">
                <Icon name="Binoculars" className="w-7 h-7" />
              </span>
              <h3 className="text-xl font-semibold text-heading">Our Scope</h3>
              <span className="block h-[3px] w-10 bg-secondary rounded-full my-3" />
              <p className="text-body leading-relaxed">
                The conference encompasses a wide range of themes in entomology, from fundamental
                research to applied solutions. We welcome original research, reviews, case studies, and
                innovative ideas that contribute to the sustainable management of insect-related
                challenges.
              </p>
            </motion.div>
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-20 bg-surface">
        <Container>
          <SectionTitle title="Topics & Focus Areas" align="center" ornament className="mb-3" />
          <p className="text-center text-body max-w-2xl mx-auto mb-10">
            We invite submissions that align with, but are not limited to, the following key areas:
          </p>
          <div className="grid lg:grid-cols-2 gap-x-8 bg-white rounded-xl shadow-card px-6 sm:px-8 py-4">
            {[colOne, colTwo].map((col, colIdx) => (
              <div key={colIdx} className="divide-y divide-border">
                {col.map((topic, i) => (
                  <motion.div
                    key={topic.title}
                    {...revealStagger((colIdx * half + i) * 0.05)}
                    className="flex items-start gap-4 py-5"
                  >
                    <span className="w-11 h-11 rounded-full bg-primary text-white flex items-center justify-center shrink-0">
                      <Icon name={topic.icon} className="w-5 h-5" />
                    </span>
                    <div>
                      <p className="font-semibold text-heading">{topic.title}</p>
                      <p className="text-sm text-muted mt-1 leading-relaxed">{topic.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container>
          <motion.div {...reveal} className="rounded-2xl overflow-hidden bg-surface flex flex-col sm:flex-row items-stretch shadow-card">
            <div className="sm:w-2/5 h-56 sm:h-auto overflow-hidden">
              <img
                src="/images/hero-aimscope-butterfly.jpg"
                alt="Iridescent green beetle on a leaf"
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 p-8 sm:p-10 flex items-start gap-5">
              <span className="w-14 h-14 rounded-full bg-primary text-white flex items-center justify-center shrink-0">
                <Icon name="FileEdit" className="w-6 h-6" />
              </span>
              <div>
                <h3 className="text-xl font-semibold text-heading flex items-center gap-2">
                  Interdisciplinary Contributions <Icon name="Leaf" className="w-4 h-4 text-secondary" />
                </h3>
                <p className="mt-3 text-body leading-relaxed">
                  We encourage interdisciplinary research linking entomology with agriculture,
                  environment, public health, biotechnology, data science, and social sciences to drive
                  innovative solutions for global challenges.
                </p>
              </div>
            </div>
          </motion.div>
        </Container>
      </section>

      <div className="pb-16 sm:pb-20">
        <CtaBanner
          image="/images/cta-about-caterpillar.jpg"
          imageAlt="Ladybug on a green leaf"
          title="Join us in shaping the future of entomological science and making a global impact."
          description="Be part of innovation. Be part of impact."
          buttonText="Submit Your Paper"
          buttonTo="/submit-paper"
        />
      </div>
    </>
  );
}
