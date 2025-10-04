import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

console.log('[Supabase] Configuration check:');
console.log('[Supabase] URL:', supabaseUrl);
console.log('[Supabase] Anon Key:', supabaseAnonKey ? 'Present' : 'Missing');

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('[Supabase] Missing environment variables:');
  console.error('[Supabase] VITE_SUPABASE_URL:', supabaseUrl);
  console.error('[Supabase] VITE_SUPABASE_ANON_KEY:', supabaseAnonKey ? 'Present' : 'Missing');
}

export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: false
      }
    })
  : null;

// Test connection on initialization
if (supabase) {
  console.log('[Supabase] Client created successfully');
  
  // Test basic connection
  supabase.from('standings_calcio5').select('count', { count: 'exact', head: true })
    .then(({ count, error }) => {
      if (error) {
        console.error('[Supabase] Connection test failed for standings_calcio5:', error);
      } else {
        console.log('[Supabase] Connection test successful - standings_calcio5 has', count, 'rows');
      }
    });
    
  supabase.from('capocannonieri_calcio5').select('count', { count: 'exact', head: true })
    .then(({ count, error }) => {
      if (error) {
        console.error('[Supabase] Connection test failed for capocannonieri_calcio5:', error);
      } else {
        console.log('[Supabase] Connection test successful - capocannonieri_calcio5 has', count, 'rows');
      }
    });
} else {
  console.error('[Supabase] Client not created - missing configuration');
}

// Database types
export interface StandingsRow {
  posizione: number;
  squadra: string;
  punti: number | null;
  giocate: number | null;
  vittorie: number | null;
  pareggi: number | null;
  sconfitte: number | null;
  reti_fatte: number | null;
  reti_subite: number | null;
  ammonizioni: number | null;
  espulsioni: number | null;
  serie: 'A' | 'B';
  girone: string | null;
  posizione_coppa: number | null;
  punti_coppa: number | null;
  giocate_coppa: number | null;
  vittorie_coppa: number | null;
  pareggi_coppa: number | null;
  sconfitte_coppa: number | null;
  reti_fatte_coppa: number | null;
  reti_subite_coppa: number | null;
  ammonizioni_coppa: number | null;
  espulsioni_coppa: number | null;
  last_update: string;
}

export interface CapocannonierRow {
  posizione: number;
  giocatore: string;
  squadra: string;
  serie?: 'A' | 'B';
  gol: number | null;
  assist: number | null;
  ammonizioni: number | null;
  espulsioni: number | null;
  last_update: string;
}

export interface VincitoreCoppa {
  id: number;
  categoria: 'calcio5' | 'calcio7';
  squadra: string;
  anno: number;
  data_vittoria: string;
}

// Helper function to format null values
export const formatValue = (value: number | null): string => {
  return value === null || value === undefined ? '-' : value.toString();
};

// Helper function to format text values
export const formatText = (value: string | null): string => {
  return value === null || value === undefined || value === '' ? '-' : value;
};

// Helper function to format date
export const formatDate = (dateString: string): string => {
  if (!dateString) return '-';
  return new Date(dateString).toLocaleDateString('it-IT', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};