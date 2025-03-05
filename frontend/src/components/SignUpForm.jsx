import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from './Button';
import { Eye, EyeOff } from 'lucide-react';

const SignUpForm = () => {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [passphrase, setPassphrase] = useState('');
  const [showPassphrase, setShowPassphrase] = useState(false);
  
  const handleContinue = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call to generate passphrase
    setTimeout(() => {
      // Generate a mock passphrase (in production this would come from the backend)
      const mockPassphrase = "apple banana cherry diamond elephant forest guitar harvest island jaguar kangaroo lemon mountain";
      setPassphrase(mockPassphrase);
      setIsLoading(false);
      setStep(2);
    }, 1500);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate final registration API call
    setTimeout(() => {
      setIsLoading(false);
      console.log('Registration completed');
      // In a real app, redirect to dashboard or show success message
    }, 1500);
  };

  const togglePassphraseVisibility = () => {
    setShowPassphrase(!showPassphrase);
  };

  // Split passphrase into words for display
  const passphraseWords = passphrase.split(' ');
  
  return (
    <div className="space-y-6">
      {step === 1 ? (
        <form onSubmit={handleContinue} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="username" className="block text-sm font-medium">
              Username
            </label>
            <input
              id="username"
              type="text"
              placeholder="Choose a username"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
              required
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
              required
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="phone" className="block text-sm font-medium">
              Phone Number
            </label>
            <input
              id="phone"
              type="tel"
              placeholder="Enter your phone number"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Create a strong password"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
              required
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="passcode" className="block text-sm font-medium">
              Passcode (4-6 digits)
            </label>
            <input
              id="passcode"
              type="password"
              placeholder="Create a passcode"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
              required
              minLength="4"
              maxLength="6"
              pattern="[0-9]*"
            />
            <p className="text-xs text-muted-foreground">
              This will be used as an additional security factor
            </p>
          </div>
          
          <Button 
            type="submit" 
            fullWidth 
            isLoading={isLoading}
          >
            Continue
          </Button>
        </form>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="bg-secondary/20 p-4 rounded-lg text-sm">
            <div className="font-medium text-center mb-3">Your Recovery Passphrase</div>
            
            <div className="bg-background rounded-lg p-4 border relative">
              <button
                type="button"
                className="absolute top-2 right-2 p-1 rounded-full bg-secondary hover:bg-secondary/80 transition-colors"
                onClick={togglePassphraseVisibility}
                aria-label={showPassphrase ? "Hide passphrase" : "Show passphrase"}
              >
                {showPassphrase ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
              
              <div className={`grid grid-cols-3 gap-2 ${!showPassphrase ? 'blur-sm select-none' : ''}`}>
                {passphraseWords.map((word, index) => (
                  <div key={index} className="flex items-center">
                    <span className="text-muted-foreground text-xs mr-1">{index + 1}.</span>
                    <span className="font-mono text-sm">{word}</span>
                  </div>
                ))}
              </div>
              
              {!showPassphrase && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-sm text-muted-foreground">
                    Your passphrase is hidden for security
                  </div>
                </div>
              )}
            </div>
            
            <div className="mt-4 bg-amber-50 border border-amber-200 text-amber-800 p-3 rounded-md flex items-start">
              <svg className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <div className="text-xs leading-normal">
                <p className="font-semibold mb-1">IMPORTANT: Write down these words</p>
                <p>These 12 words are the only way to recover your account if you forget your password or lose access to your device. Keep them in a safe place.</p>
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="flex items-center">
              <input 
                type="checkbox" 
                className="mr-2" 
                required 
              />
              <span className="text-sm">
                I have securely saved my recovery passphrase
              </span>
            </label>
          </div>
          
          <div className="space-y-2">
            <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 text-sm">
              <p className="font-medium mb-1">What happens next?</p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li>Your SecureID will be created on the Polygon network</li>
                <li>Your identity will be securely linked to this ID</li>
                <li>You'll be able to access and upload files</li>
              </ul>
            </div>
          </div>
          
          <Button 
            type="submit" 
            fullWidth 
            isLoading={isLoading}
          >
            Create Account
          </Button>
          
          <Button 
            type="button"
            variant="outline"
            fullWidth
            onClick={() => setStep(1)}
          >
            Go Back
          </Button>
        </form>
      )}

      <div className="text-center text-sm">
        Already have an account?{' '}
        <Link to="/login" className="text-primary hover:underline">
          Log in
        </Link>
      </div>
    </div>
  );
};

export default SignUpForm;