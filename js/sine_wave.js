//ATTENTION: This file is AI generated, even though it was manually reviewed and corrected.
const path = document.getElementById('wave-path');
const freqText = document.getElementById('freq-value');

const width = 2000; 
const height = 200;

let config = {
    amplitude: 50,    
    frequency: 0.005,
    speed: 0.03,       
    phase: 0
};

function animate() {
    let points = `M -100 ${height / 2}`; 

    for (let x = -100; x <= width + 100; x += 1) {
        let y = (height / 2) + Math.sin(x * config.frequency + config.phase) * config.amplitude;
        points += ` L ${x} ${y}`;
    }

    path.setAttribute("d", points);
    config.phase += config.speed;
    requestAnimationFrame(animate);
}

function updateFrequency() {
    const randomHz = (Math.random() * (250) + 200).toFixed(2);
    freqText.innerText = randomHz;

    //Dynamic adjustment based on screen size
    let waveDivider;

    if (window.innerWidth < 768) {
        //MOBILE
        waveDivider = 15000; 
    } else {
        //DESKTOP
        waveDivider = 8000; 
    }

    config.frequency = parseFloat(randomHz) / waveDivider;
}

//Start the sine wave animation and frequency updates
function startSineWave() {
    animate();
    updateFrequency();
    
    //Update frequency every 30 seconds
    setInterval(updateFrequency, 30000); 
    
    //Extra update if the user rotates/resizes the screen
    window.addEventListener('resize', () => {
        let currentHz = parseFloat(freqText.innerText) || 250; 
        let newDivider = window.innerWidth < 768 ? 10000 : 8000;
        config.frequency = currentHz / newDivider;
    });
}