/*
  # Corrigir política de exclusão para participantes

  1. Problema
    - A política de exclusão pode estar restrita apenas para authenticated
    - Precisamos permitir exclusão também para anon (usuários não autenticados)

  2. Solução
    - Remover política restritiva existente
    - Criar nova política que permite exclusão para anon e authenticated
*/

-- Remover política de exclusão existente se houver
DROP POLICY IF EXISTS "Administradores podem deletar" ON participants;

-- Criar nova política que permite exclusão tanto para anon quanto authenticated
CREATE POLICY "Permitir exclusão de participantes"
  ON participants
  FOR DELETE
  TO anon, authenticated
  USING (true);

-- Verificar se a política foi criada corretamente
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'participants' 
    AND policyname = 'Permitir exclusão de participantes'
  ) THEN
    RAISE NOTICE 'Política de exclusão criada com sucesso';
  ELSE
    RAISE EXCEPTION 'Falha ao criar política de exclusão';
  END IF;
END $$;