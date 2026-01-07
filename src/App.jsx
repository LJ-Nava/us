import { useEffect, useRef, useCallback } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Contexts
import { I18nProvider } from './contexts/I18nContext';

// Componentes
import Header from './components/Header';
import Footer from './components/Footer';
import WhatsAppWidget from './components/WhatsAppWidget';

// Pages
import HomePage from './pages/HomePage';
import PortfolioPage from './pages/PortfolioPage';
import NosotrosPage from './pages/NosotrosPage';
import ServiciosPage from './pages/ServiciosPage';

// Registrar plugins de GSAP
gsap.registerPlugin(ScrollTrigger);

// Componente para scroll al cambiar de ruta
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    ScrollTrigger.refresh();
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

// Layout principal
const Layout = ({ children }) => {
  return (
    <div className="app">
      <CustomCursor />
      <Header />
      <main className="main">
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
        </Routes>
      </Router>
    </I18nProvider>
  );
}

export default App;
