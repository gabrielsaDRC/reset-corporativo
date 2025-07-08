/*
  # Criar tabela de configurações do evento

  1. Nova Tabela
    - `event_settings`
      - `id` (uuid, primary key)
      - `nome` (text, not null)
      - `data` (text, not null)
      - `local` (text, not null)
      - `horario` (text, not null)
      - `descricao` (text, not null)
      - `programacao` (text array)
      - `imagem_url` (text, not null)
      - `inscricao_gratuita_titulo` (text, not null)
      - `inscricao_gratuita_descricao` (text, not null)
      - `inscricao_gratuita_beneficios` (text array)
      - `inscricao_gratuita_disponivel` (boolean, default true)
      - `inscricao_paga_titulo` (text, not null)
      - `inscricao_paga_descricao` (text, not null)
      - `inscricao_paga_beneficios` (text array)
      - `inscricao_paga_preco` (numeric, not null)
      - `inscricao_paga_disponivel` (boolean, default true)
      - `created_at` (timestamptz, default now)
      - `updated_at` (timestamptz, default now)

  2. Segurança
    - Habilitar RLS na tabela `event_settings`
    - Adicionar políticas para leitura pública
    - Adicionar políticas para administradores
*/

-- Criar tabela de configurações do evento
CREATE TABLE IF NOT EXISTS event_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  nome text NOT NULL,
  data text NOT NULL,
  local text NOT NULL,
  horario text NOT NULL,
  descricao text NOT NULL,
  programacao text[] DEFAULT '{}',
  imagem_url text NOT NULL,
  inscricao_gratuita_titulo text NOT NULL,
  inscricao_gratuita_descricao text NOT NULL,
  inscricao_gratuita_beneficios text[] DEFAULT '{}',
  inscricao_gratuita_disponivel boolean DEFAULT true,
  inscricao_paga_titulo text NOT NULL,
  inscricao_paga_descricao text NOT NULL,
  inscricao_paga_beneficios text[] DEFAULT '{}',
  inscricao_paga_preco numeric(10,2) NOT NULL DEFAULT 0,
  inscricao_paga_disponivel boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Habilitar RLS
ALTER TABLE event_settings ENABLE ROW LEVEL SECURITY;

-- Política para permitir leitura pública
CREATE POLICY "Permitir leitura pública das configurações"
  ON event_settings
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Política para permitir administradores atualizarem
CREATE POLICY "Administradores podem atualizar configurações"
  ON event_settings
  FOR UPDATE
  TO authenticated
  USING (true);

-- Política para permitir administradores inserirem
CREATE POLICY "Administradores podem inserir configurações"
  ON event_settings
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Trigger para atualizar updated_at
CREATE TRIGGER update_event_settings_updated_at
  BEFORE UPDATE ON event_settings
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Inserir configurações padrão do evento
INSERT INTO event_settings (
  nome,
  data,
  local,
  horario,
  descricao,
  programacao,
  imagem_url,
  inscricao_gratuita_titulo,
  inscricao_gratuita_descricao,
  inscricao_gratuita_beneficios,
  inscricao_paga_titulo,
  inscricao_paga_descricao,
  inscricao_paga_beneficios,
  inscricao_paga_preco
) VALUES (
  'Evento X - Transformação Digital 2025',
  '15 de Março de 2025',
  'Centro de Convenções Tech Hub',
  '09:00 às 18:00',
  'O maior evento de tecnologia e inovação do ano! Junte-se a especialistas, empreendedores e líderes do setor para explorar as últimas tendências em transformação digital.',
  ARRAY[
    '09:00 - 10:00 | Credenciamento e Welcome Coffee',
    '10:00 - 11:30 | Palestra Principal: O Futuro da IA',
    '11:30 - 12:00 | Coffee Break',
    '12:00 - 13:30 | Mesa Redonda: Inovação no Brasil',
    '13:30 - 14:30 | Almoço',
    '14:30 - 16:00 | Workshops Práticos',
    '16:00 - 16:30 | Networking',
    '16:30 - 18:00 | Encerramento e Premiação'
  ],
  'https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  'Inscrição Gratuita',
  'Acesso completo ao evento com todas as palestras e workshops.',
  ARRAY[
    'Acesso a todas as palestras',
    'Material digital',
    'Certificado de participação',
    'Coffee breaks'
  ],
  'Inscrição Premium',
  'Todos os benefícios + exclusividades para uma experiência completa.',
  ARRAY[
    'Tudo da inscrição gratuita',
    'Almoço incluído',
    'Kit exclusivo do evento',
    'Acesso VIP ao networking',
    'Sessão de mentoria'
  ],
  97.00
);