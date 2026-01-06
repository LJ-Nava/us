import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import Hero3DScene from './Hero3DScene';
import Typewriter from './Typewriter';

/**
 * Hero Section Premium - Nivel Awwwards
 * Combina escena 3D con contenido animado
 */
const HeroSection = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const statsRef = useRef(null);
  const [counters, setCounters] = useState({ projects: 0, clients: 0, years: 0 });

  const heroWords = [
    'cobra vida.',
    'se hace realidad.',
    'toma forma.',
    'empieza aquí.',
    'evoluciona.'
  ];

  // Animaciones de entrada con GSAP
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.5 });

      // Badge
      tl.fromTo(
        '.hero__badge',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
      );

      // Título línea por línea
      tl.fromTo(
        '.hero__title-line',
        { y: 60, opacity: 0, rotationX: -15 },
        { y: 0, opacity: 1, rotationX: 0, duration: 1, ease: 'power3.out' },
        '-=0.4'
      );

      tl.fromTo(
        '.hero__title-dynamic',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
        '-=0.6'
      );

      // Subtítulo
      tl.fromTo(
        '.hero__subtitle',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
        '-=0.4'
      );

      // Botones
      tl.fromTo(
        '.hero__buttons',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
        '-=0.4'
      );

      // Stats con stagger
      tl.fromTo(
        '.hero__stat',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.15, ease: 'power3.out' },
        '-=0.3'
      );

      // Scroll indicator
      tl.fromTo(
        '.hero__scroll',
        { opacity: 0 },
        { opacity: 1, duration: 1, ease: 'power2.out' },
        '-=0.2'
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Counter animation para stats
  useEffect(() => {
    const animateCounter = (key, target, duration = 2000) => {
      const startTime = Date.now();
      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // Easing
        const eased = 1 - Math.pow(1 - progress, 3);
        setCounters(prev => ({
          ...prev,
          [key]: Math.floor(target * eased)
        }));

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      animate();
    };

    // Iniciar después del delay de animación
    const timeout = setTimeout(() => {
      animateCounter('projects', 50, 2000);
      animateCounter('clients', 30, 2000);
      animateCounter('years', 5, 1500);
    }, 1500);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <section ref={sectionRef} className="hero" id="inicio">
      {/* Escena 3D de fondo */}
      <div className="hero__3d-container">
        <Hero3DScene />
      </div>

      {/* Gradientes decorativos */}
      <div className="hero__gradients">
        <div className="hero__gradient hero__gradient--1" />
        <div className="hero__gradient hero__gradient--2" />
        <div className="hero__gradient hero__gradient--3" />
      </div>

      {/* Grid de puntos decorativo */}
      <div className="hero__grid-pattern" />

      {/* Noise texture overlay */}
      <div className="hero__noise" />

      {/* Floating Accents */}
      <div className="hero__accents">
        <span className="hero__accent hero__accent--dot hero__accent--1" />
        <span className="hero__accent hero__accent--dot hero__accent--2" />
        <span className="hero__accent hero__accent--dot hero__accent--3" />
        <span className="hero__accent hero__accent--cross hero__accent--4" />
        <span className="hero__accent hero__accent--cross hero__accent--5" />
        <span className="hero__accent hero__accent--line hero__accent--6" />
        <span className="hero__accent hero__accent--line hero__accent--7" />
        <span className="hero__accent hero__accent--ring hero__accent--8" />
      </div>

      {/* Contenido */}
      <div className="hero__container">
        <div className="hero__content">
          {/* Badge */}
          <div className="hero__badge">
            <span className="hero__badge-dot" />
            <span className="hero__badge-text">Bienvenido a J-Visual</span>
          </div>

          {/* Título */}
          <h1 ref={titleRef} className="hero__title">
            <span className="hero__title-line">Donde tu visión</span>
            <span className="hero__title-dynamic">
              <Typewriter
                words={heroWords}
                typeSpeed={80}
                deleteSpeed={40}
                pauseTime={2500}
              />
            </span>
          </h1>

          {/* Subtítulo */}
          <p ref={subtitleRef} className="hero__subtitle">
            Creamos experiencias digitales que transforman visitantes en clientes.
            Diseño premium, desarrollo de vanguardia, resultados excepcionales.
          </p>

          {/* Botones */}
          <div className="hero__buttons">
            <a href="#contacto" className="hero__cta" data-cursor data-cursor-text="Go">
              <span className="hero__cta-text">Iniciar proyecto</span>
              <span className="hero__cta-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </span>
              <span className="hero__cta-glow" />
            </a>
            <a href="#proyectos" className="hero__cta-secondary" data-cursor>
              <span>Ver proyectos</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M7 17L17 7M17 7H7M17 7V17"/>
              </svg>
            </a>
          </div>

          {/* Stats */}
          <div ref={statsRef} className="hero__stats">
            <div className="hero__stat">
              <div className="hero__stat-number">{counters.projects}<span>+</span></div>
              <div className="hero__stat-label">Proyectos entregados</div>
            </div>
            <div className="hero__stat">
              <div className="hero__stat-number">{counters.clients}<span>+</span></div>
              <div className="hero__stat-label">Clientes felices</div>
            </div>
            <div className="hero__stat">
              <div className="hero__stat-number">{counters.years}</div>
              <div className="hero__stat-label">Años de experiencia</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="hero__scroll">
        <span className="hero__scroll-text">Scroll</span>
        <div className="hero__scroll-line">
          <span className="hero__scroll-dot" />
        </div>
      </div>

      {/* Línea inferior decorativa */}
      <div className="hero__bottom-line" />
    </section>
  );
};

export default HeroSection;
