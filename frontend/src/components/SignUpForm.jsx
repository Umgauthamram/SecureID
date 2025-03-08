import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from './Button';
import { Eye, EyeOff, Copy } from 'lucide-react';
import { ethers } from 'ethers';

const SignUpForm = () => {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [passphrase, setPassphrase] = useState('');
  const [showPassphrase, setShowPassphrase] = useState(false);
  const [verificationWords, setVerificationWords] = useState([]);
  const [userInputs, setUserInputs] = useState({});
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    passcode: "",
  });

  const [formErrors, setFormErrors] = useState({});

  const regexPatterns = {
    username: /^[a-zA-Z0-9_]{3,15}$/, 
    email: /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/, 
    password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/, 
    passcode: /^\d{4,6}$/,
  };

  const validateInput = (name, value) => {
    if (!regexPatterns[name].test(value)) {
      setFormErrors((prev) => ({ ...prev, [name]: `Invalid ${name}` }));
    } else {
      setFormErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };
  
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
    validateInput(id, value);
  };

  const handleContinue = (e) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      const wallet = ethers.Wallet.createRandom();
      const mnemonic = wallet.mnemonic.phrase;
      setPassphrase(mnemonic);

      const wordsArray = mnemonic.split(' ');
      const indices = new Set();
      while (indices.size < 4) {
        indices.add(Math.floor(Math.random() * wordsArray.length));
      }
      setVerificationWords([...indices].map((index) => ({ index, word: wordsArray[index] })));

      setIsLoading(false);
      setStep(2);
    }, 1500);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(passphrase);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleVerify = () => {
    const isCorrect = verificationWords.every(({ index, word }) => userInputs[index] === word);
    if (isCorrect) {
      navigate('/dashboard');
    } else {
      setError('Incorrect words. Please try again.');
    }
  };

  return (
    <div className="space-y-6">
      {step === 1 ? (
        <form onSubmit={handleContinue} className="space-y-4">
          {Object.keys(formData).map((field) => (
            <div key={field} className="space-y-2">
              <label htmlFor={field} className="block text-sm font-medium">
              {field.charAt(0).toUpperCase() + field.slice(1)}{field === 'passcode' && ' (4-6)'}
              </label>
              <input
                id={field}
                type={field === "password" || field === "passcode" ? "password" : "text"}
                placeholder={`Enter your ${field}`}
                className="w-full px-3 py-2 border rounded-md"
                value={formData[field]}
                onChange={handleInputChange}
                required
                {...(field === 'passcode'
                  ? { minLength: 4, maxLength: 6, pattern: "[0-9]{4,6}" }
                  : {})}
              />
              {formErrors[field] && <p className="text-red-500 text-sm">{formErrors[field]}</p>}
            </div>
          ))}
          <p className="text-xs text-muted-foreground">
            This will be used as an additional security factor.
          </p>
          <Button type="submit" fullWidth isLoading={isLoading}>
            Continue
          </Button>
        </form>
      ) : step === 2 ? (
        <div>
          <div className="bg-secondary/20 p-4 rounded-lg text-sm">
            <div className="font-medium text-center mb-3">Your Recovery Passphrase</div>
            <div className="bg-background rounded-lg p-4 border relative">
              <div className="absolute top-16 left-20 cursor-pointer" onClick={() => setShowPassphrase(!showPassphrase)}>
                {showPassphrase ? "" : "Unblur to see the passphrase"}
              </div>
              <div className={`grid grid-cols-3 gap-2 ${!showPassphrase ? 'blur-sm select-none' : ''}`}>
                {passphrase.split(' ').map((word, index) => (
                  <div key={index} className="flex items-center">
                    <span className="text-muted-foreground text-xs mr-1">{index + 1}.</span>
                    <span className="font-mono text-sm">{word}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="flex justify-center space-x-4 mt-4">
            <Button type="button" onClick={() => setShowPassphrase(!showPassphrase)}>
              {showPassphrase ? <><EyeOff /> Hide Passphrase</> : <><Eye /> Show Passphrase</>}
            </Button>
            <Button className="gap-3" type="button" onClick={handleCopy}>
              {copied ? "Copied!" : <>Copy <Copy /></>}
            </Button>
          </div>
          <div className="mt-6">
            <Button fullWidth type="button" onClick={() => setStep(3)}>
              Continue
            </Button>
          </div>
        </div>
      ) : (
        <div>
          <h2 className="text-center font-medium text-lg">Verify Your Passphrase</h2>
          <div className="space-y-5 mt-4">
            {verificationWords.map(({ index }) => (
              <div key={index} className="flex flex-col">
                <input
                  type="text"
                  className="border rounded-md w-full px-3 py-2"
                  value={userInputs[index] || ''}
                  onChange={(e) =>
                    setUserInputs((prev) => ({ ...prev, [index]: e.target.value.trim().toLowerCase() }))
                  }
                  placeholder={`Word ${index + 1}`}
                />
              </div>
            ))}
          </div>
          {error && <p className="text-red-500 text-sm text-center mt-2">{error}</p>}
          <div className="mt-6">
            <Button fullWidth type="button" onClick={handleVerify}>
              Verify & Complete Signup
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignUpForm;