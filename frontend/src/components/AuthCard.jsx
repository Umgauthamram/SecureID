import React from 'react';
import { cn } from '@/lib/utils';
import { Fingerprint } from "lucide-react";

const AuthCard = ({ 
  title, 
  subtitle, 
  children, 
  className 
}) => {
  return (
    <div className={cn(
      'neo-morphism p-6 md:p-8 w-full max-w-md mx-auto rounded-xl animate-zoom-in',
      className
    )}>
      <div className="flex items-center justify-center mb-5">
        <Fingerprint className="h-8 w-8 text-primary" />
        <span className="font-bold text-xl ml-2">SecureID</span>
      </div>
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold">{title}</h1>
        {subtitle && (
          <p className="text-muted-foreground mt-2">{subtitle}</p>
        )}
      </div>
      {children}
    </div>
  );
};

export default AuthCard;