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

const win = {};
new Function("window", fs.readFileSync(path.join(root, "salud.js"), "utf8"))(win);

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

// ----- Revisión final: desempates, afinidades y textos -----
test("desempatePorRespuestasMaximas", () => {
  const r = win.rankProfiles({ ALF: 50, BET: 50, OME: 20 }, ["ALF", "BET", "OME"], { ALF: [0, 2], BET: [1, 0], OME: [0, 0] });
  assert(JSON.stringify(r) === JSON.stringify(["BET", "ALF", "OME"]), JSON.stringify(r));
});
test("desempateSegundoCriterio", () => {
  const r = win.rankProfiles({ ALF: 50, BET: 50 }, ["ALF", "BET"], { ALF: [1, 0], BET: [1, 2] });
  assert(r[0] === "BET", JSON.stringify(r));
});
test("sinEmpateManda el porcentaje", () => {
  const r = win.rankProfiles({ ALF: 40, BET: 60 }, ["ALF", "BET"], { ALF: [5, 0], BET: [0, 0] });
  assert(r[0] === "BET", JSON.stringify(r));
});
test("perfilGanadorNuncaEnBajo", () => {
  assert(win.interpLevel(10, true) === "mid", "top bajo");
  assert(win.interpLevel(10, false) === "lo", "no top bajo");
  assert(win.interpLevel(70, true) === "hi", "top alto");
  assert(win.interpLevel(50, false) === "mid", "medio");
});
test("motorUsaDesempateNivelYAfinidad", () => {
  for (const re of [/rankProfiles\(/, /interpLevel\(/, /T\.match/, /Con quién te complementas/]) assert(re.test(html), "index.html sin " + re);
});
test("afinidadesSimetricas", () => {
  for (const id of ["animal", "alfa"]) {
    const T = TT(id), m = T.match;
    assert(m, id + " sin match");
    for (const k of Object.keys(T.scales)) {
      assert(m[k] && m[k].length === 2, `${id}.${k}: ${m[k]}`);
      for (const o of m[k]) assert(m[o] && m[o].includes(k), `${id}: ${k}→${o} sin vuelta`);
      for (const o of m[k]) assert(T.matchText[k].toLowerCase().includes(T.scales[o].toLowerCase()), `${id}.${k}: matchText sin ${o}`);
    }
  }
});
test("sinEncajasEnLosTextos", () => {
  for (const id of ["animal", "alfa"]) {
    const T = TT(id), S = tw.SEO_CONTENT[id];
    const txt = JSON.stringify([T.interp, T.premiumPitch, S.metaDesc, S.learn, S.faqs]);
    assert(!/[Ee]ncaj/.test(txt), id + ": «encaja» suena a pareja");
  }
});
test("textosNeutrosEnGenero", () => {
  const bad = ["creativo", "ambicioso", "empático", "protector", "observador", "reflexivo", "juguetón", "cariñoso", "astuto", "tranquilo", "centrado", "selectivo", "atrapado", "ingenioso", "rapidísimo", "solo alfa"];
  for (const id of ["animal", "alfa"]) {
    const txt = JSON.stringify([TT(id).topDesc, TT(id).interp]).toLowerCase();
    for (const w of bad) assert(!txt.includes(w), `${id}: «${w}»`);
  }
});
test("mitoDelLoboBienAtribuido", () => {
  const sec = tw.SEO_CONTENT.alfa.sections.find((x) => /mito/.test(x.title)).body;
  // Schenkel la usó primero (1947, cautividad); Mech la descartó en 1999 tras revisar estudios y observar en libertad.
  assert(/1947/.test(sec) && /revisar/.test(sec) && !/la popularizó el estudio/.test(sec), sec);
});
test("instrumentAnimalSimbolismo", () => {
  assert(/simbolismo popular/.test(TT("animal").instrument), TT("animal").instrument);
});
test("alfaSinEnlaceAOmegaverseNiTriadaOscura", () => {
  const S = tw.SEO_CONTENT.alfa;
  assert(!S.sources.some((x) => /Omegaverse/.test(x.url)), "enlace a Omegaverse");
  assert(!S.relatedIds.includes("darktriad"), "relatedIds darktriad");
  assert(!/alfa:\[[^\]]*darktriad/.test(html), "NEXT_TEST darktriad");
});
test("nombresYTitulos", () => {
  assert(!/^Test:/.test(TT("alfa").name), "prefijo Test:");
  for (const id of ["animal", "alfa"]) assert(tw.SEO_CONTENT[id].seoTitle.length <= 66, id + ": " + tw.SEO_CONTENT[id].seoTitle.length);
});
test("iconoPaw", () => {
  assert(/\bpaw:/.test(html), "falta el icono paw en ICONS");
});

let ok = 0;
for (const [n, pass, msg] of results) { console.log(`${pass ? "✓" : "✗"} ${n}${pass ? "" : " — " + msg}`); if (pass) ok++; }
console.log(`${ok}/${results.length}`);
process.exit(ok === results.length ? 0 : 1);
