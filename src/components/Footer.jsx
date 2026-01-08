import { useEffect, useRef, useMemo } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useI18n } from '../contexts/I18nContext';

gsap.registerPlugin(ScrollTrigger);

/**
 * Footer - Ultra Modern Edition
 * Premium, stunning footer design
 */
const Footer = () => {
  const footerRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { t, language } = useI18n();

  const contactInfo = {
    email: 'DeveloperLuis17@gmail.com',
    whatsapp: '573147083182',
    whatsappDisplay: '+57 314 708 3182'
  };

  const currentYear = new Date().getFullYear();

  const quickLinks = useMemo(() => [
    { label: t('footer.home'), href: '/', isRoute: true },
    { label: t('footer.servicesLink'), href: '/servicios', isRoute: true },
    { label: t('footer.portfolio'), href: '/portfolio', isRoute: true },
    { label: t('footer.aboutUs'), href: '/nosotros', isRoute: true },
  ], [t, language]);

  const services = useMemo(() => [
    { name: t('footer.webDesign'), serviceId: 'web-design' },
    { name: t('footer.frontendDev'), serviceId: 'desarrollo' },
    { name: t('footer.ecommerce'), serviceId: 'ecommerce' },
    { name: t('footer.landingPages'), serviceId: 'landing' },
  ], [t, language]);

  // Navigate to a specific service on the services page
  const navigateToService = (serviceId) => (e) => {
    e.preventDefault();

    if (location.pathname === '/servicios') {
      const element = document.getElementById(serviceId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    } else {
      navigate('/servicios');
      setTimeout(() => {
        const element = document.getElementById(serviceId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 150);
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.footer__inner',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.footer',
            start: 'top 85%',
            once: true,
          }
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  const handleWhatsApp = () => {
    const message = encodeURIComponent(t('whatsapp.defaultMessage'));
    window.open(`https://wa.me/${contactInfo.whatsapp}?text=${message}`, '_blank');
  };

  return (
    <footer ref={footerRef} className="footer">
      {/* Gradient Background */}
      <div className="footer__bg">
        <div className="footer__bg-gradient" />
        <div className="footer__bg-glow footer__bg-glow--1" />
        <div className="footer__bg-glow footer__bg-glow--2" />
      </div>

      <div className="footer__container">
        <div className="footer__inner">
          {/* Top Section - CTA */}
          <div className="footer__cta">
            <div className="footer__cta-content">
              <h3 className="footer__cta-title">
                {t('footer.ctaTitle')}
                <span className="footer__cta-gradient"> {t('footer.ctaTitleHighlight')}</span>
              </h3>
              <p className="footer__cta-text">
                {t('footer.ctaText')}
              </p>
            </div>
            <button className="footer__cta-btn" onClick={handleWhatsApp}>
              <span className="footer__cta-btn-bg" />
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              <span>{t('footer.ctaButton')}</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="footer__cta-btn-arrow">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
          </div>

          {/* Main Grid */}
          <div className="footer__grid">
            {/* Brand */}
            <div className="footer__brand">
              <Link to="/" className="footer__logo">
                <span className="footer__logo-text">Jowify</span>
                <span className="footer__logo-dot" />
              </Link>
              <p className="footer__tagline">
                {t('footer.tagline')}
              </p>
              <div className="footer__social">
                <a
                  href={`https://wa.me/${contactInfo.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer__social-link footer__social-link--whatsapp"
                  aria-label="WhatsApp"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                </a>
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="footer__social-link footer__social-link--email"
                  aria-label="Email"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="footer__column">
              <h4 className="footer__column-title">{t('footer.navigation')}</h4>
              <ul className="footer__list">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <Link to={link.href} className="footer__link">
                      <span className="footer__link-dot" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div className="footer__column">
              <h4 className="footer__column-title">{t('footer.servicesTitle')}</h4>
              <ul className="footer__list">
                {services.map((service, index) => (
                  <li key={index}>
                    <a
                      href={`/servicios#${service.serviceId}`}
                      onClick={navigateToService(service.serviceId)}
                      className="footer__link"
                    >
                      <span className="footer__link-dot" />
                      {service.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div className="footer__column">
              <h4 className="footer__column-title">{t('footer.contactTitle')}</h4>
              <div className="footer__contact-cards">
                <a href={`mailto:${contactInfo.email}`} className="footer__contact-card">
                  <div className="footer__contact-card-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                    </svg>
                  </div>
                  <div className="footer__contact-card-content">
                    <span className="footer__contact-card-label">Email</span>
                    <span className="footer__contact-card-value">{contactInfo.email}</span>
                  </div>
                </a>
                <a href={`https://wa.me/${contactInfo.whatsapp}`} target="_blank" rel="noopener noreferrer" className="footer__contact-card">
                  <div className="footer__contact-card-icon footer__contact-card-icon--whatsapp">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                    </svg>
                  </div>
                  <div className="footer__contact-card-content">
                    <span className="footer__contact-card-label">WhatsApp</span>
                    <span className="footer__contact-card-value">{contactInfo.whatsappDisplay}</span>
                  </div>
                </a>
              </div>
            </div>
          </div>

          {/* Bottom */}
          <div className="footer__bottom">
            <div className="footer__bottom-left">
              <p className="footer__copyright">
                © {currentYear} Jowify. {t('footer.rights')}
              </p>
            </div>
            <div className="footer__bottom-right">
              <a href="#" className="footer__legal-link">{t('footer.privacy')}</a>
              <a href="#" className="footer__legal-link">{t('footer.terms')}</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
