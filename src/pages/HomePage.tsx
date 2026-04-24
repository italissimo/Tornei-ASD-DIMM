import React, { useState, useEffect } from 'react';
import { Trophy, Users, Calendar, Award, ChevronDown, ChevronRight, Activity } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { Partita } from '../types/calendario';

interface HomePageProps {
  onNavigate?: (section: string) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const [partite, setPartite] = useState<Partita[]>([]);
  const [loadingMatch, setLoadingMatch] = useState(false);
  const [selectedTournament, setSelectedTournament] = useState<'invernale' | 'estivo'>('invernale');
  const [selectedCategory, setSelectedCategory] = useState<'calcio5' | 'calcio7'>('calcio5');

  useEffect(() => {
    fetchProssimePartite();
  }, [selectedTournament, selectedCategory]);

  const fetchProssimePartite = async () => {
    if (!supabase) return;
    setLoadingMatch(true);

    try {
      // Imposta le tabelle dinamicamente per Invernale o Estivo
      let table = '';
      if (selectedTournament === 'invernale') {
        table = selectedCategory === 'calcio5' ? 'calendario_calcio5' : 'calendario_calcio7';
      } else {
        table = selectedCategory === 'calcio5' ? 'calendario_estivo_calcio5' : 'calendario_estivo_calcio7';
      }
      
      const today = new Date().toISOString().split('T')[0];

      const { data, error } = await supabase
        .from(table)
        .select('*')
        .gte('data', today) // Prende da oggi in poi
        .order('data', { ascending: true })
        .order('ora', { ascending: true })
        .limit(3);

      if (!error && data) {
        setPartite(data);
      } else {
        setPartite([]); // Gestione in caso la tabella non esista ancora o ci siano errori
      }
    } catch (e) {
      console.error(e);
      setPartite([]);
    } finally {
      setLoadingMatch(false);
    }
  };

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return 'TBD';
    return new Date(dateStr).toLocaleDateString('it-IT', { weekday: 'short', day: '2-digit', month: 'short' });
  };
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-yellow-900 rounded-3xl p-8 md:p-12 text-white shadow-2xl">
        <div className="absolute inset-0 overflow-hidden opacity-10">
          <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-yellow-500 rounded-full blur-3xl"></div>
        </div>
        <div className="relative z-10 text-center">
          <div className="inline-block mb-6">
            <img
              src="/logo.jpg"
              alt="ASD DIMM Logo"
              className="w-24 h-24 mx-auto rounded-full object-cover shadow-lg border-4 border-yellow-400"
            />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
            Benvenuto ai Tornei ASD DIMM
          </h1>
          <p className="text-xl text-slate-200 max-w-2xl mx-auto leading-relaxed">
            La tua app per seguire classifiche, risultati e highlights dei tornei di calcio a 5 e a 7
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div 
          onClick={() => onNavigate?.('invernale-standings')}
          className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer border border-slate-100 flex flex-col"
        >
          <div className="bg-yellow-500 w-12 h-12 rounded-2xl flex items-center justify-center mb-4 shadow-sm">
            <Trophy className="text-white" size={24} />
          </div>
          <h3 className="text-lg font-bold text-slate-800 mb-2">Classifiche</h3>
          <p className="text-slate-500 text-sm leading-relaxed">
            Consulta le classifiche aggiornate di calcio a 5 e calcio a 7
          </p>
        </div>

        <div 
          onClick={() => onNavigate?.('invernale-standings')}
          className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer border border-slate-100 flex flex-col"
        >
          <div className="bg-slate-800 w-12 h-12 rounded-2xl flex items-center justify-center mb-4 shadow-sm">
            <Users className="text-white" size={24} />
          </div>
          <h3 className="text-lg font-bold text-slate-800 mb-2">Squadre</h3>
          <p className="text-slate-500 text-sm leading-relaxed">
            Segui le performance delle tue squadre preferite
          </p>
        </div>

        <div 
          onClick={() => onNavigate?.('invernale-calendario')}
          className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer border border-slate-100 flex flex-col"
        >
          <div className="bg-blue-500 w-12 h-12 rounded-2xl flex items-center justify-center mb-4 shadow-sm">
            <Calendar className="text-white" size={24} />
          </div>
          <h3 className="text-lg font-bold text-slate-800 mb-2">Calendario</h3>
          <p className="text-slate-500 text-sm leading-relaxed">
            Non perdere nessuna partita del torneo
          </p>
        </div>

        <div 
          onClick={() => onNavigate?.('highlights')}
          className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer border border-slate-100 flex flex-col"
        >
          <div className="bg-green-500 w-12 h-12 rounded-2xl flex items-center justify-center mb-4 shadow-sm">
            <Award className="text-white" size={24} />
          </div>
          <h3 className="text-lg font-bold text-slate-800 mb-2">Highlights</h3>
          <p className="text-slate-500 text-sm leading-relaxed">
            Rivedi i momenti migliori delle partite
          </p>
        </div>
      </div>

      <div className="bg-gradient-to-r from-yellow-500 via-yellow-600 to-slate-800 rounded-2xl p-8 text-white shadow-2xl">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          <div className="lg:w-2/3 mb-6 lg:mb-0">
            <h2 className="text-3xl font-bold mb-3">
              Installa l'app sul tuo dispositivo
            </h2>
            <p className="text-yellow-100 mb-4 text-lg leading-relaxed">
              Scarica l'app per avere sempre a portata di mano classifiche, risultati e highlights.
              Funziona anche offline!
            </p>
          </div>
          <div className="lg:w-1/3 text-center">
            <button 
              onClick={() => onNavigate?.('download')}
              className="bg-white text-slate-800 px-8 py-4 rounded-xl font-bold hover:bg-yellow-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Scopri come installare
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Widget: Navigazione Veloce - Tornei */}
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100 flex flex-col h-full">
          <h3 className="text-2xl font-bold text-slate-800 mb-6 flex items-center">
            <span className="text-blue-500 mr-2"><Activity size={24} /></span>
            Scorciatoie Tornei
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1">
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-5 rounded-xl border border-blue-100 hover:shadow-md transition-shadow group cursor-pointer relative overflow-hidden">
               <div className="absolute top-0 right-0 p-3 opacity-20 group-hover:opacity-40 transition-opacity">
                  <span className="text-4xl text-blue-500">❄️</span>
               </div>
               <h4 className="text-lg font-bold text-blue-900 mb-2 relative z-10">Torneo Invernale</h4>
               <p className="text-xs text-blue-700/80 mb-4 relative z-10">Classifiche a gironi (Calcio a 5 & Calcio a 7), Coppa e Playoff Ufficiali.</p>
               <div className="flex items-center text-sm font-bold text-blue-600 relative z-10 group-hover:text-blue-800 transition-colors">
                 Esplora <ChevronRight size={16} className="ml-1 transform group-hover:translate-x-1 transition-transform" />
               </div>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-red-50 p-5 rounded-xl border border-orange-100 hover:shadow-md transition-shadow group cursor-pointer relative overflow-hidden">
               <div className="absolute top-0 right-0 p-3 opacity-20 group-hover:opacity-40 transition-opacity">
                  <span className="text-4xl text-orange-500">☀️</span>
               </div>
               <h4 className="text-lg font-bold text-orange-900 mb-2 relative z-10">Torneo Estivo</h4>
               <p className="text-xs text-orange-700/80 mb-4 relative z-10">Gironi infuocati seguiti da una fase finale per stabilire il campione.</p>
               <div className="flex items-center text-sm font-bold text-orange-600 relative z-10 group-hover:text-orange-800 transition-colors">
                 Esplora <ChevronRight size={16} className="ml-1 transform group-hover:translate-x-1 transition-transform" />
               </div>
            </div>
          </div>
        </div>

        {/* Widget: Calendario Immediato */}
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100 flex flex-col h-full">
          <div className="flex flex-wrap items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-slate-800 flex items-center mb-2 sm:mb-0">
              <span className="text-yellow-500 mr-2">⚽</span>
              Prossime Partite
            </h3>
            
            {/* Filtri Prossime Partite */}
            <div className="flex flex-wrap items-center gap-2">
               <div className="relative">
                <select
                  value={selectedTournament}
                  onChange={(e) => setSelectedTournament(e.target.value as any)}
                  className="appearance-none bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 pr-8 text-xs font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                >
                  <option value="invernale">❄️ Invernale</option>
                  <option value="estivo">☀️ Estivo</option>
                </select>
                <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              </div>
              <div className="relative">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value as any)}
                  className="appearance-none bg-yellow-50 border border-yellow-200 rounded-lg px-3 py-1.5 pr-8 text-xs font-bold text-yellow-800 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                >
                  <option value="calcio5">A 5</option>
                  <option value="calcio7">A 7</option>
                </select>
                <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-yellow-600 pointer-events-none" />
              </div>
            </div>
          </div>

          <div className="space-y-3 flex-1">
            {loadingMatch ? (
              <div className="flex justify-center items-center h-full min-h-[150px]">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-500"></div>
              </div>
            ) : partite.length === 0 ? (
               <div className="flex flex-col justify-center items-center h-full min-h-[150px] bg-slate-50 rounded-xl border border-dashed border-slate-200 text-slate-400">
                  <Calendar size={32} className="mb-2 opacity-50" />
                  <p className="text-sm font-medium">Nessuna partita futura programmata</p>
                  <p className="text-xs mt-1">Torna a controllare tra qualche giorno!</p>
               </div>
            ) : partite.map(match => (
              <div key={match.id} className="flex justify-between items-center p-3 bg-white rounded-xl hover:shadow-md transition-shadow border border-slate-100 group">
                <div className="flex-1 pr-4">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
                      {match.tipo_competizione === 'playoff' ? '🏆 Playoff' : match.tipo_competizione === 'coppa' ? '🥇 Coppa' : '⚽ Camp'}
                    </span>
                    <span className="text-xs text-slate-500">{match.fase_coppa ? match.fase_coppa : `Giornata ${match.giornata}`}</span>
                  </div>
                  <p className="font-bold text-slate-800 text-sm group-hover:text-yellow-600 transition-colors">
                    {match.squadra_casa || 'TBD'} <span className="text-slate-400 font-normal mx-1">vs</span> {match.squadra_trasferta || 'TBD'}
                  </p>
                </div>
                <div className="text-right flex flex-col items-end">
                  <span className="text-xs font-bold text-yellow-700 bg-yellow-50 border border-yellow-200 px-2 py-1 rounded-md whitespace-nowrap">
                    {formatDate(match.data)}
                  </span>
                  <span className="text-xs text-slate-500 mt-1 font-medium">{match.ora?.substring(0, 5)} {match.campo ? `• C. ${match.campo}` : ''}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;