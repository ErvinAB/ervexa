'use client';
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three-stdlib';

export default function AINodeNetwork() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  // Mark as mounted on client
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !containerRef.current) return;

    const container = containerRef.current;

    try {
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
      camera.position.z = 50;

      // Try to create WebGL renderer with error handling
      const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        failIfMajorPerformanceCaveat: false // Allow fallback
      });

      renderer.setSize(container.clientWidth, container.clientHeight);
      container.appendChild(renderer.domElement);

      // Node geometry
      const nodeMaterial = new THREE.MeshBasicMaterial({ color: 0x00ffff });
      const nodeGeometry = new THREE.SphereGeometry(0.5, 12, 12);

      const nodeCount = 100;
      const nodes: THREE.Mesh[] = [];

      for (let i = 0; i < nodeCount; i++) {
        const node = new THREE.Mesh(nodeGeometry, nodeMaterial);
        node.position.set(
          THREE.MathUtils.randFloatSpread(60),
          THREE.MathUtils.randFloatSpread(60),
          THREE.MathUtils.randFloatSpread(60)
        );
        scene.add(node);
        nodes.push(node);
      }

      // Line material
      const lineMaterial = new THREE.LineBasicMaterial({ color: 0x00ffff, transparent: true, opacity: 0.2 });

      // Connect nodes with lines if close
      const lines: THREE.Line[] = [];
      for (let i = 0; i < nodeCount; i++) {
        for (let j = i + 1; j < nodeCount; j++) {
          if (nodes[i].position.distanceTo(nodes[j].position) < 15) {
            const geometry = new THREE.BufferGeometry().setFromPoints([
              nodes[i].position,
              nodes[j].position,
            ]);
            const line = new THREE.Line(geometry, lineMaterial);
            scene.add(line);
            lines.push(line);
          }
        }
      }

      // Lighting
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
      scene.add(ambientLight);

      // Controls
      const controls = new OrbitControls(camera, renderer.domElement);
      controls.autoRotate = true;
      controls.autoRotateSpeed = 1.5;
      controls.enableZoom = false;
      controls.enablePan = false;

      // Animate
      const animate = () => {
        requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
      };
      animate();

      // Cleanup
      return () => {
        if (container && renderer.domElement && container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
        }
        renderer.dispose();
        nodeGeometry.dispose();
        nodeMaterial.dispose();
        lineMaterial.dispose();
      };
    } catch (error) {
      // WebGL not supported or failed to initialize
      console.warn('WebGL initialization failed:', error);
      // Silently fail - the component will just show the black background
      return;
    }
  }, [mounted]);

  return <div ref={containerRef} className="w-full h-full bg-black rounded-lg" />;
}
