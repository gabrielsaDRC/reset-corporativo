/*
  # Add INSERT policy for admin_users table

  1. Security Changes
    - Add policy to allow creating the first admin user when table is empty
    - This enables the initial setup process for the application

  2. Policy Details
    - Allows INSERT operations when no admin users exist yet
    - Uses COUNT check to ensure only the first user can be created via this policy
    - Maintains security by preventing unauthorized admin creation after first user
*/

-- Add policy to allow creating the first admin user
CREATE POLICY "Allow creating first admin user"
  ON admin_users
  FOR INSERT
  TO anon
  WITH CHECK ((SELECT COUNT(*) FROM admin_users) = 0);