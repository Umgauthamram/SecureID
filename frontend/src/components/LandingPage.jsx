import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="min-h-screen"
    >
      {/* Hero Section with text reveal & zoom-in effect */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: 'easeOut' }}
      >
        <HeroSection />
      </motion.div>

      {/* Features Section with staggered slide-up animations */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
        viewport={{ once: true }}
      >
        <FeaturesSection />
      </motion.div>

      {/* CTA Section with pulse & glow effect on button */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        viewport={{ once: true }}
      >
        <CTASection />
      </motion.div>

      {/* Footer with smooth fade-in from bottom */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
        viewport={{ once: true }}
      >
        <Footer />
      </motion.div>
    </motion.div>
  );
};

export default LandingPage;