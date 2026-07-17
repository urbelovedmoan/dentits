(() => {
  "use strict";

  const app = window.Avinverse;

  if (!app) {
    console.error("Avinverse core was not found.");
    return;
  }

  const memories = [
    {
      kicker: "The Beginning",
      title: "Every great journey begins with one brave decision.",
      caption:
        "Ada satu titik ketika semua perjalanan ini dimulai—ketika kamu memilih untuk belajar, bertumbuh, dan mengambil jalan yang tidak selalu mudah.",
      alt: "Journey fragment about the beginning of Avin’s path",
      glyph: "✦",
      badge: "FIRST STEP",
      theme: "beginning",
    },
    {
      kicker: "The Struggle",
      title: "She continued, even when the journey became exhausting.",
      caption:
        "Ada banyak hari yang panjang, tugas yang terasa tidak selesai-selesai, dan mungkin beberapa kali ingin menyerah. Tetapi kamu selalu menemukan alasan untuk melanjutkan.",
      alt: "Journey fragment about Avin’s long and difficult study nights",
      glyph: "✺",
      badge: "LONG NIGHTS",
      theme: "struggle",
    },
    {
      kicker: "The Purpose",
      title: "Knowledge becomes more meaningful when it helps others.",
      caption:
        "Kamu pasti tidak hanya ingin menjadi dokter gigi. Ia ingin membantu orang memahami pentingnya kesehatan gigi agar mereka dapat hidup lebih sehat dan lebih percaya diri.",
      alt: "Journey fragment about Avin’s purpose as a future dentist",
      glyph: "♡",
      badge: "HER PURPOSE",
      theme: "purpose",
    },
    {
      kicker: "The Next Chapter",
      title: "The degree is complete. The real adventure is beginning.",
      caption:
        "Gelar ini bukan akhir perjalanan. Ini adalah pintu menuju pasien pertama, pengalaman baru, mimpi baru, dan semua hal hebat yang masih menunggu drg. Avin.",
      alt: "Journey fragment about Avin’s next chapter after graduation",
      glyph: "◆",
      badge: "NEXT CHAPTER",
      theme: "next",
    },
  ];

  const elements = {
    continueButton: document.getElementById("continueToMemoriesButton"),
    shards: Array.from(document.querySelectorAll(".memory-shard")),
    scanText: document.getElementById("memoryScanText"),
    scanPercent: document.getElementById("memoryScanPercent"),
    scanFill: document.getElementById("memoryScanFill"),
    crystalMini: document.getElementById("memoryCrystalMini"),
    crystalStatus: document.getElementById("memoryCrystalStatus"),
    rewardPanel: document.getElementById("memoryRewardPanel"),
    resetButton: document.getElementById("resetMemoriesButton"),
    collectButton: document.getElementById("collectMemoriesButton"),
    collectedMessage: document.getElementById("memoriesCollectedMessage"),
    modal: document.getElementById("memoryModal"),
    modalStage: document.getElementById("memoryModalStage"),
    closeButton: document.getElementById("closeMemoryModalButton"),
    previousButton: document.getElementById("previousMemoryButton"),
    nextButton: document.getElementById("nextMemoryButton"),
    glyph: document.getElementById("journeyModalGlyph"),
    badge: document.getElementById("journeyModalBadge"),
    number: document.getElementById("memoryModalNumber"),
    viewed: document.getElementById("memoryModalViewed"),
    kicker: document.getElementById("memoryModalKicker"),
    title: document.getElementById("memoryModalTitle"),
    caption: document.getElementById("memoryModalCaption"),
    dots: document.getElementById("memoryModalDots"),
  };

  const state = {
    viewed: new Set(),
    activeIndex: 0,
    modalOpen: false,
    touchStartX: 0,
    completed: false,
  };

  function buildDots() {
    const fragment = document.createDocumentFragment();

    memories.forEach((item, index) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "memory-modal__dot";
      button.setAttribute("aria-label", `Buka fragment ${index + 1}`);
      button.title = item.kicker;
      button.addEventListener("click", () => showMemory(index));
      fragment.appendChild(button);
    });

    elements.dots.replaceChildren(fragment);
  }

  function updateProgress() {
    const count = state.viewed.size;
    const percent = Math.round((count / memories.length) * 100);

    elements.scanText.textContent = `${count} of ${memories.length} shards viewed`;
    elements.scanPercent.textContent = `${percent}%`;
    elements.scanFill.style.width = `${percent}%`;

    elements.shards.forEach((shard, index) => {
      const isViewed = state.viewed.has(index);
      shard.classList.toggle("is-viewed", isViewed);
      shard.querySelector(".memory-shard__status").textContent =
        isViewed ? "Restored" : "Unopened";
    });

    state.completed = count === memories.length;

    if (state.completed) {
      elements.crystalMini.classList.add("is-restored");
      elements.crystalStatus.textContent = app.state.memoriesCollected
        ? "Crystal of Journey · Safely Stored"
        : "Crystal of Journey · Restored";
      elements.rewardPanel.hidden = app.state.memoriesCollected;
    } else {
      elements.crystalMini.classList.remove("is-restored");
      elements.crystalStatus.textContent = "Crystal of Journey · Dormant";
      elements.rewardPanel.hidden = true;
    }

    app.updateNavigation();
  }

  function showMemory(index) {
    const safeIndex = (index + memories.length) % memories.length;
    const item = memories[safeIndex];
    const revisited = state.viewed.has(safeIndex);

    state.activeIndex = safeIndex;
    state.viewed.add(safeIndex);

    elements.number.textContent = `Fragment ${String(safeIndex + 1).padStart(2, "0")}`;
    elements.viewed.textContent = revisited
      ? "Journey fragment revisited"
      : "New journey fragment discovered";
    elements.kicker.textContent = item.kicker;
    elements.title.textContent = item.title;
    elements.caption.textContent = item.caption;
    elements.glyph.textContent = item.glyph;
    elements.badge.textContent = item.badge;
    elements.modalStage.dataset.journeyTheme = item.theme;

    Array.from(elements.dots.children).forEach((dot, dotIndex) => {
      const active = dotIndex === safeIndex;
      dot.classList.toggle("is-active", active);
      dot.setAttribute("aria-current", active ? "true" : "false");
    });

    updateProgress();
  }

  function openModal(index) {
    state.modalOpen = true;
    state.activeIndex = index;
    elements.modal.hidden = false;
    document.body.classList.add("memory-modal-open");
    showMemory(index);

    setTimeout(() => elements.closeButton.focus(), app.reducedMotion ? 0 : 100);
  }

  function closeModal() {
    if (!state.modalOpen) return;

    state.modalOpen = false;
    elements.modal.hidden = true;
    document.body.classList.remove("memory-modal-open");
    elements.shards[state.activeIndex]?.focus();
  }

  function move(direction) {
    showMemory(state.activeIndex + direction);
  }

  function resetArchive() {
    state.viewed.clear();
    state.activeIndex = 0;
    state.completed = false;
    app.state.memoriesCollected = false;

    elements.rewardPanel.hidden = true;
    elements.collectedMessage.hidden = true;
    elements.collectButton.disabled = false;
    elements.collectButton.innerHTML =
      'Collect Crystal of Journey <span aria-hidden="true">✦</span>';

    updateProgress();
    app.showToast("Journey archive reset.");
  }

  function collectCrystal() {
    if (!state.completed || app.state.memoriesCollected) return;

    app.state.memoriesCollected = true;
    elements.rewardPanel.hidden = true;
    elements.collectedMessage.hidden = false;
    elements.collectButton.disabled = true;
    elements.crystalStatus.textContent =
      "Crystal of Journey · Safely Stored";

    app.updateNavigation();
    app.showToast("Crystal of Journey added to the Avinverse.");
  }

  elements.continueButton?.addEventListener("click", () => app.goToScene(6));

  elements.shards.forEach((shard) => {
    shard.addEventListener("click", () => {
      openModal(Number(shard.dataset.memoryIndex));
    });
  });

  elements.resetButton.addEventListener("click", resetArchive);
  elements.collectButton.addEventListener("click", collectCrystal);
  elements.closeButton.addEventListener("click", closeModal);
  elements.previousButton.addEventListener("click", () => move(-1));
  elements.nextButton.addEventListener("click", () => move(1));

  document.querySelectorAll("[data-memory-close]").forEach((item) => {
    item.addEventListener("click", closeModal);
  });

  elements.modalStage.addEventListener(
    "touchstart",
    (event) => {
      if (event.touches.length === 1) {
        state.touchStartX = event.touches[0].clientX;
      }
    },
    { passive: true }
  );

  elements.modalStage.addEventListener(
    "touchend",
    (event) => {
      if (event.changedTouches.length !== 1) return;
      const deltaX = event.changedTouches[0].clientX - state.touchStartX;
      if (Math.abs(deltaX) >= 45) move(deltaX < 0 ? 1 : -1);
    },
    { passive: true }
  );

  document.addEventListener(
    "keydown",
    (event) => {
      if (!state.modalOpen) return;

      event.stopImmediatePropagation();

      if (event.key === "Escape") {
        closeModal();
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        move(1);
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        move(-1);
      }
    },
    true
  );

  buildDots();
  updateProgress();
})();
