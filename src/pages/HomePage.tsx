import React from 'react';
import { Trophy, Users, Calendar, Award } from 'lucide-react';

const HomePage: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-yellow-900 rounded-3xl p-8 md:p-12 text-white shadow-2xl">
        <div className="absolute inset-0 overflow-hidden opacity-10">
          <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-yellow-500 rounded-full blur-3xl"></div>
        </div>
        <div className="relative z-10 text-center">
          <div className="inline-block mb-6">
            <img
              src="/logo.jpg"
              alt="ASD DIMM Logo"
              className="w-24 h-24 mx-auto rounded-full object-cover shadow-lg border-4 border-yellow-400"
            />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
            Benvenuto ai Tornei ASD DIMM
          </h1>
          <p className="text-xl text-slate-200 max-w-2xl mx-auto leading-relaxed">
            La tua app per seguire classifiche, risultati e highlights dei tornei di calcio a 5 e a 7
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-slate-100">
          <div className="bg-gradient-to-br from-yellow-400 to-yellow-500 w-14 h-14 rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-yellow-500/30">
            <Trophy className="text-white" size={28} />
          </div>
          <h3 className="text-xl font-bold text-slate-800 mb-2">Classifiche</h3>
          <p className="text-slate-600 text-sm leading-relaxed">
            Consulta le classifiche aggiornate di calcio a 5 e calcio a 7
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-slate-100">
          <div className="bg-gradient-to-br from-slate-700 to-slate-800 w-14 h-14 rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-slate-500/30">
            <Users className="text-white" size={28} />
          </div>
          <h3 className="text-xl font-bold text-slate-800 mb-2">Squadre</h3>
          <p className="text-slate-600 text-sm leading-relaxed">
            Segui le performance delle tue squadre preferite
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-slate-100">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 w-14 h-14 rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-blue-500/30">
            <Calendar className="text-white" size={28} />
          </div>
          <h3 className="text-xl font-bold text-slate-800 mb-2">Calendario</h3>
          <p className="text-slate-600 text-sm leading-relaxed">
            Non perdere nessuna partita del torneo
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-slate-100">
          <div className="bg-gradient-to-br from-green-500 to-green-600 w-14 h-14 rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-green-500/30">
            <Award className="text-white" size={28} />
          </div>
          <h3 className="text-xl font-bold text-slate-800 mb-2">Highlights</h3>
          <p className="text-slate-600 text-sm leading-relaxed">
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
            <button className="bg-white text-slate-800 px-8 py-4 rounded-xl font-bold hover:bg-yellow-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
              Scopri come installare
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100">
          <h3 className="text-2xl font-bold text-slate-800 mb-6 flex items-center">
            <span className="text-yellow-500 mr-2">📰</span>
            Ultime Novità
          </h3>
          <div className="space-y-4">
            <div className="border-l-4 border-yellow-500 pl-4 py-2 hover:bg-yellow-50 transition-colors rounded-r-lg">
              <h4 className="font-bold text-slate-800">Nuove foto disponibili</h4>
              <p className="text-sm text-slate-600 mt-1">Gli highlights della finale di calcio a 5</p>
              <span className="text-xs text-slate-500 mt-2 block">2 giorni fa</span>
            </div>
            <div className="border-l-4 border-slate-700 pl-4 py-2 hover:bg-slate-50 transition-colors rounded-r-lg">
              <h4 className="font-bold text-slate-800">Classifiche aggiornate</h4>
              <p className="text-sm text-slate-600 mt-1">Risultati dell'ultima giornata inseriti</p>
              <span className="text-xs text-slate-500 mt-2 block">5 giorni fa</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100">
          <h3 className="text-2xl font-bold text-slate-800 mb-6 flex items-center">
            <span className="text-yellow-500 mr-2">⚽</span>
            Prossime Partite
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-4 bg-gradient-to-r from-yellow-50 to-white rounded-xl hover:shadow-md transition-shadow border border-yellow-100">
              <div>
                <p className="font-bold text-slate-800">Real Madrid FC vs Barcelona United</p>
                <p className="text-sm text-slate-600 mt-1">Calcio a 5</p>
              </div>
              <span className="text-sm font-bold text-yellow-600 bg-yellow-100 px-3 py-1 rounded-lg">Dom 15:00</span>
            </div>
            <div className="flex justify-between items-center p-4 bg-gradient-to-r from-slate-50 to-white rounded-xl hover:shadow-md transition-shadow border border-slate-100">
              <div>
                <p className="font-bold text-slate-800">Manchester City vs Liverpool FC</p>
                <p className="text-sm text-slate-600 mt-1">Calcio a 7</p>
              </div>
              <span className="text-sm font-bold text-slate-700 bg-slate-100 px-3 py-1 rounded-lg">Dom 17:00</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;