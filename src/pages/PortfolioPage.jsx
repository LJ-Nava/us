import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Importar imágenes de Romelima
import romelima1 from '../assets/Romelima/1.png';
import romelima2 from '../assets/Romelima/2.png';
import romelima3 from '../assets/Romelima/3.png';
import romelima4 from '../assets/Romelima/4.png';
import romelima5 from '../assets/Romelima/5.png';

// Importar imágenes de Lavadero
import lavadero1 from '../assets/CrackenLavadero/1.png';
import lavadero2 from '../assets/CrackenLavadero/2.png';
import lavadero3 from '../assets/CrackenLavadero/3.png';
import lavadero4 from '../assets/CrackenLavadero/4.png';
import lavadero5 from '../assets/CrackenLavadero/5.png';
import lavadero6 from '../assets/CrackenLavadero/6.png';

// Importar imágenes de Construcciones
import construcciones1 from '../assets/Consturcciones/1.png';
import construcciones2 from '../assets/Consturcciones/2.png';
import construcciones3 from '../assets/Consturcciones/3.png';
import construcciones4 from '../assets/Consturcciones/4.png';
import construcciones5 from '../assets/Consturcciones/5.png';
import construcciones6 from '../assets/Consturcciones/6.png';
import construcciones7 from '../assets/Consturcciones/7.png';
import construcciones8 from '../assets/Consturcciones/8.png';

// Importar imágenes de Motive
import motive1 from '../assets/motive/1.png';
import motive2 from '../assets/motive/2.png';
import motive3 from '../assets/motive/3.png';
import motive4 from '../assets/motive/4.png';
import motive5 from '../assets/motive/5.png';
import motive6 from '../assets/motive/6.png';
import motive7 from '../assets/motive/7.png';

// Importar imágenes de NeuroFys
import neuro1 from '../assets/neuro/1.png';
import neuro2 from '../assets/neuro/2.png';
import neuro3 from '../assets/neuro/3.png';
import neuro4 from '../assets/neuro/4.png';
import neuro5 from '../assets/neuro/5.png';
import neuro6 from '../assets/neuro/6.png';
import neuro7 from '../assets/neuro/7.png';

// Importar imágenes de Physica
import physica1 from '../assets/Physuca/1.png';
import physica2 from '../assets/Physuca/2.png';
import physica3 from '../assets/Physuca/3.png';
import physica4 from '../assets/Physuca/4.png';
import physica5 from '../assets/Physuca/5.png';

// Importar imágenes de Clinify Barber
import clinify1 from '../assets/clinify/1.png';
import clinify2 from '../assets/clinify/2.png';
import clinify3 from '../assets/clinify/3.png';
import clinify4 from '../assets/clinify/4.png';
import clinify5 from '../assets/clinify/5.png';
import clinify6 from '../assets/clinify/6.png';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 1,
    title: 'Romelima',
    category: 'Restaurante',
    description: 'Gastronomía peruana auténtica con un diseño elegante que captura la esencia culinaria de Lima.',
    url: 'https://lj-nava.github.io/Romelima/',
    images: [romelima1, romelima2, romelima3, romelima4, romelima5],
    color: '#9b2335',
    tags: ['UI/UX', 'Menú Digital', 'Reservaciones']
  },
  {
    id: 2,
    title: 'El Cracker RYD',
    category: 'Lavadero Premium',
    description: 'Lavado de autos premium con sistema de reservas y precios dinámicos por tipo de vehículo.',
    url: 'https://lj-nava.github.io/lavadero/',
    images: [lavadero1, lavadero2, lavadero3, lavadero4, lavadero5, lavadero6],
    color: '#ef4444',
    tags: ['Sistema de Precios', 'Reservas', 'Promociones']
  },
  {
    id: 3,
    title: 'Construcciones El Cracker',
    category: 'Constructora',
    description: 'Empresa de construcción premium con galería de proyectos y sistema de cotización integral.',
    url: 'https://lj-nava.github.io/cracker-web/',
    images: [construcciones1, construcciones2, construcciones3, construcciones4, construcciones5, construcciones6, construcciones7, construcciones8],
    color: '#d4a855',
    tags: ['Corporativo', 'Galería', 'Cotizador']
  },
  {
    id: 4,
    title: 'Motive Homecare',
    category: 'Healthcare',
    description: 'Plataforma de staffing médico conectando agencias de salud con profesionales de terapia.',
    url: 'https://lj-nava.github.io/motive/',
    images: [motive1, motive2, motive3, motive4, motive5, motive6, motive7],
    color: '#f97316',
    tags: ['Staffing', 'Healthcare', 'B2B']
  },
  {
    id: 5,
    title: 'NeuroFys Y',
    category: 'SaaS / EMR',
    description: 'Sistema EMR con IA para clínicas de terapia. Notas clínicas automatizadas y gestión integral.',
    url: 'https://lj-nava.github.io/Health/',
    images: [neuro1, neuro2, neuro3, neuro4, neuro5, neuro6, neuro7],
    color: '#3b82f6',
    tags: ['AI', 'EMR', 'HIPAA Compliant']
  },
  {
    id: 6,
    title: 'Physica Inc',
    category: 'Clínica',
    description: 'Centro de fisioterapia con sistema de citas, servicios especializados y testimonios de pacientes.',
    url: 'https://lj-nava.github.io/PhysicaInc/',
    images: [physica1, physica2, physica3, physica4, physica5],
    color: '#6b7b5c',
    tags: ['Citas Online', 'Servicios', 'Testimonios']
  },
  {
    id: 7,
    title: 'Clinify Barbershop',
    category: 'Barbería Premium',
    description: 'Barbería de lujo con sistema de reservas, galería de estilos y equipo de barberos profesionales.',
    url: 'https://lj-nava.github.io/barber/',
    images: [clinify1, clinify2, clinify3, clinify4, clinify5, clinify6],
    color: '#ca9d3b',
    tags: ['Reservas', 'Galería', 'Premium']
  }
];

// Componente de carrusel de imágenes
const ImageCarousel = ({ images, title, isHovered }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isHovered && images.length > 1) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
      }, 1200);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      setCurrentIndex(0);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isHovered, images.length]);

  return (
    <div className="portfolio-page__carousel">
      {images.map((img, idx) => (
        <div
          key={idx}
          className={`portfolio-page__carousel-slide ${idx === currentIndex ? 'is-active' : ''}`}
        >
          <img
            src={img}
            alt={`${title} - Vista ${idx + 1}`}
            loading="lazy"
          />
        </div>
      ))}

      {images.length > 1 && (
        <div className="portfolio-page__carousel-dots">
          {images.map((_, idx) => (
            <span
              key={idx}
              className={`portfolio-page__carousel-dot ${idx === currentIndex ? 'is-active' : ''}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

// Componente de tarjeta de proyecto
const ProjectCard = ({ project }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      className="portfolio-page__card"
      style={{ '--card-color': project.color }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="portfolio-page__browser">
        <div className="portfolio-page__browser-header">
          <div className="portfolio-page__browser-dots">
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div className="portfolio-page__browser-url">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
              <path d="M7 11V7a5 5 0 0110 0v4"></path>
            </svg>
            <span>{project.url.replace('https://', '')}</span>
          </div>
        </div>

        <div className="portfolio-page__screenshot-wrapper">
          <ImageCarousel
            images={project.images}
            title={project.title}
            isHovered={isHovered}
          />
          <div className="portfolio-page__overlay"></div>
        </div>
      </div>

      <div className="portfolio-page__card-content">
        <div className="portfolio-page__card-header">
          <span className="portfolio-page__card-category">{project.category}</span>
          <div className="portfolio-page__card-link-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"></path>
              <polyline points="15 3 21 3 21 9"></polyline>
              <line x1="10" y1="14" x2="21" y2="3"></line>
            </svg>
          </div>
        </div>

        <h3 className="portfolio-page__card-title">{project.title}</h3>
        <p className="portfolio-page__card-description">{project.description}</p>

        <div className="portfolio-page__card-tags">
          {project.tags.map((tag, i) => (
            <span key={i} className="portfolio-page__card-tag">{tag}</span>
          ))}
        </div>
      </div>

      <div className="portfolio-page__card-glow"></div>
    </a>
  );
};

const PortfolioPage = () => {
  const heroRef = useRef(null);
  const gridRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    const ctx = gsap.context(() => {
      // Animación del hero
      gsap.fromTo(
        '.portfolio-page__hero-content > *',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.15,
          ease: 'power3.out',
          delay: 0.3
        }
      );

      // Animación de todas las tarjetas a la vez
      gsap.fromTo(
        '.portfolio-page__card',
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          delay: 0.5
        }
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="portfolio-page">
      <section className="portfolio-page__hero" ref={heroRef}>
        <div className="portfolio-page__hero-bg">
          <div className="portfolio-page__hero-orb portfolio-page__hero-orb--1"></div>
          <div className="portfolio-page__hero-orb portfolio-page__hero-orb--2"></div>
          <div className="portfolio-page__hero-grid"></div>
        </div>

        <div className="portfolio-page__hero-content">
          <Link to="/" className="portfolio-page__back">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5"></path>
              <path d="M12 19l-7-7 7-7"></path>
            </svg>
            <span>Volver al inicio</span>
          </Link>

          <span className="portfolio-page__eyebrow">
            <span className="portfolio-page__eyebrow-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
                <path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16"/>
              </svg>
            </span>
            Nuestro Portfolio
          </span>

          <h1 className="portfolio-page__title">
            Proyectos que <span className="portfolio-page__title-highlight">transforman</span> negocios
          </h1>

          <p className="portfolio-page__subtitle">
            Cada proyecto es una historia de éxito. Diseños premium, experiencias memorables y resultados medibles para nuestros clientes.
          </p>

          <div className="portfolio-page__stats">
            <div className="portfolio-page__stat">
              <span className="portfolio-page__stat-value">7+</span>
              <span className="portfolio-page__stat-label">Proyectos</span>
            </div>
            <div className="portfolio-page__stat-divider"></div>
            <div className="portfolio-page__stat">
              <span className="portfolio-page__stat-value">100%</span>
              <span className="portfolio-page__stat-label">Satisfacción</span>
            </div>
            <div className="portfolio-page__stat-divider"></div>
            <div className="portfolio-page__stat">
              <span className="portfolio-page__stat-value">5+</span>
              <span className="portfolio-page__stat-label">Industrias</span>
            </div>
          </div>
        </div>
      </section>

      <section className="portfolio-page__projects">
        <div className="portfolio-page__container">
          <div className="portfolio-page__grid">
            {projects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>

          <div className="portfolio-page__cta">
            <div className="portfolio-page__cta-content">
              <h2 className="portfolio-page__cta-title">
                ¿Listo para crear algo increíble?
              </h2>
              <p className="portfolio-page__cta-text">
                Tu proyecto podría ser el próximo en esta galería. Hablemos sobre cómo podemos transformar tu visión en realidad.
              </p>
              <Link to="/#contacto" className="portfolio-page__cta-button">
                <span>Iniciar mi proyecto</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14"></path>
                  <path d="m12 5 7 7-7 7"></path>
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PortfolioPage;
