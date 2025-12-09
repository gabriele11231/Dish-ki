/**
 * CONFIGURAZIONE GENERALE
 * Modifica questi valori per cambiare l'aspetto dell'animazione
 */
const config = {
    particleSize: 1.3,    // Grandezza dei puntini
    color: '#31DEE5',     // Colore (esadecimale)
    spacingX: 20,         // Distanza orizzontale tra i punti
    spacingY: 15,         // Distanza verticale tra i punti
    zoom: 0.003,          // Zoom dell'onda (valori bassi = onde più larghe)
    amplitude: 120,       // Altezza massima dell'onda
    speed: 0.0018          // Velocità dell'animazione
};

/**
 * MOTORE MATEMATICO (PERLIN NOISE)
 * Algoritmo per generare movimenti fluidi e naturali.
 */
const noise = (function() {
    var p = new Uint8Array(512), permutation = new Uint8Array(512);
    for (var i=0; i < 256; i++) p[i] = i;
    for (var i=0; i < 256; i++) {
        var r = i + ~~(Math.random() * (256 - i));
        var t = p[i]; p[i] = p[r]; p[r] = t;
    }
    for (var i=0; i < 512; i++) permutation[i] = p[i & 255];
    function fade(t) { return t * t * t * (t * (t * 6 - 15) + 10); }
    function lerp(t, a, b) { return a + t * (b - a); }
    function grad(hash, x, y, z) {
        var h = hash & 15; var u = h < 8 ? x : y, v = h < 4 ? y : h == 12 || h == 14 ? x : z;
        return ((h & 1) == 0 ? u : -u) + ((h & 2) == 0 ? v : -v);
    }
    return {
        perlin3: function(x, y, z) {
            var X = ~~(x) & 255, Y = ~~(y) & 255, Z = ~~(z) & 255;
            x -= ~~(x); y -= ~~(y); z -= ~~(z);
            var u = fade(x), v = fade(y), w = fade(z);
            var A = permutation[X]+Y, AA = permutation[A]+Z, AB = permutation[A+1]+Z,
                B = permutation[X+1]+Y, BA = permutation[B]+Z, BB = permutation[B+1]+Z;
            return lerp(w, lerp(v, lerp(u, grad(permutation[AA], x, y, z), grad(permutation[BA], x-1, y, z)),
                           lerp(u, grad(permutation[AB], x, y-1, z), grad(permutation[BB], x-1, y-1, z))),
                   lerp(v, lerp(u, grad(permutation[AA+1], x, y, z-1), grad(permutation[BA+1], x-1, y, z-1)),
                           lerp(u, grad(permutation[AB+1], x, y-1, z-1), grad(permutation[BB+1], x-1, y-1, z-1))));
        }
    };
})();

// --- SETUP CANVAS ---
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');

let particlesArray = [];
let time = 0;

// --- CLASSE PARTICELLA ---
class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.originX = x;
        this.originY = y;
        // Aggiunge un leggero disordine orizzontale per realismo
        this.originX += (Math.random() * 10) - 5; 
    }

    draw() {
        ctx.fillStyle = config.color;
        ctx.beginPath();
        // Disegna il cerchio
        ctx.arc(this.x, this.y, config.particleSize, 0, Math.PI * 2);
        ctx.fill();
    }

    update() {
        // Calcola il valore di rumore basato su posizione e tempo
        // Restituisce un numero tra circa -1 e 1
        let noiseValue = noise.perlin3(
            this.originX * config.zoom, 
            this.originY * config.zoom, 
            time
        );
        
        // Aggiorna la posizione Y
        this.y = this.originY + (noiseValue * config.amplitude);
    }
}

// --- FUNZIONI DI GESTIONE ---

function init() {
    particlesArray = [];
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Crea la griglia di punti coprendo un'area leggermente più grande dello schermo
    for (let y = -150; y < canvas.height + 150; y += config.spacingY) {
        for (let x = -50; x < canvas.width + 50; x += config.spacingX) {
            particlesArray.push(new Particle(x, y));
        }
    }
}

function animate() {
    // Pulisce il frame precedente
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Incrementa il tempo
    time += config.speed;

    // Aggiorna e disegna ogni particella
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
    }
    
    // Richiede il prossimo frame
    requestAnimationFrame(animate);
}

// Ricalcola tutto se la finestra viene ridimensionata
window.addEventListener('resize', init);

// --- AVVIO ---
init();
animate();