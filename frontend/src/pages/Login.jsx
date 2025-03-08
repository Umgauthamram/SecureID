import { useEffect } from 'react';
import Header from '@/components/Header';
import AuthCard from '@/components/AuthCard';
import LoginForm from '@/components/LoginForm';

const Login = () => {
  useEffect(() => {

    window.scrollTo(0, 0);
    

    document.title = "Log In | SecureID";
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-28 pb-16 md:pt-32 md:pb-24">
        <div className="container mx-auto px-4 md:px-6">
          <AuthCard 
            title="Welcome Back"
            subtitle="Log in to access your secure files"
          >
            <LoginForm />
          </AuthCard>
        </div>
      </div>
    </div>
  );
};

export default Login;