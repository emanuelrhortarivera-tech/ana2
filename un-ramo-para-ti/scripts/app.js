/**
 * app.js - Orquestador Principal de la Experiencia Romántica
 * Controla:
 * - Personalización centralizada desde config.js
 * - Transición de la invitación al florecimiento del ramo
 * - Temporización de las fases del ramo y activación de la brisa natural
 * - Interacción táctil / teclado para revelar la carta de papel marfil
 * - Cierre y reapertura fluida de la carta
 * - Audio resiliente sin dependencias externas
 */

class RamoExperience {
  constructor() {
    this.config = window.RAMO_CONFIG || {};
    this.audioElement = null;
    this.audioPlaying = false;
    this.audioAvailable = false;
    this.isTransitioning = false;
    this.letterOpen = false;

    // Elementos del DOM
    this.dom = {
      app: document.getElementById('app'),
      welcomeScene: document.getElementById('scene-welcome'),
      bouquetScene: document.getElementById('scene-bouquet'),
      bouquetStage: document.getElementById('bouquet-stage'),
      bouquetContainer: document.getElementById('bouquet-container'),
      bouquetHint: document.getElementById('bouquet-hint'),
      letterOverlay: document.getElementById('scene-letter-overlay'),
      letterPaper: document.getElementById('letter-paper'),
      btnOpenGift: document.getElementById('btn-open-gift'),
      musicControlContainer: document.getElementById('music-control-container'),
      btnMusicToggle: document.getElementById('btn-music-toggle'),
      btnCloseLetter: document.getElementById('btn-close-letter'),
      btnCloseLetterX: document.getElementById('btn-close-letter-x'),
      ambientMotes: document.getElementById('ambient-motes')
    };

    this.init();
  }

  init() {
    // 1. Configurar título de pestaña (solo si overrideTitle es true)
    if (this.config.overrideTitle && this.config.pageTitle) {
      document.title = this.config.pageTitle;
    }

    // 2. Personalizar textos de la invitación (solo si overrideFromConfig es true)
    if (this.config.invitation && this.config.invitation.overrideFromConfig) {
      const invTitle = document.getElementById('welcome-title');
      const invSub = document.getElementById('welcome-subtitle');
      const invBtn = document.getElementById('btn-open-gift');
      if (invTitle && this.config.invitation.title) invTitle.textContent = this.config.invitation.title;
      if (invSub && this.config.invitation.subtitle) invSub.textContent = this.config.invitation.subtitle;
      if (invBtn && this.config.invitation.buttonText) invBtn.textContent = this.config.invitation.buttonText;
    }

    // 3. Personalizar textos del ramo (solo si overrideFromConfig es true)
    if (this.config.bouquet) {
      if (this.config.bouquet.overrideFromConfig) {
        const hint1 = document.getElementById('hint-primary');
        const hint2 = document.getElementById('hint-secondary');
        if (hint1 && this.config.bouquet.hintTitle) hint1.textContent = this.config.bouquet.hintTitle;
        if (hint2 && this.config.bouquet.hintAction) hint2.textContent = this.config.bouquet.hintAction;
      }
      if (this.dom.bouquetStage && this.config.bouquet.interactiveAriaLabel) {
        this.dom.bouquetStage.setAttribute('aria-label', this.config.bouquet.interactiveAriaLabel);
      }
    }

    // 4. Crear partículas ambientales sutiles
    this.initAmbientMotes();

    // 5. Rellenar textos de la carta desde la configuración
    this.populateLetterContent();

    // 6. Configurar el motor de audio
    this.setupAudio();

    // 7. Enlazar eventos de usuario
    this.bindEvents();
  }

  /**
   * Crea partículas diminutas y lentas que flotan suavemente en el fondo
   */
  initAmbientMotes() {
    if (!this.dom.ambientMotes) return;
    const fragment = document.createDocumentFragment();
    const count = 18;

    for (let i = 0; i < count; i++) {
      const mote = document.createElement('div');
      mote.className = 'ambient-mote';
      const size = Math.random() * 2.5 + 1.2;
      mote.style.width = `${size}px`;
      mote.style.height = `${size}px`;
      mote.style.left = `${Math.random() * 100}%`;
      mote.style.animationDelay = `${Math.random() * 14}s`;
      mote.style.animationDuration = `${Math.random() * 8 + 12}s`;
      fragment.appendChild(mote);
    }

    this.dom.ambientMotes.appendChild(fragment);
  }

  /**
   * Carga los textos personalizados en la carta evitando 'undefined' o etiquetas vacías.
   * Si overrideFromConfig es false (por defecto), respeta el HTML de index.html
   * para que cualquier edición directa en index.html se muestre tal cual.
   */
  populateLetterContent() {
    const letterCfg = this.config.letter || {};

    // Si no está activado overrideFromConfig, se respeta 100% el contenido de index.html
    if (!letterCfg.overrideFromConfig) {
      return;
    }

    const headerEl = document.getElementById('letter-header');
    const bodyEl = document.getElementById('letter-body-paragraphs');
    const closingEl = document.getElementById('letter-closing');
    const signatureEl = document.getElementById('letter-signature');
    const closeBtnEl = document.getElementById('btn-close-letter');

    // Encabezado
    if (headerEl) {
      if (letterCfg.recipientName && letterCfg.recipientName.trim().length > 0) {
        headerEl.textContent = `Para ${letterCfg.recipientName.trim()}`;
      } else if (letterCfg.defaultHeader) {
        headerEl.textContent = letterCfg.defaultHeader;
      }
    }

    // Párrafos del cuerpo
    if (bodyEl && Array.isArray(letterCfg.paragraphs) && letterCfg.paragraphs.length > 0) {
      bodyEl.innerHTML = letterCfg.paragraphs
        .filter(p => p && p.trim().length > 0)
        .map(p => `<p class="letter-text-paragraph">${p}</p>`)
        .join('');
    }

    // Despedida y firma
    if (closingEl && letterCfg.closing) {
      closingEl.textContent = letterCfg.closing;
    }
    if (signatureEl && letterCfg.signature) {
      signatureEl.textContent = letterCfg.signature;
    }

    // Botón de cierre
    if (closeBtnEl && letterCfg.closeButtonText) {
      closeBtnEl.textContent = letterCfg.closeButtonText;
    }
  }

  /**
   * Configura las opciones de audio de forma segura
   */
  setupAudio() {
    try {
      const audioCfg = this.config.audio || {};
      this.candidatePaths = audioCfg.paths || ["public/audio/cumpleanos.mp3", "audio/cumpleanos.mp3"];
      this.audioVolume = typeof audioCfg.volume === 'number' ? audioCfg.volume : 0.5;
      this.audioLoop = audioCfg.loop !== false;
      this.audioInitialized = false;
    } catch (e) {
      this.audioAvailable = false;
    }
  }

  /**
   * Inicia la música de fondo solo tras la interacción directa del usuario
   */
  startAudio() {
    if (this.audioPlaying) return;

    try {
      if (!this.audioElement) {
        this.audioElement = new Audio();
        this.audioElement.volume = this.audioVolume;
        this.audioElement.loop = this.audioLoop;
      }

      let currentPathIndex = 0;
      const tryNextSource = () => {
        if (currentPathIndex < this.candidatePaths.length) {
          const path = this.candidatePaths[currentPathIndex];
          currentPathIndex++;
          this.audioElement.src = path;

          this.audioElement.play()
            .then(() => {
              this.audioPlaying = true;
              this.audioAvailable = true;
              this.updateMusicUI(true);
            })
            .catch(() => {
              tryNextSource();
            });
        } else {
          // Si ningún archivo existe, continúa normalmente y en silencio
          this.audioPlaying = false;
          this.audioAvailable = false;
          this.updateMusicUI(false);
        }
      };

      tryNextSource();
    } catch (e) {
      this.audioPlaying = false;
      this.audioAvailable = false;
      this.updateMusicUI(false);
    }
  }

  /**
   * Alterna reproducir/pausar música desde el botón flotante
   */
  toggleMusic() {
    if (!this.audioElement) {
      this.startAudio();
      return;
    }

    try {
      if (this.audioPlaying) {
        this.audioElement.pause();
        this.audioPlaying = false;
        this.updateMusicUI(false);
      } else {
        this.audioElement.play()
          .then(() => {
            this.audioPlaying = true;
            this.updateMusicUI(true);
          })
          .catch(() => {
            this.audioPlaying = false;
            this.updateMusicUI(false);
          });
      }
    } catch (e) {
      this.audioPlaying = false;
      this.updateMusicUI(false);
    }
  }

  /**
   * Actualiza el aspecto del botón de música
   */
  updateMusicUI(isPlaying) {
    if (!this.dom.btnMusicToggle) return;
    if (isPlaying) {
      this.dom.btnMusicToggle.classList.remove('muted');
      this.dom.btnMusicToggle.setAttribute('aria-label', 'Pausar música de fondo');
    } else {
      this.dom.btnMusicToggle.classList.add('muted');
      this.dom.btnMusicToggle.setAttribute('aria-label', 'Reanudar música de fondo');
    }
  }

  /**
   * Enlaza todas las interacciones del usuario
   */
  bindEvents() {
    // 1. Botón "Abrir tu regalo"
    if (this.dom.btnOpenGift) {
      this.dom.btnOpenGift.addEventListener('click', (e) => {
        e.preventDefault();
        this.handleOpenGift();
      });
    }

    // 2. Control de música
    if (this.dom.btnMusicToggle) {
      this.dom.btnMusicToggle.addEventListener('click', (e) => {
        e.preventDefault();
        this.toggleMusic();
      });
    }

    // 3. Interacción con el Ramo Botánico
    if (this.dom.bouquetStage) {
      // Clic o toque
      this.dom.bouquetStage.addEventListener('click', (e) => {
        this.handleBouquetClick(e);
      });

      // Accesibilidad con teclado (Enter y Espacio)
      this.dom.bouquetStage.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.handleBouquetClick(e);
        }
      });
    }

    // 4. Cerrar la carta
    if (this.dom.btnCloseLetter) {
      this.dom.btnCloseLetter.addEventListener('click', () => {
        this.closeLetter();
      });
    }
    if (this.dom.btnCloseLetterX) {
      this.dom.btnCloseLetterX.addEventListener('click', () => {
        this.closeLetter();
      });
    }

    // Cierre al hacer clic fuera del papel
    if (this.dom.letterOverlay) {
      this.dom.letterOverlay.addEventListener('click', (e) => {
        if (e.target === this.dom.letterOverlay) {
          this.closeLetter();
        }
      });
    }

    // Cerrar carta con tecla Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.letterOpen) {
        this.closeLetter();
      }
    });
  }

  /**
   * Transición de la invitación al ramo que florece
   */
  handleOpenGift() {
    if (this.isTransitioning) return;
    this.isTransitioning = true;

    // Iniciar audio
    this.startAudio();

    // 1. Ocultar pantalla de invitación
    this.dom.welcomeScene.classList.add('fade-out');

    // 2. Mostrar control de música flotante
    this.dom.musicControlContainer.classList.add('visible');

    // 3. Activar escena del ramo
    setTimeout(() => {
      this.dom.bouquetScene.classList.add('active');
      this.dom.bouquetStage.classList.add('animating');

      // 4. Una vez completado el florecimiento inicial (3.2s)
      setTimeout(() => {
        this.dom.bouquetStage.classList.add('revealed');
        this.dom.bouquetHint.classList.add('visible');
        this.isTransitioning = false;
      }, 3200);

    }, 600);
  }

  /**
   * Crea ráfaga de partículas luminosas y destellos desde el ramo o punto de contacto
   */
  spawnTouchParticles(originX, originY) {
    const stage = this.dom.bouquetStage;
    if (!stage) return;

    let burstBox = stage.querySelector('.touch-burst-container');
    if (!burstBox) {
      burstBox = document.createElement('div');
      burstBox.className = 'touch-burst-container';
      stage.appendChild(burstBox);
    }

    const rect = stage.getBoundingClientRect();
    const centerX = typeof originX === 'number' ? originX - rect.left : rect.width / 2;
    const centerY = typeof originY === 'number' ? originY - rect.top : rect.height * 0.45;

    const particleCount = 28;
    for (let i = 0; i < particleCount; i++) {
      const spark = document.createElement('div');
      spark.className = 'touch-spark';

      const angle = (Math.PI * 2 * i) / particleCount + (Math.random() - 0.5) * 0.4;
      const distance = Math.random() * 110 + 40;
      const tx = Math.cos(angle) * distance;
      const ty = Math.sin(angle) * distance;
      const size = Math.random() * 6 + 3.5;
      const duration = Math.random() * 0.5 + 0.9;

      spark.style.width = `${size}px`;
      spark.style.height = `${size}px`;
      spark.style.left = `${centerX}px`;
      spark.style.top = `${centerY}px`;
      spark.style.setProperty('--tx', `${tx}px`);
      spark.style.setProperty('--ty', `${ty}px`);
      spark.style.setProperty('--dur', `${duration}s`);

      burstBox.appendChild(spark);

      setTimeout(() => {
        spark.remove();
      }, duration * 1000 + 100);
    }
  }

  /**
   * Interacción al tocar o hacer clic en el ramo para revelar la carta
   */
  handleBouquetClick(event) {
    if (this.letterOpen || this.isTransitioning) return;
    this.isTransitioning = true;

    // Obtener coordenadas del toque o clic
    let touchX, touchY;
    if (event && event.clientX) {
      touchX = event.clientX;
      touchY = event.clientY;
    }

    // 1. Efecto de partículas brillantes que brotan de las flores
    this.spawnTouchParticles(touchX, touchY);

    // 2. Abrir los capullos que estaban cerrados (bud-left y bud-right)
    this.dom.bouquetStage.classList.add('bloomed-buds');
    const closedBuds = this.dom.bouquetStage.querySelectorAll('.closed-bud');
    closedBuds.forEach(b => b.classList.add('bloomed'));

    // 3. Iluminación y balanceo suave de reacción
    this.dom.bouquetStage.classList.add('clicked');

    setTimeout(() => {
      this.dom.bouquetStage.classList.remove('clicked');
      this.openLetter();
      this.isTransitioning = false;
    }, 1100);
  }

  /**
   * Revela la carta de cumpleaños con transición elegante
   */
  openLetter() {
    this.letterOpen = true;

    // Desplazar sutilmente el ramo al fondo
    this.dom.bouquetScene.classList.remove('letter-closed');
    this.dom.bouquetScene.classList.add('letter-open');

    // Mostrar overlay de la carta
    this.dom.letterOverlay.classList.add('active');
    this.dom.letterOverlay.setAttribute('aria-hidden', 'false');

    // Asegurar que el scroll empiece siempre en la parte superior
    if (this.dom.letterOverlay) {
      this.dom.letterOverlay.scrollTop = 0;
    }
    if (this.dom.letterPaper) {
      this.dom.letterPaper.scrollTop = 0;
    }

    // Poner el foco en el botón superior o en el contenedor de la carta para accesibilidad
    setTimeout(() => {
      if (this.dom.letterPaper) {
        this.dom.letterPaper.scrollTop = 0;
      }
      if (this.dom.btnCloseLetterX) {
        this.dom.btnCloseLetterX.focus({ preventScroll: true });
      } else if (this.dom.letterPaper) {
        this.dom.letterPaper.focus({ preventScroll: true });
      }
    }, 100);
  }

  /**
   * Cierra la carta y regresa al ramo sin reiniciar su animación completa
   */
  closeLetter() {
    if (!this.letterOpen) return;
    this.letterOpen = false;

    // Ocultar overlay de la carta
    this.dom.letterOverlay.classList.remove('active');
    this.dom.letterOverlay.setAttribute('aria-hidden', 'true');

    // Restaurar el ramo a su posición principal con su suave brisa activa
    this.dom.bouquetScene.classList.remove('letter-open');
    this.dom.bouquetScene.classList.add('letter-closed');

    // Devolver el foco al ramo
    if (this.dom.bouquetStage) {
      this.dom.bouquetStage.focus();
    }
  }
}

// Iniciar cuando el DOM esté listo o inmediatamente si ya cargó
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new RamoExperience();
  });
} else {
  new RamoExperience();
}
