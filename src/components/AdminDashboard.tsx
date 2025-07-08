import React from 'react';
import { Users, UserCheck, CreditCard, Clock, TrendingUp } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const AdminDashboard: React.FC = () => {
  const { getStats } = useApp();
  const stats = getStats();

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
    }
  ];

  const getColorClasses = (color: string) => {
    const colorMap = {
      purple: 'bg-purple-50 text-purple-600 border-purple-200',
      blue: 'bg-blue-50 text-blue-600 border-blue-200',
      green: 'bg-green-50 text-green-600 border-green-200',
      yellow: 'bg-yellow-50 text-yellow-600 border-yellow-200',
      orange: 'bg-orange-50 text-orange-600 border-orange-200'
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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 lg:gap-6 mb-8">
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
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
      </div>
    </div>
  );
};