import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useI18n } from '../contexts/I18nContext';
import ContactModal from '../components/ContactModal';

gsap.registerPlugin(ScrollTrigger);

/**
 * LegalPage - Terms of Service & Privacy Policy
 * Professional legal page for Plexify Studio
 */
const LegalPage = () => {
  const pageRef = useRef(null);
  const { t } = useI18n();
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animation
      gsap.fromTo('.legal-hero__title',
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }
      );

      gsap.fromTo('.legal-hero__subtitle',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, delay: 0.2, ease: 'power3.out' }
      );

      // Content sections animation
      gsap.fromTo('.legal__section',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.legal__content',
            start: 'top 80%',
            once: true,
          }
        }
      );
    }, pageRef);

    return () => ctx.revert();
  }, []);

  const currentDate = new Date().toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div ref={pageRef} className="legal-page">
      {/* Hero Section */}
      <section className="legal-hero">
        <div className="legal-hero__bg">
          <div className="legal-hero__gradient" />
          <div className="legal-hero__glow legal-hero__glow--1" />
          <div className="legal-hero__glow legal-hero__glow--2" />
        </div>

        <div className="legal-hero__container">
          <h1 className="legal-hero__title">{t('legal.title')}</h1>
          <p className="legal-hero__subtitle">{t('legal.subtitle')}</p>
          <span className="legal-hero__date">{t('legal.lastUpdated')}: {currentDate}</span>
        </div>
      </section>

      {/* Content Section */}
      <section className="legal">
        <div className="legal__container">
          <div className="legal__content">

            {/* Terms of Service */}
            <div className="legal__block" id="terms">
              <h2 className="legal__block-title">
                <span className="legal__block-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="16" y1="13" x2="8" y2="13" />
                    <line x1="16" y1="17" x2="8" y2="17" />
                    <polyline points="10 9 9 9 8 9" />
                  </svg>
                </span>
                {t('legal.termsTitle')}
              </h2>

              <div className="legal__section">
                <h3 className="legal__section-title">{t('legal.terms.acceptance.title')}</h3>
                <p className="legal__text">{t('legal.terms.acceptance.content')}</p>
              </div>

              <div className="legal__section">
                <h3 className="legal__section-title">{t('legal.terms.services.title')}</h3>
                <p className="legal__text">{t('legal.terms.services.content')}</p>
                <ul className="legal__list">
                  <li>{t('legal.terms.services.item1')}</li>
                  <li>{t('legal.terms.services.item2')}</li>
                  <li>{t('legal.terms.services.item3')}</li>
                  <li>{t('legal.terms.services.item4')}</li>
                </ul>
              </div>

              <div className="legal__section">
                <h3 className="legal__section-title">{t('legal.terms.payment.title')}</h3>
                <p className="legal__text">{t('legal.terms.payment.content')}</p>
              </div>

              <div className="legal__section">
                <h3 className="legal__section-title">{t('legal.terms.intellectual.title')}</h3>
                <p className="legal__text">{t('legal.terms.intellectual.content')}</p>
              </div>

              <div className="legal__section">
                <h3 className="legal__section-title">{t('legal.terms.revisions.title')}</h3>
                <p className="legal__text">{t('legal.terms.revisions.content')}</p>
              </div>

              <div className="legal__section">
                <h3 className="legal__section-title">{t('legal.terms.termination.title')}</h3>
                <p className="legal__text">{t('legal.terms.termination.content')}</p>
              </div>

              <div className="legal__section">
                <h3 className="legal__section-title">{t('legal.terms.liability.title')}</h3>
                <p className="legal__text">{t('legal.terms.liability.content')}</p>
              </div>
            </div>

            {/* Divider */}
            <div className="legal__divider" />

            {/* Privacy Policy */}
            <div className="legal__block" id="privacy">
              <h2 className="legal__block-title">
                <span className="legal__block-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                </span>
                {t('legal.privacyTitle')}
              </h2>

              <div className="legal__section">
                <h3 className="legal__section-title">{t('legal.privacy.collection.title')}</h3>
                <p className="legal__text">{t('legal.privacy.collection.content')}</p>
                <ul className="legal__list">
                  <li>{t('legal.privacy.collection.item1')}</li>
                  <li>{t('legal.privacy.collection.item2')}</li>
                  <li>{t('legal.privacy.collection.item3')}</li>
                </ul>
              </div>

              <div className="legal__section">
                <h3 className="legal__section-title">{t('legal.privacy.usage.title')}</h3>
                <p className="legal__text">{t('legal.privacy.usage.content')}</p>
                <ul className="legal__list">
                  <li>{t('legal.privacy.usage.item1')}</li>
                  <li>{t('legal.privacy.usage.item2')}</li>
                  <li>{t('legal.privacy.usage.item3')}</li>
                </ul>
              </div>

              <div className="legal__section">
                <h3 className="legal__section-title">{t('legal.privacy.protection.title')}</h3>
                <p className="legal__text">{t('legal.privacy.protection.content')}</p>
              </div>

              <div className="legal__section">
                <h3 className="legal__section-title">{t('legal.privacy.cookies.title')}</h3>
                <p className="legal__text">{t('legal.privacy.cookies.content')}</p>
              </div>

              <div className="legal__section">
                <h3 className="legal__section-title">{t('legal.privacy.thirdParty.title')}</h3>
                <p className="legal__text">{t('legal.privacy.thirdParty.content')}</p>
              </div>

              <div className="legal__section">
                <h3 className="legal__section-title">{t('legal.privacy.rights.title')}</h3>
                <p className="legal__text">{t('legal.privacy.rights.content')}</p>
                <ul className="legal__list">
                  <li>{t('legal.privacy.rights.item1')}</li>
                  <li>{t('legal.privacy.rights.item2')}</li>
                  <li>{t('legal.privacy.rights.item3')}</li>
                </ul>
              </div>

              <div className="legal__section">
                <h3 className="legal__section-title">{t('legal.privacy.changes.title')}</h3>
                <p className="legal__text">{t('legal.privacy.changes.content')}</p>
              </div>
            </div>

            {/* Contact Section */}
            <div className="legal__contact">
              <h3 className="legal__contact-title">{t('legal.contact.title')}</h3>
              <p className="legal__contact-text">{t('legal.contact.content')}</p>
              <div className="legal__contact-info">
                <button onClick={() => setIsContactModalOpen(true)} className="legal__contact-link">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                  </svg>
                  contact@plexifystudio.com
                </button>
                <a href="https://wa.me/573147083182" target="_blank" rel="noopener noreferrer" className="legal__contact-link">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  +57 314 708 3182
                </a>
              </div>
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

export default LegalPage;
