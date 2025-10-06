import './styles/globals.css';
import { useAuth } from './hooks/useAuth';
import LoadingSpinner from './components/ui/LoadingSpinner';
import ErrorDisplay from './components/ui/ErrorDisplay';
import Dashboard from './pages/Dashboard';
import LoginPage from './pages/LoginPage';

function App() {
  const {user, loading, error, login, logout, clearError } = useAuth();
  
  // Loading state
  if(loading){
    return (
      <LoadingSpinner
        message='Startar'
        fullScreen={true}
      />
    );
  }

  // Error State
  if(error) {
    return (
      <ErrorDisplay
        error={error}
        title='Inloggningsfel'
        onRetry={() => window.location.reload()}
        onDismiss={clearError}
        fullScreen={true}
      />
    );
  }

  // Main App
  return (
    <div className='App'>
      {user ? (
        <Dashboard
          user={user}
          onLogout={logout}
        />
      ) : (
        <LoginPage
          onLoginSucces={login}
        />
      )}
    </div>
  );
};

export default App;