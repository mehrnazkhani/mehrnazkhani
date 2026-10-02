import fs from "node:fs";
import * as icons from "simple-icons";

const badges = [
  ["typescript", "TypeScript"],
  ["react", "React"],
  ["nextdotjs", "Next.js", "000000"],
  ["tailwindcss", "Tailwind CSS"],
  ["reactquery", "TanStack Query"],
  ["zod", "Zod"],
  ["zustand", "🐻 Zustand", "9c7a5b"],
  ["supabase", "Supabase"],
  ["cloudflare", "Cloudflare"],
  ["vitest", "Vitest"],
];

const all = Object.values(icons).filter((i) => i && i.slug);
fs.mkdirSync("badges", { recursive: true });

for (const [slug, label, colorOverride] of badges) {
  const icon = all.find((i) => i.slug === slug);
  if (!icon && !colorOverride) {
    console.warn(`Icon not found: ${slug}`);
    continue;
  }

  const color = `#${colorOverride ?? icon.hex}`;
  const height = 28;
  const iconSize = icon ? 14 : 0;
  const pad = 10;
  const gap = icon ? 6 : 0;
  const textWidth = Math.round(label.length * 7.2);
  const width = pad + iconSize + gap + textWidth + pad;

  const iconMarkup = icon
    ? `<g transform="translate(${pad}, ${(height - iconSize) / 2}) scale(${iconSize / 24})"><path d="${icon.path}" fill="${color}"/></g>`
    : "";

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-label="${label}">
  <rect x="1" y="1" width="${width - 2}" height="${height - 2}" rx="6" fill="none" stroke="${color}" stroke-width="1.5"/>
  ${iconMarkup}
  <text x="${pad + iconSize + gap}" y="${height / 2 + 4}" fill="${color}" font-family="Verdana, Geneva, sans-serif" font-size="12" font-weight="600">${label}</text>
</svg>`;

  fs.writeFileSync(`badges/${slug}.svg`, svg);
  console.log(`✓ badges/${slug}.svg`);
}
