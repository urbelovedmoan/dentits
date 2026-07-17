(() => {
  "use strict";

  const app = window.Avinverse;

  if (!app) {
    console.error("Avinverse core was not found.");
    return;
  }

  const elements = {
    continueButton: document.getElementById("continueToFinaleButton"),
    introView: document.getElementById("finaleIntroView"),
    cinematicView: document.getElementById("finaleCinematicView"),
    completeView: document.getElementById("finaleCompleteView"),
    startButton: document.getElementById("startFinaleButton"),
    storyLines: Array.from(document.querySelectorAll(".finale-story-line")),
    heroReveal: document.getElementById("finaleHeroReveal"),
    celebrationMessage: document.getElementById("finaleCelebrationMessage"),
    replayButton: document.getElementById("replayFinaleButton"),
    restartButton: document.getElementById("restartJourneyButton"),
    copyButton: document.getElementById("copyFinaleLinkButton"),
    copyStatus: document.getElementById("finaleCopyStatus"),
    heroImage: document.getElementById("finaleHeroImage"),
    heroFallback: document.getElementById("finaleHeroFallback"),
    canvas: document.getElementById("finaleCanvas"),
  };

  const state = {
    phase: "intro",
    timers: [],
    particles: [],
    animationId: null,
    runningParticles: false,
    context: null,
    width: 0,
    height: 0,
    dpr: 1,
  };

  function setView(viewName) {
    elements.introView.hidden = viewName !== "intro";
    elements.cinematicView.hidden = viewName !== "cinematic";
    elements.completeView.hidden = viewName !== "complete";
    state.phase = viewName;
  }

  function clearTimers() {
    state.timers.forEach((timer) => clearTimeout(timer));
    state.timers = [];
  }

  function addTimer(callback, delay) {
    const timer = setTimeout(callback, app.reducedMotion ? Math.min(delay, 30) : delay);
    state.timers.push(timer);
  }

  function setupHeroFallback() {
    const showFallback = () => {
      elements.heroImage.hidden = true;
      elements.heroFallback.hidden = false;
      elements.heroFallback.setAttribute("aria-hidden", "false");
    };

    const showImage = () => {
      elements.heroImage.hidden = false;
      elements.heroFallback.hidden = true;
      elements.heroFallback.setAttribute("aria-hidden", "true");
    };

    elements.heroImage.addEventListener("error", showFallback);
    elements.heroImage.addEventListener("load", showImage);

    if (elements.heroImage.complete) {
      elements.heroImage.naturalWidth > 0 ? showImage() : showFallback();
    }
  }

  function resizeCanvas() {
    state.dpr = Math.min(
      window.devicePixelRatio || 1,
      app.performanceMode ? 1.25 : 2
    );
    state.width = window.innerWidth;
    state.height = window.innerHeight;

    elements.canvas.width = Math.round(state.width * state.dpr);
    elements.canvas.height = Math.round(state.height * state.dpr);
    elements.canvas.style.width = `${state.width}px`;
    elements.canvas.style.height = `${state.height}px`;

    state.context.setTransform(state.dpr, 0, 0, state.dpr, 0, 0);
  }

  function createCelebrationParticles(count = 180) {
    const symbols = ["confetti", "petal", "star"];
    const colors = ["#bca7ff", "#f6a6cd", "#e7c680", "#9fe7ef", "#ffffff", "#ffd5e8"];

    state.particles = Array.from({ length: count }, () => {
      const type = symbols[Math.floor(Math.random() * symbols.length)];
      return {
        x: Math.random() * state.width,
        y: -20 - Math.random() * state.height * 0.8,
        vx: -1.2 + Math.random() * 2.4,
        vy: 1.5 + Math.random() * 3.2,
        gravity: 0.012 + Math.random() * 0.026,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: -0.08 + Math.random() * 0.16,
        size: type === "petal" ? 6 + Math.random() * 9 : 3 + Math.random() * 7,
        alpha: 0.55 + Math.random() * 0.45,
        color: colors[Math.floor(Math.random() * colors.length)],
        type,
        sway: Math.random() * Math.PI * 2,
      };
    });
  }

  function drawParticle(context, particle) {
    context.save();
    context.globalAlpha = particle.alpha;
    context.translate(particle.x, particle.y);
    context.rotate(particle.rotation);
    context.fillStyle = particle.color;

    if (particle.type === "petal") {
      context.beginPath();
      context.ellipse(0, 0, particle.size * 0.65, particle.size, 0.55, 0, Math.PI * 2);
      context.fill();
    } else if (particle.type === "star") {
      const spikes = 4;
      const outer = particle.size;
      const inner = particle.size * 0.38;
      context.beginPath();

      for (let point = 0; point < spikes * 2; point += 1) {
        const radius = point % 2 === 0 ? outer : inner;
        const angle = (Math.PI / spikes) * point - Math.PI / 2;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;

        if (point === 0) context.moveTo(x, y);
        else context.lineTo(x, y);
      }

      context.closePath();
      context.fill();
    } else {
      context.fillRect(
        -particle.size * 0.45,
        -particle.size * 0.18,
        particle.size * 0.9,
        particle.size * 0.36
      );
    }

    context.restore();
  }

  function animateParticles() {
    state.context.clearRect(0, 0, state.width, state.height);

    state.particles.forEach((particle) => {
      particle.sway += 0.025;
      particle.x += particle.vx + Math.sin(particle.sway) * 0.35;
      particle.y += particle.vy;
      particle.vy += particle.gravity;
      particle.rotation += particle.rotationSpeed;

      if (particle.y > state.height + 35) {
        particle.y = -30 - Math.random() * 120;
        particle.x = Math.random() * state.width;
        particle.vy = 1.4 + Math.random() * 2.8;
      }

      if (particle.x < -30) particle.x = state.width + 30;
      if (particle.x > state.width + 30) particle.x = -30;

      drawParticle(state.context, particle);
    });

    if (state.runningParticles) {
      state.animationId = requestAnimationFrame(animateParticles);
    }
  }

  function startParticles() {
    if (app.reducedMotion) return;

    const particleCount = app.performanceMode
      ? (window.innerWidth < 640 ? 52 : 86)
      : (window.innerWidth < 640 ? 105 : 190);

    createCelebrationParticles(particleCount);
    state.runningParticles = true;
    cancelAnimationFrame(state.animationId);
    animateParticles();
  }

  function stopParticles() {
    state.runningParticles = false;
    cancelAnimationFrame(state.animationId);
    state.context.clearRect(0, 0, state.width, state.height);
  }

  function resetCinematicVisuals() {
    clearTimers();
    stopParticles();

    elements.storyLines.forEach((line) => {
      line.classList.remove("is-visible");
    });

    elements.heroReveal.classList.remove("is-visible");
    elements.celebrationMessage.classList.remove("is-visible");
    elements.copyStatus.textContent = "";
  }

  function startFinale() {
    resetCinematicVisuals();
    setView("cinematic");
    app.state.finaleCompleted = false;
    app.updateNavigation();

    elements.storyLines.forEach((line, index) => {
      addTimer(() => {
        line.classList.add("is-visible");
      }, 250 + index * 1700);
    });

    addTimer(() => {
      elements.heroReveal.classList.add("is-visible");
    }, 7200);

    addTimer(() => {
      elements.heroReveal.classList.remove("is-visible");
      elements.celebrationMessage.classList.add("is-visible");
      startParticles();
    }, 11400);

    addTimer(() => {
      completeFinale();
    }, 15600);
  }

  function completeFinale() {
    setView("complete");
    app.state.finaleCompleted = true;
    app.updateNavigation();

    if (!state.runningParticles) {
      startParticles();
    }

    app.showToast("The Avinverse journey is complete. Congratulations, drg. Avin.");
  }

  function replayFinale() {
    resetCinematicVisuals();
    setView("intro");
    app.state.finaleCompleted = false;
    app.updateNavigation();
    app.showToast("Final celebration reset.");
  }

  function restartJourney() {
    resetCinematicVisuals();
    setView("intro");
    app.state.finaleCompleted = false;
    app.updateNavigation();
    app.goToScene(1);
    app.showToast("The Avinverse journey has restarted.");
  }

  async function copyLink() {
    const url = window.location.href;

    try {
      await navigator.clipboard.writeText(url);
      elements.copyStatus.textContent = "Website link copied.";
      app.showToast("Website link copied.");
    } catch (error) {
      const textarea = document.createElement("textarea");
      textarea.value = url;
      textarea.setAttribute("readonly", "");
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      textarea.remove();

      elements.copyStatus.textContent = "Website link copied.";
      app.showToast("Website link copied.");
    }
  }

  elements.continueButton?.addEventListener("click", () => {
    app.goToScene(9);
  });

  elements.startButton.addEventListener("click", startFinale);
  elements.replayButton.addEventListener("click", replayFinale);
  elements.restartButton.addEventListener("click", restartJourney);
  elements.copyButton.addEventListener("click", copyLink);

  state.context = elements.canvas.getContext("2d", { alpha: true });
  resizeCanvas();
  setupHeroFallback();

  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(resizeCanvas, 120);
  });

  document.addEventListener("visibilitychange", () => {
    if (document.hidden && state.runningParticles) {
      cancelAnimationFrame(state.animationId);
    } else if (!document.hidden && state.runningParticles) {
      animateParticles();
    }
  });
})();
