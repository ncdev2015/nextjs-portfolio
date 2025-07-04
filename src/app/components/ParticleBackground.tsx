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
        });
      }

      // Animation function
      function animate() {
        // Clear canvas completely
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Transparent background (optional trail effect)
        ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

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