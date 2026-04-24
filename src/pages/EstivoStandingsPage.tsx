import React from 'react';
import { Sun, Trophy } from 'lucide-react';

interface Props {
  isAdmin?: boolean;
}

const EstivoStandingsPage: React.FC<Props> = ({ isAdmin }) => {
  // Mock data for 4 gironi (A, B, C, D)
  const gironi = ['A', 'B', 'C', 'D'];

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-center space-x-3">
        <Sun className="text-orange-500 animate-spin-slow" size={32} />
        <h1 className="text-4xl font-bold text-orange-900">Classifiche - Torneo Estivo</h1>
      </div>

      <div className="p-4 bg-orange-100 rounded-lg text-orange-800 border border-orange-200 shadow-sm">
        <p>Qui verranno visualizzate le classifiche dei <strong>4 gironi (da 5 squadre ciascuno)</strong> una volta attivate su Supabase.</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {gironi.map(girone => (
          <div key={girone} className="bg-white rounded-xl shadow-lg border border-orange-100 overflow-hidden">
            <div className="bg-gradient-to-r from-orange-400 to-red-500 px-6 py-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-white flex items-center">
                <Trophy size={20} className="mr-2" />
                Girone {girone}
              </h2>
            </div>
            
            <div className="p-8 text-center text-slate-400 bg-orange-50/30">
              <p>Nessuna squadra ancora inserita in questo girone.</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EstivoStandingsPage;