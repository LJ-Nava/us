import { useEffect, useRef, useState, useMemo } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Features3DBackground from './Features3DBackground';
import { useI18n } from '../contexts/I18nContext';

gsap.registerPlugin(ScrollTrigger);

/**
 * FeaturesSection - Por qué elegirnos
 * Diseño elegante con elementos visuales cautivadores
 * Traducido automáticamente según el país del usuario
 */
const FeaturesSection = () => {
  const sectionRef = useRef(null);
  const [activeFeature, setActiveFeature] = useState(null);
  const { t, language } = useI18n();

  // Get translated features
  const features = useMemo(() => [
    {
      id: 1,
      number: '01',
      title: t('features.feature1Title'),
      description: t('features.feature1Desc'),
      highlight: t('features.feature1Highlight'),
      color: 'cyan',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
    },
    {
      id: 2,
      number: '02',
      title: t('features.feature2Title'),
      description: t('features.feature2Desc'),
      highlight: t('features.feature2Highlight'),
      color: 'amber',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
    },
    {
      id: 3,
      number: '03',
      title: t('features.feature3Title'),
      description: t('features.feature3Desc'),
      highlight: t('features.feature3Highlight'),
      color: 'emerald',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="12" r="10"/>
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
          <path d="M2 12h20"/>
        </svg>
      ),
    },
    {
      id: 4,
      number: '04',
      title: t('features.feature4Title'),
      description: t('features.feature4Desc'),
      highlight: t('features.feature4Highlight'),
      color: 'violet',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
    },
  ], [t, language]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        '.features-section__header > *',
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out',
          scrollTrigger: { trigger: '.features-section__header', start: 'top 80%', once: true },
        }
      );

      // Cards stagger animation
      gsap.fromTo(
        '.features-section__card',
        { opacity: 0, y: 50, scale: 0.95 },
        {
          opacity: 1, y: 0, scale: 1, duration: 0.7, stagger: 0.12, ease: 'power3.out',
          scrollTrigger: { trigger: '.features-section__grid', start: 'top 80%', once: true },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="features-section" id="why-us">
      {/* 3D Geometric Background */}
      <Features3DBackground />

      {/* Ambient background elements */}
      <div className="features-section__ambient">
        <div className="features-section__orb features-section__orb--1" />
        <div className="features-section__orb features-section__orb--2" />
      </div>

      <div className="features-section__container">
        {/* Header */}
        <div className="features-section__header">
          <span className="features-section__eyebrow">
            <span className="features-section__eyebrow-line" />
            {t('features.eyebrow')}
          </span>
          <h2 className="features-section__title">
            {t('features.title')}
            <span className="features-section__title-highlight"> {t('features.titleHighlight')}</span>
          </h2>
          <p className="features-section__subtitle">
            {t('features.subtitle')}
          </p>
        </div>

        {/* Features Grid */}
        <div className="features-section__grid">
          {features.map((feature) => (
            <article
              key={feature.id}
              className={`features-section__card features-section__card--${feature.color} ${activeFeature === feature.id ? 'is-active' : ''}`}
              onMouseEnter={() => setActiveFeature(feature.id)}
              onMouseLeave={() => setActiveFeature(null)}
            >
              {/* Shine effect on hover */}
              <div className="features-section__card-shine" />

              {/* Card border gradient */}
              <div className="features-section__card-border" />

              {/* Card content */}
              <div className="features-section__card-inner">
                <div className="features-section__card-header">
                  <div className="features-section__card-icon">
                    <div className="features-section__card-icon-glow" />
                    {feature.icon}
                  </div>
                  <span className="features-section__card-number">{feature.number}</span>
                </div>

                <h3 className="features-section__card-title">{feature.title}</h3>
                <p className="features-section__card-description">{feature.description}</p>

                <div className="features-section__card-footer">
                  <span className="features-section__card-highlight">
                    <span className="features-section__card-highlight-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                    </span>
                    {feature.highlight}
                  </span>
                  <span className="features-section__card-arrow">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M7 17L17 7M17 7H7M17 7V17"/>
                    </svg>
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
};

export default FeaturesSection;
