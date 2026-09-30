import React, { useState } from 'react';
import { HelpCircle, ArrowLeft, Search, Compass, BookOpen } from 'lucide-react';
import { SeoMeta } from '../components/SeoMeta';

interface NotFoundPageProps {
  onNavigate: (path: string) => void;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({ onNavigate }) => {
  const [search, setSearch] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) {
      onNavigate(`/?q=${encodeURIComponent(search.trim())}`);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-6">
      <SeoMeta 
        title="Página não encontrada (404)" 
        description="A página que você procura não foi encontrada. Retorne ao mural de assuntos ou pesquise o conteúdo desejado." 
      />

      <div className="w-16 h-16 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto shadow-xs">
        <HelpCircle className="w-8 h-8" />
      </div>

      <div className="space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
          Erro 404
        </span>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Página não encontrada
        </h1>
        <p className="text-sm text-slate-600 max-w-md mx-auto">
          O link que você seguiu pode estar incorreto ou o conteúdo foi reorganizado. O que você gostaria de estudar agora?
        </p>
      </div>

      {/* Quick Search */}
      <form onSubmit={handleSearch} className="max-w-md mx-auto flex gap-2">
        <input
          type="text"
          placeholder="Pesquisar assunto (ex: ecologia, porcentagem)..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 px-4 py-2 text-sm bg-white border border-slate-300 rounded-xl shadow-2xs focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-semibold hover:bg-indigo-700 transition-colors shadow-2xs"
        >
          Buscar
        </button>
      </form>

      {/* Shortcuts */}
      <div className="pt-4 flex flex-wrap items-center justify-center gap-2">
        <button
          onClick={() => onNavigate('/')}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors"
        >
          <Compass className="w-3.5 h-3.5" />
          <span>Mural de Assuntos</span>
        </button>
        <button
          onClick={() => onNavigate('/videos')}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors"
        >
          <span>Vídeos</span>
        </button>
        <button
          onClick={() => onNavigate('/mapas')}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors"
        >
          <span>Mapas Mentais</span>
        </button>
        <button
          onClick={() => onNavigate('/dicas')}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors"
        >
          <span>Dicas de Tempo</span>
        </button>
        <button
          onClick={() => onNavigate('/citacoes')}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors"
        >
          <span>Citações</span>
        </button>
      </div>
    </div>
  );
};
