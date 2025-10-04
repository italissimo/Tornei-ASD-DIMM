/*
  # Create tournament tables

  1. New Tables
    - `standings_calcio5`
      - `posizione` (int, primary key)
      - `squadra` (text)
      - `punti` (int, nullable)
      - `giocate` (int, nullable)
      - `vittorie` (int, nullable)
      - `pareggi` (int, nullable)
      - `sconfitte` (int, nullable)
      - `reti_fatte` (int, nullable)
      - `reti_subite` (int, nullable)
      - `ammonizioni` (int, nullable)
      - `espulsioni` (int, nullable)
      - `serie` (text, "A" or "B")
      - `last_update` (timestamp, default now)
    
    - `standings_calcio7`
      - Same structure as standings_calcio5
    
    - `capocannonieri_calcio5`
      - `posizione` (int, primary key)
      - `giocatore` (text)
      - `squadra` (text)
      - `gol` (int, nullable)
      - `assist` (int, nullable)
      - `ammonizioni` (int, nullable)
      - `espulsioni` (int, nullable)
      - `last_update` (timestamp, default now)
    
    - `capocannonieri_calcio7`
      - Same structure as capocannonieri_calcio5

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to read data
    - Add policies for admin users to modify data

  3. Sample Data
    - Populate each table with 16 realistic entries
    - Serie A: positions 1-8, Serie B: positions 9-16
*/

-- Create standings_calcio5 table
CREATE TABLE IF NOT EXISTS standings_calcio5 (
  posizione int PRIMARY KEY,
  squadra text NOT NULL,
  punti int DEFAULT 0,
  giocate int DEFAULT 0,
  vittorie int DEFAULT 0,
  pareggi int DEFAULT 0,
  sconfitte int DEFAULT 0,
  reti_fatte int DEFAULT 0,
  reti_subite int DEFAULT 0,
  ammonizioni int DEFAULT 0,
  espulsioni int DEFAULT 0,
  serie text NOT NULL CHECK (serie IN ('A', 'B')),
  last_update timestamptz DEFAULT now()
);

-- Create standings_calcio7 table
CREATE TABLE IF NOT EXISTS standings_calcio7 (
  posizione int PRIMARY KEY,
  squadra text NOT NULL,
  punti int DEFAULT 0,
  giocate int DEFAULT 0,
  vittorie int DEFAULT 0,
  pareggi int DEFAULT 0,
  sconfitte int DEFAULT 0,
  reti_fatte int DEFAULT 0,
  reti_subite int DEFAULT 0,
  ammonizioni int DEFAULT 0,
  espulsioni int DEFAULT 0,
  serie text NOT NULL CHECK (serie IN ('A', 'B')),
  last_update timestamptz DEFAULT now()
);

-- Create capocannonieri_calcio5 table
CREATE TABLE IF NOT EXISTS capocannonieri_calcio5 (
  posizione int PRIMARY KEY,
  giocatore text NOT NULL,
  squadra text NOT NULL,
  gol int DEFAULT 0,
  assist int DEFAULT 0,
  ammonizioni int DEFAULT 0,
  espulsioni int DEFAULT 0,
  last_update timestamptz DEFAULT now()
);

-- Create capocannonieri_calcio7 table
CREATE TABLE IF NOT EXISTS capocannonieri_calcio7 (
  posizione int PRIMARY KEY,
  giocatore text NOT NULL,
  squadra text NOT NULL,
  gol int DEFAULT 0,
  assist int DEFAULT 0,
  ammonizioni int DEFAULT 0,
  espulsioni int DEFAULT 0,
  last_update timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE standings_calcio5 ENABLE ROW LEVEL SECURITY;
ALTER TABLE standings_calcio7 ENABLE ROW LEVEL SECURITY;
ALTER TABLE capocannonieri_calcio5 ENABLE ROW LEVEL SECURITY;
ALTER TABLE capocannonieri_calcio7 ENABLE ROW LEVEL SECURITY;

-- Create policies for reading data (all authenticated users)
CREATE POLICY "Anyone can read standings_calcio5"
  ON standings_calcio5
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Anyone can read standings_calcio7"
  ON standings_calcio7
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Anyone can read capocannonieri_calcio5"
  ON capocannonieri_calcio5
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Anyone can read capocannonieri_calcio7"
  ON capocannonieri_calcio7
  FOR SELECT
  TO authenticated
  USING (true);

-- Create policies for modifying data (admin users only)
CREATE POLICY "Admins can modify standings_calcio5"
  ON standings_calcio5
  FOR ALL
  TO authenticated
  USING (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Admins can modify standings_calcio7"
  ON standings_calcio7
  FOR ALL
  TO authenticated
  USING (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Admins can modify capocannonieri_calcio5"
  ON capocannonieri_calcio5
  FOR ALL
  TO authenticated
  USING (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Admins can modify capocannonieri_calcio7"
  ON capocannonieri_calcio7
  FOR ALL
  TO authenticated
  USING (auth.jwt() ->> 'role' = 'admin');

-- Insert sample data for standings_calcio5
INSERT INTO standings_calcio5 (posizione, squadra, punti, giocate, vittorie, pareggi, sconfitte, reti_fatte, reti_subite, ammonizioni, espulsioni, serie) VALUES
(1, 'Real Madrid FC', 21, 8, 7, 0, 1, 28, 8, 12, 0, 'A'),
(2, 'Barcelona United', 18, 8, 6, 0, 2, 24, 12, 15, 1, 'A'),
(3, 'Manchester City', 18, 8, 6, 0, 2, 22, 10, 8, 0, 'A'),
(4, 'Liverpool FC', 15, 8, 5, 0, 3, 20, 15, 18, 2, 'A'),
(5, 'Chelsea Blues', 15, 8, 5, 0, 3, 19, 14, 14, 1, 'A'),
(6, 'Arsenal Gunners', 12, 8, 4, 0, 4, 16, 16, 20, 1, 'A'),
(7, 'Tottenham Hotspur', 12, 8, 4, 0, 4, 15, 17, 16, 0, 'A'),
(8, 'AC Milan', 9, 8, 3, 0, 5, 14, 18, 22, 3, 'A'),
(9, 'Inter Milano', 9, 8, 3, 0, 5, 13, 19, 19, 2, 'B'),
(10, 'Juventus FC', 6, 8, 2, 0, 6, 12, 20, 25, 1, 'B'),
(11, 'AS Roma', 6, 8, 2, 0, 6, 11, 21, 28, 4, 'B'),
(12, 'Napoli SSC', 6, 8, 2, 0, 6, 10, 22, 24, 2, 'B'),
(13, 'Lazio SS', 3, 8, 1, 0, 7, 9, 23, 30, 3, 'B'),
(14, 'Fiorentina ACF', 3, 8, 1, 0, 7, 8, 24, 26, 5, 'B'),
(15, 'Atalanta BC', 3, 8, 1, 0, 7, 7, 25, 32, 4, 'B'),
(16, 'Bologna FC', 0, 8, 0, 0, 8, 6, 26, 35, 6, 'B');

-- Insert sample data for standings_calcio7
INSERT INTO standings_calcio7 (posizione, squadra, punti, giocate, vittorie, pareggi, sconfitte, reti_fatte, reti_subite, ammonizioni, espulsioni, serie) VALUES
(1, 'Bayern Munich', 24, 8, 8, 0, 0, 32, 5, 8, 0, 'A'),
(2, 'PSG Paris', 21, 8, 7, 0, 1, 28, 8, 12, 1, 'A'),
(3, 'Real Madrid CF', 18, 8, 6, 0, 2, 25, 10, 15, 0, 'A'),
(4, 'Manchester United', 18, 8, 6, 0, 2, 24, 12, 18, 2, 'A'),
(5, 'Barcelona FC', 15, 8, 5, 0, 3, 22, 15, 14, 1, 'A'),
(6, 'Atletico Madrid', 15, 8, 5, 0, 3, 20, 14, 20, 1, 'A'),
(7, 'Borussia Dortmund', 12, 8, 4, 0, 4, 18, 16, 16, 0, 'A'),
(8, 'Ajax Amsterdam', 12, 8, 4, 0, 4, 17, 18, 22, 3, 'A'),
(9, 'Porto FC', 9, 8, 3, 0, 5, 16, 20, 19, 2, 'B'),
(10, 'Benfica SL', 9, 8, 3, 0, 5, 15, 21, 25, 1, 'B'),
(11, 'Sporting CP', 6, 8, 2, 0, 6, 14, 22, 28, 4, 'B'),
(12, 'Valencia CF', 6, 8, 2, 0, 6, 13, 23, 24, 2, 'B'),
(13, 'Sevilla FC', 6, 8, 2, 0, 6, 12, 24, 30, 3, 'B'),
(14, 'Villarreal CF', 3, 8, 1, 0, 7, 11, 25, 26, 5, 'B'),
(15, 'Real Sociedad', 3, 8, 1, 0, 7, 10, 26, 32, 4, 'B'),
(16, 'Athletic Bilbao', 0, 8, 0, 0, 8, 9, 27, 35, 6, 'B');

-- Insert sample data for capocannonieri_calcio5
INSERT INTO capocannonieri_calcio5 (posizione, giocatore, squadra, gol, assist, ammonizioni, espulsioni) VALUES
(1, 'Marco Rossi', 'Real Madrid FC', 15, 8, 2, 0),
(2, 'Luca Bianchi', 'Barcelona United', 13, 6, 3, 0),
(3, 'Andrea Verdi', 'Manchester City', 12, 7, 1, 0),
(4, 'Giuseppe Neri', 'Liverpool FC', 11, 5, 4, 1),
(5, 'Francesco Blu', 'Chelsea Blues', 10, 9, 2, 0),
(6, 'Antonio Giallo', 'Arsenal Gunners', 9, 4, 3, 0),
(7, 'Roberto Viola', 'Tottenham Hotspur', 8, 6, 1, 0),
(8, 'Stefano Rosa', 'AC Milan', 8, 3, 5, 1),
(9, 'Matteo Grigio', 'Inter Milano', 7, 5, 2, 0),
(10, 'Davide Nero', 'Juventus FC', 7, 2, 6, 2),
(11, 'Simone Oro', 'AS Roma', 6, 4, 3, 0),
(12, 'Paolo Argento', 'Napoli SSC', 6, 3, 4, 1),
(13, 'Michele Bronzo', 'Lazio SS', 5, 2, 7, 1),
(14, 'Fabio Rame', 'Fiorentina ACF', 4, 1, 5, 2),
(15, 'Claudio Ferro', 'Atalanta BC', 3, 2, 8, 3),
(16, 'Emilio Piombo', 'Bologna FC', 2, 1, 9, 4);

-- Insert sample data for capocannonieri_calcio7
INSERT INTO capocannonieri_calcio7 (posizione, giocatore, squadra, gol, assist, ammonizioni, espulsioni) VALUES
(1, 'Thomas Müller', 'Bayern Munich', 18, 10, 1, 0),
(2, 'Kylian Mbappé', 'PSG Paris', 16, 8, 2, 0),
(3, 'Karim Benzema', 'Real Madrid CF', 15, 9, 1, 0),
(4, 'Marcus Rashford', 'Manchester United', 14, 7, 3, 1),
(5, 'Robert Lewandowski', 'Barcelona FC', 13, 6, 2, 0),
(6, 'Antoine Griezmann', 'Atletico Madrid', 12, 8, 4, 0),
(7, 'Erling Haaland', 'Borussia Dortmund', 11, 5, 1, 0),
(8, 'Dusan Tadic', 'Ajax Amsterdam', 10, 9, 3, 1),
(9, 'Mehdi Taremi', 'Porto FC', 9, 4, 2, 0),
(10, 'Darwin Núñez', 'Benfica SL', 9, 3, 5, 1),
(11, 'Pedro Gonçalves', 'Sporting CP', 8, 6, 3, 0),
(12, 'Carlos Soler', 'Valencia CF', 7, 4, 4, 1),
(13, 'Youssef En-Nesyri', 'Sevilla FC', 6, 2, 6, 2),
(14, 'Gerard Moreno', 'Villarreal CF', 5, 3, 3, 1),
(15, 'Alexander Isak', 'Real Sociedad', 4, 2, 7, 2),
(16, 'Iñaki Williams', 'Athletic Bilbao', 3, 1, 8, 3);