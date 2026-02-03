import { useEffect, useRef, useCallback } from 'react';
import createGlobe from 'cobe';

const GLOBE_SIZE = 500;

const Globe3D = () => {
  const canvasRef = useRef(null);
  const pointerInteracting = useRef(null);
  const pointerInteractionMovement = useRef(0);

  const updatePointerInteraction = useCallback((value) => {
    pointerInteracting.current = value;
    if (canvasRef.current) {
      canvasRef.current.style.cursor = value !== null ? 'grabbing' : 'grab';
    }
  }, []);

  const updateMovement = useCallback((clientX) => {
    if (pointerInteracting.current !== null) {
      const delta = clientX - pointerInteracting.current;
      pointerInteractionMovement.current = delta;
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let currentPhi = 1.5;

    const globe = createGlobe(canvas, {
      devicePixelRatio: 2,
      width: GLOBE_SIZE * 2,
      height: GLOBE_SIZE * 2,
      phi: 1.5,
      theta: 0.25,
      dark: 0,
      diffuse: 0.4,
      mapSamples: 16000,
      mapBrightness: 1.2,
      baseColor: [1, 1, 1],
      markerColor: [139 / 255, 92 / 255, 246 / 255],
      glowColor: [0.94, 0.92, 1],
      markers: [
        { location: [37.0902, -95.7129], size: 0.08 },
        { location: [4.5709, -74.2973], size: 0.08 },
        { location: [-33.4489, -70.6693], size: 0.06 },
      ],
      onRender: (state) => {
        if (pointerInteracting.current === null) {
          currentPhi += 0.004;
        }
        state.phi = currentPhi + pointerInteractionMovement.current / 300;
      },
    });

    requestAnimationFrame(() => {
      if (canvasRef.current) {
        canvasRef.current.style.opacity = '1';
      }
    });

    return () => globe.destroy();
  }, []);

  return (
    <div className="globe-3d">
      <canvas
        ref={canvasRef}
        className="globe-3d__canvas"
        style={{
          width: GLOBE_SIZE,
          height: GLOBE_SIZE,
          maxWidth: '100%',
          aspectRatio: '1',
        }}
        onPointerDown={(e) => {
          pointerInteracting.current = e.clientX;
          updatePointerInteraction(e.clientX);
        }}
        onPointerUp={() => updatePointerInteraction(null)}
        onPointerOut={() => updatePointerInteraction(null)}
        onMouseMove={(e) => updateMovement(e.clientX)}
        onTouchMove={(e) => e.touches[0] && updateMovement(e.touches[0].clientX)}
      />
      <div className="globe-3d__labels">
        <div className="globe-3d__label">
          <span className="globe-3d__label-dot" style={{ background: '#06b6d4' }} />
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
