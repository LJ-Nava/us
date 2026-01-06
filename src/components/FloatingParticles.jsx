import { useEffect, useRef } from 'react';

const FloatingParticles = () => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const particlesRef = useRef([]);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width = window.innerWidth;
    let height = window.innerHeight;

    // Configuración de partículas
    const particleCount = Math.min(80, Math.floor((width * height) / 15000));

    // Colores índigo/violeta elegantes
    const colors = [
      { r: 99, g: 102, b: 241, a: 0.4 },   // Índigo principal
      { r: 129, g: 140, b: 248, a: 0.35 }, // Índigo claro
      { r: 139, g: 92, b: 246, a: 0.3 },   // Violeta
      { r: 167, g: 139, b: 250, a: 0.25 }, // Violeta claro
      { r: 199, g: 210, b: 254, a: 0.2 },  // Índigo muy suave
    ];

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    const createParticle = (index) => {
      const color = colors[Math.floor(Math.random() * colors.length)];
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        baseX: Math.random() * width,
        baseY: Math.random() * height,
        size: Math.random() * 3 + 1,
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: (Math.random() - 0.5) * 0.3,
        color,
        phase: Math.random() * Math.PI * 2,
        amplitude: Math.random() * 30 + 20,
        frequency: Math.random() * 0.002 + 0.001,
        pulseSpeed: Math.random() * 0.02 + 0.01,
        pulsePhase: Math.random() * Math.PI * 2,
      };
    };

    const initParticles = () => {
      particlesRef.current = [];
      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push(createParticle(i));
      }
    };

    const handleMouseMove = (e) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };

    const animate = (time) => {
      ctx.clearRect(0, 0, width, height);

      particlesRef.current.forEach((particle, i) => {
        // Movimiento flotante suave
        particle.x = particle.baseX + Math.sin(time * particle.frequency + particle.phase) * particle.amplitude;
        particle.y = particle.baseY + Math.cos(time * particle.frequency * 0.8 + particle.phase) * particle.amplitude * 0.6;

        // Movimiento base lento
        particle.baseX += particle.speedX;
        particle.baseY += particle.speedY;

        // Wrap around
        if (particle.baseX < -50) particle.baseX = width + 50;
        if (particle.baseX > width + 50) particle.baseX = -50;
        if (particle.baseY < -50) particle.baseY = height + 50;
        if (particle.baseY > height + 50) particle.baseY = -50;

        // Interacción sutil con el mouse
        const dx = mouseRef.current.x - particle.x;
        const dy = mouseRef.current.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDistance = 200;

        if (distance < maxDistance) {
          const force = (1 - distance / maxDistance) * 0.02;
          particle.x -= dx * force;
          particle.y -= dy * force;
        }

        // Pulsación suave del tamaño
        const pulseFactor = 1 + Math.sin(time * particle.pulseSpeed + particle.pulsePhase) * 0.3;
        const currentSize = particle.size * pulseFactor;

        // Dibujar partícula con glow suave
        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, currentSize * 3
        );
        gradient.addColorStop(0, `rgba(${particle.color.r}, ${particle.color.g}, ${particle.color.b}, ${particle.color.a})`);
        gradient.addColorStop(0.5, `rgba(${particle.color.r}, ${particle.color.g}, ${particle.color.b}, ${particle.color.a * 0.3})`);
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, currentSize * 3, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Centro más brillante
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, currentSize, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${particle.color.r}, ${particle.color.g}, ${particle.color.b}, ${particle.color.a * 1.5})`;
        ctx.fill();
      });

      // Dibujar conexiones elegantes entre partículas cercanas
      ctx.strokeStyle = 'rgba(99, 102, 241, 0.06)';
      ctx.lineWidth = 0.5;

      for (let i = 0; i < particlesRef.current.length; i++) {
        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const p1 = particlesRef.current[i];
          const p2 = particlesRef.current[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 120) {
            const opacity = (1 - distance / 120) * 0.08;
            ctx.strokeStyle = `rgba(99, 102, 241, ${opacity})`;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    resize();
    initParticles();
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove);
    animationRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 1,
      }}
    />
  );
};

export default FloatingParticles;
