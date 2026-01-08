//ATTENTION: This file is AI generated, even though it was manually reviewed and corrected.
const slider = document.querySelector('.scroll-container');
let isDown = false;
let startX;
let scrollLeft;

slider.addEventListener('mousedown', (e) => {
    isDown = true;
    slider.classList.add('active');
    // Record the initial position
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
});

slider.addEventListener('mouseleave', () => {
    isDown = false;
    slider.classList.remove('active');
});

slider.addEventListener('mouseup', () => {
    isDown = false;
    slider.classList.remove('active');
});

slider.addEventListener('mousemove', (e) => {
    if (!isDown) return; // If not clicked, do nothing
    e.preventDefault();  // Avoid strange behavior

    // Calculate how much the mouse has moved
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX) * 2; // * 2 is the speed (increase to scroll faster)

    // Applies the scroll
    slider.scrollLeft = scrollLeft - walk;
});