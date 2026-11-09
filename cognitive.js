/* ============================================================
   TESTIA — Generadores de los tests cognitivos con número
   · memoria: dígitos en orden directo e inverso (amplitud) y
     reconocimiento de palabras tras una distracción.
   · atencion: Stroop (color frente a palabra), búsqueda visual
     (contar letras entre letras parecidas) y símbolo distinto.
   · daltonismo: láminas de puntos de colores con un número escondido.
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

  /* ---------- DALTONISMO ---------- */
  // Cada lámina esconde un número que solo se distingue del fondo por la respuesta de un tipo de cono:
  // L (rojos), M (verdes) o S (azules). Para quien no tiene ese cono el número desaparece
  // (simulación de dicromatas de Viénot, Brettel y Mollon, 1999). Varias intensidades por cono miden cuánto cuesta.
  const LMS = [[17.8824, 43.5161, 4.11935], [3.45565, 27.1554, 3.86714], [0.0299566, 0.184309, 1.46709]];
  const inv3 = (m) => {
    const [a, b, c] = m[0], [d, e, f] = m[1], [g, h, i] = m[2], A = e * i - f * h, B = f * g - d * i, C = d * h - e * g, D = a * A + b * B + c * C;
    return [[A / D, (c * h - b * i) / D, (b * f - c * e) / D], [B / D, (a * i - c * g) / D, (c * d - a * f) / D], [C / D, (b * g - a * h) / D, (a * e - b * d) / D]];
  };
  const LMSi = inv3(LMS), mul3 = (m, v) => m.map((r) => r[0] * v[0] + r[1] * v[1] + r[2] * v[2]);
  const toLin = (c) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4), toGam = (c) => (c <= 0.0031308 ? 12.92 * c : 1.055 * c ** (1 / 2.4) - 0.055);
  const hexOf = (lms) => '#' + mul3(LMSi, lms).map((c) => Math.round(255 * Math.min(1, Math.max(0, toGam(c)))).toString(16).padStart(2, '0')).join('');
  // Fondos que admiten todas las variaciones sin salirse de los colores que puede mostrar una pantalla.
  const BASES = [[0.66, 0.58, 0.42], [0.62, 0.6, 0.4], [0.6, 0.58, 0.55], [0.64, 0.56, 0.5]];
  const AX = { L: 0, M: 1, S: 2 };

  function plateDots() {
    // Empaquetado aleatorio de círculos dentro de la lámina: primero los grandes, luego se rellenan los huecos.
    const out = [], cell = 13, grid = new Map(), k = (cx, cy) => cx + ',' + cy;
    for (let t = 0; t < 45000 && out.length < 2400; t++) {
      const r = t < 6000 ? 3.6 + Math.random() * 2 : t < 18000 ? 2.6 + Math.random() * 1.2 : 1.7 + Math.random() * 0.9;
      const a = Math.random() * 2 * Math.PI, d = Math.sqrt(Math.random()) * (146 - r), x = 150 + d * Math.cos(a), y = 150 + d * Math.sin(a);
      const cx = Math.floor(x / cell), cy = Math.floor(y / cell);
      let ok = true;
      for (let i = -1; i <= 1 && ok; i++) for (let j = -1; j <= 1 && ok; j++) {
        for (const o of grid.get(k(cx + i, cy + j)) || []) { if ((o.x - x) ** 2 + (o.y - y) ** 2 < (o.r + r + 1) ** 2) { ok = false; break; } }
      }
      if (!ok) continue;
      const dot = { x, y, r };
      out.push(dot);
      const key = k(cx, cy);
      if (!grid.has(key)) grid.set(key, []);
      grid.get(key).push(dot);
    }
    return out;
  }
  function digitMask(num) {
    const c = document.createElement('canvas'); c.width = c.height = 300;
    const g = c.getContext('2d');
    g.fillStyle = g.strokeStyle = '#000'; g.lineWidth = 4; g.lineJoin = 'round';
    g.font = `700 ${num.length > 1 ? 160 : 220}px Arial, Helvetica, sans-serif`; g.textAlign = 'center'; g.textBaseline = 'middle';
    g.fillText(num, 150, 160); g.strokeText(num, 150, 160);
    const px = g.getImageData(0, 0, 300, 300).data;
    return (x, y) => px[((Math.round(y) * 300) + Math.round(x)) * 4 + 3] > 128;
  }
  function plateSVG(p) {
    const B = mul3(LMS, p.base.map(toLin)), inFig = digitMask(p.num);
    let t = '';
    plateDots().forEach((o) => {
      const j = 0.94 + Math.random() * 0.1, lms = B.map((v) => v * j);
      if (inFig(o.x, o.y)) { if (p.d === 'C') lms.forEach((v, i) => { lms[i] = v * 0.5; }); else lms[AX[p.d]] *= 1 + p.k; }
      t += `<circle cx="${o.x.toFixed(1)}" cy="${o.y.toFixed(1)}" r="${o.r.toFixed(1)}" fill="${hexOf(lms)}"/>`;
    });
    return `<svg viewBox="0 0 300 300" class="wfig cplate" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Lámina de puntos de colores con un número escondido">${t}</svg>`;
  }
  function colorItems() {
    // Peso = cuánto pesa no ver esa lámina: no ver la más clara cuenta más que no ver la más tenue.
    const plan = [{ d: 'C', k: 0, w: 0 }];
    ['L', 'M'].forEach((d) => [[0.16, 4], [0.12, 3], [0.09, 2], [0.06, 1]].forEach(([k, w]) => plan.push({ d, k: rnd(2) ? k : -k, w })));
    plan.push(rnd(2) ? { d: 'S', k: 0.95, w: 2 } : { d: 'S', k: -0.6, w: 2 }, rnd(2) ? { d: 'S', k: 0.6, w: 1 } : { d: 'S', k: -0.4, w: 1 });
    // Láminas de clasificación: muy intensas para cualquiera con visión normal. La de rojos la sigue viendo quien es deutan
    // y no quien es protan; la de verdes, al revés. No cuentan para la intensidad, solo para el tipo.
    plan.push({ d: 'L', k: 0.3, w: 0, cls: true }, { d: 'M', k: -0.3, w: 0, cls: true });
    const order = [plan[0]].concat(shuffle(plan.slice(1)));
    const nums = ['2', '3', '4', '5', '6', '7', '8', '9'];
    let last = '';
    return order.map((p) => {
      let num; do { num = nums[rnd(nums.length)]; } while (num === last);
      last = num;
      const others = shuffle(nums.filter((n) => n !== num)).slice(0, 2), o = shuffle([num].concat(others));
      const it = Object.assign({}, p, { num, base: BASES[rnd(BASES.length)], q: '¿Qué número ves dentro del círculo?', o: o.concat(['No veo ningún número']), a: o.indexOf(num) });
      // La lámina se dibuja al mostrarla: las landings cargan este archivo solo para contar las preguntas.
      let svg = null;
      Object.defineProperty(it, 'svg', { enumerable: true, get() { if (!svg) svg = plateSVG(it); return svg; } });
      return it;
    });
  }

  const mem = (W.TESTS || []).find((x) => x.id === 'memoria');
  if (mem) { mem.items = memoryItems(); mem.regen = memoryItems; }
  const att = (W.TESTS || []).find((x) => x.id === 'atencion');
  if (att) { att.items = attentionItems(); att.regen = attentionItems; }
  const col = (W.TESTS || []).find((x) => x.id === 'daltonismo');
  if (col) { col.items = colorItems(); col.regen = colorItems; }
})();
