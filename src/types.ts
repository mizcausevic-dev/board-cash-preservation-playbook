export type PreservationTrack =
  | "AI_PLATFORM"
  | "IDENTITY_SECURITY"
  | "REVENUE_SYSTEMS"
  | "FINTECH"
  | "BIOTECH_DIAGNOSTICS"
  | "PROCUREMENT_TRUST"
  | "PUBLIC_SECTOR";

export type PreservationAction = "FREEZE" | "RING_FENCE" | "HOLD" | "DEFER";

export interface BoardCashPreservationItem {
  id: string;
  owner: string;
  audience: string;
  track: PreservationTrack;
  action: PreservationAction;
  spendCategory: string;
  preservationTheme: string;
  boardQuestion: string;
  currentPosture: string;
  recommendedMove: string;
  cashBurnReliefScore: number;
  downsideContainmentScore: number;
  continuityProtectionScore: number;
  executionFragilityScore: number;
  boardDefensibilityScore: number;
  urgencyScore: number;
  annualCashImpactMillions: number;
  headline: string;
  narrative: string;
  nextMove: string;
  companyTags: string[];
  relatedSurfaces: string[];
  requiredEvidence: string[];
}

export interface BoardCashPreservationExport {
  generatedAt: string;
  items: BoardCashPreservationItem[];
}

export type FindingCode =
  | "freeze-ready"
  | "ring-fence-core"
  | "defer-now"
  | "fragile-sequencing"
  | "thin-preservation-proof"
  | "containment-gap";

export interface Finding {
  code: FindingCode;
  severity: "high" | "medium" | "low" | "info";
  track: PreservationTrack;
  audience: string;
  message: string;
}

export interface BoardCashPreservationReport {
  generatedAt: string;
  items: number;
  averageCashBurnReliefScore: number;
  averageDownsideContainmentScore: number;
  averageContinuityProtectionScore: number;
  averageExecutionFragilityScore: number;
  averageBoardDefensibilityScore: number;
  averageUrgencyScore: number;
  freezeCandidates: number;
  ringFencedLanes: number;
  annualCashImpactMillions: number;
  findingsList: Finding[];
  ok: boolean;
}
