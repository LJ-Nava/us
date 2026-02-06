import LandingHero from '../components/LandingHero';
import LandingPackages from '../components/LandingPackages';
import LandingContact from '../components/LandingContact';

const LandingPage = () => {
  return (
    <div className="landing-page">
      <LandingHero />
      <LandingPackages />
      <LandingContact />
    </div>
  );
};

export default LandingPage;
