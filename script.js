(() => {
  "use strict";

  const siteConfig = {
    graduate: {
      fullName: "Avivien Aurandia Qanita",
      nickname: "Avin",
      title: "drg.",
      graduationDateDisplay: "Saturday, 18 July 2026",
    },
    sender: {
      name: "Ansa",
    },
    website: {
      title: "AVINVERSE",
      subtitle: "The Guardian of Every Smile",
    },
    audio: {
      volume: 0.34,
    },
  };

  const scenes = Array.from(document.querySelectorAll(".scene"));
  const totalScenes = scenes.length;

  const elements = {
    appHeader: document.getElementById("appHeader"),
    sceneNavigation: document.getElementById("sceneNavigation"),
    sceneLabel: document.getElementById("sceneLabel"),
    sceneProgressBar: document.getElementById("sceneProgressBar"),
    sceneDots: document.getElementById("sceneDots"),
    previousButton: document.getElementById("previousButton"),
    nextButton: document.getElementById("nextButton"),
    homeButton: document.getElementById("homeButton"),
    musicButton: document.getElementById("musicButton"),
    musicIcon: document.getElementById("musicIcon"),
    motionButton: document.getElementById("motionButton"),
    enterButton: document.getElementById("enterButton"),
    openPortalButton: document.getElementById("openPortalButton"),
    portalStage: document.querySelector(".portal-stage"),
    loaderBar: document.getElementById("loaderBar"),
    loaderValue: document.getElementById("loaderValue"),
    loadingCopy: document.getElementById("loadingCopy"),
    heroImage: document.getElementById("heroImage"),
    heroFallback: document.getElementById("heroFallback"),
    backgroundMusic: document.getElementById("backgroundMusic"),
    cosmicCanvas: document.getElementById("cosmicCanvas"),
    toast: document.getElementById("toast"),
  };

  const state = {
    currentScene: 0,
    hasEntered: false,
    musicEnabled: false,
    reducedMotion:
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    transitionLocked: false,
    touchStartX: 0,
    touchStartY: 0,
    toastTimer: null,
    particles: [],
    canvasAnimationId: null,
  };

  function applyConfig() {
    document.title = `${siteConfig.website.title} — ${siteConfig.graduate.nickname}'s Graduation`;

    const graduateName = document.getElementById("graduateName");
    const graduateTitle = document.getElementById("graduateTitle");
    const profileDisplayName = document.getElementById("profileDisplayName");

    if (graduateName) graduateName.textContent = siteConfig.graduate.fullName;
    if (graduateTitle) graduateTitle.textContent = siteConfig.graduate.title;
    if (profileDisplayName) {
      profileDisplayName.textContent =
        `${siteConfig.graduate.title} ${siteConfig.graduate.fullName}`;
    }

    elements.backgroundMusic.volume = siteConfig.audio.volume;
  }

  function createStars() {
    const starCount = window.innerWidth < 640 ? 42 : 78;
    const fragment = document.createDocumentFragment();

    for (let index = 0; index < starCount; index += 1) {
      const star = document.createElement("span");
      star.className = "star";
      star.style.left = `${Math.random() * 100}%`;
      star.style.top = `${Math.random() * 100}%`;
      star.style.setProperty("--size", `${0.8 + Math.random() * 2.1}px`);
      star.style.setProperty("--opacity", `${0.25 + Math.random() * 0.7}`);
      star.style.setProperty("--duration", `${1.7 + Math.random() * 4.5}s`);
      star.style.setProperty("--delay", `${-Math.random() * 5}s`);
      fragment.appendChild(star);
    }

    document.getElementById("stars").replaceChildren(fragment);
  }

  function setupCanvas() {
    const canvas = elements.cosmicCanvas;
    const context = canvas.getContext("2d", { alpha: true });
    let width = 0;
    let height = 0;
    let devicePixelRatio = 1;

    function resizeCanvas() {
      devicePixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;

      canvas.width = Math.round(width * devicePixelRatio);
      canvas.height = Math.round(height * devicePixelRatio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      context.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);

      const count = width < 640 ? 18 : 34;
      state.particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: 0.6 + Math.random() * 1.7,
        speedY: 0.08 + Math.random() * 0.25,
        drift: -0.11 + Math.random() * 0.22,
        alpha: 0.08 + Math.random() * 0.25,
      }));
    }

    function draw() {
      context.clearRect(0, 0, width, height);

      if (!state.reducedMotion) {
        state.particles.forEach((particle) => {
          particle.y -= particle.speedY;
          particle.x += particle.drift;

          if (particle.y < -8) {
            particle.y = height + 8;
            particle.x = Math.random() * width;
          }

          if (particle.x < -8) particle.x = width + 8;
          if (particle.x > width + 8) particle.x = -8;
        });
      }

      for (const particle of state.particles) {
        context.beginPath();
        context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        context.fillStyle = `rgba(225, 209, 255, ${particle.alpha})`;
        context.fill();
      }

      state.canvasAnimationId = window.requestAnimationFrame(draw);
    }

    resizeCanvas();
    draw();

    let resizeTimer;
    window.addEventListener("resize", () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(resizeCanvas, 120);
    });
  }

  function setupHeroFallback() {
    const image = elements.heroImage;

    function showFallback() {
      image.hidden = true;
      elements.heroFallback.hidden = false;
      elements.heroFallback.setAttribute("aria-hidden", "false");
    }

    function showImage() {
      image.hidden = false;
      elements.heroFallback.hidden = true;
      elements.heroFallback.setAttribute("aria-hidden", "true");
    }

    image.addEventListener("error", showFallback);
    image.addEventListener("load", showImage);

    if (image.complete) {
      if (image.naturalWidth > 0) showImage();
      else showFallback();
    }
  }

  function buildSceneDots() {
    const fragment = document.createDocumentFragment();

    scenes.forEach((scene, index) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "scene-dot";
      button.dataset.sceneTarget = String(index);
      button.setAttribute("aria-label", `Buka universe ${index + 1}`);
      button.addEventListener("click", () => goToScene(index));
      fragment.appendChild(button);
    });

    elements.sceneDots.replaceChildren(fragment);
  }

  function updateNavigation() {
    const visibleSceneNumber = state.currentScene + 1;
    elements.sceneLabel.textContent =
      `Universe ${visibleSceneNumber} of ${totalScenes}`;
    elements.sceneProgressBar.style.width =
      `${(visibleSceneNumber / totalScenes) * 100}%`;

    const dots = Array.from(elements.sceneDots.children);
    dots.forEach((dot, index) => {
      const active = index === state.currentScene;
      dot.classList.toggle("is-active", active);
      dot.setAttribute("aria-current", active ? "step" : "false");
    });

    elements.previousButton.disabled = state.currentScene <= 1;
    elements.nextButton.disabled = state.currentScene >= totalScenes - 1;

    if (state.currentScene === totalScenes - 1) {
      elements.nextButton.innerHTML = 'Complete <span aria-hidden="true">✦</span>';
    } else {
      elements.nextButton.innerHTML = 'Next <span aria-hidden="true">→</span>';
    }
  }

  function animateStatsIfNeeded(sceneIndex) {
    if (sceneIndex !== 3) return;

    window.setTimeout(() => {
      document.querySelectorAll(".stat-row").forEach((row) => {
        const bar = row.querySelector(".stat-track span");
        const value = Number(row.dataset.stat || 0);
        bar.style.width = `${Math.min(100, Math.max(0, value))}%`;
      });
    }, state.reducedMotion ? 0 : 320);
  }

  function goToScene(targetIndex, options = {}) {
    const { immediate = false } = options;
    const nextIndex = Math.max(0, Math.min(totalScenes - 1, targetIndex));

    if (
      nextIndex === state.currentScene ||
      (state.transitionLocked && !immediate)
    ) {
      return;
    }

    const currentScene = scenes[state.currentScene];
    const nextScene = scenes[nextIndex];

    state.transitionLocked = true;

    currentScene.classList.add("is-leaving");

    const finishTransition = () => {
      currentScene.classList.remove("is-active", "is-leaving");
      currentScene.hidden = true;

      nextScene.hidden = false;
      nextScene.scrollTop = 0;

      requestAnimationFrame(() => {
        nextScene.classList.add("is-active");
      });

      state.currentScene = nextIndex;
      updateNavigation();
      animateStatsIfNeeded(nextIndex);

      window.setTimeout(() => {
        state.transitionLocked = false;
      }, state.reducedMotion ? 5 : 540);
    };

    if (immediate || state.reducedMotion) {
      finishTransition();
    } else {
      window.setTimeout(finishTransition, 300);
    }
  }

  async function attemptMusicPlayback() {
    try {
      await elements.backgroundMusic.play();
      state.musicEnabled = true;
      updateMusicButton();
    } catch (error) {
      state.musicEnabled = false;
      updateMusicButton();
      showToast("Musik belum tersedia. Tambahkan background-music.mp3 ke folder assets/music.");
    }
  }

  function pauseMusic() {
    elements.backgroundMusic.pause();
    state.musicEnabled = false;
    updateMusicButton();
  }

  function updateMusicButton() {
    elements.musicButton.classList.toggle("is-active", state.musicEnabled);
    elements.musicIcon.textContent = state.musicEnabled ? "♫" : "♪";
    elements.musicButton.setAttribute(
      "aria-label",
      state.musicEnabled ? "Jeda musik" : "Putar musik"
    );
    elements.musicButton.title =
      state.musicEnabled ? "Jeda musik" : "Putar musik";
  }

  function showToast(message) {
    window.clearTimeout(state.toastTimer);
    elements.toast.textContent = message;
    elements.toast.classList.add("is-visible");

    state.toastTimer = window.setTimeout(() => {
      elements.toast.classList.remove("is-visible");
    }, 3400);
  }

  function createPortalBurst() {
    const rect = elements.portalStage.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const colors = ["#ffffff", "#bca7ff", "#f6a6cd", "#e7c680", "#9fe7ef"];
    const count = state.reducedMotion ? 0 : 38;

    for (let index = 0; index < count; index += 1) {
      const particle = document.createElement("span");
      const angle = (Math.PI * 2 * index) / count + Math.random() * 0.28;
      const distance = 120 + Math.random() * 240;

      particle.className = "portal-particle";
      particle.style.left = `${centerX}px`;
      particle.style.top = `${centerY}px`;
      particle.style.setProperty("--particle-size", `${3 + Math.random() * 7}px`);
      particle.style.setProperty(
        "--particle-color",
        colors[Math.floor(Math.random() * colors.length)]
      );
      particle.style.setProperty("--move-x", `${Math.cos(angle) * distance}px`);
      particle.style.setProperty("--move-y", `${Math.sin(angle) * distance}px`);

      document.body.appendChild(particle);
      particle.addEventListener("animationend", () => particle.remove(), {
        once: true,
      });
    }
  }

  function runLoadingSequence() {
    const messages = [
      "Preparing a universe for someone extraordinary...",
      "Collecting every dream, effort, and sleepless night...",
      "Calibrating the graduation portal...",
      "A new doctor is ready to arrive.",
    ];

    let progress = 0;
    let messageIndex = 0;

    const interval = window.setInterval(() => {
      const increment = progress < 70
        ? 4 + Math.random() * 7
        : 1.5 + Math.random() * 4;

      progress = Math.min(100, progress + increment);
      const roundedProgress = Math.round(progress);

      elements.loaderBar.style.width = `${roundedProgress}%`;
      elements.loaderValue.textContent = `${roundedProgress}%`;

      const expectedMessageIndex = Math.min(
        messages.length - 1,
        Math.floor((roundedProgress / 100) * messages.length)
      );

      if (expectedMessageIndex !== messageIndex) {
        messageIndex = expectedMessageIndex;
        elements.loadingCopy.textContent = messages[messageIndex];
      }

      if (progress >= 100) {
        window.clearInterval(interval);
        elements.enterButton.disabled = false;
        elements.enterButton.classList.add("is-ready");
        elements.loadingCopy.textContent = "The Avinverse is ready.";
      }
    }, state.reducedMotion ? 20 : 90);
  }

  function enterExperience() {
    if (state.hasEntered) return;

    state.hasEntered = true;
    elements.appHeader.classList.remove("is-hidden");
    elements.sceneNavigation.classList.remove("is-hidden");

    attemptMusicPlayback();
    goToScene(1);

    showToast("Welcome to the Avinverse ✦");
  }

  function openPortal() {
    if (state.transitionLocked) return;

    elements.portalStage.classList.add("is-opening");
    createPortalBurst();

    window.setTimeout(() => {
      goToScene(2);
      elements.portalStage.classList.remove("is-opening");
    }, state.reducedMotion ? 20 : 900);
  }

  function toggleMotion() {
    state.reducedMotion = !state.reducedMotion;
    document.body.classList.toggle("reduced-motion", state.reducedMotion);
    elements.motionButton.classList.toggle("is-active", state.reducedMotion);
    elements.motionButton.setAttribute(
      "aria-label",
      state.reducedMotion ? "Aktifkan animasi" : "Kurangi animasi"
    );
    elements.motionButton.title =
      state.reducedMotion ? "Aktifkan animasi" : "Kurangi animasi";

    showToast(
      state.reducedMotion
        ? "Animasi dikurangi."
        : "Animasi penuh diaktifkan."
    );
  }

  function setupEvents() {
    elements.enterButton.addEventListener("click", enterExperience);
    elements.openPortalButton.addEventListener("click", openPortal);

    document.querySelectorAll(".js-next-scene").forEach((button) => {
      button.addEventListener("click", () => {
        goToScene(state.currentScene + 1);
      });
    });

    elements.previousButton.addEventListener("click", () => {
      goToScene(state.currentScene - 1);
    });

    elements.nextButton.addEventListener("click", () => {
      if (state.currentScene >= totalScenes - 1) {
        showToast("Foundation complete. Next: The Avin Compatibility Test.");
        return;
      }

      goToScene(state.currentScene + 1);
    });

    elements.homeButton.addEventListener("click", () => {
      goToScene(1);
    });

    elements.musicButton.addEventListener("click", () => {
      if (state.musicEnabled) pauseMusic();
      else attemptMusicPlayback();
    });

    elements.motionButton.addEventListener("click", toggleMotion);

    document.addEventListener("keydown", (event) => {
      if (!state.hasEntered) {
        if (
          event.key === "Enter" &&
          !elements.enterButton.disabled
        ) {
          enterExperience();
        }
        return;
      }

      const interactiveElement = ["BUTTON", "INPUT", "TEXTAREA", "SELECT"].includes(
        document.activeElement?.tagName
      );

      if (interactiveElement) return;

      if (event.key === "ArrowRight") {
        goToScene(state.currentScene + 1);
      }

      if (event.key === "ArrowLeft") {
        goToScene(state.currentScene - 1);
      }
    });

    document.addEventListener(
      "touchstart",
      (event) => {
        if (!state.hasEntered || event.touches.length !== 1) return;
        state.touchStartX = event.touches[0].clientX;
        state.touchStartY = event.touches[0].clientY;
      },
      { passive: true }
    );

    document.addEventListener(
      "touchend",
      (event) => {
        if (!state.hasEntered || event.changedTouches.length !== 1) return;

        const deltaX = event.changedTouches[0].clientX - state.touchStartX;
        const deltaY = event.changedTouches[0].clientY - state.touchStartY;

        if (Math.abs(deltaX) < 65 || Math.abs(deltaX) < Math.abs(deltaY) * 1.25) {
          return;
        }

        if (deltaX < 0) goToScene(state.currentScene + 1);
        else goToScene(state.currentScene - 1);
      },
      { passive: true }
    );

    document.addEventListener("visibilitychange", () => {
      if (document.hidden && state.musicEnabled) {
        elements.backgroundMusic.pause();
      } else if (!document.hidden && state.musicEnabled) {
        elements.backgroundMusic.play().catch(() => {});
      }
    });
  }

  function init() {
    applyConfig();
    createStars();
    setupCanvas();
    setupHeroFallback();
    buildSceneDots();
    updateNavigation();
    updateMusicButton();
    setupEvents();

    if (state.reducedMotion) {
      document.body.classList.add("reduced-motion");
      elements.motionButton.classList.add("is-active");
    }

    runLoadingSequence();
  }

  init();
})();
