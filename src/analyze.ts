import type {
  BoardCashPreservationExport,
  BoardCashPreservationItem,
  BoardCashPreservationReport,
  Finding
} from "./types.js";

function average(items: BoardCashPreservationItem[], pick: (item: BoardCashPreservationItem) => number) {
  return Math.round(items.reduce((sum, item) => sum + pick(item), 0) / items.length);
}

function evaluate(item: BoardCashPreservationItem): Finding[] {
  const findings: Finding[] = [];

  if (item.action === "FREEZE" && item.cashBurnReliefScore >= 78 && item.boardDefensibilityScore >= 72) {
    findings.push({
      code: "freeze-ready",
      severity: "medium",
      track: item.track,
      audience: item.audience,
      message: "This lane can be frozen now without collapsing the board narrative."
    });
  }

  if (item.action === "RING_FENCE" && item.continuityProtectionScore >= 82 && item.downsideContainmentScore >= 74) {
    findings.push({
      code: "ring-fence-core",
      severity: "info",
      track: item.track,
      audience: item.audience,
      message: "This lane behaves like protected core infrastructure and should be ring-fenced from preservation cuts."
    });
  }

  if (item.action === "DEFER" && item.cashBurnReliefScore >= 66 && item.executionFragilityScore <= 60) {
    findings.push({
      code: "defer-now",
      severity: "info",
      track: item.track,
      audience: item.audience,
      message: "This lane can be deferred to preserve cash while keeping execution risk tolerable."
    });
  }

  if (item.executionFragilityScore >= 72 || item.urgencyScore >= 82) {
    findings.push({
      code: "fragile-sequencing",
      severity: item.executionFragilityScore >= 82 ? "high" : "medium",
      track: item.track,
      audience: item.audience,
      message: "Preservation sequencing is fragile enough that the board should not assume a clean freeze without collateral risk."
    });
  }

  if (item.boardDefensibilityScore < 68 || item.requiredEvidence.length > 4) {
    findings.push({
      code: "thin-preservation-proof",
      severity: item.boardDefensibilityScore < 60 ? "high" : "medium",
      track: item.track,
      audience: item.audience,
      message: "The preservation narrative still rests on thin proof and needs tighter evidence before approval."
    });
  }

  if (item.downsideContainmentScore <= 55 && item.action !== "RING_FENCE") {
    findings.push({
      code: "containment-gap",
      severity: "high",
      track: item.track,
      audience: item.audience,
      message: "Downside exposure is not contained well enough for this preservation move to be safe yet."
    });
  }

  return findings;
}

export function analyze(
  items: BoardCashPreservationItem[],
  options: { now?: string } = {}
): BoardCashPreservationReport {
  const generatedAt = options.now ?? new Date().toISOString();
  const findingsList = items.flatMap((item) => evaluate(item));
  const freezeCandidates = items.filter((item) => item.action === "FREEZE").length;
  const ringFencedLanes = items.filter((item) => item.action === "RING_FENCE").length;
  const annualCashImpactMillions = Math.round(items.reduce((sum, item) => sum + item.annualCashImpactMillions, 0));

  return {
    generatedAt,
    items: items.length,
    averageCashBurnReliefScore: average(items, (item) => item.cashBurnReliefScore),
    averageDownsideContainmentScore: average(items, (item) => item.downsideContainmentScore),
    averageContinuityProtectionScore: average(items, (item) => item.continuityProtectionScore),
    averageExecutionFragilityScore: average(items, (item) => item.executionFragilityScore),
    averageBoardDefensibilityScore: average(items, (item) => item.boardDefensibilityScore),
    averageUrgencyScore: average(items, (item) => item.urgencyScore),
    freezeCandidates,
    ringFencedLanes,
    annualCashImpactMillions,
    findingsList,
    ok: findingsList.filter((item) => item.severity === "high").length <= items.length
  };
}

export function toExport(items: BoardCashPreservationItem[], now?: string): BoardCashPreservationExport {
  return {
    generatedAt: now ?? new Date().toISOString(),
    items
  };
}
