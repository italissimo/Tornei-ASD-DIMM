import React, { useEffect, useState } from 'react';
import { X, ChevronLeft, ChevronRight, Eye, Heart, Calendar, Tag } from 'lucide-react';
import { HighlightWithUrl } from '../types/highlights';

interface HighlightModalProps {
  highlight: HighlightWithUrl | null;
  highlights: HighlightWithUrl[];
  isOpen: boolean;
  onClose: () => void;
  onNext: () => void;
  onPrevious: () => void;
  onLike: (id: number) => void;
}

const HighlightModal: React.FC<HighlightModalProps> = ({
  highlight,
  highlights,
  isOpen,
  onClose,
  onNext,
  onPrevious,
  onLike
}) => {
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isOpen) return;

      switch (event.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowLeft':
          onPrevious();
          break;
        case 'ArrowRight':
          onNext();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, onNext, onPrevious]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen || !highlight) return null;

  const currentIndex = highlights.findIndex(h => h.id === highlight.id);
  const hasNext = currentIndex < highlights.length - 1;
  const hasPrevious = currentIndex > 0;

  const handleLike = () => {
    setLiked(!liked);
    onLike(highlight.id);
  };

  const getCategoryColor = (category: string | null) => {
    switch (category) {
      case 'calcio5':
        return 'bg-teal-500 text-white';
      case 'calcio7':
        return 'bg-blue-500 text-white';
      default:
        return 'bg-slate-500 text-white';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('it-IT', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-75 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative w-full h-full max-w-7xl max-h-screen mx-4 flex flex-col lg:flex-row bg-white lg:rounded-2xl overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-70 transition-colors"
        >
          <X size={24} />
        </button>

        {/* Navigation Buttons */}
        {hasPrevious && (
          <button
            onClick={onPrevious}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 p-2 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-70 transition-colors"
          >
            <ChevronLeft size={24} />
          </button>
        )}

        {hasNext && (
          <button
            onClick={onNext}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 p-2 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-70 transition-colors"
          >
            <ChevronRight size={24} />
          </button>
        )}

        {/* Media Section */}
        <div className="flex-1 bg-black flex items-center justify-center">
          {highlight.file_type === 'video' ? (
            <video
              className="max-w-full max-h-full object-contain"
              controls
              autoPlay
              src={highlight.publicUrl}
            />
          ) : (
            <img
              src={highlight.publicUrl}
              alt={highlight.title}
              className="max-w-full max-h-full object-contain"
            />
          )}
        </div>

        {/* Details Section */}
        <div className="lg:w-96 bg-white p-6 overflow-y-auto">
          <div className="space-y-6">
            {/* Title and Description */}
            <div>
              <h2 className="text-2xl font-bold text-slate-800 mb-3">
                {highlight.title}
              </h2>
              {highlight.description && (
                <p className="text-slate-600 leading-relaxed">
                  {highlight.description}
                </p>
              )}
            </div>

            {/* Badges */}
            <div className="flex flex-wrap gap-2">
              {highlight.category && (
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(highlight.category)}`}>
                  <Tag size={14} className="mr-1" />
                  {highlight.category === 'calcio5' ? 'Calcio 5' : 'Calcio 7'}
                </span>
              )}

              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                highlight.file_type === 'video' 
                  ? 'bg-red-100 text-red-800' 
                  : 'bg-blue-100 text-blue-800'
              }`}>
                {highlight.file_type === 'video' ? 'Video' : 'Foto'}
              </span>

              {highlight.featured && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
                  Featured
                </span>
              )}
            </div>

            {/* Metadata */}
            <div className="space-y-3 text-sm text-slate-600">
              <div className="flex items-center space-x-2">
                <Calendar size={16} />
                <span>Caricato il {formatDate(highlight.upload_date)}</span>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Eye size={16} />
                  <span>{highlight.views} visualizzazioni</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Heart size={16} />
                  <span>{highlight.likes} mi piace</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-4 border-t border-slate-200">
              <button
                onClick={handleLike}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all ${
                  liked
                    ? 'bg-red-100 text-red-700 hover:bg-red-200'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <Heart 
                  size={18} 
                  className={liked ? 'fill-current' : ''} 
                />
                <span>{liked ? 'Ti piace' : 'Mi piace'}</span>
              </button>
            </div>

            {/* Navigation Info */}
            <div className="text-xs text-slate-500 text-center pt-4 border-t border-slate-200">
              <p>{currentIndex + 1} di {highlights.length}</p>
              <p className="mt-1">Usa le frecce per navigare</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HighlightModal;