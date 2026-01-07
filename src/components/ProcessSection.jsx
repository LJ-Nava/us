import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * ProcessSection - Nuestro Proceso
 * How we work - step by step workflow
 */
const ProcessSection = () => {
  const sectionRef = useRef(null);
  const timelineRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        '.process-section__header > *',
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

      // Steps animation
      gsap.fromTo(
        '.process-section__step',
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.process-section__steps',
            start: 'top 80%',
            once: true,
          },
        }
      );

      // Timeline line animation
      gsap.fromTo(
        '.process-section__timeline-progress',
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 1.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.process-section__steps',
            start: 'top 70%',
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const steps = [
    {
      number: '01',
      title: 'Descubrimiento',
      description: 'Conocemos tu negocio, objetivos y audiencia. Analizamos tu competencia y definimos la estrategia perfecta para tu proyecto.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="11" cy="11" r="8"/>
          <path d="M21 21l-4.35-4.35"/>
          <path d="M11 8v6M8 11h6"/>
        </svg>
      ),
      duration: '1-2 dias',
    },
    {
      number: '02',
      title: 'Planificacion',
      description: 'Creamos wireframes, definimos la arquitectura y establecemos los hitos del proyecto. Todo documentado y aprobado por ti.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/>
        </svg>
      ),
      duration: '2-3 dias',
    },
    {
      number: '03',
      title: 'Diseno UI/UX',
      description: 'Diseamos interfaces visuales impactantes y experiencias de usuario intuitivas. Iteramos hasta lograr la perfeccion.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="3" y="3" width="18" height="18" rx="2"/>
          <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor"/>
          <path d="M21 15l-5-5L5 21"/>
        </svg>
      ),
      duration: '5-7 dias',
    },
    {
      number: '04',
      title: 'Desarrollo',
      description: 'Transformamos los disenos en codigo limpio y optimizado. Usamos las mejores tecnologias del mercado.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <polyline points="16 18 22 12 16 6"/>
          <polyline points="8 6 2 12 8 18"/>
          <line x1="12" y1="2" x2="12" y2="22"/>
        </svg>
      ),
      duration: '2-4 semanas',
    },
    {
      number: '05',
      title: 'Testing & QA',
      description: 'Probamos exhaustivamente en todos los dispositivos y navegadores. Cada bug se corrige antes del lanzamiento.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M9 11l3 3L22 4"/>
          <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/>
        </svg>
      ),
      duration: '2-3 dias',
    },
    {
      number: '06',
      title: 'Lanzamiento',
      description: 'Desplegamos tu proyecto en produccion con todas las optimizaciones. Te capacitamos para que puedas gestionarlo.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M22 2L11 13"/>
          <path d="M22 2L15 22l-4-9-9-4 20-7z"/>
        </svg>
      ),
      duration: '1 dia',
    },
  ];

  return (
    <section ref={sectionRef} className="process-section" id="proceso">
      <div className="process-section__container">
        {/* Header */}
        <div className="process-section__header">
          <span className="process-section__badge">Nuestro Proceso</span>
          <h2 className="process-section__title">
            De la idea al<br />
            <span className="process-section__title-gradient">lanzamiento</span>
          </h2>
          <p className="process-section__description">
            Un proceso transparente y colaborativo donde tu participas en cada decision.
            Sin sorpresas, sin retrasos, solo resultados excepcionales.
          </p>
        </div>

        {/* Steps */}
        <div className="process-section__steps" ref={timelineRef}>
          <div className="process-section__timeline">
            <div className="process-section__timeline-line" />
            <div className="process-section__timeline-progress" />
          </div>

          {steps.map((step, index) => (
            <div key={index} className="process-section__step">
              <div className="process-section__step-marker">
                <span className="process-section__step-number">{step.number}</span>
                <div className="process-section__step-dot" />
              </div>

              <div className="process-section__step-content">
                <div className="process-section__step-icon">
                  {step.icon}
                </div>
                <div className="process-section__step-info">
                  <h3 className="process-section__step-title">{step.title}</h3>
                  <p className="process-section__step-description">{step.description}</p>
                  <span className="process-section__step-duration">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"/>
                      <path d="M12 6v6l4 2"/>
                    </svg>
                    {step.duration}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="process-section__cta">
          <p>Listo para comenzar?</p>
          <a href="#contacto" className="process-section__cta-button">
            <span>Iniciar mi proyecto</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
