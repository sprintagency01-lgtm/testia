/* tests-app.js: lo que la app (index.html) necesita de tests.js, sin los textos SEO.

   tests.js sigue siendo la fuente: ahí se editan preguntas, resultados y SEO_CONTENT.
   SEO_CONTENT (intro, FAQ, fuentes de cada landing) es más de la mitad del archivo y la
   app solo usa el slug de cada test, así que el navegador carga este archivo generado:
   TESTS completos + un SEO_CONTENT con solo {slug}. Lo escribe `node build-pages.mjs`
   y `node validate-pages.mjs` falla si se ha quedado desfasado respecto a tests.js. */
import fs from "node:fs";
import crypto from "node:crypto";

export const APP_FILE = "tests-app.js";
// Las dos copias de la portada que cargan el banco de tests.
export const APP_PAGES = ["index.html", "testia.html"];
const TAG = /<script src="tests(?:-app)?\.js\?v=[^"]*"><\/script>/;

export function buildTestsApp(src = fs.readFileSync("tests.js", "utf8")) {
  const win = {};
  new Function("window", src)(win);
  const known = ["TESTS", "SEO_CONTENT", "RIASEC_CAREERS", "ORIENT_SCALES", "ORIENT_MIX"];
  const extra = Object.keys(win).filter(k => !known.includes(k));
  if (extra.length) throw new Error(`tests.js define globales que tests-app.js no copia: ${extra.join(", ")}`);
  const slugs = Object.fromEntries(Object.entries(win.SEO_CONTENT).map(([id, s]) => [id, { slug: s.slug }]));
  const code = `/* GENERADO por build-pages.mjs a partir de tests.js: no lo edites a mano.
   Cambia tests.js y ejecuta \`node build-pages.mjs\`. Es tests.js sin los textos SEO
   de las landings: de SEO_CONTENT la app solo necesita el slug. */
window.TESTS=[
${win.TESTS.map(t => JSON.stringify(t)).join(",\n")}
];
window.SEO_CONTENT=${JSON.stringify(slugs)};
window.RIASEC_CAREERS=${JSON.stringify(win.RIASEC_CAREERS)};
window.ORIENT_SCALES=${JSON.stringify(win.ORIENT_SCALES)};
window.ORIENT_MIX=${win.ORIENT_MIX.toString()};
`;
  const version = crypto.createHash("sha1").update(code).digest("hex").slice(0, 10);
  return { code, tag: `<script src="${APP_FILE}?v=${version}"></script>` };
}

export function writeTestsApp() {
  const { code, tag } = buildTestsApp();
  fs.writeFileSync(APP_FILE, code);
  for (const f of APP_PAGES) {
    if (!fs.existsSync(f)) continue;
    const h = fs.readFileSync(f, "utf8");
    if (!TAG.test(h)) throw new Error(`${f}: no encuentro la etiqueta <script> de tests.js / tests-app.js`);
    fs.writeFileSync(f, h.replace(TAG, () => tag));
  }
}

// Errores si tests-app.js o la etiqueta de las portadas no corresponden al tests.js actual.
export function checkTestsApp() {
  const { code, tag } = buildTestsApp(), errors = [];
  if (!fs.existsSync(APP_FILE) || fs.readFileSync(APP_FILE, "utf8") !== code)
    errors.push(`${APP_FILE}: desfasado respecto a tests.js (ejecuta node build-pages.mjs)`);
  for (const f of APP_PAGES) {
    if (!fs.existsSync(f)) continue;
    if (!fs.readFileSync(f, "utf8").includes(tag)) errors.push(`${f}: no carga ${tag} (ejecuta node build-pages.mjs)`);
  }
  return errors;
}
