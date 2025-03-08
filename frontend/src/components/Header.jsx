import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Fingerprint, UserCircle } from "lucide-react";
import Button from './Button';
import { cn } from '@/lib/utils';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path) => location.pathname === path;

  // Check if we are on dashboard or settings page
  const isDashboardOrSettings = location.pathname === "/dashboard" || location.pathname === "/settings";

  return (
    <header 
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out',
        scrolled ? 'py-3 bg-white/80 backdrop-blur-md shadow-sm' : 'py-5 bg-transparent'
      )}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          {/* Logo (Redirects to Dashboard if on Dashboard or Settings, otherwise to Home) */}
          <Link to={isDashboardOrSettings ? "/dashboard" : "/"} className="flex items-center space-x-2">
            <Fingerprint className="h-8 w-8 text-primary" />
            <span className="font-bold text-xl">SecureID</span>
          </Link>



      
          <div className="hidden md:flex items-center space-x-4">
            {isDashboardOrSettings ? (
           
              <Link to="/settings">
                <UserCircle className="h-8 w-8 text-primary cursor-pointer" />
              </Link>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outline" size="sm">
                    Log In
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button size="sm">
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </div>

          <button 
            className="md:hidden p-2" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              {mobileMenuOpen ? (
                <path 
                  d="M18 6L6 18M6 6L18 18" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              ) : (
                <path 
                  d="M4 6H20M4 12H20M4 18H20" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              )}
            </svg>
          </button>
        </div>


        {mobileMenuOpen && (
          <div className="md:hidden pt-4 pb-3 border-t mt-3 animate-fade-in">
            <nav className="flex flex-col space-y-3">
              <Link 
                to="/" 
                className={cn("text-sm font-medium py-2 transition-colors", 
                  isActive('/') ? 'text-primary' : 'text-foreground'
                )}
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/dashboard" 
                className={cn("text-sm font-medium py-2 transition-colors", 
                  isActive('/dashboard') ? 'text-primary' : 'text-foreground'
                )}
                onClick={() => setMobileMenuOpen(false)}
              >
                Dashboard
              </Link>

       
              {isDashboardOrSettings && (
                <Link to="/settings" onClick={() => setMobileMenuOpen(false)} className="flex items-center justify-center pt-3">
                  <UserCircle className="h-8 w-8 text-primary" />
                </Link>
              )}

      
              {!isDashboardOrSettings && (
                <div className="flex flex-col space-y-2 pt-2">
                  <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="outline" fullWidth>
                      Log In
                    </Button>
                  </Link>
                  <Link to="/signup" onClick={() => setMobileMenuOpen(false)}>
                    <Button fullWidth>
                      Sign Up
                    </Button>
                  </Link>
                </div>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;