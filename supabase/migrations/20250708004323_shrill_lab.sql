/*
  # Adicionar campos de contato e redes sociais

  1. Novos Campos
    - `contato_email` (text) - Email de contato
    - `contato_telefone` (text) - Telefone de contato  
    - `contato_endereco` (text) - Endereço de contato
    - `linkedin_url` (text) - URL do LinkedIn
    - `instagram_url` (text) - URL do Instagram
    - `twitter_url` (text) - URL do Twitter
    - `facebook_url` (text) - URL do Facebook
    - `youtube_url` (text) - URL do YouTube

  2. Valores Padrão
    - Adiciona valores padrão para os novos campos
    - Atualiza registros existentes com valores padrão
*/

-- Adicionar campos de contato
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'event_settings' AND column_name = 'contato_email'
  ) THEN
    ALTER TABLE event_settings ADD COLUMN contato_email text DEFAULT 'contato@evento.com';
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'event_settings' AND column_name = 'contato_telefone'
  ) THEN
    ALTER TABLE event_settings ADD COLUMN contato_telefone text DEFAULT '(11) 9999-9999';
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'event_settings' AND column_name = 'contato_endereco'
  ) THEN
    ALTER TABLE event_settings ADD COLUMN contato_endereco text DEFAULT 'Centro de Convenções Tech Hub';
  END IF;
END $$;

-- Adicionar campos de redes sociais
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'event_settings' AND column_name = 'linkedin_url'
  ) THEN
    ALTER TABLE event_settings ADD COLUMN linkedin_url text DEFAULT '';
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'event_settings' AND column_name = 'instagram_url'
  ) THEN
    ALTER TABLE event_settings ADD COLUMN instagram_url text DEFAULT '';
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'event_settings' AND column_name = 'twitter_url'
  ) THEN
    ALTER TABLE event_settings ADD COLUMN twitter_url text DEFAULT '';
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'event_settings' AND column_name = 'facebook_url'
  ) THEN
    ALTER TABLE event_settings ADD COLUMN facebook_url text DEFAULT '';
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'event_settings' AND column_name = 'youtube_url'
  ) THEN
    ALTER TABLE event_settings ADD COLUMN youtube_url text DEFAULT '';
  END IF;
END $$;

-- Atualizar registros existentes com valores padrão para redes sociais
UPDATE event_settings 
SET 
  contato_email = COALESCE(contato_email, 'contato@evento.com'),
  contato_telefone = COALESCE(contato_telefone, '(11) 9999-9999'),
  contato_endereco = COALESCE(contato_endereco, 'Centro de Convenções Tech Hub'),
  linkedin_url = COALESCE(linkedin_url, 'https://linkedin.com/company/evento-x'),
  instagram_url = COALESCE(instagram_url, 'https://instagram.com/evento_x'),
  twitter_url = COALESCE(twitter_url, 'https://twitter.com/evento_x'),
  facebook_url = COALESCE(facebook_url, 'https://facebook.com/evento.x'),
  youtube_url = COALESCE(youtube_url, 'https://youtube.com/@evento-x')
WHERE 
  contato_email IS NULL 
  OR contato_telefone IS NULL 
  OR contato_endereco IS NULL
  OR linkedin_url IS NULL 
  OR instagram_url IS NULL 
  OR twitter_url IS NULL 
  OR facebook_url IS NULL 
  OR youtube_url IS NULL;