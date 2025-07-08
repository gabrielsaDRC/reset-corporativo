/*
  # Criar tabela de participantes

  1. Nova Tabela
    - `participants`
      - `id` (uuid, primary key)
      - `nome` (text, not null)
      - `cpf` (text, unique, not null)
      - `email` (text, not null)
      - `telefone` (text, not null)
      - `data_nascimento` (date, nullable)
      - `genero` (text, nullable)
      - `cidade` (text, not null)
      - `estado` (text, not null)
      - `tipo_inscricao` (enum: gratuita/paga)
      - `status_pagamento` (enum: pendente/aprovado/cancelado)
      - `data_inscricao` (timestamptz, default now)
      - `confirmado_evento` (boolean, default false)
      - `created_at` (timestamptz, default now)
      - `updated_at` (timestamptz, default now)

  2. Segurança
    - Habilitar RLS na tabela `participants`
    - Adicionar políticas para leitura e escrita públicas (para inscrições)
    - Adicionar políticas para administradores
*/

-- Criar enum para tipo de inscrição
CREATE TYPE inscricao_tipo AS ENUM ('gratuita', 'paga');

-- Criar enum para status de pagamento
CREATE TYPE pagamento_status AS ENUM ('pendente', 'aprovado', 'cancelado');

-- Criar tabela de participantes
CREATE TABLE IF NOT EXISTS participants (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  nome text NOT NULL,
  cpf text UNIQUE NOT NULL,
  email text NOT NULL,
  telefone text NOT NULL,
  data_nascimento date,
  genero text,
  cidade text NOT NULL,
  estado text NOT NULL,
  tipo_inscricao inscricao_tipo NOT NULL DEFAULT 'gratuita',
  status_pagamento pagamento_status NOT NULL DEFAULT 'pendente',
  data_inscricao timestamptz DEFAULT now(),
  confirmado_evento boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Habilitar RLS
ALTER TABLE participants ENABLE ROW LEVEL SECURITY;

-- Política para permitir inserção pública (inscrições)
CREATE POLICY "Permitir inscrições públicas"
  ON participants
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Política para permitir leitura pública (para estatísticas básicas)
CREATE POLICY "Permitir leitura pública"
  ON participants
  FOR SELECT
  TO anon
  USING (true);

-- Política para permitir administradores lerem tudo
CREATE POLICY "Administradores podem ler tudo"
  ON participants
  FOR SELECT
  TO authenticated
  USING (true);

-- Política para permitir administradores atualizarem
CREATE POLICY "Administradores podem atualizar"
  ON participants
  FOR UPDATE
  TO authenticated
  USING (true);

-- Política para permitir administradores deletarem
CREATE POLICY "Administradores podem deletar"
  ON participants
  FOR DELETE
  TO authenticated
  USING (true);

-- Função para atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger para atualizar updated_at
CREATE TRIGGER update_participants_updated_at
  BEFORE UPDATE ON participants
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();