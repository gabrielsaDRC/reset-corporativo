import React, { useState, useEffect } from 'react';
import { Search, Filter, Download, Edit2, Trash2, CheckCircle, XCircle, AlertTriangle, CreditCard, Clock, ChevronLeft, ChevronRight, Settings } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Participant } from '../types';
import { ConfirmationModal } from './ConfirmationModal';
import { SuccessNotification } from './SuccessNotification';

export const ParticipantsList: React.FC = () => {
  const { participants, updateParticipant, removeParticipant } = useApp();
  const [localParticipants, setParticipants] = useState(participants);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'gratuita' | 'paga'>('all');
  const [sortBy, setSortBy] = useState<'nome' | 'dataInscricao'>('dataInscricao');
  const [testingConnection, setTestingConnection] = useState(false);
  const [deletingParticipant, setDeletingParticipant] = useState<string | null>(null);
  const [participantToDelete, setParticipantToDelete] = useState<Participant | null>(null);
  const [successMessage, setSuccessMessage] = useState('');

  const [updatingPayment, setUpdatingPayment] = useState<string | null>(null);
  
  // Estados de paginação
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(15);
  const [showItemsPerPageSelector, setShowItemsPerPageSelector] = useState(false);
  useEffect(() => {
    setParticipants(participants);
  }, [participants]);

  // Reset página quando filtros mudarem
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filterStatus, sortBy]);
  const filteredParticipants = localParticipants
    .filter(participant => {
      const matchesSearch = participant.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           participant.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           participant.cpf.includes(searchTerm);
      
      const matchesFilter = filterStatus === 'all' || participant.tipoInscricao === filterStatus;
      
      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      if (sortBy === 'nome') {
        return a.nome.localeCompare(b.nome);
      }
      return new Date(b.dataInscricao).getTime() - new Date(a.dataInscricao).getTime();
    });

  // Cálculos de paginação
  const totalItems = filteredParticipants.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedParticipants = filteredParticipants.slice(startIndex, endIndex);

  // Funções de paginação
  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const changeItemsPerPage = (newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1); // Reset para primeira página
    setShowItemsPerPageSelector(false);
  };

  // Gerar números de páginas para exibir
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      const startPage = Math.max(1, currentPage - 2);
      const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
      
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
    }
    
    return pages;
  };
  const exportToCsv = () => {
    // Exportar todos os participantes filtrados, não apenas a página atual
    const headers = [
      'Nome', 'CPF', 'Email', 'Telefone', 'Empresa', 'Faturamento', 'Área de Atuação', 'Cidade', 'Estado', 'Tipo Inscrição', 
      'Status Pagamento', 'Data Inscrição', 'Confirmado Evento'
    ];
    
    const csvData = filteredParticipants.map(p => [
      p.nome, p.cpf, p.email, p.telefone, p.nomeEmpresa || '', p.faturamento || '', p.areaAtuacao || '', p.cidade, p.estado, 
      p.tipoInscricao, p.statusPagamento, 
      new Date(p.dataInscricao).toLocaleString(),
      p.confirmadoEvento ? 'Sim' : 'Não'
    ]);
    
    const csvContent = [headers, ...csvData]
      .map(row => row.map(cell => `"${cell}"`).join(','))
      .join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `participantes_evento_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  const toggleConfirmation = (participant: Participant) => {
    const newStatus = !participant.confirmadoEvento;
    
    // Marcar como atualizando
    setParticipants(prev => 
      prev.map(p => p.id === participant.id ? { ...p, isUpdating: true } : p)
    );
    
    // Atualizar no Supabase
    updateParticipant(participant.id, { confirmadoEvento: newStatus })
      .then(() => {
        console.log(`Status de confirmação atualizado para ${participant.nome}: ${newStatus ? 'Confirmado' : 'Não confirmado'}`);
        // Atualizar estado local com sucesso
        setParticipants(prev => 
          prev.map(p => p.id === participant.id ? { ...p, confirmadoEvento: newStatus, isUpdating: false } : p)
        );
      })
      .catch((error) => {
        console.error('Erro ao atualizar status de confirmação:', error);
        // Remover estado de carregamento em caso de erro
        setParticipants(prev => 
          prev.map(p => p.id === participant.id ? { ...p, isUpdating: false } : p)
        );
        alert('Erro ao atualizar status de confirmação. Tente novamente.');
      });
  };

  const confirmPayment = (participant: Participant) => {
    if (participant.tipoInscricao !== 'paga') return;
    
    setUpdatingPayment(participant.id);
    
    // Alternar status do pagamento entre aprovado e pendente
    const newStatus = participant.statusPagamento === 'aprovado' ? 'pendente' : 'aprovado';
    
    updateParticipant(participant.id, { statusPagamento: newStatus })
      .then(() => {
        console.log(`Status de pagamento alterado para ${newStatus} - ${participant.nome}`);
        // Atualizar estado local
        setParticipants(prev => 
          prev.map(p => p.id === participant.id ? { ...p, statusPagamento: newStatus } : p)
        );
        setSuccessMessage(
          newStatus === 'aprovado' 
            ? `Pagamento confirmado para ${participant.nome}` 
            : `Pagamento marcado como pendente para ${participant.nome}`
        );
      })
      .catch((error) => {
        console.error('Erro ao alterar status do pagamento:', error);
        alert('Erro ao alterar status do pagamento. Tente novamente.');
      })
      .finally(() => {
        setUpdatingPayment(null);
      });
  };
  const handleDeleteParticipant = async (participant: Participant) => {
    setParticipantToDelete(participant);
  };

  const confirmDeleteParticipant = async () => {
    if (!participantToDelete) return;

    setDeletingParticipant(participantToDelete.id);

    try {
      console.log('Excluindo participante:', participantToDelete.nome);
      console.log('ID do participante:', participantToDelete.id);
      console.log('Total de participantes antes da exclusão:', localParticipants.length);
      
      await removeParticipant(participantToDelete.id);
      console.log('Participante excluído com sucesso');
      
      // Verificar se realmente foi removido
      const remainingParticipants = localParticipants.filter(p => p.id !== participantToDelete.id);
      console.log('Total de participantes após exclusão:', remainingParticipants.length);
      
      // Mostrar notificação de sucesso
      setSuccessMessage(`Participante "${participantToDelete.nome}" foi excluído com sucesso.`);
      
      // Fechar modal
      setParticipantToDelete(null);
    } catch (error) {
      console.error('Erro ao excluir participante:', error);
      alert(`Erro ao excluir participante: ${error instanceof Error ? error.message : 'Erro desconhecido'}`);
    } finally {
      setDeletingParticipant(null);
    }
  };

  const cancelDeleteParticipant = () => {
    setParticipantToDelete(null);
  };

  const getStatusBadge = (participant: Participant) => {
    if (participant.tipoInscricao === 'gratuita') {
      return <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">Gratuita</span>;
    }
    
    if (participant.statusPagamento === 'aprovado') {
      return <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">Pago</span>;
    }
    
    return <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">Pendente</span>;
  };

  const getPaymentButton = (participant: Participant) => {
    if (participant.tipoInscricao !== 'paga') return null;
    
    if (participant.statusPagamento === 'aprovado') {
      return (
        <button
          onClick={() => confirmPayment(participant)}
          disabled={updatingPayment === participant.id}
          className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium transition-colors ${
            updatingPayment === participant.id
              ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
              : 'bg-green-100 text-green-800 hover:bg-green-200'
          }`}
          title="Clique para marcar como pendente"
        >
          {updatingPayment === participant.id ? (
            <>
              <div className="w-3 h-3 border border-green-600 border-t-transparent rounded-full animate-spin"></div>
              Alterando...
            </>
          ) : (
            <>
              <CheckCircle className="w-3 h-3" />
              Pago
            </>
          )}
        </button>
      );
    }
    
    return (
      <button
        onClick={() => confirmPayment(participant)}
        disabled={updatingPayment === participant.id}
        className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium transition-colors ${
          updatingPayment === participant.id
            ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
            : 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
        }`}
        title="Clique para confirmar o pagamento"
      >
        {updatingPayment === participant.id ? (
          <>
            <div className="w-3 h-3 border border-yellow-600 border-t-transparent rounded-full animate-spin"></div>
            Alterando...
          </>
        ) : (
          <>
            <Clock className="w-3 h-3" />
            Confirmar Pagamento
          </>
        )}
      </button>
    );
  };
  return (
    <div className="p-4 lg:p-6">
      <div className="mb-6">
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-2">
          Lista de Participantes
        </h1>
        <p className="text-gray-600">
          Gerencie todos os participantes inscritos no evento
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border p-4 lg:p-6 mb-6">
        <div className="flex flex-col lg:flex-row gap-4 mb-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar por nome, email ou CPF..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 lg:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
          
          <div className="flex flex-col sm:flex-row gap-2">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as 'all' | 'gratuita' | 'paga')}
              className="px-4 py-2 lg:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="all">Todos os tipos</option>
              <option value="gratuita">Gratuitas</option>
              <option value="paga">Pagas</option>
            </select>
            
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'nome' | 'dataInscricao')}
              className="px-4 py-2 lg:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="dataInscricao">Data de Inscrição</option>
              <option value="nome">Nome</option>
            </select>
            
            <button
              onClick={exportToCsv}
              className="flex items-center justify-center gap-2 px-4 py-2 lg:py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors whitespace-nowrap"
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Exportar CSV</span>
              <span className="sm:hidden">CSV</span>
            </button>
          </div>
        </div>

        {/* Controles de paginação e itens por página */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-4">
            <div className="text-sm text-gray-600">
              Mostrando {startIndex + 1} a {Math.min(endIndex, totalItems)} de {totalItems} participantes
            </div>
            
            <div className="relative">
              <button
                onClick={() => setShowItemsPerPageSelector(!showItemsPerPageSelector)}
                className="flex items-center gap-2 px-3 py-1 text-sm border border-gray-300 rounded-lg hover:bg-white transition-colors"
              >
                <Settings className="w-4 h-4" />
                {itemsPerPage} por página
              </button>
              
              {showItemsPerPageSelector && (
                <div className="absolute top-full left-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                  {[5, 10, 15, 25, 50, 100].map((count) => (
                    <button
                      key={count}
                      onClick={() => changeItemsPerPage(count)}
                      className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${
                        itemsPerPage === count ? 'bg-purple-50 text-purple-600 font-medium' : 'text-gray-700'
                      }`}
                    >
                      {count} por página
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          {/* Navegação de páginas */}
          {totalPages > 1 && (
            <div className="flex items-center gap-2">
              <button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              
              <div className="flex items-center gap-1">
                {getPageNumbers().map((pageNum) => (
                  <button
                    key={pageNum}
                    onClick={() => goToPage(pageNum)}
                    className={`px-3 py-2 text-sm rounded-lg transition-colors ${
                      currentPage === pageNum
                        ? 'bg-purple-600 text-white'
                        : 'border border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {pageNum}
                  </button>
                ))}
              </div>
              
              <button
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
        {/* Mobile Card View */}
        <div className="block lg:hidden space-y-4">
          {paginatedParticipants.map((participant) => (
            <div key={participant.id} className="bg-gray-50 rounded-lg p-4 space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-medium text-gray-800">{participant.nome}</h3>
                  <p className="text-sm text-gray-600">{participant.email}</p>
                  <p className="text-sm text-gray-600">{participant.telefone}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleConfirmation(participant)}
                    disabled={participant.isUpdating}
                    className={`p-1 rounded transition-colors ${
                      participant.confirmadoEvento
                        ? 'text-green-600 hover:bg-green-50'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    } ${participant.isUpdating ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    {participant.confirmadoEvento ? (
                      <CheckCircle className="w-5 h-5" />
                    ) : (
                      <XCircle className="w-5 h-5" />
                    )}
                    {participant.isUpdating && (
                      <span className="ml-1 text-xs">...</span>
                    )}
                  </button>
                  {getPaymentButton(participant)}
                  <button
                    onClick={() => handleDeleteParticipant(participant)}
                    disabled={deletingParticipant === participant.id}
                    className={`p-1 text-red-600 hover:bg-red-50 rounded transition-colors ${
                      deletingParticipant === participant.id ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    {deletingParticipant === participant.id ? (
                      <span className="text-xs">...</span>
                    ) : (
                      <Trash2 className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">{participant.cidade}, {participant.estado}</span>
                {getStatusBadge(participant)}
              </div>
              
              {(participant.nomeEmpresa || participant.areaAtuacao) && (
                <div className="text-sm text-gray-600">
                  {participant.nomeEmpresa && (
                    <p className="font-medium">{participant.nomeEmpresa}</p>
                  )}
                  {participant.areaAtuacao && (
                    <p className="text-xs capitalize">
                      {participant.areaAtuacao.replace('-', ' ')}
                    </p>
                  )}
                </div>
              )}
              
              {participant.tipoInscricao === 'paga' && (
                <div className="flex items-center justify-between">
                  {getPaymentButton(participant)}
                </div>
              )}
              
              <div className="text-xs text-gray-500">
                Inscrito em: {new Date(participant.dataInscricao).toLocaleDateString()}
              </div>
            </div>
          ))}
          
          {paginatedParticipants.length === 0 && totalItems === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">Nenhum participante encontrado</p>
            </div>
          )}
        </div>

        {/* Desktop Table View */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full min-w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="text-left py-3 px-4 font-semibold text-gray-700 min-w-[200px]">Nome</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700 min-w-[200px]">Contato</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700 min-w-[180px]">Empresa</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700 min-w-[150px]">Localização</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700 min-w-[100px]">Tipo</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700 min-w-[140px]">Pagamento</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700 min-w-[120px]">Data Inscrição</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700 min-w-[140px]">Status</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700 min-w-[80px]">Ações</th>
              </tr>
            </thead>
            <tbody>
              {paginatedParticipants.map((participant) => (
                <tr key={participant.id} className="border-b border-gray-200 hover:bg-gray-50">
                  {deletingParticipant === participant.id && (
                    <td colSpan={9} className="py-2 px-4">
                      <div className="flex items-center justify-center gap-2 text-red-600">
                        <div className="w-4 h-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin"></div>
                        <span className="text-sm">Excluindo participante...</span>
                      </div>
                    </td>
                  )}
                  {deletingParticipant !== participant.id && (
                    <>
                  <td className="py-4 px-4">
                    <div>
                      <p className="font-medium text-gray-800">{participant.nome}</p>
                      <p className="text-sm text-gray-600">{participant.cpf}</p>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div>
                      <p className="text-sm text-gray-800">{participant.email}</p>
                      <p className="text-sm text-gray-600">{participant.telefone}</p>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div>
                      <p className="text-sm text-gray-800 font-medium">
                        {participant.nomeEmpresa || 'Não informado'}
                      </p>
                      {participant.areaAtuacao && (
                        <p className="text-xs text-gray-600 capitalize">
                          {participant.areaAtuacao.replace('-', ' ')}
                        </p>
                      )}
                      {participant.faturamento && (
                        <p className="text-xs text-gray-500">
                          {participant.faturamento === 'ate-100k' && 'Até R$ 100k'}
                          {participant.faturamento === '100k-500k' && 'R$ 100k - 500k'}
                          {participant.faturamento === '500k-1m' && 'R$ 500k - 1M'}
                          {participant.faturamento === '1m-5m' && 'R$ 1M - 5M'}
                          {participant.faturamento === '5m-10m' && 'R$ 5M - 10M'}
                          {participant.faturamento === 'acima-10m' && 'Acima R$ 10M'}
                          {participant.faturamento === 'nao-informar' && 'Não informado'}
                        </p>
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <p className="text-sm text-gray-800">{participant.cidade}, {participant.estado}</p>
                  </td>
                  <td className="py-4 px-4">
                    {getStatusBadge(participant)}
                  </td>
                  <td className="py-4 px-4">
                    {getPaymentButton(participant)}
                  </td>
                  <td className="py-4 px-4">
                    <p className="text-sm text-gray-800">
                      {new Date(participant.dataInscricao).toLocaleDateString()}
                    </p>
                  </td>
                  <td className="py-4 px-4">
                    <button
                      onClick={() => toggleConfirmation(participant)}
                      className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium transition-colors ${
                        participant.confirmadoEvento
                          ? 'bg-green-100 text-green-800 hover:bg-green-200'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {participant.confirmadoEvento ? (
                        <>
                          <CheckCircle className="w-3 h-3" />
                          Confirmado
                        </>
                      ) : (
                        <>
                          <XCircle className="w-3 h-3" />
                          Não Confirmado
                        </>
                      )}
                    </button>
                  </td>
                    </>
                  )}
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleDeleteParticipant(participant)}
                        disabled={deletingParticipant === participant.id}
                        className={`p-1 text-red-600 hover:bg-red-50 rounded transition-colors ${
                          deletingParticipant === participant.id ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                        title="Remover participante"
                      >
                        {deletingParticipant === participant.id ? (
                          <span className="text-xs">Excluindo...</span>
                        ) : (
                          <Trash2 className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {paginatedParticipants.length === 0 && totalItems === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">Nenhum participante encontrado</p>
            </div>
          )}
        </div>
        
        {/* Paginação inferior (repetida para conveniência) */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-6 pt-6 border-t">
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            
            <div className="flex items-center gap-1">
              {getPageNumbers().map((pageNum) => (
                <button
                  key={pageNum}
                  onClick={() => goToPage(pageNum)}
                  className={`px-3 py-2 text-sm rounded-lg transition-colors ${
                    currentPage === pageNum
                      ? 'bg-purple-600 text-white'
                      : 'border border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {pageNum}
                </button>
              ))}
            </div>
            
            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            
            <div className="ml-4 text-sm text-gray-600">
              Página {currentPage} de {totalPages}
            </div>
          </div>
        )}
      </div>

      {/* Modal de Confirmação */}
      <ConfirmationModal
        isOpen={!!participantToDelete}
        onClose={cancelDeleteParticipant}
        onConfirm={confirmDeleteParticipant}
        title="Excluir Participante"
        message="Tem certeza que deseja excluir este participante?"
        participantInfo={participantToDelete ? {
          nome: participantToDelete.nome,
          email: participantToDelete.email,
          cpf: participantToDelete.cpf,
          tipoInscricao: participantToDelete.tipoInscricao === 'gratuita' ? 'Gratuita' : 'Premium'
        } : undefined}
        isLoading={!!deletingParticipant}
      />

      {/* Notificação de Sucesso */}
      <SuccessNotification
        isVisible={!!successMessage}
        message={successMessage}
        onClose={() => setSuccessMessage('')}
      />
    </div>
  );
};