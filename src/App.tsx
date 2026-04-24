import React from 'react';
import { useAuth } from './hooks/useAuth';
import LoginForm from './components/LoginForm';
import Navigation from './components/Navigation';
import HomePage from './pages/HomePage';
import DownloadPage from './pages/DownloadPage';
import RulesPage from './pages/RulesPage';
import StandingsPage from './pages/StandingsPage';
import CoppaPage from './pages/CoppaPage';
import PlayoffPage from './pages/PlayoffPage';
import CalendarioPage from './pages/CalendarioPage';
import HighlightsPage from './pages/HighlightsPage';
import AdminPage from './pages/AdminPage';

// Estivo New Pages
import EstivoStandingsPage from './pages/EstivoStandingsPage';
import EstivoTabellonePage from './pages/EstivoTabellonePage';
import EstivoCalendarioPage from './pages/EstivoCalendarioPage';

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
      
      // Invernale
      case 'invernale-standings':
        return <StandingsPage isAdmin={user.isAdmin} />;
      case 'invernale-coppa':
        return <CoppaPage />;
      case 'invernale-playoff':
        return <PlayoffPage />;
      case 'invernale-calendario':
        return <CalendarioPage />;
      
      // Estivo
      case 'estivo-standings':
        return <EstivoStandingsPage isAdmin={user.isAdmin} />;
      case 'estivo-tabellone':
        return <EstivoTabellonePage />;
      case 'estivo-calendario':
        return <EstivoCalendarioPage />;

      case 'highlights':
        return <HighlightsPage isAdmin={user.isAdmin} />;
      case 'admin':
        return user.isAdmin ? <AdminPage /> : <HomePage />;
      default:
        return <HomePage />;
    }
  };

  const isEstivo = activeSection.startsWith('estivo-');
  const isInvernale = activeSection.startsWith('invernale-');

  const themeClasses = isEstivo 
    ? 'bg-gradient-to-br from-orange-50 via-yellow-50 to-orange-100' 
    : isInvernale 
      ? 'bg-gradient-to-br from-white via-blue-50 to-cyan-100' 
      : 'bg-slate-50';

  return (
    <div className={`min-h-screen ${themeClasses} flex transition-all duration-700`}>
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