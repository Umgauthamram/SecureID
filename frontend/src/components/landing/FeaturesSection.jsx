import React, { useRef } from 'react';
import FeatureCard from './FeatureCard';
import { featuresData } from './featuresData';

const FeaturesSection = () => {
  const featuresRef = useRef(null);

  return (
    <section 
      ref={featuresRef}
      className="py-16 md:py-24 bg-secondary/50"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 animate-on-scroll ">
            Key Features
          </h2>
          <p className="text-lg text-muted-foreground animate-on-scroll">
            Our platform combines cutting-edge blockchain technology with 
            user-friendly interfaces to provide a secure and seamless experience.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuresData.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;