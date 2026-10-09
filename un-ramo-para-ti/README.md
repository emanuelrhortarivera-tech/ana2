# 🌸 Un Ramo Para Ti — Experiencia de Cumpleaños Interactiva

> *Una experiencia web de cumpleaños íntima, elegante, minimalista y romántica. Diseñada como una obra de arte vectorial botánica con pétalos orgánicos, animaciones lentas y fluidas, y una carta secreta escondida entre las flores.*

---

## ✨ Características Principales

1. **Invitación Íntima:**
   - Fondo negro profundo (`#080708`) con mucho espacio negativo.
   - Una delicada ilustración de flor con respiración suave.
   - Botón minimalista translúcido con borde en rosa empolvado y destello sutil al interactuar.

2. **Ilustración Botánica Vectorial (SVG):**
   - Ramo compuesto por rosas inglesas de múltiples capas, rosas de jardín secundarias, flores silvestres de 5 pétalos, capullos esbeltos y follaje botánico (eucalipto y hojas de rosa).
   - Tallos largos en tonos verdes apagados (`#536B59`) que convergen hacia un lazo de satén rosa empolvado (`#E8A6B7`).
   - Sin 3D, sin Three.js, sin emojis: 100% ilustración vectorial pura y ligera.

3. **Coreografía de Animación en 5 Fases:**
   - **Fase 1 (Tallos):** Trazado progresivo desde abajo hacia arriba.
   - **Fase 2 (Hojas):** Despliegue orgánico a lo largo de los tallos.
   - **Fase 3 (Flores):** Florecimiento del centro hacia afuera; los pétalos se abren con sutiles desfases temporales.
   - **Fase 4 (Lazo y Destellos):** Anudado del lazo y aparición de destellos diminutos.
   - **Fase 5 (Brisa Natural):** Movimiento sutil y asíncrono permanente de las flores y hojas.

4. **Carta de Cumpleaños Escondida:**
   - Tocar o hacer clic en el ramo activa una reacción táctil con destellos y despliega una carta de papel marfil cálido (`#F7F0E8`).
   - Sombra suave, bordes delicados, ilustración botánica en la esquina y tipografía editorial serif.
   - Se puede cerrar para volver a contemplar el ramo y volver a abrir en cualquier momento.

5. **Música Personalizable y Resiliente:**
   - Reproducción automática al pulsar «Abrir tu regalo».
   - Control flotante discreto en la esquina superior para pausar/reanudar.
   - Si no hay música o el navegador bloquea el audio, la experiencia continúa sin ningún error visible ni interrupciones.

6. **100% Responsive & Accesible:**
   - Optimizado para pantallas móviles (iPhone, Android) sin cortes ni desbordamientos horizontales.
   - Navegación completa mediante teclado (`Tab`, `Enter`, `Space`, `Escape`).

---

## 📁 Estructura del Proyecto

```text
un-ramo-para-ti/
├── index.html                   # Estructura semántica principal
├── README.md                    # Documentación y guía de uso
├── audio/
│   ├── LEEME_AUDIO.txt          # Instrucciones para la música
│   └── (cumpleanos.mp3)         # [Opcional] Archivo de música
├── public/
│   └── audio/
│       ├── LEEME_AUDIO.txt      # Instrucciones para la música
│       └── (cumpleanos.mp3)     # [Opcional] Ubicación recomendada del MP3
├── scripts/
│   ├── config.js                # Archivo central de personalización
│   ├── bouquet.js               # Generador botánico SVG y vectores
│   └── app.js                   # Orquestador de transiciones, eventos y audio
└── styles/
    ├── main.css                 # Variables, tipografía y pantalla inicial
    ├── bouquet.css              # Animaciones botánicas y brisa natural
    └── letter.css               # Estilo y despliegue de la carta de papel
```

---

## 🚀 Cómo Ejecutar la Página

No necesitas instalar Node.js ni paquetes externos:

1. **Abrir directamente:**
   - Haz doble clic en el archivo `index.html` para abrirlo en tu navegador favorito (Google Chrome, Microsoft Edge, Safari, Firefox).
2. **Con un servidor local (Recomendado para probar audio):**
   - Si usas VS Code: clic derecho en `index.html` -> *Open with Live Server*.
   - O con cualquier servidor web estático.

---

## ✍️ Cómo Personalizar la Carta y los Textos

Abre el archivo `scripts/config.js` con cualquier editor de texto o bloc de notas:

```javascript
window.RAMO_CONFIG = {
  // Título de la pestaña
  pageTitle: "Un ramo para ti 🌸 Feliz Cumpleaños",

  invitation: {
    title: "Tengo algo bonito para ti",
    subtitle: "Preparé un pequeño regalo con mucho cariño.",
    buttonText: "Abrir tu regalo"
  },

  letter: {
    // Si escribes un nombre aquí, se verá "Para Sofía".
    // Si lo dejas vacío (""), se verá "Para alguien muy especial".
    recipientName: "María", 

    paragraphs: [
      "Hoy quería regalarte algo diferente...",
      "Estas flores son para ti...",
      "Feliz cumpleaños. Espero que este nuevo año..."
    ],

    closing: "Con mucho cariño,",
    signature: "de alguien que quería hacerte sonreír."
  }
};
```

---

## 🎵 Cómo Agregar tu Canción de Cumpleaños

1. Consigue tu canción favorita en formato `.mp3`.
2. Renombra el archivo a exactamente:
   ```text
   cumpleanos.mp3
   ```
3. Cópialo dentro de la carpeta:
   ```text
   public/audio/cumpleanos.mp3
   ```
   *(También funciona si lo colocas en `audio/cumpleanos.mp3`)*
4. ¡Listo! La canción comenzará a sonar en el momento en que la persona pulse «Abrir tu regalo».

---

## 🌐 Cómo Publicar el Regalo en Internet (Gratis)

Puedes enviar esta página a la persona agasajada publicándola en pocos segundos:

### Opción A: Vercel / Netlify (Arrastrar y Soltar)
1. Ve a [app.netlify.com/drop](https://app.netlify.com/drop).
2. Arrastra la carpeta completa `un-ramo-para-ti`.
3. Obtendrás un enlace web único (por ejemplo: `https://un-ramo-para-ti.netlify.app`) para enviárselo por WhatsApp o mensaje.

### Opción B: GitHub Pages
1. Sube los archivos a un repositorio en GitHub.
2. Ve a *Settings* > *Pages* > Selecciona la rama `main` y la carpeta `/root`.
3. Guarda y obtendrás la URL pública.
