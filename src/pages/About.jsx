import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  Globe2,
  GraduationCap,
  Handshake,
  Leaf,
  Lightbulb,
  MapPin,
  Presentation,
  ShieldCheck,
  Sprout,
  UsersRound,
} from "lucide-react";
import aboutBg from "../assets/img/aboutBg.png";
import aboutCtaBg from "../assets/img/aboutCta2.png";

const glanceItems = [
  { icon: UsersRound, value: "300+", label: "Researchers" },
  { icon: Presentation, value: "50+", label: "Expert Speakers" },
  { icon: Globe2, value: "20+", label: "Countries" },
  { icon: BookOpen, value: "Scopus", label: "Indexed Journals" },
  { icon: Handshake, value: "Collaborative", label: "Opportunities" },
  { icon: Leaf, value: "High Impact", label: "Research" },
];

const coreValues = [
  {
    icon: Lightbulb,
    title: "Excellence",
    description: "Promoting high-quality research and innovation.",
  },
  {
    icon: UsersRound,
    title: "Collaboration",
    description: "Building global partnerships and knowledge exchange.",
  },
  {
    icon: Sprout,
    title: "Sustainability",
    description: "Advancing solutions for a sustainable tomorrow.",
  },
  {
    icon: ShieldCheck,
    title: "Integrity",
    description: "Upholding transparency, ethics, and professionalism.",
  },
  {
    icon: GraduationCap,
    title: "Inspiration",
    description: "Nurturing young minds and future leaders.",
  },
];

const committee = [
  {
    name: "Dr. Alan Rodriguez",
    role: "Conference Chair",
    image: "https://i.pravatar.cc/240?img=12",
  },
  {
    name: "Dr. Meera Krishnan",
    role: "Co-Chair",
    image: "https://i.pravatar.cc/240?img=47",
  },
  {
    name: "Dr. Wei Zhang",
    role: "Program Chair",
    image: "https://i.pravatar.cc/240?img=11",
  },
  {
    name: "Dr. Aisha Karim",
    role: "Publication Chair",
    image: "https://i.pravatar.cc/240?img=44",
  },
  {
    name: "Dr. James Peterson",
    role: "Finance Chair",
    image: "https://i.pravatar.cc/240?img=13",
  },
];

const pastEditions = [
  {
    year: "2024",
    city: "Singapore",
    country: "Singapore",
    image:
      "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=700&q=85",
  },
  {
    year: "2023",
    city: "Prague",
    country: "Czech Republic",
    image:
      "https://images.unsplash.com/photo-1541849546-216549ae216d?auto=format&fit=crop&w=700&q=85",
  },
  {
    year: "2022",
    city: "Rome",
    country: "Italy",
    image:
      "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=700&q=85",
  },
  {
    year: "2021",
    city: "Kyoto",
    country: "Japan",
    image:
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=700&q=85",
  },
  {
    year: "2020",
    city: "Melbourne",
    country: "Australia",
    image:
      "https://images.unsplash.com/photo-1514395462725-fb4566210144?auto=format&fit=crop&w=700&q=85",
  },
];

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.18 },
  transition: { duration: 0.55, ease: "easeOut" },
};

function SectionHeading({ children }) {
  return (
    <div className="mb-7 flex items-center justify-center gap-3 sm:gap-4">
      <span className="h-px w-10 bg-[#87a77a] sm:w-14" />
      <h2 className="whitespace-nowrap text-center text-[20px] font-[550] text-[#153c1c] sm:text-[21px]">
        {children}
      </h2>
      <span className="h-px w-10 bg-[#87a77a] sm:w-14" />
    </div>
  );
}

function OutlineButton({ to, children }) {
  return (
    <Link
      to={to}
      className="group inline-flex min-h-9 items-center justify-center gap-3 rounded-[4px] border border-[#2d6429] bg-white px-4 py-2 text-[12px] font-[550] text-[#173b1c] transition duration-300 hover:-translate-y-0.5 hover:bg-[#23551d] hover:text-white hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#8ebd4e] focus:ring-offset-2 sm:text-[13px]"
    >
      {children}
      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
    </Link>
  );
}

export default function About() {
  return (
    <main className="overflow-hidden bg-white font-sans text-[#202820]">
      {/* Hero section */}
      <section
        className="relative isolate flex min-h-[360px] items-center bg-cover bg-[position:66%_center] sm:min-h-[380px] md:min-h-[400px] md:bg-center"
        style={{ backgroundImage: `url(${aboutBg})` }}
      >
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#092416]/95 via-[#0b2d19]/82 to-[#0b2d19]/5 sm:via-[#0b2d19]/68 md:to-transparent" />

        <div className="mx-auto w-full max-w-[1170px] px-4 py-5 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, x: -28 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.65, ease: "easeOut" }}
            className="max-w-[545px] text-white"
          >
            <nav
              aria-label="Breadcrumb"
              className="mb-5 mt-20 sm:mt-18 lg:mt-20 flex items-center gap-2 text-[13px] sm:text-[12px]"
            >
              <Link to="/" className="transition hover:text-[#b9db74]">
                Home
              </Link>
              <span aria-hidden="true" className="text-white/70">
                ›
              </span>
              <span className="font-medium">About the Conference</span>
            </nav>

            <h1 className="text-[34px] text-white font-[600] leading-tight tracking-[-0.02em] lg:text-[36px] sm:text-[36px]">
              About the Conference
            </h1>

            <div className="my-2 flex items-center gap-2.5 text-[#9bc957]">
              <span className="h-px w-16 bg-[#6e923e]" />
              <Leaf className="h-4 w-4 fill-current" />
              <span className="h-px w-16 bg-[#6e923e]" />
            </div>

            <p className="max-w-[440px] text-[15px] font-[550] leading-6 text-[#a9d563] sm:text-[16px] sm:leading-6">
              Exploring. Understanding. Preserving.
              <br />
              Insects, Ecosystems, and Our Future.
            </p>

            <p className="mt-4 max-w-[535px] text-[13px] leading-[1.6] text-white/95 sm:text-[14px] sm:leading-[1.6]">
              The International Conference on Entomology brings together
              researchers, academicians, and industry professionals to exchange
              knowledge, share innovations, and discuss the latest advancements
              in entomological science and its real-world applications.
            </p>
          </motion.div>
        </div>
      </section>

      {/* About and conference glance */}
      <section className="py-8 sm:py-9">
        <div className="mx-auto max-w-[1170px] px-4 sm:px-6 lg:px-8">
          <div className="grid items-start gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:gap-12">
            <motion.article {...fadeUp}>
              <div className="flex items-center gap-3">
                <Leaf className="h-5 w-5 fill-[#2f6b28] text-[#2f6b28]" />
                <h2 className="text-[20px] font-[550] text-[#173b1c] sm:text-[21px]">
                  About the Conference
                </h2>
              </div>

              <div className="mt-4 space-y-3 text-[13px] leading-[1.7] text-[#252b25]">
                <p>
                  Entomology is central to understanding biodiversity, ensuring
                  food security, protecting public health, and maintaining
                  ecological balance.
                </p>
                <p>
                  This conference provides a global platform to present
                  cutting-edge research, foster interdisciplinary
                  collaborations, and inspire innovative solutions for a
                  sustainable future.
                </p>
                <p>
                  We welcome researchers, students, academicians, and industry
                  professionals to join us in advancing entomological science
                  and creating a positive impact on people and the planet.
                </p>
              </div>
            </motion.article>

            <motion.aside
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: 0.08 }}
              className="rounded-xl border border-[#e3e7df] bg-[#f7f8f5] px-5 py-5 shadow-[0_8px_24px_rgba(24,59,28,0.05)] sm:px-6"
            >
              <h2 className="mb-4 text-[18px] font-semibold text-[#173b1c]">
                Conference at a Glance
              </h2>

              <div className="grid grid-cols-2 sm:grid-cols-3">
                {glanceItems.map(({ icon: ItemIcon, value, label }, index) => (
                  <motion.div
                    key={label}
                    whileHover={{ y: -3 }}
                    className={`flex min-h-[88px] items-center gap-3 px-2 py-4 sm:px-3 ${
                      index % 3 !== 0
                        ? "sm:border-l sm:border-dotted sm:border-[#cbd2c6]"
                        : ""
                    } ${index >= 3 ? "border-t border-dotted border-[#cbd2c6]" : ""} ${
                      index % 2 !== 0
                        ? "max-sm:border-l max-sm:border-dotted max-sm:border-[#cbd2c6]"
                        : ""
                    } ${index >= 2 ? "max-sm:border-t max-sm:border-dotted max-sm:border-[#cbd2c6]" : ""}`}
                  >
                    <ItemIcon className="h-8 w-8 shrink-0 stroke-[1.7] text-[#326a28]" />
                    <div>
                      <p className="text-[15px] font-semibold leading-tight text-[#17291a] sm:text-[16px]">
                        {value}
                      </p>
                      <p className="mt-1 text-[12px] leading-tight text-[#303630]">
                        {label}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.aside>
          </div>

          {/* Core values */}
          <motion.div {...fadeUp} className="mt-7 sm:mt-8">
            <SectionHeading>Our Core Values</SectionHeading>
            <div className="grid grid-cols-2 gap-y-8 sm:grid-cols-3 lg:grid-cols-5 lg:gap-0">
              {coreValues.map(
                ({ icon: ValueIcon, title, description }, index) => (
                  <motion.div
                    key={title}
                    whileHover={{ y: -5 }}
                    className={`group px-3 text-center sm:px-5 ${
                      index > 0 ? "lg:border-l lg:border-[#e0e4dc]" : ""
                    } ${index === coreValues.length - 1 ? "max-sm:col-span-2" : ""}`}
                  >
                    <div className="mx-auto flex h-[62px] w-[62px] items-center justify-center rounded-full bg-[#eff2eb] text-[#326a28] transition duration-300 group-hover:bg-[#326a28] group-hover:text-white group-hover:shadow-lg">
                      <ValueIcon className="h-8 w-8 stroke-[1.6]" />
                    </div>
                    <h3 className="mt-2.5 text-[15px] font-[550] text-[#173b1c]">
                      {title}
                    </h3>
                    <p className="mx-auto mt-1 max-w-[175px] text-[12px] leading-[1.55] text-[#343934]">
                      {description}
                    </p>
                  </motion.div>
                ),
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Organizing committee */}
      <section className="pb-8 sm:pb-10">
        <div className="mx-auto max-w-[1170px] px-4 sm:px-6 lg:px-8">
          <motion.div
            {...fadeUp}
            className="rounded-xl border border-[#e5e8e1] bg-[#f5f6f3] px-4 py-4 shadow-[0_8px_24px_rgba(24,59,28,0.04)] sm:px-7"
          >
            <h2 className="text-center text-[20px] font-[550] text-[#173b1c] sm:text-[21px]">
              Organizing Committee
            </h2>

            <div className="mt-3 grid grid-cols-2 gap-y-6 sm:grid-cols-3 lg:grid-cols-5 lg:gap-y-0">
              {committee.map((member, index) => (
                <motion.article
                  key={member.name}
                  whileHover={{ y: -5 }}
                  className={`group px-2 text-center sm:px-4 ${
                    index > 0 ? "lg:border-l lg:border-[#d9ded5]" : ""
                  } ${index === committee.length - 1 ? "max-sm:col-span-2" : ""}`}
                >
                  <div className="mx-auto h-[78px] w-[78px] overflow-hidden rounded-full border-[3px] border-white bg-[#e3e7df] shadow-md">
                    <img
                      src={member.image}
                      alt={`${member.name}, ${member.role}`}
                      loading="lazy"
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                    />
                  </div>
                  <h3 className="mt-2.5 text-[13px] font-semibold text-[#2d6429] sm:text-sm">
                    {member.name}
                  </h3>
                  <p className="mt-0.5 text-[11px] text-[#202620] sm:text-[12px]">
                    {member.role}
                  </p>
                </motion.article>
              ))}
            </div>

            {/* <div className="mt-4 flex justify-center">
              <OutlineButton to="/contact">View Full Committee</OutlineButton>
            </div> */}
          </motion.div>
        </div>
      </section>

      {/* Past editions */}
      {/* <section className="pb-8 sm:pb-9">
        <div className="mx-auto max-w-[1170px] px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp}>
            <SectionHeading>Our Past Editions</SectionHeading>

            <div className="grid grid-cols-1 gap-5 min-[470px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
              {pastEditions.map((edition, index) => (
                <motion.article
                  key={edition.year}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: index * 0.06 }}
                  whileHover={{ y: -6 }}
                  className="group overflow-hidden rounded-lg border border-[#dce2d8] bg-white p-1.5 shadow-[0_7px_20px_rgba(20,55,26,0.05)] transition-shadow duration-300 hover:shadow-[0_13px_30px_rgba(20,55,26,0.14)]"
                >
                  <div className="relative h-[125px] overflow-hidden rounded-[5px] sm:h-[112px]">
                    <img
                      src={edition.image}
                      alt={`${edition.city} conference edition`}
                      loading="lazy"
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                    />
                    <span className="absolute left-2 top-2 rounded-[2px] bg-[#245a22] px-3 py-1 text-[11px] font-[550] text-white shadow">
                      {edition.year}
                    </span>
                  </div>
                  <div className="px-2 pb-2 pt-2">
                    <h3 className="text-[15px] font-[550] text-[#3d782c]">
                      {edition.city}
                    </h3>
                    <p className="mt-0.5 flex items-center gap-1 text-[12px] text-[#333933]">
                      <MapPin className="h-3.5 w-3.5 fill-[#326a28] text-[#326a28]" />
                      {edition.country}
                    </p>
                  </div>
                </motion.article>
              ))}
            </div>

        
          </motion.div>
        </div>
      </section> */}

      {/* CTA */}
      <section className="pb-4 sm:pb-5">
        <div className="mx-auto max-w-[1170px] px-4 sm:px-6 lg:px-8">
          <motion.div
            {...fadeUp}
            className="relative isolate overflow-hidden rounded-xl bg-[#0b351c] bg-cover bg-[position:34%_center] px-5 py-7 sm:px-8 md:min-h-[100px] md:bg-center md:py-5 lg:px-10"
            style={{ backgroundImage: `url(${aboutCtaBg})` }}
          >
            <div className="absolute inset-0 -z-10 bg-[#092d18]/40 sm:bg-gradient-to-r sm:from-transparent sm:via-[#082b17]/45 sm:to-[#082b17]/35" />

            <div className="flex min-h-[76px] flex-col items-center justify-center gap-5 text-center text-white md:ml-[29%] md:flex-row md:justify-between md:text-left">
              <div className="max-w-[510px]">
                <h2 className="text-[16px] font-[550] text-white leading-tight sm:text-[18px]">
                  Together, Let&apos;s Advance Entomological Science
                </h2>
                <p className="mt-2 text-[12px] leading-[1.55] text-white/95 sm:text-[13px]">
                  Be part of a global community working towards sustainable
                  solutions for insects, ecosystems, and humanity.
                </p>
              </div>

              <Link
                to="/submit-paper"
                className="group inline-flex shrink-0 items-center gap-3 rounded-md bg-[#6ca42d] px-5 py-3 text-[12px] font-semibold text-white shadow-lg transition duration-300 hover:-translate-y-0.5 hover:bg-[#82bb3a] focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#174221]"
              >
                Submit Your Paper Today
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
