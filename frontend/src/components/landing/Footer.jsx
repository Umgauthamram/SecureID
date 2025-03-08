import React from 'react';
import { Fingerprint } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="py-12 bg-secondary/50">
      <div className="container mx-auto px-4 md:px-6 text-center">
        <div className="mb-6">
          <div className="flex items-center justify-center space-x-2">
            <Fingerprint className="h-8 w-8 text-primary" />
            <span className="font-bold text-lg">SecureID</span>
          </div>
        </div>
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} SecureID. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;