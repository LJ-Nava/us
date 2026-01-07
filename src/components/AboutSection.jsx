import { useEffect, useRef, useCallback, useMemo } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useI18n } from '../contexts/I18nContext';

gsap.registerPlugin(ScrollTrigger);

/**
 * AboutSection - Premium Team Section
 * With magnetic effects, 3D reveals, and sophisticated animations
 */
const AboutSection = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);
  const techItemsRef = useRef([]);
  const { t, language } = useI18n();

  // Magnetic hover effect for tech items
  const handleMagneticMove = useCallback((e, element) => {
    const rect = element.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to(element, {
      x: x * 0.3,
      y: y * 0.3,
      rotateX: -y * 0.1,
      rotateY: x * 0.1,
      duration: 0.4,
      ease: 'power2.out',
    });
  }, []);

  const handleMagneticLeave = useCallback((element) => {
    gsap.to(element, {
      x: 0,
      y: 0,
      rotateX: 0,
      rotateY: 0,
      duration: 0.7,
      ease: 'elastic.out(1, 0.3)',
    });
  }, []);

  // 3D tilt effect for cards
  const handleCardMove = useCallback((e, element) => {
    const rect = element.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    gsap.to(element, {
      rotateX: -y * 10,
      rotateY: x * 10,
      transformPerspective: 1000,
      duration: 0.4,
      ease: 'power2.out',
    });

    // Move highlight
    const highlight = element.querySelector('.about-card__highlight');
    if (highlight) {
      gsap.to(highlight, {
        x: x * 100,
        y: y * 100,
        duration: 0.4,
      });
    }
  }, []);

  const handleCardLeave = useCallback((element) => {
    gsap.to(element, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.7,
      ease: 'elastic.out(1, 0.5)',
    });
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section header reveal
      const headerTl = gsap.timeline({
        scrollTrigger: {
          trigger: '.about-section__header',
          start: 'top 85%',
          once: true,
        }
      });

      headerTl
        .fromTo('.about-section__label',
          { x: -30, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.6 }
        )
        .fromTo('.about-section__title',
          { y: 40, opacity: 0, clipPath: 'inset(100% 0% 0% 0%)' },
          { y: 0, opacity: 1, clipPath: 'inset(0% 0% 0% 0%)', duration: 0.8, ease: 'power4.out' },
          '-=0.3'
        );

      // 3D Cards reveal with stagger
      gsap.fromTo('.about-card',
        {
          opacity: 0,
          y: 80,
          rotateX: -30,
          transformOrigin: '50% 100%',
          transformPerspective: 1000
        },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 1,
          stagger: 0.15,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: '.about-grid',
            start: 'top 80%',
            once: true,
          },
        }
      );

      // Card number counter animation
      const cardNumbers = document.querySelectorAll('.about-card__number');
      cardNumbers.forEach((num, i) => {
        gsap.fromTo(num,
          { scale: 0, rotation: -180 },
          {
            scale: 1,
            rotation: 0,
            duration: 0.8,
            delay: 0.3 + (i * 0.15),
            ease: 'back.out(1.7)',
            scrollTrigger: {
              trigger: '.about-grid',
              start: 'top 80%',
              once: true,
            },
          }
        );
      });

      // Tech section header
      gsap.fromTo('.tech-section__header',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          scrollTrigger: {
            trigger: '.tech-section',
            start: 'top 85%',
            once: true,
          },
        }
      );

      // Tech items with wave effect
      gsap.fromTo('.tech-item',
        {
          opacity: 0,
          scale: 0,
          rotation: -45
        },
        {
          opacity: 1,
          scale: 1,
          rotation: 0,
          duration: 0.6,
          stagger: {
            each: 0.08,
            from: 'start',
            grid: 'auto',
            ease: 'power2.inOut'
          },
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: '.tech-grid',
            start: 'top 85%',
            once: true,
          },
        }
      );

      // Philosophy section reveal
      const philoTl = gsap.timeline({
        scrollTrigger: {
          trigger: '.philosophy',
          start: 'top 80%',
          once: true,
        }
      });

      philoTl
        .fromTo('.philosophy',
          {
            opacity: 0,
            clipPath: 'inset(0% 50% 0% 50%)'
          },
          {
            opacity: 1,
            clipPath: 'inset(0% 0% 0% 0%)',
            duration: 1,
            ease: 'power4.inOut'
          }
        )
        .fromTo('.philosophy__quote',
          { scale: 0, rotation: -180, opacity: 0 },
          { scale: 1, rotation: 0, opacity: 0.5, duration: 0.8, ease: 'back.out(1.7)' },
          '-=0.5'
        )
        .fromTo('.philosophy blockquote',
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          '-=0.4'
        )
        .fromTo('.philosophy__author',
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6 },
          '-=0.3'
        );

      // Continuous subtle floating animation for philosophy quote
      gsap.to('.philosophy__quote', {
        y: -10,
        duration: 3,
        ease: 'power1.inOut',
        yoyo: true,
        repeat: -1,
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const expertise = useMemo(() => [
    {
      title: t('about.frontendTitle'),
      description: t('about.frontendDesc'),
      skills: ['React', 'Next.js', 'TypeScript', 'Tailwind'],
    },
    {
      title: t('about.backendTitle'),
      description: t('about.backendDesc'),
      skills: ['Node.js', 'Python', 'PostgreSQL', 'AWS'],
    },
    {
      title: t('about.designTitle'),
      description: t('about.designDesc'),
      skills: ['Figma', 'Prototyping', 'Design Systems', 'User Research'],
    },
  ], [t, language]);

  const techStack = [
    { name: 'React', color: '#61DAFB',
      icon: <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="2.5" fill="currentColor"/><ellipse cx="12" cy="12" rx="10" ry="4" fill="none" stroke="currentColor" strokeWidth="1"/><ellipse cx="12" cy="12" rx="10" ry="4" fill="none" stroke="currentColor" strokeWidth="1" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="10" ry="4" fill="none" stroke="currentColor" strokeWidth="1" transform="rotate(120 12 12)"/></svg>
    },
    { name: 'Next.js', color: '#000000',
      icon: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V17.89c-.498.12-1.004.18-1.513.18-1.295 0-2.054-.672-2.527-1.493-.29-.502-.575-1.14-1.226-1.14-.274 0-.396.173-.396.346 0 .157.078.307.196.416.361.336.724.673 1.203 1.062.722.586 1.53.89 2.424.89.48 0 .955-.078 1.399-.234v2.111C17.343 20.128 22 15.991 22 12c0-5.523-4.477-10-10-10zm5.258 14.877L9.608 6.61h2.108l6.038 8.81v1.457h-2.496z"/></svg>
    },
    { name: 'TypeScript', color: '#3178C6',
      icon: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 3h18v18H3V3zm10.71 13.86v-2.34c.59.45 1.27.68 2.04.68.61 0 1.09-.13 1.43-.38.34-.26.51-.64.51-1.13 0-.31-.08-.57-.23-.78-.15-.21-.35-.39-.59-.54-.24-.15-.51-.28-.81-.4-.3-.11-.59-.24-.88-.37-.45-.21-.84-.43-1.17-.68-.33-.25-.6-.53-.81-.84-.21-.31-.37-.66-.47-1.03-.1-.38-.15-.8-.15-1.26 0-.56.1-1.06.31-1.52.21-.45.5-.84.86-1.16.36-.32.79-.57 1.28-.74.49-.17 1.03-.26 1.6-.26.59 0 1.11.08 1.56.24.45.16.86.36 1.22.6v2.25c-.46-.37-.91-.64-1.36-.82-.44-.18-.92-.27-1.42-.27-.31 0-.57.04-.79.12-.22.08-.4.18-.54.31-.14.13-.24.28-.31.46-.07.17-.1.36-.1.55 0 .29.06.54.19.75.13.21.3.39.52.54.22.15.47.29.75.42.28.12.58.25.89.38.47.21.88.43 1.24.67.36.24.67.51.92.81.25.3.44.64.57 1.01.13.37.19.79.19 1.27 0 .58-.1 1.1-.31 1.57-.21.47-.5.87-.87 1.21-.37.33-.81.59-1.32.77-.51.18-1.07.27-1.68.27-.67 0-1.27-.1-1.79-.29-.52-.19-.98-.43-1.38-.72zM14 11h-2v9h-2v-9H8V9h6v2z"/></svg>
    },
    { name: 'Node.js', color: '#339933',
      icon: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 1.85c-.27 0-.55.07-.78.2l-7.44 4.3c-.48.28-.78.8-.78 1.36v8.58c0 .56.3 1.08.78 1.36l1.95 1.12c.95.46 1.27.46 1.71.46 1.4 0 2.21-.85 2.21-2.33V8.44c0-.12-.1-.22-.22-.22h-.93c-.12 0-.22.1-.22.22v8.47c0 .66-.68 1.31-1.77.76L4.45 16.5c-.07-.04-.12-.12-.12-.2V7.71c0-.09.05-.17.12-.21l7.44-4.29c.07-.04.16-.04.23 0l7.44 4.29c.07.04.12.12.12.21v8.58c0 .08-.05.16-.12.2l-7.44 4.29c-.07.04-.15.04-.22 0l-1.91-1.12c-.06-.03-.13-.04-.18-.01-.49.28-.58.31-.95.47-.1.04-.25.11.05.32l2.48 1.47c.24.14.51.22.78.22s.55-.08.78-.22l7.44-4.29c.48-.28.78-.8.78-1.36V7.71c0-.56-.3-1.08-.78-1.36l-7.44-4.3c-.23-.13-.5-.2-.78-.2z"/></svg>
    },
    { name: 'Python', color: '#3776AB',
      icon: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M9.585 4.57c-1.316 0-2.585.26-2.585 1.482v1.543h5.17v.514H5.56c-1.5 0-2.81 1.03-2.81 2.46v.88c0 1.43 1.31 2.46 2.81 2.46h1.17V11.5c0-1.44 1.24-2.5 2.83-2.5h4.88c1.14 0 2.06-.93 2.06-2.07V5.52c0-1.1-.92-1.95-2.06-1.95H9.585zm-.34 1.03c.42 0 .76.35.76.77s-.34.77-.76.77-.76-.35-.76-.77.34-.77.76-.77z"/><path d="M14.415 19.43c1.316 0 2.585-.26 2.585-1.482v-1.543h-5.17v-.514h6.61c1.5 0 2.81-1.03 2.81-2.46v-.88c0-1.43-1.31-2.46-2.81-2.46h-1.17v2.41c0 1.44-1.24 2.5-2.83 2.5H9.56c-1.14 0-2.06.93-2.06 2.07v1.41c0 1.1.92 1.95 2.06 1.95h4.855zm.34-1.03c-.42 0-.76-.35-.76-.77s.34-.77.76-.77.76.35.76.77-.34.77-.76.77z"/></svg>
    },
    { name: 'PostgreSQL', color: '#4169E1',
      icon: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.128 0a10.134 10.134 0 00-2.755.403l-.063.02a10.922 10.922 0 00-1.652.491l-.076.03c-.335.136-.663.284-.985.444-.115.058-.23.117-.343.178l-.172.098a9.133 9.133 0 00-.572.346l-.058.036c-.29.186-.574.383-.847.593a10.2 10.2 0 00-.86.742l-.016.015-.184.183-.016.016c-.28.286-.536.573-.775.867l-.115.145c-.196.249-.38.504-.552.766l-.026.04-.114.177-.085.136c-.154.252-.296.51-.426.774l-.05.104-.065.139a7.746 7.746 0 00-.369.954l-.04.13c-.072.245-.134.492-.186.743l-.02.106c-.05.245-.09.492-.12.742l-.012.11c-.03.252-.05.505-.06.76l-.004.13c-.008.265-.008.53 0 .795l.004.065c.01.26.03.52.062.778l.012.098c.03.255.07.508.122.76l.024.116c.053.252.116.502.19.75l.034.112c.077.25.164.498.262.742l.042.104c.1.246.21.488.33.726l.052.103c.12.237.252.47.394.698l.063.1c.143.227.297.449.46.665l.072.095c.164.215.338.424.52.627l.08.088c.184.202.376.398.578.586l.085.079c.202.187.413.368.632.54l.09.07c.22.17.447.333.681.488l.094.062c.235.154.477.3.725.437l.098.054c.249.136.503.263.763.382l.1.045c.26.117.526.225.797.324l.102.037c.27.097.546.186.826.265l.104.03c.28.078.564.147.852.207l.104.022c.288.06.579.11.873.15l.104.014c.294.04.59.07.889.091l.102.007c.298.02.598.031.9.031.3 0 .6-.01.898-.03l.103-.008c.298-.02.594-.05.888-.091l.104-.014c.294-.04.585-.09.873-.15l.104-.022c.288-.06.572-.13.852-.207l.104-.03c.28-.08.556-.168.826-.265l.102-.037c.271-.099.537-.207.797-.324l.1-.045c.26-.119.514-.246.763-.382l.098-.054c.248-.137.49-.283.725-.437l.094-.062c.234-.155.46-.318.681-.488l.09-.07c.219-.172.43-.353.632-.54l.085-.079c.202-.188.394-.384.578-.586l.08-.088c.182-.203.356-.412.52-.627l.072-.095c.163-.216.317-.438.46-.665l.063-.1c.142-.228.274-.46.394-.698l.052-.103c.12-.238.23-.48.33-.726l.042-.104c.098-.244.185-.491.262-.742l.034-.112c.074-.248.137-.498.19-.75l.024-.116c.052-.252.092-.505.122-.76l.012-.098c.032-.258.052-.518.062-.778l.004-.065c.008-.265.008-.53 0-.795l-.004-.13c-.01-.255-.03-.508-.06-.76l-.012-.11c-.03-.25-.07-.497-.12-.742l-.02-.106c-.052-.251-.114-.498-.186-.743l-.04-.13a7.746 7.746 0 00-.369-.954l-.065-.139-.05-.104a7.745 7.745 0 00-.426-.774l-.085-.136-.114-.177-.026-.04c-.172-.262-.356-.517-.552-.766l-.115-.145c-.24-.294-.495-.58-.775-.867l-.016-.016-.184-.183-.016-.015a10.2 10.2 0 00-.86-.742 10.134 10.134 0 00-.847-.593l-.058-.036a9.133 9.133 0 00-.572-.346l-.172-.098c-.113-.061-.228-.12-.343-.178a10.089 10.089 0 00-.985-.444l-.076-.03a10.922 10.922 0 00-1.652-.491l-.063-.02A10.134 10.134 0 0017.128 0z"/></svg>
    },
    { name: 'AWS', color: '#FF9900',
      icon: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M6.763 10.036c0 .296.032.535.088.71.064.176.144.368.256.576.04.063.056.127.056.183 0 .08-.048.16-.152.24l-.503.335a.383.383 0 01-.208.072c-.08 0-.16-.04-.239-.112a2.47 2.47 0 01-.287-.375 6.18 6.18 0 01-.248-.471c-.622.734-1.405 1.101-2.347 1.101-.67 0-1.205-.191-1.596-.574-.391-.384-.59-.894-.59-1.533 0-.678.239-1.23.726-1.644.487-.415 1.133-.623 1.955-.623.272 0 .551.024.846.064.296.04.6.104.918.176v-.583c0-.607-.127-1.03-.375-1.277-.255-.248-.686-.367-1.3-.367-.28 0-.568.031-.863.103-.296.072-.583.16-.862.272a2.287 2.287 0 01-.28.104.488.488 0 01-.127.023c-.112 0-.168-.08-.168-.247v-.391c0-.128.016-.224.056-.28a.597.597 0 01.224-.167c.279-.144.614-.264 1.005-.36a4.84 4.84 0 011.246-.151c.95 0 1.644.216 2.091.647.439.43.662 1.085.662 1.963v2.586zm-3.24 1.214c.263 0 .534-.048.822-.144.287-.096.543-.271.758-.51.128-.152.224-.32.272-.512.047-.191.08-.423.08-.694v-.335a6.66 6.66 0 00-.735-.136 6.02 6.02 0 00-.75-.048c-.535 0-.926.104-1.19.32-.263.215-.39.518-.39.917 0 .375.095.655.295.846.191.2.47.296.838.296zm6.41.862c-.144 0-.24-.024-.304-.08-.064-.048-.12-.16-.168-.311L7.586 5.55a1.398 1.398 0 01-.072-.32c0-.128.064-.2.191-.2h.783c.151 0 .255.025.31.08.065.048.113.16.16.312l1.342 5.284 1.245-5.284c.04-.16.088-.264.151-.312a.549.549 0 01.32-.08h.638c.152 0 .256.025.32.08.063.048.12.16.151.312l1.261 5.348 1.381-5.348c.048-.16.104-.264.16-.312a.52.52 0 01.311-.08h.743c.127 0 .2.065.2.2 0 .04-.009.08-.017.128a1.137 1.137 0 01-.056.2l-1.923 6.17c-.048.16-.104.263-.168.311a.51.51 0 01-.303.08h-.687c-.151 0-.255-.024-.32-.08-.063-.056-.119-.16-.15-.32l-1.238-5.148-1.23 5.14c-.04.16-.087.264-.15.32-.065.056-.177.08-.32.08zm10.256.215c-.415 0-.83-.048-1.229-.143-.399-.096-.71-.2-.918-.32-.128-.071-.215-.151-.247-.223a.563.563 0 01-.048-.224v-.407c0-.167.064-.247.183-.247.048 0 .096.008.144.024.048.016.12.048.2.08.271.12.566.215.878.279.319.064.63.096.95.096.502 0 .894-.088 1.165-.264a.86.86 0 00.415-.758.777.777 0 00-.215-.559c-.144-.151-.415-.287-.806-.415l-1.157-.36c-.583-.183-1.014-.454-1.277-.813a1.902 1.902 0 01-.4-1.158c0-.335.073-.63.216-.886.144-.255.335-.479.575-.654.24-.184.51-.32.83-.415.32-.096.655-.136 1.006-.136.175 0 .359.008.535.032.183.024.35.056.518.088.16.04.312.08.455.127.144.048.256.096.336.144a.69.69 0 01.24.2.43.43 0 01.071.263v.375c0 .168-.064.256-.184.256a.83.83 0 01-.303-.096 3.652 3.652 0 00-1.532-.311c-.455 0-.815.071-1.062.223-.248.152-.375.383-.375.71 0 .224.08.416.24.567.159.152.454.304.877.44l1.134.358c.574.184.99.44 1.237.767.247.327.367.702.367 1.117 0 .343-.072.655-.207.926-.144.272-.336.511-.583.703-.248.2-.543.343-.886.447-.36.111-.734.167-1.142.167z"/></svg>
    },
    { name: 'Figma', color: '#F24E1E',
      icon: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 24c2.208 0 4-1.792 4-4v-4H8c-2.208 0-4 1.792-4 4s1.792 4 4 4z"/><path d="M4 12c0-2.208 1.792-4 4-4h4v8H8c-2.208 0-4-1.792-4-4z" opacity=".8"/><path d="M4 4c0-2.208 1.792-4 4-4h4v8H8C5.792 8 4 6.208 4 4z" opacity=".6"/><path d="M12 0h4c2.208 0 4 1.792 4 4s-1.792 4-4 4h-4V0z" opacity=".6"/><circle cx="16" cy="12" r="4"/></svg>
    },
    { name: 'Docker', color: '#2496ED',
      icon: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.186.186 0 00-.185.186v1.887c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 00.186-.186V3.574a.186.186 0 00-.186-.185h-2.118a.186.186 0 00-.185.185v1.888c0 .102.082.185.185.186m0 2.716h2.118a.187.187 0 00.186-.186V6.29a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.887c0 .102.082.186.185.186m-2.93 0h2.12a.186.186 0 00.184-.186V6.29a.185.185 0 00-.185-.185H8.1a.185.185 0 00-.185.185v1.887c0 .102.083.186.185.186m-2.964 0h2.119a.186.186 0 00.185-.186V6.29a.186.186 0 00-.185-.185H5.136a.186.186 0 00-.186.185v1.887c0 .102.084.186.186.186m5.893 2.715h2.118a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.118a.185.185 0 00-.185.186v1.887c0 .102.082.185.185.185m-2.93 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.186v1.887c0 .102.083.185.185.185m-2.964 0h2.119a.185.185 0 00.185-.185V9.006a.185.185 0 00-.185-.186h-2.12a.186.186 0 00-.185.186v1.887c0 .102.084.185.186.185m-2.92 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.186v1.887c0 .102.082.185.185.185M23.763 9.89c-.065-.051-.672-.51-1.954-.51-.338.001-.676.03-1.01.087-.248-1.7-1.653-2.53-1.716-2.566l-.344-.199-.226.327c-.284.438-.49.922-.612 1.43-.23.97-.09 1.882.403 2.661-.595.332-1.55.413-1.744.42H.751a.751.751 0 00-.75.748 11.376 11.376 0 00.692 4.062c.545 1.428 1.355 2.48 2.41 3.124 1.18.723 3.1 1.137 5.275 1.137.983.003 1.963-.086 2.93-.266a12.248 12.248 0 003.823-1.389c.98-.567 1.86-1.288 2.61-2.136 1.252-1.418 1.998-2.997 2.553-4.4h.221c1.372 0 2.215-.549 2.68-1.009.309-.293.55-.65.707-1.046l.098-.288z"/></svg>
    },
    { name: 'Vercel', color: '#000000',
      icon: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M24 22.525H0l12-21.05 12 21.05z"/></svg>
    },
    { name: 'Tailwind', color: '#06B6D4',
      icon: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z"/></svg>
    },
    { name: 'MongoDB', color: '#47A248',
      icon: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.193 9.555c-1.264-5.58-4.252-7.414-4.573-8.115-.28-.394-.53-.954-.735-1.44-.036.495-.055.685-.523 1.184-.723.566-4.438 3.682-4.74 10.02-.282 5.912 4.27 9.435 4.888 9.884l.07.05A73.49 73.49 0 0111.91 24h.481c.114-1.032.284-2.056.51-3.07.417-.296.604-.463.85-.693a11.342 11.342 0 003.639-8.464c.01-.814-.103-1.662-.197-2.218zm-5.336 8.195s0-8.291.275-8.29c.213 0 .49 10.695.49 10.695-.381-.045-.765-1.76-.765-2.405z"/></svg>
    },
  ];

  return (
    <section ref={sectionRef} className="about-section" id="nosotros">
      <div className="about-section__container">
        {/* Header */}
        <div className="about-section__header">
          <span className="about-section__label">{t('about.label')}</span>
          <h2 className="about-section__title">
            {t('about.title')} <span>{t('about.titleHighlight')}</span>
          </h2>
        </div>

        {/* Expertise Cards */}
        <div className="about-grid">
          {expertise.map((item, i) => (
            <div
              key={i}
              className="about-card"
              ref={el => cardsRef.current[i] = el}
              onMouseMove={(e) => handleCardMove(e, cardsRef.current[i])}
              onMouseLeave={() => handleCardLeave(cardsRef.current[i])}
            >
              <div className="about-card__highlight" />
              <div className="about-card__number">0{i + 1}</div>
              <h3 className="about-card__title">{item.title}</h3>
              <p className="about-card__description">{item.description}</p>
              <div className="about-card__skills">
                {item.skills.map((skill, j) => (
                  <span key={j} className="about-card__skill">{skill}</span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Tech Stack */}
        <div className="tech-section">
          <div className="tech-section__header">
            <span className="about-section__label">{t('about.techLabel')}</span>
            <p className="tech-section__subtitle">
              {t('about.techSubtitle')}
            </p>
          </div>

          <div className="tech-grid">
            {techStack.map((tech, i) => (
              <div
                key={i}
                className="tech-item"
                style={{ '--accent': tech.color }}
                ref={el => techItemsRef.current[i] = el}
                onMouseMove={(e) => handleMagneticMove(e, techItemsRef.current[i])}
                onMouseLeave={() => handleMagneticLeave(techItemsRef.current[i])}
              >
                <div className="tech-item__glow" />
                <div className="tech-item__icon">
                  {tech.icon}
                </div>
                <span className="tech-item__name">{tech.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Philosophy */}
        <div className="philosophy">
          <div className="philosophy__orb philosophy__orb--1" />
          <div className="philosophy__orb philosophy__orb--2" />
          <div className="philosophy__content">
            <span className="philosophy__quote">"</span>
            <blockquote>
              {t('about.philosophyQuote')}
            </blockquote>
            <div className="philosophy__author">
              <span className="philosophy__author-title">{t('about.philosophyTitle')}</span>
              <span className="philosophy__author-subtitle">{t('about.philosophySubtitle')}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
