//ATTENTION: This file is AI generated, even though it was manually reviewed and corrected.
document.querySelectorAll('.prevent-drag-click').forEach(link => {
    let startX, startY;

    // 1. When you press the mouse button, save the initial coordinates
    link.addEventListener('mousedown', function (e) {
        startX = e.clientX;
        startY = e.clientY;
    });

    // 2. When the 'click' event occurs (which fires after the release)
    link.addEventListener('click', function (e) {
        const endX = e.clientX;
        const endY = e.clientY;

        // Calculate the difference in position
        const diffX = Math.abs(endX - startX);
        const diffY = Math.abs(endY - startY);

        // If the mouse has moved more than 5 pixels, it's a drag!
        // So we block the link.
        if (diffX > 5 || diffY > 5) {
            e.preventDefault(); // This prevents navigating to the new page
            e.stopPropagation(); // This stops any other events
        }
    });
});