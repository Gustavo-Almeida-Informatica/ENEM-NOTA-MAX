import React, { useState } from 'react';
import { Clock, Calendar, Check, BookOpen, AlertCircle, Share2, Copy } from 'lucide-react';
import { EnemArea } from '../types';
import { AREAS } from '../data/areas';

type FocusProfile = 'equilibrado' | 'exatas' | 'humanas_redacao' | 'redacao_intensivo';

interface ProfileConfig {
  id: FocusProfile;
  label: string;
  description: string;
  weights: Record<EnemArea, number>;
  essaysPerWeek: (hours: number) => number;
}

const PROFILES: ProfileConfig[] = [
  {
    id: 'equilibrado',
    label: 'Equilibrado (Geral)',
    description: 'Distribuição proporcional em todas as 5 competências da prova.',
    weights: {
      matematica: 0.26,
      natureza: 0.22,
      redacao: 0.20,
      humanas: 0.18,
      linguagens: 0.14
    },
    essaysPerWeek: (h) => (h >= 15 ? 2 : 1)
  },
  {
    id: 'exatas',
    label: 'Foco em Exatas & Natureza',
    description: 'Prioridade para Matemática e Natureza (maior impacto na nota TRI do 2º dia).',
    weights: {
      matematica: 0.35,
      natureza: 0.30,
      redacao: 0.15,
      humanas: 0.12,
      linguagens: 0.08
    },
    essaysPerWeek: (h) => (h >= 18 ? 2 : 1)
  },
  {
    id: 'humanas_redacao',
    label: 'Foco em Humanas & Redação',
    description: 'Fortalecimento da nota 1000 e da leitura crítica de Humanas e Linguagens.',
    weights: {
      redacao: 0.30,
      humanas: 0.25,
      linguagens: 0.20,
      matematica: 0.15,
      natureza: 0.10
    },
    essaysPerWeek: () => 2
  },
  {
    id: 'redacao_intensivo',
    label: 'Revisão Rápida / Reta Final',
    description: 'Para quem tem poucas horas semanais e quer focar nos pontos mais decisivos.',
    weights: {
      redacao: 0.32,
      matematica: 0.30,
      natureza: 0.16,
      humanas: 0.12,
      linguagens: 0.10
    },
    essaysPerWeek: () => 1
  }
];

export const TimePlanner: React.FC = () => {
  const [weeklyHours, setWeeklyHours] = useState<number>(20);
  const [selectedProfileId, setSelectedProfileId] = useState<FocusProfile>('equilibrado');
  const [copied, setCopied] = useState(false);

  const activeProfile = PROFILES.find((p) => p.id === selectedProfileId) || PROFILES[0];

  // Calculate allocation
  const areaAllocations = (Object.keys(AREAS) as EnemArea[]).map((areaKey) => {
    const area = AREAS[areaKey];
    const weight = activeProfile.weights[areaKey];
    const rawHours = weeklyHours * weight;
    const roundedHours = Math.max(0.5, Math.round(rawHours * 10) / 10);
    return {
      areaKey,
      name: area.shortName,
      color: area.color,
      textColor: area.textColor,
      bgLight: area.bgLight,
      hours: roundedHours,
      percentage: Math.round(weight * 100)
    };
  });

  const essaysCount = activeProfile.essaysPerWeek(weeklyHours);
  const reviewHours = Math.max(1, Math.round(weeklyHours * 0.15 * 10) / 10);

  const handleCopyPlan = () => {
    const text = `Meu Cronograma ENEM Nota Max:\nHoras Semanais: ${weeklyHours}h (${activeProfile.label})\n` +
      areaAllocations.map((a) => `- ${a.name}: ${a.hours}h (${a.percentage}%)`).join('\n') +
      `\n- Redações por semana: ${essaysCount}\n- Horas de Simulado e Análise de Erros: ${reviewHours}h\n` +
      `"Estude menos tempo perdido, mire a nota máxima."`;
    
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-8">
      {/* Title & Slogan */}
      <div>
        <div className="flex items-center gap-2 text-indigo-600 text-xs font-bold uppercase tracking-wider mb-1">
          <Clock className="w-4 h-4" />
          <span>Ferramenta Interativa</span>
        </div>
        <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
          Planejador Inteligente de Horas Semanais
        </h3>
        <p className="text-sm text-slate-600 mt-1 max-w-2xl">
          Informe quanto tempo você tem disponível na semana e o site calcula a divisão matemática ideal por área de conhecimento, priorizando a coerência TRI.
        </p>
      </div>

      {/* Input Slider */}
      <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-4">
        <div className="flex items-center justify-between">
          <label 
            htmlFor="hours-slider" 
            className="text-sm font-bold text-slate-900 flex items-center gap-2"
          >
            <span>Quantas horas você pode estudar por semana?</span>
          </label>
          <div className="flex items-baseline gap-1 bg-white px-3 py-1 rounded-lg border border-slate-200 shadow-2xs font-extrabold text-indigo-600 text-lg tabular-nums">
            <span>{weeklyHours}</span>
            <span className="text-xs text-slate-500 font-medium">horas</span>
          </div>
        </div>

        <input
          id="hours-slider"
          type="range"
          min="4"
          max="45"
          step="1"
          value={weeklyHours}
          onChange={(e) => setWeeklyHours(Number(e.target.value))}
          className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
        />

        <div className="flex justify-between text-[11px] text-slate-600 font-medium px-1">
          <span>4h (Reta final leve)</span>
          <span>15h (Ideal para quem trabalha)</span>
          <span>30h (Dedicado)</span>
          <span>45h (Integral)</span>
        </div>
      </div>

      {/* Profile Selector */}
      <div className="space-y-3">
        <label className="text-sm font-bold text-slate-900 block">
          Escolha seu objetivo ou perfil de estudo:
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
          {PROFILES.map((profile) => {
            const isSelected = selectedProfileId === profile.id;
            return (
              <button
                key={profile.id}
                onClick={() => setSelectedProfileId(profile.id)}
                className={`p-3.5 rounded-xl border text-left transition-all ${
                  isSelected
                    ? 'border-indigo-600 bg-indigo-50/50 shadow-xs'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className={`text-xs font-bold ${isSelected ? 'text-indigo-900' : 'text-slate-900'}`}>
                    {profile.label}
                  </span>
                  {isSelected && <Check className="w-4 h-4 text-indigo-600" />}
                </div>
                <p className="text-[11px] text-slate-500 leading-normal">
                  {profile.description}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Allocation Results */}
      <div className="space-y-4 pt-2">
        <div className="flex items-center justify-between">
          <h4 className="text-base font-bold text-slate-900">
            Divisão Sugerida por Área ({weeklyHours}h / semana)
          </h4>
          <button
            onClick={handleCopyPlan}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 hover:text-indigo-800 bg-indigo-50 hover:bg-indigo-100 px-3 py-1.5 rounded-lg transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Cronograma Copiado!' : 'Copiar Cronograma'}</span>
          </button>
        </div>

        {/* Visual Progress Bar */}
        <div className="h-4 w-full bg-slate-100 rounded-full overflow-hidden flex shadow-inner">
          {areaAllocations.map((item) => (
            <div
              key={item.areaKey}
              style={{
                width: `${item.percentage}%`,
                backgroundColor: item.color
              }}
              title={`${item.name}: ${item.hours}h (${item.percentage}%)`}
              className="h-full transition-all duration-300 hover:opacity-90 cursor-help"
            />
          ))}
        </div>

        {/* Area Cards Breakdown */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 pt-2">
          {areaAllocations.map((item) => (
            <div
              key={item.areaKey}
              className="p-3.5 rounded-xl border border-slate-200/90 bg-white space-y-1.5"
            >
              <div className="flex items-center gap-1.5">
                <span 
                  className="w-2.5 h-2.5 rounded-full shrink-0" 
                  style={{ backgroundColor: item.color }} 
                />
                <span className="text-xs font-bold text-slate-800 truncate">
                  {item.name}
                </span>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-xl font-extrabold text-slate-900 tabular-nums">
                  {item.hours}
                </span>
                <span className="text-xs text-slate-500 font-medium">h/semana</span>
              </div>
              <span className="text-[10px] text-slate-400 block tabular-nums">
                {item.percentage}% do total
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Recommended Strategy Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
        <div className="p-4 rounded-xl bg-rose-50/70 border border-rose-200 text-rose-950 space-y-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-rose-700 block">
            Meta de Redação
          </span>
          <p className="text-base font-extrabold text-rose-900">
            {essaysCount} {essaysCount === 1 ? 'redação cronometrada' : 'redações completas'}/sem
          </p>
          <p className="text-xs text-rose-800/80 leading-relaxed">
            Escreva na folha modelo em até 70 minutos para acostumar a mão e a mente.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200 text-amber-950 space-y-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-amber-700 block">
            Análise de Erros
          </span>
          <p className="text-base font-extrabold text-amber-900">
            {reviewHours}h reservadas/sem
          </p>
          <p className="text-xs text-amber-800/80 leading-relaxed">
            Revise no sábado exatamente as questões que você errou em listas anteriores.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200 text-emerald-950 space-y-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 block">
            Descanso Ativo
          </span>
          <p className="text-base font-extrabold text-emerald-900">
            1 dia livre na semana
          </p>
          <p className="text-xs text-emerald-800/80 leading-relaxed">
            O sono de qualidade consolida as conexões sinápticas da memória de longo prazo.
          </p>
        </div>
      </div>
    </div>
  );
};
