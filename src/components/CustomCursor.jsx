import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

/**
 * Cursor personalizado de nivel Awwwards
 * - Sigue el mouse con delay elegante
 * - Cambia de tamaño en elementos interactivos
 * - Solo visible en desktop
 */
const CustomCursor = () => {
  const cursorRef = useRef(null);
  const cursorDotRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [cursorText, setCursorText] = useState('');

  useEffect(() => {
    // Solo en desktop
    if (window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const cursor = cursorRef.current;
    const cursorDot = cursorDotRef.current;

    if (!cursor || !cursorDot) return;

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;

    // Movimiento del cursor principal (con delay)
    const moveCursor = () => {
      const speed = 0.15;
      cursorX += (mouseX - cursorX) * speed;
      cursorY += (mouseY - cursorY) * speed;

      gsap.set(cursor, {
        x: cursorX - cursor.offsetWidth / 2,
        y: cursorY - cursor.offsetHeight / 2
      });

      // El dot sigue más rápido
      gsap.set(cursorDot, {
        x: mouseX - 4,
        y: mouseY - 4
      });

      requestAnimationFrame(moveCursor);
    };

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const handleMouseEnter = () => setIsHidden(false);
    const handleMouseLeave = () => setIsHidden(true);

    // Detectar elementos interactivos
    const handleElementHover = (e) => {
      const target = e.target.closest('a, button, [data-cursor]');
      if (target) {
        setIsHovering(true);
        const customText = target.getAttribute('data-cursor-text');
        if (customText) setCursorText(customText);
      }
    };

    const handleElementLeave = (e) => {
      const target = e.target.closest('a, button, [data-cursor]');
      if (target) {
        setIsHovering(false);
        setCursorText('');
      }
    };

    // Event listeners
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseover', handleElementHover);
    document.addEventListener('mouseout', handleElementLeave);

    moveCursor();

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseover', handleElementHover);
      document.removeEventListener('mouseout', handleElementLeave);
    };
  }, []);

  // Solo mostrar en desktop
  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null;
  }

  return (
    <>
      {/* Cursor principal - círculo grande */}
      <div
        ref={cursorRef}
        className={`custom-cursor ${isHovering ? 'custom-cursor--hovering' : ''} ${isHidden ? 'custom-cursor--hidden' : ''}`}
      >
        {cursorText && <span className="custom-cursor__text">{cursorText}</span>}
      </div>

      {/* Dot central - pequeño y rápido */}
      <div
        ref={cursorDotRef}
        className={`custom-cursor__dot ${isHidden ? 'custom-cursor__dot--hidden' : ''}`}
      />
    </>
  );
};

export default CustomCursor;
