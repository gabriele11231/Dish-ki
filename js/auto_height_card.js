document.addEventListener("DOMContentLoaded", function() {
    
    // Funzione che calcola e normalizza le altezze
    function normalizeSlideHeights() {
        const items = document.querySelectorAll('#carousel-review .carousel-item');
        const textContainers = document.querySelectorAll('.auto-height-text-rw');
        let maxHeight = 0;

        // 1. Resetta l'altezza precedente
        textContainers.forEach(container => {
            container.style.minHeight = 'auto';
        });

        // 2. Trova il testo più alto (anche nelle slide nascoste)
        items.forEach(item => {
            const container = item.querySelector('.auto-height-text-rw');
            
            if (container) {
                let wasHidden = false;
                // Se la slide è nascosta, la rendiamo misurabile temporaneamente
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

                // Ripristina lo stato originale
                if (wasHidden) {
                    item.style.display = '';
                    item.style.visibility = '';
                    item.style.position = '';
                }
            }
        });

        // 3. Applica l'altezza massima a tutti + un piccolo buffer
        textContainers.forEach(container => {
            container.style.minHeight = (maxHeight + 10) + 'px';
        });
    }

    // Esegui la funzione quando tutte le risorse (immagini, font) sono caricate
    // Questo è fondamentale perché se i font non sono caricati, l'altezza è sbagliata
    window.addEventListener('load', normalizeSlideHeights);
    
    // Esegui quando ridimensioni la finestra
    window.addEventListener('resize', normalizeSlideHeights);

});