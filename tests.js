/* ============================================================
   TESTIA — Banco de los 20 tests
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
 items:[
  {q:"Un boli y una libreta cuestan 2,20 € en total. La libreta cuesta 2 € más que el boli. ¿Cuánto cuesta el boli?",o:["20 céntimos","10 céntimos","11 céntimos","1,10 €"],a:1},
  {q:"Si 4 máquinas tardan 4 minutos en fabricar 4 piezas, ¿cuánto tardan 100 máquinas en fabricar 100 piezas?",o:["100 min","4 min","20 min","25 min"],a:1},
  {q:"Unos nenúfares duplican su superficie cada día y cubren un estanque en 48 días. ¿Cuántos días tardan en cubrir la mitad?",o:["24 días","47 días","12 días","46 días"],a:1},
  {q:"En una carrera adelantas al que iba en segunda posición. ¿En qué posición vas ahora?",o:["1.ª","2.ª","3.ª","No se puede saber"],a:1},
  {q:"Una camiseta cuesta 30 €. Le aplican un 50% de descuento y luego otro 10% en caja. ¿Cuánto pagas?",o:["12 €","13,50 €","13 €","15 €"],a:1},
  {q:"Un caracol sube 3 m de día y resbala 2 m de noche en un pozo de 10 m. ¿En cuántos días sale?",o:["8 días","10 días","5 días","7 días"],a:0}
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
  {t:"El Estado debería bajar los impuestos aunque eso reduzca los servicios públicos.",s:"S"},
  {t:"La sanidad y la educación funcionan mejor con competencia privada.",s:"S"},
  {t:"Los ricos no deberían pagar un porcentaje de impuestos mayor que el resto.",s:"S"},
  {t:"Las ayudas sociales hacen que mucha gente prefiera no trabajar.",s:"S"},
  {t:"Las empresas crean la riqueza; hay que regularlas lo menos posible.",s:"S"},
  {t:"La inmigración descontrolada amenaza nuestra cultura.",s:"S"},
  {t:"Hoy se respeta demasiado poco a la autoridad y a la policía.",s:"S"},
  {t:"Los valores tradicionales y la familia son la base de la sociedad.",s:"S"},
  {t:"Hay demasiada corrección política.",s:"S"},
  {t:"El patriotismo y el orgullo nacional son virtudes que cultivar.",s:"S"},
  {t:"Las penas de cárcel deberían ser más duras.",s:"S"},
  {t:"El Estado debería garantizar una renta básica a todo el mundo.",s:"S",r:true},
  {t:"Los servicios públicos deberían ampliarse aunque suban los impuestos.",s:"S",r:true},
  {t:"Las grandes fortunas deberían pagar un impuesto especial.",s:"S",r:true},
  {t:"La vivienda es un derecho y el Estado debe controlar su precio.",s:"S",r:true},
  {t:"Acoger refugiados es una obligación moral.",s:"S",r:true},
  {t:"El matrimonio y la adopción de parejas del mismo sexo deben estar plenamente normalizados.",s:"S",r:true},
  {t:"El aborto debería ser un derecho libre y gratuito.",s:"S",r:true},
  {t:"La diversidad cultural enriquece a un país.",s:"S",r:true},
  {t:"Hay que priorizar la reinserción del delincuente frente al castigo.",s:"S",r:true},
  {t:"El feminismo ha mejorado la sociedad.",s:"S",r:true},
  {t:"Proteger el medio ambiente justifica limitar cierta actividad económica.",s:"S",r:true}
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
 honesty:{slug:"test-honestidad-humildad", seoTitle:"Test de Honestidad-Humildad (HEXACO) online | Testia", h1:"Test de Honestidad-Humildad",
   metaDesc:"Test de Honestidad-Humildad basado en HEXACO: 12 preguntas sobre sinceridad, justicia, modestia y desapego material. Sin registro.",
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
 darktriad:{slug:"test-triada-oscura", seoTitle:"Test de Tríada Oscura online: conoce tus rasgos | Testia", h1:"Test de Tríada Oscura",
   metaDesc:"Test de Tríada Oscura online: 18 preguntas sobre maquiavelismo, narcisismo y psicopatía subclínica, inspirado en el modelo SD3.",
   intro:"Maquiavelismo, narcisismo y psicopatía subclínica: los tres rasgos del lado oscuro de la personalidad. ¿Cuánta sombra llevas dentro? Una experiencia divulgativa inspirada en el modelo SD3.",
   learn:["Tu nivel en los 3 rasgos oscuros","Cuál de ellos predomina en ti","Cómo te sitúas frente a la media","Carta de resultado para compartir"],
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
    {title:"The Short Dark Triad (SD3): A Brief Measure of Dark Personality Traits",url:"https://doi.org/10.1080/00223891.2012.670680",note:"Artículo de Jones y Paulhus que presenta la medida SD3."}
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
