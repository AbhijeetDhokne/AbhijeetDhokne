# DEVSLAYER OpenCode Kit

This kit provides the persistent project rules, design spec,
implementation plan, and phased prompts for building:

**DEVSLAYER --- The Path to Code Hashira**

Chosen decisions: - Cinematic click-to-travel - Light gameplay
(missions, training stations, optional collectibles) - Both immersive 3D
mode and conventional portfolio mode

## Files

-   `AGENTS.md` --- persistent instructions for OpenCode
-   `docs/DESIGN_SPEC.md` --- product, visual, content, technical,
    accessibility, and acceptance requirements
-   `docs/IMPLEMENTATION_PLAN.md` --- phase-by-phase checklist
-   `prompts/00_START_HERE.md` --- repository audit; planning only
-   `prompts/01_PHASE_1_CONTENT_AND_SHELL.md` --- usable portfolio shell
-   `prompts/02_PHASE_2_WORLD.md` --- 3D world prototype
-   `prompts/03_PHASE_3_NAVIGATION.md` --- camera travel and navigation
-   `prompts/04_PHASE_4_MISSIONS_AND_LIGHT_GAMEPLAY.md` --- project
    missions and light game elements
-   `prompts/05_PHASE_5_POLISH_AND_QA.md` ---
    responsive/accessibility/performance/QA

## How to use

1.  Back up the repository or create a Git branch before major changes.
2.  Copy `AGENTS.md` to the repository root.
3.  Copy `docs/` and `prompts/` into the repository.
4.  Open the repository in OpenCode.
5.  Send the contents of `prompts/00_START_HERE.md` first. It instructs
    OpenCode to audit only and wait before coding.
6.  Review its findings. Then send one phase prompt at a time.
7.  Test each phase before continuing. Do not send all prompts in one
    giant request.

## Important

The kit is a specification, not a claim that the website has already
been built. OpenCode must inspect the actual repository, verify all
links and content, and report real test results. The resume-derived
content in `docs/DESIGN_SPEC.md` is based on the supplied PDF snapshot
and should be checked if the resume changes.
