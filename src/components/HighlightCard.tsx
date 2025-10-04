import React, { useState, useRef, useEffect } from 'react';
import { Play, Image, Eye, Heart, Star, Sparkles } from 'lucide-react';
import { HighlightWithUrl } from '../types/highlights';

interface HighlightCardProps {
  highlight: HighlightWithUrl;
  onClick: () => void;
}

const HighlightCard: React.FC<HighlightCardProps> = ({ highlight, onClick }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Intersection Observer for lazy loading
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const isNew = () => {
    const uploadDate = new Date(highlight.upload_date);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - uploadDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 7;
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
      year: 'numeric'
    });
  };

  const truncateText = (text: string | null, maxLength: number) => {
    if (!text) return '';
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  return (
    <div
      ref={cardRef}
      className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transform hover:scale-[1.02] transition-all duration-300 cursor-pointer overflow-hidden"
      onClick={onClick}
    >
      {/* Media Container */}
      <div className="relative aspect-video bg-slate-100 overflow-hidden">
        {isVisible && (
          <>
            {highlight.file_type === 'video' ? (
              <div className="relative w-full h-full">
                <video
                  className="w-full h-full object-cover"
                  preload="metadata"
                  muted
                  onLoadedData={() => setImageLoaded(true)}
                  onError={() => setImageError(true)}
                >
                  <source src={highlight.publicUrl} type="video/mp4" />
                </video>
                {/* Play Button Overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                  <div className="bg-white bg-opacity-90 group-hover:bg-opacity-100 rounded-full p-4 transform scale-90 group-hover:scale-100 transition-all duration-300">
                    <Play className="text-slate-800 ml-1" size={24} fill="currentColor" />
                  </div>
                </div>
              </div>
            ) : (
              <div className="relative w-full h-full">
                <img
                  src={highlight.publicUrl}
                  alt={highlight.title}
                  className={`w-full h-full object-cover transition-all duration-300 ${
                    imageLoaded ? 'opacity-100' : 'opacity-0'
                  }`}
                  onLoad={() => setImageLoaded(true)}
                  onError={() => setImageError(true)}
                />
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300" />
              </div>
            )}

            {/* Loading Skeleton */}
            {!imageLoaded && !imageError && (
              <div className="absolute inset-0 bg-slate-200 animate-pulse" />
            )}

            {/* Error State */}
            {imageError && (
              <div className="absolute inset-0 bg-slate-100 flex items-center justify-center">
                <div className="text-slate-400 text-center">
                  <Image size={32} className="mx-auto mb-2" />
                  <p className="text-sm">Errore caricamento</p>
                </div>
              </div>
            )}
          </>
        )}

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-2">
          {/* Type Badge */}
          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
            highlight.file_type === 'video' 
              ? 'bg-red-100 text-red-800' 
              : 'bg-blue-100 text-blue-800'
          }`}>
            {highlight.file_type === 'video' ? (
              <>
                <Play size={12} className="mr-1" />
                Video
              </>
            ) : (
              <>
                <Image size={12} className="mr-1" />
                Foto
              </>
            )}
          </span>

          {/* Category Badge */}
          {highlight.category && (
            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(highlight.category)}`}>
              {highlight.category === 'calcio5' ? 'Calcio 5' : 'Calcio 7'}
            </span>
          )}
        </div>

        {/* Special Badges */}
        <div className="absolute top-3 right-3 flex flex-col gap-2">
          {highlight.featured && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
              <Star size={12} className="mr-1" fill="currentColor" />
              Featured
            </span>
          )}

          {isNew() && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-green-400 to-emerald-500 text-white">
              <Sparkles size={12} className="mr-1" />
              Nuovo
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-lg font-bold text-slate-800 mb-2 line-clamp-2">
          {highlight.title}
        </h3>
        
        {highlight.description && (
          <p className="text-slate-600 text-sm mb-3 line-clamp-2">
            {truncateText(highlight.description, 100)}
          </p>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between text-xs text-slate-500">
          <span>{formatDate(highlight.upload_date)}</span>
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-1">
              <Eye size={12} />
              <span>{highlight.views}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Heart size={12} />
              <span>{highlight.likes}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HighlightCard;