// Get references to the custom cursor elements
const cursor = document.querySelector(".cursor");
const cursorContent = document.querySelector(".cursor-content");
const follower = document.querySelector(".cursor-follower");

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
  posX += (mouseX - posX) / 9;
  posY += (mouseY - posY) / 9;

  // Use transform for better performance if possible, but keeping original for now
  follower.style.left = posX - 20 + "px";
  follower.style.top = posY - 20 + "px";
  cursor.style.left = mouseX + "px";
  cursor.style.top = mouseY + "px";

  requestAnimationFrame(animateCursor);
}

// Start the animation loop
animateCursor();

// Event listener for mouse movement
function handleInitialMouseMove(e) {
  if (!hasMouseMoved) {
    function checkScreenWidth() {
      if (window.innerWidth > 768) {
        cursor.style.opacity = "1";
        follower.style.opacity = "1";
        hasMouseMoved = true;

        cursor.classList.add("visible");
        follower.classList.add("visible");
      } else if(window.innerWidth < 768) {
        cursor.style.opacity = "0";
        follower.style.opacity = "0";
        hasMouseMoved = false;

        cursor.classList.add("invisible");
        follower.classList.add("invisible");
      }
    }

    checkScreenWidth();

    window.addEventListener("resize", checkScreenWidth);

    // Remove this specific event listener after it runs once
    document.removeEventListener("mousemove", handleInitialMouseMove);

    // Now, add the permanent mousemove listener (which updates positions)
    document.addEventListener("mousemove", handlePermanentMouseMove);
  }

  // Update positions for the current mouse move, even if it's the initial one
  clientX = e.clientX;
  clientY = e.clientY;
  mouseX = clientX + window.scrollX;
  mouseY = clientY + window.scrollY;
}

// Permanent mousemove handler to update cursor positions
function handlePermanentMouseMove(e) {
  clientX = e.clientX;
  clientY = e.clientY;
  mouseX = clientX + window.scrollX;
  mouseY = clientY + window.scrollY;
}

// Initial mousemove listener (will be replaced after first move)
document.addEventListener("mousemove", handleInitialMouseMove);

// Event listener for scroll to update mouseX/Y
document.addEventListener(
  "scroll",
  function () {
    // When scrolling, recalculate mouseX/Y based on last known clientX/Y and new scroll position
    mouseX = clientX + window.scrollX;
    mouseY = clientY + window.scrollY;
  },
  { passive: true }
);

// Select all portfolio items
const portfolioItems = document.querySelectorAll(".portofolio-item");

// Add event listeners for mouseenter and mouseleave on each item
portfolioItems.forEach((item) => {
  // --- Store original styles as constants if they might be dynamic ---
  // const originalCursorBackground = cursor.style.background || 'white';
  // const originalCursorBoxShadow = cursor.style.boxShadow || '0 0 2px white';

  // Store the mouseleave function in a variable to be able to remove it later
  let currentItemMouseLeaveHandler = null;

  item.addEventListener("mouseenter", function (e) {
    const targetHovered = e.currentTarget;

    // Ensure the cursor is visible if it wasn't already (e.g., if user hovers before first move)
    // This handles cases where mouse moves directly over an item without hitting other document space first.
    if (!hasMouseMoved) {
      cursor.style.opacity = "1";
      follower.style.opacity = "1";
      hasMouseMoved = true;
      document.removeEventListener("mousemove", handleInitialMouseMove);
      document.addEventListener("mousemove", handlePermanentMouseMove);
    }

    // --- Important: Remove previous nested mouseleave listener if it exists ---
    // This is crucial to avoid memory leaks and incorrect behavior.
    if (currentItemMouseLeaveHandler) {
      targetHovered.removeEventListener(
        "mouseleave",
        currentItemMouseLeaveHandler
      );
      currentItemMouseLeaveHandler = null; // Clear the reference
    }

    // --- Apply shared active classes to trigger CSS transitions for cursor and follower ---
    cursor.classList.add("active");
    follower.classList.add("active");

    // --- Reset any specific styles from previous hovers ---
    cursorContent.innerHTML = "";
    cursorContent.style.paddingLeft = "";
    cursor.style.background = "white"; // Default background
    cursor.style.boxShadow = "0 0 2px white"; // Default shadow
    cursor.style.transition = ""; // Reset transition to default from CSS

    // --- Logic for specific hover effects based on element classes/tags ---

    // Check if the hovered item has 'box-shadow-soft-3d' class.
    if (targetHovered.classList.contains("box-shadow-soft-3d")) {
      cursorContent.innerHTML = "copy";
      cursor.style.background = "#b9b5b51e";

      // Define and store the specific mouseleave handler for this condition
      currentItemMouseLeaveHandler = function () {
        setTimeout(() => {
          cursor.style.background = "white"; // Reset background after delay
        }, 350);
      };
      targetHovered.addEventListener(
        "mouseleave",
        currentItemMouseLeaveHandler
      );
    }

    // Check if the hovered item itself is an IMG tag.
    if (targetHovered.tagName === "IMG") {
      cursorContent.innerHTML = "Click";
      cursorContent.style.paddingLeft = "0px";
      cursor.style.background = "#ffa600a9";
      cursor.style.boxShadow = "0 0 2px #ffb300a9";

      // Define and store the specific mouseleave handler for this condition
      projectLinkLeaveHandler = function () {
        cursor.style.background = "white"; // Reset background instantly
        cursor.style.transition = "all 100ms"; // Apply a specific transition on leave
        setTimeout(() => {
          cursor.style.transition = "none";
        }, 200);
      };
      targetHovered.addEventListener("mouseleave", projectLinkLeaveHandler);
    }
  });

  item.addEventListener("mouseleave", function () {
    // Ensure any specific mouseleave handler added by mouseenter is removed
    if (currentItemMouseLeaveHandler) {
      this.removeEventListener("mouseleave", currentItemMouseLeaveHandler);
      currentItemMouseLeaveHandler = null; // Clear the reference
    }

    cursor.classList.remove("active");
    follower.classList.remove("active");

    // Reset cursor content and styles to default after a delay for smooth transition out
    // Only reset if no specific handler took over or the default is desired.
    // This is a general fallback, ensure it doesn't conflict with specific resets.

    // setTimeout(() => {
    //     cursorContent.innerHTML = '';
    //     cursorContent.style.paddingLeft = '';
    //     cursor.style.background = 'white';
    //     cursor.style.boxShadow = '0 0 2px white';
    //     cursor.style.transition = ''; // Reset transition to CSS default
    // }, 350); // This delay might need adjustment based on your 'active' class transition.
  });
});
