export interface Partita {
  id: number;
  giornata: number;
  data: string | null;
  ora: string | null;
  campo: string | null;
  squadra_casa: string | null;
  squadra_trasferta: string | null;
  risultato: string | null;
  tipo_competizione: 'campionato' | 'coppa' | 'playoff' | null;
  fase_coppa: 'gironi' | 'quarti' | 'semifinali' | 'finale' | 'playoff_gironi' | 'playoff_semifinali' | 'playoff_finali' | null;
  girone: string | null;
}

export interface Squadra {
  squadra: string;
}
