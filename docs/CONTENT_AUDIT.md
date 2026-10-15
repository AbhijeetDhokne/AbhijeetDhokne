# Content Audit — DEVSLAYER (verified from repo files, 2026-10-15)

Rule: repo files + `public/resume/resume_1.pdf` are truth. DESIGN_SPEC snapshot is secondary.
Nothing below is invented. Items that could not be verified are marked TODO.

## 1. Profile (verified in `frontend/src/App.jsx` Intro + Contact)

- Name: **Abhijeet Dhokne** (header, intro H1, contact card).
- Positioning: "Full Stack Web Developer" / "Computer Science student… React, Node.js, MongoDB".
- Location: **RAU, Indore, Madhya Pradesh, India** (Contact; map iframe `q=RAU,+Indore`).
- Email: **abhijeetdhokne1474@gmail.com** (Gmail compose link). Verified string in Contact.jsx.
- Phone: **+91 8319391214** (plain div, not a `tel:` link — TODO: owner to confirm publishing; spec shows `+91 83193 91214`, same digits).
- Resume: **`public/resume/resume_1.pdf` exists (108 KB)**; linked as `${BASE}resume/resume_1.pdf` in Intro. Working local path — keep.
- Hero alias "GOJO 👋" + tagline "Loading awesome experiences..." — playful, not a legal-name claim; keep but ensure real name is adjacent (it is, in Intro H1).

## 2. Socials (verified strings in App.jsx / Contact.jsx)

| Label | URL in repo | Status |
|---|---|---|
| GitHub | `https://github.com/Abhijeet83193` | VERIFIED (also live commit terminal uses user `Abhijeet83193`) |
| LinkedIn | `https://www.linkedin.com/in/abhijeet-dhokne-8644a32b3/` | VERIFIED string (click-through not tested here) |
| X | `https://x.com/Abhijeet_Dhokne` | VERIFIED string |
| Google | `https://www.google.com` | PLACEHOLDER — TODO: replace with real portfolio/Google-Scholar/dev.to URL or remove |
| Gmail compose | `https://mail.google.com/mail/?view=cm&fs=1&to=abhijeetdhokne1474@gmail.com` | VERIFIED pattern |

## 3. Projects (verified in `frontend/src/components/Projects.jsx`)

All six use `${BASE}images/*.jpg` thumbnails (files confirmed present).

| # | Title | Live | Code | Stack in repo | Notes |
|---|---|---|---|---|---|
| 1 | Spotify Clone (2024) | `https://abhijeet83193.github.io/Spotify-Clone/` | `…/Spotify-Clone` | HTML, CSS | practice clone, keep |
| 2 | FramePro (2024) | `https://abhijeet83193.github.io/FramePro/` | `…/FramePro` | HTML, CSS | keep |
| 3 | WeatherApp (2025) | `https://weatherapp-7d1e.onrender.com` | `…/WeatherApp` | React, JS, HTML, CSS, OpenWeather API | keep |
| 4 | **Hostmate** (2025, Full Stack) | `https://hostmate-6org.onrender.com/` | `…/Hostmate` | Node, Express, MongoDB, JS, HTML, CSS, **Stripe**, Cloudinary, OpenStreetMap | ⚠️ spec says **Razorpay**, repo says **Stripe** — TODO owner confirm; do not render either as fact until confirmed. Description matches spec (listings, booking, payments, maps). |
| 5 | **HostelResolve** (2026, MERN) | `https://hostelresolve-frontend.onrender.com/` | `…/HostelResolve` | React, Node, Express, MongoDB, SMTP, Cloudinary, JS, HTML, CSS, Framer Motion | Matches spec (complaint tracking APIs, SMTP escalation). "40% transparency" claim lives in Experience section, not project card — TODO needs evidence or reword. |
| 6 | My Portfolio (2026) | `#home` (self link) | `…/Myportfolio` | React, JS, HTML, CSS, Framer Motion, Lottie, Vite, GitHub, Node, Express, Mongo | self-referential; keep with `isMe` handling |

- Link health (HTTP) NOT probed in this audit — TODO Phase 5 smoke test.
- No fabricated metrics added. `problem`/`solution`/`features` for the two mission projects will be grounded only in the descriptions above.

## 4. Skills (verified in `Skills.jsx` bento)

React, Node.js, JavaScript, Python, MongoDB, Express.js, HTML5, CSS3, Tailwind, Bootstrap, Java, MySQL, Git & GitHub, AWS, VS Code, Postman — all with devicon/local icons + category filters. Display as **areas, no proficiency %** (correct per spec). DESIGN_SPEC additionally lists SQL, Spring Boot, REST, JWT, MVC, Docker, Jenkins, Kubernetes, CI/CD, Linux, Postman, OOP/DBMS/OS/Networks — TODO: only add tools actually evidenced (repo shows GitHub Actions? not confirmed — omit).

## 5. Education (verified in App.jsx `Education`)

- **B.Tech CSE, Medicaps University, Indore — 2023–2027, CGPA 7.55**, coursework: DSA, Web Dev, DBMS, OS, OOP, Networks. Logo `medicaps-logo-fin-…png` present.
- **Govt LBS Hindi H S School, Pandhurna, Chhindwara — 2018–2023, Grade A+, PCM**; music-group district performances.
- **New Sunflower English Medium School, Pandhurna — 2009–2017, Grade O**; sports/drama/dance.
- ⚠️ Spec snapshot says "PM SHRI Kendriya Vidyalaya, Pandhurna" — **contradicted by repo**. Keep repo schools; TODO owner to confirm.

## 6. Experience (verified in App.jsx `Experience`)

- **MERN Stack Developer, Medicaps University — Feb 2026–May 2026, 2-member team**: HostelResolve — REST APIs (Node/Express), SMTP escalation, React UI. Bullets include "40% increase in transparency" — TODO: unverified metric, reword to "digitized complaint workflows" unless evidence supplied.
- ⚠️ Spec snapshot lists **AI Software Development intern (Jul–Aug 2026)** + **AWS Cloud trainee (Jun–Jul 2026)** — **not present in repo**. TODO owner: add only with confirmation/resume PDF match.

## 7. Achievements (verified in Achievements.jsx, files present)

- Coding: LeetCode `Avdx23e`, CodeChef `abhi_14avd`, Codeforces `abhi_14avd` (URLs as coded).
- Certificates (local PDFs in `public/certificates/`): Python 3.4.3 IIT Bombay (70%, Nov 2025), Anthropic AI Fluency `b3axfxve3ji7` (Mar 2026), DSA in Java Apna College (Jun 2024), Full Stack MERN Apna College (Jan 2026).

## 8. Owner decisions applied (Phase 2, 2026-10-15)

1. Hostmate payments: **Razorpay** (`src/data/projects.js`). Stripe removed; no new claims beyond the spec's webhook-verification wording.
2. Phone: **removed from public UI** (`Contact.jsx` phone card deleted, `src/data/profile.js` documents privacy). Contact = email + LinkedIn/GitHub.
3. Deployment: **unchanged** — `base: './'`, HashRouter, 404 fallback, `gh-pages` script all preserved. Canonical target still to be confirmed (see R1 in REPOSITORY_AUDIT).
4. Experience: **AI Software Development Intern (PM SHRI KV Pandhurna, Jul–Aug 2026)** and **AWS Cloud Computing Trainee (Medicaps, Jun–Jul 2026)** added from resume snapshot (`src/data/experience.js`); Experience section now renders all three from data. The unverified "40% transparency" metric was reworded to metric-free language.
5. npm audit: **no fix applied**. 14 high advisories are confined to the dev/build toolchain (Vite dev-server file-read/traversal, Babel, source-map-js, js-yaml, browserslist, brace-expansion), the `gh-pages` deploy chain (`braces`, fixable only with `--force` + gh-pages downgrade to 6.1.1 — breaking, not recommended), and react-router RSC/SSR paths (app is a static HashRouter SPA — not exploitable). Safe plan: schedule a non-force `npm audit fix` with a full build + smoke test in Phase 5, never `--force`.

## 9. TODOs for owner (no public broken buttons until resolved)

1. Confirm canonical deploy target (GH Pages repo vs Render) — blocks `homepage`/`base` cleanup.
2. Hostmate payments: Stripe or Razorpay?
3. "40% transparency" evidence or reword.
4. "Google" social link — real destination or remove?
5. Phone display consent (`+91 8319391214`).
6. Spec-only experience (AI intern, AWS trainee) — add with evidence or omit.
7. School naming (KV vs Govt LBS / New Sunflower).
8. Link smoke test (all live/demo URLs) — scheduled Phase 5.
