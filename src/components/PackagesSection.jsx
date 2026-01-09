import { useEffect, useRef, useState, useMemo } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import useCurrency from '../hooks/useCurrency';
import { useI18n } from '../contexts/I18nContext';
import PackageModal from './PackageModal';

gsap.registerPlugin(ScrollTrigger);

/**
 * PackagesSection - Nuestros Paquetes
 * Diseño premium con 4 planes diferenciados
 * Precios en moneda local según ubicación
 * Traducido automáticamente según el país del usuario
 */
const PackagesSection = () => {
  const sectionRef = useRef(null);
  const [hoveredPackage, setHoveredPackage] = useState(null);
  const { t, language, country } = useI18n();
  // Use the country detected by IP for currency, NOT the language-mapped country
  const { formatPrice, currencyName, loading } = useCurrency(country);

  const [selectedPackage, setSelectedPackage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Discount countdown - ends March 8, 2026 (2 months from now)
  const DISCOUNT_END_DATE = new Date('2026-03-08T23:59:59');
  const [daysRemaining, setDaysRemaining] = useState(0);
  const [discountActive, setDiscountActive] = useState(true);

  useEffect(() => {
    const calculateDaysRemaining = () => {
      const now = new Date();
      const diff = DISCOUNT_END_DATE - now;
      const days = Math.ceil(diff / (1000 * 60 * 60 * 24));

      if (days <= 0) {
        setDaysRemaining(0);
        setDiscountActive(false);
      } else {
        setDaysRemaining(days);
        setDiscountActive(true);
      }
    };

    calculateDaysRemaining();
    // Update every hour
    const interval = setInterval(calculateDaysRemaining, 1000 * 60 * 60);
    return () => clearInterval(interval);
  }, []);

  // Packages with translated content
  const packages = useMemo(() => [
    {
      id: 1,
      name: t('packages.basic'),
      tagline: t('packages.basicTagline'),
      description: t('packages.basicDesc'),
      originalPrice: '310',
      price: '250',
      discount: '20',
      complexity: t('packages.lowComplexity'),
      color: 'slate',
      popular: false,
      features: [
        { text: t('packages.pages13'), included: true },
        { text: t('packages.responsiveDesign'), included: true },
        { text: t('packages.contactForm'), included: true },
        { text: t('packages.whatsappIntegration'), included: true },
        { text: t('packages.delivery57'), included: true },
        { text: t('packages.revisions2'), included: true },
      ],
      cta: t('packages.cta'),
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 2L2 7l10 5 10-5-10-5z" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M2 17l10 5 10-5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M2 12l10 5 10-5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
    },
    {
      id: 2,
      name: t('packages.professional'),
      tagline: t('packages.professionalTagline'),
      description: t('packages.professionalDesc'),
      originalPrice: '625',
      price: '500',
      discount: '20',
      complexity: t('packages.mediumComplexity'),
      color: 'cyan',
      popular: true,
      features: [
        { text: t('packages.pages46'), included: true },
        { text: t('packages.customUiUx'), included: true },
        { text: t('packages.gsapAnimations'), included: true },
        { text: t('packages.technicalSeo'), included: true },
        { text: 'Google Analytics', included: true },
        { text: t('packages.delivery1014'), included: true },
        { text: t('packages.revisions3'), included: true },
      ],
      cta: t('packages.ctaPopular'),
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
    },
    {
      id: 3,
      name: t('packages.advanced'),
      tagline: t('packages.advancedTagline'),
      description: t('packages.advancedDesc'),
      originalPrice: '1000',
      price: '800',
      discount: '20',
      complexity: t('packages.highComplexity'),
      color: 'violet',
      popular: false,
      features: [
        { text: t('packages.pages710'), included: true },
        { text: t('packages.premiumDesign'), included: true },
        { text: t('packages.advancedAnimations'), included: true },
        { text: t('packages.advancedSeo'), included: true },
        { text: t('packages.integratedBlog'), included: true },
        { text: t('packages.database'), included: true },
        { text: t('packages.delivery1520'), included: true },
        { text: t('packages.unlimitedRevisions'), included: true },
      ],
      cta: t('packages.cta'),
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
    },
    {
      id: 4,
      name: t('packages.ecommerce'),
      tagline: t('packages.ecommerceTagline'),
      description: t('packages.ecommerceDesc'),
      originalPrice: '1250',
      price: '1000',
      discount: '20',
      complexity: t('packages.completeStore'),
      color: 'amber',
      popular: false,
      features: [
        { text: t('packages.completeOnlineStore'), included: true },
        { text: t('packages.initialProducts50'), included: true },
        { text: t('packages.shoppingCart'), included: true },
        { text: t('packages.paymentGateway'), included: true },
        { text: t('packages.adminPanel'), included: true },
        { text: t('packages.delivery2025'), included: true },
        { text: t('packages.trainingIncluded'), included: true },
      ],
      cta: t('packages.ctaQuote'),
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
    },
  ], [t, language]);

  const handlePackageClick = (pkg) => {
    setSelectedPackage(pkg);
    setIsModalOpen(true);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        '.packages-section__header > *',
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out',
          scrollTrigger: { trigger: '.packages-section__header', start: 'top 80%', once: true },
        }
      );

      // Cards stagger animation
      gsap.fromTo(
        '.packages-section__card',
        { opacity: 0, y: 60, scale: 0.95 },
        {
          opacity: 1, y: 0, scale: 1, duration: 0.7, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: '.packages-section__grid', start: 'top 85%', once: true },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="packages-section" id="paquetes">
      {/* Background elements */}
      <div className="packages-section__bg">
        <div className="packages-section__bg-gradient" />
        <div className="packages-section__bg-grid" />
      </div>

      <div className="packages-section__container">
        {/* Header */}
        <div className="packages-section__header">
          <span className="packages-section__eyebrow">
            <span className="packages-section__eyebrow-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                <path d="M2 17l10 5 10-5"/>
                <path d="M2 12l10 5 10-5"/>
              </svg>
            </span>
            {t('packages.eyebrow')}
          </span>
          <h2 className="packages-section__title">
            {t('packages.title')}
            <span className="packages-section__title-highlight"> {t('packages.titleHighlight')}</span>
          </h2>
          <p className="packages-section__subtitle">
            {t('packages.subtitle')}
          </p>

          {/* Discount Countdown Banner */}
          {discountActive && (
            <div className="packages-section__discount-banner">
              <div className="packages-section__discount-banner-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <polyline points="12 6 12 12 16 14"/>
                </svg>
              </div>
              <div className="packages-section__discount-banner-text">
                <span className="packages-section__discount-banner-label">{t('packages.limitedOffer')}</span>
                <span className="packages-section__discount-banner-days">
                  {daysRemaining} {daysRemaining === 1 ? t('packages.dayLeft') : t('packages.daysLeft')}
                </span>
              </div>
              <div className="packages-section__discount-banner-badge">-20%</div>
            </div>
          )}
        </div>

        {/* Packages Grid */}
        <div className="packages-section__grid">
          {packages.map((pkg) => (
            <article
              key={pkg.id}
              className={`packages-section__card packages-section__card--${pkg.color} ${pkg.popular ? 'is-popular' : ''} ${hoveredPackage === pkg.id ? 'is-hovered' : ''}`}
              onMouseEnter={() => setHoveredPackage(pkg.id)}
              onMouseLeave={() => setHoveredPackage(null)}
            >
              {/* Popular badge */}
              {pkg.popular && (
                <div className="packages-section__card-badge">
                  <span>{t('packages.mostPopular')}</span>
                </div>
              )}

              {/* Shine effect */}
              <div className="packages-section__card-shine" />

              {/* Border gradient */}
              <div className="packages-section__card-border" />

              {/* Card content */}
              <div className="packages-section__card-inner">
                {/* Header */}
                <div className="packages-section__card-header">
                  <div className="packages-section__card-icon">
                    {pkg.icon}
                  </div>
                  <div className="packages-section__card-info">
                    <h3 className="packages-section__card-name">{pkg.name}</h3>
                    <span className="packages-section__card-tagline">{pkg.tagline}</span>
                  </div>
                </div>

                {/* Description */}
                <p className="packages-section__card-description">{pkg.description}</p>

                {/* Price */}
                <div className="packages-section__card-price">
                  <div className="packages-section__card-price-row">
                    <span className="packages-section__card-price-from">{t('packages.from')}</span>
                    {discountActive && (
                      <span className="packages-section__card-price-discount">-{pkg.discount}%</span>
                    )}
                  </div>
                  {discountActive && (
                    <span className={`packages-section__card-price-original ${loading ? 'is-loading' : ''}`}>
                      {formatPrice(pkg.originalPrice)}
                    </span>
                  )}
                  <span className={`packages-section__card-price-value ${loading ? 'is-loading' : ''}`}>
                    {discountActive ? formatPrice(pkg.price) : formatPrice(pkg.originalPrice)}
                  </span>
                  <span className="packages-section__card-price-note">{pkg.complexity}</span>
                </div>

                {/* CTA Button */}
                <button
                  className="packages-section__card-cta"
                  onClick={() => handlePackageClick(pkg)}
                >
                  <span>{pkg.cta}</span>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </button>

                {/* Divider */}
                <div className="packages-section__card-divider" />

                {/* Features */}
                <div className="packages-section__card-features">
                  <span className="packages-section__card-features-title">{t('packages.includes')}</span>
                  <ul className="packages-section__card-features-list">
                    {pkg.features.map((feature, index) => (
                      <li key={index} className={`packages-section__card-feature ${!feature.included ? 'is-disabled' : ''}`}>
                        <span className="packages-section__card-feature-icon">
                          {feature.included ? (
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                              <polyline points="20 6 9 17 4 12"/>
                            </svg>
                          ) : (
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <line x1="18" y1="6" x2="6" y2="18"/>
                              <line x1="6" y1="6" x2="18" y2="18"/>
                            </svg>
                          )}
                        </span>
                        <span>{feature.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Bottom note */}
        <div className="packages-section__footer">
          <p className="packages-section__footer-text">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              <path d="M9 12l2 2 4-4"/>
            </svg>
            {t('packages.footer')}
          </p>
        </div>
      </div>

      {/* Package Modal */}
      <PackageModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedPackage={selectedPackage}
        formatPrice={formatPrice}
      />
    </section>
  );
};

export default PackagesSection;
