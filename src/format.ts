import type { BoardCashPreservationReport } from "./types.js";

export function toSummary(report: BoardCashPreservationReport) {
  return [
    `Preservation lanes: ${report.items}`,
    `Average cash-burn relief: ${report.averageCashBurnReliefScore}`,
    `Average downside containment: ${report.averageDownsideContainmentScore}`,
    `Average continuity protection: ${report.averageContinuityProtectionScore}`,
    `Average execution fragility: ${report.averageExecutionFragilityScore}`,
    `Average board defensibility: ${report.averageBoardDefensibilityScore}`,
    `Average urgency: ${report.averageUrgencyScore}`,
    `Freeze candidates: ${report.freezeCandidates}`,
    `Ring-fenced lanes: ${report.ringFencedLanes}`,
    `Annual cash impact ($M): ${report.annualCashImpactMillions}`,
    `High findings: ${report.findingsList.filter((item) => item.severity === "high").length}`
  ].join("\n");
}
