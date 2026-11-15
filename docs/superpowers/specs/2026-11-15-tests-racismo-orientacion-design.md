# Tests de racismo (cuestionario e implícito) y de orientación sexual — diseño

Fecha: 2026-11-15 · Pedido por Mario: «Vamos a meter test de racismo y test de orientación sexual», «a y b».

## Por qué
Tráfico de Google con búsquedas de veredicto sobre uno mismo («soy racista test», «test de orientación sexual»), el patrón que mejor vende en Testia (se paga por una cifra sobre uno mismo).

## Enfoques considerados (racismo)
- **A. Cuestionario de actitudes** (prejuicio sutil y manifiesto): rápido, fiable, fácil de explicar; se puede maquillar.
- **B. Test implícito de tiempos de reacción** (método IAT): sorprendente y compartible; más trabajo y validez individual discutida.
- Mario eligió **los dos**: dos tests distintos que se recomiendan entre sí.

## Reglas comunes
- `sensitive:true` en los tres: no se registran respuestas ni resultado en PostHog, sin email del resultado (orientación sexual y origen étnico son datos especiales del RGPD, art. 9).
- Precio: veredicto gratis; desglose por 1,99 € (igual que narcisismo). Pase de 4,99 € los incluye.
- Sin estereotipos, sin juicios morales en el resultado, con límites claros («no diagnostica», «no te define»).
- Landings con el patrón completo (secciones, 6 FAQs, fuentes comprobadas en doi.org/Crossref), seoTitle/h1 propios, entrada en el bloque FIX si hace falta.

## 1. Test de racismo (cuestionario) — `racismo`
- Landing: `/test/test-de-racismo` («Test de racismo: ¿tienes prejuicios?»).
- 20 afirmaciones Likert, escalas inspiradas en Pettigrew y Meertens (1995, prejuicio sutil y manifiesto) y McConahay (racismo moderno), adaptadas a España (personas inmigrantes, magrebíes, latinoamericanas, gitanas, negras): AMENAZA (manifiesto: amenaza y rechazo), DISTANCIA (rechazo a la intimidad: pareja, vecinos, jefe), CULTURA (diferencias culturales exageradas), EMOCION (negación de emociones positivas), MODERNO (negar que exista discriminación hoy). Ítems inversos en cada escala.
- Resultado: «N % de prejuicio» + nivel + tipo (sin prejuicio claro / sutil / manifiesto, por diferencia entre escalas sutiles y manifiestas). Gratis: porcentaje y nivel; de pago: tipo y cinco dimensiones.

## 2. Test de racismo implícito — `implicito`
- Landing: `/test/test-de-racismo-implicito` («Test de racismo implícito: mide tu sesgo automático»).
- Modo nuevo del motor `mode:'iat'`: pantalla propia con dos botones grandes (izquierda/derecha) en móvil y teclas E / I en ordenador.
- Categorías: nombres españoles frente a nombres árabes o magrebíes (grupo más estudiado en España); atributos: palabras agradables frente a desagradables.
- Bloques (versión corta, unos 4 minutos): 1 nombres (16), 2 palabras (16), 3 combinado práctica (16), 4 combinado (32), 5 nombres al revés (16), 6 combinado invertido práctica (16), 7 combinado invertido (32). Orden de los emparejamientos al azar entre personas. Error: aspa roja y hay que corregir.
- Puntuación D mejorada (Greenwald, Nosek y Banaji, 2003): descartar latencias > 10 s, excluir si > 10 % de respuestas < 300 ms, D = media de (B6−B3)/sd y (B7−B4)/sd, con el signo según el orden.
- Resultado: dirección y fuerza («preferencia automática leve/moderada/fuerte por nombres españoles», «sin preferencia», o a favor de nombres árabes) con umbrales 0,15 / 0,35 / 0,65. Gratis: veredicto; de pago: puntuación D, tiempos medios por bloque, errores y explicación.
- Aviso visible: mide asociaciones automáticas, no si eres racista; su valor para una persona concreta es limitado (fuentes en la landing).

## 3. Test de orientación sexual — `orientacion`
- Landing: `/test/test-de-orientacion-sexual` («Test de orientación sexual: ¿dónde estás en la escala de Kinsey?»).
- Inspirado en la escala de Kinsey (1948) y la cuadrícula de Klein (1985): atracción sexual, atracción romántica, fantasías, experiencias, preferencia social, identidad, presente y pasado. Respuestas en escala de «solo personas de distinto sexo» a «solo personas de mi mismo sexo», más ítems de baja atracción en general para detectar asexualidad.
- Resultado: posición en la escala de 0 a 6 («Kinsey 2: mayoritariamente heterosexual con atracción hacia tu mismo sexo») y aviso de espectro asexual si la atracción general es baja. Gratis: posición; de pago: desglose por dimensión, diferencia entre atracción sexual y romántica, cambio entre pasado y presente.
- Lenguaje inclusivo y sin estereotipos; recursos gratuitos (FELGTBI+ y servicio de atención LGTBI de la comunidad) comprobados antes de publicar; aviso de que el resultado no define a nadie y puede cambiar con el tiempo.

## Fuera de alcance
- Fotos de caras en el implícito (derechos y sesgos de las imágenes): solo nombres y palabras.
- Elegir otros grupos en el implícito (gitanos, personas negras): posible ampliación si funciona.

## Lo que decide quien lo construye
Redacción de ítems, nombres de niveles (con gancho y sin cringe), listas de nombres y palabras, umbrales exactos del cuestionario.
