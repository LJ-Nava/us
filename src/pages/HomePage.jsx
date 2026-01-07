import HeroSection from '../components/HeroSection';
import ServicesSection from '../components/ServicesSection';
import LogosSection from '../components/LogosSection';
import FeaturesSection from '../components/FeaturesSection';
import PackagesSection from '../components/PackagesSection';

const HomePage = () => {
  return (
    <>
      {/* Hero Section con 3D */}
      <HeroSection />

      {/* Services Section - Nuestros Servicios */}
      <ServicesSection />

      {/* Logos Section - Social Proof */}
      <LogosSection />

      {/* Features Section - Por que elegirnos */}
      <FeaturesSection />

      {/* Packages Section - Nuestros Paquetes */}
      <PackagesSection />
    </>
  );
};

export default HomePage;
