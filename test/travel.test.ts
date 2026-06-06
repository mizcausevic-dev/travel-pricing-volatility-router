import { describe, expect, it } from "vitest";
import fixture from "../fixtures/travel-pricing.json" with { type: "json" };
import { buildTravelSummary, scoreRoute, type TravelInput, type TravelRoute } from "../src/index.js";

describe("travel pricing volatility router", () => {
  it("prioritizes volatile travel corridors", () => {
    const summary = buildTravelSummary(fixture as TravelInput);
    expect(summary.rerouteRoutes).toBe(2);
    expect(summary.findings[0].routeId).toBe("atlanta-orlando-summer");
    expect(summary.primaryRecommendation).toContain("Throttle discount exposure");
  });

  it("keeps stable transatlantic business route below watch threshold", () => {
    const stable = scoreRoute((fixture as TravelInput).routes[2]);
    expect(stable.posture).toBe("stable");
    expect(stable.fareDeltaUsd).toBe(-20);
  });

  it("marks moderate route pressure as watch", () => {
    const route: TravelRoute = {
      routeId: "denver-austin-weekend",
      segment: "Weekend leisure",
      baselineFareUsd: 310,
      observedFareUsd: 345,
      loadFactorPercent: 74,
      fuelMoveBps: 10,
      demandSpikeIndex: 18,
      searchToBookRatio: 3,
      blackoutWindowCount: 0,
      owner: "Revenue management",
      nextAction: "Keep inventory rules visible."
    };
    expect(scoreRoute(route).posture).toBe("watch");
  });

  it("requires at least one route", () => {
    expect(() => buildTravelSummary({ asOf: "2026-06-06T09:00:00Z", network: "empty", routes: [] })).toThrow(
      "At least one travel route is required."
    );
  });
});
