import React, { useState } from 'react';
import { Trophy, Award } from 'lucide-react';
import { useStandings } from '../hooks/useSupabaseData';
import CoppaGironi from '../components/CoppaGironi';
import CoppaBracket from '../components/CoppaBracket';

const CoppaPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'calcio5' | 'calcio7'>('calcio5');
  const [activePhase, setActivePhase] = useState<'gironi' | 'eliminazione'>('gironi');

  const { data: standings, loading, error } = useStandings(activeTab);

  return (
    <div className="space-y-8">
      <div className="flex items-center space-x-3">
        <Trophy className="text-yellow-600" size={32} />
        <h1 className="text-4xl font-bold text-slate-800">Coppa Italia</h1>
      </div>

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
          <CoppaGironi data={standings} loading={loading} error={error} />

          <div className="bg-white p-4 rounded-xl shadow-lg">
            <h3 className="text-sm font-medium text-slate-800 mb-3">Legenda Gironi</h3>
            <div className="space-y-2 text-xs text-slate-600">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-green-50 border-l-4 border-green-500 rounded-sm"></div>
                <span>Qualificate agli ottavi/quarti di finale (prime 2 classificate)</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-slate-50 border-l-4 border-slate-300 rounded-sm"></div>
                <span>Eliminate (ultime 2 classificate)</span>
              </div>
            </div>
            <div className="mt-3 pt-3 border-t border-slate-200">
              <h4 className="text-xs font-medium text-slate-700 mb-2">Abbreviazioni:</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 text-xs text-slate-600">
                <div><strong>Pt</strong> = Punti</div>
                <div><strong>G</strong> = Giocate</div>
                <div><strong>V</strong> = Vittorie</div>
                <div><strong>P</strong> = Pareggi</div>
                <div><strong>S</strong> = Sconfitte</div>
                <div><strong>GF</strong> = Gol fatti</div>
                <div><strong>GS</strong> = Gol subiti</div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <CoppaBracket category={activeTab} />
      )}
    </div>
  );
};

export default CoppaPage;
