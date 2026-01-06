import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Componentes
import Header from './components/Header';
import Footer from './components/Footer';
import WhatsAppWidget from './components/WhatsAppWidget';

// Pages
import HomePage from './pages/HomePage';
import PortfolioPage from './pages/PortfolioPage';

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

// Layout principal
const Layout = ({ children }) => {
  return (
    <div className="app">
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
      </Routes>
    </Router>
  );
}

export default App;
