import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ServicesGrid from './ServicesGrid';

gsap.registerPlugin(ScrollTrigger);

/**
 * ServicesSection - Sección de servicios estilo Stripe
 */
const ServicesSection = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animación al hacer scroll
      gsap.fromTo(
        '.services-section__content > *',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const features = [
    'Diseño UI/UX personalizado',
    'Desarrollo web moderno',
    'Optimización SEO',
    'Soporte continuo',
  ];

  return (
    <section ref={sectionRef} className="services-section" id="servicios">
      <div className="services-section__container">
        {/* Contenido */}
        <div className="services-section__content">
          <span className="services-section__badge">Nuestro proceso</span>
          <h2 className="services-section__title">
            Todo conectado,<br />
            resultados garantizados
          </h2>
          <p className="services-section__description">
            Nuestro proceso integrado conecta cada fase del proyecto
            para entregar resultados excepcionales. Desde la estrategia
            inicial hasta el lanzamiento final.
          </p>
          <div className="services-section__features">
            {features.map((feature, index) => (
              <div key={index} className="services-section__feature">
                <span className="services-section__feature-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </span>
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Visual Grid */}
        <div className="services-section__visual">
          <ServicesGrid />
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
