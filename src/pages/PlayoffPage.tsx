import React, { useState } from 'react';
import { Trophy, Award } from 'lucide-react';
import { useStandings } from '../hooks/useSupabaseData';
import PlayoffGironi from '../components/PlayoffGironi';
import PlayoffBracket from '../components/PlayoffBracket';

const PlayoffPage: React.FC = () => {
  const [activeTab] = useState<'calcio5'>('calcio5'); // Playoff per ora lo supportiamo solo a 5
  const [activePhase, setActivePhase] = useState<'gironi' | 'eliminazione'>('gironi');

  const { data: standings, loading, error } = useStandings(activeTab);

  return (
    <div className="space-y-8">
      <div className="flex items-center space-x-3">
        <Trophy className="text-yellow-600" size={32} />
        <h1 className="text-4xl font-bold text-slate-800">Playoff (Tiki Taka Cup)</h1>
      </div>

      {/* Rimosso lo switch tra Calcio a 5 e 7 se non richiesto. Aggiungilo come in Coppa se necessario per il Calcio a 7 futuri */}
      <div className="flex space-x-1 bg-slate-100 p-1 rounded-lg">
        <div className="flex-1 px-4 py-2 rounded-md text-sm font-medium bg-white text-slate-900 shadow text-center cursor-default">
          Calcio a 5
        </div>
      </div>

      <div className="flex space-x-1 bg-slate-100 p-1 rounded-lg">
        <button
          onClick={() => setActivePhase('gironi')}
          className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center justify-center space-x-2 ${
            activePhase === 'gironi'
              ? 'bg-white text-slate-900 shadow'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Trophy size={16} />
          <span>Fase a Gironi</span>
        </button>
        <button
          onClick={() => setActivePhase('eliminazione')}
          className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center justify-center space-x-2 ${
            activePhase === 'eliminazione'
              ? 'bg-white text-slate-900 shadow'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Award size={16} />
          <span>Eliminazione Diretta</span>
        </button>
      </div>

      {activePhase === 'gironi' ? (
        <>
          <PlayoffGironi data={standings} loading={loading} error={error} />

          <div className="bg-white p-4 rounded-xl shadow-lg">
            <h3 className="text-sm font-medium text-slate-800 mb-3">Legenda Playoff</h3>
            <div className="space-y-2 text-xs text-slate-600">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-green-50 border-l-4 border-green-500 rounded-sm"></div>
                <span>Passaggio alle Semifinali (Prime 2 Gir. A/B oppure Prime 4 Gir. C/Unico)</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-slate-50 border-l-4 border-slate-300 rounded-sm"></div>
                <span>Squadre Eliminate</span>
              </div>
            </div>
          </div>
        </>
      ) : (
        <PlayoffBracket category={activeTab} />
      )}
    </div>
  );
};

export default PlayoffPage;
