// src/pages/DashboardPage.jsx

import React from 'react';
import './DashboardPage.css'; // Vamos criar este estilo

function DashboardPage({ user, onLogout }) {
  return (
    <div className="dashboard-container">
      
      {/* O NOVO BANNER DE BOAS-VINDAS */}
      <header className="welcome-banner">
        <div className="welcome-text">
          <img src={user.photos[0].value} alt="Foto de perfil" className="profile-pic"/>
          <div className="text-content">
            <h2>Bem-vindo(a) de volta, {user.displayName}!</h2>
            <p>Felizes em te ver na colmeia novamente.</p>
          </div>
        </div>
        <button onClick={onLogout} className="logout-button">Sair</button>
      </header>
      
      <main className="dashboard-main">
        <h3>O que você quer fazer hoje?</h3>
        <div className="action-grid">
          {/* Usando os nomes temáticos com ícones */}
          <div className="action-card"><span>🐝</span> Compartilhar um Zunzum</div>
          <div className="action-card"><span>🍯</span> Dar Néctar</div>
          <div className="action-card"><span>🏘️</span> Ver Colmeias</div>
          <div className="action-card"><span>👑</span> Abelha Rainha da Semana</div>
          <div className="action-card"><span>📚</span> Ver Aulas Anteriores</div>
          <div className="action-card"><span>📝</span> Conteúdo de Prova</div>
        </div>
      </main>
    </div>
  );
}

export default DashboardPage;
