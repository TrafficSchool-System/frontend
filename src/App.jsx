// src/App.jsx
import './styles/globals.css';
import { Routes, Route } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';

import LoadingSpinner from './components/ui/LoadingSpinner';
import ErrorDisplay from './components/ui/ErrorDisplay';

import MainLayout from './components/layout/MainLayout';
import Dashboard from './pages/Dashboard';
import LoginPage from './pages/LoginPage';
import QuizPage from './pages/quizPage';

function App() {
  const { user, loading, error, login, logout, clearError } = useAuth();

  // Loading state
  if (loading) {
    return (
      <LoadingSpinner
        message="Startar"
        fullScreen={true}
      />
    );
  }

  // Error State
  if (error) {
    return (
      <ErrorDisplay
        error={error}
        title="Inloggningsfel"
        onRetry={() => window.location.reload()}
        onDismiss={clearError}
        fullScreen={true}
      />
    );
  }

  return (
    <div className="App">
      {user ? (
        <Routes>

          {/* === ALLA SIDOR INOM DENNA ROUTE FÅR SIDEMENU === */}
          <Route element={<MainLayout onLogout={logout} />}>

            <Route path="/" element={<Dashboard user={user} />} />
            <Route path="/quiz/practice" element={<QuizPage />} />

            {/* framtida sidor – alla får SideMenu */}
            {/* <Route path="/profile" element={<ProfilePage />} /> */}
            {/* <Route path="/results" element={<ResultsPage />} /> */}

          </Route>

        </Routes>
      ) : (
        <LoginPage onLoginSuccess={login} />
      )}
    </div>
  );
}

export default App;
