import { Link } from "react-router-dom";
import { Mail, Phone, Globe, MapPin } from "lucide-react";
import Icon from "./Icon";
import Container from "./Container";
import { siteInfo, socialLinks, footerQuickLinks, footerResourceLinks } from "../data/siteData";

export default function Footer() {
  return (
    <footer className="bg-primary text-white/85">
      <Container className="py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <svg viewBox="0 0 48 48" className="w-10 h-10" aria-hidden="true">
                <path d="M24 6c3 5 3 9 0 12-3-3-3-7 0-12Z" fill="#9cc65a" />
                <path d="M24 42c-3-5-3-9 0-12 3 3 3 7 0 12Z" fill="#9cc65a" />
                <path d="M6 24c5-3 9-3 12 0-3 3-7 3-12 0Z" fill="#9cc65a" />
                <path d="M42 24c-5 3-9 3-12 0 3-3 7-3 12 0Z" fill="#9cc65a" />
                <circle cx="24" cy="24" r="5.5" fill="#ffffff" />
              </svg>
              <p className="font-display font-semibold text-white text-lg">{siteInfo.name}</p>
            </div>
            <p className="text-sm leading-relaxed text-white/70 max-w-xs">
              A global platform dedicated to advancing entomological research, education and sustainable
              solutions for the future.
            </p>
            <div className="flex items-center gap-3 mt-5">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-9 h-9 flex items-center justify-center rounded-full border border-white/20 hover:bg-secondary hover:border-secondary transition-colors duration-300"
                >
                  <Icon name={s.icon} className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="text-white font-semibold mb-4">Quick Links</p>
            <ul className="flex flex-col gap-2.5 text-sm">
              {footerQuickLinks.map((l) => (
                <li key={l.path}>
                  <Link to={l.path} className="hover:text-accent-light transition-colors duration-300">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-white font-semibold mb-4 opacity-0 hidden sm:block lg:hidden">&nbsp;</p>
            <p className="text-white font-semibold mb-4">Contact Us</p>
            <ul className="flex flex-col gap-3 text-sm">
              <li>
                <a href={`mailto:${siteInfo.email}`} className="flex items-center gap-2.5 hover:text-accent-light transition-colors duration-300">
                  <Mail className="w-4 h-4 shrink-0" aria-hidden="true" />
                  {siteInfo.email}
                </a>
              </li>
              <li>
                <a href={`tel:${siteInfo.phone.replace(/[^+\d]/g, "")}`} className="flex items-center gap-2.5 hover:text-accent-light transition-colors duration-300">
                  <Phone className="w-4 h-4 shrink-0" aria-hidden="true" />
                  {siteInfo.phone}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Globe className="w-4 h-4 shrink-0" aria-hidden="true" />
                {siteInfo.website}
              </li>
              <li className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 shrink-0" aria-hidden="true" />
                {siteInfo.addressShort}
              </li>
            </ul>
          </div>

          <div className="hidden lg:block">
            <p className="text-white font-semibold mb-4">Resources</p>
            <ul className="flex flex-col gap-2.5 text-sm">
              {footerResourceLinks.map((l) => (
                <li key={l.path}>
                  <Link to={l.path} className="hover:text-accent-light transition-colors duration-300">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/60">
          <p>&copy; 2025 {siteInfo.name}. All Rights Reserved.</p>
          <div className="flex items-center gap-4">
            <Link to="/privacy-policy" className="hover:text-accent-light transition-colors duration-300">
              Privacy Policy
            </Link>
            <span className="w-px h-3 bg-white/20" />
            <Link to="/terms" className="hover:text-accent-light transition-colors duration-300">
              Terms &amp; Conditions
            </Link>
          </div>
        </Container>
      </div>
    </footer>
  );
}
