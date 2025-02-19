document.addEventListener("DOMContentLoaded", function () {
  let animElem = document.querySelector("#anim");

  let sum = 100;

  animElem.style.height = sum + "%"; // تنظیم ارتفاع اولیه به 100%

  let firstInterval = setInterval(() => {
    sum--;
    animElem.style.height = sum + "%";

    if (sum < 97) {
      clearInterval(firstInterval);
    }
  }, 1);

  setTimeout(function () {
    let secondInterval = setInterval(() => {
      sum--;
      animElem.style.height = sum + "%";

      if (sum < 0) {
        clearInterval(secondInterval);
      }
    }, 1);
  }, 1);
});
