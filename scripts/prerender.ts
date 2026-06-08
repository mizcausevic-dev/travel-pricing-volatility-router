import fs from "node:fs";
import { renderApp } from "../src/app.js";
import type { TravelInput } from "../src/index.js";

const input = JSON.parse(fs.readFileSync("fixtures/travel-pricing.json", "utf8")) as TravelInput;
fs.mkdirSync("site", { recursive: true });
fs.writeFileSync("site/index.html", renderApp(input));

fs.writeFileSync("site/sitemap.xml", "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\">\n  <url><loc>https://mizcausevic-dev.github.io/travel-pricing-volatility-router/</loc></url>\n</urlset>\n");
