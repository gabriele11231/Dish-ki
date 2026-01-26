//ATTENTION: This file is AI generated, even though it was manually reviewed and corrected.
document.addEventListener("DOMContentLoaded", function () {

    const numberElement = document.getElementById('dynamic-number');

    // --- CONFIGURATION ---
    const intervalTime = 30000; // 30 seconds
    const variancePercent = 0.10; // 10%

    // 1. START
    let currentValue = Math.floor((Math.random() * (100 - 2 + 1)) + 2); // Random number between 2 and 100

    // 2. CALCULATION OF THE MAX "STEP"
    // Calculate 10% of the initial number.
    // Math.max(1, ...) ensures it moves at least 1 
    // even if the initial number is very small (e.g., 5).
    let calculatedMaxJump = Math.max(1, Math.round(currentValue * variancePercent));

    // Immediately show the value and print info in console for debugging
    numberElement.innerText = currentValue;
    console.log(`Start: ${currentValue}, Max Jump (10%): ${calculatedMaxJump}`);

    function updateNumber() {
        // 3. CALCULATION OF THE NEW NUMBER
        // Generate a change between 1 and OUR calculated max jump
        let change = Math.floor(Math.random() * calculatedMaxJump) + 1;

        // Randomly decide whether to add or subtract
        let add = Math.random() > 0.5;

        // 4. BOUNCING LOGIC (0 - 100)

        if (add) {
            // If adding exceeds 100...
            if (currentValue + change > 100) {
                // ...invert and subtract
                currentValue -= change;
            } else {
                currentValue += change;
            }
        } else {
            // If subtracting goes below 0...
            if (currentValue - change < 0) {
                // ...invert and add
                currentValue += change;
            } else {
                currentValue -= change;
            }
        }

        // 5. ANIMATION
        numberElement.classList.add('fading');

        setTimeout(() => {
            numberElement.innerText = currentValue;
            numberElement.classList.remove('fading');
        }, 1500);
    }

    // Start the timer only if the initial number > 0 
    // (If it's 0, 10% is 0, so it would stay still, unless you force the minimum jump)
    setInterval(updateNumber, intervalTime);
});