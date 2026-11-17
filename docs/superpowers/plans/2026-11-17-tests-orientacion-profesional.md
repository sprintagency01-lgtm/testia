# Tests de qué carrera, qué FP y qué trabajo — plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.
> Ejecución: nativa en esta sesión (Mario dijo «si, tira»).

**Goal:** publicar tres tests de orientación (`carrera`, `fp`, `trabajo`) que emparejan tu perfil con un catálogo de grados, ciclos o profesiones, con veredicto gratis y desglose de pago.
**Architecture:** los tests (ítems, escalas, SEO_CONTENT) van en tests.js como el resto; los catálogos y las funciones puras de emparejamiento van en `orientacion-catalogos.js` (cargado tras tests.js en index.html y en build-pages.mjs). index.html añade el tipo de resultado `match`, que llama a esas funciones.
**Tech Stack:** HTML/JS estático, Node para pruebas, build-pages y validate-pages, Vercel.
**Spec:** docs/superpowers/specs/2026-11-17-tests-orientacion-profesional-design.md

## Global Constraints
- `mode:"likert"`, `scaleMax:5`; unas 30–36 afirmaciones por test.
- 14 dimensiones con estas claves exactas: intereses R I A S E C; puntos fuertes NUM LEN MAN PER; lo que buscas EST ING IMP AUT. `trabajo` añade GRA PYM AUT_ PUB REM (entorno; `AUT_` para no chocar con AUT).
- Pesos de grupo: intereses 0,55 · puntos fuertes 0,30 · lo que buscas 0,15.
- Gratis: ficha top (nombre, «N % de afinidad», una frase de por qué) y carta. De pago (1,99 €, incluido en el pase de 4,99 €): top 5, por qué encajas, salidas, barras de perfil y bloque propio de cada test.
- Sin notas de corte numéricas, sin sueldos, sin universidades ni centros concretos. Aviso de nota alta solo en: Medicina, Odontología, Enfermería, Fisioterapia, Veterinaria, Biotecnología y dobles grados.
- No `sensitive`. Carta y titulares sin iniciales (regla de Testia): el `mono` de la carta es el porcentaje de afinidad.
- Ningún ítem ni ficha menciona género ni da por hecho quién «suele» estudiar algo.
- Slugs: `test-que-carrera-estudiar`, `test-que-fp-estudiar`, `test-que-trabajo-es-para-mi`. TEST_CAT `profesional`.
- NEXT_TEST: carrera → [fp, riasec]; fp → [carrera, trabajo]; trabajo → [riasec, values].
- Subir a producción solo cuando Mario diga «sube Testia».

## Review Focus
1. Todo respondido neutral → `orientFlat` verdadero y texto de «perfil abierto», nunca «encajas claramente» (prueba en Task 1).
2. Catálogo desequilibrado: una ficha que gana para casi cualquiera → prueba de reparto con perfiles al azar (Tasks 2–4).
3. `trabajo` con entorno ideal que no está en los entornos de la profesión top → el texto dice «en esta profesión lo habitual es…» (comprobación en navegador, Task 4).
4. Nombres largos de ciclos («Técnico Superior en Desarrollo de Aplicaciones Multiplataforma») en la carta y el titular a 375 px → sin desbordar ni scroll lateral (Task 5).
5. Ítems o fichas con sesgo de género o de clase → lectura con `grep` de palabras marcadas y revisión de todos los textos antes de publicar (Task 5).

---

### Task 1: Motor de emparejamiento

**Files:**
- Create: `orientacion-catalogos.js` (funciones arriba; catálogos vacíos `carrera:[],fp:[],trabajo:[]` por ahora)
- Create: `scripts/test-orientacion.mjs`

**Interfaces:**
- Produces:
  - `window.ORIENT_DIMS = {INT:['R','I','A','S','E','C'], FUE:['NUM','LEN','MAN','PER'], VAL:['EST','ING','IMP','AUT']}`
  - `window.ORIENT_CATALOGS = {carrera:Entry[], fp:Entry[], trabajo:Entry[]}`. Entry común: `{id, name, prof:{14 claves 0–100}, why, salidas}`. Extra carrera: `{rama, bach, asig:[string], alta?:true, fpAlt?:fpId}`. Extra fp: `{familia, nivel:'GM'|'GS', puente:boolean}`. Extra trabajo: `{entornos:['GRA'|'PYM'|'AUT_'|'PUB'], entrada}`.
  - `window.orientMatch(pct:{[dim]:number}, catalog:Entry[]) -> [{e:Entry, score:number(0–100, entero), top:string[] (hasta 3 dims)}]` ordenado de mayor a menor. score = 100 − suma por grupo de (peso × media del |pct−prof| de sus dims). `top` = dims con pct ≥ 60 y prof ≥ 60, ordenadas por min(pct, prof).
  - `window.orientFlat(pct, ranked) -> boolean`: verdadero si la desviación típica de las 14 dims del usuario < 8 o `ranked[0].score − ranked[4].score < 3`.

- [ ] **Step 1: Escribir las pruebas** en `scripts/test-orientacion.mjs` (carga el archivo con `new Function('window', code)(win)` como hace build-pages; catálogo de prueba propio de 6 fichas):
  - `perfect`: pct igual al `prof` de la ficha 3 → `ranked[0].e.id === fichas[3].id` y `score >= 99`.
  - `neutral`: las 14 dims a 50 → `orientFlat === true`.
  - `interestsWeighMore`: dos fichas que difieren solo en S (90 frente a 10) o solo en EST (90 frente a 10); usuario con S=90 y EST=10 → gana la de S=90.
  - `topDims`: usuario y ficha con I=80, NUM=75, resto a 30 → `top` contiene `I` y `NUM`.
- [ ] **Step 2:** `node scripts/test-orientacion.mjs` → falla con `orientMatch is not a function`.
- [ ] **Step 3:** implementar `orientMatch` y `orientFlat` en `orientacion-catalogos.js`.
- [ ] **Step 4:** `node scripts/test-orientacion.mjs` → `4/4 OK`.
- [ ] **Step 5:** commit «Motor de emparejamiento para los tests de orientación».

### Task 2: Test `carrera` y tipo de resultado `match`

**Files:**
- Modify: `orientacion-catalogos.js` (catálogo `carrera`, unos 50 grados de las cinco ramas)
- Modify: `tests.js` (bloque nuevo al final: test `carrera` + SEO_CONTENT)
- Modify: `index.html` (cargar `orientacion-catalogos.js?v=20261117` tras `aptitud.js`; rama `R.type==='match'` antes del `else` final de tipos; TEST_CAT, ICON_OF, NEXT_TEST)
- Modify: `build-pages.mjs` (añadir `orientacion-catalogos.js` a la lista de generadores de la línea 28; TEST_CAT)
- Modify: `scripts/test-orientacion.mjs`

**Interfaces:**
- Consumes: `orientMatch`, `orientFlat`, `ORIENT_CATALOGS` (Task 1).
- Produces: test `{id:"carrera", result:{type:"match"}, catalog:"carrera", scales:{las 14}}`. Rama `match` que rellena `r.name, r.role, r.desc, r.stats, r.bars, r.analysis, r.card` y lee el bloque propio con `T.catalog` (`carrera`: rama, Bachillerato y asignaturas, aviso `alta`, `fpAlt`; `fp` y `trabajo` en las Tasks 3–4).

- [ ] **Step 1: Añadir pruebas del catálogo** a `scripts/test-orientacion.mjs`:
  - `carreraIntegrity`: ≥ 45 fichas, ids únicos, las 14 dims con valores 0–100, `why`, `salidas`, `bach` y `asig` no vacíos, las 5 ramas presentes, `alta:true` solo en la lista de Global Constraints.
  - `carreraSpread`: 2000 perfiles al azar (dims uniformes 0–100) → ninguna ficha es top más del 12 % de las veces y ≥ 30 fichas son top alguna vez.
- [ ] **Step 2:** ejecutar → falla (catálogo vacío).
- [ ] **Step 3:** escribir el catálogo `carrera` con nombres de grado reales (RUCT) y el test `carrera` en tests.js: 34 ítems (3 por interés, 2 por punto fuerte, 2 por valor, 1 inverso por grupo), SEO_CONTENT con seoTitle ≤ 60 caracteres, metaDesc < 160, h1 «Test: ¿qué carrera estudiar?», 6 FAQs y fuentes comprobadas (Holland; O*NET; RUCT).
- [ ] **Step 4:** ejecutar → todo OK; si `carreraSpread` falla, ajustar los perfiles de las fichas que acaparan, no el umbral.
- [ ] **Step 5:** implementar la rama `match` en index.html. Textos: titular = nombre de la ficha; role = «N % de afinidad · <rama>»; si `orientFlat`, desc empieza por «Tu perfil está abierto: varias opciones encajan casi igual…». Análisis de pago: top 5 con score, por qué encajas (`top` → frases por dim), salidas, Bachillerato y asignaturas, aviso de nota alta si `alta`, alternativa en FP si `fpAlt`.
- [ ] **Step 6:** comprobar en el navegador (preview local): todo neutral → «perfil abierto»; respuestas de perfil sanitario (S, I, IMP altos) → un grado de Ciencias de la Salud en el top 3; el desglose bloqueado tras el muro; sin errores en consola.
- [ ] **Step 7:** commit «Test ¿qué carrera estudiar?».

### Task 3: Test `fp`

**Files:** `orientacion-catalogos.js` (catálogo `fp`), `tests.js`, `index.html` (bloque propio de `fp` en la rama `match`, registros), `build-pages.mjs` (TEST_CAT), `scripts/test-orientacion.mjs`.

**Interfaces:** consume la rama `match` (Task 2). Bloque propio: familia, «Grado medio» o «Grado superior», otros ciclos de la misma familia, `puente` → «da acceso a la universidad» (solo GS).

- [ ] **Step 1:** comprobar en todofp.es la lista vigente de familias profesionales y los nombres exactos de los ciclos elegidos; anotar la URL y la fecha en un comentario del catálogo.
- [ ] **Step 2: pruebas** `fpIntegrity` (todas las familias de la lista del Step 1 presentes, 2–4 ciclos por familia, `nivel` ∈ {GM, GS}, `puente` verdadero solo si GS) y `fpSpread` (mismos umbrales que `carreraSpread`).
- [ ] **Step 3:** ejecutar → falla.
- [ ] **Step 4:** catálogo y test `fp` (34 ítems orientados a tareas prácticas, SEO_CONTENT completo, h1 «Test: ¿qué FP estudiar?»).
- [ ] **Step 5:** ejecutar → OK. Comprobar en el navegador: un perfil R+MAN alto saca un ciclo de una familia técnica; los `fpAlt` de `carrera` apuntan a ids que existen (añadir esa comprobación a `carreraIntegrity`).
- [ ] **Step 6:** commit «Test ¿qué FP estudiar?».

### Task 4: Test `trabajo` con entorno ideal

**Files:** `orientacion-catalogos.js` (catálogo `trabajo`, unas 60 profesiones), `tests.js`, `index.html`, `build-pages.mjs`, `scripts/test-orientacion.mjs`.

**Interfaces:**
- Produces: `window.orientEnv(pct) -> {env:'GRA'|'PYM'|'AUT_'|'PUB', remote:'remoto'|'presencial'|null}`. `env` = el máximo de las cuatro; `remote` = 'remoto' si REM ≥ 60, 'presencial' si REM ≤ 40, si no null.
- El entorno no entra en `orientMatch` (solo las 14 dims).

- [ ] **Step 1: pruebas** `envPick` (PUB=80, resto 40, REM=70 → `{env:'PUB', remote:'remoto'}`; REM=50 → `remote:null`), `trabajoIntegrity` (≥ 55 fichas, `entornos` no vacío y con claves válidas, `entrada` no vacía) y `trabajoSpread`.
- [ ] **Step 2:** ejecutar → falla.
- [ ] **Step 3:** `orientEnv`, catálogo y test `trabajo`: 2 ítems por interés, 2 por punto fuerte, 2 por valor, 1 por entorno (GRA, PYM, AUT_, PUB) y 1 de REM (33 en total), SEO_CONTENT con h1 «Test: ¿qué trabajo es para mí?».
- [ ] **Step 4:** bloque propio en la rama `match`: el veredicto gratis añade el entorno («…en el sector público, mejor en remoto»); si `env` no está en `e.entornos`: «En esta profesión lo habitual es <entornos[0]>.» Pago: lo que te frena (la dim de VAL con mayor |pct − prof|) y por dónde empezar (`entrada`).
- [ ] **Step 5:** ejecutar las pruebas → OK. Navegador: forzar un caso con entorno incompatible y ver la frase «lo habitual es».
- [ ] **Step 6:** commit «Test ¿qué trabajo es para mí?».

### Task 5: Landings, enlaces y revisión final

**Files:** `build-pages.mjs` (si hace falta), páginas generadas, `tests.js` (landing del vocacional `riasec`: sección que enlaza a los tres), sitemap/llms.txt (los genera build-pages).

- [ ] **Step 1:** `node build-pages.mjs carrera fp trabajo riasec` y `node validate-pages.mjs` → sin errores.
- [ ] **Step 2:** revisión de sesgos: `grep -niE "chic[oa]s|mujeres|hombres|niñ[oa]s"` sobre los ítems y catálogos nuevos → sin resultados, o justificados; y lectura de todos los `why` y las salidas.
- [ ] **Step 3:** navegador a 375 px: landings y resultado de los tres, con la ficha de nombre más largo, sin scroll lateral; carta compartible legible.
- [ ] **Step 4:** `node scripts/test-orientacion.mjs` → todo OK; commit «Landings y enlaces de los tests de orientación».
- [ ] **Step 5:** revisión de la rama completa por un revisor nuevo; corregir lo que encuentre.
- [ ] **Step 6:** avisar a Mario. Cuando diga «sube Testia»: merge a main, push, `vercel deploy --prod --yes`, comprobación con curl de las tres URLs e IndexNow.
