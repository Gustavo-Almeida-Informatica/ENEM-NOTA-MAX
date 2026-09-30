import React, { useState, useMemo } from 'react';
import { 
  Quote, 
  Search, 
  Copy, 
  Check, 
  Sparkles, 
  BookOpen, 
  Scale, 
  BarChart3, 
  FileText,
  Filter,
  CheckCircle2
} from 'lucide-react';
import { CITATIONS, THEMATIC_AXES } from '../data/citations';
import { SeoMeta } from '../components/SeoMeta';

interface CitationsPageProps {
  onNavigate: (path: string) => void;
}

const CATEGORY_NAMES: Record<string, { label: string; icon: React.ElementType; color: string }> = {
  filosofia: { label: 'Filosofia & Sociologia', icon: BookOpen, color: 'text-indigo-600 bg-indigo-50 border-indigo-200' },
  legislacao: { label: 'Legislação & Leis', icon: Scale, color: 'text-emerald-700 bg-emerald-50 border-emerald-200' },
  literatura: { label: 'Literatura & Artes', icon: FileText, color: 'text-amber-700 bg-amber-50 border-amber-200' },
  dados: { label: 'Dados & Tendências Reais', icon: BarChart3, color: 'text-sky-700 bg-sky-50 border-sky-200' }
};

export const CitationsPage: React.FC<CitationsPageProps> = ({ onNavigate }) => {
  const [selectedAxis, setSelectedAxis] = useState('Todos os Eixos');
  const [selectedCategory, setSelectedCategory] = useState<string>('todas');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredCitations = useMemo(() => {
    return CITATIONS.filter((item) => {
      const matchesAxis = selectedAxis === 'Todos os Eixos' || item.thematicAxes.includes(selectedAxis);
      const matchesCategory = selectedCategory === 'todas' || item.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesQuery = !q ||
        item.quote.toLowerCase().includes(q) ||
        item.authorOrSource.toLowerCase().includes(q) ||
        item.roleOrWork.toLowerCase().includes(q) ||
        item.thematicAxes.some((axis) => axis.toLowerCase().includes(q));

      return matchesAxis && matchesCategory && matchesQuery;
    });
  }, [selectedAxis, selectedCategory, searchQuery]);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12 pb-24">
      <SeoMeta 
        title="Banco de Repertório & Citações para Redação" 
        description="Citações filosóficas, artigos da Constituição, obras literárias e dados sociológicos verificados para tirar nota 1000 na redação do ENEM." 
      />

      {/* Header Banner */}
      <section className="relative rounded-3xl overflow-hidden bg-slate-900 border border-slate-800 text-white p-6 sm:p-12 shadow-xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 text-xs font-semibold border border-rose-500/30">
              <Quote className="w-3.5 h-3.5 text-rose-400" />
              <span>Competência 2 da Redação</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              Banco de Repertório Sociocultural
            </h1>

            <p className="text-base text-slate-300 max-w-xl leading-relaxed">
              Citações legitimadas, marcos constitucionais e dados para enriquecer seus argumentos. Copie com 1 clique e veja dicas de como articular o repertório à sua tese.
            </p>

            <div className="pt-2 flex flex-wrap gap-4 text-xs text-slate-300">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Repertórios Coringas
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Cópia Rápida em 1 Clique
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Exemplos de Aplicação Prática
              </span>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden aspect-16/10 shadow-lg border border-slate-700">
              <img
                src="/src/assets/images/repertorio_redacao_1790795723795.jpg"
                alt="Composição editorial para repertório de redação com livros e cadernos"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* Filter & Search Bar */}
      <section className="space-y-4 bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/90 shadow-2xs">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Buscar por autor (Bauman, Locke), obra, lei ou palavra-chave..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all placeholder:text-slate-400"
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

          {/* Category Selector */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
            <button
              onClick={() => setSelectedCategory('todas')}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                selectedCategory === 'todas'
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Todos os Tipos
            </button>
            {Object.entries(CATEGORY_NAMES).map(([catKey, info]) => {
              const Icon = info.icon;
              return (
                <button
                  key={catKey}
                  onClick={() => setSelectedCategory(catKey)}
                  className={`px-3 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                    selectedCategory === catKey
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{info.label.split('&')[0].trim()}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Thematic Axes Pills */}
        <div className="pt-2 border-t border-slate-100">
          <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
            Filtrar por Eixo Temático da Redação:
          </label>
          <div className="flex flex-wrap gap-1.5">
            {THEMATIC_AXES.map((axis) => {
              const isSelected = selectedAxis === axis;
              return (
                <button
                  key={axis}
                  onClick={() => setSelectedAxis(axis)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    isSelected
                      ? 'bg-indigo-600 text-white shadow-2xs font-semibold'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                  }`}
                >
                  {axis}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Citations Grid */}
      <section className="space-y-6">
        <div className="flex items-center justify-between text-xs text-slate-500">
          <span>Mostrando {filteredCitations.length} repertórios correspondentes</span>
        </div>

        {filteredCitations.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredCitations.map((item) => {
              const isCopied = copiedId === item.id;
              const catInfo = CATEGORY_NAMES[item.category];
              const CatIcon = catInfo.icon;

              return (
                <div
                  key={item.id}
                  className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-md transition-shadow flex flex-col justify-between space-y-5"
                >
                  <div className="space-y-4">
                    {/* Top Category and Copy CTA */}
                    <div className="flex items-center justify-between gap-2">
                      <span className={`text-[11px] font-bold px-2.5 py-1 rounded-lg border flex items-center gap-1.5 ${catInfo.color}`}>
                        <CatIcon className="w-3.5 h-3.5" />
                        <span>{catInfo.label}</span>
                      </span>

                      <button
                        onClick={() => handleCopy(item.id, `"${item.quote}" — ${item.authorOrSource}`)}
                        className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold transition-all shadow-2xs ${
                          isCopied
                            ? 'bg-emerald-600 text-white'
                            : 'bg-slate-100 hover:bg-indigo-50 text-slate-700 hover:text-indigo-600 border border-slate-200'
                        }`}
                        title="Copiar citação formatada"
                      >
                        {isCopied ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>Copiado!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copiar</span>
                          </>
                        )}
                      </button>
                    </div>

                    {/* Quotation text */}
                    <div className="relative pl-4 border-l-3 border-indigo-500">
                      <p className="font-editorial text-base sm:text-lg text-slate-900 leading-relaxed italic">
                        "{item.quote}"
                      </p>
                    </div>

                    {/* Author & Source */}
                    <div>
                      <h3 className="text-sm font-extrabold text-slate-900">
                        {item.authorOrSource}
                      </h3>
                      <p className="text-xs text-slate-500 font-medium">
                        {item.roleOrWork}
                      </p>
                    </div>

                    {/* How to use */}
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-xs text-slate-700 space-y-1">
                      <span className="font-bold text-indigo-700 block">
                        Como articular na tese:
                      </span>
                      <p className="leading-relaxed">{item.howToUse}</p>
                    </div>

                    {/* Context Example */}
                    <div className="p-3 rounded-xl bg-indigo-50/40 border border-indigo-100 text-xs text-indigo-950 space-y-1">
                      <span className="font-bold text-indigo-900 block">
                        Exemplo aplicado no parágrafo:
                      </span>
                      <p className="font-editorial italic text-slate-800 leading-relaxed">
                        {item.contextExample}
                      </p>
                    </div>
                  </div>

                  {/* Matching Axes Footer */}
                  <div className="pt-3 border-t border-slate-100 flex flex-wrap gap-1">
                    {item.thematicAxes.map((axis, i) => (
                      <span 
                        key={i} 
                        className="text-[10px] text-slate-500 bg-slate-100 px-2 py-0.5 rounded font-medium"
                      >
                        {axis}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="p-12 text-center bg-white rounded-2xl border border-slate-200 space-y-3">
            <Quote className="w-10 h-10 text-slate-400 mx-auto" />
            <h3 className="text-base font-bold text-slate-900">
              Nenhuma citação encontrada
            </h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Não encontramos repertórios para os filtros selecionados. Tente selecionar outro eixo temático.
            </p>
            <button
              onClick={() => {
                setSelectedAxis('Todos os Eixos');
                setSelectedCategory('todas');
                setSearchQuery('');
              }}
              className="mt-2 text-xs font-bold text-indigo-600 hover:underline"
            >
              Resetar filtros
            </button>
          </div>
        )}
      </section>
    </div>
  );
};
