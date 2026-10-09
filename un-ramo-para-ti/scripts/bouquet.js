/**
 * bouquet.js - Generador de la Ilustración Botánica Vectorial del Ramo
 * 
 * Genera una ilustración SVG de alta calidad artística con:
 * - Rosas protagonistas con pétalos concéntricos superpuestos y degradados suaves.
 * - Rosas de jardín y capullos secundarios con diferentes ángulos y tamaños.
 * - Flores silvestres de cinco pétalos y flores de relleno (estilo velo de novia / gypsophila).
 * - Tallos largos y curvos que convergen orgánicamente hacia la parte inferior.
 * - Follaje botánico con hojas de rosa y ramas de eucalipto en verde apagado.
 * - Lazo de satén en rosa empolvado anudando los tallos con caída natural.
 * - Puntos de anclaje (transform-origin) exactos para que cada flor y pétalo
 *   florezca sin desarticularse ni deformarse.
 */

// Funciones vectoriales accesibles tanto por módulo como por script tradicional en file:///
function createBouquetSVG() {
  return `
<svg id="bouquet-svg" viewBox="0 0 600 740" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- Filtro sutil de resplandor para los destellos -->
    <filter id="soft-glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="3" result="blur" />
      <feMerge>
        <feMergeNode in="blur" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>

    <!-- Sombra sutil de profundidad para las flores principales -->
    <filter id="petal-shadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="2" stdDeviation="3" flood-color="#080708" flood-opacity="0.35" />
    </filter>

    <!-- Degradados para los tallos -->
    <linearGradient id="stem-grad-1" x1="0%" y1="100%" x2="0%" y2="0%">
      <stop offset="0%" stop-color="#3A4D3E" />
      <stop offset="70%" stop-color="#536B59" />
      <stop offset="100%" stop-color="#67836D" />
    </linearGradient>

    <linearGradient id="stem-grad-2" x1="0%" y1="100%" x2="0%" y2="0%">
      <stop offset="0%" stop-color="#2D3C30" />
      <stop offset="100%" stop-color="#4C6352" />
    </linearGradient>

    <!-- Degradados para las hojas -->
    <linearGradient id="leaf-grad-main" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#64806A" />
      <stop offset="50%" stop-color="#536B59" />
      <stop offset="100%" stop-color="#38493C" />
    </linearGradient>

    <linearGradient id="leaf-grad-light" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#729179" />
      <stop offset="100%" stop-color="#4B6150" />
    </linearGradient>

    <!-- Degradados de pétalos: Rosa Protagonista (Centro-Izquierda) -->
    <radialGradient id="rose-core-1" cx="45%" cy="40%" r="60%">
      <stop offset="0%" stop-color="#EAA1B4" />
      <stop offset="45%" stop-color="#D7869C" />
      <stop offset="85%" stop-color="#B97C90" />
      <stop offset="100%" stop-color="#935B6D" />
    </radialGradient>

    <linearGradient id="petal-grad-outer" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#FFF0F4" />
      <stop offset="40%" stop-color="#F8DCE4" />
      <stop offset="80%" stop-color="#F1C1CF" />
      <stop offset="100%" stop-color="#E8A6B7" />
    </linearGradient>

    <linearGradient id="petal-grad-mid" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FCEEF2" />
      <stop offset="50%" stop-color="#F1C1CF" />
      <stop offset="100%" stop-color="#DE93A7" />
    </linearGradient>

    <linearGradient id="petal-grad-inner" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#F3BDCC" />
      <stop offset="70%" stop-color="#E8A6B7" />
      <stop offset="100%" stop-color="#B97C90" />
    </linearGradient>

    <!-- Rosa 2 (Derecha) -->
    <radialGradient id="rose-core-2" cx="50%" cy="50%" r="55%">
      <stop offset="0%" stop-color="#F8D4DF" />
      <stop offset="60%" stop-color="#EAA3B5" />
      <stop offset="100%" stop-color="#C58095" />
    </radialGradient>

    <!-- Flores pequeñas de 5 pétalos -->
    <radialGradient id="blossom-grad" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#FFF5F7" />
      <stop offset="65%" stop-color="#F8DCE4" />
      <stop offset="100%" stop-color="#EAA3B5" />
    </radialGradient>

    <!-- Lazo de satén -->
    <linearGradient id="ribbon-grad-main" x1="0%" y1="0%" x2="100%" y2="50%">
      <stop offset="0%" stop-color="#F3BDCC" />
      <stop offset="35%" stop-color="#E8A6B7" />
      <stop offset="75%" stop-color="#D48B9E" />
      <stop offset="100%" stop-color="#BA7185" />
    </linearGradient>

    <linearGradient id="ribbon-shadow-grad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#BA7185" />
      <stop offset="100%" stop-color="#8F4E60" />
    </linearGradient>
  </defs>

  <!-- ===================================================================== -->
  <!-- CAPA 0: RESPLANDOR AMBIENTAL DETRÁS DEL RAMO                          -->
  <!-- ===================================================================== -->
  <g id="ambient-aura" class="ambient-aura">
    <ellipse cx="300" cy="330" rx="190" ry="170" fill="#E8A6B7" opacity="0.04" filter="url(#soft-glow)" />
    <circle cx="300" cy="310" r="120" fill="#F8DCE4" opacity="0.03" filter="url(#soft-glow)" />
  </g>

  <!-- ===================================================================== -->
  <!-- CAPA 1: TALLOS (Convergen hacia x=300, y=530 y caen al fondo)         -->
  <!-- ===================================================================== -->
  <g id="stems-group" class="stems-group">
    <!-- Tallos inferiores que sobresalen por debajo del lazo -->
    <path class="stem-bottom" d="M 292,538 Q 288,580 274,625" stroke="url(#stem-grad-2)" stroke-width="4.5" stroke-linecap="round" fill="none" />
    <path class="stem-bottom" d="M 297,542 Q 296,590 288,642" stroke="url(#stem-grad-1)" stroke-width="5" stroke-linecap="round" fill="none" />
    <path class="stem-bottom" d="M 302,542 Q 303,595 304,646" stroke="url(#stem-grad-2)" stroke-width="4.8" stroke-linecap="round" fill="none" />
    <path class="stem-bottom" d="M 307,540 Q 312,588 322,638" stroke="url(#stem-grad-1)" stroke-width="5.2" stroke-linecap="round" fill="none" />
    <path class="stem-bottom" d="M 312,536 Q 320,578 335,622" stroke="url(#stem-grad-2)" stroke-width="4" stroke-linecap="round" fill="none" />

    <!-- Tallos principales ascendentes hacia las flores -->
    <!-- Tallo 1: Hacia Rosa Protagonista (izq) -->
    <path class="stem-path" data-stem="1" d="M 295,535 C 275,470 230,410 235,320" stroke="url(#stem-grad-1)" stroke-width="5.5" stroke-linecap="round" fill="none" />
    <!-- Tallo 2: Hacia Rosa Derecha -->
    <path class="stem-path" data-stem="2" d="M 305,535 C 320,465 370,400 375,310" stroke="url(#stem-grad-1)" stroke-width="5.2" stroke-linecap="round" fill="none" />
    <!-- Tallo 3: Hacia Flor Superior Central -->
    <path class="stem-path" data-stem="3" d="M 300,535 C 298,440 295,340 305,215" stroke="url(#stem-grad-1)" stroke-width="5.8" stroke-linecap="round" fill="none" />
    <!-- Tallo 4: Hacia Capullo Izquierdo Superior -->
    <path class="stem-path" data-stem="4" d="M 292,535 C 255,460 175,370 170,250" stroke="url(#stem-grad-2)" stroke-width="4.2" stroke-linecap="round" fill="none" />
    <!-- Tallo 5: Hacia Flor Derecha Superior -->
    <path class="stem-path" data-stem="5" d="M 308,535 C 345,460 415,365 425,240" stroke="url(#stem-grad-2)" stroke-width="4.2" stroke-linecap="round" fill="none" />
    <!-- Tallo 6: Flor lateral baja izquierda -->
    <path class="stem-path" data-stem="6" d="M 290,535 C 240,490 160,430 150,380" stroke="url(#stem-grad-2)" stroke-width="3.8" stroke-linecap="round" fill="none" />
    <!-- Tallo 7: Flor lateral baja derecha -->
    <path class="stem-path" data-stem="7" d="M 310,535 C 360,490 435,435 448,375" stroke="url(#stem-grad-2)" stroke-width="3.8" stroke-linecap="round" fill="none" />

    <!-- Ramitas secundarias para follaje y velo de novia -->
    <path class="stem-sub" d="M 270,455 Q 230,440 205,420" stroke="url(#stem-grad-2)" stroke-width="2.2" stroke-linecap="round" fill="none" />
    <path class="stem-sub" d="M 330,450 Q 375,435 400,410" stroke="url(#stem-grad-2)" stroke-width="2.2" stroke-linecap="round" fill="none" />
    <path class="stem-sub" d="M 215,355 Q 165,330 135,305" stroke="url(#stem-grad-2)" stroke-width="2" stroke-linecap="round" fill="none" />
    <path class="stem-sub" d="M 385,345 Q 435,320 465,295" stroke="url(#stem-grad-2)" stroke-width="2" stroke-linecap="round" fill="none" />
    <path class="stem-sub" d="M 298,320 Q 260,250 240,195" stroke="url(#stem-grad-2)" stroke-width="2.2" stroke-linecap="round" fill="none" />
    <path class="stem-sub" d="M 305,310 Q 345,245 365,190" stroke="url(#stem-grad-2)" stroke-width="2.2" stroke-linecap="round" fill="none" />
  </g>

  <!-- ===================================================================== -->
  <!-- CAPA 2: HOJAS BOTÁNICAS (Ubicadas a lo largo de los tallos)          -->
  <!-- ===================================================================== -->
  <g id="leaves-group" class="leaves-group">
    <!-- Hoja 1: Izquierda inferior -->
    <g class="leaf-node" style="--origin: 245px 475px; --delay: 0.6s;">
      <path d="M 245,475 C 205,465 175,495 155,485 C 175,460 215,450 245,475 Z" fill="url(#leaf-grad-main)" />
      <path d="M 245,475 Q 200,470 155,485" stroke="#729179" stroke-width="1" stroke-linecap="round" fill="none" opacity="0.6" />
    </g>

    <!-- Hoja 2: Derecha inferior -->
    <g class="leaf-node" style="--origin: 350,470; --delay: 0.7s;">
      <path d="M 350,470 C 390,460 425,485 445,470 C 425,450 385,445 350,470 Z" fill="url(#leaf-grad-main)" />
      <path d="M 350,470 Q 395,465 445,470" stroke="#729179" stroke-width="1" stroke-linecap="round" fill="none" opacity="0.6" />
    </g>

    <!-- Hoja 3: Lateral izquierda centro -->
    <g class="leaf-node" style="--origin: 200px 380px; --delay: 0.8s;">
      <path d="M 200,380 C 150,370 120,395 95,385 C 115,355 160,350 200,380 Z" fill="url(#leaf-grad-light)" />
      <path d="M 200,380 Q 150,370 95,385" stroke="#87A68E" stroke-width="1" stroke-linecap="round" fill="none" opacity="0.7" />
    </g>

    <!-- Hoja 4: Lateral derecha centro -->
    <g class="leaf-node" style="--origin: 395px 375px; --delay: 0.9s;">
      <path d="M 395,375 C 445,365 475,390 505,380 C 485,350 440,345 395,375 Z" fill="url(#leaf-grad-light)" />
      <path d="M 395,375 Q 445,365 505,380" stroke="#87A68E" stroke-width="1" stroke-linecap="round" fill="none" opacity="0.7" />
    </g>

    <!-- Hoja 5: Entre flores izquierda -->
    <g class="leaf-node" style="--origin: 250px 300px; --delay: 1.0s;">
      <path d="M 250,300 C 210,270 185,280 160,265 C 185,245 225,260 250,300 Z" fill="url(#leaf-grad-main)" />
      <path d="M 250,300 Q 205,275 160,265" stroke="#729179" stroke-width="1" fill="none" opacity="0.5" />
    </g>

    <!-- Hoja 6: Entre flores derecha -->
    <g class="leaf-node" style="--origin: 355px 290px; --delay: 1.1s;">
      <path d="M 355,290 C 395,260 420,270 445,255 C 420,235 380,250 355,290 Z" fill="url(#leaf-grad-main)" />
      <path d="M 355,290 Q 400,265 445,255" stroke="#729179" stroke-width="1" fill="none" opacity="0.5" />
    </g>

    <!-- Hojas superiores delicadas de eucalipto -->
    <g class="leaf-node" style="--origin: 240px 195px; --delay: 1.2s;">
      <path d="M 240,195 C 220,165 200,160 185,145 C 205,140 230,165 240,195 Z" fill="url(#leaf-grad-light)" opacity="0.9" />
    </g>
    <g class="leaf-node" style="--origin: 365px 190px; --delay: 1.25s;">
      <path d="M 365,190 C 385,160 405,155 420,140 C 400,135 375,160 365,190 Z" fill="url(#leaf-grad-light)" opacity="0.9" />
    </g>
    <g class="leaf-node" style="--origin: 305px 170px; --delay: 1.3s;">
      <path d="M 305,170 C 290,135 300,110 300,95 C 315,115 318,140 305,170 Z" fill="url(#leaf-grad-light)" opacity="0.95" />
    </g>
  </g>

  <!-- ===================================================================== -->
  <!-- CAPA 3: FLORES SECUNDARIAS DE RELLENO (Velo de novia / Gypsophila)    -->
  <!-- ===================================================================== -->
  <g id="fillers-group" class="fillers-group">
    <!-- Ramillete izquierdo -->
    <circle class="filler-dot" cx="130" cy="300" r="4.5" fill="#FFF0F4" opacity="0.9" style="--delay: 1.3s;" />
    <circle class="filler-dot" cx="145" cy="285" r="3.8" fill="#F8DCE4" opacity="0.8" style="--delay: 1.35s;" />
    <circle class="filler-dot" cx="120" cy="280" r="3.2" fill="#F1C1CF" opacity="0.75" style="--delay: 1.4s;" />
    <circle class="filler-dot" cx="155" cy="315" r="4" fill="#FFF5F7" opacity="0.85" style="--delay: 1.45s;" />

    <!-- Ramillete derecho -->
    <circle class="filler-dot" cx="470" cy="290" r="4.5" fill="#FFF0F4" opacity="0.9" style="--delay: 1.3s;" />
    <circle class="filler-dot" cx="455" cy="275" r="3.8" fill="#F8DCE4" opacity="0.8" style="--delay: 1.35s;" />
    <circle class="filler-dot" cx="485" cy="270" r="3.2" fill="#F1C1CF" opacity="0.75" style="--delay: 1.4s;" />
    <circle class="filler-dot" cx="445" cy="305" r="4" fill="#FFF5F7" opacity="0.85" style="--delay: 1.45s;" />

    <!-- Ramillete superior -->
    <circle class="filler-dot" cx="245" cy="180" r="4" fill="#FFF5F7" opacity="0.9" style="--delay: 1.5s;" />
    <circle class="filler-dot" cx="260" cy="165" r="3.5" fill="#F8DCE4" opacity="0.85" style="--delay: 1.55s;" />
    <circle class="filler-dot" cx="355" cy="175" r="4" fill="#FFF5F7" opacity="0.9" style="--delay: 1.5s;" />
    <circle class="filler-dot" cx="340" cy="160" r="3.5" fill="#F8DCE4" opacity="0.85" style="--delay: 1.55s;" />
  </g>

  <!-- ===================================================================== -->
  <!-- CAPA 4: FLORES DEL RAMO (Bloom ordenado del centro hacia los bordes)  -->
  <!-- ===================================================================== -->
  <g id="flowers-group" class="flowers-group">

    <!-- ----------------------------------------------------------------- -->
    <!-- FLOR 1 (PROTAGONISTA): Gran Rosa de Jardín Inglés (Centro-Izq)     -->
    <!-- Centro exacto: x=235, y=320                                       -->
    <!-- ----------------------------------------------------------------- -->
    <g class="flower-entity rose-hero" data-flower="hero" style="--cx: 235px; --cy: 320px; --delay: 1.4s; --sway-delay: 0s;">
      
      <!-- Pétalos exteriores (capa 1) -->
      <path class="petal p-outer" d="M 235,320 C 160,335 150,260 195,240 C 230,225 250,270 235,320 Z" fill="url(#petal-grad-outer)" filter="url(#petal-shadow)" />
      <path class="petal p-outer" d="M 235,320 C 265,230 330,245 315,295 C 300,340 250,335 235,320 Z" fill="url(#petal-grad-outer)" filter="url(#petal-shadow)" />
      <path class="petal p-outer" d="M 235,320 C 315,325 315,400 260,405 C 220,410 220,350 235,320 Z" fill="url(#petal-grad-outer)" filter="url(#petal-shadow)" />
      <path class="petal p-outer" d="M 235,320 C 210,415 140,380 155,335 C 165,300 210,305 235,320 Z" fill="url(#petal-grad-outer)" filter="url(#petal-shadow)" />

      <!-- Pétalos intermedios (capa 2) -->
      <path class="petal p-mid" d="M 235,320 C 185,295 190,250 225,255 C 255,260 250,300 235,320 Z" fill="url(#petal-grad-mid)" />
      <path class="petal p-mid" d="M 235,320 C 275,270 305,290 290,325 C 275,355 245,340 235,320 Z" fill="url(#petal-grad-mid)" />
      <path class="petal p-mid" d="M 235,320 C 255,365 210,380 195,350 C 185,330 215,310 235,320 Z" fill="url(#petal-grad-mid)" />
      <path class="petal p-mid" d="M 235,320 C 175,335 180,300 205,285 C 230,270 240,300 235,320 Z" fill="url(#petal-grad-mid)" />

      <!-- Pétalos interiores envolventes (capa 3) -->
      <path class="petal p-inner" d="M 235,320 C 205,300 210,275 235,280 C 255,285 250,310 235,320 Z" fill="url(#petal-grad-inner)" />
      <path class="petal p-inner" d="M 235,320 C 255,295 270,315 255,335 C 240,350 225,335 235,320 Z" fill="url(#petal-grad-inner)" />
      <path class="petal p-inner" d="M 235,320 C 220,340 205,330 210,310 C 215,295 230,305 235,320 Z" fill="url(#petal-grad-inner)" />

      <!-- Corazón de la rosa / espiral central -->
      <ellipse cx="235" cy="312" rx="15" ry="12" fill="url(#rose-core-1)" />
      <path d="M 226,312 C 226,306 244,306 244,312 C 244,317 230,317 230,312" stroke="#FFF0F4" stroke-width="1.4" stroke-linecap="round" fill="none" opacity="0.85" />
      <path d="M 229,313 C 229,309 240,309 240,313" stroke="#FCEEF2" stroke-width="1.2" stroke-linecap="round" fill="none" opacity="0.9" />
    </g>

    <!-- ----------------------------------------------------------------- -->
    <!-- FLOR 2: Segunda Rosa Elegante (Centro-Der, semiabierta)           -->
    <!-- Centro exacto: x=375, y=310                                       -->
    <!-- ----------------------------------------------------------------- -->
    <g class="flower-entity rose-secondary" data-flower="second" style="--cx: 375px; --cy: 310px; --delay: 1.6s; --sway-delay: 0.5s;">
      
      <!-- Pétalos exteriores -->
      <path class="petal p-outer" d="M 375,310 C 310,300 320,230 365,225 C 400,220 415,270 375,310 Z" fill="url(#petal-grad-outer)" filter="url(#petal-shadow)" />
      <path class="petal p-outer" d="M 375,310 C 435,250 470,295 440,345 C 410,380 375,340 375,310 Z" fill="url(#petal-grad-outer)" filter="url(#petal-shadow)" />
      <path class="petal p-outer" d="M 375,310 C 410,385 345,405 320,365 C 305,335 345,320 375,310 Z" fill="url(#petal-grad-outer)" filter="url(#petal-shadow)" />
      <path class="petal p-outer" d="M 375,310 C 330,370 290,320 315,280 C 335,250 360,280 375,310 Z" fill="url(#petal-grad-outer)" filter="url(#petal-shadow)" />

      <!-- Pétalos intermedios -->
      <path class="petal p-mid" d="M 375,310 C 335,275 350,245 380,250 C 405,255 395,290 375,310 Z" fill="url(#petal-grad-mid)" />
      <path class="petal p-mid" d="M 375,310 C 420,280 430,315 405,340 C 385,360 365,335 375,310 Z" fill="url(#petal-grad-mid)" />
      <path class="petal p-mid" d="M 375,310 C 380,355 345,360 335,335 C 325,315 350,305 375,310 Z" fill="url(#petal-grad-mid)" />

      <!-- Pétalos interiores -->
      <path class="petal p-inner" d="M 375,310 C 355,290 365,270 385,275 C 400,280 395,305 375,310 Z" fill="url(#petal-grad-inner)" />
      <path class="petal p-inner" d="M 375,310 C 395,295 405,315 390,330 C 375,340 365,325 375,310 Z" fill="url(#petal-grad-inner)" />

      <!-- Centro de la rosa -->
      <ellipse cx="375" cy="305" rx="14" ry="11" fill="url(#rose-core-2)" />
      <path d="M 368,305 C 368,300 382,300 382,305 C 382,309 372,309 372,305" stroke="#FFF0F4" stroke-width="1.3" stroke-linecap="round" fill="none" opacity="0.85" />
    </g>

    <!-- ----------------------------------------------------------------- -->
    <!-- FLOR 3: Rosa Superior / Clímax (Centro-Arriba, estilizada)        -->
    <!-- Centro exacto: x=305, y=215                                       -->
    <!-- ----------------------------------------------------------------- -->
    <g class="flower-entity rose-top" data-flower="top" style="--cx: 305px; --cy: 215px; --delay: 1.8s; --sway-delay: 1.1s;">
      <!-- Pétalos exteriores -->
      <path class="petal p-outer" d="M 305,215 C 255,200 260,145 295,145 C 330,145 340,190 305,215 Z" fill="url(#petal-grad-outer)" filter="url(#petal-shadow)" />
      <path class="petal p-outer" d="M 305,215 C 350,170 385,210 360,250 C 335,275 295,250 305,215 Z" fill="url(#petal-grad-outer)" filter="url(#petal-shadow)" />
      <path class="petal p-outer" d="M 305,215 C 320,270 265,280 250,245 C 240,220 275,200 305,215 Z" fill="url(#petal-grad-outer)" filter="url(#petal-shadow)" />

      <!-- Pétalos intermedios -->
      <path class="petal p-mid" d="M 305,215 C 275,185 290,160 315,165 C 335,170 325,200 305,215 Z" fill="url(#petal-grad-mid)" />
      <path class="petal p-mid" d="M 305,215 C 340,200 345,230 325,245 C 310,255 295,235 305,215 Z" fill="url(#petal-grad-mid)" />
      <path class="petal p-mid" d="M 305,215 C 285,240 265,225 275,205 C 285,190 300,205 305,215 Z" fill="url(#petal-grad-mid)" />

      <!-- Núcleo central -->
      <ellipse cx="305" cy="210" rx="12" ry="10" fill="url(#rose-core-1)" />
      <path d="M 299,210 C 299,206 311,206 311,210 C 311,213 303,213 303,210" stroke="#FFF0F4" stroke-width="1.2" stroke-linecap="round" fill="none" opacity="0.9" />
    </g>

    <!-- ----------------------------------------------------------------- -->
    <!-- FLOR 4: Flor Silvestre de 5 pétalos (Lateral Izquierda)            -->
    <!-- Centro exacto: x=150, y=380                                       -->
    <!-- ----------------------------------------------------------------- -->
    <g class="flower-entity blossom-left" data-flower="blossom-l" style="--cx: 150px; --cy: 380px; --delay: 2.0s; --sway-delay: 1.6s;">
      <!-- 5 Pétalos orgánicos dispuestos radialmente -->
      <path class="petal p-outer" d="M 150,380 C 120,360 115,325 140,325 C 160,325 160,360 150,380 Z" fill="url(#blossom-grad)" />
      <path class="petal p-outer" d="M 150,380 C 165,355 195,360 195,385 C 195,405 165,400 150,380 Z" fill="url(#blossom-grad)" />
      <path class="petal p-outer" d="M 150,380 C 165,405 155,435 135,430 C 120,425 135,395 150,380 Z" fill="url(#blossom-grad)" />
      <path class="petal p-outer" d="M 150,380 C 125,405 95,395 100,375 C 105,360 135,370 150,380 Z" fill="url(#blossom-grad)" />
      <path class="petal p-outer" d="M 150,380 C 105,370 100,340 120,335 C 135,330 145,360 150,380 Z" fill="url(#blossom-grad)" />

      <!-- Estambres centrales -->
      <circle cx="150" cy="380" r="6" fill="#B97C90" />
      <circle cx="148" cy="378" r="1.5" fill="#FFF5F7" />
      <circle cx="152" cy="379" r="1.4" fill="#FFF5F7" />
      <circle cx="150" cy="383" r="1.4" fill="#FFF5F7" />
    </g>

    <!-- ----------------------------------------------------------------- -->
    <!-- FLOR 5: Flor Silvestre de 5 pétalos (Lateral Derecha)             -->
    <!-- Centro exacto: x=448, y=375                                       -->
    <!-- ----------------------------------------------------------------- -->
    <g class="flower-entity blossom-right" data-flower="blossom-r" style="--cx: 448px; --cy: 375px; --delay: 2.1s; --sway-delay: 2.1s;">
      <path class="petal p-outer" d="M 448,375 C 420,355 425,320 450,320 C 470,320 465,355 448,375 Z" fill="url(#blossom-grad)" />
      <path class="petal p-outer" d="M 448,375 C 475,355 500,370 495,395 C 490,415 465,400 448,375 Z" fill="url(#blossom-grad)" />
      <path class="petal p-outer" d="M 448,375 C 465,405 445,435 425,425 C 415,415 435,390 448,375 Z" fill="url(#blossom-grad)" />
      <path class="petal p-outer" d="M 448,375 C 420,400 395,385 405,365 C 415,355 435,370 448,375 Z" fill="url(#blossom-grad)" />
      <path class="petal p-outer" d="M 448,375 C 410,360 415,330 435,330 C 445,330 445,360 448,375 Z" fill="url(#blossom-grad)" />

      <!-- Estambres centrales -->
      <circle cx="448" cy="375" r="5.5" fill="#B97C90" />
      <circle cx="446" cy="373" r="1.4" fill="#FFF5F7" />
      <circle cx="450" cy="374" r="1.3" fill="#FFF5F7" />
      <circle cx="448" cy="378" r="1.3" fill="#FFF5F7" />
    </g>

    <!-- ----------------------------------------------------------------- -->
    <!-- FLOR 6: Capullo Esbelto de Rosa (Izquierda Superior)              -->
    <!-- Centro exacto: x=170, y=250                                       -->
    <!-- ----------------------------------------------------------------- -->
    <g class="flower-entity bud-left" data-flower="bud-l" style="--cx: 170px; --cy: 250px; --delay: 2.2s; --sway-delay: 0.8s;">
      <path class="petal p-outer" d="M 170,250 C 145,230 150,195 170,190 C 190,195 195,230 170,250 Z" fill="url(#petal-grad-mid)" filter="url(#petal-shadow)" />
      <path class="petal p-inner" d="M 170,250 C 155,225 160,205 170,200 C 180,205 185,225 170,250 Z" fill="url(#petal-grad-inner)" />
      <ellipse cx="170" cy="205" rx="6" ry="7" fill="url(#rose-core-1)" />
      <!-- Cáliz verde abrazando el capullo -->
      <path d="M 163,248 C 160,240 155,235 152,225 C 160,235 165,245 167,252 Z" fill="#536B59" />
      <path d="M 177,248 C 180,240 185,235 188,225 C 180,235 175,245 173,252 Z" fill="#536B59" />
    </g>

    <!-- ----------------------------------------------------------------- -->
    <!-- FLOR 7: Capullo Esbelto de Rosa (Derecha Superior)                -->
    <!-- Centro exacto: x=425, y=240                                       -->
    <!-- ----------------------------------------------------------------- -->
    <g class="flower-entity bud-right" data-flower="bud-r" style="--cx: 425px; --cy: 240px; --delay: 2.3s; --sway-delay: 1.3s;">
      <path class="petal p-outer" d="M 425,240 C 400,220 405,185 425,180 C 445,185 450,220 425,240 Z" fill="url(#petal-grad-mid)" filter="url(#petal-shadow)" />
      <path class="petal p-inner" d="M 425,240 C 410,215 415,195 425,190 C 435,195 440,215 425,240 Z" fill="url(#petal-grad-inner)" />
      <ellipse cx="425" cy="195" rx="6" ry="7" fill="url(#rose-core-2)" />
      <path d="M 418,238 C 415,230 410,225 407,215 C 415,225 420,235 422,242 Z" fill="#536B59" />
      <path d="M 432,238 C 435,230 440,225 443,215 C 435,225 430,235 428,242 Z" fill="#536B59" />
    </g>

  </g>

  <!-- ===================================================================== -->
  <!-- CAPA 5: LAZO DE SATÉN ROSA EMPOLVADO (Atado alrededor de los tallos)  -->
  <!-- Ubicación: x=300, y=535                                               -->
  <!-- ===================================================================== -->
  <g id="ribbon-group" class="ribbon-group" style="--delay: 2.5s;">
    <!-- Lazos traseros (caída de cintas) -->
    <!-- Cinta izquierda cayendo -->
    <path class="ribbon-tail tail-left" d="M 295,540 C 275,560 255,595 248,630 C 255,625 265,605 278,575 C 285,558 293,546 295,540 Z" fill="url(#ribbon-shadow-grad)" opacity="0.9" />
    <!-- Cinta derecha cayendo -->
    <path class="ribbon-tail tail-right" d="M 305,540 C 325,560 345,600 355,635 C 345,628 335,605 322,575 C 315,558 307,546 305,540 Z" fill="url(#ribbon-shadow-grad)" opacity="0.9" />

    <!-- Oreja izquierda del lazo -->
    <path class="ribbon-loop loop-left" d="M 296,535 C 270,510 225,512 215,530 C 208,542 225,552 255,545 C 280,540 293,537 296,535 Z" fill="url(#ribbon-grad-main)" filter="url(#petal-shadow)" />
    <!-- Pliegue interior oreja izquierda -->
    <path d="M 230,528 C 240,525 265,532 285,536" stroke="#BA7185" stroke-width="1.2" stroke-linecap="round" fill="none" opacity="0.7" />

    <!-- Oreja derecha del lazo -->
    <path class="ribbon-loop loop-right" d="M 304,535 C 330,510 375,512 385,530 C 392,542 375,552 345,545 C 320,540 307,537 304,535 Z" fill="url(#ribbon-grad-main)" filter="url(#petal-shadow)" />
    <!-- Pliegue interior oreja derecha -->
    <path d="M 370,528 C 360,525 335,532 315,536" stroke="#BA7185" stroke-width="1.2" stroke-linecap="round" fill="none" opacity="0.7" />

    <!-- Nudo central del lazo -->
    <ellipse cx="300" cy="536" rx="9" ry="8" fill="url(#ribbon-grad-main)" filter="url(#petal-shadow)" />
    <path d="M 296,533 C 298,537 298,539 296,541" stroke="#FCEEF2" stroke-width="1.2" stroke-linecap="round" fill="none" opacity="0.8" />
    <path d="M 304,533 C 302,537 302,539 304,541" stroke="#8F4E60" stroke-width="1.2" stroke-linecap="round" fill="none" opacity="0.6" />
  </g>

  <!-- ===================================================================== -->
  <!-- CAPA 6: DESTELLOS DIMINUTOS Y MÁGICOS                                 -->
  <!-- ===================================================================== -->
  <g id="sparkles-group" class="sparkles-group" style="--delay: 2.8s;">
    <!-- Sparkle 1 (arriba izq) -->
    <g class="sparkle-item" style="--sx: 190px; --sy: 210px; --sdelay: 0s;">
      <path d="M 190,202 Q 190,210 182,210 Q 190,210 190,218 Q 190,210 198,210 Q 190,210 190,202 Z" fill="#FFF5F7" filter="url(#soft-glow)" />
    </g>
    <!-- Sparkle 2 (centro arriba) -->
    <g class="sparkle-item" style="--sx: 320px; --sy: 150px; --sdelay: 1.2s;">
      <path d="M 320,144 Q 320,150 314,150 Q 320,150 320,156 Q 320,150 326,150 Q 320,150 320,144 Z" fill="#FFF5F7" filter="url(#soft-glow)" />
    </g>
    <!-- Sparkle 3 (arriba der) -->
    <g class="sparkle-item" style="--sx: 410px; --sy: 190px; --sdelay: 2.1s;">
      <path d="M 410,183 Q 410,190 403,190 Q 410,190 410,197 Q 410,190 417,190 Q 410,190 410,183 Z" fill="#FFF5F7" filter="url(#soft-glow)" />
    </g>
    <!-- Sparkle 4 (lateral izq) -->
    <g class="sparkle-item" style="--sx: 125px; --sy: 340px; --sdelay: 0.7s;">
      <path d="M 125,335 Q 125,340 120,340 Q 125,340 125,345 Q 125,340 130,340 Q 125,340 125,335 Z" fill="#F8DCE4" />
    </g>
    <!-- Sparkle 5 (lateral der) -->
    <g class="sparkle-item" style="--sx: 470px; --sy: 350px; --sdelay: 1.8s;">
      <path d="M 470,345 Q 470,350 465,350 Q 470,350 470,355 Q 470,350 475,350 Q 470,350 470,345 Z" fill="#F8DCE4" />
    </g>
    <!-- Sparkle 6 (cerca del lazo) -->
    <g class="sparkle-item" style="--sx: 300px; --sy: 505px; --sdelay: 2.7s;">
      <path d="M 300,500 Q 300,505 295,505 Q 300,505 300,510 Q 300,505 305,505 Q 300,505 300,500 Z" fill="#FFF5F7" filter="url(#soft-glow)" />
    </g>
  </g>
</svg>
`;
}

/**
 * Genera la pequeña rosa solitaria y minimalista para la pantalla de invitación
 */
function createSingleRoseSVG() {
  return `
<svg class="single-rose-svg" viewBox="0 0 120 160" width="80" height="106" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="inv-rose-grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFF0F4" />
      <stop offset="50%" stop-color="#F1C1CF" />
      <stop offset="100%" stop-color="#B97C90" />
    </linearGradient>
    <linearGradient id="inv-stem-grad" x1="0%" y1="100%" x2="0%" y2="0%">
      <stop offset="0%" stop-color="#3A4D3E" />
      <stop offset="100%" stop-color="#64806A" />
    </linearGradient>
  </defs>
  <!-- Tallo delicado -->
  <path d="M 60,70 Q 58,110 60,150" stroke="url(#inv-stem-grad)" stroke-width="2.5" stroke-linecap="round" fill="none" />
  <!-- Hoja diminuta -->
  <path d="M 59,105 C 50,100 42,105 38,102 C 45,95 55,98 59,105 Z" fill="#536B59" opacity="0.9" />
  <!-- Pétalos de la rosa -->
  <path d="M 60,70 C 40,65 38,40 55,35 C 70,30 80,55 60,70 Z" fill="url(#inv-rose-grad)" opacity="0.95" />
  <path d="M 60,70 C 75,65 80,45 68,36 C 55,30 48,50 60,70 Z" fill="url(#inv-rose-grad)" opacity="0.9" />
  <path d="M 60,70 C 50,55 52,42 60,42 C 68,42 70,55 60,70 Z" fill="#F8DCE4" />
  <ellipse cx="60" cy="46" rx="5" ry="4" fill="#B97C90" />
  <path d="M 58,45 C 58,43 62,43 62,45" stroke="#FFF0F4" stroke-width="1" stroke-linecap="round" fill="none" />
</svg>
`;
}

/**
 * Genera el adorno botánico de la esquina para la carta de cumpleaños
 */
function createLetterBotanicalCornerSVG() {
  return `
<svg class="letter-corner-svg" viewBox="0 0 100 100" width="60" height="60" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <defs>
    <linearGradient id="corner-rose" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#F8DCE4" />
      <stop offset="100%" stop-color="#D7869C" />
    </linearGradient>
  </defs>
  <!-- Ramitas finas -->
  <path d="M 15,85 Q 25,45 65,30" stroke="#7A9380" stroke-width="1.2" stroke-linecap="round" fill="none" />
  <path d="M 40,55 Q 60,65 80,60" stroke="#7A9380" stroke-width="1" stroke-linecap="round" fill="none" />
  <!-- Hoja diminuta -->
  <path d="M 35,50 C 30,42 22,43 18,38 C 26,38 32,45 35,50 Z" fill="#6B8772" opacity="0.8" />
  <path d="M 52,38 C 55,28 62,25 66,20 C 65,28 60,34 52,38 Z" fill="#6B8772" opacity="0.8" />
  <!-- Florecita en la punta -->
  <circle cx="68" cy="28" r="7" fill="url(#corner-rose)" />
  <circle cx="68" cy="28" r="3" fill="#B97C90" />
  <circle cx="68" cy="28" r="1" fill="#FFF5F7" />
</svg>
`;
}

// Registro global para compatibilidad directa con protocolo file:///
window.RAMO_VECTORS = {
  createBouquetSVG,
  createSingleRoseSVG,
  createLetterBotanicalCornerSVG
};
