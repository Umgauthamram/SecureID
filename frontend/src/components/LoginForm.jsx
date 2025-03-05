import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from './Button';

const LoginForm = () => {
  const [loginMethod, setLoginMethod] = useState('traditional');
  const [isLoading, setIsLoading] = useState(false);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      console.log('Login submit with method:', loginMethod);
    }, 1500);
  };
  
  const handleMetaMaskLogin = async () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      console.log('MetaMask login clicked');
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div className="flex rounded-lg bg-secondary p-1">
        <button
          className={cn(
            "flex-1 py-2 text-sm font-medium rounded-md transition-colors",
            loginMethod === 'traditional' 
              ? "bg-white shadow-sm" 
              : "hover:bg-white/50"
          )}
          onClick={() => setLoginMethod('traditional')}
        >
          Email/Phone
        </button>
        <button
          className={cn(
            "flex-1 py-2 text-sm font-medium rounded-md transition-colors",
            loginMethod === 'metamask' 
              ? "bg-white shadow-sm" 
              : "hover:bg-white/50"
          )}
          onClick={() => setLoginMethod('metamask')}
        >
          MetaMask
        </button>
        <button
          className={cn(
            "flex-1 py-2 text-sm font-medium rounded-md transition-colors",
            loginMethod === 'passphrase' 
              ? "bg-white shadow-sm" 
              : "hover:bg-white/50"
          )}
          onClick={() => setLoginMethod('passphrase')}
        >
          Passphrase
        </button>
      </div>

      {loginMethod === 'traditional' && (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium">
              Email or Phone
            </label>
            <input
              id="email"
              type="text"
              placeholder="Enter your email or phone"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
              required
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium">
                Password
              </label>
              <Link to="/forgot-password" className="text-sm text-primary hover:underline">
                Forgot password?
              </Link>
            </div>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
              required
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="passcode" className="block text-sm font-medium">
              Passcode
            </label>
            <input
              id="passcode"
              type="password"
              placeholder="Enter your passcode"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
              required
              maxLength={6}
            />
          </div>
          
          <Button 
            type="submit" 
            fullWidth 
            isLoading={isLoading}
          >
            Sign In
          </Button>
        </form>
      )}

      {loginMethod === 'metamask' && (
        <div className="space-y-6">
          <div className="bg-secondary/50 p-4 rounded-lg text-sm text-center text-muted-foreground">
            Connect your MetaMask wallet to authenticate with your DID-NFT
          </div>
          
          <Button 
            onClick={handleMetaMaskLogin} 
            fullWidth 
            variant="outline"
            isLoading={isLoading}
            leftIcon={
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19.1 7.12L16.86 2.08C16.69 1.74 16.26 1.55 15.89 1.66L10.74 3.29C10.62 3.34 10.52 3.41 10.44 3.5L6.44 7.51C6.19 7.76 6.19 8.16 6.44 8.41L8.13 10.1C8.35 10.32 8.7 10.33 8.93 10.13L12.56 6.5C12.7 6.36 12.91 6.35 13.05 6.48C13.21 6.62 13.21 6.86 13.05 7.01L9.41 10.65C9.21 10.85 9.16 11.15 9.3 11.41L10.31 13.43C10.44 13.69 10.73 13.82 11.01 13.74L13.94 12.9C14.09 12.86 14.22 12.76 14.31 12.64L19.08 7.82C19.46 7.43 19.39 6.74 19.1 7.12Z" fill="#F6851B"/>
                <path d="M3.34 9.4C3.04 9.11 2.56 9.11 2.26 9.4L0.5 11.17C0.19 11.47 0.19 11.95 0.5 12.25L6.64 18.39C6.94 18.69 7.42 18.69 7.72 18.39L9.48 16.63C9.79 16.33 9.79 15.85 9.48 15.55L3.34 9.4Z" fill="#F6851B"/>
              </svg>
            }
          >
            Connect with MetaMask
          </Button>
        </div>
      )}

      {loginMethod === 'passphrase' && (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="passphrase" className="block text-sm font-medium">
              Passphrase
            </label>
            <textarea
              id="passphrase"
              placeholder="Enter your 12-24 word passphrase"
              className="w-full px-3 py-2 border rounded-md h-24 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
              required
            />
            <p className="text-xs text-muted-foreground">
              Enter the passphrase you received when you created your account. Separate each word with a space.
            </p>
          </div>
          
          <Button 
            type="submit" 
            fullWidth 
            isLoading={isLoading}
          >
            Recover Account
          </Button>
        </form>
      )}

      <div className="text-center text-sm">
        Don't have an account?{' '}
        <Link to="/signup" className="text-primary hover:underline">
          Sign up
        </Link>
      </div>
    </div>
  );
};

// Helper function for conditional classes
const cn = (...classes) => {
  return classes.filter(Boolean).join(' ');
};

export default LoginForm;