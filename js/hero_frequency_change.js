//ATTENTION: This file is AI generated, even though it was manually reviewed and corrected.
// List of available frequencies
const frequencies = ["120Hz", "144Hz", "240Hz", "---"];

const audioTracks = [
    "audio/classic_song.mp3",  // File for 120Hz
    "audio/pop_song.mp3",  // File for 144Hz
    "audio/edm_song.mp3"  // File for 240Hz
    // No audio for "---"
];

// NEW: Make sure you have these video files (.mp4 is recommended)
const videoSources = [
    "../img/hero_video/classica_video.webm", 
    "../img/hero_video/pop_video.webm", 
    "../img/hero_video/edm_video.webm", 
    "../img/hero_video/station_video.webm"
];

// --- INITIAL STATE ---
let currentFreqIndex = -1; // Let's start with the first one (60Hz)
let currentAudio = new Audio();
// Reference to the video element in HTML
const heroVideoElement = document.getElementById('heroBgVideo');

// --- MAIN FUNCTION CALLED BY THE BUTTONS ---
function changeFreq(direction) {
    const display = document.getElementById('freqDisplay');

    // 1. Update index with loop
    currentFreqIndex += direction;
    if (currentFreqIndex >= frequencies.length) currentFreqIndex = 0;
    else if (currentFreqIndex < 0) currentFreqIndex = frequencies.length - 1;

    // 2. Update Text on screen
    display.style.opacity = 0;
    setTimeout(() => {
        display.innerText = frequencies[currentFreqIndex];
        display.style.opacity = 1;
    }, 100);

    // 3. Call the function that changes the media
    updateMediaByIndex(currentFreqIndex);
}

// --- FUNCTION THAT MANAGES MEDIA CHANGE (AUDIO + VIDEO) ---
function updateMediaByIndex(index) {
    // --- AUDIO MANAGEMENT ---
    currentAudio.pause();
    currentAudio.currentTime = 0;
    currentAudio.src = audioTracks[index];
    currentAudio.volume = 0.6; // Audio volume
    // Note: Chrome requires a click before playing audio. 
    // At the first click on the arrows, the audio will start.
    currentAudio.play().catch(e => console.log("Audio play waiting for interaction"));

    // --- AUDIO MANAGEMENT (NEW) ---
    // Change the video source
    heroVideoElement.src = videoSources[index];
    // It is important to call .play() after changing the source dynamically
    heroVideoElement.play().catch(e => console.log("Video autoplay blocked"));
}

