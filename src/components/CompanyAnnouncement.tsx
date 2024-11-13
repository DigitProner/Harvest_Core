import React from 'react';
import { Bell, X, AlertTriangle, CheckCircle, Info, AlertCircle } from 'lucide-react';

interface CompanyAnnouncementProps {
  message: string;
  type: 'info' | 'warning' | 'success' | 'error';
  onClose?: () => void;
}

const CompanyAnnouncement = ({ message, type, onClose }: CompanyAnnouncementProps) => {
  const getTypeStyles = () => {
    switch (type) {
      case 'warning':
        return {
          bg: 'bg-yellow-50',
          text: 'text-yellow-800',
          icon: AlertTriangle,
          iconColor: 'text-yellow-400'
        };
      case 'success':
        return {
          bg: 'bg-green-50',
          text: 'text-green-800',
          icon: CheckCircle,
          iconColor: 'text-green-400'
        };
      case 'error':
        return {
          bg: 'bg-red-50',
          text: 'text-red-800',
          icon: AlertCircle,
          iconColor: 'text-red-400'
        };
      default:
        return {
          bg: 'bg-blue-50',
          text: 'text-blue-800',
          icon: Info,
          iconColor: 'text-blue-400'
        };
    }
  };

  const styles = getTypeStyles();
  const Icon = styles.icon;

  return (
    <div className={`${styles.bg} ${styles.text} px-4 py-3`}>
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <Icon className={`h-5 w-5 ${styles.iconColor}`} />
          <p className="text-sm font-medium">{message}</p>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="rounded-md p-1.5 hover:bg-white/20 focus:outline-none"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>
    </div>
  );
};

export default CompanyAnnouncement;