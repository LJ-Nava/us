import { useEffect, useRef, useState, useCallback, useMemo, lazy, Suspense } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useI18n } from '../contexts/I18nContext';

// Lazy load 3D backgrounds para mejor performance
const Portfolio3DBackground = lazy(() => import('../components/Portfolio3DBackground'));
const PortfolioHeroBackground = lazy(() => import('../components/PortfolioHeroBackground'));

// Importar imágenes de Romelima
import romelima1 from '../assets/Romelima/1.webp';
import romelima2 from '../assets/Romelima/2.webp';
import romelima3 from '../assets/Romelima/3.webp';
import romelima4 from '../assets/Romelima/4.webp';
import romelima5 from '../assets/Romelima/5.webp';

// Importar imágenes de Lavadero
import lavadero1 from '../assets/CrackenLavadero/1.webp';
import lavadero2 from '../assets/CrackenLavadero/2.webp';
import lavadero3 from '../assets/CrackenLavadero/3.webp';
import lavadero4 from '../assets/CrackenLavadero/4.webp';
import lavadero5 from '../assets/CrackenLavadero/5.webp';
import lavadero6 from '../assets/CrackenLavadero/6.webp';

// Importar imágenes de Construcciones
import construcciones1 from '../assets/Consturcciones/1.webp';
import construcciones2 from '../assets/Consturcciones/2.webp';
import construcciones3 from '../assets/Consturcciones/3.webp';
import construcciones4 from '../assets/Consturcciones/4.webp';
import construcciones5 from '../assets/Consturcciones/5.webp';
import construcciones6 from '../assets/Consturcciones/6.webp';
import construcciones7 from '../assets/Consturcciones/7.webp';
import construcciones8 from '../assets/Consturcciones/8.webp';

// Importar imágenes de Motive
import motive1 from '../assets/motive/1.webp';
import motive2 from '../assets/motive/2.webp';
import motive3 from '../assets/motive/3.webp';
import motive4 from '../assets/motive/4.webp';
import motive5 from '../assets/motive/5.webp';
import motive6 from '../assets/motive/6.webp';
import motive7 from '../assets/motive/7.webp';

// Importar imágenes de NeuroFys
import neuro1 from '../assets/neuro/1.webp';
import neuro2 from '../assets/neuro/2.webp';
import neuro3 from '../assets/neuro/3.webp';
import neuro4 from '../assets/neuro/4.webp';
import neuro5 from '../assets/neuro/5.webp';
import neuro6 from '../assets/neuro/6.webp';
import neuro7 from '../assets/neuro/7.webp';

// Importar imágenes de Physica
import physica1 from '../assets/Physuca/1.webp';
import physica2 from '../assets/Physuca/2.webp';
import physica3 from '../assets/Physuca/3.webp';
import physica4 from '../assets/Physuca/4.webp';
import physica5 from '../assets/Physuca/5.webp';

gsap.registerPlugin(ScrollTrigger);

// Project images config (without translations)
const projectsConfig = [
  {
    id: 1,
    title: 'Romelima',
    categoryKey: 'restaurant',
    descKey: 'romelimaDesc',
    url: 'https://lj-nava.github.io/Romelima/',
    images: [romelima1, romelima2, romelima3, romelima4, romelima5],
    color: '#9b2335',
    tagKeys: ['tagUIUX', 'tagDigitalMenu', 'tagReservations']
  },
  {
    id: 2,
    title: 'El Cracker RYD',
    categoryKey: 'carWash',
    descKey: 'crackerDesc',
    url: 'https://lj-nava.github.io/lavadero/',
    images: [lavadero1, lavadero2, lavadero3, lavadero4, lavadero5, lavadero6],
    color: '#ef4444',
    tagKeys: ['tagPricingSystem', 'tagReservations', 'tagPromotions']
  },
  {
    id: 3,
    title: 'Construcciones EC',
    categoryKey: 'construction',
    descKey: 'construccionesDesc',
    url: 'https://lj-nava.github.io/cracker-web/',
    images: [construcciones1, construcciones2, construcciones3, construcciones4, construcciones5, construcciones6, construcciones7, construcciones8],
    color: '#d4a855',
    tagKeys: ['tagCorporate', 'tagGallery', 'tagQuoteSystem']
  },
  {
    id: 4,
    title: 'Motive Homecare',
    categoryKey: 'healthcare',
    descKey: 'motiveDesc',
    url: 'https://motivehomecare.com',
    images: [motive1, motive2, motive3, motive4, motive5, motive6, motive7],
    color: '#f97316',
    tagKeys: ['tagStaffing', 'tagHealthcare', 'tagB2B']
  },
  {
    id: 5,
    title: 'NeuroFys Y',
    categoryKey: 'saas',
    descKey: 'neuroDesc',
    url: 'https://lj-nava.github.io/Health/',
    images: [neuro1, neuro2, neuro3, neuro4, neuro5, neuro6, neuro7],
    color: '#3b82f6',
    tagKeys: ['tagAI', 'tagEMR', 'tagHIPAA']
  },
  {
    id: 6,
    title: 'Physica Inc',
    categoryKey: 'clinic',
    descKey: 'physicaDesc',
    url: 'https://lj-nava.github.io/PhysicaInc/',
    images: [physica1, physica2, physica3, physica4, physica5],
    color: '#6b7b5c',
    tagKeys: ['tagOnlineAppointments', 'tagServices', 'tagTestimonials']
  }
];

// Animated Counter Component
const AnimatedCounter = ({ target, suffix = '', duration = 2 }) => {
  const counterRef = useRef(null);
  const [count, setCount] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const element = counterRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true;

            const startTime = performance.now();
            const startValue = 0;
            const endValue = parseInt(target);

            const animate = (currentTime) => {
              const elapsed = currentTime - startTime;
              const progress = Math.min(elapsed / (duration * 1000), 1);

              // Easing function
              const easeOutQuart = 1 - Math.pow(1 - progress, 4);
              const currentValue = Math.floor(startValue + (endValue - startValue) * easeOutQuart);

              setCount(currentValue);

              if (progress < 1) {
                requestAnimationFrame(animate);
              }
            };

            requestAnimationFrame(animate);
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [target, duration]);

  return (
    <span ref={counterRef} className="portfolio-page__stat-value">
      {count}{suffix}
    </span>
  );
};

// Image Carousel Component
const ImageCarousel = ({ images, title, isHovered }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isHovered && images.length > 1) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
      }, 1200);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      setCurrentIndex(0);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isHovered, images.length]);

  return (
    <div className="portfolio-page__carousel">
      {images.map((img, idx) => (
        <div
          key={idx}
          className={`portfolio-page__carousel-slide ${idx === currentIndex ? 'is-active' : ''}`}
        >
          <img
            src={img}
            alt={`${title} - Vista ${idx + 1}`}
            loading="lazy"
          />
        </div>
      ))}

      {images.length > 1 && (
        <div className="portfolio-page__carousel-dots">
          {images.map((_, idx) => (
            <span
              key={idx}
              className={`portfolio-page__carousel-dot ${idx === currentIndex ? 'is-active' : ''}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

// Project Card with 3D Tilt Effect
const ProjectCard = ({ project, t }) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);
  const glowRef = useRef(null);

  // Get translated category and description
  const category = t(`portfolioPage.${project.categoryKey}`);
  const description = t(`portfolioPage.${project.descKey}`);

  const handleMouseMove = useCallback((e) => {
    if (!cardRef.current) return;

    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;

    // Update glow position
    if (glowRef.current) {
      glowRef.current.style.background = `radial-gradient(600px circle at ${x}px ${y}px, ${project.color}30, transparent 40%)`;
    }
  }, [project.color]);

  const handleMouseLeave = useCallback(() => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    setIsHovered(false);
  }, []);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  return (
    <a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      className="portfolio-page__card"
      ref={cardRef}
      style={{ '--card-color': project.color }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="portfolio-page__card-glow" ref={glowRef}></div>
      <div className="portfolio-page__card-border"></div>

      <div className="portfolio-page__browser">
        <div className="portfolio-page__browser-header">
          <div className="portfolio-page__browser-dots">
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div className="portfolio-page__browser-url">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
              <path d="M7 11V7a5 5 0 0110 0v4"></path>
            </svg>
            <span>{project.url.replace('https://', '')}</span>
          </div>
        </div>

        <div className="portfolio-page__screenshot-wrapper">
          <ImageCarousel
            images={project.images}
            title={project.title}
            isHovered={isHovered}
          />
          <div className="portfolio-page__overlay"></div>

          {/* Hover particles */}
          {isHovered && (
            <div className="portfolio-page__particles">
              {[...Array(6)].map((_, i) => (
                <span key={i} className="portfolio-page__particle" style={{
                  '--delay': `${i * 0.1}s`,
                  '--x': `${Math.random() * 100}%`,
                  '--color': project.color
                }}></span>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="portfolio-page__card-content">
        <div className="portfolio-page__card-header">
          <span className="portfolio-page__card-category">{category}</span>
          <div className="portfolio-page__card-link-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"></path>
              <polyline points="15 3 21 3 21 9"></polyline>
              <line x1="10" y1="14" x2="21" y2="3"></line>
            </svg>
          </div>
        </div>

        <h3 className="portfolio-page__card-title">{project.title}</h3>
        <p className="portfolio-page__card-description">{description}</p>

        <div className="portfolio-page__card-tags">
          {project.tagKeys.map((tagKey, i) => (
            <span key={i} className="portfolio-page__card-tag">{t(`portfolioPage.${tagKey}`)}</span>
          ))}
        </div>
      </div>

      {/* Shine effect */}
      <div className="portfolio-page__card-shine"></div>
    </a>
  );
};

// 3D Testimonials Carousel - Ultra Premium Infinite Rotation
const Testimonials3DCarousel = ({ t }) => {
  const testimonials = t('portfolioPage.testimonials');
  const totalSlides = testimonials.length;

  return (
    <div className="testimonial-carousel">
      {/* Premium background layers */}
      <div className="testimonial-carousel__bg">
        <div className="testimonial-carousel__gradient-top" />
        <div className="testimonial-carousel__gradient-bottom" />
        <div className="testimonial-carousel__particles">
          {[...Array(20)].map((_, i) => (
            <span key={i} className="testimonial-carousel__particle" style={{ '--i': i }} />
          ))}
        </div>
      </div>

      {/* Elegant Header */}
      <div className="testimonial-carousel__header">
        <div className="testimonial-carousel__header-line" />
        <span className="testimonial-carousel__eyebrow">{t('portfolioPage.trustedBy')}</span>
        <h2 className="testimonial-carousel__title">
          {t('portfolioPage.testimonialsTitle')}{' '}
          <span className="testimonial-carousel__title-gold">
            {t('portfolioPage.testimonialsTitleHighlight')}
          </span>
        </h2>
        <p className="testimonial-carousel__subtitle">
          {t('portfolioPage.testimonialsSubtitle')}
        </p>
      </div>

      {/* 3D Scene */}
      <div className="testimonial-carousel__scene">
        {/* Rotating Ring */}
        <div className="testimonial-carousel__ring">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="testimonial-carousel__card"
              style={{ '--angle': `${index * (360 / totalSlides)}deg`, '--index': index }}
            >
              <div className="testimonial-carousel__card-inner">
                {/* Card shine effect */}
                <div className="testimonial-carousel__card-shine" />

                {/* Quote decoration */}
                <div className="testimonial-carousel__quote-mark">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                  </svg>
                </div>

                {/* 5 Stars */}
                <div className="testimonial-carousel__stars">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} viewBox="0 0 24 24" fill="currentColor">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                    </svg>
                  ))}
                </div>

                {/* Testimonial text */}
                <blockquote className="testimonial-carousel__text">
                  {testimonial.comment}
                </blockquote>

                {/* Author info */}
                <div className="testimonial-carousel__author">
                  <div className="testimonial-carousel__avatar">
                    <span>{testimonial.name.charAt(0)}</span>
                  </div>
                  <div className="testimonial-carousel__author-details">
                    <cite className="testimonial-carousel__name">{testimonial.name}</cite>
                    <span className="testimonial-carousel__role">{t('portfolioPage.verifiedClient')}</span>
                  </div>
                </div>

                {/* Decorative corner */}
                <div className="testimonial-carousel__corner" />
              </div>
            </div>
          ))}
        </div>

        {/* Center glow */}
        <div className="testimonial-carousel__center-glow" />
      </div>

      {/* Bottom decoration */}
      <div className="testimonial-carousel__footer">
        <div className="testimonial-carousel__footer-line" />
      </div>
    </div>
  );
};

const PortfolioPage = () => {
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const { t, language } = useI18n();

  useEffect(() => {
    window.scrollTo(0, 0);

    const ctx = gsap.context(() => {
      // Hero content animation
      const tl = gsap.timeline({ delay: 0.3 });

      tl.fromTo(
        '.portfolio-page__back',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }
      )
        .fromTo(
          '.portfolio-page__eyebrow',
          { opacity: 0, y: 30, scale: 0.9 },
          { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'back.out(1.7)' },
          '-=0.3'
        )
        .fromTo(
          '.portfolio-page__title',
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
          '-=0.3'
        )
        .fromTo(
          '.portfolio-page__subtitle',
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
          '-=0.4'
        )
        .fromTo(
          '.portfolio-page__stats',
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
          '-=0.3'
        );

      // Cards stagger animation
      gsap.fromTo(
        '.portfolio-page__card',
        { opacity: 0, y: 80, rotateX: -15 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          delay: 1.2
        }
      );

      // Testimonials animation
      gsap.fromTo(
        '.portfolio-page__testimonials-title',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.portfolio-page__testimonials',
            start: 'top 80%'
          }
        }
      );

      gsap.fromTo(
        '.portfolio-page__testimonial',
        { opacity: 0, y: 40, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.5,
          stagger: 0.06,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.portfolio-page__testimonials-grid',
            start: 'top 85%'
          }
        }
      );

      // CTA animation
      gsap.fromTo(
        '.portfolio-page__cta',
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.portfolio-page__cta',
            start: 'top 85%'
          }
        }
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="portfolio-page" ref={heroRef}>
      {/* 3D Background - Lazy loaded */}
      <Suspense fallback={null}>
        <Portfolio3DBackground />
      </Suspense>

      <section className="portfolio-page__hero">
        <Suspense fallback={null}>
          <PortfolioHeroBackground />
        </Suspense>
        <div className="portfolio-page__hero-bg">
          <div className="portfolio-page__hero-grid"></div>
        </div>

        <div className="portfolio-page__hero-content">
          <span className="portfolio-page__eyebrow">
            <span className="portfolio-page__eyebrow-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
            </span>
            {t('portfolioPage.eyebrow')}
          </span>

          <h1 className="portfolio-page__title" ref={titleRef}>
            {t('portfolioPage.title')}{' '}
            <span className="portfolio-page__title-highlight">{t('portfolioPage.titleHighlight')}</span>{' '}
            {t('portfolioPage.titleEnd')}
          </h1>

          <p className="portfolio-page__subtitle">
            {t('portfolioPage.subtitle')}
          </p>
        </div>
      </section>

      <section className="portfolio-page__projects">
        <div className="portfolio-page__container">
          <div className="portfolio-page__grid">
            {projectsConfig.map((project) => (
              <ProjectCard key={project.id} project={project} t={t} />
            ))}
          </div>
        </div>

        {/* Testimonials Section - 3D Carousel (outside container for full width) */}
        <Testimonials3DCarousel t={t} />
      </section>
    </div>
  );
};

export default PortfolioPage;
