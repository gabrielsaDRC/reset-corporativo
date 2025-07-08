/*
  # Criar bucket de armazenamento para assets do evento

  1. Bucket
    - `event-assets` - Para armazenar imagens e outros arquivos do evento
  
  2. Políticas de Segurança
    - Permitir upload público para imagens
    - Permitir leitura pública dos arquivos
    - Permitir exclusão para administradores autenticados
*/

-- Criar bucket para assets do evento
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'event-assets',
  'event-assets',
  true,
  5242880, -- 5MB em bytes
  ARRAY['image/jpeg', 'image/png', 'image/gif', 'image/webp']
);

-- Política para permitir upload público
CREATE POLICY "Permitir upload público de imagens"
  ON storage.objects
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    bucket_id = 'event-assets' AND
    (storage.foldername(name))[1] = 'event-images'
  );

-- Política para permitir leitura pública
CREATE POLICY "Permitir leitura pública de assets"
  ON storage.objects
  FOR SELECT
  TO anon, authenticated
  USING (bucket_id = 'event-assets');

-- Política para permitir exclusão por administradores
CREATE POLICY "Permitir exclusão por administradores"
  ON storage.objects
  FOR DELETE
  TO authenticated
  USING (bucket_id = 'event-assets');

-- Política para permitir atualização por administradores
CREATE POLICY "Permitir atualização por administradores"
  ON storage.objects
  FOR UPDATE
  TO authenticated
  USING (bucket_id = 'event-assets');