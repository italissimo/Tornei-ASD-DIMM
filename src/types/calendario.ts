export interface Partita {
  id: number;
  giornata: number;
  data: string | null;
  ora: string | null;
  campo: string | null;
  squadra_casa: string | null;
  squadra_trasferta: string | null;
  risultato: string | null;
}

export interface Squadra {
  squadra: string;
}
