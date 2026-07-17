(() => {
  "use strict";

  const app = window.Avinverse;

  if (!app) {
    console.error("Avinverse core was not found.");
    return;
  }

  const elements = {
    continueButton: document.getElementById("continueToLetterButton"),
    sealView: document.getElementById("letterSealView"),
    envelopeView: document.getElementById("letterEnvelopeView"),
    readingView: document.getElementById("letterReadingView"),
    crystalSeal: document.getElementById("crystalSeal"),
    unlockButton: document.getElementById("unlockLetterButton"),
    envelope: document.getElementById("digitalEnvelope"),
    openEnvelopeButton: document.getElementById("openEnvelopeButton"),
    paper: document.getElementById("letterPaper"),
    revealItems: Array.from(document.querySelectorAll(".letter-reveal")),
    replayButton: document.getElementById("replayLetterButton"),
    completeButton: document.getElementById("completeLetterButton"),
    completedMessage: document.getElementById("letterCompletedMessage"),
    access: document.querySelector(".letter-access"),
    accessStatus: document.getElementById("letterAccessStatus"),
  };

  const state = {
    phase: "seal",
    revealTimers: [],
  };

  function clearRevealTimers() {
    state.revealTimers.forEach((timer) => clearTimeout(timer));
    state.revealTimers = [];
  }

  function setView(viewName) {
    const views = {
      seal: elements.sealView,
      envelope: elements.envelopeView,
      reading: elements.readingView,
    };

    Object.entries(views).forEach(([name, element]) => {
      element.hidden = name !== viewName;
    });

    state.phase = viewName;
  }

  function resetLetterVisuals() {
    clearRevealTimers();
    elements.crystalSeal.classList.remove("is-breaking");
    elements.envelope.classList.remove("is-open");
    elements.revealItems.forEach((item) => {
      item.classList.remove("is-visible");
    });
    elements.paper.scrollTop = 0;
  }

  function breakSeal() {
    if (state.phase !== "seal") return;

    elements.accessStatus.textContent = "Crystal seal breaking";
    elements.crystalSeal.classList.add("is-breaking");

    setTimeout(() => {
      setView("envelope");
      elements.accessStatus.textContent = "Envelope unlocked";
      elements.access.classList.add("is-open");
    }, app.reducedMotion ? 20 : 900);
  }

  function revealLetter() {
    setView("reading");
    elements.accessStatus.textContent = "Message opened";
    elements.envelope.classList.add("is-open");
    elements.paper.scrollTop = 0;

    clearRevealTimers();

    elements.revealItems.forEach((item, index) => {
      const timer = setTimeout(() => {
        item.classList.add("is-visible");
      }, app.reducedMotion ? 0 : 120 + index * 115);

      state.revealTimers.push(timer);
    });

    app.showToast("A private letter from Ansa has been opened.");
  }

  function openEnvelope() {
    if (state.phase !== "envelope") return;

    elements.envelope.classList.add("is-open");
    elements.accessStatus.textContent = "Opening message";

    setTimeout(() => {
      revealLetter();
    }, app.reducedMotion ? 20 : 1050);
  }

  function replayLetter() {
    resetLetterVisuals();
    setView("seal");
    elements.access.classList.remove("is-open");
    elements.accessStatus.textContent = "Ready to unlock";
    elements.completedMessage.hidden = true;
    elements.completeButton.disabled = false;
    elements.completeButton.innerHTML =
      'Keep This Message <span aria-hidden="true">♡</span>';
    app.state.secretLetterOpened = false;
    app.updateNavigation();
    app.showToast("Secret letter reset.");
  }

  function keepLetter() {
    if (app.state.secretLetterOpened) return;

    app.state.secretLetterOpened = true;
    elements.completeButton.disabled = true;
    elements.completeButton.innerHTML =
      'Message Safely Kept <span aria-hidden="true">✓</span>';
    elements.completedMessage.hidden = false;
    elements.accessStatus.textContent = "Message safely stored";

    app.updateNavigation();
    app.showToast("Ansa’s letter is safely stored in the Avinverse.");
  }

  elements.continueButton?.addEventListener("click", () => {
    app.goToScene(8);
  });

  elements.unlockButton.addEventListener("click", breakSeal);
  elements.envelope.addEventListener("click", openEnvelope);
  elements.openEnvelopeButton.addEventListener("click", openEnvelope);
  elements.replayButton.addEventListener("click", replayLetter);
  elements.completeButton.addEventListener("click", keepLetter);

  document.addEventListener("keydown", (event) => {
    if (app.state.currentScene !== 8) return;

    if (event.key === "Enter" && state.phase === "seal") {
      breakSeal();
    } else if (event.key === "Enter" && state.phase === "envelope") {
      openEnvelope();
    }
  });
})();
