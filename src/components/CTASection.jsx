import { useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CTA3DBackground from './CTA3DBackground';
import { useI18n } from '../contexts/I18nContext';

gsap.registerPlugin(ScrollTrigger);

/**
 * CTASection - Professional Edition
 * Clean, sophisticated design inspired by Linear/Stripe
 * Traducido automáticamente según el país del usuario
 */
const CTASection = () => {
  const sectionRef = useRef(null);
  const navigate = useNavigate();
  const whatsappNumber = '573147083182';
  const { t } = useI18n();

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: '.cta-section',
          start: 'top 70%',
          once: true,
        },
      });

      tl.fromTo('.cta-section__card',
        { opacity: 0, y: 60 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
      )
      .fromTo('.cta-section__label',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.6'
      )
      .fromTo('.cta-section__title',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }, '-=0.4'
      )
      .fromTo('.cta-section__description',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.5'
      )
      .fromTo('.cta-section__cta-wrapper',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.4'
      )
      .fromTo('.cta-section__metric',
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: 'power2.out' }, '-=0.3'
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleWhatsApp = () => {
    const message = encodeURIComponent('Hola, me interesa desarrollar mi proyecto web. ¿Podemos agendar una llamada?');
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
  };

  const handlePortfolio = () => {
    navigate('/portfolio');
  };

  return (
    <section ref={sectionRef} className="cta-section" id="contacto">
      {/* 3D Background */}
      <CTA3DBackground />

      {/* Gradient Overlay */}
      <div className="cta-section__overlay" />

      <div className="cta-section__container">
        <div className="cta-section__card">
          {/* Label */}
          <span className="cta-section__label">
            <span className="cta-section__label-indicator" />
            {t('cta.badge')}
          </span>

          {/* Title */}
          <h2 className="cta-section__title">
            {t('cta.title1')}
            <br />
            <span className="cta-section__title-gradient">{t('cta.title2')}</span>
          </h2>

          {/* Description */}
          <p className="cta-section__description">
            {t('cta.subtitle')}
          </p>

          {/* CTA Buttons */}
          <div className="cta-section__cta-wrapper">
            <button className="cta-section__btn cta-section__btn--primary" onClick={handleWhatsApp}>
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              {t('cta.primary')}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>

            <button className="cta-section__btn cta-section__btn--secondary" onClick={handlePortfolio}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M4 6h16M4 10h16M4 14h16M4 18h16"/>
              </svg>
              {t('cta.secondary')}
            </button>
          </div>

          {/* Metrics */}
          <div className="cta-section__metrics">
            <div className="cta-section__metric">
              <span className="cta-section__metric-value">50+</span>
              <span className="cta-section__metric-label">{t('cta.metric1')}</span>
            </div>
            <div className="cta-section__metric-divider" />
            <div className="cta-section__metric">
              <span className="cta-section__metric-value">100%</span>
              <span className="cta-section__metric-label">{t('cta.metric2')}</span>
            </div>
            <div className="cta-section__metric-divider" />
            <div className="cta-section__metric">
              <span className="cta-section__metric-value">&lt;24h</span>
              <span className="cta-section__metric-label">{t('cta.metric3')}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
