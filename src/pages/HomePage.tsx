import React from 'react';
import { Trophy, Users, Calendar, Award } from 'lucide-react';

interface HomePageProps {
  onNavigate?: (section: string) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-8">

      {/* ══════════════ LOCANDINA CAMPIONATO INVERNALE ══════════════ */}
      <div className="flex justify-center">
        <div className="w-full max-w-sm">
          <img
            src="/locandina-invernale.jpg"
            alt="Campionato Invernale Calcio A5 e A7 - ASD DIMM - Start 5 Ottobre 2026 - Tiki Taka Lesmo"
            className="w-full rounded-3xl select-none"
            style={{ boxShadow: '0 8px 48px rgba(34,197,94,0.35), 0 4px 24px rgba(0,0,0,0.55)' }}
            draggable={false}
          />
        </div>
      </div>
      {/* ═══════════════════════════════════════════════════════════ */}

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
    </div>
  );
};

export default HomePage;