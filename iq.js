/* ============================================================
   TESTIA — Test de CI profesional (estilo ICAR, ítems propios)
   5 aptitudes: Verbal, Numérico, Lógico, Abstracto (figural),
   Espacial (rotación). Ítems figurales en SVG.
   Basado en los formatos de ICAR (dominio público) y la escala
   Wechsler (media 100, SD 15). Carga DESPUÉS de tests.js.
   ============================================================ */
(function(){
  const INK="#17181c";
  const SV = inner => `<svg viewBox="0 0 100 100" class="fig" xmlns="http://www.w3.org/2000/svg">${inner}</svg>`;
  // --- helpers de figuras (devuelven inner SVG) ---
  const arrow = d => `<g transform="rotate(${d} 50 50)"><line x1="50" y1="80" x2="50" y2="24" stroke="${INK}" stroke-width="5"/><polygon points="50,12 41,30 59,30" fill="${INK}"/></g>`;
  const dots = n => { let s='',gap=15,x0=50-(n-1)*gap/2; for(let i=0;i<n;i++) s+=`<circle cx="${(x0+i*gap).toFixed(1)}" cy="50" r="6.5" fill="${INK}"/>`; return s; };
  const poly = n => { let p=[]; for(let i=0;i<n;i++){const a=-Math.PI/2+i*2*Math.PI/n; p.push((50+34*Math.cos(a)).toFixed(1)+','+(50+34*Math.sin(a)).toFixed(1));} return `<polygon points="${p.join(' ')}" fill="none" stroke="${INK}" stroke-width="4"/>`; };
  const sq = side => `<rect x="${50-side/2}" y="${50-side/2}" width="${side}" height="${side}" fill="none" stroke="${INK}" stroke-width="4"/>`;
  const pie = pct => { const r=34,cx=50,cy=50; const ring=`<circle cx="50" cy="50" r="34" fill="none" stroke="${INK}" stroke-width="4"/>`;
    if(pct<=0) return ring; if(pct>=100) return `<circle cx="50" cy="50" r="34" fill="${INK}"/>`;
    const a=2*Math.PI*pct/100 - Math.PI/2, x=cx+r*Math.cos(a), y=cy+r*Math.sin(a), large=pct>50?1:0;
    return ring+`<path d="M50 50 L50 ${cy-r} A34 34 0 ${large} 1 ${x.toFixed(1)} ${y.toFixed(1)} Z" fill="${INK}"/>`; };
  const glyph = (ch,deg,mir) => `<g transform="rotate(${deg} 50 50)"><g transform="${mir?'translate(100,0) scale(-1,1)':''}"><text x="50" y="52" font-size="60" font-family="Arial,Helvetica,sans-serif" font-weight="700" text-anchor="middle" dominant-baseline="central" fill="${INK}">${ch}</text></g></g>`;
  // fila de secuencia con un hueco "?"
  const seq = arr => `<div class="figseq">${arr.map(f=>`<span class="figcell">${SV(f)}</span>`).join('')}<span class="figcell q">?</span></div>`;
  const refFig = inner => `<div class="figseq"><span class="figcell">${SV(inner)}</span></div>`;

  const VERBAL = [
    {q:"Médico es a Hospital como Profesor es a…", o:["Libro","Escuela","Alumno","Examen"], a:1},
    {q:"Pluma es a Escribir como Tijeras es a…", o:["Papel","Cortar","Coser","Pegar"], a:1},
    {q:"¿Qué palabra no encaja con las demás?", o:["Rosa","Tulipán","Roble","Margarita"], a:2},
    {q:"Tenue es a Brillante como Susurro es a…", o:["Silencio","Grito","Voz","Eco"], a:1},
    {q:"Barco es a Puerto como Avión es a…", o:["Cielo","Aeropuerto","Piloto","Nube"], a:1},
    {q:"¿Cuál es el antónimo de «efímero»?", o:["Eterno","Breve","Frágil","Veloz"], a:0},
    {q:"Manada es a Lobo como Banco es a…", o:["Dinero","Río","Pez","Arena"], a:2},
    {q:"Guante es a Mano como Zapato es a…", o:["Calcetín","Pie","Suelo","Cuero"], a:1},
  ].map(x=>({...x,d:"verbal"}));

  const NUMERICO = [
    {q:"¿Qué número continúa?  2, 4, 8, 16, …", o:["20","24","32","30"], a:2},
    {q:"Serie de Fibonacci:  1, 1, 2, 3, 5, 8, …", o:["11","13","12","15"], a:1},
    {q:"¿Qué número sigue?  3, 6, 11, 18, 27, …", o:["36","38","40","35"], a:1},
    {q:"¿Qué número sigue?  100, 95, 85, 70, 50, …", o:["30","25","20","35"], a:1},
    {q:"¿Qué número sigue?  1, 4, 9, 16, 25, …", o:["30","49","36","35"], a:2},
    {q:"Continúa la serie de letras:  A, C, E, G, …", o:["H","I","J","K"], a:1},
    {q:"¿Qué número sigue?  5, 10, 13, 26, 29, 58, …", o:["61","60","87","116"], a:0},
    {q:"¿Qué número sigue?  7, 14, 28, 56, …", o:["98","112","104","84"], a:1},
  ].map(x=>({...x,d:"numerico"}));

  const LOGICO = [
    {q:"Todos los Bloops son Razzies y todos los Razzies son Lazzies. ¿Todos los Bloops son Lazzies?", o:["Sí","No","No se puede saber","Solo algunos"], a:0},
    {q:"Si llueve, Marta lleva paraguas. Hoy Marta no lleva paraguas. ¿Qué se deduce con certeza?", o:["Llueve","No llueve","Marta está en casa","Nada"], a:1},
    {q:"En una carrera adelantas al que iba en 2.ª posición. ¿En qué posición vas ahora?", o:["1.ª","2.ª","3.ª","No se puede saber"], a:1},
    {q:"Juan tiene 4 hermanas y 3 hermanos. ¿Cuántas hermanas tiene su hermana Ana?", o:["4","3","5","6"], a:1},
    {q:"«Algunos gatos son negros. Ningún ser negro es perro.» ¿Se deduce que ningún gato es perro?", o:["Sí, con certeza","No se deduce","Sí, solo los negros","Depende"], a:1},
    {q:"Si A>B y B>C, y además C>D, ¿cuál es necesariamente la mayor?", o:["A","B","C","D"], a:0},
  ].map(x=>({...x,d:"logico"}));

  const ABSTRACTO = [
    {q:"¿Qué figura continúa la serie?", svg:seq([arrow(0),arrow(45),arrow(90),arrow(135)]),
     osvg:[SV(arrow(180)),SV(arrow(135)),SV(arrow(225)),SV(arrow(0))], a:0, d:"abstracto"},
    {q:"¿Qué figura continúa la serie?", svg:seq([dots(1),dots(2),dots(3),dots(4)]),
     osvg:[SV(dots(6)),SV(dots(5)),SV(dots(4)),SV(dots(3))], a:1, d:"abstracto"},
    {q:"¿Qué figura continúa la serie?", svg:seq([poly(3),poly(4),poly(5),poly(6)]),
     osvg:[SV(poly(8)),SV(poly(7)),SV(poly(6)),SV(poly(5))], a:1, d:"abstracto"},
    {q:"¿Qué figura continúa la serie?", svg:seq([sq(20),sq(32),sq(44),sq(56)]),
     osvg:[SV(sq(56)),SV(sq(68)),SV(sq(44)),SV(sq(80))], a:1, d:"abstracto"},
    {q:"¿Qué figura continúa la serie?", svg:seq([pie(0),pie(25),pie(50),pie(75)]),
     osvg:[SV(pie(75)),SV(pie(50)),SV(pie(100)),SV(pie(25))], a:2, d:"abstracto"},
  ];

  const ESPACIAL = [
    {q:"¿Cuál opción es la figura de arriba girada (no reflejada)?", svg:refFig(glyph("F",0,false)),
     osvg:[SV(glyph("F",90,true)),SV(glyph("F",90,false)),SV(glyph("F",200,true)),SV(glyph("F",300,true))], a:1, d:"espacial"},
    {q:"¿Cuál opción es la figura de arriba girada (no reflejada)?", svg:refFig(glyph("R",0,false)),
     osvg:[SV(glyph("R",180,false)),SV(glyph("R",60,true)),SV(glyph("R",150,true)),SV(glyph("R",300,true))], a:0, d:"espacial"},
    {q:"¿Cuál opción es la figura de arriba girada (no reflejada)?", svg:refFig(glyph("G",0,false)),
     osvg:[SV(glyph("G",40,true)),SV(glyph("G",160,true)),SV(glyph("G",270,false)),SV(glyph("G",90,true))], a:2, d:"espacial"},
    {q:"¿Cuál opción es la figura de arriba girada (no reflejada)?", svg:refFig(glyph("L",0,false)),
     osvg:[SV(glyph("L",120,true)),SV(glyph("L",210,true)),SV(glyph("L",330,true)),SV(glyph("L",150,false))], a:3, d:"espacial"},
    {q:"¿Cuál opción es la figura de arriba girada (no reflejada)?", svg:refFig(glyph("P",0,false)),
     osvg:[SV(glyph("P",200,false)),SV(glyph("P",80,true)),SV(glyph("P",260,true)),SV(glyph("P",20,true))], a:0, d:"espacial"},
  ];

  const ITEMS = [...VERBAL, ...NUMERICO, ...LOGICO, ...ABSTRACTO, ...ESPACIAL];

  const t = (window.TESTS||[]).find(x=>x.id==="iq");
  if(t){
    t.items = ITEMS;
    t.duration = 900;               // 15 min
    t.pro = true;
    t.prompt = null;
    t.domains = {verbal:"Verbal", numerico:"Numérico", logico:"Lógico", abstracto:"Abstracto", espacial:"Espacial"};
    t.blurb = "Test de inteligencia multi-aptitud (verbal, numérico, lógico, abstracto y espacial). Tu CI estimado con desglose profesional.";
  }
  window.IQ_ITEMS = ITEMS;
})();
