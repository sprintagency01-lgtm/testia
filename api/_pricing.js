// Precios de Testia, en céntimos de euro. Lo comparten create-checkout, create-payment-intent y
// stripe-config (que se lo dice al muro para que enseñe el mismo precio que se cobra).
// Vercel no publica como ruta los ficheros de api/ que empiezan por «_».
//
// Latinoamérica paga 0,99 € el resultado desde el 2026-11-24. Motivo (PostHog, 60 días): ahí empieza
// el pago el 13 % de quien ve el muro, más que en España, pero de ~45 pagos empezados terminan 2.
// No son rechazos (Stripe solo registra 1 fallo): abandonan en la página de pago, ya con el precio
// en su moneda. En España el experimento de 0,99 € (cerrado el 2026-11-11) dejó menos dinero, por
// eso allí sigue en 1,99 €. Puerto Rico paga en dólares y queda fuera.
// El país lo da Vercel (cabecera x-vercel-ip-country); sin cabecera, precio normal.
const LATAM = new Set(['MX', 'AR', 'CO', 'CL', 'PE', 'VE', 'EC', 'GT', 'CU', 'BO', 'DO', 'HN', 'PY', 'SV', 'NI', 'CR', 'PA', 'UY']);
const PASS = 499;
// Quien acaba de pagar un resultado puede pasarse al pase pagando la diferencia (redondeada).
const UPGRADE = 299;

const country = req => String((req.headers && req.headers['x-vercel-ip-country']) || '').toUpperCase().slice(0, 2);
const single = req => (LATAM.has(country(req)) ? { amount: 99, variant: 'latam_low' } : { amount: 199, variant: 'control' });

module.exports = { PASS, UPGRADE, country, single };
