import React, { useState, useEffect } from 'react';
import { Trophy, Users, Calendar, Award, ChevronDown, ChevronRight, Activity, Shield } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { Partita } from '../types/calendario';

interface HomePageProps {
  onNavigate?: (section: string) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  // Widget "La tua Squadra" State
  const [selectedTournament, setSelectedTournament] = useState<'invernale' | 'estivo'>('invernale');
  const [selectedCategory, setSelectedCategory] = useState<'calcio5' | 'calcio7'>('calcio5');
  const [availableTeams, setAvailableTeams] = useState<string[]>([]);
  const [selectedTeam, setSelectedTeam] = useState<string>('');

  const [teamStanding, setTeamStanding] = useState<any>(null);
  const [teamMatches, setTeamMatches] = useState<Partita[]>([]);
  const [loadingData, setLoadingData] = useState(false);

  useEffect(() => {
    fetchTeams();
  }, [selectedTournament, selectedCategory]);

  useEffect(() => {
    if (selectedTeam) {
      fetchTeamData();
    } else {
      setTeamStanding(null);
      setTeamMatches([]);
    }
  }, [selectedTeam, selectedTournament, selectedCategory]);

  const fetchTeams = async () => {
    if (!supabase) return;
    
    const tablePrefix = selectedTournament === 'invernale' ? 'standings' : 'standings_estivo';
    const tableName = `${tablePrefix}_${selectedCategory}`;

    try {
      const { data, error } = await supabase
        .from(tableName)
        .select('squadra')
        .order('squadra');

      if (!error && data) {
        const teams = data.map(d => d.squadra);
        setAvailableTeams(teams);
        if (teams.length > 0 && !teams.includes(selectedTeam)) {
          setSelectedTeam(teams[0]); // Seleziona automaticamente la prima se cambia torneo/categoria
        } else if (teams.length === 0) {
          setSelectedTeam('');
        }
      } else {
        setAvailableTeams([]);
        setSelectedTeam('');
      }
    } catch (e) {
      console.error(e);
      setAvailableTeams([]);
    }
  };

  const fetchTeamData = async () => {
    if (!supabase || !selectedTeam) return;
    setLoadingData(true);

    try {
      const standingsTable = selectedTournament === 'invernale' 
        ? `standings_${selectedCategory}` 
        : `standings_estivo_${selectedCategory}`;
      
      const calendarTable = selectedTournament === 'invernale'
        ? `calendario_${selectedCategory}`
        : `calendario_estivo_${selectedCategory}`;

      // 1. Fetch Classifica della squadra
      const { data: standingData, error: standingError } = await supabase
        .from(standingsTable)
        .select('*')
        .eq('squadra', selectedTeam)
        .single();
      
      if (!standingError && standingData) {
        setTeamStanding(standingData);
      } else {
        setTeamStanding(null);
      }

      // 2. Fetch Partite della squadra (Prossime 4 o passate se non ci sono)
      const today = new Date().toISOString().split('T')[0];
      
      // Prima cerchiamo le PROSSIME partite (data >= oggi)
      const { data: futureMatches, error: futureError } = await supabase
        .from(calendarTable)
        .select('*')
        .or(`squadra_casa.eq."${selectedTeam}",squadra_trasferta.eq."${selectedTeam}"`)
        .gte('data', today)
        .order('data', { ascending: true })
        .order('ora', { ascending: true })
        .limit(3);

      if (!futureError && futureMatches && futureMatches.length > 0) {
        setTeamMatches(futureMatches);
      } else {
         // Se non ci sono partite future, prendiamo le ULTIME passate (data < oggi)
        const { data: pastMatches, error: pastError } = await supabase
        .from(calendarTable)
        .select('*')
        .or(`squadra_casa.eq."${selectedTeam}",squadra_trasferta.eq."${selectedTeam}"`)
        .lt('data', today)
        .order('data', { ascending: false })
        .order('ora', { ascending: false })
        .limit(3);

        if (!pastError && pastMatches) {
          setTeamMatches(pastMatches);
        } else {
          setTeamMatches([]);
        }
      }
    } catch (e) {
      console.error(e);
      setTeamStanding(null);
      setTeamMatches([]);
    } finally {
      setLoadingData(false);
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

      {/* SEZIONE: LA TUA SQUADRA */}
      <h2 className="text-3xl font-bold text-slate-800 mt-12 mb-6 flex items-center">
        <span className="text-yellow-500 mr-2"><Shield size={32} /></span>
        La Tua Squadra
      </h2>

      {/* Menu di selezione Squadra */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 mb-6 sticky top-4 z-20 flex flex-wrap items-center gap-4">
        <span className="text-sm font-bold text-slate-500 uppercase tracking-widest">Filtra:</span>
        <div className="relative">
          <select
            value={selectedTournament}
            onChange={(e) => setSelectedTournament(e.target.value as any)}
            className="appearance-none bg-slate-50 border border-slate-200 rounded-lg pl-10 pr-8 py-2 text-sm font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          >
            <option value="invernale">❄️ Torneo Invernale</option>
            <option value="estivo">☀️ Torneo Estivo</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
        </div>
        <div className="relative">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value as any)}
            className="appearance-none bg-yellow-50 border border-yellow-200 rounded-lg pl-3 pr-8 py-2 text-sm font-bold text-yellow-800 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          >
            <option value="calcio5">Calcio a 5</option>
            <option value="calcio7">Calcio a 7</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-yellow-600 pointer-events-none" />
        </div>
        <div className="relative flex-1 min-w-[200px]">
          <select
            value={selectedTeam}
            onChange={(e) => setSelectedTeam(e.target.value)}
            className="appearance-none w-full bg-slate-800 border border-slate-700 rounded-lg pl-3 pr-8 py-2 text-sm font-bold text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
            disabled={availableTeams.length === 0}
          >
            {availableTeams.length === 0 ? (
              <option value="">(Nessuna squadra trovata)</option>
            ) : (
              availableTeams.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))
            )}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* WIDGET 1: Statistiche Squadra Selezionata */}
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100 flex flex-col">
          <h3 className="text-2xl font-bold text-slate-800 mb-6 flex items-center">
            <span className="text-blue-500 mr-2"><Activity size={24} /></span>
            {selectedTeam ? `Statistiche ${selectedTeam}` : 'Seleziona una squadra'}
          </h3>
          
          <div className="flex-1 bg-slate-50 p-6 rounded-xl border border-slate-200 flex flex-col justify-center items-center">
            {loadingData ? (
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-500"></div>
            ) : !teamStanding ? (
              <div className="text-slate-400 text-center text-sm">Seleziona una squadra per vederne le statistiche dalla classifica.</div>
            ) : (
              <div className="w-full">
                <div className="flex items-center justify-between mb-6">
                  <div className="text-center">
                    <span className="block text-4xl font-black text-slate-800">{teamStanding.posizione}°</span>
                    <span className="text-xs font-bold text-slate-400 uppercase">Posizione</span>
                  </div>
                  <div className="text-center">
                    <span className="block text-4xl font-black text-yellow-600">{teamStanding.punti}</span>
                    <span className="text-xs font-bold text-yellow-800/60 uppercase">Punti</span>
                  </div>
                  <div className="text-center">
                     <span className="block text-2xl font-bold text-slate-600 mt-2">{teamStanding.giocate}</span>
                     <span className="text-xs font-bold text-slate-400 uppercase">Partite (V:{teamStanding.vittorie}-N:{teamStanding.pareggi}-P:{teamStanding.sconfitte})</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mt-4">
                  <div className="bg-green-50 rounded-lg p-3 border border-green-100 text-center">
                     <p className="text-xs text-green-600 font-bold uppercase mb-1">Reti Fatte</p>
                     <p className="text-2xl font-black text-green-700">{teamStanding.reti_fatte}</p>
                  </div>
                  <div className="bg-red-50 rounded-lg p-3 border border-red-100 text-center">
                     <p className="text-xs text-red-600 font-bold uppercase mb-1">Reti Subite</p>
                     <p className="text-2xl font-black text-red-700">{teamStanding.reti_subite}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* WIDGET 2: Calendario Squadra Selezionata */}
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100 flex flex-col h-full">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-slate-800 flex items-center">
              <span className="text-yellow-500 mr-2">⚽</span>
              Il tuo Calendario
            </h3>
          </div>

          <div className="space-y-3 flex-1 flex flex-col">
            {loadingData ? (
              <div className="flex justify-center items-center flex-1 min-h-[200px]">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-500"></div>
              </div>
             ) : !selectedTeam ? (
              <div className="flex flex-col justify-center items-center flex-1 min-h-[200px] bg-slate-50 rounded-xl border border-dashed border-slate-200 text-slate-400">
                <Calendar size={32} className="mb-2 opacity-50" />
                <p className="text-sm font-medium">Seleziona una squadra</p>
                <p className="text-xs mt-1">per visualizzare le prossime partite</p>
              </div>
            ) : teamMatches.length === 0 ? (
               <div className="flex flex-col justify-center items-center flex-1 min-h-[200px] bg-slate-50 rounded-xl border border-dashed border-slate-200 text-slate-400">
                  <Calendar size={32} className="mb-2 opacity-50" />
                  <p className="text-sm font-medium">Nessun match trovato per '{selectedTeam}'</p>
               </div>
            ) : teamMatches.map(match => (
              <div key={match.id} className="flex justify-between items-center p-3 bg-white rounded-xl hover:shadow-md transition-shadow border border-slate-100 group">
                <div className="flex-1 pr-4">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
                      {match.tipo_competizione === 'playoff' ? '🏆 Playoff' : match.tipo_competizione === 'coppa' ? '🥇 Coppa' : '⚽ Camp'}
                    </span>
                    <span className="text-xs text-slate-500 font-bold">{match.fase_coppa ? match.fase_coppa : `Giornata ${match.giornata}`}</span>
                  </div>
                  <p className="font-bold text-slate-800 text-sm group-hover:text-yellow-600 transition-colors">
                    {/* Evidenziamo la tua squadra col grassetto */}
                    <span className={match.squadra_casa === selectedTeam ? 'text-blue-600 font-black' : ''}>{match.squadra_casa || 'TBD'}</span>
                    {' '}
                    {match.squadra_casa && match.squadra_trasferta && (match.gol_casa !== null && match.gol_trasferta !== null) ? (
                        <span className="mx-2 px-2 py-0.5 bg-slate-800 text-white rounded text-xs">
                          {match.gol_casa} - {match.gol_trasferta}
                        </span>
                    ) : (
                      <span className="text-slate-400 font-normal mx-1">vs</span>
                    )}
                    {' '}
                    <span className={match.squadra_trasferta === selectedTeam ? 'text-blue-600 font-black' : ''}>{match.squadra_trasferta || 'TBD'}</span>
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