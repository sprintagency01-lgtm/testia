// POST /api/create-checkout  -> crea una Checkout Session de Stripe.
//   { testId, testName, email? } -> resultado de un test (1,99 €)
//   { plan: "pass", testId?, testName? } -> pase para todos los tests (4,99 €)
//   { plan: "upgrade", from, testId?, testName? } -> pase por la diferencia (2,99 €) para quien ya pagó
//     un resultado: `from` es ese cobro (cs_… de Checkout o pi_… del botón exprés) y se comprueba en
//     Stripe. Se guarda como plan "pass", así que recover-pass y verify-payment lo tratan como un pase.
// Precios en _pricing.js (Latinoamérica paga 0,99 € el resultado).
// Moneda local: Adaptive Pricing (ver más abajo). Si la cuenta no lo admite, se crea la sesión sin él.
// Recuperación de carritos: la sesión caduca a la hora y, si el cliente aceptó recibir novedades
// (casilla de Stripe), Stripe le envía un email con un enlace para terminar el pago. Hay que tener
// activados los emails de carritos abandonados en Stripe → Ajustes → Checkout.
// Sin dependencias: usa la API REST de Stripe con fetch.
// Requiere la variable de entorno STRIPE_SECRET_KEY en Vercel.
const { PASS, UPGRADE, single } = require('./_pricing');

// ¿Es `from` un resultado suelto ya pagado en esta cuenta? Solo entonces se vende el pase por la diferencia.
async function paidSingle(key, from) {
  const isSession = /^cs_(live|test)_[A-Za-z0-9]+$/.test(from);
  if (!isSession && !/^pi_[A-Za-z0-9]+$/.test(from)) return false;
  const url = 'https://api.stripe.com/v1/' + (isSession ? 'checkout/sessions/' : 'payment_intents/') + encodeURIComponent(from);
  const r = await fetch(url, { headers: { 'Authorization': 'Bearer ' + key } });
  if (!r.ok) return false;
  const s = await r.json();
  const md = s.metadata || {};
  if (md.plan !== 'single') return false;
  return isSession ? s.payment_status === 'paid' : (s.status === 'succeeded' && md.source === 'express');
}

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
    // Si el cobro de `from` no cuadra, «upgrade» se vende como pase normal (4,99 €), nunca como resultado.
    const plan = body.plan === 'pass' || body.plan === 'upgrade' ? 'pass' : 'single';
    const from = String(body.from || '').slice(0, 255);
    const upgrade = body.plan === 'upgrade' && await paidSingle(key, from);
    // Experimento de precio cerrado el 2026-11-11: 1,99 € el resultado (0,99 € en Latinoamérica, ver _pricing.js).
    const price = single(req);
    const priceVariant = upgrade ? 'upgrade' : price.variant;
    const amount = upgrade ? UPGRADE : plan === 'pass' ? PASS : price.amount;
    const email = String(body.email || '').trim().slice(0, 200);
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
    params.append('line_items[0][price_data][product_data][description]', upgrade
      ? 'El resultado completo de todos los tests de Testia, sin límite. Ya tienes descontado lo que pagaste por tu resultado. Pago único, sin suscripción.'
      : plan === 'pass'
      ? 'El resultado completo de todos los tests de Testia, sin límite. Pago único, sin suscripción.'
      : 'Tu resultado completo, con el análisis detallado y tu carta para compartir. Pago único, sin suscripción.');
    params.append('line_items[0][price_data][product_data][images][0]', 'https://www.testia.info/assets/stripe-cover.jpg');
    params.append('locale', 'es');
    params.append('submit_type', 'pay');
    params.append('custom_text[submit][message]', 'Pago único y seguro con Stripe. Al terminar vuelves a Testia y ves tu resultado completo al momento.');
    params.append('metadata[testId]', testId);
    params.append('metadata[plan]', plan);
    params.append('metadata[priceVariant]', priceVariant);
    if (upgrade) params.append('metadata[upgradeFrom]', from);
    // Si ya nos dio su email (para recibir el resultado), lo rellenamos: un campo menos en el pago.
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) params.append('customer_email', email);
    params.append('success_url', origin + '/?session_id={CHECKOUT_SESSION_ID}');
    params.append('cancel_url', origin + '/?canceled=1');

    const create = p => fetch('https://api.stripe.com/v1/checkout/sessions', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + key,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: p.toString()
    });
    const recovery = new URLSearchParams(params);
    recovery.append('expires_at', String(Math.floor(Date.now() / 1000) + 60 * 60));
    recovery.append('after_expiration[recovery][enabled]', 'true');
    recovery.append('consent_collection[promotions]', 'auto');
    // Moneda local (Adaptive Pricing): fuera de la zona euro Stripe enseña y cobra el precio en la
    // moneda del comprador (MXN, ARS, COP…) y Testia sigue recibiendo euros. Ya está activado en
    // el panel de Stripe (comprobado el 2026-11-23); se pide también aquí para que no dependa de
    // ese ajuste. Ojo: no explica la caída de Latinoamérica en el pago (~39 pagos abiertos, 2
    // terminados, sep–nov 2026), porque ya veían su moneda.
    const local = p => { const q = new URLSearchParams(p); q.append('adaptive_pricing[enabled]', 'true'); return q; };
    // De más a menos completa: si la cuenta no admite algo (recuperación o moneda local), se prueba
    // sin ello. El pago no se bloquea nunca por una opción.
    let r, data;
    for (const p of [local(recovery), recovery, local(params), params]) {
      r = await create(p);
      data = await r.json();
      if (r.ok) break;
    }
    if (!r.ok) {
      res.status(502).json({ error: (data.error && data.error.message) || 'stripe error' });
      return;
    }
    res.status(200).json({ url: data.url, sessionId: data.id, plan, amount: amount / 100 });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
