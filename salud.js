/* === Puntuación de los tests de salud y de 16 tipos ===
   Funciones puras que usan index.html (tipos de resultado `screen` y `type16`).
   Pruebas: node scripts/test-salud.mjs */
(function (w) {
  // ASRS v1.1, 6 preguntas (Kessler et al., 2005). Respuestas 1–5 (Nunca … Muy a menudo).
  // Preguntas 1–3 cuentan desde «A veces» (3); 4–6 desde «A menudo» (4). 4 o más: cribado positivo.
  function asrsScreen(v) {
    let count = 0;
    for (let i = 0; i < 6; i++) if ((v[i] || 0) >= (i < 3 ? 3 : 4)) count++;
    return { positive: count >= 4, count };
  }

  // GAD-7 (Spitzer et al., 2006). Respuestas 1–4 que valen 0–3; total 0–21.
  function gad7Score(v) {
    let score = 0;
    for (let i = 0; i < 7; i++) score += Math.max(0, (v[i] || 1) - 1);
    const band = score >= 15 ? "grave" : score >= 10 ? "moderada" : score >= 5 ? "leve" : "minima";
    return { score, band };
  }

  // Bandas orientativas por porcentaje del máximo (sin puntos de corte validados).
  function traitBand(p) { return p < 40 ? "bajo" : p < 66 ? "medio" : "alto"; }

  // Big Five (IPIP) a 4 letras, según la relación descrita por McCrae y Costa (1989).
  const AXES = [["EI", "E", "E", "I"], ["NS", "O", "N", "S"], ["FT", "A", "F", "T"], ["JP", "C", "J", "P"]];
  function type16(pct) {
    const parts = AXES.map(([axis, k, hi, lo]) => {
      const p = pct[k];
      return { axis, letter: p >= 50 ? hi : lo, strength: Math.round(Math.abs(p - 50) * 2) };
    });
    return { code: parts.map((x) => x.letter).join(""), parts };
  }

  // Tests de perfiles (profileBars): orden con desempate. A igual porcentaje gana quien tiene más
  // respuestas máximas en esa escala y después más respuestas de un punto menos; si sigue el empate,
  // se respeta el orden de escalas. counts[k] = [nº de respuestas máximas, nº de un punto menos].
  function rankProfiles(pct, keys, counts) {
    const c = (k, i) => (counts && counts[k] ? counts[k][i] : 0);
    return keys.map((k, i) => ({ k, i })).sort((a, b) =>
      pct[b.k] - pct[a.k] || c(b.k, 0) - c(a.k, 0) || c(b.k, 1) - c(a.k, 1) || a.i - b.i).map((x) => x.k);
  }
  // Nivel del texto de análisis; el perfil ganador nunca baja de «medio» para no contradecir el resultado gratis.
  function interpLevel(p, isTop) {
    const lv = p >= 66 ? "hi" : p >= 40 ? "mid" : "lo";
    return isTop && lv === "lo" ? "mid" : lv;
  }

  w.rankProfiles = rankProfiles; w.interpLevel = interpLevel;
  w.asrsScreen = asrsScreen; w.gad7Score = gad7Score; w.traitBand = traitBand; w.type16 = type16;
})(window);
