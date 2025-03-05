import { useEffect } from 'react';
import Header from '@/components/Header';
import Dashboard from '@/components/Dashboard';

const DashboardPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Dashboard | SecureID";
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-28 pb-16 md:pt-24">
        <Dashboard />
      </div>
    </div>
  );
};

export default DashboardPage;