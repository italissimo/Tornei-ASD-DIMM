import React, { useEffect, useState } from 'react';
import { Trophy, Loader, AlertCircle } from 'lucide-react';
import { supabase, VincitoreCoppa } from '../lib/supabase';
import { Partita } from '../types/calendario';

interface PlayoffBracketProps {
  category: 'calcio5' | 'calcio7';
}

const PlayoffBracket: React.FC<PlayoffBracketProps> = ({ category }) => {
  const [semifinali, setSemifinali] = useState<Partita[]>([]);
  const [finale, setFinale] = useState<Partita | null>(null);
  const [vincitore, setVincitore] = useState<VincitoreCoppa | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchBracketData();
  }, [category]);

  const fetchBracketData = async () => {
    if (!supabase) {
      setError('Database non disponibile');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const table = category === 'calcio5' ? 'calendario_calcio5' : 'calendario_calcio7';

      const { data: semifinaliData, error: semifinaliError } = await supabase
        .from(table)
        .select('*')
        .eq('tipo_competizione', 'playoff')
        .eq('fase_coppa', 'semifinali')
        .order('data', { ascending: true, nullsFirst: false })
        .order('ora', { ascending: true, nullsFirst: false });

      if (semifinaliError) throw semifinaliError;

      const { data: finaleData, error: finaleError } = await supabase
        .from(table)
        .select('*')
        .eq('tipo_competizione', 'playoff')
        .eq('fase_coppa', 'finale')
        .maybeSingle();

      if (finaleError && finaleError.code !== 'PGRST116') throw finaleError;

      // Opzionale: gestire un "vincitor_playoff" se la tabella è la stessa e c'è modo di distinguerlo
      // Al momento leggiamo genericamente la tabella vincitori_coppa come fallback
      const currentYear = new Date().getFullYear();
      const { data: vincitoreData, error: vincitoreError } = await supabase
        .from('vincitori_coppa')
        .select('*')
        .eq('categoria', category)
        .eq('anno', currentYear)
        .maybeSingle();

      if (vincitoreError && vincitoreError.code !== 'PGRST116') throw vincitoreError;

      setSemifinali(semifinaliData || []);
      setFinale(finaleData || null);
      setVincitore(vincitoreData);
    } catch (err) {
      console.error('Error fetching playoff bracket bracket data:', err);
      setError('Errore nel caricamento del bracket');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader className="animate-spin text-yellow-500" size={32} />
        <span className="ml-3 text-slate-600">Caricamento tabellone...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-xl p-6">
        <div className="flex items-center space-x-3">
          <AlertCircle className="text-red-600" size={24} />
          <div>
            <h3 className="text-lg font-semibold text-red-800">
              Errore nel caricamento del tabellone
            </h3>
            <p className="text-red-700 mt-2">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  const hasData = semifinali.length > 0 || finale || vincitore;

  if (!hasData) {
    return (
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
        <div className="flex items-center space-x-3">
          <Trophy className="text-blue-600" size={24} />
          <div>
            <h3 className="text-lg font-semibold text-blue-800">
              Fase a eliminazione diretta da definire
            </h3>
            <p className="text-blue-700 mt-2">
              Il tabellone finale dei playoff verrà pubblicato appena definiti gli accoppiamenti delle semifinali.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const MatchCard = ({ match, label }: { match: Partita | null; label?: string }) => {
    if (!match) {
      return (
        <div className="bg-slate-100 rounded-lg p-4 border-2 border-dashed border-slate-300">
          <div className="text-center text-slate-500 text-sm font-medium">
            {label || 'TBD'}
          </div>
        </div>
      );
    }

    const hasResult = match.risultato && match.risultato.trim() !== '';

    return (
      <div className={`rounded-lg p-4 border-2 transition-all ${
        hasResult
          ? 'bg-white border-yellow-500 shadow-md'
          : 'bg-slate-50 border-slate-300'
      }`}>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="text-sm font-medium text-slate-900">
              {match.squadra_casa && match.squadra_casa !== 'da definire' ? match.squadra_casa : 'TBD'}
            </div>
            {hasResult && (
              <div className="text-xs font-bold text-yellow-600">
                {match.risultato?.split('-')[0] || ''}
              </div>
            )}
          </div>
          <div className="border-t border-slate-200"></div>
          <div className="flex items-center justify-between">
            <div className="text-sm font-medium text-slate-900">
              {match.squadra_trasferta && match.squadra_trasferta !== 'da definire' ? match.squadra_trasferta : 'TBD'}
            </div>
            {hasResult && (
              <div className="text-xs font-bold text-yellow-600">
                {match.risultato?.split('-')[1] || ''}
              </div>
            )}
          </div>
        </div>
        {!hasResult && (
          <div className="mt-2 text-center text-xs text-slate-500">
            {match.data ? new Date(match.data).toLocaleDateString('it-IT', { day: '2-digit', month: '2-digit' }) : 'Data TBD'}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-8">
      {/* Visualizzazione Tabellone */}
      <div className="flex flex-col md:flex-row items-stretch justify-center gap-8 md:gap-16">
        
        {/* Semifinali */}
        <div className="flex-1 space-y-8 flex flex-col justify-center">
          <h3 className="text-lg font-bold text-slate-800 text-center">Semifinali</h3>
          <div className="space-y-12">
            {[0, 1].map((idx) => {
               const match = semifinali[idx] || null;
               return <MatchCard key={idx} match={match} label={`Semifinale ${idx + 1}`} />;
            })}
          </div>
        </div>

        {/* Linee di collegamento (visibili solo su desktop) */}
        <div className="hidden md:flex flex-col justify-center relative w-16">
          {/* Collegamento Semifinale 1 */}
          <div className="absolute top-[25%] left-0 w-8 h-[25%] border-t-2 border-r-2 border-slate-300 rounded-tr-lg"></div>
          {/* Collegamento Semifinale 2 */}
          <div className="absolute bottom-[25%] left-0 w-8 h-[25%] border-b-2 border-r-2 border-slate-300 rounded-br-lg"></div>
          {/* Collegamento verso la Finale */}
          <div className="absolute top-1/2 left-8 w-8 h-0.5 bg-slate-300"></div>
        </div>

        {/* Finale */}
        <div className="flex-1 flex flex-col justify-center">
          <h3 className="text-lg font-bold text-slate-800 text-center mb-8">Finale</h3>
          <div className="relative">
            <MatchCard match={finale} label="Finale TBD" />
            <div className="absolute -inset-4 border-2 border-yellow-400/30 rounded-xl -z-10 bg-yellow-50/10"></div>
          </div>
          
          {vincitore && finale?.risultato && (
            <div className="mt-8 text-center animate-fade-in">
              <div className="inline-block bg-gradient-to-r from-yellow-400 to-yellow-600 p-1 rounded-2xl shadow-xl">
                <div className="bg-white px-8 py-4 rounded-xl flex flex-col items-center">
                  <Trophy className="text-yellow-500 mb-2" size={48} />
                  <span className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-1">
                    Campione Playoff {vincitore.anno}
                  </span>
                  <span className="text-2xl font-black text-slate-900">
                    {vincitore.squadra}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlayoffBracket;