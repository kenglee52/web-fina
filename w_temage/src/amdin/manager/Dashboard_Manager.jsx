import React, { useEffect } from 'react';
import { useAdmin } from '@/context/AdminContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

// Import dashboards
import CreditDashboard from './departments/CreditDashboard';
import FinanceDashboard from './departments/FinanceDashboard';
import HRDashboard from './departments/HRDashboard';
import ITDashboard from './departments/ITDashboard';
import AdministrationDashboard from './departments/AdministrationDashboard';
import RiskManagementDashboard from './departments/RiskManagementDashboard';
import CustomerServiceDashboard from './departments/CustomerServiceDashboard';
import ManagementDashboard from './departments/ManagementDashboard';
import MarketingDashboard from './departments/MarketingDashboard';
import AccountingDashboard from './departments/AccountingDashboard';
import Operation_Dashboard from './departments/Operation_Dashboard';

const Dashboard_Manager = () => {
  const { admin, setAdmin } = useAdmin();
  const navigate = useNavigate();

  
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token || !admin) {
      toast.error("Unauthorized: Please log in");
      localStorage.removeItem("token");
      localStorage.removeItem("admin");
      setAdmin(null);
      navigate("/login_admin", { replace: true });
    }
  }, [admin, navigate, setAdmin]);

  const renderDashboard = () => {
    switch (admin?.department_name) {
      case 'Credit Operations': return <CreditDashboard />;
      case 'Internal Audit': return <FinanceDashboard />;
      case 'People Ogranization': return <HRDashboard />;
      case 'IT': return <ITDashboard />;
      case 'Admin and Customer Service': return <AdministrationDashboard />;
      case 'Risk Management': return <RiskManagementDashboard />;
      case 'Customer Service': return <CustomerServiceDashboard />;
      case 'FINA Management': return <ManagementDashboard />;
      case 'Commercial': return <MarketingDashboard />;
      case 'Accounting and Finance': return <AccountingDashboard />;
      case 'Operations': return <Operation_Dashboard />;
      default: return <div>Department dashboard not found</div>;
    }
  };

  return <div>{renderDashboard()}</div>;
};

export default Dashboard_Manager;
