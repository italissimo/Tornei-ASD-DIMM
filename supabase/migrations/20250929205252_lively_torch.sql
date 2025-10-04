/*
  # Create highlights table and storage

  1. New Tables
    - `highlights`
      - `id` (serial, primary key)
      - `title` (varchar, required)
      - `description` (text, optional)
      - `file_path` (text, required) - path in storage bucket
      - `file_type` (varchar, required) - 'image' or 'video'
      - `category` (varchar, optional) - 'calcio5' or 'calcio7'
      - `upload_date` (timestamp, default now)
      - `featured` (boolean, default false)
      - `views` (integer, default 0)
      - `likes` (integer, default 0)

  2. Storage
    - Create 'highlights' bucket for media files
    - Enable public access for the bucket

  3. Security
    - Enable RLS on highlights table
    - Add policies for public read access
    - Add policies for admin write access
*/

-- Create highlights table
CREATE TABLE IF NOT EXISTS highlights (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  file_path TEXT NOT NULL,
  file_type VARCHAR(10) NOT NULL CHECK (file_type IN ('image', 'video')),
  category VARCHAR(50) CHECK (category IN ('calcio5', 'calcio7')),
  upload_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  featured BOOLEAN DEFAULT FALSE,
  views INTEGER DEFAULT 0,
  likes INTEGER DEFAULT 0
);

-- Enable RLS
ALTER TABLE highlights ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Anyone can read highlights"
  ON highlights
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Admins can modify highlights"
  ON highlights
  FOR ALL
  TO authenticated
  USING ((jwt() ->> 'role'::text) = 'admin'::text);

-- Create storage bucket for highlights (this needs to be done via Supabase dashboard)
-- The bucket should be named 'highlights' and set to public

-- Insert some sample data
INSERT INTO highlights (title, description, file_path, file_type, category, featured) VALUES
  ('Gol spettacolare finale Calcio 5', 'Il gol decisivo che ha determinato la vittoria nella finale del torneo di calcio a 5', 'sample-goal-calcio5.jpg', 'image', 'calcio5', true),
  ('Highlights semifinale Calcio 7', 'I momenti salienti della semifinale più emozionante del torneo', 'sample-highlights-calcio7.mp4', 'video', 'calcio7', false),
  ('Parata incredibile del portiere', 'Una parata che ha lasciato tutti a bocca aperta', 'sample-save.jpg', 'image', 'calcio5', false),
  ('Celebrazione vittoria', 'La gioia dei vincitori del torneo', 'sample-celebration.jpg', 'image', 'calcio7', true);