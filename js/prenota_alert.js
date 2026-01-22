function setupBookingForm() {
    // Seleziona il form
    const form = document.getElementById('bookingForm');

    // Seleziona l'elemento della modale
    const modalElement = document.getElementById('successModal');

    // Controllo di sicurezza: esegui solo se il form e la modale esistono
    if (form && modalElement) {

        // Inizializza la modale di Bootstrap
        const successModal = new bootstrap.Modal(modalElement);

        // Usa 'onsubmit' per evitare listener duplicati (come abbiamo fatto prima)
        form.onsubmit = function (event) {
            // 1. Impedisce il ricaricamento della pagina
            event.preventDefault();

            // (Qui in futuro metterai il codice per inviare i dati)

            // 2. Mostra il box al centro
            successModal.show();

            // 3. Opzionale: Resetta i campi del form dopo l'invio
            form.reset();
        };
    }
}

setupBookingForm();
