import fs from "node:fs";

const html = fs.readFileSync("site/index.html", "utf8");
const markers = [
  "Travel Pricing Volatility Router",
  "Fare pressure stays visible before conversion breaks",
  "atlanta-orlando-summer",
  "sfo-tokyo-award-window"
];
const missing = markers.filter((marker) => !html.includes(marker));

if (missing.length) {
  throw new Error(`Missing prerender markers: ${missing.join(", ")}`);
}

console.log("smoke ok");
