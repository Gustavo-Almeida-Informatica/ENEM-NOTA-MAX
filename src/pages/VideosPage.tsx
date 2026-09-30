import React, { useState, useMemo } from 'react';
import { Video, Search, Clock, ArrowRight, Play, BookOpen, Layers } from 'lucide-react';
import { VIDEOS, VideoItem } from '../data/videos';
import { AREAS } from '../data/areas';
import { EnemArea } from '../types';
import { SeoMeta } from '../components/SeoMeta';
import { VideoEmbed } from '../components/VideoEmbed';

interface VideosPageProps {
  onNavigate: (path: string) => void;
}

export const VideosPage: React.FC<VideosPageProps> = ({ onNavigate }) => {
  const [selectedArea, setSelectedArea] = useState<EnemArea | 'todas'>('todas');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredVideos = useMemo(() => {
    return VIDEOS.filter((video) => {
      const matchesArea = selectedArea === 'todas' || video.area === selectedArea;
      const q = searchQuery.toLowerCase().trim();
      const matchesQuery = !q ||
        video.title.toLowerCase().includes(q) ||
        video.subjectTitle.toLowerCase().includes(q) ||
        video.channel.toLowerCase().includes(q);
      return matchesArea && matchesQuery;
    });
  }, [selectedArea, searchQuery]);

  const areasList: (EnemArea | 'todas')[] = [
    'todas',
    'linguagens',
    'matematica',
    'humanas',
    'natureza',
    'redacao'
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10 pb-24">
      <SeoMeta 
        title="Biblioteca de Videoaulas" 
        description="Aulas em vídeo totalmente focadas no ENEM com professores renomados. Filtre por área de conhecimento e assista sem enrolação." 
      />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200 pb-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 text-red-700 text-xs font-semibold">
            <Video className="w-3.5 h-3.5 text-red-600" />
            <span>Biblioteca Curada para o ENEM</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Videoaulas Essenciais
          </h1>
          <p className="text-sm text-slate-600 max-w-xl">
            Aulas selecionadas e organizadas por assunto para você aprender visualmente os conteúdos mais cobrados da prova.
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Buscar vídeo por matéria ou canal..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-sm bg-white border border-slate-300 rounded-xl shadow-2xs focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all placeholder:text-slate-400"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
            >
              Limpar
            </button>
          )}
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
        {areasList.map((areaKey) => {
          const isSelected = selectedArea === areaKey;
          const areaInfo = areaKey !== 'todas' ? AREAS[areaKey] : null;

          return (
            <button
              key={areaKey}
              onClick={() => setSelectedArea(areaKey)}
              className={`px-3.5 py-2 text-xs font-bold rounded-xl whitespace-nowrap transition-all flex items-center gap-1.5 ${
                isSelected
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {areaInfo && (
                <span 
                  className="w-2 h-2 rounded-full" 
                  style={{ backgroundColor: areaInfo.color }} 
                />
              )}
              <span>
                {areaKey === 'todas' ? `Todos os Vídeos (${VIDEOS.length})` : areaInfo?.shortName}
              </span>
            </button>
          );
        })}
      </div>

      {/* Video Grid */}
      {filteredVideos.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVideos.map((video) => {
            const area = AREAS[video.area];
            return (
              <div 
                key={video.id}
                className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow"
              >
                <div>
                  {/* YouTube Embed Player */}
                  <VideoEmbed
                    youtubeId={video.youtubeId}
                    title={video.title}
                  />

                  {/* Video Meta Info */}
                  <div className="p-5 space-y-3">
                    <div className="flex items-center justify-between text-xs text-slate-500">
                      <span className="font-bold flex items-center gap-1.5" style={{ color: area.color }}>
                        <span 
                          className="w-2 h-2 rounded-full" 
                          style={{ backgroundColor: area.color }} 
                        />
                        {area.shortName}
                      </span>
                      <span className="flex items-center gap-1 text-slate-400">
                        <Clock className="w-3.5 h-3.5" />
                        {video.durationMinutes} min
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-slate-900 line-clamp-2">
                      {video.title}
                    </h3>

                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {video.description}
                    </p>

                    <p className="text-xs font-medium text-slate-400">
                      Canal: <span className="text-slate-700 font-semibold">{video.channel}</span>
                    </p>
                  </div>
                </div>

                {/* Card Action: Go to Summary */}
                <div className="p-4 pt-0">
                  <button
                    onClick={() => onNavigate(`/assunto/${video.subjectSlug}`)}
                    className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-slate-50 hover:bg-indigo-50 hover:text-indigo-700 text-slate-700 text-xs font-bold transition-colors border border-slate-200/80"
                  >
                    <BookOpen className="w-3.5 h-3.5 text-indigo-600" />
                    <span>Ler Resumo Completo deste Assunto</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-auto" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="p-12 text-center bg-white rounded-2xl border border-slate-200 space-y-3">
          <Video className="w-10 h-10 text-slate-400 mx-auto" />
          <h3 className="text-base font-bold text-slate-900">
            Nenhuma videoaula encontrada
          </h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Não encontramos vídeos correspondentes aos termos digitados. Tente mudar os filtros de busca.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedArea('todas');
            }}
            className="mt-2 text-xs font-bold text-indigo-600 hover:underline"
          >
            Limpar filtros
          </button>
        </div>
      )}
    </div>
  );
};
