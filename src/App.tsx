import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import LivestockPage from './pages/LivestockPage';
import StaffPage from './pages/StaffPage';
import ProfilePage from './pages/ProfilePage';
import HelpPage from './pages/HelpPage';
import TermsPage from './pages/TermsPage';
import SettingsPage from './pages/SettingsPage';
import InventoryPage from './pages/InventoryPage';
import ReportsPage from './pages/ReportsPage';
import CropsPage from './pages/CropsPage';
import FeedingPage from './pages/FeedingPage';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import ForgotPasswordPage from './pages/auth/ForgotPasswordPage';
import ResetPasswordPage from './pages/auth/ResetPasswordPage';
import AdminDashboard from './pages/AdminDashboard';

const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  // Changed to true for development/testing
  const [isAuthenticated] = useState(true);
  const [isAdmin] = useState(false); // Add this for admin check

  if (!isAuthenticated) {
    return (
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="*" element={<LoginPage />} />
        </Routes>
      </Router>
    );
  }

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <Header onMenuClick={() => setSidebarOpen(true)} />
        <main className="lg:pl-64 pt-16">
          <div className="max-w-screen-2xl mx-auto p-4">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/livestock" element={<LivestockPage />} />
              <Route path="/staff" element={<StaffPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/help" element={<HelpPage />} />
              <Route path="/terms" element={<TermsPage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/inventory" element={<InventoryPage />} />
              <Route path="/reports" element={<ReportsPage />} />
              <Route path="/crops" element={<CropsPage />} />
              <Route path="/feeding" element={<FeedingPage />} />
              {isAdmin && <Route path="/admin" element={<AdminDashboard />} />}
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  );
};

export default App;