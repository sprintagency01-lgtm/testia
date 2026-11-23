// POST /api/create-payment-intent  -> cobro para el botón exprés del muro (Apple Pay / Google Pay).
//   { testId, testName, email? } -> PaymentIntent de 1,99 € (resultado de un test)
// Es la alternativa a /api/create-checkout sin salir de Testia: el muro monta el Express Checkout
// Element de Stripe y, al confirmar en la hoja del móvil, pide aquí el cobro y lo confirma en la
// página. El desbloqueo sigue pasando por /api/verify-payment, que pregunta a Stripe.
// Por qué existe (PostHog + Stripe, sep–nov 2026): de 133 pagos empezados en Stripe Checkout
// terminan 19 y solo 1 falla; el resto abandona en la página de pago.
// Solo el resultado suelto: el pase sigue yendo por Stripe Checkout, porque /api/recover-pass
// busca pases en las Checkout Sessions.
// Sin dependencias: usa la API REST de Stripe con fetch. Requiere STRIPE_SECRET_KEY en Vercel.
const AMOUNT = 199;

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'method not allowed' });
    return;
  }
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    res.status(500).json({ error: 'STRIPE_SECRET_KEY no configurada en Vercel' });
    return;
  }
  try {
    let body = req.body;
    if (typeof body === 'string') { try { body = JSON.parse(body || '{}'); } catch (e) { body = {}; } }
    body = body || {};
    const testId = String(body.testId || 'test').slice(0, 64);
    const testName = String(body.testName || 'tu resultado').slice(0, 120);
    const email = String(body.email || '').trim().slice(0, 200);

    const params = new URLSearchParams();
    params.append('amount', String(AMOUNT));
    params.append('currency', 'eur');
    // Los métodos los decide el panel de Stripe; el botón exprés solo enseña los monederos.
    params.append('automatic_payment_methods[enabled]', 'true');
    params.append('description', 'Testia · ' + testName);
    params.append('metadata[testId]', testId);
    params.append('metadata[plan]', 'single');
    params.append('metadata[source]', 'express');
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) params.append('receipt_email', email);

    const r = await fetch('https://api.stripe.com/v1/payment_intents', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + key,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: params.toString()
    });
    const data = await r.json();
    if (!r.ok) {
      res.status(502).json({ error: (data.error && data.error.message) || 'stripe error' });
      return;
    }
    res.status(200).json({ clientSecret: data.client_secret, id: data.id });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
