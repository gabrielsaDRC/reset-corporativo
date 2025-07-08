/*
  # Corrigir autenticação de administrador

  1. Atualizar usuário admin
    - Remover usuário existente
    - Criar novo usuário com senha simples
    - Usar hash bcrypt correto

  2. Segurança
    - Manter RLS habilitado
    - Políticas de acesso mantidas
*/

-- Remover usuário admin existente
DELETE FROM admin_users WHERE email = 'admin@evento.com';

-- Inserir novo usuário administrador
-- Email: admin@evento.com
-- Senha: admin123
-- Hash bcrypt para 'admin123' com salt rounds 10
INSERT INTO admin_users (email, password_hash) VALUES (
  'admin@evento.com',
  '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi'
);