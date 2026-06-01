import { downsideSequencing, freezeCandidates, payload, preservationBrief, riskMap, summary, verification } from "./verticalBriefService.js";

const productTitle = "Board Cash Preservation Playbook";
const domain = "https://preserve.kineticgain.com";

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function shell(title: string, path: string, body: string, description: string) {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${escapeHtml(title)} · Kinetic Gain</title>
    <meta name="description" content="${escapeHtml(description)}" />
    <style>
      :root {
        color-scheme: dark;
        --bg: #07111d;
        --panel: #0d1a2b;
        --panel-2: #102032;
        --border: rgba(103, 224, 190, 0.22);
        --text: #edf2ff;
        --muted: #9fb0cf;
        --accent: #67e0be;
        --accent-2: #7dc4ff;
      }
      * { box-sizing: border-box; }
      body {
        margin: 0;
        font-family: "Segoe UI", system-ui, sans-serif;
        background:
          radial-gradient(circle at top left, rgba(125, 196, 255, 0.12), transparent 30%),
          linear-gradient(180deg, #050c16 0%, var(--bg) 100%);
        color: var(--text);
      }
      a { color: var(--accent-2); text-decoration: none; }
      .wrap { max-width: 1180px; margin: 0 auto; padding: 32px 24px 64px; }
      .hero, .section {
        background: linear-gradient(180deg, rgba(14, 28, 45, 0.95), rgba(10, 19, 33, 0.98));
        border: 1px solid var(--border);
        border-radius: 28px;
        padding: 28px;
        box-shadow: 0 18px 60px rgba(2, 7, 16, 0.35);
      }
      .hero { margin-bottom: 24px; }
      .eyebrow {
        display: inline-block;
        padding: 10px 16px;
        border-radius: 999px;
        border: 1px solid var(--border);
        background: rgba(103, 224, 190, 0.08);
        color: var(--accent);
        font-size: 12px;
        text-transform: uppercase;
        letter-spacing: 0.28em;
      }
      h1, h2 { margin: 18px 0 12px; font-family: Georgia, serif; line-height: 0.95; }
      h1 { font-size: clamp(56px, 8vw, 92px); max-width: 980px; }
      h2 { font-size: clamp(36px, 4vw, 54px); }
      .lede { color: var(--muted); font-size: 20px; line-height: 1.6; max-width: 920px; }
      .nav { display: flex; gap: 10px; flex-wrap: wrap; margin-top: 22px; }
      .nav a {
        padding: 10px 14px;
        border: 1px solid rgba(125, 196, 255, 0.18);
        border-radius: 999px;
        color: var(--muted);
      }
      .nav a.active { color: var(--text); border-color: var(--accent); background: rgba(103, 224, 190, 0.08); }
      .metrics, .grid {
        display: grid;
        gap: 18px;
      }
      .metrics { grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); margin-top: 26px; }
      .metric, .card, .table-wrap {
        background: rgba(16, 32, 50, 0.76);
        border: 1px solid rgba(125, 196, 255, 0.12);
        border-radius: 22px;
        padding: 18px;
      }
      .metric-label, .chip {
        color: var(--accent);
        text-transform: uppercase;
        letter-spacing: 0.18em;
        font-size: 12px;
      }
      .metric-value { display: block; font-size: 40px; font-weight: 700; margin-top: 10px; }
      .metric-copy { margin-top: 10px; color: var(--muted); line-height: 1.5; }
      .section { margin-top: 24px; }
      .grid { grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); }
      .card h3 { margin: 12px 0 10px; font-size: 30px; line-height: 1.05; }
      .card p, li { color: var(--muted); line-height: 1.6; }
      .table-wrap { overflow-x: auto; }
      table { width: 100%; border-collapse: collapse; }
      th, td { text-align: left; padding: 12px; border-bottom: 1px solid rgba(125, 196, 255, 0.12); vertical-align: top; }
      th { color: var(--accent); font-size: 12px; text-transform: uppercase; letter-spacing: 0.18em; }
      ul { padding-left: 20px; }
      pre {
        white-space: pre-wrap;
        overflow-wrap: anywhere;
        color: var(--muted);
        background: rgba(7, 17, 29, 0.75);
        border: 1px solid rgba(125, 196, 255, 0.12);
        border-radius: 18px;
        padding: 18px;
      }
      .footer {
        margin-top: 24px;
        color: var(--muted);
        font-size: 14px;
        display: flex;
        gap: 18px;
        flex-wrap: wrap;
      }
    </style>
  </head>
  <body>
    <div class="wrap">
      ${body}
      <div class="footer">
        <span>${productTitle}</span>
        <a href="${domain}">${domain.replace("https://", "")}</a>
        <a href="https://github.com/mizcausevic-dev/">GitHub</a>
        <a href="https://www.linkedin.com/in/mirzacausevic/">LinkedIn</a>
        <a href="https://kineticgain.com/">Kinetic Gain</a>
      </div>
    </div>
  </body>
</html>`;
}

function navLinks(path: string) {
  return [
    ["/", "Overview"],
    ["/preservation-brief", "Preservation brief"],
    ["/freeze-candidates", "Freeze candidates"],
    ["/downside-sequencing", "Downside sequencing"],
    ["/verification", "Verification"],
    ["/docs", "Docs"]
  ]
    .map(([href, label]) => {
      const active = href === path ? ' class="active"' : "";
      return `<a${active} href="${href}">${label}</a>`;
    })
    .join("");
}

export function renderOverview() {
  const executiveSummary = summary();
  const lanes = preservationBrief().slice(0, 4);
  const findings = riskMap().slice(0, 5);
  const cards = lanes
    .map(
      (item) => `<article class="card">
        <div class="chip">${escapeHtml(item.action)}</div>
        <h3>${escapeHtml(item.spendCategory)}</h3>
        <p><strong>Audience:</strong> ${escapeHtml(item.audience)}</p>
        <p><strong>Theme:</strong> ${escapeHtml(item.preservationTheme)}</p>
        <p>${escapeHtml(item.recommendedMove)}</p>
      </article>`
    )
    .join("");

  const risks = findings
    .map((item) => `<li><strong>${escapeHtml(item.severity.toUpperCase())}</strong> · ${escapeHtml(item.message)}</li>`)
    .join("");

  return shell(
    productTitle,
    "/",
    `<section class="hero">
      <span class="eyebrow">Board Cash Preservation</span>
      <h1>What should leadership freeze, ring-fence, defer, or hold to preserve cash safely?</h1>
      <p class="lede">Board Cash Preservation Playbook turns AI, identity, revenue, FinTech, biotech, procurement, and public-sector complexity into one committee-ready preservation packet.</p>
      <div class="nav">${navLinks("/")}</div>
      <div class="metrics">
        <div class="metric"><span class="metric-label">Preservation lanes</span><span class="metric-value">${executiveSummary.items}</span><div class="metric-copy">Modeled lanes in the current board preservation packet.</div></div>
        <div class="metric"><span class="metric-label">Cash-burn relief</span><span class="metric-value">${executiveSummary.averageCashBurnReliefScore}</span><div class="metric-copy">Average near-term relief from freezes, deferrals, and holds.</div></div>
        <div class="metric"><span class="metric-label">Downside containment</span><span class="metric-value">${executiveSummary.averageDownsideContainmentScore}</span><div class="metric-copy">Average ability to contain risk while preserving cash.</div></div>
        <div class="metric"><span class="metric-label">Annual cash impact</span><span class="metric-value">$${executiveSummary.annualCashImpactMillions}M</span><div class="metric-copy">Modeled annual cash preserved across the current playbook.</div></div>
      </div>
    </section>
    <section class="section">
      <h2>Preservation queue</h2>
      <div class="grid">${cards}</div>
    </section>
    <section class="section">
      <h2>Preservation findings</h2>
      <ul>${risks}</ul>
    </section>`,
    "Board-ready surface for freezing, ring-fencing, deferring, and holding spend across the executive estate."
  );
}

export function renderPreservationBrief() {
  const rows = preservationBrief()
    .map(
      (item) => `<tr>
        <td>${escapeHtml(item.owner)}</td>
        <td>${escapeHtml(item.audience)}</td>
        <td>${escapeHtml(item.action)}</td>
        <td>${escapeHtml(item.spendCategory)}</td>
        <td>${escapeHtml(item.preservationTheme)}</td>
      </tr>`
    )
    .join("");

  return shell(
    "Preservation brief",
    "/preservation-brief",
    `<section class="hero">
      <span class="eyebrow">Preservation brief</span>
      <h1>Every preservation move stays tied to one audience, one spend category, and one next move.</h1>
      <p class="lede">The preservation brief keeps freeze, ring-fence, defer, and hold decisions readable instead of scattering them across unrelated budget discussions.</p>
      <div class="nav">${navLinks("/preservation-brief")}</div>
    </section>
    <section class="section table-wrap">
      <table>
        <thead><tr><th>Owner</th><th>Audience</th><th>Action</th><th>Spend category</th><th>Theme</th></tr></thead>
        <tbody>${rows}</tbody>
      </table>
    </section>`,
    "Preservation brief showing audience, spend category, and next move."
  );
}

export function renderFreezeCandidates() {
  const rows = freezeCandidates()
    .map(
      (item) => `<tr>
        <td>${escapeHtml(item.owner)}</td>
        <td>${escapeHtml(item.audience)}</td>
        <td>${escapeHtml(item.action)}</td>
        <td>${item.cashBurnReliefScore}</td>
        <td>${item.downsideContainmentScore}</td>
        <td>${item.executionFragilityScore}</td>
      </tr>`
    )
    .join("");

  return shell(
    "Freeze candidates",
    "/freeze-candidates",
    `<section class="hero">
      <span class="eyebrow">Freeze candidates</span>
      <h1>See which lanes can stop or defer spend without breaking the operating story.</h1>
      <p class="lede">This view keeps cash-burn relief, downside containment, and fragility together so the committee can preserve cash without creating hidden risk.</p>
      <div class="nav">${navLinks("/freeze-candidates")}</div>
    </section>
    <section class="section table-wrap">
      <table>
        <thead><tr><th>Owner</th><th>Audience</th><th>Action</th><th>Cash-burn relief</th><th>Downside containment</th><th>Execution fragility</th></tr></thead>
        <tbody>${rows}</tbody>
      </table>
    </section>`,
    "Freeze-candidate view for cash relief, downside containment, and execution fragility."
  );
}

export function renderDownsideSequencing() {
  const rows = downsideSequencing()
    .map(
      (item) => `<tr>
        <td>${escapeHtml(item.owner)}</td>
        <td>${escapeHtml(item.audience)}</td>
        <td>$${item.annualCashImpactMillions}M</td>
        <td>${item.continuityProtectionScore}</td>
        <td>${item.boardDefensibilityScore}</td>
        <td>${item.urgencyScore}</td>
      </tr>`
    )
    .join("");
  const notes = verification().map((item) => `<li>${escapeHtml(item)}</li>`).join("");

  return shell(
    "Downside sequencing",
    "/downside-sequencing",
    `<section class="hero">
      <span class="eyebrow">Downside sequencing</span>
      <h1>Cash impact, continuity protection, board defensibility, and urgency stay visible in one sequencing view.</h1>
      <p class="lede">The downside-sequencing view shows what can be cut, what must be ring-fenced, and where the board needs tighter proof before approving a preservation move.</p>
      <div class="nav">${navLinks("/downside-sequencing")}</div>
    </section>
    <section class="section table-wrap">
      <table>
        <thead><tr><th>Owner</th><th>Audience</th><th>Annual cash impact</th><th>Continuity protection</th><th>Board defensibility</th><th>Urgency</th></tr></thead>
        <tbody>${rows}</tbody>
      </table>
    </section>
    <section class="section">
      <h2>Verification</h2>
      <ul>${notes}</ul>
    </section>`,
    "Downside-sequencing view for annual cash impact, continuity protection, and urgency."
  );
}

export function renderVerification() {
  const notes = verification().map((item) => `<li>${escapeHtml(item)}</li>`).join("");
  return shell(
    "Verification",
    "/verification",
    `<section class="hero">
      <span class="eyebrow">Verification</span>
      <h1>How this cash-preservation packet is modeled and what it is safe to infer from it.</h1>
      <p class="lede">This route keeps the synthetic nature, proof boundaries, and reproducibility notes visible before anyone treats the sample as live board advice.</p>
      <div class="nav">${navLinks("/verification")}</div>
    </section>
    <section class="section">
      <ul>${notes}</ul>
    </section>`,
    "Verification notes for the Board Cash Preservation Playbook sample and modeled outputs."
  );
}

export function renderDocs() {
  return shell(
    "Docs",
    "/docs",
    `<section class="hero">
      <span class="eyebrow">Docs</span>
      <h1>Board Cash Preservation Playbook docs</h1>
      <p class="lede">This surface packages freeze, ring-fence, defer, and hold decisions into reproducible routes and JSON outputs.</p>
      <div class="nav">${navLinks("/docs")}</div>
    </section>
    <section class="section">
      <ul>
        <li><code>/preservation-brief</code> keeps audiences, spend categories, actions, and next moves readable.</li>
        <li><code>/freeze-candidates</code> compares cash-burn relief, downside containment, and execution fragility.</li>
        <li><code>/downside-sequencing</code> shows annual cash impact, continuity protection, and board defensibility.</li>
        <li><code>/api/payload</code> exposes the reproducible preservation packet.</li>
      </ul>
      <pre>${escapeHtml(JSON.stringify(payload(), null, 2))}</pre>
    </section>`,
    "Product documentation for Board Cash Preservation Playbook and its board-preservation routes."
  );
}
