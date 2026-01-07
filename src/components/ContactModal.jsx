import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import gsap from 'gsap';
import { useI18n } from '../contexts/I18nContext';

/**
 * ContactModal - Premium Contact Form Modal
 * Sends form data via backend API with file attachments
 * Uses Portal to render outside of parent stacking context
 */
const ContactModal = ({ isOpen, onClose }) => {
  const { t } = useI18n();
  const modalRef = useRef(null);
  const contentRef = useRef(null);
  const fileInputRef = useRef(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    budget: '',
    message: ''
  });
  const [files, setFiles] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';

      gsap.fromTo(modalRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: 'power2.out' }
      );
      gsap.fromTo(contentRef.current,
        { scale: 0.9, opacity: 0, y: 20 },
        { scale: 1, opacity: 1, y: 0, duration: 0.4, ease: 'back.out(1.7)', delay: 0.1 }
      );
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleClose = () => {
    gsap.to(contentRef.current, {
      scale: 0.9, opacity: 0, y: 20, duration: 0.2, ease: 'power2.in'
    });
    gsap.to(modalRef.current, {
      opacity: 0, duration: 0.2, delay: 0.1,
      onComplete: onClose
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files);
    setFiles(prev => [...prev, ...newFiles].slice(0, 5));
  };

  const removeFile = (index) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value);
      });
      files.forEach(file => {
        formDataToSend.append('attachments', file);
      });

      const response = await fetch('http://localhost:3001/api/contact', {
        method: 'POST',
        body: formDataToSend
      });

      const data = await response.json();

      if (data.success) {
        setSubmitStatus('success');
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          service: '',
          budget: '',
          message: ''
        });
        setFiles([]);

        setTimeout(() => {
          handleClose();
          setTimeout(() => setSubmitStatus(null), 500);
        }, 2500);
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return createPortal(
    <div ref={modalRef} className="contact-modal" onClick={handleClose}>
      <div
        ref={contentRef}
        className="contact-modal__content"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button className="contact-modal__close" onClick={handleClose} aria-label={t('common.close')}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        {/* Header */}
        <div className="contact-modal__header">
          <div className="contact-modal__badge">
            <span className="contact-modal__badge-dot" />
            {t('contactModal.badge')}
          </div>
          <h2 className="contact-modal__title">
            {t('contactModal.title')} <span>{t('contactModal.titleHighlight')}</span>
          </h2>
          <p className="contact-modal__subtitle">
            {t('contactModal.subtitle')}
          </p>
        </div>

        {/* Success/Error Status */}
        {submitStatus === 'success' && (
          <div className="contact-modal__status contact-modal__status--success">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/>
              <polyline points="22 4 12 14.01 9 11.01"/>
            </svg>
            <div>
              <strong>{t('contactModal.successTitle')}</strong>
              <span>{t('contactModal.successText')}</span>
            </div>
          </div>
        )}

        {submitStatus === 'error' && (
          <div className="contact-modal__status contact-modal__status--error">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/>
              <line x1="15" y1="9" x2="9" y2="15"/>
              <line x1="9" y1="9" x2="15" y2="15"/>
            </svg>
            <div>
              <strong>{t('contactModal.errorTitle')}</strong>
              <span>{t('contactModal.errorText')}</span>
            </div>
          </div>
        )}

        {/* Form */}
        <form className="contact-modal__form" onSubmit={handleSubmit}>
          <div className="contact-modal__row">
            <div className="contact-modal__field">
              <label htmlFor="name">{t('contactModal.nameLabel')} <span>{t('contactModal.required')}</span></label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder={t('contactModal.namePlaceholder')}
              />
            </div>
            <div className="contact-modal__field">
              <label htmlFor="email">{t('contactModal.emailLabel')} <span>{t('contactModal.required')}</span></label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder={t('contactModal.emailPlaceholder')}
              />
            </div>
          </div>

          <div className="contact-modal__row">
            <div className="contact-modal__field">
              <label htmlFor="phone">{t('contactModal.phoneLabel')}</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder={t('contactModal.phonePlaceholder')}
              />
            </div>
            <div className="contact-modal__field">
              <label htmlFor="company">{t('contactModal.companyLabel')}</label>
              <input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder={t('contactModal.companyPlaceholder')}
              />
            </div>
          </div>

          <div className="contact-modal__row">
            <div className="contact-modal__field">
              <label htmlFor="service">{t('contactModal.serviceLabel')}</label>
              <select
                id="service"
                name="service"
                value={formData.service}
                onChange={handleChange}
              >
                <option value="">{t('contactModal.servicePlaceholder')}</option>
                <option value="corporate">{t('contactModal.serviceOptions.corporate')}</option>
                <option value="ecommerce">{t('contactModal.serviceOptions.ecommerce')}</option>
                <option value="landing">{t('contactModal.serviceOptions.landing')}</option>
                <option value="webapp">{t('contactModal.serviceOptions.webapp')}</option>
                <option value="redesign">{t('contactModal.serviceOptions.redesign')}</option>
                <option value="branding">{t('contactModal.serviceOptions.branding')}</option>
                <option value="seo">{t('contactModal.serviceOptions.seo')}</option>
                <option value="other">{t('contactModal.serviceOptions.other')}</option>
              </select>
            </div>
            <div className="contact-modal__field">
              <label htmlFor="budget">{t('contactModal.budgetLabel')}</label>
              <select
                id="budget"
                name="budget"
                value={formData.budget}
                onChange={handleChange}
              >
                <option value="">{t('contactModal.budgetPlaceholder')}</option>
                <option value="range1">{t('contactModal.budgetOptions.range1')}</option>
                <option value="range2">{t('contactModal.budgetOptions.range2')}</option>
                <option value="range3">{t('contactModal.budgetOptions.range3')}</option>
                <option value="range4">{t('contactModal.budgetOptions.range4')}</option>
                <option value="range5">{t('contactModal.budgetOptions.range5')}</option>
                <option value="tbd">{t('contactModal.budgetOptions.tbd')}</option>
              </select>
            </div>
          </div>

          <div className="contact-modal__field contact-modal__field--full">
            <label htmlFor="message">{t('contactModal.messageLabel')} <span>{t('contactModal.required')}</span></label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows="4"
              placeholder={t('contactModal.messagePlaceholder')}
            />
          </div>

          {/* File Upload */}
          <div className="contact-modal__upload">
            <input
              ref={fileInputRef}
              type="file"
              multiple
              onChange={handleFileChange}
              accept=".pdf,.doc,.docx,.png,.jpg,.jpeg,.zip,.rar"
              style={{ display: 'none' }}
            />
            <button
              type="button"
              className="contact-modal__upload-btn"
              onClick={() => fileInputRef.current?.click()}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48"/>
              </svg>
              {t('contactModal.attachFiles')}
            </button>
            <span className="contact-modal__upload-hint">
              {t('contactModal.attachHint')}
            </span>
          </div>

          {/* File List */}
          {files.length > 0 && (
            <div className="contact-modal__files">
              {files.map((file, index) => (
                <div key={index} className="contact-modal__file">
                  <div className="contact-modal__file-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
                      <polyline points="14 2 14 8 20 8"/>
                    </svg>
                  </div>
                  <div className="contact-modal__file-info">
                    <span className="contact-modal__file-name">{file.name}</span>
                    <span className="contact-modal__file-size">{formatFileSize(file.size)}</span>
                  </div>
                  <button
                    type="button"
                    className="contact-modal__file-remove"
                    onClick={() => removeFile(index)}
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M18 6L6 18M6 6l12 12"/>
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}

          <button
            type="submit"
            className="contact-modal__submit"
            disabled={isSubmitting || submitStatus === 'success'}
          >
            {isSubmitting ? (
              <>
                <span className="contact-modal__spinner" />
                {t('contactModal.submitting')}
              </>
            ) : submitStatus === 'success' ? (
              <>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                {t('contactModal.submitted')}
              </>
            ) : (
              <>
                {t('contactModal.submit')}
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
                </svg>
              </>
            )}
          </button>
        </form>

        {/* Trust badges */}
        <div className="contact-modal__trust">
          <div className="contact-modal__trust-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            <span>{t('contactModal.trustConfidential')}</span>
          </div>
          <div className="contact-modal__trust-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 6v6l4 2" />
            </svg>
            <span>{t('contactModal.trustResponse')}</span>
          </div>
          <div className="contact-modal__trust-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 6L9 17l-5-5" />
            </svg>
            <span>{t('contactModal.trustNoCommit')}</span>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ContactModal;
