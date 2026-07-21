/* Validación ligera de las landings generadas. No requiere dependencias. */
import fs from "node:fs";
import path from "node:path";

const dir = "test";
const files = fs.readdirSync(dir).filter(file => file.endsWith(".html"));
const existing = new Set(files.map(file => file.replace(/\.html$/, "")));
const titles = new Set();
const canonicals = new Set();
const errors = [];

const match = (html, pattern) => html.match(pattern)?.[1]?.trim();

for (const file of files) {
  const html = fs.readFileSync(path.join(dir, file), "utf8");
  const title = match(html, /<title>([^<]+)<\/title>/);
  const description = match(html, /<meta name="description" content="([^"]+)">/);
  const canonical = match(html, /<link rel="canonical" href="([^"]+)">/);
  const ldText = match(html, /<script type="application\/ld\+json">([\s\S]+?)<\/script>/);

  if (!title) errors.push(`${file}: falta <title>`);
  if (!description) errors.push(`${file}: falta meta description`);
  if (!canonical) errors.push(`${file}: falta canonical`);
  if (!html.includes("Responder gratis")) errors.push(`${file}: falta CTA principal`);
  if (!html.includes("1,99 €")) errors.push(`${file}: falta información transparente del precio`);
  if (title && titles.has(title)) errors.push(`${file}: título duplicado`);
  if (canonical && canonicals.has(canonical)) errors.push(`${file}: canonical duplicado`);
  if (title) titles.add(title);
  if (canonical) canonicals.add(canonical);

  try {
    const ld = JSON.parse(ldText);
    const quiz = ld["@graph"]?.find(node => node["@type"] === "Quiz");
    if (!quiz) errors.push(`${file}: falta Quiz en JSON-LD`);
    if (file === "test-de-ci.html" && (quiz?.numberOfQuestions !== 32 || quiz?.timeRequired !== "PT15M")) {
      errors.push(`${file}: preguntas o duración no coinciden con el test real`);
    }
  } catch {
    errors.push(`${file}: JSON-LD inválido`);
  }

  for (const [, slug] of html.matchAll(/href="\/test\/([^"?#]+)"/g)) {
    if (!existing.has(slug)) errors.push(`${file}: enlace interno roto /test/${slug}`);
  }
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log(`Validación correcta: ${files.length} landings, metadatos, JSON-LD y enlaces internos.`);
