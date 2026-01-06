import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * ContactSection - Premium Contact
 * Clean, functional contact section
 */
const ContactSection = () => {
  const sectionRef = useRef(null);

  const contactInfo = {
    email: 'DeveloperLuis17@gmail.com',
    whatsapp: '573147083182',
    whatsappDisplay: '+57 314 708 3182'
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: '.contact-section',
          start: 'top 75%',
          once: true,
        },
      });

      tl.fromTo('.contact-section__header',
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
      )
      .fromTo('.contact-section__card',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.15, ease: 'power2.out' }, '-=0.4'
      )
      .fromTo('.contact-section__cta',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.3'
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleWhatsApp = () => {
    const message = encodeURIComponent('Hola, me interesa desarrollar mi proyecto web. ¿Podemos agendar una llamada?');
    window.open(`https://wa.me/${contactInfo.whatsapp}?text=${message}`, '_blank');
  };

  const handleEmail = () => {
    window.location.href = `mailto:${contactInfo.email}?subject=Consulta%20proyecto%20web`;
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <section ref={sectionRef} className="contact-section" id="contacto">
      {/* Background Gradient */}
      <div className="contact-section__bg" />

      <div className="contact-section__container">
        {/* Header */}
        <div className="contact-section__header">
          <span className="contact-section__label">Contacto</span>
          <h2 className="contact-section__title">
            Hablemos de tu
            <span className="contact-section__title-gradient"> próximo proyecto</span>
          </h2>
          <p className="contact-section__subtitle">
            Estamos listos para convertir tu visión en realidad.
            Elige el canal que prefieras.
          </p>
        </div>

        {/* Contact Cards */}
        <div className="contact-section__grid">
          {/* WhatsApp Card */}
          <div className="contact-section__card contact-section__card--whatsapp" onClick={handleWhatsApp}>
            <div className="contact-section__card-icon">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
            </div>
            <div className="contact-section__card-content">
              <h3 className="contact-section__card-title">WhatsApp</h3>
              <p className="contact-section__card-text">{contactInfo.whatsappDisplay}</p>
              <span className="contact-section__card-action">
                Enviar mensaje
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </span>
            </div>
          </div>

          {/* Email Card */}
          <div className="contact-section__card contact-section__card--email" onClick={handleEmail}>
            <div className="contact-section__card-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
              </svg>
            </div>
            <div className="contact-section__card-content">
              <h3 className="contact-section__card-title">Email</h3>
              <p className="contact-section__card-text">{contactInfo.email}</p>
              <span className="contact-section__card-action">
                Enviar email
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </span>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="contact-section__quick">
          <button
            className="contact-section__quick-btn"
            onClick={() => copyToClipboard(contactInfo.email)}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
              <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/>
            </svg>
            Copiar email
          </button>
          <button
            className="contact-section__quick-btn"
            onClick={() => copyToClipboard(contactInfo.whatsappDisplay)}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
              <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/>
            </svg>
            Copiar teléfono
          </button>
        </div>

        {/* CTA Banner */}
        <div className="contact-section__cta">
          <div className="contact-section__cta-content">
            <div className="contact-section__cta-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <div className="contact-section__cta-text">
              <strong>Respuesta en menos de 24 horas</strong>
              <span>Propuesta personalizada en 48h</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
