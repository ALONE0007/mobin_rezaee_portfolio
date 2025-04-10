export function initTheme() {
    const themeButtonElem = document.querySelector(".themeButton");
    const lightSvg = document.querySelector(".lightSvg");
    const darkSvg = document.querySelector(".darkSvg");

    let status = localStorage.getItem("theme") !== "light";
    let userStatus = localStorage.getItem("theme") || "dark";

    // Apply saved theme settings on page load
    function applyTheme(mode) {
        const animElem = document.querySelector("#anim");

        if (mode === "light") {
            darkSvg.classList.remove("hidden");
            lightSvg.classList.add("hidden");
            document.body.classList.remove("darkMode");
            document.body.classList.add("lightMode");
            animElem.classList.replace("bg-[#222222]", "bg-[#fff]");
        } else {
            darkSvg.classList.add("hidden");
            lightSvg.classList.remove("hidden");
            document.body.classList.remove("lightMode");
            document.body.classList.add("darkMode");
        }
    }

    applyTheme(userStatus);

    themeButtonElem.addEventListener("click", function () {
        status = !status;
        userStatus = status ? "dark" : "light";

        applyTheme(userStatus);
        localStorage.setItem("theme", userStatus);
    });

    // Add rotation effect to theme button
    themeButtonElem.addEventListener("click", function () {
        themeButtonElem.style.transition = "transform 0.3s ease-in-out";
        themeButtonElem.style.transform = "rotate(360deg)";

        setTimeout(() => {
            themeButtonElem.style.transform = "rotate(0deg)";
        }, 200);
    });
}
