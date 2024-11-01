import React from 'react';
import './index.css';

function Signup({ handleBackToLogin }) {
  return (
    <div className="signup-container">
      <img src="login_logo.png" alt="Logo" className="signup-logo" />
      <h2>Cadastro</h2>
      <p className="welcome-message">Crie sua conta para começar a gerenciar suas finanças!</p>
      <form>
        <div className="input-container">
          <input type="text" className="custom-input" placeholder="Nome" required />
          <span className="input-icon user-icon"></span>
        </div>
        <div className="input-container">
          <input type="email" className="custom-input" placeholder="Email" required />
          <span className="input-icon email-icon"></span>
        </div>
        <div className="input-container">
          <input type="password" className="custom-input" placeholder="Senha" required />
          <span className="input-icon password-icon"></span>
        </div>
        <button type="submit" className="signup-button">Cadastrar</button>
      </form>
      <div className="signup-links">
        <a href="#" onClick={handleBackToLogin}>Já tem uma conta? Faça login</a>
      </div>
    </div>
  );
}

export default Signup;
