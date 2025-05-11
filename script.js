// Typewriter effect for hero title
const nameToType = "Bepsi";
const typewriterElement = document.getElementById('typewriter-name');
let charIndex = 0;
let isTyping = true;

function typeEffect() {
  if (isTyping && typewriterElement) { // Check if element exists
    if (charIndex < nameToType.length) {
      typewriterElement.textContent += nameToType.charAt(charIndex);
      charIndex++;
      setTimeout(typeEffect, 110);
    } else {
      isTyping = false;
      // Ensure the animation for blinking caret is defined in CSS and applied correctly
      // The JS here should focus on controlling the typing and stopping condition
      // The CSS animation for blink-caret is already handling the visual effect.
      // We just need to ensure the border is visible once typing is done.
      typewriterElement.style.borderRight = ".15em solid #00ccff"; // Ensure caret is visible
      // If you want to restart the blink animation via JS (though CSS should handle it):
      // typewriterElement.style.animation = 'none'; // Reset animation
      // void typewriterElement.offsetWidth; // Trigger reflow
      // typewriterElement.style.animation = 'blink-caret .75s step-end infinite';
    }
  }
}

// Dynamic year in footer
const currentYearElement = document.getElementById('currentYear');
if (currentYearElement) {
  currentYearElement.textContent = new Date().getFullYear();
}

// Hero Slideshow
const heroSection = document.querySelector('.hero');
const heroImages = [
    'images/slide1.jpg', // Replace with your actual image path
    'images/slide2.jpg', // Replace with your actual image path
    'images/slide3.jpg', // Replace with your actual image path
    // Add more image paths as needed
];
let currentHeroImageIndex = 0;

// Preload images for smoother transitions
if (heroImages.length > 0) {
    heroImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

function changeHeroBackground() {
    if (heroImages.length === 0 || !heroSection) return; // Do nothing if no images or heroSection not found

    currentHeroImageIndex = (currentHeroImageIndex + 1) % heroImages.length;
    heroSection.style.backgroundImage = `url('${heroImages[currentHeroImageIndex]}')`;
}

// Start typewriter on load and set title
window.onload = function() {
  // Start typewriter
  if (typewriterElement) { // Check if the element exists before trying to use it
    // Reset text content in case the page is reloaded and script re-runs
    typewriterElement.textContent = '';
    charIndex = 0;
    isTyping = true;
    // Remove existing animation that might conflict before starting typing
    typewriterElement.style.animation = 'none'; // Stop blink during typing
    typewriterElement.style.borderRight = ".15em solid #00ccff"; // Show caret for typing
    typeEffect();
  }

  // Set document title - ensure nameToType is available
  document.title = `Welcome | ${nameToType}`;

  // Initialize hero slideshow
  if (heroSection && heroImages.length > 0) {
    heroSection.style.backgroundImage = `url('${heroImages[0]}')`; // Set initial image
    setInterval(changeHeroBackground, 7000); // Change image every 7 seconds (7000ms)
  } else if (heroSection && heroImages.length === 0) {
    console.log("Hero slideshow initialized, but no images are provided in the heroImages array.");
  }
};