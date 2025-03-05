import React, { useEffect } from 'react';
import Header from '@/components/Header';
import AuthCard from '@/components/AuthCard';
import SignUpForm from '@/components/SignUpForm';

const SignUp = () => {
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    // Update document title
    document.title = "Sign Up | SecureID";
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-28 pb-16 md:pt-32 md:pb-24">
        <div className="container mx-auto px-4 md:px-6">
          <AuthCard 
            title="Create Your Account"
            subtitle="Sign up and secure your identity"
          >
            <SignUpForm />
          </AuthCard>
        </div>
      </div>
    </div>
  );
};

export default SignUp;