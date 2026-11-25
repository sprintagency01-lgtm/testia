// Pruebas del paso «abrir en Safari/Chrome para pagar» desde el navegador de Instagram.
// Uso: node scripts/test-iab-handoff.mjs
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const win = {};
new Function("window", fs.readFileSync(path.join(root, "iab-handoff.js"), "utf8"))(win);
const H = win.IAB;

const results = [];
async function test(name, fn) {
  try { await fn(); results.push([name, true]); }
  catch (e) { results.push([name, false, e.message]); }
}
function assert(cond, msg) { if (!cond) throw new Error(msg); }

const UA = {
  igIos: "Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 Instagram 345.0.0.0 (iPhone14,5; iOS 17_5; es_ES; es; scale=3.00; 1170x2532)",
  igAndroid: "Mozilla/5.0 (Linux; Android 14; SM-A546B Build/UP1A; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/129.0.6668.100 Mobile Safari/537.36 Instagram 350.0.0.0 Android (34/14; 450dpi; 1080x2340; samsung; SM-A546B; a54x; s5e8835; es_ES)",
  fbAndroid: "Mozilla/5.0 (Linux; Android 13; Pixel 7 Build/TQ3A; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/128.0 Mobile Safari/537.36 [FB_IAB/FB4A;FBAV/480.0.0.0;]",
  tiktokIos: "Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 musical_ly_32.5.0 BytedanceWebview/d8a21c6",
  safari: "Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Mobile/15E148 Safari/604.1",
  chrome: "Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0 Mobile Safari/537.36",
};

await test("detecta Instagram en iPhone", () => {
  const d = H.detect(UA.igIos);
  assert(d && d.app === "Instagram" && d.os === "ios", JSON.stringify(d));
});
await test("detecta Instagram en Android", () => {
  const d = H.detect(UA.igAndroid);
  assert(d && d.app === "Instagram" && d.os === "android", JSON.stringify(d));
});
await test("detecta Facebook y TikTok", () => {
  assert(H.detect(UA.fbAndroid)?.app === "Facebook", "Facebook");
  assert(H.detect(UA.tiktokIos)?.app === "TikTok", "TikTok");
});
await test("Safari y Chrome normales no son navegador de app", () => {
  assert(H.detect(UA.safari) === null, "Safari");
  assert(H.detect(UA.chrome) === null, "Chrome");
  assert(H.detect("") === null && H.detect(undefined) === null, "vacío");
});

const sample = { v: 1, t: "iq", pwv: "control", ts: 1764000000000,
  r: { name: "Superior", desc: "Tu puntuación te sitúa en la categoría «Superior». Ñandú, acentos: áéíóú.",
       full: { analysis: Array.from({ length: 7 }, (_, i) => ({ lab: "Bloque " + i, text: "Lectura personal larga ".repeat(12) })) },
       bars: [{ k: "Verbal", v: 71 }, { k: "Numérico", v: 64 }] } };

await test("codificar y decodificar devuelve lo mismo (con tildes)", async () => {
  const s = await H.encode(sample);
  assert(/^[zj]\.[A-Za-z0-9_-]+$/.test(s), "formato: " + s.slice(0, 20));
  const back = await H.decode(s);
  assert(JSON.stringify(back) === JSON.stringify(sample), "no coincide");
});
await test("comprime cuando hay CompressionStream", async () => {
  const s = await H.encode(sample);
  assert(s.startsWith("z."), "debería empezar por z.");
  assert(s.length < JSON.stringify(sample).length, `no comprime: ${s.length}`);
});
await test("sin CompressionStream usa texto plano y se lee igual", async () => {
  const s = await H.encode(sample, { noCompress: true });
  assert(s.startsWith("j."), s.slice(0, 5));
  assert(JSON.stringify(await H.decode(s)) === JSON.stringify(sample), "no coincide");
});
await test("basura o vacío devuelve null sin romper", async () => {
  assert((await H.decode("z.!!!")) === null, "z basura");
  assert((await H.decode("j.bm8")) === null, "j no-JSON");
  assert((await H.decode("")) === null && (await H.decode(null)) === null, "vacío");
});

await test("lee el resultado del hash y lo ignora si no hay", () => {
  assert(H.fromHash("#res=z.abc") === "z.abc", "con res");
  assert(H.fromHash("#pareja=1234") === null, "otro hash");
  assert(H.fromHash("") === null, "vacío");
});

await test("enlace para iPhone abre Safari con el resultado", () => {
  const u = H.openUrl({ os: "ios", origin: "https://www.testia.info", path: "/", payload: "z.abc" });
  assert(u === "x-safari-https://www.testia.info/#res=z.abc", u);
});
await test("enlace para Android abre Chrome con el resultado", () => {
  const u = H.openUrl({ os: "android", origin: "https://www.testia.info", path: "/", payload: "z.abc" });
  assert(u === "intent://www.testia.info/#res=z.abc#Intent;scheme=https;package=com.android.chrome;end", u);
});
await test("enlace normal (para copiar) lleva el resultado en el hash", () => {
  const u = H.plainUrl({ origin: "https://www.testia.info", path: "/", payload: "z.abc" });
  assert(u === "https://www.testia.info/#res=z.abc", u);
});

await test("caduca a las 24 horas", () => {
  const now = 1764000000000;
  assert(H.fresh({ ts: now - 3600e3 }, now) === true, "1 h");
  assert(H.fresh({ ts: now - 25 * 3600e3 }, now) === false, "25 h");
  assert(H.fresh({}, now) === false, "sin ts");
});

const s1 = await H.encode(sample);
console.log(`(tamaño del enlace de ejemplo: ${s1.length} caracteres)`);
let ok = 0;
for (const [n, pass, msg] of results) { console.log(`${pass ? "✓" : "✗"} ${n}${pass ? "" : " — " + msg}`); if (pass) ok++; }
console.log(`${ok}/${results.length}`);
process.exit(ok === results.length ? 0 : 1);
