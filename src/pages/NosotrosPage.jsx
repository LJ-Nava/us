import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Globe3D from '../components/Globe3D';
import AboutSection from '../components/AboutSection';
import ProcessSection from '../components/ProcessSection';
import BlogSection from '../components/BlogSection';
import ContactSection from '../components/ContactSection';

gsap.registerPlugin(ScrollTrigger);

// Animated Counter Hook - loads immediately on mount
const useCounter = (end, duration = 2) => {
  const [count, setCount] = useState(0);
  const countRef = useRef(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const obj = { value: 0 };
      gsap.to(obj, {
        value: end,
        duration,
        ease: 'power2.out',
        onUpdate: () => setCount(Math.floor(obj.value)),
      });
    }, 800); // Small delay for visual effect after page load

    return () => clearTimeout(timeout);
  }, [end, duration]);

  return [count, countRef];
};

/**
 * NosotrosPage - Premium About Us page
 * With unique sophisticated animations
 */
const NosotrosPage = () => {
  const pageRef = useRef(null);
  const heroRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Counters - load immediately
  const [count1, ref1] = useCounter(8, 1.5);
  const [count2, ref2] = useCounter(300, 2);
  const [count3, ref3] = useCounter(98, 2.5);
  const [count4, ref4] = useCounter(5, 1.5);

  useEffect(() => {
    setIsLoaded(true);

    const ctx = gsap.context(() => {
      // Hero text reveal animation
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

      // Label slide in
      tl.fromTo('.nosotros-hero__label',
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8 }
      )
      // Title words stagger with clip reveal
      .fromTo('.nosotros-hero__title-word',
        {
          y: 100,
          opacity: 0,
          rotationX: -80,
          transformOrigin: '50% 100%'
        },
        {
          y: 0,
          opacity: 1,
          rotationX: 0,
          duration: 1.2,
          stagger: 0.12,
          ease: 'power4.out'
        },
        '-=0.4'
      )
      // Subtitle fade up
      .fromTo('.nosotros-hero__subtitle',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        '-=0.6'
      )
      // Metrics line draw
      .fromTo('.nosotros-hero__metrics-line',
        { scaleX: 0 },
        { scaleX: 1, duration: 1, ease: 'power2.inOut' },
        '-=0.4'
      )
      // Metrics stagger
      .fromTo('.nosotros-hero__metric',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.15 },
        '-=0.5'
      )
      // Scroll indicator
      .fromTo('.nosotros-hero__scroll',
        { opacity: 0 },
        { opacity: 1, duration: 0.6 },
        '-=0.2'
      );

      // Parallax effect on scroll
      gsap.to('.nosotros-hero__bg-orb', {
        y: -100,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      });

      gsap.to('.nosotros-hero__bg-orb--2', {
        y: -150,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.5,
        },
      });

    }, pageRef);

    return () => ctx.revert();
  }, []);

  const metrics = [
    { value: count1, label: 'Expertos creativos', suffix: '', ref: ref1 },
    { value: count2, label: 'Proyectos entregados', suffix: '+', ref: ref2 },
    { value: count3, label: 'Clientes satisfechos', suffix: '%', ref: ref3 },
    { value: count4, label: 'Años de experiencia', suffix: '+', ref: ref4 },
  ];

  return (
    <div ref={pageRef} className="nosotros-page">
      {/* Premium Hero with 3D Globe */}
      <section ref={heroRef} className="nosotros-hero">
        {/* Clean gradient background */}
        <div className="nosotros-hero__bg">
          <div className="nosotros-hero__gradient-bg" />
          <div className="nosotros-hero__glow nosotros-hero__glow--1" />
          <div className="nosotros-hero__glow nosotros-hero__glow--2" />
        </div>

        <div className="nosotros-hero__container nosotros-hero__container--split">
          {/* Left side - Content */}
          <div className="nosotros-hero__content">
            <span className="nosotros-hero__label">
              <span className="nosotros-hero__label-line" />
              Sobre nosotros
            </span>

            <h1 className="nosotros-hero__title">
              <span className="nosotros-hero__title-line">
                <span className="nosotros-hero__title-word">Construimos</span>
              </span>
              <span className="nosotros-hero__title-line">
                <span className="nosotros-hero__title-word">productos digitales</span>
              </span>
              <span className="nosotros-hero__title-line">
                <span className="nosotros-hero__title-word nosotros-hero__title-word--accent">excepcionales</span>
              </span>
            </h1>

            <p className="nosotros-hero__subtitle">
              Somos un equipo multidisciplinario de diseñadores, desarrolladores
              y estrategas digitales con presencia en USA, Colombia y Chile.
              Creamos soluciones que impulsan el crecimiento de negocios ambiciosos.
            </p>

            {/* Metrics with animated counters */}
            <div className="nosotros-hero__metrics">
              <div className="nosotros-hero__metrics-line" />
              {metrics.map((metric, i) => (
                <div key={i} className="nosotros-hero__metric" ref={metric.ref}>
                  <span className="nosotros-hero__metric-value">
                    {metric.value}
                    <span className="nosotros-hero__metric-suffix">{metric.suffix}</span>
                  </span>
                  <span className="nosotros-hero__metric-label">{metric.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right side - 3D Globe */}
          <div className="nosotros-hero__globe-wrapper">
            <Globe3D />
            <div className="nosotros-hero__globe-label">
              <span className="nosotros-hero__globe-label-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
                </svg>
              </span>
              Presencia Global
            </div>
          </div>
        </div>

        {/* Animated scroll indicator */}
        <div className="nosotros-hero__scroll">
          <span className="nosotros-hero__scroll-text">Scroll</span>
          <div className="nosotros-hero__scroll-track">
            <div className="nosotros-hero__scroll-thumb" />
          </div>
        </div>
      </section>

      <AboutSection />
      <ProcessSection />
      <BlogSection />
      <ContactSection />
    </div>
  );
};

export default NosotrosPage;
