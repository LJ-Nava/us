import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import gsap from 'gsap';
import { useI18n } from '../contexts/I18nContext';

/**
 * PackageModal - Modal para solicitar un paquete
 * Muestra info del plan, formulario de contacto y extras
 */
const PackageModal = ({ isOpen, onClose, selectedPackage, formatPrice }) => {
  const { t } = useI18n();
  const modalRef = useRef(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    description: '',
    extras: {
      googleMyBusiness: false,
      maintenance: false,
    }
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  useEffect(() => {
    if (isOpen && modalRef.current) {
      document.body.style.overflow = 'hidden';
      gsap.fromTo(modalRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: 'power2.out' }
      );
      gsap.fromTo('.package-modal__content',
        { scale: 0.9, y: 30 },
        { scale: 1, y: 0, duration: 0.4, ease: 'back.out(1.5)', delay: 0.1 }
      );
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleClose = () => {
    gsap.to(modalRef.current, {
      opacity: 0,
      duration: 0.2,
      onComplete: onClose
    });
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox') {
      setFormData(prev => ({
        ...prev,
        extras: {
          ...prev.extras,
          [name]: checked
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Build extras list
    const extrasList = [];
    if (formData.extras.googleMyBusiness) extrasList.push('Google My Business');
    if (formData.extras.maintenance) extrasList.push('Mantenimiento mensual');

    const emailData = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      message: `
SOLICITUD DE PAQUETE: ${selectedPackage?.name}
Precio base: ${formatPrice ? formatPrice(selectedPackage?.price) : selectedPackage?.price}
Complejidad: ${selectedPackage?.complexity}

DESCRIPCIÓN DEL PROYECTO:
${formData.description}

EXTRAS SELECCIONADOS:
${extrasList.length > 0 ? extrasList.join(', ') : 'Ninguno'}

CONTACTO:
- Nombre: ${formData.name}
- Email: ${formData.email}
- Teléfono: ${formData.phone}
      `.trim()
    };

    try {
      const response = await fetch('http://localhost:3001/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(emailData)
      });

      if (response.ok) {
        setSubmitStatus('success');
        setTimeout(() => {
          handleClose();
          setFormData({
            name: '',
            email: '',
            phone: '',
            description: '',
            extras: { googleMyBusiness: false, maintenance: false }
          });
          setSubmitStatus(null);
        }, 2000);
      } else {
        setSubmitStatus('error');
      }
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen || !selectedPackage) return null;

  return createPortal(
    <div ref={modalRef} className="package-modal" onClick={handleClose}>
      <div className="package-modal__content" onClick={e => e.stopPropagation()}>
        {/* Close button */}
        <button className="package-modal__close" onClick={handleClose}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        {/* Header with plan info */}
        <div className="package-modal__header">
          <div className={`package-modal__plan-badge package-modal__plan-badge--${selectedPackage.color}`}>
            {selectedPackage.name}
          </div>
          <h2 className="package-modal__title">{t('packageModal.request')} {selectedPackage.name}</h2>
          <p className="package-modal__subtitle">
            <span className="package-modal__price">
              {t('packages.from')} {formatPrice ? formatPrice(selectedPackage.price) : `$${selectedPackage.price}`}
            </span>
            <span className="package-modal__complexity">{selectedPackage.complexity}</span>
          </p>
        </div>

        {/* Features reminder */}
        <div className="package-modal__features">
          <span className="package-modal__features-title">{t('packageModal.planIncludes')}</span>
          <ul className="package-modal__features-list">
            {selectedPackage.features.slice(0, 4).map((feature, i) => (
              <li key={i}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                {feature.text}
              </li>
            ))}
          </ul>
        </div>

        {/* Form */}
        <form className="package-modal__form" onSubmit={handleSubmit}>
          {/* Contact info */}
          <div className="package-modal__form-row">
            <div className="package-modal__form-group">
              <label htmlFor="pm-name">{t('packageModal.name')}</label>
              <input
                type="text"
                id="pm-name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder={t('packageModal.namePlaceholder')}
                required
              />
            </div>
            <div className="package-modal__form-group">
              <label htmlFor="pm-phone">{t('packageModal.phone')}</label>
              <input
                type="tel"
                id="pm-phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder={t('packageModal.phonePlaceholder')}
                required
              />
            </div>
          </div>

          <div className="package-modal__form-group">
            <label htmlFor="pm-email">{t('packageModal.email')}</label>
            <input
              type="email"
              id="pm-email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder={t('packageModal.emailPlaceholder')}
              required
            />
          </div>

          <div className="package-modal__form-group">
            <label htmlFor="pm-description">{t('packageModal.projectDescription')}</label>
            <textarea
              id="pm-description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder={t('packageModal.projectPlaceholder')}
              rows={4}
              required
            />
          </div>

          {/* Extras */}
          <div className="package-modal__extras">
            <span className="package-modal__extras-title">{t('packageModal.extrasTitle')}</span>
            <span className="package-modal__extras-subtitle">{t('packageModal.extrasSubtitle')}</span>

            <label className="package-modal__extra">
              <input
                type="checkbox"
                name="googleMyBusiness"
                checked={formData.extras.googleMyBusiness}
                onChange={handleInputChange}
              />
              <span className="package-modal__extra-check">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              </span>
              <span className="package-modal__extra-content">
                <span className="package-modal__extra-header">
                  <span className="package-modal__extra-name">{t('packageModal.gmbName')}</span>
                  <span className="package-modal__extra-price">{formatPrice('50')}</span>
                </span>
                <span className="package-modal__extra-desc">
                  {t('packageModal.gmbDesc')}
                </span>
                <span className="package-modal__extra-details">
                  <span className="package-modal__extra-detail">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                    {t('packageModal.gmbDetail1')}
                  </span>
                  <span className="package-modal__extra-detail">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                    {t('packageModal.gmbDetail2')}
                  </span>
                  <span className="package-modal__extra-detail">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                    {t('packageModal.gmbDetail3')}
                  </span>
                </span>
                <span className="package-modal__extra-note">{t('packageModal.gmbNote')}</span>
              </span>
            </label>

            <label className="package-modal__extra">
              <input
                type="checkbox"
                name="maintenance"
                checked={formData.extras.maintenance}
                onChange={handleInputChange}
              />
              <span className="package-modal__extra-check">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              </span>
              <span className="package-modal__extra-content">
                <span className="package-modal__extra-header">
                  <span className="package-modal__extra-name">{t('packageModal.maintenanceName')}</span>
                  <span className="package-modal__extra-price">{formatPrice('30')}<span className="package-modal__extra-period">/{t('packageModal.perMonth')}</span></span>
                </span>
                <span className="package-modal__extra-desc">
                  {t('packageModal.maintenanceDesc')}
                </span>
                <span className="package-modal__extra-details">
                  <span className="package-modal__extra-detail">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                    {t('packageModal.maintenanceDetail1')}
                  </span>
                  <span className="package-modal__extra-detail">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                    {t('packageModal.maintenanceDetail2')}
                  </span>
                  <span className="package-modal__extra-detail">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                    {t('packageModal.maintenanceDetail3')}
                  </span>
                  <span className="package-modal__extra-detail">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                    {t('packageModal.maintenanceDetail4')}
                  </span>
                </span>
                <span className="package-modal__extra-note">{t('packageModal.maintenanceNote')}</span>
              </span>
            </label>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className={`package-modal__submit ${isSubmitting ? 'is-loading' : ''} ${submitStatus ? `is-${submitStatus}` : ''}`}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span className="package-modal__submit-loading">
                <span></span><span></span><span></span>
              </span>
            ) : submitStatus === 'success' ? (
              <>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                {t('packageModal.requestSent')}
              </>
            ) : submitStatus === 'error' ? (
              t('packageModal.errorTryAgain')
            ) : (
              <>
                {t('packageModal.sendRequest')}
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>
                </svg>
              </>
            )}
          </button>
        </form>
      </div>
    </div>,
    document.body
  );
};

export default PackageModal;
