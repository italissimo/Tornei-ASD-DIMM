import React, { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, ChevronDown } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { Partita, Squadra } from '../types/calendario';

type TournamentType = 'calcio5' | 'calcio7';

const CalendarioPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TournamentType>('calcio5');
  const [partite, setPartite] = useState<Partita[]>([]);
  const [squadre, setSquadre] = useState<string[]>([]);
  const [selectedSquadra, setSelectedSquadra] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchSquadre();
  }, [activeTab]);

  useEffect(() => {
    fetchPartite();
  }, [activeTab, selectedSquadra]);

  const fetchSquadre = async () => {
    if (!supabase) return;

    const table = activeTab === 'calcio5' ? 'standings_calcio5' : 'standings_calcio7';

    const { data, error } = await supabase
      .from(table)
      .select('squadra')
      .order('squadra');

    if (error) {
      console.error('Error fetching squadre:', error);
    } else if (data) {
      const squadreList = data.map((s: Squadra) => s.squadra);
      setSquadre(squadreList);
    }
  };

  const fetchPartite = async () => {
    if (!supabase) {
      setError('Database non disponibile');
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    const table = activeTab === 'calcio5' ? 'calendario_calcio5' : 'calendario_calcio7';

    let query = supabase
      .from(table)
      .select('*');

    if (selectedSquadra) {
      query = query.or(`squadra_casa.eq.${selectedSquadra},squadra_trasferta.eq.${selectedSquadra}`);
    }

    query = query
      .order('data', { ascending: true, nullsFirst: false })
      .order('ora', { ascending: true, nullsFirst: false });

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching partite:', error);
      setError('Errore nel caricamento delle partite');
      setPartite([]);
    } else {
      setPartite(data || []);
    }

    setLoading(false);
  };

  const formatData = (data: string | null): string => {
    if (!data) return '–';
    const date = new Date(data);
    return date.toLocaleDateString('it-IT', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const formatOra = (ora: string | null): string => {
    if (!ora) return '–';
    return ora.substring(0, 5);
  };

  const formatCampo = (campo: string | null): string => {
    if (!campo || campo === 'N/A') return 'Da definire';
    return campo;
  };

  const formatGara = (casa: string | null, trasferta: string | null): string => {
    if ((!casa || casa === 'N/A') && (!trasferta || trasferta === 'N/A')) {
      return 'Gara da definire';
    }
    const casaText = casa && casa !== 'N/A' ? casa : 'TBD';
    const trasfertaText = trasferta && trasferta !== 'N/A' ? trasferta : 'TBD';
    return `${casaText} vs ${trasfertaText}`;
  };

  const findProssimaPartita = (): number | null => {
    if (!selectedSquadra) return null;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const partiteFuture = partite
      .filter(p => !p.risultato && p.data)
      .filter(p => {
        const matchDate = new Date(p.data!);
        matchDate.setHours(0, 0, 0, 0);
        return matchDate >= today;
      })
      .sort((a, b) => {
        const dateA = new Date(a.data!).getTime();
        const dateB = new Date(b.data!).getTime();
        return dateA - dateB;
      });

    return partiteFuture.length > 0 ? partiteFuture[0].id : null;
  };

  const prossimaPartitaId = findProssimaPartita();

  const filteredCount = partite.length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-slate-800">Calendario</h1>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="border-b border-slate-200">
          <div className="flex">
            <button
              onClick={() => {
                setActiveTab('calcio5');
                setSelectedSquadra('');
              }}
              className={`flex-1 px-6 py-4 text-sm font-medium transition-all ${
                activeTab === 'calcio5'
                  ? 'text-teal-600 border-b-2 border-teal-600 bg-teal-50'
                  : 'text-slate-600 hover:text-slate-800 hover:bg-slate-50'
              }`}
            >
              Calcio a 5
            </button>
            <button
              onClick={() => {
                setActiveTab('calcio7');
                setSelectedSquadra('');
              }}
              className={`flex-1 px-6 py-4 text-sm font-medium transition-all ${
                activeTab === 'calcio7'
                  ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                  : 'text-slate-600 hover:text-slate-800 hover:bg-slate-50'
              }`}
            >
              Calcio a 7
            </button>
          </div>
        </div>

        <div className="p-6 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="relative w-full sm:w-64">
              <select
                value={selectedSquadra}
                onChange={(e) => setSelectedSquadra(e.target.value)}
                className="w-full appearance-none bg-slate-50 border border-slate-300 rounded-lg px-4 py-2.5 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              >
                <option value="">Tutte le squadre</option>
                {squadre.map((squadra) => (
                  <option key={squadra} value={squadra}>
                    {squadra}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            </div>

            <div className="text-sm text-slate-600">
              <span className="font-semibold">{filteredCount}</span> partite trovate
            </div>
          </div>

          {loading ? (
            <div className="space-y-3">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="animate-pulse bg-slate-100 h-16 rounded-lg" />
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-slate-600">{error}</p>
            </div>
          ) : partite.length === 0 ? (
            <div className="text-center py-12">
              <Calendar className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <p className="text-slate-600 font-medium">Nessuna partita trovata</p>
              <p className="text-slate-500 text-sm mt-1">
                {selectedSquadra
                  ? 'Prova a selezionare una squadra diversa'
                  : 'Il calendario verrà aggiornato presto'}
              </p>
            </div>
          ) : (
            <>
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-200">
                      <th className="text-left py-3 px-4 text-xs font-semibold text-slate-600 uppercase tracking-wider">
                        Giornata
                      </th>
                      <th className="text-left py-3 px-4 text-xs font-semibold text-slate-600 uppercase tracking-wider">
                        Data
                      </th>
                      <th className="text-left py-3 px-4 text-xs font-semibold text-slate-600 uppercase tracking-wider">
                        Ora
                      </th>
                      <th className="text-left py-3 px-4 text-xs font-semibold text-slate-600 uppercase tracking-wider">
                        Campo
                      </th>
                      <th className="text-left py-3 px-4 text-xs font-semibold text-slate-600 uppercase tracking-wider">
                        Gara
                      </th>
                      <th className="text-left py-3 px-4 text-xs font-semibold text-slate-600 uppercase tracking-wider">
                        Risultato
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {partite.map((partita) => {
                      const isProssima = partita.id === prossimaPartitaId;
                      return (
                        <tr
                          key={partita.id}
                          className={`hover:bg-slate-50 transition-colors ${
                            isProssima ? 'bg-green-50 border-l-4 border-green-400' : ''
                          }`}
                        >
                          <td className="py-3 px-4">
                            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 text-white font-bold text-sm">
                              {partita.giornata}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-2 text-sm text-slate-700">
                              <Calendar className="w-4 h-4 text-slate-400" />
                              {formatData(partita.data)}
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-2 text-sm text-slate-700">
                              <Clock className="w-4 h-4 text-slate-400" />
                              {formatOra(partita.ora)}
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-2 text-sm text-slate-700">
                              <MapPin className="w-4 h-4 text-slate-400" />
                              {formatCampo(partita.campo)}
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <div className="text-sm font-medium text-slate-800">
                              {formatGara(partita.squadra_casa, partita.squadra_trasferta)}
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-2">
                              {partita.risultato ? (
                                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700">
                                  {partita.risultato}
                                </span>
                              ) : (
                                <span className="text-slate-400 text-sm">–</span>
                              )}
                              {isProssima && (
                                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
                                  Prossima partita
                                </span>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              <div className="md:hidden space-y-4">
                {partite.map((partita) => {
                  const isProssima = partita.id === prossimaPartitaId;
                  return (
                    <div
                      key={partita.id}
                      className={`rounded-lg p-4 border-2 transition-all ${
                        isProssima
                          ? 'bg-green-50 border-green-400 shadow-md'
                          : 'bg-white border-slate-200 shadow-sm'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 text-white font-bold">
                          {partita.giornata}
                        </span>
                        {partita.risultato ? (
                          <span className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-semibold bg-slate-100 text-slate-700">
                            {partita.risultato}
                          </span>
                        ) : (
                          <span className="text-slate-400 text-sm font-medium">Da giocare</span>
                        )}
                      </div>

                      {isProssima && (
                        <div className="mb-3">
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
                            Prossima partita
                          </span>
                        </div>
                      )}

                      <div className="space-y-2 mb-4">
                        <div className="flex items-center gap-3 text-sm text-slate-700">
                          <Calendar className="w-4 h-4 text-slate-400 flex-shrink-0" />
                          <span>{formatData(partita.data)}</span>
                          <span className="text-slate-300">|</span>
                          <Clock className="w-4 h-4 text-slate-400 flex-shrink-0" />
                          <span>{formatOra(partita.ora)}</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-slate-700">
                          <MapPin className="w-4 h-4 text-slate-400 flex-shrink-0" />
                          <span>{formatCampo(partita.campo)}</span>
                        </div>
                      </div>

                      <div className="text-center py-3 bg-slate-50 rounded-lg">
                        <div className="text-sm font-medium text-slate-800 mb-1">
                          {partita.squadra_casa && partita.squadra_casa !== 'N/A'
                            ? partita.squadra_casa
                            : 'TBD'}
                        </div>
                        <div className="text-xs text-slate-500 font-semibold my-1">VS</div>
                        <div className="text-sm font-medium text-slate-800">
                          {partita.squadra_trasferta && partita.squadra_trasferta !== 'N/A'
                            ? partita.squadra_trasferta
                            : 'TBD'}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CalendarioPage;
