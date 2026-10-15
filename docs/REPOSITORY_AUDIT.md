# Repository Audit — DEVSLAYER (actual findings, 2026-10-15)

Source: direct inspection of `C:\Users\abhij\Documents\GitHub\AbhijeetDhokne`.
Kit spec: `DEVSLAYER_OpenCode_Kit/` (untracked, not yet copied into repo root).

## 1. Git & workspace layout

- Git repo: yes. Branch `main`, tracking `origin/main` (`https://github.com/AbhijeetDhokne/AbhijeetDhokne.git`).
- Recent commits: `58eb187 update resume`, `f99bce9 Update HostelResolve live link…`, `665e149 docs: add live demo link`, `aece9b5 fix: correct vite base path…`, `9eca110 Add 404.html fallback…`.
- Working tree: clean except untracked `DEVSLAYER_OpenCode_Kit/` (the instruction kit — not app code).
- Root layout: `.git/`, `DEVSLAYER_OpenCode_Kit/`, `frontend/`. The portfolio app lives in `frontend/`, NOT repo root.

## 2. Framework / package manager

- App: **React 19.2 + Vite 8 + plain JavaScript (JSX)** — no TypeScript, no tests, no Three.js yet.
- Router: `react-router-dom` v7 (`HashRouter`, single catch-all route — effectively a one-page scroll site).
- UI libs: `framer-motion` 12, `lucide-react`, `@lottiefiles/dotlottie-react`.
- Package manager: **npm** with `package-lock.json` (206 packages). Do NOT introduce pnpm/yarn lockfiles.
- Scripts (`frontend/package.json`): `dev` (vite), `build` (`vite build` + copy `dist/index.html` → `dist/404.html`), `lint` (eslint), `preview`, `predeploy`, `deploy` (`gh-pages -d dist`).
- `node_modules` was absent; `npm ci` installed cleanly (Node v22.17.0, npm 10.9.2).

## 3. Structure & content locations (all verified by reading files)

- Entry: `frontend/index.html` → `src/main.jsx` → `src/App.jsx` (1620-line monolith: header, hero, intro, what-I-do, features, education, experience, projects, skills, achievements, contact, footer).
- Components: `src/components/{Projects,ProjectCard,Skills,Achievements,Contact,Logo}.jsx`. Content is **hard-coded inside components** (no data layer).
- Styles: `src/App.css`, `src/index.css`. Assets via `import.meta.env.BASE_URL`.
- Public assets (verified present): `public/resume/resume_1.pdf` (108 KB), 16 images in `public/images/`, 9 files in `public/certificates/` (4 PDFs + logos), `public/favicon.svg`, `logo.svg`, `icons.svg`.

## 4. Routing & deployment (risks)

1. **Base-path conflict:** `package.json` has `"homepage": "https://Abhijeet83193.github.io/Myportfolio"` but `vite.config.js` sets `base: './'`. Relative base works for both GH Pages project site and Render static hosting; the `homepage` field is effectively ignored by Vite but used by `gh-pages`. Keep `base: './'` — do not switch to `/<repo>/` without testing.
2. **Repo/hosting mismatch:** remote repo is `AbhijeetDhokne/AbhijeetDhokne` while homepage + live URLs point at `Abhijeet83193/Myportfolio` and `myportfolio-yqfv.onrender.com`. GitHub Pages project URL and Render URL imply **two deployment targets**; confirm which is canonical before changing deploy config.
3. **SPA fallback:** `build` script copies `index.html` → `404.html` for GH Pages refresh support; combined with `HashRouter` this is belt-and-braces and safe. Do not switch to `BrowserRouter` without adding rewrites.
4. **Bundle size:** production JS is **773 KB (171 KB gzip)** — over the 500 KB warning threshold. Lazy-loading the future 3D scene is mandatory.
5. **No CI, no tests, no type-check.** Only `lint` + `build` are available.

## 5. Baseline check results (real, 2026-10-15)

- `npm ci` — PASS (206 packages, 17 vulns: 1 low / 2 moderate / 14 high; no fix applied).
- `npm run build` — PASS (`✓ built in ~953ms`, `dist/index.html` 0.66 KB, CSS 17 KB, JS 773 KB + gzip warning above).
- `npm run lint` — FAIL (pre-existing, 13 errors, all unused-var/style, none introduced by this audit):
  - `App.jsx`: unused `useLocation`, `cardTransition`, `homeKey` prop in `Header`.
  - `Achievements/Contact/Logo/ProjectCard/Projects/Skills`: unused `motion` imports; `Projects.jsx` unused `sortOptions`.

## 6. Migration decision (no blind rewrite)

- The repo **already uses React + Vite**, so no framework migration is needed for Phase 1.
- It is **JS, not TypeScript**. AGENTS.md prefers TS but also says "use the existing stack if changing it would be unnecessarily risky." Decision: **stay on JS for Phase 1**; introduce typed-shape discipline via JSDoc + a `src/data/` layer now, and migrate to TS alongside the Phase 2 3D work when `three`/`@react-three/fiber` are actually added. This avoids a destructive rename of every file before the shell is stable.
- 3D deps (`three`, `@react-three/fiber`, `@react-three/drei`) are NOT installed. Install them only in Phase 2.

## 7. Reusable assets

- Keep: all `public/images/*`, `public/certificates/*`, `public/resume/resume_1.pdf`, Lucide icons, Framer Motion patterns, modal/Escape handling, GitHub-activity terminal (needs rate-limit fallback — already has one).
- Replace gradually: monolithic `App.jsx` (extract data → `src/data/`, shell → `src/mode/` + `src/components/shell/`, adventure placeholder → `src/components/adventure/`).
- Remote Lottie/CDN icons (lottie.host, jsdelivr devicons) are runtime dependencies — document and add local fallbacks in a later phase; do not hotlink new ones.

## 8. Risks & open questions

- R1 (hosting): which deploy target is canonical — `Abhijeet83193.github.io/Myportfolio`, `AbhijeetDhokne.github.io/…`, or Render? Don't change `homepage`/`base` until answered.
- R2 (content conflicts): DESIGN_SPEC resume snapshot (KV school, AI intern Jul–Aug 2026, AWS trainee Jun–Jul 2026) disagrees with repo (Govt LBS + New Sunflower schools, HostelResolve MERN experience Feb–May 2026). Repo wins per AGENTS.md; see CONTENT_AUDIT TODOs.
- R3 (payment stack): repo `Hostmate` lists **Stripe**; spec lists **Razorpay**. Owner confirmation required.
- R4 (lint): 13 pre-existing lint errors will block any strict "lint-clean" gate — fix incrementally, starting with files touched in Phase 1.
