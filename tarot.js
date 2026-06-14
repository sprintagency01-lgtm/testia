/* ============================================================
   ATLAS — Tarot · baraja ilustrada completa (78 cartas)
   Sección de ENTRETENIMIENTO. No es un instrumento científico.
   Cada carta: n(nombre), img(ruta ilustración), kw(palabras clave),
   up(significado derecho), rev(significado invertido).
   Ilustraciones en /tarot-deck. Reverso: 00-card-back.jpg
   ============================================================ */
window.TAROT_BACK = "tarot-deck/00-card-back.webp";

const MAJORS = [
 {n:"El Loco", f:"major-00-the-fool", kw:["comienzos","libertad","espontaneidad"],
  up:"Un nuevo comienzo te llama. Lánzate con fe, aunque no veas todo el camino: la aventura premia a los valientes.",
  rev:"Estás a punto de saltar sin mirar. Cuidado con la imprudencia y las decisiones impulsivas."},
 {n:"El Mago", f:"major-01-the-magician", kw:["poder","habilidad","manifestación"],
  up:"Tienes todas las herramientas para lograr lo que te propongas. Es momento de actuar y crear tu realidad.",
  rev:"Talento desaprovechado o alguien intentando manipularte. Revisa tus verdaderas intenciones."},
 {n:"La Sacerdotisa", f:"major-02-the-high-priestess", kw:["intuición","misterio","sabiduría"],
  up:"Escucha tu voz interior: sabe más de lo que crees. Hay verdades esperando bajo la superficie.",
  rev:"Te estás desconectando de tu intuición o ignorando señales. Algo permanece oculto."},
 {n:"La Emperatriz", f:"major-03-the-empress", kw:["abundancia","cuidado","creatividad"],
  up:"Época fértil y de abundancia. Cuida lo que has sembrado y disfruta de los placeres de la vida.",
  rev:"Bloqueo creativo o exceso de dependencia. Vuelve a conectar con lo que te nutre."},
 {n:"El Emperador", f:"major-04-the-emperor", kw:["autoridad","estructura","control"],
  up:"Pon orden y estructura. La disciplina y el liderazgo te llevarán al éxito.",
  rev:"Rigidez o control excesivo. Quizá alguien (¿tú?) está siendo demasiado terco."},
 {n:"El Sumo Sacerdote", f:"major-05-the-hierophant", kw:["tradición","guía","creencias"],
  up:"Busca el consejo de un mentor o apóyate en lo que ya funciona. La tradición tiene respuestas.",
  rev:"Hora de romper con lo establecido y seguir tu propio camino. El dogma te aprieta."},
 {n:"Los Enamorados", f:"major-06-the-lovers", kw:["amor","unión","decisión"],
  up:"Una conexión importante o una decisión del corazón. Elige desde tus valores, no desde el miedo.",
  rev:"Desequilibrio o conflicto en una relación. Cuidado con elegir mal por las razones equivocadas."},
 {n:"El Carro", f:"major-07-the-chariot", kw:["voluntad","victoria","determinación"],
  up:"Avanzas con fuerza hacia tu meta. Con foco y voluntad, la victoria es tuya.",
  rev:"Falta de dirección o sientes que pierdes el control. Recupera el rumbo antes de acelerar."},
 {n:"La Fuerza", f:"major-08-strength", kw:["coraje","paciencia","dominio"],
  up:"Tu fuerza real es la calma. Doma tus impulsos con paciencia y compasión: puedes con esto.",
  rev:"Dudas e inseguridad te frenan. Recupera la confianza en ti mismo."},
 {n:"El Ermitaño", f:"major-09-the-hermit", kw:["introspección","búsqueda","soledad"],
  up:"Tiempo de retirarte y mirar hacia dentro. Las respuestas están en tu propio silencio.",
  rev:"Demasiado aislamiento. Quizá te estás escondiendo del mundo más de la cuenta."},
 {n:"La Rueda de la Fortuna", f:"major-10-wheel-of-fortune", kw:["ciclos","destino","cambio"],
  up:"La rueda gira a tu favor. Un giro del destino abre una nueva etapa: fluye con ella.",
  rev:"Mala racha o resistencia al cambio. Todo ciclo termina; este también pasará."},
 {n:"La Justicia", f:"major-11-justice", kw:["equilibrio","verdad","causa-efecto"],
  up:"Lo que siembras, recoges. Actúa con honestidad y la balanza se inclinará a tu favor.",
  rev:"Algo injusto o una verdad que evitas. Asume tu parte de responsabilidad."},
 {n:"El Colgado", f:"major-12-the-hanged-man", kw:["pausa","perspectiva","rendición"],
  up:"Suelta el control y mira las cosas del revés. A veces avanzar es saber esperar.",
  rev:"Estancamiento o un sacrificio que no lleva a nada. Deja de resistirte a lo inevitable."},
 {n:"La Muerte", f:"major-13-death", kw:["fin","transformación","renacer"],
  up:"Un ciclo termina para que otro nazca. Suelta lo viejo: la transformación es liberadora, no temas.",
  rev:"Te aferras a algo que ya tocó a su fin. El cambio llegará igual; mejor abrazarlo."},
 {n:"La Templanza", f:"major-14-temperance", kw:["equilibrio","moderación","armonía"],
  up:"Encuentra el punto medio. La paciencia y la moderación traen armonía a tu vida.",
  rev:"Excesos o desequilibrio. Algo en tu vida pide ser recalibrado."},
 {n:"El Diablo", f:"major-15-the-devil", kw:["ataduras","tentación","deseo"],
  up:"Algo te tiene atado: un hábito, un miedo, una relación tóxica. Reconócelo, es el primer paso.",
  rev:"Estás rompiendo cadenas y recuperando tu libertad. Buen momento para soltar lastre."},
 {n:"La Torre", f:"major-16-the-tower", kw:["ruptura","revelación","caos"],
  up:"Un cambio brusco derriba lo que ya no se sostenía. Duele, pero limpia el terreno para algo mejor.",
  rev:"Evitas un derrumbe inevitable o temes el cambio. Cuanto antes lo afrontes, menor el golpe."},
 {n:"La Estrella", f:"major-17-the-star", kw:["esperanza","inspiración","calma"],
  up:"Tras la tormenta, llega la calma y la esperanza. Confía: el universo conspira a tu favor.",
  rev:"Has perdido la fe o te sientes desanimado. La luz sigue ahí, solo tienes que volver a mirarla."},
 {n:"La Luna", f:"major-18-the-moon", kw:["ilusión","miedo","subconsciente"],
  up:"No todo es lo que parece. Tus miedos e ilusiones distorsionan la realidad: avanza con cautela.",
  rev:"La confusión empieza a disiparse. La verdad emerge y recuperas la claridad."},
 {n:"El Sol", f:"major-19-the-sun", kw:["alegría","éxito","vitalidad"],
  up:"¡Brilla! Éxito, alegría y vitalidad te acompañan. Disfruta este momento luminoso.",
  rev:"El optimismo está algo nublado o hay retrasos. La buena racha llega, solo tarda un poco."},
 {n:"El Juicio", f:"major-20-judgement", kw:["renacer","despertar","llamada"],
  up:"Un despertar interior te llama a una nueva etapa. Perdona el pasado y renace.",
  rev:"Eres demasiado duro contigo mismo o ignoras una llamada importante. Escúchate."},
 {n:"El Mundo", f:"major-21-the-world", kw:["plenitud","logro","cierre"],
  up:"Cierras un ciclo con éxito. Has llegado: celebra la plenitud y prepárate para lo siguiente.",
  rev:"Un proyecto sin terminar o una meta a medias. Falta un último empujón para cerrar el círculo."}
];

/* Arcanos Menores: 4 palos × 14. Significados RWS condensados. */
const SUITS = [
 {es:"Copas", file:"cups", theme:"emociones y relaciones"},
 {es:"Oros", file:"pentacles", theme:"dinero, trabajo y materia"},
 {es:"Espadas", file:"swords", theme:"mente, verdad y conflicto"},
 {es:"Bastos", file:"wands", theme:"energía, pasión y acción"},
];
const RANKS = ["01-ace","02","03","04","05","06","07","08","09","10","11-page","12-knight","13-queen","14-king"];
const RANK_ES = ["As","Dos","Tres","Cuatro","Cinco","Seis","Siete","Ocho","Nueve","Diez","Sota","Caballero","Reina","Rey"];

/* significados [up, rev, [kw3]] por palo, en orden As..Rey */
const MINOR_MEANINGS = {
 cups:[
  ["Un nuevo amor o apertura emocional. El corazón se abre y la alegría fluye.","Emociones bloqueadas o un vacío afectivo. Algo no termina de llenarte.",["amor","apertura","alegría"]],
  ["Unión y atracción mutua: una conexión que vale la pena cuidar.","Desequilibrio o tensión en una relación. Algo se ha enfriado.",["unión","atracción","conexión"]],
  ["Celebración, amistad y comunidad. Rodéate de los tuyos y brinda.","Excesos, aislamiento o algún chisme que enturbia el grupo.",["amistad","celebración","comunidad"]],
  ["Apatía o una oportunidad que no estás viendo por mirar al pasado.","Despiertas del letargo: vuelves a abrir los ojos y la ilusión.",["apatía","desencanto","oportunidad"]],
  ["Pérdida o arrepentimiento. Duele, pero aún queda algo en pie.","Aceptación y perdón. Por fin sueltas el peso y sigues adelante.",["pérdida","duelo","aceptación"]],
  ["Nostalgia e inocencia: recuerdos dulces que reconfortan.","Anclado en el pasado. Hora de soltar lo que ya fue.",["nostalgia","recuerdos","inocencia"]],
  ["Demasiadas opciones y fantasías. Cuidado con las ilusiones.","Claridad y decisión: eliges con los pies en la tierra.",["ilusiones","opciones","fantasía"]],
  ["Dejas atrás lo que ya no te llena para buscar algo más profundo.","Miedo a soltar te mantiene donde ya no quieres estar.",["búsqueda","soltar","cambio"]],
  ["La carta del deseo cumplido: satisfacción y bienestar.","Satisfacción solo en apariencia; falta algo por dentro.",["satisfacción","deseo","bienestar"]],
  ["Felicidad plena y armonía con quienes quieres.","Desarmonía o valores rotos en el entorno cercano.",["felicidad","armonía","familia"]],
  ["Un mensaje emocional o un brote de creatividad y ternura.","Inmadurez o bloqueo creativo. Las emociones se atascan.",["mensaje","ternura","creatividad"]],
  ["El romántico idealista: llega una propuesta del corazón.","Promesas vacías o cambios de humor. Ojo con lo que prometen.",["romance","ideal","propuesta"]],
  ["Compasión e intuición: cálida y profundamente empática.","Dependencia o inseguridad emocional. Te vuelcas demasiado.",["compasión","intuición","calidez"]],
  ["Madurez emocional: sereno y diplomático bajo presión.","Frialdad o manipulación emocional. Las emociones se reprimen.",["serenidad","equilibrio","diplomacia"]],
 ],
 pentacles:[
  ["Una nueva oportunidad material o de prosperidad aterriza en tus manos.","Oportunidad perdida o escasez. Cuida tus recursos.",["oportunidad","prosperidad","inicio"]],
  ["Malabarismo y adaptabilidad: equilibras varias cosas a la vez.","Desorganización o sobrecarga. Demasiadas pelotas en el aire.",["equilibrio","adaptación","gestión"]],
  ["Trabajo en equipo y oficio: aprendes y construyes con otros.","Falta de cooperación o trabajo mediocre. Algo no encaja.",["equipo","oficio","aprendizaje"]],
  ["Seguridad y ahorro, pero ojo con aferrarte demasiado.","Avaricia o miedo a perder. Sueltas el control con dificultad.",["seguridad","ahorro","control"]],
  ["Dificultad material o sentirte excluido. Pide ayuda, no estás solo.","Recuperación: la mala racha empieza a quedar atrás.",["escasez","exclusión","apuro"]],
  ["Generosidad y equilibrio entre dar y recibir.","Deudas, abuso o desigualdad en el intercambio.",["generosidad","ayuda","equilibrio"]],
  ["Paciencia y esfuerzo a largo plazo: la cosecha llegará.","Impaciencia o esfuerzo sin fruto. Replantea la estrategia.",["paciencia","esfuerzo","cosecha"]],
  ["Dedicación y maestría: perfeccionas tu oficio con constancia.","Perfeccionismo o trabajo sin alma. Te falta sentido.",["dedicación","maestría","oficio"]],
  ["Independencia y lujo merecido: disfrutas de tus logros.","Dependencia o gastos por aparentar. Cuida lo tuyo.",["independencia","logro","abundancia"]],
  ["Riqueza, legado y estabilidad familiar duradera.","Pérdidas o conflictos de herencia. La estabilidad tiembla.",["riqueza","legado","estabilidad"]],
  ["Una nueva meta práctica o ganas de estudiar y aprender.","Falta de constancia: los planes se quedan en el aire.",["meta","estudio","ambición"]],
  ["Constancia y responsabilidad: avanzas con método, paso a paso.","Rutina o estancamiento. El método se ha vuelto aburrimiento.",["constancia","método","responsabilidad"]],
  ["Cuidado y abundancia práctica: nutres tu hogar y a los tuyos.","Te descuidas por cuidar a todos o por exceso de trabajo.",["cuidado","abundancia","hogar"]],
  ["Éxito material y liderazgo: seguridad construida con criterio.","Materialismo o terquedad. El control se vuelve obsesión.",["éxito","liderazgo","seguridad"]],
 ],
 swords:[
  ["Claridad y verdad: una idea poderosa corta la confusión.","Confusión o mal uso de la fuerza. La idea se tuerce.",["claridad","verdad","idea"]],
  ["Una decisión bloqueada: equilibrio tenso entre dos opciones.","La información se revela y por fin puedes decidir.",["indecisión","bloqueo","tregua"]],
  ["Dolor, desengaño o ruptura. Una herida que hay que atravesar.","Perdón y sanación: el dolor empieza a soltarse.",["dolor","ruptura","desengaño"]],
  ["Descanso y recuperación. Para, respira, recárgate.","Agotamiento: llevas demasiado tiempo en pausa, reactívate.",["descanso","pausa","recuperación"]],
  ["Conflicto y victoria vacía. Ganar a cualquier precio no compensa.","Reconciliación: dejas el rencor y haces las paces.",["conflicto","tensión","derrota"]],
  ["Transición: dejas atrás aguas turbulentas hacia algo más calmo.","Resistencia al cambio o equipaje emocional que no sueltas.",["transición","viaje","alivio"]],
  ["Estrategia y sigilo, pero con algo de engaño de por medio.","Confesión: dejas el doble juego y sale la verdad.",["estrategia","sigilo","astucia"]],
  ["Te sientes atrapado, pero las ataduras son más mentales que reales.","Liberación: recuperas tu poder y rompes la jaula.",["atrapado","límites","miedo"]],
  ["Ansiedad, insomnio y preocupación. La mente no para de dar vueltas.","La angustia remite. Pedir ayuda alivia el peso.",["ansiedad","preocupación","insomnio"]],
  ["Un final doloroso: tocas fondo, pero a partir de aquí solo se sube.","Recuperación: lo peor ya pasó, amanece de nuevo.",["final","fondo","cierre"]],
  ["Curiosidad y mente despierta: ideas nuevas y ganas de saber.","Chismes o palabras hirientes. Cuidado con la lengua.",["curiosidad","ideas","vigilancia"]],
  ["Acción rápida y ambición: cargas de frente hacia tu objetivo.","Precipitación o agresividad. Frena antes de estrellarte.",["acción","ímpetu","ambición"]],
  ["Claridad e independencia: honestidad directa, sin rodeos.","Frialdad o dureza. La honestidad se vuelve filo.",["claridad","independencia","honestidad"]],
  ["Razón y autoridad: decides con la cabeza y dices la verdad.","Tiranía o abuso de poder. La razón se vuelve control.",["razón","autoridad","verdad"]],
 ],
 wands:[
  ["Una chispa de inspiración: nace un proyecto con fuerza.","Falta de energía o retrasos. La chispa tarda en prender.",["chispa","inspiración","inicio"]],
  ["Planificas el futuro y tomas una decisión sobre tu rumbo.","Miedo a lo desconocido. Los planes se quedan parados.",["planificación","decisión","futuro"]],
  ["Expansión y visión: tu esfuerzo empieza a dar frutos lejos.","Retrasos o falta de previsión. La visión se queda corta.",["expansión","visión","progreso"]],
  ["Celebración y estabilidad: un hito feliz, hogar y raíces.","Transición o armonía frágil. Falta asentar los cimientos.",["celebración","hogar","estabilidad"]],
  ["Competencia y tensión: choque de egos o rivalidad.","Evitas el conflicto o por fin acaba la rivalidad.",["competencia","conflicto","rivalidad"]],
  ["Victoria y reconocimiento público: el éxito llega y se nota.","Caída o falta de reconocimiento. El triunfo se hace esperar.",["victoria","éxito","reconocimiento"]],
  ["Defiendes tu posición con perseverancia frente a la presión.","Cedes o estás abrumado. Demasiados frentes a la vez.",["defensa","valor","perseverancia"]],
  ["Rapidez y movimiento: noticias y cosas que por fin se aceleran.","Retrasos y frustración. Todo se descontrola o se atasca.",["rapidez","movimiento","noticias"]],
  ["Resiliencia: un último empujón aunque estés cansado. Aguanta.","Agotamiento o terquedad. Te cuesta soltar y rendirte a tiempo.",["resiliencia","defensa","persistencia"]],
  ["Cargas con mucho peso y responsabilidad. Casi llegas, pero pesa.","Sueltas carga y delegas. Dejas de hacerlo todo solo.",["carga","responsabilidad","esfuerzo"]],
  ["Entusiasmo y descubrimiento: ideas frescas y ganas de explorar.","Dispersión o falta de dirección. Mucha idea, poco foco.",["entusiasmo","ideas","descubrir"]],
  ["Aventura y pasión: te lanzas con impulso hacia lo nuevo.","Imprudencia o precipitación. El impulso se vuelve atropello.",["aventura","pasión","impulso"]],
  ["Carisma y confianza: tu energía atrae y contagia.","Inseguridad o celos. La confianza flaquea por dentro.",["carisma","confianza","energía"]],
  ["Liderazgo y visión audaz: marcas el rumbo con valentía.","Autoritarismo o impulsividad. El mando se vuelve imposición.",["liderazgo","visión","audacia"]],
 ],
};

function buildDeck(){
 const deck = MAJORS.map(m=>({n:m.n, img:"tarot-deck/"+m.f+".webp", kw:m.kw, up:m.up, rev:m.rev, arcana:"mayor"}));
 SUITS.forEach(s=>{
  RANKS.forEach((rk,i)=>{
   const mm = MINOR_MEANINGS[s.file][i];
   deck.push({
    n: RANK_ES[i]+" de "+s.es,
    img: "tarot-deck/"+s.file+"-"+rk+".webp",
    kw: mm[2], up: mm[0], rev: mm[1], arcana:"menor"
   });
  });
 });
 return deck;
}
window.TAROT = buildDeck(); // 78 cartas

window.TAROT_SPREADS = {
 1:{name:"Carta del día", pos:["Tu energía de hoy"]},
 3:{name:"Pasado · Presente · Futuro", pos:["Pasado","Presente","Futuro"]},
 5:{name:"La Cruz", pos:["Situación","Obstáculo","Consejo","Raíz","Resultado"]}
};
