import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * FeaturesSection - Por qué elegirnos
 * Cards con beneficios clave estilo premium
 */
const FeaturesSection = () => {
  const sectionRef = useRef(null);

  const features = [
    {
      id: 1,
      icon: 'rocket',
      title: 'Entrega Rápida',
      description: 'Proyectos entregados en tiempo récord sin comprometer la calidad. Metodología ágil y comunicación constante.',
      color: '#8b5cf6',
    },
    {
      id: 2,
      icon: 'palette',
      title: 'Diseño Premium',
      description: 'Interfaces únicas y memorables que destacan tu marca. Diseño centrado en el usuario y tendencias actuales.',
      color: '#06b6d4',
    },
    {
      id: 3,
      icon: 'code',
      title: 'Código Limpio',
      description: 'Desarrollo con las mejores prácticas y tecnologías modernas. Rendimiento optimizado y fácil mantenimiento.',
      color: '#10b981',
    },
    {
      id: 4,
      icon: 'support',
      title: 'Soporte 24/7',
      description: 'Acompañamiento continuo después del lanzamiento. Actualizaciones, mejoras y resolución de incidencias.',
      color: '#f59e0b',
    },
  ];

  const icons = {
    rocket: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 00-2.91-.09z"/>
        <path d="M12 15l-3-3a22 22 0 012-3.95A12.88 12.88 0 0122 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 01-4 2z"/>
        <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/>
        <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>
      </svg>
    ),
    palette: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="13.5" cy="6.5" r="0.5" fill="currentColor"/>
        <circle cx="17.5" cy="10.5" r="0.5" fill="currentColor"/>
        <circle cx="8.5" cy="7.5" r="0.5" fill="currentColor"/>
        <circle cx="6.5" cy="12.5" r="0.5" fill="currentColor"/>
        <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 011.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.555C21.965 6.012 17.461 2 12 2z"/>
      </svg>
    ),
    code: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6"/>
        <polyline points="8 6 2 12 8 18"/>
        <line x1="14" y1="4" x2="10" y2="20"/>
      </svg>
    ),
    support: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"/>
      </svg>
    ),
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animar título
      gsap.fromTo(
        '.features-section__header > *',
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

      // Animar cards
      gsap.fromTo(
        '.features-section__card',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.features-section__grid',
            start: 'top 85%',
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="features-section" id="servicios-detalle">
      <div className="features-section__container">
        {/* Header */}
        <div className="features-section__header">
          <span className="features-section__badge">Por qué elegirnos</span>
          <h2 className="features-section__title">
            Resultados que hablan por sí solos
          </h2>
          <p className="features-section__subtitle">
            Combinamos creatividad, tecnología y estrategia para crear
            experiencias digitales que impulsan tu negocio.
          </p>
        </div>

        {/* Grid de features */}
        <div className="features-section__grid">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="features-section__card"
              style={{ '--feature-color': feature.color }}
            >
              <div className="features-section__card-icon">
                {icons[feature.icon]}
              </div>
              <h3 className="features-section__card-title">{feature.title}</h3>
              <p className="features-section__card-description">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
