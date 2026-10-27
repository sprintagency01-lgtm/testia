/* ============================================================
   TESTIA — Test de razonamiento para entrevistas de trabajo
   Banco propio en el formato de los psicotécnicos de selección:
   numérico, verbal (deducción a partir de un texto) y lógico.
   Cada partida saca 7 + 7 + 6 preguntas y baraja las opciones.
   Carga DESPUÉS de tests.js (la usan también las landings).
   ============================================================ */
(function () {
  const W = window;
  const rnd = (n) => Math.floor(Math.random() * n);
  const shuffle = (a) => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = rnd(i + 1); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const VFN = ['Verdadero', 'Falso', 'No se puede saber'];

  // [pregunta, respuesta correcta, [incorrectas], explicación]; en «fixed» las opciones no se barajan.
  const BANK = {
    NUM: [
      ['Una empresa vendió 1.200 unidades en enero y 1.500 en febrero. ¿En qué porcentaje aumentaron las ventas?', '25 %', ['20 %', '30 %', '15 %'], 'El aumento es de 300 unidades sobre 1.200: 300 / 1.200 = 0,25, es decir, un 25 %. El error típico es calcularlo sobre 1.500, que da un 20 %.'],
      ['Un producto cuesta 80 € y tiene un descuento del 15 %. ¿Cuánto se paga?', '68 €', ['65 €', '72 €', '70 €'], 'El 15 % de 80 es 12, y 80 − 12 = 68 €.'],
      ['Un equipo de 6 personas tarda 10 días en terminar un proyecto. ¿Cuánto tardarían 4 personas trabajando al mismo ritmo?', '15 días', ['12 días', '14 días', '16 días'], 'El proyecto exige 6 × 10 = 60 jornadas de trabajo. Con 4 personas: 60 / 4 = 15 días. Menos personas tardan más, así que la proporción es inversa.'],
      ['Una empresa ingresó 45.000 € y gastó 36.000 €. ¿Qué porcentaje de los ingresos es beneficio?', '20 %', ['18 %', '25 %', '22 %'], 'El beneficio es 45.000 − 36.000 = 9.000 €, y 9.000 / 45.000 = 0,20. Si lo calculas sobre los gastos, sale un 25 %, que es la trampa.'],
      ['Un comercial cobra 1.400 € fijos más un 5 % de lo que vende. Si vende 30.000 €, ¿cuánto cobra en total?', '2.900 €', ['2.800 €', '3.000 €', '1.550 €'], 'El 5 % de 30.000 es 1.500 €, y 1.400 + 1.500 = 2.900 €.'],
      ['El precio de un artículo sube un 10 % y después baja un 10 %. Respecto al precio inicial, el precio final es…', 'Un 1 % más bajo', ['Igual', 'Un 1 % más alto', 'Un 2 % más bajo'], 'Si costaba 100, sube a 110 y el 10 % de 110 son 11: queda en 99. La bajada se aplica sobre un precio mayor, por eso no se compensa.'],
      ['En una oficina, 3 de cada 5 empleados teletrabajan. Si hay 240 empleados, ¿cuántos van a la oficina?', '96', ['144', '120', '100'], 'Van a la oficina 2 de cada 5: 240 × 2 / 5 = 96. Los 144 son los que teletrabajan.'],
      ['Un tren recorre 180 km en 1 hora y 30 minutos. ¿Cuál es su velocidad media?', '120 km/h', ['110 km/h', '135 km/h', '150 km/h'], 'Hora y media son 1,5 horas: 180 / 1,5 = 120 km/h.'],
      ['Si 4 cajas iguales pesan 18 kg, ¿cuánto pesan 10 cajas?', '45 kg', ['40 kg', '50 kg', '42 kg'], 'Cada caja pesa 18 / 4 = 4,5 kg, así que 10 cajas pesan 45 kg.'],
      ['Una inversión de 2.000 € rinde un 4 % anual de interés simple. ¿Cuánto ha ganado en 3 años?', '240 €', ['249,73 €', '80 €', '320 €'], 'Con interés simple se gana lo mismo cada año: el 4 % de 2.000 son 80 €, por 3 años, 240 €. 249,73 € sería con interés compuesto.']
    ],
    VER: [
      ['Texto: «Todos los proyectos aprobados este año tienen presupuesto asignado. El proyecto Alfa no tiene presupuesto asignado». ¿Es cierto que el proyecto Alfa fue aprobado este año?', 'Falso', null, 'Si hubiera sido aprobado, tendría presupuesto. Como no lo tiene, no puede haber sido aprobado este año.'],
      ['Texto: «La mayoría de los clientes que compran online pagan con tarjeta. Laura compra online». ¿Es cierto que Laura paga con tarjeta?', 'No se puede saber', null, '«La mayoría» no es «todos». Laura puede estar en la mayoría o no, así que con este texto no se puede saber.'],
      ['Texto: «La reunión se ha trasladado del lunes al miércoles. El director no puede asistir ningún miércoles». ¿Es cierto que el director no asistirá a la reunión?', 'Verdadero', null, 'La reunión es ahora el miércoles y el director no puede asistir ningún miércoles, así que no asistirá.'],
      ['Texto: «Solo los empleados con más de dos años de antigüedad pueden pedir teletrabajo. Marta lleva tres años en la empresa». ¿Es cierto que Marta puede pedir teletrabajo?', 'No se puede saber', null, '«Solo» marca una condición necesaria, no suficiente: sin antigüedad no se puede pedir, pero tenerla no garantiza poder hacerlo. Puede haber otros requisitos.'],
      ['Texto: «Las ventas de marzo superaron a las de febrero, y las de febrero superaron a las de enero». ¿Es cierto que las ventas de enero fueron las más bajas del trimestre?', 'Verdadero', null, 'Enero quedó por debajo de febrero, y febrero por debajo de marzo, así que enero fue el mes más bajo.'],
      ['Texto: «Ningún informe se publica sin revisión. Algunos informes revisados contienen errores». ¿Es cierto que algunos informes publicados contienen errores?', 'No se puede saber', null, 'Los publicados están todos revisados, pero los revisados con errores podrían no haberse publicado. El texto no permite saberlo.'],
      ['Texto: «Si un pedido llega antes de las 14:00, se envía el mismo día. El pedido de Juan se envió al día siguiente». ¿Es cierto que el pedido de Juan no llegó antes de las 14:00?', 'Verdadero', null, 'Si hubiera llegado antes de las 14:00, se habría enviado el mismo día. Como no fue así, no llegó antes de esa hora.'],
      ['¿Qué palabra significa lo contrario de «efímero»?', 'Duradero', ['Breve', 'Frágil', 'Rápido'], '«Efímero» es lo que dura poco, así que su contrario es «duradero». «Breve» es un sinónimo.'],
      ['«Proveedor» es a «suministrar» como «auditor» es a…', 'Fiscalizar', ['Contratar', 'Vender', 'Fabricar'], 'La función de un proveedor es suministrar y la de un auditor, fiscalizar o revisar cuentas.'],
      ['¿Qué palabra no encaja con las demás? Presupuesto, factura, albarán, despido.', 'Despido', ['Presupuesto', 'Factura', 'Albarán'], 'Presupuesto, factura y albarán son documentos comerciales. Un despido es una decisión laboral, no un documento comercial.']
    ],
    LOG: [
      ['¿Qué número sigue? 2, 6, 12, 20, 30, …', '42', ['40', '44', '36'], 'Las diferencias crecen de dos en dos: +4, +6, +8, +10. La siguiente es +12: 30 + 12 = 42.'],
      ['¿Qué número sigue? 3, 6, 12, 24, …', '48', ['36', '30', '42'], 'Cada número es el doble del anterior: 24 × 2 = 48.'],
      ['¿Qué número sigue? 81, 27, 9, 3, …', '1', ['0', '3', '−3'], 'Cada número es el anterior dividido entre 3: 3 / 3 = 1.'],
      ['¿Qué número sigue? 5, 11, 23, 47, …', '95', ['94', '96', '71'], 'Cada número es el doble del anterior más uno: 47 × 2 + 1 = 95.'],
      ['¿Qué número sigue? 1, 1, 2, 3, 5, 8, …', '13', ['11', '12', '15'], 'Cada número es la suma de los dos anteriores: 5 + 8 = 13.'],
      ['¿Qué número sigue? 100, 95, 85, 70, …', '50', ['55', '45', '60'], 'Se resta cada vez 5 más: −5, −10, −15, −20. 70 − 20 = 50.'],
      ['¿Qué número sigue? 2, 3, 5, 7, 11, …', '13', ['12', '15', '14'], 'Son números primos consecutivos. Después del 11 viene el 13.'],
      ['Si todos los A son B y ningún B es C, entonces…', 'Ningún A es C', ['Algún A es C', 'Todos los C son A', 'No se puede saber'], 'Todos los A están dentro de B, y B no comparte nada con C, así que ningún A puede ser C.'],
      ['Ana es más alta que Luis. Luis es más alto que Marta. Pedro es más bajo que Marta. ¿Quién es el más bajo?', 'Pedro', ['Marta', 'Luis', 'No se puede saber'], 'El orden de más alto a más bajo es Ana, Luis, Marta y Pedro.'],
      ['En una fila, Carmen está detrás de Diego y delante de Elena. Diego está detrás de Bruno. ¿Quién va primero?', 'Bruno', ['Diego', 'Carmen', 'Elena'], 'El orden es Bruno, Diego, Carmen y Elena.'],
      ['Si hoy es miércoles, ¿qué día será dentro de 10 días?', 'Sábado', ['Viernes', 'Domingo', 'Jueves'], 'Dentro de 7 días vuelve a ser miércoles, y 3 días después es sábado.'],
      ['Un reloj marca exactamente las 3:00. ¿Qué ángulo forman las agujas?', '90°', ['45°', '60°', '120°'], 'Cada hora del reloj son 30° (360 / 12). A las 3:00 hay tres horas de separación: 90°.']
    ]
  };
  const PLAN = { NUM: 7, VER: 7, LOG: 6 };

  function aptItems() {
    const out = [];
    Object.keys(PLAN).forEach((d) => {
      shuffle(BANK[d]).slice(0, PLAN[d]).forEach((x) => {
        if (x[2] === null) { out.push({ d, q: x[0], o: VFN, a: VFN.indexOf(x[1]), why: x[3] }); return; }
        const opts = shuffle([x[1]].concat(x[2]));
        out.push({ d, q: x[0], o: opts, a: opts.indexOf(x[1]), why: x[3] });
      });
    });
    return out;
  }

  const t = (W.TESTS || []).find((x) => x.id === 'razonamiento');
  if (t) { t.items = aptItems(); t.regen = aptItems; }
})();
