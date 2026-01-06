import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Stars } from '@react-three/drei';
import * as THREE from 'three';

// Floating geometric shapes
const FloatingShape = ({ position, scale, color, speed, rotationSpeed }) => {
  const meshRef = useRef();
  const initialPosition = useMemo(() => [...position], [position]);

  useFrame((state) => {
    if (!meshRef.current) return;

    const time = state.clock.elapsedTime;

    // Gentle floating motion
    meshRef.current.position.y = initialPosition[1] + Math.sin(time * speed) * 0.3;
    meshRef.current.position.x = initialPosition[0] + Math.sin(time * speed * 0.5) * 0.2;

    // Rotation
    meshRef.current.rotation.x += rotationSpeed * 0.01;
    meshRef.current.rotation.y += rotationSpeed * 0.015;
    meshRef.current.rotation.z += rotationSpeed * 0.008;
  });

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <octahedronGeometry args={[1, 0]} />
      <meshStandardMaterial
        color={color}
        transparent
        opacity={0.6}
        wireframe
        emissive={color}
        emissiveIntensity={0.3}
      />
    </mesh>
  );
};

// Glowing orb that follows cursor
const CursorOrb = () => {
  const orbRef = useRef();
  const targetPosition = useRef({ x: 0, y: 0 });
  const { viewport } = useThree();

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      targetPosition.current = {
        x: x * viewport.width * 0.4,
        y: y * viewport.height * 0.4
      };
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [viewport]);

  useFrame(() => {
    if (!orbRef.current) return;

    // Smooth follow
    orbRef.current.position.x += (targetPosition.current.x - orbRef.current.position.x) * 0.05;
    orbRef.current.position.y += (targetPosition.current.y - orbRef.current.position.y) * 0.05;
  });

  return (
    <mesh ref={orbRef} position={[0, 0, -2]}>
      <sphereGeometry args={[1.2, 32, 32]} />
      <meshStandardMaterial
        color="#8b5cf6"
        transparent
        opacity={0.08}
        emissive="#8b5cf6"
        emissiveIntensity={0.3}
      />
    </mesh>
  );
};

// Particle system
const Particles = ({ count = 200 }) => {
  const pointsRef = useRef();

  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);

    const color1 = new THREE.Color('#8b5cf6');
    const color2 = new THREE.Color('#06b6d4');

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      // Random positions in a sphere
      const radius = Math.random() * 15 + 5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = radius * Math.cos(phi) - 10;

      // Random color between purple and cyan
      const mixedColor = color1.clone().lerp(color2, Math.random());
      colors[i3] = mixedColor.r;
      colors[i3 + 1] = mixedColor.g;
      colors[i3 + 2] = mixedColor.b;

      sizes[i] = Math.random() * 3 + 1;
    }

    return { positions, colors, sizes };
  }, [count]);

  useFrame((state) => {
    if (!pointsRef.current) return;

    const time = state.clock.elapsedTime;
    pointsRef.current.rotation.y = time * 0.02;
    pointsRef.current.rotation.x = Math.sin(time * 0.01) * 0.1;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particles.positions.length / 3}
          array={particles.positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={particles.colors.length / 3}
          array={particles.colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

// Animated rings
const AnimatedRing = ({ position, color, scale = 1 }) => {
  const ringRef = useRef();

  useFrame((state) => {
    if (!ringRef.current) return;
    const time = state.clock.elapsedTime;
    ringRef.current.rotation.x = time * 0.3;
    ringRef.current.rotation.y = time * 0.2;
  });

  return (
    <mesh ref={ringRef} position={position} scale={scale}>
      <torusGeometry args={[1, 0.02, 16, 100]} />
      <meshStandardMaterial
        color={color}
        transparent
        opacity={0.4}
        emissive={color}
        emissiveIntensity={0.5}
      />
    </mesh>
  );
};

// Main scene
const Scene = () => {
  const shapes = useMemo(() => [
    { position: [-6, -2, -8], scale: 0.5, color: '#8b5cf6', speed: 0.8, rotationSpeed: 1 },
    { position: [7, -3, -10], scale: 0.7, color: '#06b6d4', speed: 0.6, rotationSpeed: 0.8 },
    { position: [-4, -5, -12], scale: 0.4, color: '#a855f7', speed: 1, rotationSpeed: 1.2 },
    { position: [5, -1, -9], scale: 0.6, color: '#22d3ee', speed: 0.7, rotationSpeed: 0.9 },
    { position: [0, -6, -11], scale: 0.45, color: '#8b5cf6', speed: 0.9, rotationSpeed: 1.1 },
    { position: [-7, -4, -14], scale: 0.55, color: '#06b6d4', speed: 0.5, rotationSpeed: 0.7 },
    { position: [8, -2, -13], scale: 0.35, color: '#a855f7', speed: 1.1, rotationSpeed: 1.3 },
  ], []);

  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={0.4} color="#8b5cf6" />
      <pointLight position={[-10, -10, -10]} intensity={0.2} color="#06b6d4" />

      <Stars
        radius={50}
        depth={50}
        count={800}
        factor={2}
        saturation={0.3}
        fade
        speed={0.3}
      />

      <Particles count={200} />

      {shapes.map((shape, i) => (
        <Float key={i} speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
          <FloatingShape {...shape} />
        </Float>
      ))}

      <AnimatedRing position={[-3, -2, -6]} color="#8b5cf6" scale={1.8} />
      <AnimatedRing position={[4, -4, -8]} color="#06b6d4" scale={1.4} />

      <CursorOrb />
    </>
  );
};

const Portfolio3DBackground = () => {
  return (
    <div className="portfolio-3d-bg">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <Scene />
      </Canvas>
    </div>
  );
};

export default Portfolio3DBackground;
