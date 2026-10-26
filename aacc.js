/* ============================================================
   TESTIA — Test de altas capacidades para adultos
   Dos partes en un mismo test (modo "mixed"):
   · 15 problemas de razonamiento del banco del test de CI (3 por aptitud),
     distintos en cada intento.
   · 20 afirmaciones sobre rasgos que se asocian a las altas capacidades
     (escala de acuerdo de 1 a 5), en cinco dimensiones.
   Carga DESPUÉS de tests.js e iq.js (usa window.IQ_ITEMS).
   ============================================================ */
(function () {
  const W = window;
  const rnd = (n) => Math.floor(Math.random() * n);
  const shuffle = (a) => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = rnd(i + 1); [a[i], a[j]] = [a[j], a[i]]; } return a; };

  const TRAITS = [
    { t: 'Cuando algo me interesa, necesito entenderlo hasta el fondo.', s: 'CUR' },
    { t: 'Me aburro con facilidad cuando las conversaciones son superficiales.', s: 'CUR' },
    { t: 'Tengo muchos intereses distintos y paso de uno a otro con entusiasmo.', s: 'CUR' },
    { t: 'De pequeño hacía preguntas que a los adultos les costaba responder.', s: 'CUR' },
    { t: 'Suelo llegar a la conclusión antes de que los demás terminen de explicarse.', s: 'VEL' },
    { t: 'Veo conexiones entre ideas que a otros les parecen no tener relación.', s: 'VEL' },
    { t: 'Aprendo cosas nuevas mucho más rápido que la mayoría.', s: 'VEL' },
    { t: 'Me cuesta seguir instrucciones paso a paso cuando ya veo adónde llevan.', s: 'VEL' },
    { t: 'Vivo las emociones con más intensidad que la gente de mi alrededor.', s: 'INT' },
    { t: 'Me afectan mucho las injusticias, aunque no me toquen de cerca.', s: 'INT' },
    { t: 'Los ruidos, las luces o el desorden me saturan con facilidad.', s: 'INT' },
    { t: 'Le doy muchas más vueltas a las cosas que los demás.', s: 'INT' },
    { t: 'Se me ocurren soluciones poco habituales a los problemas.', s: 'CRE' },
    { t: 'Disfruto inventando, creando o imaginando cosas que no existen.', s: 'CRE' },
    { t: 'Me cuesta hacer las cosas como siempre se han hecho si veo una forma mejor.', s: 'CRE' },
    { t: 'Se me dan bien el humor absurdo y los juegos de palabras.', s: 'CRE' },
    { t: 'Cuando un tema me apasiona, puedo dedicarle horas sin darme cuenta.', s: 'EXI' },
    { t: 'Me exijo más de lo que me piden los demás.', s: 'EXI' },
    { t: 'Me frustra mucho no hacer algo tan bien como sé que podría.', s: 'EXI' },
    { t: 'Termino los proyectos que me importan aunque sean difíciles.', s: 'EXI' }
  ];

  function aaccItems() {
    const bank = W.IQ_ITEMS || [];
    const reasoning = [];
    ['verbal', 'numerico', 'logico', 'abstracto', 'espacial'].forEach((d) => {
      shuffle(bank.filter((x) => x.d === d)).slice(0, 3).forEach((x) => reasoning.push(x));
    });
    return reasoning.concat(TRAITS.map((x) => Object.assign({}, x)));
  }

  const t = (W.TESTS || []).find((x) => x.id === 'aacc');
  if (t) { t.items = aaccItems(); t.regen = aaccItems; }
})();
