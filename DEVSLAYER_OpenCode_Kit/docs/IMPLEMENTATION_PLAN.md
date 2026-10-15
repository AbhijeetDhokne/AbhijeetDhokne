# DEVSLAYER --- Implementation Plan

## Before coding

-   [ ] Check `git status`; create a branch or backup commit before
    major changes.
-   [ ] Inspect current repository structure, framework, scripts,
    lockfile, deployment setup, and all existing content.
-   [ ] Read current portfolio links and verify GitHub, LinkedIn, demos,
    and resume paths.
-   [ ] Review the supplied resume and map each public claim to a
    source.
-   [ ] Record current baseline build/test status.
-   [ ] If migration from vanilla HTML/CSS/JS is needed, explain
    trade-offs and deploy path before implementing it.

## Phase 1 --- Audit and content model

Deliverables: - `docs/REPOSITORY_AUDIT.md` - `docs/CONTENT_AUDIT.md` -
typed content schema or an equivalent data plan - confirmed list of
verified links and unresolved items Acceptance: no implementation begins
by assuming the existing app's structure or links.

## Phase 2 --- Portfolio shell first

Implement: - responsive app shell and persistent navigation - Adventure
/ Portfolio mode switch - direct access to Projects, Resume, Contact -
loading and error/fallback UI - content data files Acceptance: the site
is useful without WebGL or 3D.

## Phase 3 --- Art-directed 3D prototype

Implement: - compact connected low-poly environment - Origins, Training,
Missions, Trials, Summit landmarks - lighting palette and visual
distinction by destination - no expensive assets or complex physics
Acceptance: five destinations are visible/readable, stable, and visually
coherent.

## Phase 4 --- Cinematic navigation and panels

Implement: - destination selector and click/tap landmark selection -
centralized camera poses and camera director - smooth camera travel,
interruption/skip/reduced-motion behavior - HTML panels and close/back
behavior - keyboard-accessible equivalent controls Acceptance:
navigation remains predictable and all content can be reached directly.

## Phase 5 --- Missions and light game flavor

Implement: - HostelResolve and Hostmate case-study panels from verified
data - optional training stations, milestones, scrolls, and collectible
flavor - real engineering case studies only if evidence is available
Acceptance: no fake progress, fake achievements, or mandatory quests.

## Phase 6 --- Responsive, accessibility, and performance

Implement: - touch-friendly controls and mobile quality settings -
reduced-motion and sound-off-by-default behavior - keyboard navigation,
focus handling, Escape behavior - no-WebGL fallback and error
boundaries - asset optimization and lazy loading Acceptance: portfolio
works at mobile, tablet, and desktop sizes and remains usable without
3D.

## Phase 7 --- QA and deployment

Run available: - lint - type-check - unit/component tests - production
build - browser smoke tests for navigation and links - keyboard and
mobile checks - Lighthouse or equivalent performance audit where
available Verify deployment base path/routing and resume asset path.
Acceptance: report actual results, remaining limitations, and deployment
steps.

## After each phase

1.  Summarize changes.
2.  List exact commands run and their outcomes.
3.  Fix introduced regressions before moving on.
4.  Update docs and TODOs.
5.  Do not begin the next phase until the current phase is stable.
