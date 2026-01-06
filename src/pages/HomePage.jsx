import HeroSection from '../components/HeroSection';
import ServicesSection from '../components/ServicesSection';
import LogosSection from '../components/LogosSection';
import FeaturesSection from '../components/FeaturesSection';
import PackagesSection from '../components/PackagesSection';
import ContactSection from '../components/ContactSection';

const HomePage = () => {
  return (
    <>
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

      {/* Contact Section - Contacto */}
      <ContactSection />
    </>
  );
};

export default HomePage;
