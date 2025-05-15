// Wait for the HTML document to be fully loaded before running scripts
document.addEventListener('DOMContentLoaded', () => {

    // --- Global Variables & Constants ---
    const nameToType = "Bepsi"; // Name for typewriter effect

    // --- Element Selectors ---
    const typewriterElement = document.getElementById('typewriter-name');
    const currentYearElements = document.querySelectorAll('#currentYear, .dynamic-year'); // Select all year elements
    const heroSection = document.querySelector('.hero');
    const accordionTriggers = document.querySelectorAll('.keyboard-trigger');

    // --- Typewriter Effect (for Hero Section on index.html) ---
    let charIndex = 0;
    let isTyping = true;

    function typeEffect() {
        // Ensure the element exists and we are still typing
        if (isTyping && typewriterElement) {
            if (charIndex < nameToType.length) {
                typewriterElement.textContent += nameToType.charAt(charIndex);
                charIndex++;
                setTimeout(typeEffect, 110); // Typing speed
            } else {
                isTyping = false; // Stop typing
                // Ensure caret remains visible and blinking animation (handled by CSS) continues
                if (typewriterElement.style) {
                     typewriterElement.style.borderRight = ".15em solid #00ccff";
                }
            }
        }
    }

    // Initialize Typewriter if the element exists
    if (typewriterElement) {
        typewriterElement.textContent = ''; // Clear content on load
        charIndex = 0;
        isTyping = true;
        if (typewriterElement.style) {
            typewriterElement.style.animation = 'none'; // Stop CSS blink animation during typing
            typewriterElement.style.borderRight = ".15em solid #00ccff"; // Show caret for typing
        }
        typeEffect(); // Start the effect

        // Optionally set title only on the page with the typewriter
        if (document.title.toLowerCase().includes("welcome")) {
             document.title = `Welcome | ${nameToType}`;
        }
    }

    // --- Dynamic Copyright Year Update (for Footer and other places) ---
    if (currentYearElements.length > 0) {
        const currentYear = new Date().getFullYear();
        currentYearElements.forEach(el => {
            el.textContent = currentYear;
        });
    }

    // --- Hero Slideshow (for index.html) ---
    const heroImages = [
        'images/slide1.jpg', // Replace with your actual image path
        'images/slide2.jpg', // Replace with your actual image path
        'images/slide3.jpg', // Replace with your actual image path
    ];
    let currentHeroImageIndex = 0;

    if (heroSection && heroImages.length > 0) {
        heroImages.forEach(src => { // Preload images
            const img = new Image();
            img.src = src;
        });

        function changeHeroBackground() {
            if (!heroSection.style) return;
            currentHeroImageIndex = (currentHeroImageIndex + 1) % heroImages.length;
            heroSection.style.backgroundImage = `url('${heroImages[currentHeroImageIndex]}')`;
        }

        if (heroSection.style) {
             heroSection.style.backgroundImage = `url('${heroImages[0]}')`; // Set initial image
        }
        setInterval(changeHeroBackground, 7000); // Change image every 7 seconds
    } else if (heroSection && heroImages.length === 0) {
        console.log("Hero slideshow initialized, but no images are provided.");
    }

    // --- Keyboard Accordion (for setup.html) ---
    if (accordionTriggers.length > 0) {
        accordionTriggers.forEach(trigger => {
            const detailsPanel = trigger.nextElementSibling; // The content div (e.g., .keyboard-details)
            const isInitiallyExpanded = trigger.getAttribute('aria-expanded') === 'true';

            // Ensure the detailsPanel exists and is the correct element
            if (detailsPanel && detailsPanel.classList.contains('keyboard-details')) {
               // Set initial max-height based on expanded state
               detailsPanel.style.maxHeight = isInitiallyExpanded ? detailsPanel.scrollHeight + 'px' : null;
               if(isInitiallyExpanded) {
                   detailsPanel.classList.add('active');
                   trigger.classList.add('active');
               }
            } else if (detailsPanel) {
                // console.warn("Accordion trigger's next sibling is not .keyboard-details:", trigger);
            }


            trigger.addEventListener('click', function() {
                const currentDetails = this.nextElementSibling;
                if (!currentDetails || !currentDetails.classList.contains('keyboard-details')) {
                    console.error("Could not find details panel for trigger:", this);
                    return;
                }

                const isExpanded = this.getAttribute('aria-expanded') === 'true';

                // Toggle the current item's state
                this.setAttribute('aria-expanded', String(!isExpanded)); // Convert boolean to string for attribute
                currentDetails.classList.toggle('active');
                this.classList.toggle('active'); // Toggle active class on button too

                if (!isExpanded) { // If it was closed, now opening
                    currentDetails.style.maxHeight = currentDetails.scrollHeight + 'px';
                    // console.log(`Opening: ${this.textContent.trim()}, scrollHeight: ${currentDetails.scrollHeight}px`);
                } else { // If it was open, now closing
                    currentDetails.style.maxHeight = null;
                    // console.log(`Closing: ${this.textContent.trim()}`);
                }

                // --- Optional: Close other accordion items ---
                // Uncomment the block below if you want only one item open at a time
                /*
                accordionTriggers.forEach(otherTrigger => {
                    if (otherTrigger !== this) { // Don't close the one just clicked
                        const otherDetails = otherTrigger.nextElementSibling;
                        if (otherDetails && otherDetails.classList.contains('keyboard-details')) {
                            otherTrigger.setAttribute('aria-expanded', 'false');
                            otherDetails.style.maxHeight = null; // Collapse it
                            otherDetails.classList.remove('active');
                            otherTrigger.classList.remove('active');
                        }
                    }
                });
                */
                // --- End Optional Block ---

                
            });
        });
    }

}); // End DOMContentLoaded Listener
