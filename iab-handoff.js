/* === Pagar fuera del navegador de Instagram ===
   Casi todo el tráfico del anuncio (nov 2026) abre Testia en el navegador interno de Instagram,
   y ahí no aparecen Apple Pay ni Google Pay: solo queda meter la tarjeta a mano en Stripe.
   Esto lleva a la persona a Safari o Chrome con su resultado en el enlace (#res=…), para que pague
   con el móvil. El resultado va en el hash: no llega al servidor y la página lo borra al leerlo.
   Pruebas: node scripts/test-iab-handoff.mjs */
(function (w) {
  function detect(ua) {
    ua = String(ua || "");
    let app = null;
    if (/Instagram/i.test(ua)) app = "Instagram";
    else if (/FBAN|FBAV|FB_IAB/.test(ua)) app = "Facebook";
    else if (/BytedanceWebview|musical_ly|TikTok/i.test(ua)) app = "TikTok";
    if (!app) return null;
    const os = /iPhone|iPad|iPod/.test(ua) ? "ios" : /Android/.test(ua) ? "android" : "other";
    return { app, os };
  }

  const b64 = (bytes) => {
    let s = "";
    for (let i = 0; i < bytes.length; i += 0x8000) s += String.fromCharCode.apply(null, bytes.subarray(i, i + 0x8000));
    return btoa(s).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
  };
  const unb64 = (s) => {
    s = s.replace(/-/g, "+").replace(/_/g, "/");
    const bin = atob(s + "===".slice((s.length + 3) % 4));
    const out = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
    return out;
  };
  async function pipe(bytes, stream) {
    const buf = await new Response(new Blob([bytes]).stream().pipeThrough(stream)).arrayBuffer();
    return new Uint8Array(buf);
  }

  async function encode(obj, opt) {
    const raw = new TextEncoder().encode(JSON.stringify(obj));
    if (!(opt && opt.noCompress) && typeof CompressionStream === "function") {
      try { return "z." + b64(await pipe(raw, new CompressionStream("deflate-raw"))); } catch (e) {}
    }
    return "j." + b64(raw);
  }

  async function decode(s) {
    try {
      const m = /^([zj])\.([A-Za-z0-9_-]+)$/.exec(String(s || ""));
      if (!m) return null;
      let bytes = unb64(m[2]);
      if (m[1] === "z") {
        if (typeof DecompressionStream !== "function") return null;
        bytes = await pipe(bytes, new DecompressionStream("deflate-raw"));
      }
      const o = JSON.parse(new TextDecoder().decode(bytes));
      return o && typeof o === "object" ? o : null;
    } catch (e) { return null; }
  }

  function fromHash(hash) {
    const m = /(?:^#|&)res=([zj]\.[A-Za-z0-9_-]+)/.exec(String(hash || ""));
    return m ? m[1] : null;
  }

  function plainUrl({ origin, path, payload }) { return origin + (path || "/") + "#res=" + payload; }

  // iPhone: x-safari-https:// abre Safari (iOS 17 o más). Android: intent:// abre Chrome.
  // Si la app no deja abrir el enlace, la página enseña cómo hacerlo desde el menú «···».
  function openUrl({ os, origin, path, payload }) {
    const u = new URL(origin);
    const rest = u.host + (path || "/") + "#res=" + payload;
    const scheme = u.protocol.replace(":", "");
    if (os === "ios") return "x-safari-" + scheme + "://" + rest;
    if (os === "android") return "intent://" + rest + "#Intent;scheme=" + scheme + ";package=com.android.chrome;end";
    return plainUrl({ origin, path, payload });
  }

  function fresh(o, now) { return !!(o && o.ts && (now || Date.now()) - o.ts < 24 * 3600e3); }

  w.IAB = { detect, encode, decode, fromHash, openUrl, plainUrl, fresh };
})(window);
