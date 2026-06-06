export interface TravelRoute {
  routeId: string;
  segment: string;
  baselineFareUsd: number;
  observedFareUsd: number;
  loadFactorPercent: number;
  fuelMoveBps: number;
  demandSpikeIndex: number;
  searchToBookRatio: number;
  blackoutWindowCount: number;
  owner: string;
  nextAction: string;
}

export interface TravelInput {
  asOf: string;
  network: string;
  routes: TravelRoute[];
}

export interface RouteFinding extends TravelRoute {
  fareDeltaUsd: number;
  fareDeltaPercent: number;
  volatilityScore: number;
  posture: "stable" | "watch" | "reroute";
  boardNarrative: string;
}

export interface TravelSummary {
  asOf: string;
  network: string;
  averageVolatility: number;
  rerouteRoutes: number;
  totalFarePressureUsd: number;
  findings: RouteFinding[];
  primaryRecommendation: string;
}

const clamp = (value: number): number => Math.max(0, Math.min(100, value));
const round = (value: number, places = 2): number => {
  const scale = 10 ** places;
  return Math.round(value * scale) / scale;
};

export function scoreRoute(route: TravelRoute): RouteFinding {
  const fareDeltaUsd = route.observedFareUsd - route.baselineFareUsd;
  const fareDeltaPercent = round((fareDeltaUsd / route.baselineFareUsd) * 100);
  const volatilityScore = round(
    clamp(
      Math.max(0, fareDeltaPercent) * 3.4 +
        Math.max(0, route.loadFactorPercent - 70) * 0.8 +
        route.fuelMoveBps * 0.35 +
        route.demandSpikeIndex * 0.45 +
        route.searchToBookRatio * 2.4 +
        route.blackoutWindowCount * 7
    )
  );
  const posture = volatilityScore >= 72 ? "reroute" : volatilityScore >= 38 ? "watch" : "stable";
  const boardNarrative =
    posture === "reroute"
      ? `${route.routeId} needs pricing-route intervention before demand pressure turns into broken conversion.`
      : posture === "watch"
        ? `${route.routeId} should stay owner-visible while demand, award, and blackout signals settle.`
        : `${route.routeId} remains stable against current fare, load, and demand pressure.`;

  return { ...route, fareDeltaUsd, fareDeltaPercent, volatilityScore, posture, boardNarrative };
}

export function buildTravelSummary(input: TravelInput): TravelSummary {
  if (!input.routes.length) {
    throw new Error("At least one travel route is required.");
  }
  const findings = input.routes.map(scoreRoute).sort((a, b) => b.volatilityScore - a.volatilityScore);
  const averageVolatility = round(findings.reduce((sum, route) => sum + route.volatilityScore, 0) / findings.length);
  const rerouteRoutes = findings.filter((route) => route.posture === "reroute").length;
  const totalFarePressureUsd = findings.reduce((sum, route) => sum + Math.max(0, route.fareDeltaUsd), 0);
  const top = findings[0];

  return {
    asOf: input.asOf,
    network: input.network,
    averageVolatility,
    rerouteRoutes,
    totalFarePressureUsd,
    findings,
    primaryRecommendation: `${top.routeId}: ${top.nextAction}`
  };
}
