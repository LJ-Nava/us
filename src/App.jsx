import { useEffect, useRef, useCallback, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Contexts
import { I18nProvider } from './contexts/I18nContext';

// Componentes
import Header from './components/Header';
import Footer from './components/Footer';
import WhatsAppWidget from './components/WhatsAppWidget';

// Pages - Lazy loaded para mejor performance
const HomePage = lazy(() => import('./pages/HomePage'));
const PortfolioPage = lazy(() => import('./pages/PortfolioPage'));
const NosotrosPage = lazy(() => import('./pages/NosotrosPage'));
const ServiciosPage = lazy(() => import('./pages/ServiciosPage'));
const LegalPage = lazy(() => import('./pages/LegalPage'));

// Loading fallback minimalista
const PageLoader = () => (
  <div style={{
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#0a0a0c'
  }}>
    <div style={{
      width: '40px',
      height: '40px',
      border: '3px solid rgba(139, 92, 246, 0.2)',
      borderTopColor: '#8b5cf6',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite'
    }} />
    <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
  </div>
);

// Registrar plugins de GSAP
gsap.registerPlugin(ScrollTrigger);

// Componente para scroll al cambiar de ruta
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll instantáneo al top (sin animación)
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });

    // También forzar con setTimeout por si acaso
    setTimeout(() => {
      window.scrollTo(0, 0);
      ScrollTrigger.refresh();
    }, 0);
  }, [pathname]);

  return null;
};

// Custom Cursor Component
const CustomCursor = () => {
  const cursorRef = useRef(null);
  const cursorDotRef = useRef(null);

  const handleMouseMove = useCallback((e) => {
    if (cursorRef.current && cursorDotRef.current) {
      gsap.to(cursorRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.5,
        ease: 'power3.out'
      });
      gsap.to(cursorDotRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1
      });
    }
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove]);

  return (
    <>
      <div ref={cursorRef} className="custom-cursor" />
      <div ref={cursorDotRef} className="custom-cursor-dot" />
    </>
  );
};

// Skip Link para accesibilidad (permite saltar al contenido principal)
const SkipLink = () => (
  <a
    href="#main-content"
    className="skip-link"
    aria-label="Saltar al contenido principal"
  >
    Saltar al contenido principal
  </a>
);

// Layout principal
const Layout = ({ children }) => {
  return (
    <div className="app">
      <SkipLink />
      <CustomCursor aria-hidden="true" />
      <Header />
      <main id="main-content" className="main" role="main" tabIndex="-1">
        {children}
      </main>
      <Footer />
      <WhatsAppWidget
        phoneNumber="573147083182"
        message="Hola! Me gustaría saber más sobre sus servicios de diseño web."
      />
    </div>
  );
};

function App() {
  // Inicialización de efectos globales
  useEffect(() => {
    // Smooth scroll nativo mejorado
    document.documentElement.style.scrollBehavior = 'smooth';

    // Refresh ScrollTrigger después del render
    ScrollTrigger.refresh();

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <I18nProvider>
      <Router>
        <ScrollToTop />
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route
              path="/"
              element={
                <Layout>
                  <HomePage />
                </Layout>
              }
            />
            <Route
              path="/portfolio"
              element={
                <Layout>
                  <PortfolioPage />
                </Layout>
              }
            />
            <Route
              path="/nosotros"
              element={
                <Layout>
                  <NosotrosPage />
                </Layout>
              }
            />
            <Route
              path="/servicios"
              element={
                <Layout>
                  <ServiciosPage />
                </Layout>
              }
            />
            <Route
              path="/legal"
              element={
                <Layout>
                  <LegalPage />
                </Layout>
              }
            />
          </Routes>
        </Suspense>
      </Router>
    </I18nProvider>
  );
}

export default App;
