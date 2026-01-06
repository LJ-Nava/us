import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Componentes
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import ServicesSection from './components/ServicesSection';
import LogosSection from './components/LogosSection';
import FeaturesSection from './components/FeaturesSection';
import PackagesSection from './components/PackagesSection';
import WhatsAppWidget from './components/WhatsAppWidget';

// Registrar plugins de GSAP
gsap.registerPlugin(ScrollTrigger);

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
    <div className="app">
      {/* Header Premium */}
      <Header />

      {/* Main Content */}
      <main className="main">
        {/* Hero Section con 3D */}
        <HeroSection />

        {/* Services Section - Nuestro Proceso */}
        <ServicesSection />

        {/* Logos Section - Social Proof */}
        <LogosSection />

        {/* Features Section - Por qué elegirnos */}
        <FeaturesSection />

        {/* Packages Section - Nuestros Paquetes */}
        <PackagesSection />
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="footer__container">
          <p className="footer__text">
            © 2025 J-Visual. Todos los derechos reservados.
          </p>
        </div>
      </footer>

      {/* WhatsApp Widget */}
      <WhatsAppWidget
        phoneNumber="1234567890"
        message="Hola! Me gustaría saber más sobre sus servicios de diseño web."
      />
    </div>
  );
}

export default App;
