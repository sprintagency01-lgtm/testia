/* Valida una guía nueva del blog antes de publicarla. Sin dependencias.
   Uso: node scripts/validate-blog.mjs <raíz del árbol> blog/<slug>.html */
import fs from "node:fs";
import path from "node:path";

const [root, rel] = process.argv.slice(2);
if (!root || !rel) { console.error("uso: validate-blog.mjs <raíz> blog/<slug>.html"); process.exit(2); }

const file = path.join(root, rel);
const slug = path.basename(rel, ".html");
const html = fs.readFileSync(file, "utf8");
const errors = [];
const match = (re) => html.match(re)?.[1]?.trim();
const count = (re) => (html.match(re) || []).length;

const title = match(/<title>([^<]+)<\/title>/);
const description = match(/<meta name="description" content="([^"]+)">/);
const canonical = match(/<link rel="canonical" href="([^"]+)">/);
if (!title) errors.push("falta <title>");
else if (title.length < 40 || title.length > 75) errors.push(`title de ${title.length} caracteres (debe estar entre 40 y 75)`);
if (!description) errors.push("falta meta description");
else if (description.length < 120 || description.length > 170) errors.push(`description de ${description.length} caracteres (debe estar entre 120 y 170)`);
if (canonical !== `https://www.testia.info/blog/${slug}`) errors.push(`canonical incorrecto: ${canonical}`);
if (!html.includes('<html lang="es">')) errors.push("falta lang=es");
if (!html.includes("/posthog-analytics.js")) errors.push("falta el script de PostHog");
if (!html.includes("/_vercel/insights/script.js")) errors.push("falta Vercel insights");
if (!html.includes('<div class="summary">')) errors.push("falta el bloque .summary (respuesta rápida)");
if (!html.includes('<div class="cta">')) errors.push("falta el bloque .cta con enlace a un test");
if (!html.includes('<h2>Preguntas frecuentes</h2>')) errors.push("falta la sección Preguntas frecuentes");
if (!html.includes('<h2>Fuentes consultadas</h2>')) errors.push("falta la sección Fuentes consultadas");
if (!html.includes('<div class="related">')) errors.push("falta el bloque .related");
if (!html.includes('<p class="disc">')) errors.push("falta el aviso final .disc");
if (/<img\b|<figure\b/.test(html)) errors.push("no se permiten <img> ni <figure>");
if (/[\u{1F300}-\u{1FAFF}]/u.test(html)) errors.push("hay emojis");

const h2 = count(/<h2>/g);
if (h2 < 7) errors.push(`solo ${h2} secciones <h2> (mínimo 7 incluyendo FAQ y fuentes)`);
const faqs = count(/<h3>¿[^<]+<\/h3>/g);
if (faqs < 5) errors.push(`solo ${faqs} preguntas frecuentes (mínimo 5)`);

const tables = html.match(/<table class="table">[\s\S]*?<\/table>/g) || [];
if (tables.length < 3) errors.push(`solo ${tables.length} tablas (mínimo 3)`);
for (const [i, t] of tables.entries()) {
  const rows = (t.match(/<tr>[\s\S]*?<\/tr>/g) || []).map(r => (r.match(/<t[hd]\b/g) || []).length);
  if (!t.includes("<thead>")) errors.push(`tabla ${i + 1} sin <thead>`);
  if (rows.length < 3) errors.push(`tabla ${i + 1} con menos de 2 filas de datos`);
  if (new Set(rows).size > 1) errors.push(`tabla ${i + 1} con filas de distinto número de columnas`);
}

const text = html.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>|<[^>]+>/g, " ");
const words = text.split(/\s+/).filter(Boolean).length;
if (words < 1500) errors.push(`solo ${words} palabras de texto (mínimo 1.500)`);

try {
  const ld = JSON.parse(match(/<script type="application\/ld\+json">([\s\S]+?)<\/script>/) || "null");
  const graph = ld?.["@graph"] || [];
  const article = graph.find(n => n["@type"] === "Article");
  const faq = graph.find(n => n["@type"] === "FAQPage");
  if (!article) errors.push("JSON-LD sin Article");
  else {
    if (article.url !== canonical) errors.push("JSON-LD Article.url no coincide con canonical");
    if (!/^\d{4}-\d{2}-\d{2}$/.test(article.datePublished || "")) errors.push("JSON-LD sin datePublished válido");
  }
  if (!faq) errors.push("JSON-LD sin FAQPage");
  else if ((faq.mainEntity || []).length !== faqs) errors.push(`FAQPage tiene ${(faq.mainEntity || []).length} preguntas y el HTML ${faqs}`);
} catch { errors.push("JSON-LD inválido"); }

for (const [, href] of html.matchAll(/href="(\/(?:blog|test)\/[^"?#]+)"/g)) {
  if (!fs.existsSync(path.join(root, `${href}.html`))) errors.push(`enlace interno roto ${href}`);
}
const internal = count(/href="\/blog\/[^"]+"/g);
if (internal < 3) errors.push(`solo ${internal} enlaces a otras guías (mínimo 3)`);
if (!/href="\/test\/[^"]+"/.test(html)) errors.push("no enlaza a ningún test");
const external = count(/href="https?:\/\/(?!www\.testia\.info)[^"]+"/g);
if (external < 3) errors.push(`solo ${external} enlaces externos a fuentes (mínimo 3)`);

const index = fs.readFileSync(path.join(root, "blog.html"), "utf8");
if (!index.includes(`href="/blog/${slug}"`)) errors.push("blog.html no enlaza la guía");
else if (index.indexOf(`href="/blog/${slug}"`) > index.indexOf('<a class="card"', index.indexOf('<div class="wrap grid">') + 30)) errors.push("la guía no es la primera tarjeta de blog.html");
const sitemap = fs.readFileSync(path.join(root, "sitemap.xml"), "utf8");
if (!sitemap.includes(`<loc>https://www.testia.info/blog/${slug}</loc>`)) errors.push("sitemap.xml no contiene la guía");
const plan = fs.readFileSync(path.join(root, "plan-editorial-seo.md"), "utf8");
if (!plan.includes(`/blog/${slug}`)) errors.push("plan-editorial-seo.md no registra la guía");

if (errors.length) { console.error(errors.map(e => `${rel}: ${e}`).join("\n")); process.exit(1); }
console.log(`Guía válida: ${rel} (${words} palabras, ${tables.length} tablas, ${faqs} FAQ, ${h2} secciones).`);
