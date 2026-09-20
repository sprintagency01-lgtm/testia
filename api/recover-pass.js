// GET /api/recover-pass?email=...  -> busca un pase pagado con ese email en Stripe.
// Devuelve { found: true, sid } si existe una Checkout Session pagada con metadata.plan = "pass".
// El cliente guarda el sid y lo verifica con /api/verify-payment en cada resultado.
module.exports = async (req, res) => {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) { res.status(500).json({ found: false, error: 'STRIPE_SECRET_KEY no configurada en Vercel' }); return; }
  const email = String((req.query && req.query.email) || '').trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 120) {
    res.status(400).json({ found: false, error: 'email no válido' }); return;
  }
  try {
    const url = 'https://api.stripe.com/v1/checkout/sessions?limit=50&status=complete&customer_details[email]=' + encodeURIComponent(email);
    const r = await fetch(url, { headers: { 'Authorization': 'Bearer ' + key } });
    const d = await r.json();
    if (!r.ok) { res.status(200).json({ found: false, error: (d.error && d.error.message) || 'stripe error' }); return; }
    const hit = (d.data || []).find(s => s.payment_status === 'paid' && s.metadata && s.metadata.plan === 'pass');
    if (!hit) { res.status(200).json({ found: false }); return; }
    res.status(200).json({ found: true, sid: hit.id });
  } catch (e) {
    res.status(200).json({ found: false, error: e.message });
  }
};
