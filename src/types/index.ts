export interface Participant {
  id: string;
  nome: string;
  cpf: string;
  email: string;
  telefone: string;
  dataNascimento?: string;
  genero?: string;
  cidade: string;
  estado: string;
  tipoInscricao: 'gratuita' | 'paga';
  statusPagamento: 'pendente' | 'aprovado' | 'cancelado';
  dataInscricao: string;
  confirmadoEvento: boolean;
  isUpdating?: boolean; // Para controle de estado de carregamento
}

export interface EventData {
  id?: string;
  nome: string;
  data: string;
  local: string;
  horario: string;
  descricao: string;
  descricaoParticipantes: string;
  programacao: string[];
  imagemUrl: string;
  contato: {
    email: string;
    telefone: string;
    endereco: string;
  };
  redesSociais: {
    linkedin: string;
    instagram: string;
    twitter: string;
    facebook: string;
    youtube: string;
  };
  inscricaoGratuita: {
    titulo: string;
    descricao: string;
    beneficios: string[];
    disponivel: boolean;
  };
  inscricaoPaga: {
    titulo: string;
    descricao: string;
    beneficios: string[];
    preco: number;
    disponivel: boolean;
  };
  cores: {
    primaria: string;
    secundaria: string;
    gratuita: string;
    premium: string;
    sucesso: string;
    erro: string;
    aviso: string;
  };
}

export interface AdminStats {
  totalInscritos: number;
  inscritosGratuitos: number;
  inscritosPagos: number;
  pagamentosPendentes: number;
  confirmadosEvento: number;
}