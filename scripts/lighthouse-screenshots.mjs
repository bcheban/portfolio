// Lighthouse score-card screenshot generator.
//
// For each entry in `lighthouse-targets.json`, runs Lighthouse against the
// live URL and saves a PNG cropped to the Performance / Accessibility /
// Best Practices / SEO gauges. `outPath` is resolved relative to this script,
// so you can write the PNG straight into each project's own repo (e.g.
// "../../react-landing-page/docs/lighthouse.png").
//
// This script only writes files at the configured outPath locations. It does
// not read or modify anything else.
//
// One-time setup (in the portfolio repo):
//   npm install --save-dev puppeteer lighthouse chrome-launcher
//
// Edit scripts/lighthouse-targets.json so each `outPath` points at the local
// clone of the corresponding project repo. Then:
//   node scripts/lighthouse-screenshots.mjs              # all targets
//   node scripts/lighthouse-screenshots.mjs --only next-noteforge

import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { launch } from "chrome-launcher";
import lighthouse from "lighthouse";
import puppeteer from "puppeteer";

const __dirname = dirname(fileURLToPath(import.meta.url));
const targets = JSON.parse(await readFile(resolve(__dirname, "lighthouse-targets.json"), "utf8"));

const onlyArg = process.argv.indexOf("--only");
const onlySlug = onlyArg !== -1 ? process.argv[onlyArg + 1] : null;
const work = onlySlug ? targets.filter((t) => t.slug === onlySlug) : targets;
if (work.length === 0) {
  console.error(onlySlug ? `No target named "${onlySlug}"` : "No targets configured");
  process.exit(1);
}

for (const { slug, url, outPath } of work) {
  const absOut = resolve(__dirname, outPath);
  console.log(`\n-> ${slug}  ${url}  ->  ${absOut}`);

  const chrome = await launch({ chromeFlags: ["--headless=new", "--no-sandbox"] });
  const { lhr, report } = await lighthouse(url, {
    port: chrome.port,
    output: "html",
    logLevel: "error",
    onlyCategories: ["performance", "accessibility", "best-practices", "seo"],
    formFactor: "mobile",
    screenEmulation: { mobile: true, width: 412, height: 823, deviceScaleFactor: 1.75, disabled: false },
    throttling: { rttMs: 150, throughputKbps: 1638.4, cpuSlowdownMultiplier: 4 },
  });
  await chrome.kill();

  const html = Array.isArray(report) ? report[0] : report;
  await mkdir(dirname(absOut), { recursive: true });
  await writeFile(absOut.replace(/\.png$/, ".report.html"), html);

  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800, deviceScaleFactor: 2 });
  await page.setContent(html, { waitUntil: "networkidle0" });

  const gauges = await page.$(".lh-scores-container, .lh-scores-wrapper");
  if (!gauges) {
    console.warn(`  ! could not locate score gauges for ${slug}, skipping screenshot`);
    await browser.close();
    continue;
  }
  await gauges.screenshot({ path: absOut, omitBackground: false });
  await browser.close();

  const scores = ["performance", "accessibility", "best-practices", "seo"]
    .map((k) => `${k}=${Math.round((lhr.categories[k]?.score ?? 0) * 100)}`)
    .join("  ");
  console.log(`  ok  ${scores}`);
}

console.log("\nDone.");
