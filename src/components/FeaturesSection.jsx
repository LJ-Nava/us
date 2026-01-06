import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Features3DBackground from './Features3DBackground';

gsap.registerPlugin(ScrollTrigger);

/**
 * FeaturesSection - Por qué elegirnos
 * Diseño elegante con elementos visuales cautivadores
 */
const FeaturesSection = () => {
  const sectionRef = useRef(null);
  const [activeFeature, setActiveFeature] = useState(null);

  const features = [
    {
      id: 1,
      number: '01',
      title: 'Inteligencia Artificial',
      description: 'Nuestro motor NEXUS optimiza cada línea de código, acelerando el desarrollo sin comprometer la calidad.',
      highlight: 'Desarrollo 3x más rápido',
      color: 'cyan',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
    },
    {
      id: 2,
      number: '02',
      title: 'Metodología Ágil',
      description: 'Sprints semanales, entregas incrementales y comunicación constante. Tu proyecto avanza cada día.',
      highlight: 'Entregas semanales',
      color: 'amber',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
    },
    {
      id: 3,
      number: '03',
      title: 'Diseño Estratégico',
      description: 'Cada decisión de diseño está respaldada por datos. Interfaces que convierten visitantes en clientes.',
      highlight: '+40% conversión promedio',
      color: 'emerald',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="12" r="10"/>
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
          <path d="M2 12h20"/>
        </svg>
      ),
    },
    {
      id: 4,
      number: '04',
      title: 'Código de Calidad',
      description: 'Arquitectura escalable, tests automatizados y documentación completa. Tu inversión está protegida.',
      highlight: '100% mantenible',
      color: 'violet',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        '.features-section__header > *',
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out',
          scrollTrigger: { trigger: '.features-section__header', start: 'top 80%', once: true },
        }
      );

      // Cards stagger animation
      gsap.fromTo(
        '.features-section__card',
        { opacity: 0, y: 50, scale: 0.95 },
        {
          opacity: 1, y: 0, scale: 1, duration: 0.7, stagger: 0.12, ease: 'power3.out',
          scrollTrigger: { trigger: '.features-section__grid', start: 'top 80%', once: true },
        }
      );

      // Stats animation
      gsap.fromTo(
        '.features-section__stat-item',
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power2.out',
          scrollTrigger: { trigger: '.features-section__footer', start: 'top 90%', once: true },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="features-section" id="why-us">
      {/* 3D Geometric Background */}
      <Features3DBackground />

      {/* Ambient background elements */}
      <div className="features-section__ambient">
        <div className="features-section__orb features-section__orb--1" />
        <div className="features-section__orb features-section__orb--2" />
      </div>

      <div className="features-section__container">
        {/* Header */}
        <div className="features-section__header">
          <span className="features-section__eyebrow">
            <span className="features-section__eyebrow-line" />
            Por qué elegirnos
          </span>
          <h2 className="features-section__title">
            Construimos productos digitales
            <span className="features-section__title-highlight"> que generan resultados</span>
          </h2>
          <p className="features-section__subtitle">
            Combinamos tecnología de vanguardia con estrategia de negocio para crear soluciones que impulsan tu crecimiento.
          </p>
        </div>

        {/* Features Grid */}
        <div className="features-section__grid">
          {features.map((feature) => (
            <article
              key={feature.id}
              className={`features-section__card features-section__card--${feature.color} ${activeFeature === feature.id ? 'is-active' : ''}`}
              onMouseEnter={() => setActiveFeature(feature.id)}
              onMouseLeave={() => setActiveFeature(null)}
            >
              {/* Shine effect on hover */}
              <div className="features-section__card-shine" />

              {/* Card border gradient */}
              <div className="features-section__card-border" />

              {/* Card content */}
              <div className="features-section__card-inner">
                <div className="features-section__card-header">
                  <div className="features-section__card-icon">
                    <div className="features-section__card-icon-glow" />
                    {feature.icon}
                  </div>
                  <span className="features-section__card-number">{feature.number}</span>
                </div>

                <h3 className="features-section__card-title">{feature.title}</h3>
                <p className="features-section__card-description">{feature.description}</p>

                <div className="features-section__card-footer">
                  <span className="features-section__card-highlight">
                    <span className="features-section__card-highlight-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                    </span>
                    {feature.highlight}
                  </span>
                  <span className="features-section__card-arrow">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M7 17L17 7M17 7H7M17 7V17"/>
                    </svg>
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Footer Stats */}
        <div className="features-section__footer">
          <div className="features-section__stats-row">
            <div className="features-section__stat-item">
              <span className="features-section__stat-value">300+</span>
              <span className="features-section__stat-label">Proyectos entregados</span>
            </div>
            <div className="features-section__stat-divider" />
            <div className="features-section__stat-item">
              <span className="features-section__stat-value">98%</span>
              <span className="features-section__stat-label">Clientes satisfechos</span>
            </div>
            <div className="features-section__stat-divider" />
            <div className="features-section__stat-item">
              <span className="features-section__stat-value">5+</span>
              <span className="features-section__stat-label">Años de experiencia</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
