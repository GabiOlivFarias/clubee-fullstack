// src/components/Login.jsx
import React from 'react';
import './Login.css';

function Login() {
  const handleGoogleLogin = () => {
    //window.location.href = "http://localhost:3001/auth/google";
    //PARA RODAR LOCAL, descomente a linha de cima e comente a linha de baixo
    window.location.href = "/auth/logout";
  };

  return (
    <div className="login-form-container">
        <h2 className="login-title">Bem-vindo(a) à Colmeia Clubee!</h2>
        <p className="login-subtitle">Faça parte da nossa comunidade na Escola Abel.</p>
        <button onClick={handleGoogleLogin} className="login-button google-btn">
            <img src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" alt="Google Logo" />
            Entrar com Google
        </button>
    </div>
  );
}

export default Login;
