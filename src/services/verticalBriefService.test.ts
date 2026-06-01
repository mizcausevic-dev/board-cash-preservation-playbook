import { describe, expect, it } from "vitest";
import { downsideSequencing, freezeCandidates, payload, preservationBrief, riskMap, summary, verification } from "./verticalBriefService.js";

describe("board cash preservation service", () => {
  it("returns the summary", () => {
    expect(summary().items).toBeGreaterThan(0);
  });

  it("returns the preservation brief", () => {
    expect(preservationBrief()[0]?.audience).toBeTruthy();
  });

  it("returns the freeze candidates view", () => {
    expect(freezeCandidates()[0]?.cashBurnReliefScore).toBeGreaterThan(0);
  });

  it("returns the downside sequencing view", () => {
    expect(downsideSequencing()[0]?.annualCashImpactMillions).toBeGreaterThan(0);
  });

  it("returns the risk map", () => {
    expect(riskMap().length).toBeGreaterThan(0);
  });

  it("returns verification notes", () => {
    expect(verification()[0]).toContain("Synthetic");
  });

  it("keeps the headline in the payload sample", () => {
    expect(payload().sample[0]?.headline).toBeTruthy();
  });
});
