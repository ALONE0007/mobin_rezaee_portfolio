// Get references to the custom cursor elements
const cursor = document.querySelector(".cursor");
const cursorContent = document.querySelector(".cursor-content");
const follower = document.querySelector(".cursor-follower");

// ✅ تشخیص موبایل
const isMobile = window.innerWidth <= 768;

if (isMobile) {
  cursor.style.display = "none";
  follower.style.display = "none";
}

// Initialize position variables
let posX = 0;
let posY = 0;
let clientX = 0;
let clientY = 0;
let mouseX = 0;
let mouseY = 0;

// NEW: Flag to track if the mouse has moved for the first time
let hasMouseMoved = false;

// Function to update the cursor positions
function animateCursor() {
  if (!isMobile) {
    posX += (mouseX - posX) / 9;
    posY += (mouseY - posY) / 9;

    follower.style.left = posX - 20 + "px";
    follower.style.top = posY - 20 + "px";
    cursor.style.left = mouseX + "px";
    cursor.style.top = mouseY + "px";
  }

  requestAnimationFrame(animateCursor);
}

// Start the animation loop
animateCursor();

// Event listener for mouse movement
function handleInitialMouseMove(e) {
  if (isMobile) return;

  if (!hasMouseMoved) {
    function checkScreenWidth() {
      if (window.innerWidth > 768) {
        cursor.style.opacity = "1";
        follower.style.opacity = "1";
        hasMouseMoved = true;

        cursor.classList.add("visible");
        follower.classList.add("visible");
      } else {
        cursor.style.opacity = "0";
        follower.style.opacity = "0";
        hasMouseMoved = false;

        cursor.classList.add("invisible");
        follower.classList.add("invisible");
      }
    }

    checkScreenWidth();
    window.addEventListener("resize", checkScreenWidth);

    document.removeEventListener("mousemove", handleInitialMouseMove);
    document.addEventListener("mousemove", handlePermanentMouseMove);
  }

  clientX = e.clientX;
  clientY = e.clientY;
  mouseX = clientX + window.scrollX;
  mouseY = clientY + window.scrollY;
}

// Permanent mousemove handler
function handlePermanentMouseMove(e) {
  if (isMobile) return;

  clientX = e.clientX;
  clientY = e.clientY;
  mouseX = clientX + window.scrollX;
  mouseY = clientY + window.scrollY;
}

// Initial mousemove listener
document.addEventListener("mousemove", handleInitialMouseMove);

// Scroll listener
document.addEventListener(
  "scroll",
  function () {
    if (isMobile) return;

    mouseX = clientX + window.scrollX;
    mouseY = clientY + window.scrollY;
  },
  { passive: true }
);

// Select all portfolio items
const portfolioItems = document.querySelectorAll(".portofolio-item");

// Add event listeners for hover
portfolioItems.forEach((item) => {
  let currentItemMouseLeaveHandler = null;

  item.addEventListener("mouseenter", function (e) {
    if (isMobile) return;

    const targetHovered = e.currentTarget;

    if (!hasMouseMoved) {
      cursor.style.opacity = "1";
      follower.style.opacity = "1";
      hasMouseMoved = true;
      document.removeEventListener("mousemove", handleInitialMouseMove);
      document.addEventListener("mousemove", handlePermanentMouseMove);
    }

    if (currentItemMouseLeaveHandler) {
      targetHovered.removeEventListener("mouseleave", currentItemMouseLeaveHandler);
      currentItemMouseLeaveHandler = null;
    }

    cursor.classList.add("active");
    follower.classList.add("active");

    cursorContent.innerHTML = "";
    cursorContent.style.paddingLeft = "";
    cursor.style.background = "white";
    cursor.style.boxShadow = "0 0 2px white";
    cursor.style.transition = "";

    if (targetHovered.classList.contains("box-shadow-soft-3d")) {
      cursorContent.innerHTML = "copy";
      cursor.style.background = "#b9b5b51e";

      currentItemMouseLeaveHandler = function () {
        setTimeout(() => {
          cursor.style.background = "white";
        }, 350);
      };
      targetHovered.addEventListener("mouseleave", currentItemMouseLeaveHandler);
    }

    if (targetHovered.tagName === "IMG") {
      cursorContent.innerHTML = "Click";
      cursorContent.style.paddingLeft = "0px";
      cursor.style.background = "#ffa600a9";
      cursor.style.boxShadow = "0 0 2px #ffb300a9";

      projectLinkLeaveHandler = function () {
        cursor.style.background = "white";
        cursor.style.transition = "all 100ms";
        setTimeout(() => {
          cursor.style.transition = "none";
        }, 200);
      };
      targetHovered.addEventListener("mouseleave", projectLinkLeaveHandler);
    }
  });

  item.addEventListener("mouseleave", function () {
    if (isMobile) return;

    if (currentItemMouseLeaveHandler) {
      this.removeEventListener("mouseleave", currentItemMouseLeaveHandler);
      currentItemMouseLeaveHandler = null;
    }

    cursor.classList.remove("active");
    follower.classList.remove("active");

    // reset if needed
  });
});
