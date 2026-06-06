import fs from "node:fs";
import { renderApp } from "../src/app.js";
import type { TravelInput } from "../src/index.js";

const input = JSON.parse(fs.readFileSync("fixtures/travel-pricing.json", "utf8")) as TravelInput;
fs.mkdirSync("site", { recursive: true });
fs.writeFileSync("site/index.html", renderApp(input));
