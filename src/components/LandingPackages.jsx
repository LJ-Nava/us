import { useEffect, useState, useCallback } from 'react';
import { useI18n } from '../contexts/I18nContext';

/* ——— Import ALL project images via Vite glob ——— */
const construccionesImgs = Object.values(
  import.meta.glob('../assets/Consturcciones/*.webp', { eager: true, import: 'default' })
);
const ecommerceImgs = Object.values(
  import.meta.glob('../assets/e-commerce/*.png', { eager: true, import: 'default' })
);
const neuroImgs = Object.values(
  import.meta.glob('../assets/neuro/*.webp', { eager: true, import: 'default' })
);

const IMG_SETS = [construccionesImgs, ecommerceImgs, neuroImgs];

const Check = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
);

const LandingPackages = () => {
  const [slides, setSlides] = useState([0, 0, 0]);
  const [lightbox, setLightbox] = useState(null); // { project: idx, slide: idx }
  const { t } = useI18n();

  const basicFeatures = [
    t('landing.basicF1'), t('landing.basicF2'), t('landing.basicF3'),
    t('landing.basicF4'), t('landing.basicF5'), t('landing.basicF6'),
    t('landing.basicF7'), t('landing.basicF8'),
  ];
  const proFeatures = [
    t('landing.proF1'), t('landing.proF2'), t('landing.proF3'),
    t('landing.proF4'), t('landing.proF5'), t('landing.proF6'),
    t('landing.proF7'), t('landing.proF8'), t('landing.proF9'),
  ];

  const projects = [
    { name: t('landing.projectNameConstruction'), cat: t('landing.projectCatConstruction'), imgs: IMG_SETS[0] },
    { name: t('landing.projectNameEcommerce'), cat: t('landing.projectCatEcommerce'), imgs: IMG_SETS[1] },
    { name: t('landing.projectNameHealthcare'), cat: t('landing.projectCatHealthcare'), imgs: IMG_SETS[2] },
  ];

  /* Navigation */
  const next = useCallback((idx) => {
    setSlides(p => { const n = [...p]; n[idx] = (n[idx] + 1) % IMG_SETS[idx].length; return n; });
  }, []);

  const prev = useCallback((idx) => {
    setSlides(p => { const n = [...p]; n[idx] = (n[idx] - 1 + IMG_SETS[idx].length) % IMG_SETS[idx].length; return n; });
  }, []);

  const goTo = useCallback((idx, slide) => {
    setSlides(p => { const n = [...p]; n[idx] = slide; return n; });
  }, []);

  /* Auto-advance (slow, user can override) */
  useEffect(() => {
    if (lightbox) return; // pause when lightbox open
    const iv = setInterval(() => {
      setSlides(p => p.map((s, i) => (s + 1) % IMG_SETS[i].length));
    }, 7000);
    return () => clearInterval(iv);
  }, [lightbox]);

  /* Lightbox */
  const openLightbox = (pIdx, iIdx) => {
    setLightbox({ project: pIdx, slide: iIdx });
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightbox(null);
    document.body.style.overflow = '';
  };

  const lbNext = () => {
    if (!lightbox) return;
    const { project, slide } = lightbox;
    setLightbox({ project, slide: (slide + 1) % IMG_SETS[project].length });
  };

  const lbPrev = () => {
    if (!lightbox) return;
    const { project, slide } = lightbox;
    setLightbox({ project, slide: (slide - 1 + IMG_SETS[project].length) % IMG_SETS[project].length });
  };

  // Keyboard navigation
  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') lbNext();
      if (e.key === 'ArrowLeft') lbPrev();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightbox]);

  /* No scroll-triggered animations — content loads visible */

  const scrollToContact = () => {
    document.getElementById('landing-contacto')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="lp" id="landing-paquetes">
      <div className="lp__line" />

      <div className="lp__inner">
        {/* ——— Header ——— */}
        <div className="lp__header">
          <span className="lp__eyebrow">{t('landing.packagesEyebrow')}</span>
          <h2 className="lp__title">{t('landing.packagesTitle')}</h2>
        </div>

        {/* Note */}
        <div className="lp__note">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
          <p>{t('landing.packagesNote')}</p>
        </div>

        {/* ——— Package Cards ——— */}
        <div className="lp__grid">
          {/* Básico */}
          <article className="lp__card">
            <div className="lp__card-top">
              <h3 className="lp__card-name">{t('landing.basicName')}</h3>
              <p className="lp__card-tag">{t('landing.basicTag')}</p>
              <div className="lp__price">
                <span className="lp__price-amount">{t('landing.desde')} $900.000</span>
                <span className="lp__price-cur">COP</span>
              </div>
              <div className="lp__delivery">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                {t('landing.basicDelivery')}
              </div>
            </div>
            <div className="lp__divider" />
            <div className="lp__card-body">
              <span className="lp__includes">{t('landing.includes')}</span>
              <ul className="lp__features">
                {basicFeatures.map((f, i) => (
                  <li key={i}><Check /><span>{f}</span></li>
                ))}
              </ul>
              <div className="lp__bonus">
                <span className="lp__bonus-label">{t('landing.bonus')}:</span> {t('landing.basicBonus')}
              </div>
            </div>
            <button className="lp__cta" onClick={scrollToContact}>
              {t('landing.packageCta')}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </button>
          </article>

          {/* Profesional */}
          <article className="lp__card lp__card--pro">
            <div className="lp__card-glow" />
            <div className="lp__card-badge">{t('landing.mostChosen')}</div>
            <div className="lp__card-top">
              <h3 className="lp__card-name">{t('landing.proName')}</h3>
              <p className="lp__card-tag">{t('landing.proTag')}</p>
              <div className="lp__price lp__price--accent">
                <span className="lp__price-amount">{t('landing.desde')} $1.400.000</span>
                <span className="lp__price-cur">COP</span>
              </div>
              <div className="lp__delivery">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                {t('landing.proDelivery')}
              </div>
            </div>
            <div className="lp__divider" />
            <div className="lp__card-body">
              <span className="lp__includes">{t('landing.includes')}</span>
              <ul className="lp__features">
                {proFeatures.map((f, i) => (
                  <li key={i}><Check /><span>{f}</span></li>
                ))}
              </ul>
              <div className="lp__bonus lp__bonus--accent">
                <span className="lp__bonus-label">{t('landing.bonus')}:</span> {t('landing.proBonus')}
              </div>
            </div>
            <button className="lp__cta lp__cta--pro" onClick={scrollToContact}>
              {t('landing.packageCtaPro')}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </button>
          </article>
        </div>

        {/* ——— Showcase: 3 Project Modules ——— */}
        <div className="lp__showcase">
          <div className="lp__showcase-header">
            <span className="lp__eyebrow">{t('landing.carouselEyebrow')}</span>
            <h3 className="lp__showcase-title">{t('landing.carouselTitle')}</h3>
          </div>

          <div className="lp__projects">
            {projects.map((project, pIdx) => (
              <div key={pIdx} className="lp__project">
                <div className="lp__project-viewport">
                  {project.imgs.map((img, iIdx) => (
                    <div
                      key={iIdx}
                      className={`lp__project-slide ${iIdx === slides[pIdx] ? 'lp__project-slide--on' : ''}`}
                      onClick={() => openLightbox(pIdx, iIdx)}
                    >
                      <img src={img} alt={`${project.name} - ${iIdx + 1}`} loading="lazy" />
                      {/* Zoom hint */}
                      <span className="lp__project-zoom">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/><path d="M11 8v6M8 11h6"/></svg>
                      </span>
                    </div>
                  ))}

                  {/* Arrows */}
                  <button className="lp__project-arrow lp__project-arrow--prev" onClick={() => prev(pIdx)} aria-label="Anterior">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                  </button>
                  <button className="lp__project-arrow lp__project-arrow--next" onClick={() => next(pIdx)} aria-label="Siguiente">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </button>

                  {/* Counter */}
                  <span className="lp__project-counter">{slides[pIdx] + 1} / {project.imgs.length}</span>
                </div>

                {/* Info row */}
                <div className="lp__project-info">
                  <span className="lp__project-cat">{project.cat}</span>
                  <span className="lp__project-name">{project.name}</span>
                </div>

                {/* Dot navigation */}
                <div className="lp__project-dots">
                  {project.imgs.map((_, iIdx) => (
                    <button
                      key={iIdx}
                      className={`lp__project-dot ${iIdx === slides[pIdx] ? 'lp__project-dot--on' : ''}`}
                      onClick={() => goTo(pIdx, iIdx)}
                      aria-label={`Slide ${iIdx + 1}`}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ——— Lightbox Modal ——— */}
      {lightbox && (
        <div className="lp__lightbox" onClick={closeLightbox}>
          <div className="lp__lightbox-wrap" onClick={(e) => e.stopPropagation()}>
            {/* Close */}
            <button className="lp__lightbox-close" onClick={closeLightbox} aria-label="Cerrar">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>

            {/* Image */}
            <img
              className="lp__lightbox-img"
              src={IMG_SETS[lightbox.project][lightbox.slide]}
              alt={`${projects[lightbox.project].name} - ${lightbox.slide + 1}`}
            />

            {/* Nav arrows */}
            <button className="lp__lightbox-arrow lp__lightbox-arrow--prev" onClick={lbPrev} aria-label="Anterior">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
            </button>
            <button className="lp__lightbox-arrow lp__lightbox-arrow--next" onClick={lbNext} aria-label="Siguiente">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </button>

            {/* Info bar */}
            <div className="lp__lightbox-info">
              <span className="lp__lightbox-name">{projects[lightbox.project].name}</span>
              <span className="lp__lightbox-counter">{lightbox.slide + 1} / {IMG_SETS[lightbox.project].length}</span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default LandingPackages;
