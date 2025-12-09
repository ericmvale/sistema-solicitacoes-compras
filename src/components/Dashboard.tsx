import { ShoppingCart, Wrench, LogOut, Plus, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

export interface Solicitacao {
  id: string;
  tipo: 'compra' | 'servico';
  descricao: string;
  data: string;
  status: 'pendente' | 'aprovada' | 'rejeitada' | 'em_analise';
  valor: number;
  solicitante: string;
}

interface DashboardProps {
  username: string;
  onLogout: () => void;
  onNovaSolicitacao: (tipo: 'compra' | 'servico') => void;
  solicitacoes: Solicitacao[];
}

export function Dashboard({ username, onLogout, onNovaSolicitacao, solicitacoes }: DashboardProps) {
  const getStatusBadge = (status: Solicitacao['status']) => {
    const badges = {
      pendente: { icon: Clock, text: 'Pendente', className: 'bg-yellow-100 text-yellow-800' },
      aprovada: { icon: CheckCircle, text: 'Aprovada', className: 'bg-green-100 text-green-800' },
      rejeitada: { icon: XCircle, text: 'Rejeitada', className: 'bg-red-100 text-red-800' },
      em_analise: { icon: AlertCircle, text: 'Em Análise', className: 'bg-blue-100 text-blue-800' }
    };
    
    const badge = badges[status];
    const Icon = badge.icon;
    
    return (
      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full ${badge.className}`}>
        <Icon className="w-4 h-4" />
        {badge.text}
      </span>
    );
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-gray-900">Sistema de Solicitações</h1>
              <p className="text-gray-600">Bem-vindo, {username}</p>
            </div>
            <button
              onClick={onLogout}
              className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <LogOut className="w-5 h-5" />
              Sair
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Action Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <button
            onClick={() => onNovaSolicitacao('compra')}
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md hover:border-indigo-300 transition-all text-left group"
          >
            <div className="flex items-start gap-4">
              <div className="bg-indigo-100 p-3 rounded-lg group-hover:bg-indigo-600 transition-colors">
                <ShoppingCart className="w-8 h-8 text-indigo-600 group-hover:text-white transition-colors" />
              </div>
              <div className="flex-1">
                <h3 className="text-gray-900 mb-2">Solicitar Compra</h3>
                <p className="text-gray-600">
                  Crie uma nova solicitação de compra de materiais ou equipamentos
                </p>
                <div className="mt-4 flex items-center gap-2 text-indigo-600 group-hover:gap-3 transition-all">
                  <Plus className="w-5 h-5" />
                  <span>Nova Solicitação</span>
                </div>
              </div>
            </div>
          </button>

          <button
            onClick={() => onNovaSolicitacao('servico')}
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md hover:border-purple-300 transition-all text-left group"
          >
            <div className="flex items-start gap-4">
              <div className="bg-purple-100 p-3 rounded-lg group-hover:bg-purple-600 transition-colors">
                <Wrench className="w-8 h-8 text-purple-600 group-hover:text-white transition-colors" />
              </div>
              <div className="flex-1">
                <h3 className="text-gray-900 mb-2">Solicitar Serviço</h3>
                <p className="text-gray-600">
                  Crie uma nova solicitação de contratação de serviços
                </p>
                <div className="mt-4 flex items-center gap-2 text-purple-600 group-hover:gap-3 transition-all">
                  <Plus className="w-5 h-5" />
                  <span>Nova Solicitação</span>
                </div>
              </div>
            </div>
          </button>
        </div>

        {/* Solicitações List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-gray-900">Minhas Solicitações</h2>
          </div>

          {solicitacoes.length === 0 ? (
            <div className="p-12 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                <ShoppingCart className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-gray-600">Nenhuma solicitação encontrada</p>
              <p className="text-gray-500 mt-2">
                Clique em um dos botões acima para criar sua primeira solicitação
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-gray-700">ID</th>
                    <th className="px-6 py-3 text-left text-gray-700">Tipo</th>
                    <th className="px-6 py-3 text-left text-gray-700">Descrição</th>
                    <th className="px-6 py-3 text-left text-gray-700">Valor</th>
                    <th className="px-6 py-3 text-left text-gray-700">Data</th>
                    <th className="px-6 py-3 text-left text-gray-700">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {solicitacoes.map((solicitacao) => (
                    <tr key={solicitacao.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-gray-900">
                        #{solicitacao.id}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${
                          solicitacao.tipo === 'compra' 
                            ? 'bg-indigo-50 text-indigo-700' 
                            : 'bg-purple-50 text-purple-700'
                        }`}>
                          {solicitacao.tipo === 'compra' ? (
                            <ShoppingCart className="w-4 h-4" />
                          ) : (
                            <Wrench className="w-4 h-4" />
                          )}
                          {solicitacao.tipo === 'compra' ? 'Compra' : 'Serviço'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-900">
                        {solicitacao.descricao}
                      </td>
                      <td className="px-6 py-4 text-gray-900">
                        {formatCurrency(solicitacao.valor)}
                      </td>
                      <td className="px-6 py-4 text-gray-600">
                        {new Date(solicitacao.data).toLocaleDateString('pt-BR')}
                      </td>
                      <td className="px-6 py-4">
                        {getStatusBadge(solicitacao.status)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
