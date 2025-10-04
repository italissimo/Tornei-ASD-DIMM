import { useState, useEffect } from 'react';
import { supabase, StandingsRow, CapocannonierRow } from '../lib/supabase';

export const useStandings = (category: 'calcio5' | 'calcio7') => {
  const [data, setData] = useState<StandingsRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!supabase) {
      setError('Supabase non configurato');
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const tableName = `standings_${category}`;
        console.log(`[useStandings] Attempting to fetch data from table: ${tableName}`);
        
        const { data: standings, error } = await supabase
          .from(tableName)
          .select(`
            posizione,
            squadra,
            punti,
            giocate,
            vittorie,
            pareggi,
            sconfitte,
            reti_fatte,
            reti_subite,
            ammonizioni,
            espulsioni,
            serie,
            girone,
            posizione_coppa,
            punti_coppa,
            giocate_coppa,
            vittorie_coppa,
            pareggi_coppa,
            sconfitte_coppa,
            reti_fatte_coppa,
            reti_subite_coppa,
            ammonizioni_coppa,
            espulsioni_coppa,
            last_update
          `)
          .order('posizione', { ascending: true });

        if (error) {
          console.error(`[useStandings] Error fetching from ${tableName}:`, error);
          console.error(`[useStandings] Error details:`, {
            message: error.message,
            details: error.details,
            hint: error.hint,
            code: error.code
          });
          throw error;
        }
        
        console.log(`[useStandings] Successfully fetched ${standings?.length || 0} records from ${tableName}:`, standings);
        setData(standings || []);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'An error occurred';
        console.error(`[useStandings] Error in fetchData:`, err);
        setError(`Errore nel caricamento della tabella standings_${category}: ${errorMessage}`);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // Set up real-time subscription
    console.log(`[useStandings] Setting up real-time subscription for standings_${category}`);
    const subscription = supabase
      .channel(`standings_${category}_changes`)
      .on('postgres_changes', 
        { 
          event: '*', 
          schema: 'public', 
          table: `standings_${category}` 
        }, 
        (payload) => {
          console.log(`[useStandings] Real-time update received for standings_${category}:`, payload);
          fetchData();
        }
      )
      .subscribe();

    return () => {
      console.log(`[useStandings] Unsubscribing from standings_${category} changes`);
      subscription.unsubscribe();
    };
  }, [category]);

  return { data, loading, error };
};

export const useCapocannonieri = (category: 'calcio5' | 'calcio7') => {
  const [data, setData] = useState<CapocannonierRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!supabase) {
      setError('Supabase non configurato');
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const tableName = `capocannonieri_${category}`;
        console.log(`[useCapocannonieri] Attempting to fetch data from table: ${tableName}`);

        const selectFields = category === 'calcio5'
          ? `posizione, giocatore, squadra, serie, gol, assist, ammonizioni, espulsioni, last_update`
          : `posizione, giocatore, squadra, gol, assist, ammonizioni, espulsioni, last_update`;

        const { data: scorers, error } = await supabase
          .from(tableName)
          .select(selectFields)
          .order('posizione', { ascending: true });

        if (error) {
          console.error(`[useCapocannonieri] Error fetching from ${tableName}:`, error);
          console.error(`[useCapocannonieri] Error details:`, {
            message: error.message,
            details: error.details,
            hint: error.hint,
            code: error.code
          });
          throw error;
        }
        
        console.log(`[useCapocannonieri] Successfully fetched ${scorers?.length || 0} records from ${tableName}:`, scorers);
        setData(scorers || []);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'An error occurred';
        console.error(`[useCapocannonieri] Error in fetchData:`, err);
        setError(`Errore nel caricamento della tabella capocannonieri_${category}: ${errorMessage}`);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // Set up real-time subscription
    console.log(`[useCapocannonieri] Setting up real-time subscription for capocannonieri_${category}`);
    const subscription = supabase
      .channel(`capocannonieri_${category}_changes`)
      .on('postgres_changes', 
        { 
          event: '*', 
          schema: 'public', 
          table: `capocannonieri_${category}` 
        }, 
        (payload) => {
          console.log(`[useCapocannonieri] Real-time update received for capocannonieri_${category}:`, payload);
          fetchData();
        }
      )
      .subscribe();

    return () => {
      console.log(`[useCapocannonieri] Unsubscribing from capocannonieri_${category} changes`);
      subscription.unsubscribe();
    };
  }, [category]);

  return { data, loading, error };
};