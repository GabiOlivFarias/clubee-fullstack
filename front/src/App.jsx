import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import ColmeiasPage from './pages/ColmeiasPage';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // O estado das comunidades vive aqui
  const [communities, setCommunities] = useState(() => {
    const saved = localStorage.getItem('clubee_communities');
    return saved ? JSON.parse(saved) : [
        { id: 1, name: 'Odeio Acordar Cedo 😴', members: 3, memberList: [] },
        { id: 2, name: 'Time de Futsal ⚽', members: 12, memberList: [] },
    ];
  });

  // Salva as comunidades no localStorage sempre que elas mudam
  useEffect(() => {
    localStorage.setItem('clubee_communities', JSON.stringify(communities));
  }, [communities]);

  // Verifica o status do login quando o app carrega
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/user/me", { credentials: 'include' });
        //PARA RODAR DEPLOYADO, descomente a linha abaixo e comente a de cima
        //const response = await fetch("/api/user/me", { credentials: 'include' });
        const data = await response.json();
        if (data.success) setUser(data.user);
      } catch (error) { console.error("Backend não está rodando ou falhou:", error); } 
      finally { setLoading(false); }
    };
    checkLoginStatus();
  }, []);

  const handleLogout = () => {
    setUser(null);
    window.location.href = "http://localhost:3001/auth/logout";
    //PARA RODAR DEPLOYADO, descomente a linha abaixo e comente a de cima
    //window.location.href = "/auth/logout";
  };

  const handleCreateCommunity = (name) => {
    const newCommunity = {
        id: Date.now(),
        name: name,
        members: 1,
        memberList: [user.displayName]
    };
    setCommunities(prev => [...prev, newCommunity]);
  };
  
  const handleJoinCommunity = (communityId) => {
      setCommunities(prev => prev.map(community => {
          if (community.id === communityId && !community.memberList.includes(user.displayName)) {
              return {
                  ...community,
                  members: community.members + 1,
                  memberList: [...community.memberList, user.displayName]
              };
          }
          return community;
      }));
  };

  if (loading) { 
    return <div className="loading-screen"><h1>Carregando...</h1></div>; 
  }

  return (
    <Routes>
      <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <LoginPage />} />
      <Route 
        path="/dashboard" 
        element={user ? <DashboardPage user={user} onLogout={handleLogout} /> : <Navigate to="/login" />} 
      />
      <Route 
        path="/colmeias"
        element={
            user ? (
                <ColmeiasPage 
                    communities={communities} 
                    currentUser={user}
                    onCreateCommunity={handleCreateCommunity} 
                    onJoinCommunity={handleJoinCommunity}
                />
            ) : ( <Navigate to="/login" /> )
        }
      />
      <Route path="*" element={<Navigate to={user ? "/dashboard" : "/login"} />} />
    </Routes>
  );
}

export default App;
