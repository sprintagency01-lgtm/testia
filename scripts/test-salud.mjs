// Pruebas del motor de puntuación de los tests de TDAH, ansiedad, rasgos autistas y 16 tipos.
// Uso: node scripts/test-salud.mjs
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const win = {};
new Function("window", fs.readFileSync(path.join(root, "salud.js"), "utf8"))(win);

const results = [];
function test(name, fn) {
  try { fn(); results.push([name, true]); }
  catch (e) { results.push([name, false, e.message]); }
}
function assert(cond, msg) { if (!cond) throw new Error(msg); }

test("asrsPositive", () => {
  const r = win.asrsScreen([3, 3, 3, 4, 4, 1]);
  assert(r.positive === true && r.count === 5, JSON.stringify(r));
});
test("asrsItem4AVeces", () => {
  const r = win.asrsScreen([3, 3, 3, 3, 1, 1]);
  assert(r.count === 3 && r.positive === false, JSON.stringify(r));
});
test("asrsAllNever", () => {
  assert(win.asrsScreen([1, 1, 1, 1, 1, 1]).count === 0, "count");
});
test("gad7Edges", () => {
  // suma de (v-1): construir respuestas con la suma deseada
  const withSum = (n) => { const v = [1, 1, 1, 1, 1, 1, 1]; let i = 0; while (n > 0) { const add = Math.min(3, n); v[i++] += add; n -= add; } return v; };
  const exp = { 4: "minima", 5: "leve", 9: "leve", 10: "moderada", 14: "moderada", 15: "grave" };
  for (const [n, b] of Object.entries(exp)) {
    const r = win.gad7Score(withSum(+n));
    assert(r.score === +n && r.band === b, `${n}: ${JSON.stringify(r)}`);
  }
  assert(win.gad7Score([4, 4, 4, 4, 4, 4, 4]).score === 21, "21");
});
test("traitBandEdges", () => {
  assert(win.traitBand(39.9) === "bajo", "39.9");
  assert(win.traitBand(40) === "medio", "40");
  assert(win.traitBand(65.9) === "medio", "65.9");
  assert(win.traitBand(66) === "alto", "66");
});
test("type16Basic", () => {
  const r = win.type16({ E: 80, O: 20, A: 30, C: 70 });
  assert(r.code === "ESTJ", r.code);
  assert(r.parts.find((p) => p.axis === "EI").strength === 60, JSON.stringify(r.parts));
});
test("type16Tie", () => {
  assert(win.type16({ E: 50, O: 50, A: 50, C: 50 }).code === "ENFJ", "tie");
});

let ok = 0;
for (const [n, pass, msg] of results) { console.log(`${pass ? "✓" : "✗"} ${n}${pass ? "" : " — " + msg}`); if (pass) ok++; }
console.log(`${ok}/${results.length}`);
process.exit(ok === results.length ? 0 : 1);
