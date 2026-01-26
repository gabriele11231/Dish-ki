//ATTENTION: This file is AI generated, even though it was manually reviewed and corrected.
document.addEventListener('DOMContentLoaded', function () {
    const prenotaForm = document.querySelector('form');
    const modalElement = document.getElementById('prenotaModal');

    const myModal = new bootstrap.Modal(modalElement);

    prenotaForm.addEventListener('submit', function (event) {
        // Block the default form submission
        event.preventDefault();

        // Check form validity
        if (prenotaForm.checkValidity()) {
            myModal.show();
        } else {
            prenotaForm.reportValidity();
        }
    });
    
    // Listen for the modal to be fully hidden before resetting the form
    modalElement.addEventListener('hidden.bs.modal', function () {
        prenotaForm.reset();
    });
});