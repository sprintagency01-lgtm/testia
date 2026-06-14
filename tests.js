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
 result:{type:"profileBars"},
 items:[
  {t:"Me siento cómodo siendo el centro de atención.",s:"E"},
  {t:"Inicio conversaciones con desconocidos sin esfuerzo.",s:"E"},
  {t:"Prefiero quedarme en segundo plano en los grupos.",s:"E",r:true},
  {t:"Me cargo de energía cuando estoy rodeado de gente.",s:"E"},
  {t:"Suelo permanecer callado entre extraños.",s:"E",r:true},
  {t:"Me intereso de verdad por los problemas de los demás.",s:"A"},
  {t:"Me cuesta empatizar con quien piensa muy distinto a mí.",s:"A",r:true},
  {t:"Confío en que la mayoría de la gente tiene buenas intenciones.",s:"A"},
  {t:"A veces soy frío o distante con los demás.",s:"A",r:true},
  {t:"Dedico tiempo a ayudar a quien lo necesita.",s:"A"},
  {t:"Termino lo que empiezo aunque cueste.",s:"C"},
  {t:"Tengo mis cosas ordenadas y bajo control.",s:"C"},
  {t:"Suelo dejar las tareas para el último momento.",s:"C",r:true},
  {t:"Presto atención a los detalles.",s:"C"},
  {t:"Me distraigo con facilidad y pierdo el hilo.",s:"C",r:true},
  {t:"Mantengo la calma bajo presión.",s:"ES"},
  {t:"Me preocupo por cosas que probablemente no pasarán.",s:"ES",r:true},
  {t:"Mi estado de ánimo cambia con facilidad.",s:"ES",r:true},
  {t:"Rara vez me siento triste o desanimado.",s:"ES"},
  {t:"Me estreso con facilidad.",s:"ES",r:true},
  {t:"Disfruto explorando ideas nuevas y abstractas.",s:"O"},
  {t:"Tengo una imaginación muy activa.",s:"O"},
  {t:"Prefiero la rutina a probar cosas nuevas.",s:"O",r:true},
  {t:"Me atraen el arte, la música o la belleza.",s:"O"},
  {t:"Rara vez pienso en cuestiones filosóficas.",s:"O",r:true}
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
 items:[
  {t:"Me gustaría reparar un motor o un electrodoméstico.",s:"R"},
  {t:"Me gustaría trabajar al aire libre con herramientas o máquinas.",s:"R"},
  {t:"Me gustaría construir algo con mis propias manos.",s:"R"},
  {t:"Me gustaría cuidar animales o cultivar plantas.",s:"R"},
  {t:"Me gustaría resolver problemas de matemáticas o ciencia.",s:"I"},
  {t:"Me gustaría investigar por qué ocurre un fenómeno.",s:"I"},
  {t:"Me gustaría analizar datos para sacar conclusiones.",s:"I"},
  {t:"Me gustaría leer sobre temas científicos.",s:"I"},
  {t:"Me gustaría escribir relatos, música o poesía.",s:"A"},
  {t:"Me gustaría diseñar o dibujar algo original.",s:"A"},
  {t:"Me gustaría actuar, cantar o tocar un instrumento.",s:"A"},
  {t:"Me gustaría decorar un espacio con criterio estético.",s:"A"},
  {t:"Me gustaría enseñar o explicar cosas a otras personas.",s:"S"},
  {t:"Me gustaría ayudar a alguien con un problema personal.",s:"S"},
  {t:"Me gustaría trabajar en equipo cuidando a los demás.",s:"S"},
  {t:"Me gustaría organizar actividades para un grupo.",s:"S"},
  {t:"Me gustaría liderar un proyecto o un equipo.",s:"E"},
  {t:"Me gustaría convencer a otros de una idea o producto.",s:"E"},
  {t:"Me gustaría montar mi propio negocio.",s:"E"},
  {t:"Me gustaría negociar un acuerdo importante.",s:"E"},
  {t:"Me gustaría llevar las cuentas y registros ordenados.",s:"C"},
  {t:"Me gustaría seguir procedimientos claros y detallados.",s:"C"},
  {t:"Me gustaría organizar archivos o bases de datos.",s:"C"},
  {t:"Me gustaría trabajar con números y hojas de cálculo.",s:"C"}
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
 items:[
  {t:"Me preocupa que mi pareja deje de quererme.",s:"ANX"},
  {t:"Necesito que me confirmen a menudo que me quieren.",s:"ANX"},
  {t:"Me angustia que mi pareja no esté tan cerca como yo querría.",s:"ANX"},
  {t:"Me preocupa quedarme solo.",s:"ANX"},
  {t:"A veces quiero más cercanía de la que el otro está dispuesto a dar.",s:"ANX"},
  {t:"Me frustro cuando no recibo el cariño que necesito.",s:"ANX"},
  {t:"Le doy muchas vueltas a mis relaciones.",s:"ANX"},
  {t:"Me asusta la idea de que me abandonen.",s:"ANX"},
  {t:"Prefiero no depender emocionalmente de mi pareja.",s:"AVO"},
  {t:"Me incomoda abrirme del todo a otra persona.",s:"AVO"},
  {t:"Me cuesta confiar plenamente en mi pareja.",s:"AVO"},
  {t:"Prefiero mantener cierta distancia emocional.",s:"AVO"},
  {t:"Me agobio cuando alguien quiere demasiada intimidad.",s:"AVO"},
  {t:"Me resulta difícil pedir consuelo cuando lo necesito.",s:"AVO"},
  {t:"Hablar de mis sentimientos con la pareja me incomoda.",s:"AVO"},
  {t:"Valoro mucho mi independencia, incluso en pareja.",s:"AVO"}
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
}

];

/* Mapa de profesiones para el test vocacional (RIASEC) */
window.RIASEC_CAREERS = {
 R:["Ingeniería","Mecánica","Arquitectura técnica","Deporte","Oficios técnicos"],
 I:["Ciencia e investigación","Medicina","Análisis de datos","Ingeniería de software","Biología"],
 A:["Diseño","Comunicación audiovisual","Música","Escritura","Arquitectura"],
 S:["Educación","Psicología","Enfermería","Trabajo social","Recursos humanos"],
 E:["Empresa y dirección","Marketing","Ventas","Emprendimiento","Derecho"],
 C:["Administración y finanzas","Contabilidad","Logística","Análisis financiero","Gestión de datos"]
};
