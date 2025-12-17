// Lista delle frequenze disponibili
const frequencies = ["120Hz", "144Hz", "240Hz"];

const audioTracks = [
    "audio/classic_song.mp3",  // File per 120Hz
    "audio/pop_song.mp3",  // File per 144Hz
    "audio/edm_song.mp3"  // File per 240Hz
];

// NUOVO: Assicurati di avere questi file video (.mp4 è consigliato)
const videoSources = [
    "videos/video_144Hz.mp4", "videos/video_240Hz.mp4", "videos/video_120Hz.mp4"
];

// --- STATO INIZIALE ---
let currentFreqIndex = 0; // Iniziamo dal primo (60Hz)
let currentAudio = new Audio();
// Riferimento all'elemento video nell'HTML
const heroVideoElement = document.getElementById('heroBgVideo');

// --- FUNZIONE PRINCIPALE CHIAMATA DAI BOTTONI ---
function changeFreq(direction) {
    const display = document.getElementById('freqDisplay');

    // 1. Aggiorna indice con loop
    currentFreqIndex += direction;
    if (currentFreqIndex >= frequencies.length) currentFreqIndex = 0;
    else if (currentFreqIndex < 0) currentFreqIndex = frequencies.length - 1;

    // 2. Aggiorna Testo a video
    display.style.opacity = 0;
    setTimeout(() => {
        display.innerText = frequencies[currentFreqIndex];
        display.style.opacity = 1;
    }, 100);

    // 3. Chiama la funzione che cambia i media
    updateMediaByIndex(currentFreqIndex);
}

// --- FUNZIONE CHE GESTISCE IL CAMBIO MEDIA (AUDIO + VIDEO) ---
function updateMediaByIndex(index) {
    // --- GESTIONE AUDIO ---
    currentAudio.pause();
    currentAudio.currentTime = 0;
    currentAudio.src = audioTracks[index];
    currentAudio.volume = 0.6; // Volume audio
    // Nota: Chrome richiede un click prima di far partire l'audio. 
    // Al primo click sulle frecce, l'audio partirà.
    currentAudio.play().catch(e => console.log("Audio play waiting for interaction"));

    // --- GESTIONE VIDEO (NUOVO) ---
    // Cambia la sorgente del video
    heroVideoElement.src = videoSources[index];
    // È importante richiamare .play() dopo aver cambiato la sorgente dinamicamente
    heroVideoElement.play().catch(e => console.log("Video autoplay blocked"));
}

