import React, { useState } from 'react';
import { User, Lock, Loader } from 'lucide-react';

interface LoginFormProps {
  onLogin: (username: string) => Promise<boolean>;
  isLoading: boolean;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin, isLoading }) => {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (username.trim().length < 3) {
      setError('L\'username deve avere almeno 3 caratteri');
      return;
    }

    const success = await onLogin(username);
    if (!success) {
      setError('Credenziali non valide');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-yellow-900 flex items-center justify-center px-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-yellow-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-yellow-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md relative z-10 transform transition-all duration-500 hover:shadow-yellow-500/20 hover:shadow-3xl">
        <div className="text-center mb-8">
          {/* Logo */}
          <div className="mb-6 relative">
            <div className="absolute inset-0 bg-yellow-400/20 blur-2xl rounded-full"></div>
            <img
              src="/logo.jpg"
              alt="ASD DIMM Logo"
              className="w-32 h-32 mx-auto rounded-full object-cover shadow-lg border-4 border-yellow-400 relative z-10 transform transition-transform duration-300 hover:scale-105"
            />
          </div>
          <h1 className="text-3xl font-bold text-slate-800 mb-2 tracking-tight">
            ASD DIMM
          </h1>
          <p className="text-slate-600 text-lg">
            Accedi per visualizzare le classifiche e gli highlights
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Username
            </label>
            <div className="relative">
              <User className="absolute left-3 top-3 text-slate-400" size={20} />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors"
                placeholder="Inserisci il tuo username"
                disabled={isLoading}
              />
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading || !username.trim()}
            className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-white py-3 rounded-lg font-semibold hover:from-yellow-600 hover:to-yellow-700 focus:ring-4 focus:ring-yellow-500/50 focus:ring-offset-2 transition-all duration-300 disabled:bg-slate-300 disabled:cursor-not-allowed flex items-center justify-center shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            {isLoading ? (
              <>
                <Loader className="animate-spin mr-2" size={20} />
                Accesso in corso...
              </>
            ) : (
              'Accedi'
            )}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-slate-600">
          <p>Account demo: <strong className="text-yellow-600">admin</strong> (per funzionalità admin)</p>
          <p>o qualsiasi username con 3+ caratteri</p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;