import React from 'react';
import { Trophy, Loader, AlertCircle } from 'lucide-react';
import { StandingsRow, formatValue, formatText } from '../lib/supabase';

interface CoppaGironiProps {
  data: StandingsRow[];
  loading: boolean;
  error: string | null;
}

const CoppaGironi: React.FC<CoppaGironiProps> = ({ data, loading, error }) => {
  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader className="animate-spin text-teal-600" size={32} />
        <span className="ml-3 text-slate-600">Caricamento gironi...</span>
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
              Errore nel caricamento dei gironi
            </h3>
            <p className="text-red-700 mt-2">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  const gironi = ['A', 'B', 'C', 'D'];
  const gironiData = gironi.map(girone => ({
    girone,
    squadre: data
      .filter(team => team.girone === girone)
      .sort((a, b) => (a.posizione_coppa || 0) - (b.posizione_coppa || 0))
      .slice(0, 4)
  }));

  const hasData = gironiData.some(g => g.squadre.length > 0);

  if (!hasData) {
    return (
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
        <div className="flex items-center space-x-3">
          <Trophy className="text-blue-600" size={24} />
          <div>
            <h3 className="text-lg font-semibold text-blue-800">
              Gironi da definire
            </h3>
            <p className="text-blue-700 mt-2">
              I gironi della Coppa Italia verranno pubblicati presto.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {gironiData.map(({ girone, squadre }) => (
        <div key={girone} className="bg-white rounded-xl shadow-lg overflow-hidden border-2 border-slate-200">
          <div className="bg-gradient-to-r from-teal-600 to-teal-700 px-6 py-4">
            <h3 className="text-xl font-bold text-white flex items-center">
              <Trophy className="mr-2" size={24} />
              Girone {girone}
            </h3>
          </div>

          {squadre.length === 0 ? (
            <div className="p-6 text-center text-slate-500">
              <p>Girone da definire</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-3 py-2 text-left text-xs font-medium text-slate-500 uppercase">Pos</th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-slate-500 uppercase">Squadra</th>
                    <th className="px-3 py-2 text-center text-xs font-medium text-slate-500 uppercase">Pt</th>
                    <th className="px-3 py-2 text-center text-xs font-medium text-slate-500 uppercase">G</th>
                    <th className="px-3 py-2 text-center text-xs font-medium text-slate-500 uppercase">V</th>
                    <th className="px-3 py-2 text-center text-xs font-medium text-slate-500 uppercase">P</th>
                    <th className="px-3 py-2 text-center text-xs font-medium text-slate-500 uppercase">S</th>
                    <th className="px-3 py-2 text-center text-xs font-medium text-slate-500 uppercase">GF</th>
                    <th className="px-3 py-2 text-center text-xs font-medium text-slate-500 uppercase">GS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {squadre.map((team, index) => {
                    const posizione = team.posizione_coppa || index + 1;
                    const isQualified = posizione <= 2;
                    const isEliminated = posizione > 2;

                    return (
                      <tr
                        key={team.squadra}
                        className={`hover:bg-slate-50 ${
                          isQualified
                            ? 'bg-green-50 border-l-4 border-green-500'
                            : isEliminated
                            ? 'bg-slate-50 border-l-4 border-slate-300'
                            : ''
                        }`}
                      >
                        <td className="px-3 py-3 whitespace-nowrap">
                          <span className={`inline-flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold ${
                            isQualified
                              ? 'bg-green-500 text-white'
                              : 'bg-slate-200 text-slate-700'
                          }`}>
                            {posizione}
                          </span>
                        </td>
                        <td className="px-3 py-3 whitespace-nowrap">
                          <div className="text-sm font-medium text-slate-900">{formatText(team.squadra)}</div>
                        </td>
                        <td className="px-3 py-3 whitespace-nowrap text-center">
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-teal-100 text-teal-800">
                            {formatValue(team.punti_coppa)}
                          </span>
                        </td>
                        <td className="px-3 py-3 whitespace-nowrap text-center text-sm text-slate-900">{formatValue(team.giocate_coppa)}</td>
                        <td className="px-3 py-3 whitespace-nowrap text-center text-sm text-green-600 font-medium">{formatValue(team.vittorie_coppa)}</td>
                        <td className="px-3 py-3 whitespace-nowrap text-center text-sm text-yellow-600 font-medium">{formatValue(team.pareggi_coppa)}</td>
                        <td className="px-3 py-3 whitespace-nowrap text-center text-sm text-red-600 font-medium">{formatValue(team.sconfitte_coppa)}</td>
                        <td className="px-3 py-3 whitespace-nowrap text-center text-sm text-slate-900">{formatValue(team.reti_fatte_coppa)}</td>
                        <td className="px-3 py-3 whitespace-nowrap text-center text-sm text-slate-900">{formatValue(team.reti_subite_coppa)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default CoppaGironi;
