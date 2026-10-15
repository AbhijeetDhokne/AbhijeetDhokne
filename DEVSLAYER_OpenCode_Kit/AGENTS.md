# AGENTS.md --- DEVSLAYER Portfolio

## Project mission

Transform the existing portfolio repository into **DEVSLAYER: The Path
to Code Hashira**: an original, anime-inspired, low-poly 3D adventure
portfolio. The chosen experience is: - **Exploration:** cinematic
click-to-travel; no required WASD movement. - **Gameplay:** light
quest/training/collectible flavor; no mandatory combat or enemy AI. -
**Access:** both immersive 3D adventure and conventional portfolio mode.

## First action: inspect, don't assume

1.  Inspect the current repository, package manager, framework, routes,
    assets, deployment configuration, README, and Git status.
2.  Read `docs/DESIGN_SPEC.md` and `docs/IMPLEMENTATION_PLAN.md`.
3.  Audit existing portfolio content and links before replacing the UI.
4.  Preserve verified information, working links, and useful assets. Do
    not blindly delete files or change deployment assumptions.
5.  If a detail is unclear, leave a clearly marked TODO in the content
    data and report it; do not invent it.

## Source-of-truth rules

-   Treat the user's current resume and the existing portfolio
    repository as the sources of truth.
-   Verify profile links, project URLs, demos, dates, claims, and
    achievements from repository files or supplied sources before
    displaying them.
-   Do not invent metrics, users, downloads, certifications, proficiency
    percentages, awards, work experience, or project results.
-   "Code Hashira" is a fictional theme/title, not a claim of
    certification or literal mastery.
-   Use original anime-inspired art direction. Do not copy Demon Slayer
    characters, costumes, logos, exact scenes, dialogue, music, maps, or
    branded assets.
-   Do not expose API keys, form secrets, or private environment
    variables. Keep contact form integration disabled unless a verified
    safe setup exists.

## Product requirements

-   The portfolio must remain useful to recruiters who do not want to
    play a game.
-   Provide a persistent navigation menu and direct links to Projects,
    Resume, GitHub, LinkedIn/contact where verified.
-   Users must be able to skip the intro, switch to conventional
    portfolio mode, and access resume/contact without completing quests.
-   Every interactive landmark must have an accessible equivalent in the
    2D mode and a keyboard-accessible control.
-   Add touch support, reduced-motion support, loading/error states, and
    a useful no-WebGL fallback.
-   Use semantic HTML for readable content; do not bake critical text
    into textures or canvas.
-   Sound is optional and off by default; provide a clear mute toggle.
-   Never block navigation behind collectibles or simulated progression.

## Engineering principles

-   Prefer TypeScript, small reusable components, clear boundaries, and
    centralized content data.
-   Use the existing stack if changing it would be unnecessarily risky.
    If the repository is vanilla HTML/CSS/JS, propose a migration plan
    and explain the deployment implications before replacing it.
-   If a migration is approved by the task, use React + Vite +
    TypeScript, Three.js + React Three Fiber, and Drei only where they
    provide clear value. Add GSAP or Framer Motion selectively, not both
    by default.
-   Build low-poly geometry and a compact connected world before adding
    high-cost models or post-processing.
-   Avoid giant components. Separate scene, camera/navigation state,
    data, panels, accessibility, and fallback UI.
-   Keep portfolio content in typed data files. Keep scene configuration
    (destinations, camera poses, colors) centralized.
-   Use stable keys, cleanup event listeners/animation frames, avoid
    unnecessary React re-renders in the render loop, and dispose of GPU
    resources when appropriate.
-   Respect the repository's package manager and lockfile. Do not mix
    npm/pnpm/yarn lockfiles.
-   Do not add paid services or external asset dependencies without
    documenting the need and licensing.
-   Use local/owned assets or procedural geometry by default. Track
    third-party asset sources and licenses.

## Performance and accessibility

-   Lazy-load the 3D scene where practical; load the 2D portfolio shell
    first.
-   Provide a loading indicator and a recoverable error
    boundary/fallback if WebGL fails.
-   Respect `prefers-reduced-motion`; reduce camera travel and disable
    nonessential loops when enabled.
-   Keep text contrast high, use visible focus states, support Escape to
    close panels, and avoid color-only status.
-   Avoid excessive real-time lights, shadow-casting objects, large
    textures, and full-screen post-processing.
-   Provide responsive layouts for mobile, tablet, laptop, and wide
    desktop.
-   Ensure controls are usable with keyboard, mouse, and touch. Do not
    make hover the only way to reveal content.

## Required workflow for every phase

1.  State the phase goal and inspect the relevant files.
2.  Make the smallest coherent implementation for that phase.
3.  Run available lint, type-check, tests, and production build. If a
    script is missing, say so instead of pretending it ran.
4.  Fix errors introduced by the changes.
5.  Summarize files changed, features completed, commands run, actual
    results, known issues, and next phase.
6.  Do not claim success for tests/builds unless they were actually
    executed.

## Definition of done

-   A first-time visitor can understand who Abhijeet is within 10
    seconds.
-   Projects and resume are reachable in one or two actions without
    completing a level.
-   The five destinations are visually distinct and navigable.
-   Every project card uses verified descriptions and verified links
    only.
-   3D failure, small screens, keyboard use, and reduced-motion settings
    have graceful alternatives.
-   Production build succeeds and no new console errors are known.
