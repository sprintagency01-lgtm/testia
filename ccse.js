/* ============================================================
   TESTIA — Simulacro del examen de nacionalidad española (CCSE)
   Banco propio de Testia (no son las 300 preguntas oficiales del
   Instituto Cervantes). Cada partida saca 25 preguntas con la misma
   estructura que el examen real: 10 + 3 + 2 + 3 + 7.
   Datos revisados contra la Constitución de 1978 y fuentes oficiales
   en octubre de 2026. Carga DESPUÉS de tests.js (la usan también las landings).
   ============================================================ */
(function () {
  const W = window;
  const rnd = (n) => Math.floor(Math.random() * n);
  const shuffle = (a) => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = rnd(i + 1); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const VF = ['Verdadero', 'Falso'];

  // [pregunta, respuesta correcta, [dos incorrectas], explicación]  (en T2: [afirmación, true|false, explicación])
  const BANK = {
    T1: [
      ['¿Qué forma política tiene el Estado español?', 'Monarquía parlamentaria', ['República federal', 'Monarquía absoluta'], 'Lo dice el artículo 1.3 de la Constitución: «La forma política del Estado español es la Monarquía parlamentaria».'],
      ['¿En qué año se aprobó la Constitución española vigente?', '1978', ['1975', '1982'], 'Se aprobó en referéndum el 6 de diciembre de 1978 y entró en vigor el 29 de diciembre de ese año.'],
      ['¿Qué día se celebra el Día de la Constitución?', 'El 6 de diciembre', ['El 12 de octubre', 'El 1 de mayo'], 'Se celebra el 6 de diciembre, aniversario del referéndum de 1978. El 12 de octubre es la Fiesta Nacional.'],
      ['¿Quién es el jefe del Estado en España?', 'El rey', ['El presidente del Gobierno', 'El presidente del Congreso'], 'El artículo 56 de la Constitución establece que el rey es el jefe del Estado.'],
      ['¿Qué cámaras forman las Cortes Generales?', 'El Congreso de los Diputados y el Senado', ['El Congreso y el Consejo de Estado', 'El Senado y el Tribunal Supremo'], 'Según el artículo 66 de la Constitución, las Cortes Generales están formadas por el Congreso de los Diputados y el Senado.'],
      ['¿Cuántos diputados tiene el Congreso de los Diputados?', '350', ['300', '400'], 'La Constitución fija entre 300 y 400 diputados, y la ley electoral los establece en 350.'],
      ['¿Cada cuánto tiempo, como máximo, se eligen los diputados del Congreso?', 'Cada cuatro años', ['Cada cinco años', 'Cada seis años'], 'El artículo 68.4 de la Constitución dice que el Congreso se elige por cuatro años, aunque las elecciones pueden adelantarse.'],
      ['¿Quién otorga la confianza al candidato a presidente del Gobierno en la investidura?', 'El Congreso de los Diputados', ['Los ciudadanos, en una votación directa', 'El Senado'], 'Según el artículo 99 de la Constitución, el candidato necesita la confianza del Congreso. Después, el rey lo nombra presidente.'],
      ['¿Qué institución es el intérprete supremo de la Constitución?', 'El Tribunal Constitucional', ['El Tribunal Supremo', 'El Defensor del Pueblo'], 'El Tribunal Constitucional decide si las leyes se ajustan a la Constitución y resuelve los recursos de amparo.'],
      ['¿Qué institución defiende los derechos de los ciudadanos frente a la Administración?', 'El Defensor del Pueblo', ['El Tribunal de Cuentas', 'El Consejo de Estado'], 'El Defensor del Pueblo, regulado en el artículo 54 de la Constitución, supervisa la actuación de la Administración.'],
      ['¿A partir de qué edad se puede votar en las elecciones generales?', 'A partir de los 18 años', ['A partir de los 16 años', 'A partir de los 21 años'], 'Votan los españoles mayores de edad, y la mayoría de edad se alcanza a los 18 años (artículo 12 de la Constitución).'],
      ['¿Qué poder del Estado ejerce el Gobierno?', 'El poder ejecutivo', ['El poder legislativo', 'El poder judicial'], 'El Gobierno dirige la política interior y exterior y ejerce la función ejecutiva (artículo 97 de la Constitución).'],
      ['¿Qué poder del Estado ejercen las Cortes Generales?', 'El poder legislativo', ['El poder ejecutivo', 'El poder judicial'], 'Las Cortes Generales ejercen la potestad legislativa del Estado y controlan la acción del Gobierno (artículo 66).'],
      ['¿Cuál es el órgano de gobierno del Poder Judicial?', 'El Consejo General del Poder Judicial', ['El Ministerio de Justicia', 'El Tribunal Constitucional'], 'El artículo 122 de la Constitución crea el Consejo General del Poder Judicial como órgano de gobierno de los jueces.'],
      ['¿Qué tribunal es el órgano jurisdiccional superior en todos los órdenes, salvo en garantías constitucionales?', 'El Tribunal Supremo', ['La Audiencia Nacional', 'El Tribunal Constitucional'], 'Lo establece el artículo 123 de la Constitución.'],
      ['¿Qué institución fiscaliza las cuentas y la gestión económica del Estado?', 'El Tribunal de Cuentas', ['El Banco de España', 'El Defensor del Pueblo'], 'El artículo 136 de la Constitución define al Tribunal de Cuentas como el supremo órgano fiscalizador de las cuentas del Estado.'],
      ['¿Cuál es la lengua oficial del Estado?', 'El castellano', ['El castellano y el inglés', 'No hay lengua oficial'], 'El artículo 3 de la Constitución establece el castellano como lengua oficial del Estado; las demás lenguas españolas son también oficiales en sus comunidades.'],
      ['¿Cómo se llama el himno nacional de España?', 'Marcha Real', ['Himno de Riego', 'Canto a la Patria'], 'El himno nacional es la Marcha Real, que no tiene letra oficial.'],
      ['¿Cómo es la bandera de España?', 'Tres franjas horizontales: roja, amarilla y roja', ['Dos franjas verticales: roja y amarilla', 'Tres franjas horizontales: roja, blanca y roja'], 'Según el artículo 4 de la Constitución, la franja amarilla central tiene el doble de anchura que cada una de las rojas.'],
      ['¿En qué organización internacional ingresó España en 1986?', 'En la Comunidad Económica Europea, hoy Unión Europea', ['En la OTAN', 'En las Naciones Unidas'], 'España entró en la Comunidad Económica Europea el 1 de enero de 1986. En la OTAN entró en 1982 y en la ONU, en 1955.'],
      ['¿En qué año empezaron a circular en España los billetes y monedas de euro?', '2002', ['1999', '1992'], 'El euro se adoptó en 1999 para operaciones financieras, pero los billetes y monedas llegaron el 1 de enero de 2002.'],
      ['¿Quién sanciona y promulga las leyes aprobadas por las Cortes?', 'El rey', ['El presidente del Gobierno', 'El presidente del Senado'], 'El artículo 62 de la Constitución atribuye al rey sancionar y promulgar las leyes.'],
      ['¿Cómo se llama la norma institucional básica de cada comunidad autónoma?', 'Estatuto de autonomía', ['Carta autonómica', 'Constitución regional'], 'Cada comunidad autónoma se rige por su Estatuto de autonomía (artículo 147 de la Constitución).'],
      ['¿Dónde se publican oficialmente las leyes del Estado?', 'En el Boletín Oficial del Estado (BOE)', ['En el Diario de Sesiones del Congreso', 'En la web del Ministerio de Justicia'], 'Las leyes se publican en el BOE, que es el diario oficial del Estado.'],
      ['¿Cuántos senadores elige cada provincia de la península por sufragio directo?', 'Cuatro', ['Dos', 'Seis'], 'El artículo 69.2 de la Constitución establece cuatro senadores por cada provincia peninsular.'],
      ['¿Quién nombra formalmente al presidente del Gobierno?', 'El rey, tras la votación de investidura en el Congreso', ['El presidente del Congreso, sin votación', 'El Senado'], 'El rey lo nombra después de que el Congreso le haya otorgado su confianza (artículo 99).']
    ],
    T2: [
      ['Todos los españoles tienen el deber de trabajar y el derecho al trabajo.', true, 'Lo recoge el artículo 35 de la Constitución.'],
      ['La Constitución reconoce el derecho a la educación.', true, 'El artículo 27 de la Constitución reconoce a todos el derecho a la educación.'],
      ['La enseñanza básica es obligatoria y gratuita.', true, 'Lo establece el artículo 27.4 de la Constitución.'],
      ['En España hay una religión oficial del Estado.', false, 'Es falso: según el artículo 16.3, ninguna confesión tiene carácter estatal.'],
      ['La pena de muerte está abolida en España.', true, 'El artículo 15 de la Constitución la abolió, y la excepción para tiempos de guerra se eliminó del Código Penal Militar en 1995.'],
      ['Los españoles deben contribuir al sostenimiento de los gastos públicos según su capacidad económica.', true, 'Es el deber de pagar impuestos, recogido en el artículo 31 de la Constitución.'],
      ['La Constitución reconoce el derecho de reunión pacífica y sin armas.', true, 'Lo reconoce el artículo 21 de la Constitución.'],
      ['Para hacer una manifestación en la vía pública hace falta pedir autorización previa.', false, 'Es falso: el artículo 21.2 exige comunicarla previamente a la autoridad, no pedir autorización.'],
      ['La mayoría de edad en España se alcanza a los 18 años.', true, 'Lo establece el artículo 12 de la Constitución.'],
      ['El servicio militar es obligatorio en España.', false, 'Es falso: el servicio militar obligatorio está suspendido desde el 31 de diciembre de 2001.'],
      ['Toda persona detenida tiene derecho a la asistencia de un abogado.', true, 'Lo garantiza el artículo 17.3 de la Constitución.'],
      ['Los españoles pueden elegir libremente su residencia y circular por todo el territorio nacional.', true, 'Lo reconoce el artículo 19 de la Constitución.']
    ],
    T3: [
      ['¿Cuántas comunidades autónomas tiene España?', '17', ['15', '19'], 'España tiene 17 comunidades autónomas y 2 ciudades autónomas, Ceuta y Melilla.'],
      ['¿Cuáles son las dos ciudades autónomas de España?', 'Ceuta y Melilla', ['Ceuta y Gibraltar', 'Melilla y Andorra'], 'Ceuta y Melilla están en el norte de África y tienen estatuto de ciudad autónoma.'],
      ['¿Cuántas provincias tiene España?', '50', ['52', '17'], 'España se divide en 50 provincias. Ceuta y Melilla no son provincias, sino ciudades autónomas.'],
      ['¿Cuál es la montaña más alta de España?', 'El Teide', ['El Mulhacén', 'El Aneto'], 'El Teide, en Tenerife, mide 3.715 metros. El Mulhacén es el pico más alto de la península.'],
      ['¿Cuál es el pico más alto de la península ibérica?', 'El Mulhacén', ['El Aneto', 'El Teide'], 'El Mulhacén, en Sierra Nevada (Granada), mide 3.479 metros. El Teide es más alto, pero está en Canarias.'],
      ['¿Cuál es el río más largo que discurre íntegramente por España?', 'El Ebro', ['El Tajo', 'El Guadalquivir'], 'El Ebro recorre unos 910 km dentro de España. El Tajo es más largo, pero una parte pasa por Portugal.'],
      ['¿Qué cordillera separa España de Francia?', 'Los Pirineos', ['Los Picos de Europa', 'Sierra Nevada'], 'Los Pirineos forman la frontera natural entre España y Francia, con Andorra entre ambos.'],
      ['¿Cuál es la capital de Andalucía?', 'Sevilla', ['Málaga', 'Granada'], 'Sevilla es la capital de Andalucía y sede de la Junta.'],
      ['¿En qué comunidad autónoma está Santiago de Compostela?', 'En Galicia', ['En Asturias', 'En Castilla y León'], 'Santiago de Compostela es la capital de Galicia y el final del Camino de Santiago.'],
      ['¿Qué islas forman las Islas Baleares?', 'Mallorca, Menorca, Ibiza y Formentera', ['Tenerife, Gran Canaria, Lanzarote y La Palma', 'Mallorca, Menorca, Tenerife e Ibiza'], 'Son las cuatro islas principales del archipiélago balear, en el Mediterráneo. Tenerife y Gran Canaria son Canarias.'],
      ['¿Qué mar baña la costa de Valencia?', 'El mar Mediterráneo', ['El mar Cantábrico', 'El océano Atlántico'], 'Toda la Comunidad Valenciana tiene costa mediterránea.']
    ],
    T4: [
      ['¿Quién escribió «Don Quijote de la Mancha»?', 'Miguel de Cervantes', ['Lope de Vega', 'Francisco de Quevedo'], 'Cervantes publicó la primera parte en 1605 y la segunda en 1615.'],
      ['¿Quién pintó «Las meninas»?', 'Diego Velázquez', ['Francisco de Goya', 'El Greco'], 'Velázquez la pintó en 1656. Se expone en el Museo del Prado.'],
      ['¿Quién pintó el «Guernica»?', 'Pablo Picasso', ['Salvador Dalí', 'Joan Miró'], 'Picasso lo pintó en 1937. Se expone en el Museo Reina Sofía de Madrid.'],
      ['¿En qué museo se expone «Las meninas»?', 'En el Museo del Prado', ['En el Museo Reina Sofía', 'En el Museo Thyssen-Bornemisza'], 'El Prado, en Madrid, guarda la mayor colección de Velázquez.'],
      ['¿Qué arquitecto diseñó la Sagrada Familia de Barcelona?', 'Antoni Gaudí', ['Santiago Calatrava', 'Rafael Moneo'], 'Gaudí dedicó a la Sagrada Familia los últimos años de su vida.'],
      ['¿En qué año llegó Cristóbal Colón a América?', '1492', ['1512', '1478'], 'Colón llegó a América el 12 de octubre de 1492, la fecha de la actual Fiesta Nacional.'],
      ['¿Qué día se celebra la Fiesta Nacional de España?', 'El 12 de octubre', ['El 6 de diciembre', 'El 2 de mayo'], 'La Fiesta Nacional es el 12 de octubre. El 6 de diciembre es el Día de la Constitución.'],
      ['¿Qué escritor español recibió el Premio Nobel de Literatura en 1989?', 'Camilo José Cela', ['Juan Ramón Jiménez', 'Miguel Delibes'], 'Cela lo recibió en 1989. Juan Ramón Jiménez lo había ganado en 1956.'],
      ['¿En qué año se celebraron las primeras elecciones democráticas tras la dictadura?', '1977', ['1975', '1982'], 'Fueron el 15 de junio de 1977. Franco había muerto en 1975.'],
      ['¿Qué monumento de Granada fue palacio y fortaleza de los reyes nazaríes?', 'La Alhambra', ['La Mezquita', 'El Alcázar de Segovia'], 'La Alhambra es uno de los monumentos más visitados de España. La Mezquita está en Córdoba.'],
      ['¿Quién escribió «La casa de Bernarda Alba»?', 'Federico García Lorca', ['Antonio Machado', 'Ramón del Valle-Inclán'], 'García Lorca la terminó en 1936, poco antes de ser asesinado.'],
      ['¿Qué ciudad española organizó los Juegos Olímpicos de 1992?', 'Barcelona', ['Madrid', 'Sevilla'], 'Barcelona acogió los Juegos de 1992. Ese mismo año Sevilla organizó la Exposición Universal.']
    ],
    T5: [
      ['¿Cuál es el teléfono de emergencias en toda la Unión Europea?', 'El 112', ['El 091', 'El 061'], 'El 112 funciona en toda la Unión Europea y es gratuito.'],
      ['¿Qué documento de identidad tienen los ciudadanos españoles?', 'El DNI', ['El NIE', 'La tarjeta sanitaria'], 'El DNI es el documento nacional de identidad de los españoles. El NIE es el número de identificación de los extranjeros.'],
      ['¿Cómo se llama el número que identifica a los extranjeros en España?', 'NIE', ['DNI', 'NIF-E'], 'El NIE (número de identidad de extranjero) identifica a los extranjeros en sus trámites en España.'],
      ['¿Qué día es festivo en toda España por el Día del Trabajo?', 'El 1 de mayo', ['El 1 de junio', 'El 12 de octubre'], 'El 1 de mayo es fiesta nacional en toda España.'],
      ['¿Qué se celebra el 6 de enero?', 'El Día de Reyes', ['La Nochebuena', 'El Día de la Constitución'], 'El 6 de enero, la Epifanía, los Reyes Magos traen regalos a los niños.'],
      ['¿Dónde hay que inscribirse en el padrón municipal?', 'En el ayuntamiento del municipio donde se vive', ['En la comisaría de policía', 'En la oficina de la Seguridad Social'], 'El padrón es el registro de vecinos de cada municipio y lo gestiona el ayuntamiento.'],
      ['¿Qué organismo recauda los impuestos del Estado?', 'La Agencia Tributaria', ['La Seguridad Social', 'El Banco de España'], 'La Agencia Estatal de Administración Tributaria gestiona impuestos como el IRPF o el IVA.'],
      ['¿Qué organismo paga las pensiones de jubilación?', 'La Seguridad Social', ['La Agencia Tributaria', 'El ayuntamiento'], 'Las pensiones contributivas de jubilación las gestiona el Instituto Nacional de la Seguridad Social.'],
      ['¿Qué fiesta se celebra en Pamplona en julio?', 'Los Sanfermines', ['Las Fallas', 'La Feria de Abril'], 'Los Sanfermines empiezan el 6 de julio con el chupinazo y son famosos por los encierros.'],
      ['¿En qué ciudad se celebran las Fallas?', 'En Valencia', ['En Sevilla', 'En Pamplona'], 'Las Fallas se celebran en marzo en Valencia y son Patrimonio Cultural Inmaterial de la Humanidad.'],
      ['¿Qué se toma tradicionalmente con las campanadas de Nochevieja?', 'Doce uvas', ['Doce aceitunas', 'Un trozo de turrón'], 'Se come una uva con cada una de las doce campanadas de medianoche del 31 de diciembre.'],
      ['¿Entre qué edades es obligatoria la enseñanza en España?', 'Entre los 6 y los 16 años', ['Entre los 3 y los 18 años', 'Entre los 6 y los 18 años'], 'La enseñanza obligatoria abarca la Primaria y la ESO, de los 6 a los 16 años.'],
      ['¿Qué día se celebra el sorteo extraordinario de la Lotería de Navidad?', 'El 22 de diciembre', ['El 24 de diciembre', 'El 6 de enero'], 'El sorteo de Navidad es el 22 de diciembre. El del Niño se celebra el 6 de enero.'],
      ['¿Qué fiesta de Sevilla, en primavera, es famosa por sus casetas y trajes de flamenca?', 'La Feria de Abril', ['Las Fallas', 'La Tomatina'], 'La Feria de Abril se celebra en Sevilla unas semanas después de la Semana Santa.'],
      ['¿Qué documento permite acceder a la sanidad pública?', 'La tarjeta sanitaria individual', ['El libro de familia', 'El certificado de empadronamiento'], 'La tarjeta sanitaria la emite el servicio de salud de cada comunidad autónoma.'],
      ['¿De qué región es típica la paella?', 'De la Comunidad Valenciana', ['De Galicia', 'Del País Vasco'], 'La paella valenciana es originaria de la zona de la Albufera de Valencia.'],
      ['¿Qué lengua es cooficial en Galicia, junto con el castellano?', 'El gallego', ['El asturiano', 'El euskera'], 'El gallego es lengua cooficial en Galicia según su Estatuto de autonomía.']
    ]
  };
  const PLAN = { T1: 10, T2: 3, T3: 2, T4: 3, T5: 7 };

  function ccseItems() {
    const out = [];
    Object.keys(PLAN).forEach((d) => {
      shuffle(BANK[d]).slice(0, PLAN[d]).forEach((x) => {
        if (d === 'T2') { out.push({ d, q: x[0], o: VF, a: x[1] ? 0 : 1, why: x[2] }); return; }
        const opts = shuffle([x[1]].concat(x[2]));
        out.push({ d, q: x[0], o: opts, a: opts.indexOf(x[1]), why: x[3] });
      });
    });
    return out;
  }

  const t = (W.TESTS || []).find((x) => x.id === 'ccse');
  if (t) { t.items = ccseItems(); t.regen = ccseItems; t.bankSize = Object.values(BANK).reduce((n, b) => n + b.length, 0); }
})();
