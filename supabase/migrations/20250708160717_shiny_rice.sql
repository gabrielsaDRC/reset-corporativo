/*
  # Adicionar campo para descrição de participantes

  1. Novo Campo
    - `descricao_participantes` (text) - Descrição do número de participantes (ex: "500+ Participantes")

  2. Valor Padrão
    - Define valor padrão como "500+ Participantes"
    - Atualiza registros existentes com o valor padrão
*/

-- Adicionar campo de descrição de participantes
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'event_settings' AND column_name = 'descricao_participantes'
  ) THEN
    ALTER TABLE event_settings ADD COLUMN descricao_participantes text DEFAULT '500+ Participantes';
  END IF;
END $$;

-- Atualizar registros existentes com valor padrão
UPDATE event_settings 
SET descricao_participantes = COALESCE(descricao_participantes, '500+ Participantes')
WHERE descricao_participantes IS NULL OR descricao_participantes = '';