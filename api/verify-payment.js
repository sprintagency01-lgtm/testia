// GET /api/verify-payment?session_id=cs_...        -> verifica un pago de Stripe Checkout.
// GET /api/verify-payment?payment_intent=pi_...    -> verifica un pago del botón exprés del muro.
// Devuelve { paid, testId, plan }. plan es "single" (un resultado) o "pass" (todos los tests).
// El resultado solo debe revelarse si paid === true.
// Sin dependencias: usa la API REST de Stripe con fetch.
// Requiere la variable de entorno STRIPE_SECRET_KEY en Vercel.
module.exports = async (req, res) => {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    res.status(500).json({ paid: false, error: 'STRIPE_SECRET_KEY no configurada en Vercel' });
    return;
  }
  const q = req.query || {};
  const sid = q.session_id || '';
  const pid = q.payment_intent || '';
  const isSession = /^cs_(live|test)_[A-Za-z0-9]+$/.test(sid);
  const isIntent = !isSession && /^pi_[A-Za-z0-9]+$/.test(pid);
  if (!isSession && !isIntent) {
    res.status(400).json({ paid: false, error: 'falta session_id o payment_intent' });
    return;
  }
  try {
    const url = isSession
      ? 'https://api.stripe.com/v1/checkout/sessions/' + encodeURIComponent(sid)
      : 'https://api.stripe.com/v1/payment_intents/' + encodeURIComponent(pid);
    const r = await fetch(url, { headers: { 'Authorization': 'Bearer ' + key } });
    const s = await r.json();
    if (!r.ok) {
      res.status(200).json({ paid: false, error: (s.error && s.error.message) || 'stripe error' });
      return;
    }
    const md = s.metadata || {};
    // Un PaymentIntent cualquiera de la cuenta no vale: tiene que ser uno creado por el muro.
    const paid = isSession ? s.payment_status === 'paid' : (s.status === 'succeeded' && md.source === 'express');
    res.status(200).json({ paid: !!paid, testId: md.testId || null, plan: md.plan === 'pass' ? 'pass' : 'single', recovered: !!s.recovered_from });
  } catch (e) {
    res.status(200).json({ paid: false, error: e.message });
  }
};
