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
    // Empate en el top 5 solo cuenta si además las respuestas son poco marcadas:
    // un perfil claro puede empatar entre carreras parecidas sin estar «abierto».
    return !!(sd < 18 && ranked && ranked.length >= 5 && ranked[0].score - ranked[4].score < 3);
  };


  /* Perfil compacto: R I A S E C · NUM LEN MAN PER · EST ING IMP AUT */
  const K = ["R","I","A","S","E","C","NUM","LEN","MAN","PER","EST","ING","IMP","AUT"];
  const P = (...v) => Object.fromEntries(K.map((k, i) => [k, v[i]]));
  const CT = "Ciencias y Tecnología", HCS = "Humanidades y Ciencias Sociales", ART = "Artes";
  const MCS = "Matemáticas Aplicadas a las Ciencias Sociales II", EMP = "Empresa y Diseño de Modelos de Negocio";
  const g = (id, name, rama, prof, why, salidas, bach, asig, extra) => Object.assign({ id, name, rama, prof, why, salidas, bach, asig }, extra || {});
  const SAL = "Ciencias de la Salud", CIE = "Ciencias", ING = "Ingeniería y Arquitectura", SOC = "Ciencias Sociales y Jurídicas", HUM = "Artes y Humanidades";

  /* Grados universitarios (nombres según el RUCT; la denominación exacta cambia algo entre universidades). */
  const CARRERA = [
    g("medicina","Medicina",SAL,P(35,85,20,85,35,40,70,55,55,80,75,80,90,40),"Une la ciencia que te interesa con el trato directo con pacientes.","Medicina de familia y especialidades vía MIR, investigación clínica, salud pública.",CT,["Biología","Química","Matemáticas II o Física"],{alta:true}),
    g("enfermeria","Enfermería",SAL,P(45,60,15,90,25,45,45,50,65,90,85,55,90,25),"Cuidar a personas de forma práctica y cercana es lo que más te encaja.","Hospitales, centros de salud, residencias, especialidades vía EIR.",CT,["Biología","Química"],{alta:true,fpAlt:"lab-clinico"}),
    g("fisioterapia","Fisioterapia",SAL,P(70,55,15,80,35,30,35,40,80,85,60,55,80,55),"Te gusta ayudar a otros con las manos, en un trabajo muy físico.","Clínicas, deporte, hospitales, consulta propia.",CT,["Biología","Química o Física"],{alta:true,fpAlt:"acondicionamiento-fisico"}),
    g("odontologia","Odontología",SAL,P(65,70,30,65,50,45,50,35,90,70,70,85,65,60),"Precisión manual, ciencia y un trato de tú a tú con cada paciente.","Clínica dental propia o ajena, cirugía oral, ortodoncia.",CT,["Biología","Química"],{alta:true,fpAlt:"higiene-bucodental"}),
    g("veterinaria","Veterinaria",SAL,P(70,80,15,55,30,35,55,35,75,45,55,50,80,45),"Ciencia, trabajo práctico y animales: tu combinación encaja aquí.","Clínica de pequeños animales, ganadería, seguridad alimentaria, investigación.",CT,["Biología","Química"],{alta:true,fpAlt:"sanidad-animal"}),
    g("farmacia","Farmacia",SAL,P(25,85,10,50,45,70,75,40,45,50,80,70,60,35),"Te atrae la química aplicada a la salud con un trabajo ordenado y estable.","Oficina de farmacia, industria farmacéutica, análisis clínicos, hospital vía FIR.",CT,["Química","Biología","Matemáticas II"],{fpAlt:"lab-clinico"}),
    g("psicologia","Psicología",SAL,P(15,70,40,90,35,30,40,80,15,90,50,40,90,55),"Entender a las personas y ayudarlas a estar mejor es lo tuyo.","Psicología sanitaria (con máster), clínica vía PIR, educativa, recursos humanos.",CT+" o "+HCS,["Biología",MCS+" o Matemáticas II"],{fpAlt:"integracion-social"}),
    g("nutricion","Nutrición Humana y Dietética",SAL,P(35,70,25,75,45,45,55,50,40,75,60,45,80,55),"Ciencia útil para el día a día de la gente: comer y vivir mejor.","Consulta propia, clínicas, industria alimentaria, deporte.",CT,["Biología","Química"],{fpAlt:"dietetica"}),
    g("terapia-ocupacional","Terapia Ocupacional",SAL,P(55,45,50,90,20,30,25,50,70,90,70,35,90,35),"Ayudar a otros a recuperar su autonomía con actividades prácticas.","Hospitales, centros de día, residencias, atención temprana.",CT,["Biología"],{fpAlt:"integracion-social"}),
    g("logopedia","Logopedia",SAL,P(25,60,35,85,20,40,30,90,30,85,65,40,85,45),"El lenguaje y la comunicación, puestos al servicio de quien lo necesita.","Consulta propia, centros educativos, hospitales, atención temprana.",CT+" o "+HCS,["Biología","Lengua Castellana y Literatura II"],{fpAlt:"mediacion-comunicativa"}),
    g("optica","Óptica y Optometría",SAL,P(55,70,15,60,55,55,70,30,70,60,70,55,55,45),"Ciencia aplicada, precisión y trato con el público en un mismo oficio.","Ópticas, clínicas oftalmológicas, contactología, empresa propia.",CT,["Física","Matemáticas II","Biología"],{fpAlt:"optica-anteojeria"}),
    g("biologia","Biología",CIE,P(55,90,25,35,20,40,60,55,50,25,50,35,65,55),"Te mueve entender cómo funciona la vida, en el laboratorio o en el campo.","Investigación, laboratorios, medio ambiente, docencia, industria.",CT,["Biología","Química","Matemáticas II"],{fpAlt:"lab-analisis"}),
    g("biotecnologia","Biotecnología",CIE,P(40,90,20,30,45,50,75,45,55,25,45,65,70,45),"Ciencia de laboratorio con aplicación directa en empresas y salud.","Industria farmacéutica y alimentaria, investigación, start-ups biotecnológicas.",CT,["Biología","Química","Matemáticas II"],{alta:true,fpAlt:"lab-clinico"}),
    g("bioquimica","Bioquímica",CIE,P(30,95,15,25,20,55,80,45,45,20,55,50,65,40),"Te interesa la vida a escala molecular y el trabajo meticuloso.","Investigación, laboratorios clínicos, industria farmacéutica.",CT,["Química","Biología"],{fpAlt:"lab-analisis"}),
    g("quimica","Química",CIE,P(45,85,10,15,30,70,85,30,60,15,70,55,40,30),"Laboratorio, método y números: el perfil de un químico.","Industria química, control de calidad, investigación, medio ambiente.",CT,["Química","Matemáticas II","Física"],{fpAlt:"lab-analisis"}),
    g("fisica","Física",CIE,P(30,95,25,10,20,40,95,40,40,10,35,40,45,75),"Te puede la curiosidad por cómo funciona todo y te sobran los números.","Investigación, tecnología, finanzas cuantitativas, datos, docencia.",CT,["Física","Matemáticas II"]),
    g("matematicas","Matemáticas",CIE,P(15,90,20,15,25,65,98,35,15,10,55,55,30,65),"Disfrutas resolviendo problemas abstractos y razonando con precisión.","Datos e inteligencia artificial, banca y seguros, investigación, docencia.",CT,["Matemáticas II","Física"]),
    g("ambientales","Ciencias Ambientales",CIE,P(70,75,20,50,35,35,50,55,45,45,45,30,90,55),"Ciencia con propósito: cuidar el planeta es lo que te mueve.","Consultoría ambiental, administración pública, energía, educación ambiental.",CT,["Biología","Química","Geología y Ciencias Ambientales"],{fpAlt:"educacion-ambiental"}),
    g("geologia","Geología",CIE,P(85,80,15,15,20,35,65,35,60,15,45,40,45,60),"Ciencia al aire libre: rocas, terreno y trabajo de campo.","Geotecnia, minería, aguas subterráneas, riesgos naturales.",CT,["Geología y Ciencias Ambientales","Física","Química"]),
    g("ciencias-mar","Ciencias del Mar",CIE,P(80,85,25,30,20,25,55,40,55,25,35,25,75,60),"Investigar el mar con trabajo de campo y sentido ambiental.","Oceanografía, acuicultura, gestión costera, consultoría ambiental.",CT,["Biología","Química","Física"]),
    g("informatica","Ingeniería Informática",ING,P(30,80,30,15,40,65,90,30,25,15,65,85,35,65),"Lógica, problemas técnicos y sectores con mucha demanda: tu terreno.","Desarrollo de software, ciberseguridad, sistemas, consultoría tecnológica.",CT,["Matemáticas II","Física"],{fpAlt:"dam"}),
    g("ciencia-datos","Ciencia de Datos",ING,P(15,90,20,15,50,75,95,40,10,25,60,90,40,50),"Sacar conclusiones de los números para que otros decidan mejor.","Análisis de datos, inteligencia artificial, negocio digital, finanzas.",CT,["Matemáticas II","Física"],{fpAlt:"dam"}),
    g("industrial","Ingeniería en Tecnologías Industriales",ING,P(70,75,20,20,60,55,90,35,60,40,70,80,40,40),"Ingeniería generalista con salida en empresa y puestos de gestión.","Industria, energía, consultoría, dirección de proyectos y de planta.",CT,["Matemáticas II","Física","Dibujo Técnico II"],{fpAlt:"automatizacion-robotica"}),
    g("mecanica","Ingeniería Mecánica",ING,P(90,70,25,10,30,45,85,25,85,20,70,65,30,35),"Te gusta entender cómo funcionan las máquinas y diseñarlas.","Automoción, fabricación, mantenimiento industrial, diseño de máquinas.",CT,["Matemáticas II","Física","Dibujo Técnico II"],{fpAlt:"diseno-fab-mecanica"}),
    g("aeroespacial","Ingeniería Aeroespacial",ING,P(75,90,30,10,30,50,95,30,65,15,60,80,45,40),"Física exigente aplicada a aviones, satélites y motores.","Industria aeronáutica y espacial, mantenimiento, defensa, consultoría.",CT,["Matemáticas II","Física"],{fpAlt:"mant-aeromecanico"}),
    g("biomedica","Ingeniería Biomédica",ING,P(60,85,25,55,30,45,85,35,60,40,60,65,80,40),"Ingeniería con impacto directo en la salud de las personas.","Tecnología sanitaria, hospitales, prótesis y dispositivos médicos, investigación.",CT,["Matemáticas II","Física","Biología"],{fpAlt:"electromedicina"}),
    g("teleco","Ingeniería de Tecnologías de Telecomunicación",ING,P(60,75,15,15,40,60,90,25,55,20,70,80,35,40),"Redes, señales y electrónica: la base técnica de todo lo conectado.","Operadoras, redes y comunicaciones, electrónica, ciberseguridad.",CT,["Matemáticas II","Física"],{fpAlt:"telecom"}),
    g("arquitectura","Fundamentos de la Arquitectura",ING,P(55,55,90,30,45,40,70,40,75,40,35,60,50,80),"Creatividad con números y espacio: diseñar lo que se construye.","Estudios de arquitectura, urbanismo, rehabilitación, interiorismo.",CT,["Matemáticas II","Dibujo Técnico II","Física"],{fpAlt:"proyectos-edificacion"}),
    g("civil","Ingeniería Civil",ING,P(80,60,25,30,45,55,80,30,55,45,75,65,60,30),"Obras grandes y útiles para todos: carreteras, puentes, agua.","Constructoras, ingenierías, administración pública, obra civil.",CT,["Matemáticas II","Física","Dibujo Técnico II"],{fpAlt:"obra-civil"}),
    g("agroalimentaria","Ingeniería Agroalimentaria",ING,P(85,60,15,30,45,40,55,30,70,35,60,45,65,55),"Técnica aplicada al campo y a los alimentos, con mucho trabajo práctico.","Explotaciones agrarias, industria alimentaria, cooperativas, administración.",CT,["Biología","Química","Matemáticas II"],{fpAlt:"paisajismo"}),
    g("videojuegos","Diseño y Desarrollo de Videojuegos",ING,P(40,60,90,15,40,35,75,40,45,20,30,55,25,90),"Programación y creatividad a partes iguales.","Estudios de videojuegos, simulación, realidad virtual, desarrollo independiente.",CT,["Matemáticas II","Física o Dibujo Técnico II"],{fpAlt:"animacion-3d"}),
    g("ing-quimica","Ingeniería Química",ING,P(65,85,10,10,40,65,85,25,60,20,75,75,45,30),"Química a escala industrial, con salidas estables en empresa.","Industria química, energética y farmacéutica, medio ambiente, procesos.",CT,["Química","Matemáticas II","Física"],{fpAlt:"quimica-industrial"}),
    g("derecho","Derecho",SOC,P(10,45,20,50,75,70,30,95,10,75,80,80,60,35),"Argumentar, defender y entender las reglas: tu fuerte es la palabra.","Abogacía (con máster), oposiciones, asesoría de empresas, notarías.",HCS,[MCS,"Geografía","Latín II"]),
    g("ade","Administración y Dirección de Empresas",SOC,P(15,35,15,30,90,75,75,55,10,70,60,90,30,60),"Organizar, decidir y llevar un negocio adelante.","Gestión empresarial, finanzas, consultoría, emprendimiento.",HCS,[MCS,EMP],{fpAlt:"admin-finanzas"}),
    g("economia","Economía",SOC,P(10,75,15,30,65,70,90,60,10,45,55,80,55,45),"Entender cómo funciona el dinero y por qué deciden así las personas y los países.","Análisis económico, banca, consultoría, organismos públicos e internacionales.",HCS+" o "+CT,[MCS+" o Matemáticas II",EMP],{fpAlt:"admin-finanzas"}),
    g("marketing","Marketing",SOC,P(15,35,75,40,90,30,50,70,20,75,35,75,30,75),"Mezclas ideas creativas con olfato para vender.","Marketing digital, marca, investigación de mercados, comercio electrónico.",HCS,[MCS,EMP],{fpAlt:"marketing-publicidad"}),
    g("periodismo","Periodismo",SOC,P(25,65,65,45,65,15,25,95,20,70,25,30,75,85),"Contar lo que pasa, investigar y escribir bien.","Medios, comunicación corporativa, redes y contenido, gabinetes de prensa.",HCS,["Geografía","Historia del Arte","Latín II"]),
    g("audiovisual","Comunicación Audiovisual",SOC,P(55,30,95,20,55,20,30,55,80,40,20,40,40,90),"Contar historias con imagen y sonido, y con las manos en el equipo.","Cine, televisión, producción de vídeo, contenido para plataformas y redes.",HCS+" o "+ART,["Historia del Arte","Diseño"],{fpAlt:"realizacion-audiovisual"}),
    g("publicidad","Publicidad y Relaciones Públicas",SOC,P(10,30,90,35,80,20,30,75,45,70,25,60,30,80),"Creatividad con un objetivo: que una idea llegue a la gente.","Agencias, departamentos de marca, comunicación, redes sociales.",HCS+" o "+ART,["Historia del Arte",MCS],{fpAlt:"marketing-publicidad"}),
    g("primaria","Maestro en Educación Primaria",SOC,P(30,30,55,95,30,40,50,70,40,90,90,30,85,30),"Enseñar y acompañar a niños, con estabilidad si apruebas la oposición.","Colegios públicos (oposición), concertados y privados, refuerzo educativo.","Cualquiera (lo más habitual, "+HCS+")",["Lengua Castellana y Literatura II",MCS+" o Matemáticas II"]),
    g("infantil","Maestro en Educación Infantil",SOC,P(40,15,75,95,20,35,25,55,55,90,85,20,85,40),"Los primeros años de los niños, con juego, creatividad y mucha paciencia.","Escuelas infantiles y colegios (oposición), atención temprana, ludotecas.","Cualquiera (lo más habitual, "+HCS+")",["Lengua Castellana y Literatura II"],{fpAlt:"educacion-infantil"}),
    g("trabajo-social","Trabajo Social",SOC,P(15,35,25,95,40,40,20,70,15,95,70,15,95,30),"Ayudar a personas y familias en situaciones difíciles es lo que te mueve.","Servicios sociales, ONG, hospitales, centros de menores y de mayores.",HCS,["Geografía",MCS],{fpAlt:"integracion-social"}),
    g("criminologia","Criminología",SOC,P(30,75,10,70,55,55,45,70,20,65,75,45,70,35),"Entender por qué se delinque y cómo prevenirlo.","Seguridad, prisiones, oposiciones a cuerpos de seguridad, peritaje.",HCS,[MCS,"Geografía"]),
    g("rrhh","Relaciones Laborales y Recursos Humanos",SOC,P(10,25,20,80,70,70,40,65,10,90,75,60,50,30),"Trabajar con personas dentro de la empresa, con orden y normas claras.","Departamentos de personas, asesorías laborales, selección, graduado social.",HCS,[EMP,MCS],{fpAlt:"asistencia-direccion"}),
    g("relaciones-internacionales","Relaciones Internacionales",SOC,P(10,55,35,55,80,35,35,90,10,85,30,60,75,65),"Idiomas, política y mundo: te ves en un entorno internacional.","Organismos internacionales, diplomacia, ONG, empresas con negocio exterior.",HCS,["Geografía",MCS,"Segunda Lengua Extranjera II"],{fpAlt:"comercio-internacional"}),
    g("turismo","Turismo",SOC,P(40,15,40,65,75,50,35,65,25,90,40,40,25,60),"Trato con gente, idiomas y organización en un sector muy vivo.","Hoteles, agencias, gestión de destinos, eventos.",HCS,["Geografía",EMP,"Segunda Lengua Extranjera II"],{fpAlt:"guia-turismo"}),
    g("politicas","Ciencia Política y de la Administración",SOC,P(5,60,20,50,80,25,35,90,10,75,40,50,90,55),"Te interesa cómo se toman las decisiones que nos afectan a todos.","Administración pública, asesoría política, consultoría, organismos internacionales.",HCS,["Geografía",MCS]),
    g("educacion-social","Educación Social",SOC,P(35,25,45,95,35,25,15,60,40,95,50,15,95,45),"Acompañar a personas en riesgo con proyectos educativos fuera del aula.","Centros de menores, ONG, inserción laboral, centros de día.",HCS,["Geografía",MCS],{fpAlt:"integracion-social"}),
    g("cafyd","Ciencias de la Actividad Física y del Deporte",SAL,P(90,40,25,75,55,20,25,35,90,80,40,45,60,65),"Deporte, cuerpo y trato con la gente: tu perfil va por aquí.","Entrenamiento, gestión deportiva, docencia, readaptación física.",CT,["Biología","Física"],{fpAlt:"acondicionamiento-fisico"}),
    g("doble-derecho-ade","Doble grado en Derecho y ADE",SOC,P(10,45,10,30,90,80,65,85,10,70,65,95,35,40),"Derecho y empresa a la vez: exigente, con muchas salidas bien pagadas.","Despachos, asesoría de empresas, banca, consultoría, oposiciones.",HCS,[MCS,EMP],{alta:true}),
    g("bellas-artes","Bellas Artes",HUM,P(60,20,98,15,25,10,15,40,85,15,10,15,40,98),"Crear con las manos y con libertad es lo que más te llena.","Creación artística, ilustración, restauración (con máster), docencia, gestión cultural.",ART,["Dibujo Artístico II","Técnicas de Expresión Gráfico-Plástica","Historia del Arte"]),
    g("diseno","Diseño",HUM,P(50,30,95,25,50,35,35,40,75,40,30,50,40,85),"Creatividad con un uso práctico: objetos, marcas, espacios.","Diseño gráfico, de producto, de interiores y digital (UX), estudios propios.",ART,["Diseño","Dibujo Artístico II","Dibujo Técnico Aplicado a las Artes Plásticas y al Diseño II"]),
    g("historia","Historia",HUM,P(30,75,40,30,20,45,20,85,20,25,45,15,55,75),"Investigar el pasado y contarlo bien.","Docencia (con máster), archivos, museos, patrimonio, divulgación.",HCS,["Historia del Arte","Geografía","Latín II"]),
    g("historia-arte","Historia del Arte",HUM,P(25,55,80,30,25,45,10,85,30,30,35,15,50,75),"Arte, museos y patrimonio: lo que más te atrae es mirar y entender.","Museos, galerías, patrimonio, gestión cultural, docencia.",HCS+" o "+ART,["Historia del Arte","Geografía"]),
    g("filosofia","Filosofía",HUM,P(5,85,50,40,20,10,45,90,5,30,20,10,60,90),"Pensar a fondo las grandes preguntas y argumentar con rigor.","Docencia (con máster), edición, ética aplicada, consultoría, investigación.",HCS,["Latín II","Griego II"]),
    g("traduccion","Traducción e Interpretación",HUM,P(10,45,50,35,40,60,25,98,10,45,45,40,30,80),"Los idiomas son tu herramienta y te gusta el trabajo preciso.","Traducción autónoma, interpretación, localización, organismos internacionales.",HCS,["Segunda Lengua Extranjera II","Latín II"]),
    g("estudios-ingleses","Estudios Ingleses",HUM,P(15,50,55,50,40,40,15,90,10,55,55,30,40,65),"Lengua y literatura inglesas, con la docencia como salida natural.","Docencia, traducción, edición, academias, comunicación internacional.",HCS,["Segunda Lengua Extranjera II","Latín II"]),
    g("lengua-literatura","Lengua y Literatura Españolas",HUM,P(10,55,70,45,20,40,10,95,10,40,55,15,50,75),"Leer, escribir y entender la lengua es lo que te apasiona.","Docencia (con máster), edición y corrección, escritura, comunicación.",HCS,["Latín II","Griego II"]),
  ];

  /* Ciclos de FP: nombres oficiales y familias de todofp.es (consultado el 2026-11-17).
     GM = grado medio, GS = grado superior (da acceso a la universidad). */
  const f = (id, nivel, nombre, familia, prof, why, salidas) => ({ id, nivel, name: (nivel === "GS" ? "Técnico Superior en " : "Técnico en ") + nombre, familia, prof, why, salidas, puente: nivel === "GS" });
  const AFD="Actividades Físicas y Deportivas",ADG="Administración y Gestión",AGA="Agraria",ARA="Artes y Artesanías",ARG="Artes Gráficas",COM="Comercio y Marketing",EOC="Edificación y Obra Civil",ELE="Electricidad y Electrónica",ENA="Energía y Agua",FME="Fabricación Mecánica",HOT="Hostelería y Turismo",IMP="Imagen Personal",IMS="Imagen y Sonido",INA="Industrias Alimentarias",IEX="Industrias Extractivas",IFC="Informática y Comunicaciones",IMA="Instalación y Mantenimiento",MAM="Madera, Mueble y Corcho",MAP="Marítimo Pesquera",QUI="Química",SAN="Sanidad",SEA="Seguridad y Medio Ambiente",SSC="Servicios Socioculturales y a la Comunidad",TCP="Textil, Confección y Piel",TMV="Transporte y Mantenimiento de Vehículos",VIC="Vidrio y Cerámica";
  const FP = [
    f("guia-medio-natural","GM","Guía en el Medio Natural y de Tiempo Libre",AFD,P(90,30,25,70,40,15,20,40,75,75,35,25,60,75),"Naturaleza, deporte y grupos de gente: tu sitio está al aire libre.","Guía de montaña, rutas y actividades de tiempo libre, turismo activo."),
    f("acondicionamiento-fisico","GS","Acondicionamiento Físico",AFD,P(85,40,20,80,50,20,30,40,80,85,45,45,65,60),"Entrenar a otros y ver cómo mejoran es lo que te motiva.","Entrenador en gimnasios, entrenamiento personal, actividades dirigidas."),
    f("animacion-sociodeportiva","GS","Enseñanza y Animación Sociodeportiva",AFD,P(80,25,35,85,55,20,20,55,65,90,50,35,70,55),"Deporte como forma de educar y animar a grupos.","Monitor deportivo, campamentos, actividades extraescolares, turismo deportivo."),
    f("gestion-administrativa","GM","Gestión Administrativa",ADG,P(10,20,10,35,30,90,60,55,15,50,85,40,25,20),"Orden, papeles y oficina: un trabajo estable y bien organizado.","Auxiliar administrativo en empresas y en la Administración, atención al cliente."),
    f("admin-finanzas","GS","Administración y Finanzas",ADG,P(10,40,10,25,55,90,85,50,10,45,80,65,25,25),"Números, gestión y empresa: llevar las cuentas de un negocio.","Administración contable y financiera, gestorías, departamentos de RR. HH."),
    f("asistencia-direccion","GS","Asistencia a la Dirección",ADG,P(10,25,20,55,55,85,45,80,10,75,75,50,25,30),"Organizar la agenda y el trabajo de otros con idiomas y buena comunicación.","Asistente de dirección, secretariado ejecutivo, organización de eventos de empresa."),
    f("jardineria","GM","Jardinería y Floristería",AGA,P(85,25,60,30,25,30,20,20,80,30,55,20,55,60),"Trabajar con plantas, con las manos y con gusto estético.","Jardinería pública y privada, viveros, floristerías."),
    f("sanidad-animal","GS","Ganadería y Asistencia en Sanidad Animal",AGA,P(85,55,10,45,30,35,40,25,75,40,60,35,70,40),"Animales y trabajo práctico en el campo o en la clínica.","Explotaciones ganaderas, asistente en clínicas veterinarias, centros de animales."),
    f("gestion-forestal","GS","Gestión Forestal y del Medio Natural",AGA,P(90,55,15,30,35,35,45,30,65,35,65,35,85,55),"Cuidar los bosques y el medio natural desde el terreno.","Agente forestal (oposición), gestión de espacios naturales, prevención de incendios."),
    f("paisajismo","GS","Paisajismo y Medio Rural",AGA,P(80,40,65,30,45,40,45,30,70,45,50,40,65,60),"Diseñar y cuidar paisajes y jardines con criterio técnico.","Diseño y mantenimiento de jardines, empresas de paisajismo, explotaciones agrícolas."),
    f("instrumentos-cuerda","GS","Diseño y construcción artesanal de instrumentos musicales de cuerda",ARA,P(85,35,85,10,25,35,50,15,98,15,30,25,30,85),"Artesanía de precisión con madera y música.","Taller de luthería propio o ajeno, reparación y restauración de instrumentos."),
    f("preimpresion","GM","Preimpresión Digital",ARG,P(50,25,75,15,20,60,40,40,65,20,55,30,20,55),"Diseño en pantalla con atención al detalle técnico.","Imprentas, estudios gráficos, maquetación."),
    f("diseno-publicaciones","GS","Diseño y Edición de Publicaciones Impresas y Multimedia",ARG,P(35,30,90,20,45,45,35,55,55,35,40,40,25,75),"Diseñar revistas, libros y piezas digitales con criterio visual.","Editoriales, agencias, estudios de diseño, departamentos de marketing."),
    f("actividades-comerciales","GM","Actividades Comerciales",COM,P(30,10,25,60,80,45,45,50,30,85,50,50,15,40),"Tratar con clientes y vender se te da bien.","Dependiente o encargado de tienda, comercial, atención al cliente."),
    f("marketing-publicidad","GS","Marketing y Publicidad",COM,P(15,35,75,40,85,35,45,70,25,70,35,60,25,70),"Ideas creativas con un objetivo comercial.","Marketing digital, agencias de publicidad, redes sociales, eventos."),
    f("comercio-internacional","GS","Comercio Internacional",COM,P(15,35,15,40,80,70,65,80,10,70,55,65,20,45),"Idiomas, negocio y logística con otros países.","Departamentos de exportación e importación, logística internacional, aduanas."),
    f("transporte-logistica","GS","Transporte y Logística",COM,P(45,30,10,30,65,85,70,40,25,55,70,55,20,35),"Organizar que las cosas lleguen a tiempo y al menor coste.","Empresas de transporte, almacenes, operadores logísticos."),
    f("construccion","GM","Construcción",EOC,P(95,20,25,25,30,35,40,15,90,35,55,45,40,40),"Construir con tus manos y ver el resultado terminado.","Obras de edificación, reformas, encargado de cuadrilla."),
    f("proyectos-edificacion","GS","Proyectos de Edificación",EOC,P(55,50,55,25,40,70,75,30,70,30,65,50,35,45),"Dibujar y calcular edificios antes de que se construyan.","Estudios de arquitectura, constructoras, delineación, mediciones y presupuestos."),
    f("obra-civil","GS","Proyectos de Obra Civil",EOC,P(70,50,25,25,45,70,80,25,60,35,70,50,45,35),"Carreteras, redes y obras públicas desde la oficina técnica.","Ingenierías, constructoras, topografía, administración pública."),
    f("instalaciones-electricas","GM","Instalaciones Eléctricas y Automáticas",ELE,P(90,45,10,20,30,55,60,15,90,30,75,55,30,35),"Un oficio técnico con mucha demanda y trabajo práctico.","Electricista en viviendas, empresas e industria; instalaciones solares."),
    f("automatizacion-robotica","GS","Automatización y Robótica Industrial",ELE,P(75,75,20,10,35,60,85,20,80,20,70,65,30,40),"Programar y poner a punto máquinas y robots.","Industria, mantenimiento de líneas automatizadas, integradores de robótica."),
    f("electromedicina","GS","Electromedicina Clínica",ELE,P(65,70,10,50,30,55,75,30,75,45,75,55,75,30),"Tecnología al servicio de los hospitales.","Mantenimiento de equipos médicos en hospitales y empresas de electromedicina."),
    f("telecom","GS","Sistemas de Telecomunicaciones e Informáticos",ELE,P(70,65,10,20,40,60,75,25,75,30,70,60,30,40),"Redes, antenas y sistemas: la infraestructura de lo conectado.","Operadoras, instaladoras de telecomunicaciones, redes de empresa."),
    f("energias-renovables","GS","Energías Renovables",ENA,P(80,60,15,20,40,50,70,25,75,25,60,55,85,45),"Técnica con impacto: la energía limpia.","Parques eólicos y solares, mantenimiento de instalaciones, empresas energéticas."),
    f("eficiencia-energetica","GS","Eficiencia Energética y Energía Solar Térmica",ENA,P(70,60,15,30,45,65,75,35,60,40,65,55,80,40),"Hacer que edificios e instalaciones gasten menos energía.","Certificación energética, auditorías, instalaciones solares térmicas."),
    f("gestion-agua","GS","Gestión del Agua",ENA,P(70,60,10,35,30,70,65,30,55,30,80,45,80,30),"Un servicio básico y estable: el agua de todos.","Empresas de abastecimiento y depuración, ayuntamientos, control de calidad del agua."),
    f("mecanizado","GM","Mecanizado",FME,P(95,35,20,10,20,55,60,10,95,10,70,50,20,30),"Precisión con máquinas y metal.","Talleres de mecanizado, industria, manejo de tornos y fresadoras CNC."),
    f("soldadura","GM","Soldadura y Calderería",FME,P(98,20,25,10,20,40,40,10,95,10,65,60,20,40),"Un oficio manual muy buscado y bien pagado.","Industria, astilleros, estructuras metálicas, mantenimiento."),
    f("diseno-fab-mecanica","GS","Diseño en Fabricación Mecánica",FME,P(70,60,50,10,30,60,80,20,80,15,65,55,25,45),"Diseñar piezas y máquinas por ordenador.","Oficinas técnicas, diseño CAD, industria."),
    f("optica-anteojeria","GS","Óptica de Anteojería",FME,P(60,55,30,65,55,55,55,35,80,75,70,45,55,40),"Precisión manual y trato con el cliente en un mismo oficio.","Ópticas, talleres de montaje de gafas, empresas del sector óptico."),
    f("cocina","GM","Cocina y Gastronomía",HOT,P(80,20,70,35,35,40,30,20,90,40,40,30,35,60),"Cocinar con creatividad y ritmo.","Cocinero en restaurantes, hoteles, colectividades, catering."),
    f("direccion-cocina","GS","Dirección de Cocina",HOT,P(70,25,80,35,70,45,40,30,85,55,35,50,30,70),"Crear platos y dirigir una cocina.","Jefe de cocina, restauración propia, catering, gastronomía."),
    f("guia-turismo","GS","Guía, Información y Asistencias Turísticas",HOT,P(40,30,40,75,65,30,20,85,20,95,30,30,35,70),"Idiomas, gente y contar historias de un lugar.","Guía turístico, oficinas de turismo, asistencia en aeropuertos y cruceros."),
    f("agencias-viajes","GS","Agencias de Viajes y Gestión de Eventos",HOT,P(20,20,40,60,75,65,40,70,15,85,45,45,20,55),"Organizar viajes y eventos para que todo salga bien.","Agencias de viajes, organización de eventos y congresos."),
    f("estetica-belleza","GM","Estética y Belleza",IMP,P(60,20,70,75,40,30,15,30,85,85,50,35,40,55),"Cuidar a otras personas con trato cercano y buena mano.","Centros de estética, spas, tiendas de cosmética."),
    f("peluqueria","GM","Peluquería y Cosmética Capilar",IMP,P(65,10,80,70,45,25,15,30,90,85,45,35,30,65),"Creatividad con las manos y trato diario con clientes.","Peluquerías, salón propio, cosmética capilar."),
    f("caracterizacion","GS","Caracterización y Maquillaje Profesional",IMP,P(55,20,95,40,35,25,20,30,95,55,25,30,25,80),"Transformar caras para cine, teatro o moda.","Cine, televisión, teatro, publicidad, moda."),
    f("estetica-integral","GS","Estética Integral y Bienestar",IMP,P(55,40,55,80,55,35,30,35,80,85,50,45,60,60),"Bienestar y cuidado de las personas con base técnica.","Centros de estética, spas, balnearios, centro propio."),
    f("animacion-3d","GS","Animaciones 3D, Juegos y Entornos Interactivos",IMS,P(35,45,95,10,25,40,60,25,70,15,30,45,20,85),"Crear mundos y personajes en 3D.","Estudios de videojuegos y animación, publicidad, realidad virtual."),
    f("realizacion-audiovisual","GS","Realización de Proyectos Audiovisuales y Espectáculos",IMS,P(55,30,90,30,60,40,35,55,70,60,25,40,30,85),"Dirigir lo que se graba: cine, tele o directo.","Televisión, productoras, publicidad, espectáculos en directo."),
    f("sonido","GS","Sonido para Audiovisuales y Espectáculos",IMS,P(70,40,80,15,25,45,50,20,80,25,35,35,20,75),"Música y técnica: que todo suene bien.","Conciertos, estudios de grabación, radio y televisión, teatro."),
    f("iluminacion-imagen","GS","Iluminación, Captación y Tratamiento de Imagen",IMS,P(65,35,90,25,35,35,40,25,80,35,30,35,20,85),"Fotografía, cámara y luz con ojo creativo.","Fotografía, operador de cámara, iluminación en rodajes y espectáculos."),
    f("panaderia","GM","Panadería, Repostería y Confitería",INA,P(85,20,65,30,35,45,35,15,90,30,55,30,30,55),"Elaborar con las manos algo que la gente disfruta.","Obradores, pastelerías, panaderías, negocio propio."),
    f("vitivinicultura","GS","Vitivinicultura",INA,P(75,55,40,30,55,50,50,30,70,40,55,45,40,55),"Del viñedo a la botella, con técnica y tradición.","Bodegas, viñedos, enoturismo, control de calidad del vino."),
    f("calidad-alimentaria","GS","Procesos y Calidad en la Industria Alimentaria",INA,P(55,65,10,25,40,80,65,30,50,30,80,45,55,30),"Que lo que comemos sea seguro y de calidad.","Industria alimentaria, control de calidad, laboratorios de alimentos."),
    f("excavaciones","GM","Excavaciones y Sondeos",IEX,P(95,30,10,10,25,40,45,10,85,15,55,65,20,40),"Maquinaria pesada y trabajo de campo.","Minería, obra civil, sondeos de agua y geotecnia."),
    f("piedra-natural","GM","Piedra Natural",IEX,P(90,15,60,10,25,40,30,10,95,15,55,40,20,50),"Trabajar la piedra con oficio y precisión.","Marmolerías, canteras, restauración de piedra."),
    f("smr","GM","Sistemas Microinformáticos y Redes",IFC,P(65,55,15,30,25,60,60,25,70,45,65,45,25,35),"Montar, arreglar y configurar ordenadores y redes.","Técnico informático, soporte a usuarios, tiendas de informática."),
    f("asir","GS","Administración de Sistemas Informáticos en Red",IFC,P(50,70,10,20,35,75,75,30,50,25,75,70,30,40),"Que los servidores y las redes de una empresa funcionen siempre.","Administrador de sistemas, redes, ciberseguridad, cloud."),
    f("dam","GS","Desarrollo de Aplicaciones Multiplataforma",IFC,P(25,75,40,10,35,65,90,30,25,10,60,75,25,65),"Programar aplicaciones con lógica y método.","Programador de aplicaciones de escritorio y móviles, desarrollo de software."),
    f("daw","GS","Desarrollo de Aplicaciones Web",IFC,P(25,70,60,15,40,55,80,35,30,20,50,70,25,75),"Programar webs con una parte creativa.","Desarrollador web front-end o back-end, agencias digitales, trabajo en remoto."),
    f("climatizacion","GM","Instalaciones Frigoríficas y de Climatización",IMA,P(90,40,10,25,25,50,55,15,90,35,75,55,30,35),"Un oficio técnico con trabajo asegurado todo el año.","Instaladoras de climatización y frío industrial, mantenimiento."),
    f("mantenimiento-electromecanico","GM","Mantenimiento Electromecánico",IMA,P(95,45,10,15,20,55,55,10,90,20,75,50,25,30),"Reparar y mantener máquinas en marcha.","Mantenimiento industrial, fábricas, montaje de maquinaria."),
    f("mecatronica","GS","Mecatrónica Industrial",IMA,P(80,70,15,10,30,60,80,20,85,20,75,65,25,35),"Mecánica, electrónica y programación juntas.","Mantenimiento de líneas de producción, industria de automoción y alimentaria."),
    f("carpinteria","GM","Carpintería y Mueble",MAM,P(95,25,65,15,30,40,45,10,95,20,55,35,25,60),"Crear con madera algo útil y bonito.","Talleres de carpintería, fabricación de muebles, taller propio."),
    f("diseno-amueblamiento","GS","Diseño y Amueblamiento",MAM,P(65,40,85,25,50,45,60,30,80,40,45,45,25,70),"Diseñar muebles y espacios interiores.","Diseño de mobiliario, cocinas e interiores, fabricación a medida."),
    f("navegacion-pesca","GM","Navegación y Pesca de Litoral",MAP,P(90,30,10,20,35,35,40,15,80,30,45,55,20,60),"Trabajar en el mar, con oficio y aire libre.","Patrón de pesca litoral, embarcaciones de servicio y de recreo."),
    f("operaciones-subacuaticas","GM","Operaciones Subacuáticas e Hiperbáricas",MAP,P(95,40,10,20,30,40,45,15,85,25,40,70,35,55),"Trabajo bajo el agua: técnico, físico y poco común.","Buceo profesional, obras en puertos, acuicultura, rescate."),
    f("acuicultura","GS","Acuicultura",MAP,P(80,65,15,25,40,50,55,25,65,25,55,45,65,45),"Criar peces y marisco con criterio científico.","Piscifactorías, viveros marinos, laboratorios de acuicultura."),
    f("operaciones-laboratorio","GM","Operaciones de Laboratorio",QUI,P(50,65,10,15,15,75,60,25,70,15,75,40,40,25),"Trabajo de laboratorio ordenado y preciso.","Laboratorios de industria, control de calidad, investigación."),
    f("lab-analisis","GS","Laboratorio de Análisis y de Control de Calidad",QUI,P(45,80,10,15,25,80,75,30,65,20,75,50,50,25),"Analizar muestras con método y rigor.","Laboratorios químicos, alimentarios, ambientales y farmacéuticos."),
    f("quimica-industrial","GS","Química Industrial",QUI,P(70,70,10,10,35,70,75,20,65,15,75,60,35,30),"Química a escala de fábrica.","Industria química, petroquímica, plásticos y pinturas."),
    f("farmaceuticos","GS","Fabricación de Productos Farmacéuticos, Biotecnológicos y Afines",QUI,P(50,75,10,25,30,80,70,25,60,20,80,55,65,25),"Fabricar medicamentos con calidad y control.","Industria farmacéutica, biotecnológica y cosmética."),
    f("cuidados-enfermeria","GM","Cuidados Auxiliares de Enfermería",SAN,P(55,40,10,90,20,45,25,40,70,90,80,30,90,20),"Cuidar a pacientes de cerca, cada día.","Hospitales, centros de salud, residencias, clínicas dentales."),
    f("emergencias-sanitarias","GM","Emergencias Sanitarias",SAN,P(75,45,10,85,35,40,30,40,80,85,65,40,95,35),"Actuar rápido cuando alguien lo necesita.","Técnico en ambulancias, servicios de emergencias, protección civil."),
    f("lab-clinico","GS","Laboratorio Clínico y Biomédico",SAN,P(45,80,10,40,15,75,60,30,70,30,80,40,70,25),"Ciencia de laboratorio al servicio de los pacientes.","Laboratorios de hospitales, análisis clínicos, bancos de sangre, investigación."),
    f("higiene-bucodental","GS","Higiene Bucodental",SAN,P(60,50,25,75,35,55,35,40,85,80,75,45,60,35),"Salud, precisión manual y trato con pacientes.","Clínicas dentales, salud pública, educación sanitaria."),
    f("imagen-diagnostico","GS","Imagen para el Diagnóstico y Medicina Nuclear",SAN,P(55,70,15,65,25,60,55,30,65,65,80,50,70,25),"Tecnología médica y trato con pacientes.","Radiología de hospitales y clínicas, resonancia, medicina nuclear."),
    f("dietetica","GS","Dietética",SAN,P(35,65,25,75,40,50,50,50,40,75,65,35,80,50),"Ayudar a la gente a comer mejor.","Clínicas, hospitales, comedores colectivos, industria alimentaria."),
    f("emergencias-proteccion-civil","GM","Emergencias y Protección Civil",SEA,P(85,30,10,75,45,40,30,40,80,70,70,40,90,35),"Proteger a la gente en situaciones de riesgo.","Bomberos y protección civil (oposición), vigilancia de incendios, emergencias."),
    f("educacion-ambiental","GS","Educación y Control Ambiental",SEA,P(70,55,35,70,40,30,35,65,50,75,45,25,90,60),"Cuidar el medio ambiente enseñando a otros.","Educador ambiental, espacios naturales, ayuntamientos, empresas de medio ambiente."),
    f("prevencion-riesgos","GS","Prevención de Riesgos Profesionales",SEA,P(50,55,10,55,55,80,55,55,35,65,80,55,75,30),"Que nadie se haga daño en el trabajo.","Técnico de prevención en empresas, servicios de prevención, construcción."),
    f("atencion-dependencia","GM","Atención a Personas en Situación de Dependencia",SSC,P(50,20,25,95,15,35,15,40,65,90,75,20,95,20),"Cuidar y acompañar a quien no puede valerse solo.","Residencias, ayuda a domicilio, centros de día."),
    f("educacion-infantil","GS","Educación Infantil",SSC,P(40,20,75,95,25,35,20,55,55,90,75,20,85,40),"Los primeros años de los niños, con juego y paciencia.","Escuelas infantiles (de 0 a 3 años), ludotecas, ocio infantil."),
    f("integracion-social","GS","Integración Social",SSC,P(25,40,30,95,40,40,20,65,25,95,65,20,98,40),"Ayudar a personas en riesgo de exclusión.","Servicios sociales, ONG, centros de menores, inserción laboral."),
    f("mediacion-comunicativa","GS","Mediación Comunicativa",SSC,P(25,45,40,90,30,40,20,90,50,85,65,25,90,40),"Facilitar la comunicación de personas sordas o con dificultades.","Lengua de signos, centros educativos, asociaciones, servicios públicos."),
    f("animacion-sociocultural","GS","Animación Sociocultural y Turística",SSC,P(50,20,65,85,65,20,15,65,45,95,35,25,65,65),"Dinamizar grupos con actividades y creatividad.","Animación en hoteles, centros cívicos, ocio juvenil, campamentos."),
    f("confeccion-moda","GM","Confección y Moda",TCP,P(75,20,75,15,25,50,35,15,95,20,50,30,20,55),"Coser y confeccionar con precisión.","Talleres de confección, arreglos, industria textil."),
    f("patronaje-moda","GS","Patronaje y Moda",TCP,P(65,35,85,15,45,55,55,20,85,25,40,40,20,70),"Convertir un diseño en una prenda que se puede fabricar.","Empresas de moda, patronaje industrial, taller propio."),
    f("vestuario-espectaculos","GS","Vestuario a Medida y de Espectáculos",TCP,P(65,25,95,25,35,40,40,25,95,35,25,25,25,80),"Crear vestuario para teatro, cine o a medida.","Teatro, cine, ópera, sastrería a medida."),
    f("electromecanica-vehiculos","GM","Electromecánica de Vehículos Automóviles",TMV,P(95,45,10,20,25,45,50,10,90,25,70,50,20,35),"Coches, motores y diagnóstico: mecánica de hoy.","Talleres, concesionarios, flotas de vehículos."),
    f("carroceria","GM","Carrocería",TMV,P(95,20,40,15,25,40,40,10,95,20,65,45,15,40),"Reparar y dejar como nuevos los vehículos.","Talleres de chapa y pintura, concesionarios."),
    f("automocion","GS","Automoción",TMV,P(85,60,15,25,45,55,65,25,80,40,70,55,20,40),"Organizar y diagnosticar en el mundo del motor.","Jefe de taller, recepción de vehículos, peritación, posventa."),
    f("mant-aeromecanico","GS","Mantenimiento Aeromecánico de Aviones con Motor de Turbina",TMV,P(85,70,10,10,25,70,70,25,85,15,75,70,30,30),"Mantener aviones con rigor y precisión.","Talleres aeronáuticos, aerolíneas, aeropuertos."),
    f("productos-ceramicos","GS","Desarrollo y Fabricación de Productos Cerámicos",VIC,P(70,50,70,15,35,55,55,20,85,20,55,40,25,55),"Técnica y diseño en la industria cerámica.","Industria cerámica y azulejera, laboratorios de esmaltes, diseño cerámico."),
  ];

  W.ORIENT_CATALOGS = { carrera: CARRERA, fp: FP, trabajo: [] };
})();
