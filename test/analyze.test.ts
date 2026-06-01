import { describe, expect, it } from "vitest";
import { analyze } from "../src/analyze.js";
import { sampleBoardCashPreservationPlaybook } from "../src/data/sampleVerticalBrief.js";

describe("analyze", () => {
  it("returns the expected item count", () => {
    const report = analyze(sampleBoardCashPreservationPlaybook, { now: "2026-06-01T00:00:00Z" });
    expect(report.items).toBe(sampleBoardCashPreservationPlaybook.length);
  });

  it("computes positive preservation metrics", () => {
    const report = analyze(sampleBoardCashPreservationPlaybook, { now: "2026-06-01T00:00:00Z" });
    expect(report.averageCashBurnReliefScore).toBeGreaterThan(0);
    expect(report.averageDownsideContainmentScore).toBeGreaterThan(0);
  });

  it("counts freeze and ring-fenced lanes", () => {
    const report = analyze(sampleBoardCashPreservationPlaybook, { now: "2026-06-01T00:00:00Z" });
    expect(report.freezeCandidates).toBeGreaterThan(0);
    expect(report.ringFencedLanes).toBeGreaterThan(0);
  });

  it("emits findings", () => {
    const report = analyze(sampleBoardCashPreservationPlaybook, { now: "2026-06-01T00:00:00Z" });
    expect(report.findingsList.length).toBeGreaterThan(0);
  });

  it("rolls up annual cash impact", () => {
    const report = analyze(sampleBoardCashPreservationPlaybook, { now: "2026-06-01T00:00:00Z" });
    expect(report.annualCashImpactMillions).toBeGreaterThan(0);
  });
});
