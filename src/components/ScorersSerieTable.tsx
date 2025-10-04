import React from 'react';
import { Loader, AlertCircle, Target } from 'lucide-react';
import { CapocannonierRow, formatValue, formatText, formatDate } from '../lib/supabase';

interface ScorersSerieTableProps {
  data: CapocannonierRow[];
  loading: boolean;
  error: string | null;
  serie: 'A' | 'B';
}

const ScorersSerieTable: React.FC<ScorersSerieTableProps> = ({ data, loading, error, serie }) => {
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

  const serieData = data.filter(player => player.serie === serie || !player.serie);

  if (serieData.length === 0) {
    return (
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
        <div className="flex items-center space-x-3">
          <Target className="text-blue-600" size={24} />
          <div>
            <h3 className="text-lg font-semibold text-blue-800">
              Capocannonieri non disponibili
            </h3>
            <p className="text-blue-700 mt-2">
              I capocannonieri della Serie {serie} verranno pubblicati dopo le prime giornate.
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
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Giocatore</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Squadra</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-slate-500 uppercase tracking-wider">Gol</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-slate-500 uppercase tracking-wider">Assist</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-slate-500 uppercase tracking-wider">Amm</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-slate-500 uppercase tracking-wider">Esp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {serieData.map((player, index) => {
                const relativePos = index + 1;

                return (
                  <tr
                    key={`${player.giocatore}-${player.squadra}`}
                    className={`hover:bg-slate-50 transition-colors ${
                      relativePos <= 3 ? 'bg-orange-50 border-l-4 border-orange-500' : ''
                    }`}
                  >
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span className={getPositionBadge(relativePos)}>
                        {relativePos}
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
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="md:hidden divide-y divide-slate-200">
          {serieData.map((player, index) => {
            const relativePos = index + 1;

            return (
              <div
                key={`${player.giocatore}-${player.squadra}`}
                className={`p-4 ${relativePos <= 3 ? 'bg-orange-50 border-l-4 border-orange-500' : ''}`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <span className={getPositionBadge(relativePos)}>
                      {relativePos}
                    </span>
                    <div>
                      <div className="font-medium text-slate-900">{formatText(player.giocatore)}</div>
                      <div className="text-sm text-slate-600">{formatText(player.squadra)}</div>
                    </div>
                  </div>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-bold bg-orange-100 text-orange-800">
                    {formatValue(player.gol)} ⚽
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-3 text-center text-sm">
                  <div>
                    <div className="text-xs text-slate-500 mb-1">Assist</div>
                    <div className="font-medium text-blue-600">{formatValue(player.assist)}</div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 mb-1">Amm</div>
                    <div className="font-medium text-yellow-600">{formatValue(player.ammonizioni)}</div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 mb-1">Esp</div>
                    <div className="font-medium text-red-600">{formatValue(player.espulsioni)}</div>
                  </div>
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

export default ScorersSerieTable;
