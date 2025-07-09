import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Participant, EventData, AdminStats } from '../types';
import { participantService, eventService, authService } from '../services/supabaseService';

interface AppContextType {
  participants: Participant[];
  addParticipant: (participant: Omit<Participant, 'id' | 'dataInscricao'>) => Promise<void>;
  updateParticipant: (id: string, updates: Partial<Participant>) => Promise<void>;
  removeParticipant: (id: string) => Promise<void>;
  getStats: () => AdminStats;
  eventData: EventData;
  updateEventData: (newEventData: EventData) => Promise<void>;
  isAdmin: boolean;
  setIsAdmin: (value: boolean) => void;
  login: (email: string, password: string) => Promise<boolean>;
  loading: boolean;
  error: string | null;
  isFirstUser: boolean;
  checkFirstUser: () => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};

interface AppProviderProps {
  children: ReactNode;
}

const defaultEventData: EventData = {
  nome: "Evento X - Transformação Digital 2025",
  data: "15 de Março de 2025",
  local: "Centro de Convenções Tech Hub",
  horario: "09:00 às 18:00",
  descricao: "O maior evento de tecnologia e inovação do ano! Junte-se a especialistas, empreendedores e líderes do setor para explorar as últimas tendências em transformação digital.",
  descricaoParticipantes: "500+ Participantes",
  programacao: [
    "09:00 - 10:00 | Credenciamento e Welcome Coffee",
    "10:00 - 11:30 | Palestra Principal: O Futuro da IA",
    "11:30 - 12:00 | Coffee Break",
    "12:00 - 13:30 | Mesa Redonda: Inovação no Brasil",
    "13:30 - 14:30 | Almoço",
    "14:30 - 16:00 | Workshops Práticos",
    "16:00 - 16:30 | Networking",
    "16:30 - 18:00 | Encerramento e Premiação"
  ],
  imagemUrl: "https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  contato: {
    email: "contato@evento.com",
    telefone: "(11) 9999-9999",
    endereco: "Centro de Convenções Tech Hub"
  },
  redesSociais: {
    linkedin: "https://linkedin.com/company/evento-x",
    instagram: "https://instagram.com/evento_x",
    twitter: "https://twitter.com/evento_x",
    facebook: "https://facebook.com/evento.x",
    youtube: "https://youtube.com/@evento-x"
  },
  inscricaoGratuita: {
    titulo: "Inscrição Gratuita",
    descricao: "Acesso completo ao evento com todas as palestras e workshops.",
    beneficios: [
      "Acesso a todas as palestras",
      "Material digital",
      "Certificado de participação",
      "Coffee breaks"
    ],
    disponivel: true
  },
  inscricaoPaga: {
    titulo: "Inscrição Premium",
    descricao: "Todos os benefícios + exclusividades para uma experiência completa.",
    beneficios: [
      "Tudo da inscrição gratuita",
      "Almoço incluído",
      "Kit exclusivo do evento",
      "Acesso VIP ao networking",
      "Sessão de mentoria"
    ],
    preco: 97,
    disponivel: true
  },
  cores: {
    primaria: 'purple',
    secundaria: 'blue',
    gratuita: 'purple',
    premium: 'orange',
    sucesso: 'green',
    erro: 'red',
    aviso: 'yellow'
  }
};

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [eventData, setEventData] = useState<EventData>(defaultEventData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFirstUser, setIsFirstUser] = useState(false);

  // Carregar dados iniciais
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Carregar configurações do evento primeiro
        try {
          const eventSettings = await eventService.get();
          setEventData(eventSettings);
          console.log('Configurações do evento carregadas:', eventSettings);
        } catch (eventError) {
          console.error('Erro ao carregar configurações do evento:', eventError);
          // Manter dados padrão se houver erro
        }

        // Carregar participantes
        try {
          const participantsList = await participantService.getAll();
          setParticipants(participantsList);
          console.log('Participantes carregados:', participantsList.length);
        } catch (participantsError) {
          console.error('Erro ao carregar participantes:', participantsError);
          // Manter lista vazia se houver erro
        }

        // Verificar se é o primeiro usuário
        try {
          const firstUser = await authService.checkIfFirstUser();
          setIsFirstUser(firstUser);
        } catch (authError) {
          console.error('Erro ao verificar primeiro usuário:', authError);
        }

        // Adicionar um pequeno delay para garantir que tudo carregou
        await new Promise(resolve => setTimeout(resolve, 800));
      } catch (err) {
        console.error('Erro ao carregar dados iniciais:', err);
        setError('Erro ao conectar com o banco de dados.');
      } finally {
        setLoading(false);
      }
    };

    loadInitialData();
  }, []);

  const updateEventData = async (newEventData: EventData) => {
    try {
      setError(null);
      console.log('AppContext: Atualizando dados do evento:', newEventData);
      console.log('AppContext: Cores sendo salvas:', newEventData.cores);
      const updatedEventData = await eventService.update(newEventData);
      setEventData(updatedEventData);
      console.log('AppContext: Dados do evento atualizados com sucesso:', updatedEventData);
      console.log('AppContext: Cores salvas:', updatedEventData.cores);
    } catch (err) {
      console.error('Erro ao atualizar configurações do evento:', err);
      setError('Erro ao salvar configurações do evento');
      throw err;
    }
  };

  const addParticipant = async (participant: Omit<Participant, 'id' | 'dataInscricao'>) => {
    try {
      setError(null);
      const newParticipant = await participantService.create(participant);
      setParticipants(prev => [newParticipant, ...prev]);
    } catch (err) {
      console.error('Erro ao adicionar participante:', err);
      // Capturar a mensagem específica do erro ou usar uma mensagem genérica
      const errorMessage = err instanceof Error ? err.message : 'Erro ao realizar inscrição';
      setError(errorMessage);
      throw err;
    }
  };

  const updateParticipant = async (id: string, updates: Partial<Participant>) => {
    try {
      setError(null);
      console.log('AppContext: Atualizando participante', { id, updates });
      await participantService.update(id, updates);
      console.log('AppContext: Participante atualizado no Supabase, atualizando estado local');
      setParticipants(prev => 
        prev.map(p => p.id === id ? { ...p, ...updates } : p)
      );
      console.log('AppContext: Estado local atualizado');
    } catch (err) {
      console.error('Erro ao atualizar participante:', err);
      setError('Erro ao atualizar participante');
      throw err;
    }
  };

  const removeParticipant = async (id: string) => {
    try {
      setError(null);
      console.log('AppContext: Removendo participante', id);
      await participantService.delete(id);
      console.log('AppContext: Participante removido do Supabase, atualizando estado local');
      setParticipants(prev => prev.filter(p => p.id !== id));
      console.log('AppContext: Estado local atualizado');
    } catch (err) {
      console.error('Erro ao remover participante:', err);
      setError('Erro ao remover participante');
      throw err;
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setError(null);
      const isValid = await authService.login(email, password);
      if (isValid) {
        setIsAdmin(true);
      }
      return isValid;
    } catch (err) {
      console.error('Erro no login:', err);
      setError('Erro ao fazer login');
      return false;
    }
  };

  const checkFirstUser = async () => {
    try {
      const firstUser = await authService.checkIfFirstUser();
      setIsFirstUser(firstUser);
    } catch (err) {
      console.error('Erro ao verificar primeiro usuário:', err);
    }
  };

  const getStats = (): AdminStats => {
    return {
      totalInscritos: participants.length,
      inscritosGratuitos: participants.filter(p => p.tipoInscricao === 'gratuita').length,
      inscritosPagos: participants.filter(p => p.tipoInscricao === 'paga').length,
      pagamentosPendentes: participants.filter(p => p.tipoInscricao === 'paga' && p.statusPagamento === 'pendente').length,
      confirmadosEvento: participants.filter(p => p.confirmadoEvento).length
    };
  };

  return (
    <AppContext.Provider
      value={{
        participants,
        addParticipant,
        updateParticipant,
        removeParticipant,
        getStats,
        eventData,
        updateEventData,
        isAdmin,
        setIsAdmin,
        login,
        loading,
        error,
        isFirstUser,
        checkFirstUser
      }}
    >
      {children}
    </AppContext.Provider>
  );
};