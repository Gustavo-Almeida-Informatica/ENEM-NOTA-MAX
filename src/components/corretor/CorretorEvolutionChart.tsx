import React, { useState } from 'react';
import { TrendingUp, Award, Calendar, ChevronRight, Trash2, BarChart2, BookOpen, AlertCircle } from 'lucide-react';
import { RedacaoHistoryItem, RedacaoAnaliseResultado } from '../../types/corretor';

interface CorretorEvolutionChartProps {
  history: RedacaoHistoryItem[];
  onSelectHistoryItem: (item: RedacaoHistoryItem) => void;
  onClearHistory: () => void;
}

export const CorretorEvolutionChart: React.FC<CorretorEvolutionChartProps> = ({
  history,
  onSelectHistoryItem,
  onClearHistory
}) => {
  const [selectedPointId, setSelectedPointId] = useState<string | null>(null);

  if (history.length === 0) {
    return null;
  }

  // Calculate statistics
  const nonAnuladas = history.filter((h) => !h.anulada);
  const totalCount = history.length;
  const validScores = nonAnuladas.map((h) => h.notaTotal);
  const maxScore = validScores.length > 0 ? Math.max(...validScores) : 0;
  const avgScore = validScores.length > 0 
    ? Math.round(validScores.reduce((a, b) => a + b, 0) / validScores.length) 
    : 0;

  // Chart layout dimensions (SVG)
  const chartHeight = 160;
  const chartWidth = 500;
  const paddingX = 40;
  const paddingY = 25;

  // Take chronological items for trend (reversed since history is newest first)
  const chronological = [...history].reverse();
  const points = chronological.map((item, index) => {
    const x = chronological.length === 1
      ? chartWidth / 2
      : paddingX + (index / (chronological.length - 1)) * (chartWidth - 2 * paddingX);
    const scoreClamped = Math.max(0, Math.min(1000, item.notaTotal));
    const y = chartHeight - paddingY - (scoreClamped / 1000) * (chartHeight - 2 * paddingY);
    return { x, y, item, index };
  });

  const pathD = points.length > 1
    ? points.reduce((acc, curr, idx) => {
        return idx === 0 ? `M ${curr.x} ${curr.y}` : `${acc} L ${curr.x} ${curr.y}`;
      }, '')
    : '';

  const areaD = points.length > 1
    ? `${pathD} L ${points[points.length - 1].x} ${chartHeight - paddingY} L ${points[0].x} ${chartHeight - paddingY} Z`
    : '';

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 p-6 shadow-xs space-y-6 transition-colors">
      {/* Header and Stats */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Histórico & Evolução das Redações
            </h3>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Acompanhe seu desempenho simulado ao longo dos treinos salvos neste navegador.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            if (window.confirm('Deseja realmente limpar todo o histórico de redações salvas?')) {
              onClearHistory();
            }
          }}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:border-rose-300 dark:hover:border-rose-800 transition-colors self-start sm:self-auto"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Limpar histórico</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800">
          <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
            Redações Corrigidas
          </span>
          <span className="text-2xl font-black text-slate-900 dark:text-white mt-1 block">
            {totalCount}
          </span>
        </div>

        <div className="p-3.5 rounded-xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/50">
          <span className="text-[11px] font-semibold text-indigo-700 dark:text-indigo-300 uppercase tracking-wider block">
            Média Geral
          </span>
          <span className="text-2xl font-black text-indigo-900 dark:text-indigo-200 mt-1 block">
            {avgScore} <span className="text-xs font-normal text-indigo-600 dark:text-indigo-400">/ 1000</span>
          </span>
        </div>

        <div className="p-3.5 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-900/50">
          <span className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-300 uppercase tracking-wider block">
            Maior Nota
          </span>
          <span className="text-2xl font-black text-emerald-900 dark:text-emerald-200 mt-1 block">
            {maxScore} <span className="text-xs font-normal text-emerald-600 dark:text-emerald-400">/ 1000</span>
          </span>
        </div>

        <div className="p-3.5 rounded-xl bg-amber-50/70 dark:bg-amber-950/40 border border-amber-100 dark:border-amber-900/50">
          <span className="text-[11px] font-semibold text-amber-700 dark:text-amber-300 uppercase tracking-wider block">
            Último Ensaio
          </span>
          <span className="text-2xl font-black text-amber-900 dark:text-amber-200 mt-1 block">
            {history[0]?.notaTotal ?? 0}
          </span>
        </div>
      </div>

      {/* SVG Interactive Chart */}
      {chronological.length >= 2 ? (
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span className="font-semibold">Curva de Desempenho (0 a 1000):</span>
            <span>Clique nos pontos para visualizar o ensaio</span>
          </div>

          <div className="relative w-full overflow-x-auto bg-slate-50/80 dark:bg-slate-950/60 rounded-xl p-3 border border-slate-200/80 dark:border-slate-800">
            <svg
              viewBox={`0 0 ${chartWidth} ${chartHeight}`}
              className="w-full h-44 overflow-visible"
            >
              <defs>
                <linearGradient id="corretorGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#6366f1" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="#6366f1" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Horizontal Reference Lines */}
              {[200, 400, 600, 800, 1000].map((score) => {
                const y = chartHeight - paddingY - (score / 1000) * (chartHeight - 2 * paddingY);
                return (
                  <g key={score}>
                    <line
                      x1={paddingX}
                      y1={y}
                      x2={chartWidth - paddingX}
                      y2={y}
                      stroke="currentColor"
                      className="text-slate-200 dark:text-slate-800 stroke-[1]"
                      strokeDasharray="4 4"
                    />
                    <text
                      x={paddingX - 8}
                      y={y + 3}
                      textAnchor="end"
                      className="text-[9px] fill-slate-400 dark:fill-slate-500 font-medium"
                    >
                      {score}
                    </text>
                  </g>
                );
              })}

              {/* Area fill */}
              {areaD && (
                <path d={areaD} fill="url(#corretorGradient)" />
              )}

              {/* Line path */}
              {pathD && (
                <path
                  d={pathD}
                  fill="none"
                  stroke="#6366f1"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              )}

              {/* Interactive Points */}
              {points.map((pt) => {
                const isSelected = selectedPointId === pt.item.id;
                const isZero = pt.item.anulada;
                return (
                  <g
                    key={pt.item.id}
                    className="cursor-pointer group"
                    onClick={() => {
                      setSelectedPointId(pt.item.id);
                      onSelectHistoryItem(pt.item);
                    }}
                  >
                    <circle
                      cx={pt.x}
                      cy={pt.y}
                      r={isSelected ? 6 : 4.5}
                      className={
                        isZero
                          ? 'fill-rose-500 stroke-white dark:stroke-slate-900 stroke-2 transition-all'
                          : 'fill-indigo-600 dark:fill-indigo-400 stroke-white dark:stroke-slate-900 stroke-2 transition-all group-hover:r-6'
                      }
                    />
                    {/* Score Label on Top */}
                    <text
                      x={pt.x}
                      y={pt.y - 8}
                      textAnchor="middle"
                      className="text-[10px] font-bold fill-slate-700 dark:fill-slate-200"
                    >
                      {pt.item.notaTotal}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
        </div>
      ) : null}

      {/* History Items List */}
      <div className="space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
          Ensaios Anteriores:
        </span>
        <div className="divide-y divide-slate-100 dark:divide-slate-800 rounded-xl border border-slate-200/90 dark:border-slate-800 overflow-hidden bg-slate-50/40 dark:bg-slate-900/40">
          {history.slice(0, 6).map((item) => (
            <div
              key={item.id}
              onClick={() => onSelectHistoryItem(item)}
              className="p-3.5 flex items-center justify-between gap-3 hover:bg-slate-100/70 dark:hover:bg-slate-800/60 cursor-pointer transition-colors"
            >
              <div className="space-y-0.5 min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400 dark:text-slate-500 font-medium">
                    {item.dataFormatada}
                  </span>
                  {item.anulada && (
                    <span className="px-2 py-0.5 rounded-full bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 text-[10px] font-bold">
                      Anulada
                    </span>
                  )}
                </div>
                <h4 className="text-sm font-semibold text-slate-900 dark:text-white truncate">
                  {item.tema}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">
                  {item.textoPreview}
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <div className="text-right">
                  <span
                    className={`text-base font-extrabold ${
                      item.anulada
                        ? 'text-rose-600 dark:text-rose-400'
                        : item.notaTotal >= 800
                        ? 'text-emerald-600 dark:text-emerald-400'
                        : item.notaTotal >= 600
                        ? 'text-indigo-600 dark:text-indigo-400'
                        : 'text-amber-600 dark:text-amber-400'
                    }`}
                  >
                    {item.notaTotal}
                  </span>
                  <span className="text-[10px] text-slate-400 block font-medium">pontos</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
