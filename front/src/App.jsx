// src/App.jsx
import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/user/me", { credentials: 'include' });
        const data = await response.json();
        if (data.success) {
          setUser(data.user);
        }
      } catch (error) {
        console.error("Backend não está rodando ou falhou:", error);
      } finally {
        setLoading(false);
      }
    };
    checkLoginStatus();
  }, []);

  const handleLogout = () => {
    setUser(null);
    window.location.href = "http://localhost:3001/auth/logout";
  };

  if (loading) {
    return <div className="loading-screen"><h1>Carregando...</h1></div>;
  }

  return (
    <Routes>
      <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <LoginPage />} />
      <Route path="/dashboard" element={user ? <DashboardPage user={user} onLogout={handleLogout} /> : <Navigate to="/login" />} />
      {/* Rota Padrão: vai para o dashboard se logado, senão para o login */}
      <Route path="*" element={<Navigate to={user ? "/dashboard" : "/login"} />} />
    </Routes>
  );
}

export default App;
