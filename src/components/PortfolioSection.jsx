import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 1,
    title: 'Rome Lima',
    category: 'Marca Personal',
    url: 'https://plexifystudio-projects.github.io/Project-Restaurante/',
    screenshot: 'https://image.thum.io/get/width/1200/crop/1800/https://plexifystudio-projects.github.io/Project-Restaurante/',
    color: '#6366f1'
  },
  {
    id: 2,
    title: 'Lavadero Premium',
    category: 'Negocio Local',
    url: 'https://plexifystudio-projects.github.io/Projects-Lavadero/',
    screenshot: 'https://image.thum.io/get/width/1200/crop/1800/https://plexifystudio-projects.github.io/Projects-Lavadero/',
    color: '#06b6d4'
  },
  {
    id: 3,
    title: 'Cracker Web',
    category: 'E-commerce',
    url: 'https://plexifystudio-projects.github.io/Proyect-Construcciones/',
    screenshot: 'https://image.thum.io/get/width/1200/crop/1800/https://plexifystudio-projects.github.io/Proyect-Construcciones/',
    color: '#f59e0b'
  },
  {
    id: 4,
    title: 'Motive',
    category: 'Startup',
    url: 'https://lj-nava.github.io/motive/',
    screenshot: 'https://image.thum.io/get/width/1200/crop/1800/https://lj-nava.github.io/motive/',
    color: '#10b981'
  },
  {
    id: 5,
    title: 'Health Care',
    category: 'Salud',
    url: 'https://plexifystudio-projects.github.io/Projects-Clinify/',
    screenshot: 'https://image.thum.io/get/width/1200/crop/1800/https://plexifystudio-projects.github.io/Projects-Clinify/',
    color: '#ec4899'
  },
  {
    id: 6,
    title: 'Physica Inc',
    category: 'Corporativo',
    url: 'https://plexifystudio-projects.github.io/Project-Physica/',
    screenshot: 'https://image.thum.io/get/width/1200/crop/1800/https://plexifystudio-projects.github.io/Project-Physica/',
    color: '#8b5cf6'
  },
  {
    id: 7,
    title: 'Barber Shop',
    category: 'Negocio Local',
    url: 'https://plexifystudio-projects.github.io/Project-Barber/',
    screenshot: 'https://image.thum.io/get/width/1200/crop/1800/https://plexifystudio-projects.github.io/Project-Barber/',
    color: '#f97316'
  }
];

// Componente de tarjeta individual con manejo de imagen
const PortfolioCard = ({ project, index, cardRef }) => {
  const [imageStatus, setImageStatus] = useState('loading');

  return (
    <a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      className="portfolio-section__card"
      ref={cardRef}
      style={{ '--card-color': project.color }}
    >
      {/* Browser Frame */}
      <div className="portfolio-section__browser">
        <div className="portfolio-section__browser-header">
          <div className="portfolio-section__browser-dots">
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div className="portfolio-section__browser-url">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.35-4.35"></path>
            </svg>
            <span>{project.url.replace('https://', '')}</span>
          </div>
        </div>

        {/* Screenshot Container with Scroll Effect */}
        <div className="portfolio-section__screenshot-wrapper">
          {/* Loading Skeleton */}
          {imageStatus === 'loading' && (
            <div className="portfolio-section__skeleton">
              <div className="portfolio-section__skeleton-shimmer"></div>
            </div>
          )}

          {/* Fallback Placeholder */}
          {imageStatus === 'error' && (
            <div className="portfolio-section__placeholder" style={{ '--accent': project.color }}>
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <circle cx="8.5" cy="8.5" r="1.5"></circle>
                <polyline points="21 15 16 10 5 21"></polyline>
              </svg>
              <span>{project.title}</span>
            </div>
          )}

          {/* Actual Screenshot */}
          <div className={`portfolio-section__screenshot ${imageStatus === 'loaded' ? 'is-visible' : ''}`}>
            <img
              src={project.screenshot}
              alt={`Preview de ${project.title}`}
              loading="lazy"
              onLoad={() => setImageStatus('loaded')}
              onError={() => setImageStatus('error')}
            />
          </div>

          {/* Overlay gradient */}
          <div className="portfolio-section__overlay"></div>
        </div>
      </div>

      {/* Card Info */}
      <div className="portfolio-section__card-info">
        <span className="portfolio-section__card-category">{project.category}</span>
        <h3 className="portfolio-section__card-title">{project.title}</h3>
        <div className="portfolio-section__card-link">
          <span>Ver proyecto</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M7 17L17 7"></path>
            <path d="M7 7h10v10"></path>
          </svg>
        </div>
      </div>

      {/* Glow effect */}
      <div className="portfolio-section__card-glow"></div>
    </a>
  );
};

const PortfolioSection = () => {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            once: true
          }
        }
      );

      // Cards stagger animation
      gsap.fromTo(
        cardsRef.current,
        { opacity: 0, y: 60, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            once: true
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="portfolio-section" ref={sectionRef} id="portfolio">
      {/* Background Effects */}
      <div className="portfolio-section__ambient">
        <div className="portfolio-section__orb portfolio-section__orb--1"></div>
        <div className="portfolio-section__orb portfolio-section__orb--2"></div>
      </div>

      <div className="portfolio-section__container">
        {/* Header */}
        <div className="portfolio-section__header" ref={headerRef}>
          <span className="portfolio-section__eyebrow">
            <span className="portfolio-section__eyebrow-line"></span>
            Nuestro Trabajo
            <span className="portfolio-section__eyebrow-line"></span>
          </span>
          <h2 className="portfolio-section__title">
            Proyectos que <span className="portfolio-section__title-highlight">inspiran</span>
          </h2>
          <p className="portfolio-section__subtitle">
            Cada proyecto es una historia de transformación digital. Explora nuestro trabajo y descubre cómo ayudamos a negocios a destacar.
          </p>
        </div>

        {/* Portfolio Grid */}
        <div className="portfolio-section__grid">
          {projects.map((project, index) => (
            <PortfolioCard
              key={project.id}
              project={project}
              index={index}
              cardRef={(el) => (cardsRef.current[index] = el)}
            />
          ))}
        </div>

        {/* CTA */}
        <div className="portfolio-section__cta">
          <p className="portfolio-section__cta-text">
            ¿Quieres ver tu proyecto aquí?
          </p>
          <a href="#contacto" className="portfolio-section__cta-button">
            <span>Comencemos tu proyecto</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14"></path>
              <path d="m12 5 7 7-7 7"></path>
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
