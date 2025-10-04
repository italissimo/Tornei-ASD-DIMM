import React from 'react';
import { Settings, Users, Trophy, Camera, BookOpen, BarChart3 } from 'lucide-react';

const AdminPage: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="flex items-center space-x-3">
        <Settings className="text-teal-600" size={32} />
        <h1 className="text-4xl font-bold text-slate-800">Pannello Admin</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
          <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
            <Users className="text-blue-600" size={24} />
          </div>
          <h3 className="text-lg font-semibold text-slate-800 mb-2">Gestione Squadre</h3>
          <p className="text-slate-600 text-sm mb-4">
            Aggiungi, modifica o rimuovi squadre dai tornei
          </p>
          <button className="text-blue-600 font-medium text-sm hover:text-blue-700">
            Gestisci squadre →
          </button>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
          <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
            <Trophy className="text-green-600" size={24} />
          </div>
          <h3 className="text-lg font-semibold text-slate-800 mb-2">Risultati</h3>
          <p className="text-slate-600 text-sm mb-4">
            Inserisci i risultati delle partite e aggiorna le classifiche
          </p>
          <button className="text-green-600 font-medium text-sm hover:text-green-700">
            Inserisci risultati →
          </button>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
          <div className="bg-orange-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
            <Camera className="text-orange-600" size={24} />
          </div>
          <h3 className="text-lg font-semibold text-slate-800 mb-2">Highlights</h3>
          <p className="text-slate-600 text-sm mb-4">
            Carica foto e video delle partite
          </p>
          <button className="text-orange-600 font-medium text-sm hover:text-orange-700">
            Gestisci highlights →
          </button>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
          <div className="bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
            <BookOpen className="text-purple-600" size={24} />
          </div>
          <h3 className="text-lg font-semibold text-slate-800 mb-2">Regolamento</h3>
          <p className="text-slate-600 text-sm mb-4">
            Modifica e aggiorna il regolamento dei tornei
          </p>
          <button className="text-purple-600 font-medium text-sm hover:text-purple-700">
            Modifica regolamento →
          </button>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
          <div className="bg-teal-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
            <BarChart3 className="text-teal-600" size={24} />
          </div>
          <h3 className="text-lg font-semibold text-slate-800 mb-2">Statistiche</h3>
          <p className="text-slate-600 text-sm mb-4">
            Visualizza statistiche dettagliate sui tornei
          </p>
          <button className="text-teal-600 font-medium text-sm hover:text-teal-700">
            Visualizza statistiche →
          </button>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
          <div className="bg-red-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
            <Settings className="text-red-600" size={24} />
          </div>
          <h3 className="text-lg font-semibold text-slate-800 mb-2">Impostazioni</h3>
          <p className="text-slate-600 text-sm mb-4">
            Configura le impostazioni generali dell'app
          </p>
          <button className="text-red-600 font-medium text-sm hover:text-red-700">
            Apri impostazioni →
          </button>
        </div>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-yellow-800 mb-2">
          👤 Area Amministratore
        </h3>
        <p className="text-yellow-700 mb-4">
          Questa sezione è riservata agli amministratori del torneo. 
          Da qui puoi gestire tutti gli aspetti dell'applicazione.
        </p>
        <div className="text-sm text-yellow-600">
          <p><strong>Suggerimento:</strong> Tutte le modifiche vengono salvate automaticamente e sono immediatamente visibili agli utenti.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-xl font-bold text-slate-800 mb-4">Attività Recenti</h3>
          <div className="space-y-4">
            <div className="border-l-4 border-green-500 pl-4">
              <h4 className="font-semibold text-slate-800">Risultato inserito</h4>
              <p className="text-sm text-slate-600">Real Madrid FC 3-1 Barcelona United</p>
              <span className="text-xs text-slate-500">2 ore fa</span>
            </div>
            <div className="border-l-4 border-blue-500 pl-4">
              <h4 className="font-semibold text-slate-800">Foto caricate</h4>
              <p className="text-sm text-slate-600">5 nuove foto della finale</p>
              <span className="text-xs text-slate-500">1 giorno fa</span>
            </div>
            <div className="border-l-4 border-orange-500 pl-4">
              <h4 className="font-semibold text-slate-800">Regolamento aggiornato</h4>
              <p className="text-sm text-slate-600">Modifiche alle regole del calcio a 5</p>
              <span className="text-xs text-slate-500">3 giorni fa</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-xl font-bold text-slate-800 mb-4">Prossimi Impegni</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
              <div>
                <p className="font-medium text-slate-800">Inserire risultati giornata 9</p>
                <p className="text-sm text-slate-600">Calcio a 5</p>
              </div>
              <span className="text-sm font-medium text-red-600">Scadenza: Oggi</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
              <div>
                <p className="font-medium text-slate-800">Pubblicare foto semifinale</p>
                <p className="text-sm text-slate-600">Calcio a 7</p>
              </div>
              <span className="text-sm font-medium text-orange-600">Scadenza: Domani</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;