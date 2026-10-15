# OpenCode Prompt 01 --- Phase 1: Verified Content and Portfolio Shell

Read `AGENTS.md` and the audit documents first. Implement only the first
usable layer of DEVSLAYER.

Goals: - Create a responsive, polished portfolio shell that works
without WebGL. - Add persistent navigation for Origins, Training,
Missions, Trials, Summit/Contact, Resume, and a visible
Adventure/Portfolio mode switch. - Put portfolio information in typed
data files rather than scattering content through components. - Add
loading/error/fallback states and semantic HTML. - Use verified content
from the resume and repository. Do not fabricate project URLs, metrics,
proficiency scores, achievements, or certifications. - Include Hostmate
and HostelResolve with the verified descriptions and stacks from
`docs/DESIGN_SPEC.md`. - Ensure Resume is a real working link to the
verified local PDF path. If the PDF is not available in the repo, add a
TODO and do not create a fake link. - Do not build the 3D world yet; use
a tasteful temporary placeholder or simple non-3D destination map.

Use the repository's existing framework if migration is not approved. If
migration is approved, use React + Vite + TypeScript and document
deployment/base-path implications.

Test the shell on narrow and wide layouts. Run the available
lint/type-check/test/build commands. Report actual outputs and stop
after this phase.
