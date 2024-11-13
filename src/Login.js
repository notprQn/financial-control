import React from 'react';
import './index.css';

function Login({ handleLogin, handleSignup, handleForgotPassword }) {
  return (
    <div className="login-container">
      <img src="logo_login.png" alt="Logo" className="login-logo" />
      <h2>Bem-vindo à Insight Company. Gerencie seu dinheiro com sabedoria!</h2>
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
