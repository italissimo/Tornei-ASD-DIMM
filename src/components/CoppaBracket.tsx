import React, { useEffect, useState } from 'react';
import { Trophy, Loader, AlertCircle } from 'lucide-react';
import { supabase, VincitoreCoppa } from '../lib/supabase';
import { Partita } from '../types/calendario';

interface CoppaBracketProps {
  category: 'calcio5' | 'calcio7';
}

const CoppaBracket: React.FC<CoppaBracketProps> = ({ category }) => {
  const [quarti, setQuarti] = useState<Partita[]>([]);
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

      const { data: quartiData, error: quartiError } = await supabase
        .from(table)
        .select('*')
        .eq('tipo_competizione', 'coppa')
        .eq('fase_coppa', 'quarti')
        .order('data', { ascending: true, nullsFirst: false })
        .order('ora', { ascending: true, nullsFirst: false });

      if (quartiError) throw quartiError;

      const { data: semifinaliData, error: semifinaliError } = await supabase
        .from(table)
        .select('*')
        .eq('tipo_competizione', 'coppa')
        .eq('fase_coppa', 'semifinali')
        .order('data', { ascending: true, nullsFirst: false })
        .order('ora', { ascending: true, nullsFirst: false });

      if (semifinaliError) throw semifinaliError;

      const { data: finaleData, error: finaleError } = await supabase
        .from(table)
        .select('*')
        .eq('tipo_competizione', 'coppa')
        .eq('fase_coppa', 'finale')
        .maybeSingle();

      if (finaleError) throw finaleError;

      const currentYear = new Date().getFullYear();
      const { data: vincitoreData, error: vincitoreError } = await supabase
        .from('vincitori_coppa')
        .select('*')
        .eq('categoria', category)
        .eq('anno', currentYear)
        .maybeSingle();

      if (vincitoreError && vincitoreError.code !== 'PGRST116') throw vincitoreError;

      setQuarti(quartiData || []);
      setSemifinali(semifinaliData || []);
      setFinale(finaleData);
      setVincitore(vincitoreData);
    } catch (err) {
      console.error('Error fetching bracket data:', err);
      setError('Errore nel caricamento del bracket');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader className="animate-spin text-teal-600" size={32} />
        <span className="ml-3 text-slate-600">Caricamento bracket...</span>
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
              Errore nel caricamento del bracket
            </h3>
            <p className="text-red-700 mt-2">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  const hasData = quarti.length > 0 || semifinali.length > 0 || finale || vincitore;

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
              Il tabellone della fase a eliminazione diretta verrà pubblicato dopo i gironi.
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

    const hasResult = match.risultato;

    return (
      <div className={`rounded-lg p-4 border-2 transition-all ${
        hasResult
          ? 'bg-white border-teal-500 shadow-md'
          : 'bg-slate-50 border-slate-300'
      }`}>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="text-sm font-medium text-slate-900">
              {match.squadra_casa || 'TBD'}
            </div>
            {hasResult && (
              <div className="text-xs font-bold text-teal-600">
                {match.risultato?.split('-')[0] || ''}
              </div>
            )}
          </div>
          <div className="border-t border-slate-200"></div>
          <div className="flex items-center justify-between">
            <div className="text-sm font-medium text-slate-900">
              {match.squadra_trasferta || 'TBD'}
            </div>
            {hasResult && (
              <div className="text-xs font-bold text-teal-600">
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
      <div className="hidden md:block">
        <div className="flex items-start justify-between gap-8">
          <div className="flex-1 space-y-4">
            <h3 className="text-lg font-bold text-slate-800 text-center mb-4">Quarti di Finale</h3>
            {quarti.slice(0, 4).map((match, idx) => (
              <div key={match.id} className="relative">
                <MatchCard match={match} />
                {idx < 3 && (
                  <div className="absolute right-0 top-1/2 w-8 h-0.5 bg-slate-300" style={{ transform: 'translateX(100%)' }}></div>
                )}
              </div>
            ))}
            {quarti.length === 0 && (
              <div className="space-y-4">
                {[1, 2, 3, 4].map(i => (
                  <MatchCard key={i} match={null} label="Quarto TBD" />
                ))}
              </div>
            )}
          </div>

          <div className="flex-1 space-y-8 pt-20">
            <h3 className="text-lg font-bold text-slate-800 text-center mb-4">Semifinali</h3>
            {semifinali.slice(0, 2).map((match, idx) => (
              <div key={match.id} className="relative">
                <MatchCard match={match} />
                {idx < 1 && (
                  <div className="absolute right-0 top-1/2 w-8 h-0.5 bg-slate-300" style={{ transform: 'translateX(100%)' }}></div>
                )}
              </div>
            ))}
            {semifinali.length === 0 && (
              <div className="space-y-8">
                {[1, 2].map(i => (
                  <MatchCard key={i} match={null} label="Semifinale TBD" />
                ))}
              </div>
            )}
          </div>

          <div className="flex-1 pt-48">
            <h3 className="text-lg font-bold text-slate-800 text-center mb-4">Finale</h3>
            <MatchCard match={finale} label="Finale TBD" />
          </div>

          <div className="flex-1 pt-48 flex flex-col items-center">
            <h3 className="text-lg font-bold text-slate-800 text-center mb-4">Vincitore</h3>
            {vincitore ? (
              <div className="bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-xl p-6 text-center shadow-xl border-4 border-yellow-300">
                <Trophy className="w-12 h-12 text-white mx-auto mb-3" />
                <div className="text-xl font-bold text-white mb-1">{vincitore.squadra}</div>
                <div className="text-sm text-yellow-100">Coppa {vincitore.anno}</div>
              </div>
            ) : (
              <div className="bg-slate-100 rounded-xl p-6 text-center border-2 border-dashed border-slate-300">
                <Trophy className="w-12 h-12 text-slate-400 mx-auto mb-3" />
                <div className="text-sm text-slate-500 font-medium">Da assegnare</div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="md:hidden space-y-6">
        <div>
          <h3 className="text-lg font-bold text-slate-800 mb-4">Quarti di Finale</h3>
          <div className="space-y-3">
            {quarti.length > 0 ? (
              quarti.map(match => <MatchCard key={match.id} match={match} />)
            ) : (
              [1, 2, 3, 4].map(i => <MatchCard key={i} match={null} label="Quarto TBD" />)
            )}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-bold text-slate-800 mb-4">Semifinali</h3>
          <div className="space-y-3">
            {semifinali.length > 0 ? (
              semifinali.map(match => <MatchCard key={match.id} match={match} />)
            ) : (
              [1, 2].map(i => <MatchCard key={i} match={null} label="Semifinale TBD" />)
            )}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-bold text-slate-800 mb-4">Finale</h3>
          <MatchCard match={finale} label="Finale TBD" />
        </div>

        <div>
          <h3 className="text-lg font-bold text-slate-800 mb-4 text-center">Vincitore</h3>
          {vincitore ? (
            <div className="bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-xl p-6 text-center shadow-xl border-4 border-yellow-300">
              <Trophy className="w-12 h-12 text-white mx-auto mb-3" />
              <div className="text-xl font-bold text-white mb-1">{vincitore.squadra}</div>
              <div className="text-sm text-yellow-100">Coppa {vincitore.anno}</div>
            </div>
          ) : (
            <div className="bg-slate-100 rounded-xl p-6 text-center border-2 border-dashed border-slate-300">
              <Trophy className="w-12 h-12 text-slate-400 mx-auto mb-3" />
              <div className="text-sm text-slate-500 font-medium">Da assegnare</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CoppaBracket;
