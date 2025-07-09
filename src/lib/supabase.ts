import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types for database
export interface Database {
  public: {
    Tables: {
      participants: {
        Row: {
          id: string;
          nome: string;
          cpf: string;
          email: string;
          telefone: string;
          data_nascimento: string | null;
          genero: string | null;
          cidade: string;
          estado: string;
          tipo_inscricao: 'gratuita' | 'paga';
          status_pagamento: 'pendente' | 'aprovado' | 'cancelado';
          data_inscricao: string;
          confirmado_evento: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          nome: string;
          cpf: string;
          email: string;
          telefone: string;
          data_nascimento?: string | null;
          genero?: string | null;
          cidade: string;
          estado: string;
          tipo_inscricao: 'gratuita' | 'paga';
          status_pagamento: 'pendente' | 'aprovado' | 'cancelado';
          data_inscricao?: string;
          confirmado_evento?: boolean;
          created_at?: string;
          updated_at?: string;
          nome_empresa?: string | null;
          faturamento?: string | null;
          area_atuacao?: string | null;
        };
        Update: {
          id?: string;
          nome?: string;
          cpf?: string;
          email?: string;
          telefone?: string;
          data_nascimento?: string | null;
          genero?: string | null;
          cidade?: string;
          estado?: string;
          tipo_inscricao?: 'gratuita' | 'paga';
          status_pagamento?: 'pendente' | 'aprovado' | 'cancelado';
          data_inscricao?: string;
          confirmado_evento?: boolean;
          created_at?: string;
          updated_at?: string;
          nome_empresa?: string | null;
          faturamento?: string | null;
          area_atuacao?: string | null;
        };
      };
      event_settings: {
        Row: {
          id: string;
          nome: string;
          data: string;
          local: string;
          horario: string;
          descricao: string;
          programacao: string[];
          imagem_url: string;
          inscricao_gratuita_titulo: string;
          inscricao_gratuita_descricao: string;
          inscricao_gratuita_beneficios: string[];
          inscricao_gratuita_disponivel: boolean;
          inscricao_paga_titulo: string;
          inscricao_paga_descricao: string;
          inscricao_paga_beneficios: string[];
          inscricao_paga_preco: number;
          inscricao_paga_disponivel: boolean;
          created_at: string;
          updated_at: string;
          contato_email: string | null;
          contato_telefone: string | null;
          contato_endereco: string | null;
          linkedin_url: string | null;
          instagram_url: string | null;
          twitter_url: string | null;
          facebook_url: string | null;
          youtube_url: string | null;
          descricao_participantes: string | null;
          cor_primaria: string | null;
          cor_secundaria: string | null;
          cor_gratuita: string | null;
          cor_premium: string | null;
          cor_sucesso: string | null;
          cor_erro: string | null;
          cor_aviso: string | null;
          imagem_tamanho: string | null;
          link_pagamento: string | null;
        };
        Insert: {
          id?: string;
          nome: string;
          data: string;
          local: string;
          horario: string;
          descricao: string;
          programacao: string[];
          imagem_url: string;
          inscricao_gratuita_titulo: string;
          inscricao_gratuita_descricao: string;
          inscricao_gratuita_beneficios: string[];
          inscricao_gratuita_disponivel?: boolean;
          inscricao_paga_titulo: string;
          inscricao_paga_descricao: string;
          inscricao_paga_beneficios: string[];
          inscricao_paga_preco: number;
          inscricao_paga_disponivel?: boolean;
          created_at?: string;
          updated_at?: string;
          contato_email?: string | null;
          contato_telefone?: string | null;
          contato_endereco?: string | null;
          linkedin_url?: string | null;
          instagram_url?: string | null;
          twitter_url?: string | null;
          facebook_url?: string | null;
          youtube_url?: string | null;
          descricao_participantes?: string | null;
          cor_primaria?: string | null;
          cor_secundaria?: string | null;
          cor_gratuita?: string | null;
          cor_premium?: string | null;
          cor_sucesso?: string | null;
          cor_erro?: string | null;
          cor_aviso?: string | null;
          imagem_tamanho?: string | null;
          link_pagamento?: string | null;
        };
        Update: {
          id?: string;
          nome?: string;
          data?: string;
          local?: string;
          horario?: string;
          descricao?: string;
          programacao?: string[];
          imagem_url?: string;
          inscricao_gratuita_titulo?: string;
          inscricao_gratuita_descricao?: string;
          inscricao_gratuita_beneficios?: string[];
          inscricao_gratuita_disponivel?: boolean;
          inscricao_paga_titulo?: string;
          inscricao_paga_descricao?: string;
          inscricao_paga_beneficios?: string[];
          inscricao_paga_preco?: number;
          inscricao_paga_disponivel?: boolean;
          created_at?: string;
          updated_at?: string;
          contato_email?: string | null;
          contato_telefone?: string | null;
          contato_endereco?: string | null;
          linkedin_url?: string | null;
          instagram_url?: string | null;
          twitter_url?: string | null;
          facebook_url?: string | null;
          youtube_url?: string | null;
          descricao_participantes?: string | null;
          cor_primaria?: string | null;
          cor_secundaria?: string | null;
          cor_gratuita?: string | null;
          cor_premium?: string | null;
          cor_sucesso?: string | null;
          cor_erro?: string | null;
          cor_aviso?: string | null;
          imagem_tamanho?: string | null;
          link_pagamento?: string | null;
        };
      };
      admin_users: {
        Row: {
          id: string;
          email: string;
          password_hash: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          password_hash: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          password_hash?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
  };
}