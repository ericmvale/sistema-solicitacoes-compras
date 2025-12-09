import { useState } from 'react';
import { LoginPage } from './components/LoginPage';
import { Dashboard, Solicitacao } from './components/Dashboard';
import { SolicitacaoForm } from './components/SolicitacaoForm';

type Screen = 'login' | 'dashboard' | 'nova-solicitacao';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('login');
  const [username, setUsername] = useState('');
  const [tipoSolicitacao, setTipoSolicitacao] = useState<'compra' | 'servico'>('compra');
  const [solicitacoes, setSolicitacoes] = useState<Solicitacao[]>([
    {
      id: '001',
      tipo: 'compra',
      descricao: 'Notebooks Dell para equipe de desenvolvimento',
      data: '2025-12-05',
      status: 'aprovada',
      valor: 15000,
      solicitante: 'João Silva'
    },
    {
      id: '002',
      tipo: 'servico',
      descricao: 'Manutenção preventiva dos ar-condicionados',
      data: '2025-12-07',
      status: 'em_analise',
      valor: 2500,
      solicitante: 'Maria Santos'
    },
    {
      id: '003',
      tipo: 'compra',
      descricao: 'Material de escritório para o trimestre',
      data: '2025-12-08',
      status: 'pendente',
      valor: 800,
      solicitante: 'Pedro Costa'
    }
  ]);

  const handleLogin = (user: string) => {
    setUsername(user);
    setCurrentScreen('dashboard');
  };

  const handleLogout = () => {
    setUsername('');
    setCurrentScreen('login');
  };

  const handleNovaSolicitacao = (tipo: 'compra' | 'servico') => {
    setTipoSolicitacao(tipo);
    setCurrentScreen('nova-solicitacao');
  };

  const handleVoltarDashboard = () => {
    setCurrentScreen('dashboard');
  };

  const handleSalvarSolicitacao = (dados: {
    filial: string;
    descricao: string;
    categoria: string;
    prioridade: 'alta' | 'media' | 'baixa';
    centroCusto: string;
    valor: number;
    quantidade: number;
    justificativa: string;
  }) => {
    // Gera um novo ID
    const novoId = String(solicitacoes.length + 1).padStart(3, '0');
    
    const novaSolicitacao: Solicitacao = {
      id: novoId,
      tipo: tipoSolicitacao,
      descricao: dados.descricao,
      data: new Date().toISOString().split('T')[0],
      status: 'pendente',
      valor: dados.valor,
      solicitante: username
    };

    setSolicitacoes(prev => [novaSolicitacao, ...prev]);
    setCurrentScreen('dashboard');
  };

  return (
    <>
      {currentScreen === 'login' && (
        <LoginPage onLogin={handleLogin} />
      )}

      {currentScreen === 'dashboard' && (
        <Dashboard
          username={username}
          onLogout={handleLogout}
          onNovaSolicitacao={handleNovaSolicitacao}
          solicitacoes={solicitacoes}
        />
      )}

      {currentScreen === 'nova-solicitacao' && (
        <SolicitacaoForm
          tipo={tipoSolicitacao}
          username={username}
          onVoltar={handleVoltarDashboard}
          onSalvar={handleSalvarSolicitacao}
        />
      )}
    </>
  );
}