import { useEffect, useRef, useMemo } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ServicesGrid from './ServicesGrid';
import { useI18n } from '../contexts/I18nContext';

gsap.registerPlugin(ScrollTrigger);

/**
 * ServicesSection - Sección de servicios estilo Stripe
 * Traducido automáticamente según el país del usuario
 */
const ServicesSection = () => {
  const sectionRef = useRef(null);
  const { t, language } = useI18n();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animación al hacer scroll
      gsap.fromTo(
        '.services-section__content > *',
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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Get features from translations
  const features = useMemo(() => {
    const featuresArr = t('services.features');
    return Array.isArray(featuresArr) ? featuresArr : ['Custom UI/UX Design', 'Modern web development', 'SEO optimization', 'Continuous support'];
  }, [t, language]);

  return (
    <section ref={sectionRef} className="services-section" id="servicios">
      <div className="services-section__container">
        {/* Contenido */}
        <div className="services-section__content">
          <span className="services-section__badge">{t('services.badge')}</span>
          <h2 className="services-section__title">
            {t('services.sectionTitle')}<br />
            {t('services.sectionTitle2')}
          </h2>
          <p className="services-section__description">
            {t('services.sectionDesc')}
          </p>
          <div className="services-section__features">
            {features.map((feature, index) => (
              <div key={index} className="services-section__feature">
                <span className="services-section__feature-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </span>
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Visual Grid */}
        <div className="services-section__visual">
          <ServicesGrid />
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
