//ATTENTION: This file is AI generated, even though it was manually reviewed and corrected.
// Function to normalize heights of text containers within carousel slides
function normalizeSlideHeights($section, $cont) {
    const items = document.querySelectorAll(`${$section} .carousel-item`);
    const textContainers = document.querySelectorAll(`${$cont}`);
    let maxHeight = 0;

    // 1. Reset previous height
    textContainers.forEach(container => {
        container.style.minHeight = 'auto';
    });

    // 2. Find the tallest text (even in hidden slides)
    items.forEach(item => {
        const container = item.querySelector(`${$cont}`);

        if (container) {
            let wasHidden = false;
            // If the slide is hidden, make it temporarily measurable
            if (window.getComputedStyle(item).display === 'none') {
                wasHidden = true;
                item.style.display = 'block';
                item.style.visibility = 'hidden';
                item.style.position = 'absolute';
            }

            const currentHeight = container.offsetHeight;
            if (currentHeight > maxHeight) {
                maxHeight = currentHeight;
            }

            // Restore original state
            if (wasHidden) {
                item.style.display = '';
                item.style.visibility = '';
                item.style.position = '';
            }
        }
    });

    // 3. Apply the maximum height to all + a small buffer
    textContainers.forEach(container => {
        container.style.minHeight = (maxHeight + 10) + 'px';
    });
}
