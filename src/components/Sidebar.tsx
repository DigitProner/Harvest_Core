import React, { useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Home, 
  CircleUser, 
  ClipboardList, 
  Settings, 
  ChevronRight, 
  Beef,
  HelpCircle,
  FileText,
  LogOut,
  Sun,
  Moon,
  Package,
  X,
  Wheat,
  Utensils
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const sidebarRef = useRef<HTMLDivElement>(null);
  const [isDark, setIsDark] = React.useState(false);
  
  const menuItems = [
    { icon: Home, text: 'Dashboard', path: '/' },
    { icon: Beef, text: 'Livestock', path: '/livestock' },
    { icon: Package, text: 'Inventory', path: '/inventory' },
    { icon: Wheat, text: 'Crops', path: '/crops' },
    { icon: Utensils, text: 'Feeding', path: '/feeding' },
    { icon: CircleUser, text: 'Staff', path: '/staff' },
    { icon: ClipboardList, text: 'Reports', path: '/reports' },
    { icon: Settings, text: 'Settings', path: '/settings' }
  ];

  const handleLogout = () => {
    console.log('Logging out...');
  };

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  // Handle clicks outside sidebar on mobile
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div 
        ref={sidebarRef} 
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-200 shadow-sm transform lg:transform-none lg:opacity-100 transition-all duration-300 ${
          isOpen ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0 lg:translate-x-0'
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
            <div className="flex items-center gap-2">
              <img src="/logo.svg" alt="Logo" className="h-8 w-8" />
              <span className="text-xl font-bold text-gray-900">Harvest Core</span>
            </div>
            <button 
              onClick={onClose}
              className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg lg:hidden"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
            {menuItems.map((item, index) => (
              <Link
                key={index}
                to={item.path}
                className={`flex items-center px-2 py-3 rounded-lg text-sm font-medium transition-colors ${
                  location.pathname === item.path
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
                onClick={() => onClose()}
              >
                <item.icon className="h-5 w-5 mr-3" />
                <span className="flex-1">{item.text}</span>
                <ChevronRight className="h-4 w-4" />
              </Link>
            ))}
          </nav>

          {/* User Profile Section */}
          <div className="px-4 py-4 border-t border-gray-200">
            <div className="flex items-center gap-3 mb-6">
              <button 
                onClick={() => {
                  navigate('/profile');
                  onClose();
                }}
                className="flex items-center flex-1 gap-3 p-2 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                  <CircleUser className="h-6 w-6 text-gray-500" />
                </div>
                <div className="text-left">
                  <div className="text-sm font-medium text-gray-900">John Farmer</div>
                  <div className="text-xs text-gray-500">Farm Owner</div>
                </div>
              </button>
              <div className="flex items-center gap-2">
                <button 
                  onClick={toggleTheme}
                  className="p-1.5 hover:bg-gray-100 rounded-lg"
                  title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
                >
                  {isDark ? (
                    <Sun className="h-4 w-4 text-gray-500" />
                  ) : (
                    <Moon className="h-4 w-4 text-gray-500" />
                  )}
                </button>
                <button 
                  onClick={handleLogout}
                  className="p-1.5 hover:bg-gray-100 rounded-lg"
                  title="Logout"
                >
                  <LogOut className="h-4 w-4 text-gray-500" />
                </button>
              </div>
            </div>

            {/* Help and Terms Links */}
            <div className="flex items-center justify-between text-xs text-gray-500">
              <button 
                onClick={() => {
                  navigate('/help');
                  onClose();
                }}
                className="flex items-center gap-1 hover:text-gray-700"
              >
                <HelpCircle className="h-3 w-3" />
                Help
              </button>
              <span className="text-gray-300">|</span>
              <button 
                onClick={() => {
                  navigate('/terms');
                  onClose();
                }}
                className="flex items-center gap-1 hover:text-gray-700"
              >
                <FileText className="h-3 w-3" />
                Terms
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;