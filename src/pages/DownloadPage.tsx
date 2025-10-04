import React from 'react';
import { Smartphone, Monitor, Download, Plus, Share } from 'lucide-react';

const DownloadPage: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-slate-800 mb-4">
          Installa l'App
        </h1>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto">
          Scarica la nostra PWA per avere sempre a portata di mano classifiche e risultati, anche offline!
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* iPhone Safari */}
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <div className="bg-slate-100 w-16 h-16 rounded-xl flex items-center justify-center mb-4 mx-auto">
            <Smartphone className="text-slate-600" size={32} />
          </div>
          <h3 className="text-xl font-bold text-slate-800 mb-4 text-center">
            iPhone (Safari)
          </h3>
          <div className="space-y-3 text-sm text-slate-600">
            <div className="flex items-start space-x-3">
              <span className="bg-teal-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">1</span>
              <p>Apri il sito in Safari</p>
            </div>
            <div className="flex items-start space-x-3">
              <span className="bg-teal-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">2</span>
              <div className="flex items-center">
                <p>Tocca il pulsante</p>
                <Share size={16} className="mx-1" />
                <p>condividi</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <span className="bg-teal-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">3</span>
              <div className="flex items-center">
                <p>Seleziona</p>
                <Plus size={16} className="mx-1" />
                <p>"Aggiungi a Home"</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <span className="bg-teal-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">4</span>
              <p>Conferma con "Aggiungi"</p>
            </div>
          </div>
        </div>

        {/* Android Chrome */}
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <div className="bg-slate-100 w-16 h-16 rounded-xl flex items-center justify-center mb-4 mx-auto">
            <Smartphone className="text-slate-600" size={32} />
          </div>
          <h3 className="text-xl font-bold text-slate-800 mb-4 text-center">
            Android (Chrome)
          </h3>
          <div className="space-y-3 text-sm text-slate-600">
            <div className="flex items-start space-x-3">
              <span className="bg-orange-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">1</span>
              <p>Apri il sito in Chrome</p>
            </div>
            <div className="flex items-start space-x-3">
              <span className="bg-orange-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">2</span>
              <p>Tocca il menu ⋮ (tre punti)</p>
            </div>
            <div className="flex items-start space-x-3">
              <span className="bg-orange-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">3</span>
              <div className="flex items-center">
                <p>Seleziona</p>
                <Download size={16} className="mx-1" />
                <p>"Installa app"</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <span className="bg-orange-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">4</span>
              <p>Conferma l'installazione</p>
            </div>
          </div>
        </div>

        {/* Desktop */}
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <div className="bg-slate-100 w-16 h-16 rounded-xl flex items-center justify-center mb-4 mx-auto">
            <Monitor className="text-slate-600" size={32} />
          </div>
          <h3 className="text-xl font-bold text-slate-800 mb-4 text-center">
            Desktop (Chrome/Edge)
          </h3>
          <div className="space-y-3 text-sm text-slate-600">
            <div className="flex items-start space-x-3">
              <span className="bg-blue-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">1</span>
              <p>Apri il sito nel browser</p>
            </div>
            <div className="flex items-start space-x-3">
              <span className="bg-blue-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">2</span>
              <p>Cerca l'icona "Installa" nella barra degli indirizzi</p>
            </div>
            <div className="flex items-start space-x-3">
              <span className="bg-blue-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">3</span>
              <p>Clicca su "Installa app"</p>
            </div>
            <div className="flex items-start space-x-3">
              <span className="bg-blue-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">4</span>
              <p>L'app apparirà nel menu Start/Applicazioni</p>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="bg-gradient-to-r from-teal-500 to-blue-600 rounded-xl p-8 text-white">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Vantaggi dell'installazione
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="bg-white bg-opacity-20 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
              <Download size={24} />
            </div>
            <h3 className="font-semibold mb-2">Accesso offline</h3>
            <p className="text-sm text-teal-100">
              Consulta le informazioni anche senza connessione
            </p>
          </div>
          <div className="text-center">
            <div className="bg-white bg-opacity-20 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
              <Smartphone size={24} />
            </div>
            <h3 className="font-semibold mb-2">Esperienza nativa</h3>
            <p className="text-sm text-teal-100">
              Si comporta come una vera app mobile
            </p>
          </div>
          <div className="text-center">
            <div className="bg-white bg-opacity-20 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
              <Monitor size={24} />
            </div>
            <h3 className="font-semibold mb-2">Multi-dispositivo</h3>
            <p className="text-sm text-teal-100">
              Funziona su smartphone, tablet e desktop
            </p>
          </div>
        </div>
      </div>

      {/* Troubleshooting */}
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <h3 className="text-xl font-bold text-slate-800 mb-4">
          Problemi con l'installazione?
        </h3>
        <div className="space-y-4">
          <div className="border-l-4 border-yellow-500 pl-4">
            <h4 className="font-semibold text-slate-800">Non vedi l'opzione "Installa app"?</h4>
            <p className="text-sm text-slate-600">
              Assicurati di utilizzare una versione aggiornata del browser. Su iPhone devi utilizzare Safari.
            </p>
          </div>
          <div className="border-l-4 border-blue-500 pl-4">
            <h4 className="font-semibold text-slate-800">L'app non si aggiorna?</h4>
            <p className="text-sm text-slate-600">
              Chiudi e riapri l'app oppure ricarica la pagina se la stai utilizzando nel browser.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DownloadPage;