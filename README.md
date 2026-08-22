# Entomology Science Association — Conference Website

A complete, responsive React website for the "International Conference on Entomology: Science for a
Sustainable Future," built to match the supplied reference screenshots.

## Tech Stack

- React 19 + Vite
- Tailwind CSS 3
- React Router DOM 7
- Framer Motion
- Lucide React (icons)

No TypeScript, no UI component libraries (Bootstrap/MUI/Chakra/Ant), no jQuery.

## Getting Started

```bash
npm install
npm run dev       # start local dev server
npm run build     # production build -> dist/
npm run preview   # preview the production build
```

## Project Structure

```
src/
├── components/       Reusable UI building blocks (Header, Navbar, MobileMenu, Footer,
│                      PageHero, Breadcrumb, SectionTitle, PrimaryButton, CtaBanner,
│                      ScrollToTop, ScrollToTopButton, Layout, Icon, Container, TopBar)
├── pages/             Home, About, AimScope, CallForPapers, Submission, Publication,
│                      Contact, SubmitPaper, NotFound
├── data/siteData.js   All site copy/content in one place (nav, topics, dates, journals, etc.)
├── lib/motion.js      Shared Framer Motion reveal animation presets
├── styles/global.css  CSS variables / design tokens + base styles
├── App.jsx            Route definitions
└── main.jsx           App entry point
```

## Routes

| Route              | Page               |
| ------------------- | ------------------ |
| `/`                  | Home                |
| `/about`             | About Conference    |
| `/aim-scope`         | Aims & Scope        |
| `/call-for-papers`   | Call for Papers     |
| `/submission`        | Submission          |
| `/publication`       | Publication         |
| `/contact`           | Contact Us          |
| `/submit-paper`      | Submit Paper (form) |

## Notes on Images

Photographic assets in `public/images/` were cropped directly from the reference screenshots
provided (clean regions free of overlaid UI text) so the site uses genuine, relevant entomology
photography rather than unrelated stock imagery. If you'd like to swap in your own licensed
photography, simply replace the files in `public/images/` — filenames are self-descriptive
(e.g. `hero-home-beetle.jpg`, `hero-submitpaper-ant.jpg`, `journal-cover.jpg`).

## Forms

- **Contact page** — client-side validated (required fields, email format, message, privacy
  policy consent). Shows a success message on submit; no backend wired up.
- **Submit Paper page** — full author/paper submission form with file upload fields, client-side
  validation, and a success confirmation message; no backend wired up.

## Design Tokens

All brand colors live as CSS variables in `src/styles/global.css` and are mirrored in
`tailwind.config.js` (`primary`, `secondary`, `accent`, `gold`, `surface`, etc.) so there are no
scattered hex codes throughout the JSX.
