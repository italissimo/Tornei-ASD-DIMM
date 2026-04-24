import React from 'react';
import { Calendar, Sun } from 'lucide-react';

const EstivoCalendarioPage: React.FC = () => {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row items-center justify-between">
        <div className="flex items-center space-x-3">
          <Sun className="text-orange-500 animate-spin-slow" size={32} />
          <h1 className="text-4xl font-bold text-orange-900">Calendario Estivo</h1>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg border border-orange-200 overflow-hidden flex flex-col justify-center items-center min-h-[400px] text-center p-8 bg-gradient-to-br from-white to-orange-50">
        <Calendar className="w-24 h-24 text-orange-300 mx-auto mb-4" />
        <h2 className="text-3xl font-bold text-orange-800 mb-2">In Aggiornamento</h2>
        <p className="text-orange-600/80 max-w-lg mb-8 text-lg font-medium">
          Mancano le tabelle dedicate a questo torneo su Supabase!
        </p>
        <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-transform transform hover:-translate-y-1">
          Torna alle Classifiche Invece
        </button>
      </div>
    </div>
  );
};

export default EstivoCalendarioPage;