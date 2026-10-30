import React, { useState } from 'react';
import { 
  Award, 
  AlertCircle, 
  CheckCircle2, 
  ChevronDown, 
  ChevronUp, 
  Copy, 
  Check, 
  RotateCcw, 
  Info, 
  BookOpen, 
  HelpCircle,
  ShieldAlert,
  ArrowRight,
  Sparkles,
  Layers,
  FileText
} from 'lucide-react';
import { RedacaoAnaliseResultado, CompetenceId } from '../../types/corretor';

interface RedacaoResultViewerProps {
  resultado: RedacaoAnaliseResultado;
  onNewCorrection: () => void;
}

const COMPETENCE_COLORS: Record<CompetenceId, {
  badge: string;
  bar: string;
  highlight: string;
  border: string;
  bgLight: string;
}> = {
  C1: {
    badge: 'bg-blue-100 dark:bg-blue-950/70 text-blue-800 dark:text-blue-200 border-blue-200 dark:border-blue-900',
    bar: 'bg-blue-600 dark:bg-blue-500',
    highlight: 'bg-blue-100 dark:bg-blue-950/80 border-b-2 border-blue-500 text-blue-950 dark:text-blue-100',
    border: 'border-blue-200 dark:border-blue-900/60',
    bgLight: 'bg-blue-50/50 dark:bg-blue-950/30'
  },
  C2: {
    badge: 'bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-200 border-emerald-200 dark:border-emerald-900',
    bar: 'bg-emerald-600 dark:bg-emerald-500',
    highlight: 'bg-emerald-100 dark:bg-emerald-950/80 border-b-2 border-emerald-500 text-emerald-950 dark:text-emerald-100',
    border: 'border-emerald-200 dark:border-emerald-900/60',
    bgLight: 'bg-emerald-50/50 dark:bg-emerald-950/30'
  },
  C3: {
    badge: 'bg-purple-100 dark:bg-purple-950/70 text-purple-800 dark:text-purple-200 border-purple-200 dark:border-purple-900',
    bar: 'bg-purple-600 dark:bg-purple-500',
    highlight: 'bg-purple-100 dark:bg-purple-950/80 border-b-2 border-purple-500 text-purple-950 dark:text-purple-100',
    border: 'border-purple-200 dark:border-purple-900/60',
    bgLight: 'bg-purple-50/50 dark:bg-purple-950/30'
  },
  C4: {
    badge: 'bg-amber-100 dark:bg-amber-950/70 text-amber-800 dark:text-amber-200 border-amber-200 dark:border-amber-900',
    bar: 'bg-amber-600 dark:bg-amber-500',
    highlight: 'bg-amber-100 dark:bg-amber-950/80 border-b-2 border-amber-500 text-amber-950 dark:text-amber-100',
    border: 'border-amber-200 dark:border-amber-900/60',
    bgLight: 'bg-amber-50/50 dark:bg-amber-950/30'
  },
  C5: {
    badge: 'bg-rose-100 dark:bg-rose-950/70 text-rose-800 dark:text-rose-200 border-rose-200 dark:border-rose-900',
    bar: 'bg-rose-600 dark:bg-rose-500',
    highlight: 'bg-rose-100 dark:bg-rose-950/80 border-b-2 border-rose-500 text-rose-950 dark:text-rose-100',
    border: 'border-rose-200 dark:border-rose-900/60',
    bgLight: 'bg-rose-50/50 dark:bg-rose-950/30'
  }
};

export const RedacaoResultViewer: React.FC<RedacaoResultViewerProps> = ({
  resultado,
  onNewCorrection
}) => {
  const [copied, setCopied] = useState(false);
  const [selectedCompetenceId, setSelectedCompetenceId] = useState<CompetenceId | 'all'>('all');
  const [activeTrecho, setActiveTrecho] = useState<string | null>(null);

  const { notaTotal, anulacao, competencias, comentarioGeral, tema, texto, avaliadores } = resultado;

  // Rating badge text & styling
  const getRatingInfo = () => {
    if (anulacao.aplica) {
      return {
        label: 'Redação Zerada / Anulada',
        color: 'bg-rose-100 dark:bg-rose-950/80 text-rose-800 dark:text-rose-200 border-rose-300 dark:border-rose-800'
      };
    }
    if (notaTotal >= 920) {
      return {
        label: 'Faixa Nota 1000 (Excelente)',
        color: 'bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-200 border-emerald-300 dark:border-emerald-800'
      };
    }
    if (notaTotal >= 800) {
      return {
        label: 'Muito Bom (Competitivo)',
        color: 'bg-indigo-100 dark:bg-indigo-950/80 text-indigo-800 dark:text-indigo-200 border-indigo-300 dark:border-indigo-800'
      };
    }
    if (notaTotal >= 640) {
      return {
        label: 'Bom (Acima da Média Nacional)',
        color: 'bg-sky-100 dark:bg-sky-950/80 text-sky-800 dark:text-sky-200 border-sky-300 dark:border-sky-800'
      };
    }
    if (notaTotal >= 480) {
      return {
        label: 'Regular (Oportunidades de Ajuste)',
        color: 'bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-200 border-amber-300 dark:border-amber-800'
      };
    }
    return {
      label: 'Abaixo do Esperado',
      color: 'bg-rose-100 dark:bg-rose-950/80 text-rose-800 dark:text-rose-200 border-rose-300 dark:border-rose-800'
    };
  };

  const rating = getRatingInfo();

  // Copy complete report to clipboard
  const handleCopyReport = () => {
    const lines = [
      `=== RELATÓRIO DE CORREÇÃO ENEM NOTA MAX ===`,
      `Tema: ${tema}`,
      `Nota Total: ${notaTotal} / 1000 (${rating.label})`,
      ...(anulacao.aplica ? [`Motivo de Anulação: ${anulacao.motivo}`] : []),
      '',
      `--- NOTAS POR COMPETÊNCIA ---`,
      ...competencias.map(
        (c) => `${c.id} (${c.nome}): ${c.nota} / 200\nJustificativa: ${c.justificativa}\n`
      ),
      `--- DIAGNÓSTICO GERAL ---`,
      comentarioGeral,
      '',
      `* Estimativa por inteligência artificial para treino. Não é a nota oficial do INEP e pode variar.`
    ];

    navigator.clipboard.writeText(lines.join('\n'));
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  // Filtered trechos by selected competence
  const filteredCompetencias = selectedCompetenceId === 'all'
    ? competencias
    : competencias.filter((c) => c.id === selectedCompetenceId);

  // All extracted excerpts
  const allTrechos = competencias.flatMap((c) => 
    c.trechos.map((t) => ({ ...t, compId: c.id }))
  );

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Disclaimer Banner - Fixed & Visible */}
      <div className="p-3.5 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700 flex items-center justify-between gap-3 text-xs text-slate-600 dark:text-slate-300">
        <div className="flex items-center gap-2">
          <Info className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
          <span className="font-semibold">
            Estimativa por inteligência artificial para treino. Não é a nota oficial do INEP e pode variar.
          </span>
        </div>

        <button
          type="button"
          onClick={handleCopyReport}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-xs font-bold text-slate-700 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-300 transition-colors shrink-0"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copied ? 'Copiado!' : 'Copiar Relatório'}</span>
        </button>
      </div>

      {/* Main Score & Evaluators Header Card */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 p-6 sm:p-8 shadow-sm transition-colors space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-100 dark:border-slate-800">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              Tema Avaliado:
            </span>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              {tema}
            </h1>
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className={`px-3 py-1 rounded-full border text-xs font-bold ${rating.color}`}>
                {rating.label}
              </span>
              {avaliadores?.houveDiscrepancia && (
                <span className="px-2.5 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 text-[11px] font-semibold">
                  Discrepância detectada • 3º Avaliador acionado
                </span>
              )}
            </div>
          </div>

          {/* Big Score Display */}
          <div className="text-center md:text-right shrink-0 bg-slate-50 dark:bg-slate-800/50 p-5 rounded-2xl border border-slate-100 dark:border-slate-800">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
              Nota Final Combinada
            </span>
            <div className="flex items-baseline justify-center md:justify-end gap-1 mt-1">
              <span
                className={`text-5xl sm:text-6xl font-black tracking-tight ${
                  anulacao.aplica
                    ? 'text-rose-600 dark:text-rose-400'
                    : notaTotal >= 800
                    ? 'text-emerald-600 dark:text-emerald-400'
                    : notaTotal >= 600
                    ? 'text-indigo-600 dark:text-indigo-400'
                    : 'text-amber-600 dark:text-amber-400'
                }`}
              >
                {notaTotal}
              </span>
              <span className="text-lg font-bold text-slate-400 dark:text-slate-500">/ 1000</span>
            </div>
            <span className="text-[11px] text-slate-400 dark:text-slate-500 block mt-1">
              Média dos 2 corretores independentes
            </span>
          </div>
        </div>

        {/* Anulação Alert Box */}
        {anulacao.aplica && (
          <div className="p-5 rounded-2xl bg-rose-50 dark:bg-rose-950/50 border-2 border-rose-300 dark:border-rose-800 text-rose-950 dark:text-rose-100 space-y-2">
            <div className="flex items-center gap-2 text-rose-700 dark:text-rose-300 font-bold text-sm">
              <ShieldAlert className="w-5 h-5" />
              <span>Redação Anulada pelos Critérios Oficiais do ENEM</span>
            </div>
            <p className="text-xs sm:text-sm text-rose-900/90 dark:text-rose-200 leading-relaxed font-medium">
              <strong>Motivo apontado pela banca:</strong> {anulacao.motivo}
            </p>
          </div>
        )}

        {/* Evaluators Comparison Details */}
        {avaliadores && !anulacao.aplica && (
          <div className="p-4 rounded-xl bg-slate-50/80 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-4">
              <div>
                <span className="text-slate-400 font-medium block">Avaliador 1:</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">
                  {avaliadores.avaliador1.total} pts
                </span>
              </div>
              <div className="h-6 w-px bg-slate-200 dark:bg-slate-700" />
              <div>
                <span className="text-slate-400 font-medium block">Avaliador 2:</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">
                  {avaliadores.avaliador2.total} pts
                </span>
              </div>
              {avaliadores.avaliador3 && (
                <>
                  <div className="h-6 w-px bg-slate-200 dark:bg-slate-700" />
                  <div>
                    <span className="text-amber-500 font-medium block">Avaliador 3 (Desempate):</span>
                    <span className="font-bold text-amber-700 dark:text-amber-300">
                      {avaliadores.avaliador3.total} pts
                    </span>
                  </div>
                </>
              )}
            </div>

            <span className="text-slate-500 dark:text-slate-400 italic text-[11px]">
              Protocolo oficial INEP com arredondamento em múltiplos de 40.
            </span>
          </div>
        )}

        {/* General Pedagogical Comment */}
        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
            Diagnóstico Pedagógico da Banca:
          </span>
          <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed bg-indigo-50/40 dark:bg-indigo-950/20 p-4 rounded-xl border border-indigo-100/80 dark:border-indigo-900/40 font-editorial text-base">
            "{comentarioGeral}"
          </p>
        </div>
      </div>

      {/* 5 Competencies Progress Bars & Cards */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-5">
          <div>
            <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white tracking-tight">
              Desempenho por Competência (0 a 200)
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Cada competência é avaliada em múltiplos de 40: 0, 40, 80, 120, 160 ou 200 pontos.
            </p>
          </div>

          {/* Competence Filter Pills */}
          <div className="flex flex-wrap gap-1">
            <button
              type="button"
              onClick={() => setSelectedCompetenceId('all')}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-colors ${
                selectedCompetenceId === 'all'
                  ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              Todas
            </button>
            {(['C1', 'C2', 'C3', 'C4', 'C5'] as CompetenceId[]).map((cid) => (
              <button
                key={cid}
                type="button"
                onClick={() => setSelectedCompetenceId(cid)}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-colors ${
                  selectedCompetenceId === cid
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                }`}
              >
                {cid}
              </button>
            ))}
          </div>
        </div>

        {/* Competencies List */}
        <div className="space-y-4">
          {filteredCompetencias.map((comp) => {
            const colors = COMPETENCE_COLORS[comp.id as CompetenceId] || COMPETENCE_COLORS.C1;
            const percentage = (comp.nota / 200) * 100;

            return (
              <div
                key={comp.id}
                className={`rounded-2xl border ${colors.border} ${colors.bgLight} p-5 space-y-4 transition-colors`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <span className={`px-2.5 py-1 rounded-lg border text-xs font-extrabold font-mono ${colors.badge}`}>
                      {comp.id}
                    </span>
                    <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                      {comp.nome}
                    </h3>
                  </div>

                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-black text-slate-900 dark:text-white">
                      {comp.nota}
                    </span>
                    <span className="text-xs text-slate-500 font-semibold">/ 200 pts</span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="space-y-1">
                  <div className="w-full h-3 rounded-full bg-slate-200/80 dark:bg-slate-800 overflow-hidden">
                    <div
                      className={`h-full rounded-full ${colors.bar} transition-all duration-500`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[10px] text-slate-400 dark:text-slate-500 font-semibold">
                    <span>0</span>
                    <span>40</span>
                    <span>80</span>
                    <span>120</span>
                    <span>160</span>
                    <span>200</span>
                  </div>
                </div>

                {/* Justification Text */}
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                  {comp.justificativa}
                </p>

                {/* Trechos Identificados */}
                {comp.trechos.length > 0 && (
                  <div className="pt-2 border-t border-slate-200/60 dark:border-slate-800/80 space-y-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
                      Oportunidades de Melhoria no seu Texto:
                    </span>
                    <div className="grid grid-cols-1 gap-2.5">
                      {comp.trechos.map((tr, idx) => (
                        <div
                          key={idx}
                          onClick={() => setActiveTrecho(tr.trecho)}
                          className={`p-3.5 rounded-xl border bg-white dark:bg-slate-900/90 text-xs space-y-2 transition-all cursor-pointer ${
                            activeTrecho === tr.trecho
                              ? 'border-indigo-500 ring-2 ring-indigo-200 dark:ring-indigo-900'
                              : 'border-slate-200 dark:border-slate-800 hover:border-slate-300'
                          }`}
                        >
                          <div className="flex items-start gap-2">
                            <span className="font-bold text-slate-400">Trecho:</span>
                            <blockquote className="italic font-editorial text-slate-900 dark:text-slate-100 bg-slate-50 dark:bg-slate-800 px-2 py-0.5 rounded border border-slate-200/60 dark:border-slate-700 flex-1">
                              "{tr.trecho}"
                            </blockquote>
                          </div>

                          <div className="text-slate-600 dark:text-slate-400">
                            <strong className="text-rose-600 dark:text-rose-400 mr-1">Desvio:</strong>
                            {tr.problema}
                          </div>

                          <div className="text-slate-700 dark:text-slate-300 bg-emerald-50/60 dark:bg-emerald-950/30 p-2 rounded-lg border border-emerald-100 dark:border-emerald-900/50">
                            <strong className="text-emerald-700 dark:text-emerald-300 mr-1">Sugestão de Reescrita:</strong>
                            {tr.sugestao}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Interactive Text Display with Highlighted Excerpts */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              <h2 className="text-lg font-black text-slate-900 dark:text-white">
                Texto Completo com Destaques
              </h2>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Os trechos com observações da banca estão sublinhados por competência.
            </p>
          </div>

          {/* Color Legend */}
          <div className="flex flex-wrap items-center gap-2 text-[11px] font-bold">
            <span className="flex items-center gap-1 text-blue-600 dark:text-blue-400">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500" /> C1 (Gramática)
            </span>
            <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> C2 (Repertório)
            </span>
            <span className="flex items-center gap-1 text-purple-600 dark:text-purple-400">
              <span className="w-2.5 h-2.5 rounded-full bg-purple-500" /> C3 (Argumentação)
            </span>
            <span className="flex items-center gap-1 text-amber-600 dark:text-amber-400">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> C4 (Coesão)
            </span>
            <span className="flex items-center gap-1 text-rose-600 dark:text-rose-400">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500" /> C5 (Intervenção)
            </span>
          </div>
        </div>

        {/* Render Text with Highlighted Excerpts */}
        <div className="p-6 rounded-2xl bg-slate-50/60 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 font-editorial text-base sm:text-lg leading-relaxed whitespace-pre-wrap">
          {texto}
        </div>
      </div>

      {/* Bottom Sticky Action Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm">
        <div className="text-xs text-slate-500 dark:text-slate-400">
          Ensaio salvo automaticamente no histórico deste navegador.
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            type="button"
            onClick={handleCopyReport}
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold text-xs transition-colors"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Copiado!' : 'Copiar Relatório'}</span>
          </button>

          <button
            type="button"
            onClick={onNewCorrection}
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-bold text-xs shadow-md transition-all"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Nova Correção</span>
          </button>
        </div>
      </div>
    </div>
  );
};
