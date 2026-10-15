# DEVSLAYER Rebuild — Technology & Migration Assessment (2026-10-15)

## What was preserved
- Original design frozen on branch **`legacy/classic-portfolio`** (HEAD at `58eb187`).
- Phase 1 shell + Phase 2 world committed on `main` as `c976d98` — full history intact.
- Verified content (profile, projects, skills, experience, certificates, resume PDF,
  images) carried into typed data files. No content invented.

## Old design removed from the app
Deleted `src/App.jsx`, `src/App.css`, `src/index.css`, all legacy components,
`src/mode/*`, Phase-2 JSX scene, `src/data/*.js`, template assets. None of the
old layout, navbar, typography, or CSS remains in either mode (acceptance criterion).

## Stack decisions (inspected, not blind)
| Choice | Verdict |
|---|---|
| React 19 + Vite 8 (kept) | Already in repo, stable, R3F v9-compatible |
| TypeScript 5.9 (added) | Pinned 5.9 over 7.0 (too new); `tsc --noEmit` gates `npm run build` |
| Tailwind CSS v4 + @tailwindcss/vite (added) | Replaces hand-rolled CSS; theme tokens in `src/index.css` |
| three 0.186 + @react-three/fiber 9 (kept) | Verified rendering in Phase 2 |
| @react-three/drei 10 (added) | Used for one thing: keyboard-accessible `Html` beacon labels |
| @react-three/postprocessing 3 (added) | Bloom (threshold 0.62, mild) + vignette, high-quality devices only |
| GSAP 3.15 (added) | Single-purpose: centralized camera travel timelines |
| Framer Motion 12 (kept) | HTML/UI transitions only — no overlap with GSAP's camera role |
| lucide-react (kept) | Icon system |
| Vitest 5 + Testing Library + jsdom (added) | 12 unit tests, all passing |
| react-router-dom, dotlottie (removed) | Dead weight: no routing needed; no Lottie in new design |
| Playwright (not installed) | Headless smoke via existing browser-automation skill instead; documented |

## Performance posture
- Initial bundle **767 → 363 KB** (gz 117 KB). Scene chunk ~1.16 MB loads lazily,
  only in Adventure mode on WebGL devices.
- Instanced forest (3 draw calls / 60 trees), baked blob shadows (no shadow maps),
  4-light budget, DPR capped (1.75 desktop / 1 mobile), post gated by quality hook.
- Reduced-motion: static cameras, frozen effects, instant travel.
- No Lighthouse score claimed (no harness in env); manual checklist in Phase 5.

## Remaining risks / TODO
- Scene chunk is heavy (three+drei+post). Further split or drop post if mobile
  metrics demand it.
- `homepage` vs remote repo mismatch unchanged (deployment untouched per owner).
- GitHub activity terminal from old design was dropped (external API dependency);
  coding profiles are static verified links instead.
