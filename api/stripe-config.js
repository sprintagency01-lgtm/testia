// GET /api/stripe-config  -> { publishableKey } para montar el botón exprés del muro.
// La clave publicable es pública por diseño (va en el navegador). Se lee de STRIPE_PUBLISHABLE_KEY
// en Vercel para no dejarla escrita en el código. Sin ella, el muro no enseña el botón exprés y
// todo sigue por Stripe Checkout.
// Si no hay clave válida, `reason` dice por qué sin enseñar el valor: «missing» (no está en este
// despliegue), «secret_key» (se pegó una clave secreta o restringida: hay que cambiarla YA por la
// publicable) o «format» (no empieza por pk_live_ / pk_test_).
module.exports = (req, res) => {
  const pk = String(process.env.STRIPE_PUBLISHABLE_KEY || '').trim().replace(/^["']|["']$/g, '').trim();
  res.setHeader('Cache-Control', 'no-store');
  if (/^pk_(live|test)_[A-Za-z0-9]+$/.test(pk)) {
    res.status(200).json({ publishableKey: pk });
    return;
  }
  const reason = !pk ? 'missing' : /^(sk|rk)_/.test(pk) ? 'secret_key' : 'format';
  res.status(200).json({ publishableKey: null, reason });
};
