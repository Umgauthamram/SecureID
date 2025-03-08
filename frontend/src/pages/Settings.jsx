import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Fingerprint } from "lucide-react";
import Button from '../components/Button';
import Header from '../components/Header';

const Settings = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passcode, setPasscode] = useState('');
  const [message, setMessage] = useState('');
  const [subscription, setSubscription] = useState({
    plan: '',
    duration: '',
    expiry: '',
  });
  const [recoveryPassphrase, setRecoveryPassphrase] = useState('');
  const [viewPassphrase, setViewPassphrase] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch('/api/user/profile', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });
        const data = await res.json();
        if (data) {
          setUsername(data.username || '');
          setPasscode(data.passcode || '');
          setRecoveryPassphrase(
            data.recoveryPassphrase ||
            "apple banana cherry diamond elephant forest guitar harvest island jaguar kangaroo lemon mountain"
          );
          setSubscription(
            data.subscription || {
              plan: 'Premium',
              duration: 'Monthly',
              expiry: '2024-12-31',
            }
          );
        }
      } catch (error) {
        console.error('Failed to load profile:', error);
      }
    };
    fetchProfile();
  }, []);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch('/api/user/updateprofile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username}),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage('Profile updated successfully.');
      } else {
        setMessage(data.error || 'Profile update failed.');
      }
    } catch (error) {
      console.error(error);
      setMessage('Profile update failed.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action is irreversible.')) {
      try {
        const res = await fetch('/api/user/delete-account', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
        });
        const data = await res.json();
        if (res.ok) {
          alert('Account deleted successfully.');
          navigate('/signup');
        } else {
          alert(data.error || 'Failed to delete account.');
        }
      } catch (error) {
        console.error(error);
        alert('An error occurred while deleting your account.');
      }
    }
  };

  const handleChangePlan = () => {
    navigate('/subscription');
  };

  const handleCancelSubscription = async () => {
    if (window.confirm('Are you sure you want to cancel your subscription?')) {
      setIsLoading(true);
      try {
        const res = await fetch('/api/subscription/cancel', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
        });
        const data = await res.json();
        if (res.ok) {
          setMessage('Subscription cancelled successfully.');
          setSubscription({ plan: 'Free', duration: '', expiry: '' });
        } else {
          setMessage(data.error || 'Failed to cancel subscription.');
        }
      } catch (error) {
        console.error(error);
        setMessage('Failed to cancel subscription.');
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleLogout = () => {

    console.log('Logging out...');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col items-center py-10 relative">
      <div
        className="absolute top-5 left-5 flex items-center space-x-2 cursor-pointer"
        onClick={() => navigate("/")} >

      </div>
      <Header />
      <h1 className="text-4xl font-extrabold mt-20 mb-6">Account Settings</h1>
      {message && (
        <p className="text-green-600 text-center mb-4">{message}</p>
      )}
      <div className="flex flex-col gap-10 w-full max-w-2xl mx-auto">
        <div className="w-full p-6 rounded-xl shadow-lg bg-white text-center transition-all duration-300 hover:bg-gray-50">
          <h2 className="text-2xl font-bold mb-4">Profile Settings</h2>
          <form onSubmit={handleUpdateProfile} className="space-y-3 text-left">
            <div className="space-y-1">
              <p className="text-sm font-medium text-gray-600">Username</p>
              <p className="w-full h-10 px-3 py-2 border rounded-md bg-white text-black">
                
              </p>
            </div>
            <div className="space-y-1">
              <label htmlFor="password" className="text-sm font-medium">Password</label>
              <input
                id="password"
                type="password"
                placeholder="New Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div className="space-y-1">
              <label htmlFor="passcode" className="text-sm font-medium">Passcode</label>
              <input
                id="passcode"
                type="password"
                value={passcode}
                placeholder='New Passcode'
                onChange={(e) => setPasscode(e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <Button type="submit" fullWidth isLoading={isLoading}>Save Changes</Button>
          </form>
          <div className="mt-4">
            <Button type="button" fullWidth variant="destructive" onClick={handleDeleteAccount}>
              Delete Account
            </Button>
          </div>
        </div>
        <div className="w-full p-6 rounded-xl shadow-lg bg-white text-center transition-all duration-300 hover:bg-gray-50">
          <h2 className="text-2xl font-bold mb-4">Subscription Plan</h2>
          <div className="mb-4">
            <p className="text-l font-semibold text-gray-700">Plan: {subscription.plan || "Premium"}</p>
            <p className="text-l font-semibold text-gray-700">Duration: {subscription.duration || "Monthly"}</p>
            <p className="text-l font-semibold text-gray-700">Expires on: {subscription.expiry || "2024-12-31"}</p>
          </div>
          <div className="flex justify-around mt-6">
            <Button type="button" onClick={handleChangePlan}>
              Change Plan
            </Button>
            <Button type="button" variant="destructive" onClick={handleCancelSubscription} isLoading={isLoading}>
              Cancel Plan
            </Button>
          </div>
        </div>

        <div className="w-full p-6 rounded-xl shadow-lg bg-white text-center transition-all duration-300 hover:bg-gray-50 relative">
          <h2 className="text-2xl font-bold mb-4">Recovery Passphrase</h2>
          <p className="text-sm mb-2 text-muted-foreground">
            This 12-word passphrase is vital for account recovery. Please store it securely.
          </p>
          <button
            onClick={() => setViewPassphrase(prev => !prev)}
            className="absolute top-4 right-4 text-xs text-blue-500 hover:underline"
          >
            {viewPassphrase ? "Hide" : "Show"}
          </button>
          <div className={`mt-2 bg-white p-4 rounded-md font-mono text-sm break-words border ${!viewPassphrase ? 'blur-sm select-none' : ''}`}>
            {recoveryPassphrase || "apple banana cherry diamond elephant forest guitar harvest island jaguar kangaroo lemon mountain"}
          </div>
        </div>
        <div className='mt-4 flex justify-center'>
          <button onClick={handleLogout} className="px-4 py-2 bg-red-600 text-white rounded">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

const cn = (...classes) => classes.filter(Boolean).join(' ');

export default Settings;
