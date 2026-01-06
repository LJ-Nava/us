import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import gsap from 'gsap';

/**
 * Header - Premium Complete Menu
 * Glass morphism + Animated icons + Full navigation
 */
const Header = () => {
  const headerRef = useRef(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    gsap.fromTo(header,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.2 }
    );

    gsap.fromTo('.header__nav-item',
      { y: -20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, stagger: 0.08, ease: 'power2.out', delay: 0.5 }
    );
  }, []);

  // Services dropdown items
  const services = [
    {
      title: 'Diseño Web',
      desc: 'Interfaces UI/UX premium',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="3" y="3" width="18" height="18" rx="2"/>
          <path d="M3 9h18M9 21V9"/>
        </svg>
      )
    },
    {
      title: 'Desarrollo Frontend',
      desc: 'React, Next.js, Vue',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/>
        </svg>
      )
    },
    {
      title: 'E-Commerce',
      desc: 'Tiendas online completas',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
          <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/>
        </svg>
      )
    },
    {
      title: 'Landing Pages',
      desc: 'Alta conversión',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
        </svg>
      )
    }
  ];

  // Company dropdown items
  const company = [
    {
      title: 'Sobre Nosotros',
      desc: 'Conoce nuestro equipo',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
          <circle cx="9" cy="7" r="4"/>
          <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/>
        </svg>
      )
    },
    {
      title: 'Nuestro Proceso',
      desc: 'Cómo trabajamos',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/>
        </svg>
      )
    },
    {
      title: 'Blog',
      desc: 'Artículos y recursos',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 19l7-7 3 3-7 7-3-3z"/>
          <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/>
          <path d="M2 2l7.586 7.586"/>
          <circle cx="11" cy="11" r="2"/>
        </svg>
      )
    },
    {
      title: 'Contacto',
      desc: 'Hablemos de tu proyecto',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"/>
        </svg>
      )
    }
  ];

  return (
    <header
      ref={headerRef}
      className={`header ${isScrolled ? 'header--scrolled' : ''}`}
    >
      <div className="header__glow-line" />

      <div className="header__container">
        {/* Logo */}
        <Link to="/" className="header__logo">
          <div className="header__logo-icon">
            <svg className="header__logo-svg" viewBox="0 0 40 40" fill="none">
              <rect x="2" y="2" width="36" height="36" rx="10" fill="url(#logoGrad)" fillOpacity="0.1"/>
              <rect x="2" y="2" width="36" height="36" rx="10" stroke="url(#logoGrad)" strokeWidth="1.5"/>
              <text x="8" y="28" className="header__logo-letter">U</text>
              <text x="20" y="28" fill="url(#logoGrad)" className="header__logo-letter-accent">S</text>
              <defs>
                <linearGradient id="logoGrad" x1="0" y1="0" x2="40" y2="40">
                  <stop offset="0%" stopColor="#8b5cf6"/>
                  <stop offset="100%" stopColor="#06b6d4"/>
                </linearGradient>
              </defs>
            </svg>
          </div>
          <div className="header__logo-text">
            <span className="header__logo-name">US Agency</span>
            <span className="header__logo-tag">Digital Studio</span>
          </div>
        </Link>

        {/* Navigation */}
        <nav className="header__nav">
          <ul className="header__nav-list">
            {/* Inicio */}
            <li className="header__nav-item">
              <Link to="/" className="header__nav-link header__nav-link--active">
                <svg className="header__nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
                  <polyline points="9,22 9,12 15,12 15,22"/>
                </svg>
                <span>Inicio</span>
              </Link>
            </li>

            {/* Servicios */}
            <li
              className="header__nav-item header__nav-item--dropdown"
              onMouseEnter={() => setActiveDropdown('services')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <a href="#servicios" className="header__nav-link">
                <svg className="header__nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="3" y="3" width="7" height="7"/>
                  <rect x="14" y="3" width="7" height="7"/>
                  <rect x="14" y="14" width="7" height="7"/>
                  <rect x="3" y="14" width="7" height="7"/>
                </svg>
                <span>Servicios</span>
                <svg className="header__nav-arrow" viewBox="0 0 12 12" fill="none">
                  <path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </a>

              <div className={`header__dropdown ${activeDropdown === 'services' ? 'header__dropdown--active' : ''}`}>
                <div className="header__dropdown-inner">
                  <div className="header__dropdown-header">
                    <span className="header__dropdown-label">Servicios</span>
                    <span className="header__dropdown-sublabel">Lo que hacemos</span>
                  </div>
                  <div className="header__dropdown-grid">
                    {services.map((item, i) => (
                      <a href="#servicios" className="header__dropdown-item" key={i}>
                        <div className="header__dropdown-icon">
                          {item.icon}
                        </div>
                        <div className="header__dropdown-content">
                          <span className="header__dropdown-title">{item.title}</span>
                          <span className="header__dropdown-desc">{item.desc}</span>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </li>

            {/* Portfolio */}
            <li className="header__nav-item">
              <Link to="/portfolio" className="header__nav-link">
                <svg className="header__nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
                  <path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16"/>
                </svg>
                <span>Portfolio</span>
              </Link>
            </li>

            {/* Paquetes */}
            <li className="header__nav-item">
              <a href="#paquetes" className="header__nav-link">
                <svg className="header__nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/>
                  <polyline points="3.27,6.96 12,12.01 20.73,6.96"/>
                  <line x1="12" y1="22.08" x2="12" y2="12"/>
                </svg>
                <span>Paquetes</span>
              </a>
            </li>

            {/* Nosotros */}
            <li
              className="header__nav-item header__nav-item--dropdown"
              onMouseEnter={() => setActiveDropdown('company')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <a href="#nosotros" className="header__nav-link">
                <svg className="header__nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M12 16v-4M12 8h.01"/>
                </svg>
                <span>Nosotros</span>
                <svg className="header__nav-arrow" viewBox="0 0 12 12" fill="none">
                  <path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </a>

              <div className={`header__dropdown ${activeDropdown === 'company' ? 'header__dropdown--active' : ''}`}>
                <div className="header__dropdown-inner">
                  <div className="header__dropdown-header">
                    <span className="header__dropdown-label">Nosotros</span>
                    <span className="header__dropdown-sublabel">Conócenos mejor</span>
                  </div>
                  <div className="header__dropdown-grid">
                    {company.map((item, i) => (
                      <a href="#" className="header__dropdown-item" key={i}>
                        <div className="header__dropdown-icon">
                          {item.icon}
                        </div>
                        <div className="header__dropdown-content">
                          <span className="header__dropdown-title">{item.title}</span>
                          <span className="header__dropdown-desc">{item.desc}</span>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </nav>

        {/* Actions */}
        <div className="header__actions">
          {/* CTA Button */}
          <a href="#contacto" className="header__cta">
            <span className="header__cta-bg" />
            <span className="header__cta-content">
              <svg className="header__cta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>
              </svg>
              <span className="header__cta-text">Contáctanos</span>
              <svg className="header__cta-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </span>
          </a>

          {/* Mobile menu */}
          <button className="header__menu" aria-label="Menú">
            <span className="header__menu-line" />
            <span className="header__menu-line" />
            <span className="header__menu-line" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
