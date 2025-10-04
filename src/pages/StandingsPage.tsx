import React from 'react';
import { Trophy, Target, Users, Loader, AlertCircle } from 'lucide-react';
import { useStandings, useCapocannonieri } from '../hooks/useSupabaseData';
import { formatValue, formatText, formatDate, supabase } from '../lib/supabase';

interface StandingsPageProps {
  isAdmin: boolean;
}

const StandingsPage: React.FC<StandingsPageProps> = ({ isAdmin }) => {
  const [activeTab, setActiveTab] = React.useState<'calcio5' | 'calcio7'>('calcio5');
  const [activeView, setActiveView] = React.useState<'teams' | 'scorers'>('teams');

  const { data: standings, loading: standingsLoading, error: standingsError } = useStandings(activeTab);
  const { data: scorers, loading: scorersLoading, error: scorersError } = useCapocannonieri(activeTab);

  // Check if Supabase is configured
  if (!supabase) {
    return (
      <div className="space-y-8">
        <div className="flex items-center space-x-3">
          <Trophy className="text-teal-600" size={32} />
          <h1 className="text-4xl font-bold text-slate-800">Classifiche</h1>
        </div>
        
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
          <div className="flex items-center space-x-3">
            <AlertCircle className="text-yellow-600" size={24} />
            <div>
              <h3 className="text-lg font-semibold text-yellow-800">
                Configurazione Supabase Richiesta
              </h3>
              <p className="text-yellow-700 mt-2">
                Per visualizzare le classifiche dal database, è necessario configurare Supabase. 
                Clicca sul pulsante "Supabase" nelle impostazioni (icona in alto a destra del preview) 
                per connettere il database.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const LoadingSpinner = () => (
    <div className="flex items-center justify-center py-12">
      <Loader className="animate-spin text-teal-600" size={32} />
      <span className="ml-3 text-slate-600">Caricamento dati...</span>
    </div>
  );

  const ErrorMessage = ({ message }: { message: string }) => (
    <div className="bg-red-50 border border-red-200 rounded-xl p-6">
      <div className="flex items-center space-x-3">
        <AlertCircle className="text-red-600" size={24} />
        <div>
          <h3 className="text-lg font-semibold text-red-800">
            Errore nel caricamento dei dati
          </h3>
          <p className="text-red-700 mt-2">{message}</p>
          <div className="text-red-600 text-sm mt-3 space-y-1">
            <p><strong>Possibili cause:</strong></p>
            <ul className="list-disc list-inside ml-2 space-y-1">
              <li>Le tabelle non esistono ancora nel database Supabase</li>
              <li>Problemi di connessione al database</li>
              <li>Permessi insufficienti per accedere alle tabelle</li>
            </ul>
            <p className="mt-2"><strong>Soluzione:</strong> Controlla la console del browser per dettagli specifici dell'errore.</p>
          </div>
        </div>
      </div>
    </div>
  );

  const NoDataMessage = ({ type }: { type: 'teams' | 'scorers' }) => (
    <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
      <div className="flex items-center space-x-3">
        <Trophy className="text-blue-600" size={24} />
        <div>
          <h3 className="text-lg font-semibold text-blue-800">
            {type === 'teams' ? 'Nessuna squadra trovata' : 'Nessun capocannoniere trovato'}
          </h3>
          <p className="text-blue-700 mt-2">
            {type === 'teams' 
              ? 'La tabella delle classifiche è vuota. Aggiungi dati alla tabella Supabase.'
              : 'La tabella dei capocannonieri è vuota. Aggiungi dati alla tabella Supabase.'
            }
          </p>
        </div>
      </div>
    </div>
  );

  const getSerieColor = (serie: 'A' | 'B', position: number) => {
    if (serie === 'A') {
      if (position <= 3) return 'bg-green-50 border-l-4 border-green-500';
      return 'bg-blue-50 border-l-4 border-blue-500';
    } else {
      if (position <= 3) return 'bg-orange-50 border-l-4 border-orange-500';
      return 'bg-red-50 border-l-4 border-red-500';
    }
  };

  const getPositionBadge = (position: number, serie: 'A' | 'B') => {
    const baseClasses = "inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold";
    
    if (serie === 'A') {
      if (position === 1) return `${baseClasses} bg-yellow-400 text-yellow-900`;
      if (position === 2) return `${baseClasses} bg-slate-300 text-slate-700`;
      if (position === 3) return `${baseClasses} bg-orange-400 text-orange-900`;
      return `${baseClasses} bg-blue-100 text-blue-800`;
    } else {
      if (position === 9) return `${baseClasses} bg-yellow-300 text-yellow-800`; // 1st in Serie B
      if (position === 10) return `${baseClasses} bg-slate-200 text-slate-600`; // 2nd in Serie B
      if (position === 11) return `${baseClasses} bg-orange-300 text-orange-800`; // 3rd in Serie B
      return `${baseClasses} bg-red-100 text-red-700`;
    }
  };

  const TeamTable = () => {
    if (standingsLoading) return <LoadingSpinner />;
    if (standingsError) return <ErrorMessage message={standingsError} />;
    if (!standings || standings.length === 0) return <NoDataMessage type="teams" />;

    const lastUpdate = standings.length > 0 ? standings[0].last_update : null;

    return (
      <div className="space-y-4">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Pos</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Squadra</th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-slate-500 uppercase tracking-wider">Serie</th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-slate-500 uppercase tracking-wider">Pt</th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-slate-500 uppercase tracking-wider">G</th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-slate-500 uppercase tracking-wider">V</th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-slate-500 uppercase tracking-wider">N</th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-slate-500 uppercase tracking-wider">P</th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-slate-500 uppercase tracking-wider">RF</th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-slate-500 uppercase tracking-wider">RS</th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-slate-500 uppercase tracking-wider">Amm</th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-slate-500 uppercase tracking-wider">Esp</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {standings.map((team) => (
                  <tr key={team.posizione} className={`hover:bg-slate-50 ${getSerieColor(team.serie, team.posizione)}`}>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span className={getPositionBadge(team.posizione, team.serie)}>
                        {team.posizione}
                      </span>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="font-medium text-slate-900">{formatText(team.squadra)}</div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-center">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        team.serie === 'A' ? 'bg-blue-100 text-blue-800' : 'bg-red-100 text-red-800'
                      }`}>
                        Serie {team.serie}
                      </span>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-center">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-teal-100 text-teal-800">
                        {formatValue(team.punti)}
                      </span>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-center text-sm text-slate-900">{formatValue(team.giocate)}</td>
                    <td className="px-4 py-4 whitespace-nowrap text-center text-sm text-green-600 font-medium">{formatValue(team.vittorie)}</td>
                    <td className="px-4 py-4 whitespace-nowrap text-center text-sm text-yellow-600 font-medium">{formatValue(team.pareggi)}</td>
                    <td className="px-4 py-4 whitespace-nowrap text-center text-sm text-red-600 font-medium">{formatValue(team.sconfitte)}</td>
                    <td className="px-4 py-4 whitespace-nowrap text-center text-sm text-slate-900">{formatValue(team.reti_fatte)}</td>
                    <td className="px-4 py-4 whitespace-nowrap text-center text-sm text-slate-900">{formatValue(team.reti_subite)}</td>
                    <td className="px-4 py-4 whitespace-nowrap text-center text-sm text-yellow-600">{formatValue(team.ammonizioni)}</td>
                    <td className="px-4 py-4 whitespace-nowrap text-center text-sm text-red-600">{formatValue(team.espulsioni)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        {lastUpdate && (
          <div className="text-center text-sm text-slate-500">
            Ultimo aggiornamento: {formatDate(lastUpdate)}
          </div>
        )}
      </div>
    );
  };

  const ScorersTable = () => {
    if (scorersLoading) return <LoadingSpinner />;
    if (scorersError) return <ErrorMessage message={scorersError} />;
    if (!scorers || scorers.length === 0) return <NoDataMessage type="scorers" />;

    const lastUpdate = scorers.length > 0 ? scorers[0].last_update : null;

    return (
      <div className="space-y-4">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Pos</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Giocatore</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Squadra</th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-slate-500 uppercase tracking-wider">Gol</th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-slate-500 uppercase tracking-wider">Assist</th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-slate-500 uppercase tracking-wider">Amm</th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-slate-500 uppercase tracking-wider">Esp</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {scorers.map((player) => (
                  <tr key={player.posizione} className={`hover:bg-slate-50 ${
                    player.posizione <= 3 ? 'bg-orange-50 border-l-4 border-orange-500' : ''
                  }`}>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold ${
                        player.posizione === 1 ? 'bg-yellow-400 text-yellow-900' :
                        player.posizione === 2 ? 'bg-slate-300 text-slate-700' :
                        player.posizione === 3 ? 'bg-orange-400 text-orange-900' :
                        'bg-slate-100 text-slate-600'
                      }`}>
                        {player.posizione}
                      </span>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="font-medium text-slate-900">{formatText(player.giocatore)}</div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="text-sm text-slate-600">{formatText(player.squadra)}</div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-center">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                        {formatValue(player.gol)}
                      </span>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-center text-sm text-blue-600 font-medium">{formatValue(player.assist)}</td>
                    <td className="px-4 py-4 whitespace-nowrap text-center text-sm text-yellow-600">{formatValue(player.ammonizioni)}</td>
                    <td className="px-4 py-4 whitespace-nowrap text-center text-sm text-red-600">{formatValue(player.espulsioni)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        {lastUpdate && (
          <div className="text-center text-sm text-slate-500">
            Ultimo aggiornamento: {formatDate(lastUpdate)}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center space-x-3">
        <Trophy className="text-teal-600" size={32} />
        <h1 className="text-4xl font-bold text-slate-800">Classifiche</h1>
      </div>

      {/* Category Tabs */}
      <div className="flex space-x-1 bg-slate-100 p-1 rounded-lg">
        <button
          onClick={() => setActiveTab('calcio5')}
          className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'calcio5'
              ? 'bg-white text-slate-900 shadow'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Calcio a 5
        </button>
        <button
          onClick={() => setActiveTab('calcio7')}
          className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'calcio7'
              ? 'bg-white text-slate-900 shadow'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Calcio a 7
        </button>
      </div>

      {/* View Tabs */}
      <div className="flex space-x-1 bg-slate-100 p-1 rounded-lg">
        <button
          onClick={() => setActiveView('teams')}
          className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center justify-center space-x-2 ${
            activeView === 'teams'
              ? 'bg-white text-slate-900 shadow'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Users size={16} />
          <span>Classifica generale</span>
        </button>
        <button
          onClick={() => setActiveView('scorers')}
          className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center justify-center space-x-2 ${
            activeView === 'scorers'
              ? 'bg-white text-slate-900 shadow'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Target size={16} />
          <span>Capocannonieri</span>
        </button>
      </div>

      {/* Content */}
      {activeView === 'teams' ? <TeamTable /> : <ScorersTable />}

      {/* Legend */}
      <div className="bg-white p-4 rounded-xl shadow-lg">
        <h3 className="text-sm font-medium text-slate-800 mb-3">Legenda</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="text-xs font-medium text-slate-700 mb-2">Serie e Posizioni:</h4>
            <div className="space-y-1 text-xs text-slate-600">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-blue-100 border-l-2 border-blue-500 rounded-sm"></div>
                <span>Serie A (posizioni 1-8)</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-red-100 border-l-2 border-red-500 rounded-sm"></div>
                <span>Serie B (posizioni 9-16)</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-green-100 border-l-2 border-green-500 rounded-sm"></div>
                <span>Primi 3 classificati</span>
              </div>
            </div>
          </div>
          <div>
            <h4 className="text-xs font-medium text-slate-700 mb-2">Abbreviazioni:</h4>
            <div className="grid grid-cols-2 gap-x-4 text-xs text-slate-600">
              <div><strong>Pt</strong> = Punti</div>
              <div><strong>G</strong> = Giocate</div>
              <div><strong>V</strong> = Vittorie</div>
              <div><strong>N</strong> = Pareggi</div>
              <div><strong>P</strong> = Sconfitte</div>
              <div><strong>RF</strong> = Reti fatte</div>
              <div><strong>RS</strong> = Reti subite</div>
              <div><strong>Amm</strong> = Ammonizioni</div>
              <div><strong>Esp</strong> = Espulsioni</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StandingsPage;