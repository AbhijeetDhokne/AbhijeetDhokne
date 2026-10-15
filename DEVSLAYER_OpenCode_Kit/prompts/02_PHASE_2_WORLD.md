# OpenCode Prompt 02 --- Phase 2: Low-Poly World Prototype

Read `AGENTS.md`, `docs/DESIGN_SPEC.md`, and the latest implementation
report.

Build the first compact 3D world using the approved stack (prefer React
Three Fiber + Three.js + Drei if the repository migration is approved).
Keep the current 2D portfolio shell working.

Create five distinct but connected low-poly destinations: 1. Origins Arc
--- peaceful forest village entrance. 2. Training Arc --- mountain dojo
and waterfall. 3. Missions Arc --- warm developer village with two
project buildings. 4. Trials Arc --- dramatic misty mountain path. 5.
Code Hashira --- sunrise summit shrine above clouds.

Art direction: original anime-inspired fantasy; Japanese-inspired
architectural cues, stone paths, lanterns, bridges, trees, rocks,
waterfalls, distant mountains, soft mist. Use coherent lighting and
palette changes between areas. No Demon Slayer assets or direct
imitation. Use procedural geometry first; do not fetch unlicensed models
or huge textures.

Requirements: - Centralize destination definitions and scene colors. -
Use low polygon counts, restrained lights, modest particles, and limited
real-time shadows. - Add a loading state and recoverable no-WebGL/error
fallback. - Do not add character combat, enemies, vehicle controls, or
complex physics. - Make sure the normal portfolio mode and direct
project/resume links still work.

Run available checks and report performance risks. Stop after the
prototype is stable.
