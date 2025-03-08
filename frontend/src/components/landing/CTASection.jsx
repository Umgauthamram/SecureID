import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../Button';

const CTASection = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="glass-morphism rounded-xl p-8 md:p-12 max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Secure Your Digital Identity?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Join thousands of users who are already benefiting from our decentralized identity solution.
          </p>
          <Link to="/signup">
            <Button size="lg" className="animate-pulse-soft">
              Create Your SecureID Now
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CTASection;