import React, { useState, useMemo } from 'react';
import { 
  BookOpen, 
  Video, 
  Clock, 
  Network, 
  Quote, 
  Search, 
  ArrowRight, 
  Sparkles, 
  Layers, 
  FileText,
  CheckCircle,
  HelpCircle,
  TrendingUp,
  Compass
} from 'lucide-react';
import { ALL_SUBJECTS } from '../data/topics';
import { AREAS } from '../data/areas';
import { EnemArea, Subject } from '../types';
import { SeoMeta } from '../components/SeoMeta';

interface HomePageProps {
  onNavigate: (path: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const [selectedArea, setSelectedArea] = useState<EnemArea | 'todas'>('todas');
  const [searchQuery, setSearchQuery] = useState('');

  // Filtered subjects
  const filteredSubjects = useMemo(() => {
    return ALL_SUBJECTS.filter((subject) => {
      const matchesArea = selectedArea === 'todas' || subject.area === selectedArea;
      const q = searchQuery.toLowerCase().trim();
      const matchesQuery = !q || 
        subject.title.toLowerCase().includes(q) ||
        subject.shortDescription.toLowerCase().includes(q) ||
        subject.subtopic.toLowerCase().includes(q);
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
    <div className="space-y-16 pb-20">
      <SeoMeta 
        title="Início" 
        description="Plataforma de estudos para o ENEM com foco em conteúdo, leitura fácil e uso no celular. Resumos dos 60 assuntos mais cobrados, mapas mentais e videoaulas." 
      />

      {/* Hero Section */}
      <section className="relative pt-6 sm:pt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Brand & Value Prop */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200/80 text-xs font-semibold text-indigo-700">
                <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                <span>Metodologia Orientada à Coerência TRI</span>
              </div>

              <div className="space-y-3">
                <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-[1.15]">
                  ENEM <span className="text-indigo-600">Nota Max</span>
                </h1>
                <p className="text-lg sm:text-2xl font-serif italic text-slate-700 font-medium">
                  "Estude menos tempo perdido, mire a nota máxima."
                </p>
              </div>

              <p className="text-base text-slate-600 leading-relaxed max-w-xl">
                Tudo o que você precisa para a prova em um só lugar, sem enrolação. Resumos diretos ao ponto dos 60 temas que mais caem, diagramas mentais interativos, biblioteca de videoaulas e banco de repertório para redação.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href="#mural"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-semibold text-sm shadow-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
                >
                  <Compass className="w-4 h-4" />
                  <span>Explorar Mural de Assuntos</span>
                </a>

                <button
                  onClick={() => onNavigate('/mapas')}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 font-semibold text-sm transition-colors shadow-2xs"
                >
                  <Network className="w-4 h-4 text-indigo-600" />
                  <span>Mapas Mentais</span>
                </button>
              </div>

              {/* Trust Badges */}
              <div className="pt-4 border-t border-slate-200/80 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-slate-500">
                <span className="flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  60 assuntos com resumos
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  6 mapas mentais detalhados
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  Leitura leve no celular
                </span>
              </div>
            </div>

            {/* Right Column: Hero Visual Photography */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden shadow-xl border border-slate-200/60 aspect-4/3 bg-slate-100 group">
                <img
                  src="/src/assets/images/hero_enem_study_1790795705881.jpg"
                  alt="Espaço de estudos focado para o ENEM com cronograma, anotações e tablet"
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-300">
                    Foco & Consistência
                  </span>
                  <p className="text-sm font-semibold">
                    Seu guia diário para estudar o que realmente importa no ENEM.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4 Core Shortcuts Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          <button
            onClick={() => onNavigate('/videos')}
            className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-indigo-300 transition-all text-left group flex flex-col justify-between"
          >
            <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <Video className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                Vídeos Educativos
              </h3>
              <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                Aulas selecionadas dos melhores professores do YouTube.
              </p>
            </div>
            <span className="text-xs font-semibold text-indigo-600 mt-3 flex items-center gap-1">
              Assistir agora →
            </span>
          </button>

          <button
            onClick={() => onNavigate('/dicas')}
            className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-indigo-300 transition-all text-left group flex flex-col justify-between"
          >
            <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                Dicas de Tempo
              </h3>
              <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                Ordem da prova, 3 min por questão e planejador semanal.
              </p>
            </div>
            <span className="text-xs font-semibold text-indigo-600 mt-3 flex items-center gap-1">
              Ver estratégias →
            </span>
          </button>

          <button
            onClick={() => onNavigate('/mapas')}
            className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-indigo-300 transition-all text-left group flex flex-col justify-between"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <Network className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                Mapas Mentais
              </h3>
              <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                Diagramas visuais interativos com nós explicativos.
              </p>
            </div>
            <span className="text-xs font-semibold text-indigo-600 mt-3 flex items-center gap-1">
              Abrir diagramas →
            </span>
          </button>

          <button
            onClick={() => onNavigate('/citacoes')}
            className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-indigo-300 transition-all text-left group flex flex-col justify-between"
          >
            <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <Quote className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                Repertório Redação
              </h3>
              <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                Citações, leis e dados com 1-clique para copiar.
              </p>
            </div>
            <span className="text-xs font-semibold text-indigo-600 mt-3 flex items-center gap-1">
              Ver citações →
            </span>
          </button>
        </div>
      </section>

      {/* Subject Wall (Mural de Assuntos) */}
      <section id="mural" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-20">
        <div className="space-y-6">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-5">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 block mb-1">
                Catálogo de Conteúdos
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Mural de Assuntos do ENEM
              </h2>
              <p className="text-sm text-slate-600 mt-1">
                {filteredSubjects.length} conteúdos organizados pelas 5 áreas oficiais do exame.
              </p>
            </div>

            {/* Live Search Bar */}
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Buscar assunto, termo ou autor..."
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

          {/* Area Filter Segmented Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
            {areasList.map((areaKey) => {
              const isSelected = selectedArea === areaKey;
              const areaInfo = areaKey !== 'todas' ? AREAS[areaKey] : null;

              return (
                <button
                  key={areaKey}
                  onClick={() => setSelectedArea(areaKey)}
                  className={`px-3.5 py-2 text-xs font-bold rounded-xl whitespace-nowrap transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 flex items-center gap-1.5 ${
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
                    {areaKey === 'todas' ? 'Todas as Áreas (60)' : areaInfo?.shortName}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Grid of Subject Cards */}
          {filteredSubjects.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredSubjects.map((subject) => {
                const area = AREAS[subject.area];
                return (
                  <div
                    key={subject.slug}
                    onClick={() => onNavigate(`/assunto/${subject.slug}`)}
                    className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-indigo-400 transition-all cursor-pointer flex flex-col justify-between text-left group"
                  >
                    <div className="space-y-3">
                      {/* Top area & reading metadata - Zero Pill clean styling */}
                      <div className="flex items-center justify-between text-xs text-slate-500">
                        <div className="flex items-center gap-1.5 font-semibold" style={{ color: area.color }}>
                          <span 
                            className="w-2 h-2 rounded-full" 
                            style={{ backgroundColor: area.color }} 
                          />
                          <span>{area.shortName}</span>
                        </div>
                        <span className="text-slate-400">
                          {subject.readingTimeMinutes} min de leitura
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-base font-bold text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-2">
                        {subject.title}
                      </h3>

                      {/* Short Description */}
                      <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                        {subject.shortDescription}
                      </p>
                    </div>

                    {/* Card Footer: Badges for Available Formats */}
                    <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        {subject.availableFormats.includes('resumo') && (
                          <span className="text-[10px] font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                            Resumo
                          </span>
                        )}
                        {subject.availableFormats.includes('video') && (
                          <span className="text-[10px] font-bold text-red-700 bg-red-50 px-2 py-0.5 rounded flex items-center gap-1">
                            <Video className="w-3 h-3" />
                            Vídeo
                          </span>
                        )}
                        {subject.availableFormats.includes('mapa') && (
                          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded flex items-center gap-1">
                            <Network className="w-3 h-3" />
                            Mapa mental
                          </span>
                        )}
                      </div>

                      <span className="text-xs font-semibold text-indigo-600 group-hover:translate-x-0.5 transition-transform flex items-center">
                        Ler →
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="p-12 text-center bg-white rounded-2xl border border-slate-200 space-y-3">
              <HelpCircle className="w-10 h-10 text-slate-400 mx-auto" />
              <h3 className="text-base font-bold text-slate-900">
                Nenhum assunto encontrado
              </h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Não encontramos resultados para "{searchQuery}". Tente usar palavras-chave mais genéricas como "ecologia", "funções" ou "redação".
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedArea('todas');
                }}
                className="mt-2 text-xs font-bold text-indigo-600 hover:underline"
              >
                Limpar todos os filtros
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
