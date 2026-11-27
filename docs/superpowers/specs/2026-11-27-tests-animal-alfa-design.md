# Tests «¿Qué animal eres?» y «¿Eres alfa, beta, omega, sigma o enigma?» — diseño breve

**Por qué:** traer tráfico de Google y ChatGPT con búsquedas recreativas grandes. Las sugerencias de Google (27-11-2026) muestran «test qué animal eres», «según tu personalidad» y «test animal espiritual». Para «test alfa beta omega» dominan las variantes del omegaverse («enigma», «omegaverse», «alfa beta u omega») y aparece algo de la jerarquía social («alfa beta o sigma»).

**Enfoques:**
- A) Solo omegaverse.
- B) Solo jerarquía social.
- C) Mezcla: cinco perfiles de personalidad, la página explica los tres orígenes.

**Mario eligió C** («la C, adelante»).

## Decisiones
- **Formato:** el del test de bruja (`result:{type:"profileBars"}`, likert de 5 puntos, `hideCardBars`). El resultado gratis es el arquetipo. El análisis completo (barras e `interp` por perfil) se paga 1,99 €, como en bruja. No hace falta tocar el motor salvo para registrar los tests: ARCHE, TEST_CAT, ICON_OF y NEXT_TEST, además de TEST_CAT en build-pages.
- **Animal** (`id:"animal"`, slug `test-que-animal-eres`):
  - 8 animales con 3 ítems cada uno, 24 preguntas: lobo, búho, delfín, gato, águila, zorro, oso y mariposa.
  - Resultado «Eres lobo», etc.
  - Icono nuevo de línea «paw».
- **Alfa** (`id:"alfa"`, slug `test-alfa-beta-omega`):
  - 5 perfiles con 4 ítems cada uno, 20 preguntas: alfa, beta, omega, sigma y enigma.
  - Todos los perfiles son positivos y sin género. «Beta» y «omega» nunca se describen como inferiores, sumisos ni perdedores.
  - **Nada sexual:** gran parte del público del omegaverse es adolescente.
  - Icono «users».
- **Páginas:**
  - Alfa: el mito del lobo alfa (Schenkel 1947; Mech 1999, doi 10.1139/z99-099); el omegaverse descrito como género de ficción, sin detalles; el sigma como meme de internet; efecto Forer.
  - Animal: tótem y nahual como origen del «animal espiritual»; personalidad en animales (Gosling y John 1999, doi 10.1111/1467-8721.00017); efecto Forer.
- **No incluye:**
  - Variantes «según tu fecha, signo o nombre».
  - Versión en inglés.
  - Desempate entre perfiles: con empate gana el primero en el orden de escalas, como en bruja.

## Pruebas (scripts/test-animal-alfa.mjs)
- Escalas, ítems por escala, `topDesc` e `interp` completos.
- SEO con su slug y 5 o más FAQ.
- Ninguna palabra sexual ni despectiva en el test alfa.
- ARCHE, ICON_OF y NEXT_TEST registrados en index.html.
- Las landings existen.
