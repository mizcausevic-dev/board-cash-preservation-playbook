import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import {
  renderDocs,
  renderOverview,
  renderDownsideSequencing,
  renderFreezeCandidates,
  renderPreservationBrief,
  renderVerification
} from "../src/services/render.js";
import {
  downsideSequencing,
  freezeCandidates,
  payload,
  preservationBrief,
  riskMap,
  summary,
  verification
} from "../src/services/verticalBriefService.js";

const root = path.resolve("site");
mkdirSync(root, { recursive: true });

if (existsSync("CNAME")) {
  writeFileSync(path.join(root, "CNAME"), readFileSync("CNAME", "utf8").trim() + "\n");
}

const htmlRoutes = new Map<string, [string, string]>([
  ["/", ["index.html", renderOverview()]],
  ["/preservation-brief", ["preservation-brief/index.html", renderPreservationBrief()]],
  ["/freeze-candidates", ["freeze-candidates/index.html", renderFreezeCandidates()]],
  ["/downside-sequencing", ["downside-sequencing/index.html", renderDownsideSequencing()]],
  ["/verification", ["verification/index.html", renderVerification()]],
  ["/docs", ["docs/index.html", renderDocs()]]
]);

for (const [, [target, html]] of htmlRoutes) {
  const filePath = path.join(root, target);
  mkdirSync(path.dirname(filePath), { recursive: true });
  writeFileSync(filePath, html);
}

writeFileSync(path.join(root, "robots.txt"), "User-agent: *\nAllow: /\nSitemap: https://preserve.kineticgain.com/sitemap.xml\n");
writeFileSync(
  path.join(root, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>https://preserve.kineticgain.com/</loc></url><url><loc>https://preserve.kineticgain.com/preservation-brief/</loc></url><url><loc>https://preserve.kineticgain.com/freeze-candidates/</loc></url><url><loc>https://preserve.kineticgain.com/downside-sequencing/</loc></url><url><loc>https://preserve.kineticgain.com/verification/</loc></url><url><loc>https://preserve.kineticgain.com/docs/</loc></url></urlset>`
);

const api = {
  "api/dashboard/summary.json": summary(),
  "api/preservation-brief.json": preservationBrief(),
  "api/freeze-candidates.json": freezeCandidates(),
  "api/downside-sequencing.json": downsideSequencing(),
  "api/risk-map.json": riskMap(),
  "api/verification.json": verification(),
  "api/sample.json": payload().sample,
  "api/payload.json": payload()
};

for (const [target, data] of Object.entries(api)) {
  const filePath = path.join(root, target);
  mkdirSync(path.dirname(filePath), { recursive: true });
  writeFileSync(filePath, JSON.stringify(data, null, 2));
}
