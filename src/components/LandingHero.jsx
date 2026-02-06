import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useI18n } from '../contexts/I18nContext';

gsap.registerPlugin(ScrollTrigger);

const LandingHero = () => {
  const ref = useRef(null);
  const { t } = useI18n();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Only the entrance animation on page load
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo('.lh__tag', { opacity: 0, y: 20, scale: 0.95 }, { opacity: 1, y: 0, scale: 1, duration: 0.6 })
        .fromTo('.lh__title', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1 }, '-=0.3')
        .fromTo('.lh__sub', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, '-=0.5')
        .fromTo('.lh__cta-row', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5 }, '-=0.3')
        .fromTo('.lh__bento-card', { opacity: 0, scale: 0.88, y: 30 }, {
          opacity: 1, scale: 1, y: 0, stagger: 0.1, duration: 0.7, ease: 'back.out(1.4)',
        }, '-=0.4');

      // Floating orbs (decorative, always running)
      gsap.to('.lh__orb--1', { y: -30, x: 20, duration: 6, repeat: -1, yoyo: true, ease: 'sine.inOut' });
      gsap.to('.lh__orb--2', { y: 25, x: -15, duration: 8, repeat: -1, yoyo: true, ease: 'sine.inOut' });
    }, ref);
    return () => ctx.revert();
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const trustItems = [t('landing.trust1'), t('landing.trust2'), t('landing.trust3')];

  return (
    <section ref={ref} className="lh">
      {/* === Background === */}
      <div className="lh__bg">
        <div className="lh__orb lh__orb--1" />
        <div className="lh__orb lh__orb--2" />
        <div className="lh__grid" />
      </div>

      <div className="lh__inner">
        {/* ——— Asymmetric Split Hero ——— */}
        <div className="lh__split">
          {/* Left — Content */}
          <div className="lh__content">
            <span className="lh__tag">
              <span className="lh__pulse" />
              {t('landing.heroTag')}
            </span>

            <h1 className="lh__title">
              {t('landing.heroTitle1')}<br />
              <span className="lh__accent">{t('landing.heroTitleAccent')}</span>
            </h1>

            <p className="lh__sub">{t('landing.heroSubtitle')}</p>

            <div className="lh__cta-row">
              <button className="lh__btn-primary" onClick={() => scrollTo('landing-contacto')}>
                <span>{t('landing.heroCta')}</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
              </button>
              <button className="lh__btn-ghost" onClick={() => scrollTo('landing-paquetes')}>
                {t('landing.heroScroll')}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14m-6-6l6 6 6-6" /></svg>
              </button>
            </div>
          </div>

          {/* Right — Bento Stats Grid */}
          <div className="lh__bento">
            {/* Big stat — spans full bento width */}
            <div className="lh__bento-card lh__bento-card--hero">
              <div className="lh__bento-glow" />
              <span className="lh__bento-val">{t('landing.stat1Val')}</span>
              <span className="lh__bento-label">{t('landing.stat1Label')}</span>
            </div>

            {/* Two small stat cards */}
            <div className="lh__bento-card lh__bento-card--sm">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10" /><path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" /></svg>
              <span className="lh__bento-val">{t('landing.stat2Val')}</span>
              <span className="lh__bento-label">{t('landing.stat2Label')}</span>
            </div>
            <div className="lh__bento-card lh__bento-card--sm">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M22 11.08V12a10 10 0 11-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
              <span className="lh__bento-val">{t('landing.stat3Val')}</span>
              <span className="lh__bento-label">{t('landing.stat3Label')}</span>
            </div>

            {/* Brand card */}
            <div className="lh__bento-card lh__bento-card--brand">
              <div className="lh__bento-logo">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" /></svg>
              </div>
              <div>
                <span className="lh__bento-brand">Plexify Studio</span>
                <span className="lh__bento-brandtag">{t('landing.heroTag')}</span>
              </div>
            </div>
          </div>
        </div>

        {/* ——— Trust Marquee ——— */}
        <div className="lh__trust">
          <div className="lh__trust-track">
            {[...trustItems, ...trustItems, ...trustItems, ...trustItems].map((txt, i) => (
              <span key={i} className="lh__trust-item">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                {txt}
              </span>
            ))}
          </div>
        </div>

        {/* ——— Problem VS Solution ——— */}
        <div className="lh__ps">
          <div className="lh__ps-card lh__ps-card--problem">
            <span className="lh__ps-icon lh__ps-icon--red">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
            </span>
            <div>
              <span className="lh__ps-tag lh__ps-tag--red">{t('landing.problemLabel')}</span>
              <p>{t('landing.problem')}</p>
            </div>
          </div>

          <div className="lh__ps-vs">VS</div>

          <div className="lh__ps-card lh__ps-card--solution">
            <span className="lh__ps-icon lh__ps-icon--green">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
            </span>
            <div>
              <span className="lh__ps-tag lh__ps-tag--green">{t('landing.solutionLabel')}</span>
              <p>{t('landing.solution')}</p>
            </div>
          </div>
        </div>

        {/* ——— 3 Pillars with step numbers ——— */}
        <div className="lh__pillars">
          {[
            { num: '01', label: t('landing.pillar1'), sub: t('landing.pillar1Sub'), icon: (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" /></svg>
            )},
            { num: '02', label: t('landing.pillar2'), sub: t('landing.pillar2Sub'), icon: (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" /></svg>
            )},
            { num: '03', label: t('landing.pillar3'), sub: t('landing.pillar3Sub'), icon: (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" /></svg>
            )},
          ].map((p, i) => (
            <div key={i} className="lh__pillar">
              <span className="lh__pillar-num">{p.num}</span>
              <div className="lh__pillar-icon">{p.icon}</div>
              <span className="lh__pillar-label">{p.label}</span>
              <span className="lh__pillar-sub">{p.sub}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LandingHero;
