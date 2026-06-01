import { toExport } from "../src/analyze.js";
import { sampleBoardCashPreservationPlaybook } from "../src/data/sampleVerticalBrief.js";
import { writeFileSync } from "node:fs";

const clean = sampleBoardCashPreservationPlaybook.map((item) => ({
  ...item,
  relatedSurfaces: [...item.relatedSurfaces].sort(),
  requiredEvidence: [...item.requiredEvidence].sort(),
  companyTags: [...item.companyTags].sort()
}));

writeFileSync(
  "fixtures/board-cash-preservation-playbook.json",
  JSON.stringify(toExport(sampleBoardCashPreservationPlaybook), null, 2)
);

writeFileSync(
  "fixtures/board-cash-preservation-playbook-clean.json",
  JSON.stringify(toExport(clean), null, 2)
);
