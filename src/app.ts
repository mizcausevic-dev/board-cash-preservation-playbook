import express from "express";
import { pathToFileURL } from "node:url";
import {
  renderDocs,
  renderDownsideSequencing,
  renderFreezeCandidates,
  renderOverview,
  renderPreservationBrief,
  renderVerification
} from "./services/render.js";
import {
  downsideSequencing,
  freezeCandidates,
  payload,
  preservationBrief,
  riskMap,
  summary,
  verification
} from "./services/verticalBriefService.js";

export function createApp() {
  const app = express();

  app.get("/", (_req, res) => res.type("html").send(renderOverview()));
  app.get("/preservation-brief", (_req, res) => res.type("html").send(renderPreservationBrief()));
  app.get("/freeze-candidates", (_req, res) => res.type("html").send(renderFreezeCandidates()));
  app.get("/downside-sequencing", (_req, res) => res.type("html").send(renderDownsideSequencing()));
  app.get("/verification", (_req, res) => res.type("html").send(renderVerification()));
  app.get("/docs", (_req, res) => res.type("html").send(renderDocs()));

  app.get("/api/dashboard/summary", (_req, res) => res.json(summary()));
  app.get("/api/preservation-brief", (_req, res) => res.json(preservationBrief()));
  app.get("/api/freeze-candidates", (_req, res) => res.json(freezeCandidates()));
  app.get("/api/downside-sequencing", (_req, res) => res.json(downsideSequencing()));
  app.get("/api/risk-map", (_req, res) => res.json(riskMap()));
  app.get("/api/verification", (_req, res) => res.json(verification()));
  app.get("/api/sample", (_req, res) => res.json(payload().sample));
  app.get("/api/payload", (_req, res) => res.json(payload()));

  return app;
}

const port = Number(process.env.PORT || 4010);
const isEntrypoint = process.argv[1] ? import.meta.url === pathToFileURL(process.argv[1]).href : false;

/* v8 ignore start -- process entrypoint is exercised by deployment smoke checks, not unit coverage. */
if (isEntrypoint && process.env.NODE_ENV !== "test") {
  createApp().listen(port, () => {
    console.log(`board-cash-preservation-playbook listening on http://127.0.0.1:${port}`);
  });
}
/* v8 ignore stop */
