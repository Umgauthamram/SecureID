import React, { useState, useCallback } from 'react';
import Web3 from 'web3';
import { Link, useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import Button from './Button';

const generateNonce = () => Math.floor(Math.random() * 1000000);

const LoginForm = () => {
  const [loginMethod, setLoginMethod] = useState('traditional');
  const [isLoading, setIsLoading] = useState(false);
  const [userInputs, setUserInputs] = useState(Array(12).fill(''));
  const [formErrors, setFormErrors] = useState({});
  const navigate = useNavigate();

  const regexPatterns = {
    email: /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/, 
    phone: /^\d{10}$/, 
    password: /^(?=.[a-z])(?=.[A-Z])(?=.\d)(?=.[\W_]).{8,}$/, 
    passcode: /^\d{6}$/
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    if (id === 'email') {
      const isValid = regexPatterns.email.test(value) || regexPatterns.phone.test(value);
      setFormErrors((prev) => ({ ...prev, email: isValid ? '' : 'Invalid email or phone' }));
    } else if (regexPatterns[id]) {
      setFormErrors((prev) => ({ ...prev, [id]: regexPatterns[id].test(value) ? '' : `Invalid ${id} `}));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate('/dashboard');
    }, 1500);
  };

  const handleMetaMaskLogin = async () => {
    if (typeof window.ethereum !== 'undefined') {
      const web3 = new Web3(window.ethereum);
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const accounts = await web3.eth.getAccounts();
        const address = accounts[0];
        const nonce = generateNonce();
        const message = `Login request:\nNonce: ${nonce}\nTimestamp: ${Date.now()}`;
        const signature = await web3.eth.personal.sign(message, address, '');
        console.log('MetaMask Login:', { address, signature, message, nonce });
        navigate('/dashboard');
      } catch (error) {
        console.error('MetaMask login failed:', error);
      }
    } else {
      console.error('MetaMask not found');
    }
  };

  const handlePassphraseChange = useCallback((index, value) => {
    setUserInputs((prev) => {
      const newInputs = [...prev];
      newInputs[index] = value.trim().toLowerCase();
      return newInputs;
    });
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex rounded-lg bg-secondary p-1">
        {['traditional', 'metamask', 'passphrase'].map((method) => (
          <button
            key={method}
            className={clsx(
              'flex-1 py-2 text-sm font-medium rounded-md transition-colors',
              loginMethod === method ? 'bg-white shadow-sm' : 'hover:bg-white/50'
            )}
            onClick={() => setLoginMethod(method)}
          >
            {method === 'traditional' ? 'Email/Phone' : method.charAt(0).toUpperCase() + method.slice(1)}
          </button>
        ))}
      </div>

      {loginMethod === 'traditional' && (
  <form onSubmit={handleSubmit} className="space-y-4">
    <div className="space-y-2">
      <label htmlFor="email" className="block text-sm font-medium text-gray-700">
        Email or Phone
      </label>
      <input
        id="email"
        type="text"
        placeholder="Enter your email or phone"
        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
        required
        onChange={handleInputChange}
      />
      {formErrors.email && <p className="text-red-500 text-sm">{formErrors.email}</p>}
    </div>

    <div className="space-y-2">
      <label htmlFor="password" className="block text-sm font-medium text-gray-700">
        Password
      </label>
      <input
        id="password"
        type="password"
        placeholder="Enter your password"
        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
        required
        onChange={handleInputChange}
      />
      {formErrors.password && <p className="text-red-500 text-sm">{formErrors.password}</p>}
    </div>

    <div className="space-y-2">
      <label htmlFor="passcode" className="block text-sm font-medium text-gray-700">
        Passcode
      </label>
      <input
        id="passcode"
        type="password"
        placeholder="Enter your passcode"
        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
        required
        maxLength={6}
        onChange={handleInputChange}
      />
      {formErrors.passcode && <p className="text-red-500 text-sm">{formErrors.passcode}</p>}
    </div>

    <Button type="submit" fullWidth isLoading={isLoading}>
      Sign In
    </Button>
  </form>
)}

      {loginMethod === 'metamask' && (
        <div className="space-y-6">
          <p className="text-sm text-center">Connect your MetaMask wallet to authenticate with your DID-NFT.</p>
          <Button onClick={handleMetaMaskLogin} fullWidth variant="outline" isLoading={isLoading}>Connect with MetaMask</Button>
        </div>
      )}

      {loginMethod === 'passphrase' && (
        <form onSubmit={handleSubmit} className="space-y-4">
          <p className="text-sm text-center">Enter your 12-word passphrase to recover your account.</p>
          <div className="grid grid-cols-3 gap-3">
            {userInputs.map((word, index) => (
              <input key={index} type="text" className="border rounded-md w-full px-3 py-2 text-center" value={word} onChange={(e) => handlePassphraseChange(index, e.target.value)} placeholder={`Word ${index + 1}`} required />
            ))}
          </div>
          <Button type="submit" fullWidth isLoading={isLoading}>Recover Account</Button>
        </form>
      )}

      <div className="text-center text-sm">
        Don't have an account? <Link to="/signup" className="text-primary hover:underline">Sign up</Link>
      </div>
    </div>
  );
};

export default LoginForm;