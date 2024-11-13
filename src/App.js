import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { ReactComponent as AlimentacaoIcon } from './icons/food.svg';
import { ReactComponent as TransporteIcon } from './icons/transport.svg';
import { ReactComponent as MoradiaIcon } from './icons/house.svg';
import Select from 'react-select';
import Login from './Login';
import Signup from './Signup';
import ForgotPassword from './ForgotPassaword';
import { jsPDF } from 'jspdf';
import * as XLSX from 'xlsx';
import './App.css';

function App() {
  const [bankOptions, setBankOptions] = useState([]);
  const [registeredBanks, setRegisteredBanks] = useState([]);
  const [selectedBank, setSelectedBank] = useState(null);
  const [saldoInput, setSaldoInput] = useState('');
  const [saldoTotal, setSaldoTotal] = useState(0);
  const [activeUsers, setActiveUsers] = useState(0);
  const [contasAPagar, setContasAPagar] = useState([]);
  const [contasAReceber, setContasAReceber] = useState([]);
  const [saldoData, setSaldoData] = useState([]);
  const [fluxoDeCaixaData, setFluxoDeCaixaData] = useState([]);
  const [timeFilter, setTimeFilter] = useState('mensal');
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Estado de autenticação
  const [isSignup, setIsSignup] = useState(false); // Estado para alternar entre Login e Signup
  const [isForgotPassword, setIsForgotPassword] = useState(false); // Estado para alternar para Esqueci Minha Senha

  useEffect(() => {
    async function fetchBanks() {
      setBankOptions([
        { value: 'itau', label: 'Itaú', logo: 'https://logo.clearbit.com/itau.com.br' },
        { value: 'bradesco', label: 'Bradesco', logo: 'https://logo.clearbit.com/bradesco.com.br' },
        { value: 'santander', label: 'Santander', logo: 'https://logo.clearbit.com/santander.com.br' },
        { value: 'caixa', label: 'Caixa Econômica Federal', logo: 'https://logo.clearbit.com/caixa.gov.br' },
        { value: 'bancodobrasil', label: 'Banco do Brasil', logo: 'https://logo.clearbit.com/bb.com.br' },
        { value: 'nubank', label: 'Nubank', logo: 'https://logo.clearbit.com/nubank.com.br' },
        { value: 'bancointer', label: 'Banco Inter', logo: 'https://logo.clearbit.com/bancointer.com.br' },
        { value: 'original', label: 'Banco Original', logo: 'https://logo.clearbit.com/original.com.br' },
        { value: 'mercadopago', label: 'Mercado Pago', logo: 'https://logo.clearbit.com/mercadopago.com.br' },
        { value: 'c6bank', label: 'C6 Bank', logo: 'https://logo.clearbit.com/c6bank.com.br' },
        { value: 'banrisul', label: 'Banrisul', logo: 'https://logo.clearbit.com/banrisul.com.br' },
        { value: 'bmg', label: 'Banco BMG', logo: 'https://logo.clearbit.com/bancobmg.com.br' },
        { value: 'btg', label: 'BTG Pactual', logo: 'https://logo.clearbit.com/btgpactual.com' },
        { value: 'citibank', label: 'Citibank', logo: 'https://logo.clearbit.com/citibank.com' },
        { value: 'sicoob', label: 'Sicoob', logo: 'https://logo.clearbit.com/sicoob.com.br' },
        { value: 'sicredi', label: 'Sicredi', logo: 'https://logo.clearbit.com/sicredi.com.br' },
      ]);
    }
    fetchBanks();
  }, []);

  const handleAddBank = () => {
    if (selectedBank) {
      const isBankAlreadyRegistered = registeredBanks.some(bank => bank.value === selectedBank.value);
      if (isBankAlreadyRegistered) {
        alert('Este banco já está registrado.');
      } else {
        const saldo = saldoInput ? parseFloat(saldoInput) : 1000;
        setRegisteredBanks([...registeredBanks, { ...selectedBank, saldo }]);
        setSaldoInput('');
        setSelectedBank(null);
      }
    }
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text('Relatório Financeiro', 10, 10);

    registeredBanks.forEach((bank, index) => {
      doc.text(
        `Banco: ${bank.label} - Saldo: R$ ${bank.saldo.toFixed(2)}`,
        10,
        20 + index * 10
      );
    });

    doc.text(`Saldo Total: R$ ${saldoTotal.toFixed(2)}`, 10, 20 + registeredBanks.length * 10);
    doc.save('Relatorio_Financeiro.pdf');
  };

  // Função para exportar para Excel
  const exportToExcel = () => {
    const worksheetData = registeredBanks.map((bank) => ({
      Banco: bank.label,
      Saldo: bank.saldo.toFixed(2),
    }));

    worksheetData.push({ Banco: 'Saldo Total', Saldo: saldoTotal.toFixed(2) });

    const worksheet = XLSX.utils.json_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Relatório Financeiro');
    XLSX.writeFile(workbook, 'Relatorio_Financeiro.xlsx');
  };

  useEffect(() => {
    const total = registeredBanks.reduce((acc, bank) => acc + parseFloat(bank.saldo || 0), 0);
    setSaldoTotal(total);
  }, [registeredBanks]);


  useEffect(() => {
    const interval = setInterval(() => {
      setActiveUsers(Math.floor(Math.random() * 100));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const applyTimeFilter = () => {
    let filteredSaldoData = [];
    let filteredFluxoDeCaixaData = [];

    switch (timeFilter) {
      case 'diario':
        filteredSaldoData = [
          { date: '01/10', saldo: saldoTotal - 100 },
          { date: '02/10', saldo: saldoTotal - 200 },
          { date: '03/10', saldo: saldoTotal - 300 },
        ];
        filteredFluxoDeCaixaData = [
          { date: '01/10', entradas: saldoTotal, saidas: 100 },
          { date: '02/10', entradas: saldoTotal - 100, saidas: 200 },
          { date: '03/10', entradas: saldoTotal - 200, saidas: 300 },
        ];
        break;
      case 'semanal':
        filteredSaldoData = [
          { date: 'Semana 1', saldo: saldoTotal - 400 },
          { date: 'Semana 2', saldo: saldoTotal - 600 },
          { date: 'Semana 3', saldo: saldoTotal - 800 },
        ];
        filteredFluxoDeCaixaData = [
          { date: 'Semana 1', entradas: saldoTotal, saidas: 400 },
          { date: 'Semana 2', entradas: saldoTotal - 200, saidas: 600 },
          { date: 'Semana 3', entradas: saldoTotal - 400, saidas: 800 },
        ];
        break;
      case 'mensal':
        filteredSaldoData = [
          { date: 'Janeiro', saldo: saldoTotal - 400 },
          { date: 'Fevereiro', saldo: saldoTotal - 600 },
          { date: 'Março', saldo: saldoTotal - 800 },
        ];
        filteredFluxoDeCaixaData = [
          { date: 'Janeiro', entradas: saldoTotal, saidas: 400 },
          { date: 'Fevereiro', entradas: saldoTotal - 200, saidas: 600 },
          { date: 'Março', entradas: saldoTotal - 400, saidas: 800 },
        ];
        break;
      case 'anual':
        filteredSaldoData = [
          { date: '2022', saldo: saldoTotal - 1200 },
          { date: '2023', saldo: saldoTotal - 800 },
          { date: '2024', saldo: saldoTotal - 600 },
        ];
        filteredFluxoDeCaixaData = [
          { date: '2022', entradas: saldoTotal, saidas: 1200 },
          { date: '2023', entradas: saldoTotal - 400, saidas: 800 },
          { date: '2024', entradas: saldoTotal - 200, saidas: 600 },
        ];
        break;
      default:
        break;
    }
    setSaldoData(filteredSaldoData);
    setFluxoDeCaixaData(filteredFluxoDeCaixaData);
  };

  useEffect(() => {
    applyTimeFilter();
  }, [timeFilter, saldoTotal]);

  const handleExpense = (amount) => {
    setSaldoTotal((prevSaldo) => prevSaldo - amount);
  };

  useEffect(() => {
    const newSaldoData = [
      { date: '01/10', saldo: saldoTotal - 400 },
      { date: '05/10', saldo: saldoTotal - 600 },
      { date: '10/10', saldo: saldoTotal - 800 },
      { date: '15/10', saldo: saldoTotal - 1000 },
      { date: '20/10', saldo: saldoTotal - 1200 },
    ];
    setSaldoData(newSaldoData);

    const newFluxoDeCaixaData = [
      { date: '01/10', entradas: saldoTotal, saidas: 1500 },
      { date: '05/10', entradas: saldoTotal - 200, saidas: 1600 },
      { date: '10/10', entradas: saldoTotal - 400, saidas: 1300 },
      { date: '15/10', entradas: saldoTotal - 600, saidas: 1800 },
      { date: '20/10', entradas: saldoTotal - 800, saidas: 1500 },
    ];
    setFluxoDeCaixaData(newFluxoDeCaixaData);
  }, [saldoTotal]);

  const receitasData = [
    { period: 'Janeiro', receita: 5000 },
    { period: 'Fevereiro', receita: 5200 },
    { period: 'Março', receita: 5400 },
  ];
  const despesasData = [
    { period: 'Janeiro', despesa: 3000 },
    { period: 'Fevereiro', despesa: 3500 },
    { period: 'Março', despesa: 3300 },
  ];
  const lucroData = receitasData.map((rec, idx) => ({
    ...rec,
    despesa: despesasData[idx].despesa,
    lucro: rec.receita - despesasData[idx].despesa,
  }));

  // Função para simular login
  const handleLogin = () => {
    // Lógica de autenticação
    setIsLoggedIn(true);
  };

  // Função para alternar para a tela de signup
  const handleSignup = () => {
    setIsSignup(true);
  };

  // Função para voltar para a tela de login
  const handleBackToLogin = () => {
    setIsSignup(false);
    setIsForgotPassword(false);
  };

  // Função para alternar para a tela de esqueci minha senha
  const handleForgotPassword = () => {
    setIsForgotPassword(true);
  };

  return (
    <div className="container">
      {isLoggedIn ? (
        <>
      <header className="personal-info">
        <h1>Bem-vindo, [Nome do Usuário]</h1>
        <p>Saldo Total: R$ {saldoTotal.toFixed(2)}</p>
        <p>Usuários Ativos: {activeUsers}</p>
      </header>

      <section className="add-bank-section">
        <h2>Adicionar Banco</h2>
        <div className='input-row'>
          <Select
            options={bankOptions}
            getOptionLabel={(option) => (
              <div className="custom-option">
                <img src={option.logo} alt={option.label} width={20} height={20} style={{ marginRight: 10 }} />
                {option.label}
              </div>
            )}
            getOptionValue={(option) => option.value}
            onChange={(option) => setSelectedBank(option)}
            value={selectedBank}
          />
          <input className="custom-input" 
            type="number" 
            placeholder="Saldo inicial" 
            value={saldoInput} 
            onChange={(e) => setSaldoInput(e.target.value)} 
          />
        </div>
        <button onClick={handleAddBank}>Adicionar Banco</button>
      </section>

      <section className="bank-section">
        <h2>Bancos Registrados</h2>
        <div className="banks">
          {registeredBanks.map((bank, index) => (
            <div key={index} className="bank">
              <img src={bank.logo} alt={bank.label} width={50} height={50} />
              <h3>{bank.label}</h3>
              <p>Saldo: R$ {bank.saldo.toFixed(2)}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="expenses-section">
          <h2>Gastos Mensais</h2>
          <div className="expenses">
            <div className="expense">
              <AlimentacaoIcon width={50} height={50} />
              <p>Alimentação: R$ 500,00</p>
              <button onClick={() => handleExpense(500)}>Pagar</button>
            </div>
            <div className="expense">
              <TransporteIcon width={50} height={50} />
              <p>Transporte: R$ 300,00</p>
              <button onClick={() => handleExpense(300)}>Pagar</button>
            </div>
            <div className="expense">
              <MoradiaIcon width={50} height={50} />
              <p>Moradia: R$ 1200,00</p>
              <button onClick={() => handleExpense(1200)}>Pagar</button>
            </div>
          </div>
        </section>

      <div className="export-buttons">
        <button onClick={exportToPDF}>Exportar para PDF</button>
        <button onClick={exportToExcel}>Exportar para Excel</button>
      </div>

      <section className="chart-section">
        <h2>Filtro de Gráficos</h2>
        <div className="time-filter">
          <label>Visualizar por:</label>
          <select onChange={(e) => setTimeFilter(e.target.value)} value={timeFilter}>
            <option value="diario">Diário</option>
            <option value="semanal">Semanal</option>
            <option value="mensal">Mensal</option>
            <option value="anual">Anual</option>
          </select>
        </div>

        <h2>Saldo Durante o Período</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={saldoData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="saldo" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </section>

      <section className="cashflow-section">
        <h2>Fluxo de Caixa</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={fluxoDeCaixaData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="entradas" stroke="#8884d8" />
            <Line type="monotone" dataKey="saidas" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </section>

      <section className="chart-section">
        <h2>Saldo Durante o Mês</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={saldoData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="saldo" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </section>

      <section className="cashflow-section">
        <h2>Fluxo de Caixa</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={fluxoDeCaixaData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="entradas" stroke="#8884d8" />
            <Line type="monotone" dataKey="saidas" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </section>

      <section className="financial-summary-section">
        <h2>Receitas Totais</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={receitasData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="period" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="receita" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </section>

      <section className="financial-summary-section">
        <h2>Despesas Totais</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={despesasData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="period" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="despesa" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </section>

      <section className="profit-section">
        <h2>Lucro Líquido</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={lucroData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="period" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="lucro" stroke="#ffc658" />
          </LineChart>
        </ResponsiveContainer>
      </section>

      <section className="accounts-section">
        <h2>Contas a Pagar e a Receber</h2>
        <div className="account-summary">
          <p>Contas a Pagar: {contasAPagar.length}</p>
          <p>Contas a Receber: {contasAReceber.length}</p>
        </div>
      </section>
      </>
      ) : isForgotPassword ? (
        // Mostra a tela de "Esqueci Minha Senha" se isForgotPassword for true
        <ForgotPassword handleBackToLogin={handleBackToLogin} />
      ) : isSignup ? (
        // Mostra a tela de cadastro se isSignup for true
        <Signup handleBackToLogin={handleBackToLogin} />
      ) : (
        // Se o usuário não está logado, mostra a tela de login
        <Login 
        handleLogin={handleLogin} 
        handleSignup={handleSignup} 
        handleForgotPassword={handleForgotPassword} 
        />
      )}
    </div>
  );
}

export default App;
