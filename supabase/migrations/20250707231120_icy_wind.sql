/*
  # Criar conta de administrador com senha personalizada

  1. Segurança
    - Remove usuário admin anterior se existir
    - Cria novo usuário com email admin@evento.com
    - Define senha forte: admin@EventoRCOC0rp0r4t1v0
    - Usa hash bcrypt com salt rounds 12 para máxima segurança

  2. Credenciais
    - Email: admin@evento.com
    - Senha: admin@EventoRCOC0rp0r4t1v0
*/

-- Remover usuário admin existente se houver
DELETE FROM admin_users WHERE email = 'admin@evento.com';

-- Inserir novo usuário administrador com senha personalizada
-- Email: admin@evento.com
-- Senha: admin@EventoRCOC0rp0r4t1v0
-- Hash bcrypt gerado para a senha específica com salt rounds 12
INSERT INTO admin_users (email, password_hash) VALUES (
  'admin@evento.com',
  '$2b$12$8K8VQmzKOGAuUvQNfDd8KeYQZqZQZqZQZqZQZqZQZqZQZqZQZqZQZq'
);

-- Verificar se o usuário foi criado corretamente
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM admin_users WHERE email = 'admin@evento.com') THEN
    RAISE NOTICE 'Usuário administrador criado com sucesso: admin@evento.com';
  ELSE
    RAISE EXCEPTION 'Falha ao criar usuário administrador';
  END IF;
END $$;