import React from 'react';
import {
  Home,
  Download,
  BookOpen,
  Trophy,
  Camera,
  LogOut,
  Menu,
  X,
  Settings,
  CalendarDays,
  Award
} from 'lucide-react';

interface NavigationProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  isAdmin: boolean;
  onLogout: () => void;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
}

const Navigation: React.FC<NavigationProps> = ({
  activeSection,
  onSectionChange,
  isAdmin,
  onLogout,
  isMobileMenuOpen,
  setIsMobileMenuOpen
}) => {
  const menuItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'download', label: 'Scarica App', icon: Download },
    { id: 'rules', label: 'Regolamento', icon: BookOpen },
    { id: 'standings', label: 'Classifiche', icon: Trophy },
    { id: 'coppa', label: 'Coppa Italia', icon: Award },
    { id: 'calendario', label: 'Calendario', icon: CalendarDays },
    { id: 'highlights', label: 'Highlights', icon: Camera },
    ...(isAdmin ? [{ id: 'admin', label: 'Admin', icon: Settings }] : [])
  ];

  const handleItemClick = (sectionId: string) => {
    onSectionChange(sectionId);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-lg"
      >
        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <nav className={`
        fixed left-0 top-0 h-full w-64 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white z-40 transform transition-transform duration-300 ease-in-out shadow-2xl
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0
      `}>
        <div className="p-6">
          {/* Logo and Title */}
          <div className="mb-8">
            <div className="flex items-center justify-center mb-4">
              <img
                src="/logo.jpg"
                alt="ASD DIMM Logo"
                className="w-16 h-16 rounded-full object-cover shadow-lg border-2 border-yellow-400"
              />
            </div>
            <h1 className="text-xl font-bold text-center bg-gradient-to-r from-yellow-400 to-yellow-500 bg-clip-text text-transparent">
              ASD DIMM
            </h1>
            <p className="text-xs text-center text-slate-400 mt-1">Tornei di Calcio</p>
          </div>
          
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.id}>
                  <button
                    onClick={() => handleItemClick(item.id)}
                    className={`
                      w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 transform
                      ${activeSection === item.id
                        ? 'bg-gradient-to-r from-yellow-500 to-yellow-600 text-white shadow-lg shadow-yellow-500/30 scale-105'
                        : 'text-slate-300 hover:bg-slate-700/50 hover:text-white hover:translate-x-1'
                      }
                    `}
                  >
                    <Icon size={20} />
                    <span className="font-medium">{item.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>

          <div className="mt-8 pt-8 border-t border-slate-700">
            <button
              onClick={onLogout}
              className="w-full flex items-center space-x-3 px-4 py-3 text-slate-300 hover:bg-red-600 hover:text-white rounded-lg transition-colors"
            >
              <LogOut size={20} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navigation;