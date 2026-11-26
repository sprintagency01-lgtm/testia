# Tests de TDAH, ansiedad, rasgos autistas y 16 tipos: plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.
> Ejecución: nativa en esta sesión, como en los planes anteriores.

**Goal:** publicar cuatro tests (`tdah`, `ansiedad`, `autismo`, `tipos16`). Cada uno tiene su página para Google, un veredicto gratis y un desglose de pago.

**Architecture:**
- Las funciones puras de puntuación (cribado ASRS, GAD-7, bandas de rasgos y tipo de 4 letras) van en un archivo nuevo, `salud.js`, con pruebas en Node.
- Los tests (ítems, escalas, textos y SEO_CONTENT) van en tests.js, como el resto.
- index.html añade dos tipos de resultado, `screen` y `type16`, más un bloque de ayuda gratis (`#resHelp`), etiquetas de respuesta por test (`T.labels`) y la bandera `T.screening`, que impide que el muro «hard» tape el veredicto.

**Tech Stack:** HTML y JS estático, Node para las pruebas, build-pages y validate-pages, Vercel.

**Spec:** docs/superpowers/specs/2026-11-26-tests-tdah-ansiedad-autismo-16-tipos-design.md

## Global Constraints
- **Ítems oficiales intactos y seguidos al principio del test:**
  - ASRS v1.1, 6 preguntas: texto, orden y las 5 opciones de la versión de España de Harvard (`6Q_Spanish (for Spain)_final.pdf`), con el aviso de copyright exacto del PDF.
  - GAD-7, 7 preguntas: versión española de García-Campayo et al. (2010), con escala de 0 a 3 en las últimas 2 semanas.
  - El texto de ambos se transcribe desde la fuente; no se redacta de memoria.
- **El veredicto gratis sale solo de los ítems oficiales.** Los ítems propios solo alimentan barras y análisis de pago.
- **Autismo:** todas las preguntas son propias, en 3 áreas (comunicación e interacción social, rutinas e intereses, sensibilidad sensorial), e incluyen ítems a la inversa. No se calca ningún ítem de AQ, AQ-10, CATI ni RAADS-R.
- **tipos16:** ítems IPIP. «MBTI» y «16Personalities» no aparecen en `name`, `seoTitle`, `h1` ni `metaDesc`. Los 16 nombres de tipo son propios.
- **Slugs, h1 y categorías:**

  | Test | Slug | h1 | TEST_CAT |
  |---|---|---|---|
  | `tdah` | `test-tdah-adultos` | «Test de TDAH en adultos» | bienestar |
  | `ansiedad` | `test-de-ansiedad` | «Test de ansiedad» | bienestar |
  | `autismo` | `test-soy-autista` | «Test: ¿tengo rasgos autistas?» | bienestar |
  | `tipos16` | `test-16-tipos-de-personalidad` | «Test: ¿cuál de los 16 tipos de personalidad eres?» | personalidad |

- **NEXT_TEST:**
  - tdah → [ansiedad, atencion]
  - ansiedad → [panas, resilience]
  - autismo → [tdah, empathy]
  - tipos16 → [bigfive, eneagrama]
- **Los tres de salud** llevan `sensitive:true` y `screening:true`. Muestran «Orienta, no diagnostica. Pensado para mayores de 18 años» antes de empezar (en `T.prompt` o en la intro) y en el resultado.
- **Lo gratis siempre incluye**, en todos los niveles y sin quedar detrás del pago:
  - cuándo y a quién acudir, ajustado al nivel;
  - en ansiedad, el 024 y el 112;
  - la fuente del cuestionario.
- **Lo de pago** es el análisis por áreas y el guion o resumen personalizado para la consulta. Nunca es la indicación de buscar ayuda.
- **Datos:** como en el test de partido. No se toca api/create-checkout.js.
- **`instrument` de cada test dice qué es oficial y qué propio.** Por ejemplo: «ASRS v1.1 de 6 preguntas (Kessler et al., 2005; © …) + preguntas propias para el desglose». ASRS y GAD-7 llevan `license:"🟢"`.
- **Cada cambio en `index.html` se copia a `testia.html`.** Tienen que quedar idénticos.
- **Subida a producción:** solo cuando Mario diga «sube Testia».

## Review Focus
1. **Variante de muro «hard» en un test de salud:** el veredicto y `#resHelp` deben verse sin desenfocar. Prueba en el navegador en la Task 2.
2. **Bordes del cribado ASRS:** la pregunta 4 en «A veces» no cuenta, y 3 que cuentan dan negativo. Bordes del GAD-7: 4/5, 9/10 y 14/15. Pruebas en Node en la Task 1.
3. **Empate a 50 en una escala de tipos16:** la letra debe salir siempre la misma (E, N, F o J). Prueba en Node en la Task 1.
4. **Veredictos largos en la carta y el titular a 375 px** (por ejemplo «Rasgos autistas altos», «Cribado de TDAH positivo»): sin desbordar ni scroll lateral. Comprobación en la Task 6.
5. **Fuga de datos en tests de salud:** `result_viewed` sin `archetype` y la caja de email oculta. Comprobación en las peticiones de red en la Task 2.

---

### Task 1: Motor de puntuación `salud.js`

**Files:**
- Create: `salud.js`
- Create: `scripts/test-salud.mjs`, cargando el archivo con `new Function('window', code)(win)`, como en `scripts/test-orientacion.mjs`.

**Interfaces (Produces):**
- `window.asrsScreen(v:number[6]) -> {positive:boolean, count:number}`
  - `v` son respuestas de 1 a 5 (1 = Nunca … 5 = Muy a menudo).
  - Las preguntas 1–3 cuentan si v ≥ 3. Las 4–6 cuentan si v ≥ 4.
  - `positive` es `count >= 4`.
- `window.gad7Score(v:number[7]) -> {score:number, band:'minima'|'leve'|'moderada'|'grave'}`
  - `v` son respuestas de 1 a 4. La puntuación es la suma de (v − 1), de 0 a 21.
  - Bandas: 0–4, 5–9, 10–14 y 15–21.
- `window.traitBand(p:number) -> 'bajo'|'medio'|'alto'`
  - p < 40 → bajo; p < 66 → medio; el resto → alto.
- `window.type16(pct:{E,O,A,C}) -> {code:string, parts:[{axis:'EI'|'NS'|'FT'|'JP', letter:string, strength:number}]}`
  - E ≥ 50 → E, si no I. O ≥ 50 → N, si no S. A ≥ 50 → F, si no T. C ≥ 50 → J, si no P.
  - `strength = Math.round(Math.abs(p − 50) * 2)`, de 0 a 100.

- [ ] **Step 1: escribir las pruebas.**
  - `asrsPositive`: [3,3,3,4,4,1] → `{positive:true, count:5}`.
  - `asrsItem4AVeces`: [3,3,3,3,1,1] → `count === 3` y `positive === false`.
  - `asrsAllNever`: [1,1,1,1,1,1] → `count === 0`.
  - `gad7Edges`: sumas de 4, 5, 9, 10, 14 y 15 → minima, leve, leve, moderada, moderada y grave. [4,4,4,4,4,4,4] → `score === 21`.
  - `traitBandEdges`: 39.9 → bajo; 40 → medio; 65.9 → medio; 66 → alto.
  - `type16Basic`: {E:80,O:20,A:30,C:70} → `code === 'ESTJ'` y la strength de EI es 60.
  - `type16Tie`: {E:50,O:50,A:50,C:50} → `code === 'ENFJ'`.
- [ ] **Step 2:** `node scripts/test-salud.mjs` falla con «asrsScreen is not a function».
- [ ] **Step 3:** implementar las cuatro funciones en `salud.js`.
- [ ] **Step 4:** `node scripts/test-salud.mjs` → `7/7`.
- [ ] **Step 5:** commit «Motor de puntuación para los tests de salud y de 16 tipos».

### Task 2: Test `tdah` y soporte de cribado en index.html

**Files:**
- **Modify `index.html`:**
  - Cargar `salud.js?v=20261126` tras `orientacion-catalogos.js`.
  - `likertLabels`: devolver `t.labels` si existe, antes de las reglas actuales.
  - Añadir `<div id="resHelp"></div>` tras `#coupleBox`, en la parte gratis.
  - `renderResult` pinta `r.help` (HTML) en `#resHelp`, o lo vacía.
  - En `lockResultInner`, si `T.screening`, usar siempre la variante `control`.
  - Rama `R.type==='screen'`, antes del `else` final, que despacha por `R.kind`: `'asrs'|'gad7'|'traits'`.
  - Añadir los tests nuevos a TEST_CAT, ICON_OF y NEXT_TEST.
- **Modify `tests.js`:** test `tdah` y su entrada en SEO_CONTENT, con la misma forma que `panas`. Si no hay icono adecuado, usar uno existente de ICON_OF.
- **Modify `build-pages.mjs`:** TEST_CAT.

**Interfaces:**
- **Consumes:** `asrsScreen` y `traitBand` (Task 1).
- **Produces:**
  - **Campos de test:**
    - `T.labels: string[]`.
    - `T.screening: true`.
    - `T.official: number`: cuántos ítems iniciales son oficiales.
    - `result:{type:'screen', kind:'asrs'|'gad7'|'traits'}`.
    - `T.verdicts`: textos del veredicto por resultado, con claves `positive`/`negative` en asrs, las 4 bandas en gad7, y `bajo`/`medio`/`alto` en traits. Cada uno es `{name, desc, help}`; `help` es HTML con cuándo y a quién acudir.
    - `T.interp`: textos lo/mid/hi por escala propia.
    - `T.guide(pct, verdictKey) -> string`: el guion de pago con las 2 áreas más altas.
  - **Resultado `r` para `screen`:**
    - `r.name = verdicts[k].name`, `r.desc = verdicts[k].desc` y `r.help = verdicts[k].help`, además del aviso «Orienta, no diagnostica…».
    - `r.bars`: escalas propias, todas `premium:true`.
    - `r.analysis`: una tarjeta por escala propia y la tarjeta «Para tu consulta» con `T.guide(...)`.
    - `r.stats`: en asrs, `{v:count+'/6', l:'por encima del umbral'}`.
    - `r.card.stat`: el nombre del veredicto en mayúsculas.
- **Datos del test `tdah`:**
  - `scaleMax:5` y `labels`: las 5 opciones del PDF.
  - Primeros 6 ítems oficiales con `s:'ASRS'`.
  - Unos 12 ítems propios, de 2 a 3 por escala, en `TRA` (trabajo o estudios), `ORG` (organización y tiempo), `DIN` (dinero), `REL` (relaciones) y `EMO` (emociones e impulsividad).
  - Las barras de pago excluyen `ASRS`.

- [ ] **Step 1:** obtener el texto exacto del PDF de España del ASRS (Harvard: hcp.med.harvard.edu/ncs/ftpdir/adhd/) y su aviso de copyright. Comprobar con el PDF el algoritmo de la Task 1 y anotarlo en un comentario de tests.js.
- [ ] **Step 2:** escribir el test `tdah`, su SEO_CONTENT (6 FAQs y fuentes comprobadas en doi.org o Crossref: Kessler et al. 2005 y la validación española) y su registro.
- [ ] **Step 3:** implementar en index.html todo lo de «Files».
- [ ] **Step 4:** `node scripts/test-salud.mjs && node build-pages.mjs && node validate-pages.mjs` → todo OK.
- [ ] **Step 5: comprobar en el navegador**, con la vista previa `testia-static` en la ruta `/?start=tdah`:
  - Todo «Muy a menudo» → «positivo», `#resHelp` visible y fuera del muro, y la tarjeta «Para tu consulta» dentro del contenido de pago.
  - Todo «Nunca» → «negativo», con `#resHelp` visible.
  - Forzar `sessionStorage.atlas_pw_force='hard'` → veredicto y ayuda sin desenfocar.
  - En las peticiones de red, `result_viewed` no lleva `archetype` y la caja de email está oculta.
- [ ] **Step 6:** commit «Test de TDAH en adultos (ASRS v1.1) y soporte de cribado».

### Task 3: Test `ansiedad`

**Files:** Modify `tests.js` (test y SEO_CONTENT) e `index.html` (solo si la rama `gad7` necesita algo más que lo de la Task 2).

**Interfaces:**
- **Consumes:** la rama `screen` (Task 2) y `gad7Score` (Task 1).
- **Datos:**
  - `scaleMax:4`.
  - `labels`: ["Nunca","Varios días","Más de la mitad de los días","Casi todos los días"], o la redacción exacta de la versión española validada.
  - `prompt`: «En las últimas 2 semanas, ¿con qué frecuencia…?».
  - 7 ítems oficiales `s:'GAD'` y unos 10 propios en `SOC` (social), `ANT` (anticipatoria), `FIS` (física) y `PRE` (preocupación constante).
  - `verdicts` con las 4 bandas. Desde «moderada», `help` recomienda consultar a un profesional. En todas las bandas, `help` incluye el 024 y el 112.
  - `r.stats`: `{v:score+'/21', l:'puntuación GAD-7'}`.

- [ ] **Step 1:** obtener los 7 ítems de la versión española validada (García-Campayo et al. 2010, Health Qual Life Outcomes; comprobar el DOI en Crossref).
- [ ] **Step 2:** escribir el test, su SEO_CONTENT (fuentes: Spitzer et al. 2006 y García-Campayo et al. 2010) y su registro.
- [ ] **Step 3:** `node build-pages.mjs && node validate-pages.mjs` → OK.
- [ ] **Step 4: comprobar en el navegador:**
  - Todo «Nunca» → mínima, 0/21, con el 024 visible gratis.
  - Todo «Casi todos los días» → grave, 21/21, con la recomendación de profesional gratis.
- [ ] **Step 5:** commit «Test de ansiedad (GAD-7)».

### Task 4: Test `autismo`

**Files:** Modify `tests.js`.

**Interfaces:**
- **Consumes:** la rama `screen` con `kind:'traits'` (Task 2) y `traitBand` (Task 1).
- **Datos:**
  - `scaleMax:5` con las etiquetas de acuerdo por defecto.
  - Unos 30 ítems propios, unos 10 por escala, en `SOC`, `RUT` y `SEN`, con al menos 3 ítems `r:true` por escala.
  - `T.official:0`.
  - Veredicto: `traitBand(media de SOC, RUT y SEN)`.
  - `instrument`: «Preguntas propias basadas en los criterios del DSM-5 · sin validar clínicamente».
  - `license:"🟡"`.
  - `help` en las tres bandas: médico de cabecera, que deriva a salud mental, y Autismo España. En la banda «alto», con más claridad.

- [ ] **Step 1:** redactar los ítems y textos. Revisar que ninguno reproduzca un ítem de AQ, CATI o RAADS-R.
- [ ] **Step 2:** escribir el test, su SEO_CONTENT (fuentes: DSM-5 de la APA, 2013, y una revisión con DOI sobre rasgos autistas en adultos) y su registro.
- [ ] **Step 3:** `node build-pages.mjs && node validate-pages.mjs` → OK.
- [ ] **Step 4: comprobar en el navegador:**
  - Todo «Totalmente de acuerdo» → la banda no es «alto» por los ítems inversos; sale «medio».
  - Respuestas de rasgos altos coherentes, invirtiendo las de los ítems inversos → «alto».
- [ ] **Step 5:** commit «Test de rasgos autistas (preguntas propias, DSM-5)».

### Task 5: Test `tipos16`

**Files:** Modify `tests.js` (test, `types` y SEO_CONTENT) e `index.html` (rama `R.type==='type16'`).

**Interfaces:**
- **Consumes:** `type16` (Task 1).
- **Datos:**
  - `mode:'likert'`, `scaleMax:5`.
  - `scales:{E,O,A,C}` con 10 ítems IPIP cada una, reutilizando los de `bigfive` (incluido su `r`).
  - `T.types`: un objeto con las 16 claves, de `'INTJ'` a `'ESFP'`, cada una `{name, desc, fuertes, debiles, pareja, trabajo, compatibles:[code,code]}`.
- **Resultado:**
  - Gratis: `r.name = code+' · '+types[code].name`, `r.desc` y la carta, con `card.mono = code`.
  - De pago: `r.bars` con las 4 preferencias y su porcentaje (`premium:true`), y `r.analysis` con fuertes y débiles, pareja, trabajo y compatibles.
  - No es `sensitive`.

- [ ] **Step 1:** escribir el test, los 16 tipos y su SEO_CONTENT (fuentes: Goldberg 1992 sobre IPIP y McCrae y Costa 1989 sobre la relación con las dimensiones de tipo, con DOI). El texto puede decir «alternativa abierta a tests como el MBTI», pero el título y el h1 no.
- [ ] **Step 2:** implementar la rama `type16` en index.html.
- [ ] **Step 3:** `node scripts/test-salud.mjs && node build-pages.mjs && node validate-pages.mjs` → OK.
- [ ] **Step 4: comprobar en el navegador** que un juego de respuestas da un código coherente con el de `type16` y que la carta pinta las 4 letras.
- [ ] **Step 5:** commit «Test de los 16 tipos de personalidad (IPIP)».

### Task 6: Enlaces, revisión final y móvil

**Files:** Modify `tests.js`: el SEO_CONTENT de `bigfive` y `eneagrama` enlaza a tipos16, y el de `atencion` enlaza a tdah.

- [ ] **Step 1:** añadir los enlaces de vuelta.
- [ ] **Step 2: comprobaciones finales.** `grep -n "MBTI\|16Personalities"` sobre los campos `name`, `seoTitle`, `h1` y `metaDesc` de los cuatro tests debe dar 0 resultados. Buscar en sus textos «diagnostica», «tienes TDAH» y «eres autista», y corregir cualquier afirmación de diagnóstico.
- [ ] **Step 3:** `node scripts/test-salud.mjs && node scripts/test-orientacion.mjs && node scripts/test-iab-handoff.mjs && node build-pages.mjs && node validate-pages.mjs` → todo OK. Comprobar que `index.html` y `testia.html` son idénticos (`cmp`).
- [ ] **Step 4:** a 375 px, recorrer el resultado de los 4 tests: veredicto, carta y `#resHelp` sin desbordar ni scroll lateral. Comprobar las 4 páginas `/test/…`.
- [ ] **Step 5:** commit «Enlaces y repaso final de los tests de salud y 16 tipos».
