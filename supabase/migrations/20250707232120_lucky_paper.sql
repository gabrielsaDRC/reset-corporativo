/*
  # Corrigir políticas RLS para permitir atualizações

  1. Verificar políticas existentes
  2. Corrigir política de atualização para usuários anônimos
  3. Garantir que atualizações funcionem corretamente
*/

-- Remover políticas existentes que podem estar causando conflito
DROP POLICY IF EXISTS "Administradores podem atualizar" ON participants;
DROP POLICY IF EXISTS "Permitir atualizações públicas" ON participants;

-- Criar nova política que permite atualizações tanto para anon quanto authenticated
CREATE POLICY "Permitir atualizações de participantes"
  ON participants
  FOR UPDATE
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);

-- Verificar se a política foi criada corretamente
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'participants' 
    AND policyname = 'Permitir atualizações de participantes'
  ) THEN
    RAISE NOTICE 'Política de atualização criada com sucesso';
  ELSE
    RAISE EXCEPTION 'Falha ao criar política de atualização';
  END IF;
END $$;