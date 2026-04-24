import React, { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, ChevronDown, Sun } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { Partita, Squadra } from '../types/calendario';

type TournamentType = 'calcio5' | 'calcio7';

const EstivoCalendarioPage: React.FC = () => {
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
    const table = activeTab === 'calcio5' ? 'standings_estivo_calcio5' : 'standings_estivo_calcio7';
    const { data, error } = await supabase.from(table).select('squadra').order('squadra');

    if (!error && data) {
      setSquadre(data.map((s: Squadra) => s.squadra));
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
    const table = activeTab === 'calcio5' ? 'calendario_estivo_calcio5' : 'calendario_estivo_calcio7';

    let query = supabase.from(table).select('*');

    if (selectedSquadra) {
      query = query.or(`squadra_casa.eq."${selectedSquadra}",squadra_trasferta.eq."${selectedSquadra}"`);
    }

    query = query
      .order('giornata', { ascending: true, nullsFirst: false })
      .order('data', { ascending: true, nullsFirst: false })
      .order('ora', { ascending: true, nullsFirst: false });

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching partite estive:', error);
      setError('Errore nel caricamento delle partite estive');
      setPartite([]);
    } else {
      setPartite(data || []);
    }
    setLoading(false);
  };

  const groupMatchesByGiornata = () => {
    const grouped = partite.reduce((acc: { [key: string]: Partita[] }, partita) => {
      const g = partita.giornata ? `Giornata ${partita.giornata}` : (partita.fase_coppa || 'Fase Finale');
      if (!acc[g]) acc[g] = [];
      acc[g].push(partita);
      return acc;
    }, {});
    
    return Object.entries(grouped);
  };

  const formatData = (data: string | null) => {
    if (!data) return 'TBD';
    return new Date(data).toLocaleDateString('it-IT', { day: '2-digit', month: '2-digit' });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-orange-900 flex items-center">
          <Sun className="mr-3 text-orange-500" size={32} />
          Calendario Estivo
        </h1>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-orange-100 overflow-hidden">
        <div className="border-b border-orange-100 flex">
          <button
            onClick={() => { setActiveTab('calcio5'); setSelectedSquadra(''); }}
            className={`flex-1 py-4 font-bold transition-colors ${activeTab === 'calcio5' ? 'bg-orange-50 text-orange-600 border-b-2 border-orange-500' : 'text-slate-500 hover:bg-slate-50'}`}
          >
            Calcio a 5
          </button>
          <button
             onClick={() => { setActiveTab('calcio7'); setSelectedSquadra(''); }}
             className={`flex-1 py-4 font-bold transition-colors ${activeTab === 'calcio7' ? 'bg-orange-50 text-orange-600 border-b-2 border-orange-500' : 'text-slate-500 hover:bg-slate-50'}`}
          >
            Calcio a 7
          </button>
        </div>

        <div className="p-6 border-b border-slate-200 bg-slate-50">
          <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
            <span className="text-sm font-bold text-slate-500 uppercase tracking-wider">Filtra per squadra:</span>
            <div className="relative max-w-xs w-full">
              <select
                className="w-full appearance-none bg-white border border-slate-300 rounded-lg py-2 pl-4 pr-10 text-slate-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                value={selectedSquadra}
                onChange={(e) => setSelectedSquadra(e.target.value)}
              >
                <option value="">Tutte le squadre</option>
                {squadre.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={16} />
            </div>
          </div>
        </div>

        <div>
          {loading ? (
            <div className="flex justify-center items-center py-20">
               <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
            </div>
          ) : error ? (
             <div className="text-center text-red-500 py-10 font-medium">{error}</div>
          ) : partite.length === 0 ? (
             <div className="text-center text-slate-400 py-10">Nessuna partita programmata.</div>
          ) : (
             <div className="p-6 space-y-8">
               {groupMatchesByGiornata().map(([giornata, matches], index) => (
                  <div key={index} className="bg-orange-50/50 rounded-xl overflow-hidden border border-orange-100">
                     <div className="bg-orange-100 py-3 px-6 border-b border-orange-200">
                        <h3 className="font-bold text-orange-900">{giornata}</h3>
                     </div>
                     <div className="divide-y divide-orange-100/50 p-2">
                        {matches.map(m => (
                           <div key={m.id} className="p-4 flex flex-col md:flex-row justify-between md:items-center bg-white rounded-lg shadow-sm mb-2 hover:shadow-md transition-shadow border border-slate-100">
                              <div className="flex-1">
                                 <div className="text-lg font-bold text-slate-800">
                                    <span className={m.squadra_casa === selectedSquadra ? 'text-orange-600' : ''}>{m.squadra_casa || 'TBD'}</span>
                                    {' '}
                                    <span className="mx-2 px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-sm whitespace-nowrap border border-slate-200">
                                      {m.gol_casa !== null && m.gol_trasferta !== null ? `${m.gol_casa} - ${m.gol_trasferta}` : 'vs'}
                                    </span>
                                    {' '}
                                    <span className={m.squadra_trasferta === selectedSquadra ? 'text-orange-600' : ''}>{m.squadra_trasferta || 'TBD'}</span>
                                 </div>
                              </div>
                              <div className="flex items-center space-x-6 mt-4 md:mt-0 text-slate-500 text-sm font-medium">
                                 <div className="flex items-center"><Calendar size={16} className="mr-2 text-orange-500" /> {formatData(m.data)}</div>
                                 <div className="flex items-center"><Clock size={16} className="mr-2 text-orange-500" /> {m.ora ? m.ora.substring(0, 5) : 'TBD'}</div>
                                 <div className="flex items-center"><MapPin size={16} className="mr-2 text-orange-500" /> {m.campo || 'TBD'}</div>
                              </div>
                           </div>
                        ))}
                     </div>
                  </div>
               ))}
             </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EstivoCalendarioPage;