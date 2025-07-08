/*
  # Criar bucket para armazenamento de imagens do evento

  1. Bucket
    - Criar bucket 'event-assets' para imagens
    - Configurar como público para acesso direto

  2. Políticas de Segurança
    - Permitir upload para usuários anônimos e autenticados
    - Permitir leitura pública das imagens
    - Permitir exclusão apenas para usuários autenticados
*/

-- Criar bucket para assets do evento
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'event-assets',
  'event-assets',
  true,
  5242880, -- 5MB
  ARRAY['image/jpeg', 'image/png', 'image/gif', 'image/webp']
) ON CONFLICT (id) DO NOTHING;

-- Política para permitir upload de imagens (anônimos e autenticados)
CREATE POLICY "Permitir upload de imagens"
ON storage.objects
FOR INSERT
TO anon, authenticated
WITH CHECK (bucket_id = 'event-assets');

-- Política para permitir leitura pública das imagens
CREATE POLICY "Permitir leitura pública de imagens"
ON storage.objects
FOR SELECT
TO anon, authenticated
USING (bucket_id = 'event-assets');

-- Política para permitir exclusão apenas para autenticados
CREATE POLICY "Permitir exclusão para autenticados"
ON storage.objects
FOR DELETE
TO authenticated
USING (bucket_id = 'event-assets');