//ATTENTION: This file is AI generated, even though it was manually reviewed and corrected.
// Function to handle 3D carousel rotation and card counter-rotation
let currDeg = 0;
let activeIndex = 0;
const items = document.querySelectorAll('.card-3d');
const turntable = document.querySelector('.turntable');
const totalItems = items.length; 
let autoRotateInterval; 

function rotateTo(index) {
    // Measure the shortest rotation direction
    let diff = index - activeIndex;
    if (diff === 3) diff = -1;
    if (diff === -3) diff = 1;

    // Refresh current degree
    currDeg -= diff * 90;
    activeIndex = index;

    // 1. Rotate the turntable
    turntable.style.transform = `rotateY(${currDeg}deg)`;

    // 2. Update each card's inner rotation to counteract turntable rotation
    items.forEach((item, i) => {
        item.classList.remove('active');
        const baseAngle = i * 90;
        const counterRotate = -(baseAngle + currDeg);
        const inner = item.querySelector('.card-inner');
        inner.style.transform = `rotateY(${counterRotate}deg)`;
    });

    items[index].classList.add('active');

    startAutoRotate();
}

// Function to start the auto-rotation timer
function startAutoRotate() {
    // Clear any existing timer (reset)
    stopAutoRotate(); 
    
    autoRotateInterval = setInterval(() => {
        let nextIndex = (activeIndex + 1) % totalItems;
        rotateTo(nextIndex);
    }, 10000);
}

// Function to stop the auto-rotation timer
function stopAutoRotate() {
    if (autoRotateInterval) {
        clearInterval(autoRotateInterval);
        autoRotateInterval = null;
    }
}

// Initialize carousel on DOMContentLoaded
window.addEventListener('DOMContentLoaded', () => {
    // Initialize first rotation
    rotateTo(0);

    // Add click listeners to each card
    items.forEach((item, index) => {
        item.addEventListener('click', () => {
            // If clicked card is not active, rotate to it
            if (activeIndex !== index) {
                rotateTo(index);
            }
        });
    });

    // Listen for visibility change events
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            stopAutoRotate();
            console.log("Tab nascosta: rotazione in pausa");
        } else {
            startAutoRotate();
            console.log("Tab visibile: rotazione riavviata");
        }
    });
});