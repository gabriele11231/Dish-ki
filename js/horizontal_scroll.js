//ATTENTION: This file is AI generated, even though it was manually reviewed and corrected.
document.addEventListener("DOMContentLoaded", function () {
    const sliders = document.querySelectorAll('.scroll-container');

    // Iterate over each slider to set up individual event listeners
    sliders.forEach(slider => {
        let isDown = false;
        let startX;
        let scrollLeft;

        slider.addEventListener('mousedown', (e) => {
            isDown = true;
            slider.classList.add('active');
            // e.pageX is the X coordinate of the mouse pointer relative to the whole document
            // slider.offsetLeft is the distance from the left edge of the slider to the left edge of the document
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
            if (!isDown) return;
            e.preventDefault();  // Avoid default behavior like text selection

            const x = e.pageX - slider.offsetLeft;
            const walk = (x - startX) * 2; // Multiply by 2 for faster scrolling
            slider.scrollLeft = scrollLeft - walk;
        });
    });
});