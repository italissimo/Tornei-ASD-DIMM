import React from 'react';
import { Loader, AlertCircle, Trophy } from 'lucide-react';
import { StandingsRow, formatValue, formatText, formatDate } from '../lib/supabase';

interface StandingsSerieTableProps {
  data: StandingsRow[];
  loading: boolean;
  error: string | null;
  serie: 'A' | 'B';
}

const StandingsSerieTable: React.FC<StandingsSerieTableProps> = ({ data, loading, error, serie }) => {
  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader className="animate-spin text-teal-600" size={32} />
        <span className="ml-3 text-slate-600">Caricamento dati...</span>
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
              Errore nel caricamento dei dati
            </h3>
            <p className="text-red-700 mt-2">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  const serieData = data.filter(team => team.serie === serie);

  if (serieData.length === 0) {
    return (
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
        <div className="flex items-center space-x-3">
          <Trophy className="text-blue-600" size={24} />
          <div>
            <h3 className="text-lg font-semibold text-blue-800">
              Classifica non disponibile
            </h3>
            <p className="text-blue-700 mt-2">
              La classifica della Serie {serie} verrà pubblicata presto.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const lastUpdate = serieData.length > 0 ? serieData[0].last_update : null;

  const getPositionBadge = (position: number) => {
    const baseClasses = "inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold";

    if (position === 1) return `${baseClasses} bg-yellow-400 text-yellow-900`;
    if (position === 2) return `${baseClasses} bg-slate-300 text-slate-700`;
    if (position === 3) return `${baseClasses} bg-orange-400 text-orange-900`;
    return `${baseClasses} bg-slate-100 text-slate-600`;
  };

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Pos</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Squadra</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-slate-500 uppercase tracking-wider">Pt</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-slate-500 uppercase tracking-wider">G</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-slate-500 uppercase tracking-wider">V</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-slate-500 uppercase tracking-wider">N</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-slate-500 uppercase tracking-wider">P</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-slate-500 uppercase tracking-wider">GF</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-slate-500 uppercase tracking-wider">GS</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-slate-500 uppercase tracking-wider">DR</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {serieData.map((team, index) => {
                const diffReti = (team.reti_fatte || 0) - (team.reti_subite || 0);
                const relativePos = index + 1;

                return (
                  <tr
                    key={team.squadra}
                    className={`hover:bg-slate-50 transition-colors ${
                      relativePos <= 3 ? 'bg-green-50 border-l-4 border-green-500' : ''
                    }`}
                  >
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span className={getPositionBadge(relativePos)}>
                        {relativePos}
                      </span>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="font-medium text-slate-900">{formatText(team.squadra)}</div>
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
                    <td className="px-4 py-4 whitespace-nowrap text-center">
                      <span className={`text-sm font-medium ${
                        diffReti > 0 ? 'text-green-600' : diffReti < 0 ? 'text-red-600' : 'text-slate-600'
                      }`}>
                        {diffReti > 0 ? '+' : ''}{diffReti}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="md:hidden divide-y divide-slate-200">
          {serieData.map((team, index) => {
            const diffReti = (team.reti_fatte || 0) - (team.reti_subite || 0);
            const relativePos = index + 1;

            return (
              <div
                key={team.squadra}
                className={`p-4 ${relativePos <= 3 ? 'bg-green-50 border-l-4 border-green-500' : ''}`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <span className={getPositionBadge(relativePos)}>
                      {relativePos}
                    </span>
                    <div className="font-medium text-slate-900">{formatText(team.squadra)}</div>
                  </div>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-bold bg-teal-100 text-teal-800">
                    {formatValue(team.punti)} Pt
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-3 text-center text-sm">
                  <div>
                    <div className="text-xs text-slate-500 mb-1">G</div>
                    <div className="font-medium text-slate-900">{formatValue(team.giocate)}</div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 mb-1">V-N-P</div>
                    <div className="font-medium text-slate-900">
                      {formatValue(team.vittorie)}-{formatValue(team.pareggi)}-{formatValue(team.sconfitte)}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 mb-1">GF-GS</div>
                    <div className="font-medium text-slate-900">
                      {formatValue(team.reti_fatte)}-{formatValue(team.reti_subite)}
                    </div>
                  </div>
                </div>
                <div className="mt-2 text-center">
                  <span className={`text-sm font-medium ${
                    diffReti > 0 ? 'text-green-600' : diffReti < 0 ? 'text-red-600' : 'text-slate-600'
                  }`}>
                    DR: {diffReti > 0 ? '+' : ''}{diffReti}
                  </span>
                </div>
              </div>
            );
          })}
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

export default StandingsSerieTable;
