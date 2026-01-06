import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

/**
 * Geometric shape component with wireframe styling
 */
const GeometricShape = ({ position, rotation, scale, geometry, color, speed = 1 }) => {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.002 * speed;
      meshRef.current.rotation.y += 0.003 * speed;
    }
  });

  return (
    <Float
      speed={1.5 * speed}
      rotationIntensity={0.3}
      floatIntensity={0.5}
    >
      <mesh
        ref={meshRef}
        position={position}
        rotation={rotation}
        scale={scale}
      >
        {geometry}
        <meshBasicMaterial
          color={color}
          wireframe={true}
          transparent={true}
          opacity={0.15}
        />
      </mesh>
    </Float>
  );
};

/**
 * Glowing orb component
 */
const GlowOrb = ({ position, color, size = 0.3 }) => {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      const pulse = Math.sin(state.clock.elapsedTime * 2) * 0.1 + 1;
      meshRef.current.scale.setScalar(size * pulse);
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[1, 16, 16]} />
      <meshBasicMaterial
        color={color}
        transparent={true}
        opacity={0.08}
      />
    </mesh>
  );
};

/**
 * Main scene with all 3D elements
 */
const Scene = () => {
  const shapes = useMemo(() => [
    // Upper left corner - Main shape (prominent)
    {
      position: [-7, 3.5, -4],
      rotation: [0.5, 0.3, 0],
      scale: 1.4,
      geometry: <octahedronGeometry args={[1, 0]} />,
      color: '#06b6d4',
      speed: 0.6,
    },
    // Left side - secondary shapes
    {
      position: [-5.5, 1.5, -5],
      rotation: [0, 0.5, 0.2],
      scale: 0.9,
      geometry: <icosahedronGeometry args={[1, 0]} />,
      color: '#8b5cf6',
      speed: 0.8,
    },
    {
      position: [-8, 1, -6],
      rotation: [0.3, 0, 0.5],
      scale: 0.7,
      geometry: <tetrahedronGeometry args={[1, 0]} />,
      color: '#f59e0b',
      speed: 0.5,
    },
    {
      position: [-6, -0.5, -4],
      rotation: [0.4, 0.2, 0],
      scale: 0.6,
      geometry: <boxGeometry args={[1, 1, 1]} />,
      color: '#10b981',
      speed: 0.7,
    },
    // Left bottom
    {
      position: [-7.5, -1.5, -5],
      rotation: [0.2, 0.4, 0],
      scale: 0.5,
      geometry: <dodecahedronGeometry args={[1, 0]} />,
      color: '#06b6d4',
      speed: 0.9,
    },
    // Right side - subtle accents
    {
      position: [7, 2, -7],
      rotation: [0.5, 0.5, 0],
      scale: 0.8,
      geometry: <torusGeometry args={[1, 0.3, 8, 16]} />,
      color: '#8b5cf6',
      speed: 0.4,
    },
    {
      position: [6, -1, -6],
      rotation: [0.3, 0.2, 0.5],
      scale: 0.5,
      geometry: <octahedronGeometry args={[1, 0]} />,
      color: '#f59e0b',
      speed: 0.6,
    },
  ], []);

  const orbs = useMemo(() => [
    { position: [-6, 2.5, -3], color: '#06b6d4', size: 0.35 },
    { position: [-4, 0, -5], color: '#8b5cf6', size: 0.25 },
    { position: [5, 1, -6], color: '#f59e0b', size: 0.2 },
  ], []);

  return (
    <>
      {/* Ambient lighting */}
      <ambientLight intensity={0.5} />

      {/* Geometric shapes */}
      {shapes.map((shape, index) => (
        <GeometricShape key={index} {...shape} />
      ))}

      {/* Glowing orbs */}
      {orbs.map((orb, index) => (
        <GlowOrb key={`orb-${index}`} {...orb} />
      ))}
    </>
  );
};

/**
 * Features 3D Background Component
 */
const Features3DBackground = () => {
  return (
    <div className="features-3d-background">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance'
        }}
      >
        <Scene />
      </Canvas>
    </div>
  );
};

export default Features3DBackground;
