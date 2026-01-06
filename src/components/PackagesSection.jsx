import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import useCurrency from '../hooks/useCurrency';

gsap.registerPlugin(ScrollTrigger);

/**
 * PackagesSection - Nuestros Paquetes
 * Diseño premium con 4 planes diferenciados
 * Precios en moneda local según ubicación
 */
const PackagesSection = () => {
  const sectionRef = useRef(null);
  const [hoveredPackage, setHoveredPackage] = useState(null);
  const { formatPrice, currencyName, loading } = useCurrency();

  const packages = [
    {
      id: 1,
      name: 'Starter',
      tagline: 'Ideal para comenzar',
      description: 'Landing page profesional para emprendedores que buscan presencia digital.',
      price: '250',
      color: 'slate',
      popular: false,
      features: [
        { text: 'Landing page (1 página)', included: true },
        { text: 'Diseño responsive', included: true },
        { text: 'Hasta 5 secciones', included: true },
        { text: 'Formulario de contacto', included: true },
        { text: 'Integración WhatsApp', included: true },
        { text: 'Entrega en 5-7 días', included: true },
        { text: '2 revisiones incluidas', included: true },
      ],
      cta: 'Comenzar',
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
      name: 'Profesional',
      tagline: 'El más elegido',
      description: 'Sitio web completo para negocios que quieren destacar y convertir.',
      price: '500',
      color: 'cyan',
      popular: true,
      features: [
        { text: 'Sitio web hasta 5 páginas', included: true },
        { text: 'Diseño UI/UX personalizado', included: true },
        { text: 'Panel administrable (CMS)', included: true },
        { text: 'Optimización SEO', included: true },
        { text: 'Google Analytics', included: true },
        { text: 'Redes sociales integradas', included: true },
        { text: 'Entrega en 10-14 días', included: true },
        { text: '3 revisiones incluidas', included: true },
        { text: 'Soporte 1 mes', included: true },
      ],
      cta: 'Elegir plan',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
    },
    {
      id: 3,
      name: 'Business',
      tagline: 'Con marketing incluido',
      description: 'Web profesional + posicionamiento en Google para atraer más clientes.',
      price: '750',
      color: 'violet',
      popular: false,
      features: [
        { text: 'Todo del plan Profesional', included: true },
        { text: 'Hasta 8 páginas', included: true },
        { text: 'Blog integrado', included: true },
        { text: 'SEO avanzado (posicionamiento)', included: true },
        { text: 'Google My Business', included: true },
        { text: 'Estrategia de palabras clave', included: true },
        { text: 'Entrega en 15-20 días', included: true },
        { text: 'Revisiones ilimitadas', included: true },
        { text: 'Soporte 3 meses', included: true },
      ],
      cta: 'Solicitar',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
    },
    {
      id: 4,
      name: 'E-commerce',
      tagline: 'Tu tienda online',
      description: 'Tienda online lista para vender con carrito y pagos integrados.',
      price: '950',
      color: 'amber',
      popular: false,
      features: [
        { text: 'Tienda online completa', included: true },
        { text: 'Hasta 50 productos', included: true },
        { text: 'Carrito de compras', included: true },
        { text: 'Pasarela de pagos', included: true },
        { text: 'Panel de inventario', included: true },
        { text: 'WhatsApp Business', included: true },
        { text: 'Entrega en 20-25 días', included: true },
        { text: 'Capacitación incluida', included: true },
        { text: 'Soporte 3 meses', included: true },
      ],
      cta: 'Cotizar',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" strokeLinecap="round" strokeLinejoin="round"/>
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
                  <span className={`packages-section__card-price-value ${loading ? 'is-loading' : ''}`}>
                    {formatPrice(pkg.price)}
                  </span>
                  <span className="packages-section__card-price-note">{currencyName}</span>
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
