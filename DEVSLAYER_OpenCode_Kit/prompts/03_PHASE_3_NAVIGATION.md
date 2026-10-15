# OpenCode Prompt 03 --- Phase 3: Cinematic Click-to-Travel

Read the project instructions and current architecture before editing.

Implement the chosen navigation model: **cinematic click-to-travel**. Do
not add mandatory WASD character movement.

Requirements: - Clicking/tapping a landmark or destination-menu item
selects the destination and smoothly moves the camera to its predefined
pose. - Use one centralized camera director and a typed destination
configuration; do not duplicate camera logic in every landmark. - Give
landmarks clear hover/focus/selected states, but do not rely on hover
alone. - Prevent overlapping camera transitions; define safe
cancellation or queuing. - Provide skip/instant travel and respect
`prefers-reduced-motion`. - Destination UI panels must be regular
accessible HTML, not text baked into the 3D canvas. - Add
keyboard-accessible equivalents for all landmarks, Escape-to-close where
appropriate, and a visible back-to-world action. - Persistent nav
remains available, and any destination can be selected at any time. -
Keep Portfolio Mode fully usable if the scene is disabled or WebGL
fails.

Test every destination-to-destination transition, rapid repeated clicks,
keyboard-only navigation, reduced-motion, and mobile tap behavior.
Report actual test results and stop.
