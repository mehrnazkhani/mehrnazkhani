import { writeFileSync, mkdirSync } from "node:fs";
import * as icons from "simple-icons";

// آیکون‌هایی که توی simple-icons نیستن (viewBox 24x24)
const customIcons = {
  Zustand: {
    path: "M5 13a7 7 0 1 0 14 0a7 7 0 1 0-14 0zM3.5 6.5a3 3 0 1 0 6 0a3 3 0 1 0-6 0zM14.5 6.5a3 3 0 1 0 6 0a3 3 0 1 0-6 0zM8.5 12a1 1 0 1 1 2 0a1 1 0 1 1-2 0zM13.5 12a1 1 0 1 1 2 0a1 1 0 1 1-2 0zM10.8 15a1.2 1.2 0 1 1 2.4 0a1.2 1.2 0 1 1-2.4 0z",
  },
};

const stack = [
  ["TypeScript", "siTypescript"],
  ["React", "siReact"],
  ["Next.js", "siNextdotjs"],
  ["Tailwind CSS", "siTailwindcss"],
  ["TanStack Query", "siReactquery"],
  ["Zod", "siZod"],
  ["React Hook Form", "siReacthookform"],
  ["Zustand", "siZustand"],
  ["Supabase", "siSupabase"],
  ["Vitest", "siVitest"],
];

// چیدمان ردیف‌ها در README
const rows = [
  ["TypeScript", "React", "Next.js", "Tailwind CSS"],
  ["Zod", "React Hook Form", "Zustand", "TanStack Query"],
  ["Vitest", "Supabase"],
];

const themes = {
  light: { stroke: "#d0d7de", color: "#424a53" },
  dark: { stroke: "#3d444d", color: "#9198a1" },
};

const slug = (s) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/-$/, "");

const H = 36;
const GAP = 6; // حاشیهٔ شفاف دور هر بدج؛ فاصلهٔ بین دو بدج = 2 × GAP

mkdirSync("assets/badges", { recursive: true });
const pics = {};

for (const [label, key] of stack) {
  const icon = icons[key] ?? customIcons[label];
  if (!icon) console.warn(`⚠️ Icon not found: ${label} (${key}) → فقط متن`);

  const iconW = icon ? 26 : 0;
  const textX = 14 + iconW;
  const W = Math.round(textX + label.length * 7.4 + 16);

  for (const [mode, t] of Object.entries(themes)) {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W + GAP * 2}" height="${H + GAP * 2}" viewBox="0 0 ${W + GAP * 2} ${H + GAP * 2}" role="img" aria-label="${label}">
  <g transform="translate(${GAP} ${GAP})">
    <rect x="0.5" y="0.5" width="${W - 1}" height="${H - 1}" rx="${H / 2 - 0.5}" fill="none" stroke="${t.stroke}"/>
    ${icon ? `<path transform="translate(14 9) scale(0.75)" fill="${t.color}" d="${icon.path}"/>` : ""}
    <text x="${textX}" y="23" font-family="-apple-system,'Segoe UI',Helvetica,Arial,sans-serif" font-size="13" fill="${t.color}">${label}</text>
  </g>
</svg>`;
    writeFileSync(`assets/badges/${slug(label)}-${mode}.svg`, svg);
  }

  const s = slug(label);
  pics[label] =
    `<picture><source media="(prefers-color-scheme: dark)" srcset="assets/badges/${s}-dark.svg"><img alt="${label}" src="assets/badges/${s}-light.svg"></picture>`;
}

const snippet = rows
  .map(
    (row) => `<p align="center">\n${row.map((l) => pics[l]).join("\n")}\n</p>`,
  )
  .join("\n\n");

writeFileSync("assets/badges/readme-snippet.md", snippet + "\n");
console.log("✅ done → assets/badges/");
