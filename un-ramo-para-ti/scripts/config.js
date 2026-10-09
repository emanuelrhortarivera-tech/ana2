// =============================================================================
// CONFIGURACIÓN PERSONALIZABLE DEL REGALO
// =============================================================================
// Puedes modificar cualquiera de estos valores para personalizar la experiencia.
// No necesitas tocar el código visual ni la lógica de la página.
// =============================================================================

window.RAMO_CONFIG = {
  // Título de la pestaña en el navegador
  pageTitle: "Un ramo para ti 🌸 Feliz Cumpleaños",

  // ---------------------------------------------------------------------------
  // PANTALLA 1: LA INVITACIÓN
  // ---------------------------------------------------------------------------
  invitation: {
    title: "Tengo algo bonito para ti",
    subtitle: "Preparé un pequeño regalo con mucho cariño.",
    buttonText: "Abrir tu regalo"
  },

  // ---------------------------------------------------------------------------
  // ESCENA PRINCIPAL: EL RAMO
  // ---------------------------------------------------------------------------
  bouquet: {
    hintTitle: "Hay algo escondido entre estas flores…",
    hintAction: "Toca el ramo para descubrirlo",
    interactiveAriaLabel: "Ramo de flores rosadas interactivo. Pulsa para descubrir la carta escondida."
  },

  // ---------------------------------------------------------------------------
  // PANTALLA 3: LA CARTA DE CUMPLEAÑOS
  // ---------------------------------------------------------------------------
  // NOTA: Puedes editar la carta directamente en index.html (líneas 453-470),
  // que es lo más cómodo y permite añadir párrafos, negritas o emojis.
  // Si prefieres usar este archivo para gestionar los textos, cambia
  // 'overrideFromConfig' a true.
  letter: {
    overrideFromConfig: false,

    // Si se especifica un nombre, se mostrará como "Para [nombre]".
    recipientName: "", 
    defaultHeader: "Para alguien muy especial",

    // Párrafos del mensaje
    paragraphs: [
      "Hoy quería regalarte algo diferente, algo que pudieras guardar como un pequeño recuerdo.",
      "Estas flores son para ti, y cada detalle de este lugar está hecho con mucho cariño.",
      "Feliz cumpleaños. Espero que este nuevo año de tu vida esté lleno de momentos bonitos, sonrisas sinceras y razones para seguir brillando."
    ],

    // Firma o despedida
    closing: "Con mucho cariño,",
    signature: "de alguien que quería hacerte sonreír, Emanuel",

    // Botón para volver a contemplar el ramo
    closeButtonText: "Guardar carta y ver el ramo"
  },

  // ---------------------------------------------------------------------------
  // MÚSICA DE FONDO
  // ---------------------------------------------------------------------------
  // Rutas candidatas para el archivo MP3 (intentará la primera y luego las alternativas)
  audio: {
    paths: [
      "audio/cumpleanos.mp3",
      "public/audio/cumpleanos.mp3",
      "audio/cumpleanos.mp3.mp3",
      "public/audio/cumpleanos.mp3.mp3"
    ],
    volume: 0.5, // Volumen inicial moderado (de 0.0 a 1.0)
    loop: true
  }
};
