import { useRef, useMemo, useState, useEffect, lazy, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Lazy load del componente móvil para no cargarlo en desktop
const HeroMobileBackground = lazy(() => import('./HeroMobileBackground'));

/**
 * Hook para detectar si es dispositivo móvil o tablet
 */
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      // Detectar por ancho de pantalla Y capacidades del dispositivo
      const isMobileWidth = window.innerWidth <= 1024;
      const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      const isLowPerformance = navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4;

      // Es móvil si: pantalla pequeña O (es touch Y bajo rendimiento)
      setIsMobile(isMobileWidth || (isTouchDevice && isLowPerformance));
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return isMobile;
};

/**
 * Geometría wireframe elegante que rota suavemente
 */
const WireframeShape = ({ position, rotation, scale = 1, geometry = 'icosahedron', color = '#6366f1', opacity = 0.3, speed = 0.2 }) => {
  const meshRef = useRef();
  const initialRotation = useRef(rotation || [0, 0, 0]);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = initialRotation.current[0] + state.clock.elapsedTime * speed * 0.3;
      meshRef.current.rotation.y = initialRotation.current[1] + state.clock.elapsedTime * speed * 0.5;
    }
  });

  const geometryComponent = useMemo(() => {
    switch (geometry) {
      case 'icosahedron':
        return <icosahedronGeometry args={[1, 0]} />;
      case 'octahedron':
        return <octahedronGeometry args={[1, 0]} />;
      case 'dodecahedron':
        return <dodecahedronGeometry args={[1, 0]} />;
      case 'tetrahedron':
        return <tetrahedronGeometry args={[1, 0]} />;
      case 'torus':
        return <torusGeometry args={[1, 0.3, 8, 24]} />;
      case 'torusKnot':
        return <torusKnotGeometry args={[0.8, 0.25, 64, 8]} />;
      default:
        return <icosahedronGeometry args={[1, 0]} />;
    }
  }, [geometry]);

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      {geometryComponent}
      <meshBasicMaterial
        color={color}
        wireframe
        transparent
        opacity={opacity}
      />
    </mesh>
  );
};

/**
 * Anillo delicado
 */
const Ring = ({ radius = 2, color = '#8b5cf6', opacity = 0.2, rotationSpeed = 0.1, tilt = [0, 0, 0] }) => {
  const ringRef = useRef();

  useFrame((state) => {
    if (ringRef.current) {
      ringRef.current.rotation.z += rotationSpeed * 0.01;
    }
  });

  return (
    <mesh ref={ringRef} rotation={tilt}>
      <ringGeometry args={[radius - 0.02, radius, 64]} />
      <meshBasicMaterial
        color={color}
        transparent
        opacity={opacity}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
};

/**
 * Partículas flotantes sutiles
 */
const FloatingParticles = ({ count = 50 }) => {
  const pointsRef = useRef();

  const { positions, sizes } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      // Distribuir en un área más concentrada alrededor de las formas
      positions[i * 3] = (Math.random() - 0.5) * 12;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 8;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 6 - 2;
      sizes[i] = Math.random() * 0.02 + 0.008;
    }

    return { positions, sizes };
  }, [count]);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.015;
      pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.08) * 0.02;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.025}
        color="#c7d2fe"
        transparent
        opacity={0.4}
        sizeAttenuation
      />
    </points>
  );
};

/**
 * Líneas conectoras sutiles
 */
const ConnectionLines = () => {
  const linesRef = useRef();

  const points = useMemo(() => {
    const pts = [];
    // Crear algunas líneas elegantes
    pts.push(new THREE.Vector3(-4, 2, -2), new THREE.Vector3(4, -1, -3));
    pts.push(new THREE.Vector3(3, 3, -1), new THREE.Vector3(-3, -2, -2));
    pts.push(new THREE.Vector3(-2, -3, -1), new THREE.Vector3(5, 1, -2));
    return pts;
  }, []);

  useFrame((state) => {
    if (linesRef.current) {
      linesRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
    }
  });

  return (
    <group ref={linesRef}>
      {[0, 2, 4].map((startIdx, i) => (
        <line key={i}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={2}
              array={new Float32Array([
                points[startIdx].x, points[startIdx].y, points[startIdx].z,
                points[startIdx + 1].x, points[startIdx + 1].y, points[startIdx + 1].z
              ])}
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial color="#c7d2fe" transparent opacity={0.15} />
        </line>
      ))}
    </group>
  );
};

/**
 * Escena principal elegante - Posicionada a la derecha
 */
const Scene = () => {
  const groupRef = useRef();

  useFrame((state) => {
    if (groupRef.current) {
      // Movimiento muy sutil de toda la escena
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.05) * 0.02;
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.05;
    }
  });

  return (
    <group ref={groupRef} position={[1.5, 0.5, 0]}>
      {/* Forma principal grande - icosaedro elegante */}
      <WireframeShape
        position={[0.5, -0.5, -1]}
        geometry="icosahedron"
        scale={2.8}
        color="#4f46e5"
        opacity={0.12}
        speed={0.05}
      />

      {/* Forma secundaria - octaedro arriba izquierda */}
      <WireframeShape
        position={[-2, 2, -3]}
        geometry="octahedron"
        scale={1.2}
        color="#6366f1"
        opacity={0.1}
        speed={0.08}
      />

      {/* Dodecaedro pequeño - abajo derecha */}
      <WireframeShape
        position={[2.5, -2, -2]}
        geometry="dodecahedron"
        scale={0.8}
        color="#818cf8"
        opacity={0.08}
        speed={0.1}
      />

      {/* Tetraedro sutil - arriba derecha */}
      <WireframeShape
        position={[3, 2.5, -4]}
        geometry="tetrahedron"
        scale={0.6}
        color="#a5b4fc"
        opacity={0.06}
        speed={0.07}
      />

      {/* Icosaedro pequeño - izquierda */}
      <WireframeShape
        position={[-3, -1.5, -2.5]}
        geometry="icosahedron"
        scale={0.5}
        color="#6366f1"
        opacity={0.07}
        speed={0.12}
      />

      {/* Anillo orbital principal - más grande y sutil */}
      <Ring radius={4} color="#4f46e5" opacity={0.04} rotationSpeed={0.015} tilt={[Math.PI / 2.5, 0.15, 0]} />

      {/* Segundo anillo más pequeño */}
      <Ring radius={2.2} color="#818cf8" opacity={0.03} rotationSpeed={-0.02} tilt={[Math.PI / 3, -0.1, 0.2]} />

      {/* Partículas muy sutiles */}
      <FloatingParticles count={35} />
    </group>
  );
};

/**
 * Componente Canvas principal - Adaptativo Desktop/Mobile
 */
const Hero3DScene = () => {
  const isMobile = useIsMobile();

  // En móvil, mostrar la alternativa CSS
  if (isMobile) {
    return (
      <Suspense fallback={<div className="hero-3d hero-3d--loading" />}>
        <HeroMobileBackground />
      </Suspense>
    );
  }

  // En desktop, mostrar el 3D completo
  return (
    <div className="hero-3d">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 40 }}
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance'
        }}
        style={{ background: 'transparent' }}
      >
        <Scene />
      </Canvas>
    </div>
  );
};

export default Hero3DScene;
