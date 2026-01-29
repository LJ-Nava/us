import { useEffect, useRef, useState, useMemo } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ContactModal from '../components/ContactModal';
import { useI18n } from '../contexts/I18nContext';

gsap.registerPlugin(ScrollTrigger);

/**
 * ServiciosPage - ULTRA PREMIUM Services Page
 * World-class design with unique interactions and effects
 */
const ServiciosPage = () => {
  const pageRef = useRef(null);
  const cardsRef = useRef([]);
  const [activeService, setActiveService] = useState(null);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const { t, language } = useI18n();

  const services = useMemo(() => [
    {
      id: 'web-design',
      number: '01',
      title: t('serviciosPage.webDesignTitle'),
      subtitle: t('serviciosPage.webDesignSubtitle'),
      description: t('serviciosPage.webDesignDesc'),
      features: t('serviciosPage.webDesignFeatures'),
      color: '#8b5cf6',
      colorLight: 'rgba(139, 92, 246, 0.1)',
      gradient: 'linear-gradient(135deg, #8b5cf6, #a78bfa)',
      icon: 'design'
    },
    {
      id: 'desarrollo',
      number: '02',
      title: t('serviciosPage.developmentTitle'),
      subtitle: t('serviciosPage.developmentSubtitle'),
      description: t('serviciosPage.developmentDesc'),
      features: t('serviciosPage.developmentFeatures'),
      color: '#06b6d4',
      colorLight: 'rgba(6, 182, 212, 0.1)',
      gradient: 'linear-gradient(135deg, #06b6d4, #22d3ee)',
      icon: 'code'
    },
    {
      id: 'ecommerce',
      number: '03',
      title: t('serviciosPage.ecommerceTitle'),
      subtitle: t('serviciosPage.ecommerceSubtitle'),
      description: t('serviciosPage.ecommerceDesc'),
      features: t('serviciosPage.ecommerceFeatures'),
      color: '#10b981',
      colorLight: 'rgba(16, 185, 129, 0.1)',
      gradient: 'linear-gradient(135deg, #10b981, #34d399)',
      icon: 'cart'
    },
    {
      id: 'landing',
      number: '04',
      title: t('serviciosPage.landingTitle'),
      subtitle: t('serviciosPage.landingSubtitle'),
      description: t('serviciosPage.landingDesc'),
      features: t('serviciosPage.landingFeatures'),
      color: '#f59e0b',
      colorLight: 'rgba(245, 158, 11, 0.1)',
      gradient: 'linear-gradient(135deg, #f59e0b, #fbbf24)',
      icon: 'rocket'
    },
    {
      id: 'branding',
      number: '05',
      title: t('serviciosPage.brandingTitle'),
      subtitle: t('serviciosPage.brandingSubtitle'),
      description: t('serviciosPage.brandingDesc'),
      features: t('serviciosPage.brandingFeatures'),
      color: '#ec4899',
      colorLight: 'rgba(236, 72, 153, 0.1)',
      gradient: 'linear-gradient(135deg, #ec4899, #f472b6)',
      icon: 'brand'
    },
    {
      id: 'seo',
      number: '06',
      title: t('serviciosPage.seoTitle'),
      subtitle: t('serviciosPage.seoSubtitle'),
      description: t('serviciosPage.seoDesc'),
      features: t('serviciosPage.seoFeatures'),
      color: '#7c3aed',
      colorLight: 'rgba(124, 58, 237, 0.1)',
      gradient: 'linear-gradient(135deg, #7c3aed, #8b5cf6)',
      icon: 'search'
    }
  ], [t, language]);

  const icons = {
    design: (
      <svg viewBox="0 0 60 60" fill="none">
        <rect x="8" y="8" width="44" height="44" rx="8" stroke="currentColor" strokeWidth="2"/>
        <rect x="14" y="14" width="20" height="14" rx="2" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="1.5"/>
        <rect x="14" y="32" width="32" height="8" rx="2" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="40" cy="21" r="6" fill="currentColor" fillOpacity="0.3" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    ),
    code: (
      <svg viewBox="0 0 60 60" fill="none">
        <rect x="6" y="10" width="48" height="40" rx="6" stroke="currentColor" strokeWidth="2"/>
        <circle cx="14" cy="18" r="2" fill="currentColor"/>
        <circle cx="20" cy="18" r="2" fill="currentColor"/>
        <circle cx="26" cy="18" r="2" fill="currentColor"/>
        <path d="M20 32l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M40 32l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M33 28l-6 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    cart: (
      <svg viewBox="0 0 60 60" fill="none">
        <path d="M10 14h6l6 28h22l6-20H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="24" cy="50" r="4" fill="currentColor"/>
        <circle cx="42" cy="50" r="4" fill="currentColor"/>
        <path d="M28 28h10M33 23v10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    rocket: (
      <svg viewBox="0 0 60 60" fill="none">
        <path d="M30 8c-8 8-12 20-12 28h24c0-8-4-20-12-28z" fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="2"/>
        <circle cx="30" cy="24" r="4" fill="currentColor"/>
        <path d="M18 36c-6 2-10 6-10 10h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M42 36c6 2 10 6 10 10H40" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M26 44h8v8l-4 4-4-4v-8z" fill="currentColor" fillOpacity="0.3" stroke="currentColor" strokeWidth="2"/>
      </svg>
    ),
    brand: (
      <svg viewBox="0 0 60 60" fill="none">
        <circle cx="30" cy="30" r="22" stroke="currentColor" strokeWidth="2"/>
        <circle cx="30" cy="30" r="8" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="2"/>
        <path d="M30 8v10M30 42v10M8 30h10M42 30h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <circle cx="16" cy="16" r="4" fill="currentColor" fillOpacity="0.4"/>
        <circle cx="44" cy="16" r="4" fill="currentColor" fillOpacity="0.4"/>
        <circle cx="16" cy="44" r="4" fill="currentColor" fillOpacity="0.4"/>
        <circle cx="44" cy="44" r="4" fill="currentColor" fillOpacity="0.4"/>
      </svg>
    ),
    search: (
      <svg viewBox="0 0 60 60" fill="none">
        <circle cx="26" cy="26" r="16" stroke="currentColor" strokeWidth="2"/>
        <path d="M38 38l14 14" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
        <path d="M18 26h16M26 18v16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <circle cx="26" cy="26" r="6" fill="currentColor" fillOpacity="0.15"/>
      </svg>
    )
  };

  // 3D Tilt effect for cards
  const handleCardMouseMove = (e, index) => {
    const card = cardsRef.current[index];
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;

    gsap.to(card, {
      rotateX: rotateX,
      rotateY: rotateY,
      transformPerspective: 1000,
      duration: 0.4,
      ease: 'power2.out'
    });
  };

  const handleCardMouseLeave = (index) => {
    const card = cardsRef.current[index];
    if (!card) return;

    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.6,
      ease: 'elastic.out(1, 0.5)'
    });
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Service cards - staggered reveal with scale
      gsap.fromTo('.servicios-card',
        {
          y: 100,
          opacity: 0,
          scale: 0.9
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: {
            amount: 0.6,
            from: 'start'
          },
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.servicios-showcase',
            start: 'top 75%',
          }
        }
      );

      // Process section
      gsap.fromTo('.servicios-process__step',
        {
          x: -50,
          opacity: 0
        },
        {
          x: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.12,
          scrollTrigger: {
            trigger: '.servicios-process',
            start: 'top 70%',
          }
        }
      );

      // Animated line drawing
      gsap.fromTo('.servicios-process__line-progress',
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 1.5,
          ease: 'power2.inOut',
          scrollTrigger: {
            trigger: '.servicios-process',
            start: 'top 60%',
          }
        }
      );

      // Final CTA
      gsap.fromTo('.servicios-final__content',
        { y: 60, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          scrollTrigger: {
            trigger: '.servicios-final',
            start: 'top 80%',
          }
        }
      );

    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef} className="servicios-page">
      {/* ==================== SERVICES SHOWCASE ==================== */}
      <section id="showcase" className="servicios-showcase">
        <div className="servicios-showcase__header">
          <span className="servicios-showcase__label">{t('serviciosPage.showcaseLabel')}</span>
          <h2 className="servicios-showcase__title">
            {t('serviciosPage.showcaseTitle')} <span>{t('serviciosPage.showcaseTitleHighlight')}</span>
          </h2>
        </div>

        <div className="servicios-showcase__grid">
          {services.map((service, index) => (
            <article
              key={service.id}
              id={service.id}
              ref={el => cardsRef.current[index] = el}
              className={`servicios-card ${activeService === index ? 'servicios-card--active' : ''}`}
              style={{
                '--card-color': service.color,
                '--card-color-light': service.colorLight,
                '--card-gradient': service.gradient
              }}
              onMouseMove={(e) => handleCardMouseMove(e, index)}
              onMouseLeave={() => handleCardMouseLeave(index)}
              onMouseEnter={() => setActiveService(index)}
            >
              {/* Glow effect */}
              <div className="servicios-card__glow" />

              {/* Animated border */}
              <div className="servicios-card__border" />

              <div className="servicios-card__inner">
                <div className="servicios-card__header">
                  <span className="servicios-card__number">{service.number}</span>
                  <div className="servicios-card__icon" style={{ color: service.color }}>
                    {icons[service.icon]}
                  </div>
                </div>

                <div className="servicios-card__content">
                  <span className="servicios-card__subtitle">{service.subtitle}</span>
                  <h3 className="servicios-card__title">{service.title}</h3>
                  <p className="servicios-card__desc">{service.description}</p>

                  <div className="servicios-card__features">
                    {service.features.map((feature, i) => (
                      <span key={i} className="servicios-card__feature">
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                <button
                  className="servicios-card__cta"
                  onClick={() => setIsContactModalOpen(true)}
                >
                  <span>{t('serviciosPage.quote')}</span>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>


      {/* ==================== PROCESS SECTION ==================== */}
      <section className="servicios-process">
        <div className="servicios-process__container">
          <div className="servicios-process__header">
            <span className="servicios-process__label">{t('serviciosPage.processLabel')}</span>
            <h2 className="servicios-process__title">
              {t('serviciosPage.processTitle')} <span>{t('serviciosPage.processTitleHighlight')}</span>
            </h2>
          </div>

          <div className="servicios-process__timeline">
            <div className="servicios-process__line">
              <div className="servicios-process__line-progress" />
            </div>

            {[
              { num: '01', title: t('serviciosPage.step1Title'), desc: t('serviciosPage.step1Desc') },
              { num: '02', title: t('serviciosPage.step2Title'), desc: t('serviciosPage.step2Desc') },
              { num: '03', title: t('serviciosPage.step3Title'), desc: t('serviciosPage.step3Desc') },
              { num: '04', title: t('serviciosPage.step4Title'), desc: t('serviciosPage.step4Desc') },
              { num: '05', title: t('serviciosPage.step5Title'), desc: t('serviciosPage.step5Desc') }
            ].map((step, i) => (
              <div key={i} className="servicios-process__step">
                <div className="servicios-process__step-marker">
                  <span>{step.num}</span>
                </div>
                <div className="servicios-process__step-content">
                  <h3>{step.title}</h3>
                  <p>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== FINAL CTA ==================== */}
      <section className="servicios-final">
        <div className="servicios-final__bg">
          <div className="servicios-final__orb servicios-final__orb--1" />
          <div className="servicios-final__orb servicios-final__orb--2" />
        </div>

        <div className="servicios-final__container">
          <div className="servicios-final__content">
            <span className="servicios-final__badge">{t('serviciosPage.finalBadge')}</span>
            <h2 className="servicios-final__title">
              {t('serviciosPage.finalTitle')}
              <span> {t('serviciosPage.finalTitleHighlight')}</span>
            </h2>
            <p className="servicios-final__subtitle">
              {t('serviciosPage.finalSubtitle')}
            </p>

            <div className="servicios-final__actions">
              <button
                className="servicios-final__btn servicios-final__btn--main"
                onClick={() => setIsContactModalOpen(true)}
              >
                <span className="servicios-final__btn-shine" />
                <span>{t('serviciosPage.scheduleCall')}</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
                </svg>
              </button>
              <a
                href="https://wa.me/573151573329"
                target="_blank"
                rel="noopener noreferrer"
                className="servicios-final__btn servicios-final__btn--whatsapp"
              >
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Modal */}
      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />
    </div>
  );
};

export default ServiciosPage;
