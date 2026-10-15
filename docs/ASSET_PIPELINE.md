# Asset Pipeline — Floating Islands

Environment status (Oct 2026): **no Blender executable is installed** in this
workspace (verified via `Get-Command blender`). The application therefore
ships with **zero external-model dependencies**: every island, structure,
crystal, tree, bridge, and particle is procedural Three.js geometry generated
at runtime from seeded RNG (`frontend/src/world/`).

## When Blender becomes available

1. Install Blender 3.4+ and confirm `blender --version` works.
2. Generate per-island GLBs (one command per island):
   ```powershell
   blender --background --python tools/blender/generate_floating_island.py -- `
     --seed home --radius 9 --variant meadow `
     --out frontend/public/models/island-home.glb
   ```
   Variants: `meadow` (home) · `harbor` (projects) · `archive` (skills) ·
   `meadow` (journey) · `portal` (contact). Repeat with `--seed projects`,
   `--seed skills`, `--seed journey`, `--seed contact`.
3. Keep exports lean: target < 350 KB per island, < 60k triangles total,
   one 1k baked texture at most. The script already decimates displaced rock
   and uses flat-shaded low-poly primitives elsewhere.
4. Optional compression: run `gltf-transform optimize` or Blender's Draco
   exporter if the pipeline supports it, then re-verify load time on mobile.

## Swapping procedural geometry for GLBs

- Place files at `frontend/public/models/island-<id>.glb` (gitignored above
  1 MB — compress first).
- Add a `useGLTF` loader with `<Clone>` in `FloatingIsland.tsx` behind a
  `MODEL_MANIFEST` flag, defaulting to procedural geometry on load failure.
- The procedural islands remain the permanent fallback: **the app must stay
  runnable with an empty `public/models/` directory.** CI deletes the folder
  before `npm run build` to enforce this.

## Textures

No AI-generated image backgrounds are used. If baked textures are added
later, they must be procedural (Blender noise / canvas-generated) and stored
under `frontend/public/textures/` with a source note in this file.
