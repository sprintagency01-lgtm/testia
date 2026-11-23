// GET /api/stripe-config  -> { publishableKey } para montar el botón exprés del muro.
// La clave publicable es pública por diseño (va en el navegador). Se lee de STRIPE_PUBLISHABLE_KEY
// en Vercel para no dejarla escrita en el código. Sin ella, el muro no enseña el botón exprés y
// todo sigue por Stripe Checkout.
module.exports = (req, res) => {
  const pk = process.env.STRIPE_PUBLISHABLE_KEY || '';
  res.setHeader('Cache-Control', 'public, max-age=300');
  res.status(200).json({ publishableKey: /^pk_(live|test)_/.test(pk) ? pk : null });
};
