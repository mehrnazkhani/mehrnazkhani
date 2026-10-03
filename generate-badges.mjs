import { writeFileSync, mkdirSync } from "node:fs";
import * as icons from "simple-icons";

const customIcons = {
  Zustand: {
    path: "M5 13a7 7 0 1 0 14 0a7 7 0 1 0-14 0zM3.5 6.5a3 3 0 1 0 6 0a3 3 0 1 0-6 0zM14.5 6.5a3 3 0 1 0 6 0a3 3 0 1 0-6 0zM8.5 12a1 1 0 1 1 2 0a1 1 0 1 1-2 0zM13.5 12a1 1 0 1 1 2 0a1 1 0 1 1-2 0zM10.8 15a1.2 1.2 0 1 1 2.4 0a1.2 1.2 0 1 1-2.4 0z",
  },
};

const stack = [
  ["TypeScript", "siTypescript", "https://www.typescriptlang.org"],
  ["React", "siReact", "https://react.dev"],
  ["Next.js", "siNextdotjs", "https://nextjs.org"],
  ["Tailwind CSS", "siTailwindcss", "https://tailwindcss.com"],
  ["TanStack Query", "siReactquery", "https://tanstack.com/query"],
  ["Zod", "siZod", "https://zod.dev"],
  ["React Hook Form", "siReacthookform", "https://react-hook-form.com"],
  ["Zustand", "siZustand", "https://zustand.docs.pmnd.rs"],
  ["Supabase", "siSupabase", "https://supabase.com"],
  ["Vitest", "siVitest", "https://vitest.dev"],
];

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
const GAP_X = 3;
const GAP_Y = 3;

mkdirSync("assets/badges", { recursive: true });
const pics = {};

for (const [label, key, url] of stack) {
  const icon = icons[key] ?? customIcons[label];
  if (!icon) console.warn(`⚠️ Icon not found: ${label} (${key}) → فقط متن`);

  const iconW = icon ? 26 : 0;
  const textX = 14 + iconW;
  const W = Math.round(textX + label.length * 7.4 + 16);

  for (const [mode, t] of Object.entries(themes)) {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W + GAP_X * 2}" height="${H + GAP_Y * 2}" viewBox="0 0 ${W + GAP_X * 2} ${H + GAP_Y * 2}" role="img" aria-label="${label}">
  <g transform="translate(${GAP_X} ${GAP_Y})">
    <rect x="0.5" y="0.5" width="${W - 1}" height="${H - 1}" rx="${H / 2 - 0.5}" fill="none" stroke="${t.stroke}"/>
    ${icon ? `<path transform="translate(14 9) scale(0.75)" fill="${t.color}" d="${icon.path}"/>` : ""}
    <text x="${textX}" y="23" font-family="-apple-system,'Segoe UI',Helvetica,Arial,sans-serif" font-size="13" fill="${t.color}">${label}</text>
  </g>
</svg>`;
    writeFileSync(`assets/badges/${slug(label)}-${mode}.svg`, svg);
  }

  const s = slug(label);
  pics[label] =
    `<a href="${url}"><picture><source media="(prefers-color-scheme: dark)" srcset="assets/badges/${s}-dark.svg"><img alt="${label}" src="assets/badges/${s}-light.svg"></picture></a>`;
}

const snippet = `<p align="center">\n${rows
  .map((row) => row.map((l) => pics[l]).join("\n"))
  .join("\n<br>\n")}\n</p>`;

writeFileSync("assets/badges/readme-snippet.md", snippet + "\n");
console.log("✅ done → assets/badges/");
