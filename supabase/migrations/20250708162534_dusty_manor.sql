/*
  # Adicionar configurações de cores personalizáveis

  1. Novos Campos
    - `cor_primaria` (text) - Cor principal do site (padrão: purple)
    - `cor_secundaria` (text) - Cor secundária do site (padrão: blue)
    - `cor_gratuita` (text) - Cor para inscrição gratuita (padrão: purple)
    - `cor_premium` (text) - Cor para inscrição premium (padrão: orange)
    - `cor_sucesso` (text) - Cor para mensagens de sucesso (padrão: green)
    - `cor_erro` (text) - Cor para mensagens de erro (padrão: red)
    - `cor_aviso` (text) - Cor para avisos (padrão: yellow)

  2. Valores Padrão
    - Define cores padrão baseadas no design atual
    - Atualiza registros existentes
*/

-- Adicionar campos de cores
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'event_settings' AND column_name = 'cor_primaria'
  ) THEN
    ALTER TABLE event_settings ADD COLUMN cor_primaria text DEFAULT 'purple';
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'event_settings' AND column_name = 'cor_secundaria'
  ) THEN
    ALTER TABLE event_settings ADD COLUMN cor_secundaria text DEFAULT 'blue';
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'event_settings' AND column_name = 'cor_gratuita'
  ) THEN
    ALTER TABLE event_settings ADD COLUMN cor_gratuita text DEFAULT 'purple';
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'event_settings' AND column_name = 'cor_premium'
  ) THEN
    ALTER TABLE event_settings ADD COLUMN cor_premium text DEFAULT 'orange';
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'event_settings' AND column_name = 'cor_sucesso'
  ) THEN
    ALTER TABLE event_settings ADD COLUMN cor_sucesso text DEFAULT 'green';
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'event_settings' AND column_name = 'cor_erro'
  ) THEN
    ALTER TABLE event_settings ADD COLUMN cor_erro text DEFAULT 'red';
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'event_settings' AND column_name = 'cor_aviso'
  ) THEN
    ALTER TABLE event_settings ADD COLUMN cor_aviso text DEFAULT 'yellow';
  END IF;
END $$;

-- Atualizar registros existentes com valores padrão
UPDATE event_settings 
SET 
  cor_primaria = COALESCE(cor_primaria, 'purple'),
  cor_secundaria = COALESCE(cor_secundaria, 'blue'),
  cor_gratuita = COALESCE(cor_gratuita, 'purple'),
  cor_premium = COALESCE(cor_premium, 'orange'),
  cor_sucesso = COALESCE(cor_sucesso, 'green'),
  cor_erro = COALESCE(cor_erro, 'red'),
  cor_aviso = COALESCE(cor_aviso, 'yellow')
WHERE 
  cor_primaria IS NULL 
  OR cor_secundaria IS NULL 
  OR cor_gratuita IS NULL 
  OR cor_premium IS NULL 
  OR cor_sucesso IS NULL 
  OR cor_erro IS NULL 
  OR cor_aviso IS NULL;