import { useEffect, useRef } from 'react';

/**
 * Premium animated gradient mesh background
 * Elegant flowing aurora-like effect
 */
const PortfolioHeroBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationId;
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener('resize', resize);

    // Gradient colors - elegant purple/blue/cyan palette
    const colors = [
      { r: 139, g: 92, b: 246 },   // Purple
      { r: 99, g: 102, b: 241 },   // Indigo
      { r: 6, g: 182, b: 212 },    // Cyan
      { r: 139, g: 92, b: 246 },   // Purple
    ];

    // Create flowing wave points
    class Wave {
      constructor(yOffset, amplitude, speed, color1, color2) {
        this.yOffset = yOffset;
        this.amplitude = amplitude;
        this.speed = speed;
        this.color1 = color1;
        this.color2 = color2;
        this.phase = Math.random() * Math.PI * 2;
      }

      draw(ctx, time, width, height) {
        const y = height * this.yOffset;
        const bandHeight = this.amplitude * 4;

        // Draw multiple soft lines to create a gradient effect
        const steps = 40;

        for (let step = 0; step < steps; step++) {
          const progress = step / steps;
          // Bell curve for opacity - peaks in middle, fades at edges
          const opacity = Math.sin(progress * Math.PI) * 0.06;

          if (opacity < 0.001) continue;

          ctx.beginPath();
          ctx.lineWidth = bandHeight / steps * 1.5;

          const offsetY = (progress - 0.5) * bandHeight;

          for (let x = 0; x <= width; x += 8) {
            const wave1 = Math.sin((x * 0.003) + (time * this.speed) + this.phase) * this.amplitude;
            const wave2 = Math.sin((x * 0.005) + (time * this.speed * 0.7) + this.phase) * (this.amplitude * 0.5);
            const wave3 = Math.sin((x * 0.001) + (time * this.speed * 0.3)) * (this.amplitude * 0.8);

            const yPos = y + wave1 + wave2 + wave3 + offsetY;

            // Fade at horizontal edges too
            const edgeFade = Math.min(x / 150, (width - x) / 150, 1);

            if (x === 0) {
              ctx.moveTo(x, yPos);
            } else {
              ctx.lineTo(x, yPos);
            }
          }

          // Mix colors based on progress
          const r = Math.round(this.color1.r + (this.color2.r - this.color1.r) * progress);
          const g = Math.round(this.color1.g + (this.color2.g - this.color1.g) * progress);
          const b = Math.round(this.color1.b + (this.color2.b - this.color1.b) * progress);

          ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${opacity})`;
          ctx.stroke();
        }
      }
    }

    // Create multiple elegant waves
    const waves = [
      new Wave(0.3, 80, 0.0004, colors[0], colors[2]),
      new Wave(0.4, 60, 0.0005, colors[1], colors[0]),
      new Wave(0.5, 100, 0.0003, colors[2], colors[1]),
      new Wave(0.6, 50, 0.0006, colors[0], colors[1]),
    ];

    // Floating orb class for elegant light effects
    class Orb {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * window.innerWidth;
        this.y = Math.random() * window.innerHeight * 0.7;
        this.size = Math.random() * 300 + 150;
        this.speedX = (Math.random() - 0.5) * 0.3;
        this.speedY = (Math.random() - 0.5) * 0.2;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.opacity = Math.random() * 0.08 + 0.03;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Gentle bounds
        if (this.x < -this.size || this.x > window.innerWidth + this.size) {
          this.speedX *= -1;
        }
        if (this.y < -this.size || this.y > window.innerHeight * 0.8) {
          this.speedY *= -1;
        }
      }

      draw(ctx) {
        const gradient = ctx.createRadialGradient(
          this.x, this.y, 0,
          this.x, this.y, this.size
        );
        gradient.addColorStop(0, `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.opacity})`);
        gradient.addColorStop(0.5, `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.opacity * 0.5})`);
        gradient.addColorStop(1, `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, 0)`);

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Create elegant floating orbs
    const orbs = Array.from({ length: 4 }, () => new Orb());

    const animate = () => {
      time += 1;

      // Clear with slight fade for smoother effect
      ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw orbs first (behind waves)
      orbs.forEach(orb => {
        orb.update();
        orb.draw(ctx);
      });

      // Draw waves
      waves.forEach(wave => {
        wave.draw(ctx, time, canvas.width, canvas.height);
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="portfolio-hero-bg"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  );
};

export default PortfolioHeroBackground;
