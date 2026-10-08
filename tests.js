/* ============================================================
   TESTIA — Banco de tests
   Cada test se basa en un instrumento psicométrico validado.
   Para instrumentos con licencia restringida, los ítems están
   redactados de forma original midiendo el mismo constructo.
   Campos por test:
     id, name, emoji, cat, blurb, instrument, license
     mode: 'likert' | 'choice' | 'correct'
     scaleMax (likert), scales {KEY:'Label'}, items[], result{...}
   Ítem likert/choice: {t, s, r?, opts?}   Ítem correct: {q, o[], a}
   ============================================================ */
window.TESTS = [

/* 1. BIG FIVE — IPIP (dominio público) */
{
 id:"bigfive", name:"Test de Personalidad", emoji:"🎭", cat:"Personalidad",
 blurb:"Los 5 grandes rasgos que definen quién eres. El estándar de la psicología moderna.",
 instrument:"IPIP Big-Five Markers (Goldberg) · dominio público", license:"🟢",
 mode:"likert", scaleMax:5,
 scales:{O:"Apertura",C:"Responsabilidad",E:"Extraversión",A:"Amabilidad",ES:"Estabilidad emocional"},
 result:{type:"profileBars",analysis:true},
 interp:{
  O:{hi:"Mente abierta y curiosa: te atraen las ideas, el arte y lo nuevo. Imaginativo y poco convencional.",
     mid:"Equilibras curiosidad y practicidad: abierto a lo nuevo sin perder los pies en la tierra.",
     lo:"Práctico y convencional: prefieres lo concreto y lo conocido a lo abstracto o experimental."},
  C:{hi:"Organizado, disciplinado y fiable: te marcas metas y las cumples. La gente confía en ti para lo importante.",
     mid:"Responsable cuando importa, con margen para la espontaneidad. Ni caótico ni rígido.",
     lo:"Espontáneo y flexible, pero te cuesta la constancia y el orden. Trabajar la disciplina te daría ventaja."},
  E:{hi:"Sociable, enérgico y asertivo: te recargas con la gente y sueles llevar la iniciativa.",
     mid:"Ambivertido: disfrutas de la compañía y también de tu espacio, según el momento.",
     lo:"Reservado e introspectivo: prefieres círculos pequeños y la calma. Tu energía viene de dentro."},
  A:{hi:"Empático, confiado y cooperativo: priorizas la armonía y el cuidado de los demás.",
     mid:"Equilibras amabilidad y firmeza: cooperas, pero también defiendes lo tuyo.",
     lo:"Directo y competitivo: priorizas la lógica sobre la diplomacia y no temes el conflicto."},
  ES:{hi:"Sereno y resistente: gestionas el estrés con calma y te recuperas rápido de los reveses.",
     mid:"Estabilidad emocional normal: tus emociones fluctúan como las de la mayoría, sin extremos.",
     lo:"Sensible y reactivo: las emociones te afectan con intensidad. Cuidar tu descanso y tu estrés te ayudará."}
 },
 items:[
  {t:"Tengo una imaginación muy viva.",s:"O"},
  {t:"Disfruto con el arte, la música o la belleza.",s:"O"},
  {t:"Me atraen las ideas nuevas y abstractas.",s:"O"},
  {t:"Prefiero la rutina a probar cosas nuevas.",s:"O",r:true},
  {t:"Rara vez me pierdo en mis pensamientos o fantasías.",s:"O",r:true},
  {t:"Me gusta reflexionar sobre cuestiones filosóficas.",s:"O"},
  {t:"Tengo poco interés por los temas teóricos o complejos.",s:"O",r:true},
  {t:"Me considero una persona creativa.",s:"O"},
  {t:"Me incomodan los cambios y lo desconocido.",s:"O",r:true},
  {t:"Disfruto probando comidas, lugares o experiencias poco habituales.",s:"O"},
  {t:"Termino lo que empiezo, aunque cueste.",s:"C"},
  {t:"Tengo mis cosas ordenadas y bajo control.",s:"C"},
  {t:"Suelo dejar las tareas para el último momento.",s:"C",r:true},
  {t:"Presto mucha atención a los detalles.",s:"C"},
  {t:"Me cuesta mantener la disciplina sin que me supervisen.",s:"C",r:true},
  {t:"Cumplo lo que prometo.",s:"C"},
  {t:"A menudo actúo sin pensar en las consecuencias.",s:"C",r:true},
  {t:"Me fijo metas y trabajo de forma constante para alcanzarlas.",s:"C"},
  {t:"Mi espacio de trabajo suele ser un caos.",s:"C",r:true},
  {t:"Se puede confiar en que cumpliré los plazos.",s:"C"},
  {t:"Me siento cómodo siendo el centro de atención.",s:"E"},
  {t:"Inicio conversaciones con desconocidos sin esfuerzo.",s:"E"},
  {t:"Prefiero quedarme en segundo plano en los grupos.",s:"E",r:true},
  {t:"Me cargo de energía cuando estoy rodeado de gente.",s:"E"},
  {t:"Suelo permanecer callado entre extraños.",s:"E",r:true},
  {t:"Hago amigos con facilidad.",s:"E"},
  {t:"Las reuniones sociales me agotan más que animarme.",s:"E",r:true},
  {t:"Suelo tomar la iniciativa en un grupo.",s:"E"},
  {t:"Prefiero una noche tranquila en casa a una fiesta.",s:"E",r:true},
  {t:"Transmito energía y entusiasmo a los demás.",s:"E"},
  {t:"Me intereso de verdad por los problemas de los demás.",s:"A"},
  {t:"Confío en que la mayoría de la gente tiene buenas intenciones.",s:"A"},
  {t:"A veces soy frío o distante con los demás.",s:"A",r:true},
  {t:"Dedico tiempo a ayudar a quien lo necesita.",s:"A"},
  {t:"Me cuesta perdonar cuando alguien me hace daño.",s:"A",r:true},
  {t:"Intento no herir los sentimientos de nadie.",s:"A"},
  {t:"Pienso primero en mí y luego en los demás.",s:"A",r:true},
  {t:"Soy comprensivo con los defectos ajenos.",s:"A"},
  {t:"Tiendo a desconfiar de las intenciones de la gente.",s:"A",r:true},
  {t:"Prefiero cooperar antes que competir.",s:"A"},
  {t:"Mantengo la calma bajo presión.",s:"ES"},
  {t:"Me preocupo por cosas que probablemente no pasarán.",s:"ES",r:true},
  {t:"Mi estado de ánimo cambia con facilidad.",s:"ES",r:true},
  {t:"Rara vez me siento triste o desanimado.",s:"ES"},
  {t:"Me estreso con facilidad.",s:"ES",r:true},
  {t:"Me recupero rápido de los contratiempos.",s:"ES"},
  {t:"Me irrito o me enfado con facilidad.",s:"ES",r:true},
  {t:"Suelo sentirme seguro de mí mismo.",s:"ES"},
  {t:"A menudo me siento abrumado por mis emociones.",s:"ES",r:true},
  {t:"Rara vez me pongo nervioso o tenso.",s:"ES"}
 ]
},

/* 2. TIPI — personalidad exprés */
{
 id:"tipi", name:"Personalidad Exprés", emoji:"⚡", cat:"Personalidad",
 blurb:"Tu perfil de los 5 grandes rasgos en 10 preguntas. Para los que tienen prisa.",
 instrument:"TIPI (Gosling, Rentfrow & Swann, 2003)", license:"🟢",
 mode:"likert", scaleMax:7,
 scales:{O:"Apertura",C:"Responsabilidad",E:"Extraversión",A:"Amabilidad",ES:"Estabilidad emocional"},
 result:{type:"profileBars"},
 interp:{
  O:{hi:"Mente abierta y curiosa: te atraen las ideas, el arte y lo nuevo.",mid:"Equilibras curiosidad y practicidad.",lo:"Práctico y convencional: prefieres lo concreto y lo conocido."},
  C:{hi:"Organizado y fiable: te marcas metas y las cumples.",mid:"Responsable cuando importa, con margen para improvisar.",lo:"Espontáneo y flexible; la constancia y el orden te cuestan."},
  E:{hi:"Sociable y enérgico: te recargas con la gente y tomas la iniciativa.",mid:"Ambivertido: compañía y espacio según el momento.",lo:"Reservado: prefieres círculos pequeños y la calma."},
  A:{hi:"Empático y cooperativo: priorizas la armonía y el cuidado.",mid:"Amable y firme a la vez: cooperas y defiendes lo tuyo.",lo:"Directo y competitivo: la lógica por encima de la diplomacia."},
  ES:{hi:"Sereno y resistente: gestionas el estrés con calma.",mid:"Estabilidad normal: tus emociones fluctúan sin extremos.",lo:"Sensible y reactivo: las emociones te afectan con intensidad."}
 },
 items:[
  {t:"Me veo como alguien extrovertido y entusiasta.",s:"E"},
  {t:"Me veo como alguien reservado y callado.",s:"E",r:true},
  {t:"Me veo como alguien crítico y discutidor.",s:"A",r:true},
  {t:"Me veo como alguien comprensivo y cálido.",s:"A"},
  {t:"Me veo como alguien fiable y autodisciplinado.",s:"C"},
  {t:"Me veo como alguien desorganizado y descuidado.",s:"C",r:true},
  {t:"Me veo como alguien tranquilo y emocionalmente estable.",s:"ES"},
  {t:"Me veo como alguien que se altera con facilidad.",s:"ES",r:true},
  {t:"Me veo como alguien abierto a experiencias nuevas.",s:"O"},
  {t:"Me veo como alguien convencional y poco creativo.",s:"O",r:true}
 ]
},

/* 3. HONESTIDAD-HUMILDAD — HEXACO vía IPIP */
{
 id:"honesty", name:"¿Eres buena persona?", emoji:"😇", cat:"Personalidad",
 blurb:"La sexta dimensión de la personalidad: sinceridad, justicia, modestia y desapego del dinero.",
 instrument:"Honestidad-Humildad HEXACO (vía marcadores IPIP)", license:"🟢",
 mode:"likert", scaleMax:5,
 scales:{SIN:"Sinceridad",JUS:"Justicia",AVA:"Desapego material",MOD:"Modestia"},
 result:{type:"profileBars",overall:true,overallLabel:"Honestidad-Humildad"},
 interp:{
  SIN:{hi:"Genuino y sin dobleces: dices lo que piensas y no adulas por interés.",mid:"Sincero en general, con algún tacto estratégico cuando conviene.",lo:"No te tiembla la voz para halagar o moldear la verdad si te beneficia."},
  JUS:{hi:"Íntegro: no harías trampa ni te aprovecharías aunque nadie mirara.",mid:"Honrado en lo importante, con alguna licencia menor.",lo:"La tentación de saltarte las reglas por ganar algo te pesa más que a la media."},
  AVA:{hi:"El dinero y el estatus te dan bastante igual: no necesitas lujos para estar bien.",mid:"Disfrutas de lo material sin que gobierne tus decisiones.",lo:"El estatus y las posesiones te motivan, y te gusta que se noten."},
  MOD:{hi:"Humilde: te ves como uno más y no reclamas trato especial.",mid:"Te valoras sin sentirte por encima de los demás.",lo:"Crees merecer más reconocimiento que quienes te rodean."}
 },
 items:[
  {t:"No fingiría halagar a alguien solo para conseguir algo.",s:"SIN"},
  {t:"Adularía a alguien con poder si así salgo ganando.",s:"SIN",r:true},
  {t:"Digo lo que pienso aunque no convenga.",s:"SIN"},
  {t:"Nunca me sentiría tentado a engañar para ganar dinero.",s:"JUS"},
  {t:"Robar me parecería aceptable si supiera que no me pillan.",s:"JUS",r:true},
  {t:"Devolvería un cambio de más aunque fuera bastante dinero.",s:"JUS"},
  {t:"No necesito lujos ni símbolos de estatus para sentirme bien.",s:"AVA"},
  {t:"Me encantaría que la gente envidiara mis posesiones.",s:"AVA",r:true},
  {t:"El dinero no es de mis prioridades en la vida.",s:"AVA"},
  {t:"Me considero una persona corriente, ni más ni menos que los demás.",s:"MOD"},
  {t:"Merezco más reconocimiento que la gente de mi entorno.",s:"MOD",r:true},
  {t:"No me gusta presumir de mis logros.",s:"MOD"}
 ]
},

/* 4. TRÍADA OSCURA — SD3 (ítems propios) */
{
 id:"darktriad", name:"Tu lado oscuro", emoji:"😈", cat:"Personalidad",
 blurb:"Maquiavelismo, narcisismo y psicopatía. ¿Cuánta oscuridad llevas dentro?",
 instrument:"Short Dark Triad SD3 (Jones & Paulhus, 2014) · ítems propios", license:"🟡",
 mode:"likert", scaleMax:5,
 scales:{MAQ:"Maquiavelismo",NAR:"Narcisismo",PSI:"Psicopatía"},
 result:{type:"profileBars"},
 interp:{
  MAQ:{hi:"Estratega nato: lees el tablero social y mueves ficha con cálculo. Cumplir tus objetivos pesa más que la transparencia, y rara vez enseñas todas tus cartas.",
       mid:"Sabes ser estratégico cuando conviene, pero no vives calculando. Mezclas pragmatismo con franqueza.",
       lo:"Juegas con las cartas boca arriba: prefieres la sinceridad al cálculo y te incomoda manipular, aunque a veces te haga ingenuo."},
  NAR:{hi:"Seguridad y brillo: te gusta destacar, que te admiren y ocupar el centro. Tu autoestima es alta… y de vez en cuando necesita público.",
       mid:"Te valoras sin obsesionarte con el reconocimiento. Disfrutas un halago, pero no dependes de él.",
       lo:"Modesto y poco dado al protagonismo: prefieres pasar desapercibido a buscar admiración. Ojo con no infravalorarte."},
  PSI:{hi:"Sangre fría: la culpa y el miedo te frenan poco, y la búsqueda de emociones fuertes puede llevarte al riesgo. Poca atadura emocional.",
       mid:"Autocontrol y empatía dentro de lo normal, con algún punto impulsivo según el momento.",
       lo:"Empático y prudente: te afectan los demás y piensas antes de actuar. La frialdad calculadora no va contigo."}
 },
 items:[
  {t:"Conviene guardar información que puedas usar contra alguien más adelante.",s:"MAQ"},
  {t:"Hay que aprovechar cualquier oportunidad, sin importar los medios.",s:"MAQ"},
  {t:"Es inteligente ocultar tus verdaderas intenciones.",s:"MAQ"},
  {t:"La mayoría de la gente se deja manipular fácilmente.",s:"MAQ"},
  {t:"Prefiero ganarme el favor de la gente importante.",s:"MAQ"},
  {t:"Es mejor maniobrar entre bastidores que enfrentarse de cara.",s:"MAQ"},
  {t:"Sé que soy especial porque la gente me lo dice.",s:"NAR"},
  {t:"Me gusta ser el centro de atención.",s:"NAR"},
  {t:"Merezco un trato preferente.",s:"NAR"},
  {t:"Me molesta no recibir el reconocimiento que merezco.",s:"NAR"},
  {t:"Algún día seré conocido por algo importante.",s:"NAR"},
  {t:"Comparado con la mayoría, valgo más.",s:"NAR"},
  {t:"Disfruto desafiando a la autoridad.",s:"PSI"},
  {t:"Evito las situaciones peligrosas.",s:"PSI",r:true},
  {t:"El sufrimiento ajeno no me afecta demasiado.",s:"PSI"},
  {t:"Suelo actuar sin pensar en las consecuencias.",s:"PSI"},
  {t:"Una mentira es válida si funciona mejor que la verdad.",s:"PSI"},
  {t:"Me cuesta sentir culpa cuando hago algo mal.",s:"PSI"}
 ]
},

/* 5. MORAL FOUNDATIONS — MFQ */
{
 id:"moral", name:"Tu brújula moral", emoji:"⚖️", cat:"Valores",
 blurb:"Los cinco pilares sobre los que construyes lo que está bien y lo que está mal.",
 instrument:"Moral Foundations Questionnaire (Graham, Haidt & Nosek)", license:"🟢",
 mode:"likert", scaleMax:6,
 scales:{CUI:"Cuidado",JUS:"Justicia",LEA:"Lealtad",AUT:"Autoridad",PUR:"Pureza"},
 result:{type:"profileBars"},
 interp:{
  CUI:{hi:"El sufrimiento ajeno te moviliza: la compasión y evitar el daño son el centro de tu brújula moral.",
       mid:"Te importa el bienestar de los demás sin que domine todas tus decisiones.",
       lo:"Priorizas otros criterios sobre la compasión; el daño ajeno pesa menos cuando juzgas."},
  JUS:{hi:"La equidad te importa mucho: detestas el trato injusto y los privilegios inmerecidos.",
       mid:"Valoras la justicia y la equilibras con otras consideraciones.",
       lo:"La igualdad estricta no es tu prioridad moral; aceptas mejor jerarquías o resultados desiguales."},
  LEA:{hi:"El 'nosotros' pesa: valoras la lealtad, el equipo y la pertenencia por encima de lo individual.",
       mid:"Aprecias la lealtad sin que anule tu criterio propio.",
       lo:"Antepones al individuo y los principios universales a la fidelidad al grupo."},
  AUT:{hi:"Respetas el orden, la tradición y la jerarquía como pilares de una sociedad que funciona.",
       mid:"Reconoces el valor de la autoridad, pero la cuestionas cuando lo crees necesario.",
       lo:"Desconfías de las jerarquías: para ti la autoridad se gana, no se hereda."},
  PUR:{hi:"Das peso a lo sagrado, la dignidad y la 'pureza' (corporal, espiritual o moral) en tus juicios.",
       mid:"Cierta sensibilidad hacia lo sagrado, sin que rija tus decisiones.",
       lo:"Lo 'sagrado' o lo 'impuro' apenas pesa en tu moral: juzgas por consecuencias, no por tabúes."}
 },
 items:[
  {t:"Que alguien sufra emocionalmente es algo grave.",s:"CUI"},
  {t:"La compasión hacia quien sufre es de las virtudes más importantes.",s:"CUI"},
  {t:"Hacer daño a un ser indefenso es de lo peor que existe.",s:"CUI"},
  {t:"Tratar a todas las personas por igual es fundamental.",s:"JUS"},
  {t:"Me indigna profundamente que alguien reciba un trato injusto.",s:"JUS"},
  {t:"Que cada uno reciba lo que merece es clave para una sociedad justa.",s:"JUS"},
  {t:"La lealtad a tu grupo está por encima de los intereses individuales.",s:"LEA"},
  {t:"Estar orgulloso de tu país o tu equipo es importante.",s:"LEA"},
  {t:"Traicionar a los tuyos es de lo peor que se puede hacer.",s:"LEA"},
  {t:"Respetar a quien tiene autoridad legítima es una virtud.",s:"AUT"},
  {t:"Las tradiciones y jerarquías dan estabilidad a la sociedad.",s:"AUT"},
  {t:"Los hijos deben aprender a respetar a sus mayores.",s:"AUT"},
  {t:"Hay acciones repugnantes aunque no perjudiquen a nadie.",s:"PUR"},
  {t:"La decencia y el pudor son valores importantes.",s:"PUR"},
  {t:"Mantener el cuerpo y la mente puros tiene valor.",s:"PUR"}
 ]
},

/* 6. TEST DE CI — estilo ICAR (ítems propios) */
{
 id:"iq", name:"Test de CI", emoji:"🧠", cat:"Inteligencia",
 blurb:"Lógica, secuencias y patrones. Descubre tu coeficiente intelectual estimado.",
 instrument:"Estilo ICAR (ítems propios) · escala norm-referenciada", license:"🟢",
 mode:"correct", duration:300, scoring:"iq",
 premiumTitle:"Ya sabes tu categoría. Descubre tu CI exacto",
 premiumPitch:"Tu CI estimado con el número, tu percentil frente a la población y el desglose por aptitud con una lectura de cada bloque. La carta compartible se actualiza con tu cifra.",
 interp:{
  verbal:{hi:"Resuelves con soltura analogías, relaciones entre palabras e intrusos semánticos. Es la aptitud más ligada a lo aprendido: vocabulario, lectura y práctica con el lenguaje.",mid:"Aciertas parte de las analogías verbales y fallas cuando la relación es menos evidente. Suele mejorar con lectura variada y con el hábito de preguntarse qué tipo de relación une dos palabras.",lo:"Las relaciones entre palabras te han costado más que otros bloques. Puede deberse a vocabulario, a la prisa o a que el formato de analogía te resulta poco familiar. Es el área que más responde a la práctica."},
  numerico:{hi:"Detectas la regla de una serie numérica con rapidez, incluso cuando combina dos operaciones. Indica facilidad para trabajar con cantidades y patrones.",mid:"Reconoces las series sencillas y te atascas cuando la regla cambia a mitad o mezcla sumas y productos. Un truco útil es calcular las diferencias entre términos antes de buscar la regla.",lo:"Las series numéricas han sido tu bloque más flojo. En un test con tiempo, muchos fallos aquí son de velocidad más que de capacidad: la regla existe, pero cuesta verla con el reloj corriendo."},
  logico:{hi:"Manejas bien silogismos y deducciones: separas lo que se afirma de lo que parece que se afirma. Es la base del razonamiento formal.",mid:"Aciertas las deducciones directas y dudas cuando hay dobles negaciones o cuantificadores como «algunos». Es normal: son los ítems donde más falla la gente.",lo:"Los ítems de lógica formal te han resultado difíciles. Suele deberse a leer con el significado cotidiano en vez de con el literal. Practicar con silogismos mejora este bloque bastante rápido."},
  abstracto:{hi:"Encuentras el patrón en matrices y secuencias de figuras sin apoyo verbal. Es la aptitud más cercana a lo que los tests llaman inteligencia fluida: razonar con material nuevo.",mid:"Resuelves las matrices con una sola regla y fallas cuando se combinan dos, como rotación más cambio de relleno. Fijarte en una propiedad cada vez ayuda.",lo:"El razonamiento con figuras abstractas ha sido tu bloque más difícil. Este tipo de ítem depende poco de lo aprendido y mucho de la atención al detalle bajo presión de tiempo."},
  espacial:{hi:"Rotas figuras mentalmente y distingues una rotación de un reflejo con seguridad. Es una aptitud asociada a orientación, dibujo técnico y montaje.",mid:"Aciertas las rotaciones sencillas y confundes rotación con reflejo en los ángulos grandes. Es el error típico: la figura reflejada parece girada.",lo:"La rotación mental te ha costado más que el resto. Es una de las aptitudes más entrenables: mapas, puzles y juegos de construcción la mejoran de forma medible."}
 },
 overallInterp:{
  "Muy superior":"Tu puntuación estimada supera a la que obtiene alrededor del 97 % de las personas en este tipo de prueba. Es una estimación con 32 ítems y reloj: un CI formal se mide con una batería más larga aplicada por un profesional. El desglose por aptitud te dice más que la cifra.",
  "Superior":"Estás claramente por encima de la media. Con 32 ítems el margen de error es de varios puntos, así que trata el número como un rango y mira dónde destacas y dónde no.",
  "Medio-alto":"Por encima de la media, dentro del rango donde se sitúa buena parte de las personas con estudios superiores. El desglose importa más que la cifra: probablemente hay un bloque que tira hacia arriba y otro que frena.",
  "Medio":"En la zona central, donde se sitúa la mitad de la población. Es el resultado más común y no dice nada sobre tu capacidad en tareas concretas. Fíjate en el desglose: los perfiles medios suelen tener una aptitud claramente superior a las demás.",
  "Medio-bajo":"Algo por debajo de la media en esta prueba concreta. Antes de darle importancia, mira cuántas preguntas dejaste sin responder y cuánto tiempo te sobró: en tests con reloj la velocidad pesa mucho y no es lo mismo que la capacidad.",
  "Límite":"Por debajo de la media en esta prueba. Un resultado así en un test online rápido no permite ninguna conclusión: cansancio, distracción, tiempo o no conocer el formato bajan mucho la puntuación. Si te preocupa, una evaluación profesional es la única forma seria de saberlo.",
  "Bajo":"Muy por debajo de la media en esta prueba. En un test online con reloj esto suele reflejar tiempo, distracción o formato, no capacidad. Si quieres una medida real, la única vía es una evaluación profesional con una batería completa."
 },
 items:[
  {q:"¿Qué número continúa la serie?  2, 4, 8, 16, …",o:["20","24","32","30"],a:2},
  {q:"Serie de Fibonacci:  1, 1, 2, 3, 5, 8, …",o:["11","13","12","15"],a:1},
  {q:"¿Cuál es el intruso?",o:["Perro","Caballo","Coche","León"],a:2},
  {q:"Mano es a Guante como Pie es a…",o:["Zapato","Calcetín","Dedo","Suelo"],a:1},
  {q:"¿Qué número sigue?  3, 6, 11, 18, 27, …",o:["36","38","40","35"],a:1},
  {q:"¿Qué número sigue?  100, 95, 85, 70, 50, …",o:["30","25","20","35"],a:1},
  {q:"Si todos los Bloops son Razzies y todos los Razzies son Lazzies, ¿todos los Bloops son Lazzies?",o:["Sí","No","Imposible saberlo","Solo algunos"],a:0},
  {q:"Caliente es a Frío como Arriba es a…",o:["Lado","Abajo","Lejos","Alto"],a:1},
  {q:"Continúa la serie:  A, C, E, G, …",o:["H","I","J","K"],a:1},
  {q:"¿Qué número falta?  8, 6, 7, 5, 6, 4, …",o:["3","5","6","2"],a:1},
  {q:"¿Cuál es el intruso?",o:["2","5","9","11"],a:2},
  {q:"¿Qué número sigue?  1, 4, 9, 16, 25, …",o:["30","49","36","35"],a:2},
  {q:"Libro es a Leer como Tenedor es a…",o:["Cocinar","Comer","Cortar","Plato"],a:1},
  {q:"¿Cuántos meses del año tienen 28 días?",o:["1","2","6","12"],a:3},
  {q:"Continúa la serie:  Z, X, V, T, …",o:["S","R","Q","U"],a:1},
  {q:"¿Qué número sigue?  5, 10, 13, 26, 29, 58, …",o:["61","60","87","116"],a:0},
  {q:"Médico es a Hospital como Profesor es a…",o:["Libro","Alumno","Escuela","Examen"],a:2},
  {q:"Un tren va a 60 km/h. ¿Cuánto tarda en recorrer 30 km?",o:["20 min","30 min","45 min","1 hora"],a:1},
  {q:"¿Cuál es el intruso?",o:["Cuadrado","Círculo","Cubo","Triángulo"],a:2},
  {q:"¿Qué número sigue?  7, 14, 28, 56, …",o:["98","112","104","84"],a:1}
 ]
},

/* 7. CRT — reflexión cognitiva (ítems nuevos) */
{
 id:"crt", name:"¿Intuitivo o reflexivo?", emoji:"🤔", cat:"Inteligencia",
 blurb:"Seis acertijos con trampa. ¿Te fías de tu instinto o paras a pensar?",
 instrument:"Cognitive Reflection Test (Frederick, 2005) · ítems nuevos", license:"🟢",
 mode:"correct", duration:240, scoring:"crt",
 interp:{
  lo:"Has respondido casi todos los acertijos con la primera respuesta que llega. No es falta de capacidad: estos problemas están diseñados para que la respuesta intuitiva parezca obvia, y la mayoría de la gente cae en varios. Lo que sugiere tu patrón es que, ante un problema con pinta de fácil, confirmas rápido en lugar de comprobar. En el día a día eso ahorra tiempo; en decisiones con números, precios o plazos, conviene una segunda pasada.",
  mid:"Has parado a pensar en algunos acertijos y en otros te ha ganado la primera impresión. Es el patrón más frecuente: la reflexión se activa cuando algo te chirría, no de forma sistemática. Mira abajo cuáles te pillaron: suelen ser los que tienen números «redondos» que invitan a una operación simple.",
  hi:"Has detectado la trampa en la mayoría de los acertijos. Eso indica que, ante una respuesta que parece obvia, tu reflejo es comprobarla antes de darla. En la investigación original este patrón se asocia con menos sesgos en decisiones con probabilidades y dinero. No significa ser más inteligente: significa desconfiar de lo fácil cuando toca."
 },
 items:[
  {q:"Un boli y una libreta cuestan 2,20 € en total. La libreta cuesta 2 € más que el boli. ¿Cuánto cuesta el boli?",o:["20 céntimos","10 céntimos","11 céntimos","1,10 €"],a:1,i:0,why:"La respuesta rápida es 20 céntimos, pero entonces la libreta costaría 2,20 € y el total 2,40 €. Si el boli cuesta 10 céntimos, la libreta cuesta 2,10 € y suman 2,20 €. El cerebro resta 2 del total y se queda tan ancho."},
  {q:"Si 4 máquinas tardan 4 minutos en fabricar 4 piezas, ¿cuánto tardan 100 máquinas en fabricar 100 piezas?",o:["100 min","4 min","20 min","25 min"],a:1,i:0,why:"Cada máquina tarda 4 minutos en hacer una pieza. Con 100 máquinas y 100 piezas, cada una hace la suya en esos mismos 4 minutos. La trampa es la simetría de los números: 4-4-4 invita a responder 100-100-100."},
  {q:"Unos nenúfares duplican su superficie cada día y cubren un estanque en 48 días. ¿Cuántos días tardan en cubrir la mitad?",o:["24 días","47 días","12 días","46 días"],a:1,i:0,why:"Si la superficie se duplica cada día, el día anterior a cubrirlo todo estaba a la mitad: el día 47. La intuición divide 48 entre dos porque «la mitad» pide dividir, pero aquí el crecimiento es exponencial, no lineal."},
  {q:"En una carrera adelantas al que iba en segunda posición. ¿En qué posición vas ahora?",o:["1.ª","2.ª","3.ª","No se puede saber"],a:1,i:0,why:"Si adelantas al segundo, ocupas su puesto: segundo. El primero sigue por delante. La palabra «adelantar» activa la idea de ganar y salta directo a la primera posición."},
  {q:"Una camiseta cuesta 30 €. Le aplican un 50% de descuento y luego otro 10% en caja. ¿Cuánto pagas?",o:["12 €","13,50 €","13 €","15 €"],a:1,i:0,why:"Los descuentos no se suman: el 50 % deja la camiseta en 15 € y el 10 % se aplica sobre esos 15, no sobre 30. Pagas 13,50 €. Sumar 50 y 10 para llegar a 12 € es la respuesta automática."},
  {q:"Un caracol sube 3 m de día y resbala 2 m de noche en un pozo de 10 m. ¿En cuántos días sale?",o:["8 días","10 días","5 días","7 días"],a:0,i:1,why:"Avanza 1 metro neto por día, así que al final del día 7 está a 7 metros. El día 8 sube 3 metros, llega a 10 y sale antes de resbalar. Dividir 10 entre 1 metro neto olvida que el último tramo no tiene noche."}
 ]
},

/* 8. NEED FOR COGNITION — NCS-6 */
{
 id:"ncs", name:"¿Te gusta pensar?", emoji:"💭", cat:"Inteligencia",
 blurb:"Tu necesidad de cognición: cuánto disfrutas del esfuerzo mental.",
 instrument:"Need for Cognition Scale NCS-6 (Coelho, Hanel & Wolf, 2020)", license:"🟢",
 mode:"likert", scaleMax:5,
 scales:{S:"Necesidad de cognición"},
 result:{type:"single",bands:[
   {min:0,label:"Pragmático",emoji:"🛠️",desc:"Prefieres ir al grano: si algo funciona, no necesitas darle más vueltas."},
   {min:35,label:"Equilibrado",emoji:"⚖️",desc:"Piensas cuando hace falta, pero no buscas complejidad porque sí."},
   {min:65,label:"Pensador",emoji:"🧩",desc:"Disfrutas de los problemas difíciles y de darle vueltas a las ideas."}
 ]},
 items:[
  {t:"Prefiero los problemas complejos a los sencillos.",s:"S"},
  {t:"Disfruto cuando tengo que pensar mucho para resolver algo.",s:"S"},
  {t:"Pensar a fondo no es mi idea de diversión.",s:"S",r:true},
  {t:"Evito las tareas que exigen pensar en profundidad.",s:"S",r:true},
  {t:"Me satisface darle vueltas a un problema durante horas.",s:"S"},
  {t:"Me basta con que algo funcione; no necesito entender por qué.",s:"S",r:true}
 ]
},

/* 9. VOCACIONAL — O*NET RIASEC */
{
 id:"riasec", name:"Test Vocacional", emoji:"🎯", cat:"Carrera",
 blurb:"Tus intereses profesionales según el modelo de Holland. Tu código de 3 letras y a qué encaja.",
 instrument:"O*NET Interest Profiler / RIASEC (US Dept. of Labor) · dominio público", license:"🟢",
 mode:"likert", scaleMax:5,
 scales:{R:"Realista",I:"Investigador",A:"Artístico",S:"Social",E:"Emprendedor",C:"Convencional"},
 result:{type:"riasec"},
 interp:{
  R:{hi:"Te atrae lo práctico y lo manual: construir, reparar, trabajar con máquinas o al aire libre. Encajas con ingeniería, oficios técnicos, deporte o agricultura.",mid:"Interés moderado por el trabajo manual y técnico.",lo:"Poco interés por el trabajo manual o con máquinas."},
  I:{hi:"Te mueve entender el porqué de las cosas: analizar, investigar, experimentar. Encajas con ciencia, datos, tecnología, medicina o investigación.",mid:"Interés moderado por investigar y analizar.",lo:"Poco interés por la investigación o el análisis."},
  A:{hi:"Necesitas crear y expresarte sin moldes rígidos. Encajas con diseño, arte, música, comunicación o arquitectura.",mid:"Interés moderado por la creación y la expresión.",lo:"Poco interés por las actividades artísticas o creativas."},
  S:{hi:"Te realizas ayudando y enseñando a los demás. Encajas con educación, psicología, sanidad, trabajo social o RRHH.",mid:"Interés moderado por ayudar y enseñar.",lo:"Poco interés por el trabajo centrado en ayudar a otros."},
  E:{hi:"Te atrae liderar, persuadir y emprender. Encajas con empresa, ventas, marketing, derecho o dirección.",mid:"Interés moderado por liderar y emprender.",lo:"Poco interés por liderar, vender o emprender."},
  C:{hi:"Se te dan bien el orden, los datos y los procedimientos. Encajas con administración, finanzas, contabilidad o logística.",mid:"Interés moderado por organizar y trabajar con datos.",lo:"Poco interés por las tareas administrativas o de datos."}
 },
 items:[
  {t:"Me gustaría reparar un motor o un electrodoméstico averiado.",s:"R"},
  {t:"Me gustaría trabajar al aire libre con herramientas o maquinaria.",s:"R"},
  {t:"Me gustaría construir muebles o estructuras con mis manos.",s:"R"},
  {t:"Me gustaría cuidar animales o cultivar plantas.",s:"R"},
  {t:"Me gustaría montar o instalar equipos electrónicos.",s:"R"},
  {t:"Me gustaría conducir maquinaria pesada o vehículos especiales.",s:"R"},
  {t:"Me gustaría practicar deportes o actividades físicas exigentes.",s:"R"},
  {t:"Me gustaría resolver averías prácticas antes que problemas teóricos.",s:"R"},
  {t:"Me gustaría resolver problemas de matemáticas o física.",s:"I"},
  {t:"Me gustaría investigar por qué ocurre un fenómeno natural.",s:"I"},
  {t:"Me gustaría analizar datos para sacar conclusiones.",s:"I"},
  {t:"Me gustaría leer sobre ciencia, tecnología o descubrimientos.",s:"I"},
  {t:"Me gustaría realizar experimentos en un laboratorio.",s:"I"},
  {t:"Me gustaría estudiar el funcionamiento del cuerpo o la mente.",s:"I"},
  {t:"Me gustaría programar o desarrollar soluciones técnicas.",s:"I"},
  {t:"Me gustaría hacerme preguntas y buscar respuestas con método.",s:"I"},
  {t:"Me gustaría escribir relatos, poesía o guiones.",s:"A"},
  {t:"Me gustaría diseñar o dibujar algo original.",s:"A"},
  {t:"Me gustaría tocar un instrumento, cantar o componer música.",s:"A"},
  {t:"Me gustaría actuar, bailar o hacer teatro.",s:"A"},
  {t:"Me gustaría hacer fotografía o vídeo creativo.",s:"A"},
  {t:"Me gustaría decorar o diseñar espacios con criterio estético.",s:"A"},
  {t:"Me gustaría inventar ideas originales sin reglas fijas.",s:"A"},
  {t:"Me gustaría expresar mis emociones a través del arte.",s:"A"},
  {t:"Me gustaría enseñar o explicar cosas a otras personas.",s:"S"},
  {t:"Me gustaría ayudar a alguien con un problema personal.",s:"S"},
  {t:"Me gustaría cuidar de personas enfermas, mayores o niños.",s:"S"},
  {t:"Me gustaría trabajar en equipo apoyando a los demás.",s:"S"},
  {t:"Me gustaría mediar en conflictos entre personas.",s:"S"},
  {t:"Me gustaría organizar actividades para un grupo o comunidad.",s:"S"},
  {t:"Me gustaría aconsejar u orientar a quien lo necesita.",s:"S"},
  {t:"Me gustaría dedicarme a causas sociales o al voluntariado.",s:"S"},
  {t:"Me gustaría liderar un proyecto o un equipo.",s:"E"},
  {t:"Me gustaría convencer a otros de una idea o producto.",s:"E"},
  {t:"Me gustaría montar mi propio negocio.",s:"E"},
  {t:"Me gustaría negociar un acuerdo o contrato importante.",s:"E"},
  {t:"Me gustaría hablar en público o presentar ante una audiencia.",s:"E"},
  {t:"Me gustaría tomar decisiones arriesgadas para ganar.",s:"E"},
  {t:"Me gustaría vender productos o servicios.",s:"E"},
  {t:"Me gustaría dirigir y motivar a un grupo hacia una meta.",s:"E"},
  {t:"Me gustaría llevar las cuentas y registros ordenados.",s:"C"},
  {t:"Me gustaría seguir procedimientos claros y detallados.",s:"C"},
  {t:"Me gustaría organizar archivos, bases de datos o inventarios.",s:"C"},
  {t:"Me gustaría trabajar con números y hojas de cálculo.",s:"C"},
  {t:"Me gustaría revisar documentos buscando errores.",s:"C"},
  {t:"Me gustaría planificar agendas y calendarios con precisión.",s:"C"},
  {t:"Me gustaría gestionar trámites administrativos.",s:"C"},
  {t:"Me gustaría trabajar en un entorno estructurado y con normas claras.",s:"C"}
 ]
},

/* 10. INTELIGENCIA EMOCIONAL — SSEIT (ítems propios) */
{
 id:"ei", name:"Inteligencia Emocional", emoji:"💞", cat:"Emocional",
 blurb:"Tu capacidad para percibir, usar y gestionar las emociones, las tuyas y las de los demás.",
 instrument:"Schutte SSEIT (1998) · ítems propios", license:"🟡",
 mode:"likert", scaleMax:5,
 scales:{PER:"Percepción",USO:"Uso",GEP:"Gestión propia",GEA:"Gestión ajena"},
 result:{type:"profileBars",overall:true,overallLabel:"Inteligencia emocional"},
 interp:{
  PER:{hi:"Captas al vuelo cómo se sienten los demás y tú mismo: lees caras, tonos y silencios con precisión.",
       mid:"Sueles darte cuenta de las emociones, aunque a veces se te escapan los matices más sutiles.",
       lo:"Te cuesta identificar emociones, propias o ajenas. Prestar atención a las señales no verbales te dará ventaja."},
  USO:{hi:"Pones las emociones a trabajar: las usas para motivarte, crear y decidir mejor.",
       mid:"A veces aprovechas tus emociones para rendir; otras te despistan. Equilibrio normal.",
       lo:"Tiendes a separar emoción y acción; canalizar lo que sientes hacia tus metas te potenciaría."},
  GEP:{hi:"Gobiernas tus emociones: te regulas bajo presión y no te arrastran los impulsos.",
       mid:"Manejas la mayoría de situaciones, aunque alguna emoción intensa te supera de vez en cuando.",
       lo:"Las emociones fuertes te desbordan con facilidad. Técnicas de regulación (respirar, hacer una pausa) te ayudarían mucho."},
  GEA:{hi:"Influyes en el clima emocional: calmas, animas y manejas los conflictos con mano izquierda.",
       mid:"Sabes acompañar a los demás en lo emocional, con margen de mejora en los momentos tensos.",
       lo:"Te cuesta gestionar las emociones de otros; escuchar y transmitir calma reforzaría tus relaciones."}
 },
 items:[
  {t:"Reconozco mis emociones según las voy sintiendo.",s:"PER"},
  {t:"Sé identificar lo que sienten los demás por su expresión.",s:"PER"},
  {t:"Capto el ambiente emocional de un grupo.",s:"PER"},
  {t:"Me cuesta saber por qué me siento como me siento.",s:"PER",r:true},
  {t:"Uso mis emociones para motivarme hacia mis metas.",s:"USO"},
  {t:"Cuando estoy de buen humor resuelvo mejor los problemas.",s:"USO"},
  {t:"Mis emociones me ayudan a tomar decisiones.",s:"USO"},
  {t:"Busco actividades que me hagan sentir bien para rendir más.",s:"USO"},
  {t:"Soy capaz de calmarme cuando estoy alterado.",s:"GEP"},
  {t:"Controlo mis impulsos en momentos de tensión.",s:"GEP"},
  {t:"Mantengo una actitud positiva ante las dificultades.",s:"GEP"},
  {t:"Cuando me enfado, tardo mucho en recuperar la calma.",s:"GEP",r:true},
  {t:"Sé animar a alguien que está triste.",s:"GEA"},
  {t:"Ayudo a los demás a gestionar sus emociones.",s:"GEA"},
  {t:"La gente acude a mí cuando necesita apoyo.",s:"GEA"},
  {t:"Sé qué decir para tranquilizar a alguien.",s:"GEA"}
 ]
},

/* 11. EMPATÍA — EQ (ítems propios) */
{
 id:"empathy", name:"Tu nivel de empatía", emoji:"🫂", cat:"Emocional",
 blurb:"Cuánto sientes lo que sienten los demás. ¿Esponja emocional o muro de hormigón?",
 instrument:"Empathy Quotient (Baron-Cohen & Wheelwright, 2004) · ítems propios", license:"🟡",
 mode:"likert", scaleMax:5,
 scales:{S:"Empatía"},
 result:{type:"single",bands:[
   {min:0,label:"Mente racional",emoji:"🧱",desc:"Priorizas la lógica sobre la emoción. Te cuesta leer o contagiarte del estado ajeno; lo tuyo es la cabeza fría."},
   {min:40,label:"Buen radar emocional",emoji:"🤝",desc:"Captas bien a los demás y te importan, sin que sus emociones te arrastren. El equilibrio sano."},
   {min:75,label:"Corazón de esponja",emoji:"💗",desc:"Sientes a los demás como propios. Tu radar emocional está siempre encendido (a veces demasiado)."}
 ]},
 items:[
  {t:"Me doy cuenta enseguida cuando alguien se siente incómodo.",s:"S"},
  {t:"Sufro cuando veo sufrir a otra persona.",s:"S"},
  {t:"Se me da bien ponerme en el lugar de los demás.",s:"S"},
  {t:"Suelo anticipar cómo se sentirá alguien ante una noticia.",s:"S"},
  {t:"Me cuesta entender por qué la gente se emociona tanto.",s:"S",r:true},
  {t:"Las historias tristes me afectan profundamente.",s:"S"},
  {t:"Noto cuando alguien finge estar bien.",s:"S"},
  {t:"Me importa de verdad cómo se sienten los demás.",s:"S"},
  {t:"No suelo darme cuenta si molesto a alguien al hablar.",s:"S",r:true},
  {t:"Me resulta fácil consolar a quien lo pasa mal.",s:"S"},
  {t:"Las emociones de los demás me parecen difíciles de leer.",s:"S",r:true},
  {t:"Me conmueve la alegría ajena tanto como la mía.",s:"S"}
 ]
},

/* 12. AUTOESTIMA — Rosenberg RSES */
{
 id:"selfesteem", name:"Test de Autoestima", emoji:"🪞", cat:"Bienestar",
 blurb:"Tu valoración global de ti mismo. El estándar de oro con 50 años de respaldo.",
 instrument:"Rosenberg Self-Esteem Scale (Rosenberg, 1965) · dominio público", license:"🟢",
 mode:"likert", scaleMax:4,
 scales:{S:"Autoestima"},
 result:{type:"single",bands:[
   {min:0,label:"Te falta quererte",emoji:"🌧️",desc:"Ahora mismo eres duro contigo mismo. Trabajar la autocompasión te vendría muy bien (y quizá hablarlo con alguien de confianza)."},
   {min:40,label:"En equilibrio contigo",emoji:"⛅",desc:"Te valoras de forma razonable, con días mejores y peores como casi todo el mundo."},
   {min:70,label:"A prueba de bombas",emoji:"☀️",desc:"Tienes una relación sana contigo mismo: te respetas sin caer en la arrogancia."}
 ]},
 items:[
  {t:"En general, estoy satisfecho conmigo mismo.",s:"S"},
  {t:"A veces pienso que no valgo nada.",s:"S",r:true},
  {t:"Creo que tengo varias buenas cualidades.",s:"S"},
  {t:"Soy capaz de hacer las cosas tan bien como la mayoría.",s:"S"},
  {t:"Siento que no tengo mucho de lo que estar orgulloso.",s:"S",r:true},
  {t:"A veces me siento inútil.",s:"S",r:true},
  {t:"Siento que soy una persona valiosa, al menos igual que los demás.",s:"S"},
  {t:"Me gustaría tener más respeto por mí mismo.",s:"S",r:true},
  {t:"Tiendo a pensar que soy un fracaso.",s:"S",r:true},
  {t:"Tengo una actitud positiva hacia mí mismo.",s:"S"}
 ]
},

/* 13. GRIT — determinación */
{
 id:"grit", name:"Test de Determinación", emoji:"🔥", cat:"Bienestar",
 blurb:"Tu grit: pasión y perseverancia hacia metas a largo plazo. ¿Terminas lo que empiezas?",
 instrument:"Grit Scale (Duckworth et al., 2007)", license:"🟢",
 mode:"likert", scaleMax:5,
 scales:{PER:"Perseverancia",PAS:"Consistencia de intereses"},
 result:{type:"profileBars",overall:true,overallLabel:"Determinación"},
 interp:{
  PER:{hi:"No abandonas: ante los obstáculos redoblas el esfuerzo y terminas lo que empiezas.",
       mid:"Persistes en lo que importa, aunque algún proyecto se quede por el camino.",
       lo:"Te cuesta sostener el esfuerzo cuando se complica; cerrar lo empezado es tu reto."},
  PAS:{hi:"Rumbo firme: mantienes tus metas en el tiempo sin saltar de una pasión a otra.",
       mid:"Sueles mantener el foco, con algún cambio de intereses por el camino.",
       lo:"Te entusiasman cosas nuevas a menudo y cambias de objetivo; enfocar te multiplicaría."}
 },
 items:[
  {t:"Termino lo que empiezo.",s:"PER"},
  {t:"Los contratiempos no me desaniman.",s:"PER"},
  {t:"Soy trabajador y no me rindo fácilmente.",s:"PER"},
  {t:"Supero obstáculos para alcanzar metas importantes.",s:"PER"},
  {t:"He logrado metas que me costaron años de esfuerzo.",s:"PER"},
  {t:"Me obsesiono con una idea un tiempo y luego pierdo el interés.",s:"PAS",r:true},
  {t:"Mis intereses cambian de un año para otro.",s:"PAS",r:true},
  {t:"Empiezo proyectos nuevos antes de acabar los anteriores.",s:"PAS",r:true},
  {t:"Me cuesta mantener el foco en proyectos largos.",s:"PAS",r:true},
  {t:"He perseguido el mismo objetivo durante mucho tiempo.",s:"PAS"}
 ]
},

/* 14. SATISFACCIÓN CON LA VIDA — SWLS */
{
 id:"swls", name:"¿Cómo de feliz eres?", emoji:"🌈", cat:"Bienestar",
 blurb:"Tu satisfacción global con la vida en 5 preguntas. Validado en decenas de culturas.",
 instrument:"Satisfaction with Life Scale (Diener et al., 1985)", license:"🟢",
 mode:"likert", scaleMax:7,
 scales:{S:"Satisfacción vital"},
 result:{type:"single",bands:[
   {min:0,label:"A medio gas",emoji:"🌧️",desc:"Hay áreas importantes que no te llenan. Buen momento para replantear prioridades y poner el foco donde toca."},
   {min:45,label:"A gusto con tu vida",emoji:"🙂",desc:"En general estás a gusto con tu vida, aunque hay cosas que mejorarías."},
   {min:75,label:"Plenamente feliz",emoji:"😄",desc:"Tu vida se acerca a tu ideal en casi todas las áreas. Disfrútalo."}
 ]},
 items:[
  {t:"En la mayoría de aspectos, mi vida se acerca a mi ideal.",s:"S"},
  {t:"Las condiciones de mi vida son excelentes.",s:"S"},
  {t:"Estoy satisfecho con mi vida.",s:"S"},
  {t:"Hasta ahora he conseguido las cosas importantes que quiero.",s:"S"},
  {t:"Si pudiera vivir mi vida de nuevo, no cambiaría casi nada.",s:"S"}
 ]
},

/* 15. PANAS — estado de ánimo */
{
 id:"panas", name:"Tu estado de ánimo", emoji:"🎚️", cat:"Bienestar",
 blurb:"El equilibrio entre tu afecto positivo y negativo en este momento.",
 instrument:"PANAS (Watson, Clark & Tellegen, 1988)", license:"🟢",
 mode:"likert", scaleMax:5, prompt:"Indica en qué medida te sientes así últimamente:",
 scales:{POS:"Afecto positivo",NEG:"Afecto negativo"},
 result:{type:"profileBars"},
 interp:{
  POS:{hi:"Energía alta: entusiasmo, ilusión y ganas marcan tu estado reciente.",mid:"Afecto positivo moderado: ni euforia ni apatía.",lo:"Poca chispa últimamente: el entusiasmo está bajo. Cuida lo que te recarga."},
  NEG:{hi:"Malestar elevado: tensión, nervios o irritación presentes. Atiende tu descanso y tu estrés.",mid:"Algo de afecto negativo, dentro de lo esperable.",lo:"Poca carga negativa: apenas te rondan la tensión o el malestar. Buena señal."}
 },
 items:[
  {t:"Interesado",s:"POS"},{t:"Entusiasmado",s:"POS"},{t:"Con energía",s:"POS"},
  {t:"Inspirado",s:"POS"},{t:"Decidido",s:"POS"},{t:"Atento",s:"POS"},
  {t:"Activo",s:"POS"},{t:"Orgulloso",s:"POS"},
  {t:"Tenso",s:"NEG"},{t:"Alterado",s:"NEG"},{t:"Culpable",s:"NEG"},
  {t:"Asustado",s:"NEG"},{t:"Irritable",s:"NEG"},{t:"Avergonzado",s:"NEG"},
  {t:"Nervioso",s:"NEG"},{t:"Temeroso",s:"NEG"}
 ]
},

/* 16. RESILIENCIA — BRS (ítems propios) */
{
 id:"resilience", name:"¿Cuánto aguantas?", emoji:"🪨", cat:"Bienestar",
 blurb:"Tu resiliencia: la capacidad de rebotar tras los golpes de la vida.",
 instrument:"Brief Resilience Scale (Smith et al., 2008) · ítems propios", license:"🟡",
 mode:"likert", scaleMax:5,
 scales:{S:"Resiliencia"},
 result:{type:"single",bands:[
   {min:0,label:"Sensible a los golpes",emoji:"🥀",desc:"Los reveses te cuestan de superar. Cuidar tu red de apoyo y tu descanso te ayudará a recuperarte antes."},
   {min:40,label:"Te recuperas",emoji:"🌿",desc:"Vuelves a la normalidad con algo de tiempo, como la mayoría de la gente."},
   {min:70,label:"Inquebrantable",emoji:"🌳",desc:"Vuelves a levantarte rápido y sales reforzado de la adversidad."}
 ]},
 items:[
  {t:"Tiendo a recuperarme rápido tras los momentos difíciles.",s:"S"},
  {t:"Me cuesta superar los acontecimientos estresantes.",s:"S",r:true},
  {t:"No tardo mucho en recuperarme de un revés.",s:"S"},
  {t:"Me resulta difícil volver a la normalidad cuando algo malo pasa.",s:"S",r:true},
  {t:"Suelo salir reforzado de los tiempos difíciles.",s:"S"},
  {t:"Los contratiempos suelen costarme mucho tiempo de superar.",s:"S",r:true}
 ]
},

/* 17. VALORES — Schwartz PVQ */
{
 id:"values", name:"Tus valores", emoji:"💎", cat:"Valores",
 blurb:"Los valores humanos básicos que guían tus decisiones, según el modelo de Schwartz.",
 instrument:"Portrait Values Questionnaire PVQ (Schwartz)", license:"🟢",
 mode:"likert", scaleMax:6, prompt:"¿Cuánto se parece a ti esta persona?",
 scales:{AUT:"Autodirección",EST:"Estimulación",HED:"Hedonismo",LOG:"Logro",POD:"Poder",SEG:"Seguridad",CON:"Conformidad",TRA:"Tradición",BEN:"Benevolencia",UNI:"Universalismo"},
 result:{type:"profileBars",topOnly:5},
 interp:{
  AUT:{hi:"Valoras pensar y actuar con libertad: independencia, creatividad y elegir tu camino.",mid:"Aprecias tu autonomía sin que sea tu valor rector.",lo:"La independencia te importa menos que otros valores; te sientes cómodo con guías externas."},
  EST:{hi:"Buscas novedad, emoción y retos: la rutina te aburre.",mid:"Te gusta algo de emoción, con dosis de calma.",lo:"Prefieres lo estable y predecible a la aventura."},
  HED:{hi:"El placer y disfrutar de la vida son prioridad: te das tus gustos.",mid:"Disfrutas sin que el placer gobierne tus decisiones.",lo:"El disfrute inmediato pesa poco frente al deber o las metas."},
  LOG:{hi:"El éxito y demostrar competencia te impulsan: te pones el listón alto.",mid:"Te importa lograr cosas, sin obsesionarte con destacar.",lo:"El reconocimiento por logros no es tu motor principal."},
  POD:{hi:"Valoras el estatus, el control y la influencia sobre personas y recursos.",mid:"Cierta ambición de influencia, equilibrada con otros valores.",lo:"El poder y el estatus te resultan poco relevantes."},
  SEG:{hi:"Priorizas la estabilidad, el orden y la seguridad, tuya y de los tuyos.",mid:"Valoras la seguridad sin que limite tu apertura.",lo:"Toleras bien la incertidumbre; la seguridad no es tu prioridad."},
  CON:{hi:"Respetas las normas y evitas molestar o transgredir lo establecido.",mid:"Sigues las normas con criterio propio.",lo:"Te incomodan las reglas por las reglas; cuestionas lo establecido."},
  TRA:{hi:"Valoras las costumbres y la cultura heredadas: dan sentido y pertenencia.",mid:"Respetas la tradición sin que rija tu vida.",lo:"Lo tradicional pesa poco en tus decisiones; miras hacia delante."},
  BEN:{hi:"Cuidar de los cercanos es central: lealtad, ayuda y bienestar de los tuyos.",mid:"Te vuelcas en los tuyos sin descuidarte.",lo:"El cuidado del círculo cercano compite con otras prioridades tuyas."},
  UNI:{hi:"Te mueven la justicia, la igualdad y la naturaleza: el bienestar de todos y del planeta.",mid:"Te importan las causas globales sin que dominen tu día a día.",lo:"Lo universal y abstracto te moviliza menos que lo cercano."}
 },
 items:[
  {t:"Le importa tener ideas propias y hacer las cosas a su manera.",s:"AUT"},
  {t:"Valora la libertad de decidir por sí misma.",s:"AUT"},
  {t:"Busca la aventura y el riesgo.",s:"EST"},
  {t:"Necesita variedad y emociones nuevas.",s:"EST"},
  {t:"Quiere disfrutar de los placeres de la vida.",s:"HED"},
  {t:"Para ella, pasarlo bien es lo primero.",s:"HED"},
  {t:"Le importa demostrar lo que vale y tener éxito.",s:"LOG"},
  {t:"Quiere que la gente admire sus logros.",s:"LOG"},
  {t:"Desea tener recursos y cierto poder sobre las cosas.",s:"POD"},
  {t:"Le importa el estatus y que la respeten.",s:"POD"},
  {t:"Necesita sentirse segura y evitar peligros.",s:"SEG"},
  {t:"Valora el orden y la estabilidad.",s:"SEG"},
  {t:"Cree que conviene seguir las normas siempre.",s:"CON"},
  {t:"Evita hacer cosas que otros desaprueben.",s:"CON"},
  {t:"Respeta las costumbres y tradiciones.",s:"TRA"},
  {t:"Las tradiciones le dan sentido a su vida.",s:"TRA"},
  {t:"Se vuelca en el bienestar de los suyos.",s:"BEN"},
  {t:"Le importa mucho ayudar a la gente cercana.",s:"BEN"},
  {t:"Le preocupan la justicia social y el medio ambiente.",s:"UNI"},
  {t:"Quiere que todas las personas sean tratadas con igualdad.",s:"UNI"}
 ]
},

/* 18. MAXIMIZADOR — Maximization Scale */
{
 id:"maximizer", name:"¿Maximizador o conformista?", emoji:"🛒", cat:"Decisión",
 blurb:"Tu estilo de decisión: ¿buscas siempre lo mejor o te conformas con lo bueno?",
 instrument:"Maximization Scale, short form (Nenkov et al., 2008)", license:"🟢",
 mode:"likert", scaleMax:7,
 scales:{S:"Maximización"},
 result:{type:"single",bands:[
   {min:0,label:"Conformista (satisficer)",emoji:"😌",desc:"Te quedas con lo primero que cumple. Decides rápido y sin arrepentirte. La ciencia dice que sueles ser más feliz."},
   {min:45,label:"Equilibrado",emoji:"⚖️",desc:"Comparas un poco antes de decidir, pero no te obsesionas con la opción perfecta."},
   {min:70,label:"Maximizador",emoji:"🔍",desc:"Buscas siempre la mejor opción posible. Decides bien, pero a costa de más dudas y arrepentimiento."}
 ]},
 items:[
  {t:"Cuando elijo, necesito revisar todas las opciones posibles.",s:"S"},
  {t:"Aunque esté contento con algo, busco si hay algo mejor.",s:"S"},
  {t:"Me cuesta mucho tomar decisiones.",s:"S"},
  {t:"Cuando veo algo en una tienda, pienso que quizá haya mejor en otra.",s:"S"},
  {t:"Pongo el listón muy alto y no me conformo con poco.",s:"S"},
  {t:"Tras decidir, sigo dándole vueltas a si acerté.",s:"S"}
 ]
},

/* 19. APEGO — ECR-R (ítems propios) */
{
 id:"attachment", name:"Tu estilo de apego", emoji:"💘", cat:"Relaciones",
 blurb:"Cómo te vinculas en pareja, en dos ejes: ansiedad y evitación. Tu estilo de apego adulto.",
 instrument:"Experiences in Close Relationships ECR-R (Fraley, Waller & Brennan, 2000) · ítems propios", license:"🟡",
 mode:"likert", scaleMax:7,
 scales:{ANX:"Ansiedad",AVO:"Evitación"},
 result:{type:"attachment"},
 interp:{
  ANX:{hi:"Vives las relaciones con intensidad y necesitas cercanía y confirmación. El miedo al abandono puede llevarte a darle muchas vueltas o a depender mucho de la otra persona.",mid:"Tu ansiedad de apego es moderada: a veces necesitas más confirmación, pero sin que te domine.",lo:"Rara vez te angustia el rechazo o el abandono; vives las relaciones con tranquilidad y seguridad."},
  AVO:{hi:"Valoras mucho tu independencia y te cuesta la intimidad profunda: tiendes a mantener distancia y a resolver solo.",mid:"Tu evitación es moderada: valoras tu espacio, pero también sabes acercarte.",lo:"Te abres con facilidad y te resulta cómodo depender de tu pareja y que dependan de ti."}
 },
 items:[
  {t:"Me preocupa que mi pareja deje de quererme.",s:"ANX"},
  {t:"Necesito que me confirmen a menudo que me quieren.",s:"ANX"},
  {t:"Me angustia que mi pareja no esté tan cerca como yo querría.",s:"ANX"},
  {t:"Me preocupa quedarme solo.",s:"ANX"},
  {t:"A veces quiero más cercanía de la que el otro está dispuesto a dar.",s:"ANX"},
  {t:"Me frustro cuando no recibo el cariño que necesito.",s:"ANX"},
  {t:"Le doy muchas vueltas a mis relaciones.",s:"ANX"},
  {t:"Me asusta la idea de que me abandonen.",s:"ANX"},
  {t:"Cuando mi pareja tarda en responder, me inquieto.",s:"ANX"},
  {t:"Temo no gustar lo suficiente a quien me importa.",s:"ANX"},
  {t:"Me comparo con otras posibles parejas de la persona que quiero.",s:"ANX"},
  {t:"Necesito sentirme imprescindible para mi pareja.",s:"ANX"},
  {t:"Prefiero no depender emocionalmente de mi pareja.",s:"AVO"},
  {t:"Me incomoda abrirme del todo a otra persona.",s:"AVO"},
  {t:"Me cuesta confiar plenamente en mi pareja.",s:"AVO"},
  {t:"Prefiero mantener cierta distancia emocional.",s:"AVO"},
  {t:"Me agobio cuando alguien quiere demasiada intimidad.",s:"AVO"},
  {t:"Me resulta difícil pedir consuelo cuando lo necesito.",s:"AVO"},
  {t:"Hablar de mis sentimientos con la pareja me incomoda.",s:"AVO"},
  {t:"Valoro mucho mi independencia, incluso en pareja.",s:"AVO"},
  {t:"Cuando algo me afecta, prefiero resolverlo yo solo.",s:"AVO"},
  {t:"Me cuesta apoyarme en mi pareja en los momentos difíciles.",s:"AVO"},
  {t:"Prefiero no compartir mis pensamientos más íntimos.",s:"AVO"},
  {t:"Me siento más cómodo cuando no dependo de nadie.",s:"AVO"}
 ]
},

/* 20. CRONOTIPO — rMEQ */
{
 id:"chronotype", name:"¿Búho o alondra?", emoji:"🦉", cat:"Estilo de vida",
 blurb:"Tu cronotipo: si tu cuerpo funciona mejor de día o de noche.",
 instrument:"reduced Morningness-Eveningness Questionnaire rMEQ (Adan & Almirall, 1991)", license:"🟢",
 mode:"choice",
 scales:{S:"Matutinidad"},
 result:{type:"single",bands:[
   {min:0,label:"Búho (vespertino)",emoji:"🦉",desc:"Tu cuerpo despega de noche. Las mañanas son tu enemigo natural."},
   {min:30,label:"Búho moderado",emoji:"🌙",desc:"Tiras más a la tarde-noche, aunque te apañas si te obligan a madrugar."},
   {min:50,label:"Intermedio",emoji:"🌗",desc:"Ni muy de mañanas ni muy de noches: te adaptas a casi cualquier horario."},
   {min:70,label:"Alondra moderada",emoji:"🌅",desc:"Rindes mejor por la mañana y notas el bajón pronto por la noche."},
   {min:88,label:"Alondra (matutino)",emoji:"🐦",desc:"Madrugas sin esfuerzo y das lo mejor a primera hora. De noche te apagas."}
 ]},
 items:[
  {t:"Si pudieras elegir libremente, ¿a qué hora te levantarías?",s:"S",opts:[
    {l:"05:00 – 06:30",v:5},{l:"06:30 – 07:45",v:4},{l:"07:45 – 09:45",v:3},{l:"09:45 – 11:00",v:2},{l:"11:00 – 12:00",v:1}]},
  {t:"En la primera media hora tras despertar, ¿cómo te sientes?",s:"S",opts:[
    {l:"Muy cansado",v:1},{l:"Bastante cansado",v:2},{l:"Bastante despejado",v:3},{l:"Muy despejado",v:4}]},
  {t:"¿A qué hora notas que tu cuerpo te pide dormir?",s:"S",opts:[
    {l:"20:00 – 21:00",v:5},{l:"21:00 – 22:15",v:4},{l:"22:15 – 00:30",v:3},{l:"00:30 – 01:45",v:2},{l:"01:45 – 03:00",v:1}]},
  {t:"¿A qué hora del día crees que rindes mejor?",s:"S",opts:[
    {l:"Primera hora de la mañana",v:5},{l:"Media mañana",v:4},{l:"Tarde",v:3},{l:"Noche",v:2},{l:"Madrugada",v:1}]},
  {t:"¿Cómo te consideras?",s:"S",opts:[
    {l:"Claramente de mañanas",v:6},{l:"Más de mañanas que de noches",v:4},{l:"Más de noches que de mañanas",v:2},{l:"Claramente de noches",v:0}]}
 ]
},

/* 21. POLÍTICO — eje izquierda/derecha (Wilson-Patterson + ejes eco/social) */
{
 id:"politico", name:"¿Cuánto facha eres?", emoji:"🇪🇸", cat:"Sociedad",
 blurb:"Tu posición real en el eje izquierda–derecha, sin postureo. 22 preguntas y un número del que no podrás esconderte.",
 instrument:"Escala de conservadurismo de Wilson-Patterson + ejes económico y social", license:"🟢",
 mode:"likert", scaleMax:5,
 scales:{S:"Posición política"},
 axes:{E:"Eje económico",C:"Eje social"},
 axisLabels:{E:{lo:"Izquierda",mid:"Centro",hi:"Derecha"},C:{lo:"Progresista",mid:"Centro",hi:"Conservador"}},
 interp:{
  E:{lo:"En lo económico te inclinas por un Estado con peso: impuestos progresivos, servicios públicos amplios y regulación de precios o mercados cuando crees que fallan. Sueles ver la desigualdad como un problema que la política debe corregir, no como un resultado natural.",
     mid:"En lo económico no compras el paquete completo de ningún lado. Aceptas el mercado como motor, pero quieres red pública en sanidad, educación o vivienda. Tus respuestas cambian según el tema, lo que suele indicar que decides caso a caso más que por identidad.",
     hi:"En lo económico priorizas la libertad de empresa, impuestos contenidos y menos regulación. Tiendes a pensar que la riqueza la crean las personas y las empresas, y que el Estado debe intervenir lo mínimo. Las ayudas te generan más dudas que confianza."},
  C:{lo:"En lo social defiendes la diversidad, los derechos de las minorías y la apertura a la inmigración. Te fías poco de la autoridad como valor en sí y ves la tradición como algo revisable. La reinserción te convence más que el castigo.",
     mid:"En lo social combinas apertura y prudencia. Puedes apoyar derechos civiles y a la vez valorar el orden, la familia o la seguridad. No te define un bloque cultural: pesas cada tema por separado.",
     hi:"En lo social valoras el orden, la tradición y la identidad nacional. Te preocupa que los cambios culturales vayan demasiado rápido y prefieres reglas claras y autoridad respetada. La inmigración y la seguridad pesan en tu forma de ver la sociedad."}
 },
 combo:{
  "lo-lo":"Izquierda en los dos ejes. Es el perfil progresista clásico: Estado fuerte y sociedad abierta. Tu voto y tu conversación suelen ir de la mano, y probablemente te reconoces en la izquierda sin matices.",
  "lo-mid":"Izquierda económica con posiciones sociales moderadas. Tu prioridad es el reparto y lo público; en cultura y costumbres pides prudencia. Es un perfil frecuente en la socialdemocracia de barrio y en votantes que no se sienten cómodos con el discurso identitario.",
  "lo-hi":"Perfil cruzado: izquierda económica y conservador social. Quieres un Estado que proteja y reparta, y a la vez orden, tradición y fronteras claras. Este cruce no cabe en el eje único izquierda-derecha y explica por qué tu puntuación global sale más al centro de lo que sientes. Es una combinación real y bastante común, aunque tenga poca representación en los partidos.",
  "mid-lo":"Centro económico y progresista social. Aceptas el mercado con red pública, y en valores estás claramente en la apertura. Es el perfil liberal-progresista: te importan más los derechos civiles que la batalla fiscal.",
  "mid-mid":"Centro en los dos ejes. No es indecisión: evalúas tema a tema. El riesgo de este perfil es que ningún discurso te represente del todo; la ventaja es que puedes hablar con casi todo el mundo.",
  "mid-hi":"Centro económico y conservador social. Pragmático con el dinero público, firme en orden y tradición. Es el perfil de derecha moderada de toda la vida: seguridad y valores por delante de la ideología económica.",
  "hi-lo":"Perfil cruzado: derecha económica y progresista social. Libertad en el mercado y libertad en las costumbres. Es el perfil liberal en sentido estricto, minoritario en España y difícil de encajar en un solo partido; por eso tu puntuación global se acerca al centro.",
  "hi-mid":"Derecha económica con posiciones sociales moderadas. Tu eje principal es el económico: menos impuestos, menos regulación. En cultura no compras el paquete conservador entero. Es un perfil frecuente en el centro-derecha urbano.",
  "hi-hi":"Derecha en los dos ejes: mercado libre, orden y tradición. Perfil conservador coherente, sin tensiones internas entre lo económico y lo social. Probablemente sabes exactamente qué votas y por qué."
 },
 result:{type:"single",bands:[
   {min:0,label:"Izquierda radical",emoji:"✊",desc:"Marx te ficharía sin entrevista. Estado fuerte, reparto y a desmontar el sistema; el statu quo te da urticaria."},
   {min:20,label:"Izquierda",emoji:"🌹",desc:"Tienes claro de qué lado de la barricada estás: lo público, los derechos sociales y la igualdad por bandera."},
   {min:36,label:"Centro-izquierda",emoji:"🌍",desc:"Progre con los pies en la tierra: quieres cambiar las cosas sin quemar la cocina. Socialdemocracia de toda la vida."},
   {min:46,label:"Centro",emoji:"⚖️",desc:"Ni fu ni fa: te quedas con lo que funcione de cada lado. Equilibrista (o el que pierde todas las cenas familiares)."},
   {min:55,label:"Centro-derecha",emoji:"📊",desc:"Orden, mercado y pocas estridencias. Votas con la cartera y duermes tranquilo."},
   {min:67,label:"Derecha",emoji:"🦅",desc:"Libertad económica, tradición y mano firme. Bandera en el balcón opcional, pero el sentimiento ya está ahí."},
   {min:82,label:"Derecha radical",emoji:"🇪🇸",desc:"Facha confirmado y a mucha honra, dirías tú. Si sonara un himno de fondo ahora mismo, no te extrañaría lo más mínimo."}
 ]},
 items:[
  {t:"El Estado debería bajar los impuestos aunque eso reduzca los servicios públicos.",s:"S",ax:"E"},
  {t:"La sanidad y la educación funcionan mejor con competencia privada.",s:"S",ax:"E"},
  {t:"Los ricos no deberían pagar un porcentaje de impuestos mayor que el resto.",s:"S",ax:"E"},
  {t:"Las ayudas sociales hacen que mucha gente prefiera no trabajar.",s:"S",ax:"E"},
  {t:"Las empresas crean la riqueza; hay que regularlas lo menos posible.",s:"S",ax:"E"},
  {t:"La inmigración descontrolada amenaza nuestra cultura.",s:"S",ax:"C"},
  {t:"Hoy se respeta demasiado poco a la autoridad y a la policía.",s:"S",ax:"C"},
  {t:"Los valores tradicionales y la familia son la base de la sociedad.",s:"S",ax:"C"},
  {t:"Hay demasiada corrección política.",s:"S",ax:"C"},
  {t:"El patriotismo y el orgullo nacional son virtudes que cultivar.",s:"S",ax:"C"},
  {t:"Las penas de cárcel deberían ser más duras.",s:"S",ax:"C"},
  {t:"El Estado debería garantizar una renta básica a todo el mundo.",s:"S",ax:"E",r:true},
  {t:"Los servicios públicos deberían ampliarse aunque suban los impuestos.",s:"S",ax:"E",r:true},
  {t:"Las grandes fortunas deberían pagar un impuesto especial.",s:"S",ax:"E",r:true},
  {t:"La vivienda es un derecho y el Estado debe controlar su precio.",s:"S",ax:"E",r:true},
  {t:"Acoger refugiados es una obligación moral.",s:"S",ax:"C",r:true},
  {t:"El matrimonio y la adopción de parejas del mismo sexo deben estar plenamente normalizados.",s:"S",ax:"C",r:true},
  {t:"El aborto debería ser un derecho libre y gratuito.",s:"S",ax:"C",r:true},
  {t:"La diversidad cultural enriquece a un país.",s:"S",ax:"C",r:true},
  {t:"Hay que priorizar la reinserción del delincuente frente al castigo.",s:"S",ax:"C",r:true},
  {t:"El feminismo ha mejorado la sociedad.",s:"S",ax:"C",r:true},
  {t:"Proteger el medio ambiente justifica limitar cierta actividad económica.",s:"S",ax:"E",r:true}
 ]
},

/* 22. LENGUAJE DEL AMOR — 5 lenguajes (Chapman, ítems propios) */
{
 id:"lovelang", name:"Tu lenguaje del amor", emoji:"💌", cat:"Relaciones",
 blurb:"Cómo das y cómo necesitas recibir cariño, según los 5 lenguajes del amor. El test que deberías enseñarle a tu pareja.",
 instrument:"Los 5 lenguajes del amor (Gary Chapman) · ítems propios", license:"🟡",
 mode:"likert", scaleMax:5,
 scales:{PAL:"Palabras de afirmación",TIE:"Tiempo de calidad",REG:"Regalos",ACT:"Actos de servicio",CON:"Contacto físico"},
 result:{type:"profileBars"},
 interp:{
  PAL:{hi:"Las palabras te llegan al alma: un 'te quiero', un halago sincero o una nota valen más que cualquier regalo.",mid:"Agradeces las palabras bonitas sin que sean lo único que necesitas.",lo:"Las palabras te importan poco: prefieres que te lo demuestren con hechos."},
  TIE:{hi:"Lo que de verdad quieres es atención plena: tiempo juntos, sin móviles ni prisas.",mid:"Disfrutas del tiempo compartido sin obsesionarte con la cantidad.",lo:"No necesitas estar pegado a tu pareja para sentirte querido."},
  REG:{hi:"Un detalle, por pequeño que sea, te dice 'pensé en ti'. No es materialismo, es símbolo.",mid:"Los detalles te hacen ilusión sin ser imprescindibles.",lo:"Los regalos te dan bastante igual; valoras más otras cosas."},
  ACT:{hi:"Los hechos hablan: que te resuelvan algo o te quiten un peso de encima es tu forma favorita de sentir amor.",mid:"Aprecias la ayuda sin que sea tu medida principal del cariño.",lo:"Que te hagan tareas no es lo que más te llena."},
  CON:{hi:"El contacto físico es tu cable a tierra: abrazos, caricias y cercanía te recargan las pilas.",mid:"Disfrutas del contacto sin que sea tu prioridad absoluta.",lo:"No necesitas mucho contacto físico para sentirte conectado."}
 },
 items:[
  {t:"Un 'te quiero' o un halago sincero me alegra el día.",s:"PAL"},
  {t:"Me duele más una crítica que la falta de un detalle.",s:"PAL"},
  {t:"Necesito que me digan lo que sienten por mí.",s:"PAL"},
  {t:"Guardo los mensajes bonitos que me escriben.",s:"PAL"},
  {t:"Lo que más valoro es pasar tiempo de calidad, sin distracciones.",s:"TIE"},
  {t:"Me molesta que miren el móvil mientras hablamos.",s:"TIE"},
  {t:"Una tarde juntos vale más que cualquier regalo.",s:"TIE"},
  {t:"Me siento querido cuando me dedican su atención plena.",s:"TIE"},
  {t:"Un detalle inesperado me emociona muchísimo.",s:"REG"},
  {t:"Guardo con cariño especial los regalos que me hacen.",s:"REG"},
  {t:"Que se acuerden de traerme algo me dice que pensaron en mí.",s:"REG"},
  {t:"Me hace ilusión tanto dar como recibir regalos.",s:"REG"},
  {t:"Me siento querido cuando me ayudan sin que lo pida.",s:"ACT"},
  {t:"Que me resuelvan un problema es la mejor muestra de amor.",s:"ACT"},
  {t:"Valoro más lo que hacen por mí que lo que dicen.",s:"ACT"},
  {t:"Un gesto práctico me llega más que las palabras.",s:"ACT"},
  {t:"Un abrazo me reconforta como pocas cosas.",s:"CON"},
  {t:"Necesito contacto físico para sentirme conectado.",s:"CON"},
  {t:"Echo de menos las caricias cuando faltan.",s:"CON"},
  {t:"Ir de la mano o un achuchón me recarga las pilas.",s:"CON"}
 ]
},

/* 23. RED FLAG — conductas en pareja (escala propia, por diversión) */
{
 id:"redflag", name:"¿Eres tú la red flag?", emoji:"🚩", cat:"Relaciones",
 blurb:"Siempre culpas a tus ex. 20 preguntas para la pregunta incómoda: ¿y si el patrón eres tú?",
 instrument:"Escala propia de conductas en pareja (con guiños a la Tríada Oscura) · por diversión", license:"🟡",
 mode:"likert", scaleMax:5,
 scales:{S:"Nivel de red flag"},
 result:{type:"single",bands:[
   {min:0,label:"Green flag andante",emoji:"💚",desc:"El sueño de cualquier terapeuta de pareja: estable, sano y, admitámoslo, un pelín aburrido en el buen sentido."},
   {min:30,label:"Mayormente sano",emoji:"🙂",desc:"Tienes tus manías, pero nada que asuste. Tus ex te recuerdan sin escalofríos."},
   {min:50,label:"Bandera naranja",emoji:"🟠",desc:"Hay patrones ahí que conviene mirar. No eres el villano, pero sales en algún flashback incómodo."},
   {min:68,label:"Red flag confirmada",emoji:"🚩",desc:"Sorpresa: el denominador común de tus dramas eres tú. Tus ex tienen un grupo de apoyo y tú eres el tema."},
   {min:84,label:"Bandera roja con asta",emoji:"🚩",desc:"Eres la advertencia que las madres dan a sus hijos. Si esto fuera una peli de terror, serías la llamada que viene de dentro de casa."}
 ]},
 items:[
  {t:"Reviso (o me gustaría revisar) el móvil de mi pareja.",s:"S"},
  {t:"Me pongo celoso con facilidad.",s:"S"},
  {t:"Necesito saber dónde está mi pareja casi a todas horas.",s:"S"},
  {t:"Cuando me enfado, recurro a la ley del hielo.",s:"S"},
  {t:"Hago sentir culpable a mi pareja para salirme con la mía.",s:"S"},
  {t:"He dado celos a propósito para llamar la atención.",s:"S"},
  {t:"Saco temas del pasado para ganar las discusiones.",s:"S"},
  {t:"Me cuesta pedir perdón aunque sepa que me he pasado.",s:"S"},
  {t:"Cuando algo va mal, la culpa casi siempre es del otro.",s:"S"},
  {t:"Desaparezco unos días cuando me agobio, sin avisar.",s:"S"},
  {t:"Me molesta que mi pareja tenga vida sin mí.",s:"S"},
  {t:"He coqueteado con otras personas estando en pareja.",s:"S"},
  {t:"Doy mucho amor al principio y luego lo raciono.",s:"S"},
  {t:"Mis ex dirían que fui difícil de querer.",s:"S"},
  {t:"Comunico lo que siento con calma, sin estallar.",s:"S",r:true},
  {t:"Respeto el espacio y los amigos de mi pareja.",s:"S",r:true},
  {t:"Pido perdón cuando me equivoco.",s:"S",r:true},
  {t:"Confío sin necesidad de vigilar.",s:"S",r:true},
  {t:"Me alegro de verdad de los logros de mi pareja.",s:"S",r:true},
  {t:"Afronto los problemas hablando, no desapareciendo.",s:"S",r:true}
 ]
},

/* 24. CELOS — Multidimensional Jealousy Scale (Pfeiffer y Wong, 1989), ítems propios */
{
 id:"celos", name:"Test de celos", emoji:"👀", cat:"Relaciones",
 blurb:"¿Te quedas en el pinchazo o acabas mirando el móvil? Tus celos en tres dimensiones: pensamientos, emociones y conductas.",
 instrument:"Multidimensional Jealousy Scale (Pfeiffer y Wong, 1989) · ítems propios", license:"🟢",
 mode:"likert", scaleMax:5,
 prompt:"Piensa en tu pareja actual o, si ahora no tienes, en tu última relación.",
 hideCardBars:true,
 freeTraits:["Celos en pareja"],
 premiumTitle:"Ya conoces tu nivel. Descubre de qué están hechos tus celos",
 premiumPitch:"Los celos tienen tres caras: lo que piensas, lo que sientes y lo que haces. No todas desgastan igual una relación. Mira tu puntuación en cada una y qué significa en tu caso.",
 scales:{C:"Pensamientos",E:"Emociones",B:"Conductas"},
 result:{type:"profileBars",overall:true,overallLabel:"Nivel de celos"},
 interp:{
  C:{hi:"Tienes a menudo pensamientos de sospecha sobre tu pareja, aunque no haya pruebas. Es la cara de los celos que la investigación asocia con peor satisfacción en la relación, porque la duda se alimenta sola: cuanto más vueltas le das, más señales encuentras. Separar lo que sabes de lo que imaginas es el primer paso.",
     mid:"Las dudas aparecen a veces, en situaciones concretas, pero no se instalan. Es un nivel habitual. Fíjate en qué las dispara: si se repite un patrón, suele hablar más de tu historia que de tu pareja.",
     lo:"Rara vez sospechas de tu pareja sin motivo. Tu confianza no depende de comprobar ni de saberlo todo, algo que los estudios relacionan con relaciones más satisfactorias."},
  E:{hi:"Te afectan mucho las situaciones en las que tu pareja muestra interés por otra persona. Es la cara más común de los celos y, por sí sola, no suele dañar la relación: es una reacción emocional ante algo que vives como amenaza. Lo que cuenta es qué haces después con esa emoción.",
     mid:"Sientes celos cuando la situación los provoca, con una intensidad parecida a la de la mayoría. Es la parte de los celos que suele ir ligada al compromiso con la relación.",
     lo:"Pocas situaciones te despiertan celos. Puede reflejar mucha seguridad en la relación o una implicación emocional más contenida. Solo tú sabes cuál de las dos pesa más."},
  B:{hi:"Los celos te llevan a actuar: revisar, preguntar, vigilar o limitar con quién queda tu pareja. Es la cara que más desgasta una relación y la que más se acerca al control. Si te reconoces aquí, merece la pena hablarlo en pareja o con un profesional: la confianza no se construye comprobando.",
     mid:"De vez en cuando compruebas o pides explicaciones. No es raro, pero conviene vigilar la frecuencia: estas conductas tienden a crecer porque calman la inquietud en el momento.",
     lo:"No vigilas ni controlas a tu pareja. Aunque sientas celos, no los conviertes en comprobaciones, que es justo lo que más protege a una relación."}
 },
 items:[
  {t:"Sospecho que mi pareja podría estar viéndose con otra persona a escondidas.",s:"C"},
  {t:"Me pregunto a menudo si mi pareja se siente atraída por alguien de su entorno.",s:"C"},
  {t:"Si mi pareja se retrasa sin avisar, lo primero que pienso es que está con otra persona.",s:"C"},
  {t:"Me da vueltas la idea de que alguien pueda interesarle más que yo.",s:"C"},
  {t:"Cuando mi pareja habla con entusiasmo de alguien, empiezo a imaginar cosas.",s:"C"},
  {t:"Confío en mi pareja aunque no sepa en todo momento dónde está ni con quién.",s:"C",r:true},
  {t:"Me molestaría mucho ver a mi pareja coqueteando con otra persona.",s:"E"},
  {t:"Me siento mal cuando mi pareja presta mucha atención a alguien atractivo.",s:"E"},
  {t:"Si en una fiesta mi pareja se ríe mucho con otra persona, me cambia el humor.",s:"E"},
  {t:"Me inquieta que mi pareja mantenga la amistad con una expareja.",s:"E"},
  {t:"Me duele que mi pareja cuente a otras personas cosas que a mí no me cuenta.",s:"E"},
  {t:"Que mi pareja tenga una amistad muy cercana con otra persona no me afecta.",s:"E",r:true},
  {t:"He mirado el móvil de mi pareja sin que lo supiera.",s:"B"},
  {t:"Pregunto a mi pareja con quién ha estado cuando no estábamos juntos.",s:"B"},
  {t:"Reviso a quién sigue o qué le gusta a mi pareja en redes sociales.",s:"B"},
  {t:"Llamo o aparezco sin avisar para ver qué está haciendo mi pareja.",s:"B"},
  {t:"Le pido a mi pareja que no quede con ciertas personas.",s:"B"},
  {t:"Dejo que mi pareja haga su vida sin pedirle explicaciones.",s:"B",r:true}
 ]
},

/* 25. PERSONA DIFÍCIL — estructura del antagonismo (Sleep, Crowe, Carter, Lynam y Miller, 2021), ítems propios */
{
 id:"dificil", name:"¿Eres una persona difícil?", emoji:"🧨", cat:"Personalidad",
 blurb:"Siete rasgos que complican el trato con los demás, de la insensibilidad a la manipulación. ¿Cuánto cuesta llevarse bien contigo?",
 instrument:"Estructura del antagonismo (Sleep, Crowe, Carter, Lynam y Miller, 2021) · ítems propios", license:"🟢",
 mode:"likert", scaleMax:5,
 hideCardBars:true,
 freeTraits:["Trato con los demás"],
 premiumTitle:"Ya sabes cuánto. Descubre qué te hace difícil",
 premiumPitch:"La dificultad se reparte en siete rasgos: insensibilidad, grandiosidad, agresividad, desconfianza, manipulación, dominancia y gusto por el riesgo. Mira tu puntuación en cada uno y qué significa en tu caso.",
 scales:{CAL:"Insensibilidad",GRA:"Grandiosidad",AGR:"Agresividad",SUS:"Desconfianza",MAN:"Manipulación",DOM:"Dominancia",RIS:"Gusto por el riesgo"},
 result:{type:"profileBars",overall:true,overallLabel:"Persona difícil"},
 interp:{
  CAL:{hi:"Te afectan poco los problemas de los demás y te cuesta ponerte en su lugar. A corto plazo te protege; a largo plazo es de lo que más aleja a la gente.",mid:"Tienes empatía, pero no siempre la sacas: depende de quién sea y de si crees que se lo ha buscado.",lo:"Te importa de verdad cómo están los demás. Es el rasgo que más suaviza el trato."},
  GRA:{hi:"Te ves por encima de la media y esperas que se note. La confianza ayuda; el problema llega cuando los demás sienten que los miras desde arriba.",mid:"Sabes lo que vales y te gusta que se reconozca, sin llegar a creerte más que nadie.",lo:"No te pones por encima de nadie. Tu autoestima no depende de destacar."},
  AGR:{hi:"Cuando algo te molesta, reaccionas fuerte y a veces contra la persona equivocada. Es el rasgo que más se nota en el día a día de quien convive contigo.",mid:"Pierdes los nervios de vez en cuando, como casi todo el mundo, pero no es tu forma habitual de responder.",lo:"Te cuesta mucho perder las formas. Incluso en una discusión, mantienes el tono."},
  SUS:{hi:"Te fías poco de las intenciones ajenas y sueles esperar lo peor. Te protege de que te engañen, pero hace que a la gente le cueste acercarse.",mid:"Das confianza, aunque con reservas: primero observas y luego te abres.",lo:"Das el beneficio de la duda. Esperas lo mejor de los demás hasta que te demuestran lo contrario."},
  MAN:{hi:"Sabes qué decir a cada persona para conseguir lo que quieres. Es una habilidad social potente, pero cuando se nota, rompe la confianza de golpe.",mid:"A veces adornas las cosas para salirte con la tuya, sin que sea tu forma habitual de tratar a la gente.",lo:"Vas de frente. Pides lo que quieres sin rodeos y no juegas con la gente."},
  DOM:{hi:"Te gusta llevar la voz cantante y te cuesta ceder. En un equipo puedes tirar del resto, pero también dejarlos sin espacio.",mid:"Tomas el mando cuando hace falta, pero sabes dejar que decidan otros.",lo:"No necesitas imponerte. Escuchas y cedes con facilidad, quizá a veces demasiado."},
  RIS:{hi:"Buscas emociones fuertes y te aburre lo tranquilo. Da energía, pero puede arrastrar a quien está contigo a situaciones que no ha elegido.",mid:"Te gusta algo de emoción, pero no a cualquier precio.",lo:"Prefieres lo seguro y lo previsible. A quien te rodea le das tranquilidad."}
 },
 items:[
  {t:"Los problemas de los demás no suelen ser asunto mío.",s:"CAL"},
  {t:"Me cuesta sentir lástima por quien se ha metido solo en un lío.",s:"CAL"},
  {t:"Me afecta ver que alguien lo está pasando mal.",s:"CAL",r:true},
  {t:"Creo que merezco más reconocimiento del que recibo.",s:"GRA"},
  {t:"Hago la mayoría de las cosas mejor que la gente que me rodea.",s:"GRA"},
  {t:"No me considero más especial que los demás.",s:"GRA",r:true},
  {t:"Si alguien me provoca, se lo devuelvo.",s:"AGR"},
  {t:"Cuando estoy de mal humor, lo pago con quien tengo cerca.",s:"AGR"},
  {t:"Aunque me lleven la contraria, me cuesta perder los nervios.",s:"AGR",r:true},
  {t:"Si alguien es amable conmigo, me pregunto qué quiere a cambio.",s:"SUS"},
  {t:"La mayoría de la gente se aprovecharía de mí si pudiera.",s:"SUS"},
  {t:"Suelo dar a los demás el beneficio de la duda.",s:"SUS",r:true},
  {t:"Sé decir a cada persona lo que quiere oír para conseguir lo que busco.",s:"MAN"},
  {t:"Exagero o adorno la verdad si me conviene.",s:"MAN"},
  {t:"Prefiero pedir las cosas claramente antes que darles la vuelta para convencer.",s:"MAN",r:true},
  {t:"En un grupo, me gusta que se haga lo que yo digo.",s:"DOM"},
  {t:"Me cuesta ceder en una discusión aunque no tenga toda la razón.",s:"DOM"},
  {t:"Me siento a gusto dejando que otros tomen las decisiones.",s:"DOM",r:true},
  {t:"Hago cosas arriesgadas solo por la emoción.",s:"RIS"},
  {t:"Si todo va demasiado tranquilo, me aburro y busco algo de acción.",s:"RIS"},
  {t:"Prefiero ir a lo seguro antes que arriesgarme.",s:"RIS",r:true}
 ]
},

/* 26. ESTILOS DE AMOR — Love Attitudes Scale (Hendrick y Hendrick, 1986; forma breve 1998), ítems propios */
{
 id:"lovestyles", name:"Tu estilo de amor", emoji:"💞", cat:"Relaciones",
 blurb:"Pasión, amistad, cabeza, juego, intensidad o entrega. Descubre los seis estilos de amor y cuál manda en tu forma de querer.",
 instrument:"Love Attitudes Scale, forma breve (Hendrick, Hendrick y Dicke, 1998) · ítems propios", license:"🟢",
 mode:"likert", scaleMax:5,
 prompt:"Piensa en tu pareja actual o, si ahora no tienes, en tu última relación.",
 hideCardBars:true,
 premiumTitle:"Ya sabes tu estilo principal. Descubre tu mezcla completa",
 premiumPitch:"Nadie quiere con un solo estilo. Mira cuánto tienes de cada uno de los seis y qué dice cada uno de tu forma de querer.",
 scales:{ERO:"Pasión (Eros)",LUD:"Juego (Ludus)",STO:"Amistad (Storge)",PRA:"Sentido práctico (Pragma)",MAN:"Intensidad (Manía)",AGA:"Entrega (Ágape)"},
 result:{type:"profileBars"},
 topDesc:{
  ERO:"Te enamoras de golpe y con todo: química, atracción y la sensación de haber encontrado a alguien especial. Para ti una relación sin pasión se queda coja.",
  LUD:"Para ti el amor es un juego que se disfruta mejor sin prisas ni ataduras. Te divierte la seducción y te cuesta ponerle etiqueta a lo que tienes.",
  STO:"Tu amor nace despacio y de la amistad. No necesitas fuegos artificiales: te enamoran la complicidad, la confianza y tener a tu mejor persona al lado.",
  PRA:"Quieres con el corazón, pero eliges con la cabeza. Antes de comprometerte miras si esa persona encaja con tu vida, tus valores y tus planes.",
  MAN:"Cuando quieres, quieres a todo o nada. Vives el amor con mucha intensidad y los altibajos de la relación te afectan más que a la mayoría.",
  AGA:"Tu forma de querer es darlo todo. La felicidad de tu pareja va antes que la tuya, y cedes mucho con tal de verla bien."
 },
 interp:{
  ERO:{hi:"La pasión y la atracción son el motor de tu forma de querer. En los estudios de Hendrick es el estilo que más se asocia con satisfacción en pareja. El reto es que la relación siga viva cuando baja la intensidad del principio.",mid:"Valoras la química, pero no lo es todo: para ti la atracción suma, aunque no decide sola.",lo:"La pasión no es lo que más pesa en cómo quieres. Te enganchan más la confianza, la estabilidad o el proyecto común que el flechazo."},
  LUD:{hi:"Disfrutas de la seducción y te cuesta el compromiso exclusivo. En los estudios, este estilo se asocia con relaciones menos satisfactorias cuando la otra persona busca algo serio. Dejar claro lo que buscas evita malentendidos.",mid:"Tienes un punto juguetón y valoras tu libertad, pero no huyes del compromiso cuando alguien te importa.",lo:"No juegas con la gente: cuando estás con alguien, estás de verdad. El compromiso no te agobia."},
  STO:{hi:"El cariño tranquilo, la amistad y la confianza son tu base. Es un amor que aguanta bien el paso del tiempo, aunque a veces echa de menos algo de chispa.",mid:"Valoras la amistad en la pareja, sin que sea la única pieza: también necesitas atracción o un proyecto común.",lo:"No necesitas que tu pareja sea tu mejor amistad. Buscas otras cosas en el amor, como la pasión o la estabilidad."},
  PRA:{hi:"Eliges pareja con criterio: valores, planes de vida, estabilidad. Te protege de relaciones que no encajan, aunque a veces la cabeza frena al corazón más de la cuenta.",mid:"Tienes en cuenta si alguien encaja con tu vida, pero no lo conviertes en una lista de requisitos.",lo:"No haces cuentas cuando te enamoras. Te guías más por lo que sientes que por si esa persona encaja con tus planes."},
  MAN:{hi:"Vives el amor con intensidad y con miedo a perderlo: las dudas y los silencios te afectan mucho. Es el estilo que más se asocia con celos y malestar en pareja. Trabajar la seguridad en ti ayuda más que buscar pruebas en la otra persona.",mid:"A veces la relación te genera inquietud o necesidad de confirmación, sin que te domine.",lo:"Quieres sin angustia. Las dudas puntuales no te quitan el sueño ni el equilibrio."},
  AGA:{hi:"Te entregas sin esperar nada a cambio y pones a tu pareja por delante. Es una forma muy generosa de querer; solo conviene vigilar que no acabe borrando tus propias necesidades.",mid:"Das mucho en pareja, pero sin olvidarte de ti: también esperas reciprocidad.",lo:"Quieres, pero no a costa de ti. Tu cariño no pasa por sacrificarte y esperas que el esfuerzo sea mutuo."}
 },
 items:[
  {t:"Entre mi pareja y yo hubo química desde el primer momento.",s:"ERO"},
  {t:"Sentí una atracción física muy fuerte al conocer a mi pareja.",s:"ERO"},
  {t:"Siento que mi pareja y yo encajamos de una forma especial.",s:"ERO"},
  {t:"Nuestra relación tiene mucha pasión.",s:"ERO"},
  {t:"Prefiero no comprometerme demasiado con una sola persona.",s:"LUD"},
  {t:"Me gusta más el juego de la seducción que la relación en sí.",s:"LUD"},
  {t:"Alguna vez he tenido a dos personas interesadas en mí sin que lo supieran entre ellas.",s:"LUD"},
  {t:"Lo que mi pareja no sabe de mí no le hace daño.",s:"LUD"},
  {t:"El mejor amor nace de una amistad.",s:"STO"},
  {t:"Mi pareja es, ante todo, mi mejor amistad.",s:"STO"},
  {t:"Mi relación fue creciendo poco a poco, sin un flechazo.",s:"STO"},
  {t:"Necesito conocer bien a alguien antes de enamorarme.",s:"STO"},
  {t:"Antes de comprometerme, pienso si esa persona encaja con mis planes de vida.",s:"PRA"},
  {t:"Me importa que mi pareja tenga una situación estable.",s:"PRA"},
  {t:"Tener valores y objetivos parecidos pesa más para mí que la atracción.",s:"PRA"},
  {t:"Pienso en cómo sería esa persona como compañía para toda la vida.",s:"PRA"},
  {t:"Si noto que mi pareja no está pendiente de mí, me pongo muy mal.",s:"MAN"},
  {t:"Cuando me enamoro, me cuesta pensar en otra cosa.",s:"MAN"},
  {t:"Si mi pareja me ignora un tiempo, hago tonterías para llamar su atención.",s:"MAN"},
  {t:"Me cuesta dormir si tengo dudas sobre lo que siente mi pareja.",s:"MAN"},
  {t:"Prefiero sufrir yo antes que ver sufrir a mi pareja.",s:"AGA"},
  {t:"Pongo las necesidades de mi pareja por delante de las mías.",s:"AGA"},
  {t:"Haría casi cualquier sacrificio por la felicidad de mi pareja.",s:"AGA"},
  {t:"Aguantaría mucho con tal de que mi pareja sea feliz.",s:"AGA"}
 ]
},

/* 27. MEMORIA — amplitud de dígitos (directa e inversa) y reconocimiento de palabras; ítems generados en cognitive.js */
{
 id:"memoria", name:"Test de memoria", emoji:"🧩", cat:"Inteligencia",
 blurb:"¿Cuántos números retienes de un vistazo? Dígitos en orden y al revés, y palabras que tendrás que recordar tras una distracción.",
 instrument:"Pruebas clásicas de amplitud de dígitos y reconocimiento (Miller, 1956; Cowan, 2001) · ítems propios", license:"🟢",
 mode:"correct", scoring:"memory", noTimer:true, noBack:true, autoAdvance:true,
 premiumTitle:"Ya sabes cómo es tu memoria. Descubre cuántos dígitos retienes",
 premiumPitch:"Tu amplitud exacta en orden directo e inverso, cuántas palabras reconociste y una puntuación de 0 a 100, con lo que significa cada parte. Tu carta se actualiza con tu cifra.",
 domains:{DF:"Orden directo",DB:"Orden inverso",WR:"Palabras"},
 interp:{
  DF:{hi:"Retienes secuencias largas sin esfuerzo. Es la capacidad que usas para recordar un número de teléfono o un código mientras lo escribes.",mid:"Tu amplitud está en el rango habitual de la población adulta, que suele moverse entre cinco y nueve elementos según el clásico trabajo de Miller.",lo:"Las secuencias largas se te escapan. Muchas veces es cuestión de estrategia: agrupar los números de dos en dos o de tres en tres ayuda mucho."},
  DB:{hi:"Manipulas la información mientras la recuerdas, no solo la guardas. Es la parte de la memoria de trabajo más ligada al razonamiento.",mid:"Le das la vuelta a secuencias medias con soltura. Es normal quedarse uno o dos dígitos por debajo del orden directo.",lo:"Invertir secuencias te cuesta: exige guardar y operar a la vez. Es la tarea más exigente del test y la que más mejora con práctica."},
  WR:{hi:"Reconoces casi todas las palabras aunque hayas hecho otras tareas entre medias: tu memoria resiste bien la interferencia.",mid:"Reconoces la mayoría de las palabras, aunque alguna se pierde por el camino o se confunde con otra parecida.",lo:"Las palabras se borran cuando haces otra cosa entre medias. Repetirlas por dentro o inventar una historia con ellas ayuda a fijarlas."}
 },
 items:[]
},

/* 28. ATENCIÓN — Stroop, búsqueda visual y símbolo distinto contra el reloj; ítems generados en cognitive.js */
{
 id:"atencion", name:"Test de atención", emoji:"🎯", cat:"Inteligencia",
 blurb:"Colores que engañan, letras escondidas y símbolos que no encajan, contra el reloj. ¿Cuánto aguanta tu foco?",
 instrument:"Efecto Stroop (Stroop, 1935) y búsqueda visual (Treisman y Gelade, 1980) · ítems propios", license:"🟢",
 mode:"correct", scoring:"attention", duration:240, hardTimer:true, noBack:true, autoAdvance:true,
 premiumTitle:"Ya sabes cómo es tu atención. Descubre tu índice exacto",
 premiumPitch:"Tu índice de atención de 0 a 100, tus aciertos en cada prueba, el tiempo que tardaste y cuánto te frenó el efecto Stroop. Tu carta se actualiza con tu cifra.",
 domains:{ST:"Colores que engañan",BV:"Búsqueda visual",OD:"Símbolo distinto"},
 interp:{
  ST:{hi:"Frenas la lectura automática y te quedas con el color. Es la base del control de la atención: ignorar lo que salta a la vista para centrarte en lo que importa.",mid:"Aciertas casi siempre, aunque la palabra escrita te despista en algún caso. Es el efecto Stroop y le pasa a todo el mundo.",lo:"La palabra se impone al color con facilidad. Leer es tan automático que cuesta frenarlo; en tareas así ayuda ir un poco más despacio."},
  BV:{hi:"Rastreas con método y no se te escapa ninguna. Contar símbolos parecidos exige recorrer la cuadrícula en orden, y lo haces bien.",mid:"Encuentras casi todos los objetivos, con algún despiste entre letras que se parecen mucho, como la b y la d.",lo:"Se te escapan objetivos entre símbolos parecidos. Recorrer la cuadrícula fila a fila en lugar de saltar con la vista suele mejorar mucho el resultado."},
  OD:{hi:"Detectas lo que no encaja casi de un vistazo. Es atención al detalle en estado puro.",mid:"Encuentras el símbolo distinto en la mayoría de los casos, aunque los pares más parecidos te hacen dudar.",lo:"Los pares de símbolos muy parecidos te cuestan. Es normal con prisa: la vista completa lo que espera ver."}
 },
 items:[]
},

/* 29. EDAD MENTAL — entretenimiento; inspirado en la investigación sobre edad subjetiva (Rubin y Berntsen, 2006) */
{
 id:"edadmental", name:"¿Cuál es tu edad mental?", emoji:"🎂", cat:"Personalidad",
 blurb:"Ocio, tecnología, responsabilidades y emociones: 16 preguntas para saber cuántos años tiene tu mente.",
 instrument:"Test de entretenimiento inspirado en la investigación sobre edad subjetiva (Rubin y Berntsen, 2006) · ítems propios", license:"🟢",
 mode:"choice",
 premiumTitle:"Ya sabes tu etapa. Descubre tu edad mental exacta",
 premiumPitch:"Tu edad mental en años y cuántos tiene tu mente en el ocio, la tecnología, las responsabilidades y las emociones. Tu carta se actualiza con tu cifra.",
 scales:{OCI:"Ocio y planes",TEC:"Gustos y tecnología",RES:"Responsabilidades",EMO:"Emociones y relaciones"},
 result:{type:"mentalage"},
 interp:{
  OCI:{lo:"Tus planes tienen espíritu joven: espontaneidad, gente y noche. Te cargas de energía saliendo.",mid:"Combinas planes sociales con tu espacio. Te gusta salir, pero también volver a una hora razonable.",hi:"Disfrutas del ocio tranquilo y previsible. Para ti un buen plan es uno que no te deja sin energía al día siguiente."},
  TEC:{lo:"Vas a la última: lo nuevo te llega antes que a nadie y te mueves por las redes con soltura.",mid:"Usas la tecnología con criterio: pruebas lo nuevo, pero no te dejas arrastrar por cada moda.",hi:"Te quedas con lo que funciona. Las modas digitales te pillan con poco interés y bastante escepticismo."},
  RES:{lo:"La vida adulta todavía te pilla con poco entrenamiento: papeles, horarios y ahorro van a su ritmo.",mid:"Tienes lo importante bajo control, aunque sin obsesionarte con la organización.",hi:"Eres la persona organizada del grupo: papeles en orden, rutinas claras y el ahorro como prioridad."},
  EMO:{lo:"Vives las emociones a tope: intensidad, impulsos y poca paciencia con la incertidumbre.",mid:"Gestionas las emociones con bastante equilibrio, aunque alguna vez te ganan el impulso o el drama.",hi:"Te tomas las cosas con calma y perspectiva. Pocas cosas consiguen sacarte de quicio."}
 },
 items:[
  {t:"Un viernes por la noche perfecto es…",s:"OCI",opts:[{l:"Salir hasta que cierren",v:19},{l:"Cenar con amigos y volver a una hora decente",v:33},{l:"Sofá, manta y una serie",v:42},{l:"Cena tranquila y a dormir pronto",v:58}]},
  {t:"¿Cómo planeas unas vacaciones?",s:"OCI",opts:[{l:"Sobre la marcha, ya veremos",v:21},{l:"Vuelo barato y lo demás allí",v:27},{l:"Todo reservado con antelación",v:41},{l:"Al sitio de siempre, que ya lo conozco",v:60}]},
  {t:"Un domingo a las diez de la mañana…",s:"OCI",opts:[{l:"Sigo durmiendo",v:18},{l:"Preparando un brunch con amigos",v:28},{l:"Haciendo la compra",v:44},{l:"Ya he paseado y leído el periódico",v:62}]},
  {t:"Cuando quedas con amigos, lo normal es…",s:"OCI",opts:[{l:"Grupo grande y lo que surja",v:20},{l:"Unos pocos en el bar de siempre",v:30},{l:"Comida en casa de alguien",v:43},{l:"Un café a media mañana",v:60}]},
  {t:"Para escuchar música…",s:"TEC",opts:[{l:"Lo que suena en TikTok esta semana",v:16},{l:"Listas según el momento del día",v:27},{l:"Discos enteros de mis grupos de siempre",v:42},{l:"La radio",v:63}]},
  {t:"Te llega un audio de tres minutos…",s:"TEC",opts:[{l:"Lo escucho a doble velocidad",v:22},{l:"Lo escucho cuando pueda",v:32},{l:"Hubiera preferido una llamada",v:47},{l:"Que me lo cuenten en persona",v:60}]},
  {t:"Una app nueva que usa todo el mundo…",s:"TEC",opts:[{l:"La tenía antes que nadie",v:18},{l:"La pruebo a ver qué tal",v:28},{l:"Espero a ver si dura",v:44},{l:"No me hace falta",v:62}]},
  {t:"Tus fotos acaban sobre todo…",s:"TEC",opts:[{l:"En stories que desaparecen",v:17},{l:"En el móvil, cientos para elegir una",v:26},{l:"En una carpeta por viajes",v:41},{l:"Impresas o en un álbum",v:63}]},
  {t:"Las facturas y los papeles…",s:"RES",opts:[{l:"¿Qué facturas?",v:17},{l:"Los hago cuando me avisan",v:25},{l:"Domiciliado y organizado",v:40},{l:"Archivados por años",v:60}]},
  {t:"Entre semana te acuestas…",s:"RES",opts:[{l:"Después de las dos",v:19},{l:"Hacia la una",v:26},{l:"Antes de medianoche",v:40},{l:"A las once como muy tarde",v:58}]},
  {t:"Si se estropea algo en casa…",s:"RES",opts:[{l:"Llamo a mi familia",v:17},{l:"Busco un tutorial",v:27},{l:"Llamo a alguien de confianza",v:42},{l:"Tengo herramientas y sé usarlas",v:55}]},
  {t:"Ahorrar es…",s:"RES",opts:[{l:"Algo para el futuro lejano",v:18},{l:"Lo intento cada mes",v:29},{l:"Tengo un colchón y objetivos",v:42},{l:"Lo primero, y comparo precios",v:60}]},
  {t:"Si alguien tarda horas en contestarte…",s:"EMO",opts:[{l:"Miro su última conexión",v:17},{l:"Me extraña, pero sigo a lo mío",v:29},{l:"Estará a otra cosa",v:42},{l:"Ni me doy cuenta",v:58}]},
  {t:"En una discusión…",s:"EMO",opts:[{l:"Tengo que ganarla",v:18},{l:"Digo lo que pienso y luego me arrepiento",v:26},{l:"Intento entender a la otra persona",v:40},{l:"Elijo mis batallas",v:58}]},
  {t:"Para ti el amor es sobre todo…",s:"EMO",opts:[{l:"Intensidad y mariposas",v:19},{l:"Alguien con quien divertirme",v:26},{l:"Un equipo para construir algo",v:38},{l:"Compañía, calma y cariño",v:58}]},
  {t:"Cuando algo sale mal…",s:"EMO",opts:[{l:"Drama durante días",v:17},{l:"Me desahogo con amigos y paso página",v:27},{l:"Busco qué puedo aprender",v:41},{l:"Lo relativizo: he visto cosas peores",v:60}]}
 ]
}

];

/* ===== Contenido SEO por test (para las landings /test/<slug>) ===== */
window.SEO_CONTENT = {
 bigfive:{slug:"test-de-personalidad", metaDesc:"Haz el test de personalidad de los 5 grandes rasgos (Big Five), el modelo más validado por la ciencia. Gratis, sin registro, resultado al instante.",
   intro:"El test de personalidad más respaldado por la psicología. Mide los cinco grandes rasgos —apertura, responsabilidad, extraversión, amabilidad y estabilidad emocional— para dibujar quién eres de verdad, sin pseudociencia.",
   learn:["Tu puntuación en los 5 grandes rasgos","Qué rasgo domina tu forma de ser","Cómo te comparas con la media en cada dimensión","Una carta de resultado lista para compartir"]},
 tipi:{slug:"test-de-personalidad-rapido", metaDesc:"Test de personalidad rápido en 10 preguntas (TIPI): tu perfil de los 5 grandes rasgos en un minuto. Gratis y al instante.",
   intro:"Tu perfil de personalidad en versión exprés: diez preguntas, un minuto, los cinco grandes rasgos. Ideal cuando tienes prisa pero quieres una pista fiable de cómo eres.",
   learn:["Tu perfil en los 5 grandes rasgos","El rasgo que más te define","Un retrato rápido de tu carácter","Resultado y carta para compartir"]},
 honesty:{slug:"test-honestidad-humildad", seoTitle:"Test de humildad y bondad: ¿eres buena persona? | Testia", h1:"Test de Honestidad-Humildad",
   metaDesc:"Test de bondad y humildad basado en HEXACO: 12 preguntas sobre sinceridad, justicia, modestia y codicia para ver si eres tan buena persona como crees.",
   intro:"Explora la dimensión Honestidad-Humildad del modelo HEXACO: sinceridad, justicia, modestia y poco interés por obtener estatus o ventajas a costa de otros. No decide si eres «buena persona»; describe tendencias concretas de personalidad.",
   learn:["Tu nivel de honestidad y humildad","Tu puntuación en sinceridad, justicia y modestia","Si priorizas el estatus o la integridad","Tu carta de resultado"],
   overview:[
    {label:"Mide",text:"Sinceridad, justicia, desapego material y modestia."},
    {label:"Formato",text:"12 afirmaciones valoradas en una escala de acuerdo."},
    {label:"Límite",text:"Describe tendencias; no emite un juicio moral sobre ti."}
   ],
   sections:[
    {title:"Qué mide la dimensión Honestidad-Humildad",body:"El modelo HEXACO añade a los cinco grandes rasgos una sexta dimensión: Honestidad-Humildad. Reúne facetas como sinceridad, justicia, modestia y poco interés por obtener privilegios materiales a costa de otras personas."},
    {title:"Cómo interpretar tu puntuación",body:"Una puntuación alta describe una tendencia a evitar la manipulación y el abuso de estatus; una puntuación baja puede reflejar mayor orientación al beneficio propio o al reconocimiento. Ningún resultado decide si eres buena o mala persona: describe tendencias, no conductas inevitables."}
   ],
   faqs:[
    {q:"¿Este test dice si soy buena persona?",a:"No. La bondad es un juicio moral mucho más amplio. El test explora una dimensión concreta de personalidad relacionada con sinceridad, justicia, modestia y desapego material."},
    {q:"¿Qué relación tiene con HEXACO?",a:"Toma como referencia la dimensión Honestidad-Humildad del modelo HEXACO. Es una adaptación divulgativa y no sustituye la administración e interpretación del instrumento original."},
    {q:"¿Es un test de bondad?",a:"Solo en un sentido coloquial. La puntuación refleja cuatro facetas de personalidad y no puede resumir tu ética, tus acciones ni cómo te comportas en todas las situaciones."}
   ],
   sources:[
    {title:"The HEXACO Personality Inventory — descripción de escalas",url:"https://hexaco.org/scaledescriptions",note:"Descripción del modelo y de las facetas de Honestidad-Humildad."}
   ],
   relatedIds:["darktriad","values","bigfive"]},
 darktriad:{slug:"test-triada-oscura", seoTitle:"Test de rasgos oscuros: tríada oscura en 18 preguntas | Testia", h1:"Test de Tríada Oscura",
   metaDesc:"Test completo de rasgos oscuros: mide maquiavelismo, narcisismo y psicopatía con 18 preguntas inspiradas en el SD3. Responde gratis y ve tu perfil al momento.",
   intro:"Maquiavelismo, narcisismo y psicopatía subclínica: los tres rasgos del lado oscuro de la personalidad. ¿Cuánta sombra llevas dentro? Una experiencia divulgativa inspirada en el modelo SD3.",
   learn:["Tu nivel en los 3 rasgos oscuros","Cuál de ellos predomina en ti","Cuál de los tres pesa más en tu perfil","Carta de resultado para compartir"],
   overview:[
    {label:"Mide",text:"Maquiavelismo, narcisismo y psicopatía subclínica."},
    {label:"Formato",text:"18 afirmaciones; seis por cada rasgo evaluado."},
    {label:"Límite",text:"No detecta trastornos ni sustituye una evaluación clínica."}
   ],
   sections:[
    {title:"Qué es la Tríada Oscura",body:"La Tríada Oscura agrupa tres rasgos de personalidad: maquiavelismo, narcisismo y psicopatía subclínica. Todas las personas pueden mostrar estos rasgos en distinto grado; una puntuación no implica un trastorno ni permite hacer un diagnóstico."},
    {title:"Qué significa cada rasgo oscuro",body:"El maquiavelismo se relaciona con estrategia y manipulación interpersonal; el narcisismo, con búsqueda de admiración y sentido de superioridad; y la psicopatía subclínica, con frialdad emocional, impulsividad y menor sensibilidad al riesgo."}
   ],
   faqs:[
    {q:"¿Una puntuación alta significa que soy mala persona?",a:"No. El resultado describe tendencias de personalidad y depende del contexto. No evalúa toda tu conducta, tus valores ni tu capacidad de cambiar."},
    {q:"¿Es lo mismo que tener psicopatía o narcisismo clínico?",a:"No. El test explora rasgos subclínicos en población general. Solo un profesional cualificado puede realizar una evaluación clínica."},
    {q:"¿En qué se basa el test?",a:"Está inspirado en el modelo Short Dark Triad (SD3) de Jones y Paulhus, con ítems propios y una finalidad divulgativa."},
    {q:"¿Este test mide la empatía oscura?",a:"No directamente. La llamada empatía oscura combina capacidad empática con rasgos oscuros; aquí se evalúan únicamente los tres rasgos de la Tríada Oscura. Puedes completar también el test de empatía para comparar ambos perfiles."}
   ],
   sources:[
    {title:"Introducing the Short Dark Triad (SD3): A Brief Measure of Dark Personality Traits",url:"https://doi.org/10.1177/1073191113514105",note:"Artículo de Jones y Paulhus que presenta la medida SD3."}
   ],
   relatedIds:["honesty","empathy","bigfive"]},
 moral:{slug:"test-brujula-moral", metaDesc:"Test de tu brújula moral (Moral Foundations de Haidt): los 5 pilares que guían lo que para ti está bien o mal. Gratis online.",
   intro:"Los cinco fundamentos morales sobre los que construyes tus juicios —cuidado, justicia, lealtad, autoridad y pureza—, según la teoría de Jonathan Haidt.",
   learn:["Tu peso en los 5 fundamentos morales","Qué valor moral pesa más en ti","Tu perfil moral comparado","Carta de resultado"]},
 iq:{slug:"test-de-ci", seoTitle:"Test de CI online: 5 aptitudes y percentil | Testia", h1:"Test de CI online",
   metaDesc:"Test de CI online de 32 preguntas: aptitud verbal, numérica, lógica, abstracta y espacial. Responde gratis y sin registro.",
   intro:"Un test de inteligencia multi-aptitud inspirado en los formatos del ICAR, un instrumento abierto de investigación. Mide cinco aptitudes —verbal, numérica, lógica, abstracta y espacial— y ofrece una estimación orientativa en una escala de media 100.",
   learn:["Tu puntuación estimada en una escala de media 100","Tu percentil orientativo","Un desglose por las 5 aptitudes cognitivas","Carta de resultado para compartir"],
   overview:[
    {label:"Mide",text:"Razonamiento verbal, numérico, lógico, abstracto y espacial."},
    {label:"Formato",text:"32 problemas con un límite aproximado de 15 minutos."},
    {label:"Límite",text:"Es una estimación online; no equivale al WAIS ni a una prueba supervisada."}
   ],
   sections:[
    {title:"Qué mide este test de CI",body:"Las preguntas recorren cinco aptitudes: comprensión verbal, razonamiento numérico, lógica, pensamiento abstracto y visualización espacial. El resultado combina el rendimiento en esas áreas para ofrecer una estimación orientativa y un desglose de fortalezas."},
    {title:"Test online frente a una evaluación profesional",body:"Una prueba breve realizada en internet no controla condiciones como el tiempo, el dispositivo, la práctica previa o el entorno. Por eso el resultado sirve como orientación y entretenimiento, pero no tiene el mismo alcance que una evaluación psicométrica administrada por un profesional."}
   ],
   faqs:[
    {q:"¿Este test es equivalente al WAIS?",a:"No. Usa una escala de puntuación familiar y formatos inspirados en instrumentos de investigación, pero no es el WAIS ni sustituye una evaluación profesional estandarizada."},
    {q:"¿Qué significa el percentil?",a:"El percentil expresa qué porcentaje de la distribución de referencia queda por debajo de una puntuación. Es una estimación y puede variar si repites el test o cambian las condiciones."},
    {q:"¿Puedo mejorar mi puntuación de CI?",a:"La familiaridad con el formato, la atención y la práctica pueden mejorar el rendimiento en tareas concretas. Eso no significa necesariamente que cambie por igual toda la capacidad cognitiva general."},
    {q:"¿Cómo debo preparar el test?",a:"Hazlo de una sola vez, sin calculadora ni ayuda externa, en un dispositivo donde veas bien las figuras y con el menor número posible de interrupciones."}
   ],
   sources:[
    {title:"International Cognitive Ability Resource (ICAR)",url:"https://icar-project.com/",note:"Proyecto abierto de medidas de capacidad cognitiva en el que se inspiran los formatos de las preguntas."}
   ],
   relatedIds:["crt","ncs","bigfive"]},
 crt:{slug:"test-pensamiento-reflexivo", seoTitle:"Test de pensamiento reflexivo (CRT) online | Testia", h1:"Test de pensamiento reflexivo",
   metaDesc:"Test de pensamiento reflexivo (CRT): seis acertijos para descubrir si respondes por intuición o analizas antes de decidir. Gratis online.",
   intro:"Seis acertijos con trampa que separan a quien se fía del instinto de quien para a pensar. Mide tu estilo de pensamiento: intuitivo vs. reflexivo.",
   learn:["Si piensas de forma intuitiva o reflexiva","Cuántas trampas evitas","Tu estilo cognitivo","Resultado para compartir"]},
 ncs:{slug:"test-necesidad-de-cognicion", metaDesc:"Test de necesidad de cognición (NCS): ¿cuánto disfrutas pensando? Descubre si eres un pensador o un pragmático. Gratis.",
   intro:"Cuánto disfrutas del esfuerzo mental: ¿te atraen los problemas complejos o prefieres ir al grano? Mide tu necesidad de cognición.",
   learn:["Tu necesidad de cognición","Si eres pensador, equilibrado o pragmático","Tu relación con los retos mentales","Carta de resultado"]},
 riasec:{slug:"test-vocacional", metaDesc:"Test vocacional gratis (modelo RIASEC de Holland): descubre qué estudiar o a qué dedicarte según tus intereses. Resultado al instante.",
   intro:"El test vocacional basado en el modelo de Holland (RIASEC) del Departamento de Trabajo de EE. UU. Cruza tus intereses con áreas profesionales reales para orientarte.",
   learn:["Tu código vocacional (Holland)","Tus 3 intereses dominantes","Carreras y profesiones que encajan contigo","Carta de resultado para compartir"]},
 ei:{slug:"test-inteligencia-emocional", metaDesc:"Test de inteligencia emocional gratis: percibir, usar y gestionar emociones (propias y ajenas). Resultado al instante online.",
   intro:"Tu capacidad para percibir, usar y gestionar las emociones —las tuyas y las de los demás—, basado en el modelo de Schutte. La habilidad más infravalorada.",
   learn:["Tu nivel de inteligencia emocional","Tus puntos fuertes y débiles emocionales","Cómo gestionas tus emociones y las ajenas","Carta de resultado"]},
 empathy:{slug:"test-de-empatia", metaDesc:"Test de empatía gratis (Empathy Quotient): ¿cuánto sientes lo que sienten los demás? Descúbrelo al instante online.",
   intro:"¿Esponja emocional o muro de hormigón? Mide cuánto captas y compartes lo que sienten los demás, basado en el Empathy Quotient de Baron-Cohen.",
   learn:["Tu nivel de empatía","Si tiendes a lo racional o a lo emocional","Cómo lees a los demás","Carta de resultado para compartir"]},
 selfesteem:{slug:"test-de-autoestima", metaDesc:"Test de autoestima gratis (escala de Rosenberg), el estándar de oro con 50 años de respaldo. Resultado al instante y sin registro.",
   intro:"Tu valoración global de ti mismo, medida con la escala de Rosenberg, el estándar de oro de la autoestima con más de 50 años de investigación detrás.",
   learn:["Tu nivel de autoestima","Cómo te valoras de forma global","Una lectura honesta y constructiva","Carta de resultado"]},
 grit:{slug:"test-de-determinacion", metaDesc:"Test de determinación o 'grit' (Duckworth): mide tu pasión y perseverancia hacia metas a largo plazo. Gratis online.",
   intro:"Pasión y perseverancia hacia metas a largo plazo: el 'grit' de Angela Duckworth, mejor predictor del éxito que el talento. ¿Terminas lo que empiezas?",
   learn:["Tu nivel de determinación","Tu perseverancia y consistencia de intereses","Si terminas lo que empiezas","Carta de resultado"]},
 swls:{slug:"test-de-felicidad", metaDesc:"Test de satisfacción con la vida (escala SWLS de Diener): ¿cómo de feliz eres? 5 preguntas, validado en decenas de países.",
   intro:"Tu satisfacción global con la vida en cinco preguntas, con la escala SWLS de Diener, validada en decenas de culturas. Una foto honesta de tu bienestar.",
   learn:["Tu nivel de satisfacción vital","Cómo de cerca está tu vida de tu ideal","Una lectura empática de tu bienestar","Carta de resultado"]},
 panas:{slug:"test-estado-de-animo", seoTitle:"Test PANAS de estado de ánimo online | Testia", h1:"Test PANAS de estado de ánimo",
   metaDesc:"Cuestionario PANAS de 16 emociones: explora por separado tu afecto positivo y negativo reciente. Responde gratis y sin registro.",
   intro:"Un termómetro de tu estado emocional reciente inspirado en PANAS. En lugar de reducirlo todo a «bien» o «mal», distingue dos dimensiones que pueden coexistir: afecto positivo y afecto negativo.",
   learn:["Tu nivel de afecto positivo y negativo","Tu balance emocional reciente","Qué emociones tienen más peso ahora","Carta de resultado"],
   overview:[
    {label:"Mide",text:"Afecto positivo y afecto negativo como dimensiones separadas."},
    {label:"Formato",text:"16 emociones valoradas según cómo te has sentido últimamente."},
    {label:"Límite",text:"Es una fotografía del momento, no un diagnóstico de salud mental."}
   ],
   sections:[
    {title:"Qué mide el cuestionario PANAS",body:"El afecto positivo refleja estados como energía, interés o entusiasmo; el afecto negativo reúne experiencias como tensión, irritación o temor. No son extremos de una única escala: una persona puede puntuar alto o bajo en ambos al mismo tiempo."},
    {title:"Cómo interpretar tu estado de ánimo",body:"El resultado depende del periodo que tengas en mente al responder y puede cambiar con el descanso, el estrés o acontecimientos recientes. Resulta más útil como observación puntual o para comparar momentos que como una etiqueta permanente."}
   ],
   faqs:[
    {q:"¿PANAS diagnostica ansiedad o depresión?",a:"No. PANAS describe afecto positivo y negativo; no establece diagnósticos. Si el malestar persiste o interfiere con tu vida cotidiana, conviene hablar con un profesional sanitario."},
    {q:"¿Qué periodo debo tener en cuenta al responder?",a:"En esta adaptación debes pensar en cómo te has sentido últimamente. Usa el mismo marco temporal para todas las respuestas si quieres que el perfil sea coherente."},
    {q:"¿Puedo tener afecto positivo y negativo altos a la vez?",a:"Sí. Son dimensiones distintas: por ejemplo, una etapa exigente puede combinar entusiasmo y energía con nervios o tensión."}
   ],
   sources:[
    {title:"Development and validation of brief measures of positive and negative affect: the PANAS scales",url:"https://doi.org/10.1037/0022-3514.54.6.1063",note:"Publicación original de Watson, Clark y Tellegen (1988)."}
   ],
   relatedIds:["swls","resilience","selfesteem"]},
 resilience:{slug:"test-de-resiliencia", metaDesc:"Test de resiliencia (Brief Resilience Scale): ¿cuánto aguantas y te recuperas de los golpes de la vida? Gratis online.",
   intro:"Tu capacidad de recuperarte tras la adversidad —'rebotar'— medida con la Brief Resilience Scale. Cuánto aguantas y cómo te levantas.",
   learn:["Tu nivel de resiliencia","Con qué rapidez te recuperas de un revés","Una lectura constructiva","Carta de resultado"]},
 values:{slug:"test-de-valores", metaDesc:"Test de valores personales (modelo de Schwartz): los 10 valores humanos básicos que guían tus decisiones. Gratis online.",
   intro:"Los diez valores humanos básicos que guían tus decisiones —de la autodirección al poder, de la benevolencia a la tradición—, según el modelo de Schwartz.",
   learn:["Tus valores dominantes","Qué te mueve de verdad al decidir","Tu perfil de valores comparado","Carta de resultado"]},
 maximizer:{slug:"test-maximizador", metaDesc:"Test de estilo de decisión (Maximization Scale): ¿maximizador o conformista? Descubre por qué te cuesta (o no) decidir.",
   intro:"¿Buscas siempre la mejor opción posible o te conformas con lo bueno? Tu estilo de decisión según la Maximization Scale. La ciencia explica por qué te cuesta elegir en Netflix.",
   learn:["Si eres maximizador o conformista","Tu estilo al tomar decisiones","Por qué dudas (o no) al elegir","Carta de resultado"]},
 attachment:{slug:"test-de-apego", metaDesc:"Test de estilo de apego (ECR-R): cómo te vinculas en pareja en dos ejes, ansiedad y evitación. Gratis y al instante.",
   intro:"Cómo te vinculas en pareja, en dos ejes —ansiedad y evitación—, basado en el ECR-R. Tu estilo de apego adulto: seguro, ansioso, evitativo o temeroso.",
   learn:["Tu estilo de apego adulto","Tu nivel de ansiedad y evitación","Cómo te relacionas en pareja","Carta de resultado para compartir"]},
 chronotype:{slug:"test-cronotipo", metaDesc:"Test de cronotipo (rMEQ): ¿búho o alondra? Descubre si tu cuerpo funciona mejor de día o de noche. Gratis online.",
   intro:"¿Búho o alondra? Tu cronotipo según el cuestionario rMEQ: si tu cuerpo rinde mejor de mañana o de noche, en cinco preguntas.",
   learn:["Tu cronotipo (búho o alondra)","A qué hora rindes mejor","Cómo encaja tu reloj biológico","Carta de resultado"]},
 politico:{slug:"test-cuanto-facha-eres", metaDesc:"Test político: ¿cuánto facha eres? Descubre tu posición real en el eje izquierda-derecha con 22 preguntas. Gratis, sin registro y al instante.",
   intro:"¿De izquierdas, de derechas o te lo montas a tu manera? Este test sitúa tu posición real en el eje político combinando economía y valores sociales, sin postureo ni titulares.",
   learn:["Tu posición en el eje izquierda-derecha","Tu peso económico y social","Cómo te comparas con la media","Una carta de resultado para compartir"]},
 lovelang:{slug:"test-lenguaje-del-amor", seoTitle:"Test de lenguajes del amor: descubre el tuyo | Testia", h1:"Test de lenguajes del amor",
   metaDesc:"Test de lenguajes del amor: 20 preguntas para explorar palabras, tiempo, detalles, actos de servicio y contacto físico. Sin registro.",
   intro:"¿Palabras, tiempo, regalos, actos o contacto físico? Descubre cuál es tu lenguaje del amor —cómo das y cómo necesitas recibir cariño— y por qué a veces tú y tu pareja no os entendéis.",
   learn:["Tu lenguaje del amor dominante","Cómo das y cómo necesitas recibir cariño","El desglose de los 5 lenguajes en ti","Una carta para compartir con tu pareja"],
   overview:[
    {label:"Mide",text:"Cinco preferencias comunes para expresar y recibir afecto."},
    {label:"Formato",text:"20 situaciones cotidianas, cuatro por cada preferencia."},
    {label:"Límite",text:"Es una herramienta de conversación, no una prueba clínica ni de compatibilidad."}
   ],
   sections:[
    {title:"Cuáles son los cinco lenguajes del amor",body:"El modelo distingue palabras de afirmación, tiempo de calidad, regalos o detalles, actos de servicio y contacto físico. El test compara tus preferencias para mostrar qué formas de afecto valoras más, sin asumir que solo puedas tener una."},
    {title:"Cómo usar el resultado en pareja",body:"El resultado puede servir para iniciar una conversación sobre necesidades y expectativas. No es una regla fija ni una prueba de compatibilidad: las preferencias cambian según la relación, el momento y el contexto cultural."}
   ],
   guide:{url:"/blog/lenguajes-del-amor-en-pareja",title:"Lenguajes del amor en pareja: qué dice la ciencia",text:"Los cinco lenguajes, ejemplos cotidianos y límites de la evidencia explicados sin etiquetas rígidas."},
   faqs:[
    {q:"¿Cuál es mi lenguaje primario del amor?",a:"Es la forma de afecto que obtiene mayor puntuación en tus respuestas. Puedes tener dos preferencias muy próximas y expresarlas de manera diferente a como te gusta recibirlas."},
    {q:"¿Los lenguajes del amor tienen validez clínica?",a:"No son un diagnóstico ni una evaluación clínica. El modelo es popular como herramienta de conversación sobre preferencias afectivas, pero no explica por sí solo la calidad de una relación."},
    {q:"¿Puedo tener más de un lenguaje del amor?",a:"Sí. Las cinco preferencias forman un perfil y pueden quedar muy igualadas. El contexto y la etapa de la relación también influyen."},
    {q:"¿El test mide cómo doy amor o cómo quiero recibirlo?",a:"Las preguntas se centran principalmente en lo que te hace sentir querido. Puedes expresar afecto de otra forma, por lo que el resultado es un buen punto de partida para hablarlo, no una conclusión definitiva."}
   ],
   relatedIds:["attachment","empathy","ei"]},
 redflag:{slug:"test-eres-la-red-flag", metaDesc:"Test: ¿eres tú la red flag de la relación? 20 preguntas honestas para descubrir si el patrón de tus dramas eres tú. Gratis online.",
   intro:"Siempre culpas a tus ex, ¿verdad? Este test responde la pregunta incómoda: ¿y si el denominador común de tus relaciones eres tú? Control, manipulación y huida, sin piedad.",
   learn:["Tu nivel de 'red flag' en pareja","Los patrones que repites sin darte cuenta","Una lectura honesta (y con humor)","Carta de resultado para compartir"]},
 celos:{slug:"test-de-celos", seoTitle:"Test de celos: ¿eres una persona celosa? 18 preguntas | Testia", h1:"Test de celos",
   metaDesc:"Test de celos en pareja: 18 preguntas sobre pensamientos, emociones y conductas de celos, inspirado en la escala de Pfeiffer y Wong. Gratis y sin registro.",
   intro:"¿Tus celos se quedan en un pinchazo o acaban en mirar el móvil? Este test separa los celos en pensamientos, emociones y conductas, como la escala multidimensional de Pfeiffer y Wong, para que veas qué forma toman en tu caso.",
   learn:["Tu nivel general de celos","Si tus celos son de pensamiento, de emoción o de conducta","Qué cara de los celos desgasta más una relación","Carta de resultado para compartir"],
   overview:[{label:"Mide",text:"Celos cognitivos, emocionales y conductuales en pareja."},{label:"Formato",text:"18 afirmaciones; seis por cada dimensión."},{label:"Límite",text:"No evalúa tu relación ni detecta violencia o trastornos."}],
   sections:[
    {title:"Qué tipos de celos existen",body:"La escala multidimensional de Pfeiffer y Wong distingue tres caras de los celos. Los cognitivos son las sospechas y dudas sobre la fidelidad de la pareja. Los emocionales, el malestar ante situaciones en las que aparece un posible rival. Los conductuales, lo que se hace para comprobar o controlar: revisar el móvil, preguntar, vigilar redes."},
    {title:"¿Sentir celos es malo?",body:"Sentir celos ante una amenaza concreta es una emoción común y no daña la relación por sí sola. Los estudios apuntan a que lo que más se asocia con relaciones insatisfactorias son las sospechas constantes y las conductas de vigilancia. Por eso el test separa las tres dimensiones en lugar de darte una sola cifra."}
   ],
   faqs:[
    {q:"¿Puedo hacer el test si no tengo pareja?",a:"Sí. Responde pensando en tu última relación. El resultado describe cómo sueles vivir los celos, no el estado de una relación concreta."},
    {q:"¿Qué nivel de celos es normal?",a:"Casi todo el mundo siente celos emocionales en algunas situaciones. Lo que conviene vigilar es que las sospechas sean frecuentes sin motivo o que los celos se conviertan en conductas de control."},
    {q:"¿Los celos son una prueba de amor?",a:"No necesariamente. Los celos emocionales pueden ir ligados al compromiso, pero vigilar o controlar a la pareja no demuestra cariño y suele desgastar la confianza."},
    {q:"¿Qué hago si los celos de mi pareja me hacen sentir controlado?",a:"Habla de ello y busca apoyo si lo necesitas. Si sientes miedo o control, en España el 016 atiende de forma gratuita y la llamada no aparece en la factura."}
   ],
   sources:[
    {title:"Multidimensional Jealousy",url:"https://doi.org/10.1177/026540758900600203",note:"Artículo de Pfeiffer y Wong que presenta la escala de celos cognitivos, emocionales y conductuales."},
    {title:"Measuring romantic jealousy: Validation of the multidimensional jealousy scale in Australian samples",url:"https://doi.org/10.1111/j.1742-9536.2011.00026.x",note:"Validación posterior de la escala y su estructura en tres factores."}
   ],
   relatedIds:["attachment","lovelang","redflag"]},
 dificil:{slug:"test-persona-dificil", seoTitle:"Test de persona difícil: ¿eres difícil de tratar? 21 preguntas | Testia", h1:"Test de persona difícil",
   metaDesc:"Test de persona difícil: 21 preguntas sobre los siete rasgos que complican el trato con los demás, según la investigación sobre antagonismo. Gratis.",
   intro:"¿Cuesta llevarse bien contigo? La investigación sobre antagonismo identifica siete rasgos que hacen difícil a una persona: insensibilidad, grandiosidad, agresividad, desconfianza, manipulación, dominancia y gusto por el riesgo. Descubre cuánto tienes de cada uno.",
   learn:["Tu nivel general de persona difícil","Los siete rasgos que complican el trato","Cuál de ellos pesa más en tu caso","Carta de resultado para compartir"],
   overview:[{label:"Mide",text:"Siete rasgos de antagonismo en el trato con los demás."},{label:"Formato",text:"21 afirmaciones; tres por cada rasgo."},{label:"Límite",text:"No detecta trastornos de la personalidad ni sustituye una evaluación."}],
   sections:[
    {title:"Qué es una persona difícil según la psicología",body:"En psicología de la personalidad, lo que en el día a día llamamos persona difícil se estudia como antagonismo: el polo opuesto a la amabilidad. En 2021, Sleep y su equipo analizaron cientos de preguntas de distintos cuestionarios y encontraron siete rasgos que lo componen: insensibilidad, grandiosidad, agresividad, desconfianza, manipulación, dominancia y búsqueda de riesgo."},
    {title:"Por qué no basta con una sola cifra",body:"Dos personas igual de difíciles pueden serlo por motivos muy distintos. Una desconfía de todo el mundo; otra necesita imponerse en cada conversación. Por eso el test te da un nivel general y, además, tu perfil en los siete rasgos."}
   ],
   faqs:[
    {q:"¿Es el mismo test que el Difficult Person Test viral?",a:"No. Aquel test lo publicó IDRlabs. Este usa preguntas propias inspiradas en la misma línea de investigación sobre antagonismo y en los siete rasgos que identificaron Sleep y su equipo."},
    {q:"¿Un resultado alto significa que soy mala persona?",a:"No. Describe tendencias en el trato con los demás, que cambian según el contexto y se pueden trabajar. No mide tus valores ni tu forma de actuar en cada situación."},
    {q:"¿En qué se diferencia de la tríada oscura?",a:"La tríada oscura mide tres rasgos concretos: maquiavelismo, narcisismo y psicopatía. Este test mira el trato cotidiano con siete rasgos más amplios, como la desconfianza o la dominancia."},
    {q:"¿Puedo cambiar estos rasgos?",a:"Los rasgos de personalidad son bastante estables, pero la conducta sí se puede trabajar. Saber qué rasgo te complica más el trato es un buen punto de partida."}
   ],
   sources:[
    {title:"Uncovering the structure of antagonism",url:"https://pubmed.ncbi.nlm.nih.gov/34323587/",note:"Sleep, Crowe, Carter, Lynam y Miller (2021) identifican siete rasgos que componen el antagonismo."}
   ],
   relatedIds:["darktriad","honesty","redflag"]},
 lovestyles:{slug:"test-estilos-de-amor", seoTitle:"Test de estilos de amor: descubre cómo quieres (6 estilos) | Testia", h1:"Test de estilos de amor",
   metaDesc:"Test de estilos de amor basado en la escala de Hendrick: 24 preguntas para saber si amas con pasión, amistad, cabeza, juego, intensidad o entrega. Gratis.",
   intro:"¿Te enamoras de golpe o poco a poco? ¿Con la cabeza o a todo o nada? El sociólogo John Alan Lee describió seis estilos de amor y Clyde y Susan Hendrick crearon la escala para medirlos. Descubre cuál manda en tu forma de querer.",
   learn:["Tu estilo de amor principal","Cuánto tienes de cada uno de los seis estilos","Qué dice cada estilo de tu forma de querer","Carta de resultado para compartir"],
   overview:[{label:"Mide",text:"Seis estilos de amor: pasión, juego, amistad, sentido práctico, intensidad y entrega."},{label:"Formato",text:"24 afirmaciones; cuatro por cada estilo."},{label:"Límite",text:"Describe actitudes ante el amor, no evalúa tu relación."}],
   sections:[
    {title:"Cuáles son los seis estilos de amor",body:"Eros es el amor apasionado y de flechazo. Ludus, el amor como juego, sin ataduras. Storge, el amor que nace de la amistad. Pragma, el amor con cabeza, que busca encaje en valores y planes. Manía, el amor intenso y posesivo. Ágape, el amor entregado y altruista."},
    {title:"¿Se puede tener más de un estilo?",body:"Sí, y es lo habitual. Casi todo el mundo combina varios estilos con distinta intensidad, y la mezcla puede cambiar con la edad o según la relación. Por eso el resultado te da un estilo principal y tu perfil en los seis."}
   ],
   faqs:[
    {q:"¿Puedo hacer el test si no tengo pareja?",a:"Sí. Responde pensando en tu última relación o en cómo sueles vivir el amor. El resultado describe tus actitudes, no una relación concreta."},
    {q:"¿Hay un estilo de amor mejor que otro?",a:"No hay uno correcto, pero los estudios asocian más la pasión y la entrega con satisfacción en pareja, y más el juego y la intensidad con relaciones problemáticas."},
    {q:"¿Qué diferencia hay con los lenguajes del amor?",a:"Los lenguajes del amor hablan de cómo expresas y recibes cariño. Los estilos de amor hablan de qué buscas en una relación y cómo la vives."},
    {q:"¿En qué se basa el test?",a:"En la teoría de John Alan Lee y en la escala de actitudes hacia el amor de Clyde y Susan Hendrick, con preguntas propias y una finalidad divulgativa."}
   ],
   sources:[
    {title:"A theory and method of love",url:"https://doi.org/10.1037/0022-3514.50.2.392",note:"Hendrick y Hendrick (1986) presentan la escala de actitudes hacia el amor basada en los estilos de Lee."},
    {title:"The Love Attitudes Scale: Short Form",url:"https://doi.org/10.1177/0265407598152001",note:"Versión breve de 24 ítems, cuatro por estilo (Hendrick, Hendrick y Dicke, 1998)."}
   ],
   relatedIds:["lovelang","attachment","celos"]},
};

/* Mapa de profesiones para el test vocacional (RIASEC) */
window.RIASEC_CAREERS = {
 R:["Ingeniería","Mecánica","Arquitectura técnica","Deporte","Oficios técnicos"],
 I:["Ciencia e investigación","Medicina","Análisis de datos","Ingeniería de software","Biología"],
 A:["Diseño","Comunicación audiovisual","Música","Escritura","Arquitectura"],
 S:["Educación","Psicología","Enfermería","Trabajo social","Recursos humanos"],
 E:["Empresa y dirección","Marketing","Ventas","Emprendimiento","Derecho"],
 C:["Administración y finanzas","Contabilidad","Logística","Análisis financiero","Gestión de datos"]
};

/* ===== Landings completas (octubre 2026) =====
   Mismo patrón que la del test de CI: qué das exactamente, en qué se basa,
   qué límites tiene y preguntas frecuentes reales. Todas las fuentes se han
   comprobado contra doi.org. Se aplica encima de SEO_CONTENT. */
(function(){
const S=window.SEO_CONTENT, put=(id,o)=>{S[id]=Object.assign(S[id]||{},o);};
const src=(title,doi,note)=>({title,url:doi.startsWith('http')?doi:`https://doi.org/${doi}`,note});

put('memoria',{slug:"test-de-memoria",seoTitle:"Test de memoria online: ¿cuántos dígitos recuerdas? | Testia",h1:"Test de memoria",
 metaDesc:"Test de memoria online: recuerda secuencias de números en orden directo e inverso y reconoce palabras. Descubre tu amplitud de memoria. Gratis y sin registro.",
 intro:"¿Cuántos números puedes retener de un vistazo? Este test mide tu memoria inmediata con tres pruebas clásicas de la psicología: dígitos en orden directo, dígitos al revés y reconocimiento de palabras tras una distracción.",
 learn:["Cuántos dígitos retienes en orden directo e inverso","Si reconoces las palabras tras una distracción","Una puntuación de memoria de 0 a 100","Carta de resultado con tu cifra"],
 overview:[{label:"Mide",text:"Memoria inmediata y memoria de trabajo con dígitos y palabras."},{label:"Formato",text:"19 pruebas: escribir secuencias y reconocer palabras; unos 5 minutos."},{label:"Límite",text:"No evalúa la memoria a largo plazo ni detecta problemas de memoria."}],
 sections:[
  {title:"Qué es la amplitud de memoria",body:"La amplitud de memoria es la cantidad de elementos que puedes retener justo después de verlos. En 1956, George Miller describió que la mayoría de los adultos retiene entre cinco y nueve elementos sueltos. Revisiones posteriores, como la de Nelson Cowan, matizan que sin agrupar la información la capacidad real ronda cuatro unidades: por eso agrupar los números de dos en dos o de tres en tres ayuda tanto."},
  {title:"Por qué hay dígitos al revés",body:"Repetir una secuencia en el mismo orden mide sobre todo cuánto puedes guardar. Repetirla al revés exige guardar y operar a la vez, y por eso se usa para estudiar la memoria de trabajo, la que sostienes mientras razonas. Lo habitual es recordar uno o dos dígitos menos al revés que en orden directo."}],
 faqs:[
  {q:"¿Cuántos dígitos recuerda una persona normal?",a:"En orden directo, la mayoría de los adultos retiene entre cinco y nueve. Al revés suele ser uno o dos menos. Este test te da tu amplitud en las dos versiones."},
  {q:"¿Es fiable un test de memoria online?",a:"Da una estimación orientativa. El cansancio, las distracciones o el dispositivo influyen, así que conviene repetirlo en otro momento si el resultado te sorprende."},
  {q:"¿Se puede mejorar la memoria?",a:"Las estrategias, como agrupar números o crear asociaciones, mejoran mucho el rendimiento en tareas concretas. Dormir bien y reducir distracciones también ayuda."},
  {q:"¿Sirve para detectar problemas de memoria?",a:"No. Es una prueba divulgativa. Si los olvidos te preocupan o afectan a tu día a día, consulta con un profesional sanitario."}],
 sources:[src("The magical number seven, plus or minus two","10.1037/h0043158","Miller (1956): el estudio clásico sobre los límites de la memoria inmediata."),src("The magical number 4 in short-term memory","10.1017/S0140525X01003922","Cowan (2001): revisión que sitúa la capacidad real en torno a cuatro unidades.")],
 relatedIds:["atencion","iq","ncs"]});

put('atencion',{slug:"test-de-atencion",seoTitle:"Test de atención y concentración online: efecto Stroop | Testia",h1:"Test de atención y concentración",
 metaDesc:"Test de atención y concentración online: colores que engañan, letras escondidas y símbolos distintos contra el reloj. Mide tu índice de atención. Gratis.",
 intro:"¿Cuánto aguanta tu foco? Tres pruebas contra el reloj: decir el color de una palabra que nombra otro color, contar letras entre letras parecidas y encontrar el símbolo que no encaja.",
 learn:["Tu índice de atención de 0 a 100","Cuánto te frena el efecto Stroop","Tus aciertos en cada prueba y tu tiempo","Carta de resultado con tu cifra"],
 overview:[{label:"Mide",text:"Atención selectiva, búsqueda visual y control de la interferencia."},{label:"Formato",text:"20 pruebas con un máximo de 4 minutos."},{label:"Límite",text:"No diagnostica TDAH ni ningún otro problema de atención."}],
 sections:[
  {title:"Qué es el efecto Stroop",body:"En 1935, John Ridley Stroop observó que se tarda más en decir el color de la tinta cuando la palabra nombra otro color, por ejemplo «ROJO» escrito en azul. Leer es tan automático que hay que frenarlo para responder bien. Es una de las tareas más estudiadas de la psicología para medir el control de la atención."},
  {title:"Cómo se calcula tu índice",body:"El índice combina aciertos y velocidad. La mayor parte sale de la proporción de respuestas correctas y una parte menor premia terminar antes con buena precisión. Además, el informe compara cuánto tardas en las palabras que engañan frente a las que no: esa diferencia es tu efecto Stroop."}],
 faqs:[
  {q:"¿Este test detecta el TDAH?",a:"No. Mide tu rendimiento en tres tareas de atención en un momento concreto. El TDAH solo puede valorarlo un profesional con una evaluación completa."},
  {q:"¿Qué es una buena puntuación?",a:"El índice va de 0 a 100 y depende de tus aciertos y tu velocidad. No es una comparación con la población: sirve para ver tu rendimiento y compararte contigo mismo si repites el test."},
  {q:"¿Por qué cuenta el tiempo?",a:"Porque mantener la atención es hacerlo bien y sin perder ritmo. Aun así, pesan mucho más los aciertos que la velocidad."},
  {q:"¿Puedo repetirlo?",a:"Sí. Cada vez se generan pruebas nuevas, así que no te sirve memorizar las respuestas."}],
 sources:[src("Studies of interference in serial verbal reactions","10.1037/h0054651","Stroop (1935): el experimento original del efecto Stroop."),src("Half a century of research on the Stroop effect","10.1037/0033-2909.109.2.163","MacLeod (1991): revisión de cincuenta años de investigación."),src("A feature-integration theory of attention","10.1016/0010-0285(80)90005-5","Treisman y Gelade (1980): base teórica de las tareas de búsqueda visual.")],
 relatedIds:["memoria","iq","crt"]});

put('edadmental',{slug:"test-edad-mental",seoTitle:"Test de edad mental: ¿cuántos años tiene tu mente? | Testia",h1:"Test de edad mental",
 metaDesc:"Test de edad mental: 16 preguntas sobre ocio, tecnología, responsabilidades y emociones para descubrir cuántos años tiene tu mente. Gratis y sin registro.",
 intro:"¿Tu cabeza va por delante o por detrás de tu DNI? Responde 16 preguntas sobre cómo te diviertes, cómo usas la tecnología, cómo te organizas y cómo gestionas las emociones, y descubre cuántos años tiene tu mente.",
 learn:["Tu edad mental en años","Cuántos años tiene tu mente en cuatro áreas","Qué áreas te hacen más joven o más mayor","Carta de resultado con tu cifra"],
 overview:[{label:"Mide",text:"Hábitos y actitudes que suelen asociarse a distintas etapas de la vida."},{label:"Formato",text:"16 preguntas de elección; unos 3 minutos."},{label:"Límite",text:"Es entretenimiento: no mide madurez psicológica ni capacidad mental."}],
 sections:[
  {title:"Qué significa edad mental en este test",body:"El término lo popularizaron Alfred Binet y Théodore Simon a principios del siglo XX para comparar el rendimiento de los niños con el esperado para su edad. Aquí se usa en sentido divulgativo: cada respuesta se asocia a la edad en la que ese hábito o actitud es más típico, y la media de tus respuestas da tu edad mental."},
  {title:"La edad que sentimos",body:"La psicología estudia algo parecido con el nombre de edad subjetiva: los años que una persona siente que tiene. Rubin y Berntsen encontraron que, a partir de los cuarenta, la mayoría de la gente se siente alrededor de un 20 % más joven de lo que es. Este test no mide eso exactamente, pero juega con la misma idea."}],
 faqs:[
  {q:"¿Es un test científico?",a:"No. Es un test de entretenimiento inspirado en la investigación sobre edad subjetiva. Sirve para pensar en tus hábitos, no para medir tu madurez."},
  {q:"¿Puede salirme una edad mayor que la mía?",a:"Sí. Si te organizas mucho, te gustan los planes tranquilos y relativizas los problemas, tu edad mental puede superar a la de tu DNI."},
  {q:"¿Qué edad mental es mejor?",a:"Ninguna. Una edad mental joven suele ir con espontaneidad y energía; una mayor, con calma y organización. Cada perfil tiene sus ventajas."},
  {q:"¿Por qué cambia si lo repito?",a:"Porque tus respuestas dependen del momento. Es normal que el resultado se mueva algunos años de una vez a otra."}],
 sources:[src("People over forty feel 20% younger than their age: Subjective age across the lifespan","10.3758/BF03193996","Rubin y Berntsen (2006): investigación sobre la edad que sentimos frente a la que tenemos.")],
 relatedIds:["memoria","bigfive","chronotype"]});

put('politico',{
 learn:["Tu posición en el eje izquierda-derecha","Tu peso económico y social","Si tu perfil es cruzado entre economía y valores","Una carta de resultado para compartir"],
 overview:[{label:"Mide",text:"Tu posición política en dos ejes: económico y social."},{label:"Formato",text:"22 afirmaciones de acuerdo o desacuerdo; unos 3 minutos."},{label:"Límite",text:"No predice tu voto ni te encaja en ningún partido."}],
 sections:[
  {title:"Qué mide el test de facha",body:"Combina dos ejes. El económico va de más Estado y reparto a más mercado y menos impuestos. El social va del progresismo al conservadurismo en temas como inmigración, tradición o seguridad. Se inspira en la escala de conservadurismo de Wilson y Patterson y en los tests políticos de dos ejes."},
  {title:"Cómo interpretar tu resultado",body:"La puntuación global va de 0, la izquierda, a 100, la derecha. El mismo número puede esconder perfiles muy distintos: alguien de izquierdas en economía y conservador en lo social puede salir de centro. Por eso el informe separa los dos ejes y te dice si tu perfil es cruzado."}],
 faqs:[
  {q:"¿Qué significa salir de centro?",a:"Puede que tus posiciones sean moderadas en todo o que se compensen: izquierda en un eje y derecha en el otro. La lectura por ejes lo distingue."},
  {q:"¿Puedo ser de izquierdas en economía y conservador en lo social?",a:"Sí, es un perfil bastante común. Se llama perfil cruzado y no encaja en el eje único izquierda-derecha."},
  {q:"¿El resultado me dice a quién votar?",a:"No. Describe tus respuestas sobre temas concretos, no tu afinidad con partidos ni candidatos."},
  {q:"¿Es un test en serio?",a:"Los nombres de los resultados tienen humor, pero las afirmaciones tratan debates políticos reales y el cálculo se basa en escalas publicadas."}],
 sources:[src("A New Measure of Conservatism","10.1111/j.2044-8260.1968.tb00568.x","Wilson y Patterson (1968): escala de conservadurismo en la que se inspira el test.")]});

put('redflag',{
 overview:[{label:"Mide",text:"Conductas en pareja que suelen generar conflicto: control, celos, orgullo, desaparecer."},{label:"Formato",text:"20 afirmaciones; unos 3 minutos."},{label:"Límite",text:"Es una escala propia y en clave de humor; no evalúa relaciones ni detecta maltrato."}],
 sections:[
  {title:"Qué es una red flag",body:"Una red flag es una señal de alarma en una relación: una conducta que avisa de problemas futuros. Este test le da la vuelta a la pregunta habitual y la apunta hacia ti: celos, control, orgullo, desaparecer en los conflictos o no reconocer errores."},
  {title:"Cómo leer tu resultado",body:"Un resultado alto no significa que seas mala pareja: señala patrones que suelen generar conflicto y que se pueden cambiar. Fíjate en qué afirmaciones te has reconocido más, porque ahí está la parte útil del test."}],
 faqs:[
  {q:"¿Es un test científico?",a:"Es una escala propia con humor, pensada para reflexionar. Recoge conductas que la investigación sobre pareja relaciona con conflicto, como los celos y el control, pero no es un instrumento validado."},
  {q:"¿Qué hago si me reconozco en muchas?",a:"Elige una conducta concreta y háblala con tu pareja. Si los conflictos se repiten, la terapia de pareja o individual ayuda."},
  {q:"¿Y si la red flag es mi pareja?",a:"Si sientes miedo, control o aislamiento, busca apoyo. En España, el 016 atiende de forma gratuita y la llamada no aparece en la factura."},
  {q:"¿Puedo hacerlo si no tengo pareja?",a:"Sí. Responde pensando en tus relaciones anteriores."}]});

put('swls',{
 overview:[{label:"Mide",text:"Tu satisfacción global con la vida, según tu propio criterio."},{label:"Formato",text:"5 afirmaciones de la escala de Diener; 1 minuto."},{label:"Límite",text:"No mide tu estado de ánimo de hoy ni detecta depresión."}],
 sections:[
  {title:"Qué es la escala de satisfacción con la vida",body:"La creó Ed Diener con su equipo en 1985 y es una de las medidas de bienestar más usadas en investigación. Son cinco afirmaciones con las que valoras tu vida en conjunto según tus propios criterios, no según los de nadie más."},
  {title:"Satisfacción y estado de ánimo no son lo mismo",body:"La satisfacción vital es un juicio sobre tu vida en conjunto. El estado de ánimo es lo que sientes estos días. Puedes estar en una mala semana y valorar bien tu vida, o al revés. Para medir el ánimo, usa el test de estado de ánimo."}],
 faqs:[
  {q:"¿Qué mide exactamente?",a:"Cuánto se acerca tu vida a lo que consideras ideal y si estás satisfecho con ella en conjunto."},
  {q:"¿Bastan cinco preguntas?",a:"Para un juicio global, sí. La escala se diseñó corta a propósito y funciona bien en estudios con miles de personas."},
  {q:"¿Puede cambiar mi resultado?",a:"Sí. La satisfacción vital es bastante estable, pero cambia con lo que pasa en tu vida."},
  {q:"¿Qué hago si sale muy bajo?",a:"Habla con alguien de confianza y, si el malestar dura, con un profesional. Si tienes pensamientos de hacerte daño, en España el 024 atiende las 24 horas."}],
 sources:[src("The Satisfaction With Life Scale","10.1207/s15327752jpa4901_13","Diener, Emmons, Larsen y Griffin (1985): artículo original de la escala.")]});

put('attachment',{
 overview:[{label:"Mide",text:"Ansiedad y evitación en las relaciones de pareja."},{label:"Formato",text:"24 afirmaciones; unos 4 minutos."},{label:"Límite",text:"Describe tendencias; no diagnostica ni etiqueta tu relación."}],
 sections:[
  {title:"Los cuatro estilos de apego adulto",body:"Combinando dos dimensiones salen cuatro estilos. Seguro: poca ansiedad y poca evitación. Ansioso: miedo al abandono y necesidad de confirmación. Evitativo: incomodidad con la intimidad. Temeroso: las dos cosas a la vez. El test se inspira en el cuestionario ECR-R de Fraley, Waller y Brennan."},
  {title:"Por qué dos ejes y no una etiqueta",body:"Dos personas con el mismo estilo pueden estar muy lejos entre sí. Por eso el resultado te da tu puntuación en ansiedad y en evitación, además del estilo que resulta de combinarlas."}],
 faqs:[
  {q:"¿Puede cambiar el estilo de apego?",a:"Sí. Es bastante estable, pero cambia con relaciones seguras, experiencias nuevas o terapia."},
  {q:"¿Es lo mismo que el apego en la infancia?",a:"No exactamente. El apego adulto se inspira en esa teoría, pero mide cómo vives hoy tus relaciones de pareja."},
  {q:"¿Cuál es el mejor estilo?",a:"El seguro se asocia a relaciones más satisfactorias, pero ningún estilo es una condena: todos se pueden trabajar."},
  {q:"¿Puedo hacerlo sin pareja?",a:"Sí. Responde pensando en cómo te sueles sentir en tus relaciones."}],
 sources:[src("An item response theory analysis of self-report measures of adult attachment","10.1037/0022-3514.78.2.350","Fraley, Waller y Brennan (2000): origen del cuestionario ECR-R.")]});

put('riasec',{
 overview:[{label:"Mide",text:"Tus intereses en seis áreas: realista, investigadora, artística, social, emprendedora y convencional."},{label:"Formato",text:"48 actividades que valoras; unos 6 minutos."},{label:"Límite",text:"Mide intereses, no aptitudes; orienta pero no decide por ti."}],
 sections:[
  {title:"Qué es el modelo RIASEC de Holland",body:"John Holland propuso que los intereses profesionales se agrupan en seis tipos y que las personas se sienten más satisfechas en entornos que encajan con su combinación. Es el modelo en el que se basan muchos servicios públicos de orientación, como el O*NET Interest Profiler del Departamento de Trabajo de Estados Unidos."},
  {title:"Cómo leer tu código de tres letras",body:"Tu código son las iniciales de tus tres intereses más altos, en orden. Por ejemplo, SAI significa social, artístico e investigador. Las profesiones que comparten tus dos primeras letras suelen ser las que más encajan."}],
 faqs:[
  {q:"¿Qué es el código Holland?",a:"Las tres letras de tus intereses dominantes dentro de los seis tipos del modelo RIASEC."},
  {q:"¿Me dice qué carrera estudiar?",a:"Te da pistas sobre qué entornos te pueden gustar. Conviene combinarlo con tus aptitudes, tus valores y las salidas reales."},
  {q:"¿Intereses y aptitudes son lo mismo?",a:"No. Puedes interesarte por algo en lo que todavía no eres bueno, y al revés. Este test mide lo primero."},
  {q:"¿Cambian los intereses con la edad?",a:"Son bastante estables desde la adolescencia tardía, pero pueden cambiar con la experiencia."}],
 sources:[src("The development, evolution, and status of Holland's theory of vocational personalities","10.1037/a0018213","Nauta (2010): revisión de la teoría de Holland."),src("O*NET Interest Profiler","https://www.onetcenter.org/IP.html","Herramienta pública de intereses RIASEC en la que se inspiran las actividades.")]});

put('bigfive',{
 learn:["Tu puntuación en los 5 grandes rasgos","Qué rasgo domina tu forma de ser","Tu nivel en cada dimensión, de bajo a alto","Una carta de resultado lista para compartir"],
 overview:[{label:"Mide",text:"Apertura, responsabilidad, extraversión, amabilidad y estabilidad emocional."},{label:"Formato",text:"50 afirmaciones del banco público IPIP; unos 7 minutos."},{label:"Límite",text:"Describe rasgos; no clasifica en tipos ni detecta trastornos."}],
 sections:[
  {title:"Qué son los cinco grandes rasgos",body:"El modelo de los cinco grandes resume la personalidad en cinco dimensiones que aparecen una y otra vez en estudios de distintos países. Este test usa los marcadores de Lewis Goldberg del banco público IPIP, una de las formas más usadas de medirlos en investigación."},
  {title:"Por qué no es un test de tipos",body:"A diferencia del MBTI o las 16 personalidades, los cinco grandes no te meten en una caja. Cada rasgo es una escala y casi todo el mundo está en algún punto intermedio. Por eso el resultado es un perfil, no una etiqueta de cuatro letras."}],
 faqs:[
  {q:"¿En qué se diferencia del MBTI o de 16 personalidades?",a:"Esos tests clasifican en tipos. Los cinco grandes miden dimensiones continuas y son el modelo con más respaldo en la investigación."},
  {q:"¿La personalidad cambia con los años?",a:"Es bastante estable, pero cambia poco a poco: con la edad suelen subir la responsabilidad, la amabilidad y la estabilidad emocional."},
  {q:"¿Qué significa puntuar bajo en estabilidad emocional?",a:"Que tiendes a sentir con más intensidad la preocupación, el estrés o la tristeza. No es un diagnóstico."},
  {q:"¿Es fiable?",a:"Los marcadores IPIP tienen buena fiabilidad en investigación. Como todo autoinforme, depende de que respondas con sinceridad."}],
 sources:[src("The development of markers for the Big-Five factor structure","10.1037/1040-3590.4.1.26","Goldberg (1992): origen de los marcadores de los cinco grandes."),src("International Personality Item Pool (IPIP)","https://ipip.ori.org/","Banco público de ítems de personalidad del que salen las afirmaciones.")],
 guide:{url:"/blog/cinco-grandes-rasgos-personalidad",title:"Guía de los cinco grandes",text:"Personalidad"}});

put('empathy',{
 overview:[{label:"Mide",text:"Tu empatía en el trato diario: entender y sentir lo que viven los demás."},{label:"Formato",text:"12 afirmaciones; unos 2 minutos."},{label:"Límite",text:"No diagnostica autismo ni ningún otro trastorno."}],
 sections:[
  {title:"Qué es la empatía en psicología",body:"Se suelen distinguir dos partes. La empatía cognitiva es entender lo que piensa o siente otra persona. La emocional es contagiarte de lo que siente. Se pueden tener en distinta medida: alguien puede entender muy bien a los demás sin implicarse emocionalmente."},
  {title:"En qué se basa el test",body:"Se inspira en el cociente de empatía de Simon Baron-Cohen y Sally Wheelwright, un cuestionario muy usado para medir la empatía en adultos. Las afirmaciones son propias y el resultado es orientativo."}],
 faqs:[
  {q:"¿Se puede tener demasiada empatía?",a:"Absorber el malestar ajeno sin límites puede agotar. Lo sano suele ser comprender y acompañar sin cargar con todo."},
  {q:"¿Empatía y simpatía son lo mismo?",a:"No. La simpatía es sentir pena o cariño por alguien; la empatía es ponerte en su lugar."},
  {q:"¿Se puede entrenar la empatía?",a:"Sí. Escuchar sin interrumpir, preguntar cómo está la otra persona y leer ficción son prácticas que ayudan."},
  {q:"¿Un resultado bajo significa autismo?",a:"No. Este test no diagnostica nada. Solo un profesional puede valorar el autismo con una evaluación completa."}],
 sources:[src("The Empathy Quotient","10.1023/B:JADD.0000022607.19833.00","Baron-Cohen y Wheelwright (2004): cuestionario en el que se inspira el test.")]});

put('values',{
 learn:["Tus valores dominantes","Qué te mueve de verdad al decidir","Qué valores entran en tensión en ti","Carta de resultado"],
 overview:[{label:"Mide",text:"Los diez valores básicos de la teoría de Shalom Schwartz."},{label:"Formato",text:"20 retratos de personas con los que te comparas; unos 3 minutos."},{label:"Límite",text:"Ordena tus prioridades; no dice si tus valores son buenos o malos."}],
 sections:[
  {title:"La teoría de los valores de Schwartz",body:"Shalom Schwartz identificó diez valores que aparecen en culturas de todo el mundo, como la autodirección, el logro, la seguridad o la benevolencia. Se ordenan en un círculo: los que están cerca son compatibles y los opuestos entran en tensión, como la aventura frente a la seguridad."},
  {title:"Cómo leer tu perfil",body:"Lo importante no es cuánto valoras cada cosa, sino el orden. Tus valores más altos son los que pesan cuando tienes que elegir. Si dos valores opuestos te salen altos, es probable que vivas esa tensión en tus decisiones."}],
 faqs:[
  {q:"¿Qué son los valores personales?",a:"Objetivos generales que guían lo que haces y cómo juzgas lo que hacen los demás, como la libertad, la seguridad o ayudar a otros."},
  {q:"¿Por qué hay valores opuestos?",a:"Porque perseguir uno dificulta otro: buscar emociones nuevas choca con buscar estabilidad, por ejemplo."},
  {q:"¿Los valores cambian con el tiempo?",a:"Son bastante estables, pero cambian con la edad y las etapas: con los años suelen ganar peso la seguridad y la tradición."},
  {q:"¿Para qué sirve conocerlos?",a:"Para entender por qué algunas decisiones te cuestan y elegir trabajos o relaciones que encajen con lo que te importa."}],
 sources:[src("An Overview of the Schwartz Theory of Basic Values","10.9707/2307-0919.1116","Schwartz (2012): resumen de la teoría de los diez valores básicos.")]});

put('maximizer',{
 overview:[{label:"Mide",text:"Si buscas la mejor opción posible o te conformas con una suficiente."},{label:"Formato",text:"6 afirmaciones de la versión breve de la escala; 1 minuto."},{label:"Límite",text:"Describe un estilo de decisión, no tu inteligencia ni tu éxito."}],
 sections:[
  {title:"Maximizar o conformarse",body:"El economista Herbert Simon llamó satisficing a elegir la primera opción suficientemente buena. Barry Schwartz y su equipo estudiaron el estilo contrario, maximizar: comparar todas las opciones hasta dar con la mejor."},
  {title:"Qué dice la investigación",body:"En los estudios de Schwartz, quienes más maximizan declaran más arrepentimiento y menos satisfacción con sus elecciones, aunque a veces consigan mejores resultados objetivos. Saber en qué decisiones merece la pena maximizar ahorra mucho desgaste."}],
 faqs:[
  {q:"¿Es malo ser maximizador?",a:"No necesariamente. Ayuda en decisiones importantes, pero en las pequeñas suele costar tiempo y satisfacción."},
  {q:"¿Por qué me cuesta tanto decidir?",a:"Si maximizas, cada opción descartada se siente como una pérdida. Ponerte un límite de opciones o de tiempo ayuda."},
  {q:"¿Se puede cambiar?",a:"Sí. Elegir conscientemente en qué temas te conformas con lo suficiente reduce mucho el agobio."},
  {q:"¿Qué es un satisfacedor?",a:"Alguien que elige la primera opción que cumple sus criterios y no sigue buscando."}],
 sources:[src("Maximizing versus satisficing: Happiness is a matter of choice","10.1037/0022-3514.83.5.1178","Schwartz y otros (2002): estudios originales sobre maximizar y conformarse.")]});

put('moral',{
 learn:["Tu peso en los 5 fundamentos morales","Qué valor moral pesa más en ti","Cómo se ordenan tus cinco fundamentos","Carta de resultado"],
 overview:[{label:"Mide",text:"Cinco fundamentos morales: cuidado, justicia, lealtad, autoridad y pureza."},{label:"Formato",text:"15 afirmaciones; unos 3 minutos."},{label:"Límite",text:"No mide si eres buena persona ni tu ideología."}],
 sections:[
  {title:"Qué es la teoría de los fundamentos morales",body:"Jonathan Haidt, Jesse Graham y su equipo propusieron que nuestros juicios morales se apoyan en varios fundamentos intuitivos: cuidar a los demás, la justicia, la lealtad al grupo, el respeto a la autoridad y la pureza. Todo el mundo los tiene, pero no con el mismo peso."},
  {title:"Por qué discutimos sobre lo moral",body:"Dos personas pueden estar en desacuerdo porque dan importancia a fundamentos distintos. En la investigación de Graham y otros, las personas progresistas pesan más el cuidado y la justicia, y las conservadoras reparten el peso más entre los cinco."}],
 faqs:[
  {q:"¿Qué fundamento es el más importante?",a:"Ninguno es superior. El test muestra cuál pesa más en tus juicios."},
  {q:"¿Tiene relación con la ideología?",a:"Sí, en parte. Los estudios encuentran diferencias entre progresistas y conservadores, aunque hay mucha variación individual."},
  {q:"¿Por qué no aparece la libertad?",a:"Algunas versiones de la teoría añaden la libertad como sexto fundamento. Este test usa los cinco originales."},
  {q:"¿Es un test de ética?",a:"No. Describe tus intuiciones morales, no si actúas bien o mal."}],
 sources:[src("Mapping the moral domain","10.1037/a0021847","Graham y otros (2011): desarrollo del cuestionario de fundamentos morales.")]});

put('grit',{
 intro:"Explora tu perseverancia y la consistencia de tus intereses ante metas a largo plazo, dos componentes del grit estudiado en psicología. ¿Cómo respondes cuando un proyecto se complica?",
 overview:[{label:"Mide",text:"Perseverancia del esfuerzo y consistencia de intereses."},{label:"Formato",text:"10 afirmaciones; unos 2 minutos."},{label:"Límite",text:"No predice el éxito ni mide talento."}],
 sections:[
  {title:"Qué es el grit",body:"Angela Duckworth y su equipo definieron el grit como la combinación de perseverancia y constancia en metas a largo plazo. Se mide con autoinformes como la escala original de 12 preguntas o la versión breve de 8."},
  {title:"Qué dice la investigación",body:"Las asociaciones del grit con el rendimiento existen, pero son modestas y se solapan con la responsabilidad. La perseverancia suele aportar más información que la constancia de intereses. Persistir sirve cuando la meta sigue valiendo la pena."}],
 faqs:[
  {q:"¿El grit es lo mismo que la fuerza de voluntad?",a:"No. La fuerza de voluntad se refiere a resistir impulsos en el momento; el grit, a sostener objetivos durante años."},
  {q:"¿Se puede aumentar?",a:"La perseverancia mejora con metas con sentido, hábitos y apoyo. La personalidad cambia despacio, pero la conducta sí se entrena."},
  {q:"¿Abandonar una meta es tener poco grit?",a:"No necesariamente. Dejar algo que ya no tiene sentido puede ser la decisión acertada."},
  {q:"¿Predice el éxito?",a:"No a nivel individual. Los estudios encuentran asociaciones medias, no garantías."}],
 sources:[src("Grit: Perseverance and passion for long-term goals","10.1037/0022-3514.92.6.1087","Duckworth y otros (2007): estudio original del grit."),src("Development and Validation of the Short Grit Scale (Grit–S)","10.1080/00223890802634290","Duckworth y Quinn (2009): versión breve de la escala.")]});

put('tipi',{
 overview:[{label:"Mide",text:"Los cinco grandes rasgos con dos frases por rasgo."},{label:"Formato",text:"10 afirmaciones; 1 minuto."},{label:"Límite",text:"Es una foto rápida: menos precisa que un inventario largo."}],
 sections:[
  {title:"Qué es el TIPI",body:"El Ten-Item Personality Inventory lo publicaron Gosling, Rentfrow y Swann en 2003 para medir los cinco grandes rasgos cuando no hay tiempo para un cuestionario largo. Usa dos frases por rasgo, una en cada sentido."},
  {title:"Cuándo usar un test corto o uno largo",body:"El corto sirve para hacerte una idea general en un minuto. Si quieres un perfil más preciso de cada rasgo, el test de personalidad completo de 50 preguntas da una medida más fiable."}],
 faqs:[
  {q:"¿Es fiable un test de diez preguntas?",a:"Para una visión general, sí: sus autores encontraron buena coincidencia con cuestionarios más largos. Para detalles finos, mejor el test completo."},
  {q:"¿Qué diferencia hay con el test completo?",a:"Mide lo mismo, los cinco grandes, pero con menos precisión por rasgo."},
  {q:"¿Por qué solo dos frases por rasgo?",a:"Para que sea muy rápido. Cada rasgo tiene una frase a favor y otra en contra para compensar respuestas automáticas."},
  {q:"¿Puedo repetirlo?",a:"Sí. Es normal que el resultado varíe un poco de una vez a otra."}],
 sources:[src("A very brief measure of the Big-Five personality domains","10.1016/S0092-6566(03)00046-1","Gosling, Rentfrow y Swann (2003): artículo original del TIPI.")]});

put('ei',{
 overview:[{label:"Mide",text:"Percepción, uso y gestión de las emociones propias y ajenas."},{label:"Formato",text:"16 afirmaciones; unos 3 minutos."},{label:"Límite",text:"Es un autoinforme: mide cómo te ves, no tu habilidad medida con tareas."}],
 sections:[
  {title:"Qué es la inteligencia emocional",body:"Peter Salovey y John Mayer la definieron como la capacidad de percibir, comprender y gestionar las emociones. Nicola Schutte y su equipo crearon en 1998 una escala basada en ese modelo, en la que se inspira este test."},
  {title:"Habilidad o forma de verte",body:"Hay dos maneras de medirla: con tareas que tienen respuestas correctas o con autoinformes sobre cómo te ves. Este test es del segundo tipo, así que refleja tu percepción de tus propias habilidades emocionales."}],
 faqs:[
  {q:"¿Se puede mejorar la inteligencia emocional?",a:"Sí. Ponerle nombre a lo que sientes, pararte antes de reaccionar y preguntar a los demás cómo están son hábitos que se entrenan."},
  {q:"¿Es más importante que el CI?",a:"La investigación no respalda esa afirmación popular. Las dos cosas aportan, en ámbitos distintos."},
  {q:"¿Qué significa cada dimensión?",a:"Percepción es darte cuenta de las emociones; uso, aprovecharlas para pensar; y gestión, regular las tuyas y las de los demás."},
  {q:"¿Por qué es un autoinforme?",a:"Porque es rápido y útil para reflexionar. Su límite es que depende de lo bien que te conozcas."}],
 sources:[src("Development and validation of a measure of emotional intelligence","10.1016/S0191-8869(98)00001-4","Schutte y otros (1998): escala en la que se inspira el test.")]});

put('chronotype',{
 overview:[{label:"Mide",text:"Tu preferencia horaria natural: matutina, intermedia o vespertina."},{label:"Formato",text:"5 preguntas de la versión reducida del cuestionario; 1 minuto."},{label:"Límite",text:"No diagnostica trastornos del sueño."}],
 sections:[
  {title:"Qué es el cronotipo",body:"Es la hora del día en la que tu cuerpo prefiere estar activo y descansar. Este test usa la versión reducida que Ana Adan y Helena Almirall hicieron en 1991 del cuestionario de matutinidad de Horne y Östberg."},
  {title:"Alondras, búhos y el resto",body:"Las alondras rinden mejor temprano y los búhos por la tarde y la noche. La mayoría de la gente está en un punto intermedio. Ninguno es mejor; el problema aparece cuando tus horarios van contra tu reloj."}],
 faqs:[
  {q:"¿Se puede cambiar el cronotipo?",a:"Solo en parte. La luz por la mañana y los horarios regulares lo adelantan un poco, pero la tendencia de fondo se mantiene."},
  {q:"¿Cambia con la edad?",a:"Sí. En la adolescencia se retrasa y con los años se va adelantando."},
  {q:"¿Qué es el jet lag social?",a:"La diferencia entre tus horarios de sueño entre semana y en fin de semana. Cuanto mayor, más se parece a cambiar de huso horario cada semana."},
  {q:"¿Qué hago si soy búho y madrugo?",a:"Luz natural nada más levantarte, cenar antes y evitar pantallas a última hora ayudan a reducir el desfase."}],
 sources:[src("Horne & Östberg morningness-eveningness questionnaire: A reduced scale","10.1016/0191-8869(91)90110-W","Adan y Almirall (1991): versión reducida del cuestionario.")]});

put('resilience',{
 overview:[{label:"Mide",text:"Tu capacidad percibida de recuperarte tras un revés."},{label:"Formato",text:"6 afirmaciones; 1 minuto."},{label:"Límite",text:"No evalúa traumas ni tu salud mental."}],
 sections:[
  {title:"Qué mide la escala breve de resiliencia",body:"Bruce Smith y su equipo crearon en 2008 una escala de seis preguntas centrada en una sola idea: la capacidad de recuperarse del estrés y volver al equilibrio. Este test se inspira en ella."},
  {title:"Resiliencia no es aguantarlo todo",body:"Ser resiliente no significa no sufrir ni hacerlo todo solo. Significa recuperarte con el tiempo, a menudo apoyándote en otras personas."}],
 faqs:[
  {q:"¿La resiliencia se aprende?",a:"En buena parte, sí. Las relaciones de apoyo, dormir bien y enfrentarse a dificultades asumibles la refuerzan."},
  {q:"¿Ser resiliente es no sufrir?",a:"No. Las personas resilientes sufren igual; lo que cambia es cómo se recuperan."},
  {q:"¿Qué hago si me sale baja?",a:"Busca apoyo en personas de confianza y, si el malestar dura, en un profesional."},
  {q:"¿En qué se diferencia del grit?",a:"El grit trata de perseguir metas largas; la resiliencia, de recuperarse tras un golpe."}],
 sources:[src("The brief resilience scale: Assessing the ability to bounce back","10.1080/10705500802222972","Smith y otros (2008): artículo original de la escala.")]});

put('ncs',{
 overview:[{label:"Mide",text:"Cuánto disfrutas pensando y resolviendo problemas complejos."},{label:"Formato",text:"6 afirmaciones de la versión breve NCS-6; 1 minuto."},{label:"Límite",text:"No mide inteligencia: mide motivación por pensar."}],
 sections:[
  {title:"Qué es la necesidad de cognición",body:"John Cacioppo y Richard Petty la describieron en 1982 como la tendencia a disfrutar del esfuerzo mental. Este test usa la versión de seis preguntas validada por Coelho, Hanel y Wolf."},
  {title:"Pensar mucho no es pensar mejor",body:"Puntuar alto significa que te gusta darle vueltas a las cosas, no que aciertes más. Quien puntúa bajo prefiere atajos y soluciones prácticas, algo útil en muchas situaciones."}],
 faqs:[
  {q:"¿Es lo mismo que ser inteligente?",a:"No. Se relacionan en parte, pero mide las ganas de pensar, no la capacidad."},
  {q:"¿Qué ventajas tiene puntuar alto?",a:"En los estudios sobre persuasión, estas personas analizan más los argumentos y se dejan llevar menos por señales superficiales."},
  {q:"¿Y puntuar bajo?",a:"Tomas decisiones más rápidas y gastas menos energía en problemas que no lo necesitan."},
  {q:"¿Por qué solo seis preguntas?",a:"La versión breve conserva buena parte de la información de la escala larga de 18 preguntas."}],
 sources:[src("The need for cognition","10.1037/0022-3514.42.1.116","Cacioppo y Petty (1982): artículo original del concepto."),src("The Very Efficient Assessment of Need for Cognition: Developing a Six-Item Version","10.1177/1073191118793208","Coelho, Hanel y Wolf: versión de seis preguntas.")]});

put('selfesteem',{
 seoTitle:"Test de autoestima de Rosenberg online: 10 preguntas | Testia",
 overview:[{label:"Mide",text:"Cómo te valoras a ti mismo de forma global."},{label:"Formato",text:"10 afirmaciones de la escala de Rosenberg; 2 minutos."},{label:"Límite",text:"No diagnostica depresión ni otros problemas."}],
 sections:[
  {title:"Qué es la escala de Rosenberg",body:"Morris Rosenberg la creó en 1965 y sigue siendo la medida de autoestima más usada del mundo. Son diez afirmaciones sobre cómo te valoras en general, la mitad en positivo y la mitad en negativo. Tiene validación en español con estudiantes universitarios."},
  {title:"Autoestima alta no es creerse superior",body:"La autoestima sana es aceptarte y valorarte sin necesidad de compararte. Sentirse por encima de los demás se parece más al narcisismo, que es otra cosa."}],
 faqs:[
  {q:"¿Se puede mejorar la autoestima?",a:"Sí. Hablarte con más amabilidad, cumplir pequeños compromisos contigo y rodearte de personas que te tratan bien ayuda."},
  {q:"¿Autoestima y narcisismo son lo mismo?",a:"No. La autoestima es valorarte; el narcisismo implica necesidad de admiración y sentirse superior."},
  {q:"¿Cambia con el tiempo?",a:"Sí. Es bastante estable, pero cambia con las experiencias y suele crecer de la adolescencia a la edad adulta."},
  {q:"¿Qué hago si me sale muy baja?",a:"Habla con alguien de confianza y, si te afecta en el día a día, con un profesional. Si tienes pensamientos de hacerte daño, en España el 024 atiende las 24 horas."}],
 sources:[src("The Rosenberg Self-Esteem Scale: Translation and Validation in University Students","10.1017/s1138741600006727","Martín-Albo y otros (2007): validación española de la escala.")],
 guide:{url:"/blog/que-es-la-autoestima",title:"Guía de autoestima",text:"Qué es y cómo se mide"}});

put('crt',{
 overview:[{label:"Mide",text:"Si frenas la respuesta intuitiva para comprobarla antes de darla."},{label:"Formato",text:"6 acertijos con trampa; unos 4 minutos."},{label:"Límite",text:"No mide la inteligencia general."}],
 sections:[
  {title:"Qué es el test de reflexión cognitiva",body:"Shane Frederick lo publicó en 2005 con tres acertijos en los que la primera respuesta que viene a la cabeza es incorrecta. El más famoso es el del bate y la pelota. Este test usa seis acertijos nuevos con la misma lógica."},
  {title:"Pensamiento intuitivo y reflexivo",body:"La psicología distingue entre un pensamiento rápido y automático y otro lento y deliberado. El test mide si, ante una respuesta que parece obvia, te paras a comprobarla."}],
 faqs:[
  {q:"¿Cuál es el acertijo más famoso?",a:"Un bate y una pelota cuestan 1,10 euros y el bate cuesta un euro más que la pelota. Mucha gente responde 10 céntimos, pero la pelota cuesta 5."},
  {q:"¿Y si ya conocía algún acertijo?",a:"Las preguntas de este test son nuevas, pero conocer el formato ayuda. Tenlo en cuenta al leer tu resultado."},
  {q:"¿Ser intuitivo es malo?",a:"No. La intuición es rápida y casi siempre acierta en lo cotidiano; solo falla en problemas diseñados para engañarla."},
  {q:"¿Tiene relación con el CI?",a:"En parte. Frederick encontró relación con otras medidas cognitivas, pero mide sobre todo el hábito de comprobar."}],
 sources:[src("Cognitive Reflection and Decision Making","10.1257/089533005775196732","Frederick (2005): artículo original del test de reflexión cognitiva.")],
 guide:{url:"/blog/pensamiento-intuitivo-reflexivo",title:"Guía: intuición y reflexión",text:"Cómo interpretar el CRT"}});
})();
