import { useState, useEffect } from 'react';

/**
 * Hook para rastrear el progreso del scroll
 */
const useScrollProgress = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollDirection, setScrollDirection] = useState('down');

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const updateScroll = () => {
      const currentScrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // Progreso total (0 a 1)
      const progress = currentScrollY / (documentHeight - windowHeight);

      // Dirección
      const direction = currentScrollY > lastScrollY ? 'down' : 'up';

      setScrollY(currentScrollY);
      setScrollProgress(Math.min(1, Math.max(0, progress)));
      setIsScrolled(currentScrollY > 50);
      setScrollDirection(direction);

      lastScrollY = currentScrollY;
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateScroll);
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    updateScroll(); // Valor inicial

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return { scrollProgress, scrollY, isScrolled, scrollDirection };
};

export default useScrollProgress;
