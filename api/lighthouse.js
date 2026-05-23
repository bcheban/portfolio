// Lighthouse-style SVG badge.
//
// Returns a 400x140 SVG with four Lighthouse score gauges (Performance,
// Accessibility, Best Practices, SEO) for the requested URL. Backed by the
// public PageSpeed Insights API.
//
// Usage:
//   /api/lighthouse?url=https://next-noteforge.vercel.app
//
// Cache headers are aggressive (1 day on the Vercel CDN, stale-while-revalidate
// for a week) so README image embeds load instantly after the first warm hit.

const PSI_ENDPOINT = "https://www.googleapis.com/pagespeedonline/v5/runPagespeed";
const CATEGORIES = [
  { key: "performance",     label: "Performance"   },
  { key: "accessibility",   label: "Accessibility" },
  { key: "best-practices",  label: "Best Practices"},
  { key: "seo",             label: "SEO"           },
];

function colorFor(score) {
  if (score >= 90) return { ring: "#0cce6b", text: "#0a7a3f" };  // green
  if (score >= 50) return { ring: "#ffa400", text: "#946100" };  // orange
  return { ring: "#ff4e42", text: "#a8190f" };                    // red
}

function gauge(score, label, cx) {
  const r = 32;
  const circumference = 2 * Math.PI * r;
  const offset = circumference * (1 - Math.max(0, Math.min(100, score)) / 100);
  const { ring, text } = colorFor(score);
  return `
    <g transform="translate(${cx},10)">
      <circle cx="40" cy="40" r="${r}" fill="none" stroke="#eef0f3" stroke-width="6"/>
      <circle cx="40" cy="40" r="${r}" fill="none" stroke="${ring}" stroke-width="6"
              stroke-dasharray="${circumference.toFixed(2)}"
              stroke-dashoffset="${offset.toFixed(2)}"
              stroke-linecap="round"
              transform="rotate(-90 40 40)"/>
      <text x="40" y="47" text-anchor="middle"
            font-family="-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif"
            font-size="22" font-weight="700" fill="${text}">${score}</text>
      <text x="40" y="100" text-anchor="middle"
            font-family="-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif"
            font-size="11" font-weight="500" fill="#4b5563">${label}</text>
    </g>
  `;
}

function buildSvg(scores) {
  const gauges = CATEGORIES.map((c, i) => gauge(scores[c.key] ?? 0, c.label, 10 + i * 95)).join("");
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="400" height="140" viewBox="0 0 400 140">
  <rect width="400" height="140" rx="8" ry="8" fill="#ffffff" stroke="#e5e7eb" stroke-width="1"/>
  ${gauges}
  <text x="200" y="130" text-anchor="middle"
        font-family="-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif"
        font-size="9" fill="#9ca3af">Lighthouse · mobile · live audit via PageSpeed Insights</text>
</svg>`;
}

function placeholderSvg(message) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="400" height="140" viewBox="0 0 400 140">
  <rect width="400" height="140" rx="8" ry="8" fill="#fef3c7" stroke="#fcd34d" stroke-width="1"/>
  <text x="200" y="74" text-anchor="middle"
        font-family="-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif"
        font-size="13" fill="#92400e">${message}</text>
</svg>`;
}

export default async function handler(req, res) {
  const url = req.query?.url;

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Content-Type", "image/svg+xml; charset=utf-8");

  if (!url || !/^https?:\/\//.test(url)) {
    res.setHeader("Cache-Control", "public, max-age=60");
    res.status(400).send(placeholderSvg("Missing or invalid ?url= query parameter"));
    return;
  }

  try {
    const psi = new URL(PSI_ENDPOINT);
    psi.searchParams.set("url", url);
    psi.searchParams.set("strategy", "mobile");
    for (const { key } of CATEGORIES) psi.searchParams.append("category", key);
    if (process.env.PSI_API_KEY) psi.searchParams.set("key", process.env.PSI_API_KEY);

    const hasKey = Boolean(process.env.PSI_API_KEY);
    res.setHeader("X-PSI-Key-Present", hasKey ? "yes" : "no");

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 55_000);
    const r = await fetch(psi, { signal: controller.signal });
    clearTimeout(timeout);

    res.setHeader("X-PSI-Status", String(r.status));

    if (!r.ok) {
      const body = await r.text().catch(() => "");
      const snippet = body.slice(0, 400).replace(/\s+/g, " ");
      throw new Error(`PSI ${r.status} ${hasKey ? "(key sent)" : "(no key)"}: ${snippet}`);
    }
    const data = await r.json();
    const cats = data?.lighthouseResult?.categories ?? {};

    const scores = Object.fromEntries(
      CATEGORIES.map(({ key }) => [key, Math.round((cats[key]?.score ?? 0) * 100)])
    );

    // 1 day at the edge, serve stale for a week while revalidating in the background.
    res.setHeader("Cache-Control", "public, s-maxage=86400, stale-while-revalidate=604800");
    res.status(200).send(buildSvg(scores));
  } catch (err) {
    res.setHeader("Cache-Control", "public, max-age=60");
    res.setHeader("X-PSI-Error", err.message.slice(0, 500));
    const reason = err.name === "AbortError" ? "Audit still running — refresh in ~1 min" : "Audit failed — try again";
    res.status(200).send(placeholderSvg(reason));
  }
}
