/*
  # Fix RLS policies for event_settings table

  1. Security Updates
    - Add policy for anonymous users to insert event settings
    - Add policy for anonymous users to update event settings
    - Ensure admin functionality works properly

  2. Changes
    - Allow anonymous users to insert new event settings
    - Allow anonymous users to update existing event settings
    - Maintain existing read permissions for both anonymous and authenticated users
*/

-- Drop existing restrictive policies if they exist
DROP POLICY IF EXISTS "Authenticated users can insert event settings" ON event_settings;
DROP POLICY IF EXISTS "Authenticated users can update event settings" ON event_settings;

-- Create new policies that allow anonymous users to manage event settings
-- This is needed for the admin interface to work properly
CREATE POLICY "Allow anonymous to insert event settings"
  ON event_settings
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Allow anonymous to update event settings"
  ON event_settings
  FOR UPDATE
  TO anon
  USING (true)
  WITH CHECK (true);

-- Recreate policies for authenticated users as well
CREATE POLICY "Allow authenticated to insert event settings"
  ON event_settings
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Allow authenticated to update event settings"
  ON event_settings
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);