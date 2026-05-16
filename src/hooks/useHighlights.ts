import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Highlight, HighlightWithUrl, FilterCategory, FilterType } from '../types/highlights';

export const useHighlights = (category: FilterCategory, type: FilterType) => {
  const [highlights, setHighlights] = useState<HighlightWithUrl[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!supabase) {
      setError('Supabase non configurato');
      setLoading(false);
      return;
    }

    const fetchHighlights = async () => {
      try {
        setLoading(true);
        setError(null);

        let query = supabase
          .from('highlights')
          .select('*')
          .order('featured', { ascending: false })
          .order('upload_date', { ascending: false });

        // Apply category filter
        if (category !== 'all') {
          query = query.eq('category', category);
        }

        // Apply type filter
        if (type !== 'all') {
          query = query.eq('file_type', type);
        }

          const { data, error } = await query;

          if (error) {
            console.error('[useHighlights] Error fetching highlights:', error);
            throw error;
          }

          // Mappa i dati per usare i campi corretti della tabella
    const highlightsWithUrls: HighlightWithUrl[] = (data || []).map((highlight: any) => ({
            id: highlight.id,
            title: highlight.titolo,
            description: highlight.descrizione,
            file_type: highlight.file_type,
            category: highlight.category,
            upload_date: highlight.upload_date,
            featured: highlight.featured,
            publicUrl: highlight.url
          }));

          setHighlights(highlightsWithUrls);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Errore nel caricamento degli highlights';
        console.error('[useHighlights] Error:', err);
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchHighlights();
  }, [category, type]);

  return { highlights, loading, error };
};