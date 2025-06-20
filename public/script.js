import { initTheme } from "./Night & Day/theme.js";

document.addEventListener("DOMContentLoaded", function () {
  let animElem = document.querySelector("#anim");
  let loadingText = document.getElementById("loading");

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
      sum = 100 - 30 * progress;
      if (sum < 70) sum = 70;
      animElem.style.height = sum + "%";
      requestAnimationFrame(animateLoading);
    } else {
      const secondPhaseElapsedTime = elapsedTime - firstPhaseDuration;
      if (secondPhaseElapsedTime < secondPhaseDuration) {
        const progress = secondPhaseElapsedTime / secondPhaseDuration;
        sum = 70 - 70 * progress;
        if (sum < 0) sum = 0;
        animElem.style.height = sum + "%";
        requestAnimationFrame(animateLoading);
      } else {
        sum = 0;
        animElem.style.height = "0%";
        animElem.style.pointerEvents = "none";
        loadingText.style.display = "none";
        initializeLenis();
      }
    }
  }

  function initializeLenis() {
    const lenis = new window.Lenis({
      duration: 2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: "vertical",
      gestureDirection: "vertical",
      smooth: true,
      mouseMultiplier: 1.2,
      smoothTouch: true,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    console.log("Lenis Smooth Scroll Initialized.");

    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const targetId = this.getAttribute("href");
        lenis.scrollTo(targetId);
      });
    });
  }

  initializeLenis();
  requestAnimationFrame(animateLoading);
  initTheme();
});
