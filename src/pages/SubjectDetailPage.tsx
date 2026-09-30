import React from 'react';
import { 
  ArrowLeft, 
  Clock, 
  Video, 
  Network, 
  CheckCircle2, 
  Flame, 
  Lightbulb, 
  HelpCircle, 
  ArrowRight,
  BookOpen,
  Share2
} from 'lucide-react';
import { getSubjectBySlug, getRelatedSubjects } from '../data/topics';
import { AREAS } from '../data/areas';
import { SeoMeta } from '../components/SeoMeta';
import { VideoEmbed } from '../components/VideoEmbed';

interface SubjectDetailPageProps {
  slug: string;
  onNavigate: (path: string) => void;
}

export const SubjectDetailPage: React.FC<SubjectDetailPageProps> = ({ 
  slug, 
  onNavigate 
}) => {
  const subject = getSubjectBySlug(slug);

  if (!subject) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center space-y-4">
        <HelpCircle className="w-12 h-12 text-slate-400 mx-auto" />
        <h1 className="text-2xl font-bold text-slate-900">Assunto não encontrado</h1>
        <p className="text-sm text-slate-600">
          O assunto com o endereço "{slug}" não foi localizado ou mudou de endereço.
        </p>
        <button
          onClick={() => onNavigate('/')}
          className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-semibold hover:bg-indigo-700"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Voltar ao Mural de Assuntos</span>
        </button>
      </div>
    );
  }

  const area = AREAS[subject.area];
  const relatedSubjects = getRelatedSubjects(subject, 3);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10 pb-24">
      <SeoMeta 
        title={`${subject.title} - Resumo ENEM`} 
        description={`${subject.title}: resumo direto ao ponto para o ENEM, o que mais cai na prova, ideias principais e videoaula explicativa.`} 
      />

      {/* Breadcrumb Navigation */}
      <nav aria-label="Navegação estrutural" className="flex items-center gap-2 text-xs text-slate-500">
        <button 
          onClick={() => onNavigate('/')}
          className="hover:text-indigo-600 transition-colors"
        >
          Início
        </button>
        <span>/</span>
        <button 
          onClick={() => onNavigate('/')}
          className="hover:text-indigo-600 transition-colors font-medium"
        >
          {area.shortName}
        </button>
        <span>/</span>
        <span className="text-slate-900 font-semibold truncate max-w-[200px] sm:max-w-none">
          {subject.title}
        </span>
      </nav>

      {/* Header Info */}
      <header className="space-y-4 border-b border-slate-200 pb-8">
        <div className="flex flex-wrap items-center gap-3">
          <span 
            className="text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5"
            style={{ 
              backgroundColor: `${area.color}15`,
              color: area.color
            }}
          >
            <span 
              className="w-2 h-2 rounded-full" 
              style={{ backgroundColor: area.color }} 
            />
            {area.name}
          </span>

          <span className="text-xs text-slate-500 flex items-center gap-1 font-medium">
            <Clock className="w-3.5 h-3.5" />
            {subject.readingTimeMinutes} min de leitura
          </span>

          {subject.frequentlyTestedYears && (
            <span className="text-[11px] text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded-full font-medium">
              {subject.frequentlyTestedYears}
            </span>
          )}
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
          {subject.title}
        </h1>

        <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
          {subject.shortDescription}
        </p>

        {/* Quick Format Badges */}
        <div className="flex flex-wrap items-center gap-2 pt-2">
          {subject.mindMapId && (
            <button
              onClick={() => onNavigate(`/mapas?id=${subject.mindMapId}`)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 text-xs font-bold transition-colors"
            >
              <Network className="w-3.5 h-3.5" />
              <span>Ver Mapa Mental Deste Tema</span>
            </button>
          )}

          <a
            href="#video-aula"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 text-xs font-bold transition-colors"
          >
            <Video className="w-3.5 h-3.5" />
            <span>Ir para Videoaula</span>
          </a>
        </div>
      </header>

      {/* Main Content Layout */}
      <div className="space-y-10">
        {/* 1. O que mais cai na prova */}
        <section className="p-6 rounded-2xl bg-amber-50/70 border border-amber-200/90 space-y-4">
          <div className="flex items-center gap-2 text-amber-900">
            <Flame className="w-5 h-5 text-amber-600" />
            <h2 className="text-lg font-bold">
              O que mais cai na prova do ENEM
            </h2>
          </div>
          <ul className="space-y-2.5 text-sm text-amber-950">
            {subject.whatFallsMost.map((item, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 shrink-0" />
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* 2. Destaques das Ideias Principais */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-slate-900">
            <Lightbulb className="w-5 h-5 text-indigo-600" />
            <h2 className="text-xl font-bold">
              Destaques das Ideias Principais
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {subject.keyPoints.map((point, index) => (
              <div 
                key={index}
                className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 text-xs sm:text-sm text-slate-800 leading-relaxed flex items-start gap-2.5"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>{point}</span>
              </div>
            ))}
          </div>
        </section>

        {/* 3. Resumo Direto ao Ponto */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-slate-900">
            <BookOpen className="w-5 h-5 text-slate-700" />
            <h2 className="text-xl font-bold">
              Resumo Direto ao Ponto
            </h2>
          </div>
          <div className="space-y-4 text-slate-700 text-base leading-relaxed">
            {subject.fullSummary.map((paragraph, idx) => (
              <p key={idx} className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-2xs">
                {paragraph}
              </p>
            ))}
          </div>
        </section>

        {/* 4. Aplicação Prática no ENEM */}
        <section className="p-6 rounded-2xl bg-indigo-50/70 border border-indigo-200 text-indigo-950 space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-700 block">
            Dica Prática de Resolução
          </span>
          <p className="text-sm sm:text-base leading-relaxed text-indigo-900 font-medium">
            {subject.practicalApplication}
          </p>
        </section>

        {/* 5. Videoaula Relacionada */}
        <section id="video-aula" className="space-y-4 scroll-mt-24 pt-4 border-t border-slate-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-red-600 block">
                Conteúdo em Vídeo
              </span>
              <h2 className="text-xl font-bold text-slate-900">
                Videoaula Recomendada
              </h2>
            </div>
            <p className="text-xs text-slate-500 font-medium">
              Canal: {subject.relatedVideo.channel} · {subject.relatedVideo.durationMinutes} min
            </p>
          </div>

          <VideoEmbed
            youtubeId={subject.relatedVideo.youtubeId}
            title={subject.relatedVideo.title}
          />
        </section>

        {/* 6. Ação: Ver Mapa Mental */}
        {subject.mindMapId && (
          <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider block">
                Fixação Visual
              </span>
              <h3 className="text-lg font-bold text-emerald-950">
                Revise este assunto com um Diagrama Mental
              </h3>
              <p className="text-xs text-emerald-800/80">
                Explore os ramos conceituais conectados de forma visual e interativa.
              </p>
            </div>
            <button
              onClick={() => onNavigate(`/mapas?id=${subject.mindMapId}`)}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-bold text-xs shadow-sm transition-colors whitespace-nowrap"
            >
              <Network className="w-4 h-4" />
              <span>Ver Mapa Mental Completo</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Related Subjects in the same area */}
        {relatedSubjects.length > 0 && (
          <section className="space-y-4 pt-6 border-t border-slate-200">
            <h2 className="text-lg font-bold text-slate-900">
              Continue Estudando em {area.shortName}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {relatedSubjects.map((item) => (
                <div
                  key={item.slug}
                  onClick={() => onNavigate(`/assunto/${item.slug}`)}
                  className="p-4 rounded-xl bg-white border border-slate-200 hover:border-indigo-400 hover:shadow-xs transition-all cursor-pointer text-left space-y-1.5"
                >
                  <span className="text-[11px] text-slate-400 block">
                    {item.readingTimeMinutes} min de leitura
                  </span>
                  <h4 className="text-sm font-bold text-slate-900 hover:text-indigo-600 transition-colors line-clamp-2">
                    {item.title}
                  </h4>
                  <span className="text-xs font-semibold text-indigo-600 flex items-center gap-1 pt-1">
                    Ler resumo →
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};
