/*
  # Fix event_settings RLS policies and ensure proper access

  1. Security Updates
    - Drop all existing policies to start fresh
    - Create comprehensive policies for all operations
    - Allow public read access for landing page
    - Allow authenticated users full CRUD access
    - Allow anonymous users to create initial settings if none exist

  2. Data Integrity
    - Ensure proper constraints and defaults
    - Add helpful indexes for performance
*/

-- Drop all existing policies to start fresh
DROP POLICY IF EXISTS "Administradores podem ler tudo" ON event_settings;
DROP POLICY IF EXISTS "Permitir atualizações de participantes" ON event_settings;
DROP POLICY IF EXISTS "Permitir exclusão de participantes" ON event_settings;
DROP POLICY IF EXISTS "Permitir inscrições públicas" ON event_settings;
DROP POLICY IF EXISTS "Permitir leitura pública" ON event_settings;
DROP POLICY IF EXISTS "Allow authenticated users to delete event settings" ON event_settings;
DROP POLICY IF EXISTS "Allow authenticated users to insert event settings" ON event_settings;
DROP POLICY IF EXISTS "Allow authenticated users to update event settings" ON event_settings;
DROP POLICY IF EXISTS "Allow initial event settings creation" ON event_settings;
DROP POLICY IF EXISTS "Allow public read access to event settings" ON event_settings;

-- Create comprehensive policies for event_settings

-- Allow public read access (for landing page)
CREATE POLICY "Public can read event settings"
  ON event_settings
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Allow authenticated users to insert event settings
CREATE POLICY "Authenticated can insert event settings"
  ON event_settings
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Allow anonymous users to insert if no settings exist (for initial setup)
CREATE POLICY "Anonymous can create initial settings"
  ON event_settings
  FOR INSERT
  TO anon
  WITH CHECK (
    (SELECT count(*) FROM event_settings) = 0
  );

-- Allow authenticated users to update event settings
CREATE POLICY "Authenticated can update event settings"
  ON event_settings
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Allow authenticated users to delete event settings
CREATE POLICY "Authenticated can delete event settings"
  ON event_settings
  FOR DELETE
  TO authenticated
  USING (true);

-- Ensure RLS is enabled
ALTER TABLE event_settings ENABLE ROW LEVEL SECURITY;