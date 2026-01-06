import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Iconos para el dashboard
const icons = {
  inbox: (
    <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
      <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5v-3h3.56c.69 1.19 1.97 2 3.45 2s2.75-.81 3.45-2H19v3zm0-5h-4.99c0 1.1-.9 2-2 2s-2-.9-2-2H5V5h14v9z"/>
    </svg>
  ),
  projects: (
    <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
      <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/>
    </svg>
  ),
  team: (
    <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
      <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
    </svg>
  ),
  settings: (
    <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
      <path d="M19.14 12.94c.04-.31.06-.63.06-.94 0-.31-.02-.63-.06-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.04.31-.06.63-.06.94s.02.63.06.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/>
    </svg>
  ),
  check: (
    <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
    </svg>
  ),
  clock: (
    <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
      <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
    </svg>
  ),
  star: (
    <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
    </svg>
  ),
  folder: (
    <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
      <path d="M10 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"/>
    </svg>
  ),
  doc: (
    <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
      <path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm4 18H6V4h7v5h5v11z"/>
    </svg>
  ),
  code: (
    <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
      <path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/>
    </svg>
  ),
  figma: (
    <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
      <path d="M5 5.5A3.5 3.5 0 0 1 8.5 2H12v7H8.5A3.5 3.5 0 0 1 5 5.5zM12 2h3.5a3.5 3.5 0 1 1 0 7H12V2zm0 7h3.5a3.5 3.5 0 1 1 0 7H12v-7zm-7 7a3.5 3.5 0 0 1 3.5-3.5H12v3.5a3.5 3.5 0 1 1-7 0zm7-3.5a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
    </svg>
  ),
};

const LogosSection = () => {
  const sectionRef = useRef(null);
  const mockupRef = useRef(null);
  const aiFaceRef = useRef(null);

  const technologies = [
    { name: 'React', icon: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 13.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Z"/><path d="M12 21.35c-1.2 0-2.3-.28-3.2-.75-.9.25-1.9.4-2.9.4-1.5 0-2.7-.35-3.5-1-.8-.7-1.2-1.6-1.2-2.7 0-.8.25-1.7.7-2.5-.45-.8-.7-1.65-.7-2.5 0-1.1.4-2 1.2-2.7.8-.65 2-1 3.5-1 1 0 2 .15 2.9.4.9-.47 2-.75 3.2-.75s2.3.28 3.2.75c.9-.25 1.9-.4 2.9-.4 1.5 0 2.7.35 3.5 1 .8.7 1.2 1.6 1.2 2.7 0 .85-.25 1.7-.7 2.5.45.8.7 1.65.7 2.5 0 1.1-.4 2-1.2 2.7-.8.65-2 1-3.5 1-1 0-2-.15-2.9-.4-.9.47-2 .75-3.2.75Z"/></svg> },
    { name: 'Next.js', icon: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M11.572 0c-.176 0-.31.001-.358.007a19.76 19.76 0 0 1-.364.033C7.443.346 4.25 2.185 2.228 5.012a11.875 11.875 0 0 0-2.119 5.243c-.096.659-.108.854-.108 1.747s.012 1.089.108 1.748c.652 4.506 3.86 8.292 8.209 9.695.779.25 1.6.422 2.534.525.363.04 1.935.04 2.299 0 1.611-.178 2.977-.577 4.323-1.264.207-.106.247-.134.219-.158l-1.955-2.62-1.919-2.592-2.404-3.558c-.009-.002-.018 1.579-.023 3.51-.007 3.38-.01 3.515-.052 3.595a.426.426 0 0 1-.206.214c-.075.037-.14.044-.495.044H7.81l-.108-.068a.438.438 0 0 1-.157-.171l-.05-.106.006-4.703.007-4.705.072-.092a.645.645 0 0 1 .174-.143c.096-.047.134-.051.54-.051.478 0 .558.018.682.154l4.735 7.17 1.9 2.879.096-.063a12.317 12.317 0 0 0 2.466-2.163 11.944 11.944 0 0 0 2.824-6.134c.096-.66.108-.854.108-1.748 0-.893-.012-1.088-.108-1.747-.652-4.506-3.859-8.292-8.208-9.695a12.597 12.597 0 0 0-2.499-.523A33.119 33.119 0 0 0 11.572 0z"/></svg> },
    { name: 'TypeScript', icon: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-.643-.361 5.093 5.093 0 0 0-.717-.26 5.453 5.453 0 0 0-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 0 0-.623.242c-.17.104-.3.229-.393.374a.888.888 0 0 0-.14.49c0 .196.053.373.156.529s.252.304.443.444.423.276.696.41c.273.135.582.274.926.416.47.197.892.407 1.266.628s.695.473.963.753c.268.279.472.598.614.957s.214.776.214 1.253c0 .657-.125 1.21-.373 1.656a3.033 3.033 0 0 1-1.012 1.085 4.38 4.38 0 0 1-1.487.596c-.566.12-1.163.18-1.79.18a9.916 9.916 0 0 1-1.84-.164 5.544 5.544 0 0 1-1.512-.493v-2.63a5.033 5.033 0 0 0 3.237 1.2c.333 0 .624-.03.872-.09s.456-.144.623-.25c.166-.108.29-.234.373-.38a1.023 1.023 0 0 0-.074-1.089 2.12 2.12 0 0 0-.537-.5 5.597 5.597 0 0 0-.807-.444 27.72 27.72 0 0 0-1.007-.436c-.918-.383-1.602-.852-2.053-1.405-.45-.553-.676-1.222-.676-2.005 0-.614.123-1.141.369-1.582s.58-.804 1.004-1.089a4.494 4.494 0 0 1 1.47-.629 7.536 7.536 0 0 1 1.77-.201zm-15.113.188h9.563v2.166H9.506v9.646H6.789v-9.646H3.375z"/></svg> },
    { name: 'Tailwind', icon: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z"/></svg> },
    { name: 'Figma', icon: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M15.852 8.981h-4.588V0h4.588c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.491-4.49 4.491zM12.735 7.51h3.117c1.665 0 3.019-1.355 3.019-3.019s-1.355-3.019-3.019-3.019h-3.117V7.51zM8.148 8.981c-2.476 0-4.49-2.014-4.49-4.49S5.672 0 8.148 0h4.588v8.981H8.148zm0-7.51c-1.665 0-3.019 1.355-3.019 3.019s1.354 3.02 3.019 3.02h3.117V1.471H8.148zM8.148 24c-2.489 0-4.515-2.014-4.515-4.49s2.014-4.49 4.49-4.49h4.588v4.441c0 2.503-2.047 4.539-4.563 4.539z"/></svg> },
    { name: 'Node.js', icon: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M11.998 24c-.321 0-.641-.084-.922-.247l-2.936-1.737c-.438-.245-.224-.332-.08-.383.585-.203.703-.25 1.328-.604.065-.037.151-.023.218.017l2.256 1.339a.29.29 0 0 0 .272 0l8.795-5.076a.277.277 0 0 0 .134-.238V6.921a.283.283 0 0 0-.137-.242l-8.791-5.072a.278.278 0 0 0-.271 0L3.075 6.68a.284.284 0 0 0-.139.241v10.15a.27.27 0 0 0 .139.235l2.409 1.392c1.307.654 2.108-.116 2.108-.89V7.787c0-.142.114-.253.256-.253h1.115c.139 0 .255.112.255.253v10.021c0 1.745-.95 2.745-2.604 2.745-.508 0-.909 0-2.026-.551L2.28 18.675a1.857 1.857 0 0 1-.922-1.604V6.921c0-.659.353-1.275.922-1.603l8.795-5.082c.557-.315 1.296-.315 1.848 0l8.794 5.082c.57.329.924.944.924 1.603v10.15a1.86 1.86 0 0 1-.924 1.604l-8.795 5.078c-.28.163-.6.247-.924.247z"/></svg> },
    { name: 'GSAP', icon: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 2.4a9.6 9.6 0 1 1 0 19.2 9.6 9.6 0 0 1 0-19.2zm-.6 3.6v3.6H7.8v2.4h3.6v3.6h2.4v-3.6h3.6v-2.4h-3.6V6h-2.4z"/></svg> },
    { name: 'Three.js', icon: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M.38 0a.268.268 0 0 0-.256.332l2.894 11.716a.268.268 0 0 0 .01.04l2.89 11.708a.268.268 0 0 0 .447.128L23.802 7.15a.268.268 0 0 0-.112-.45l-5.784-1.667L6.38 1.715.533.012A.268.268 0 0 0 .38 0z"/></svg> },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(mockupRef.current, { opacity: 0, y: 60 }, {
        opacity: 1, y: 0, duration: 1.2, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true }
      });

      // Animación de entrada para el núcleo IA
      gsap.fromTo(aiFaceRef.current, { opacity: 0, scale: 0.5 }, {
        opacity: 1, scale: 1, duration: 2, ease: 'power3.out', delay: 0.3,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true }
      });

      // Animación de los anillos concéntricos
      gsap.fromTo('.logos-section__ai-ring', { opacity: 0, scale: 0 }, {
        opacity: 1, scale: 1, duration: 1.5, stagger: 0.2, ease: 'power3.out', delay: 0.5,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true }
      });

      // Animación de los circuitos
      gsap.fromTo('.logos-section__ai-circuit', { strokeDashoffset: 300 }, {
        strokeDashoffset: 0, duration: 2, stagger: 0.1, ease: 'power2.inOut', delay: 0.8,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true }
      });

      // Animación de los nodos
      gsap.fromTo('.logos-section__ai-node', { opacity: 0, scale: 0 }, {
        opacity: 1, scale: 1, duration: 0.5, stagger: 0.08, ease: 'back.out(2)', delay: 1.5,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true }
      });

      // Animación de las partículas
      gsap.fromTo('.logos-section__ai-particle', { opacity: 0, scale: 0 }, {
        opacity: 1, scale: 1, duration: 1, stagger: 0.05, ease: 'back.out(1.7)', delay: 1.8,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true }
      });

      // Animación de las barras del espectro
      gsap.fromTo('.logos-section__ai-bar', { scaleY: 0 }, {
        scaleY: 1, duration: 0.8, stagger: 0.05, ease: 'power2.out', delay: 2,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true }
      });

      gsap.fromTo('.logos-section__headline', { opacity: 0, y: 30 }, {
        opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: '.logos-section__headline', start: 'top 85%', once: true }
      });
      gsap.fromTo('.logos-section__item', { opacity: 0, y: 20 }, {
        opacity: 1, y: 0, duration: 0.6, stagger: 0.08, ease: 'power3.out',
        scrollTrigger: { trigger: '.logos-section__tech-grid', start: 'top 85%', once: true }
      });
    }, sectionRef);

    // Mouse tracking - El ojo central sigue el cursor como un ojo de IA
    const handleMouseMove = (e) => {
      if (!aiFaceRef.current) return;

      const core = aiFaceRef.current;
      const rect = core.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

      // El iris central sigue el mouse - efecto de "ojo" que mira
      const iris = document.querySelector('.logos-section__ai-iris');
      const pupil = document.querySelector('.logos-section__ai-pupil');

      const maxIrisMove = 25; // Movimiento amplio para que sea visible
      const irisX = Math.max(-maxIrisMove, Math.min(maxIrisMove, (deltaX / 300) * maxIrisMove));
      const irisY = Math.max(-maxIrisMove, Math.min(maxIrisMove, (deltaY / 300) * maxIrisMove));

      if (iris) {
        gsap.to(iris, {
          x: irisX,
          y: irisY,
          duration: 0.2,
          ease: 'power2.out'
        });
      }

      if (pupil) {
        gsap.to(pupil, {
          x: irisX * 0.3,
          y: irisY * 0.3,
          scale: 1 + (distance / 1000),
          duration: 0.15,
          ease: 'power2.out'
        });
      }

      // Los anillos reaccionan con parallax diferente cada uno
      const rings = document.querySelectorAll('.logos-section__ai-ring');
      rings.forEach((ring, i) => {
        const speed = (i + 1) * 0.15;
        const rotation = (deltaX / window.innerWidth) * 10 * (i + 1);
        gsap.to(ring, {
          x: (deltaX / window.innerWidth) * 8 * speed,
          y: (deltaY / window.innerHeight) * 8 * speed,
          rotation: rotation,
          duration: 0.4 + (i * 0.1),
          ease: 'power2.out'
        });
      });

      // Los circuitos se iluminan con el movimiento
      const circuits = document.querySelectorAll('.logos-section__ai-circuit');
      circuits.forEach((circuit, i) => {
        const delay = i * 0.02;
        gsap.to(circuit, {
          strokeOpacity: 0.5 + (Math.abs(deltaX) / window.innerWidth) * 0.5,
          duration: 0.3,
          delay: delay
        });
      });

      // Nodos parpadean
      const nodes = document.querySelectorAll('.logos-section__ai-node');
      nodes.forEach((node, i) => {
        const intensity = Math.random() * 0.5 + 0.5;
        gsap.to(node, {
          opacity: intensity,
          scale: 1 + (Math.random() * 0.3),
          duration: 0.2,
          ease: 'power1.out'
        });
      });

      // Partículas con parallax amplio
      const particles = document.querySelectorAll('.logos-section__ai-particle');
      particles.forEach((particle, i) => {
        const speed = (i % 4 + 1) * 0.8;
        gsap.to(particle, {
          x: (deltaX / window.innerWidth) * 50 * speed,
          y: (deltaY / window.innerHeight) * 50 * speed,
          duration: 0.3 + (i * 0.02),
          ease: 'power1.out'
        });
      });

      // Las barras del espectro reaccionan al movimiento
      const bars = document.querySelectorAll('.logos-section__ai-bar');
      bars.forEach((bar, i) => {
        const heightMultiplier = 1 + Math.abs(deltaX / window.innerWidth) + Math.abs(deltaY / window.innerHeight);
        gsap.to(bar, {
          scaleY: heightMultiplier * (0.5 + Math.random() * 0.5),
          duration: 0.1,
          ease: 'power1.out'
        });
      });

      // Aura se intensifica con la proximidad
      const aura = document.querySelector('.logos-section__ai-aura');
      if (aura) {
        const intensity = Math.max(0, 1 - (distance / 500));
        gsap.to(aura, {
          opacity: 0.4 + (intensity * 0.6),
          scale: 1 + (intensity * 0.15),
          duration: 0.5
        });
      }

      // Scanner rota basado en posición del mouse
      const scanner = document.querySelector('.logos-section__ai-scanner');
      if (scanner) {
        const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);
        gsap.to(scanner, {
          rotation: angle,
          duration: 0.3,
          ease: 'power2.out'
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      ctx.revert();
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <section ref={sectionRef} className="logos-section">
      {/* Paneles flotantes 3D estilo Linear */}
      <div className="logos-section__mockup-wrapper">
        <div ref={mockupRef} className="logos-section__panels">

          {/* Panel 1: Sidebar/Navegación */}
          <div className="logos-section__panel logos-section__panel--sidebar">
            <div className="logos-section__panel-header">
              <div className="logos-section__logo">
                <span className="logos-section__logo-icon">JV</span>
                <span className="logos-section__logo-text">J-Visual</span>
              </div>
            </div>

            <div className="logos-section__nav">
              <div className="logos-section__nav-item logos-section__nav-item--active">
                {icons.inbox}
                <span>Inbox</span>
                <span className="logos-section__nav-badge">3</span>
              </div>
              <div className="logos-section__nav-item">
                {icons.projects}
                <span>Proyectos</span>
              </div>
              <div className="logos-section__nav-item">
                {icons.team}
                <span>Equipo</span>
              </div>
              <div className="logos-section__nav-item">
                {icons.settings}
                <span>Configuración</span>
              </div>
            </div>

            <div className="logos-section__nav-section">
              <span className="logos-section__nav-label">Favoritos</span>
              <div className="logos-section__nav-item">
                <span className="logos-section__dot logos-section__dot--purple"></span>
                <span>E-commerce App</span>
              </div>
              <div className="logos-section__nav-item">
                <span className="logos-section__dot logos-section__dot--blue"></span>
                <span>Landing Page</span>
              </div>
              <div className="logos-section__nav-item">
                <span className="logos-section__dot logos-section__dot--green"></span>
                <span>Dashboard UI</span>
              </div>
            </div>

            <div className="logos-section__nav-section">
              <span className="logos-section__nav-label">Recientes</span>
              <div className="logos-section__nav-item">
                <span className="logos-section__dot logos-section__dot--blue"></span>
                <span>App Móvil</span>
              </div>
              <div className="logos-section__nav-item">
                <span className="logos-section__dot logos-section__dot--purple"></span>
                <span>API Backend</span>
              </div>
            </div>
          </div>

          {/* Panel 2: Lista de proyectos/inbox */}
          <div className="logos-section__panel logos-section__panel--list">
            <div className="logos-section__list-header">
              <span className="logos-section__list-title">Inbox</span>
              <span className="logos-section__list-count">12 tareas</span>
            </div>

            <div className="logos-section__task logos-section__task--active">
              <div className="logos-section__task-priority logos-section__task-priority--high"></div>
              <div className="logos-section__task-content">
                <span className="logos-section__task-id">PRJ-142</span>
                <span className="logos-section__task-title">Diseñar landing page</span>
                <div className="logos-section__task-meta">
                  <span className="logos-section__task-tag logos-section__task-tag--design">Diseño</span>
                  <span className="logos-section__task-date">{icons.clock} Hoy</span>
                </div>
              </div>
            </div>

            <div className="logos-section__task">
              <div className="logos-section__task-priority logos-section__task-priority--medium"></div>
              <div className="logos-section__task-content">
                <span className="logos-section__task-id">PRJ-141</span>
                <span className="logos-section__task-title">Implementar checkout</span>
                <div className="logos-section__task-meta">
                  <span className="logos-section__task-tag logos-section__task-tag--dev">Desarrollo</span>
                  <span className="logos-section__task-date">{icons.clock} Mañana</span>
                </div>
              </div>
            </div>

            <div className="logos-section__task">
              <div className="logos-section__task-priority logos-section__task-priority--low"></div>
              <div className="logos-section__task-content">
                <span className="logos-section__task-id">PRJ-140</span>
                <span className="logos-section__task-title">Optimizar imágenes</span>
                <div className="logos-section__task-meta">
                  <span className="logos-section__task-tag logos-section__task-tag--ops">Ops</span>
                  <span className="logos-section__task-date">{icons.clock} Esta semana</span>
                </div>
              </div>
            </div>

            <div className="logos-section__task">
              <div className="logos-section__task-priority logos-section__task-priority--medium"></div>
              <div className="logos-section__task-content">
                <span className="logos-section__task-id">PRJ-139</span>
                <span className="logos-section__task-title">Crear componentes UI</span>
                <div className="logos-section__task-meta">
                  <span className="logos-section__task-tag logos-section__task-tag--design">Diseño</span>
                </div>
              </div>
            </div>

            <div className="logos-section__task">
              <div className="logos-section__task-priority logos-section__task-priority--high"></div>
              <div className="logos-section__task-content">
                <span className="logos-section__task-id">PRJ-138</span>
                <span className="logos-section__task-title">Integrar API de pagos</span>
                <div className="logos-section__task-meta">
                  <span className="logos-section__task-tag logos-section__task-tag--dev">Backend</span>
                  <span className="logos-section__task-date">{icons.clock} Próxima semana</span>
                </div>
              </div>
            </div>

            <div className="logos-section__task">
              <div className="logos-section__task-priority logos-section__task-priority--low"></div>
              <div className="logos-section__task-content">
                <span className="logos-section__task-id">PRJ-137</span>
                <span className="logos-section__task-title">Documentar componentes</span>
                <div className="logos-section__task-meta">
                  <span className="logos-section__task-tag logos-section__task-tag--ops">Docs</span>
                </div>
              </div>
            </div>
          </div>

          {/* Panel 3: Detalle del proyecto */}
          <div className="logos-section__panel logos-section__panel--detail">
            <div className="logos-section__detail-header">
              <div className="logos-section__detail-breadcrumb">
                <span>E-commerce App</span>
                <span className="logos-section__detail-sep">›</span>
                <span>PRJ-142</span>
              </div>
            </div>

            <h2 className="logos-section__detail-title">Diseñar landing page</h2>

            <div className="logos-section__detail-props">
              <div className="logos-section__detail-prop">
                <span className="logos-section__detail-label">Estado</span>
                <span className="logos-section__detail-status">
                  <span className="logos-section__status-dot logos-section__status-dot--progress"></span>
                  En progreso
                </span>
              </div>
              <div className="logos-section__detail-prop">
                <span className="logos-section__detail-label">Prioridad</span>
                <span className="logos-section__detail-priority">
                  {icons.star}
                  Alta
                </span>
              </div>
              <div className="logos-section__detail-prop">
                <span className="logos-section__detail-label">Asignado</span>
                <div className="logos-section__avatars">
                  <div className="logos-section__avatar">JC</div>
                  <div className="logos-section__avatar">MR</div>
                </div>
              </div>
            </div>

            <div className="logos-section__detail-desc">
              <p>Crear un diseño moderno y atractivo para la página principal del e-commerce. Incluir hero section, productos destacados, y testimonios.</p>
            </div>

            <div className="logos-section__detail-attachments">
              <span className="logos-section__detail-label">Archivos</span>
              <div className="logos-section__files">
                <div className="logos-section__file">
                  {icons.figma}
                  <span>landing-v2.fig</span>
                </div>
                <div className="logos-section__file">
                  {icons.doc}
                  <span>brief.pdf</span>
                </div>
              </div>
            </div>

            <div className="logos-section__detail-activity">
              <span className="logos-section__detail-label">Actividad</span>
              <div className="logos-section__activity-item">
                <div className="logos-section__avatar logos-section__avatar--sm">JC</div>
                <span>Juan actualizó el estado a <strong>En progreso</strong></span>
                <span className="logos-section__activity-time">hace 2h</span>
              </div>
              <div className="logos-section__activity-item">
                <div className="logos-section__avatar logos-section__avatar--sm">MR</div>
                <span>María añadió archivo <strong>landing-v2.fig</strong></span>
                <span className="logos-section__activity-time">hace 5h</span>
              </div>
              <div className="logos-section__activity-item">
                <div className="logos-section__avatar logos-section__avatar--sm">JC</div>
                <span>Juan creó la tarea</span>
                <span className="logos-section__activity-time">ayer</span>
              </div>
            </div>
          </div>

        </div>

        {/* Claude AI - Núcleo de Inteligencia */}
        <div className="logos-section__ai-container">
          {/* Aura de fondo */}
          <div className="logos-section__ai-aura"></div>

          <div ref={aiFaceRef} className="logos-section__ai-core">
            {/* Líneas de circuito/datos - izquierda */}
            <svg className="logos-section__ai-circuits logos-section__ai-circuits--left" viewBox="0 0 150 200">
              <path className="logos-section__ai-circuit" d="M150 100 L100 100 L100 60 L60 60 L60 40 L20 40" />
              <path className="logos-section__ai-circuit" d="M150 100 L110 100 L110 140 L70 140 L70 160 L30 160" />
              <path className="logos-section__ai-circuit" d="M150 90 L90 90 L90 30 L40 30" />
              <path className="logos-section__ai-circuit" d="M150 110 L95 110 L95 170 L50 170" />
              <circle className="logos-section__ai-node" cx="20" cy="40" r="4" />
              <circle className="logos-section__ai-node" cx="30" cy="160" r="3" />
              <circle className="logos-section__ai-node" cx="40" cy="30" r="3" />
              <circle className="logos-section__ai-node" cx="50" cy="170" r="4" />
              <circle className="logos-section__ai-node" cx="60" cy="60" r="2" />
              <circle className="logos-section__ai-node" cx="70" cy="140" r="2" />
            </svg>

            {/* Líneas de circuito/datos - derecha */}
            <svg className="logos-section__ai-circuits logos-section__ai-circuits--right" viewBox="0 0 150 200">
              <path className="logos-section__ai-circuit" d="M0 100 L50 100 L50 50 L90 50 L90 35 L130 35" />
              <path className="logos-section__ai-circuit" d="M0 100 L40 100 L40 150 L80 150 L80 165 L120 165" />
              <path className="logos-section__ai-circuit" d="M0 85 L60 85 L60 25 L110 25" />
              <path className="logos-section__ai-circuit" d="M0 115 L55 115 L55 175 L100 175" />
              <circle className="logos-section__ai-node" cx="130" cy="35" r="4" />
              <circle className="logos-section__ai-node" cx="120" cy="165" r="3" />
              <circle className="logos-section__ai-node" cx="110" cy="25" r="3" />
              <circle className="logos-section__ai-node" cx="100" cy="175" r="4" />
              <circle className="logos-section__ai-node" cx="90" cy="50" r="2" />
              <circle className="logos-section__ai-node" cx="80" cy="150" r="2" />
            </svg>

            {/* Anillos concéntricos del ojo/núcleo */}
            <div className="logos-section__ai-eye">
              <div className="logos-section__ai-ring logos-section__ai-ring--1"></div>
              <div className="logos-section__ai-ring logos-section__ai-ring--2"></div>
              <div className="logos-section__ai-ring logos-section__ai-ring--3"></div>
              <div className="logos-section__ai-ring logos-section__ai-ring--4"></div>

              {/* Iris/pupila central que sigue el mouse */}
              <div className="logos-section__ai-iris">
                <div className="logos-section__ai-pupil"></div>
              </div>

              {/* Líneas de escaneo rotativas */}
              <div className="logos-section__ai-scanner"></div>
            </div>

            {/* Espectro de audio */}
            <div className="logos-section__ai-spectrum">
              <div className="logos-section__ai-bar"></div>
              <div className="logos-section__ai-bar"></div>
              <div className="logos-section__ai-bar"></div>
              <div className="logos-section__ai-bar"></div>
              <div className="logos-section__ai-bar"></div>
              <div className="logos-section__ai-bar"></div>
              <div className="logos-section__ai-bar"></div>
              <div className="logos-section__ai-bar"></div>
              <div className="logos-section__ai-bar"></div>
              <div className="logos-section__ai-bar"></div>
              <div className="logos-section__ai-bar"></div>
              <div className="logos-section__ai-bar"></div>
              <div className="logos-section__ai-bar"></div>
            </div>

            {/* Partículas de datos */}
            <div className="logos-section__ai-particles">
              <div className="logos-section__ai-particle"></div>
              <div className="logos-section__ai-particle"></div>
              <div className="logos-section__ai-particle"></div>
              <div className="logos-section__ai-particle"></div>
              <div className="logos-section__ai-particle"></div>
              <div className="logos-section__ai-particle"></div>
              <div className="logos-section__ai-particle"></div>
              <div className="logos-section__ai-particle"></div>
              <div className="logos-section__ai-particle"></div>
              <div className="logos-section__ai-particle"></div>
            </div>

            {/* Nombre y branding */}
            <div className="logos-section__ai-brand">
              <span className="logos-section__ai-name">Claude</span>
              <span className="logos-section__ai-tagline">AI Assistant</span>
            </div>

            {/* Indicador de estado */}
            <div className="logos-section__ai-status">
              <span className="logos-section__ai-status-dot"></span>
              <span className="logos-section__ai-status-text">Listening</span>
            </div>

            {/* Preguntas/mensajes que van apareciendo */}
            <div className="logos-section__ai-questions">
              <div className="logos-section__ai-question logos-section__ai-question--1">¿Qué proyecto tienes en mente?</div>
              <div className="logos-section__ai-question logos-section__ai-question--2">¿Necesitas ayuda con código?</div>
              <div className="logos-section__ai-question logos-section__ai-question--3">¿Diseñamos algo juntos?</div>
              <div className="logos-section__ai-question logos-section__ai-question--4">¿En qué puedo ayudarte hoy?</div>
              <div className="logos-section__ai-question logos-section__ai-question--5">¿Listo para crear algo increíble?</div>
            </div>

            {/* Datos técnicos flotantes */}
            <div className="logos-section__ai-data">
              <span className="logos-section__ai-data-item logos-section__ai-data-item--1">analyzing_</span>
              <span className="logos-section__ai-data-item logos-section__ai-data-item--2">processing_</span>
              <span className="logos-section__ai-data-item logos-section__ai-data-item--3">ready_</span>
            </div>
          </div>
        </div>

        {/* Glows */}
        <div className="logos-section__glow logos-section__glow--1"></div>
        <div className="logos-section__glow logos-section__glow--2"></div>
        <div className="logos-section__glow logos-section__glow--3"></div>

        {/* Floating elements */}
        <div className="logos-section__floating logos-section__floating--1">✨</div>
        <div className="logos-section__floating logos-section__floating--2">🚀</div>
        <div className="logos-section__floating logos-section__floating--3">💎</div>
        <div className="logos-section__floating logos-section__floating--4">⚡</div>
      </div>

      {/* Headline */}
      <div className="logos-section__headline">
        <h2 className="logos-section__headline-title">Creando experiencias digitales excepcionales.</h2>
        <p className="logos-section__headline-subtitle">Desde startups innovadoras hasta empresas establecidas.</p>
      </div>

      {/* Tech grid */}
      <div className="logos-section__container">
        <p className="logos-section__tech-label">Tecnologías que dominamos</p>
        <div className="logos-section__tech-grid">
          {technologies.map((tech, i) => (
            <div key={i} className="logos-section__item">
              <div className="logos-section__icon">{tech.icon}</div>
              <span className="logos-section__name">{tech.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LogosSection;
