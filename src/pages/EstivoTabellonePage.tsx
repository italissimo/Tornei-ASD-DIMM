import React, { useEffect, useState } from 'react';
import { Sun, Trophy, Loader, AlertCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { Partita } from '../types/calendario';

const FASI = [
  { key: 'ottavi', label: 'Ottavi di Finale' },
  { key: 'quarti', label: 'Quarti di Finale' },
  { key: 'semifinali', label: 'Semifinali' },
  { key: 'finale', label: 'Finale' },
] as const;

type FaseKey = typeof FASI[number]['key'];

const MatchCard: React.FC<{ match: Partita | null; label?: string }> = ({ match, label }) => {
  if (!match) {
    return (
      <div className="bg-orange-50 rounded-xl p-4 border-2 border-dashed border-orange-200">
        <div className="text-center text-orange-400 text-sm font-medium">{label || 'TBD'}</div>
      </div>
    );
  }

  const hasResult = match.risultato && match.risultato.trim() !== '';
  const [goalCasa, goalTrasferta] = hasResult ? match.risultato!.split('-') : ['', ''];

  return (
    <div className={`rounded-xl p-4 border-2 transition-all ${
      hasResult ? 'bg-white border-orange-500 shadow-md' : 'bg-orange-50 border-orange-200'
    }`}>
      <div className="space-y-2">
        <div className="flex items-center justify-between gap-2">
          <span className="text-sm font-semibold text-slate-800 truncate">
            {match.squadra_casa || 'TBD'}
          </span>
          {hasResult && (
            <span className="text-sm font-black text-orange-600 flex-shrink-0">{goalCasa}</span>
          )}
        </div>
        <div className="border-t border-orange-100" />
        <div className="flex items-center justify-between gap-2">
          <span className="text-sm font-semibold text-slate-800 truncate">
            {match.squadra_trasferta || 'TBD'}
          </span>
          {hasResult && (
            <span className="text-sm font-black text-orange-600 flex-shrink-0">{goalTrasferta}</span>
          )}
        </div>
      </div>
      {!hasResult && match.data && (
        <div className="mt-2 text-center text-xs text-orange-400">
          {new Date(match.data).toLocaleDateString('it-IT', { day: '2-digit', month: '2-digit' })}
          {match.ora ? ` • ${match.ora.slice(0, 5)}` : ''}
        </div>
      )}
    </div>
  );
};

const EstivoTabellonePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'calcio5' | 'calcio7'>('calcio5');
  const [matchesByFase, setMatchesByFase] = useState<Record<FaseKey, Partita[]>>({
    ottavi: [], quarti: [], semifinali: [], finale: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchTabellone();
  }, [activeTab]);

  const fetchTabellone = async () => {
    if (!supabase) {
      setError('Database non disponibile');
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);

    const table = activeTab === 'calcio5' ? 'calendario_estivo_calcio5' : 'calendario_estivo_calcio7';

    try {
      const { data, error: fetchError } = await supabase
        .from(table)
        .select('*')
        .in('fase_coppa', ['ottavi', 'quarti', 'semifinali', 'finale'])
        .order('data', { ascending: true, nullsFirst: false })
        .order('ora', { ascending: true, nullsFirst: false });

      if (fetchError) throw fetchError;

      const grouped: Record<FaseKey, Partita[]> = { ottavi: [], quarti: [], semifinali: [], finale: [] };
      (data || []).forEach((p: Partita) => {
        const fase = p.fase_coppa as FaseKey;
        if (fase && fase in grouped) grouped[fase].push(p);
      });
      setMatchesByFase(grouped);
    } catch (err) {
      console.error('Errore fetch tabellone estivo:', err);
      setError('Errore nel caricamento del tabellone');
    } finally {
      setLoading(false);
    }
  };

  const hasAnyData = Object.values(matchesByFase).some(arr => arr.length > 0);

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <Sun className="text-orange-500" size={32} />
          <h1 className="text-4xl font-bold text-orange-900">Fase Ad Eliminazione (Estivo)</h1>
        </div>
        <div className="flex bg-white rounded-lg p-1 shadow-sm border border-orange-100">
          {(['calcio5', 'calcio7'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 rounded-md font-medium transition-all ${
                activeTab === tab
                  ? 'bg-orange-500 text-white shadow-md'
                  : 'text-slate-600 hover:bg-orange-50'
              }`}
            >
              {tab === 'calcio5' ? 'Calcio a 5' : 'Calcio a 7'}
            </button>
          ))}
        </div>
      </div>

      {/* Loading */}
      {loading && (
        <div className="flex items-center justify-center py-16">
          <Loader className="animate-spin text-orange-500" size={32} />
          <span className="ml-3 text-orange-700">Caricamento tabellone...</span>
        </div>
      )}

      {/* Error */}
      {!loading && error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 flex items-center space-x-3">
          <AlertCircle className="text-red-500" size={24} />
          <p className="text-red-700">{error}</p>
        </div>
      )}

      {/* No data */}
      {!loading && !error && !hasAnyData && (
        <div className="bg-orange-50 border border-orange-200 rounded-xl p-8 text-center">
          <Trophy className="text-orange-300 w-16 h-16 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-orange-800 mb-2">Tabellone non ancora disponibile</h2>
          <p className="text-orange-600/80 max-w-md mx-auto">
            Il tabellone verrà pubblicato appena le squadre saranno qualificate e gli accoppiamenti definiti.
          </p>
        </div>
      )}

      {/* Tabellone */}
      {!loading && !error && hasAnyData && (
        <div className="space-y-8">
          {FASI.map(({ key, label }) => {
            const matches = matchesByFase[key];
            if (matches.length === 0) return null;
            return (
              <div key={key}>
                <h3 className="text-lg font-bold text-orange-800 mb-4 flex items-center gap-2">
                  <span className="w-2 h-6 bg-orange-500 rounded-full inline-block" />
                  {label}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {matches.map(match => (
                    <MatchCard key={match.id} match={match} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default EstivoTabellonePage;