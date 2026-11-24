// GET /api/stripe-config  -> { publishableKey, single, priceVariant } para montar el botón exprés del muro
// y enseñar en él el precio que se cobrará en el país del visitante (_pricing.js).
// La clave publicable es pública por diseño: Stripe la hace para ir en el navegador y esta misma
// respuesta se la da a cada visitante. Por eso va escrita aquí (cuenta de Testia, acct_1UHj9F…).
// STRIPE_PUBLISHABLE_KEY en Vercel, si existe y es válida, tiene prioridad (para cambiarla sin
// tocar código). Nunca pongas aquí una clave secreta (sk_…) ni restringida (rk_…).
// Si no hay clave válida, `reason` dice por qué sin enseñar el valor de la variable.
const PUBLISHABLE_KEY = 'pk_live_51UHj9FLTlQQ3Yh9TG2SpowlMgm3BIvqRPhf0bbLK7tZxwQFZdW3u95JYnruW8sUjdQXCvpYgnGwbH07txZBe1uXq00BaUUyaS8';
const { single, UPGRADE } = require('./_pricing');
const isPk = k => /^pk_(live|test)_[A-Za-z0-9]+$/.test(k);

module.exports = (req, res) => {
  const env = String(process.env.STRIPE_PUBLISHABLE_KEY || '').trim().replace(/^["']|["']$/g, '').trim();
  res.setHeader('Cache-Control', 'no-store');
  const pk = isPk(env) ? env : PUBLISHABLE_KEY;
  const price = single(req);
  const prices = { single: price.amount / 100, upgrade: UPGRADE / 100, priceVariant: price.variant };
  if (isPk(pk)) {
    res.status(200).json(Object.assign({ publishableKey: pk }, prices));
    return;
  }
  const reason = !env ? 'missing' : /^(sk|rk)_/.test(env) ? 'secret_key' : 'format';
  res.status(200).json(Object.assign({ publishableKey: null, reason }, prices));
};
