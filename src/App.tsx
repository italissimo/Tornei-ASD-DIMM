import React from 'react';
import { useAuth } from './hooks/useAuth';
import LoginForm from './components/LoginForm';
import Navigation from './components/Navigation';
import HomePage from './pages/HomePage';
import DownloadPage from './pages/DownloadPage';
import RulesPage from './pages/RulesPage';
import StandingsPage from './pages/StandingsPage';
import CoppaPage from './pages/CoppaPage';
import CalendarioPage from './pages/CalendarioPage';
import HighlightsPage from './pages/HighlightsPage';
import AdminPage from './pages/AdminPage';

function App() {
  const { user, login, logout, isLoading } = useAuth();
  const [activeSection, setActiveSection] = React.useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  // Register service worker
  React.useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
        .then((registration) => {
          console.log('SW registered: ', registration);
        })
        .catch((registrationError) => {
          console.log('SW registration failed: ', registrationError);
        });
    }
  }, []);

  if (!user) {
    return <LoginForm onLogin={login} isLoading={isLoading} />;
  }

  const renderContent = () => {
    switch (activeSection) {
      case 'home':
        return <HomePage />;
      case 'download':
        return <DownloadPage />;
      case 'rules':
        return <RulesPage isAdmin={user.isAdmin} />;
      case 'standings':
        return <StandingsPage isAdmin={user.isAdmin} />;
      case 'coppa':
        return <CoppaPage />;
      case 'calendario':
        return <CalendarioPage />;
      case 'highlights':
        return <HighlightsPage isAdmin={user.isAdmin} />;
      case 'admin':
        return user.isAdmin ? <AdminPage /> : <HomePage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <Navigation
        activeSection={activeSection}
        onSectionChange={setActiveSection}
        isAdmin={user.isAdmin}
        onLogout={logout}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />

      <main className="flex-1 lg:ml-64 p-4 lg:p-8 pt-16 lg:pt-8">
        <div className="max-w-7xl mx-auto">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}

export default App;