//ATTENTION: This file is AI generated, even though it was manually reviewed and corrected.
function setupBookingForm() {
    const form = document.getElementById('bookingForm');
    const modalElement = document.getElementById('successModal');

    // Check if form and modalElement exist
    if (form && modalElement) {
        const successModal = new bootstrap.Modal(modalElement);
        form.onsubmit = function (event) {
            event.preventDefault();
            successModal.show();
            form.reset();
        };
    }
}

setupBookingForm();
