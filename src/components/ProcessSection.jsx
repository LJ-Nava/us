import { useEffect, useRef, useMemo, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useI18n } from '../contexts/I18nContext';

gsap.registerPlugin(ScrollTrigger);

/**
 * ProcessSection - Premium "How We Work" Section
 * Split layout with vertical timeline and interactive visuals
 */
const ProcessSection = () => {
  const sectionRef = useRef(null);
  const [activeStep, setActiveStep] = useState(0);
  const { t, language } = useI18n();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        '.process-section__header > *',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            once: true,
          },
        }
      );

      // Left content animation
      gsap.fromTo(
        '.process-section__step',
        { opacity: 0, x: -40 },
        {
          opacity: 1,
          x: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.process-section__timeline',
            start: 'top 70%',
            once: true,
          },
        }
      );

      // Right visual animation
      gsap.fromTo(
        '.process-section__visual',
        { opacity: 0, scale: 0.9, x: 50 },
        {
          opacity: 1,
          scale: 1,
          x: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.process-section__visual',
            start: 'top 75%',
            once: true,
          },
        }
      );

      // Timeline progress animation
      gsap.fromTo(
        '.process-section__progress-fill',
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.process-section__timeline',
            start: 'top 60%',
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const steps = useMemo(() => [
    {
      number: '01',
      title: t('process.step1Title'),
      description: t('process.step1Desc'),
      duration: t('process.step1Duration'),
      deliverables: [t('process.step1Del1'), t('process.step1Del2'), t('process.step1Del3')],
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="11" cy="11" r="8"/>
          <path d="M21 21l-4.35-4.35"/>
          <path d="M11 8v6M8 11h6"/>
        </svg>
      ),
      color: '#8b5cf6',
    },
    {
      number: '02',
      title: t('process.step2Title'),
      description: t('process.step2Desc'),
      duration: t('process.step2Duration'),
      deliverables: [t('process.step2Del1'), t('process.step2Del2'), t('process.step2Del3')],
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 2L2 7l10 5 10-5-10-5z"/>
          <path d="M2 17l10 5 10-5"/>
          <path d="M2 12l10 5 10-5"/>
        </svg>
      ),
      color: '#06b6d4',
    },
    {
      number: '03',
      title: t('process.step3Title'),
      description: t('process.step3Desc'),
      duration: t('process.step3Duration'),
      deliverables: [t('process.step3Del1'), t('process.step3Del2'), t('process.step3Del3')],
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="3" y="3" width="18" height="18" rx="2"/>
          <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor"/>
          <path d="M21 15l-5-5L5 21"/>
        </svg>
      ),
      color: '#f59e0b',
    },
    {
      number: '04',
      title: t('process.step4Title'),
      description: t('process.step4Desc'),
      duration: t('process.step4Duration'),
      deliverables: [t('process.step4Del1'), t('process.step4Del2'), t('process.step4Del3')],
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <polyline points="16 18 22 12 16 6"/>
          <polyline points="8 6 2 12 8 18"/>
        </svg>
      ),
      color: '#10b981',
    },
    {
      number: '05',
      title: t('process.step5Title'),
      description: t('process.step5Desc'),
      duration: t('process.step5Duration'),
      deliverables: [t('process.step5Del1'), t('process.step5Del2'), t('process.step5Del3')],
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/>
          <polyline points="22 4 12 14.01 9 11.01"/>
        </svg>
      ),
      color: '#ec4899',
    },
  ], [t, language]);

  return (
    <section ref={sectionRef} className="process-section" id="proceso">
      {/* Background */}
      <div className="process-section__bg">
        <div className="process-section__bg-gradient" />
        <div className="process-section__bg-grid" />
        <div className="process-section__bg-glow process-section__bg-glow--1" />
        <div className="process-section__bg-glow process-section__bg-glow--2" />
      </div>

      <div className="process-section__container">
        {/* Header */}
        <div className="process-section__header">
          <span className="process-section__badge">
            <span className="process-section__badge-dot" />
            {t('process.badge')}
          </span>
          <h2 className="process-section__title">
            {t('process.title')} <span className="process-section__title-gradient">{t('process.titleHighlight')}</span>
          </h2>
          <p className="process-section__subtitle">{t('process.description')}</p>
        </div>

        {/* Main Content - Split Layout */}
        <div className="process-section__content">
          {/* Left - Timeline */}
          <div className="process-section__timeline">
            {/* Progress Line */}
            <div className="process-section__progress">
              <div className="process-section__progress-track" />
              <div className="process-section__progress-fill" />
            </div>

            {/* Steps */}
            {steps.map((step, index) => (
              <div
                key={index}
                className={`process-section__step ${activeStep === index ? 'is-active' : ''}`}
                onMouseEnter={() => setActiveStep(index)}
                style={{ '--step-color': step.color }}
              >
                {/* Step Marker */}
                <div className="process-section__step-marker">
                  <span className="process-section__step-number">{step.number}</span>
                  <div className="process-section__step-dot">
                    <span className="process-section__step-dot-ring" />
                  </div>
                </div>

                {/* Step Card */}
                <div className="process-section__step-card">
                  <div className="process-section__step-header">
                    <div className="process-section__step-icon">
                      {step.icon}
                    </div>
                    <div className="process-section__step-meta">
                      <h3 className="process-section__step-title">{step.title}</h3>
                      <span className="process-section__step-duration">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="12" cy="12" r="10"/>
                          <path d="M12 6v6l4 2"/>
                        </svg>
                        {step.duration}
                      </span>
                    </div>
                  </div>

                  <p className="process-section__step-description">{step.description}</p>

                  {/* Deliverables */}
                  <div className="process-section__step-deliverables">
                    <span className="process-section__step-deliverables-label">{t('process.deliverables')}</span>
                    <ul className="process-section__step-deliverables-list">
                      {step.deliverables.map((item, i) => (
                        <li key={i}>
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <polyline points="20 6 9 17 4 12"/>
                          </svg>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Hover shine */}
                  <div className="process-section__step-shine" />
                </div>
              </div>
            ))}
          </div>

          {/* Right - Visual */}
          <div className="process-section__visual">
            <div className="process-section__visual-card">
              {/* Animated rings */}
              <div className="process-section__visual-rings">
                <div className="process-section__visual-ring process-section__visual-ring--1" />
                <div className="process-section__visual-ring process-section__visual-ring--2" />
                <div className="process-section__visual-ring process-section__visual-ring--3" />
              </div>

              {/* Center icon */}
              <div className="process-section__visual-center" style={{ '--active-color': steps[activeStep]?.color }}>
                <div className="process-section__visual-icon">
                  {steps[activeStep]?.icon}
                </div>
                <span className="process-section__visual-step">{steps[activeStep]?.number}</span>
                <span className="process-section__visual-title">{steps[activeStep]?.title}</span>
              </div>

              {/* Floating elements */}
              <div className="process-section__visual-float process-section__visual-float--1">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                </svg>
              </div>
              <div className="process-section__visual-float process-section__visual-float--2">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="16 18 22 12 16 6"/>
                  <polyline points="8 6 2 12 8 18"/>
                </svg>
              </div>
              <div className="process-section__visual-float process-section__visual-float--3">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/>
                  <polyline points="22 4 12 14.01 9 11.01"/>
                </svg>
              </div>

              {/* Stats */}
              <div className="process-section__visual-stats">
                <div className="process-section__visual-stat">
                  <span className="process-section__visual-stat-value">100%</span>
                  <span className="process-section__visual-stat-label">{t('process.transparency')}</span>
                </div>
                <div className="process-section__visual-stat">
                  <span className="process-section__visual-stat-value">24/7</span>
                  <span className="process-section__visual-stat-label">{t('process.communication')}</span>
                </div>
              </div>

              {/* Glow */}
              <div className="process-section__visual-glow" style={{ '--glow-color': steps[activeStep]?.color }} />
            </div>

            {/* Additional info card */}
            <div className="process-section__info-card">
              <div className="process-section__info-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  <path d="M9 12l2 2 4-4"/>
                </svg>
              </div>
              <div className="process-section__info-content">
                <h4>{t('process.guaranteeTitle')}</h4>
                <p>{t('process.guaranteeDesc')}</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="process-section__cta">
          <div className="process-section__cta-content">
            <p>{t('process.ctaText')}</p>
            <a href="#contacto" className="process-section__cta-button">
              <span>{t('process.ctaButton')}</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
