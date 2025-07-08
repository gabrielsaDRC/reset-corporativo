/*
  # Fix event_settings RLS policies

  1. Security Updates
    - Drop existing restrictive policies
    - Create new policies that allow proper CRUD operations
    - Allow anonymous users to read event settings (for public event page)
    - Allow authenticated users to manage event settings (for admin)
    - Allow creation of initial event settings if none exist

  2. Policy Changes
    - SELECT: Allow both anonymous and authenticated users to read
    - INSERT: Allow authenticated users and anonymous users (for initial setup)
    - UPDATE: Allow authenticated users to update settings
    - DELETE: Allow authenticated users to delete settings (if needed)
*/

-- Drop existing policies to start fresh
DROP POLICY IF EXISTS "Administradores podem atualizar configurações" ON event_settings;
DROP POLICY IF EXISTS "Administradores podem inserir configurações" ON event_settings;
DROP POLICY IF EXISTS "Permitir leitura pública das configurações" ON event_settings;

-- Create new comprehensive policies

-- Allow public read access to event settings
CREATE POLICY "Allow public read access to event settings"
  ON event_settings
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Allow authenticated users to insert event settings
CREATE POLICY "Allow authenticated users to insert event settings"
  ON event_settings
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Allow anonymous users to insert if no settings exist (for initial setup)
CREATE POLICY "Allow initial event settings creation"
  ON event_settings
  FOR INSERT
  TO anon
  WITH CHECK (
    (SELECT count(*) FROM event_settings) = 0
  );

-- Allow authenticated users to update event settings
CREATE POLICY "Allow authenticated users to update event settings"
  ON event_settings
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Allow authenticated users to delete event settings (optional, for cleanup)
CREATE POLICY "Allow authenticated users to delete event settings"
  ON event_settings
  FOR DELETE
  TO authenticated
  USING (true);