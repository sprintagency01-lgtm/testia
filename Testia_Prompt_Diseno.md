# Prompt para Claude design — Diseño de Testia

> Copia todo lo de abajo y pégalo en Claude design.

---

Eres mi diseñador de producto. Quiero que diseñes **Testia**, una plataforma web de tests psicológicos online en español. Entrégame un sistema de diseño completo y los mockups de todas las pantallas clave (web y móvil).

## Qué es Testia
Una plataforma tipo "16personalities de todo": el usuario hace tests gratis, recibe un resultado interpretado al instante y descarga una "carta de resultado" para compartir en redes. El gancho de negocio es viral (compartir) + SEO + monetización con publicidad y un informe premium en PDF. Hay además una sección de **Tarot** (puro entretenimiento, estética mística, separada de los tests).

## Propuesta de valor
Tests "que de verdad miden algo": cada test se basa en un instrumento psicológico **validado científicamente** (Big Five, RIASEC, Rosenberg, ECR, etc.). El tono es serio en el fondo pero divertido y compartible en la forma.

## Audiencia
Mayoritariamente 16–35 años, hispanohablantes (España + LatAm), móvil primero, llegan desde redes sociales y búsquedas de Google ("test de personalidad gratis", "test vocacional", "test de iq"). Quieren un resultado rápido, visual y presumible.

## Contenido a contemplar (20 tests + tarot)
Categorías y tests:
- **Personalidad:** Big Five, Personalidad Exprés, Honestidad-Humildad, Tríada Oscura.
- **Inteligencia:** Test de CI (con cronómetro), ¿Intuitivo o reflexivo?, ¿Te gusta pensar?
- **Carrera:** Test Vocacional (código RIASEC de 3 letras + profesiones).
- **Emocional:** Inteligencia Emocional, Empatía.
- **Bienestar:** Autoestima, Determinación (Grit), Satisfacción con la vida, Estado de ánimo, Resiliencia.
- **Valores:** Brújula moral, Valores personales.
- **Decisión:** ¿Maximizador o conformista?
- **Relaciones:** Estilo de apego (4 estilos).
- **Estilo de vida:** Cronotipo (búho/alondra).
- **Tarot:** 22 Arcanos Mayores, 3 tiradas (1, 3 y 5 cartas).

## Pantallas a diseñar (desktop + móvil)
1. **Home / landing:** hero con propuesta de valor y CTA, catálogo de tests agrupado por categoría (tarjetas), banner de tarot, sección "cómo funciona", franjas de anuncios, footer con aviso legal.
2. **Tarjeta de test** (componente): emoji/icono, nombre, descripción corta, nº de preguntas, badge de "validado".
3. **Pantalla de test:** una pregunta por pantalla, barra de progreso, opciones tipo Likert (escala 1–5/1–7) y opción múltiple; variante con cronómetro para el test de CI; navegación anterior/siguiente.
4. **Pantalla de resultado (varias variantes):**
   - Puntuación grande tipo CI (número + percentil + medidor).
   - Perfil multi-dimensión con barras (Big Five, etc.).
   - Resultado de escala con banda + descripción (autoestima, etc.).
   - Código vocacional RIASEC (3 letras + chips de profesiones).
   - Cuadrante de apego (2 ejes).
   - **Carta de resultado compartible** (imagen descargable, formato cuadrado/story para redes).
   - Bloque de upsell del informe premium en PDF (4,99 €) y slot de anuncio.
5. **Sección Tarot:** elección de tirada, animación de cartas que se voltean (diseña el dorso y el frente de las cartas, con estados "del derecho" e "invertida"), lectura por posición y carta compartible. Estética mística (morados, dorados) diferenciada del resto.

## Dirección visual de partida (puedes mejorarla)
- Estética moderna, oscura, con acentos de degradado violeta→verde menta. Sensación premium pero juvenil.
- Paleta actual de referencia: fondo `#0c0f1d`, superficies `#1a2140`, texto `#eef1fb`, primario `#7c5cff`, acento `#22d3a6`, alerta `#ff5d6c`. Tipografía sans-serif limpia. Bordes redondeados generosos, sombras suaves, microinteracciones.
- Propón también una **variante en modo claro** y valida contraste.

## Sistema de diseño (entrégalo)
- Tokens: color, tipografía (escala), espaciado, radios, sombras, elevaciones.
- Componentes: botones (primario/ghost/estados), tarjeta de test, opción de respuesta (normal/seleccionada/hover), barra de progreso, barras de resultado, medidor, chips/badges, badge de licencia, toast, banner de anuncio, modal premium, carta de tarot (dorso/frente/invertida).
- Estados: vacío, cargando, error, foco de teclado.

## Requisitos
- **Mobile-first** y responsive (breakpoints móvil/tablet/desktop).
- **Accesibilidad WCAG 2.1 AA**: contraste, tamaño de targets táctiles, navegación por teclado, foco visible, textos alternativos.
- Las **cartas compartibles** deben verse bien como imagen en Instagram/Stories/WhatsApp (diseña 1:1 y 9:16).
- Mantener la coherencia de marca entre tests y tarot, pero con identidad propia para el tarot.
- Copys de UX en español, tono cercano y con chispa (sin pasarse), incluyendo microcopy de botones, estados vacíos y mensajes de resultado.

## Entregables
1. Moodboard / dirección visual (1–2 opciones).
2. Sistema de diseño con tokens y librería de componentes.
3. Mockups de todas las pantallas listadas, en desktop y móvil.
4. Diseño de la carta de resultado compartible (tests) y de la carta/lectura de tarot.
5. Especificaciones para desarrollo (handoff): medidas, tokens, comportamiento de componentes e interacciones/animaciones clave.

Empieza proponiendo la dirección visual y el sistema de diseño; cuando lo apruebe, pasa a los mockups pantalla por pantalla.
