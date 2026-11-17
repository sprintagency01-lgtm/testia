// Pruebas del motor de emparejamiento de los tests de orientación (carrera, fp, trabajo).
// Uso: node scripts/test-orientacion.mjs
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const win = {};
new Function("window", fs.readFileSync(path.join(root, "orientacion-catalogos.js"), "utf8"))(win);

const DIMS = ["R","I","A","S","E","C","NUM","LEN","MAN","PER","EST","ING","IMP","AUT"];
const prof = (o = {}, base = 50) => Object.fromEntries(DIMS.map((k) => [k, o[k] ?? base]));
const results = [];
function test(name, fn) {
  try { fn(); results.push([name, true]); }
  catch (e) { results.push([name, false, e.message]); }
}
function assert(cond, msg) { if (!cond) throw new Error(msg); }

// Catálogo de prueba propio (no depende del catálogo real).
const fichas = [
  { id: "a", name: "A", prof: prof({ R: 90, MAN: 85 }) },
  { id: "b", name: "B", prof: prof({ I: 90, NUM: 85 }) },
  { id: "c", name: "C", prof: prof({ A: 90, AUT: 85 }) },
  { id: "d", name: "D", prof: prof({ S: 90, IMP: 85, PER: 80 }) },
  { id: "e", name: "E", prof: prof({ E: 90, ING: 85 }) },
  { id: "f", name: "F", prof: prof({ C: 90, EST: 85 }) },
];

test("perfect", () => {
  const r = win.orientMatch({ ...fichas[3].prof }, fichas);
  assert(r[0].e.id === fichas[3].id, `top esperado ${fichas[3].id}, salió ${r[0].e.id}`);
  assert(r[0].score >= 99, `score ${r[0].score} < 99`);
  assert(Number.isInteger(r[0].score), "score no es entero");
});

test("neutral", () => {
  const pct = prof({}, 50);
  const r = win.orientMatch(pct, fichas);
  assert(win.orientFlat(pct, r) === true, "todo a 50 debería ser perfil abierto");
});

test("interestsWeighMore", () => {
  const cat = [
    { id: "s", name: "S", prof: prof({ S: 90, EST: 90 }) },
    { id: "est", name: "EST", prof: prof({ S: 10, EST: 10 }) },
  ];
  // Usuario: S alto (coincide con «s» en intereses) y EST bajo (coincide con «est» en valores).
  const r = win.orientMatch(prof({ S: 90, EST: 10 }), cat);
  assert(r[0].e.id === "s", `debería ganar la coincidencia en intereses, salió ${r[0].e.id}`);
});

test("topDims", () => {
  const p = prof({ I: 80, NUM: 75 }, 30);
  const r = win.orientMatch({ ...p }, [{ id: "x", name: "X", prof: p }]);
  assert(r[0].top.includes("I") && r[0].top.includes("NUM"), `top = ${JSON.stringify(r[0].top)}`);
  assert(r[0].top.length <= 3, "top con más de 3 dimensiones");
});

const ok = results.filter((r) => r[1]).length;
for (const [n, pass, msg] of results) console.log(`${pass ? "OK  " : "FAIL"} ${n}${msg ? " — " + msg : ""}`);
console.log(`${ok}/${results.length} ${ok === results.length ? "OK" : "FALLAN"}`);
process.exit(ok === results.length ? 0 : 1);
