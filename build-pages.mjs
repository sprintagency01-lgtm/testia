/* Genera una landing SEO por test en /test/<slug>.html + sitemap.xml + robots.txt
   Uso: node build-pages.mjs   (re-ejecútalo si cambias textos en tests.js) */
import fs from "node:fs";

const DOMAIN = "https://www.testia.info";
// cargar TESTS + SEO_CONTENT desde tests.js
const win = {};
const code = fs.readFileSync("tests.js", "utf8").replace(/window\./g, "win.");
new Function("win", code)(win);
const TESTS = win.TESTS, SEO = win.SEO_CONTENT;

const CATS = {
  personalidad:{name:"Personalidad",color:"#2f4bd6"}, inteligencia:{name:"Inteligencia",color:"#7b3fa0"},
  profesional:{name:"Profesional y decisiones",color:"#1f8a6d"}, relaciones:{name:"Relaciones y emociones",color:"#b8434c"},
  bienestar:{name:"Valores y bienestar",color:"#e0892f"},
};
const TEST_CAT = {bigfive:"personalidad",tipi:"personalidad",honesty:"personalidad",darktriad:"personalidad",iq:"inteligencia",crt:"inteligencia",ncs:"inteligencia",riasec:"profesional",grit:"profesional",maximizer:"profesional",attachment:"relaciones",ei:"relaciones",empathy:"relaciones",moral:"bienestar",values:"bienestar",selfesteem:"bienestar",swls:"bienestar",panas:"bienestar",resilience:"bienestar",chronotype:"bienestar",politico:"bienestar",lovelang:"relaciones",redflag:"relaciones"};
const esc = s => String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");
const mins = t => t.mode==="correct" ? Math.round((t.duration||300)/60) : Math.max(2, Math.round(t.items.length*0.13));

const CSS = `*{box-sizing:border-box;margin:0;padding:0}body{font-family:'Instrument Sans',system-ui,sans-serif;background:linear-gradient(180deg,#f4f4f2,#eeefea);color:#17181c;line-height:1.6;font-size:17px;-webkit-font-smoothing:antialiased}a{color:inherit;text-decoration:none}.wrap{max-width:920px;margin:0 auto;padding:0 28px}.disp{font-family:'Bricolage Grotesque',sans-serif}
header{position:sticky;top:0;z-index:9;backdrop-filter:blur(10px);background:rgba(244,244,242,.82);border-bottom:1px solid #e4e4e1}.nav{height:70px;display:flex;align-items:center;justify-content:space-between}.brand{font-family:'Bricolage Grotesque',sans-serif;font-weight:700;font-size:1.5rem;letter-spacing:-.02em}.nav a.lnk{font-size:.72rem;font-weight:600;letter-spacing:.14em;text-transform:uppercase;color:#6e7075;margin-left:22px}
.eyebrow{font-size:.72rem;font-weight:600;letter-spacing:.2em;text-transform:uppercase;margin:54px 0 18px}h1{font-family:'Bricolage Grotesque',sans-serif;font-weight:600;font-size:clamp(2.2rem,5.5vw,3.4rem);line-height:1.04;letter-spacing:-.03em}
.lead{font-size:1.2rem;color:#54565c;margin:20px 0 0;max-width:60ch}.meta{display:flex;gap:10px;flex-wrap:wrap;margin:24px 0 0}.chip{padding:7px 15px;border:1px solid #dcdcd8;border-radius:999px;font-size:.78rem;font-weight:600;background:#fff;color:#54565c}
.btn{display:inline-block;font-weight:600;font-size:1.02rem;padding:17px 34px;border-radius:999px;color:#fff;box-shadow:0 14px 34px rgba(47,75,214,.28);margin:30px 14px 0 0}.btn.alt{background:#fff;color:#17181c;border:1px solid #dcdcd8;box-shadow:none}
h2{font-family:'Bricolage Grotesque',sans-serif;font-weight:600;font-size:1.7rem;letter-spacing:-.02em;margin:54px 0 18px;padding-bottom:12px;border-bottom:2px solid #17181c}
.learn{display:grid;gap:14px;margin:0}.learn li{list-style:none;display:flex;gap:13px;font-size:1.08rem}.learn li::before{content:"✓";font-weight:800}
.steps{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}@media(max-width:680px){.steps{grid-template-columns:1fr}}
.step{background:#fff;border:1px solid #e6e6e3;border-radius:16px;padding:22px}.step .n{font-family:'Bricolage Grotesque',sans-serif;font-weight:600;color:#c2c2bd;font-size:1.2rem}.step h3{font-family:'Bricolage Grotesque',sans-serif;font-weight:600;font-size:1.15rem;margin:6px 0 4px}.step p{color:#9a9b9f;font-size:.95rem}
.rel{display:grid;grid-template-columns:repeat(3,1fr);gap:14px}@media(max-width:680px){.rel{grid-template-columns:1fr}}.rel a{background:#fff;border:1px solid #e6e6e3;border-radius:14px;padding:18px;font-family:'Bricolage Grotesque',sans-serif;font-weight:600}.rel a:hover{border-color:#c3ccf2}.rel a span{display:block;font-family:'Instrument Sans',sans-serif;font-weight:600;font-size:.8rem;color:#9a9b9f;margin-top:4px}
.content p{color:#54565c;margin:0;max-width:70ch}.faq{display:grid;gap:12px}.faq details{background:#fff;border:1px solid #e6e6e3;border-radius:14px;padding:17px 20px}.faq summary{cursor:pointer;font-weight:600}.faq p{color:#54565c;margin:10px 0 0}
.note{font-size:.86rem;color:#6e7075;background:#fff;border:1px solid #e6e6e3;border-radius:14px;padding:20px;margin-top:18px}
footer{border-top:1px solid #e4e4e1;background:#fff;margin-top:60px;padding:34px 0;color:#9a9b9f;font-size:.85rem}footer a{color:#6e7075}`;

function page(t){
  const s=SEO[t.id], cat=CATS[TEST_CAT[t.id]], url=`${DOMAIN}/test/${s.slug}`;
  const pageName=s.h1||t.name, title=s.seoTitle||`${t.name} — test online con base científica | Testia`;
  const related = TESTS.filter(x=>x.id!==t.id && TEST_CAT[x.id]===TEST_CAT[t.id])
    .concat(TESTS.filter(x=>x.id!==t.id && TEST_CAT[x.id]!==TEST_CAT[t.id])).slice(0,3);
  const graph = [
    {"@type":"Quiz","name":t.name,"about":s.intro,"url":url,"educationalLevel":"general",
     "isAccessibleForFree":true,"inLanguage":"es","timeRequired":`PT${mins(t)}M`,
     "numberOfQuestions":t.items.length,
     "provider":{"@type":"Organization","name":"Testia","url":DOMAIN}},
    {"@type":"BreadcrumbList","itemListElement":[
      {"@type":"ListItem","position":1,"name":"Inicio","item":`${DOMAIN}/`},
      {"@type":"ListItem","position":2,"name":cat.name,"item":`${DOMAIN}/#catalogo`},
      {"@type":"ListItem","position":3,"name":t.name,"item":url}
    ]}
  ];
  if(s.faqs?.length) graph.push({"@type":"FAQPage","mainEntity":s.faqs.map(f=>({
    "@type":"Question","name":f.q,"acceptedAnswer":{"@type":"Answer","text":f.a}
  }))});
  const ld = {"@context":"https://schema.org","@graph":graph};
  return `<!DOCTYPE html><html lang="es"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(s.metaDesc)}">
<meta name="robots" content="index, follow, max-image-preview:large"><meta name="theme-color" content="#2f4bd6"><meta name="author" content="Testia">
<link rel="canonical" href="${url}">
<meta property="og:type" content="website"><meta property="og:site_name" content="Testia"><meta property="og:locale" content="es_ES"><meta property="og:title" content="${esc(pageName)} — Testia"><meta property="og:description" content="${esc(s.metaDesc)}"><meta property="og:url" content="${url}"><meta property="og:image" content="${DOMAIN}/assets/atlas-cover.webp">
<meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${esc(pageName)} — Testia"><meta name="twitter:description" content="${esc(s.metaDesc)}"><meta name="twitter:image" content="${DOMAIN}/assets/atlas-cover.webp">
<link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' rx='22' fill='%232f4bd6'/><text x='50' y='72' font-size='62' font-family='Georgia' fill='white' text-anchor='middle'>T</text></svg>">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,500;12..96,600;12..96,700&family=Instrument+Sans:ital,wght@0,400;0,500;0,600;1,400&display=swap" rel="stylesheet">
<style>${CSS}</style>
<script type="application/ld+json">${JSON.stringify(ld)}</script>
<script defer src="/_vercel/insights/script.js"></script>
<script src="/posthog-analytics.js"></script>
</head><body>
<header><div class="wrap nav"><a class="brand" href="/">Testia</a><nav><a class="lnk" href="/">Inicio</a><a class="lnk" href="/#catalogo">Catálogo</a></nav></div></header>
<main class="wrap">
  <div class="eyebrow" style="color:${cat.color}">${esc(cat.name)}</div>
  <h1>${esc(pageName)}</h1>
  <p class="lead">${esc(s.intro)}</p>
  <div class="meta"><span class="chip">${t.items.length} preguntas</span><span class="chip">~${mins(t)} min</span><span class="chip">Sin registro</span><span class="chip">Inspirado en investigación</span></div>
  <div><a class="btn" style="background:linear-gradient(135deg,#3a57e8,#2840c4)" href="/?start=${t.id}">Hacer el test →</a><a class="btn alt" href="/#catalogo">Ver todos los tests</a></div>

  <h2>Qué vas a descubrir</h2>
  <ul class="learn">${s.learn.map(l=>`<li style="--c:${cat.color}"><b style="color:${cat.color}"></b>${esc(l)}</li>`).join("")}</ul>

  <h2>Cómo funciona</h2>
  <div class="steps">
    <div class="step"><div class="n">01</div><h3>Responde</h3><p>${t.items.length} preguntas inspiradas en un instrumento publicado. Sin registro.</p></div>
    <div class="step"><div class="n">02</div><h3>Recibe tu resultado</h3><p>Interpretación al instante y tu posición frente a la media.</p></div>
    <div class="step"><div class="n">03</div><h3>Comparte</h3><p>Descarga tu carta de resultado y compártela donde quieras.</p></div>
  </div>

${s.sections?.map(x=>`  <section class="content"><h2>${esc(x.title)}</h2><p>${esc(x.body)}</p></section>`).join("\n")||""}

  <h2>Sobre este test</h2>
  <p style="color:#54565c">Este test toma como referencia: <b>${esc(t.instrument)}</b>. La redacción y la experiencia se han adaptado para uso divulgativo; el resultado no equivale a administrar el instrumento original en condiciones profesionales.</p>
  <div class="note">Aviso: Testia es una herramienta de entretenimiento y autoconocimiento. Los resultados son orientativos y no constituyen una evaluación ni un diagnóstico clínico.</div>

${s.faqs?.length?`  <section><h2>Preguntas frecuentes</h2><div class="faq">${s.faqs.map(f=>`<details><summary>${esc(f.q)}</summary><p>${esc(f.a)}</p></details>`).join("")}</div></section>`:""}

  <h2>Otros tests</h2>
  <div class="rel">${related.map(r=>`<a href="/test/${SEO[r.id].slug}">${esc(r.name)}<span>${esc(CATS[TEST_CAT[r.id]].name)}</span></a>`).join("")}</div>

  <div style="text-align:center;margin:54px 0 0"><a class="btn" style="background:linear-gradient(135deg,#3a57e8,#2840c4)" href="/?start=${t.id}">Empezar «${esc(t.name)}» →</a></div>
</main>
<footer><div class="wrap" style="display:flex;justify-content:space-between;flex-wrap:wrap;gap:10px"><span>© 2026 Testia · <a href="/">testia.info</a></span><span>Sin valor diagnóstico · Privacy-first · RGPD</span></div></footer>
</body></html>`;
}

fs.mkdirSync("test", {recursive:true});
let urls = [`${DOMAIN}/`];
for (const t of TESTS){
  const s = SEO[t.id]; if(!s){console.warn("sin SEO:",t.id);continue;}
  fs.writeFileSync(`test/${s.slug}.html`, page(t));
  urls.push(`${DOMAIN}/test/${s.slug}`);
}
const today = new Date().toISOString().slice(0,10);
fs.writeFileSync("sitemap.xml",
 `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`+
 urls.map(u=>`  <url><loc>${u}</loc><lastmod>${today}</lastmod></url>`).join("\n")+`\n</urlset>\n`);
fs.writeFileSync("robots.txt", `User-agent: *\nAllow: /\nSitemap: ${DOMAIN}/sitemap.xml\n`);
console.log(`Generadas ${TESTS.length} páginas en /test/, sitemap.xml (${urls.length} URLs) y robots.txt`);
