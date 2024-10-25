import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ReactComponent as AlimentacaoIcon } from './icons/food.svg';
import { ReactComponent as TransporteIcon } from './icons/transport.svg';
import { ReactComponent as MoradiaIcon } from './icons/house.svg';
import Select from 'react-select'; 
import './App.css';

function App() {
  const [bankOptions, setBankOptions] = useState([]);
  const [registeredBanks, setRegisteredBanks] = useState([]);
  const [selectedBank, setSelectedBank] = useState(null);
  const [saldoInput, setSaldoInput] = useState('');
  const [saldoTotal, setSaldoTotal] = useState(0);

  useEffect(() => {
    async function fetchBanks() {
      // Simulação de dados de bancos com Clearbit
      setBankOptions([
        { value: 'itau', label: 'Itaú', logo: 'https://logo.clearbit.com/itau.com.br' },
        { value: 'bradesco', label: 'Bradesco', logo: 'https://logo.clearbit.com/bradesco.com.br' },
        { value: 'santander', label: 'Santander', logo: 'https://logo.clearbit.com/santander.com.br' }
      ]);
    }

    fetchBanks();
  }, []);

  // Função para adicionar banco à lista de registrados
  const handleAddBank = () => {
    if (selectedBank && saldoInput) {
      setRegisteredBanks([...registeredBanks, { ...selectedBank, saldo: parseFloat(saldoInput) }]);
      setSaldoInput(''); // Limpar o campo de saldo
      setSelectedBank(null); // Limpar a seleção do banco
    }
  };

  // Atualiza o saldo total quando um novo banco é adicionado
  useEffect(() => {
    const total = registeredBanks.reduce((acc, bank) => acc + parseFloat(bank.saldo || 0), 0);
    setSaldoTotal(total);
  }, [registeredBanks]);

  // Atualiza os dados do gráfico dinamicamente
  const data = [
    { date: '01/10', saldo: saldoTotal - 400 },
    { date: '05/10', saldo: saldoTotal - 600 },
    { date: '10/10', saldo: saldoTotal - 800 },
    { date: '15/10', saldo: saldoTotal - 1000 },
    { date: '20/10', saldo: saldoTotal - 1200 },
    { date: '25/10', saldo: saldoTotal - 1400 },
    { date: '30/10', saldo: saldoTotal - 1600 },
  ];

  return (
    <div className="container">
      {/* Área de Informações Pessoais */}
      <header className="personal-info">
        <h1>Bem-vindo, [Nome do Usuário]</h1>
        <p>Saldo Total: R$ {saldoTotal.toFixed(2)}</p>
      </header>

      {/* Dropdown para Selecionar e Adicionar Bancos */}
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
          <input className = "custom-input" 
            type="number" 
            placeholder="Saldo inicial" 
            value={saldoInput} 
            onChange={(e) => setSaldoInput(e.target.value)} 
          />
        </div>
        
        <button onClick={handleAddBank}>Adicionar Banco</button>
      </section>

      {/* Área dos Bancos Registrados */}
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

      {/* Área de Gastos Mensais */}
      <section className="expenses-section">
        <h2>Gastos Mensais</h2>
        <div className="expenses">
          <div className="expense">
            <AlimentacaoIcon width={50} height={50} />
            <p>Alimentação: R$ 500,00</p>
          </div>
          <div className="expense">
            <TransporteIcon width={50} height={50} />
            <p>Transporte: R$ 300,00</p>
          </div>
          <div className="expense">
            <MoradiaIcon width={50} height={50} />
            <p>Moradia: R$ 1200,00</p>
          </div>
        </div>
      </section>

      {/* Gráfico de Saldo Durante o Mês */}
      <section className="chart-section">
        <h2>Saldo Durante o Mês</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="saldo" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </section>
    </div>
  );
}

export default App;
