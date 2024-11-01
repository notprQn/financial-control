import React from 'react';
import './index.css';

function Login({ handleLogin, handleSignup, handleForgotPassword }) {
  return (
    <div className="login-container">
      <img src="login_logo.png" alt="Logo" className="login-logo" /> {/* Ajustando a logo aqui */}
      <h2>Login</h2>
      <p className="welcome-message">Bem-vindo ao Portal de Finanças. Gerencie seu dinheiro com sabedoria!</p>
      <form onSubmit={(e) => {
        e.preventDefault();
        handleLogin();
      }}>
        <div className="input-container">
          <input type="text" className="custom-input" placeholder="Usuário" required />
          <span className="input-icon user-icon"></span>
        </div>
        <div className="input-container">
          <input type="password" className="custom-input" placeholder="Senha" required />
          <span className="input-icon password-icon"></span>
        </div>
        <button type="submit" className="login-button">Entrar</button>
      </form>
      <div className="login-links">
        <a href="#" onClick={handleForgotPassword}>Esqueci minha senha</a> | <a href="#" onClick={handleSignup}>Cadastre-se</a>
      </div>
    </div>
  );
}

export default Login;
