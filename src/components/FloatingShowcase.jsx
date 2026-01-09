import { useEffect, useRef } from 'react';
import gsap from 'gsap';

// Importar imágenes de proyectos
import NeuroFysImg from '../assets/NeuroFys.webp';
import LavaderoImg from '../assets/Lavadero.webp';
import ConstruccionesImg from '../assets/Construcciones.webp';

/**
 * Floating Showcase - Tarjetas flotantes premium con previews de trabajos
 */
const FloatingShowcase = () => {
  const containerRef = useRef(null);

  // Imágenes de proyectos reales
  const showcases = [
    {
      id: 1,
      image: NeuroFysImg,
      label: 'SaaS Healthcare',
      position: 'top-right',
    },
    {
      id: 2,
      image: LavaderoImg,
      label: 'Automotive',
      position: 'middle-right',
    },
    {
      id: 3,
      image: ConstruccionesImg,
      label: 'Construcción',
      position: 'bottom-right',
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animación de entrada escalonada
      gsap.fromTo(
        '.floating-showcase__card',
        {
          opacity: 0,
          y: 60,
          scale: 0.9,
          rotateY: -15,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotateY: 0,
          duration: 1.2,
          stagger: 0.2,
          ease: 'power3.out',
          delay: 1.5,
        }
      );

      // Animación flotante continua para cada tarjeta
      const cards = document.querySelectorAll('.floating-showcase__card');
      cards.forEach((card, index) => {
        const duration = 4 + index * 0.5;
        const yOffset = 8 + index * 2;

        gsap.to(card, {
          y: `+=${yOffset}`,
          duration: duration,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="floating-showcase">
      {showcases.map((showcase) => (
        <div
          key={showcase.id}
          className={`floating-showcase__card floating-showcase__card--${showcase.position}`}
        >
          <div className="floating-showcase__image-wrapper">
            <img
              src={showcase.image}
              alt={showcase.label}
              className="floating-showcase__image"
              loading="lazy"
            />
            <div className="floating-showcase__overlay" />
          </div>
          <div className="floating-showcase__label">
            <span className="floating-showcase__dot" />
            <span className="floating-showcase__text">{showcase.label}</span>
          </div>
          <div className="floating-showcase__shine" />
        </div>
      ))}
    </div>
  );
};

export default FloatingShowcase;
