import { useEffect, useRef, useCallback } from "react";
import * as THREE from "three";

export default function ParticleBackground() {
  const mountRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number | undefined>(undefined);
  const sceneRef = useRef<{
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    particleSystem: THREE.Points;
    material: THREE.ShaderMaterial;
    geometry: THREE.BufferGeometry;
    velocities: Float32Array;
    clock: THREE.Clock;
    particleCount: number;
  } | undefined>(undefined);

  const handleResize = useCallback(() => {
    if (!sceneRef.current) return;

    const { camera, renderer, material } = sceneRef.current;
    const width = window.innerWidth;
    const height = window.innerHeight;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
    material.uniforms.viewport.value.set(width, height);
  }, []);

  useEffect(() => {
    if (!mountRef.current) return;

    // Optimized initial setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    const renderer = new THREE.WebGLRenderer({
      antialias: false, // Disabled for better performance
      alpha: true,
      powerPreference: "high-performance"
    });

    // Optimized renderer configuration
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.domElement.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      z-index: 0;
      pointer-events: none;
    `;

    mountRef.current.appendChild(renderer.domElement);

    // Reduce particles for better performance
    const particleCount = window.innerWidth < 768 ? 1500 : 2000;
    const positions = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);
    const velocities = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    // Generate particles once
    for (let i = 0; i < particleCount; i++) {
      // More efficient distribution
      const phi = Math.acos(2 * Math.random() - 1);
      const theta = Math.random() * Math.PI * 2;
      const radius = 400 + Math.random() * 350;

      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      // More efficient velocities
      const speed = 0.1 + Math.random() * 0.3;
      const angle = Math.random() * Math.PI * 2;
      velocities[i * 3] = Math.cos(angle) * speed;
      velocities[i * 3 + 1] = Math.sin(angle) * speed;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * speed * 0.5;

      // Pre-calculated sizes
      sizes[i] = Math.random() * 0.5 + 0.5

      // Pre-calculated colors
      const brightness = 0.7 + Math.random() * 0.3;
      colors[i * 3] = brightness * 0.9;
      colors[i * 3 + 1] = brightness * 0.95;
      colors[i * 3 + 2] = brightness;
    }

    // Optimized geometry
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Optimized shader
    const material = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        viewport: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) }
      },
      vertexShader: `
        attribute float size;
        attribute vec3 color;
        uniform float time;
        varying vec3 vColor;
        varying float vAlpha;

        void main() {
          vColor = color;

          // More subtle and efficient pulsation
          float pulse = 0.8 + 0.2 * sin(time * 1.5 + position.x * 0.01);
          vAlpha = pulse;

          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          float distanceScale = 200.0 / -mvPosition.z;
          gl_PointSize = size * distanceScale * pulse;
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        varying float vAlpha;

        void main() {
          vec2 center = gl_PointCoord - vec2(0.5);
          float dist = length(center);

          // More efficient smooth gradient
          float alpha = 1.0 - smoothstep(0.3, 0.5, dist);
          alpha *= vAlpha;

          // Central glow
          float glow = exp(-dist * 8.0) * 0.4;

          gl_FragColor = vec4(vColor + glow, alpha);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthTest: false,
      depthWrite: false
    });

    const particleSystem = new THREE.Points(geometry, material);
    scene.add(particleSystem);
    camera.position.z = 100;

    // Clock for timing
    const clock = new THREE.Clock();

    // Store references for cleanup
    sceneRef.current = {
      scene,
      camera,
      renderer,
      particleSystem,
      material,
      geometry,
      velocities,
      clock,
      particleCount
    };

    // Variables for throttling
    let lastTime = 0;
    const targetFPS = 60;
    const frameInterval = 1000 / targetFPS;

    const animate = (currentTime: number) => {
      frameRef.current = requestAnimationFrame(animate);

      // Throttling to maintain stable FPS
      if (currentTime - lastTime < frameInterval) return;
      lastTime = currentTime;

      const time = clock.getElapsedTime();
      material.uniforms.time.value = time;

      // Update positions each frame (more efficient)
      const positions = geometry.attributes.position.array as Float32Array;
      const bounds = 600;

      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;

        positions[i3] += velocities[i3];
        positions[i3 + 1] += velocities[i3 + 1];
        positions[i3 + 2] += velocities[i3 + 2];

        // More efficient particle recycling
        if (Math.abs(positions[i3]) > bounds || 
            Math.abs(positions[i3 + 1]) > bounds || 
            Math.abs(positions[i3 + 2]) > bounds) {

          // Reposition from opposite side
          const scale = bounds * 0.8;
          positions[i3] = (Math.random() - 0.5) * scale;
          positions[i3 + 1] = (Math.random() - 0.5) * scale;
          positions[i3 + 2] = (Math.random() - 0.5) * scale;
        }
      }

      geometry.attributes.position.needsUpdate = true;

      // Very subtle rotation
      particleSystem.rotation.y = time * 0.02;

      renderer.render(scene, camera);
    };

    animate(0);

    // Event listeners
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }

      window.removeEventListener('resize', handleResize);

      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }

      // Free memory
      geometry.dispose();
      material.dispose();
      renderer.dispose();

      sceneRef.current = undefined;
    };
  }, [handleResize]);

  return (
    <div
      ref={mountRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        pointerEvents: "none"
      }}
    />
  );
}