// POST /api/create-checkout  -> crea una Checkout Session de Stripe (1,99 €)
// Sin dependencias: usa la API REST de Stripe con fetch.
// Requiere la variable de entorno STRIPE_SECRET_KEY en Vercel.
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
    const origin = req.headers.origin || ('https://' + (req.headers.host || 'testia.info'));

    const params = new URLSearchParams();
    params.append('mode', 'payment');
    params.append('line_items[0][quantity]', '1');
    params.append('line_items[0][price_data][currency]', 'eur');
    params.append('line_items[0][price_data][unit_amount]', '199');
    params.append('line_items[0][price_data][product_data][name]', 'Testia · ' + testName);
    params.append('metadata[testId]', testId);
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
    res.status(200).json({ url: data.url, sessionId: data.id });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
