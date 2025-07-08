/*
  # Fix RLS policies for event_settings table

  1. Security Changes
    - Drop existing restrictive policies that prevent authenticated users from updating
    - Add proper policies for authenticated users to insert and update event settings
    - Ensure anonymous users can still read event settings
    - Allow authenticated users full CRUD access to event settings

  2. Policy Updates
    - Remove the restrictive "Anonymous can create initial settings" policy
    - Add comprehensive policies for authenticated users
    - Maintain read access for anonymous users
*/

-- Drop existing problematic policies
DROP POLICY IF EXISTS "Anonymous can create initial settings" ON event_settings;
DROP POLICY IF EXISTS "Authenticated can insert event settings" ON event_settings;
DROP POLICY IF EXISTS "Authenticated can update event settings" ON event_settings;
DROP POLICY IF EXISTS "Authenticated can delete event settings" ON event_settings;

-- Create new comprehensive policies for authenticated users
CREATE POLICY "Authenticated users can insert event settings"
  ON event_settings
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update event settings"
  ON event_settings
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete event settings"
  ON event_settings
  FOR DELETE
  TO authenticated
  USING (true);

-- Keep the existing read policy for both anonymous and authenticated users
-- This should already exist: "Public can read event settings"