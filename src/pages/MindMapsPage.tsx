import React, { useState, useEffect, useRef } from 'react';
import { 
  Network, 
  Sparkles, 
  Search, 
  Send, 
  Share2, 
  Bookmark, 
  BookmarkCheck, 
  RefreshCw, 
  AlertCircle, 
  Trash2, 
  Check, 
  ArrowRight, 
  BookOpen,
  RotateCcw,
  Compass
} from 'lucide-react';
import { MIND_MAPS, getMindMapById } from '../data/mindmaps';
import { MindMap } from '../types';
import { NotebookMindMapViewer } from '../components/NotebookMindMapViewer';
import { SeoMeta } from '../components/SeoMeta';

interface MindMapsPageProps {
  initialMapId?: string;
  onNavigate: (path: string) => void;
}

const LOCAL_STORAGE_KEY = 'enem_nota_max_saved_mindmaps';

export const MindMapsPage: React.FC<MindMapsPageProps> = ({ 
  initialMapId, 
  onNavigate 
}) => {
  const [activeMindMap, setActiveMindMap] = useState<MindMap>(() => {
    if (initialMapId) {
      const found = getMindMapById(initialMapId);
      if (found) return found;
    }
    return MIND_MAPS[0];
  });

  const [promptTema, setPromptTema] = useState('');
  const [lastAttemptedTema, setLastAttemptedTema] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [savedMaps, setSavedMaps] = useState<MindMap[]>([]);
  const [shareCopied, setShareCopied] = useState(false);
  const abortControllerRef = useRef<AbortController | null>(null);

  // Load saved custom maps from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          setSavedMaps(parsed);
        }
      }
    } catch (e) {
      console.warn('Failed to load saved mind maps from localStorage:', e);
    }

    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  // Check URL search parameters (?tema=... or ?id=...)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const temaParam = params.get('tema');
      const idParam = params.get('id');

      if (idParam) {
        const found = getMindMapById(idParam);
        if (found) setActiveMindMap(found);
      } else if (temaParam && temaParam !== activeMindMap.theme) {
        const existing = MIND_MAPS.find((m) => m.theme.toLowerCase() === temaParam.toLowerCase());
        if (existing) {
          setActiveMindMap(existing);
        } else {
          setPromptTema(temaParam);
          generateMindMapWithAI(temaParam);
        }
      }
    }
  }, []);

  // Save map to localStorage
  const handleSaveMap = (mapToSave: MindMap) => {
    setSavedMaps((prev) => {
      const exists = prev.some((m) => m.id === mapToSave.id);
      const updated = exists ? prev.filter((m) => m.id !== mapToSave.id) : [mapToSave, ...prev];
      try {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
      } catch (err) {
        console.warn('Failed to persist maps in localStorage:', err);
      }
      return updated;
    });
  };

  const isCurrentMapSaved = savedMaps.some((m) => m.id === activeMindMap.id);

  // Share by link
  const handleShareLink = () => {
    const url = `${window.location.origin}/mapas?tema=${encodeURIComponent(activeMindMap.theme)}`;
    navigator.clipboard.writeText(url);
    setShareCopied(true);
    setTimeout(() => setShareCopied(false), 2000);
  };

  // Generate with Gemini AI via Express server (with 60s AbortController and non-JSON handling)
  const generateMindMapWithAI = async (temaToGen: string) => {
    const trimmed = temaToGen.trim();
    if (!trimmed) return;

    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    const controller = new AbortController();
    abortControllerRef.current = controller;

    // 60 seconds client-side abort timeout
    const timeoutId = setTimeout(() => {
      controller.abort();
    }, 60000);

    setLastAttemptedTema(trimmed);
    setIsGenerating(true);
    setErrorMessage(null);

    try {
      const res = await fetch('/api/mapa', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ tema: trimmed }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      const contentType = res.headers.get('content-type') || '';
      const rawText = await res.text();
      let data: any = null;

      try {
        data = JSON.parse(rawText);
      } catch {
        // Se a resposta retornou HTML (ex: interceptação por proxy ou queda no SPA) ou texto não formatado
        if (rawText.trim().startsWith('<') || contentType.includes('text/html')) {
          throw new Error(
            'O servidor retornou uma página web (HTML) em vez de dados JSON. Tente novamente ou selecione um dos mapas prontos de referência.'
          );
        }
        if (!res.ok) {
          throw new Error(`Erro no servidor ao gerar mapa mental (status ${res.status}). Tente novamente.`);
        }
        throw new Error(
          `O servidor retornou uma resposta em formato inesperado (status ${res.status}). Verifique a conexão.`
        );
      }

      if (!res.ok) {
        throw new Error(data?.error || `Erro ao gerar mapa mental (status ${res.status}).`);
      }

      if (!data?.mapa || !data.mapa.label) {
        throw new Error('A resposta da IA não continha uma árvore de mapa mental válida.');
      }

      const generatedMap: MindMap = {
        id: `ai-map-${Date.now()}`,
        title: `Mapa Mental: ${data.tema || trimmed}`,
        theme: data.tema || trimmed,
        description: `Mapa mental dinâmico gerado por inteligência artificial (${data.modelUsed || 'Gemini'}) com foco no ENEM.`,
        rootNode: data.mapa,
      };

      setActiveMindMap(generatedMap);
      setPromptTema('');
      setErrorMessage(null);
      handleSaveMap(generatedMap);
    } catch (err: any) {
      clearTimeout(timeoutId);
      console.error('Error generating mind map:', err);

      if (err?.name === 'AbortError') {
        setErrorMessage(
          'Tempo limite de 60 segundos esgotado no navegador. O servidor demorou muito para responder. Tente novamente ou use um dos modelos de reserva.'
        );
      } else {
        setErrorMessage(
          err?.message || 'Falha ao gerar o mapa mental. Tente novamente ou selecione um dos mapas prontos de referência.'
        );
      }
    } finally {
      setIsGenerating(false);
      abortControllerRef.current = null;
    }
  };

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (promptTema.trim()) {
      generateMindMapWithAI(promptTema);
    }
  };

  const handleRetry = () => {
    const temaToRetry = lastAttemptedTema || promptTema || activeMindMap.theme;
    if (temaToRetry) {
      generateMindMapWithAI(temaToRetry);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10 pb-24">
      <SeoMeta 
        title={`${activeMindMap.theme} - Mapa Mental Interativo`} 
        description="Gere mapas mentais dinâmicos no estilo NotebookLM com nó à esquerda e ramos à direita, focados 100% no ENEM." 
      />

      {/* Header and Generator Bar */}
      <div className="space-y-6 border-b border-slate-200 dark:border-slate-800 pb-8">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
            <span>Gerador Inteligente no Estilo NotebookLM</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Mapas Mentais do ENEM
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
            Digite qualquer tema ou assunto do ENEM para gerar um diagrama hierárquico em 3 a 4 níveis com explicações diretas, videoaulas integradas e foco na matriz do exame.
          </p>
        </div>

        {/* AI Generator Input Form */}
        <form onSubmit={handleSubmitForm} className="max-w-3xl space-y-3">
          <div className="relative flex flex-col sm:flex-row items-stretch sm:items-center gap-2 p-1.5 bg-white dark:bg-slate-900 border-2 border-indigo-500/80 dark:border-indigo-500 rounded-2xl shadow-sm focus-within:ring-2 focus-within:ring-indigo-400">
            <div className="flex-1 flex items-center pl-3">
              <Search className="w-4 h-4 text-slate-400 mr-2 shrink-0" />
              <input
                type="text"
                placeholder="Digite um tema do ENEM (ex: Meio ambiente, Inteligência Artificial, Era Vargas)..."
                value={promptTema}
                onChange={(e) => setPromptTema(e.target.value)}
                disabled={isGenerating}
                className="w-full py-2.5 text-sm bg-transparent border-0 focus:outline-none placeholder:text-slate-400 dark:placeholder:text-slate-500 text-slate-900 dark:text-white font-medium"
              />
            </div>
            <button
              type="submit"
              disabled={isGenerating || !promptTema.trim()}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 disabled:opacity-50 text-white font-bold text-xs shadow-sm transition-all whitespace-nowrap"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Gerando com IA...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Gerar Mapa com IA</span>
                </>
              )}
            </button>
          </div>

          {/* Quick Suggestions Chips */}
          <div className="flex flex-wrap items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
            <span className="font-semibold text-slate-600 dark:text-slate-300">Sugestões rápidas:</span>
            {['Meio ambiente', 'Revolução Industrial', 'Crise Hídrica', 'Inteligência Artificial', 'Segurança Alimentar'].map((sug) => (
              <button
                key={sug}
                type="button"
                onClick={() => {
                  setPromptTema(sug);
                  generateMindMapWithAI(sug);
                }}
                disabled={isGenerating}
                className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-indigo-950/60 hover:text-indigo-600 dark:hover:text-indigo-400 rounded-lg text-slate-700 dark:text-slate-300 transition-colors"
              >
                {sug}
              </button>
            ))}
          </div>
        </form>

        {/* Detailed Error Banner with Retry and Ready Maps Fallback */}
        {errorMessage && (
          <div className="p-5 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 text-xs text-amber-950 dark:text-amber-200 space-y-4 animate-in fade-in shadow-xs">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
              <div className="space-y-1 flex-1">
                <span className="font-bold text-sm text-amber-900 dark:text-amber-100 block">
                  Aviso da IA:
                </span>
                <p className="text-xs sm:text-sm text-amber-900/90 dark:text-amber-200/90 leading-relaxed font-medium">
                  {errorMessage}
                </p>
              </div>
            </div>

            {/* Action Buttons: Retry and Ready Maps Options */}
            <div className="pt-2 border-t border-amber-200/80 dark:border-amber-900/60 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleRetry}
                  disabled={isGenerating}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 active:bg-amber-800 text-white font-bold text-xs shadow-xs transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Tentar novamente {lastAttemptedTema ? `("${lastAttemptedTema}")` : ''}</span>
                </button>
              </div>

              {/* Ready-made maps fallback pills */}
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-[11px] font-semibold text-amber-800 dark:text-amber-300">
                  Ou abra um mapa pronto:
                </span>
                {MIND_MAPS.slice(0, 4).map((map) => (
                  <button
                    key={map.id}
                    type="button"
                    onClick={() => {
                      setActiveMindMap(map);
                      setErrorMessage(null);
                    }}
                    className="px-2.5 py-1 bg-white dark:bg-slate-800 hover:bg-amber-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-amber-200 dark:border-slate-700 rounded-lg text-xs font-semibold transition-colors"
                  >
                    {map.theme}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Examples & Saved Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
            Mapas Prontos de Referência (3 Níveis):
          </label>
          <div className="flex flex-wrap gap-2">
            {MIND_MAPS.map((map) => {
              const isSelected = activeMindMap.theme.toLowerCase() === map.theme.toLowerCase();
              return (
                <button
                  key={map.id}
                  onClick={() => {
                    setActiveMindMap(map);
                    setErrorMessage(null);
                  }}
                  className={`px-3 py-1.5 rounded-xl border text-xs font-bold transition-all ${
                    isSelected
                      ? 'bg-slate-900 dark:bg-indigo-600 text-white shadow-2xs'
                      : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 border-slate-200 dark:border-slate-700'
                  }`}
                >
                  {map.theme}
                </button>
              );
            })}
          </div>
        </div>

        {/* Action Buttons for Active Map: Save & Share */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleSaveMap(activeMindMap)}
            className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold border transition-colors shadow-2xs ${
              isCurrentMapSaved
                ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800'
                : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 border-slate-200 dark:border-slate-700'
            }`}
            title="Salvar no histórico do navegador"
          >
            {isCurrentMapSaved ? (
              <>
                <BookmarkCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>Salvo no Navegador</span>
              </>
            ) : (
              <>
                <Bookmark className="w-3.5 h-3.5 text-slate-400" />
                <span>Salvar Mapa</span>
              </>
            )}
          </button>

          <button
            onClick={handleShareLink}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 transition-colors shadow-2xs"
            title="Copiar link compartilhável"
          >
            {shareCopied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>Link Copiado!</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                <span>Compartilhar</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Mind Map Viewer Component */}
      <section className="space-y-4">
        {isGenerating ? (
          <div className="w-full h-[580px] rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-900 flex flex-col items-center justify-center text-white space-y-4">
            <RefreshCw className="w-8 h-8 animate-spin text-indigo-400" />
            <div className="text-center space-y-1">
              <h3 className="text-lg font-bold">Gerando Mapa Mental com o Gemini...</h3>
              <p className="text-xs text-slate-400 max-w-sm">
                Estruturando nós pedagógicos com foco na matriz do ENEM, sem enrolação e em alta velocidade.
              </p>
            </div>
          </div>
        ) : (
          <NotebookMindMapViewer 
            mindMap={activeMindMap}
            onNavigateToSubject={(slug) => onNavigate(`/assunto/${slug}`)}
          />
        )}
      </section>

      {/* Saved Maps Drawer if any exist */}
      {savedMaps.length > 0 && (
        <section className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bookmark className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Seus Mapas Salvos no Navegador ({savedMaps.length})
              </h3>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
            {savedMaps.map((saved) => (
              <div
                key={saved.id}
                onClick={() => setActiveMindMap(saved)}
                className={`p-3 rounded-xl border text-left cursor-pointer transition-all flex items-center justify-between group ${
                  activeMindMap.id === saved.id
                    ? 'border-indigo-500 bg-indigo-50/50 dark:bg-indigo-950/50'
                    : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 bg-slate-50/60 dark:bg-slate-800/60'
                }`}
              >
                <div className="truncate mr-2">
                  <span className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 block truncate">
                    {saved.theme}
                  </span>
                  <span className="text-[10px] text-slate-400 dark:text-slate-500">
                    {saved.rootNode.children?.length || 0} ramos principais
                  </span>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSaveMap(saved);
                  }}
                  className="p-1 text-slate-400 hover:text-red-600 transition-colors"
                  title="Remover dos salvos"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
