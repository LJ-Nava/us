import { useEffect, useRef } from 'react';
import gsap from 'gsap';

/**
 * HeroMobileBackground - Alternativa épica al 3D para móviles
 * Usa CSS puro + GSAP para animaciones fluidas sin consumir batería
 */
const HeroMobileBackground = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animar formas geométricas
      gsap.to('.hero-mobile__shape', {
        rotation: 360,
        duration: 40,
        ease: 'none',
        repeat: -1,
        stagger: {
          each: 5,
          from: 'random'
        }
      });

      // Flotar suavemente
      gsap.to('.hero-mobile__shape--float', {
        y: -20,
        duration: 3,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        stagger: 0.5
      });

      // Pulso en los orbs
      gsap.to('.hero-mobile__orb', {
        scale: 1.1,
        opacity: 0.6,
        duration: 2,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        stagger: 0.3
      });

      // Partículas
      gsap.to('.hero-mobile__particle', {
        y: -100,
        opacity: 0,
        duration: 4,
        ease: 'none',
        repeat: -1,
        stagger: {
          each: 0.2,
          from: 'random',
          repeat: -1
        }
      });

      // Líneas de conexión
      gsap.to('.hero-mobile__line', {
        strokeDashoffset: 0,
        duration: 2,
        ease: 'power2.out',
        stagger: 0.3
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="hero-mobile" aria-hidden="true">
      {/* Gradient Mesh Background */}
      <div className="hero-mobile__gradient" />
      <div className="hero-mobile__gradient hero-mobile__gradient--2" />

      {/* Glowing Orbs */}
      <div className="hero-mobile__orb hero-mobile__orb--1" />
      <div className="hero-mobile__orb hero-mobile__orb--2" />
      <div className="hero-mobile__orb hero-mobile__orb--3" />

      {/* Geometric Shapes */}
      <div className="hero-mobile__shapes">
        {/* Icosahedron-like shape (hexagon) */}
        <svg className="hero-mobile__shape hero-mobile__shape--float hero-mobile__shape--1" viewBox="0 0 100 100">
          <polygon
            points="50,5 95,27.5 95,72.5 50,95 5,72.5 5,27.5"
            fill="none"
            stroke="url(#gradient1)"
            strokeWidth="0.5"
          />
          <polygon
            points="50,20 80,35 80,65 50,80 20,65 20,35"
            fill="none"
            stroke="url(#gradient1)"
            strokeWidth="0.3"
            opacity="0.5"
          />
          <defs>
            <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#6366f1" />
              <stop offset="100%" stopColor="#8b5cf6" />
            </linearGradient>
          </defs>
        </svg>

        {/* Octahedron-like shape (diamond) */}
        <svg className="hero-mobile__shape hero-mobile__shape--float hero-mobile__shape--2" viewBox="0 0 100 100">
          <polygon
            points="50,5 95,50 50,95 5,50"
            fill="none"
            stroke="url(#gradient2)"
            strokeWidth="0.5"
          />
          <line x1="50" y1="5" x2="50" y2="95" stroke="url(#gradient2)" strokeWidth="0.3" opacity="0.4" />
          <line x1="5" y1="50" x2="95" y2="50" stroke="url(#gradient2)" strokeWidth="0.3" opacity="0.4" />
          <defs>
            <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8b5cf6" />
              <stop offset="100%" stopColor="#a78bfa" />
            </linearGradient>
          </defs>
        </svg>

        {/* Triangle */}
        <svg className="hero-mobile__shape hero-mobile__shape--float hero-mobile__shape--3" viewBox="0 0 100 100">
          <polygon
            points="50,10 90,85 10,85"
            fill="none"
            stroke="url(#gradient3)"
            strokeWidth="0.5"
          />
          <defs>
            <linearGradient id="gradient3" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4f46e5" />
              <stop offset="100%" stopColor="#6366f1" />
            </linearGradient>
          </defs>
        </svg>

        {/* Small decorative shapes */}
        <svg className="hero-mobile__shape hero-mobile__shape--4" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="40" fill="none" stroke="#818cf8" strokeWidth="0.3" opacity="0.3" />
          <circle cx="50" cy="50" r="30" fill="none" stroke="#818cf8" strokeWidth="0.2" opacity="0.2" />
        </svg>

        <svg className="hero-mobile__shape hero-mobile__shape--5" viewBox="0 0 100 100">
          <polygon
            points="50,15 85,50 50,85 15,50"
            fill="none"
            stroke="#a78bfa"
            strokeWidth="0.4"
            opacity="0.2"
          />
        </svg>
      </div>

      {/* Connection Lines */}
      <svg className="hero-mobile__lines" viewBox="0 0 400 400" preserveAspectRatio="none">
        <line
          className="hero-mobile__line"
          x1="50" y1="100" x2="350" y2="300"
          stroke="url(#lineGradient)"
          strokeWidth="0.5"
          strokeDasharray="400"
          strokeDashoffset="400"
          opacity="0.2"
        />
        <line
          className="hero-mobile__line"
          x1="300" y1="50" x2="100" y2="350"
          stroke="url(#lineGradient)"
          strokeWidth="0.5"
          strokeDasharray="400"
          strokeDashoffset="400"
          opacity="0.15"
        />
        <line
          className="hero-mobile__line"
          x1="0" y1="200" x2="400" y2="180"
          stroke="url(#lineGradient)"
          strokeWidth="0.3"
          strokeDasharray="400"
          strokeDashoffset="400"
          opacity="0.1"
        />
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="50%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
        </defs>
      </svg>

      {/* Floating Particles */}
      <div className="hero-mobile__particles">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="hero-mobile__particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
            }}
          />
        ))}
      </div>

      {/* Noise texture overlay */}
      <div className="hero-mobile__noise" />
    </div>
  );
};

export default HeroMobileBackground;
