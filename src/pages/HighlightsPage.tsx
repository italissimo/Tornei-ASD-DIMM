import React, { useState } from 'react';
import { Camera, Filter, Search, Grid2x2 as Grid, List, AlertCircle, Loader, Image as ImageIcon, X } from 'lucide-react';
import { useHighlights } from '../hooks/useHighlights';
import { FilterCategory, FilterType, HighlightWithUrl } from '../types/highlights';
import HighlightCard from '../components/HighlightCard';
import HighlightModal from '../components/HighlightModal';
import { supabase } from '../lib/supabase';

interface HighlightsPageProps {
  isAdmin: boolean;
}

const HighlightsPage: React.FC<HighlightsPageProps> = ({ isAdmin }) => {
  const [categoryFilter, setCategoryFilter] = useState<FilterCategory>('all');
  const [typeFilter, setTypeFilter] = useState<FilterType>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedHighlight, setSelectedHighlight] = useState<HighlightWithUrl | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { highlights, loading, error, incrementViews, toggleLike } = useHighlights(categoryFilter, typeFilter);

  // Filter highlights by search query
  const filteredHighlights = highlights.filter(highlight =>
    highlight.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (highlight.description && highlight.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Check if Supabase is configured
  if (!supabase) {
    return (
      <div className="space-y-8">
        <div className="flex items-center space-x-3">
          <Camera className="text-teal-600" size={32} />
          <h1 className="text-4xl font-bold text-slate-800">Highlights</h1>
        </div>
        
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
          <div className="flex items-center space-x-3">
            <AlertCircle className="text-yellow-600" size={24} />
            <div>
              <h3 className="text-lg font-semibold text-yellow-800">
                Configurazione Supabase Richiesta
              </h3>
              <p className="text-yellow-700 mt-2">
                Per visualizzare gli highlights dal database, è necessario configurare Supabase. 
                Clicca sul pulsante "Supabase" nelle impostazioni per connettere il database.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const handleHighlightClick = (highlight: HighlightWithUrl) => {
    setSelectedHighlight(highlight);
    setIsModalOpen(true);
    incrementViews(highlight.id);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedHighlight(null);
  };

  const handleNext = () => {
    if (!selectedHighlight) return;
    const currentIndex = filteredHighlights.findIndex(h => h.id === selectedHighlight.id);
    const nextIndex = (currentIndex + 1) % filteredHighlights.length;
    const nextHighlight = filteredHighlights[nextIndex];
    setSelectedHighlight(nextHighlight);
    incrementViews(nextHighlight.id);
  };

  const handlePrevious = () => {
    if (!selectedHighlight) return;
    const currentIndex = filteredHighlights.findIndex(h => h.id === selectedHighlight.id);
    const prevIndex = currentIndex === 0 ? filteredHighlights.length - 1 : currentIndex - 1;
    const prevHighlight = filteredHighlights[prevIndex];
    setSelectedHighlight(prevHighlight);
    incrementViews(prevHighlight.id);
  };

  const getFilterCount = (category: FilterCategory, type: FilterType) => {
    return highlights.filter(h => {
      const categoryMatch = category === 'all' || h.category === category;
      const typeMatch = type === 'all' || h.file_type === type;
      return categoryMatch && typeMatch;
    }).length;
  };

  const LoadingSkeleton = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: 8 }).map((_, index) => (
        <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="aspect-video bg-slate-200 animate-pulse" />
          <div className="p-4 space-y-3">
            <div className="h-4 bg-slate-200 rounded animate-pulse" />
            <div className="h-3 bg-slate-200 rounded animate-pulse w-3/4" />
            <div className="flex justify-between">
              <div className="h-3 bg-slate-200 rounded animate-pulse w-1/4" />
              <div className="h-3 bg-slate-200 rounded animate-pulse w-1/4" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const EmptyState = () => (
    <div className="text-center py-16">
      <div className="bg-slate-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
        <ImageIcon className="text-slate-400" size={48} />
      </div>
      <h3 className="text-2xl font-bold text-slate-600 mb-3">
        {searchQuery ? 'Nessun risultato trovato' : 'Nessun highlight disponibile'}
      </h3>
      <p className="text-slate-500 max-w-md mx-auto">
        {searchQuery 
          ? `Non abbiamo trovato highlights che corrispondono a "${searchQuery}". Prova con termini diversi.`
          : 'I momenti migliori del torneo appariranno qui quando saranno caricati.'
        }
      </p>
      {searchQuery && (
        <button
          onClick={() => setSearchQuery('')}
          className="mt-4 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
        >
          Cancella ricerca
        </button>
      )}
    </div>
  );

  const ErrorState = () => (
    <div className="bg-red-50 border border-red-200 rounded-xl p-6">
      <div className="flex items-center space-x-3">
        <AlertCircle className="text-red-600" size={24} />
        <div>
          <h3 className="text-lg font-semibold text-red-800">
            Errore nel caricamento degli highlights
          </h3>
          <p className="text-red-700 mt-2">{error}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="relative">
        <div className="bg-gradient-to-r from-teal-500 via-blue-600 to-purple-600 rounded-2xl p-8 text-white">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <Camera size={40} />
                <h1 className="text-4xl font-bold">Highlights</h1>
              </div>
              <p className="text-teal-100 text-lg">
                I momenti più emozionanti dei nostri tornei
              </p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold">{highlights.length}</div>
              <div className="text-teal-100">contenuti totali</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-2xl shadow-xl p-6 border border-slate-100">
        {/* Search Bar */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-slate-700 mb-3">
            Cerca Highlights
          </label>
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-xl opacity-0 group-focus-within:opacity-10 transition-opacity duration-300"></div>
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 group-focus-within:text-yellow-600 transition-colors duration-300" size={22} />
            <input
              type="text"
              placeholder="Cerca per titolo o descrizione..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 border-2 border-slate-200 rounded-xl focus:ring-4 focus:ring-yellow-500/20 focus:border-yellow-500 transition-all duration-300 text-slate-800 placeholder-slate-400 font-medium shadow-sm hover:border-slate-300"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X size={20} />
              </button>
            )}
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Category Filter */}
          <div className="flex-1">
            <label className="block text-sm font-semibold text-slate-700 mb-3 flex items-center">
              <Filter size={18} className="mr-2 text-slate-500" />
              Categoria
            </label>
            <div className="flex flex-wrap gap-2">
              {(['all', 'calcio5', 'calcio7'] as FilterCategory[]).map((category) => (
                <button
                  key={category}
                  onClick={() => setCategoryFilter(category)}
                  className={`px-5 py-2.5 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                    categoryFilter === category
                      ? 'bg-gradient-to-r from-yellow-500 to-yellow-600 text-white shadow-lg shadow-yellow-500/30'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200 hover:shadow-md'
                  }`}
                >
                  {category === 'all' ? 'Tutti' : category === 'calcio5' ? 'Calcio 5' : 'Calcio 7'}
                  <span className={`ml-2 text-xs ${categoryFilter === category ? 'text-yellow-100' : 'text-slate-500'}`}>
                    ({getFilterCount(category, typeFilter)})
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Type Filter */}
          <div className="flex-1">
            <label className="block text-sm font-semibold text-slate-700 mb-3">
              Tipo di contenuto
            </label>
            <div className="flex flex-wrap gap-2">
              {(['all', 'image', 'video'] as FilterType[]).map((type) => (
                <button
                  key={type}
                  onClick={() => setTypeFilter(type)}
                  className={`px-5 py-2.5 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                    typeFilter === type
                      ? 'bg-gradient-to-r from-slate-700 to-slate-800 text-white shadow-lg shadow-slate-500/30'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200 hover:shadow-md'
                  }`}
                >
                  {type === 'all' ? 'Tutti' : type === 'image' ? 'Foto' : 'Video'}
                  <span className={`ml-2 text-xs ${typeFilter === type ? 'text-slate-300' : 'text-slate-500'}`}>
                    ({getFilterCount(categoryFilter, type)})
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Count */}
        {!loading && (
          <div className="mt-6 pt-4 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-slate-600">
                {filteredHighlights.length === 0 ? (
                  searchQuery ? (
                    <span className="text-amber-600">Nessun risultato trovato</span>
                  ) : (
                    <span>Nessun highlight disponibile</span>
                  )
                ) : (
                  <>
                    <span className="text-yellow-600 font-bold text-lg">{filteredHighlights.length}</span>
                    <span className="ml-1">highlight{filteredHighlights.length !== 1 ? 's' : ''}</span>
                    {searchQuery && (
                      <span className="ml-1 text-slate-500">
                        per "<span className="text-slate-700 font-semibold">{searchQuery}</span>"
                      </span>
                    )}
                  </>
                )}
              </p>
              {searchQuery && filteredHighlights.length > 0 && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="text-xs text-slate-500 hover:text-slate-700 font-medium underline transition-colors"
                >
                  Cancella ricerca
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      {loading ? (
        <LoadingSkeleton />
      ) : error ? (
        <ErrorState />
      ) : filteredHighlights.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredHighlights.map((highlight) => (
            <HighlightCard
              key={highlight.id}
              highlight={highlight}
              onClick={() => handleHighlightClick(highlight)}
            />
          ))}
        </div>
      )}

      {/* Modal */}
      <HighlightModal
        highlight={selectedHighlight}
        highlights={filteredHighlights}
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onNext={handleNext}
        onPrevious={handlePrevious}
        onLike={toggleLike}
      />

      {/* Info Section */}
      {!loading && filteredHighlights.length > 0 && (
        <div className="bg-gradient-to-r from-blue-50 to-teal-50 border border-blue-200 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-blue-800 mb-2">
            📸 Rivivi i momenti migliori
          </h3>
          <p className="text-blue-700">
            Clicca su qualsiasi highlight per vederlo a schermo intero. Usa le frecce della tastiera 
            per navigare tra i contenuti o i pulsanti nel modal.
          </p>
        </div>
      )}
    </div>
  );
};

export default HighlightsPage;