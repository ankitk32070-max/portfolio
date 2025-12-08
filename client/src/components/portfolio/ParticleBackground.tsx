import { useRef, useMemo, useEffect } from 'react';
import * as THREE from 'three';

interface ParticleBackgroundProps {
  particleCount?: number;
}

export default function ParticleBackground({ particleCount = 500 }: ParticleBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animationRef = useRef<number>();

  const colors = useMemo(() => ({
    purple: new THREE.Color(0x9D4EDD),
    cyan: new THREE.Color(0x00D9FF),
    pink: new THREE.Color(0xFF006E),
    green: new THREE.Color(0x39FF14),
  }), []);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const particlesGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);
    const colorArray = [colors.purple, colors.cyan, colors.pink, colors.green];

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 50;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 50;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 50;

      const color = colorArray[Math.floor(Math.random() * colorArray.length)];
      particleColors[i * 3] = color.r;
      particleColors[i * 3 + 1] = color.g;
      particleColors[i * 3 + 2] = color.b;

      sizes[i] = Math.random() * 2 + 0.5;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));
    particlesGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.1,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    const geometries = [
      new THREE.OctahedronGeometry(0.8, 0),
      new THREE.TetrahedronGeometry(0.6, 0),
      new THREE.IcosahedronGeometry(0.5, 0),
    ];

    const floatingShapes: THREE.Mesh[] = [];
    for (let i = 0; i < 8; i++) {
      const geometry = geometries[i % geometries.length];
      const material = new THREE.MeshBasicMaterial({
        color: colorArray[i % colorArray.length],
        wireframe: true,
        transparent: true,
        opacity: 0.6,
      });
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20 - 10
      );
      mesh.userData.rotationSpeed = {
        x: (Math.random() - 0.5) * 0.02,
        y: (Math.random() - 0.5) * 0.02,
        z: (Math.random() - 0.5) * 0.02,
      };
      mesh.userData.floatOffset = Math.random() * Math.PI * 2;
      scene.add(mesh);
      floatingShapes.push(mesh);
    }

    camera.position.z = 20;

    const handleMouseMove = (event: MouseEvent) => {
      mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    const clock = new THREE.Clock();
    const animate = () => {
      animationRef.current = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      particles.rotation.y = elapsedTime * 0.05;
      particles.rotation.x = mouseRef.current.y * 0.1;
      particles.position.x += (mouseRef.current.x * 2 - particles.position.x) * 0.02;

      floatingShapes.forEach((shape, index) => {
        shape.rotation.x += shape.userData.rotationSpeed.x;
        shape.rotation.y += shape.userData.rotationSpeed.y;
        shape.rotation.z += shape.userData.rotationSpeed.z;
        shape.position.y += Math.sin(elapsedTime + shape.userData.floatOffset) * 0.005;
      });

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      renderer.dispose();
      container.removeChild(renderer.domElement);
    };
  }, [particleCount, colors]);

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 -z-10"
      data-testid="particle-background"
    />
  );
}
