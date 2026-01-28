//ATTENTION: This file is AI generated, even though it was manually reviewed and corrected.
/**
 * Initializes a particle wave animation using Perlin Noise.
 * @param {string} canvasId - The ID of the HTML canvas element.
 * @param {string} wrapperSelector - The selector for the wrapper container.
 * @param {string} color - The color of the particles (e.g., hex, rgb).
 */
function initParticleWave(canvasId, wrapperSelector, color) {

    // ==========================================
    // 1. CONFIGURATION
    // ==========================================
    const config = {
        particleSize: 1.3,      // Radius of each dot
        spacingX: 20,           // Distance between particles horizontally
        spacingY: 15,           // Distance between particles vertically
        zoom: 0.003,            // How "zoomed in" the noise texture is (lower = smoother waves)
        amplitude: 120,         // How high the waves go in pixels
        speed: 0.0018           // Speed of the animation loop
    };

    // ==========================================
    // 2. SETUP CANVAS & CONTEXT
    // ==========================================
    const canvas = document.getElementById(canvasId);
    const container = document.querySelector(wrapperSelector);

    // Safety check: Ensure DOM elements exist before proceeding
    if (!canvas || !container) {
        console.error("Canvas or Container element not found.");
        return;
    }

    const ctx = canvas.getContext('2d');
    let particlesArray = [];
    let time = 0; // Global time tracker for animation

    // ==========================================
    // 3. PERLIN NOISE ENGINE
    // ==========================================
    class PerlinNoise {
        constructor() {
            // The permutation table is a randomized array used to look up gradient vectors.
            this.permutationTable = new Uint8Array(512);
            this.p = new Uint8Array(256);

            // Initialize the array with numbers 0 to 255
            for (let i = 0; i < 256; i++) {
                this.p[i] = i;
            }

            // Shuffle the array (Fisher-Yates shuffle) to create random permutations
            for (let i = 0; i < 256; i++) {
                const randomIndex = i + Math.floor(Math.random() * (256 - i));
                const temp = this.p[i];
                this.p[i] = this.p[randomIndex];
                this.p[randomIndex] = temp;
            }

            // Duplicate the array to avoid buffer overflow when indexing
            for (let i = 0; i < 512; i++) {
                this.permutationTable[i] = this.p[i & 255];
            }
        }

        /**
         * The "Fade" function (also known as Smoothstep).
         * It smooths the curve so transitions between grid coordinates aren't sharp.
         * Formula: 6t^5 - 15t^4 + 10t^3
         */
        fade(t) {
            return t * t * t * (t * (t * 6 - 15) + 10);
        }

        /**
         * Linear Interpolation (Lerp).
         * Finds a value between 'start' and 'end' based on 'amount' (0 to 1).
         */
        lerp(amount, start, end) {
            return start + amount * (end - start);
        }

        /**
         * Calculates the dot product between a pseudorandom gradient vector 
         * and the distance vector to the point.
         */
        grad(hash, x, y, z) {
            // Convert the hash (0-15) into a gradient direction
            const h = hash & 15;
            const u = h < 8 ? x : y;
            const v = h < 4 ? y : (h === 12 || h === 14 ? x : z);

            // Return the dot product
            return ((h & 1) === 0 ? u : -u) + ((h & 2) === 0 ? v : -v);
        }

        /**
         * The main 3D noise function.
         * Returns a value roughly between -1.0 and 1.0.
         */
        compute(x, y, z) {
            // 1. Find the unit cube that contains the point
            const gridX = Math.floor(x) & 255;
            const gridY = Math.floor(y) & 255;
            const gridZ = Math.floor(z) & 255;

            // 2. Find relative x, y, z of point in the cube (values 0.0 to 1.0)
            const relativeX = x - Math.floor(x);
            const relativeY = y - Math.floor(y);
            const relativeZ = z - Math.floor(z);

            // 3. Compute fade curves for each coordinate
            const u = this.fade(relativeX);
            const v = this.fade(relativeY);
            const w = this.fade(relativeZ);

            // 4. Hash coordinates of the 8 cube corners
            const p = this.permutationTable;

            const A = p[gridX] + gridY;
            const AA = p[A] + gridZ;
            const AB = p[A + 1] + gridZ;
            const B = p[gridX + 1] + gridY;
            const BA = p[B] + gridZ;
            const BB = p[B + 1] + gridZ;

            // 5. Blending (trilinear interpolation)
            return this.lerp(w,
                this.lerp(v,
                    this.lerp(u, this.grad(p[AA], relativeX, relativeY, relativeZ),
                        this.grad(p[BA], relativeX - 1, relativeY, relativeZ)),
                    this.lerp(u, this.grad(p[AB], relativeX, relativeY - 1, relativeZ),
                        this.grad(p[BB], relativeX - 1, relativeY - 1, relativeZ))
                ),
                this.lerp(v,
                    this.lerp(u, this.grad(p[AA + 1], relativeX, relativeY, relativeZ - 1),
                        this.grad(p[BA + 1], relativeX - 1, relativeY, relativeZ - 1)),
                    this.lerp(u, this.grad(p[AB + 1], relativeX, relativeY - 1, relativeZ - 1),
                        this.grad(p[BB + 1], relativeX - 1, relativeY - 1, relativeZ - 1))
                )
            );
        }
    }

    // Initialize the noise engine instance
    const noiseGenerator = new PerlinNoise();

    // ==========================================
    // 4. PARTICLE SYSTEM
    // ==========================================
    class Particle {
        constructor(x, y) {
            this.x = x; // Current X position
            this.y = y; // Current Y position

            // Remember original position to calculate wave offset
            this.originX = x;
            this.originY = y;

            // Add slight randomness to X so they don't look like a perfect grid
            this.originX += (Math.random() * 10) - 5;
        }

        draw() {
            ctx.fillStyle = color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, config.particleSize, 0, Math.PI * 2);
            ctx.fill();
        }

        update() {
            // Get noise value based on position and time
            // We treat 'time' as the Z dimension to make the wave move
            let noiseValue = noiseGenerator.compute(
                this.originX * config.zoom,
                this.originY * config.zoom,
                time
            );

            // Map the noise (-1 to 1) to our pixel amplitude
            this.y = this.originY + (noiseValue * config.amplitude);
        }
    }

    // ==========================================
    // 5. SCENE MANAGEMENT
    // ==========================================
    function resizeCanvas() {
        // Set canvas resolution to match container size
        canvas.width = container.clientWidth;
        canvas.height = container.clientHeight;

        // Re-generate particles to fill the new size
        createParticles();
    }

    function createParticles() {
        particlesArray = [];
        // Create a grid of particles, extending slightly off-screen 
        // to ensure no gaps appear during wave movement.
        const bufferY = 150;
        const bufferX = 50;

        for (let y = -bufferY; y < canvas.height + bufferY; y += config.spacingY) {
            for (let x = -bufferX; x < canvas.width + bufferX; x += config.spacingX) {
                particlesArray.push(new Particle(x, y));
            }
        }
    }

    function animate() {
        // Clear the entire canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Advance time
        time += config.speed;

        // Update and draw every particle
        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
            particlesArray[i].draw();
        }

        requestAnimationFrame(animate);
    }

    // ==========================================
    // 6. INITIALIZATION & LISTENERS
    // ==========================================
    window.addEventListener('resize', resizeCanvas);

    // Start the loop
    resizeCanvas();
    animate();
}