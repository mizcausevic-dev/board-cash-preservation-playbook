# Architecture

Board Cash Preservation Playbook is a static-friendly TypeScript executive-intelligence surface for showing what leadership should freeze, ring-fence, defer, and hold next to preserve cash without breaking critical operations.

## Core flow

- `src/data/sampleVerticalBrief.ts` models preservation lanes across AI, identity, revenue, FinTech, biotech, procurement, and public-sector readiness.
- `src/analyze.ts` scores cash-burn relief, downside containment, continuity protection, execution fragility, board defensibility, urgency, and annual cash impact while generating preservation findings.
- `src/services/verticalBriefService.ts` exposes the preservation-brief, freeze-candidates, downside-sequencing, and risk-map packets used by both the app and prerender step.
- `src/services/render.ts` turns those packets into board-readable HTML routes plus a sample export.
- `scripts/prerender.ts` produces the static site and JSON payloads for GitHub Pages.

## Output shape

Each lane is designed to answer the same executive questions:

- what should we freeze now
- what must be ring-fenced from cuts
- what should be deferred until conditions improve
- what can leadership hold flat while preserving continuity

## Guardrails

- synthetic data only
- read-only public surface
- no tenant credentials or private documents
- no compliance overclaim language
