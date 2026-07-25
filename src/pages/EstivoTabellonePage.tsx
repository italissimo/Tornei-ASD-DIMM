import React, { useEffect, useState } from 'react';
import { Sun, Trophy, Loader, AlertCircle, MapPin, Calendar } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { Partita } from '../types/calendario';

const FASI = [
  { key: 'ottavi',    label: 'Ottavi di Finale' },
  { key: 'quarti',   label: 'Quarti di Finale' },
  { key: 'semifinali', label: 'Semifinali' },
  { key: 'finale',   label: 'Finale' },
] as const;

type FaseKey = typeof FASI[number]['key'];

/** Ricava il nome del vincitore da una partita estiva (gol_casa/gol_trasferta interi) */
function getWinner(match: Partita): string | null {
  const g1 = match.gol_casa;
  const g2 = match.gol_trasferta;
  if (g1 === null || g2 === null) return null;
  if (g1 > g2) return match.squadra_casa;
  if (g2 > g1) return match.squadra_trasferta;
  return null; // pareggio
}

const MatchCard: React.FC<{ match: Partita }> = ({ match }) => {
  const hasResult = match.gol_casa !== null && match.gol_trasferta !== null;
  const goalCasa      = hasResult ? String(match.gol_casa)      : undefined;
  const goalTrasferta = hasResult ? String(match.gol_trasferta) : undefined;
  const winner = hasResult ? getWinner(match) : null;

  const teamRow = (name: string | null, goal: string | undefined, isWinner: boolean) => (
    <div className={`flex items-center justify-between gap-3 px-3 py-2 rounded-lg transition-colors ${
      isWinner ? 'bg-orange-500' : 'bg-transparent'
    }`}>
      <span className={`text-sm font-semibold truncate ${isWinner ? 'text-white' : 'text-slate-700'}`}>
        {name || 'TBD'}
      </span>
      {hasResult && goal !== undefined && (
        <span className={`text-base font-black flex-shrink-0 min-w-[1.5rem] text-center ${
          isWinner ? 'text-white' : 'text-orange-600'
        }`}>
          {goal}
        </span>
      )}
    </div>
  );

  return (
    <div className={`rounded-xl border-2 overflow-hidden transition-all ${
      hasResult
        ? 'bg-white border-orange-400 shadow-md'
        : 'bg-orange-50 border-orange-200'
    }`}>
      <div className="divide-y divide-orange-100">
        {teamRow(match.squadra_casa,      goalCasa,      winner === match.squadra_casa)}
        {teamRow(match.squadra_trasferta, goalTrasferta, winner === match.squadra_trasferta)}
      </div>

      {/* Data/ora se non c'è ancora il risultato */}
      {!hasResult && (match.data || match.ora || match.campo) && (
        <div className="px-3 py-2 bg-orange-50 border-t border-orange-100 flex items-center gap-3 text-xs text-orange-400">
          {match.data && (
            <span className="flex items-center gap-1">
              <Calendar size={11} />
              {new Date(match.data).toLocaleDateString('it-IT', { day: '2-digit', month: '2-digit' })}
              {match.ora ? ` ${match.ora.slice(0, 5)}` : ''}
            </span>
          )}
          {match.campo && (
            <span className="flex items-center gap-1">
              <MapPin size={11} />
              {match.campo}
            </span>
          )}
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

  useEffect(() => { fetchTabellone(); }, [activeTab]);

  const fetchTabellone = async () => {
    if (!supabase) { setError('Database non disponibile'); setLoading(false); return; }
    setLoading(true);
    setError(null);

    const table = activeTab === 'calcio5' ? 'calendario_estivo_calcio5' : 'calendario_estivo_calcio7';

    try {
      const { data, error: fetchError } = await supabase
        .from(table)
        .select('*')
        .in('fase_coppa', ['ottavi', 'quarti', 'semifinali', 'finale'])
        .order('data', { ascending: true, nullsFirst: false })
        .order('ora',  { ascending: true, nullsFirst: false });

      if (fetchError) throw fetchError;

      console.log('[EstivoTabellone] dati ricevuti:', data);

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

  // Vincitore finale
  const finaleMatches = matchesByFase.finale;
  const finaleConRisultato = finaleMatches.find(m => m.risultato);
  const campione = finaleConRisultato ? getWinner(finaleConRisultato) : null;

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
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 rounded-md font-medium transition-all ${
                activeTab === tab ? 'bg-orange-500 text-white shadow-md' : 'text-slate-600 hover:bg-orange-50'
              }`}>
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
        <div className="space-y-10">
          {FASI.map(({ key, label }) => {
            const matches = matchesByFase[key];
            if (matches.length === 0) return null;
            return (
              <div key={key}>
                <h3 className="text-lg font-bold text-orange-800 mb-4 flex items-center gap-2">
                  <span className="w-2 h-6 bg-orange-500 rounded-full inline-block" />
                  {label}
                  <span className="ml-2 text-sm font-normal text-orange-400">
                    ({matches.filter(m => m.risultato).length}/{matches.length} giocate)
                  </span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {matches.map(match => (
                    <MatchCard key={match.id} match={match} />
                  ))}
                </div>
              </div>
            );
          })}

          {/* Campione */}
          <div className="text-center">
            {campione ? (
              <div className="inline-flex flex-col items-center gap-3">
                <div className="inline-block bg-gradient-to-br from-orange-400 to-yellow-500 p-1 rounded-2xl shadow-xl">
                  <div className="bg-white px-10 py-5 rounded-xl flex flex-col items-center gap-2">
                    <Trophy className="text-orange-500" size={40} />
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                      Campione Estivo {new Date().getFullYear()}
                    </span>
                    <span className="text-2xl font-black text-slate-900">{campione}</span>
                  </div>
                </div>
              </div>
            ) : finaleMatches.length > 0 ? (
              <div className="inline-flex flex-col items-center gap-2 bg-orange-50 border-2 border-dashed border-orange-200 rounded-2xl px-8 py-5">
                <Trophy className="text-orange-300" size={36} />
                <span className="text-sm font-semibold text-orange-500">Finale da giocare</span>
              </div>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
};

export default EstivoTabellonePage;