(() => {
  "use strict";

  const app = window.Avinverse;

  if (!app) {
    console.error("Avinverse core was not found.");
    return;
  }

  const starMessages = [
    {
      kicker: "For every difficult morning",
      title: "You still chose to begin again.",
      text:
        "Untuk semua pagi ketika kamu tetap bangun meskipun lelah. Tidak semua keberanian terlihat besar; kadang keberanian adalah tetap datang, tetap belajar, dan mencoba sekali lagi.",
    },
    {
      kicker: "For every lesson learned",
      title: "The difficult things became part of your strength.",
      text:
        "Untuk semua hal sulit yang tetap kamu pelajari. Setiap materi, praktik, dan pengalaman yang pernah terasa berat kini menjadi ilmu yang akan kamu bawa untuk membantu orang lain.",
    },
    {
      kicker: "For every future patient",
      title: "Your knowledge will travel farther than you know.",
      text:
        "Untuk semua orang yang suatu hari akan lebih memahami pentingnya kesehatan gigi karena dirimu. Kepedulianmu dapat mengubah kebiasaan, rasa percaya diri, bahkan kualitas hidup seseorang.",
    },
    {
      kicker: "For every moment of doubt",
      title: "You continued even before you felt completely ready.",
      text:
        "Untuk setiap saat ketika kamu meragukan dirimu, tetapi tetap melanjutkan perjalanan. Keberhasilan hari ini adalah bukti bahwa keraguan tidak pernah lebih kuat daripada keteguhanmu.",
    },
    {
      kicker: "For the doctor you are becoming",
      title: "This title is an achievement—and a beginning.",
      text:
        "Untuk dokter hebat yang sedang dan akan terus kamu tumbuhkan dalam dirimu. Semoga ilmu, kebaikan, dan alasanmu memilih profesi ini selalu menjadi cahaya di setiap langkah berikutnya.",
    },
  ];

  const elements = {
    continueButton: document.getElementById("continueToConstellationButton"),
    stars: Array.from(document.querySelectorAll(".constellation-star")),
    segments: Array.from(document.querySelectorAll(".constellation-segment")),
    completedOutline: document.getElementById("completedToothOutline"),
    progressText: document.getElementById("constellationProgressText"),
    progressPercent: document.getElementById("constellationProgressPercent"),
    progressFill: document.getElementById("constellationProgressFill"),
    crystalMini: document.getElementById("kindnessCrystalMini"),
    crystalStatus: document.getElementById("kindnessCrystalStatus"),
    message: document.getElementById("constellationMessage"),
    messageNumber: document.getElementById("constellationMessageNumber"),
    messageStatus: document.getElementById("constellationMessageStatus"),
    messageKicker: document.getElementById("constellationMessageKicker"),
    messageTitle: document.getElementById("constellationMessageTitle"),
    messageText: document.getElementById("constellationMessageText"),
    rewardPanel: document.getElementById("constellationRewardPanel"),
    collectButton: document.getElementById("collectKindnessButton"),
    collectedMessage: document.getElementById("kindnessCollectedMessage"),
    resetButton: document.getElementById("resetConstellationButton"),
  };

  const state = {
    opened: new Set(),
    currentIndex: null,
    complete: false,
  };

  function animateMessage() {
    elements.message.classList.remove("is-changing");
    void elements.message.offsetWidth;
    elements.message.classList.add("is-changing");
  }

  function updateConstellation() {
    const connected = state.opened.size;
    const total = starMessages.length;
    const percent = Math.round((connected / total) * 100);

    elements.progressText.textContent =
      `${connected} of ${total} stars connected`;
    elements.progressPercent.textContent = `${percent}%`;
    elements.progressFill.style.width = `${percent}%`;

    elements.stars.forEach((star, index) => {
      const active = state.opened.has(index);
      const current = state.currentIndex === index;

      star.classList.toggle("is-active", active);
      star.classList.toggle("is-current", current);
      star.setAttribute("aria-pressed", active ? "true" : "false");
    });

    elements.segments.forEach((segment, index) => {
      segment.classList.toggle("is-active", state.opened.has(index));
    });

    state.complete = connected === total;

    if (state.complete) {
      elements.completedOutline.classList.add("is-complete");
      elements.crystalMini.classList.add("is-awake");
      elements.crystalStatus.textContent = app.state.constellationCollected
        ? "Crystal of Kindness · Safely Stored"
        : "Crystal of Kindness · Awake";
      elements.rewardPanel.hidden = app.state.constellationCollected;
    } else {
      elements.completedOutline.classList.remove("is-complete");
      elements.crystalMini.classList.toggle("is-awake", connected >= 3);
      elements.crystalStatus.textContent =
        connected >= 3
          ? "Crystal of Kindness · Awakening"
          : "Crystal of Kindness · Sleeping";
      elements.rewardPanel.hidden = true;
    }

    app.updateNavigation();
  }

  function openStar(index) {
    const message = starMessages[index];
    const revisited = state.opened.has(index);

    state.currentIndex = index;
    state.opened.add(index);

    elements.messageNumber.textContent =
      `STAR ${String(index + 1).padStart(2, "0")}`;
    elements.messageStatus.textContent = revisited
      ? "Message revisited"
      : "New light discovered";
    elements.messageKicker.textContent = message.kicker;
    elements.messageTitle.textContent = message.title;
    elements.messageText.textContent = message.text;

    animateMessage();
    updateConstellation();

    if (!revisited && state.complete) {
      app.showToast("Constellation completed. The tooth-shaped light is now visible.");
    }
  }

  function resetConstellation() {
    state.opened.clear();
    state.currentIndex = null;
    state.complete = false;
    app.state.constellationCollected = false;

    elements.messageNumber.textContent = "STAR 00";
    elements.messageStatus.textContent = "Awaiting connection";
    elements.messageKicker.textContent = "Choose a star";
    elements.messageTitle.textContent = "A message is waiting in the sky.";
    elements.messageText.textContent =
      "Buka salah satu bintang untuk mengungkap cahaya yang tersimpan di dalamnya.";

    elements.collectedMessage.hidden = true;
    elements.collectButton.disabled = false;
    elements.collectButton.innerHTML =
      'Collect Crystal of Kindness <span aria-hidden="true">✦</span>';

    updateConstellation();
    animateMessage();
    app.showToast("Constellation reset.");
  }

  function collectCrystal() {
    if (!state.complete || app.state.constellationCollected) return;

    app.state.constellationCollected = true;
    elements.rewardPanel.hidden = true;
    elements.collectedMessage.hidden = false;
    elements.collectButton.disabled = true;
    elements.crystalStatus.textContent =
      "Crystal of Kindness · Safely Stored";

    app.updateNavigation();
    app.showToast("Crystal of Kindness added to the Avinverse.");
  }

  elements.continueButton?.addEventListener("click", () => {
    app.goToScene(7);
  });

  elements.stars.forEach((star) => {
    star.addEventListener("click", () => {
      openStar(Number(star.dataset.starIndex));
    });
  });

  elements.resetButton.addEventListener("click", resetConstellation);
  elements.collectButton.addEventListener("click", collectCrystal);

  updateConstellation();
})();
