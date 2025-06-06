export function initTheme() {
    const themeButtonElem = document.querySelector(".themeButton");
    const btnElement = document.querySelector("#btn");

    let btnStatus = false

    // 1. Disable transitions initially
    themeButtonElem.classList.add('transition-none'); 
    btnElement.classList.add('transition-none');

    let userTheme = localStorage.getItem("theme") || "dark";
    let isDarkMode = (userTheme === "dark"); 

    function applyTheme(mode) {
        const animElem = document.querySelector("#anim");

        if (mode === "light") {
            document.body.classList.remove("darkMode");
            document.body.classList.add("lightMode");
            if (animElem) {
                animElem.classList.replace("bg-[#222222]", "bg-[#fff]");
            }
        } else { // mode === "dark"
            document.body.classList.remove("lightMode");
            document.body.classList.add("darkMode");
            if (animElem) {
                animElem.classList.replace("bg-[#fff]", "bg-[#222222]");
            }
        }
    }

    function updateToggleButton(isDark) {
        if (isDark) { // Dark mode: move button to the right
            themeButtonElem.classList.replace('bg-gray-700', 'bg-orange-700'); 
            btnElement.classList.add('translate-x-[50px]'); 
        } else { // Light mode: button at initial position
            themeButtonElem.classList.replace('bg-orange-700', 'bg-gray-700'); 
            btnElement.classList.remove('translate-x-[50px]'); 
        }
    }

    applyTheme(userTheme);
    updateToggleButton(isDarkMode); 

    requestAnimationFrame(() => {
        requestAnimationFrame(() => { // Double requestAnimationFrame for maximum compatibility
            themeButtonElem.classList.remove('transition-none');
            btnElement.classList.remove('transition-none');
        });
    });

    themeButtonElem.addEventListener('click', function() {
        console.log("theme button clicked");
        isDarkMode = !isDarkMode; // Toggle the flag

        if(btnStatus){
            themeButtonElem.classList.replace('bg-gray-700','bg-orange-700')
        }else{
            themeButtonElem.classList.replace('bg-orange-700','bg-gray-700')

        }
        if (isDarkMode) { 
            userTheme = "dark";
        } else { 
            userTheme = "light";
        }

        applyTheme(userTheme);
        updateToggleButton(isDarkMode); 
        localStorage.setItem("theme", userTheme);

        btnStatus = !btnStatus
        console.log(btnStatus);
    });
}