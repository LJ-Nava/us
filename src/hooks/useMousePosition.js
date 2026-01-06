import { useState, useEffect, useCallback } from 'react';

/**
 * Hook para rastrear la posición del mouse con suavizado
 * @param {number} smoothing - Factor de suavizado (0-1, menor = más suave)
 */
const useMousePosition = (smoothing = 0.15) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [smoothPosition, setSmoothPosition] = useState({ x: 0, y: 0 });
  const [isMoving, setIsMoving] = useState(false);

  useEffect(() => {
    let timeoutId;
    let animationId;
    let currentX = 0;
    let currentY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e) => {
      targetX = e.clientX;
      targetY = e.clientY;
      setMousePosition({ x: targetX, y: targetY });
      setIsMoving(true);

      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => setIsMoving(false), 100);
    };

    const animate = () => {
      // Interpolación suave
      currentX += (targetX - currentX) * smoothing;
      currentY += (targetY - currentY) * smoothing;

      setSmoothPosition({
        x: Math.round(currentX * 100) / 100,
        y: Math.round(currentY * 100) / 100
      });

      animationId = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove);
    animationId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationId);
      clearTimeout(timeoutId);
    };
  }, [smoothing]);

  // Normalizar posición (-1 a 1) basado en viewport
  const normalizedPosition = useCallback(() => ({
    x: (mousePosition.x / window.innerWidth) * 2 - 1,
    y: -(mousePosition.y / window.innerHeight) * 2 + 1
  }), [mousePosition]);

  return {
    position: mousePosition,
    smoothPosition,
    normalizedPosition: normalizedPosition(),
    isMoving
  };
};

export default useMousePosition;
