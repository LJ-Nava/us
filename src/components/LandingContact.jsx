import { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { useI18n } from '../contexts/I18nContext';

const EMAILJS_SID = 'service_5bxpanf';
const EMAILJS_TID = 'template_1j1kfng';
const EMAILJS_KEY = 'JM6HKpOFo3tLiClOw';

const LandingContact = () => {
  const ref = useRef(null);
  const { t } = useI18n();
  const [form, setForm] = useState({ name: '', phone: '', email: '', type: '', message: '' });
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState(null);

  /* No scroll-triggered animations — content loads visible */

  const onChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setStatus(null);

    const labels = {
      corporate: 'Sitio Corporativo', ecommerce: 'Tienda Online',
      landing: 'Landing Page', portfolio: 'Portfolio', blog: 'Blog', other: 'Otro',
    };

    try {
      await emailjs.send(EMAILJS_SID, EMAILJS_TID, {
        package_name: 'Landing - Empezar',
        complexity: labels[form.type] || form.type,
        from_name: form.name,
        from_email: form.email,
        phone: form.phone,
        message: form.message || 'Sin comentarios',
        extras: `Tipo: ${labels[form.type] || form.type}`,
      }, EMAILJS_KEY);
      setStatus('ok');
      setForm({ name: '', phone: '', email: '', type: '', message: '' });
    } catch {
      setStatus('err');
    } finally {
      setSending(false);
    }
  };

  const waLink = `https://wa.me/573151573329?text=${encodeURIComponent(t('landing.whatsappMsg'))}`;

  return (
    <section ref={ref} className="lc" id="landing-contacto">
      {/* Top gradient line */}
      <div className="lc__line" />
      {/* Background orb */}
      <div className="lc__orb" />

      <div className="lc__inner">
        <div className="lc__wrap">
          {/* Left: form */}
          <div className="lc__form-col">
            <span className="lc__eyebrow">{t('landing.contactEyebrow')}</span>
            <h2 className="lc__title">{t('landing.contactTitle')}</h2>
            <p className="lc__sub">{t('landing.contactSubtitle')}</p>

            <div className="lc__trust">
              {[t('landing.trust1'), t('landing.trust2'), t('landing.trust3')].map((txt, i) => (
                <span key={i} className="lc__trust-item">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                  {txt}
                </span>
              ))}
            </div>

            {status === 'ok' ? (
              <div className="lc__success">
                <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M8 12l3 3 5-5"/></svg>
                <h3>{t('landing.successTitle')}</h3>
                <p>{t('landing.successMsg')}</p>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="lc__form">
                <div className="lc__field">
                  <label htmlFor="lc-n">{t('landing.formName')}</label>
                  <input id="lc-n" name="name" value={form.name} onChange={onChange} required placeholder={t('landing.formNamePh')} />
                </div>

                <div className="lc__row">
                  <div className="lc__field">
                    <label htmlFor="lc-p">{t('landing.formPhone')}</label>
                    <input id="lc-p" name="phone" type="tel" value={form.phone} onChange={onChange} required placeholder="+57 300 123 4567" />
                  </div>
                  <div className="lc__field">
                    <label htmlFor="lc-e">{t('landing.formEmail')}</label>
                    <input id="lc-e" name="email" type="email" value={form.email} onChange={onChange} required placeholder="tu@email.com" />
                  </div>
                </div>

                <div className="lc__field">
                  <label htmlFor="lc-t">{t('landing.formPageType')}</label>
                  <select id="lc-t" name="type" value={form.type} onChange={onChange} required>
                    <option value="">{t('landing.formPageTypePh')}</option>
                    <option value="corporate">{t('landing.pageTypeCorporate')}</option>
                    <option value="ecommerce">{t('landing.pageTypeEcommerce')}</option>
                    <option value="landing">{t('landing.pageTypeLanding')}</option>
                    <option value="portfolio">{t('landing.pageTypePortfolio')}</option>
                    <option value="blog">{t('landing.pageTypeBlog')}</option>
                    <option value="other">{t('landing.pageTypeOther')}</option>
                  </select>
                </div>

                <div className="lc__field">
                  <label htmlFor="lc-m">{t('landing.formMessage')}</label>
                  <textarea id="lc-m" name="message" value={form.message} onChange={onChange} rows="3" placeholder={t('landing.formMessagePh')} />
                </div>

                {status === 'err' && <p className="lc__error">{t('landing.errorMsg')}</p>}

                <button type="submit" className="lc__submit" disabled={sending}>
                  {sending ? (
                    <><span className="lc__spinner" />{t('landing.formSending')}</>
                  ) : (
                    <><span>{t('landing.formSubmit')}</span><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg></>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Right: WhatsApp */}
          <div className="lc__wa-col">
            <div className="lc__wa-card">
              <div className="lc__wa-glow" />
              <div className="lc__wa-icon">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
              </div>
              <p className="lc__wa-label">{t('landing.whatsappLabel')}</p>
              <a href={waLink} target="_blank" rel="noopener noreferrer" className="lc__wa-btn">
                {t('landing.whatsappCta')}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/></svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LandingContact;
