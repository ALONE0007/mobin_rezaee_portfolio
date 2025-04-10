export function initTheme() {
    let themeButtonElem = document.querySelector(".themeButton");
    let lightSvg = document.querySelector(".lightSvg");
    let darkSvg = document.querySelector(".darkSvg");

    let status = localStorage.getItem("theme") === "light" ? false : true;
    let userStatus = localStorage.getItem("theme") || "dark";

    // اعمال وضعیت ذخیره‌شده هنگام بارگیری صفحه
    if (userStatus === "light") {
        darkSvg.classList.remove("hidden");
        lightSvg.classList.add("hidden");
        document.body.classList.remove('darkMode');
        document.body.classList.add('lightMode');
    } else {
        darkSvg.classList.add("hidden");
        lightSvg.classList.remove("hidden");
        document.body.classList.remove('lightMode');
        document.body.classList.add('darkMode');
    }

    themeButtonElem.addEventListener("click", function () {
        if (status) {
            darkSvg.classList.remove("hidden");
            lightSvg.classList.add("hidden");
            userStatus = 'light';
            document.body.classList.remove('darkMode');
            document.body.classList.add('lightMode');
            localStorage.setItem("theme", "light");
            status = false;
        } else {
            darkSvg.classList.add("hidden");
            lightSvg.classList.remove("hidden");
            userStatus = 'dark';
            document.body.classList.remove('lightMode');
            document.body.classList.add('darkMode');
            localStorage.setItem("theme", "dark");
            status = true;
        }
    });


    let messageElem = document.querySelector('#message')


    setTimeout(() => {
        messageElem.classList.add("opacity-0")
    }, 2000);
    setTimeout(() => {
        messageElem.classList.add("hidden")
    }, 2200);
}