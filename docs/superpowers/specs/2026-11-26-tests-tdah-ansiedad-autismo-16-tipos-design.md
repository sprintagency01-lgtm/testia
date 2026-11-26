# Tests de TDAH, ansiedad, rasgos autistas y 16 tipos: diseño

Fecha: 2026-11-26. Lo pidió Mario: «vamos a implementar más tests que puedan traer tráfico», con tráfico de «google y chatgpt». Eligió el camino C, el de búsquedas por preocupación, con TDAH, autismo y 16 personalidades. Después pidió «la 2 y la 3 mezclando preguntas del test oficial con propias» y aprobó la tabla de 4 tests con «sí, adelante».

## Por qué
- **Las ventas vienen de tests serios.** En los últimos 30 días, los tests de entretenimiento (red flag, sol/luna, entrenador, bruja, Hogwarts) trajeron visitas pero ninguna venta. Las ventas fueron de tests en los que la persona busca una respuesta que le importa: partido, altas capacidades, CI y pareja.
- **ChatGPT recomienda tests que parecen serios.** La única venta llegada desde ChatGPT fue del test de altas capacidades.
- **Hay búsquedas sin cubrir.** Las sugerencias de Google España muestran mucha búsqueda de «test tdah adultos», «test de ansiedad», «test para saber si soy autista» y «test 16 personalidades». Ninguno existe en Testia. Ya tenemos apego, eneagrama e inteligencia emocional, y no se repiten.

## Objetivos
- Cuatro tests nuevos. Cada uno tiene su página para Google, un veredicto gratis y un desglose de pago de 1,99 €, incluido en el pase de 4,99 €.
- Basarse en cuestionarios reconocidos siempre que la licencia permita el uso comercial, y decir siempre de dónde sale cada pregunta.
- Páginas que Google y ChatGPT puedan citar: explicación clara, preguntas frecuentes y fuentes comprobadas.

## No objetivos
- Diagnosticar. Los tres tests de salud son de orientación o cribado, y lo dicen.
- Anunciarlos en Meta o Google Ads. Los temas de salud tienen restricciones de segmentación y no son la vía de tráfico.
- Hacer en esta tanda el test de autismo con el CATI. Su licencia no permite cambios y solo existe en inglés. Si algún día los autores dan permiso para traducirlo, será otro proyecto.
- Guías de blog. Irán en una tanda aparte, después del lanzamiento.

## Anti-objetivos (sería un fracaso aunque funcione)
- **Cobrar por información que protege la salud.** El resultado del cribado, la recomendación de consultar a un profesional y el teléfono 024 son siempre gratis.
- **Que alguien salga creyendo que tiene un diagnóstico,** o que lo descarta del todo.
- **Copiar o parafrasear de cerca ítems con licencia restrictiva** (AQ, AQ-10, CATI, RAADS-R, ASRS de 18 preguntas).
- **Usar «MBTI» o «16Personalities» como nombre o marca** en títulos, el h1 o los textos de marketing.
- **Guardar el resultado de salud o enviarlo por email** (qué test se hizo sí se registra; ver «Datos»).

## Restricciones de licencia (comprobadas el 2026-11-26)
- **ASRS v1.1 de 6 preguntas** (Kessler et al., 2005):
  - Uso libre, también comercial, siempre que se cite. No se puede modificar, salvo pasarlo a formato electrónico. Hay que mantener todas las opciones de respuesta y el algoritmo de puntuación.
  - Se usa la versión oficial en español de España que publica Harvard: `6Q_Spanish (for Spain)_final.pdf` en hcp.med.harvard.edu/ncs.
  - Hay que incluir el aviso de copyright exacto que figura en ese PDF.
  - La versión de 18 preguntas exige permiso: no se usa.
- **GAD-7** (Spitzer et al., 2006):
  - Se puede reproducir, traducir y distribuir sin permiso.
  - Se usa la versión española validada (García-Campayo et al., 2010). Quien lo construya debe comprobar el DOI y la redacción exacta de los ítems en esa fuente.
- **IPIP** (Goldberg):
  - Dominio público. Testia ya lo usa en el test `bigfive`.
- **Autismo:**
  - El AQ y el AQ-10 prohíben el uso comercial (Autism Research Centre, Cambridge).
  - El CATI no permite cambios.
  - Por eso todas las preguntas son propias, siguiendo las áreas de los criterios del DSM-5. No se calca ningún ítem existente.

## Enfoque
Se consideraron tres opciones para el test de autismo:
- **A. Pedir permiso para traducir el CATI.** Es lo más sólido, pero depende de una respuesta de los autores.
- **B. Cambiarlo por otro test.**
- **C. Escribir preguntas propias.**

Mario eligió hacer ansiedad (B) y también autismo con preguntas propias (C).

En TDAH y ansiedad, el cuestionario oficial va intacto y seguido, y detrás van las preguntas propias. El veredicto gratis sale solo del cuestionario oficial, puntuado con su algoritmo oficial. Las preguntas propias solo alimentan el desglose de pago.

Todo se monta sobre el motor actual: `mode:'likert'` y el registro habitual en tests.js. No hace falta un tipo de resultado nuevo, salvo lo que exija el bloque de cribado (ver «Común a los tres de salud»).

## 1. TDAH en adultos (`tdah`)
- **Página:** `/test/test-tdah-adultos`. h1: «Test de TDAH en adultos». Categoría `bienestar`.
- **Preguntas:**
  - Las 6 del ASRS v1.1, con su escala oficial de 5 opciones (Nunca / Rara vez / A veces / A menudo / Muy a menudo) y su orden oficial.
  - Después, unas 12 propias, en Likert de frecuencia, repartidas en 5 áreas: trabajo o estudios, organización y tiempo, dinero, relaciones, y emociones e impulsividad.
- **Puntuación oficial:** las preguntas 1–3 cuentan si la respuesta es «A veces» o más. Las 4–6 cuentan si es «A menudo» o más. Con 4 o más que cuenten, el cribado es positivo. Quien lo construya debe comprobarlo contra el PDF oficial.
- **Gratis:**
  - Cribado positivo o negativo, con cuántas de las 6 superan el umbral.
  - Qué significa.
  - Si es positivo: «conviene consultarlo con un profesional (médico de cabecera, psiquiatra o psicólogo clínico)».
- **De pago:**
  - Perfil por las 5 áreas, en barras, con lo que más se nota en tu día a día.
  - Pautas prácticas por área.
  - Un guion para la consulta hecho con tus respuestas: qué áreas contar y con qué ejemplos.
  - Dónde y a quién acudir va en el bloque gratis, no aquí.

## 2. Ansiedad (`ansiedad`)
- **Página:** `/test/test-de-ansiedad`. h1: «Test de ansiedad». Categoría `bienestar`.
- **Preguntas:**
  - Las 7 del GAD-7 con su escala oficial de 0 a 3 («en las últimas 2 semanas»).
  - Después, unas 10 propias sobre 4 tipos: social, anticipatoria, física y preocupación constante.
- **Puntuación oficial:** de 0 a 21. Bandas de 0–4 mínima, 5–9 leve, 10–14 moderada y 15–21 grave.
- **Gratis:**
  - El nivel y la puntuación.
  - Qué significa.
  - Desde 10 puntos: recomendación de consultar a un profesional.
  - Siempre visible: el 024 (línea de atención a la conducta suicida) y el 112 en caso de emergencia.
- **De pago:**
  - Qué tipo de ansiedad predomina, en barras.
  - Qué la dispara.
  - Pautas con evidencia (respiración, exposición gradual, higiene del sueño) adaptadas a ese tipo.
  - Cuándo pedir ayuda va en el bloque gratis, no aquí.

## 3. ¿Tengo rasgos autistas? (`autismo`)
- **Página:** `/test/test-soy-autista`. h1: «Test: ¿tengo rasgos autistas?». Categoría `bienestar`.
- **Preguntas:** unas 30 propias, en Likert de acuerdo, en 3 áreas del DSM-5:
  - comunicación e interacción social;
  - rutinas, rigidez e intereses intensos;
  - sensibilidad sensorial.
  - Incluye ítems redactados a la inversa para frenar el sesgo de responder siempre que sí.
- **Puntuación:** no hay puntos de corte validados, así que se usan bandas por el porcentaje del máximo: rasgos bajos, medios o altos. El texto dice que son orientativas.
- **Gratis:**
  - El nivel de rasgos.
  - Qué significa.
  - En todos los niveles: dónde pedir una evaluación si te lo planteas (médico de cabecera, que deriva a salud mental; asociaciones como Autismo España). Si el nivel es alto, se dice con más claridad.
  - Que este test no está validado clínicamente y que solo una evaluación profesional diagnostica.
- **De pago:**
  - Perfil por las 3 áreas, en barras.
  - Qué significa cada una en la vida adulta.
  - Puntos fuertes asociados.
  - Un resumen de tu perfil para llevar a la evaluación: qué contar y con qué ejemplos.

## 4. ¿Cuál de los 16 tipos eres? (`tipos16`)
- **Página:** `/test/test-16-tipos-de-personalidad`. h1: «Test: ¿cuál de los 16 tipos de personalidad eres?». Categoría `personalidad`.
  - El texto puede mencionar que es una alternativa abierta a tests como el MBTI. El nombre y la marca no lo usan.
- **Preguntas:** unas 40 del banco IPIP (dominio público). Se toman las 4 escalas que McCrae y Costa (1989) relacionan con las dimensiones de tipo:
  - extraversión ↔ E/I;
  - apertura ↔ N/S;
  - amabilidad ↔ F/T;
  - responsabilidad ↔ J/P.
  - Se pueden reutilizar los ítems que ya tiene `bigfive`.
- **Puntuación:** cada escala se corta por la mitad para dar su letra. El porcentaje indica lo marcada que está cada preferencia.
- **Gratis:** las 4 letras, un nombre propio y en español para cada tipo (distinto de los de 16Personalities), una frase y la carta compartible.
- **De pago:** el porcentaje en cada letra, puntos fuertes y débiles, en pareja, en el trabajo y tipos compatibles.
- **No es sensible:** el resultado se registra en PostHog como en el resto.

## Común a los tres de salud (`tdah`, `ansiedad`, `autismo`)
- **`sensitive: true`:** no se envía el arquetipo a PostHog y se oculta la caja de enviar por email, igual que en el test de partido.
- **Datos (decisión de Mario, 2026-11-26: «1»):** se sigue el patrón del test de partido. PostHog recibe `test_id` y `test_name` en todos los eventos (anónimo, sin email), y el producto de Stripe lleva el nombre del test, como en los demás. Mario eligió esto sabiendo que el recibo de Stripe muestra el nombre del test junto al email del comprador. No se cambia api/create-checkout.js.
- **Aviso visible antes de empezar y en el resultado:** «Orienta, no diagnostica. Pensado para mayores de 18 años».
- **El bloque gratis siempre incluye**, sin que quede detrás del pago y en todos los niveles: cuándo y a quién acudir, ajustado al nivel (en los niveles bajos, «si te afecta en tu día a día, coméntalo con tu médico»); el 024 en ansiedad; y la fuente del cuestionario. Lo de pago es el análisis detallado y el guion personalizado, nunca la indicación de buscar ayuda (decisión de Claude, aplicando la regla que Mario aprobó).
- **Variante de paywall «hard»** (bandera `testia-paywall-position`, `lockResultInner` en index.html): el bloque gratis del cribado sigue visible y sin desenfocar.
- **Ficha de cada test:**
  - `instrument` y `license` como ya hacen los demás: ASRS y GAD-7 en 🟢 con cita; autismo como «Preguntas propias basadas en los criterios del DSM-5 · sin validar».
  - Indicar qué ítems son oficiales y cuáles propios.
- **Paywall de pago:** el mismo de siempre. No se ofrece «Pagar con Apple Pay» de forma distinta.

## Registro y enlaces
- **tests.js:** cada test en TESTS y en SEO_CONTENT, con 6 preguntas frecuentes y fuentes comprobadas en doi.org/Crossref o en las fuentes oficiales.
- **TEST_CAT:** en index.html y build-pages.mjs. También ICON_OF y NEXT_TEST.
- **NEXT_TEST:**
  - `tdah` → [`ansiedad`, `atencion`]
  - `ansiedad` → [`panas`, `resilience`]
  - `autismo` → [`tdah`, `empathy`]
  - `tipos16` → [`bigfive`, `eneagrama`]
- **Enlaces de vuelta:** las páginas de `bigfive` y `eneagrama` enlazan a `tipos16`. La de `atencion` enlaza a `tdah`.
- **Comprobación:** `node validate-pages.mjs` tiene que pasar.

## Decisiones de Claude (revisables)
- **Slugs y h1:** elegidos por cómo se busca en Google España.
- **Teléfonos de ayuda:** el 024 y el 112.
- **Lanzamiento:** los cuatro a la vez. Se sube cuando Mario diga «sube Testia».

## Lo que decide quien lo construye
- La redacción de los ítems propios y de los textos de resultado, siempre en español claro, sin jerga clínica y sin estereotipos.
- Los nombres de los 16 tipos y de las bandas.
- Los umbrales exactos de las bandas propias.
- Los iconos.
- La estructura interna del código.
