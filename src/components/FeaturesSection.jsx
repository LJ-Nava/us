import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * FeaturesSection - Por qué elegirnos
 * Diseño premium estilo Linear con cards interactivas
 */
const FeaturesSection = () => {
  const sectionRef = useRef(null);
  const [hoveredCard, setHoveredCard] = useState(null);

  const features = [
    {
      id: 1,
      icon: 'layers',
      title: 'IA que Potencia',
      description: 'Nuestro motor NEXUS acelera el desarrollo y optimiza cada línea de código. Resultados en la mitad de tiempo.',
      metric: '3x',
      metricLabel: 'más rápido',
      color: '#fbbf24',
    },
    {
      id: 2,
      icon: 'zap',
      title: 'Entrega Veloz',
      description: 'La combinación de talento humano e inteligencia artificial nos permite entregar proyectos en tiempo récord.',
      metric: '50%',
      metricLabel: 'menos tiempo',
      color: '#a78bfa',
    },
    {
      id: 3,
      icon: 'sparkles',
      title: 'Diseño Premium',
      description: 'Interfaces que cautivan, experiencias que convierten visitantes en clientes fieles.',
      metric: '+40%',
      metricLabel: 'conversión',
      color: '#34d399',
    },
    {
      id: 4,
      icon: 'code',
      title: 'Código Perfecto',
      description: 'Optimización automática, cero errores, máximo rendimiento y SEO impecable en cada proyecto.',
      metric: '100%',
      metricLabel: 'optimizado',
      color: '#60a5fa',
    },
  ];

  const icons = {
    layers: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2L2 7l10 5 10-5-10-5z"/>
        <path d="M2 17l10 5 10-5"/>
        <path d="M2 12l10 5 10-5"/>
      </svg>
    ),
    zap: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
      </svg>
    ),
    sparkles: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707"/>
        <circle cx="12" cy="12" r="4"/>
      </svg>
    ),
    code: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <polyline points="16 18 22 12 16 6"/>
        <polyline points="8 6 2 12 8 18"/>
      </svg>
    ),
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
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
            trigger: '.features-section__header',
            start: 'top 80%',
            once: true,
          },
        }
      );

      // Cards stagger animation
      gsap.fromTo(
        '.features-section__card',
        { opacity: 0, y: 40, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.features-section__grid',
            start: 'top 85%',
            once: true,
          },
        }
      );

      // Floating orbs animation
      gsap.to('.features-section__orb--1', {
        x: 30,
        y: -20,
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      gsap.to('.features-section__orb--2', {
        x: -25,
        y: 15,
        duration: 10,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="features-section" id="why-us">
      {/* Background effects */}
      <div className="features-section__bg">
        <div className="features-section__gradient" />
        <div className="features-section__noise" />
        <div className="features-section__orb features-section__orb--1" />
        <div className="features-section__orb features-section__orb--2" />
        <div className="features-section__grid-lines" />
      </div>

      <div className="features-section__container">
        {/* Header */}
        <div className="features-section__header">
          <div className="features-section__label">
            <span className="features-section__label-dot" />
            <span>Por qué elegirnos</span>
          </div>
          <h2 className="features-section__title">
            Tecnología que impulsa<br />
            <span className="features-section__title-gradient">resultados reales</span>
          </h2>
          <p className="features-section__subtitle">
            Combinamos inteligencia artificial con expertise humano para crear
            soluciones digitales que superan expectativas.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="features-section__grid">
          {features.map((feature, index) => (
            <div
              key={feature.id}
              className={`features-section__card ${hoveredCard === index ? 'is-hovered' : ''}`}
              style={{ '--card-color': feature.color }}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Card glow */}
              <div className="features-section__card-glow" />

              {/* Card content */}
              <div className="features-section__card-inner">
                {/* Icon */}
                <div className="features-section__card-icon">
                  {icons[feature.icon]}
                </div>

                {/* Text */}
                <h3 className="features-section__card-title">{feature.title}</h3>
                <p className="features-section__card-description">{feature.description}</p>

                {/* Metric */}
                <div className="features-section__card-metric">
                  <span className="features-section__card-metric-value">{feature.metric}</span>
                  <span className="features-section__card-metric-label">{feature.metricLabel}</span>
                </div>

                {/* Hover arrow */}
                <div className="features-section__card-arrow">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M7 17L17 7M17 7H7M17 7V17"/>
                  </svg>
                </div>
              </div>

              {/* Border gradient */}
              <div className="features-section__card-border" />
            </div>
          ))}
        </div>

        {/* Bottom section */}
        <div className="features-section__bottom">
          <div className="features-section__stats">
            <div className="features-section__stat">
              <span className="features-section__stat-number">300+</span>
              <span className="features-section__stat-label">Proyectos entregados</span>
            </div>
            <div className="features-section__stat-divider" />
            <div className="features-section__stat">
              <span className="features-section__stat-number">98%</span>
              <span className="features-section__stat-label">Clientes satisfechos</span>
            </div>
            <div className="features-section__stat-divider" />
            <div className="features-section__stat">
              <span className="features-section__stat-number">5+</span>
              <span className="features-section__stat-label">Años de experiencia</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
