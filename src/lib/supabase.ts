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