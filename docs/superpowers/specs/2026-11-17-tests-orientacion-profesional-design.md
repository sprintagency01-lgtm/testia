# Tests de orientación: qué carrera, qué FP y qué trabajo — diseño

Fecha: 2026-11-17 · Pedido por Mario: «podemos meter tests de orientación laboral y profesional tipo qué carrera estudiar, qué trabajo está alineado conmigo», «haz los tres», «la A».

## Por qué
- Testia vende cuando el test da un veredicto concreto sobre uno mismo (se paga por el desglose). Las búsquedas «qué carrera estudiar», «qué FP estudiar» y «qué trabajo es para mí» no están cubiertas: el único test del área es el vocacional RIASEC (`/test/test-vocacional`), que da un código de 3 letras y una lista genérica de áreas.
- Tres tests concretos posicionan mejor que uno genérico y no canibalizan al vocacional si cada uno da un veredicto distinto.
- «Qué carrera estudiar» tiene pico en primavera (elección de grado): publicar ahora da margen para posicionar.

## Objetivos
- Tres tests nuevos, cada uno con su landing SEO, su veredicto gratis y su desglose de pago (1,99 €, incluido en el pase de 4,99 €).
- Resultados con nombres reales españoles: grados universitarios, ciclos del catálogo oficial de FP, profesiones.
- Un solo motor de emparejamiento reutilizado por los tres.

## No objetivos
- No rehacer el test vocacional actual (solo se enlaza a los tres nuevos).
- No dar notas de corte numéricas ni sueldos concretos (cambian por universidad, comunidad y año; un dato falso en una decisión de estudios hace daño).
- No recomendar universidades ni centros concretos.
- Guías de blog: después del lanzamiento, en una tanda aparte.

## Anti-objetivos (sería un fracaso aunque funcione)
- Que dos de los tres tests den casi siempre el mismo veredicto que el vocacional (contenido duplicado y poco valor de pago).
- Estereotipos de género o clase en ítems o resultados («carreras de chicas», etc.).
- Que alguien que responde todo neutral salga con un veredicto rotundo como si fuera claro.

## Enfoques considerados
- **A. Emparejamiento por perfil (elegido).** Cada grado, ciclo o profesión tiene una ficha con su perfil; las respuestas forman el mismo perfil y se eligen las fichas más parecidas. Veredictos concretos y explicables; añadir carreras no toca código. Coste: redactar el catálogo.
- B. Preguntas ramificadas por área: sensación de test que te conoce, pero modo nuevo del motor, preguntas por rama y una primera respuesta en falso no se recupera.
- C. Reutilizar RIASEC y traducir el código a carreras: rápido, pero calca al vocacional y no justifica pago.

## Cómo funciona (común a los tres)
- `mode:'likert'`, `scaleMax:5`, como el vocacional. Unas 30–36 afirmaciones, 5–6 minutos.
- Dimensiones del perfil (escalas del test):
  - **Intereses** (6, Holland): R, I, A, S, E, C. Ítems redactados para cada público (actividades del instituto en carrera, tareas prácticas en FP, tareas del día a día laboral en trabajo).
  - **Puntos fuertes** (4): números y lógica (NUM), lenguaje y comunicación (LEN), manos y espacio (MAN), trato con personas (PER).
  - **Lo que buscas** (4): estabilidad (EST), ingresos (ING), ayudar o tener impacto (IMP), creatividad y autonomía (AUT).
- Cada ficha del catálogo tiene un perfil 0–100 en esas 14 dimensiones, más textos.
- Afinidad = similitud entre el perfil del usuario y el de la ficha. Intereses pesan más que puntos fuertes, y estos más que lo que buscas (pesos orientativos 0,55 / 0,30 / 0,15; los ajusta quien construye). Se muestra como «N % de afinidad».
- Perfil poco definido (respuestas casi planas o top 1 y top 5 a muy poca distancia): el veredicto se mantiene pero el texto dice que el perfil está abierto y que el desglose compara varias opciones; nunca «encajas claramente».
- Nuevo tipo de resultado `match` en index.html, parametrizado por el catálogo de cada test (`T.catalog`).
- **Gratis:** la ficha con más afinidad (nombre, % de afinidad, una frase de por qué) y la carta compartible.
- **De pago:** top 5 con afinidad, por qué encajas (las dimensiones que más suman), salidas, perfil de intereses/fortalezas/valores en barras, y el bloque propio de cada test (abajo).
- No es `sensitive`: el resultado se registra en PostHog como en los demás tests.

## 1. ¿Qué carrera estudiar? — `carrera`
- Landing: `/test/test-que-carrera-estudiar` · h1 «Test: ¿qué carrera estudiar?».
- Público: 16–18 años y sus familias; también adultos que vuelven a estudiar.
- Catálogo: unos 50 grados universitarios españoles de las cinco ramas (Artes y Humanidades, Ciencias, Ciencias de la Salud, Ciencias Sociales y Jurídicas, Ingeniería y Arquitectura).
- Bloque de pago propio: rama de conocimiento; **qué modalidad de Bachillerato y qué asignaturas conviene elegir** para ese grado (dato estable y comprobable; Mario lo dejó a criterio de Claude el 2026-11-17); en los grados de demanda alta conocida (Medicina, Odontología, Enfermería, Fisioterapia, Veterinaria, Biotecnología, dobles grados) un aviso sin cifras: «suele pedir nota de corte alta; compruébala en la universidad que te interese»; y, si encaja, una alternativa en FP de grado superior (enlace al test `fp`). Sin notas de corte numéricas.

## 2. ¿Qué FP estudiar? — `fp`
- Landing: `/test/test-que-fp-estudiar` · h1 «Test: ¿qué FP estudiar?».
- Público: quien duda entre FP y universidad, o elige ciclo.
- Catálogo: las familias profesionales del catálogo oficial (TodoFP / Ministerio de Educación), con 2–4 ciclos representativos cada una (unos 60 ciclos), indicando grado medio o superior. Lista de familias y nombres de ciclos comprobados en todofp.es antes de publicar.
- Resultado: veredicto gratis = ciclo concreto + su familia. Pago: otros ciclos afines, medio frente a superior, salidas y si da paso a un grado universitario.

## 3. ¿Qué trabajo encaja contigo? — `trabajo`
- Landing: `/test/test-que-trabajo-es-para-mi` · h1 «Test: ¿qué trabajo es para mí?».
- Público: adultos que trabajan y quieren cambiar o no saben a qué dedicarse.
- Escalas extra para el **entorno ideal** (decisión de Claude): afirmaciones Likert como el resto, una o dos por entorno (gran empresa, empresa pequeña o startup, por cuenta propia, sector público) y una escala presencial frente a remoto. Se calcula aparte y no cambia qué profesión gana. Va en el veredicto gratis junto a la profesión, y lo de presencial o remoto aparece como matiz («…y mejor en remoto»). Cada profesión lleva la lista de entornos donde es habitual. Si tu entorno ideal no está en esa lista, el texto lo dice con naturalidad («en esta profesión lo habitual es el sector público») en vez de prometer una combinación rara.
- Catálogo: unas 60 profesiones con salidas reales en España.
- Bloque de pago propio: lo que te frena (la dimensión de «lo que buscas» que más choca con tu profesión top) y por dónde empezar (formación o primer paso típico para entrar, sin cursos ni centros concretos).

## Registro y enlaces
- Cada test en tests.js (TESTS + SEO_CONTENT con 6 FAQs y fuentes comprobadas en doi.org/Crossref o fuentes oficiales), TEST_CAT («profesional») en index.html y build-pages.mjs, ICON_OF, NEXT_TEST.
- NEXT_TEST: carrera → [fp, riasec]; fp → [carrera, trabajo]; trabajo → [riasec, values].
- La landing del vocacional enlaza a los tres.
- Fuentes de base: Holland (RIASEC) y O*NET; catálogo de FP del Ministerio; registro de títulos (RUCT) para nombres de grados.

## Decisiones de Claude (revisables)
- Los catálogos van en un archivo propio (`orientacion-catalogos.js`), cargado solo en el motor y en las landings de estos tests, como ya hacen `ccse.js` y `aacc.js`; tests.js ya pesa unos 430 KB.
- Un solo lanzamiento con los tres, construyendo primero el motor y `carrera`; se sube cuando Mario diga «sube Testia».

## Lo que decide quien lo construye
- Redacción de ítems y de fichas, perfiles 0–100 de cada ficha, pesos exactos y la función de similitud, umbral de «perfil abierto», iconos, nombres de bandas de afinidad.
