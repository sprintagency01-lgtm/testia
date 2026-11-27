// Pruebas de contenido de los tests «¿Qué animal eres?» y «¿Eres alfa, beta, omega, sigma o enigma?».
// Uso: node scripts/test-animal-alfa.mjs
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const tw = { TESTS: [], SEO_CONTENT: {} };
new Function("window", fs.readFileSync(path.join(root, "tests.js"), "utf8"))(tw);
const TT = (id) => tw.TESTS.find((t) => t.id === id);
const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
const build = fs.readFileSync(path.join(root, "build-pages.mjs"), "utf8");

const results = [];
function test(name, fn) {
  try { fn(); results.push([name, true]); }
  catch (e) { results.push([name, false, e.message]); }
}
function assert(cond, msg) { if (!cond) throw new Error(msg); }

const SPEC = {
  animal: { scales: ["LOB", "BUH", "DEL", "GAT", "AGU", "ZOR", "OSO", "MAR"], per: 3, slug: "test-que-animal-eres" },
  alfa: { scales: ["ALF", "BET", "OME", "SIG", "ENI"], per: 4, slug: "test-alfa-beta-omega" },
};

for (const [id, s] of Object.entries(SPEC)) {
  test(`${id}Escalas`, () => {
    const T = TT(id);
    assert(T, "no existe");
    assert(T.result && T.result.type === "profileBars", "tipo de resultado");
    assert(JSON.stringify(Object.keys(T.scales)) === JSON.stringify(s.scales), "escalas: " + Object.keys(T.scales));
    for (const k of s.scales) {
      const n = T.items.filter((i) => i.s === k).length;
      assert(n === s.per, `${k}: ${n} ítems`);
      assert(T.topDesc[k] && T.topDesc[k].length > 80, `${k}: topDesc`);
      assert(T.interp[k] && T.interp[k].hi && T.interp[k].mid && T.interp[k].lo, `${k}: interp`);
    }
    assert(T.items.length === s.scales.length * s.per, "total de ítems");
  });
  test(`${id}Seo`, () => {
    const S = tw.SEO_CONTENT[id];
    assert(S && S.slug === s.slug, "slug");
    assert(S.faqs.length >= 5, "faqs");
    assert(S.sources.length >= 3, "fuentes");
    assert(/1,99 €/.test(S.faqs.map((f) => f.a).join(" ")), "precio en FAQ");
  });
  test(`${id}Registrado`, () => {
    for (const re of [new RegExp(`\\b${id}:\\{${s.scales[0]}:'Eres `), new RegExp(`ICON_OF=\\{[^}]*\\b${id}:"`), new RegExp(`NEXT_TEST=\\{[^}]*\\b${id}:\\[`), new RegExp(`TEST_CAT=\\{[^}]*\\b${id}:"personalidad"`)])
      assert(re.test(html), "index.html sin " + re);
    assert(new RegExp(`\\b${id}:"personalidad"`).test(build), "build-pages sin TEST_CAT");
  });
  test(`${id}Landing`, () => {
    assert(fs.existsSync(path.join(root, "test", s.slug + ".html")), "falta la landing");
  });
}

test("alfaSinContenidoSexualNiDespectivo", () => {
  const T = TT("alfa"), S = tw.SEO_CONTENT.alfa;
  assert(T && S, "no existe");
  const { sources, ...seo } = S; // las fuentes se citan con su título original (p. ej. «Macho alfa»)
  const all = JSON.stringify([T, seo]).toLowerCase();
  for (const w of ["sexual", "sexo", "celo", "apareamiento", "erótic", "erotic", "perdedor", "sumis", "inferior", "macho", "hembra"])
    assert(!all.includes(w), "contiene «" + w + "»");
});
test("betaYOmegaEnPositivo", () => {
  const T = TT("alfa");
  for (const k of ["BET", "OME"]) assert(!/débil|blando de verdad|fracas|menos que/.test(T.topDesc[k]), k);
});
test("encajeEnAltoYMedio", () => {
  // la parte de pago promete «con qué encajas»: tiene que salir aunque ningún perfil llegue a «alto»
  for (const id of ["animal", "alfa"]) for (const [k, v] of Object.entries(TT(id).interp))
    for (const lv of ["hi", "mid"]) assert(/Encajas con/.test(v[lv]), `${id}.${k}.${lv}`);
});
test("iconoPaw", () => {
  assert(/\bpaw:/.test(html), "falta el icono paw en ICONS");
});

let ok = 0;
for (const [n, pass, msg] of results) { console.log(`${pass ? "✓" : "✗"} ${n}${pass ? "" : " — " + msg}`); if (pass) ok++; }
console.log(`${ok}/${results.length}`);
process.exit(ok === results.length ? 0 : 1);
