import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * Elegant Gradient Mesh - Inspired by Linear/Stripe
 * Sophisticated flowing gradients with subtle motion
 */
const GradientMesh = () => {
  const meshRef = useRef();
  const materialRef = useRef();

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uColor1: { value: new THREE.Color('#0ea5e9') },
    uColor2: { value: new THREE.Color('#8b5cf6') },
    uColor3: { value: new THREE.Color('#06b6d4') },
    uColor4: { value: new THREE.Color('#a855f7') },
  }), []);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime * 0.15;
    }
  });

  const vertexShader = `
    varying vec2 vUv;
    varying float vElevation;
    uniform float uTime;

    void main() {
      vUv = uv;
      vec3 pos = position;

      // Subtle wave distortion
      float elevation = sin(pos.x * 0.5 + uTime) * 0.3 +
                       sin(pos.y * 0.4 + uTime * 0.8) * 0.2 +
                       sin((pos.x + pos.y) * 0.3 + uTime * 0.5) * 0.15;

      pos.z += elevation;
      vElevation = elevation;

      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `;

  const fragmentShader = `
    varying vec2 vUv;
    varying float vElevation;
    uniform float uTime;
    uniform vec3 uColor1;
    uniform vec3 uColor2;
    uniform vec3 uColor3;
    uniform vec3 uColor4;

    void main() {
      // Create flowing gradient
      float t = uTime * 0.5;

      vec2 uv = vUv;
      uv.x += sin(uv.y * 2.0 + t) * 0.1;
      uv.y += cos(uv.x * 2.0 + t * 0.7) * 0.1;

      // Four-color gradient blend
      vec3 color1 = mix(uColor1, uColor2, uv.x + sin(t) * 0.3);
      vec3 color2 = mix(uColor3, uColor4, uv.y + cos(t * 0.8) * 0.3);
      vec3 finalColor = mix(color1, color2, (uv.x + uv.y) * 0.5 + vElevation * 0.5);

      // Subtle noise for texture
      float noise = fract(sin(dot(vUv, vec2(12.9898, 78.233))) * 43758.5453);
      finalColor += noise * 0.02;

      // Soft fade at edges
      float alpha = smoothstep(0.0, 0.3, vUv.x) * smoothstep(1.0, 0.7, vUv.x) *
                   smoothstep(0.0, 0.3, vUv.y) * smoothstep(1.0, 0.7, vUv.y);

      gl_FragColor = vec4(finalColor, alpha * 0.4);
    }
  `;

  return (
    <mesh ref={meshRef} position={[0, 0, -5]} rotation={[-0.3, 0, 0]}>
      <planeGeometry args={[25, 20, 64, 64]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        side={THREE.DoubleSide}
        depthWrite={false}
      />
    </mesh>
  );
};

/**
 * Floating Light Orbs - Subtle ambient lights
 */
const LightOrbs = () => {
  const groupRef = useRef();

  const orbs = useMemo(() => [
    { position: [-4, 2, -3], color: '#0ea5e9', size: 2, speed: 0.3 },
    { position: [4, -1, -4], color: '#8b5cf6', size: 1.8, speed: 0.4 },
    { position: [0, 3, -2], color: '#06b6d4', size: 1.5, speed: 0.35 },
    { position: [-3, -2, -3], color: '#a855f7', size: 1.2, speed: 0.45 },
  ], []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.children.forEach((orb, i) => {
        const t = state.clock.elapsedTime * orbs[i].speed;
        orb.position.y = orbs[i].position[1] + Math.sin(t) * 0.5;
        orb.position.x = orbs[i].position[0] + Math.cos(t * 0.7) * 0.3;
      });
    }
  });

  return (
    <group ref={groupRef}>
      {orbs.map((orb, i) => (
        <mesh key={i} position={orb.position}>
          <sphereGeometry args={[orb.size, 32, 32]} />
          <meshBasicMaterial
            color={orb.color}
            transparent
            opacity={0.06}
          />
        </mesh>
      ))}
    </group>
  );
};

/**
 * Elegant Grid Lines - Subtle depth grid
 */
const ElegantGrid = () => {
  const linesRef = useRef();

  useFrame((state) => {
    if (linesRef.current) {
      linesRef.current.rotation.x = -Math.PI / 3 + Math.sin(state.clock.elapsedTime * 0.1) * 0.05;
    }
  });

  const gridGeometry = useMemo(() => {
    const points = [];
    const size = 20;
    const divisions = 20;
    const step = size / divisions;

    // Horizontal lines
    for (let i = 0; i <= divisions; i++) {
      const y = -size / 2 + i * step;
      points.push(new THREE.Vector3(-size / 2, y, 0));
      points.push(new THREE.Vector3(size / 2, y, 0));
    }

    // Vertical lines
    for (let i = 0; i <= divisions; i++) {
      const x = -size / 2 + i * step;
      points.push(new THREE.Vector3(x, -size / 2, 0));
      points.push(new THREE.Vector3(x, size / 2, 0));
    }

    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    return geometry;
  }, []);

  return (
    <lineSegments ref={linesRef} position={[0, -5, -10]} geometry={gridGeometry}>
      <lineBasicMaterial color="#0ea5e9" transparent opacity={0.04} />
    </lineSegments>
  );
};

/**
 * Flowing Ribbons - Elegant curves
 */
const FlowingRibbon = ({ color, offset = 0, amplitude = 1 }) => {
  const meshRef = useRef();

  const curve = useMemo(() => {
    const points = [];
    for (let i = 0; i <= 50; i++) {
      const t = i / 50;
      const x = (t - 0.5) * 20;
      const y = Math.sin(t * Math.PI * 2 + offset) * amplitude;
      const z = Math.cos(t * Math.PI + offset) * 0.5;
      points.push(new THREE.Vector3(x, y, z));
    }
    return new THREE.CatmullRomCurve3(points);
  }, [offset, amplitude]);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.2 + offset) * 0.1;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.15 + offset) * 0.3;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -6]}>
      <tubeGeometry args={[curve, 100, 0.02, 8, false]} />
      <meshBasicMaterial color={color} transparent opacity={0.15} />
    </mesh>
  );
};

/**
 * Main Scene
 */
const Scene = () => {
  return (
    <>
      {/* Gradient Mesh Background */}
      <GradientMesh />

      {/* Subtle Light Orbs */}
      <LightOrbs />

      {/* Depth Grid */}
      <ElegantGrid />

      {/* Flowing Ribbons */}
      <FlowingRibbon color="#0ea5e9" offset={0} amplitude={1.5} />
      <FlowingRibbon color="#8b5cf6" offset={Math.PI / 3} amplitude={1.2} />
      <FlowingRibbon color="#06b6d4" offset={Math.PI * 2 / 3} amplitude={1} />
    </>
  );
};

/**
 * CTA 3D Background Component - Professional Edition
 */
const CTA3DBackground = () => {
  return (
    <div className="cta-3d-background">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        dpr={[1, 2]}
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

export default CTA3DBackground;
