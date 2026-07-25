import React from 'react';
import { Trophy, Users, Calendar, Award } from 'lucide-react';

interface HomePageProps {
  onNavigate?: (section: string) => void;
}

const PlayerSVG: React.FC<{ flip?: boolean }> = ({ flip }) => (
  <svg
    viewBox="0 0 100 100"
    className="w-10 h-10 md:w-12 md:h-12"
    fill="white"
    style={{ transform: flip ? 'scaleX(-1)' : undefined }}
  >
    <circle cx="50" cy="13" r="10" />
    <path d="M50 23 Q44 38 40 52" stroke="white" strokeWidth="8" fill="none" strokeLinecap="round" />
    <path d="M46 30 L26 40" stroke="white" strokeWidth="6" fill="none" strokeLinecap="round" />
    <path d="M47 30 L67 36" stroke="white" strokeWidth="6" fill="none" strokeLinecap="round" />
    <path d="M40 52 L32 75 L26 86" stroke="white" strokeWidth="7" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M41 52 L60 58 L70 48" stroke="white" strokeWidth="7" fill="none" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-8">

      {/* ══════════════ LOCANDINA CAMPIONATO INVERNALE ══════════════ */}
      <div
        className="relative overflow-hidden rounded-3xl shadow-2xl select-none"
        style={{
          background:
            'radial-gradient(ellipse at 25% 0%, rgba(100,220,60,0.22) 0%, transparent 45%), ' +
            'radial-gradient(ellipse at 75% 0%, rgba(100,220,60,0.22) 0%, transparent 45%), ' +
            'linear-gradient(180deg, #0b1f0b 0%, #040e04 35%, #010601 65%, #000000 100%)',
        }}
      >
        {/* Stadium light rays */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse at 28% 2%, rgba(255,255,200,0.13) 0%, transparent 38%), ' +
              'radial-gradient(ellipse at 72% 2%, rgba(255,255,200,0.13) 0%, transparent 38%)',
          }}
        />

        {/* Brush strokes — top-left */}
        <div
          className="absolute -top-1 -left-3 w-52 h-14 bg-green-500"
          style={{ clipPath: 'polygon(0 0, 88% 0, 72% 100%, 0 82%)', opacity: 0.95 }}
        />
        <div
          className="absolute top-7 -left-3 w-40 h-10 bg-green-600"
          style={{ clipPath: 'polygon(0 0, 82% 0, 66% 100%, 0 92%)', opacity: 0.8 }}
        />

        {/* Brush strokes — top-right */}
        <div
          className="absolute -top-1 -right-3 w-52 h-14 bg-green-500"
          style={{ clipPath: 'polygon(12% 0, 100% 0, 100% 82%, 28% 100%)', opacity: 0.95 }}
        />
        <div
          className="absolute top-7 -right-3 w-40 h-10 bg-green-600"
          style={{ clipPath: 'polygon(18% 0, 100% 0, 100% 92%, 34% 100%)', opacity: 0.8 }}
        />

        {/* Corner snowflakes (top) */}
        <span className="absolute top-16 left-5 text-2xl text-white opacity-75 pointer-events-none">❄</span>
        <span className="absolute top-16 right-5 text-2xl text-white opacity-75 pointer-events-none">❄</span>

        {/* ── Main content ── */}
        <div className="relative z-10 flex flex-col items-center pt-10 pb-0 px-4 text-center">

          {/* CAMPIONATO */}
          <p className="text-white/75 text-xs md:text-sm font-bold tracking-[0.55em] uppercase mb-0.5">
            CAMPIONATO
          </p>

          {/* INVERNALE */}
          <h2
            className="font-black text-white leading-none"
            style={{
              fontSize: 'clamp(3rem, 13vw, 6rem)',
              fontStyle: 'italic',
              textShadow: '3px 3px 12px rgba(0,0,0,0.95)',
              WebkitTextStroke: '1px rgba(255,255,255,0.2)',
            }}
          >
            INVERNALE
          </h2>

          {/* CALCIO with side dashes */}
          <div className="flex items-center gap-2 md:gap-3 my-1">
            <div className="flex flex-col gap-0.5">
              <div className="w-7 h-1 bg-green-400 rounded-full" />
              <div className="w-4 h-1 bg-green-500 rounded-full" />
            </div>
            <h3
              className="font-black leading-none"
              style={{
                fontSize: 'clamp(2rem, 10vw, 4.5rem)',
                fontStyle: 'italic',
                letterSpacing: '0.08em',
                background: 'linear-gradient(180deg, #ffffff 0%, #86efac 45%, #16a34a 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                filter: 'drop-shadow(0 2px 8px rgba(34,197,94,0.55))',
              }}
            >
              CALCIO
            </h3>
            <div className="flex flex-col gap-0.5 items-end">
              <div className="w-4 h-1 bg-green-500 rounded-full" />
              <div className="w-7 h-1 bg-green-400 rounded-full" />
            </div>
          </div>

          {/* A5 E A7 */}
          <p
            className="text-white font-bold tracking-[0.55em] mt-0.5 mb-4"
            style={{ fontSize: 'clamp(0.9rem, 3.5vw, 1.4rem)' }}
          >
            A5 E A7
          </p>

          {/* Players + Ball + Logo row */}
          <div className="flex items-center justify-center gap-2 md:gap-5 mb-3 w-full max-w-sm mx-auto">
            {/* Left player */}
            <div
              className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-black/70 border-2 border-green-500 flex items-center justify-center flex-shrink-0"
              style={{ boxShadow: '0 0 14px rgba(34,197,94,0.45)' }}
            >
              <PlayerSVG />
            </div>

            {/* Soccer ball */}
            <div
              className="text-6xl md:text-8xl leading-none flex-shrink-0"
              style={{ filter: 'drop-shadow(0 4px 18px rgba(255,255,255,0.35)) drop-shadow(0 0 28px rgba(255,255,255,0.15))' }}
            >
              ⚽
            </div>

            {/* ASD DIMM logo */}
            <div
              className="w-16 h-16 md:w-20 md:h-20 rounded-full border-2 border-yellow-400 overflow-hidden flex-shrink-0 bg-black"
              style={{ boxShadow: '0 0 14px rgba(250,204,21,0.45)' }}
            >
              <img src="/logo.jpg" alt="ASD DIMM" className="w-full h-full object-cover" />
            </div>

            {/* Right player (mirrored) */}
            <div
              className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-black/70 border-2 border-green-500 flex items-center justify-center flex-shrink-0"
              style={{ boxShadow: '0 0 14px rgba(34,197,94,0.45)' }}
            >
              <PlayerSVG flip />
            </div>
          </div>

          {/* Bottom snowflakes */}
          <div className="flex justify-between w-full max-w-xs mb-1 px-2">
            <span className="text-white text-xl opacity-65">❄</span>
            <span className="text-white text-xl opacity-65">❄</span>
          </div>

          {/* START bar */}
          <div className="w-full bg-black/80 py-1.5 flex items-center justify-center gap-3">
            <div className="h-px flex-1 bg-green-700/60" />
            <p className="text-white text-xs font-black tracking-[0.85em] uppercase">START</p>
            <div className="h-px flex-1 bg-green-700/60" />
          </div>

          {/* Date */}
          <div className="py-3">
            <p
              className="font-black tracking-wider"
              style={{
                fontSize: 'clamp(1.3rem, 5.5vw, 2.4rem)',
                background: 'linear-gradient(135deg, #fde047 0%, #4ade80 60%, #22c55e 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                filter: 'drop-shadow(0 0 10px rgba(74,222,128,0.65))',
              }}
            >
              5 OTTOBRE 2026
            </p>
          </div>

          {/* Location ribbon */}
          <div
            className="w-full bg-green-500 py-2.5 px-4 flex items-center justify-center"
            style={{ clipPath: 'polygon(4% 0%, 96% 0%, 94% 100%, 6% 100%)' }}
          >
            <p className="text-black font-black text-sm md:text-base tracking-[0.35em] uppercase">
              TIKI TAKA – LESMO
            </p>
          </div>
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