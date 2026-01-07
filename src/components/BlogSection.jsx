import { useEffect, useRef, useMemo } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useI18n } from '../contexts/I18nContext';

gsap.registerPlugin(ScrollTrigger);

/**
 * BlogSection - Articles and Resources
 */
const BlogSection = () => {
  const sectionRef = useRef(null);
  const { t, language } = useI18n();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.blog-section__header > *',
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

      gsap.fromTo(
        '.blog-section__card',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.blog-section__grid',
            start: 'top 85%',
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const articles = useMemo(() => [
    {
      category: t('blog.designCategory'),
      title: t('blog.article1Title'),
      excerpt: t('blog.article1Excerpt'),
      readTime: '5 min',
      gradient: 'linear-gradient(135deg, #8b5cf6, #a855f7)',
    },
    {
      category: t('blog.developmentCategory'),
      title: t('blog.article2Title'),
      excerpt: t('blog.article2Excerpt'),
      readTime: '7 min',
      gradient: 'linear-gradient(135deg, #06b6d4, #22d3ee)',
    },
    {
      category: t('blog.strategyCategory'),
      title: t('blog.article3Title'),
      excerpt: t('blog.article3Excerpt'),
      readTime: '6 min',
      gradient: 'linear-gradient(135deg, #f59e0b, #fbbf24)',
    },
  ], [t, language]);

  return (
    <section ref={sectionRef} className="blog-section" id="blog">
      <div className="blog-section__container">
        {/* Header */}
        <div className="blog-section__header">
          <span className="blog-section__badge">{t('blog.badge')}</span>
          <h2 className="blog-section__title">
            {t('blog.title')}<br />
            <span className="blog-section__title-gradient">{t('blog.titleHighlight')}</span>
          </h2>
          <p className="blog-section__description">
            {t('blog.description')}
          </p>
        </div>

        {/* Articles Grid */}
        <div className="blog-section__grid">
          {articles.map((article, index) => (
            <article key={index} className="blog-section__card">
              <div className="blog-section__card-image" style={{ background: article.gradient }}>
                <span className="blog-section__card-category">{article.category}</span>
              </div>
              <div className="blog-section__card-content">
                <h3 className="blog-section__card-title">{article.title}</h3>
                <p className="blog-section__card-excerpt">{article.excerpt}</p>
                <div className="blog-section__card-meta">
                  <span className="blog-section__card-time">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"/>
                      <path d="M12 6v6l4 2"/>
                    </svg>
                    {article.readTime}
                  </span>
                  <a href="#" className="blog-section__card-link">
                    {t('blog.readMore')}
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
};

export default BlogSection;
