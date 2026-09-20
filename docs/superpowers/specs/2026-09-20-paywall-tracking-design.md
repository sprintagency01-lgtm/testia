# Paywall parcial y tracking por usuario — diseño

Fecha: 2026-09-20. Contexto: en 14 días, 13 personas completaron un test, 5 pulsaron pagar y 0 pagaron. El resultado entero (incluida la carta compartible) se difumina tras 22 preguntas y el muro de pago aparece antes de ver nada.

## Resultado en dos capas

- **Gratis, visible:** eyebrow, monograma, nombre del arquetipo, rol, descripción, rasgos, referencia metodológica, carta compartible y sus tres botones (compartir, post, story).
- **De pago (1,99 €), difuminado en su sitio:** barras por dimensión, estadísticas (posición frente a la media) y análisis por dimensión. Se agrupan en `#resPremium`.
- La tarjeta de pago (`#paywall`) se coloca justo encima de `#resPremium`, dentro de la columna izquierda del resultado. Copia: "Ya conoces tu arquetipo. Desbloquea la lectura completa".
- Tras el pago, el servidor verifica igual que hoy y `revealResult()` quita `.locked` de `#resPremium`.
- La página de precios y la FAQ dejan de listar la carta compartible como premium. Gratis: arquetipo, descripción y carta compartible. Premium: puntuación por dimensión, interpretación y comparación con la media.

## Tracking

- `posthog-analytics.js`: `persistence: 'localStorage'` (sin cookie, sin banner). Un visitante mantiene su `distinct_id` entre páginas, así que los embudos landing → test → pago funcionan.
- Eventos nuevos: `result_viewed` (al pintar el resultado gratis), `paywall_viewed` (cuando `#paywall` entra en pantalla, una vez por resultado), `test_progress` con `progress` 25/50/75 (una vez por cuarto y por intento).
- Se mantienen `test_started`, `test_completed`, `checkout_started`, `purchase_completed`, `result_shared`, `result_downloaded`, `cta_clicked`.

## Fuera de alcance

Flujo de Stripe, verificación en servidor, captura de email, cambios en landings `/test/`.
