import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, AreaChart, Area } from 'recharts';
import { ReactComponent as AlimentacaoIcon } from './icons/food.svg';
import { ReactComponent as TransporteIcon } from './icons/transport.svg';
import { ReactComponent as MoradiaIcon } from './icons/house.svg';
import Select from 'react-select';
import Login from './Login';
import './App.css';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';

function App() {
  const [bankOptions, setBankOptions] = useState([]);
  const [registeredBanks, setRegisteredBanks] = useState([]);
  const [selectedBank, setSelectedBank] = useState(null);
  const [saldoInput, setSaldoInput] = useState('');
  const [saldoTotal, setSaldoTotal] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [contasPagar, setContasPagar] = useState([]);
  const [contasReceber, setContasReceber] = useState([]);
  const [selectedPeriod, setSelectedPeriod] = useState('mensal'); // Filtro de período

  const [usuariosLogadosData, setUsuariosLogadosData] = useState([
    { time: '10:00', users: 5 },
    { time: '11:00', users: 8 },
    { time: '12:00', users: 10 },
    { time: '13:00', users: 12 },
    { time: '14:00', users: 7 },
  ]);

  useEffect(() => {
    async function fetchBanks() {
      setBankOptions([
        { value: 'itau', label: 'Itaú', logo: 'https://logo.clearbit.com/itau.com.br' },
        { value: 'bradesco', label: 'Bradesco', logo: 'https://logo.clearbit.com/bradesco.com.br' },
        { value: 'santander', label: 'Santander', logo: 'https://logo.clearbit.com/santander.com.br' }
      ]);
    }
    fetchBanks();
  }, []);

  const handleAddBank = () => {
    if (selectedBank && saldoInput) {
      setRegisteredBanks([...registeredBanks, { ...selectedBank, saldo: parseFloat(saldoInput) }]);
      setSaldoInput('');
      setSelectedBank(null);
    }
  };

  useEffect(() => {
    const total = registeredBanks.reduce((acc, bank) => acc + parseFloat(bank.saldo || 0), 0);
    setSaldoTotal(total);
  }, [registeredBanks]);

  const fluxoDeCaixaData = [
    { date: '01/10', entrada: 500, saida: 200 },
    { date: '05/10', entrada: 700, saida: 300 },
    { date: '10/10', entrada: 600, saida: 400 },
    { date: '15/10', entrada: 900, saida: 200 },
  ];

  const receitasData = [
    { period: 'Janeiro', receita: 4000 },
    { period: 'Fevereiro', receita: 3500 },
    { period: 'Março', receita: 5000 },
  ];

  const despesasData = [
    { period: 'Janeiro', despesa: 3000 },
    { period: 'Fevereiro', despesa: 2500 },
    { period: 'Março', despesa: 3200 },
  ];

  const lucroLiquidoData = receitasData.map((r, index) => ({
    period: r.period,
    lucro: r.receita - despesasData[index].despesa,
  }));

  const crescimentoReceitasData = [
    { month: 'Jan', receita: 3000 },
    { month: 'Feb', receita: 4500 },
    { month: 'Mar', receita: 5000 },
    { month: 'Apr', receita: 5500 },
    { month: 'May', receita: 6000 },
  ];

  const taxaDespesasData = [
    { month: 'Jan', receita: 4000, despesa: 2500 },
    { month: 'Feb', receita: 4200, despesa: 2800 },
    { month: 'Mar', receita: 4600, despesa: 3000 },
    { month: 'Apr', receita: 5000, despesa: 3200 },
    { month: 'May', receita: 5400, despesa: 3500 },
  ];

  const handleAddConta = (tipo) => {
    const valor = parseFloat(prompt("Digite o valor:"));
    if (!isNaN(valor)) {
      if (tipo === 'pagar') {
        setContasPagar([...contasPagar, { valor, data: new Date().toLocaleDateString() }]);
      } else {
        setContasReceber([...contasReceber, { valor, data: new Date().toLocaleDateString() }]);
      }
    }
  };

  const handleGenerateReportPDF = () => {
    const doc = new jsPDF();
    doc.text("Relatório Financeiro", 20, 10);
    doc.autoTable({
      head: [['Data', 'Saldo Total']],
      body: receitasData.map(({ period, receita }) => [period, receita])
    });
    doc.save("relatorio-financeiro.pdf");
  };

  const handleGenerateReportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(receitasData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Relatório Financeiro");
    XLSX.writeFile(workbook, "relatorio-financeiro.xlsx");
  };

  const handleLogin = () => setIsLoggedIn(true);

  return (
    <div className="container">
      {isLoggedIn ? (
        <>
          <header className="personal-info">
            <h1>Bem-vindo, [Nome do Usuário]</h1>
            <p>Saldo Total: R$ {saldoTotal.toFixed(2)}</p>
          </header>

          {/* Painel de Contas a Pagar e a Receber */}
          <section className="contas-section">
            <h2>Contas a Pagar e a Receber</h2>
            <div>
              <button onClick={() => handleAddConta('pagar')}>Adicionar Conta a Pagar</button>
              <button onClick={() => handleAddConta('receber')}>Adicionar Conta a Receber</button>
            </div>
            <div className="contas-info">
              <p>Contas a Pagar: {contasPagar.length}</p>
              <p>Contas a Receber: {contasReceber.length}</p>
            </div>
          </section>

          {/* Geração de Relatórios */}
          <section className="report-section">
            <h2>Relatórios Financeiros</h2>
            <button onClick={handleGenerateReportPDF}>Exportar para PDF</button>
            <button onClick={handleGenerateReportExcel}>Exportar para Excel</button>
          </section>

          {/* Filtro de Período */}
          <section className="filter-section">
            <h2>Filtro de Período</h2>
            <select value={selectedPeriod} onChange={(e) => setSelectedPeriod(e.target.value)}>
              <option value="diario">Diário</option>
              <option value="semanal">Semanal</option>
              <option value="mensal">Mensal</option>
              <option value="anual">Anual</option>
            </select>
          </section>

          {/* Gráficos e Painéis de Visão Geral */}
          <section className="overview-section">
            <div className="chart-section">
              <h3>Número de Usuários Logados</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={usuariosLogadosData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="users" stroke="#8884d8" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="chart-section">
              <h3>Crescimento de Receitas</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={crescimentoReceitasData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="receita" stroke="#4CAF50" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="chart-section">
              <h3>Taxa de Despesas</h3>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={taxaDespesasData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Area type="monotone" dataKey="receita" stroke="#4CAF50" fill="#4CAF50" />
                  <Area type="monotone" dataKey="despesa" stroke="#FF0000" fill="#FF0000" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </section>
        </>
      ) : (
        <Login handleLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;
