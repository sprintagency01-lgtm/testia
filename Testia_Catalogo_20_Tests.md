# Testia — Catálogo de los 20 primeros tests

**Regla del proyecto:** cada test se basa en un instrumento psicométrico **validado y fiable**, con fuente verificada. Nada inventado. Para una plataforma comercial, la licencia es tan importante como la validez, así que cada test lleva un semáforo de uso comercial.

Semáforo de licencia:
- 🟢 **Libre / dominio público** — usable en producto comercial (a veces con cita obligatoria).
- 🟡 **Revisar** — libre para investigación/uso académico; para uso comercial conviene confirmar con el autor o reconstruir los ítems propios manteniendo el constructo.
- 🔴 **De pago / propietario** — requiere licencia (evitar o pagar).

> Nota legal práctica: para los 🟡, lo habitual y seguro es **medir el mismo constructo con ítems redactados por nosotros** (las escalas miden rasgos, y el rasgo no se puede copyrightear; sí la redacción exacta de los ítems). Eso nos da validez de constructo + cero problema de licencia.

---

## Tabla resumen

| # | Test (nombre comercial) | Instrumento base | Mide | Ítems | Fiabilidad (α) | Licencia |
|---|---|---|---|---|---|---|
| 1 | Test de Personalidad (Big Five) | IPIP Big-Five (Goldberg) | Apertura, Responsabilidad, Extraversión, Amabilidad, Estabilidad | 50 (o 120) | .77–.86 | 🟢 |
| 2 | Personalidad Exprés | TIPI (Gosling 2003) | Big Five en versión ultracorta | 10 | .40–.73 | 🟢 |
| 3 | ¿Eres buena persona? (Honestidad-Humildad) | HEXACO vía IPIP | 6.ª dimensión: sinceridad, justicia, modestia | 16–20 | .80+ | 🟢 (vía IPIP) |
| 4 | Tu lado oscuro (Tríada Oscura) | Short Dark Triad SD3 (Jones & Paulhus 2014) | Maquiavelismo, narcisismo, psicopatía | 27 | .71–.80 | 🟡 |
| 5 | Tu brújula moral | Moral Foundations MFQ (Graham, Haidt, Nosek) | 5 fundamentos morales (cuidado, justicia, lealtad, autoridad, pureza) | 30 | .65–.84 | 🟢 |
| 6 | Test de CI | Estilo ICAR (ítems propios) | Razonamiento lógico, numérico, espacial | 20 | — | 🟡→🟢 con ítems propios |
| 7 | ¿Intuitivo o reflexivo? | Cognitive Reflection Test (Frederick 2005) | Pensamiento rápido vs. reflexivo | 3–7 | — | 🟡 (usar ítems nuevos) |
| 8 | ¿Te gusta pensar? | Need for Cognition NCS-6 (Coelho 2020) | Disfrute del esfuerzo mental | 6 | bueno (IRT) | 🟢 |
| 9 | Test Vocacional | O*NET Interest Profiler (RIASEC, Holland) | 6 intereses profesionales | 60 (o 30) | alta | 🟢 (dominio público, US DoL) |
| 10 | Inteligencia Emocional | Schutte SSEIT (1998) | Percibir, usar y gestionar emociones | 33 | .87–.90 | 🟡 |
| 11 | Tu nivel de empatía | Empathy Quotient EQ (Baron-Cohen) | Empatía cognitiva y afectiva | 40 (+20 filtro) | r=.84 (test-retest) | 🟡 |
| 12 | Test de Autoestima | Rosenberg RSES (1965) | Autoestima global | 10 | .77–.88 | 🟢 |
| 13 | Test de Determinación (Grit) | Grit Scale (Duckworth 2007) | Pasión y perseverancia a largo plazo | 12 (u 8) | .73–.83 | 🟢 (con cita) |
| 14 | ¿Cómo de feliz eres? | Satisfaction with Life Scale (Diener 1985) | Satisfacción vital | 5 | .79–.89 | 🟢 (con cita) |
| 15 | Tu estado de ánimo | PANAS (Watson 1988) | Afecto positivo y negativo | 20 | .84–.90 | 🟢 |
| 16 | ¿Cuánto aguantas? (Resiliencia) | Brief Resilience Scale (Smith 2008) | Capacidad de recuperarse del estrés | 6 | .80–.91 | 🟡 |
| 17 | Tus valores | Schwartz PVQ-21 | 10 valores humanos básicos | 21 | bueno | 🟢 |
| 18 | ¿Maximizador o conformista? | Maximization Scale (Nenkov 2008) | Estilo de decisión | 6 | aceptable | 🟢 |
| 19 | Tu estilo de apego | ECR-R (Fraley, Waller, Brennan 2000) | Ansiedad y evitación en relaciones | 36 | bueno-alto | 🟡 |
| 20 | ¿Búho o alondra? (Cronotipo) | rMEQ (Adan & Almirall 1991) | Matutinidad / vespertinidad | 5 | α=.70, ω=.75 | 🟢 |

---

## Detalle por test

### Bloque A — Personalidad

**1. Big Five (IPIP)** — El núcleo de la psicología de la personalidad moderna. Los marcadores IPIP de Goldberg son de **dominio público total** (sin permisos, sin fees, traducibles y modificables), correlacionan bien con el 16PF y el NEO-PI-R. Es la mejor base posible: gratis, validada y comercializable. Versión de 50 ítems para el MVP; 120 (IPIP-NEO) para el informe premium.

**2. Personalidad Exprés (TIPI)** — 10 ítems, ~1 minuto. Pensado para cuando el tiempo apremia; convergencia alta con medidas largas (r=.65–.87). Fiabilidad baja por solo 2 ítems/dimensión, así que sirve como gancho viral rápido, no para decisiones serias. Libre con cita (Gosling, Rentfrow & Swann, 2003).

**3. Honestidad-Humildad (HEXACO)** — La "sexta dimensión" que el Big Five no captura (sinceridad, justicia, evitar la avaricia, modestia). El HEXACO-PI-R oficial **cobra licencia comercial** (≈C$2/administración), pero el IPIP incluye marcadores de Honestidad-Humildad en dominio público → usar la versión IPIP. 🟢

**4. Tríada Oscura (SD3)** — Maquiavelismo, narcisismo y psicopatía subclínica. 27 ítems (9 por rasgo), buena consistencia (.71–.80). Muy viral ("¿qué tan oscuro eres?"). Libre para investigación; para comercial conviene reconstruir los ítems. Hay críticas a la validez de contenido — comunicarlo como entretenimiento, no diagnóstico.

**5. Brújula moral (MFQ)** — Mide los 5 fundamentos morales de Haidt. Instrumento abierto creado por los autores para uso libre. Excelente para contenido viral político/moral. 🟢

### Bloque B — Capacidad cognitiva

**6. Test de CI** — Ya implementado en el MVP con ítems propios de estilo ICAR (la referencia abierta para medir capacidad cognitiva, r≈.40–.46 con Raven y Mental Rotation). ICAR es dominio público **solo para investigación no comercial**, por lo que mantenemos **ítems redactados por nosotros** siguiendo sus formatos (series, matrices, rotación, completar). Algoritmo norm-referenciado (bruta → z → media 100/SD 15).

**7. Intuitivo o reflexivo (CRT)** — El test de 3 problemas de Frederick. Predice razonamiento sorprendentemente bien para su brevedad, pero está **muy contaminado** (las respuestas circulan por internet) → usar ítems nuevos del mismo tipo (CRT-2, versiones ampliadas). 🟡

**8. ¿Te gusta pensar? (NCS-6)** — Necesidad de cognición en 6 ítems, excelentes propiedades psicométricas (IRT). Combina genial con el CRT como "perfil de pensador". Libre con cita (Coelho, Hanel & Wolf, 2020). 🟢

### Bloque C — Carrera

**9. Test Vocacional (O*NET RIASEC)** — El modelo de Holland (Realista, Investigador, Artístico, Social, Emprendedor, Convencional) implementado por el Departamento de Trabajo de EE. UU. **Dominio público sin restricciones** y enlazable a ocupaciones reales. Es exactamente la keyword que lidera psicoactiva ("test vocacional gratis") con un instrumento mucho mejor. 🟢 — alta prioridad de negocio.

### Bloque D — Emocional / social

**10. Inteligencia Emocional (SSEIT)** — 33 ítems, 4 subescalas, fiabilidad .87–.90. Muy usado y buscado. Libre en la práctica; contactar a la autora (Schutte) o reconstruir ítems para comercial. 🟡

**11. Empatía (EQ)** — Baron-Cohen, Cambridge. 40 ítems de empatía + 20 de relleno, buena test-retest (r=.84). Gancho fuerte. Licencia no explícita → confirmar con el Autism Research Centre o usar ítems propios. 🟡

### Bloque E — Yo y bienestar

**12. Autoestima (RSES)** — El estándar de oro con 50+ años de respaldo, 10 ítems. Dominio público con atribución a Rosenberg (1965). 🟢

**13. Determinación / Grit (Duckworth)** — Pasión + perseverancia hacia metas largas. 12 ítems en 2 factores. Muy popular (charla TED). Libre para investigación con cita; confirmar para comercial. 🟢/🟡

**14. Satisfacción con la vida (SWLS)** — Diener, 5 ítems, 1 minuto, α≈.87, validado en decenas de culturas. **Explícitamente libre para profesionales con crédito** a los autores. 🟢

**15. Estado de ánimo (PANAS)** — Afecto positivo y negativo, 20 ítems, α .84–.90. Ideal como test "rápido del día" recurrente (engagement). Ampliamente usado libre (Watson, Clark & Tellegen, 1988). 🟢

**16. Resiliencia (BRS)** — Capacidad de "rebotar" tras la adversidad, 6 ítems, α .80–.91, 3.800+ citas. Licencia no explícita → confirmar. 🟡

### Bloque F — Valores y decisión

**17. Tus valores (Schwartz PVQ-21)** — Los 10 valores humanos básicos (autodirección, estimulación, hedonismo, logro, poder, seguridad, conformidad, tradición, benevolencia, universalismo). Validado en 82 países. Dominio público / uso académico libre. 🟢

**18. Maximizador o conformista (Maximization Scale)** — Estilo de decisión en 6 ítems (Nenkov 2008). Curiosidad alta ("¿por qué te cuesta tanto elegir en Netflix?") y conecta con satisfacción vital. 🟢

### Bloque G — Relaciones

**19. Estilo de apego (ECR-R)** — Las dos dimensiones del apego adulto (ansiedad, evitación) por IRT, 36 ítems, muy estable (85% varianza compartida en 3 semanas). Enorme potencial viral ("¿cuál es tu estilo de apego?"). Libre académico; confirmar comercial o reconstruir. 🟡

### Bloque H — Estilo de vida

**20. Cronotipo / ¿búho o alondra? (rMEQ)** — Matutinidad-vespertinidad en 5 ítems, validado en 13+ países. Ligero, divertido y muy compartible. 🟢

---

## Recomendación de orden de lanzamiento

1. **Ya listo:** Test de CI (#6).
2. **Siguientes 4 (máximo retorno viral / SEO, todos 🟢):** Big Five (#1), Vocacional RIASEC (#9), Estilo de apego (#19, reconstruyendo ítems), Tríada Oscura (#4, ítems propios).
3. **Rellenos virales rápidos (🟢, cortos):** Cronotipo (#20), Personalidad Exprés (#2), Satisfacción con la vida (#14), Maximizador (#18).
4. **Profundidad / premium:** IE (#10), Empatía (#11), Valores (#17), Brújula moral (#5).

## Aviso transversal (todos los tests)
Todos se presentan como herramientas de **autoconocimiento y entretenimiento**, no como diagnóstico clínico. Los que tocan salud mental (ánimo, resiliencia, autoestima) deben llevar disclaimer y, si aplica, derivar a ayuda profesional. Las puntuaciones son estimaciones orientativas.

---

## Fuentes

- IPIP Big Five: [ipip.ori.org / Goldberg et al.](https://projects.ori.org/lrg/PDFs_papers/Goldberg_et_al_inpress_JRP.pdf) · [Wikipedia](https://en.wikipedia.org/wiki/International_Personality_Item_Pool)
- TIPI: [Gosling Lab](https://gosling.psy.utexas.edu/scales-weve-developed/ten-item-personality-measure-tipi/) · [Frontiers scoping review](https://www.frontiersin.org/journals/psychology/articles/10.3389/fpsyg.2023.1202953/full)
- HEXACO-PI-R (licencia): [hexaco.org — uso no académico](https://hexaco.org/nonacademicuse.htm) · [hexaco.org inventory](https://hexaco.org/hexaco-inventory)
- Short Dark Triad SD3: [Jones & Paulhus (PDF)](https://www2.psych.ubc.ca/~dpaulhus/research/DARK_TRAITS/ARTICLES/ASSESST.2014.with.Jones.pdf) · [Critical review 2025](https://journals.sagepub.com/doi/10.1177/27000710251388327)
- Moral Foundations MFQ: [PLOS One structural model](https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0258910)
- ICAR (cognitivo): [ScienceDirect open-source tool](https://www.sciencedirect.com/science/article/pii/S0191886920300957) · [Young et al. 2021](https://journals.sagepub.com/doi/10.1177/00169862211023775)
- Cognitive Reflection Test: [Wikipedia](https://en.wikipedia.org/wiki/Cognitive_reflection_test) · [Contaminación PMC](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5225989/)
- Need for Cognition NCS-6: [Coelho, Hanel & Wolf 2020 (PMC)](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC7545655/)
- O*NET Interest Profiler RIASEC: [psypack overview](https://psypack.com/assessments/onet-interest-profiler/) · [RIASEC marker scales (ResearchGate)](https://www.researchgate.net/publication/222697129_Development_and_initial_validation_of_brief_public_domain_RIASEC_marker_scales)
- Schutte SSEIT: [EI Consortium](https://www.eiconsortium.org/measures/sreis.html) · [Statistics Solutions](https://www.statisticssolutions.com/free-resources/directory-of-survey-instruments/schutte-self-report-emotional-intelligence-test-sseit/)
- Empathy Quotient: [Baron-Cohen & Wheelwright (PDF)](https://docs.autismresearchcentre.com/papers/2004_BCandSW_EQ.pdf) · [Wikipedia](https://en.wikipedia.org/wiki/Empathy_quotient)
- Rosenberg RSES: [Wikipedia](https://en.wikipedia.org/wiki/Rosenberg_self-esteem_scale)
- Grit Scale: [Duckworth 12-item (PDF)](https://mcnairscholars.com/wp-content/uploads/2015/02/12-item-Grit-Scale-Angela-Duckworth.pdf) · [Grit-S (World Bank PDF)](https://thedocs.worldbank.org/en/doc/608981538070396389-0090022018/original/DevelopmentandValidationoftheShortGritScaleGritS.pdf)
- Satisfaction with Life Scale: [Diener SWLS](https://eddiener.com/satisfaction-with-life-scale-swls/)
- PANAS: [Wikipedia](https://en.wikipedia.org/wiki/Positive_and_Negative_Affect_Schedule) · [NovoPsych](https://novopsych.com/assessments/formulation/positive-and-negative-affect-schedule-panas/)
- Brief Resilience Scale: [NovoPsych BRS](https://novopsych.com/assessments/formulation/brief-resilience-scale/) · [Validación alemana (PMC)](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5811014/)
- Schwartz PVQ-21: [Scales DB](https://db.arabpsychology.com/scales/portrait-values-questionnaire-pvq/)
- Maximization Scale: [Nenkov et al. 2008 (SSRN)](https://papers.ssrn.com/sol3/papers.cfm?abstract_id=1756881) · [DMIDI](https://sjdm.org/dmidi/Maximization_Scale_short.html)
- ECR-R: [Fraley, Waller & Brennan (ResearchGate)](https://www.researchgate.net/publication/7557313_Reliability_and_Validity_of_the_Revised_Experiences_in_Close_Relationships_ECR-R_Self-Report_Measure_of_Adult_Romantic_Attachment)
- rMEQ (cronotipo): [Validez versión reducida (ResearchGate)](https://www.researchgate.net/publication/230036459_Validity_of_the_reduced_version_of_the_Morningness-Eveningness_Questionnaire)
