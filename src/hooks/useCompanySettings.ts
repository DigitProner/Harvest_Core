import { useState, useEffect } from 'react';

interface CompanySettings {
  name: string;
  email: string;
  phone: string;
  website: string;
  description: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  location: {
    latitude: number;
    longitude: number;
  };
  farmDetails: {
    size: string;
    established: string;
    employeeCount: string;
    farmType: string;
    certifications: string[];
  };
  preferences: {
    timezone: string;
    dateFormat: string;
    measurementSystem: string;
    currency: string;
    language: string;
  };
}

export const useCompanySettings = () => {
  const [settings, setSettings] = useState<CompanySettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/companies/settings');
      if (!response.ok) {
        throw new Error('Failed to fetch company settings');
      }
      const data = await response.json();
      setSettings(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const updateSettings = async (newSettings: CompanySettings) => {
    try {
      setLoading(true);
      const response = await fetch('/api/companies/settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newSettings),
      });
      
      if (!response.ok) {
        throw new Error('Failed to update company settings');
      }
      
      setSettings(newSettings);
      setError(null);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      return false;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  return {
    settings,
    loading,
    error,
    updateSettings,
    refreshSettings: fetchSettings,
  };
};