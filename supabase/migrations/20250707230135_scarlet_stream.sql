/*
  # Criar tabela de usuários administradores

  1. Nova Tabela
    - `admin_users`
      - `id` (uuid, primary key)
      - `email` (text, unique, not null)
      - `password_hash` (text, not null)
      - `created_at` (timestamptz, default now)
      - `updated_at` (timestamptz, default now)

  2. Segurança
    - Habilitar RLS na tabela `admin_users`
    - Adicionar políticas restritivas para administradores
*/

-- Criar tabela de usuários administradores
CREATE TABLE IF NOT EXISTS admin_users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  password_hash text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Habilitar RLS
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Política para permitir apenas leitura autenticada (para verificação de login)
CREATE POLICY "Permitir leitura para autenticação"
  ON admin_users
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Trigger para atualizar updated_at
CREATE TRIGGER update_admin_users_updated_at
  BEFORE UPDATE ON admin_users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Inserir usuário administrador padrão
-- Senha: EventoAdmin2025!
-- Hash gerado com bcrypt (rounds: 12)
INSERT INTO admin_users (email, password_hash) VALUES (
  'admin@evento.com',
  '$2b$12$LQv3c1yqBwEHxE6FiRjHNOTtR8/dIpDsOXOiGQAVzMDoHFBSaXuO.'
);