# Architecture — Floating Islands Portfolio

## Concept

A navigable 3D archipelago, not a portfolio page with a 3D backdrop. Six
floating islands at staggered elevations and depths: Home, Projects, Skills,
Journey (education), Experience (roles), and Contact, linked by glowing
energy bridges under a midnight-navy sky.

## Runtime map

```text
frontend/src/
  App.tsx                  # UniverseView: world mode vs text mode (WebGL fallback)
  main.tsx                 # React root
  data/                    # Typed, verified content (single source of truth)
    types.ts               # Content model (no proficiency %, no metrics)
    profile.ts             # Name, title, email, socials, certificates
    projects.ts            # 5 verified projects (flagships: HostelResolve, Hostmate)
    skills.ts              # 16 skills + 3 interactive crystal groupings
    experience.ts          # 3 verified roles (re-exports education.ts)
    education.ts           # Editable schooling history
    navigation.ts          # Island chart: anchors + cinematic camera poses
  state/islands.tsx        # IslandProvider: travel requests, selection, text mode
  world/                   # Three.js runtime (lazy-loaded chunk)
    WorldCanvas.tsx        # <Canvas>: adaptive DPR, failure → text fallback
    World.tsx              # Assembly + quality-gated bloom/vignette
    WorldEnvironment.tsx   # Lights (7-budget), stars, nebula sprites, motes
    FloatingIsland.tsx     # Procedural island (seeded, no external assets)
    IslandConnections.tsx  # Light-bridge tubes + travelling pulses
    CameraController.tsx   # GSAP camera tweens, parallax, drift, skip support
    InteractionManager.tsx # Raycast clicks, wheel-to-glide, panel dismissal
  islands/                 # One file per destination + shared parts.tsx
    HomeIsland / ProjectsIsland / SkillsIsland / ExperienceIsland / ContactIsland
  components/
    navigation/IslandNav.tsx  # Island map, destination indicator, shortcuts
    overlays/                 # HeroOverlay, LoadingScreen, InfoPanel
    portfolio/PortfolioMode.tsx  # Accessible text version (2D fallback)
    shell/                    # ErrorBoundary, LoadingFallback
  hooks/device.ts          # useReducedMotion, useHighQuality, isWebGLAvailable
```

## Key decisions

- **Camera**: GSAP tweens own travel; per-frame code only layers parallax and
  idle drift on top. Reduced-motion and Skip resolve travel instantly.
- **Motion split**: GSAP = 3D camera; Framer Motion = HTML overlays. No overlap.
- **Performance**: no shadow maps, 7-light budget, DPR capped (1.75/1.0),
  bloom+vignette only on high-quality desktops, non-essential assets lazy.
- **Accessibility**: every destination is a real button (nav map + 3D beacon
  labels); shortcuts 1–5/H/Esc; skip link to the text version; focus moves
  into panels; WebGL failure degrades to the full portfolio, never a blank page.
- **Content honesty**: panels render only verified strings. Razorpay per owner
  decision; no Stripe, no phone number, no invented metrics (see content tests).
- **Scroll**: wheel-over-canvas glides between islands with a travel cooldown;
  page scroll is never hijacked — overlays scroll natively, and the full
  scrollable text version is one toggle away.
- **Legacy**: pre-existing work is preserved on `legacy/classic-portfolio`
  and `backup-pre-floating-islands`. No DEVSLAYER/anime branding remains.
