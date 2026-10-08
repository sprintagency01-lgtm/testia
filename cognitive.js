/* ============================================================
   TESTIA — Generadores de los tests cognitivos con número
   · memoria: dígitos en orden directo e inverso (amplitud) y
     reconocimiento de palabras tras una distracción.
   · atencion: Stroop (color frente a palabra), búsqueda visual
     (contar letras entre letras parecidas) y símbolo distinto.
   Cada partida genera ítems nuevos para que el test se pueda repetir.
   Carga DESPUÉS de tests.js (la usan también las landings).
   ============================================================ */
(function () {
  const W = window;
  const rnd = (n) => Math.floor(Math.random() * n);
  const shuffle = (a) => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = rnd(i + 1); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');

  /* ---------- MEMORIA ---------- */
  function digits(n) {
    const out = [];
    while (out.length < n) {
      const d = 1 + rnd(9);
      if (out.length && (d === out[out.length - 1] || Math.abs(d - out[out.length - 1]) === 1 && out.length > 1 && Math.abs(out[out.length - 1] - out[out.length - 2]) === 1)) continue;
      out.push(d);
    }
    return out;
  }
  const POOL = ['Ventana', 'Caballo', 'Lámpara', 'Puente', 'Tijeras', 'Naranja', 'Guitarra', 'Montaña', 'Botella', 'Cuchara', 'Pantalón', 'Ladrillo',
    'Pelota', 'Espejo', 'Tormenta', 'Corbata', 'Barco', 'Jardín', 'Martillo', 'Sombrero', 'Libreta', 'Cereza', 'Tortuga', 'Paraguas'];

  function memoryItems() {
    const pool = shuffle(POOL), studied = pool.slice(0, 12), fresh = pool.slice(12);
    const items = [];
    // Las palabras se estudian al principio y se preguntan al final: los dígitos de en medio hacen de distracción.
    [4, 5, 6, 7, 8, 9].forEach((len, i) => {
      const seq = digits(len);
      const mem = [{ seq, ms: 900, title: 'Memoriza los números en orden' }];
      if (i === 0) mem.unshift({ list: studied, ms: 25000, title: 'Memoriza estas 12 palabras. Te preguntaremos por ellas al final.' });
      items.push({ d: 'DF', len, mem, input: 'digits', a: seq.join(''),
        q: 'Escribe los números en el mismo orden en que aparecieron.' });
    });
    [3, 4, 5, 6, 7].forEach((len) => {
      const seq = digits(len);
      items.push({ d: 'DB', len, mem: [{ seq, ms: 900, title: 'Memoriza los números. Luego tendrás que escribirlos al revés' }], input: 'digits',
        a: seq.slice().reverse().join(''), q: 'Escribe los números al revés: del último al primero.' });
    });
    const probes = shuffle(studied.slice(0, 4).map((w) => [w, 0]).concat(fresh.slice(0, 4).map((w) => [w, 1])));
    probes.forEach(([w, a]) => items.push({ d: 'WR', q: `¿Estaba la palabra «${w}» en la lista del principio?`, o: ['Sí, estaba', 'No, no estaba'], a }));
    return items;
  }

  /* ---------- ATENCIÓN ---------- */
  const COLORS = [{ n: 'ROJO', l: 'Rojo', c: '#d62828' }, { n: 'AZUL', l: 'Azul', c: '#1f5fd6' }, { n: 'VERDE', l: 'Verde', c: '#1f8a4c' }, { n: 'AMARILLO', l: 'Amarillo', c: '#d9a400' }];
  const svgW = (w, h, inner) => `<svg viewBox="0 0 ${w} ${h}" class="wfig" xmlns="http://www.w3.org/2000/svg" role="img">${inner}</svg>`;

  function stroopItems() {
    const kinds = shuffle([true, true, false, false, false, false, false, false]); // 2 congruentes, 6 incongruentes
    return kinds.map((congruent) => {
      const word = rnd(4); let ink = word;
      if (!congruent) { while (ink === word) ink = rnd(4); }
      const svg = svgW(260, 80, `<text x="130" y="56" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="46" font-weight="800" fill="${COLORS[ink].c}">${COLORS[word].n}</text>`);
      return { d: 'ST', congruent, svg, q: '¿De qué color está escrita la palabra? Fíjate en el color, no en lo que dice.', o: COLORS.map((c) => c.l), a: ink };
    });
  }

  function searchItems() {
    const SETS = [['b', 'd', 'p', 'q'], ['m', 'n', 'u', 'h'], ['E', 'F', 'P', 'B'], ['6', '9', '8', '0'], ['b', 'd', 'p', 'q'], ['O', 'Q', 'C', 'G']];
    return SETS.map((set) => {
      const target = set[rnd(set.length)], others = set.filter((x) => x !== target);
      const cols = 8, rows = 5, total = cols * rows, count = 5 + rnd(7);
      const cells = shuffle(Array.from({ length: total }, (_, i) => (i < count ? target : others[rnd(others.length)])));
      let t = '';
      cells.forEach((ch, i) => { const x = 22 + (i % cols) * 40, y = 34 + Math.floor(i / cols) * 40; t += `<text x="${x}" y="${y}" text-anchor="middle" font-family="'Courier New', monospace" font-size="28" font-weight="700" fill="#17181c">${esc(ch)}</text>`; });
      const opts = shuffle([count, count + 1, count - 1, count + 2].filter((v, i, a) => v > 0 && a.indexOf(v) === i)).slice(0, 4);
      return { d: 'BV', svg: svgW(326, 206, t), q: `¿Cuántas «${target}» hay en la cuadrícula?`, o: opts.map(String), a: opts.indexOf(count) };
    });
  }

  function oddItems() {
    const PAIRS = shuffle([['O', 'Q'], ['E', 'F'], ['9', '6'], ['M', 'N'], ['8', 'B'], ['C', 'G'], ['V', 'Y'], ['R', 'P']]).slice(0, 6);
    return PAIRS.map(([base, odd]) => {
      const cols = 7, rows = 4, pos = rnd(cols * rows), row = Math.floor(pos / cols);
      let t = '';
      for (let r = 0; r < rows; r++) {
        t += `<text x="14" y="${36 + r * 40}" text-anchor="middle" font-family="Arial, sans-serif" font-size="13" font-weight="700" fill="#9a9b9f">${r + 1}</text>`;
        for (let c = 0; c < cols; c++) {
          const ch = r * cols + c === pos ? odd : base;
          t += `<text x="${50 + c * 40}" y="${38 + r * 40}" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="28" font-weight="700" fill="#17181c">${esc(ch)}</text>`;
        }
      }
      return { d: 'OD', svg: svgW(320, 178, t), q: '¿En qué fila está el símbolo distinto?', o: ['Fila 1', 'Fila 2', 'Fila 3', 'Fila 4'], a: row };
    });
  }

  function attentionItems() {
    // Se intercalan para que no se pueda coger ritmo con un solo tipo de prueba.
    const st = stroopItems(), bv = searchItems(), od = oddItems(), out = [];
    while (st.length || bv.length || od.length) { if (st.length) out.push(st.shift()); if (st.length) out.push(st.shift()); if (bv.length) out.push(bv.shift()); if (od.length) out.push(od.shift()); }
    return out;
  }

  const mem = (W.TESTS || []).find((x) => x.id === 'memoria');
  if (mem) { mem.items = memoryItems(); mem.regen = memoryItems; }
  const att = (W.TESTS || []).find((x) => x.id === 'atencion');
  if (att) { att.items = attentionItems(); att.regen = attentionItems; }
})();
