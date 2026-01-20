import { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import ContactModal from './ContactModal';
import { useI18n } from '../contexts/I18nContext';
import LogoImg from '../assets/logo.webp';

/**
 * Header - Premium Complete Menu
 * Glass morphism + Animated icons + Full navigation
 */
const Header = () => {
  const headerRef = useRef(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { t, language } = useI18n();

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Helper: close menu and scroll to top
  const handleNavClick = () => {
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  };

  // Navigate to a section on the home page
  const navigateToSection = (sectionId) => (e) => {
    e.preventDefault();

    if (location.pathname === '/') {
      // Already on home page, just scroll to section
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // Navigate to home page first, then scroll
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  };

  // Navigate to a section on the nosotros page
  const navigateToNosotrosSection = (sectionId) => (e) => {
    e.preventDefault();

    if (location.pathname === '/nosotros') {
      // Already on nosotros page, just scroll to section
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // Navigate to nosotros page first, then scroll
      navigate('/nosotros');
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  };

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

  // Services dropdown items - translated
  const services = [
    {
      title: t('header.webDesign'),
      desc: t('header.webDesignDesc'),
      serviceId: 'web-design',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="3" y="3" width="18" height="18" rx="2"/>
          <path d="M3 9h18M9 21V9"/>
        </svg>
      )
    },
    {
      title: t('header.frontendDev'),
      desc: t('header.frontendDevDesc'),
      serviceId: 'desarrollo',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/>
        </svg>
      )
    },
    {
      title: t('header.ecommerce'),
      desc: t('header.ecommerceDesc'),
      serviceId: 'ecommerce',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
          <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/>
        </svg>
      )
    },
    {
      title: t('header.landingPages'),
      desc: t('header.landingPagesDesc'),
      serviceId: 'landing',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
        </svg>
      )
    }
  ];

  // Navigate to a specific service on the services page
  const navigateToService = (serviceId) => (e) => {
    e.preventDefault();
    setActiveDropdown(null);

    if (location.pathname === '/servicios') {
      // Already on services page, just scroll to service
      const element = document.getElementById(serviceId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    } else {
      // Navigate to services page first, then scroll
      navigate('/servicios');
      setTimeout(() => {
        const element = document.getElementById(serviceId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 150);
    }
  };

  // Company dropdown items - translated
  const company = [
    {
      title: t('header.aboutUs'),
      desc: t('header.aboutUsDesc'),
      sectionId: 'nosotros',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
          <circle cx="9" cy="7" r="4"/>
          <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/>
        </svg>
      )
    },
    {
      title: t('header.ourProcess'),
      desc: t('header.ourProcessDesc'),
      sectionId: 'proceso',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/>
        </svg>
      )
    },
    {
      title: t('header.contact'),
      desc: t('header.contactDesc'),
      sectionId: 'contacto',
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
          <img src={LogoImg} alt="Plexiva Studio" className="header__logo-img" />
        </Link>

        {/* Navigation */}
        <nav className="header__nav">
          <ul className="header__nav-list">
            {/* Inicio */}
            <li className="header__nav-item">
              <Link to="/" className={`header__nav-link ${location.pathname === '/' ? 'header__nav-link--active' : ''}`}>
                <svg className="header__nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
                  <polyline points="9,22 9,12 15,12 15,22"/>
                </svg>
                <span>{t('nav.inicio')}</span>
              </Link>
            </li>

            {/* Servicios */}
            <li
              className="header__nav-item header__nav-item--dropdown"
              onMouseEnter={() => setActiveDropdown('services')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <Link
                to="/servicios"
                className={`header__nav-link ${location.pathname === '/servicios' ? 'header__nav-link--active' : ''}`}
                onClick={() => {
                  if (location.pathname === '/servicios') {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }
                }}
              >
                <svg className="header__nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="3" y="3" width="7" height="7"/>
                  <rect x="14" y="3" width="7" height="7"/>
                  <rect x="14" y="14" width="7" height="7"/>
                  <rect x="3" y="14" width="7" height="7"/>
                </svg>
                <span>{t('nav.servicios')}</span>
                <svg className="header__nav-arrow" viewBox="0 0 12 12" fill="none">
                  <path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </Link>

              <div className={`header__dropdown ${activeDropdown === 'services' ? 'header__dropdown--active' : ''}`}>
                <div className="header__dropdown-inner">
                  <div className="header__dropdown-header">
                    <span className="header__dropdown-label">{t('header.servicesLabel')}</span>
                    <span className="header__dropdown-sublabel">{t('header.servicesSublabel')}</span>
                  </div>
                  <div className="header__dropdown-grid">
                    {services.map((item, i) => (
                      <a
                        href={`/servicios#${item.serviceId}`}
                        onClick={navigateToService(item.serviceId)}
                        className="header__dropdown-item"
                        key={i}
                      >
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
              <Link to="/portfolio" className={`header__nav-link ${location.pathname === '/portfolio' ? 'header__nav-link--active' : ''}`}>
                <svg className="header__nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
                  <path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16"/>
                </svg>
                <span>{t('nav.portfolio')}</span>
              </Link>
            </li>

            {/* Paquetes */}
            <li className="header__nav-item">
              <a href="#paquetes" onClick={navigateToSection('paquetes')} className="header__nav-link">
                <svg className="header__nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/>
                  <polyline points="3.27,6.96 12,12.01 20.73,6.96"/>
                  <line x1="12" y1="22.08" x2="12" y2="12"/>
                </svg>
                <span>{t('nav.paquetes')}</span>
              </a>
            </li>

            {/* Nosotros */}
            <li
              className="header__nav-item header__nav-item--dropdown"
              onMouseEnter={() => setActiveDropdown('company')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <Link to="/nosotros" className={`header__nav-link ${location.pathname === '/nosotros' ? 'header__nav-link--active' : ''}`}>
                <svg className="header__nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M12 16v-4M12 8h.01"/>
                </svg>
                <span>{t('nav.nosotros')}</span>
                <svg className="header__nav-arrow" viewBox="0 0 12 12" fill="none">
                  <path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </Link>

              <div className={`header__dropdown ${activeDropdown === 'company' ? 'header__dropdown--active' : ''}`}>
                <div className="header__dropdown-inner">
                  <div className="header__dropdown-header">
                    <span className="header__dropdown-label">{t('header.companyLabel')}</span>
                    <span className="header__dropdown-sublabel">{t('header.companySublabel')}</span>
                  </div>
                  <div className="header__dropdown-grid">
                    {company.map((item, i) => (
                      <a href={`#${item.sectionId}`} onClick={navigateToNosotrosSection(item.sectionId)} className="header__dropdown-item" key={i}>
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
          <button
            onClick={() => setIsContactModalOpen(true)}
            className="header__cta"
          >
            <span className="header__cta-bg" />
            <span className="header__cta-content">
              <svg className="header__cta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>
              </svg>
              <span className="header__cta-text">{t('nav.contactanos')}</span>
              <svg className="header__cta-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </span>
          </button>

          {/* Mobile Menu Toggle - Simple hamburger (hidden when menu is open) */}
          {!isMobileMenuOpen && (
            <button
              className="mob-toggle"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Menú"
              type="button"
            >
              <span className="mob-toggle__bar" />
              <span className="mob-toggle__bar" />
              <span className="mob-toggle__bar" />
            </button>
          )}
        </div>
      </div>

      {/* Premium Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="mob-overlay" onClick={() => setIsMobileMenuOpen(false)}>
          <div className="mob-panel" onClick={(e) => e.stopPropagation()}>
            {/* Header */}
            <div className="mob-panel__header">
              <div className="mob-panel__brand">
                <img src={LogoImg} alt="Plexiva Studio" className="mob-panel__logo-img" />
              </div>
              <button className="mob-panel__close" onClick={() => setIsMobileMenuOpen(false)}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12"/>
                </svg>
              </button>
            </div>

            {/* Navigation */}
            <nav className="mob-panel__nav">
              <Link
                to="/"
                className={`mob-panel__link ${location.pathname === '/' ? 'mob-panel__link--active' : ''}`}
                onClick={handleNavClick}
              >
                <span className="mob-panel__icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
                    <polyline points="9,22 9,12 15,12 15,22"/>
                  </svg>
                </span>
                <span className="mob-panel__text">{t('nav.inicio')}</span>
                <span className="mob-panel__arrow">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 18l6-6-6-6"/>
                  </svg>
                </span>
              </Link>

              <Link
                to="/servicios"
                className={`mob-panel__link ${location.pathname === '/servicios' ? 'mob-panel__link--active' : ''}`}
                onClick={handleNavClick}
              >
                <span className="mob-panel__icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <rect x="3" y="3" width="7" height="7" rx="1"/>
                    <rect x="14" y="3" width="7" height="7" rx="1"/>
                    <rect x="14" y="14" width="7" height="7" rx="1"/>
                    <rect x="3" y="14" width="7" height="7" rx="1"/>
                  </svg>
                </span>
                <span className="mob-panel__text">{t('nav.servicios')}</span>
                <span className="mob-panel__arrow">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 18l6-6-6-6"/>
                  </svg>
                </span>
              </Link>

              <Link
                to="/portfolio"
                className={`mob-panel__link ${location.pathname === '/portfolio' ? 'mob-panel__link--active' : ''}`}
                onClick={handleNavClick}
              >
                <span className="mob-panel__icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <rect x="2" y="7" width="20" height="14" rx="2"/>
                    <path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16"/>
                  </svg>
                </span>
                <span className="mob-panel__text">{t('nav.portfolio')}</span>
                <span className="mob-panel__arrow">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 18l6-6-6-6"/>
                  </svg>
                </span>
              </Link>

              <a
                href="#paquetes"
                className="mob-panel__link"
                onClick={(e) => {
                  setIsMobileMenuOpen(false);
                  navigateToSection('paquetes')(e);
                }}
              >
                <span className="mob-panel__icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/>
                    <polyline points="3.27,6.96 12,12.01 20.73,6.96"/>
                    <line x1="12" y1="22.08" x2="12" y2="12"/>
                  </svg>
                </span>
                <span className="mob-panel__text">{t('nav.paquetes')}</span>
                <span className="mob-panel__arrow">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 18l6-6-6-6"/>
                  </svg>
                </span>
              </a>

              <Link
                to="/nosotros"
                className={`mob-panel__link ${location.pathname === '/nosotros' ? 'mob-panel__link--active' : ''}`}
                onClick={handleNavClick}
              >
                <span className="mob-panel__icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="M12 16v-4M12 8h.01"/>
                  </svg>
                </span>
                <span className="mob-panel__text">{t('nav.nosotros')}</span>
                <span className="mob-panel__arrow">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 18l6-6-6-6"/>
                  </svg>
                </span>
              </Link>
            </nav>

            {/* CTA */}
            <div className="mob-panel__footer">
              <button
                className="mob-panel__cta"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsContactModalOpen(true);
                }}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>
                </svg>
                <span>{t('nav.contactanos')}</span>
                <svg className="mob-panel__cta-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Contact Modal */}
      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />
    </header>
  );
};

export default Header;
