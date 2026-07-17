(() => {
  "use strict";

  const app = window.Avinverse;

  if (!app) {
    console.error("Avinverse core was not found.");
    return;
  }

  const memories = [
    {
      src: "assets/photos/memory-1.jpg",
      file: "memory-1.jpg",
      kicker: "The Beginning",
      title: "A beautiful story was already unfolding.",
      caption:
        "Maybe this photo did not know where the journey would lead. But looking at you now, it feels like every small step was quietly guiding you toward this day.",
      alt: "A memory of Avin representing the beginning of her journey",
    },
    {
      src: "assets/photos/memory-2.jpg",
      file: "memory-2.jpg",
      kicker: "The Strength",
      title: "More strength than the picture could ever show.",
      caption:
        "Di balik senyum ini ada banyak hal yang mungkin tidak tertangkap kamera: lelah, keberanian, kesabaran, dan keputusan untuk terus melangkah meskipun tidak selalu mudah.",
      alt: "A memory of Avin representing her strength",
    },
    {
      src: "assets/photos/memory-3.jpg",
      file: "memory-3.jpg",
      kicker: "The Smile",
      title: "One of my favorite reasons to smile.",
      caption:
        "Somehow, you make being intelligent, caring, beautiful, and a little bit obsessed with good food look completely effortless.",
      alt: "A joyful memory of Avin and her smile",
    },
    {
      src: "assets/photos/memory-4.jpg",
      file: "memory-4.jpg",
      kicker: "The Next Chapter",
      title: "The doctor you became—and the person you always were.",
      caption:
        "This is not only a memory of where you have been. It is also the beginning of everything still waiting for drg. Avin in the chapters ahead.",
      alt: "A memory of Avin representing the next chapter after graduation",
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
    image: document.getElementById("memoryModalImage"),
    fallback: document.getElementById("memoryModalFallback"),
    fallbackFile: document.getElementById("memoryModalFallbackFile"),
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

  function setupFallbacks() {
    elements.shards.forEach((shard) => {
      const image = shard.querySelector("img");
      const fallback = shard.querySelector(".memory-shard__fallback");

      const showFallback = () => {
        image.hidden = true;
        fallback.hidden = false;
      };

      const showImage = () => {
        image.hidden = false;
        fallback.hidden = true;
      };

      image.addEventListener("error", showFallback);
      image.addEventListener("load", showImage);

      if (image.complete) {
        image.naturalWidth > 0 ? showImage() : showFallback();
      }
    });
  }

  function buildDots() {
    const fragment = document.createDocumentFragment();

    memories.forEach((_, index) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "memory-modal__dot";
      button.setAttribute("aria-label", `Buka fragment ${index + 1}`);
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
        ? "Crystal of Memories · Safely Stored"
        : "Crystal of Memories · Restored";
      elements.rewardPanel.hidden = app.state.memoriesCollected;
    } else {
      elements.crystalMini.classList.remove("is-restored");
      elements.crystalStatus.textContent = "Crystal of Memories · Dormant";
      elements.rewardPanel.hidden = true;
    }

    app.updateNavigation();
  }

  function showMemory(index) {
    const safeIndex = (index + memories.length) % memories.length;
    const memory = memories[safeIndex];
    const revisited = state.viewed.has(safeIndex);

    state.activeIndex = safeIndex;
    state.viewed.add(safeIndex);

    elements.number.textContent = `Fragment ${String(safeIndex + 1).padStart(2, "0")}`;
    elements.viewed.textContent = revisited
      ? "Memory revisited"
      : "New memory discovered";
    elements.kicker.textContent = memory.kicker;
    elements.title.textContent = memory.title;
    elements.caption.textContent = memory.caption;
    elements.fallbackFile.textContent =
      `Place ${memory.file} inside assets/photos/`;
    elements.image.alt = memory.alt;
    elements.image.hidden = false;
    elements.fallback.hidden = true;
    elements.image.src = memory.src;

    elements.image.onerror = () => {
      elements.image.hidden = true;
      elements.fallback.hidden = false;
    };

    elements.image.onload = () => {
      elements.image.hidden = false;
      elements.fallback.hidden = true;
    };

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
      'Collect Crystal of Memories <span aria-hidden="true">✦</span>';

    updateProgress();
    app.showToast("Memory archive reset.");
  }

  function collectCrystal() {
    if (!state.completed || app.state.memoriesCollected) return;

    app.state.memoriesCollected = true;
    elements.rewardPanel.hidden = true;
    elements.collectedMessage.hidden = false;
    elements.collectButton.disabled = true;
    elements.crystalStatus.textContent =
      "Crystal of Memories · Safely Stored";

    app.updateNavigation();
    app.showToast("Crystal of Memories added to the Avinverse.");
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

  setupFallbacks();
  buildDots();
  updateProgress();
})();
