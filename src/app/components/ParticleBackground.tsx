import { useEffect, useRef } from "react";

// Define the type for a particle
type Particle = {
  x: number;
  y: number;
  speed: number;
  size: number;
  angle: number; // Direction in radians (0 to 2π)
  vx: number;    // Velocity in X
  vy: number;    // Velocity in Y
};

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return; // Verify canvas exists

    const ctx = canvas.getContext("2d");
    if (!ctx) return; // Verify context exists

    // Set initial size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    async function initParticles() {
      // Particles configuration
      const particles: Particle[] = [];
      const particleCount = 100;

      // Initialize particles
      for (let i = 0; i < particleCount; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 0.5; // Base range: 0 to 0.5
        
        // Close particles (larger and faster)
        const isClose = Math.random() > 0.8; // 20% chance to be "close"
        const size = isClose 
          ? Math.random() * 1.5 + 1 // Large size (1px to 2.5px)
          : Math.random() * 1.5 + 1; // Small size (1px to 2.5px)
        
        const finalSpeed = isClose 
          ? speed + 0.5 // Faster (0.5 to 1.0)
          : speed; // Base speed (0 to 0.5)

        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          speed: finalSpeed,
          size,
          angle,
          vx: Math.cos(angle) * finalSpeed,
          vy: Math.sin(angle) * finalSpeed,
          canCollide: Math.random() < 0.5, // 50% chance to colide
        } as Particle & { canCollide: boolean });
      }

      // Animation function
      function animate() {
        // Clear canvas completely
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Transparent background (optional trail effect)
        ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Detect and resolve collisions
        for (let i = 0; i < particleCount; i++) {
          for (let j = i + 1; j < particleCount; j++) {
            const p1 = particles[i] as Particle & { canCollide: boolean };
            const p2 = particles[j] as Particle & { canCollide: boolean };

            const dx = p2.x - p1.x;
            const dy = p2.y - p1.y;
            const dist = Math.hypot(dx, dy);
            const minDist = p1.size + p2.size;

            if (dist < minDist) {
              if (!p1.canCollide && !p2.canCollide) continue;

              // Simple elastic collision in 2D (only swapping velocity)
              const angle = Math.atan2(dy, dx);
              const sin = Math.sin(angle);
              const cos = Math.cos(angle);

              // Rotate velocities to collision axis
              const v1 = { x: p1.vx * cos + p1.vy * sin, y: -p1.vx * sin + p1.vy * cos };
              const v2 = { x: p2.vx * cos + p2.vy * sin, y: -p2.vx * sin + p2.vy * cos };

              // Swap x velocities (elastic collision on 1D axis)
              const temp = v1.x;
              v1.x = v2.x;
              v2.x = temp;

              // Rotate velocities back
              p1.vx = v1.x * cos - v1.y * sin;
              p1.vy = v1.x * sin + v1.y * cos;
              p2.vx = v2.x * cos - v2.y * sin;
              p2.vy = v2.x * sin + v2.y * cos;

              // Optional: Separate particles to avoid overlap sticking
              const overlap = (minDist - dist) / 2;
              const offsetX = overlap * Math.cos(angle);
              const offsetY = overlap * Math.sin(angle);
              p1.x -= offsetX;
              p1.y -= offsetY;
              p2.x += offsetX;
              p2.y += offsetY;
            }
          }
        }

        // Draw particles
        particles.forEach((p) => {
          ctx.fillStyle = `rgba(255, 255, 255, ${p.size / 5})`; // Opacity based on size
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
          
          // Movement based on angle
          p.x += p.vx;
          p.y += p.vy;

          // Reset position if out of bounds
          if (p.x < 0 || p.x > canvas.width || p.y < 0 || p.y > canvas.height) {
            p.x = Math.random() * canvas.width;
            p.y = Math.random() * canvas.height;
          }
        });
        
        requestAnimationFrame(animate);
      }
      
      animate();
    }        

    initParticles();

    // Handle window resize
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    // Cleanup on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        pointerEvents: "none",
        backgroundColor: "transparent",
      }}
    />
  );
}