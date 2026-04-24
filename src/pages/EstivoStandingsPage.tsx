import React, { useState, useEffect } from 'react';
import { Sun, Trophy } from 'lucide-react';
import { supabase } from '../lib/supabase';
import StandingsSerieTable from '../components/StandingsSerieTable';

interface Props {
  isAdmin?: boolean;
}

const EstivoStandingsPage: React.FC<Props> = ({ isAdmin }) => {
  const [activeTab, setActiveTab] = useState<'calcio5' | 'calcio7'>('calcio5');
  const [standings, setStandings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStandings();
  }, [activeTab]);

  const fetchStandings = async () => {
    if (!supabase) return;
    setLoading(true);
    
    // Le nuove tabelle create da schema (aggiunto _estivo)
    const table = activeTab === 'calcio5' ? 'standings_estivo_calcio5' : 'standings_estivo_calcio7';

    try {
      const { data, error } = await supabase
        .from(table)
        .select('*')
        .order('punti', { ascending: false })
        .order('vittorie', { ascending: false })
        .order('reti_fatte', { ascending: false });

      if (error) throw error;
      setStandings(data || []);
    } catch (error) {
      console.error('Error fetching standings:', error);
      setStandings([]);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = () => {
    fetchStandings();
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <Sun className="text-orange-500 animate-spin-slow" size={32} />
          <h1 className="text-4xl font-bold text-orange-900">Classifiche Estive</h1>
        </div>
        
        <div className="flex bg-white rounded-lg p-1 shadow-sm border border-orange-100">
          <button
            onClick={() => setActiveTab('calcio5')}
            className={`px-6 py-2 rounded-md font-medium transition-all ${
              activeTab === 'calcio5'
                ? 'bg-orange-500 text-white shadow-md'
                : 'text-slate-600 hover:bg-orange-50'
            }`}
          >
            Calcio a 5
          </button>
          <button
            onClick={() => setActiveTab('calcio7')}
            className={`px-6 py-2 rounded-md font-medium transition-all ${
              activeTab === 'calcio7'
                ? 'bg-orange-500 text-white shadow-md'
                : 'text-slate-600 hover:bg-orange-50'
            }`}
          >
            Calcio a 7
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8">
        <div className="bg-white rounded-xl shadow-lg border border-orange-100 overflow-hidden">
          <div className="bg-gradient-to-r from-orange-400 to-red-500 px-6 py-4 flex items-center justify-between">
            <h2 className="text-xl font-bold text-white flex items-center">
              <Trophy size={20} className="mr-2" />
              Classifica {activeTab === 'calcio5' ? 'Calcio a 5' : 'Calcio a 7'}
            </h2>
          </div>
          
          <div className="p-1 min-h-[300px]">
            <StandingsSerieTable
              data={standings}
              serie="A"
              loading={loading}
              error={null}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EstivoStandingsPage;