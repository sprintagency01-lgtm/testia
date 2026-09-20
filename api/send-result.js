// POST /api/send-result  -> envía el resultado por email con Brevo y guarda el contacto.
// Body: { email, optin, testId, testName, tier: "free"|"full", result: {name, role, desc, traits, bars, stats, analysis} }
// Requiere BREVO_API_KEY en Vercel. Opcionales: BREVO_SENDER_EMAIL (remitente verificado en Brevo),
// BREVO_SENDER_NAME (por defecto "Testia") y BREVO_LIST_NAME (por defecto "Testia").
// Todo lo que llega del cliente se escapa antes de entrar en el HTML del email.
const BREVO = 'https://api.brevo.com/v3';
const SITE = 'https://www.testia.info';
let listIdPromise = null;
let attrsPromise = null;

const esc = s => String(s == null ? '' : s).slice(0, 2000)
  .replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

async function ensureAttributes(H) {
  if (!attrsPromise) {
    attrsPromise = Promise.all(['TESTIA_TEST', 'TESTIA_ARCHETYPE', 'TESTIA_TIER', 'TESTIA_LAST'].map(name =>
      fetch(`${BREVO}/contacts/attributes/normal/${name}`, { method: 'POST', headers: H, body: JSON.stringify({ type: 'text' }) }).catch(() => null)
    ).concat([
      fetch(`${BREVO}/contacts/attributes/normal/TESTIA_OPTIN`, { method: 'POST', headers: H, body: JSON.stringify({ type: 'boolean' }) }).catch(() => null)
    ]));
  }
  return attrsPromise;
}

async function getListId(H, name) {
  if (!listIdPromise) {
    listIdPromise = (async () => {
      const r = await fetch(`${BREVO}/contacts/lists?limit=50&sort=desc`, { headers: H });
      const d = await r.json();
      const hit = (d.lists || []).find(l => l.name === name);
      if (hit) return hit.id;
      const f = await fetch(`${BREVO}/contacts/folders?limit=1`, { headers: H });
      const fd = await f.json();
      const folderId = (fd.folders && fd.folders[0] && fd.folders[0].id) || 1;
      const c = await fetch(`${BREVO}/contacts/lists`, { method: 'POST', headers: H, body: JSON.stringify({ name, folderId }) });
      const cd = await c.json();
      return cd.id || null;
    })().catch(() => { listIdPromise = null; return null; });
  }
  return listIdPromise;
}

function buildHtml({ testId, testName, tier, name, role, desc, traits, bars, stats, analysis }) {
  const bar = b => `<tr><td style="padding:6px 0;color:#17181c;font-size:14px">${b.lab}</td><td style="padding:6px 0 6px 12px;text-align:right;color:#6e7075;font-size:13px;white-space:nowrap">${b.tag || ''} ${Math.round(b.p)}%</td></tr>
<tr><td colspan="2" style="padding:0 0 8px"><div style="height:8px;border-radius:99px;background:#ececea"><div style="height:8px;width:${Math.round(b.p)}%;border-radius:99px;background:#2f4bd6"></div></div></td></tr>`;
  const stat = s => `<td style="padding:10px 14px;border:1px solid #e1e1dd;border-radius:12px;text-align:center"><div style="font-size:22px;font-weight:700;color:#2f4bd6">${s.v}</div><div style="font-size:12px;color:#6e7075;text-transform:uppercase;letter-spacing:.06em">${s.l}</div></td>`;
  const ana = a => `<div style="border:1px solid #e1e1dd;border-radius:12px;padding:14px 16px;margin:0 0 10px"><div style="font-weight:700;font-size:14px;color:#17181c">${a.lab} <span style="float:right;font-size:12px;color:#6e7075;text-transform:uppercase">${a.band}</span></div><p style="margin:6px 0 0;color:#3a3b40;font-size:14px;line-height:1.55">${a.text}</p></div>`;
  const full = tier === 'full';
  return `<!doctype html><html lang="es"><body style="margin:0;background:#f4f4f2;font-family:-apple-system,Segoe UI,Helvetica,Arial,sans-serif;color:#17181c">
<div style="max-width:560px;margin:0 auto;padding:28px 18px">
  <div style="font-weight:800;font-size:20px;letter-spacing:-.02em;margin-bottom:18px">Testia</div>
  <div style="background:#fff;border:1px solid #e1e1dd;border-radius:18px;padding:26px">
    <div style="font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:#6e7075">${testName}</div>
    <h1 style="font-size:30px;line-height:1.1;margin:8px 0 4px;letter-spacing:-.02em;color:#2f4bd6">${name}</h1>
    <div style="font-style:italic;color:#6e7075;font-size:16px;margin-bottom:12px">${role}</div>
    <p style="font-size:16px;line-height:1.55;color:#3a3b40;margin:0 0 14px">${desc}</p>
    ${traits.length ? `<div style="margin-bottom:8px">${traits.map(t => `<span style="display:inline-block;border:1px solid #e1e1dd;border-radius:99px;padding:5px 11px;font-size:12px;margin:0 6px 6px 0">${t}</span>`).join('')}</div>` : ''}
    ${full && stats.length ? `<table role="presentation" cellspacing="8" style="margin:14px -8px 6px"><tr>${stats.map(stat).join('')}</tr></table>` : ''}
    ${full && bars.length ? `<h2 style="font-size:15px;margin:18px 0 6px">Tu perfil por dimensión</h2><table role="presentation" width="100%" cellspacing="0" cellpadding="0">${bars.map(bar).join('')}</table>` : ''}
    ${full && analysis.length ? `<h2 style="font-size:15px;margin:18px 0 10px">Lectura por dimensión</h2>${analysis.map(ana).join('')}` : ''}
    ${!full ? `<div style="margin-top:18px;border:1px solid #dfe3f8;background:#f4f6fe;border-radius:14px;padding:16px"><div style="font-weight:700;font-size:15px">¿Quieres la lectura completa?</div><p style="margin:6px 0 12px;font-size:14px;color:#3a3b40;line-height:1.5">Tu puntuación en cada dimensión y qué significa en tu caso, por 1,99 €. O el pase para los 23 tests por 4,99 €.</p><a href="${SITE}/?start=${encodeURIComponent(testId)}" style="display:inline-block;background:#2f4bd6;color:#fff;text-decoration:none;font-weight:700;padding:12px 18px;border-radius:99px;font-size:14px">Volver a mi resultado →</a></div>` : ''}
  </div>
  <p style="font-size:12px;color:#6e7075;line-height:1.5;margin:18px 4px 0">Contenido de entretenimiento y autoconocimiento, no una evaluación profesional. Recibes este email porque lo has pedido en <a href="${SITE}" style="color:#6e7075">testia.info</a>.</p>
</div></body></html>`;
}

module.exports = async (req, res) => {
  if (req.method !== 'POST') { res.status(405).json({ error: 'method not allowed' }); return; }
  const key = process.env.BREVO_API_KEY;
  if (!key) { res.status(500).json({ error: 'BREVO_API_KEY no configurada en Vercel' }); return; }
  let body = req.body;
  if (typeof body === 'string') { try { body = JSON.parse(body || '{}'); } catch (e) { body = {}; } }
  body = body || {};
  const email = String(body.email || '').trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 120) { res.status(400).json({ error: 'email no válido' }); return; }
  const r0 = body.result || {};
  const tier = body.tier === 'full' ? 'full' : 'free';
  const data = {
    testId: esc(body.testId).slice(0, 64), testName: esc(body.testName).slice(0, 120), tier,
    name: esc(r0.name), role: esc(r0.role), desc: esc(r0.desc),
    traits: (Array.isArray(r0.traits) ? r0.traits : []).slice(0, 8).map(esc),
    bars: (Array.isArray(r0.bars) ? r0.bars : []).slice(0, 12).map(b => ({ lab: esc(b && b.lab), p: Math.max(0, Math.min(100, Number(b && b.p) || 0)), tag: esc(b && b.tag) })),
    stats: (Array.isArray(r0.stats) ? r0.stats : []).slice(0, 6).map(s => ({ v: esc(s && s.v), l: esc(s && s.l) })),
    analysis: (Array.isArray(r0.analysis) ? r0.analysis : []).slice(0, 12).map(a => ({ lab: esc(a && a.lab), band: esc(a && a.band), text: esc(a && a.text) }))
  };
  if (!data.name) { res.status(400).json({ error: 'falta el resultado' }); return; }
  const H = { 'api-key': key, 'Content-Type': 'application/json', 'Accept': 'application/json' };
  const sender = { name: process.env.BREVO_SENDER_NAME || 'Testia', email: process.env.BREVO_SENDER_EMAIL || 'mario@sprintiasolutions.com' };

  // 1. Contacto (no bloquea el envío si falla)
  try {
    await ensureAttributes(H);
    const listId = await getListId(H, process.env.BREVO_LIST_NAME || 'Testia');
    await fetch(`${BREVO}/contacts`, { method: 'POST', headers: H, body: JSON.stringify({
      email, updateEnabled: true, listIds: listId ? [listId] : undefined,
      attributes: { TESTIA_TEST: data.testId, TESTIA_ARCHETYPE: data.name, TESTIA_TIER: tier, TESTIA_OPTIN: !!body.optin, TESTIA_LAST: new Date().toISOString().slice(0, 10) }
    }) });
  } catch (e) { /* el email sigue */ }

  // 2. Email transaccional
  try {
    const subject = tier === 'full' ? `Tu lectura completa de «${data.testName}»: ${data.name}` : `Tu resultado en «${data.testName}»: ${data.name}`;
    const s = await fetch(`${BREVO}/smtp/email`, { method: 'POST', headers: H, body: JSON.stringify({
      sender, to: [{ email }], subject, htmlContent: buildHtml(data), tags: ['testia-result', tier, data.testId]
    }) });
    if (!s.ok) { const d = await s.json().catch(() => ({})); res.status(502).json({ error: d.message || 'brevo error' }); return; }
    res.status(200).json({ ok: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
