import React, { useState, useMemo, useRef, useEffect } from 'react';
import { 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  Eye, 
  Edit3, 
  AlertTriangle, 
  Check, 
  ArrowLeft, 
  ArrowRight, 
  Sparkles, 
  Layers, 
  FileText,
  HelpCircle,
  CheckCircle2,
  RefreshCw
} from 'lucide-react';
import { UploadedImage } from '../../types/corretor';

interface TranscriptionReviewerProps {
  images: UploadedImage[];
  texto: string;
  onUpdateTexto: (novoTexto: string) => void;
  onConfirmAnalysis: () => void;
  onBack: () => void;
  isAnalyzing?: boolean;
}

export const TranscriptionReviewer: React.FC<TranscriptionReviewerProps> = ({
  images,
  texto,
  onUpdateTexto,
  onConfirmAnalysis,
  onBack,
  isAnalyzing = false
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [mobileTab, setMobileTab] = useState<'foto' | 'texto'>(images.length > 0 ? 'texto' : 'texto');
  const [editingWord, setEditingWord] = useState<string | null>(null);
  const [replacementWord, setReplacementWord] = useState<string>('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Exibe um esqueleto com shimmer por até 400ms ao entrar na tela para evitar pulos de layout
  const [isSkeletonVisible, setIsSkeletonVisible] = useState(true);

  useEffect(() => {
    // Timer de 380ms para suavizar a transição do OCR para a área de edição
    const timer = setTimeout(() => {
      setIsSkeletonVisible(false);
    }, 380);
    return () => clearTimeout(timer);
  }, []);

  const activeImage = images[activeImageIndex] || images[0];

  // Scan for [?...?] doubtful words
  const doubtfulWords = useMemo(() => {
    const regex = /\[\?(.*?)\?\]/g;
    const matches: string[] = [];
    let match;
    while ((match = regex.exec(texto)) !== null) {
      matches.push(match[0]);
    }
    return Array.from(new Set(matches));
  }, [texto]);

  // Line counter calculation
  // Real ENEM handwritten sheet has ~60-70 characters per line.
  // We calculate both newline breaks and simulated wrapped lines.
  const stats = useMemo(() => {
    const rawLines = texto.split('\n');
    const totalWords = texto.trim().split(/\s+/).filter(Boolean).length;

    // Estimate lines based on standard paragraph breaks & line wraps
    let estimatedLines = 0;
    for (const line of rawLines) {
      if (line.trim().length === 0) {
        estimatedLines += 1;
      } else {
        // Average handwritten line: 65 chars
        estimatedLines += Math.max(1, Math.ceil(line.length / 65));
      }
    }

    return {
      lineCount: estimatedLines,
      wordCount: totalWords,
      isUnderLimit: estimatedLines < 7,
      isOverLimit: estimatedLines > 30
    };
  }, [texto]);

  // Quick word confirmation / replacement
  const handleReplaceDoubtfulWord = (targetPattern: string, replacement: string) => {
    const cleanReplacement = replacement.replace(/^\[\?|\?\]$/g, '').trim();
    const updated = texto.split(targetPattern).join(cleanReplacement);
    onUpdateTexto(updated);
    setEditingWord(null);
    setReplacementWord('');
  };

  const handleConfirmAsWritten = (targetPattern: string) => {
    // Strip [? and ?] leaving word as is
    const innerWord = targetPattern.slice(2, -2).trim();
    const updated = texto.split(targetPattern).join(innerWord);
    onUpdateTexto(updated);
  };

  // Se o esqueleto estiver ativo (primeiros ~380ms), renderiza o layout com efeito shimmer
  if (isSkeletonVisible) {
    return (
      <div className="space-y-6" role="status" aria-live="polite" aria-busy="true">
        {/* Esqueleto do cabeçalho */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 p-5 shadow-xs relative overflow-hidden">
          <div className="space-y-3">
            <div className="w-48 h-5 bg-slate-200 dark:bg-slate-800 rounded-full animate-shimmer" />
            <div className="w-80 h-7 bg-slate-200 dark:bg-slate-800 rounded-lg animate-shimmer" />
            <div className="w-full max-w-lg h-4 bg-slate-100 dark:bg-slate-800/60 rounded animate-shimmer" />
          </div>
        </div>

        {/* Esqueleto das duas colunas com altura reservada para evitar pulos de layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 min-h-[500px]">
          {images.length > 0 && (
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 p-5 shadow-xs flex flex-col justify-between relative overflow-hidden">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                <div className="w-36 h-4 bg-slate-200 dark:bg-slate-800 rounded animate-shimmer" />
                <div className="w-24 h-6 bg-slate-100 dark:bg-slate-800 rounded animate-shimmer" />
              </div>
              <div className="h-[430px] rounded-xl bg-slate-100 dark:bg-slate-800/80 my-2 animate-shimmer" />
              <div className="w-full h-8 bg-slate-100 dark:bg-slate-800 rounded animate-shimmer" />
            </div>
          )}

          <div className={`${images.length === 0 ? 'lg:col-span-2' : ''} bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 p-5 shadow-xs space-y-4 relative overflow-hidden`}>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="w-48 h-4 bg-slate-200 dark:bg-slate-800 rounded animate-shimmer" />
              <div className="w-40 h-4 bg-slate-100 dark:bg-slate-800 rounded animate-shimmer" />
            </div>
            <div className="h-[430px] rounded-xl bg-slate-100 dark:bg-slate-800/80 space-y-3 p-4 animate-shimmer">
              <div className="w-3/4 h-3 bg-slate-200 dark:bg-slate-700/60 rounded" />
              <div className="w-full h-3 bg-slate-200 dark:bg-slate-700/60 rounded" />
              <div className="w-5/6 h-3 bg-slate-200 dark:bg-slate-700/60 rounded" />
              <div className="w-2/3 h-3 bg-slate-200 dark:bg-slate-700/60 rounded" />
            </div>
          </div>
        </div>

        {/* Esqueleto dos botões de rodapé */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-800">
          <div className="w-36 h-11 bg-slate-200 dark:bg-slate-800 rounded-xl animate-shimmer" />
          <div className="w-64 h-11 bg-slate-200 dark:bg-slate-800 rounded-xl animate-shimmer" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header Info Banner */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 p-5 shadow-xs transition-colors">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 text-xs font-semibold">
              <Edit3 className="w-3.5 h-3.5" />
              <span>Etapa 3 de 4 • Revisão da Digitalização</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white mt-1.5 tracking-tight">
              Revise e Ajuste o Texto da Redação
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              {images.length > 0
                ? 'Compare a transcrição automática com a folha manuscrita original. Corrija palavras marcadas ou edite qualquer trecho antes da avaliação oficial.'
                : 'Revise o texto digitado antes de submeter para a banca examinadora do ENEM Nota Max.'}
            </p>
          </div>

          {/* Quick Metrics Badges */}
          <div className="flex flex-wrap items-center gap-2">
            <div className={`px-3 py-1.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 ${
              stats.isUnderLimit
                ? 'bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-900/60 text-rose-700 dark:text-rose-300'
                : stats.isOverLimit
                ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-900/60 text-amber-700 dark:text-amber-300'
                : 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-900/60 text-emerald-700 dark:text-emerald-300'
            }`}>
              <FileText className="w-3.5 h-3.5" />
              <span>~{stats.lineCount} linhas estimadas</span>
            </div>

            <div className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold">
              <span>{stats.wordCount} palavras</span>
            </div>
          </div>
        </div>
      </div>

      {/* Warnings Banner if line limits reached */}
      {stats.isUnderLimit && (
        <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 text-xs text-rose-900 dark:text-rose-200 flex items-start gap-3">
          <AlertTriangle className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold block">Atenção: Menos de 7 linhas estimadas</span>
            <p className="mt-0.5 leading-relaxed">
              O edital oficial do ENEM determina <strong>nota 0 imediata</strong> (anulação) para redações com 7 linhas ou menos. Certifique-se de que a transcrição contém todo o seu texto.
            </p>
          </div>
        </div>
      )}

      {stats.isOverLimit && (
        <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 text-xs text-amber-900 dark:text-amber-200 flex items-start gap-3">
          <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold block">Atenção: Mais de 30 linhas estimadas</span>
            <p className="mt-0.5 leading-relaxed">
              A folha oficial de redação do ENEM comporta no máximo 30 linhas. Qualquer linha escrita além desse limite é desconsiderada pelos corretores.
            </p>
          </div>
        </div>
      )}

      {/* Doubtful Words Yellow Alert Bar */}
      {doubtfulWords.length > 0 && (
        <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 text-xs text-amber-950 dark:text-amber-200 space-y-3">
          <div className="flex items-center gap-2 font-bold text-amber-900 dark:text-amber-100">
            <HelpCircle className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            <span>
              Identificamos {doubtfulWords.length} termo(s) com caligrafia duvidosa marcados como <code className="bg-amber-200/70 dark:bg-amber-900/70 px-1 py-0.5 rounded text-amber-900 dark:text-amber-100 font-mono">[?...?]</code>:
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {doubtfulWords.map((word) => {
              const inner = word.slice(2, -2);
              return (
                <div
                  key={word}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-100 dark:bg-amber-900/60 border border-amber-300 dark:border-amber-700/60 text-amber-950 dark:text-amber-100 text-xs"
                >
                  <span className="font-mono font-bold text-amber-900 dark:text-amber-200">{word}</span>
                  <button
                    type="button"
                    onClick={() => {
                      setEditingWord(word);
                      setReplacementWord(inner);
                    }}
                    className="hover:underline font-semibold text-indigo-700 dark:text-indigo-300 text-[11px]"
                  >
                    Editar
                  </button>
                  <span className="text-amber-400 dark:text-amber-600">•</span>
                  <button
                    type="button"
                    onClick={() => handleConfirmAsWritten(word)}
                    title="Confirmar esta palavra sem o marcador"
                    className="hover:text-emerald-700 dark:hover:text-emerald-300"
                  >
                    <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  </button>
                </div>
              );
            })}
          </div>

          {/* Quick inline edit modal/drawer */}
          {editingWord && (
            <div className="p-3 bg-white dark:bg-slate-900 rounded-lg border border-amber-300 dark:border-amber-700 flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Corrigir {editingWord} para:
              </span>
              <input
                type="text"
                value={replacementWord}
                onChange={(e) => setReplacementWord(e.target.value)}
                className="px-2.5 py-1 rounded-md border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-medium text-slate-900 dark:text-white"
                autoFocus
              />
              <button
                type="button"
                onClick={() => handleReplaceDoubtfulWord(editingWord, replacementWord)}
                className="px-3 py-1 rounded-md bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-colors"
              >
                Salvar Palavra
              </button>
              <button
                type="button"
                onClick={() => setEditingWord(null)}
                className="px-2 py-1 text-xs text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
              >
                Cancelar
              </button>
            </div>
          )}
        </div>
      )}

      {/* Mobile Tab Switcher */}
      {images.length > 0 && (
        <div className="flex lg:hidden rounded-xl bg-slate-100 dark:bg-slate-800 p-1 border border-slate-200 dark:border-slate-700">
          <button
            type="button"
            onClick={() => setMobileTab('foto')}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-2 ${
              mobileTab === 'foto'
                ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Foto Original ({images.length})</span>
          </button>
          <button
            type="button"
            onClick={() => setMobileTab('texto')}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-2 ${
              mobileTab === 'texto'
                ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Texto Digitalizado</span>
          </button>
        </div>
      )}

      {/* Split Screen Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        {/* Left Column: Image Viewer with Zoom (visible on desktop or when mobileTab === 'foto') */}
        {images.length > 0 && (
          <div className={`${mobileTab === 'foto' ? 'block' : 'hidden lg:block'} space-y-3`}>
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 p-4 shadow-xs space-y-3">
              {/* Photo Controls Bar */}
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Foto Manuscrita:
                  </span>
                  {images.length > 1 && (
                    <div className="flex gap-1 ml-1">
                      {images.map((img, idx) => (
                        <button
                          key={img.id}
                          type="button"
                          onClick={() => {
                            setActiveImageIndex(idx);
                            setZoomLevel(1);
                          }}
                          className={`px-2 py-0.5 rounded text-[11px] font-bold transition-colors ${
                            activeImageIndex === idx
                              ? 'bg-indigo-600 text-white'
                              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
                          }`}
                        >
                          Pág. {idx + 1}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Zoom Controls */}
                <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800/80 rounded-lg p-1">
                  <button
                    type="button"
                    onClick={() => setZoomLevel((z) => Math.max(0.6, z - 0.2))}
                    title="Diminuir Zoom"
                    className="p-1 rounded hover:bg-white dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors"
                  >
                    <ZoomOut className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-[11px] font-mono font-bold text-slate-600 dark:text-slate-300 px-1">
                    {Math.round(zoomLevel * 100)}%
                  </span>
                  <button
                    type="button"
                    onClick={() => setZoomLevel((z) => Math.min(2.5, z + 0.2))}
                    title="Aumentar Zoom"
                    className="p-1 rounded hover:bg-white dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors"
                  >
                    <ZoomIn className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setZoomLevel(1)}
                    title="Redefinir Zoom (100%)"
                    className="p-1 rounded hover:bg-white dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Scrollable Viewport with Image */}
              <div className="relative w-full h-[540px] overflow-auto rounded-xl bg-slate-950/90 dark:bg-slate-950 flex items-start justify-center p-3 border border-slate-200/50 dark:border-slate-800 cursor-grab active:cursor-grabbing">
                {activeImage && (
                  <img
                    src={activeImage.dataUrl}
                    alt={activeImage.name || 'Folha de redação manuscrita'}
                    style={{
                      transform: `scale(${zoomLevel})`,
                      transformOrigin: 'top center',
                      transition: 'transform 0.15s ease-out'
                    }}
                    className="max-w-full object-contain rounded shadow-lg select-none"
                  />
                )}
              </div>
            </div>
          </div>
        )}

        {/* Right Column: Editable Textarea (full width if no images, or side by side) */}
        <div className={`${images.length === 0 ? 'lg:col-span-2' : ''} ${images.length > 0 && mobileTab === 'foto' ? 'hidden lg:block' : 'block'} space-y-3`}>
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Edit3 className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                  Texto da Redação (Editável):
                </label>
              </div>

              <span className="text-[11px] text-slate-400 font-medium">
                Você pode corrigir pontuação, parágrafos ou palavras
              </span>
            </div>

            <textarea
              ref={textareaRef}
              rows={20}
              value={texto}
              onChange={(e) => onUpdateTexto(e.target.value)}
              placeholder="O texto transcrito ou digitado da sua redação aparecerá aqui..."
              className="w-full h-[470px] p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/60 dark:bg-slate-950/60 text-slate-900 dark:text-slate-100 text-sm leading-relaxed font-sans focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none font-editorial text-base"
            />

            <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500 dark:text-slate-400 pt-1">
              <span>
                Dica: Destaques em <span className="bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-200 px-1 py-0.5 rounded font-mono font-bold">[?...?]</span> indicam termos que a IA achou difíceis de ler.
              </span>
              <button
                type="button"
                onClick={() => {
                  // Clean all [? and ?] markers in one click
                  const cleaned = texto.replace(/\[\?(.*?)\?\]/g, '$1');
                  onUpdateTexto(cleaned);
                }}
                className="text-indigo-600 dark:text-indigo-400 hover:underline font-semibold"
              >
                Limpar todos os marcadores [?...?]
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Action Footer Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-200 dark:border-slate-800">
        <button
          type="button"
          onClick={onBack}
          disabled={isAnalyzing}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold text-xs transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Voltar ao Envio</span>
        </button>

        <button
          type="button"
          onClick={onConfirmAnalysis}
          disabled={isAnalyzing || !texto.trim()}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 disabled:opacity-50 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all"
        >
          {isAnalyzing ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>Enviando para análise...</span>
            </>
          ) : (
            <>
              <CheckCircle2 className="w-4 h-4" />
              <span>Está tudo certo, analisar redação</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};
