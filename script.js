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

  const quizData = [
    {
      category: "Core abilities",
      question: "What is Avin’s greatest superpower?",
      answers: [
        {
          label: "Her intelligence",
          response: "Absolutely. Her brain has carried more information than most cosmic archives.",
          harmony: 1,
        },
        {
          label: "Her patience",
          response: "Correct. Dental school tested it repeatedly, and somehow it is still functioning.",
          harmony: 1,
        },
        {
          label: "Her beautiful smile",
          response: "A powerful answer. The Guardian of Every Smile should naturally have one of her own.",
          harmony: 1,
        },
        {
          label: "All of the above",
          response: "Perfect. Avin’s powers cannot be reduced to a single option.",
          harmony: 2,
        },
      ],
    },
    {
      category: "Energy restoration",
      question: "Which combination restores Avin’s energy fastest?",
      answers: [
        {
          label: "A mysterious cosmic salad",
          response: "Healthy, perhaps. But the Avinverse has detected a much more powerful source.",
          harmony: 0,
        },
        {
          label: "Sate Padang",
          response: "Excellent choice. Spicy energy levels are rising rapidly.",
          harmony: 1,
        },
        {
          label: "Indomie goreng",
          response: "Comfort mode activated. Energy is returning one delicious forkful at a time.",
          harmony: 1,
        },
        {
          label: "Sate Padang and Indomie goreng",
          response: "Maximum energy restored. Lord Deadline should start worrying.",
          harmony: 2,
        },
      ],
    },
    {
      category: "Recovery protocol",
      question: "After a long mission, which portal sounds most like Avin?",
      answers: [
        {
          label: "A Marvel multiverse marathon",
          response: "An excellent portal. Multiple heroes, multiple universes, zero academic revisions.",
          harmony: 1,
        },
        {
          label: "An Attack on Titan rewatch",
          response: "Dramatic, intense, and somehow still more relaxing than final deadlines.",
          harmony: 1,
        },
        {
          label: "A quiet meal with favorite food",
          response: "A peaceful universe has been located. Sate Padang may already be waiting there.",
          harmony: 1,
        },
        {
          label: "All portals, depending on the day",
          response: "Correct. Even a heroine deserves more than one recovery universe.",
          harmony: 2,
        },
      ],
    },
    {
      category: "Universal pride scan",
      question: "Who is the proudest of Avin today?",
      answers: [
        {
          label: "Her family",
          response: "Of course. They have witnessed a beautiful part of this journey.",
          harmony: 1,
        },
        {
          label: "Her friends",
          response: "Definitely. Every universe needs people who cheer for its heroine.",
          harmony: 1,
        },
        {
          label: "Her future patients",
          response: "They may not know it yet, but they are going to meet a dentist who truly cares.",
          harmony: 1,
        },
        {
          label: "Ansa — and everyone above",
          response: "Confirmed. One universe is not large enough to contain everyone who is proud of her.",
          harmony: 2,
        },
      ],
    },
  ];


  const battleRounds = [
    {
      title: "The First Revision",
      bossLine: "“This only needs a few tiny changes.”",
      hint: "Round one: academic powers.",
      powers: [
        {
          name: "Patience Beam",
          icon: "◌",
          damage: 27,
          color: "#bca7ff",
          description: "Converts every patiently handled revision into focused energy.",
          feedback: "Patience Beam activated. Years of calm persistence have been converted into pure cosmic damage.",
        },
        {
          name: "Clinical Knowledge",
          icon: "✦",
          damage: 30,
          color: "#9fe7ef",
          description: "A precise attack powered by everything Avin has learned.",
          feedback: "A clinically precise hit. Lord Deadline has no evidence-based defense against this much knowledge.",
        },
        {
          name: "Support System",
          icon: "♡",
          damage: 28,
          color: "#f6a6cd",
          description: "Channels strength from family, friends, and people who believe in her.",
          feedback: "Support energy received from multiple universes. The boss suddenly feels very outnumbered.",
        },
      ],
    },
    {
      title: "The Energy Crisis",
      bossLine: "“The deadline is tomorrow morning.”",
      hint: "Round two: restore energy.",
      powers: [
        {
          name: "Indomie Goreng Boost",
          icon: "≈",
          damage: 31,
          color: "#e7c680",
          description: "Instant comfort energy with a suspiciously powerful aroma.",
          feedback: "Comfort mode activated. Energy restored, mood improved, and the deadline has lost confidence.",
        },
        {
          name: "Sate Padang Ultimate",
          icon: "♨",
          damage: 34,
          color: "#f0a16f",
          description: "A spicy ultimate attack with an immeasurable sauce multiplier.",
          feedback: "Critical spicy damage. Lord Deadline was emotionally unprepared for the sauce multiplier.",
        },
        {
          name: "Multiverse Assist",
          icon: "◎",
          damage: 32,
          color: "#c8a9ff",
          description: "Summons countless heroic versions of Avin from nearby universes.",
          feedback: "Multiple Avins have entered the battlefield. None of them are willing to accept another revision.",
        },
      ],
    },
    {
      title: "The Final Submission",
      bossLine: "“Are you sure this is the final version?”",
      hint: "Final round: choose the finishing power.",
      powers: [
        {
          name: "Avin’s Determination",
          icon: "◆",
          damage: 100,
          color: "#e7c680",
          description: "The same force that carried her through the entire journey.",
          feedback: "Determination exceeded the instrument’s measurement range. Final submission confirmed.",
        },
        {
          name: "Guardian of Every Smile",
          icon: "✧",
          damage: 100,
          color: "#9fe7ef",
          description: "Transforms her purpose as a dentist into a radiant finishing move.",
          feedback: "The battlefield is filled with brighter smiles. Lord Deadline has officially lost its purpose.",
        },
        {
          name: "Ansa’s Proud Support",
          icon: "♡",
          damage: 100,
          color: "#f6a6cd",
          description: "A final boost powered by someone who is endlessly proud of Avin.",
          feedback: "Pride levels reached infinity. The boss has been defeated across every known universe.",
        },
      ],
    },
  ];


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
    startQuizButton: document.getElementById("startQuizButton"),
    quizIntro: document.getElementById("quizIntro"),
    quizQuestionPanel: document.getElementById("quizQuestionPanel"),
    quizResult: document.getElementById("quizResult"),
    quizStepText: document.getElementById("quizStepText"),
    quizPercentText: document.getElementById("quizPercentText"),
    quizProgressFill: document.getElementById("quizProgressFill"),
    quizCategory: document.getElementById("quizCategory"),
    quizQuestionText: document.getElementById("quizQuestionText"),
    quizAnswers: document.getElementById("quizAnswers"),
    quizFeedback: document.getElementById("quizFeedback"),
    quizFeedbackText: document.getElementById("quizFeedbackText"),
    quizNextButton: document.getElementById("quizNextButton"),
    restartQuizButton: document.getElementById("restartQuizButton"),
    reviewQuizButton: document.getElementById("reviewQuizButton"),
    collectCrystalButton: document.getElementById("collectCrystalButton"),
    quizCrystal: document.getElementById("quizCrystal"),
    crystalStatusText: document.getElementById("crystalStatusText"),
    crystalStatus: document.querySelector(".crystal-status"),
    crystalCollectedMessage: document.getElementById("crystalCollectedMessage"),
    continueToGameButton: document.getElementById("continueToGameButton"),
    battleIntro: document.getElementById("battleIntro"),
    battleActive: document.getElementById("battleActive"),
    battleVictory: document.getElementById("battleVictory"),
    startBattleButton: document.getElementById("startBattleButton"),
    skipBattleButton: document.getElementById("skipBattleButton"),
    battleRestartButton: document.getElementById("battleRestartButton"),
    replayBattleButton: document.getElementById("replayBattleButton"),
    collectCourageButton: document.getElementById("collectCourageButton"),
    battleRoundLabel: document.getElementById("battleRoundLabel"),
    battleRoundTitle: document.getElementById("battleRoundTitle"),
    bossSpeech: document.getElementById("bossSpeech"),
    bossMonster: document.getElementById("bossMonster"),
    battleArena: document.getElementById("battleArena"),
    battleEffects: document.getElementById("battleEffects"),
    bossHealthValue: document.getElementById("bossHealthValue"),
    bossHealthFill: document.getElementById("bossHealthFill"),
    powerPrompt: document.getElementById("powerPrompt"),
    roundHint: document.getElementById("roundHint"),
    powerCards: document.getElementById("powerCards"),
    battleFeedback: document.getElementById("battleFeedback"),
    battleFeedbackTitle: document.getElementById("battleFeedbackTitle"),
    battleFeedbackText: document.getElementById("battleFeedbackText"),
    battleNextButton: document.getElementById("battleNextButton"),
    courageInventory: document.getElementById("courageInventory"),
    courageInventoryStatus: document.getElementById("courageInventoryStatus"),
    determinationInventoryStatus: document.getElementById("determinationInventoryStatus"),
    courageCollectedMessage: document.getElementById("courageCollectedMessage"),
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
    quizQuestionIndex: 0,
    quizSelectedAnswer: null,
    quizHarmony: 0,
    quizCompleted: false,
    crystalCollected: false,
    battleRoundIndex: 0,
    bossHealth: 100,
    battleSelectedPower: null,
    battleCompleted: false,
    courageCollected: false,
    battleSkipped: false,
    memoriesCollected: false,
    constellationCollected: false,
    secretLetterOpened: false,
    finaleCompleted: false,
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
      elements.nextButton.innerHTML = state.finaleCompleted
        ? 'Journey Complete <span aria-hidden="true">✦</span>'
        : 'Celebrate Avin <span aria-hidden="true">✦</span>';
    } else if (state.currentScene === 8) {
      elements.nextButton.innerHTML = state.secretLetterOpened
        ? 'Final Celebration <span aria-hidden="true">→</span>'
        : 'Open the Letter <span aria-hidden="true">✉</span>';
    } else if (state.currentScene === 7) {
      elements.nextButton.innerHTML = state.constellationCollected
        ? 'Unlock Letter <span aria-hidden="true">→</span>'
        : 'Connect the Stars <span aria-hidden="true">✧</span>';
    } else if (state.currentScene === 6) {
      elements.nextButton.innerHTML = state.memoriesCollected
        ? 'Open Constellation <span aria-hidden="true">→</span>'
        : 'Explore Journey <span aria-hidden="true">◇</span>';
    } else if (state.currentScene === 5) {
      elements.nextButton.innerHTML = state.courageCollected
        ? 'Open Journey <span aria-hidden="true">→</span>'
        : 'Defeat the Boss <span aria-hidden="true">⚔</span>';
    } else if (state.currentScene === 4) {
      elements.nextButton.innerHTML = state.crystalCollected
        ? 'Face the Boss <span aria-hidden="true">→</span>'
        : 'Complete Test <span aria-hidden="true">✦</span>';
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


  function setQuizView(viewName) {
    const views = {
      intro: elements.quizIntro,
      question: elements.quizQuestionPanel,
      result: elements.quizResult,
    };

    Object.entries(views).forEach(([name, element]) => {
      const shouldShow = name === viewName;
      element.hidden = !shouldShow;

      if (shouldShow) {
        element.classList.remove("is-changing");
        void element.offsetWidth;
        element.classList.add("is-changing");
      }
    });
  }

  function startQuiz() {
    state.quizQuestionIndex = 0;
    state.quizSelectedAnswer = null;
    state.quizHarmony = 0;
    state.quizCompleted = false;
    state.crystalCollected = false;

    elements.quizCrystal.classList.remove("is-unlocked");
    elements.crystalStatus.classList.remove("is-unlocked");
    elements.crystalStatusText.textContent = "Crystal of Determination · Locked";
    elements.crystalCollectedMessage.hidden = true;
    elements.collectCrystalButton.disabled = false;
    elements.collectCrystalButton.innerHTML =
      'Collect the Crystal <span aria-hidden="true">✦</span>';

    setQuizView("question");
    renderQuizQuestion();
    updateNavigation();
  }

  function renderQuizQuestion() {
    const question = quizData[state.quizQuestionIndex];
    const questionNumber = state.quizQuestionIndex + 1;
    const percent = Math.round((questionNumber / quizData.length) * 100);

    state.quizSelectedAnswer = null;

    elements.quizStepText.textContent =
      `Question ${questionNumber} of ${quizData.length}`;
    elements.quizPercentText.textContent = `${percent}%`;
    elements.quizProgressFill.style.width = `${percent}%`;
    elements.quizCategory.textContent = question.category;
    elements.quizQuestionText.textContent = question.question;
    elements.quizFeedback.hidden = true;
    elements.quizFeedbackText.textContent = "";
    elements.quizNextButton.disabled = true;
    elements.quizNextButton.innerHTML =
      state.quizQuestionIndex === quizData.length - 1
        ? 'Reveal Result <span aria-hidden="true">✦</span>'
        : 'Next Question <span aria-hidden="true">→</span>';

    const fragment = document.createDocumentFragment();
    const letters = ["A", "B", "C", "D"];

    question.answers.forEach((answer, answerIndex) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "quiz-answer";
      button.dataset.letter = letters[answerIndex] || String(answerIndex + 1);
      button.textContent = answer.label;
      button.addEventListener("click", () => {
        selectQuizAnswer(answerIndex, button);
      });
      fragment.appendChild(button);
    });

    elements.quizAnswers.replaceChildren(fragment);
  }

  function selectQuizAnswer(answerIndex, selectedButton) {
    if (state.quizSelectedAnswer !== null) return;

    const question = quizData[state.quizQuestionIndex];
    const answer = question.answers[answerIndex];
    state.quizSelectedAnswer = answerIndex;
    state.quizHarmony += answer.harmony;

    Array.from(elements.quizAnswers.children).forEach((button) => {
      button.disabled = true;
      button.classList.toggle("is-selected", button === selectedButton);
    });

    elements.quizFeedbackText.textContent = answer.response;
    elements.quizFeedback.hidden = false;
    elements.quizNextButton.disabled = false;
  }

  function advanceQuiz() {
    if (state.quizSelectedAnswer === null) return;

    if (state.quizQuestionIndex < quizData.length - 1) {
      state.quizQuestionIndex += 1;
      elements.quizQuestionPanel.classList.remove("is-changing");
      void elements.quizQuestionPanel.offsetWidth;
      elements.quizQuestionPanel.classList.add("is-changing");
      renderQuizQuestion();
      return;
    }

    finishQuiz();
  }

  function finishQuiz() {
    state.quizCompleted = true;
    elements.quizCrystal.classList.add("is-unlocked");
    elements.crystalStatus.classList.add("is-unlocked");
    elements.crystalStatusText.textContent =
      "Crystal of Determination · Unlocked";

    setQuizView("result");
    updateNavigation();
    showToast("Compatibility confirmed: 100% ✦");
  }

  function collectCrystal() {
    if (!state.quizCompleted || state.crystalCollected) return;

    state.crystalCollected = true;
    elements.collectCrystalButton.disabled = true;
    elements.collectCrystalButton.innerHTML =
      'Crystal Collected <span aria-hidden="true">✓</span>';
    elements.crystalCollectedMessage.hidden = false;
    elements.crystalStatusText.textContent =
      "Crystal of Determination · Safely Stored";

    updateNavigation();
    showToast("Crystal of Determination added to the Avinverse.");
  }

  function resetQuizToIntro() {
    state.quizQuestionIndex = 0;
    state.quizSelectedAnswer = null;
    state.quizHarmony = 0;
    state.quizCompleted = false;
    state.crystalCollected = false;

    elements.quizCrystal.classList.remove("is-unlocked");
    elements.crystalStatus.classList.remove("is-unlocked");
    elements.crystalStatusText.textContent = "Crystal of Determination · Locked";
    elements.crystalCollectedMessage.hidden = true;
    elements.collectCrystalButton.disabled = false;
    elements.collectCrystalButton.innerHTML =
      'Collect the Crystal <span aria-hidden="true">✦</span>';

    setQuizView("intro");
    updateNavigation();
  }


  function setBattleView(viewName) {
    const views = {
      intro: elements.battleIntro,
      active: elements.battleActive,
      victory: elements.battleVictory,
    };

    Object.entries(views).forEach(([name, element]) => {
      const shouldShow = name === viewName;
      element.hidden = !shouldShow;

      if (shouldShow) {
        element.classList.remove("is-changing");
        void element.offsetWidth;
        element.classList.add("is-changing");
      }
    });
  }

  function resetBossVisual() {
    elements.bossMonster.classList.remove("is-hit", "is-defeated");
    elements.battleArena.classList.remove("is-shaking");
    elements.battleEffects.replaceChildren();
  }

  function updateBattleHealth() {
    const safeHealth = Math.max(0, Math.min(100, Math.round(state.bossHealth)));
    elements.bossHealthFill.style.width = `${safeHealth}%`;
    elements.bossHealthValue.textContent = `${safeHealth} / 100`;
  }

  function startBattle() {
    state.battleRoundIndex = 0;
    state.bossHealth = 100;
    state.battleSelectedPower = null;
    state.battleCompleted = false;
    state.courageCollected = false;
    state.battleSkipped = false;

    resetBossVisual();
    updateBattleHealth();

    elements.courageInventory.classList.add("inventory-item--locked");
    elements.courageInventory.classList.remove("is-unlocked");
    elements.courageInventoryStatus.textContent = "Locked by Lord Deadline";
    elements.courageCollectedMessage.hidden = true;
    elements.collectCourageButton.disabled = false;
    elements.collectCourageButton.innerHTML =
      'Collect Crystal of Courage <span aria-hidden="true">✦</span>';

    setBattleView("active");
    renderBattleRound();
    updateNavigation();
  }

  function renderBattleRound() {
    const round = battleRounds[state.battleRoundIndex];
    const roundNumber = state.battleRoundIndex + 1;

    state.battleSelectedPower = null;
    resetBossVisual();

    elements.battleRoundLabel.textContent =
      `Round ${roundNumber} of ${battleRounds.length}`;
    elements.battleRoundTitle.textContent = round.title;
    elements.bossSpeech.textContent = round.bossLine;
    elements.powerPrompt.textContent =
      roundNumber === battleRounds.length
        ? "Choose the finishing power."
        : "Select one card to attack.";
    elements.roundHint.textContent = round.hint;
    elements.battleFeedback.hidden = true;
    elements.battleFeedbackTitle.textContent = "";
    elements.battleFeedbackText.textContent = "";
    elements.battleNextButton.disabled = true;
    elements.battleNextButton.innerHTML =
      roundNumber === battleRounds.length
        ? 'Claim Victory <span aria-hidden="true">✦</span>'
        : `Continue to Round ${roundNumber + 1} <span aria-hidden="true">→</span>`;

    const fragment = document.createDocumentFragment();

    round.powers.forEach((power, powerIndex) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "power-card";
      button.style.setProperty("--power-color", power.color);
      button.style.setProperty("--power-glow", `${power.color}33`);
      button.innerHTML = `
        <span class="power-card__top">
          <span class="power-card__icon" aria-hidden="true">${power.icon}</span>
          <span class="power-card__damage">${
            state.battleRoundIndex === battleRounds.length - 1
              ? "FINISHER"
              : `DMG ${power.damage}`
          }</span>
        </span>
        <strong>${power.name}</strong>
        <small>${power.description}</small>
      `;
      button.addEventListener("click", () => {
        selectBattlePower(powerIndex, button);
      });
      fragment.appendChild(button);
    });

    elements.powerCards.replaceChildren(fragment);
  }

  function createBattleAttack(power, damage) {
    const attack = document.createElement("span");
    attack.className = "attack-streak";
    attack.style.setProperty("--attack-color", power.color);

    const damageNumber = document.createElement("span");
    damageNumber.className = "damage-number";
    damageNumber.textContent =
      state.battleRoundIndex === battleRounds.length - 1
        ? "FINAL!"
        : `−${damage}`;

    elements.battleEffects.append(attack, damageNumber);

    window.setTimeout(() => {
      elements.bossMonster.classList.add("is-hit");
      elements.battleArena.classList.add("is-shaking");

      if ("vibrate" in navigator) {
        navigator.vibrate?.(state.reducedMotion ? 0 : 35);
      }
    }, state.reducedMotion ? 0 : 390);

    window.setTimeout(() => {
      elements.bossMonster.classList.remove("is-hit");
      elements.battleArena.classList.remove("is-shaking");
    }, state.reducedMotion ? 10 : 920);

    window.setTimeout(() => {
      attack.remove();
      damageNumber.remove();
    }, state.reducedMotion ? 20 : 1000);
  }

  function selectBattlePower(powerIndex, selectedButton) {
    if (state.battleSelectedPower !== null) return;

    const round = battleRounds[state.battleRoundIndex];
    const power = round.powers[powerIndex];
    state.battleSelectedPower = powerIndex;

    Array.from(elements.powerCards.children).forEach((button) => {
      button.disabled = true;
      button.classList.toggle("is-selected", button === selectedButton);
    });

    let damage = power.damage;

    if (state.battleRoundIndex === battleRounds.length - 1) {
      damage = state.bossHealth;
    } else {
      damage = Math.min(damage, Math.max(1, state.bossHealth - 24));
    }

    state.bossHealth = Math.max(0, state.bossHealth - damage);
    createBattleAttack(power, damage);

    window.setTimeout(() => {
      updateBattleHealth();
      elements.battleFeedbackTitle.textContent = `${power.name} activated`;
      elements.battleFeedbackText.textContent = power.feedback;
      elements.battleFeedback.hidden = false;
      elements.battleNextButton.disabled = false;

      if (state.bossHealth <= 0) {
        elements.bossSpeech.textContent = "“Wait… was that the actual final version?”";
        elements.bossMonster.classList.add("is-defeated");
      } else if (state.bossHealth <= 40) {
        elements.bossSpeech.textContent = "“Perhaps one more revision was unnecessary…”";
      } else {
        elements.bossSpeech.textContent = "“This is becoming inconvenient.”";
      }
    }, state.reducedMotion ? 20 : 560);
  }

  function advanceBattle() {
    if (state.battleSelectedPower === null) return;

    if (state.battleRoundIndex < battleRounds.length - 1) {
      state.battleRoundIndex += 1;
      elements.battleActive.classList.remove("is-changing");
      void elements.battleActive.offsetWidth;
      elements.battleActive.classList.add("is-changing");
      renderBattleRound();
      return;
    }

    finishBattle(false);
  }

  function finishBattle(wasSkipped = false) {
    state.battleCompleted = true;
    state.battleSkipped = wasSkipped;
    state.bossHealth = 0;
    updateBattleHealth();

    elements.courageInventory.classList.remove("inventory-item--locked");
    elements.courageInventory.classList.add("is-unlocked");
    elements.courageInventoryStatus.textContent = "Unlocked · Ready to collect";

    setBattleView("victory");
    updateNavigation();

    showToast(
      wasSkipped
        ? "Battle skipped. Courage still belongs to Avin ✦"
        : "Lord Deadline defeated. Degree unlocked: drg. ✦"
    );
  }

  function skipBattle() {
    state.battleRoundIndex = battleRounds.length - 1;
    state.bossHealth = 0;
    state.battleSelectedPower = 0;
    finishBattle(true);
  }

  function collectCourageCrystal() {
    if (!state.battleCompleted || state.courageCollected) return;

    state.courageCollected = true;
    elements.collectCourageButton.disabled = true;
    elements.collectCourageButton.innerHTML =
      'Crystal Safely Stored <span aria-hidden="true">✓</span>';
    elements.courageInventoryStatus.textContent = "Safely stored in the Avinverse";
    elements.courageCollectedMessage.hidden = false;

    updateNavigation();
    showToast("Crystal of Courage added to the Avinverse.");
  }

  function resetBattleToIntro() {
    state.battleRoundIndex = 0;
    state.bossHealth = 100;
    state.battleSelectedPower = null;
    state.battleCompleted = false;
    state.courageCollected = false;
    state.battleSkipped = false;

    resetBossVisual();
    updateBattleHealth();

    elements.courageInventory.classList.add("inventory-item--locked");
    elements.courageInventory.classList.remove("is-unlocked");
    elements.courageInventoryStatus.textContent = "Locked by Lord Deadline";
    elements.courageCollectedMessage.hidden = true;
    elements.collectCourageButton.disabled = false;
    elements.collectCourageButton.innerHTML =
      'Collect Crystal of Courage <span aria-hidden="true">✦</span>';

    setBattleView("intro");
    updateNavigation();
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
        showToast(
          state.finaleCompleted
            ? "The Avinverse journey is complete. Congratulations, drg. Avin."
            : "Start the final celebration to complete the journey."
        );
        return;
      }

      if (state.currentScene === 4 && !state.crystalCollected) {
        showToast("Collect the Crystal of Determination before facing the boss.");
        return;
      }

      if (state.currentScene === 5 && !state.courageCollected) {
        showToast("Collect the Crystal of Courage before opening the journey shards.");
        return;
      }

      if (state.currentScene === 6 && !state.memoriesCollected) {
        showToast("Collect the Crystal of Journey before connecting the stars.");
        return;
      }

      if (state.currentScene === 7 && !state.constellationCollected) {
        showToast("Collect the Crystal of Kindness before unlocking the letter.");
        return;
      }

      if (state.currentScene === 8 && !state.secretLetterOpened) {
        showToast("Keep Ansa’s letter before beginning the final celebration.");
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

    elements.startQuizButton.addEventListener("click", startQuiz);
    elements.quizNextButton.addEventListener("click", advanceQuiz);
    elements.restartQuizButton.addEventListener("click", resetQuizToIntro);
    elements.reviewQuizButton.addEventListener("click", startQuiz);
    elements.collectCrystalButton.addEventListener("click", collectCrystal);
    elements.continueToGameButton.addEventListener("click", () => goToScene(5));

    elements.startBattleButton.addEventListener("click", startBattle);
    elements.skipBattleButton.addEventListener("click", skipBattle);
    elements.battleRestartButton.addEventListener("click", resetBattleToIntro);
    elements.replayBattleButton.addEventListener("click", startBattle);
    elements.battleNextButton.addEventListener("click", advanceBattle);
    elements.collectCourageButton.addEventListener("click", collectCourageCrystal);

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

        if (
          event.target.closest(
            ".quiz-card, .battle-console, .memory-gallery-panel, .memory-modal"
          )
        ) {
          state.touchStartX = 0;
          state.touchStartY = 0;
          return;
        }

        state.touchStartX = event.touches[0].clientX;
        state.touchStartY = event.touches[0].clientY;
      },
      { passive: true }
    );

    document.addEventListener(
      "touchend",
      (event) => {
        if (!state.hasEntered || event.changedTouches.length !== 1) return;
        if (state.touchStartX === 0 && state.touchStartY === 0) return;

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

  window.Avinverse = {
    goToScene,
    state,
    updateNavigation,
    showToast,
    get reducedMotion() {
      return state.reducedMotion;
    },
  };

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
