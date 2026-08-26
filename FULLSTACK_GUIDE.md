# Full-Stack MERN Conversion Guide

This document covers the new Node.js/Express/MongoDB backend and admin system
added on top of the existing frontend (see `README.md` for the original
frontend-only docs). **The existing UI, layout, colors, and animations were not
redesigned** — only form submit handlers were connected to real API calls, and
new admin-only pages were added using the same visual theme.

---

## 1. Project Structure

```
entomo/                       (repo root - your existing frontend)
├── src/                      (existing frontend - UI untouched)
│   ├── lib/api.js                       ← NEW: fetch client
│   ├── context/AuthContext.jsx          ← NEW: admin session state
│   ├── context/SiteSettingsContext.jsx  ← NEW: live contact/social info
│   ├── components/SEO.jsx               ← NEW: reusable SEO component
│   ├── components/admin/AdminLayout.jsx          ← NEW
│   ├── components/admin/AdminProtectedRoute.jsx  ← NEW
│   ├── pages/admin/AdminLogin.jsx        ← NEW
│   ├── pages/admin/AdminDashboard.jsx    ← NEW
│   ├── pages/admin/AdminSubmissions.jsx  ← NEW
│   ├── pages/admin/AdminInquiries.jsx    ← NEW
│   ├── pages/admin/AdminSettings.jsx     ← NEW
│   ├── pages/SubmitPaper.jsx             ← EDITED (backend wiring only)
│   ├── pages/Contact.jsx                 ← EDITED (backend wiring only)
│   ├── components/Footer.jsx             ← EDITED (reads live settings)
│   ├── App.jsx                           ← EDITED (added admin routes)
│   └── main.jsx                          ← EDITED (added HelmetProvider)
├── public/
│   ├── robots.txt             ← NEW
│   └── sitemap.xml            ← NEW
├── .env.example                ← NEW (frontend)
└── backend/                    ← NEW: entire Express/MongoDB API
    ├── config/       (db.js, env.js, gridfs.js)
    ├── controllers/  (auth, submission, inquiry, settings, dashboard)
    ├── middleware/   (auth, admin, upload, rateLimiter, errorHandler)
    ├── models/       (Admin, PaperSubmission, Inquiry, SiteSettings)
    ├── routes/       (authRoutes, submissionRoutes, inquiryRoutes, settingsRoutes, dashboardRoutes)
    ├── scripts/seedAdmin.js
    ├── server.js
    ├── package.json
    └── .env.example
```

---

## 2. Prerequisites

- Node.js 18+
- A MongoDB database — either local `mongod` or a free **MongoDB Atlas** cluster.

---

## 3. Backend Setup

```bash
cd backend
npm install
cp .env.example .env
```

Edit `backend/.env`:

```
NODE_ENV=development
PORT=5000

MONGODB_URI=mongodb://127.0.0.1:27017/entomology
# or an Atlas URI, see section 6 below

JWT_SECRET=your-long-random-secret
JWT_EXPIRES_IN=1d
JWT_COOKIE_NAME=entomo_admin_token

CLIENT_URL=http://localhost:5173

ADMIN_NAME=Administrator
ADMIN_EMAIL=admin@entomologyscience.org
ADMIN_PASSWORD=ChangeThisPassword123!
```

Generate a strong JWT secret:

```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

Seed the initial admin account (safe to re-run — it skips creation if an admin
with that email already exists, so it never creates duplicates):

```bash
npm run seed:admin
```

Start the API:

```bash
npm run dev      # auto-restart on changes (Node's built-in --watch)
# or
npm start
```

The API will be available at `http://localhost:5000/api`.
Health check: `GET http://localhost:5000/api/health`

---

## 4. Frontend Setup

From the project root (not `backend/`):

```bash
npm install
cp .env.example .env
```

Edit `.env`:

```
VITE_API_BASE_URL=http://localhost:5000/api
```

Run the frontend:

```bash
npm run dev
```

Visit:
- Public site: `http://localhost:5173/`
- Admin login: `http://localhost:5173/admin/login`

Log in with the `ADMIN_EMAIL` / `ADMIN_PASSWORD` you set in `backend/.env`.
**Change the password immediately after first login** (re-seed with a new
`ADMIN_PASSWORD` against a fresh database, or add a password-change endpoint
later if you want in-app rotation).

---

## 5. What Got Connected

### Submit Paper (`/submit-paper`)
- Same fields, same UI. `handleSubmit` now builds a `FormData` payload and posts
  to `POST /api/submissions` (multipart, with the manuscript + optional cover
  letter).
- Shows **"Submitting..."** on the button and disables both Submit and Save
  Draft while the request is in flight.
- The success banner now includes the real generated Submission ID
  (e.g. `ESA-2026-000001`) returned by the server.
- The form and localStorage draft are only cleared **after** the backend
  confirms success. On failure, a themed inline error banner appears and the
  form is preserved so nothing is lost.

### Contact (`/contact`)
- Same fields, same UI. `handleSubmit` posts to `POST /api/inquiries`.
- Button shows **"Sending..."** and disables while submitting.
- Form only resets after a confirmed success response.
- Inline error banner on failure (network/validation/server errors).

### Footer & Contact page contact details
- `Footer.jsx` and `Contact.jsx` now pull `siteInfo` from `SiteSettingsContext`,
  which fetches `GET /api/settings` once on load.
- If the API is unreachable, the context silently falls back to the exact same
  static values that were already in `siteData.js` — the public site never
  breaks.
- Editing values in **Admin → Site / Contact Details** updates the database and
  the Footer/Contact page reflect the change on next load (the context also
  exposes a `refresh()` used by the admin settings page after a save).

### Admin area
- `/admin/login` — themed login page, JWT stored in an HTTP-only cookie.
- `/admin/dashboard` — summary cards (total/new submissions, total/new
  inquiries) + recent activity lists.
- `/admin/submissions` — search, status filter, pagination, view modal with
  full submission detail, status changes, manuscript/cover-letter download
  links, delete with confirmation modal. Responsive: table on desktop, cards
  on mobile.
- `/admin/inquiries` — same pattern: search, filter, pagination, view modal,
  mark as read/resolved, delete with confirmation.
- `/admin/settings` — edit organization name, email, phone, website, address,
  and social links. "Reset to Defaults" restores the documented default
  values without ever deleting the settings record (no destructive delete
  anywhere).

All `/admin/*` routes are guarded by `AdminProtectedRoute`, which redirects to
`/admin/login` if there is no valid session, and all admin API routes require
a valid JWT + `admin`/`superadmin` role server-side (`protect` +
`requireAdmin`).

---

## 6. MongoDB Atlas Setup (Production)

1. Create a free cluster at https://www.mongodb.com/cloud/atlas.
2. **Database Access** → Add a database user (username/password, "Read and
   write to any database" or scoped to your DB).
3. **Network Access** → Add your server's IP, or `0.0.0.0/0` while testing
   (lock this down for production).
4. **Connect** → "Drivers" → copy the connection string, e.g.:
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/entomology?retryWrites=true&w=majority
   ```
5. Put that string in `backend/.env` as `MONGODB_URI`. Uploaded manuscript/cover
   letter files are stored via **GridFS inside this same MongoDB database**, so
   they persist across redeploys — no separate file storage service is
   required.

---

## 7. Development Testing Checklist

- [ ] `GET /api/health` returns `{ success: true }`
- [ ] Submit a test paper from `/submit-paper` with a real PDF — check it
      appears in `/admin/submissions`
- [ ] Download the manuscript from the admin submission modal
- [ ] Delete a test submission — confirm the GridFS file is gone too (check via
      `db.submissionFiles.files.find()` in `mongosh`)
- [ ] Submit the Contact form — check it appears in `/admin/inquiries`
- [ ] Log out, try visiting `/admin/dashboard` directly — should redirect to
      `/admin/login`
- [ ] Edit Site Settings, save, reload the public Contact page and Footer — new
      values should appear
- [ ] Confirm rate limiting: hammering `/api/auth/login` with wrong passwords
      should eventually return 429

---

## 8. Production Deployment

**Backend** (e.g. Render, Railway, Fly.io, or a VPS with PM2):
1. Set all variables from `backend/.env.example` in your host's environment
   variable settings — never commit `.env`.
2. Set `NODE_ENV=production` and a real `CLIENT_URL` (your deployed frontend
   domain, comma-separated if you need more than one, e.g.
   `https://www.entomologyscience.org,https://entomologyscience.org`).
3. Run `npm run seed:admin` once (via a one-off job/console) to create the
   first admin account.
4. Start with `npm start`.
5. Put the API behind HTTPS (via your host or a reverse proxy) — the auth
   cookie is `secure: true` in production and requires HTTPS to be sent by
   browsers.

**Frontend** (e.g. Vercel, Netlify, or a static host):
1. Set `VITE_API_BASE_URL=https://your-api-domain.com/api` in the host's build
   environment variables.
2. `npm run build` → deploy the `dist/` folder.
3. Update `public/sitemap.xml` and `SITE_URL` in `src/components/SEO.jsx` if
   your final production domain differs from
   `https://www.entomologyscience.org`.

**CORS**: the backend only allows origins listed in `CLIENT_URL`. If the
frontend and backend are on different domains, make sure `CLIENT_URL` exactly
matches the deployed frontend origin (protocol + domain, no trailing slash).

---

## 9. Security Notes

- Passwords are hashed with bcrypt (12 rounds), never returned in any API
  response.
- JWT is stored in an HTTP-only cookie (`secure` + `sameSite=none` in
  production, `sameSite=lax` in development).
- `helmet`, `express-mongo-sanitize`, and route-specific rate limiters
  (login / submission / inquiry / general) are all active.
- File uploads are validated by extension **and** MIME type, capped at 10MB
  (manuscript) / 5MB (cover letter), and stored in MongoDB GridFS — never on
  local disk — so nothing is lost on redeploy.
- All admin routes require both a valid JWT (`protect`) and an admin role
  (`requireAdmin`).
- MongoDB ObjectIds are validated before every query that uses `:id`.
- Centralized error handler never leaks stack traces in production.
- Deleting a submission also deletes its GridFS manuscript/cover-letter files
  — no orphaned files are left behind.
- The Site Settings document can never be deleted; the UI only ever offers
  "Reset to Defaults."

---

## 10. Full API Reference

**Public**
```
POST /api/auth/login
POST /api/auth/logout
GET  /api/auth/me

GET  /api/settings

POST /api/submissions        (multipart/form-data)
POST /api/inquiries
```

**Admin (JWT cookie + admin role required)**
```
GET    /api/admin/dashboard

GET    /api/admin/submissions
GET    /api/admin/submissions/:id
PATCH  /api/admin/submissions/:id/status
DELETE /api/admin/submissions/:id
GET    /api/admin/submissions/:id/manuscript
GET    /api/admin/submissions/:id/cover-letter

GET    /api/admin/inquiries
GET    /api/admin/inquiries/:id
PATCH  /api/admin/inquiries/:id
DELETE /api/admin/inquiries/:id

GET    /api/admin/settings
PUT    /api/admin/settings
POST   /api/admin/settings/reset
```

---

## 11. Verified Before Delivery

- `npm run build` (frontend) completes successfully with no errors.
- All backend files pass `node --check` and all four Mongoose models register
  without error.
- No hard-coded `localhost` URLs remain outside of the documented
  `.env.example` development defaults.
