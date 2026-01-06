import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

/**
 * Header Premium - Nivel Awwwards
 * Inspirado en IgnemTech + Igloo Inc
 */
const Header = () => {
  const headerRef = useRef(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  // Efecto de scroll para cambiar el header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Animación de entrada
  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    gsap.fromTo(
      header,
      { y: -100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
        delay: 0.3
      }
    );

    // Animación de items del nav
    gsap.fromTo(
      '.header__nav-item',
      { y: -20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
        delay: 0.6
      }
    );
  }, []);

  // Efecto magnético en botones
  const handleMagneticMove = (e, element) => {
    const rect = element.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to(element, {
      x: x * 0.3,
      y: y * 0.3,
      duration: 0.3,
      ease: 'power2.out'
    });
  };

  const handleMagneticLeave = (element) => {
    gsap.to(element, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: 'elastic.out(1, 0.3)'
    });
  };

  const services = [
    {
      title: 'Diseño Web',
      desc: 'UI/UX de alta conversión',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="3" y="3" width="18" height="18" rx="2"/>
          <path d="M3 9h18M9 21V9"/>
        </svg>
      )
    },
    {
      title: 'Desarrollo',
      desc: 'React, Next.js, Node',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/>
        </svg>
      )
    },
    {
      title: 'E-Commerce',
      desc: 'Tiendas que convierten',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
          <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/>
        </svg>
      )
    },
    {
      title: 'Branding Digital',
      desc: 'Identidad que impacta',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
        </svg>
      )
    }
  ];

  return (
    <header
      ref={headerRef}
      className={`header ${isScrolled ? 'header--scrolled' : ''}`}
    >
      {/* Línea de brillo superior animada */}
      <div className="header__glow-line" />

      <div className="header__container">
        {/* Logo */}
        <a
          href="#"
          className="header__logo"
          data-cursor
          data-cursor-text="Inicio"
          onMouseMove={(e) => handleMagneticMove(e, e.currentTarget)}
          onMouseLeave={(e) => handleMagneticLeave(e.currentTarget)}
        >
          <div className="header__logo-mark">
            <span className="header__logo-letter">J</span>
            <span className="header__logo-letter header__logo-letter--accent">V</span>
            <div className="header__logo-glow" />
          </div>
          <div className="header__logo-info">
            <span className="header__logo-text">Visual</span>
            <span className="header__logo-tagline">Digital Agency</span>
          </div>
        </a>

        {/* Navegación Central */}
        <nav className="header__nav">
          <ul className="header__nav-list">
            {/* Inicio */}
            <li className="header__nav-item">
              <a href="#inicio" className="header__nav-link header__nav-link--active">
                <span className="header__nav-text">Inicio</span>
                <span className="header__nav-line" />
              </a>
            </li>

            {/* Servicios con dropdown */}
            <li
              className="header__nav-item header__nav-item--has-dropdown"
              onMouseEnter={() => setActiveDropdown('services')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <a href="#servicios" className="header__nav-link">
                <span className="header__nav-text">Servicios</span>
                <svg className="header__nav-arrow" viewBox="0 0 12 12" fill="none">
                  <path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className="header__nav-line" />
              </a>

              {/* Mega Dropdown */}
              <div className={`header__dropdown ${activeDropdown === 'services' ? 'header__dropdown--active' : ''}`}>
                <div className="header__dropdown-content">
                  <div className="header__dropdown-grid">
                    {services.map((service, i) => (
                      <a href="#" className="header__dropdown-item" key={i}>
                        <div className="header__dropdown-icon">
                          {service.icon}
                        </div>
                        <div className="header__dropdown-info">
                          <span className="header__dropdown-title">{service.title}</span>
                          <span className="header__dropdown-desc">{service.desc}</span>
                        </div>
                        <svg className="header__dropdown-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M5 12h14M12 5l7 7-7 7"/>
                        </svg>
                      </a>
                    ))}
                  </div>
                  {/* Decoración del dropdown */}
                  <div className="header__dropdown-decoration">
                    <div className="header__dropdown-blob" />
                  </div>
                </div>
              </div>
            </li>

            {/* Proyectos */}
            <li className="header__nav-item">
              <a href="#proyectos" className="header__nav-link">
                <span className="header__nav-text">Proyectos</span>
                <span className="header__nav-badge">12</span>
                <span className="header__nav-line" />
              </a>
            </li>

            {/* Nosotros */}
            <li className="header__nav-item">
              <a href="#nosotros" className="header__nav-link">
                <span className="header__nav-text">Nosotros</span>
                <span className="header__nav-line" />
              </a>
            </li>
          </ul>
        </nav>

        {/* Acciones */}
        <div className="header__actions">
          {/* Status de disponibilidad */}
          <div className="header__status">
            <span className="header__status-dot" />
            <span className="header__status-text">Disponible</span>
          </div>

          {/* CTA Principal con shimmer */}
          <a
            href="#contacto"
            className="header__cta"
            data-cursor
            data-cursor-text="Click"
            onMouseMove={(e) => handleMagneticMove(e, e.currentTarget)}
            onMouseLeave={(e) => handleMagneticLeave(e.currentTarget)}
          >
            <span className="header__cta-text">Hablemos</span>
            <span className="header__cta-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </span>
            <span className="header__cta-shimmer" />
          </a>

          {/* Toggle móvil */}
          <button className="header__menu-toggle" aria-label="Menú">
            <span className="header__menu-line" />
            <span className="header__menu-line" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
