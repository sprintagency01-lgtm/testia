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

// Un perfil claro no es «abierto» aunque varias fichas parecidas queden casi empatadas.
test("clearProfileNotFlat", () => {
  const u = prof({ S: 95, I: 85, IMP: 95, PER: 90, A: 10, E: 15, C: 20, R: 20 });
  const cluster = [0, 1, 2, 3, 4, 5].map((i) => ({ id: "c" + i, name: "C" + i, prof: prof({ S: 90 - i, I: 80 + i, IMP: 90, PER: 85 }) }));
  const r = win.orientMatch(u, cluster);
  assert(r[0].score - r[4].score < 3, "el caso de prueba debería tener el top 5 empatado");
  assert(win.orientFlat(u, r) === false, "perfil claro marcado como abierto");
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

// ===== Catálogos reales =====
const CAT = win.ORIENT_CATALOGS || {};
function checkCommon(list, label) {
  const ids = new Set();
  for (const e of list) {
    assert(e.id && !ids.has(e.id), `${label}: id repetido o vacío (${e.id})`);
    ids.add(e.id);
    assert(e.name && e.why && e.salidas, `${label}/${e.id}: falta name, why o salidas`);
    for (const k of DIMS) {
      const v = e.prof && e.prof[k];
      assert(typeof v === "number" && v >= 0 && v <= 100, `${label}/${e.id}: ${k}=${v}`);
    }
  }
}
// Perfiles al azar: ninguna ficha debe ganar para casi todo el mundo.
function spread(list, label, n = 2000) {
  let seed = 7;
  const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
  const wins = {};
  for (let i = 0; i < n; i++) {
    const p = Object.fromEntries(DIMS.map((k) => [k, Math.round(rnd() * 100)]));
    const id = win.orientMatch(p, list)[0].e.id;
    wins[id] = (wins[id] || 0) + 1;
  }
  const max = Math.max(...Object.values(wins));
  const maxId = Object.keys(wins).find((k) => wins[k] === max);
  assert(max / n <= 0.12, `${label}: «${maxId}» gana el ${Math.round((max / n) * 100)} % de las veces`);
  assert(Object.keys(wins).length >= 30, `${label}: solo ${Object.keys(wins).length} fichas ganan alguna vez`);
}

const ALTA = ["medicina", "odontologia", "enfermeria", "fisioterapia", "veterinaria", "biotecnologia"];
test("carreraIntegrity", () => {
  const L = CAT.carrera || [];
  assert(L.length >= 45, `solo ${L.length} grados`);
  checkCommon(L, "carrera");
  const ramas = new Set(L.map((e) => e.rama));
  for (const r of ["Artes y Humanidades", "Ciencias", "Ciencias de la Salud", "Ciencias Sociales y Jurídicas", "Ingeniería y Arquitectura"])
    assert(ramas.has(r), `falta la rama ${r}`);
  for (const e of L) {
    assert(e.bach && Array.isArray(e.asig) && e.asig.length, `carrera/${e.id}: falta bach o asig`);
    if (e.alta) assert(ALTA.includes(e.id) || e.id.startsWith("doble-"), `carrera/${e.id}: alta fuera de la lista`);
    if (e.fpAlt && (CAT.fp || []).length) assert(CAT.fp.some((f) => f.id === e.fpAlt), `carrera/${e.id}: fpAlt ${e.fpAlt} no existe`);
  }
});
test("carreraSpread", () => spread(CAT.carrera || [], "carrera"));

// Familias con ciclos de grado medio o superior en todofp.es (consultado el 2026-11-17).
// «Inteligencia artificial y data» aún no tiene ciclos de grado medio ni superior.
const FAMILIAS = ["Actividades Físicas y Deportivas","Administración y Gestión","Agraria","Artes y Artesanías","Artes Gráficas","Comercio y Marketing","Edificación y Obra Civil","Electricidad y Electrónica","Energía y Agua","Fabricación Mecánica","Hostelería y Turismo","Imagen Personal","Imagen y Sonido","Industrias Alimentarias","Industrias Extractivas","Informática y Comunicaciones","Instalación y Mantenimiento","Madera, Mueble y Corcho","Marítimo Pesquera","Química","Sanidad","Seguridad y Medio Ambiente","Servicios Socioculturales y a la Comunidad","Textil, Confección y Piel","Transporte y Mantenimiento de Vehículos","Vidrio y Cerámica"];
test("fpIntegrity", () => {
  const L = CAT.fp || [];
  checkCommon(L, "fp");
  for (const f of FAMILIAS) {
    const n = L.filter((e) => e.familia === f).length;
    assert(n >= 1 && n <= 6, `familia ${f}: ${n} ciclos`);
  }
  for (const e of L) {
    assert(FAMILIAS.includes(e.familia), `fp/${e.id}: familia desconocida ${e.familia}`);
    assert(e.nivel === "GM" || e.nivel === "GS", `fp/${e.id}: nivel ${e.nivel}`);
    assert(e.puente === (e.nivel === "GS"), `fp/${e.id}: puente incoherente con el nivel`);
    assert(e.name.startsWith(e.nivel === "GS" ? "Técnico Superior en " : "Técnico en "), `fp/${e.id}: nombre no oficial «${e.name}»`);
  }
  for (const c of CAT.carrera || []) if (c.fpAlt) {
    const f = L.find((x) => x.id === c.fpAlt);
    assert(f && f.nivel === "GS", `carrera/${c.id}: fpAlt ${c.fpAlt} no existe o no es de grado superior`);
  }
});
test("fpSpread", () => spread(CAT.fp || [], "fp"));

test("envPick", () => {
  assert(typeof win.orientEnv === "function", "orientEnv no existe");
  const a = win.orientEnv({ GRA: 40, PYM: 40, AUT_: 40, PUB: 80, REM: 70 });
  assert(a.env === "PUB" && a.remote === "remoto", `salió ${JSON.stringify(a)}`);
  const b = win.orientEnv({ GRA: 40, PYM: 40, AUT_: 40, PUB: 80, REM: 50 });
  assert(b.remote === null, `REM=50 debería ser null, salió ${b.remote}`);
  const c = win.orientEnv({ GRA: 90, PYM: 40, AUT_: 40, PUB: 20, REM: 30 });
  assert(c.env === "GRA" && c.remote === "presencial", `salió ${JSON.stringify(c)}`);
});
test("trabajoIntegrity", () => {
  const L = CAT.trabajo || [];
  assert(L.length >= 55, `solo ${L.length} profesiones`);
  checkCommon(L, "trabajo");
  for (const e of L) {
    assert(Array.isArray(e.entornos) && e.entornos.length && e.entornos.every((x) => ["GRA", "PYM", "AUT_", "PUB"].includes(x)), `trabajo/${e.id}: entornos ${e.entornos}`);
    assert(e.entrada, `trabajo/${e.id}: falta entrada`);
    assert(typeof e.rem === "boolean", `trabajo/${e.id}: falta rem (si se puede hacer en remoto)`);
  }
});
test("trabajoSpread", () => spread(CAT.trabajo || [], "trabajo"));

// ===== Revisión final =====
const tw = { TESTS: [], SEO_CONTENT: {} };
new Function("window", fs.readFileSync(path.join(root, "tests.js"), "utf8"))(tw);
const TT = (id) => tw.TESTS.find((t) => t.id === id);
test("cardBarsHidden", () => {
  for (const id of ["carrera", "fp", "trabajo"]) assert(TT(id) && TT(id).hideCardBars === true, `${id}: la carta gratis enseña las barras de pago`);
});
test("envTieNull", () => {
  assert(win.orientEnv({ GRA: 75, PYM: 75, AUT_: 25, PUB: 25, REM: 50 }).env === null, "empate GRA/PYM debería dar env null");
  assert(win.orientEnv({ GRA: 50, PYM: 50, AUT_: 50, PUB: 50, REM: 50 }).env === null, "todo a 50 debería dar env null");
  assert(win.orientEnv({ GRA: 50, PYM: 25, AUT_: 25, PUB: 0, REM: 50 }).env === null, "máximo ≤ 50 debería dar env null");
});
test("copyCounts", () => {
  const n = { carrera: [CAT.carrera.length, "grados"], fp: [CAT.fp.length, "ciclos"], trabajo: [CAT.trabajo.length, "profesiones"] };
  for (const id in n) {
    const [k, w] = n[id], S = tw.SEO_CONTENT[id];
    for (const f of ["metaDesc", "intro"]) assert(S[f].includes(`${k} ${w}`), `${id}.${f} no dice «${k} ${w}»`);
  }
  const src = fs.readFileSync(path.join(root, "tests.js"), "utf8");
  for (const m of src.matchAll(/(\d+) (grados universitarios|ciclos|profesiones)/g)) {
    const k = m[2] === "profesiones" ? CAT.trabajo.length : m[2] === "ciclos" ? CAT.fp.length : CAT.carrera.length;
    if (["58", "86", "62", "63"].includes(m[1])) assert(Number(m[1]) === k, `tests.js dice «${m[0]}» y el catálogo tiene ${k}`);
  }
});
test("factsFixed", () => {
  const T = (id) => CAT.trabajo.find((e) => e.id === id), C = (id) => CAT.carrera.find((e) => e.id === id);
  assert(!/ciclo/i.test(T("nutricionista").entrada), "dietista-nutricionista exige el grado");
  assert(!/máster habilitante/.test(T("ingeniero-industrial").entrada), "los grados regulados ya habilitan como ingeniero técnico");
  for (const c of CAT.carrera) assert(!c.asig.some((a) => /Lengua Castellana y Literatura II/.test(a)), `${c.id}: Lengua II es obligatoria, no se elige`);
  assert(C("enfermeria").fpAlt !== "lab-clinico", "Laboratorio Clínico no es alternativa natural a Enfermería");
});

const ok = results.filter((r) => r[1]).length;
for (const [n, pass, msg] of results) console.log(`${pass ? "OK  " : "FAIL"} ${n}${msg ? " — " + msg : ""}`);
console.log(`${ok}/${results.length} ${ok === results.length ? "OK" : "FALLAN"}`);
process.exit(ok === results.length ? 0 : 1);
