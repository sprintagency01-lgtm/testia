// GET /api/verify-payment?session_id=cs_...  -> verifica el pago contra Stripe.
// Devuelve { paid: true/false, testId }. El resultado solo debe revelarse si paid === true.
// Sin dependencias: usa la API REST de Stripe con fetch.
// Requiere la variable de entorno STRIPE_SECRET_KEY en Vercel.
module.exports = async (req, res) => {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    res.status(500).json({ paid: false, error: 'STRIPE_SECRET_KEY no configurada en Vercel' });
    return;
  }
  const sid = (req.query && req.query.session_id) || '';
  if (!sid) {
    res.status(400).json({ paid: false, error: 'falta session_id' });
    return;
  }
  try {
    const r = await fetch('https://api.stripe.com/v1/checkout/sessions/' + encodeURIComponent(sid), {
      headers: { 'Authorization': 'Bearer ' + key }
    });
    const s = await r.json();
    if (!r.ok) {
      res.status(200).json({ paid: false, error: (s.error && s.error.message) || 'stripe error' });
      return;
    }
    const paid = s.payment_status === 'paid';
    res.status(200).json({ paid: !!paid, testId: (s.metadata && s.metadata.testId) || null });
  } catch (e) {
    res.status(200).json({ paid: false, error: e.message });
  }
};
