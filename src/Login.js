import React from 'react';
import './index.css';

function Login({ handleLogin }) {
  return (
    <div className="login-container">
      <img src="login_logo.png" alt="Logo" className="login-logo" />
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
        <a href="#">Esqueci minha senha</a> | <a href="#">Cadastre-se</a>
      </div>
    </div>
  );
}

export default Login;