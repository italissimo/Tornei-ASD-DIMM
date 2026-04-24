import React, { useMemo } from 'react';
import { StandingsRow } from '../lib/supabase';

interface PlayoffGironiProps {
  data: StandingsRow[];
  loading: boolean;
  error: string | null;
}

const PlayoffGironi: React.FC<PlayoffGironiProps> = ({ data, loading, error }) => {
  const gironiData = useMemo(() => {
    if (!data) return {};

    const filtered = data.filter((team) => team.girone_playoff != null && team.girone_playoff !== '');
    
    // Group by serie and then by girone_playoff
    const grouped = filtered.reduce((acc, team) => {
      const serie = team.serie || 'A';
      const girone = team.girone_playoff!;
      
      if (!acc[serie]) {
        acc[serie] = {};
      }
      if (!acc[serie][girone]) {
        acc[serie][girone] = [];
      }
      
      acc[serie][girone].push(team);
      return acc;
    }, {} as Record<string, Record<string, StandingsRow[]>>);

    // Sort teams within each girone
    Object.keys(grouped).forEach(serie => {
      Object.keys(grouped[serie]).forEach(girone => {
        grouped[serie][girone].sort((a, b) => {
          if (a.posizione_playoff !== null && b.posizione_playoff !== null && a.posizione_playoff !== b.posizione_playoff) {
             return a.posizione_playoff - b.posizione_playoff;
          }
          if ((b.punti_playoff || 0) !== (a.punti_playoff || 0)) {
            return (b.punti_playoff || 0) - (a.punti_playoff || 0);
          }
          const diffA = (a.reti_fatte_playoff || 0) - (a.reti_subite_playoff || 0);
          const diffB = (b.reti_fatte_playoff || 0) - (b.reti_subite_playoff || 0);
          if (diffA !== diffB) {
            return diffB - diffA;
          }
          return (b.reti_fatte_playoff || 0) - (a.reti_fatte_playoff || 0);
        });
      });
    });

    return grouped;
  }, [data]);

  if (loading) {
    return (
      <div className="flex justify-center p-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 text-red-600 p-4 rounded-lg flex justify-between items-center">
        <span>{error}</span>
      </div>
    );
  }

  const series = Object.keys(gironiData).sort();

  if (series.length === 0) {
    return (
        <div className="bg-white p-8 rounded-xl shadow-lg border border-slate-100 text-center">
        <p className="text-slate-500">Nessuna squadra ha ancora disputato i gironi di Playoff o i dati non sono visibili.</p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {series.map(serie => (
        <div key={serie} className="space-y-6">
          <h2 className="text-2xl font-bold text-slate-800 border-b-2 border-yellow-500 pb-2 inline-block">
            Serie {serie}
          </h2>
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {Object.entries(gironiData[serie])
              .sort(([a], [b]) => a.localeCompare(b))
              .map(([girone, teams]) => {
              
              // Calcolo di quante passano:
              // Se è Girone A o B (o comunque sono in 2 gironi), passano 2
              // Se è un Girone Unico (es. 6 squadre), passano 4
              const topToQualify = serie === 'B' || teams.length >= 6 ? 4 : 2;

              return (
              <div key={girone} className="bg-white rounded-xl shadow-lg overflow-hidden border border-slate-100">
                <div className="bg-gradient-to-r from-slate-800 to-slate-900 px-6 py-4">
                  <h2 className="text-xl font-bold text-white">Girone {girone}</h2>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-slate-50">
                      <tr>
                        <th className="px-4 py-3 text-center text-xs font-semibold text-slate-500 uppercase tracking-wider w-12">Pos</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Squadra</th>
                        <th className="px-4 py-3 text-center text-xs font-bold text-slate-800 uppercase tracking-wider w-12 bg-yellow-50">Pt</th>
                        <th className="px-4 py-3 text-center text-xs font-semibold text-slate-500 uppercase tracking-wider w-12">G</th>
                        <th className="px-4 py-3 text-center text-xs font-semibold text-slate-500 uppercase tracking-wider w-12">V</th>
                        <th className="px-4 py-3 text-center text-xs font-semibold text-slate-500 uppercase tracking-wider w-12">N</th>
                        <th className="px-4 py-3 text-center text-xs font-semibold text-slate-500 uppercase tracking-wider w-12">P</th>
                        <th className="px-4 py-3 text-center text-xs font-semibold text-slate-500 uppercase tracking-wider w-12">GF</th>
                        <th className="px-4 py-3 text-center text-xs font-semibold text-slate-500 uppercase tracking-wider w-12">GS</th>
                        <th className="px-4 py-3 text-center text-xs font-semibold text-slate-500 uppercase tracking-wider w-12">DR</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {teams.map((team, index) => {
                        const isQualified = index < topToQualify;
                        const dr = (team.reti_fatte_playoff || 0) - (team.reti_subite_playoff || 0);
                        
                        return (
                          <tr 
                            key={team.squadra}
                            className={`transition-colors font-semibold ${
                              isQualified 
                                ? 'bg-green-50/50 hover:bg-green-50 border-l-4 border-l-green-500' 
                                : 'bg-slate-50/50 hover:bg-slate-100 border-l-4 border-l-transparent text-slate-500'
                            }`}
                          >
                            <td className="px-4 py-3 text-center whitespace-nowrap">
                              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold mx-auto border-2 ${
                                isQualified
                                  ? 'bg-green-100 text-green-700 border-green-200' 
                                  : 'bg-slate-100 text-slate-500 border-slate-200'
                              }`}>
                                {index + 1}
                              </div>
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap">
                              <div className="flex flex-col">
                                <span className={`text-sm ${isQualified ? 'text-slate-900 font-bold' : 'text-slate-600'}`}>
                                  {team.squadra}
                                </span>
                              </div>
                            </td>
                            <td className="px-4 py-3 text-center whitespace-nowrap font-bold text-slate-800 bg-yellow-50/50">
                              {team.punti_playoff || 0}
                            </td>
                            <td className="px-4 py-3 text-center whitespace-nowrap text-sm">{team.giocate_playoff || 0}</td>
                            <td className="px-4 py-3 text-center whitespace-nowrap text-sm text-green-600">{team.vittorie_playoff || 0}</td>
                            <td className="px-4 py-3 text-center whitespace-nowrap text-sm text-slate-500">{team.pareggi_playoff || 0}</td>
                            <td className="px-4 py-3 text-center whitespace-nowrap text-sm text-red-600">{team.sconfitte_playoff || 0}</td>
                            <td className="px-4 py-3 text-center whitespace-nowrap text-sm">{team.reti_fatte_playoff || 0}</td>
                            <td className="px-4 py-3 text-center whitespace-nowrap text-sm">{team.reti_subite_playoff || 0}</td>
                            <td className={`px-4 py-3 text-center whitespace-nowrap text-sm font-medium ${
                              dr > 0 ? 'text-green-600' : dr < 0 ? 'text-red-500' : 'text-slate-500'
                            }`}>
                              {dr > 0 ? '+' : ''}{dr}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )})}
          </div>
        </div>
      ))}
    </div>
  );
};

export default PlayoffGironi;