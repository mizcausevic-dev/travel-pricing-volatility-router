import fs from "node:fs";
import { buildTravelSummary, type TravelInput } from "../src/index.js";

const input = JSON.parse(fs.readFileSync("fixtures/travel-pricing.json", "utf8")) as TravelInput;
const summary = buildTravelSummary(input);

console.log(`network=${summary.network}`);
console.log(`farePressure=${summary.totalFarePressureUsd}`);
console.log(`volatility=${summary.averageVolatility}`);
console.log(`reroute=${summary.rerouteRoutes}`);
console.log(`recommendation=${summary.primaryRecommendation}`);
