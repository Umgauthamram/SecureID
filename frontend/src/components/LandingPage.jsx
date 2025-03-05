import React, { useRef, useEffect } from 'react';
import HeroSection from './landing/HeroSection';
import FeaturesSection from './landing/FeaturesSection';
import CTASection from './landing/CTASection';
import Footer from './landing/Footer';
import { useIntersectionObserver } from './landing/useIntersectionObserver';

const LandingPage = () => {
  const heroRef = useRef(null);
  const featuresRef = useRef(null);

  useIntersectionObserver([heroRef, featuresRef]);

  return (
    <div className="min-h-screen">
      <HeroSection />
      <FeaturesSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default LandingPage;