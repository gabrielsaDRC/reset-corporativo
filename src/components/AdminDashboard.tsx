import React from 'react';
import { Users, UserCheck, CreditCard, Clock, TrendingUp, Building, DollarSign, Briefcase, PieChart } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const AdminDashboard: React.FC = () => {
  const { getStats, participants } = useApp();
  const stats = getStats();

  // Estatísticas de empresa
  const companyStats = {
    totalComEmpresas: participants.filter(p => p.nomeEmpresa && p.nomeEmpresa.trim() !== '').length,
    faturamentoDistribution: participants.reduce((acc, p) => {
      if (p.faturamento && p.faturamento !== '') {
        acc[p.faturamento] = (acc[p.faturamento] || 0) + 1;
      }
      return acc;
    }, {} as Record<string, number>),
    areaAtuacaoDistribution: participants.reduce((acc, p) => {
      if (p.areaAtuacao && p.areaAtuacao !== '') {
        acc[p.areaAtuacao] = (acc[p.areaAtuacao] || 0) + 1;
      }
      return acc;
    }, {} as Record<string, number>)
  };

  // Função para formatar labels
  const formatFaturamentoLabel = (key: string) => {
    const labels: Record<string, string> = {
      'ate-100k': 'Até R$ 100k',
      '100k-500k': 'R$ 100k - 500k',
      '500k-1m': 'R$ 500k - 1M',
      '1m-5m': 'R$ 1M - 5M',
      '5m-10m': 'R$ 5M - 10M',
      'acima-10m': 'Acima R$ 10M',
      'nao-informar': 'Não informado'
    };
    return labels[key] || key;
  };

  const formatAreaAtuacaoLabel = (key: string) => {
    const labels: Record<string, string> = {
      'tecnologia': 'Tecnologia',
      'saude': 'Saúde',
      'educacao': 'Educação',
      'financeiro': 'Financeiro',
      'varejo': 'Varejo',
      'industria': 'Indústria',
      'servicos': 'Serviços',
      'consultoria': 'Consultoria',
      'marketing': 'Marketing',
      'recursos-humanos': 'RH',
      'logistica': 'Logística',
      'agronegocio': 'Agronegócio',
      'construcao': 'Construção',
      'alimenticio': 'Alimentício',
      'turismo': 'Turismo',
      'imobiliario': 'Imobiliário',
      'energia': 'Energia',
      'telecomunicacoes': 'Telecom',
      'governo': 'Governo',
      'ong': 'ONG',
      'outros': 'Outros'
    };
    return labels[key] || key;
  };

  const statCards = [
    {
      title: 'Total de Inscritos',
      value: stats.totalInscritos,
      icon: Users,
      color: 'purple',
      description: 'Todos os participantes'
    },
    {
      title: 'Inscrições Gratuitas',
      value: stats.inscritosGratuitos,
      icon: UserCheck,
      color: 'blue',
      description: 'Participantes gratuitos'
    },
    {
      title: 'Inscrições Pagas',
      value: stats.inscritosPagos,
      icon: CreditCard,
      color: 'green',
      description: 'Participantes premium'
    },
    {
      title: 'Pagamentos Pendentes',
      value: stats.pagamentosPendentes,
      icon: Clock,
      color: 'yellow',
      description: 'Aguardando pagamento'
    },
    {
      title: 'Confirmados no Evento',
      value: stats.confirmadosEvento,
      icon: TrendingUp,
      color: 'orange',
      description: 'Presença confirmada'
    },
    {
      title: 'Empresas Cadastradas',
      value: companyStats.totalComEmpresas,
      icon: Building,
      color: 'indigo',
      description: 'Com dados empresariais'
    }
  ];

  const getColorClasses = (color: string) => {
    const colorMap = {
      purple: 'bg-purple-50 text-purple-600 border-purple-200',
      blue: 'bg-blue-50 text-blue-600 border-blue-200',
      green: 'bg-green-50 text-green-600 border-green-200',
      yellow: 'bg-yellow-50 text-yellow-600 border-yellow-200',
      orange: 'bg-orange-50 text-orange-600 border-orange-200',
      indigo: 'bg-indigo-50 text-indigo-600 border-indigo-200'
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.purple;
  };

  return (
    <div className="p-4 lg:p-6">
      <div className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-2">
          Dashboard Administrativo
        </h1>
        <p className="text-gray-600">
          Visão geral das inscrições e estatísticas do evento
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 lg:gap-6 mb-8">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.title}
              className={`p-4 lg:p-6 rounded-lg border-2 ${getColorClasses(card.color)}`}
            >
              <div className="flex items-center justify-between mb-4">
                <Icon className="w-6 h-6 lg:w-8 lg:h-8" />
                <span className="text-2xl lg:text-3xl font-bold">{card.value}</span>
              </div>
              <h3 className="font-semibold text-gray-800 mb-1 text-sm lg:text-base">{card.title}</h3>
              <p className="text-xs lg:text-sm text-gray-600">{card.description}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
        <div className="bg-white p-4 lg:p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg lg:text-xl font-semibold text-gray-800 mb-4">
            Distribuição por Tipo
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm lg:text-base text-gray-600">Inscrições Gratuitas</span>
              <div className="flex items-center gap-2">
                <div className="w-16 lg:w-20 h-2 bg-gray-200 rounded-full">
                  <div 
                    className="h-full bg-blue-500 rounded-full transition-all duration-1000"
                    style={{ 
                      width: `${stats.totalInscritos > 0 ? (stats.inscritosGratuitos / stats.totalInscritos) * 100 : 0}%` 
                    }}
                  />
                </div>
                <span className="font-semibold text-gray-800 text-sm lg:text-base">{stats.inscritosGratuitos}</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm lg:text-base text-gray-600">Inscrições Pagas</span>
              <div className="flex items-center gap-2">
                <div className="w-16 lg:w-20 h-2 bg-gray-200 rounded-full">
                  <div 
                    className="h-full bg-green-500 rounded-full transition-all duration-1000"
                    style={{ 
                      width: `${stats.totalInscritos > 0 ? (stats.inscritosPagos / stats.totalInscritos) * 100 : 0}%` 
                    }}
                  />
                </div>
                <span className="font-semibold text-gray-800 text-sm lg:text-base">{stats.inscritosPagos}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 lg:p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg lg:text-xl font-semibold text-gray-800 mb-4">
            Status dos Pagamentos
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm lg:text-base text-gray-600">Pagamentos Aprovados</span>
              <span className="font-semibold text-green-600 text-sm lg:text-base">{stats.inscritosPagos}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm lg:text-base text-gray-600">Pagamentos Pendentes</span>
              <span className="font-semibold text-yellow-600 text-sm lg:text-base">
                {stats.pagamentosPendentes}
                <span className="text-xs text-gray-500 ml-1">(apenas pagas)</span>
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm lg:text-base text-gray-600">Confirmados no Evento</span>
              <span className="font-semibold text-orange-600 text-sm lg:text-base">{stats.confirmadosEvento}</span>
            </div>
          </div>
        </div>

        {/* Distribuição por Faturamento */}
        <div className="bg-white p-4 lg:p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg lg:text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-green-600" />
            Faturamento das Empresas
          </h3>
          <div className="space-y-3">
            {Object.entries(companyStats.faturamentoDistribution)
              .sort(([,a], [,b]) => b - a)
              .slice(0, 5)
              .map(([faturamento, count]) => (
              <div key={faturamento} className="flex items-center justify-between">
                <span className="text-sm lg:text-base text-gray-600">
                  {formatFaturamentoLabel(faturamento)}
                </span>
                <div className="flex items-center gap-2">
                  <div className="w-16 lg:w-20 h-2 bg-gray-200 rounded-full">
                    <div 
                      className="h-full bg-green-500 rounded-full transition-all duration-1000"
                      style={{ 
                        width: `${companyStats.totalComEmpresas > 0 ? (count / companyStats.totalComEmpresas) * 100 : 0}%` 
                      }}
                    />
                  </div>
                  <span className="font-semibold text-gray-800 text-sm lg:text-base">{count}</span>
                </div>
              </div>
            ))}
            {Object.keys(companyStats.faturamentoDistribution).length === 0 && (
              <p className="text-gray-500 text-sm text-center py-4">
                Nenhum dado de faturamento informado
              </p>
            )}
          </div>
        </div>

        {/* Distribuição por Área de Atuação */}
        <div className="bg-white p-4 lg:p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg lg:text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-blue-600" />
            Áreas de Atuação
          </h3>
          <div className="space-y-3">
            {Object.entries(companyStats.areaAtuacaoDistribution)
              .sort(([,a], [,b]) => b - a)
              .slice(0, 5)
              .map(([area, count]) => (
              <div key={area} className="flex items-center justify-between">
                <span className="text-sm lg:text-base text-gray-600">
                  {formatAreaAtuacaoLabel(area)}
                </span>
                <div className="flex items-center gap-2">
                  <div className="w-16 lg:w-20 h-2 bg-gray-200 rounded-full">
                    <div 
                      className="h-full bg-blue-500 rounded-full transition-all duration-1000"
                      style={{ 
                        width: `${stats.totalInscritos > 0 ? (count / stats.totalInscritos) * 100 : 0}%` 
                      }}
                    />
                  </div>
                  <span className="font-semibold text-gray-800 text-sm lg:text-base">{count}</span>
                </div>
              </div>
            ))}
            {Object.keys(companyStats.areaAtuacaoDistribution).length === 0 && (
              <p className="text-gray-500 text-sm text-center py-4">
                Nenhuma área de atuação informada
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};