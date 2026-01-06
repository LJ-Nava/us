import { useEffect, useRef, useCallback } from 'react';

const MagneticUniverse = () => {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const mouseRef = useRef({ x: -1000, y: -1000, isActive: false });
  const animationRef = useRef(null);
  const dimensionsRef = useRef({ width: 0, height: 0 });
  const currentTextIndexRef = useRef(0);
  const textPositionsRef = useRef([]);

  // Paleta de colores - empieza en morado/azul
  const colorPalette = [
    { r: 139, g: 92, b: 246 },   // Violeta/Morado
    { r: 99, g: 102, b: 241 },   // Índigo
    { r: 59, g: 130, b: 246 },   // Azul
    { r: 6, g: 182, b: 212 },    // Cyan
    { r: 34, g: 197, b: 94 },    // Verde
    { r: 234, g: 179, b: 8 },    // Amarillo
    { r: 249, g: 115, b: 22 },   // Naranja
    { r: 236, g: 72, b: 153 },   // Rosa
    { r: 168, g: 85, b: 247 },   // Púrpura
  ];

  const colors = {
    primary: '#6366f1',
    secondary: '#818cf8',
    accent: '#8b5cf6',
    accentLight: '#a78bfa',
    light: '#c7d2fe',
    dark: '#4f46e5',
  };

  const texts = ['JV', '¿Quieres ver más?', 'Tu visión, realidad', 'JV'];
  const textInterval = 5000;

  class Particle {
    constructor(x, y, targetX, targetY, index, palette) {
      this.x = x;
      this.y = y;
      this.targetX = targetX;
      this.targetY = targetY;
      this.palette = palette;
      this.index = index;

      // Color actual (se calculará basado en tiempo y posición)
      this.currentColor = { r: 99, g: 102, b: 241 };
      // Offset único para cada partícula (efecto ola)
      this.colorOffset = Math.random() * Math.PI * 2;

      this.size = Math.random() * 2.5 + 1.2;
      this.baseSize = this.size;
      this.vx = 0;
      this.vy = 0;
      this.ease = 0.08 + Math.random() * 0.04;
      this.friction = 0.85;
      this.repelRadius = 70;
      this.repelStrength = 2;
    }

    setTarget(x, y, delay = 0) {
      setTimeout(() => {
        this.targetX = x;
        this.targetY = y;
      }, delay);
    }

    updateColor(globalColorPosition) {
      // Todas las partículas siguen el mismo color global, con pequeña variación
      const variation = this.colorOffset * 0.08; // Pequeña variación por partícula
      const colorPosition = (globalColorPosition + variation) % 1;

      // Interpolar entre colores de la paleta
      const paletteLength = this.palette.length;
      const scaledPos = colorPosition * paletteLength;
      const colorIndex1 = Math.floor(scaledPos) % paletteLength;
      const colorIndex2 = (colorIndex1 + 1) % paletteLength;
      const blend = scaledPos - Math.floor(scaledPos);

      const c1 = this.palette[colorIndex1];
      const c2 = this.palette[colorIndex2];

      // Interpolación suave entre colores
      this.currentColor.r = c1.r + (c2.r - c1.r) * blend;
      this.currentColor.g = c1.g + (c2.g - c1.g) * blend;
      this.currentColor.b = c1.b + (c2.b - c1.b) * blend;
    }

    update(mouse, globalColorPosition) {
      // Actualizar color - todas juntas
      this.updateColor(globalColorPosition);

      // Repulsión suave del mouse
      if (mouse.isActive) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < this.repelRadius) {
          const force = (this.repelRadius - dist) / this.repelRadius;
          const angle = Math.atan2(dy, dx);
          this.vx -= Math.cos(angle) * force * this.repelStrength;
          this.vy -= Math.sin(angle) * force * this.repelStrength;
          this.size = this.baseSize * (1 + force * 0.3);
        }
      }

      this.size += (this.baseSize - this.size) * 0.1;

      const dx = this.targetX - this.x;
      const dy = this.targetY - this.y;

      this.vx += dx * this.ease;
      this.vy += dy * this.ease;

      this.vx *= this.friction;
      this.vy *= this.friction;

      this.x += this.vx;
      this.y += this.vy;
    }

    draw(ctx) {
      const { r, g, b } = this.currentColor;
      const opacity = this.opacity || 1;

      if (this.isBackground) {
        // Capa de fondo - muy difusa y suave
        ctx.shadowColor = `rgba(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)}, 0.3)`;
        ctx.shadowBlur = 30;
        ctx.fillStyle = `rgba(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)}, ${opacity})`;
      } else if (this.isMidground) {
        // Capa intermedia
        ctx.shadowColor = `rgba(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)}, 0.4)`;
        ctx.shadowBlur = 20;
        ctx.fillStyle = `rgba(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)}, ${opacity})`;
      } else {
        // Capa frontal - nítida
        ctx.shadowColor = `rgba(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)}, 0.5)`;
        ctx.shadowBlur = 12;
        ctx.fillStyle = `rgb(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)})`;
      }

      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();

      ctx.shadowColor = 'transparent';
      ctx.shadowBlur = 0;
    }
  }

  const generateTextPositions = useCallback((text, width, height) => {
    const positions = [];
    const tempCanvas = document.createElement('canvas');
    const tempCtx = tempCanvas.getContext('2d');

    const textLength = text.length;
    let fontSize, canvasWidth, canvasHeight;

    if (textLength <= 3) {
      fontSize = 180;
      canvasWidth = 420;
      canvasHeight = 220;
    } else if (textLength <= 12) {
      fontSize = 64;
      canvasWidth = 580;
      canvasHeight = 140;
    } else {
      fontSize = 48;
      canvasWidth = 680;
      canvasHeight = 110;
    }

    tempCanvas.width = canvasWidth;
    tempCanvas.height = canvasHeight;

    tempCtx.fillStyle = '#000000';
    tempCtx.font = `bold ${fontSize}px Inter, Arial, sans-serif`;
    tempCtx.textAlign = 'center';
    tempCtx.textBaseline = 'middle';
    tempCtx.fillText(text, canvasWidth / 2, canvasHeight / 2);

    const imageData = tempCtx.getImageData(0, 0, canvasWidth, canvasHeight);
    const data = imageData.data;
    const offsetX = (width - canvasWidth) / 2;
    const offsetY = (height - canvasHeight) / 2;
    const gap = textLength <= 3 ? 4 : 3;

    for (let y = 0; y < canvasHeight; y += gap) {
      for (let x = 0; x < canvasWidth; x += gap) {
        const index = (y * canvasWidth + x) * 4;
        if (data[index + 3] > 128) {
          positions.push({
            x: x + offsetX,
            y: y + offsetY
          });
        }
      }
    }

    return positions;
  }, []);

  const generateParticles = useCallback((width, height) => {
    const particles = [];

    const allPositions = texts.map(text => generateTextPositions(text, width, height));
    textPositionsRef.current = allPositions;

    const maxParticles = Math.max(...allPositions.map(p => p.length));
    const initialPositions = allPositions[0];

    // Crear todas las partículas dispersas inicialmente
    for (let i = 0; i < maxParticles; i++) {
      const startX = width / 2 + (Math.random() - 0.5) * width * 0.8;
      const startY = height / 2 + (Math.random() - 0.5) * height * 0.8;

      const pos = initialPositions[i % initialPositions.length];
      const targetX = i < initialPositions.length ? pos.x : width / 2 + (Math.random() - 0.5) * 300;
      const targetY = i < initialPositions.length ? pos.y : height / 2 + (Math.random() - 0.5) * 200;

      const particle = new Particle(startX, startY, targetX, targetY, i, colorPalette);

      if (i >= initialPositions.length) {
        particle.size = Math.random() * 1.8 + 0.6;
        particle.baseSize = particle.size;
        particle.isExtra = true;
      }

      particles.push(particle);
    }

    // Partículas de FONDO - efecto 3D (capa trasera, más grandes y difusas)
    for (let i = 0; i < 40; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      const particle = new Particle(x, y, x, y, maxParticles + i, colorPalette);
      particle.size = Math.random() * 8 + 4; // Mucho más grandes
      particle.baseSize = particle.size;
      particle.floatAngle = Math.random() * Math.PI * 2;
      particle.floatSpeed = 0.002 + Math.random() * 0.003; // Más lentas
      particle.floatRadiusX = 60 + Math.random() * 100;
      particle.floatRadiusY = 40 + Math.random() * 80;
      particle.originX = x;
      particle.originY = y;
      particle.isBackground = true; // Capa de fondo
      particle.opacity = 0.15 + Math.random() * 0.15; // Semi-transparentes
      particles.push(particle);
    }

    // Partículas de MEDIO - efecto 3D (capa intermedia)
    for (let i = 0; i < 25; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      const particle = new Particle(x, y, x, y, maxParticles + 40 + i, colorPalette);
      particle.size = Math.random() * 4 + 2;
      particle.baseSize = particle.size;
      particle.floatAngle = Math.random() * Math.PI * 2;
      particle.floatSpeed = 0.004 + Math.random() * 0.004;
      particle.floatRadiusX = 50 + Math.random() * 80;
      particle.floatRadiusY = 35 + Math.random() * 60;
      particle.originX = x;
      particle.originY = y;
      particle.isMidground = true; // Capa intermedia
      particle.opacity = 0.25 + Math.random() * 0.2;
      particles.push(particle);
    }

    // Partículas ambientales flotantes (capa frontal pequeña)
    for (let i = 0; i < 20; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      const particle = new Particle(x, y, x, y, maxParticles + 65 + i, colorPalette);
      particle.size = Math.random() * 1.5 + 0.5;
      particle.baseSize = particle.size;
      particle.floatAngle = Math.random() * Math.PI * 2;
      particle.floatSpeed = 0.006 + Math.random() * 0.006;
      particle.floatRadiusX = 40 + Math.random() * 80;
      particle.floatRadiusY = 30 + Math.random() * 60;
      particle.originX = x;
      particle.originY = y;
      particle.isAmbient = true;
      particles.push(particle);
    }

    return particles;
  }, [generateTextPositions]);

  // Transición fluida con efecto de ola
  const transitionToText = useCallback((textIndex) => {
    const positions = textPositionsRef.current[textIndex];
    const particles = particlesRef.current.filter(p => !p.isAmbient);
    const { width, height } = dimensionsRef.current;

    if (!positions || particles.length === 0) return;

    const centerX = width / 2;
    const centerY = height / 2;

    particles.forEach((particle, i) => {
      // Calcular delay basado en distancia al centro para efecto "ola"
      const distToCenter = Math.sqrt(
        Math.pow(particle.x - centerX, 2) +
        Math.pow(particle.y - centerY, 2)
      );
      const maxDist = Math.sqrt(width * width + height * height) / 2;
      const delay = (distToCenter / maxDist) * 600; // Max 600ms de delay

      if (i < positions.length) {
        particle.setTarget(positions[i].x, positions[i].y, delay);
        particle.baseSize = Math.random() * 2.5 + 1.2;
        particle.isExtra = false;
      } else {
        // Partículas extra se distribuyen elegantemente alrededor
        const angle = (i / particles.length) * Math.PI * 2;
        const radius = 120 + Math.random() * 150;
        particle.setTarget(
          centerX + Math.cos(angle) * radius,
          centerY + Math.sin(angle) * radius,
          delay
        );
        particle.baseSize = Math.random() * 1.5 + 0.5;
        particle.isExtra = true;
      }
    });
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let resizeTimeout;
    let textCycleInterval;

    const resize = () => {
      const container = canvas.parentElement;
      const rect = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.scale(dpr, dpr);
      dimensionsRef.current = { width: rect.width, height: rect.height };

      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        particlesRef.current = generateParticles(rect.width, rect.height);
        currentTextIndexRef.current = 0;
      }, 100);
    };

    resize();
    window.addEventListener('resize', resize);

    textCycleInterval = setInterval(() => {
      currentTextIndexRef.current = (currentTextIndexRef.current + 1) % texts.length;
      transitionToText(currentTextIndexRef.current);
    }, textInterval);

    let time = 0;
    const colorCycleSpeed = 0.00025; // Muy lento - tarda ~40 segundos en completar el ciclo

    const animate = () => {
      time++;
      const { width, height } = dimensionsRef.current;

      // Posición global del color (0 a 1) - todas las partículas usan este valor base
      const globalColorPosition = (time * colorCycleSpeed) % 1;

      ctx.clearRect(0, 0, width, height);

      const particles = particlesRef.current;
      const mouse = mouseRef.current;

      // Actualizar todas las partículas
      particles.forEach(p => {
        if (p.isAmbient || p.isBackground || p.isMidground) {
          p.floatAngle += p.floatSpeed;
          p.targetX = p.originX + Math.cos(p.floatAngle) * p.floatRadiusX;
          p.targetY = p.originY + Math.sin(p.floatAngle * 0.8) * p.floatRadiusY;
        }
        p.update(mouse, globalColorPosition);
      });

      // Separar partículas por capas
      const backgroundParticles = particles.filter(p => p.isBackground);
      const midgroundParticles = particles.filter(p => p.isMidground);
      const mainParticles = particles.filter(p => !p.isAmbient && !p.isExtra && !p.isBackground && !p.isMidground);
      const frontParticles = particles.filter(p => p.isAmbient || p.isExtra);

      // 1. Dibujar capa de FONDO primero (más atrás)
      backgroundParticles.forEach(p => p.draw(ctx));

      // 2. Dibujar capa INTERMEDIA
      midgroundParticles.forEach(p => p.draw(ctx));

      // 3. Conexiones entre partículas principales
      ctx.lineWidth = 0.6;
      for (let i = 0; i < mainParticles.length; i += 5) {
        for (let j = i + 5; j < mainParticles.length; j += 5) {
          const p1 = mainParticles[i];
          const p2 = mainParticles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distSq = dx * dx + dy * dy;
          if (distSq < 350) {
            const c1 = p1.currentColor;
            const c2 = p2.currentColor;
            const r = Math.round((c1.r + c2.r) / 2);
            const g = Math.round((c1.g + c2.g) / 2);
            const b = Math.round((c1.b + c2.b) / 2);
            const alpha = (1 - Math.sqrt(distSq) / 18) * 0.12;
            ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      // 4. Dibujar partículas principales (texto)
      mainParticles.forEach(p => p.draw(ctx));

      // 5. Dibujar partículas frontales (ambient y extra)
      frontParticles.forEach(p => {
        if (p.size > 0.1) p.draw(ctx);
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      clearTimeout(resizeTimeout);
      clearInterval(textCycleInterval);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [generateParticles, transitionToText]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top, isActive: true };
    };
    const handleMouseLeave = () => { mouseRef.current = { ...mouseRef.current, isActive: false }; };
    const handleMouseEnter = () => { mouseRef.current = { ...mouseRef.current, isActive: true }; };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);
    canvas.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      canvas.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, []);

  return (
    <div className="magnetic-universe">
      <canvas ref={canvasRef} className="magnetic-universe__canvas" />
    </div>
  );
};

export default MagneticUniverse;
