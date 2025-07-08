import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { LoadingScreen } from './components/LoadingScreen';
import { LandingPage } from './pages/LandingPage';
import { AdminPage } from './pages/AdminPage';
import { RegistrationPage } from './pages/RegistrationPage';
import { useApp } from './context/AppContext';

// Componente interno que usa o contexto
const AppRoutes: React.FC = () => {
  const { loading } = useApp();

  // Mostrar tela de carregamento enquanto os dados não carregaram
  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <Routes>
      {/* Página principal do evento */}
      <Route path="/" element={<LandingPage />} />
      
      {/* Páginas de inscrição específicas */}
      <Route path="/inscricao-gratuita" element={<RegistrationPage type="gratuita" />} />
      <Route path="/inscricao-premium" element={<RegistrationPage type="paga" />} />
      
      {/* Área administrativa (endpoint oculto) */}
      <Route path="/administrativo" element={<AdminPage />} />
      
      {/* Redirect para página principal se rota não encontrada */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

function App() {
  return (
    <AppProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AppProvider>
  );
}

export default App;