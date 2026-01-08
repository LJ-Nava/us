import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useI18n } from '../contexts/I18nContext';

gsap.registerPlugin(ScrollTrigger);

// Colors for the wave effect
const waveColors = [
  { name: 'gold', primary: '#f59e0b', secondary: '#fbbf24', glow: 'rgba(245, 158, 11, 0.6)' },
  { name: 'orange', primary: '#f97316', secondary: '#fb923c', glow: 'rgba(249, 115, 22, 0.6)' },
  { name: 'red', primary: '#ef4444', secondary: '#f87171', glow: 'rgba(239, 68, 68, 0.6)' },
  { name: 'pink', primary: '#ec4899', secondary: '#f472b6', glow: 'rgba(236, 72, 153, 0.6)' },
  { name: 'violet', primary: '#8b5cf6', secondary: '#a78bfa', glow: 'rgba(139, 92, 246, 0.6)' },
  { name: 'cyan', primary: '#06b6d4', secondary: '#22d3ee', glow: 'rgba(6, 182, 212, 0.6)' },
  { name: 'emerald', primary: '#10b981', secondary: '#34d399', glow: 'rgba(16, 185, 129, 0.6)' },
];

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
  // Random beautiful color on each page load
  const [colorIndex, setColorIndex] = useState(() => Math.floor(Math.random() * waveColors.length));
  const [isWaving, setIsWaving] = useState(false);
  const colorIndexRef = useRef(colorIndex);
  const { t } = useI18n();

  // Keep ref in sync with state
  useEffect(() => {
    colorIndexRef.current = colorIndex;
  }, [colorIndex]);

  // Handle click on AI core - smooth, elegant color transformation
  const handleAIClick = () => {
    if (isWaving) return;

    setIsWaving(true);

    // Get random color different from current
    let nextIndex;
    do {
      nextIndex = Math.floor(Math.random() * waveColors.length);
    } while (nextIndex === colorIndex && waveColors.length > 1);

    const newColor = waveColors[nextIndex];

    // Create gradual, smooth color transformation
    const container = document.querySelector('.logos-section__ai-container');
    if (!container) return;

    // Premium timeline with elegant easing
    const tl = gsap.timeline({
      onComplete: () => {
        setColorIndex(nextIndex);
        setIsWaving(false);
      }
    });

    // Elegant entrance - subtle scale breathing effect
    tl.to(container, {
      scale: 1.02,
      duration: 0.4,
      ease: 'power1.out'
    }, 0);

    tl.to(container, {
      scale: 1,
      duration: 0.6,
      ease: 'power2.inOut'
    }, 0.4);

    // 1. Start with the iris/pupil (center) - elegant transformation
    const iris = document.querySelector('.logos-section__ai-iris');
    const pupil = document.querySelector('.logos-section__ai-pupil');
    const pupilCore = document.querySelector('.logos-section__ai-pupil-core');

    tl.to(iris, {
      background: `radial-gradient(circle at 30% 30%, ${newColor.secondary} 0%, ${newColor.primary} 35%, ${newColor.primary}99 100%)`,
      boxShadow: `0 0 40px ${newColor.glow}, 0 0 80px ${newColor.glow}`,
      duration: 1.2,
      ease: 'power2.inOut'
    }, 0.1);

    tl.to(pupil, {
      background: `radial-gradient(circle, #fff 0%, ${newColor.secondary} 40%, ${newColor.primary} 100%)`,
      duration: 1.0,
      ease: 'power2.inOut'
    }, 0.15);

    tl.to(pupilCore, {
      boxShadow: `0 0 15px #fff, 0 0 30px ${newColor.primary}`,
      duration: 0.9,
      ease: 'power2.inOut'
    }, 0.2);

    // 1.5 Iris glow - gentle bloom
    const irisGlow = document.querySelector('.logos-section__ai-iris-glow');
    if (irisGlow) {
      tl.to(irisGlow, {
        background: `radial-gradient(circle, ${newColor.glow} 0%, transparent 70%)`,
        opacity: 1.2,
        duration: 0.6,
        ease: 'power1.out'
      }, 0.1);

      tl.to(irisGlow, {
        opacity: 1,
        duration: 0.5,
        ease: 'power1.inOut'
      }, 0.7);
    }

    // 2. Inner rings - flowing wave transition from center outward
    const rings = document.querySelectorAll('.logos-section__ai-ring');
    rings.forEach((ring, i) => {
      const delay = 0.15 + (i * 0.08); // Gentle cascading delay
      tl.to(ring, {
        borderColor: `${newColor.primary}99`,
        boxShadow: `0 0 ${8 + i * 3}px ${newColor.glow}`,
        duration: 1.1,
        ease: 'sine.inOut'
      }, delay);
    });

    // 3. Hexagon shape - elegant rotation
    const hexShape = document.querySelector('.logos-section__ai-hex-shape');
    if (hexShape) {
      tl.to(hexShape, {
        stroke: `${newColor.primary}66`,
        rotation: '+=30',
        transformOrigin: 'center center',
        duration: 1.2,
        ease: 'power1.inOut'
      }, 0.2);
    }

    // 4. Arcs - smooth transition
    const arcs = document.querySelectorAll('.logos-section__ai-arc');
    arcs.forEach((arc, i) => {
      tl.to(arc, {
        stroke: `${newColor.primary}99`,
        duration: 1.0,
        ease: 'sine.inOut'
      }, 0.4 + (i * 0.08));
    });

    // 5. Scanner lines - gentle fade
    const scanners = document.querySelectorAll('.logos-section__ai-scanner');
    scanners.forEach((scanner, i) => {
      tl.to(scanner, {
        background: `linear-gradient(90deg, transparent 0%, ${newColor.primary}15 15%, ${newColor.primary} 50%, ${newColor.primary}15 85%, transparent 100%)`,
        duration: 0.9,
        ease: 'sine.inOut'
      }, 0.5 + (i * 0.12));
    });

    // 6. Circuit lines - smooth spreading
    const circuits = document.querySelectorAll('.logos-section__ai-circuit');
    circuits.forEach((circuit, i) => {
      tl.to(circuit, {
        stroke: `${newColor.primary}99`,
        filter: `drop-shadow(0 0 4px ${newColor.glow})`,
        duration: 1,
        ease: 'sine.inOut'
      }, 0.6 + (i * 0.06));
    });

    // 7. Nodes - gentle cascading effect
    const nodes = document.querySelectorAll('.logos-section__ai-node');
    nodes.forEach((node, i) => {
      tl.to(node, {
        fill: newColor.primary,
        filter: `drop-shadow(0 0 6px ${newColor.glow})`,
        duration: 0.8,
        ease: 'sine.inOut'
      }, 0.7 + (i * 0.05));
    });

    // 8. Pulses - smooth transition
    const pulses = document.querySelectorAll('.logos-section__ai-pulse');
    pulses.forEach((pulse, i) => {
      tl.to(pulse, {
        borderColor: `${newColor.primary}66`,
        duration: 0.9,
        ease: 'sine.inOut'
      }, 0.6 + (i * 0.1));
    });

    // 9. Spectrum bars - smooth spreading from center
    const bars = document.querySelectorAll('.logos-section__ai-bar');
    const centerIndex = Math.floor(bars.length / 2);
    bars.forEach((bar, i) => {
      const distanceFromCenter = Math.abs(i - centerIndex);
      const delay = 0.7 + (distanceFromCenter * 0.05);
      tl.to(bar, {
        background: `linear-gradient(180deg, #fff 0%, ${newColor.secondary} 20%, ${newColor.primary} 60%, ${newColor.primary}99 100%)`,
        boxShadow: `0 0 10px ${newColor.glow}, 0 0 20px ${newColor.glow}66`,
        duration: 0.8,
        ease: 'sine.inOut'
      }, delay);
    });

    // 10. Particles - gentle spreading
    const particles = document.querySelectorAll('.logos-section__ai-particle');
    particles.forEach((particle, i) => {
      tl.to(particle, {
        background: newColor.primary,
        boxShadow: `0 0 10px ${newColor.glow}`,
        duration: 0.9,
        ease: 'sine.inOut'
      }, 0.8 + (i * 0.05));
    });

    // 11. Extended lines and nodes - smooth spreading
    const extendedLines = document.querySelectorAll('.logos-section__extended-line');
    extendedLines.forEach((line, i) => {
      tl.to(line, {
        stroke: `${newColor.primary}66`,
        filter: `drop-shadow(0 0 3px ${newColor.glow})`,
        duration: 1,
        ease: 'sine.inOut'
      }, 0.9 + (i * 0.08));
    });

    const extendedNodes = document.querySelectorAll('.logos-section__extended-node');
    extendedNodes.forEach((node, i) => {
      tl.to(node, {
        fill: `${newColor.primary}cc`,
        filter: `drop-shadow(0 0 6px ${newColor.glow})`,
        duration: 0.4,
        ease: 'power2.out'
      }, 0.9 + (i * 0.03));
    });

    // 12. Auras - final envelope
    const auras = document.querySelectorAll('.logos-section__ai-aura');
    auras.forEach((aura, i) => {
      const newAuraGradient = i === 0
        ? `radial-gradient(ellipse at center, ${newColor.primary}1f 0%, ${newColor.primary}0f 30%, ${newColor.primary}08 50%, transparent 70%)`
        : `radial-gradient(ellipse at center, ${newColor.secondary}14 0%, ${newColor.primary}0a 40%, transparent 70%)`;
      tl.to(aura, {
        background: newAuraGradient,
        duration: 0.8,
        ease: 'power2.inOut'
      }, 0.85 + (i * 0.1));
    });

    // 13. Brand name color
    const brandName = document.querySelector('.logos-section__ai-name');
    if (brandName) {
      tl.to(brandName, {
        color: newColor.primary,
        textShadow: `0 0 30px ${newColor.glow}`,
        duration: 0.5,
        ease: 'power2.out'
      }, 1);
    }

    // 14. Tagline
    const tagline = document.querySelector('.logos-section__ai-tagline');
    if (tagline) {
      tl.to(tagline, {
        color: `${newColor.primary}b3`,
        duration: 0.5,
        ease: 'power2.out'
      }, 1.05);
    }

    // 15. Questions bubbles
    const questions = document.querySelectorAll('.logos-section__ai-question');
    questions.forEach((question, i) => {
      tl.to(question, {
        color: newColor.secondary,
        background: `linear-gradient(135deg, ${newColor.primary}26 0%, ${newColor.primary}1a 100%)`,
        borderColor: `${newColor.primary}40`,
        duration: 0.4,
        ease: 'power2.out'
      }, 1.1 + (i * 0.05));
    });

    // 16. Data items
    const dataItems = document.querySelectorAll('.logos-section__ai-data-item');
    dataItems.forEach((item, i) => {
      tl.to(item, {
        color: `${newColor.primary}80`,
        textShadow: `0 0 10px ${newColor.glow}4d`,
        duration: 0.3,
        ease: 'power2.out'
      }, 1.15 + (i * 0.03));
    });

    // 17. Energy lines (cross pattern)
    const energyLines = document.querySelectorAll('.logos-section__ai-energy');
    energyLines.forEach((line, i) => {
      tl.to(line, {
        background: `linear-gradient(90deg, ${newColor.primary} 0%, ${newColor.primary}4d 30%, transparent 100%)`,
        duration: 0.4,
        ease: 'power2.inOut'
      }, 0.5 + (i * 0.05));
    });

    // 18. Scanner dot (::before pseudo element handled via CSS variable update)
    // Update CSS variables on the container for any remaining elements
    tl.to(container, {
      '--ai-primary': newColor.primary,
      '--ai-secondary': newColor.secondary,
      '--ai-glow': newColor.glow,
      duration: 0.5,
      ease: 'power2.inOut'
    }, 0.3);

    // Final flash effect on the container
    tl.to(container, {
      filter: 'brightness(1.15)',
      duration: 0.15,
      ease: 'power2.out'
    }, 0.2);

    tl.to(container, {
      filter: 'brightness(1)',
      duration: 0.3,
      ease: 'power2.inOut'
    }, 0.35);
  };

  const currentColor = waveColors[colorIndex];

  const technologies = [
    {
      name: 'React',
      icon: (
        <svg viewBox="0 0 24 24" fill="#61DAFB">
          <path d="M12 10.11c1.03 0 1.87.84 1.87 1.89 0 1-.84 1.85-1.87 1.85S10.13 13 10.13 12c0-1.05.84-1.89 1.87-1.89M7.37 20c.63.38 2.01-.2 3.6-1.7-.52-.59-1.03-1.23-1.51-1.9a22.7 22.7 0 0 1-2.4-.36c-.51 2.14-.32 3.61.31 3.96m.71-5.74l-.29-.51c-.11.29-.22.58-.29.86.27.06.57.11.88.16l-.3-.51m6.54-.76l.81-1.5-.81-1.5c-.3-.53-.62-1-.91-1.47C13.17 9 12.6 9 12 9c-.6 0-1.17 0-1.71.03-.29.47-.61.94-.91 1.47L8.57 12l.81 1.5c.3.53.62 1 .91 1.47.54.03 1.11.03 1.71.03.6 0 1.17 0 1.71-.03.29-.47.61-.94.91-1.47M12 6.78c-.19.22-.39.45-.59.72h1.18c-.2-.27-.4-.5-.59-.72m0 10.44c.19-.22.39-.45.59-.72h-1.18c.2.27.4.5.59.72M16.62 4c-.62-.38-2 .2-3.59 1.7.52.59 1.03 1.23 1.51 1.9.82.08 1.63.2 2.4.36.51-2.14.32-3.61-.32-3.96m-.7 5.74l.29.51c.11-.29.22-.58.29-.86-.27-.06-.57-.11-.88-.16l.3.51m1.45-7.05c1.47.84 1.63 3.05 1.01 5.63 2.54.75 4.37 1.99 4.37 3.68s-1.83 2.93-4.37 3.68c.62 2.58.46 4.79-1.01 5.63-1.46.84-3.45-.12-5.37-1.95-1.92 1.83-3.91 2.79-5.38 1.95-1.46-.84-1.62-3.05-1-5.63-2.54-.75-4.37-1.99-4.37-3.68s1.83-2.93 4.37-3.68c-.62-2.58-.46-4.79 1-5.63 1.47-.84 3.46.12 5.38 1.95 1.92-1.83 3.91-2.79 5.37-1.95M17.08 12c.34.75.64 1.5.89 2.26 2.1-.63 3.28-1.53 3.28-2.26s-1.18-1.63-3.28-2.26c-.25.76-.55 1.51-.89 2.26M6.92 12c-.34-.75-.64-1.5-.89-2.26-2.1.63-3.28 1.53-3.28 2.26s1.18 1.63 3.28 2.26c.25-.76.55-1.51.89-2.26m9 2.26l-.3.51c.31-.05.61-.1.88-.16-.07-.28-.18-.57-.29-.86l-.29.51m-9.82 1.1c.54.54 1.1 1.04 1.67 1.47a22.7 22.7 0 0 1-1.67-1.47m0-6.72c.54-.54 1.1-1.04 1.67-1.47a22.7 22.7 0 0 0-1.67 1.47m9.82 6.72a22.7 22.7 0 0 1-1.67 1.47c.57-.43 1.13-.93 1.67-1.47"/>
        </svg>
      )
    },
    {
      name: 'Next.js',
      icon: (
        <svg viewBox="0 0 24 24" fill="#000000">
          <path d="M11.572 0c-.176 0-.31.001-.358.007a19.76 19.76 0 0 1-.364.033C7.443.346 4.25 2.185 2.228 5.012a11.875 11.875 0 0 0-2.119 5.243c-.096.659-.108.854-.108 1.747s.012 1.089.108 1.748c.652 4.506 3.86 8.292 8.209 9.695.779.25 1.6.422 2.534.525.363.04 1.935.04 2.299 0 1.611-.178 2.977-.577 4.323-1.264.207-.106.247-.134.219-.158-.016-.013-.9-1.197-1.964-2.632l-1.935-2.607-2.425-3.587c-.009-.002-.018 1.591-.023 3.538-.007 3.405-.01 3.543-.052 3.623a.43.43 0 0 1-.206.213c-.075.038-.14.045-.495.045H9.858l-.108-.068a.441.441 0 0 1-.157-.172l-.05-.105.005-4.742.007-4.744.073-.092a.644.644 0 0 1 .174-.143c.096-.047.133-.051.54-.051.479 0 .558.019.682.155a1098.4 1098.4 0 0 1 4.755 7.212l1.91 2.907.096-.063a12.402 12.402 0 0 0 2.49-2.194 11.944 11.944 0 0 0 2.824-6.134c.096-.66.108-.854.108-1.748s-.012-1.088-.108-1.747c-.652-4.506-3.859-8.292-8.208-9.695a12.597 12.597 0 0 0-2.499-.523A33.119 33.119 0 0 0 11.572 0z"/>
        </svg>
      )
    },
    {
      name: 'TypeScript',
      icon: (
        <svg viewBox="0 0 24 24" fill="#3178C6">
          <path d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-.643-.361 5.093 5.093 0 0 0-.717-.26 5.453 5.453 0 0 0-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 0 0-.623.242c-.17.104-.3.229-.393.374a.888.888 0 0 0-.14.49c0 .196.053.373.156.529.104.156.252.304.443.444s.423.276.696.41c.273.135.582.274.926.416.47.197.892.407 1.266.628.374.222.695.473.963.753.268.279.472.598.614.957.142.359.214.776.214 1.253 0 .657-.125 1.21-.373 1.656a3.033 3.033 0 0 1-1.012 1.085 4.38 4.38 0 0 1-1.487.596c-.566.12-1.163.18-1.79.18a9.916 9.916 0 0 1-1.84-.164 5.544 5.544 0 0 1-1.512-.493v-2.63a5.033 5.033 0 0 0 3.237 1.2c.333 0 .624-.03.872-.09.249-.06.456-.144.623-.25.166-.108.29-.234.373-.38a1.023 1.023 0 0 0-.074-1.089 2.12 2.12 0 0 0-.537-.5 5.597 5.597 0 0 0-.807-.444 27.72 27.72 0 0 0-1.007-.436c-.918-.383-1.602-.852-2.053-1.405-.45-.553-.676-1.222-.676-2.005 0-.614.123-1.141.369-1.582.245-.44.58-.804 1.004-1.089a4.494 4.494 0 0 1 1.47-.629 7.536 7.536 0 0 1 1.77-.201zm-15.113.188h9.563v2.166H9.506v9.646H6.789v-9.646H3.375z"/>
        </svg>
      )
    },
    {
      name: 'Tailwind',
      icon: (
        <svg viewBox="0 0 24 24" fill="#06B6D4">
          <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z"/>
        </svg>
      )
    },
    {
      name: 'Figma',
      icon: (
        <svg viewBox="0 0 24 24">
          <path fill="#F24E1E" d="M8 24c2.208 0 4-1.792 4-4v-4H8c-2.208 0-4 1.792-4 4s1.792 4 4 4z"/>
          <path fill="#A259FF" d="M4 12c0-2.208 1.792-4 4-4h4v8H8c-2.208 0-4-1.792-4-4z"/>
          <path fill="#F24E1E" d="M4 4c0-2.208 1.792-4 4-4h4v8H8C5.792 8 4 6.208 4 4z"/>
          <path fill="#FF7262" d="M12 0h4c2.208 0 4 1.792 4 4s-1.792 4-4 4h-4V0z"/>
          <path fill="#1ABCFE" d="M20 12c0 2.208-1.792 4-4 4s-4-1.792-4-4 1.792-4 4-4 4 1.792 4 4z"/>
        </svg>
      )
    },
    {
      name: 'Node.js',
      icon: (
        <svg viewBox="0 0 24 24" fill="#339933">
          <path d="M11.998 24c-.321 0-.641-.084-.922-.247l-2.936-1.737c-.438-.245-.224-.332-.08-.383.585-.203.703-.25 1.328-.604.065-.037.151-.023.218.017l2.256 1.339a.29.29 0 0 0 .272 0l8.795-5.076a.277.277 0 0 0 .134-.238V6.921a.283.283 0 0 0-.137-.242l-8.791-5.072a.278.278 0 0 0-.271 0L3.075 6.68a.284.284 0 0 0-.139.241v10.15a.27.27 0 0 0 .139.235l2.409 1.392c1.307.654 2.108-.116 2.108-.89V7.787c0-.142.114-.253.256-.253h1.115c.139 0 .255.112.255.253v10.021c0 1.745-.95 2.745-2.604 2.745-.508 0-.909 0-2.026-.551L2.28 18.675a1.857 1.857 0 0 1-.922-1.604V6.921c0-.659.353-1.275.922-1.603l8.795-5.082c.557-.315 1.296-.315 1.848 0l8.794 5.082c.57.329.924.944.924 1.603v10.15a1.86 1.86 0 0 1-.924 1.604l-8.795 5.078c-.28.163-.6.247-.924.247z"/>
        </svg>
      )
    },
    {
      name: 'Vue.js',
      icon: (
        <svg viewBox="0 0 24 24" fill="#4FC08D">
          <path d="M24 1.61h-9.94L12 5.16 9.94 1.61H0l12 20.78L24 1.61zM12 14.08L5.16 2.23h4.43L12 6.41l2.41-4.18h4.43L12 14.08z"/>
        </svg>
      )
    },
    {
      name: 'Angular',
      icon: (
        <svg viewBox="0 0 24 24" fill="#DD0031">
          <path d="M9.931 12.645h4.138l-2.07-4.908m0-7.737L.68 3.982l1.726 14.771L12 24l9.596-5.242L23.32 3.984 11.999.001zm7.064 18.31h-2.638l-1.422-3.503H8.996l-1.422 3.504h-2.64L12 2.65z"/>
        </svg>
      )
    },
    {
      name: 'Svelte',
      icon: (
        <svg viewBox="0 0 24 24" fill="#FF3E00">
          <path d="M20.68 3.17a7.3 7.3 0 0 0-9.8-2.1l-5.6 3.56A6.36 6.36 0 0 0 2.4 8.5a6.58 6.58 0 0 0 .69 4.9 6.12 6.12 0 0 0-.95 2.37 6.68 6.68 0 0 0 1.13 5.06 7.3 7.3 0 0 0 9.8 2.1l5.6-3.56a6.36 6.36 0 0 0 2.88-3.87 6.58 6.58 0 0 0-.69-4.9 6.12 6.12 0 0 0 .95-2.37 6.68 6.68 0 0 0-1.13-5.06zM10.22 21.3a4.54 4.54 0 0 1-4.87-1.8 4.17 4.17 0 0 1-.7-3.16 4.87 4.87 0 0 1 .18-.6l.12-.37.34.22a7.3 7.3 0 0 0 2.2 1.1l.2.06-.02.2a1.26 1.26 0 0 0 .24.86 1.42 1.42 0 0 0 1.52.56 1.32 1.32 0 0 0 .38-.15l5.6-3.56a1.17 1.17 0 0 0 .53-.72 1.3 1.3 0 0 0-.22-.99 1.42 1.42 0 0 0-1.52-.56 1.32 1.32 0 0 0-.38.15l-2.14 1.36a4.28 4.28 0 0 1-1.21.5 4.54 4.54 0 0 1-4.87-1.8 4.17 4.17 0 0 1-.7-3.16 3.74 3.74 0 0 1 1.7-2.3l5.6-3.56a4.28 4.28 0 0 1 1.21-.5 4.54 4.54 0 0 1 4.87 1.8 4.17 4.17 0 0 1 .7 3.16 4.87 4.87 0 0 1-.18.6l-.12.37-.34-.22a7.3 7.3 0 0 0-2.2-1.1l-.2-.06.02-.2a1.26 1.26 0 0 0-.24-.86 1.42 1.42 0 0 0-1.52-.56 1.32 1.32 0 0 0-.38.15l-5.6 3.56a1.17 1.17 0 0 0-.53.72 1.3 1.3 0 0 0 .22.99 1.42 1.42 0 0 0 1.52.56 1.32 1.32 0 0 0 .38-.15l2.14-1.36a4.28 4.28 0 0 1 1.21-.5 4.54 4.54 0 0 1 4.87 1.8 4.17 4.17 0 0 1 .7 3.16 3.74 3.74 0 0 1-1.7 2.3l-5.6 3.56a4.28 4.28 0 0 1-1.21.5z"/>
        </svg>
      )
    },
    {
      name: 'Python',
      icon: (
        <svg viewBox="0 0 24 24">
          <path fill="#3776AB" d="M11.914 0C5.82 0 6.2 2.656 6.2 2.656l.007 2.752h5.814v.826H3.9S0 5.789 0 11.969c0 6.18 3.403 5.96 3.403 5.96h2.03v-2.867s-.109-3.42 3.35-3.42h5.766s3.24.052 3.24-3.148V3.202S18.28 0 11.913 0zM8.708 1.85c.578 0 1.046.47 1.046 1.052 0 .581-.468 1.052-1.046 1.052-.579 0-1.046-.47-1.046-1.052 0-.581.467-1.052 1.046-1.052z"/>
          <path fill="#FFD43B" d="M12.087 24c6.093 0 5.713-2.656 5.713-2.656l-.007-2.752h-5.814v-.826h8.121s3.9.445 3.9-5.735c0-6.18-3.403-5.96-3.403-5.96h-2.03v2.867s.109 3.42-3.35 3.42H9.45s-3.24-.052-3.24 3.148v5.292S5.72 24 12.087 24zm3.206-1.85c-.578 0-1.046-.47-1.046-1.052 0-.581.468-1.052 1.046-1.052.579 0 1.046.47 1.046 1.052 0 .581-.467 1.052-1.046 1.052z"/>
        </svg>
      )
    },
    {
      name: 'PostgreSQL',
      icon: (
        <svg viewBox="0 0 24 24" fill="#4169E1">
          <path d="M17.128 0a10.134 10.134 0 0 0-2.755.403l-.063.02a10.922 10.922 0 0 0-1.227-.082c-.992 0-1.876.18-2.626.493A4.48 4.48 0 0 0 6.89 2.29l-.074.123-.093-.012c-.956-.122-1.878-.106-2.71.106-1.418.362-2.49 1.206-2.876 2.543-.238.825-.178 1.893.174 3.218.352 1.324.966 2.898 1.873 4.74a1.05 1.05 0 0 0 .077.133c.558.933 1.3 1.377 2.09 1.456.456.045.915-.043 1.338-.197.034.122.07.244.112.364.273.787.674 1.484 1.267 1.958.598.478 1.395.72 2.322.568.45-.074.862-.235 1.228-.462.014.07.029.14.044.208.16.716.48 1.322.996 1.755.52.436 1.2.656 2.003.634 1.076-.03 2.052-.586 2.765-1.42.65-.762 1.108-1.748 1.293-2.86l.004-.025.002-.013c.04-.283.09-.583.135-.893.107-.729.199-1.522.2-2.308v-.012c.007-.32.004-.643-.009-.964.024-.028.048-.055.07-.084.714-.907 1.108-2.043 1.26-3.254.153-1.218.043-2.5-.357-3.667-.4-1.168-1.097-2.212-2.132-2.865A5.708 5.708 0 0 0 17.128 0zM6.928 17.055z"/>
        </svg>
      )
    },
    {
      name: 'MongoDB',
      icon: (
        <svg viewBox="0 0 24 24" fill="#47A248">
          <path d="M17.193 9.555c-1.264-5.58-4.252-7.414-4.573-8.115-.28-.394-.53-.954-.735-1.44-.036.495-.055.685-.523 1.184-.723.566-4.438 3.682-4.74 10.02-.282 5.912 4.27 9.435 4.888 9.884l.07.05A73.49 73.49 0 0 1 11.91 24h.481c.114-1.032.284-2.056.51-3.07.417-.296.604-.463.85-.693a11.342 11.342 0 0 0 3.639-8.464c.01-.814-.103-1.662-.197-2.218zm-5.336 8.195s0-8.291.275-8.29c.213 0 .49 10.695.49 10.695-.381-.045-.765-1.76-.765-2.405z"/>
        </svg>
      )
    },
    {
      name: 'Docker',
      icon: (
        <svg viewBox="0 0 24 24" fill="#2496ED">
          <path d="M13.983 11.078h2.119a.186.186 0 0 0 .186-.185V9.006a.186.186 0 0 0-.186-.186h-2.119a.185.185 0 0 0-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 0 0 .186-.186V3.574a.186.186 0 0 0-.186-.185h-2.118a.185.185 0 0 0-.185.185v1.888c0 .102.082.185.185.186m0 2.716h2.118a.187.187 0 0 0 .186-.186V6.29a.186.186 0 0 0-.186-.185h-2.118a.185.185 0 0 0-.185.185v1.887c0 .102.082.185.185.186m-2.93 0h2.12a.186.186 0 0 0 .184-.186V6.29a.185.185 0 0 0-.185-.185H8.1a.185.185 0 0 0-.185.185v1.887c0 .102.083.185.185.186m-2.964 0h2.119a.186.186 0 0 0 .185-.186V6.29a.185.185 0 0 0-.185-.185H5.136a.186.186 0 0 0-.186.185v1.887c0 .102.084.185.186.186m5.893 2.715h2.118a.186.186 0 0 0 .186-.185V9.006a.186.186 0 0 0-.186-.186h-2.118a.185.185 0 0 0-.185.185v1.888c0 .102.082.185.185.185m-2.93 0h2.12a.185.185 0 0 0 .184-.185V9.006a.185.185 0 0 0-.184-.186h-2.12a.185.185 0 0 0-.184.185v1.888c0 .102.083.185.185.185m-2.964 0h2.119a.185.185 0 0 0 .185-.185V9.006a.185.185 0 0 0-.185-.186h-2.12a.186.186 0 0 0-.185.186v1.887c0 .102.084.185.186.185m-2.92 0h2.12a.185.185 0 0 0 .184-.185V9.006a.185.185 0 0 0-.184-.186h-2.12a.185.185 0 0 0-.184.185v1.888c0 .102.082.185.185.185M23.763 9.89c-.065-.051-.672-.51-1.954-.51-.338.001-.676.03-1.01.087-.248-1.7-1.653-2.53-1.716-2.566l-.344-.199-.226.327c-.284.438-.49.922-.612 1.43-.23.97-.09 1.882.403 2.661-.595.332-1.55.413-1.744.42H.751a.751.751 0 0 0-.75.748 11.376 11.376 0 0 0 .692 4.062c.545 1.428 1.355 2.48 2.41 3.124 1.18.723 3.1 1.137 5.275 1.137.983.003 1.963-.086 2.93-.266a12.248 12.248 0 0 0 3.823-1.389c.98-.567 1.86-1.288 2.61-2.136 1.252-1.418 1.998-2.997 2.553-4.4h.221c1.372 0 2.215-.549 2.68-1.009.309-.293.55-.65.707-1.046l.098-.288z"/>
        </svg>
      )
    },
    {
      name: 'AWS',
      icon: (
        <svg viewBox="0 0 24 24" fill="#FF9900">
          <path d="M6.763 10.036c0 .296.032.535.088.71.064.176.144.368.256.576.04.063.056.127.056.183 0 .08-.048.16-.152.24l-.503.335a.383.383 0 0 1-.208.072c-.08 0-.16-.04-.239-.112a2.47 2.47 0 0 1-.287-.375 6.18 6.18 0 0 1-.248-.471c-.622.734-1.405 1.101-2.347 1.101-.67 0-1.205-.191-1.596-.574-.391-.384-.59-.894-.59-1.533 0-.678.239-1.23.726-1.644.487-.415 1.133-.623 1.955-.623.272 0 .551.024.846.064.296.04.6.104.918.176v-.583c0-.607-.127-1.03-.375-1.277-.255-.248-.686-.367-1.3-.367-.28 0-.568.031-.863.103-.295.072-.583.16-.862.272a2.287 2.287 0 0 1-.28.104.488.488 0 0 1-.127.023c-.112 0-.168-.08-.168-.247v-.391c0-.128.016-.224.056-.28a.597.597 0 0 1 .224-.167c.279-.144.614-.264 1.005-.36a4.84 4.84 0 0 1 1.246-.151c.95 0 1.644.216 2.091.647.439.43.662 1.085.662 1.963v2.586zm-3.24 1.214c.263 0 .534-.048.822-.144.287-.096.543-.271.758-.51.128-.152.224-.32.272-.512.047-.191.08-.423.08-.694v-.335a6.66 6.66 0 0 0-.735-.136 6.02 6.02 0 0 0-.75-.048c-.535 0-.926.104-1.19.32-.263.215-.39.518-.39.917 0 .375.095.655.295.846.191.2.47.296.838.296zm6.41.862c-.144 0-.24-.024-.304-.08-.064-.048-.12-.16-.168-.311L7.586 5.55a1.398 1.398 0 0 1-.072-.32c0-.128.064-.2.191-.2h.783c.151 0 .255.025.31.08.065.048.113.16.16.312l1.342 5.284 1.245-5.284c.04-.16.088-.264.151-.312a.549.549 0 0 1 .32-.08h.638c.152 0 .256.025.32.08.063.048.12.16.151.312l1.261 5.348 1.381-5.348c.048-.16.104-.264.16-.312a.52.52 0 0 1 .311-.08h.743c.127 0 .2.065.2.2 0 .04-.009.08-.017.128a1.137 1.137 0 0 1-.056.2l-1.923 6.17c-.048.16-.104.263-.168.311a.51.51 0 0 1-.303.08h-.687c-.151 0-.255-.024-.32-.08-.063-.056-.119-.16-.15-.32l-1.238-5.148-1.23 5.14c-.04.16-.087.264-.15.32-.065.056-.177.08-.32.08zm10.256.215c-.415 0-.83-.048-1.229-.143-.399-.096-.71-.2-.918-.32-.128-.071-.216-.151-.24-.223a.535.535 0 0 1-.04-.176v-.406c0-.167.064-.247.183-.247.048 0 .096.008.144.024.048.016.12.048.2.08.271.12.566.215.878.279.319.064.63.096.95.096.502 0 .894-.088 1.165-.264a.86.86 0 0 0 .415-.758.777.777 0 0 0-.215-.559c-.144-.151-.415-.287-.807-.414l-1.157-.36c-.583-.183-1.014-.454-1.277-.813a1.902 1.902 0 0 1-.4-1.158c0-.335.073-.63.216-.886.144-.255.335-.479.575-.654.24-.184.51-.32.83-.415.32-.096.655-.136 1.006-.136.175 0 .359.008.535.032.183.024.35.056.518.088.16.04.312.08.455.127.144.048.256.096.336.144a.69.69 0 0 1 .24.2.43.43 0 0 1 .071.263v.375c0 .168-.064.256-.184.256a.83.83 0 0 1-.303-.096 3.652 3.652 0 0 0-1.532-.311c-.455 0-.815.071-1.062.223-.248.152-.375.383-.375.71 0 .224.08.416.24.567.159.152.454.304.877.44l1.134.358c.574.184.99.44 1.237.767.247.327.367.702.367 1.117 0 .343-.072.655-.207.926-.144.272-.336.511-.583.703-.248.2-.543.343-.886.447-.36.111-.734.167-1.142.167zM21.698 16.207c-2.626 1.94-6.442 2.969-9.722 2.969-4.598 0-8.74-1.7-11.87-4.526-.247-.223-.024-.527.27-.351 3.384 1.963 7.559 3.153 11.877 3.153 2.914 0 6.114-.607 9.06-1.852.439-.2.814.287.385.607zM22.792 14.961c-.336-.43-2.22-.207-3.074-.103-.255.032-.295-.192-.063-.36 1.5-1.053 3.967-.75 4.254-.399.287.36-.08 2.826-1.485 4.007-.215.184-.423.088-.327-.151.32-.79 1.03-2.57.695-2.994z"/>
        </svg>
      )
    },
    {
      name: 'Vercel',
      icon: (
        <svg viewBox="0 0 24 24" fill="#000000">
          <path d="M24 22.525H0l12-21.05 12 21.05z"/>
        </svg>
      )
    },
    {
      name: 'Firebase',
      icon: (
        <svg viewBox="0 0 24 24" fill="#FFCA28">
          <path d="M3.89 15.672L6.255.461A.542.542 0 0 1 7.27.288l2.543 4.771zm16.794 3.692l-2.25-14a.54.54 0 0 0-.919-.295L3.316 19.365l7.856 4.427a1.621 1.621 0 0 0 1.588 0zM14.3 7.147l-1.82-3.482a.542.542 0 0 0-.96 0L3.53 17.984z"/>
        </svg>
      )
    },
    {
      name: 'Git',
      icon: (
        <svg viewBox="0 0 24 24" fill="#F05032">
          <path d="M23.546 10.93L13.067.452c-.604-.603-1.582-.603-2.188 0L8.708 2.627l2.76 2.76c.645-.215 1.379-.07 1.889.441.516.515.658 1.258.438 1.9l2.658 2.66c.645-.223 1.387-.078 1.9.435.721.72.721 1.884 0 2.604-.719.719-1.881.719-2.6 0-.539-.541-.674-1.337-.404-1.996L12.86 8.955v6.525c.176.086.342.203.488.348.713.721.713 1.883 0 2.6-.719.721-1.889.721-2.609 0-.719-.719-.719-1.879 0-2.598.182-.18.387-.316.605-.406V8.835c-.217-.091-.424-.222-.6-.401-.545-.545-.676-1.342-.396-2.009L7.636 3.7.45 10.881c-.6.605-.6 1.584 0 2.189l10.48 10.477c.604.604 1.582.604 2.186 0l10.43-10.43c.605-.603.605-1.582 0-2.187"/>
        </svg>
      )
    },
    {
      name: 'GSAP',
      icon: (
        <svg viewBox="0 0 24 24" fill="#88CE02">
          <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm-.6 6h1.2v4.8h4.8v1.2h-4.8V17h-1.2v-4.8H6.6v-1.2h4.8V6z"/>
        </svg>
      )
    },
    {
      name: 'Three.js',
      icon: (
        <svg viewBox="0 0 24 24" fill="#000000">
          <path d="M.38 0a.268.268 0 0 0-.256.332l2.894 11.716a.268.268 0 0 0 .01.04l2.89 11.708a.268.268 0 0 0 .447.128L23.802 7.15a.268.268 0 0 0-.112-.45l-5.784-1.667L6.38 1.715.533.012A.268.268 0 0 0 .38 0zm1.498 3.076l3.637 1.052 4.322 1.248-5.652 7.604L1.878 3.076zm7.63 2.204l5.635 1.628 4.623 1.334-12.418 8.18 2.16-11.142zM6.873 17.82l5.14-6.918 1.17-.12-1.31 6.735-5 .303z"/>
        </svg>
      )
    },
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

    // Mouse tracking - Interacciones premium ultra responsivas
    const handleMouseMove = (e) => {
      if (!aiFaceRef.current) return;

      const core = aiFaceRef.current;
      const rect = core.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);

      // Calcular intensidad basada en proximidad (más cerca = más intenso)
      const proximity = Math.max(0, 1 - (distance / 600));
      const isClose = distance < 300;

      // ========== IRIS - Efecto magnético premium ==========
      const iris = document.querySelector('.logos-section__ai-iris');
      const pupil = document.querySelector('.logos-section__ai-pupil');
      const pupilCore = document.querySelector('.logos-section__ai-pupil-core');
      const irisGlow = document.querySelector('.logos-section__ai-iris-glow');

      const maxIrisMove = isClose ? 35 : 25;
      const irisX = Math.max(-maxIrisMove, Math.min(maxIrisMove, (deltaX / 250) * maxIrisMove));
      const irisY = Math.max(-maxIrisMove, Math.min(maxIrisMove, (deltaY / 250) * maxIrisMove));

      if (iris) {
        gsap.to(iris, {
          x: irisX,
          y: irisY,
          scale: 1 + (proximity * 0.15),
          duration: 0.15,
          ease: 'power3.out'
        });
      }

      if (pupil) {
        gsap.to(pupil, {
          x: irisX * 0.4,
          y: irisY * 0.4,
          scale: 1 + (proximity * 0.3),
          duration: 0.1,
          ease: 'power2.out'
        });
      }

      if (pupilCore) {
        gsap.to(pupilCore, {
          scale: 1 + (proximity * 0.5),
          opacity: 0.8 + (proximity * 0.2),
          duration: 0.1
        });
      }

      if (irisGlow) {
        gsap.to(irisGlow, {
          scale: 1 + (proximity * 0.4),
          opacity: 0.5 + (proximity * 0.5),
          duration: 0.2
        });
      }

      // ========== ANILLOS - Reacción paralax 3D ==========
      const rings = document.querySelectorAll('.logos-section__ai-ring');
      rings.forEach((ring, i) => {
        const speed = (i + 1) * 0.2;
        const ringRotation = (deltaX / window.innerWidth) * 15 * (i % 2 === 0 ? 1 : -1);
        gsap.to(ring, {
          x: (deltaX / window.innerWidth) * 12 * speed,
          y: (deltaY / window.innerHeight) * 12 * speed,
          rotation: `+=${ringRotation * 0.1}`,
          scale: 1 + (proximity * 0.02 * (i + 1)),
          duration: 0.3 + (i * 0.05),
          ease: 'power2.out'
        });
      });

      // ========== HEXÁGONO - Rotación suave ==========
      const hexagon = document.querySelector('.logos-section__ai-hexagon');
      if (hexagon) {
        gsap.to(hexagon, {
          rotation: angle * 0.1,
          scale: 1 + (proximity * 0.08),
          duration: 0.4,
          ease: 'power2.out'
        });
      }

      // ========== ARCOS - Brillo dinámico ==========
      const arcs = document.querySelectorAll('.logos-section__ai-arc');
      arcs.forEach((arc, i) => {
        gsap.to(arc, {
          strokeOpacity: 0.3 + (proximity * 0.7),
          strokeWidth: 2 + (proximity * 2),
          duration: 0.2
        });
      });

      // ========== CIRCUITOS - Flujo de energía ==========
      const circuits = document.querySelectorAll('.logos-section__ai-circuit');
      circuits.forEach((circuit, i) => {
        const intensity = 0.4 + (proximity * 0.6);
        gsap.to(circuit, {
          stroke: `rgba(251, 191, 36, ${intensity})`,
          strokeWidth: 1.5 + (proximity * 1),
          duration: 0.2,
          delay: i * 0.02
        });
      });

      // ========== NODOS - Parpadeo reactivo ==========
      const nodes = document.querySelectorAll('.logos-section__ai-node');
      nodes.forEach((node, i) => {
        const nodeIntensity = 0.5 + (proximity * 0.5) + (Math.random() * 0.3);
        gsap.to(node, {
          opacity: nodeIntensity,
          scale: 1 + (proximity * 0.5) + (Math.random() * 0.3),
          duration: 0.15,
          ease: 'power1.out'
        });
      });

      // ========== PARTÍCULAS - Parallax dramático ==========
      const particles = document.querySelectorAll('.logos-section__ai-particle');
      particles.forEach((particle, i) => {
        const speed = (i % 5 + 1) * 1.2;
        const randomOffset = (Math.random() - 0.5) * 10;
        gsap.to(particle, {
          x: (deltaX / window.innerWidth) * 60 * speed + randomOffset,
          y: (deltaY / window.innerHeight) * 60 * speed + randomOffset,
          scale: 1 + (proximity * 0.5),
          opacity: 0.4 + (proximity * 0.6),
          duration: 0.2 + (i * 0.01),
          ease: 'power1.out'
        });
      });

      // ========== ESPECTRO - Visualización dinámica ==========
      const bars = document.querySelectorAll('.logos-section__ai-bar');
      bars.forEach((bar, i) => {
        const barHeight = (0.3 + (proximity * 0.7)) * (0.5 + Math.random() * 0.8);
        const distanceFromCenter = Math.abs(i - bars.length / 2) / (bars.length / 2);
        gsap.to(bar, {
          scaleY: barHeight * (1.2 - distanceFromCenter * 0.5),
          opacity: 0.6 + (proximity * 0.4),
          duration: 0.08,
          ease: 'power1.out'
        });
      });

      // ========== SCANNER - Apunta al cursor ==========
      const scanners = document.querySelectorAll('.logos-section__ai-scanner');
      scanners.forEach((scanner, i) => {
        const scannerAngle = i === 0 ? angle : angle + 90;
        gsap.to(scanner, {
          rotation: scannerAngle,
          opacity: 0.5 + (proximity * 0.5),
          scaleX: 1 + (proximity * 0.3),
          duration: 0.2,
          ease: 'power2.out'
        });
      });

      // ========== ONDAS DE PULSO - Intensidad ==========
      const pulses = document.querySelectorAll('.logos-section__ai-pulse');
      pulses.forEach((pulse, i) => {
        gsap.to(pulse, {
          scale: 1 + (proximity * 0.1),
          opacity: 0.3 + (proximity * 0.3),
          duration: 0.3
        });
      });

      // ========== LÍNEAS DE ENERGÍA ==========
      const energyLines = document.querySelectorAll('.logos-section__ai-energy');
      energyLines.forEach((line, i) => {
        const lineAngle = (i * 90) + (angle * 0.2);
        gsap.to(line, {
          rotation: lineAngle,
          opacity: 0.3 + (proximity * 0.7),
          scaleX: 1 + (proximity * 0.5),
          duration: 0.3
        });
      });

      // ========== AURAS - Efecto de respiración ==========
      const auras = document.querySelectorAll('.logos-section__ai-aura');
      auras.forEach((aura, i) => {
        gsap.to(aura, {
          opacity: 0.4 + (proximity * 0.6),
          scale: 1 + (proximity * 0.2),
          duration: 0.4
        });
      });

      // ========== DATOS TÉCNICOS - Visibilidad ==========
      const dataItems = document.querySelectorAll('.logos-section__ai-data-item');
      dataItems.forEach((item, i) => {
        gsap.to(item, {
          opacity: 0.3 + (proximity * 0.7),
          x: (deltaX / window.innerWidth) * 5,
          duration: 0.3,
          delay: i * 0.05
        });
      });

      // ========== LÍNEAS EXTENDIDAS - Reactividad ==========
      const extendedLines = document.querySelectorAll('.logos-section__extended-line');
      const extendedNodes = document.querySelectorAll('.logos-section__extended-node');

      extendedLines.forEach((line, i) => {
        gsap.to(line, {
          strokeOpacity: 0.3 + (proximity * 0.5),
          strokeWidth: 1.5 + (proximity * 1),
          duration: 0.4,
          delay: i * 0.05
        });
      });

      extendedNodes.forEach((node, i) => {
        gsap.to(node, {
          opacity: 0.4 + (proximity * 0.6),
          scale: 1 + (proximity * 0.4),
          duration: 0.3,
          delay: i * 0.03
        });
      });

      // ========== EL CORE ENTERO - Rotación 3D sutil ==========
      gsap.to(core, {
        rotateX: (deltaY / window.innerHeight) * -5,
        rotateY: (deltaX / window.innerWidth) * 5,
        duration: 0.4,
        ease: 'power2.out'
      });

      // ========== EFECTO GLITCH CUANDO ESTÁ MUY CERCA ==========
      if (isClose && Math.random() > 0.95) {
        // Glitch aleatorio en los circuitos
        circuits.forEach((circuit, i) => {
          if (Math.random() > 0.7) {
            gsap.to(circuit, {
              opacity: Math.random(),
              strokeWidth: 1 + Math.random() * 3,
              duration: 0.05,
              onComplete: () => {
                gsap.to(circuit, {
                  opacity: 0.4 + (proximity * 0.6),
                  strokeWidth: 1.5 + (proximity * 1),
                  duration: 0.1
                });
              }
            });
          }
        });

        // Glitch en los anillos
        rings.forEach((ring, i) => {
          if (Math.random() > 0.8) {
            gsap.to(ring, {
              scale: 0.95 + Math.random() * 0.1,
              opacity: 0.5 + Math.random() * 0.5,
              duration: 0.03,
              onComplete: () => {
                gsap.to(ring, {
                  scale: 1 + (proximity * 0.02 * (i + 1)),
                  opacity: 1,
                  duration: 0.1
                });
              }
            });
          }
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    // ========== EFECTO CLICK - Explosión de energía ==========
    const handleClick = (e) => {
      if (!aiFaceRef.current) return;

      const core = aiFaceRef.current;
      const rect = core.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const distance = Math.sqrt(Math.pow(e.clientX - centerX, 2) + Math.pow(e.clientY - centerY, 2));

      // Solo si se hace clic cerca del núcleo
      if (distance < 300) {
        // Get current color from the theme
        const currentColor = waveColors[colorIndexRef.current];

        // Pulso de expansión del iris
        const iris = document.querySelector('.logos-section__ai-iris');
        const pulses = document.querySelectorAll('.logos-section__ai-pulse');
        const rings = document.querySelectorAll('.logos-section__ai-ring');
        const particles = document.querySelectorAll('.logos-section__ai-particle');
        const bars = document.querySelectorAll('.logos-section__ai-bar');

        // Flash del iris - use current theme colors
        if (iris) {
          gsap.timeline()
            .to(iris, { scale: 1.8, boxShadow: `0 0 100px ${currentColor.secondary}, 0 0 200px ${currentColor.glow}`, duration: 0.15, ease: 'power2.out' })
            .to(iris, { scale: 1, boxShadow: `0 0 40px ${currentColor.glow}, 0 0 80px ${currentColor.glow}`, duration: 0.5, ease: 'elastic.out(1, 0.5)' });
        }

        // Ondas de pulso sincronizadas - use current theme colors
        pulses.forEach((pulse, i) => {
          gsap.timeline()
            .to(pulse, { scale: 2.5, opacity: 0.8, borderColor: `${currentColor.secondary}e6`, duration: 0.3, delay: i * 0.1, ease: 'power2.out' })
            .to(pulse, { scale: 1, opacity: 0.3, borderColor: `${currentColor.primary}4d`, duration: 0.6, ease: 'power2.inOut' });
        });

        // Anillos - expansión rápida - use current theme colors
        rings.forEach((ring, i) => {
          gsap.timeline()
            .to(ring, { scale: 1.3 - (i * 0.03), opacity: 1, borderColor: `${currentColor.secondary}e6`, duration: 0.2, delay: i * 0.03 })
            .to(ring, { scale: 1, opacity: 0.8, borderColor: `${currentColor.primary}80`, duration: 0.5, ease: 'elastic.out(1, 0.5)' });
        });

        // Partículas - disparo radial
        particles.forEach((particle, i) => {
          const angle = (i / particles.length) * Math.PI * 2;
          const explosionDistance = 80 + Math.random() * 40;
          gsap.timeline()
            .to(particle, {
              x: Math.cos(angle) * explosionDistance,
              y: Math.sin(angle) * explosionDistance,
              scale: 2,
              opacity: 1,
              duration: 0.3,
              ease: 'power2.out'
            })
            .to(particle, {
              x: 0,
              y: 0,
              scale: 1,
              opacity: 0.5,
              duration: 0.8,
              ease: 'elastic.out(1, 0.5)'
            });
        });

        // Espectro - pico de actividad
        bars.forEach((bar, i) => {
          gsap.timeline()
            .to(bar, { scaleY: 2, opacity: 1, duration: 0.1, delay: i * 0.02 })
            .to(bar, { scaleY: 0.5, opacity: 0.7, duration: 0.4, ease: 'power2.inOut' });
        });

        // Flash del core entero
        gsap.timeline()
          .to(core, { filter: 'brightness(1.5) saturate(1.3)', duration: 0.1 })
          .to(core, { filter: 'brightness(1) saturate(1)', duration: 0.4 });
      }
    };

    window.addEventListener('click', handleClick);

    return () => {
      ctx.revert();
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <section ref={sectionRef} className="logos-section">
      {/* Headline - Conectado con el concepto de IA */}
      <div className="logos-section__headline">
        <span className="logos-section__headline-badge">
          <span className="logos-section__headline-badge-dot"></span>
          {t('logos.badge')}
        </span>
        <h2 className="logos-section__headline-title">
          {t('logos.title1')}<br/>
          <span className="logos-section__headline-accent">{t('logos.title2')}</span>
        </h2>
        <p className="logos-section__headline-subtitle">
          {t('logos.subtitle')}
        </p>
      </div>

      {/* Tech grid - Stack tecnológico con carrusel infinito */}
      <div className="logos-section__container">
        <p className="logos-section__tech-label">{t('logos.techLabel')}</p>
        <div className="logos-section__carousel">
          <div className="logos-section__carousel-track">
            {/* Duplicamos los items para crear el efecto infinito */}
            {[...technologies, ...technologies].map((tech, i) => (
              <div key={i} className="logos-section__item">
                <div className="logos-section__icon">{tech.icon}</div>
                <span className="logos-section__name">{tech.name}</span>
              </div>
            ))}
          </div>
        </div>
        <p className="logos-section__tech-plus">{t('logos.aiIntegrated')}</p>
      </div>

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
                <span>{t('logos.inbox')}</span>
                <span className="logos-section__nav-badge">3</span>
              </div>
              <div className="logos-section__nav-item">
                {icons.projects}
                <span>{t('logos.projects')}</span>
              </div>
              <div className="logos-section__nav-item">
                {icons.team}
                <span>{t('logos.team')}</span>
              </div>
              <div className="logos-section__nav-item">
                {icons.settings}
                <span>{t('logos.settings')}</span>
              </div>
            </div>

            <div className="logos-section__nav-section">
              <span className="logos-section__nav-label">{t('logos.favorites')}</span>
              <div className="logos-section__nav-item">
                <span className="logos-section__dot logos-section__dot--purple"></span>
                <span>{t('logos.ecommerceApp')}</span>
              </div>
              <div className="logos-section__nav-item">
                <span className="logos-section__dot logos-section__dot--blue"></span>
                <span>{t('logos.landingPage')}</span>
              </div>
              <div className="logos-section__nav-item">
                <span className="logos-section__dot logos-section__dot--green"></span>
                <span>{t('logos.dashboardUI')}</span>
              </div>
            </div>

            <div className="logos-section__nav-section">
              <span className="logos-section__nav-label">{t('logos.recent')}</span>
              <div className="logos-section__nav-item">
                <span className="logos-section__dot logos-section__dot--blue"></span>
                <span>{t('logos.mobileApp')}</span>
              </div>
              <div className="logos-section__nav-item">
                <span className="logos-section__dot logos-section__dot--purple"></span>
                <span>{t('logos.apiBackend')}</span>
              </div>
            </div>
          </div>

          {/* Panel 2: Lista de proyectos/inbox */}
          <div className="logos-section__panel logos-section__panel--list">
            <div className="logos-section__list-header">
              <span className="logos-section__list-title">{t('logos.inbox')}</span>
              <span className="logos-section__list-count">12 {t('logos.tasks')}</span>
            </div>

            <div className="logos-section__task logos-section__task--active">
              <div className="logos-section__task-priority logos-section__task-priority--high"></div>
              <div className="logos-section__task-content">
                <span className="logos-section__task-id">PRJ-142</span>
                <span className="logos-section__task-title">{t('logos.designLanding')}</span>
                <div className="logos-section__task-meta">
                  <span className="logos-section__task-tag logos-section__task-tag--design">{t('logos.design')}</span>
                  <span className="logos-section__task-date">{icons.clock} {t('logos.today')}</span>
                </div>
              </div>
            </div>

            <div className="logos-section__task">
              <div className="logos-section__task-priority logos-section__task-priority--medium"></div>
              <div className="logos-section__task-content">
                <span className="logos-section__task-id">PRJ-141</span>
                <span className="logos-section__task-title">{t('logos.implementCheckout')}</span>
                <div className="logos-section__task-meta">
                  <span className="logos-section__task-tag logos-section__task-tag--dev">{t('logos.development')}</span>
                  <span className="logos-section__task-date">{icons.clock} {t('logos.tomorrow')}</span>
                </div>
              </div>
            </div>

            <div className="logos-section__task">
              <div className="logos-section__task-priority logos-section__task-priority--low"></div>
              <div className="logos-section__task-content">
                <span className="logos-section__task-id">PRJ-140</span>
                <span className="logos-section__task-title">{t('logos.optimizeImages')}</span>
                <div className="logos-section__task-meta">
                  <span className="logos-section__task-tag logos-section__task-tag--ops">Ops</span>
                  <span className="logos-section__task-date">{icons.clock} {t('logos.thisWeek')}</span>
                </div>
              </div>
            </div>

            <div className="logos-section__task">
              <div className="logos-section__task-priority logos-section__task-priority--medium"></div>
              <div className="logos-section__task-content">
                <span className="logos-section__task-id">PRJ-139</span>
                <span className="logos-section__task-title">{t('logos.createComponents')}</span>
                <div className="logos-section__task-meta">
                  <span className="logos-section__task-tag logos-section__task-tag--design">{t('logos.design')}</span>
                </div>
              </div>
            </div>

            <div className="logos-section__task">
              <div className="logos-section__task-priority logos-section__task-priority--high"></div>
              <div className="logos-section__task-content">
                <span className="logos-section__task-id">PRJ-138</span>
                <span className="logos-section__task-title">{t('logos.integratePayments')}</span>
                <div className="logos-section__task-meta">
                  <span className="logos-section__task-tag logos-section__task-tag--dev">{t('logos.backend')}</span>
                  <span className="logos-section__task-date">{icons.clock} {t('logos.nextWeek')}</span>
                </div>
              </div>
            </div>

            <div className="logos-section__task">
              <div className="logos-section__task-priority logos-section__task-priority--low"></div>
              <div className="logos-section__task-content">
                <span className="logos-section__task-id">PRJ-137</span>
                <span className="logos-section__task-title">{t('logos.documentComponents')}</span>
                <div className="logos-section__task-meta">
                  <span className="logos-section__task-tag logos-section__task-tag--ops">{t('logos.docs')}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Panel 3: Detalle del proyecto */}
          <div className="logos-section__panel logos-section__panel--detail">
            <div className="logos-section__detail-header">
              <div className="logos-section__detail-breadcrumb">
                <span>{t('logos.ecommerceApp')}</span>
                <span className="logos-section__detail-sep">›</span>
                <span>PRJ-142</span>
              </div>
            </div>

            <h2 className="logos-section__detail-title">{t('logos.designLanding')}</h2>

            <div className="logos-section__detail-props">
              <div className="logos-section__detail-prop">
                <span className="logos-section__detail-label">{t('logos.status')}</span>
                <span className="logos-section__detail-status">
                  <span className="logos-section__status-dot logos-section__status-dot--progress"></span>
                  {t('logos.inProgress')}
                </span>
              </div>
              <div className="logos-section__detail-prop">
                <span className="logos-section__detail-label">{t('logos.priority')}</span>
                <span className="logos-section__detail-priority">
                  {icons.star}
                  {t('logos.high')}
                </span>
              </div>
              <div className="logos-section__detail-prop">
                <span className="logos-section__detail-label">{t('logos.assigned')}</span>
                <div className="logos-section__avatars">
                  <div className="logos-section__avatar">JC</div>
                  <div className="logos-section__avatar">MR</div>
                </div>
              </div>
            </div>

            <div className="logos-section__detail-desc">
              <p>{t('logos.taskDescription')}</p>
            </div>

            <div className="logos-section__detail-attachments">
              <span className="logos-section__detail-label">{t('logos.files')}</span>
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
              <span className="logos-section__detail-label">{t('logos.activity')}</span>
              <div className="logos-section__activity-item">
                <div className="logos-section__avatar logos-section__avatar--sm">JC</div>
                <span>Juan {t('logos.updatedStatus')} <strong>{t('logos.inProgress')}</strong></span>
                <span className="logos-section__activity-time">{t('logos.hoursAgo')} 2h</span>
              </div>
              <div className="logos-section__activity-item">
                <div className="logos-section__avatar logos-section__avatar--sm">MR</div>
                <span>María {t('logos.addedFile')} <strong>landing-v2.fig</strong></span>
                <span className="logos-section__activity-time">{t('logos.hoursAgo')} 5h</span>
              </div>
              <div className="logos-section__activity-item">
                <div className="logos-section__avatar logos-section__avatar--sm">JC</div>
                <span>Juan {t('logos.createdTask')}</span>
                <span className="logos-section__activity-time">{t('logos.yesterday')}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Líneas de circuito extendidas hacia el infinito derecho */}
        <svg className="logos-section__extended-circuits" viewBox="0 0 800 400" preserveAspectRatio="xMinYMid slice">
          {/* Líneas que van desde el centro hacia la derecha */}
          <path className="logos-section__extended-line logos-section__extended-line--1" d="M0 200 L100 200 L100 120 L250 120 L250 80 L800 80" />
          <path className="logos-section__extended-line logos-section__extended-line--2" d="M0 200 L80 200 L80 280 L220 280 L220 320 L800 320" />
          <path className="logos-section__extended-line logos-section__extended-line--3" d="M0 185 L60 185 L60 60 L180 60 L180 40 L800 40" />
          <path className="logos-section__extended-line logos-section__extended-line--4" d="M0 215 L70 215 L70 340 L200 340 L200 360 L800 360" />
          <path className="logos-section__extended-line logos-section__extended-line--5" d="M0 170 L120 170 L120 150 L300 150 L300 120 L800 120" />
          <path className="logos-section__extended-line logos-section__extended-line--6" d="M0 230 L110 230 L110 250 L280 250 L280 280 L800 280" />

          {/* Nodos en las intersecciones */}
          <circle className="logos-section__extended-node" cx="100" cy="120" r="4" />
          <circle className="logos-section__extended-node" cx="250" cy="80" r="5" />
          <circle className="logos-section__extended-node" cx="220" cy="320" r="4" />
          <circle className="logos-section__extended-node" cx="180" cy="40" r="3" />
          <circle className="logos-section__extended-node" cx="200" cy="360" r="4" />
          <circle className="logos-section__extended-node" cx="300" cy="120" r="3" />
          <circle className="logos-section__extended-node" cx="280" cy="280" r="4" />
          <circle className="logos-section__extended-node" cx="500" cy="80" r="3" />
          <circle className="logos-section__extended-node" cx="600" cy="320" r="3" />
          <circle className="logos-section__extended-node" cx="700" cy="40" r="4" />
          <circle className="logos-section__extended-node" cx="450" cy="360" r="3" />
          <circle className="logos-section__extended-node" cx="550" cy="120" r="4" />
          <circle className="logos-section__extended-node" cx="650" cy="280" r="3" />
        </svg>

        {/* LUMEN AI - Núcleo de Inteligencia Premium */}
        <div
          className={`logos-section__ai-container ${isWaving ? 'is-waving' : ''}`}
          onClick={handleAIClick}
          style={{
            '--ai-primary': currentColor.primary,
            '--ai-secondary': currentColor.secondary,
            '--ai-glow': currentColor.glow,
            cursor: 'pointer'
          }}
        >

          {/* Aura de fondo */}
          <div className="logos-section__ai-aura"></div>
          <div className="logos-section__ai-aura logos-section__ai-aura--secondary"></div>

          <div ref={aiFaceRef} className="logos-section__ai-core">
            {/* Ondas de pulso que emanan del centro */}
            <div className="logos-section__ai-pulse logos-section__ai-pulse--1"></div>
            <div className="logos-section__ai-pulse logos-section__ai-pulse--2"></div>
            <div className="logos-section__ai-pulse logos-section__ai-pulse--3"></div>

            {/* Líneas de circuito/datos - izquierda */}
            <svg className="logos-section__ai-circuits logos-section__ai-circuits--left" viewBox="0 0 180 250">
              <path className="logos-section__ai-circuit" d="M180 125 L120 125 L120 75 L70 75 L70 50 L20 50" />
              <path className="logos-section__ai-circuit" d="M180 125 L130 125 L130 175 L80 175 L80 200 L30 200" />
              <path className="logos-section__ai-circuit" d="M180 110 L100 110 L100 35 L45 35" />
              <path className="logos-section__ai-circuit" d="M180 140 L110 140 L110 215 L55 215" />
              <path className="logos-section__ai-circuit" d="M180 95 L140 95 L140 20 L60 20" />
              <path className="logos-section__ai-circuit" d="M180 155 L145 155 L145 230 L65 230" />
              <circle className="logos-section__ai-node" cx="20" cy="50" r="5" />
              <circle className="logos-section__ai-node" cx="30" cy="200" r="4" />
              <circle className="logos-section__ai-node" cx="45" cy="35" r="4" />
              <circle className="logos-section__ai-node" cx="55" cy="215" r="5" />
              <circle className="logos-section__ai-node" cx="60" cy="20" r="3" />
              <circle className="logos-section__ai-node" cx="65" cy="230" r="3" />
              <circle className="logos-section__ai-node" cx="70" cy="75" r="3" />
              <circle className="logos-section__ai-node" cx="80" cy="175" r="3" />
            </svg>

            {/* Líneas de circuito/datos - derecha */}
            <svg className="logos-section__ai-circuits logos-section__ai-circuits--right" viewBox="0 0 180 250">
              <path className="logos-section__ai-circuit" d="M0 125 L60 125 L60 75 L110 75 L110 50 L160 50" />
              <path className="logos-section__ai-circuit" d="M0 125 L50 125 L50 175 L100 175 L100 200 L150 200" />
              <path className="logos-section__ai-circuit" d="M0 110 L80 110 L80 35 L135 35" />
              <path className="logos-section__ai-circuit" d="M0 140 L70 140 L70 215 L125 215" />
              <path className="logos-section__ai-circuit" d="M0 95 L40 95 L40 20 L120 20" />
              <path className="logos-section__ai-circuit" d="M0 155 L35 155 L35 230 L115 230" />
              <circle className="logos-section__ai-node" cx="160" cy="50" r="5" />
              <circle className="logos-section__ai-node" cx="150" cy="200" r="4" />
              <circle className="logos-section__ai-node" cx="135" cy="35" r="4" />
              <circle className="logos-section__ai-node" cx="125" cy="215" r="5" />
              <circle className="logos-section__ai-node" cx="120" cy="20" r="3" />
              <circle className="logos-section__ai-node" cx="115" cy="230" r="3" />
              <circle className="logos-section__ai-node" cx="110" cy="75" r="3" />
              <circle className="logos-section__ai-node" cx="100" cy="175" r="3" />
            </svg>

            {/* Anillos concéntricos del ojo/núcleo */}
            <div className="logos-section__ai-eye">
              {/* Anillo exterior con segmentos */}
              <div className="logos-section__ai-ring logos-section__ai-ring--outer"></div>
              <div className="logos-section__ai-ring logos-section__ai-ring--1"></div>
              <div className="logos-section__ai-ring logos-section__ai-ring--2"></div>
              <div className="logos-section__ai-ring logos-section__ai-ring--3"></div>
              <div className="logos-section__ai-ring logos-section__ai-ring--4"></div>
              <div className="logos-section__ai-ring logos-section__ai-ring--inner"></div>

              {/* Hexágono decorativo */}
              <svg className="logos-section__ai-hexagon" viewBox="0 0 100 100">
                <polygon className="logos-section__ai-hex-shape" points="50,5 95,27.5 95,72.5 50,95 5,72.5 5,27.5" />
              </svg>

              {/* Iris/pupila central que sigue el mouse */}
              <div className="logos-section__ai-iris">
                <div className="logos-section__ai-iris-glow"></div>
                <div className="logos-section__ai-pupil"></div>
                <div className="logos-section__ai-pupil-core"></div>
              </div>

              {/* Líneas de escaneo rotativas */}
              <div className="logos-section__ai-scanner"></div>
              <div className="logos-section__ai-scanner logos-section__ai-scanner--2"></div>

              {/* Arcos decorativos */}
              <svg className="logos-section__ai-arcs" viewBox="0 0 200 200">
                <path className="logos-section__ai-arc logos-section__ai-arc--1" d="M100 10 A90 90 0 0 1 190 100" />
                <path className="logos-section__ai-arc logos-section__ai-arc--2" d="M190 100 A90 90 0 0 1 100 190" />
                <path className="logos-section__ai-arc logos-section__ai-arc--3" d="M100 190 A90 90 0 0 1 10 100" />
                <path className="logos-section__ai-arc logos-section__ai-arc--4" d="M10 100 A90 90 0 0 1 100 10" />
              </svg>
            </div>

            {/* Espectro de audio mejorado */}
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
              <div className="logos-section__ai-bar"></div>
              <div className="logos-section__ai-bar"></div>
              <div className="logos-section__ai-bar"></div>
              <div className="logos-section__ai-bar"></div>
            </div>

            {/* Partículas de datos - más cantidad */}
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
              <div className="logos-section__ai-particle"></div>
              <div className="logos-section__ai-particle"></div>
              <div className="logos-section__ai-particle"></div>
              <div className="logos-section__ai-particle"></div>
              <div className="logos-section__ai-particle"></div>
            </div>

            {/* Líneas de energía que conectan */}
            <div className="logos-section__ai-energy-lines">
              <div className="logos-section__ai-energy logos-section__ai-energy--1"></div>
              <div className="logos-section__ai-energy logos-section__ai-energy--2"></div>
              <div className="logos-section__ai-energy logos-section__ai-energy--3"></div>
              <div className="logos-section__ai-energy logos-section__ai-energy--4"></div>
            </div>

            {/* Nombre y branding */}
            <div className="logos-section__ai-brand">
              <span className="logos-section__ai-name">LUMEN</span>
              <span className="logos-section__ai-tagline">{t('logos.lumenTagline')}</span>
            </div>

            {/* Indicador de estado */}
            <div className="logos-section__ai-status">
              <span className="logos-section__ai-status-dot"></span>
              <span className="logos-section__ai-status-text">{t('logos.lumenStatus')}</span>
            </div>

            {/* Preguntas/mensajes que van apareciendo */}
            <div className="logos-section__ai-questions">
              <div className="logos-section__ai-question logos-section__ai-question--1">{t('logos.lumenMsg1')}</div>
              <div className="logos-section__ai-question logos-section__ai-question--2">{t('logos.lumenMsg2')}</div>
              <div className="logos-section__ai-question logos-section__ai-question--3">{t('logos.lumenMsg3')}</div>
              <div className="logos-section__ai-question logos-section__ai-question--4">{t('logos.lumenMsg4')}</div>
              <div className="logos-section__ai-question logos-section__ai-question--5">{t('logos.lumenMsg5')}</div>
            </div>

            {/* Datos técnicos flotantes */}
            <div className="logos-section__ai-data logos-section__ai-data--left">
              <span className="logos-section__ai-data-item">design_engine: active</span>
              <span className="logos-section__ai-data-item">optimization: 98.7%</span>
              <span className="logos-section__ai-data-item">creativity: max</span>
            </div>
            <div className="logos-section__ai-data logos-section__ai-data--right">
              <span className="logos-section__ai-data-item">model: lumen-v3</span>
              <span className="logos-section__ai-data-item">status: optimal</span>
              <span className="logos-section__ai-data-item">ready_to_create</span>
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
    </section>
  );
};

export default LogosSection;
