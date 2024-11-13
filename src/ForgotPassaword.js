import React from 'react';
import './index.css';

function ForgotPassword({ handleBackToLogin }) {
  return (
    <div className="forgot-password-container">
      <img src="logo_login.png" alt="Logo" className="forgot-password-logo" />
      <h2>Esqueci Minha Senha</h2>
      <p className="forgot-password-message">Insira seu email para recuperar sua senha.</p>
      <form>
        <div className="forgot-password-input-container">
          <input type="email" className="forgot-password-input" placeholder="Email" required />
          <span className="forgot-password-input-icon forgot-password-email-icon"></span>
        </div>
        <button type="submit" className="forgot-password-button">Enviar</button>
      </form>
      <div className="forgot-password-links">
        <a href="#" onClick={handleBackToLogin}>Voltar para Login</a>
      </div>
    </div>
  );
}

export default ForgotPassword;
