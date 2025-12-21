//ATTENTION: This file is AI generated, even though it was manually reviewed and corrected.
/**
 * Inizializes a dotted wave particle animation on a specified canvas.
 * @param {string} canvasId - The ID of the canvas element (e.g., 'canvas1')
 * @param {string} wrapperSelector - The CSS selector of the container (e.g., '.canvas-wrapper')
 * @param {color} color - The color of the particles in hexadecimal format (e.g., '#31DEE5')
 */
function initParticleWave(canvasId, wrapperSelector, color) {
    // 1. CONFIGURAZIONE
    const config = {
        particleSize: 1.3,      // Size of the particles
        spacingX: 20,           // Horizontal spacing
        spacingY: 15,           // Vertical spacing
        zoom: 0.003,            // Wave zoom
        amplitude: 120,         // Maximum wave height
        speed: 0.0018           // Animation speed
    };

    // 2. SETUP CANVAS
    const canvas = document.getElementById(canvasId);
    const container = document.querySelector(wrapperSelector);
    const colorValue = color;

    // Safety check if elements do not exist
    if (!canvas || !container) {
        console.error("Canvas o Container non trovati.");
        return;
    }

    const ctx = canvas.getContext('2d');
    let particlesArray = [];
    let time = 0;

    // 3. ENGINE PERLIN NOISE (Encapsulated)
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

    // 4. PARTICLE CLASS
    class Particle {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.originX = x;
            this.originY = y;
            this.originX += (Math.random() * 10) - 5; // Disordine orizzontale
        }

        draw() {
            ctx.fillStyle = colorValue;
            ctx.beginPath();
            ctx.arc(this.x, this.y, config.particleSize, 0, Math.PI * 2);
            ctx.fill();
        }

        update() {
            let noiseValue = noise.perlin3(
                this.originX * config.zoom, 
                this.originY * config.zoom, 
                time
            );
            this.y = this.originY + (noiseValue * config.amplitude);
        }
    }

    // 5. INTERNAL FUNCTIONS
    function resizeCanvas() {
        // Use container dimensions for better fit
        canvas.width = container.clientWidth;
        canvas.height = container.clientHeight;
        createParticles();
    }

    function createParticles() {
        particlesArray = [];
        // Create a grid slightly larger than the visible area
        for (let y = -150; y < canvas.height + 150; y += config.spacingY) {
            for (let x = -50; x < canvas.width + 50; x += config.spacingX) {
                particlesArray.push(new Particle(x, y));
            }
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        time += config.speed;

        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
            particlesArray[i].draw();
        }
        
        requestAnimationFrame(animate);
    }

    // 6. START AND LISTENERS
    window.addEventListener('resize', resizeCanvas);
    
    // Initial start
    resizeCanvas(); 
    animate();
}