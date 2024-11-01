import React from 'react';
import './index.css';

function ForgotPassword({ handleBackToLogin }) {
  return (
    <div className="login-container">
      <img src="login_logo.png" alt="Logo" className="login-logo" />
      <h2>Esqueci Minha Senha</h2>
      <p className="welcome-message">Digite seu e-mail para receber instruções de recuperação de senha.</p>
      <form onSubmit={(e) => {
        e.preventDefault();
        // Lógica para enviar email de recuperação de senha
      }}>
        <div className="input-container">
          <input type="email" className="custom-input" placeholder="E-mail" required />
          <span className="input-icon email-icon"></span>
        </div>
        <button type="submit" className="login-button">Enviar</button>
      </form>
      <div className="login-links">
        <a href="#" onClick={handleBackToLogin}>Voltar ao Login</a>
      </div>
    </div>
  );
}

export default ForgotPassword;
