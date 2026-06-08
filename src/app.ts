import { buildTravelSummary, type TravelInput } from "./index.js";

const usd = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

export function renderApp(input: TravelInput): string {
  const summary = buildTravelSummary(input);
  const routeCards = summary.findings
    .map(
      (route) => `<article class="card ${route.posture}">
        <p class="eyebrow">${route.segment}</p>
        <h2>${route.routeId}</h2>
        <p>${route.boardNarrative}</p>
        <dl>
          <div><dt>Volatility</dt><dd>${route.volatilityScore}</dd></div>
          <div><dt>Fare delta</dt><dd>${usd.format(route.fareDeltaUsd)}</dd></div>
          <div><dt>Search/book</dt><dd>${route.searchToBookRatio}</dd></div>
        </dl>
        <strong>${route.nextAction}</strong>
      </article>`
    )
    .join("");

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Travel Pricing Volatility Router</title>
  <meta name="description" content="Travel pricing volatility router for fare spikes, demand pressure, blackout risk, and route-level remediation." />
  <style>
    :root { color-scheme: dark; --bg:#050812; --panel:#0d1727; --line:#263348; --text:#f4f1ea; --muted:#a8b3c7; --cyan:#25d7ef; --green:#58f0b3; --pink:#ff72b6; --violet:#9d8cff; }
    * { box-sizing: border-box; }
    body { margin: 0; font-family: "Segoe UI", sans-serif; background: radial-gradient(circle at 70% 0%, #14283b 0, transparent 34%), var(--bg); color: var(--text); }
    main { width: min(1180px, calc(100% - 32px)); margin: 0 auto; padding: 64px 0; }
    .hero { border: 1px solid var(--line); border-radius: 28px; padding: clamp(28px, 5vw, 64px); background: linear-gradient(135deg, rgba(13,23,39,.98), rgba(9,14,25,.94)); box-shadow: 0 24px 80px rgba(0,0,0,.32); }
    .eyebrow { color: var(--green); text-transform: uppercase; letter-spacing: .18em; font: 700 12px Consolas, monospace; }
    h1 { max-width: 1000px; margin: 18px 0; font: 800 clamp(48px, 8vw, 102px)/.94 "Segoe UI", sans-serif; letter-spacing: -.06em; }
    .lede { max-width: 790px; color: var(--muted); font-size: 22px; line-height: 1.55; }
    .metrics { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 16px; margin-top: 38px; }
    .metric, .card { background: rgba(16,28,48,.78); border: 1px solid var(--line); border-radius: 22px; padding: 24px; }
    .metric b { display: block; margin-top: 10px; font-size: 42px; }
    .grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 18px; margin-top: 22px; }
    .card.reroute { border-color: rgba(255,114,182,.7); }
    .card.watch { border-color: rgba(157,140,255,.65); }
    .card.stable { border-color: rgba(88,240,179,.65); }
    .card h2 { margin: 10px 0; font-size: 27px; }
    .card p { color: var(--muted); line-height: 1.55; }
    dl { display: grid; gap: 10px; margin: 20px 0; }
    dt { color: var(--muted); font-size: 12px; text-transform: uppercase; letter-spacing: .12em; }
    dd { margin: 3px 0 0; font-weight: 800; }
    strong { color: var(--text); line-height: 1.45; }
    .proof-pack { display: grid; grid-template-columns: 1.05fr 1fr 1fr; gap: 16px; margin-top: 22px; }
    .proof-card {
      background: linear-gradient(180deg, rgba(18,28,46,.94), rgba(10,16,28,.92));
      border: 1px solid rgba(255,255,255,.1);
      border-radius: 20px;
      padding: 22px;
      box-shadow: 0 16px 42px rgba(0,0,0,.18);
    }
    .proof-card small { display: block; color: var(--cyan); font-family: "Consolas", monospace; text-transform: uppercase; letter-spacing: .14em; font-size: .72rem; margin-bottom: 10px; }
    .proof-card h2 { font-size: 1.35rem; margin: 0 0 10px; letter-spacing: -.03em; }
    .proof-card p { margin: 0; color: var(--muted); line-height: 1.62; }
    .proof-card ul { margin: 0; padding-left: 18px; color: var(--muted); line-height: 1.75; }
    .proof-card li::marker { color: var(--cyan); }
    footer { margin-top: 28px; color: var(--muted); font-size: 13px; }
    @media (max-width: 820px) { .metrics, .grid { grid-template-columns: 1fr; } h1 { font-size: 52px; } }
  </style>
</head>
<body>
  <main>
    <section class="hero">
      <p class="eyebrow">Travel / pricing volatility</p>
      <h1>Fare pressure stays visible before conversion breaks.</h1>
      <p class="lede">Travel Pricing Volatility Router turns fare spikes, load factor, fuel movement, demand pressure, search-to-book drag, and blackout windows into one route-level remediation surface.</p>
      <div class="metrics">
        <div class="metric"><span class="eyebrow">Fare pressure</span><b>${usd.format(summary.totalFarePressureUsd)}</b></div>
        <div class="metric"><span class="eyebrow">Avg volatility</span><b>${summary.averageVolatility}</b></div>
        <div class="metric"><span class="eyebrow">Reroute routes</span><b>${summary.rerouteRoutes}</b></div>
      </div>
    </section>
    <section class="grid">${routeCards}</section>
    <section class="proof-pack" aria-label="Evidence and board pack">
      <article class="proof-card">
        <small>Evidence matrix</small>
        <h2>What leaders can inspect</h2>
        <p>Each lane keeps the source signal, owner, risk posture, and next decision in the same public proof surface instead of hiding the work in screenshots.</p>
      </article>
      <article class="proof-card">
        <small>Board pack builder</small>
        <h2>How the packet gets used</h2>
        <ul><li>Translate technical telemetry into decision language.</li><li>Separate watch, contain, and escalation posture.</li><li>Keep remediation evidence attached to accountable owners.</li></ul>
      </article>
      <article class="proof-card">
        <small>Public-demo boundary</small>
        <h2>What is intentionally synthetic</h2>
        <p>Demo fixtures are synthetic and credential-free; the pattern is reusable for real diligence packets without exposing customer or regulated data.</p>
      </article>
    </section>
    <footer>Travel Pricing Volatility Router · GitHub Pages proof surface · ${summary.asOf}</footer>
  </main>
</body>
</html>`;
}
