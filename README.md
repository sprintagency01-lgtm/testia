# Testia

Web de tests psicológicos y de identidad con base científica, resultado de pago (paywall de 1,99 € verificado en servidor) y landings SEO. Sitio en producción: **[www.testia.info](https://www.testia.info)**.

## Stack

- **Frontend estático**: HTML + JS puro (sin framework, sin build obligatorio).
- **Funciones serverless** (Vercel, carpeta `/api`): crean y verifican el pago contra la API de Stripe. Sin dependencias npm (usan `fetch`).
- **Pagos**: Stripe Checkout. El resultado solo se desbloquea si Stripe confirma `payment_status = paid`.

## Estructura

```
index.html          Aplicación principal (motor de tests + resultado + paywall)
testia.html         Copia sincronizada de index.html (heredada)
tests.js            Banco de los 23 tests + contenido SEO (SEO_CONTENT)
iq.js               Ítems del test de CI
tarot.js            Módulo de tarot (entretenimiento)
build-pages.mjs     Genera /test/<slug>.html + sitemap.xml + robots.txt
api/
  create-checkout.js  Crea la Checkout Session de Stripe (1,99 €)
  verify-payment.js   Verifica el pago; solo entonces se revela el resultado
test/               Landings SEO por test (GENERADAS, no editar a mano)
assets/ tarot-deck/ Imágenes (se usan las .webp)
testia-tests/       Documentación: investigación de mercado, campañas, tests en JSON
vercel.json         Config de Vercel (cleanUrls, sin trailingSlash)
```

## Variables de entorno (obligatorio)

| Variable | Descripción |
|---|---|
| `STRIPE_SECRET_KEY` | Clave secreta de Stripe (`sk_live_...` o `sk_test_...`). **Sin ella, el pago no funciona.** |

Configúrala en Vercel → Project → Settings → Environment Variables (entorno *Production*). Ver `.env.example`.

## Despliegue

Conectado a Vercel vía Git: **cada `git push` a `main` despliega automáticamente**.

- Asegúrate de que el proyecto de Vercel tiene `STRIPE_SECRET_KEY` configurada y `www.testia.info` como dominio principal; `testia.info` debe redirigir a esa versión.
- `package.json` está en `.gitignore` a propósito (evita que Vercel intente compilar dependencias nativas). Las funciones de `/api` no usan dependencias, así que el deploy funciona sin instalar nada.

## Flujo de trabajo al cambiar tests

1. Edita `tests.js` (preguntas, resultados, `SEO_CONTENT`).
2. Regenera las landings SEO y el sitemap:
   ```bash
   node build-pages.mjs
   ```
3. Valida metadatos, datos estructurados y enlaces internos:
   ```bash
   node validate-pages.mjs
   ```
4. Si tocaste `index.html`, sincroniza la copia: `cp index.html testia.html`.
5. Commit + push → Vercel despliega solo.

## Pagos (cómo funciona el muro)

1. El usuario termina un test; el cliente llama a `POST /api/create-checkout` con `{testId, testName}`.
2. Recibe una Checkout Session de Stripe y redirige a pagar.
3. Al volver con `?session_id=...`, el cliente llama a `GET /api/verify-payment?session_id=...`.
4. Solo si Stripe responde `paid`, se revela el resultado. El antiguo bypass de `?paid=1` está eliminado.

> Nota de seguridad: el resultado se calcula en el cliente, así que un usuario técnico podría leerlo en las DevTools sin pagar. Para blindaje total habría que mover la puntuación al servidor.
