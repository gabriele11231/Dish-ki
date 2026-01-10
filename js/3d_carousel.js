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
        // Remove active class from all items
        item.classList.remove('active');

        // Measure base angle and counter-rotation
        const baseAngle = i * 90;
        const counterRotate = -(baseAngle + currDeg);

        // Apply counter-rotation
        const inner = item.querySelector('.card-inner');
        inner.style.transform = `rotateY(${counterRotate}deg)`;
    });

    // Add active to the current item
    items[index].classList.add('active');
}

// Function to start the auto-rotation timer
function startAutoRotate() {
    // Clear any existing timer
    stopAutoRotate(); 
    
    autoRotateInterval = setInterval(() => {
        let nextIndex = (activeIndex + 1) % totalItems;
        rotateTo(nextIndex);
    }, 10000);
}

// Function to stop the auto-rotation timer
function stopAutoRotate() {
    clearInterval(autoRotateInterval);
}

// Initialize carousel on DOMContentLoaded
window.addEventListener('DOMContentLoaded', () => {
    rotateTo(0);

    // Start auto-rotation
    startAutoRotate();

    // Listen for visibility change events
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            // If the tab is hidden, stop auto-rotation
            stopAutoRotate();
            console.log("Tab nascosta: rotazione in pausa");
        } else {
            // If the tab is visible, resume auto-rotation
            startAutoRotate();
            console.log("Tab visibile: rotazione riavviata");
        }
    });
});