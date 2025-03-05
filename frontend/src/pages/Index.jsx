import { useEffect } from 'react';
import Header from '@/components/Header';
import LandingPage from '@/components/LandingPage';

const Index = () => {
  useEffect(() => {
    // Update document title
    document.title = "SecureID - Secure Your Digital Identity";
  }, []);
  
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <LandingPage />
    </div>
  );
};

export default Index;