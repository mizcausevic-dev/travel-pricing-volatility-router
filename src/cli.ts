import fs from "node:fs";
import { buildTravelSummary, type TravelInput } from "./index.js";

const inputPath = process.argv[2] ?? "fixtures/travel-pricing.json";
const format = process.argv.includes("--format=json") ? "json" : "text";
const input = JSON.parse(fs.readFileSync(inputPath, "utf8")) as TravelInput;
const summary = buildTravelSummary(input);

if (format === "json") {
  console.log(JSON.stringify(summary, null, 2));
} else {
  console.log(`network=${summary.network}`);
  console.log(`farePressure=${summary.totalFarePressureUsd}`);
  console.log(`volatility=${summary.averageVolatility}`);
  console.log(`reroute=${summary.rerouteRoutes}`);
  console.log(`recommendation=${summary.primaryRecommendation}`);
}
