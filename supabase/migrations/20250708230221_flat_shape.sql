/*
  # Adicionar campos de empresa aos participantes

  1. Novos Campos
    - `nome_empresa` (text, nullable) - Nome da empresa do participante
    - `faturamento` (text, nullable) - Faturamento da empresa
    - `area_atuacao` (text, nullable) - Área de atuação/negócio da empresa

  2. Campos Opcionais
    - Todos os novos campos são opcionais (nullable)
    - Não afetam inscrições existentes
*/

-- Adicionar campo nome da empresa
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'participants' AND column_name = 'nome_empresa'
  ) THEN
    ALTER TABLE participants ADD COLUMN nome_empresa text;
  END IF;
END $$;

-- Adicionar campo faturamento
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'participants' AND column_name = 'faturamento'
  ) THEN
    ALTER TABLE participants ADD COLUMN faturamento text;
  END IF;
END $$;

-- Adicionar campo área de atuação
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'participants' AND column_name = 'area_atuacao'
  ) THEN
    ALTER TABLE participants ADD COLUMN area_atuacao text;
  END IF;
END $$;

-- Verificar se os campos foram criados corretamente
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'participants' AND column_name = 'nome_empresa'
  ) AND EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'participants' AND column_name = 'faturamento'
  ) AND EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'participants' AND column_name = 'area_atuacao'
  ) THEN
    RAISE NOTICE 'Campos de empresa adicionados com sucesso à tabela participants';
  ELSE
    RAISE EXCEPTION 'Falha ao adicionar campos de empresa';
  END IF;
END $$;