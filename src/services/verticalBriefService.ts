import { analyze } from "../analyze.js";
import { sampleBoardCashPreservationPlaybook } from "../data/sampleVerticalBrief.js";

const report = analyze(sampleBoardCashPreservationPlaybook, { now: "2026-06-01T00:00:00Z" });

export function summary() {
  const highFindings = report.findingsList.filter((item) => item.severity === "high").length;
  return {
    items: report.items,
    averageCashBurnReliefScore: report.averageCashBurnReliefScore,
    averageDownsideContainmentScore: report.averageDownsideContainmentScore,
    averageContinuityProtectionScore: report.averageContinuityProtectionScore,
    averageExecutionFragilityScore: report.averageExecutionFragilityScore,
    averageBoardDefensibilityScore: report.averageBoardDefensibilityScore,
    averageUrgencyScore: report.averageUrgencyScore,
    freezeCandidates: report.freezeCandidates,
    ringFencedLanes: report.ringFencedLanes,
    annualCashImpactMillions: report.annualCashImpactMillions,
    highFindings,
    recommendation:
      "Freeze duplicate procurement packaging, ring-fence identity and biotech continuity, defer low-yield AI and revenue satellites, and hold FinTech flat until fragility falls."
  };
}

export function preservationBrief() {
  return sampleBoardCashPreservationPlaybook.map((item) => ({
    owner: item.owner,
    audience: item.audience,
    action: item.action,
    spendCategory: item.spendCategory,
    preservationTheme: item.preservationTheme,
    recommendedMove: item.recommendedMove,
    nextMove: item.nextMove
  }));
}

export function freezeCandidates() {
  return sampleBoardCashPreservationPlaybook
    .filter((item) => item.action === "FREEZE" || item.action === "DEFER")
    .map((item) => ({
      owner: item.owner,
      audience: item.audience,
      action: item.action,
      cashBurnReliefScore: item.cashBurnReliefScore,
      downsideContainmentScore: item.downsideContainmentScore,
      executionFragilityScore: item.executionFragilityScore,
      spendCategory: item.spendCategory,
      companyTags: item.companyTags
    }));
}

export function downsideSequencing() {
  return sampleBoardCashPreservationPlaybook.map((item) => ({
    owner: item.owner,
    audience: item.audience,
    annualCashImpactMillions: item.annualCashImpactMillions,
    continuityProtectionScore: item.continuityProtectionScore,
    boardDefensibilityScore: item.boardDefensibilityScore,
    urgencyScore: item.urgencyScore,
    headline: item.headline,
    relatedSurfaces: item.relatedSurfaces,
    requiredEvidence: item.requiredEvidence
  }));
}

export function riskMap() {
  const order = { high: 0, medium: 1, low: 2, info: 3 } as const;
  return [...report.findingsList].sort((a, b) => order[a.severity] - order[b.severity] || a.code.localeCompare(b.code));
}

export function verification() {
  return [
    "Synthetic cash-preservation data only - no live board packets, internal budget models, or actual freeze decisions are included.",
    "Cash-burn relief, downside containment, continuity protection, execution fragility, board defensibility, urgency, and annual cash-impact metrics are modeled from the sample executive-intelligence estate in this repo.",
    "This surface is read-only and shows how Kinetic Gain can package freeze, ring-fence, defer, and hold decisions into one board-readable cash-preservation playbook.",
    "Company tags and track labels are synthetic design aids rather than audited market or financial signals.",
    "Every route and packet is reproducible from the included sample export."
  ];
}

export function payload() {
  return {
    generatedAt: report.generatedAt,
    summary: summary(),
    preservationBrief: preservationBrief(),
    freezeCandidates: freezeCandidates(),
    downsideSequencing: downsideSequencing(),
    riskMap: riskMap(),
    verification: verification(),
    sample: sampleBoardCashPreservationPlaybook
  };
}
