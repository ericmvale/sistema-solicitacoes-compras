import { useState } from 'react';
import { ArrowLeft, ShoppingCart, Wrench, CheckCircle } from 'lucide-react';

interface SolicitacaoFormProps {
  tipo: 'compra' | 'servico';
  username: string;
  onVoltar: () => void;
  onSalvar: (solicitacao: {
    filial: string;
    descricao: string;
    categoria: string;
    prioridade: 'alta' | 'media' | 'baixa';
    centroCusto: string;
    valor: number;
    quantidade: number;
    justificativa: string;
  }) => void;
}

export function SolicitacaoForm({ tipo, username, onVoltar, onSalvar }: SolicitacaoFormProps) {
  const [formData, setFormData] = useState({
    filial: '',
    descricao: '',
    categoria: '',
    prioridade: 'media' as 'alta' | 'media' | 'baixa',
    centroCusto: '',
    valor: '',
    quantidade: '1',
    justificativa: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showSuccess, setShowSuccess] = useState(false);

  const filiais = [
    'São Paulo - SP',
    'Rio de Janeiro - RJ',
    'Belo Horizonte - MG',
    'Curitiba - PR',
    'Porto Alegre - RS',
    'Brasília - DF',
    'Salvador - BA',
    'Recife - PE'
  ];

  const categorias = [
    'Materiais de Escritório',
    'Equipamentos de TI',
    'Manutenção Predial',
    'Serviços Administrativos',
    'Móveis e Utensílios',
    'Serviços de Limpeza',
    'Material de Segurança',
    'Outros'
  ];

  const centrosCusto = [
    'Administrativo',
    'Financeiro',
    'Recursos Humanos',
    'Tecnologia da Informação',
    'Operações',
    'Comercial',
    'Marketing',
    'Manutenção',
    'Logística'
  ];

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Limpa o erro do campo quando o usuário começa a digitar
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.filial) {
      newErrors.filial = 'Selecione uma filial';
    }

    if (!formData.descricao.trim()) {
      newErrors.descricao = 'A descrição é obrigatória';
    }

    if (!formData.categoria) {
      newErrors.categoria = 'Selecione uma categoria';
    }

    if (!formData.centroCusto) {
      newErrors.centroCusto = 'Selecione um centro de custo';
    }

    if (!formData.valor || parseFloat(formData.valor) <= 0) {
      newErrors.valor = 'O valor deve ser maior que zero';
    }

    if (!formData.quantidade || parseInt(formData.quantidade) <= 0) {
      newErrors.quantidade = 'A quantidade deve ser maior que zero';
    }

    if (!formData.justificativa.trim()) {
      newErrors.justificativa = 'A justificativa é obrigatória';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    onSalvar({
      filial: formData.filial,
      descricao: formData.descricao,
      categoria: formData.categoria,
      prioridade: formData.prioridade,
      centroCusto: formData.centroCusto,
      valor: parseFloat(formData.valor),
      quantidade: parseInt(formData.quantidade),
      justificativa: formData.justificativa
    });

    // Mostra mensagem de sucesso
    setShowSuccess(true);
  };

  // Se a mensagem de sucesso está visível
  if (showSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-gray-900 mb-2">Solicitação Enviada com Sucesso!</h2>
          <p className="text-gray-600 mb-6">
            Sua solicitação foi registrada e será analisada pela equipe responsável.
          </p>
          <button
            onClick={onVoltar}
            className="w-full px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Voltar ao Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={onVoltar}
              className="flex items-center gap-2 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Voltar
            </button>
            <div className="flex items-center gap-3">
              {tipo === 'compra' ? (
                <div className="bg-indigo-100 p-2 rounded-lg">
                  <ShoppingCart className="w-6 h-6 text-indigo-600" />
                </div>
              ) : (
                <div className="bg-purple-100 p-2 rounded-lg">
                  <Wrench className="w-6 h-6 text-purple-600" />
                </div>
              )}
              <div>
                <h1 className="text-gray-900">
                  Nova Solicitação
                </h1>
                <p className="text-gray-600">Preencha os dados abaixo</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="space-y-6">
            {/* Filial e Solicitante */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="filial" className="block text-gray-700 mb-2">
                  Filial *
                </label>
                <select
                  id="filial"
                  value={formData.filial}
                  onChange={(e) => handleChange('filial', e.target.value)}
                  className={`w-full px-4 py-2 border ${errors.filial ? 'border-red-300' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none bg-white`}
                >
                  <option value="">Selecione a filial</option>
                  {filiais.map(filial => (
                    <option key={filial} value={filial}>{filial}</option>
                  ))}
                </select>
                {errors.filial && (
                  <p className="mt-1 text-red-600">{errors.filial}</p>
                )}
              </div>

              <div>
                <label htmlFor="solicitante" className="block text-gray-700 mb-2">
                  Solicitante
                </label>
                <input
                  id="solicitante"
                  type="text"
                  value={username}
                  disabled
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-600 cursor-not-allowed"
                />
              </div>
            </div>

            {/* Descrição */}
            <div>
              <label htmlFor="descricao" className="block text-gray-700 mb-2">
                Descrição *
              </label>
              <input
                id="descricao"
                type="text"
                value={formData.descricao}
                onChange={(e) => handleChange('descricao', e.target.value)}
                className={`w-full px-4 py-2 border ${errors.descricao ? 'border-red-300' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none`}
                placeholder="Descreva brevemente o item ou serviço solicitado"
              />
              {errors.descricao && (
                <p className="mt-1 text-red-600">{errors.descricao}</p>
              )}
            </div>

            {/* Categoria e Centro de Custo */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="categoria" className="block text-gray-700 mb-2">
                  Categoria *
                </label>
                <select
                  id="categoria"
                  value={formData.categoria}
                  onChange={(e) => handleChange('categoria', e.target.value)}
                  className={`w-full px-4 py-2 border ${errors.categoria ? 'border-red-300' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none bg-white`}
                >
                  <option value="">Selecione uma categoria</option>
                  {categorias.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
                {errors.categoria && (
                  <p className="mt-1 text-red-600">{errors.categoria}</p>
                )}
              </div>

              <div>
                <label htmlFor="centroCusto" className="block text-gray-700 mb-2">
                  Centro de Custo *
                </label>
                <select
                  id="centroCusto"
                  value={formData.centroCusto}
                  onChange={(e) => handleChange('centroCusto', e.target.value)}
                  className={`w-full px-4 py-2 border ${errors.centroCusto ? 'border-red-300' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none bg-white`}
                >
                  <option value="">Selecione o centro de custo</option>
                  {centrosCusto.map(cc => (
                    <option key={cc} value={cc}>{cc}</option>
                  ))}
                </select>
                {errors.centroCusto && (
                  <p className="mt-1 text-red-600">{errors.centroCusto}</p>
                )}
              </div>
            </div>

            {/* Prioridade */}
            <div>
              <label className="block text-gray-700 mb-2">
                Prioridade *
              </label>
              <div className="grid grid-cols-3 gap-4">
                <button
                  type="button"
                  onClick={() => handleChange('prioridade', 'baixa')}
                  className={`px-4 py-3 rounded-lg border-2 transition-all ${
                    formData.prioridade === 'baixa'
                      ? 'border-green-500 bg-green-50 text-green-700'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  Baixa
                </button>
                <button
                  type="button"
                  onClick={() => handleChange('prioridade', 'media')}
                  className={`px-4 py-3 rounded-lg border-2 transition-all ${
                    formData.prioridade === 'media'
                      ? 'border-yellow-500 bg-yellow-50 text-yellow-700'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  Média
                </button>
                <button
                  type="button"
                  onClick={() => handleChange('prioridade', 'alta')}
                  className={`px-4 py-3 rounded-lg border-2 transition-all ${
                    formData.prioridade === 'alta'
                      ? 'border-red-500 bg-red-50 text-red-700'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  Alta
                </button>
              </div>
            </div>

            {/* Valor e Quantidade */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="valor" className="block text-gray-700 mb-2">
                  Valor Estimado (R$) *
                </label>
                <input
                  id="valor"
                  type="number"
                  step="0.01"
                  value={formData.valor}
                  onChange={(e) => handleChange('valor', e.target.value)}
                  className={`w-full px-4 py-2 border ${errors.valor ? 'border-red-300' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none`}
                  placeholder="0,00"
                />
                {errors.valor && (
                  <p className="mt-1 text-red-600">{errors.valor}</p>
                )}
              </div>

              <div>
                <label htmlFor="quantidade" className="block text-gray-700 mb-2">
                  Quantidade *
                </label>
                <input
                  id="quantidade"
                  type="number"
                  value={formData.quantidade}
                  onChange={(e) => handleChange('quantidade', e.target.value)}
                  className={`w-full px-4 py-2 border ${errors.quantidade ? 'border-red-300' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none`}
                  placeholder="1"
                  min="1"
                />
                {errors.quantidade && (
                  <p className="mt-1 text-red-600">{errors.quantidade}</p>
                )}
              </div>
            </div>

            {/* Justificativa */}
            <div>
              <label htmlFor="justificativa" className="block text-gray-700 mb-2">
                Justificativa *
              </label>
              <textarea
                id="justificativa"
                value={formData.justificativa}
                onChange={(e) => handleChange('justificativa', e.target.value)}
                rows={5}
                className={`w-full px-4 py-2 border ${errors.justificativa ? 'border-red-300' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none resize-none`}
                placeholder="Descreva a necessidade e justificativa para esta solicitação..."
              />
              {errors.justificativa && (
                <p className="mt-1 text-red-600">{errors.justificativa}</p>
              )}
            </div>

            {/* Valor Total */}
            {formData.valor && formData.quantidade && parseFloat(formData.valor) > 0 && parseInt(formData.quantidade) > 0 && (
              <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Valor Total:</span>
                  <span className="text-indigo-900">
                    {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
                      parseFloat(formData.valor) * parseInt(formData.quantidade)
                    )}
                  </span>
                </div>
              </div>
            )}

            {/* Botões */}
            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick={onVoltar}
                className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="flex-1 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Enviar Solicitação
              </button>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
}