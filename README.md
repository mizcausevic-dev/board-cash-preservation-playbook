# Board Cash Preservation Playbook

Board-ready cash-preservation playbook for freezing spend, ring-fencing core systems, and sequencing downside containment across the executive estate.

- Live: `https://preserve.kineticgain.com/`
- Repo: `mizcausevic-dev/board-cash-preservation-playbook`

## Why this matters

Leaders need more than a generic budget cut list. They need one playbook that shows what should be frozen, what should be ring-fenced, where downside must be contained first, and which systems can absorb temporary pressure without damaging the board story.

## What it includes

- TypeScript executive-intelligence surface for freezing, ring-fencing, deferring, and holding spend with modeled cash-burn relief, downside containment, continuity protection, board defensibility, and urgency signals
- synthetic executive lanes across AI, identity, revenue, FinTech, biotech, procurement, and public-sector readiness
- reusable outputs for preservation briefs, freeze candidates, downside sequencing, and board-ready risk maps
- prerendered static site, JSON payloads, screenshots, and docs

## Routes

- `/`
- `/preservation-brief`
- `/freeze-candidates`
- `/downside-sequencing`
- `/verification`
- `/docs`

## Local run

```bash
cd board-cash-preservation-playbook
npm install
npm run verify
npm run prerender
npm run render:assets
```

## CLI

```bash
npx board-cash-preservation-playbook fixtures/board-cash-preservation-playbook.json --format summary
npx board-cash-preservation-playbook fixtures/board-cash-preservation-playbook-clean.json --format json
```

## Docs

- [Architecture](docs/architecture.md)
- [Origin](docs/ORIGIN.md)
- [Kinetic Gain Embedded](docs/KINETIC_GAIN_EMBEDDED.md)

## Screenshots

![Overview](screenshots/01-overview-proof.png)
![Preservation brief](screenshots/02-preservation-brief-proof.png)
![Freeze candidates](screenshots/03-freeze-candidates-proof.png)
![Downside sequencing](screenshots/04-downside-sequencing-proof.png)
