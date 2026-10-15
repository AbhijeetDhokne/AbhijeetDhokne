# DEVSLAYER --- Design & Product Specification

## 1. Product vision

**DEVSLAYER: The Path to Code Hashira** is a developer portfolio wrapped
in a compact, cinematic, anime-inspired adventure. A visitor travels
through five destinations that represent the developer's journey:
origins, training, missions, trials, and summit.

It should feel like an intentional, polished indie adventure
environment---not a generic dashboard with a 3D background. The 3D world
adds emotion and discovery; it must never hide the actual portfolio
content.

## 2. Locked experience decisions

-   **Navigation:** cinematic click-to-travel. Clicking a landmark or
    destination moves the camera smoothly to it.
-   **Gameplay intensity:** light. Use mission cards, training
    interactions, optional collectibles, and progress flavor. Do not
    build mandatory combat, enemy AI, or a full action game in the first
    release.
-   **Portfolio access:** both immersive 3D mode and conventional
    portfolio mode.
-   **Theme:** original anime-inspired fantasy, with Japanese-inspired
    forests, mountain paths, dojo architecture, bridges, shrines, mist,
    lanterns, waterfalls, and atmospheric skies.
-   **Visual style:** stylized low-poly geometry with coherent art
    direction, cinematic composition, readable UI, restrained particles,
    and deliberate color palettes.
-   **IP safety:** inspiration is limited to the general feeling of hard
    training, missions, perseverance, and a mountain-summit journey. Do
    not reproduce Demon Slayer's characters, costumes, symbols, logos,
    exact locations, dialogue, music, or scenes.

## 3. Target audiences and UX priorities

### Recruiter / hiring manager

Must find identity, technical skills, projects, education/experience,
resume, and contact quickly. Offer a persistent menu and conventional
mode.

### Developer / curious visitor

Can explore landmarks, read mission details, discover the world, and see
implementation decisions.

### Mobile visitor

Gets touch-friendly destination selection and a lightweight scene or
automatic 2D fallback. No tiny controls, forced landscape orientation,
or hover-only interactions.

### Priority order

1.  Content correctness and direct access.
2.  Reliable navigation and graceful fallback.
3.  Strong art direction and cinematic transitions.
4.  Lightweight game-like extras.
5.  Optional polish.

## 4. Information architecture / five destinations

### Destination 1 --- ORIGINS ARC: Forest Village

**Purpose:** first impression, identity, short intro. **Environment:**
peaceful forest entrance, stone path, torii-inspired gate, lanterns,
shrine, distant mountains. **Content:** name, concise developer
positioning, B.E. Computer Science Engineering at Medicaps University,
current learning/development focus if verified. **Actions:** Start
Journey, Explore Projects, View Resume, Switch to Portfolio Mode.
**Interaction:** arrival camera pose, subtle environmental motion, short
skippable intro.

### Destination 2 --- TRAINING ARC: Mountain Dojo

**Purpose:** technical skills and learning. **Environment:** mountain
dojo, waterfall, stepping stones, training platforms, scrolls, practice
area. **Content categories, based on resume:** - Programming: Java,
JavaScript, SQL. - Core CS: Data Structures & Algorithms, OOP, DBMS,
Operating Systems, Computer Networks. - Frontend: HTML, CSS, React.js,
Bootstrap, Tailwind CSS. - Backend: Node.js, Express.js, Spring Boot,
REST APIs, JWT Authentication, MVC Architecture. - Databases: MongoDB,
MySQL. - Tools: Git, GitHub, Postman, VS Code, Linux. - Cloud/DevOps:
AWS, Docker, Jenkins, Kubernetes, CI/CD. Do not invent proficiency
levels, scores, or years of experience. Display these as skills/areas,
not claims of mastery. **Interaction:** select a training station or
category to open an accessible HTML panel. Skill filters must work in
both modes.

### Destination 3 --- MISSIONS ARC: Developer Village

**Purpose:** project case studies. **Environment:** a small connected
village with distinctive project buildings, signboards, pathways, and
lanterns. Each building is a mission hub. **Initial verified projects:**

#### Mission: HostelResolve

**Type:** Hostel Complaint Management System. **Resume-supported
summary:** backend services and REST APIs for complaint management,
tracking, and resolution; SMTP email notifications and an automated
escalation workflow for unresolved complaints. **Resume-supported
stack:** React.js, Node.js, Express.js, MongoDB, REST APIs, SMTP. **Must
show:** problem, solution, core features, stack, architecture/flow
diagram if it can be grounded in the implementation, and verified
source/demo links. **Do not invent:** deployment status, user counts,
institutional adoption, or performance numbers.

#### Mission: Hostmate

**Type:** Rental Marketplace Platform. **Resume-supported summary:**
property listing, search, filtering, location-based property discovery,
cloud-based image management, secure payment processing, and
webhook-based automated payment verification. **Resume-supported
stack:** MongoDB, Express.js, React.js, Node.js, Cloudinary,
OpenStreetMap, Razorpay. **Must show:** problem, solution, core
features, stack, user flow, and verified source/demo links. **Do not
invent:** revenue, customer counts, deployment metrics, or unverified
integrations. **Project URL rule:** inspect repository, resume, and
existing site. If a URL cannot be verified, omit it or mark it as
needing confirmation in developer notes---not as a public broken button.

**Future projects:** only add from verified repository/resume data or
after the owner supplies details. No fabricated projects.

### Destination 4 --- TRIALS ARC: Mountain Trials

**Purpose:** demonstrate engineering thought process. **Environment:**
dramatic mountain path, bridges, rocks, fog, gates, and a final ascent.
**Content:** real technical challenges, debugging, trade-offs,
architecture decisions, and lessons learned. Extract only what is
evidenced by source code, README, project history, or owner-provided
facts. If no verified case study exists yet, show a clear "Case studies
in progress" state or hide the content instead of inventing a story.
**Interaction:** optional short "trial" cards/questions that explain a
real engineering decision. No timed pressure or mandatory quiz.

### Destination 5 --- CODE HASHIRA: Summit Shrine

**Purpose:** professional close and conversion. **Environment:** summit
shrine above clouds at sunrise, restrained glowing lanterns, wide scenic
view, calm finale. **Content:** concise professional summary, education,
verified experience, career direction if owner-approved, resume,
verified GitHub/LinkedIn, email/contact. **Resume facts to represent
accurately:** - Name: Abhijeet Dhokne. - Education: Bachelor of
Engineering in Computer Science Engineering, Medicaps University,
Indore; Aug 2023--Jun 2027. - PM SHRI Kendriya Vidyalaya, Pandhurna ---
Societal Intern -- AI Software Development; Jul 2026--Aug 2026. Resume
describes AI-integrated project workflows using prompt engineering, LLM
tools and AI-assisted development platforms; design-to-code workflows;
local LLM exploration using Ollama; AI prototyping with Google AI
Studio. - Medicaps University, Indore --- AWS Cloud Computing Trainee;
Jun 2026--Jul 2026. Resume describes training in AWS Cloud Foundations
and Cloud Architecting, and concepts of scalability, security,
reliability and cost optimization. - Use the above as the supplied
resume snapshot; verify whether dates/title/content should be updated if
source files disagree. - Email from supplied resume:
abhijeetdhokne1474@gmail.com. - Phone from supplied resume: +91 83193
91214. Display only if the owner is comfortable publishing it; otherwise
email/contact form is sufficient. - GitHub/LinkedIn handles in the
resume are not guaranteed to be direct URLs; inspect the existing
portfolio and repository to verify destinations before linking.
**Wording:** "Code Hashira" is an in-world creative title, not a literal
professional credential.

## 5. Persistent navigation and mode switch

Always-visible navigation must provide: - Origins - Training -
Missions - Trials - Summit / Contact - Resume - Toggle: Adventure Mode /
Portfolio Mode - Skip intro (during intro only) - Sound toggle (off by
default) - Accessible menu button on mobile

The visitor must be able to jump to any destination directly. Do not
lock destinations behind quests, progress bars, collectibles, or
completion requirements.

## 6. Interaction specifications

-   Clicking/tapping a landmark selects it, gives a clear
    focus/selection indicator, and triggers camera travel.
-   Camera travel uses restrained easing, short duration, and a
    skip/reduced-motion path.
-   While camera travel runs, prevent conflicting travel requests or
    safely cancel the previous transition.
-   Destination arrival opens a nearby HTML panel or contextual action,
    but must not cover the entire world on desktop.
-   Panels have clear close/back controls and close on Escape where
    appropriate.
-   Support keyboard activation (Enter/Space) and visible focus for all
    landmark equivalents.
-   Use buttons/links with correct semantics; do not make arbitrary
    decorative meshes the only controls.
-   Optional collectibles should be decorative/bonus interactions and
    never block information.
-   Sound must require an explicit user action to enable; respect mute
    state during the session.
-   Provide loading, WebGL-unavailable, scene-error, and
    content-not-found states.

## 7. Visual system

### Palette (starting tokens; adjust coherently)

-   Night ink: `#10141B`
-   Deep indigo: `#1C2942`
-   Forest teal: `#284B46`
-   Lantern amber: `#E6B566`
-   Sakura muted rose: `#C98F9A`
-   Moon mist: `#DCE5EB`
-   Text primary: `#F4F6F8`
-   Text secondary: `#B8C2CC` Use warm lanterns against cool atmospheric
    backgrounds. Do not make every element neon or oversaturated.

### Level mood

-   Origins: forest greens, warm amber, soft mist.
-   Training: stone, teal, waterfall blues, focused daylight.
-   Missions: warm village windows, wood, lanterns, clear signage.
-   Trials: indigo, slate, muted red/amber accents, stronger contrast
    and fog.
-   Summit: pale sky, gold sunrise, calm negative space.

### Typography

Use a legible modern sans-serif for all interface/body text. A display
face may be used for short headings only. Ensure language support and
fallback fonts. Do not sacrifice readability for "anime" styling.

### UI language

A refined game HUD: small destination indicator, minimal quest/milestone
labels, restrained iconography, clear panels. Avoid clutter, excessive
borders, random gradients, fake stats, or generic dashboard cards
floating everywhere.

## 8. Technical direction

**Preferred new implementation (subject to repository audit):** -
React + Vite + TypeScript. - Three.js via React Three Fiber. - Drei for
useful helpers only. - Framer Motion or GSAP for selected UI/camera
transitions; choose one primary animation system. - CSS modules or a
clear global token/component styling strategy. - Optional lightweight
icon library if already available or justified.

**Architecture boundaries (adapt to audited repo):** - `src/app/` ---
app shell, routing/mode state. - `src/scene/` --- world canvas,
environment, terrain, paths, landmarks, lighting. - `src/scene/camera/`
--- destination poses and camera director. -
`src/components/navigation/` --- persistent navigation and destination
selector. - `src/components/panels/` --- accessible HTML content
panels. - `src/components/portfolio/` --- conventional portfolio
sections. - `src/data/` --- typed profile, experience, education,
projects, skills, destinations. - `src/hooks/` --- reusable
state/interaction hooks. - `src/styles/` --- tokens, responsive styles,
motion/accessibility rules. - `public/assets/` --- optimized local
assets with an asset/source/license manifest. Do not force this exact
tree if the existing app has a sound structure; keep equivalent
separation.

### Data model expectations

Use typed data for profile, skills, education, experience, projects, and
destinations. Project fields should include `id`, `title`, `category`,
`summary`, `problem`, `solution`, `features`, `techStack`, `links` (only
verified), and optional `architecture`. Unknown content should be
omitted or marked in an internal TODO---not rendered as a false claim.

## 9. Performance budget and quality

-   First render should show a useful shell and basic navigation before
    the full scene is ready.
-   Lazy-load 3D code/assets where feasible.
-   Use procedural low-poly geometry or optimized licensed assets.
-   Minimize draw calls and real-time shadow casters; prefer
    baked/simple lighting where possible.
-   Avoid large textures and unnecessary post-processing.
-   Keep animated object count and particles modest, especially on
    mobile.
-   Pause/reduce nonessential animation when the tab is hidden or
    reduced-motion is active.
-   Handle device capability gracefully; consider quality presets.
-   Use compressed, appropriately sized images; don't fetch large remote
    assets on every visit.
-   Target a Lighthouse score of 90+ where practical, but report
    measured results rather than claiming a score in advance.

## 10. Accessibility

-   Semantic HTML for content and controls.
-   Keyboard-operable navigation and panels.
-   Visible focus states, useful labels, sufficient contrast.
-   Reduced-motion behavior and no essential information conveyed by
    motion alone.
-   Touch targets sized comfortably for mobile.
-   Accessible 2D alternative to 3D landmarks.
-   Scene canvas has an appropriate label/description and is not the
    only source of content.
-   Keep resume, contact, and projects available if WebGL is
    unavailable.

## 11. SEO, deployment, and security

-   Use descriptive page title, meta description, favicon, Open Graph
    basics, and semantic heading structure.
-   Preserve existing hosting/deployment setup unless a change is
    approved and documented.
-   Check SPA routing/base path before deployment; GitHub Pages may need
    a configured Vite `base` path or hash routing depending on the
    current setup.
-   No secrets in client bundles or committed files.
-   External links opening new tabs should use safe `rel` attributes.
-   Do not add analytics or tracking without explicit approval.
-   Contact form should only be called "working" if a verified endpoint
    and key are configured safely.

## 12. Acceptance criteria

1.  A new visitor can identify Abhijeet and the portfolio purpose within
    10 seconds.
2.  All five destinations are distinguishable and accessible.
3.  Click-to-travel works reliably and does not trap focus or
    navigation.
4.  Project details are readable HTML and use only verified
    content/links.
5.  Resume and contact are accessible in one or two actions in both
    modes.
6.  Mobile/touch, keyboard, reduced-motion, and no-WebGL paths work.
7.  No mandatory gameplay gates professional content.
8.  Production build and available checks pass.
9.  README explains setup, scripts, asset licensing, architecture,
    content editing, and deployment.
10. Final report lists real test/build results and any unresolved TODOs.
