import React, { useState, useEffect } from 'react';
import { Play, ExternalLink, RefreshCw, AlertCircle, Video } from 'lucide-react';

interface VideoEmbedProps {
  query?: string;
  youtubeId?: string;
  title: string;
  channel?: string;
  autoPlay?: boolean;
}

export const VideoEmbed: React.FC<VideoEmbedProps> = ({ 
  query,
  youtubeId: initialYoutubeId, 
  title, 
  channel: initialChannel,
  autoPlay = false 
}) => {
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [activeYoutubeId, setActiveYoutubeId] = useState<string | undefined>(initialYoutubeId);
  const [activeTitle, setActiveTitle] = useState<string>(title);
  const [activeChannel, setActiveChannel] = useState<string | undefined>(initialChannel);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadError, setLoadError] = useState<boolean>(false);

  const effectiveQuery = query || `${title} ENEM`;
  const searchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(effectiveQuery)}`;

  useEffect(() => {
    let isMounted = true;

    // If query is provided and we don't have a reliable youtubeId, fetch from server
    if (query || !initialYoutubeId) {
      setLoading(true);
      fetch(`/api/videos?q=${encodeURIComponent(effectiveQuery)}`)
        .then((res) => {
          if (!res.ok) throw new Error('Falha ao buscar vídeo');
          return res.json();
        })
        .then((data) => {
          if (!isMounted) return;
          if (data.videos && data.videos.length > 0) {
            const first = data.videos[0];
            setActiveYoutubeId(first.youtubeId);
            if (first.title) setActiveTitle(first.title);
            if (first.channel) setActiveChannel(first.channel);
            setLoadError(false);
          } else {
            setLoadError(true);
          }
        })
        .catch((err) => {
          console.warn('Erro ao carregar videoaula do servidor:', err);
          if (isMounted) setLoadError(true);
        })
        .finally(() => {
          if (isMounted) setLoading(false);
        });
    } else {
      setActiveYoutubeId(initialYoutubeId);
    }

    return () => {
      isMounted = false;
    };
  }, [query, initialYoutubeId, effectiveQuery]);

  return (
    <div className="space-y-2">
      <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-slate-950 border border-slate-200/40 dark:border-slate-800 shadow-sm group">
        {loading ? (
          <div className="w-full h-full flex flex-col items-center justify-center bg-slate-900 text-slate-300 space-y-2">
            <RefreshCw className="w-6 h-6 animate-spin text-indigo-400" />
            <span className="text-xs font-medium">Buscando videoaula real do ENEM...</span>
          </div>
        ) : loadError || !activeYoutubeId ? (
          <div className="w-full h-full p-6 flex flex-col items-center justify-center bg-slate-900 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-slate-800 text-indigo-400 flex items-center justify-center">
              <Video className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-bold text-white max-w-md">{activeTitle}</p>
              <p className="text-xs text-slate-400 mt-1">
                Vídeo recomendado para este tópico do ENEM.
              </p>
            </div>
            <a
              href={searchUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-lg shadow-sm transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Assistir no YouTube</span>
            </a>
          </div>
        ) : isPlaying ? (
          <iframe
            className="w-full h-full border-0"
            src={`https://www.youtube-nocookie.com/embed/${activeYoutubeId}?autoplay=1&rel=0&modestbranding=1`}
            title={activeTitle}
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
              src={`https://img.youtube.com/vi/${activeYoutubeId}/hqdefault.jpg`}
              alt={activeTitle}
              className="w-full h-full object-cover opacity-80 group-hover:opacity-95 group-hover:scale-105 transition-all duration-300"
              referrerPolicy="no-referrer"
              loading="lazy"
              onError={() => setLoadError(true)}
            />

            {/* Scrim Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent" />

            {/* Big Play Button */}
            <div className="absolute z-10 w-14 h-14 rounded-full bg-red-600 group-hover:bg-red-700 text-white flex items-center justify-center shadow-lg transition-transform group-hover:scale-110 active:scale-95">
              <Play className="w-6 h-6 fill-white ml-0.5" />
            </div>

            {/* Bottom Title Bar */}
            <div className="absolute bottom-3 left-4 right-4 z-10">
              <span className="text-[11px] text-white/80 font-medium block">
                {activeChannel ? `Canal: ${activeChannel}` : 'Videoaula Educativa'}
              </span>
              <p className="text-sm font-bold text-white line-clamp-1 drop-shadow-sm">
                {activeTitle}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Fallback button "Assistir no YouTube" */}
      <div className="flex items-center justify-between text-xs text-slate-500 px-1">
        <span>Não está carregando o player?</span>
        <a
          href={searchUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 font-bold text-red-600 hover:text-red-700 hover:underline"
        >
          <span>Assistir no YouTube</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
};
