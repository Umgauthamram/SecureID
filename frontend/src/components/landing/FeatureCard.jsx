import React from 'react';

const FeatureCard = ({ 
  icon, 
  title, 
  description, 
  index 
}) => {
  return (
    <div 
      className="animate-on-scroll  neo-morphism p-6 hover-lift"
      style={{ animationDelay: `${(index + 1) * 100}ms` }}
    >
      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
        <span className="text-primary">{icon}</span>
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};

export default FeatureCard;