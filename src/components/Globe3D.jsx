import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

/**
 * Globe3D - Interactive 3D Wireframe Globe
 * Shows USA, Colombia, and Chile as active markets
 * Responds to mouse movement
 */
const Globe3D = () => {
  const containerRef = useRef(null);
  const rendererRef = useRef(null);
  const frameRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const targetRotationRef = useRef({ x: 0.2, y: 1.5 });

  // Convert lat/lng to 3D position on sphere
  const latLngToVector3 = (lat, lng, radius) => {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lng + 180) * (Math.PI / 180);

    const x = -radius * Math.sin(phi) * Math.cos(theta);
    const y = radius * Math.cos(phi);
    const z = radius * Math.sin(phi) * Math.sin(theta);

    return new THREE.Vector3(x, y, z);
  };

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = Math.max(container.clientWidth, 300);
    const height = Math.max(container.clientHeight, 300);

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 3;

    // Renderer - optimized settings
    const renderer = new THREE.WebGLRenderer({
      antialias: false, // Disable for performance
      alpha: true,
      powerPreference: 'low-power',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(1); // Fixed pixel ratio for performance
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Globe Group
    const globeGroup = new THREE.Group();
    scene.add(globeGroup);

    const globeRadius = 1;

    // Main sphere (dark fill) - reduced segments
    const sphereGeometry = new THREE.SphereGeometry(globeRadius, 24, 24);
    const sphereMaterial = new THREE.MeshBasicMaterial({
      color: 0x0a1628,
      transparent: true,
      opacity: 0.9,
    });
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    globeGroup.add(sphere);

    // Wireframe sphere - reduced segments
    const wireframeGeometry = new THREE.SphereGeometry(globeRadius, 16, 16);
    const wireframeMaterial = new THREE.MeshBasicMaterial({
      color: 0x8b5cf6,
      wireframe: true,
      transparent: true,
      opacity: 0.1,
    });
    const wireframeSphere = new THREE.Mesh(wireframeGeometry, wireframeMaterial);
    globeGroup.add(wireframeSphere);

    // Latitude/Longitude grid lines - fewer lines
    const gridMaterial = new THREE.LineBasicMaterial({
      color: 0x8b5cf6,
      transparent: true,
      opacity: 0.2,
    });

    // Latitude lines - only 3 lines
    for (let lat = -45; lat <= 45; lat += 45) {
      const points = [];
      for (let lng = 0; lng <= 360; lng += 15) {
        points.push(latLngToVector3(lat, lng, globeRadius + 0.005));
      }
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      const line = new THREE.Line(geometry, gridMaterial);
      globeGroup.add(line);
    }

    // Longitude lines - fewer lines
    for (let lng = 0; lng < 360; lng += 60) {
      const points = [];
      for (let lat = -90; lat <= 90; lat += 15) {
        points.push(latLngToVector3(lat, lng, globeRadius + 0.005));
      }
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      const line = new THREE.Line(geometry, gridMaterial);
      globeGroup.add(line);
    }

    // Simplified glow effect - no shader, just a simple ring
    const glowGeometry = new THREE.RingGeometry(globeRadius + 0.05, globeRadius + 0.15, 32);
    const glowMaterial = new THREE.MeshBasicMaterial({
      color: 0x8b5cf6,
      transparent: true,
      opacity: 0.2,
      side: THREE.DoubleSide,
    });
    const glow = new THREE.Mesh(glowGeometry, glowMaterial);
    globeGroup.add(glow);

    // Location markers (USA, Colombia, Chile)
    const locations = [
      { name: 'USA', lat: 37.0902, lng: -95.7129, color: 0x22d3ee },
      { name: 'Colombia', lat: 4.5709, lng: -74.2973, color: 0x8b5cf6 },
      { name: 'Chile', lat: -33.4489, lng: -70.6693, color: 0xa78bfa },
    ];

    const pulseRings = [];

    locations.forEach((loc) => {
      const position = latLngToVector3(loc.lat, loc.lng, globeRadius + 0.02);

      // Main marker dot - simplified
      const markerGeometry = new THREE.SphereGeometry(0.04, 8, 8);
      const markerMaterial = new THREE.MeshBasicMaterial({
        color: loc.color,
      });
      const marker = new THREE.Mesh(markerGeometry, markerMaterial);
      marker.position.copy(position);
      globeGroup.add(marker);

      // Pulse ring - simplified
      const ringGeometry = new THREE.RingGeometry(0.05, 0.08, 16);
      const ringMaterial = new THREE.MeshBasicMaterial({
        color: loc.color,
        transparent: true,
        opacity: 0.6,
        side: THREE.DoubleSide,
      });
      const ring = new THREE.Mesh(ringGeometry, ringMaterial);
      ring.position.copy(position);
      ring.lookAt(new THREE.Vector3(0, 0, 0));
      globeGroup.add(ring);
      pulseRings.push({ ring, material: ringMaterial });
    });

    // Floating particles - reduced count
    const particlesGeometry = new THREE.BufferGeometry();
    const particleCount = 40;
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = globeRadius + 0.3 + Math.random() * 0.3;

      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particlesMaterial = new THREE.PointsMaterial({
      color: 0x8b5cf6,
      size: 0.015,
      transparent: true,
      opacity: 0.5,
    });
    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    globeGroup.add(particles);

    // Initial rotation
    globeGroup.rotation.x = 0.2;
    globeGroup.rotation.y = 1.5;

    // Mouse move handler
    const handleMouseMove = (event) => {
      const rect = container.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      mouseRef.current = { x, y };

      // Update target rotation based on mouse position
      targetRotationRef.current = {
        x: 0.2 + y * 0.3,
        y: 1.5 + x * 0.5,
      };
    };

    // Mouse leave handler - return to default
    const handleMouseLeave = () => {
      targetRotationRef.current = { x: 0.2, y: globeGroup.rotation.y };
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);

    // Animation
    let time = 0;
    let autoRotate = true;
    let lastMouseMove = 0;

    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);
      time += 0.008;

      // Smooth interpolation to target rotation (mouse interaction)
      const lerpFactor = 0.05;
      globeGroup.rotation.x += (targetRotationRef.current.x - globeGroup.rotation.x) * lerpFactor;

      // Auto rotate when not interacting
      const now = Date.now();
      if (now - lastMouseMove > 2000) {
        globeGroup.rotation.y += 0.001;
        targetRotationRef.current.y = globeGroup.rotation.y;
      } else {
        globeGroup.rotation.y += (targetRotationRef.current.y - globeGroup.rotation.y) * lerpFactor;
      }

      // Update lastMouseMove on mouse activity
      if (mouseRef.current.x !== 0 || mouseRef.current.y !== 0) {
        lastMouseMove = now;
      }

      // Pulse rings
      pulseRings.forEach((item, index) => {
        const scale = 1 + Math.sin(time * 1.5 + index) * 0.3;
        item.ring.scale.set(scale, scale, scale);
        item.material.opacity = 0.6 - (scale - 1) * 0.5;
      });

      particles.rotation.y += 0.0003;
      renderer.render(scene, camera);
    };
    animate();

    // Resize handler
    const handleResize = () => {
      const newWidth = Math.max(container.clientWidth, 300);
      const newHeight = Math.max(container.clientHeight, 300);
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(frameRef.current);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div ref={containerRef} className="globe-3d">
      <div className="globe-3d__labels">
        <div className="globe-3d__label">
          <span className="globe-3d__label-dot" style={{ background: '#22d3ee' }} />
          <span className="globe-3d__label-text">USA</span>
        </div>
        <div className="globe-3d__label">
          <span className="globe-3d__label-dot" style={{ background: '#8b5cf6' }} />
          <span className="globe-3d__label-text">COLOMBIA</span>
        </div>
        <div className="globe-3d__label">
          <span className="globe-3d__label-dot" style={{ background: '#a78bfa' }} />
          <span className="globe-3d__label-text">CHILE</span>
        </div>
      </div>
    </div>
  );
};

export default Globe3D;
