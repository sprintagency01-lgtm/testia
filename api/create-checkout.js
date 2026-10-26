// POST /api/create-checkout  -> crea una Checkout Session de Stripe.
//   { testId, testName, priceVariant? } -> resultado de un test (1,99 €; 0,99 € si priceVariant es 'low', experimento de precio)
//   { plan: "pass", testId?, testName? } -> pase para todos los tests (4,99 €)
// Sin dependencias: usa la API REST de Stripe con fetch.
// Requiere la variable de entorno STRIPE_SECRET_KEY en Vercel.
const PRICES = { single: 199, single_low: 99, pass: 499 };

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
    const plan = body.plan === 'pass' ? 'pass' : 'single';
    const priceVariant = plan === 'single' && body.priceVariant === 'low' ? 'low' : 'control';
    const amount = plan === 'pass' ? PRICES.pass : (priceVariant === 'low' ? PRICES.single_low : PRICES.single);
    const testId = String(body.testId || (plan === 'pass' ? 'pass' : 'test')).slice(0, 64);
    const testName = String(body.testName || 'tu resultado').slice(0, 120);
    const origin = req.headers.origin || ('https://' + (req.headers.host || 'testia.info'));
    const productName = plan === 'pass'
      ? 'Testia · Pase para todos los tests'
      : 'Testia · ' + testName;

    const params = new URLSearchParams();
    params.append('mode', 'payment');
    params.append('line_items[0][quantity]', '1');
    params.append('line_items[0][price_data][currency]', 'eur');
    params.append('line_items[0][price_data][unit_amount]', String(amount));
    params.append('line_items[0][price_data][product_data][name]', productName);
    // Página de pago en español y con contexto: qué se compra, que es un pago único y qué pasa después.
    params.append('line_items[0][price_data][product_data][description]', plan === 'pass'
      ? 'El resultado completo de todos los tests de Testia, sin límite. Pago único, sin suscripción.'
      : 'Tu resultado completo, con el análisis detallado y tu carta para compartir. Pago único, sin suscripción.');
    params.append('line_items[0][price_data][product_data][images][0]', 'https://www.testia.info/assets/stripe-cover.jpg');
    params.append('locale', 'es');
    params.append('submit_type', 'pay');
    params.append('custom_text[submit][message]', 'Pago único y seguro con Stripe. Al terminar vuelves a Testia y ves tu resultado completo al momento.');
    params.append('metadata[testId]', testId);
    params.append('metadata[plan]', plan);
    params.append('metadata[priceVariant]', priceVariant);
    params.append('success_url', origin + '/?session_id={CHECKOUT_SESSION_ID}');
    params.append('cancel_url', origin + '/?canceled=1');

    const r = await fetch('https://api.stripe.com/v1/checkout/sessions', {
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
    res.status(200).json({ url: data.url, sessionId: data.id, plan });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
