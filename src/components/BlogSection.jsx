import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * BlogSection - Articles and Resources
 */
const BlogSection = () => {
  const sectionRef = useRef(null);

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

  const articles = [
    {
      category: 'Diseno',
      title: 'Tendencias UI/UX que dominaran el 2025',
      excerpt: 'Descubre las ultimas tendencias en diseno de interfaces que estan transformando la experiencia digital.',
      readTime: '5 min',
      gradient: 'linear-gradient(135deg, #8b5cf6, #a855f7)',
    },
    {
      category: 'Desarrollo',
      title: 'Por que elegir React para tu proximo proyecto',
      excerpt: 'Analizamos las ventajas de React y cuando es la mejor opcion para tu aplicacion web.',
      readTime: '7 min',
      gradient: 'linear-gradient(135deg, #06b6d4, #22d3ee)',
    },
    {
      category: 'Estrategia',
      title: 'Como optimizar la conversion de tu landing page',
      excerpt: 'Tecnicas probadas para aumentar las conversiones y maximizar el ROI de tu sitio web.',
      readTime: '6 min',
      gradient: 'linear-gradient(135deg, #f59e0b, #fbbf24)',
    },
  ];

  const resources = [
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M4 19.5A2.5 2.5 0 016.5 17H20"/>
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/>
        </svg>
      ),
      title: 'Guia de Branding',
      description: 'Todo lo que necesitas saber para construir una marca solida.',
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="3" y="3" width="18" height="18" rx="2"/>
          <path d="M3 9h18M9 21V9"/>
        </svg>
      ),
      title: 'Checklist de Lanzamiento',
      description: 'Los 50 puntos esenciales antes de lanzar tu sitio web.',
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/>
        </svg>
      ),
      title: 'Kit de Herramientas',
      description: 'Las mejores herramientas que usamos en nuestros proyectos.',
    },
  ];

  return (
    <section ref={sectionRef} className="blog-section" id="blog">
      <div className="blog-section__container">
        {/* Header */}
        <div className="blog-section__header">
          <span className="blog-section__badge">Blog & Recursos</span>
          <h2 className="blog-section__title">
            Conocimiento que<br />
            <span className="blog-section__title-gradient">impulsa resultados</span>
          </h2>
          <p className="blog-section__description">
            Compartimos lo que aprendemos. Articulos, guias y recursos para ayudarte
            a tomar mejores decisiones digitales.
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
                    Leer mas
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Resources */}
        <div className="blog-section__resources">
          <h3 className="blog-section__resources-title">Recursos Gratuitos</h3>
          <div className="blog-section__resources-grid">
            {resources.map((resource, index) => (
              <a key={index} href="#" className="blog-section__resource">
                <div className="blog-section__resource-icon">
                  {resource.icon}
                </div>
                <div className="blog-section__resource-info">
                  <span className="blog-section__resource-title">{resource.title}</span>
                  <span className="blog-section__resource-desc">{resource.description}</span>
                </div>
                <svg className="blog-section__resource-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
