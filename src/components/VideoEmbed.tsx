import React, { useState } from 'react';
import { Play } from 'lucide-react';

interface VideoEmbedProps {
  youtubeId: string;
  title: string;
  autoPlay?: boolean;
}

export const VideoEmbed: React.FC<VideoEmbedProps> = ({ 
  youtubeId, 
  title, 
  autoPlay = false 
}) => {
  const [isPlaying, setIsPlaying] = useState(autoPlay);

  return (
    <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-slate-900 border border-slate-200/40 shadow-sm group">
      {isPlaying ? (
        <iframe
          className="w-full h-full border-0"
          src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0&modestbranding=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          loading="lazy"
        />
      ) : (
        <div 
          onClick={() => setIsPlaying(true)}
          className="relative w-full h-full cursor-pointer overflow-hidden bg-slate-950 flex items-center justify-center"
        >
          {/* High-res YouTube thumbnail with fallback */}
          <img
            src={`https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`}
            alt={title}
            className="w-full h-full object-cover opacity-80 group-hover:opacity-95 group-hover:scale-105 transition-all duration-300"
            referrerPolicy="no-referrer"
            loading="lazy"
          />

          {/* Scrim Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent" />

          {/* Big Play Button */}
          <div className="absolute z-10 w-14 h-14 rounded-full bg-red-600 group-hover:bg-red-700 text-white flex items-center justify-center shadow-lg transition-transform group-hover:scale-110 active:scale-95">
            <Play className="w-6 h-6 fill-white ml-0.5" />
          </div>

          {/* Bottom Title Bar */}
          <div className="absolute bottom-3 left-4 right-4 z-10">
            <span className="text-xs text-white/80 font-medium block">Videoaula Recomendada</span>
            <p className="text-sm font-bold text-white line-clamp-1 drop-shadow-sm">
              {title}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
