import React from 'react';
import { Target, Sun } from 'lucide-react';

const EstivoTabellonePage: React.FC = () => {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-center space-x-3">
        <Sun className="text-orange-500" size={32} />
        <h1 className="text-4xl font-bold text-orange-900">Fase Ad Eliminazione (Estivo)</h1>
      </div>

      <div className="bg-gradient-to-br bg-white p-8 rounded-xl shadow-lg border border-orange-100 flex items-center justify-center min-h-[400px]">
        <div className="text-center space-y-4">
          <Target className="text-orange-400 w-24 h-24 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-orange-800">
            Tabellone Ottavi, Quarti, Semifinali e Finali
          </h2>
          <p className="text-orange-600/80 max-w-lg mx-auto">
            Questa sezione mostrerà automaticamente il tabellone completo per il torneo estivo appena le 16 squadre (le prime 4 di ognuno dei 4 gironi) saranno qualificate e gli accoppiamenti definiti!
          </p>
        </div>
      </div>
    </div>
  );
};

export default EstivoTabellonePage;