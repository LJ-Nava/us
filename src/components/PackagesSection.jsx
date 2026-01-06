import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * PackagesSection - Nuestros Paquetes
 * Diseño premium con 4 planes diferenciados
 */
const PackagesSection = () => {
  const sectionRef = useRef(null);
  const [hoveredPackage, setHoveredPackage] = useState(null);

  const packages = [
    {
      id: 1,
      name: 'Starter',
      tagline: 'Perfecto para comenzar',
      description: 'Ideal para emprendedores y pequeños negocios que necesitan presencia digital profesional.',
      price: '2,500',
      priceNote: 'USD / proyecto',
      color: 'slate',
      popular: false,
      features: [
        { text: 'Landing page optimizada', included: true },
        { text: 'Diseño responsive', included: true },
        { text: 'Hasta 5 secciones', included: true },
        { text: 'Formulario de contacto', included: true },
        { text: 'SEO básico', included: true },
        { text: 'Entrega en 2 semanas', included: true },
        { text: '1 revisión incluida', included: true },
        { text: 'Hosting primer año', included: false },
      ],
      cta: 'Comenzar proyecto',
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
      name: 'Growth',
      tagline: 'El más elegido',
      description: 'Para negocios en crecimiento que necesitan una web completa y funcional.',
      price: '5,500',
      priceNote: 'USD / proyecto',
      color: 'cyan',
      popular: true,
      features: [
        { text: 'Sitio web hasta 10 páginas', included: true },
        { text: 'Diseño UI/UX personalizado', included: true },
        { text: 'CMS integrado (editable)', included: true },
        { text: 'Blog optimizado para SEO', included: true },
        { text: 'Integración redes sociales', included: true },
        { text: 'Analytics avanzado', included: true },
        { text: 'Entrega en 4 semanas', included: true },
        { text: '3 revisiones incluidas', included: true },
        { text: 'Soporte 3 meses', included: true },
      ],
      cta: 'Elegir Growth',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
    },
    {
      id: 3,
      name: 'Business',
      tagline: 'Solución completa',
      description: 'E-commerce y aplicaciones web con funcionalidades avanzadas para escalar.',
      price: '12,000',
      priceNote: 'USD / proyecto',
      color: 'violet',
      popular: false,
      features: [
        { text: 'E-commerce completo', included: true },
        { text: 'Hasta 500 productos', included: true },
        { text: 'Pasarela de pagos', included: true },
        { text: 'Panel de administración', included: true },
        { text: 'Inventario automatizado', included: true },
        { text: 'Email marketing integrado', included: true },
        { text: 'SEO avanzado + SEM setup', included: true },
        { text: 'Entrega en 8 semanas', included: true },
        { text: 'Revisiones ilimitadas', included: true },
        { text: 'Soporte 6 meses', included: true },
      ],
      cta: 'Solicitar Business',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
          <path d="M8 21h8M12 17v4"/>
        </svg>
      ),
    },
    {
      id: 4,
      name: 'Enterprise',
      tagline: 'A tu medida',
      description: 'Soluciones personalizadas para grandes empresas con necesidades específicas.',
      price: 'Custom',
      priceNote: 'Cotización personalizada',
      color: 'amber',
      popular: false,
      features: [
        { text: 'Desarrollo a medida', included: true },
        { text: 'Arquitectura escalable', included: true },
        { text: 'APIs e integraciones', included: true },
        { text: 'App móvil opcional', included: true },
        { text: 'Equipo dedicado', included: true },
        { text: 'Infraestructura cloud', included: true },
        { text: 'Seguridad enterprise', included: true },
        { text: 'SLA garantizado', included: true },
        { text: 'Soporte prioritario 24/7', included: true },
        { text: 'Account manager dedicado', included: true },
      ],
      cta: 'Contactar ventas',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 8v4M12 16h.01" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
    },
  ];

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
            Nuestros Paquetes
          </span>
          <h2 className="packages-section__title">
            Elige el plan perfecto
            <span className="packages-section__title-highlight"> para tu proyecto</span>
          </h2>
          <p className="packages-section__subtitle">
            Soluciones transparentes y sin sorpresas. Cada paquete incluye diseño, desarrollo
            y optimización con nuestra tecnología NEXUS AI.
          </p>
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
                  <span>Más popular</span>
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
                  {pkg.price === 'Custom' ? (
                    <span className="packages-section__card-price-custom">Custom</span>
                  ) : (
                    <>
                      <span className="packages-section__card-price-currency">$</span>
                      <span className="packages-section__card-price-value">{pkg.price}</span>
                    </>
                  )}
                  <span className="packages-section__card-price-note">{pkg.priceNote}</span>
                </div>

                {/* CTA Button */}
                <button className="packages-section__card-cta">
                  <span>{pkg.cta}</span>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </button>

                {/* Divider */}
                <div className="packages-section__card-divider" />

                {/* Features */}
                <div className="packages-section__card-features">
                  <span className="packages-section__card-features-title">Incluye:</span>
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
            Todos los paquetes incluyen garantía de satisfacción y código fuente completo
          </p>
        </div>
      </div>
    </section>
  );
};

export default PackagesSection;
