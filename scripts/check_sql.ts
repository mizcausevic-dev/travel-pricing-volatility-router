import fs from "node:fs";

const sql = fs.readFileSync("sql/travel_pricing_contract.sql", "utf8");
const required = ["route_id", "baseline_fare_usd", "observed_fare_usd", "demand_spike_index", "search_to_book_ratio"];
const missing = required.filter((term) => !sql.includes(term));

if (missing.length) {
  throw new Error(`SQL contract missing fields: ${missing.join(", ")}`);
}

console.log("sql contract ok");
