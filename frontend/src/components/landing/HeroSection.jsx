import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import Button from '../Button';
import DecryptedText from '../animations/DecryptedText';


const HeroSection = () => {
  const heroRef = useRef(null);
  const containerRef = useRef(null);

  return (
    <section
      ref={heroRef}
      className="pt-28 pb-16 md:pt-32 md:pb-24 overflow-hidden relative"
    >

      
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="opacity-0 animate-fade-in">
            <span className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary text-sm font-medium mb-5">
              Decentralized Identity & Storage
            </span>
          </div>

          <h1 className="opacity-0 animate-fade-in animate-delay-[200ms] text-orange-500 hero-text mt-8 text-5xl font-semibold">
            <DecryptedText
              text="Secure Your Digital Identity with"
              speed={80}
              maxIterations={15}
              characters="ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890"
              animateOn="view"
              revealDirection="center"
              className="text-orange-500"
            />
            <span className="text-gradient block mt-5" >
              <DecryptedText
                text="SecureID Technology"
                speed={100}
                maxIterations={15}
                characters="ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890"
                animateOn="view"
                revealDirection="center"
                className="text-gradient"
              />
            </span>
          </h1>

          <p className=" animate-fade-in animate-delay-[400ms] text-lg md:text-xl text-muted-foreground mb-10 mt-16">
            A revolutionary platform that combines decentralized identifiers
            and non-fungible tokens to give you complete control over your digital identity
            and secure access to your files.
          </p>

          <div className="opacity-0 animate-fade-in animate-delay-[600ms] flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/signup">
              <Button size="lg" className="w-full sm:w-auto">
      
                Get Started
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                Login
              </Button>
            </Link>

          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;