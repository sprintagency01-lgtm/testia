/* ============================================================
   TESTIA — Catálogos y emparejamiento de los tests de orientación
   («¿Qué carrera estudiar?», «¿Qué FP estudiar?», «¿Qué trabajo es para mí?»).
   Cada ficha tiene un perfil 0–100 en 14 dimensiones; el test compara
   tu perfil con el de cada ficha. Carga DESPUÉS de tests.js.
   Pruebas: node scripts/test-orientacion.mjs
   ============================================================ */
(function () {
  const W = window;

  const DIMS = {
    INT: ["R", "I", "A", "S", "E", "C"],      // intereses (Holland)
    FUE: ["NUM", "LEN", "MAN", "PER"],         // puntos fuertes
    VAL: ["EST", "ING", "IMP", "AUT"],         // lo que buscas
  };
  const WEIGHTS = { INT: 0.55, FUE: 0.30, VAL: 0.15 };
  const ALL = [].concat(DIMS.INT, DIMS.FUE, DIMS.VAL);
  W.ORIENT_DIMS = DIMS;

  const val = (o, k) => (typeof o[k] === "number" ? o[k] : 50);

  /* Afinidad 0–100: 100 menos la distancia media ponderada por grupo. */
  W.orientMatch = function (pct, catalog) {
    return (catalog || []).map((e) => {
      let dist = 0;
      for (const g in DIMS) {
        const ks = DIMS[g];
        const d = ks.reduce((s, k) => s + Math.abs(val(pct, k) - val(e.prof, k)), 0) / ks.length;
        dist += WEIGHTS[g] * d;
      }
      const top = ALL.filter((k) => val(pct, k) >= 60 && val(e.prof, k) >= 60)
        .sort((a, b) => Math.min(val(pct, b), val(e.prof, b)) - Math.min(val(pct, a), val(e.prof, a)))
        .slice(0, 3);
      return { e, score: Math.max(0, Math.min(100, Math.round(100 - dist))), top };
    }).sort((a, b) => b.score - a.score);
  };

  /* Perfil abierto: respuestas casi planas o varias fichas casi empatadas. */
  W.orientFlat = function (pct, ranked) {
    const vs = ALL.map((k) => val(pct, k));
    const m = vs.reduce((s, v) => s + v, 0) / vs.length;
    const sd = Math.sqrt(vs.reduce((s, v) => s + (v - m) * (v - m), 0) / vs.length);
    if (sd < 8) return true;
    return !!(ranked && ranked.length >= 5 && ranked[0].score - ranked[4].score < 3);
  };

  W.ORIENT_CATALOGS = { carrera: [], fp: [], trabajo: [] };
})();
