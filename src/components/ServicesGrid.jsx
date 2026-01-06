import { useEffect, useRef } from 'react';
import gsap from 'gsap';

/**
 * ServicesGrid - Componente estilo Stripe con layout orgánico
 * Tarjetas dispersas con conexiones SVG animadas
 */
const ServicesGrid = () => {
  const containerRef = useRef(null);

  // Iconos SVG
  const icons = {
    // Servicios activos
    estrategia: (
      <svg viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5"/>
        <circle cx="12" cy="12" r="4" fill="#f59e0b"/>
      </svg>
    ),
    diseno: (
      <svg viewBox="0 0 24 24" fill="none">
        <rect x="3" y="3" width="18" height="18" rx="3" fill="#ddd6fe" stroke="#8b5cf6" strokeWidth="1.5"/>
        <path d="M8 12h8M12 8v8" stroke="#8b5cf6" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    desarrollo: (
      <svg viewBox="0 0 24 24" fill="none">
        <rect x="2" y="4" width="20" height="16" rx="2" fill="#cffafe" stroke="#06b6d4" strokeWidth="1.5"/>
        <path d="M8 10l-2 2 2 2M16 10l2 2-2 2M13 9l-2 6" stroke="#06b6d4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    lanzamiento: (
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M12 2L2 7l10 5 10-5-10-5z" fill="#d1fae5" stroke="#10b981" strokeWidth="1.5"/>
        <path d="M2 17l10 5 10-5M2 12l10 5 10-5" stroke="#10b981" strokeWidth="1.5" strokeLinejoin="round"/>
      </svg>
    ),
    // Iconos inactivos (grises)
    inactive1: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="9"/>
        <path d="M12 8v4l2 2"/>
      </svg>
    ),
    inactive2: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="3" width="18" height="18" rx="2"/>
        <path d="M9 9h6v6H9z"/>
      </svg>
    ),
    inactive3: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <polygon points="12,2 22,8.5 22,15.5 12,22 2,15.5 2,8.5"/>
      </svg>
    ),
    inactive4: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2L2 7v10l10 5 10-5V7L12 2z"/>
      </svg>
    ),
    inactive5: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="3"/>
        <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/>
      </svg>
    ),
    inactive6: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/>
      </svg>
    ),
    inactive7: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
        <polyline points="22,6 12,13 2,6"/>
      </svg>
    ),
    inactive8: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
      </svg>
    ),
    inactive9: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="3" width="7" height="7"/>
        <rect x="14" y="3" width="7" height="7"/>
        <rect x="14" y="14" width="7" height="7"/>
        <rect x="3" y="14" width="7" height="7"/>
      </svg>
    ),
    inactive10: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/>
      </svg>
    ),
  };

  // Tarjetas con posiciones absolutas (estilo orgánico)
  const cards = [
    // Fila 1 - dispersa
    { id: 1, icon: 'inactive1', x: 18, y: 5, active: false },
    { id: 2, icon: 'inactive2', x: 45, y: 2, active: false },
    { id: 3, icon: 'inactive3', x: 75, y: 8, active: false },

    // Fila 2
    { id: 4, icon: 'inactive4', x: 5, y: 20, active: false },
    { id: 5, icon: 'estrategia', x: 28, y: 18, active: true, label: 'Estrategia', color: '#f59e0b' },
    { id: 6, icon: 'inactive5', x: 55, y: 22, active: false },
    { id: 7, icon: 'inactive6', x: 82, y: 18, active: false },

    // Fila 3
    { id: 8, icon: 'inactive7', x: 12, y: 38, active: false },
    { id: 9, icon: 'diseno', x: 38, y: 35, active: true, label: 'Diseño', color: '#8b5cf6' },
    { id: 10, icon: 'inactive8', x: 62, y: 40, active: false },
    { id: 11, icon: 'inactive9', x: 88, y: 35, active: false },

    // Fila 4
    { id: 12, icon: 'inactive10', x: 2, y: 55, active: false },
    { id: 13, icon: 'desarrollo', x: 25, y: 55, active: true, label: 'Desarrollo', color: '#06b6d4' },
    { id: 14, icon: 'inactive1', x: 52, y: 58, active: false },
    { id: 15, icon: 'inactive2', x: 78, y: 52, active: false },

    // Fila 5
    { id: 16, icon: 'inactive3', x: 15, y: 75, active: false },
    { id: 17, icon: 'lanzamiento', x: 42, y: 72, active: true, label: 'Lanzamiento', color: '#10b981' },
    { id: 18, icon: 'inactive4', x: 68, y: 78, active: false },
    { id: 19, icon: 'inactive5', x: 90, y: 72, active: false },

    // Fila 6
    { id: 20, icon: 'inactive6', x: 8, y: 90, active: false },
    { id: 21, icon: 'inactive7', x: 55, y: 92, active: false },
  ];

  // Conexiones entre servicios activos
  const connections = [
    { from: 'estrategia', to: 'diseno', color1: '#f59e0b', color2: '#8b5cf6' },
    { from: 'diseno', to: 'desarrollo', color1: '#8b5cf6', color2: '#06b6d4' },
    { from: 'desarrollo', to: 'lanzamiento', color1: '#06b6d4', color2: '#10b981' },
  ];

  // Calcular paths de conexión
  const getConnectionPath = (fromId, toId) => {
    const fromCard = cards.find(c => c.icon === fromId);
    const toCard = cards.find(c => c.icon === toId);

    if (!fromCard || !toCard) return '';

    const x1 = fromCard.x + 5;
    const y1 = fromCard.y + 8;
    const x2 = toCard.x + 5;
    const y2 = toCard.y;

    // Curva bezier
    const midY = (y1 + y2) / 2;
    return `M ${x1} ${y1} C ${x1} ${midY}, ${x2} ${midY}, ${x2} ${y2}`;
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animar tarjetas con stagger
      gsap.fromTo(
        '.services-grid__card',
        { opacity: 0, scale: 0.5, y: 20 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.6,
          stagger: {
            each: 0.05,
            from: 'random',
          },
          ease: 'back.out(1.7)',
          delay: 0.3,
        }
      );

      // Animar líneas de conexión (dibujar)
      gsap.fromTo(
        '.services-grid__connection',
        { strokeDashoffset: 100 },
        {
          strokeDashoffset: 0,
          duration: 1.2,
          stagger: 0.4,
          ease: 'power2.inOut',
          delay: 1,
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="services-grid">
      {/* SVG para conexiones */}
      <svg className="services-grid__svg" viewBox="0 0 100 100" preserveAspectRatio="none">
        <defs>
          {connections.map((conn, i) => (
            <linearGradient key={`grad-${i}`} id={`connection-gradient-${i}`} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={conn.color1} />
              <stop offset="100%" stopColor={conn.color2} />
            </linearGradient>
          ))}
        </defs>

        {connections.map((conn, i) => (
          <path
            key={`path-${i}`}
            className="services-grid__connection"
            d={getConnectionPath(conn.from, conn.to)}
            stroke={`url(#connection-gradient-${i})`}
            strokeWidth="0.4"
            fill="none"
            strokeLinecap="round"
            strokeDasharray="100"
            strokeDashoffset="100"
          />
        ))}
      </svg>

      {/* Tarjetas */}
      {cards.map((card) => (
        <div
          key={card.id}
          className={`services-grid__card ${card.active ? 'services-grid__card--active' : ''}`}
          style={{
            left: `${card.x}%`,
            top: `${card.y}%`,
            '--card-color': card.color || '#9ca3af',
          }}
        >
          <div className="services-grid__icon">
            {icons[card.icon]}
          </div>
          {card.active && card.label && (
            <span className="services-grid__label">{card.label}</span>
          )}
        </div>
      ))}
    </div>
  );
};

export default ServicesGrid;
