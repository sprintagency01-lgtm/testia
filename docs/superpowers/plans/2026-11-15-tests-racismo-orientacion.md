# Tests de racismo, racismo implícito y orientación sexual — plan

> Ejecución: nativa en esta sesión (Mario dijo «tira»).

**Goal:** publicar tres tests sensibles (`racismo`, `implicito`, `orientacion`) con muro de pago en el desglose.
**Architecture:** motor único en index.html; cada test es un bloque en tests.js (TESTS + SEO_CONTENT); landings con build-pages.mjs. El implícito añade `mode:'iat'` (pantalla propia, devuelve latencias a `finish()`).
**Tech Stack:** HTML/JS estático, Node para build-pages/validate-pages, Vercel.
**Spec:** docs/superpowers/specs/2026-11-15-tests-racismo-orientacion-design.md

## Global Constraints
- `sensitive:true` en los tres (sin resultado en result_viewed, sin email, sin respuestas en PostHog).
- Veredicto gratis; desglose por 1,99 € (`r.full` + análisis bloqueados como en narcisismo).
- seoTitle ≤ 60 caracteres aprox., metaDesc < 160, h1 propio en minúscula tipo frase; fuentes comprobadas con Crossref/doi.org.
- Titulares de resultado sobre el tema del test (p. ej. «32 % de prejuicio»), nunca «Índice X/100».
- Registrar cada test en: tests.js, TEST_CAT (index.html y build-pages.mjs), ICON_OF, NEXT_TEST.

## Review Focus
1. Quien responde todo neutral en `racismo` no debe salir con «prejuicio marcado» (umbral ≥ 55).
2. `implicito` en móvil: los botones deben responder al toque sin zoom ni doble toque, y la tecla E/I en escritorio.
3. `implicito` con respuestas al azar muy rápidas (> 10 % por debajo de 300 ms): resultado «no válido» con opción de repetir, sin veredicto.
4. `orientacion` con «Prefiero no ponerme etiqueta» y «No he tenido experiencias»: esas respuestas no cuentan en la escala.
5. `orientacion` con atracción general muy baja: resultado de espectro asexual (Kinsey «X»), no «Kinsey 3».

---

### Task 1: Test `racismo` (cuestionario)
**Files:** tests.js (bloque nuevo al final), index.html (result type `racism`, registros), build-pages.mjs (TEST_CAT).
- Escalas AME, DIS, CUL, EMO, MOD; 4 ítems cada una, 1 inverso.
- `racism`: ix = media; niveles <30 «Sin prejuicios a la vista», <55 «Prejuicios puntuales», <70 «Prejuicio marcado», ≥70 «Prejuicio fuerte»; tipo (ix ≥ 30): manifiesto si media(AME,DIS) ≥ 55, si no sutil.
- Verificación: hacer el test en el navegador con todo neutral (→ «Prejuicios puntuales», ~50 %) y con todo en contra del prejuicio (→ «Sin prejuicios…»).

### Task 2: Test `orientacion`
**Files:** tests.js, index.html (result type `orient`), build-pages.mjs.
- `mode:'choice'`; ítems con `s:'K'` (v 0–6, o −1 = no cuenta), `d` (dimensión) y `past:true`; ítems `s:'ASX'` (v 0–4).
- Kinsey presente = media ponderada de ítems presentes válidos; pasado igual; espectro asexual si las dos preguntas de atracción/interés sexual ≤ 1.
- Verificación: tres recorridos (todo «solo otro género» → Kinsey 0; mitad → 3; atracción nula → espectro asexual).

### Task 3: Modo `iat` y test `implicito`
**Files:** index.html (startTest → `startIAT()`, scoring `iat` en finish, CSS del escenario), tests.js, build-pages.mjs.
- 7 bloques 16/16/16/32/16/16/32, orden contrabalanceado al azar; error = aspa roja y hay que corregir; latencia hasta la respuesta correcta.
- D mejorado: descartar > 10 000 ms; inválido si > 10 % < 300 ms; D = media de (M6−M3)/SD(3∪6) y (M7−M4)/SD(4∪7), positivo = preferencia por nombres españoles.
- Umbrales |D|: 0,15 / 0,35 / 0,65.
- Verificación: simular respuestas en el navegador con latencias controladas (compatibles rápidas → preferencia por españoles; todo a 150 ms → no válido).

### Task 4: Landings, validación y publicación
- SEO_CONTENT de los tres, `node build-pages.mjs <id>`, `node validate-pages.mjs`, prueba en móvil (375 px, sin scroll lateral), commit, merge a main, push y `vercel deploy --prod --yes` (Mario ya pidió subir Testia), IndexNow.
