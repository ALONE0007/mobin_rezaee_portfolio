import { initTheme } from "./Night & Day/theme.js";

document.addEventListener("DOMContentLoaded", function () {
  let animElem = document.querySelector("#anim");
  let loadingText = document.getElementById("loading");

  if (!animElem || !loadingText) {
    console.warn("Loading elements not found. Skipping loading animation.");
    initTheme();
    return;
  }

  let sum = 100;
  animElem.style.height = sum + "%";

  const firstPhaseDuration = 500;
  const secondPhaseDuration = 300;
  let startTime = null;

  function animateLoading(currentTime) {
    if (!startTime) {
      startTime = currentTime;
    }

    const elapsedTime = currentTime - startTime;

    if (elapsedTime < firstPhaseDuration) {
      const progress = elapsedTime / firstPhaseDuration;
      sum = 100 - (30 * progress);
      if (sum < 70) sum = 70;
      animElem.style.height = sum + "%";
      requestAnimationFrame(animateLoading);
    } else {
      const secondPhaseElapsedTime = elapsedTime - firstPhaseDuration;
      if (secondPhaseElapsedTime < secondPhaseDuration) {
        const progress = secondPhaseElapsedTime / secondPhaseDuration;
        sum = 70 - (70 * progress);
        if (sum < 0) sum = 0;
        animElem.style.height = sum + "%";
        requestAnimationFrame(animateLoading);
      } else {
        sum = 0;
        animElem.style.height = sum + "%";
        animElem.style.display = "none";

        loadingText.style.display = "none";
      }
    }
  }

  requestAnimationFrame(animateLoading);

  initTheme();
});