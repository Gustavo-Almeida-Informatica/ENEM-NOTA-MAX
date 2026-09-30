import React from 'react';
import { 
  Clock, 
  Layers, 
  Timer, 
  Zap, 
  Calculator, 
  PenTool, 
  Calendar, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight,
  TrendingUp,
  AlertTriangle
} from 'lucide-react';
import { TIME_TIPS } from '../data/timetips';
import { SeoMeta } from '../components/SeoMeta';
import { TimePlanner } from '../components/TimePlanner';

interface TimeTipsPageProps {
  onNavigate: (path: string) => void;
}

const ICON_MAP: Record<string, React.ElementType> = {
  Layers,
  Timer,
  Zap,
  Calculator,
  PenTool,
  Calendar
};

export const TimeTipsPage: React.FC<TimeTipsPageProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16 pb-24">
      <SeoMeta 
        title="Dicas de Tempo & Estratégia de Prova" 
        description="Aprenda a gerenciar o tempo no ENEM: ordem de resolução, regra dos 3 minutos, leitura rápida, cálculo ágil e planejador de estudo semanal." 
      />

      {/* Header Banner */}
      <section className="relative rounded-3xl overflow-hidden bg-slate-900 border border-slate-800 text-white p-6 sm:p-12 shadow-xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-semibold border border-indigo-500/30">
              <Clock className="w-3.5 h-3.5 text-indigo-400" />
              <span>Gestão de Prova e Rotina</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              Estratégia de Tempo & Método TRI
            </h1>

            <p className="text-base text-slate-300 max-w-xl leading-relaxed">
              No ENEM, a velocidade e a coerência pedagógica valem tanto quanto o conhecimento teórico. Descubra como economizar preciosos minutos e não deixar questões fáceis em branco.
            </p>

            <div className="pt-2 flex flex-wrap gap-4 text-xs text-slate-300">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Regra dos 3 minutos por questão
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Redação em 70 minutos
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Cálculo rápido sem calculadora
              </span>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden aspect-16/10 shadow-lg border border-slate-700">
              <img
                src="/src/assets/images/time_management_enem_1790795714726.jpg"
                alt="Gestão de tempo no ENEM com cronômetro, caderno e foco de estudo"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Time Planner Tool */}
      <section id="planejador">
        <TimePlanner />
      </section>

      {/* The 6 Strategy Blocks */}
      <section className="space-y-8">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 block mb-1">
            Manual Tático
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Os 6 Blocos Fundamentais de Gestão de Tempo
          </h2>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl">
            Técnicas consolidadas por especialistas e aprovados em Medicina para aplicar no dia da prova e durante o ano letivo.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {TIME_TIPS.map((tip) => {
            const Icon = ICON_MAP[tip.icon] || Clock;
            return (
              <div
                key={tip.id}
                className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-md transition-shadow flex flex-col justify-between space-y-6"
              >
                <div className="space-y-4">
                  {/* Top Header */}
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 leading-snug">
                        {tip.title}
                      </h3>
                      <p className="text-xs text-indigo-600 font-semibold mt-0.5">
                        {tip.tagline}
                      </p>
                    </div>
                  </div>

                  {/* Summary */}
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {tip.summary}
                  </p>

                  {/* Step-by-Step Tactical Sub-blocks */}
                  <div className="space-y-3 pt-2">
                    {tip.steps.map((step, idx) => (
                      <div 
                        key={idx}
                        className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70 text-xs text-slate-800 space-y-1"
                      >
                        <span className="font-bold text-slate-900 block">
                          {step.heading}
                        </span>
                        <p className="text-slate-600 leading-relaxed">
                          {step.detail}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Golden Rule Footer Callout */}
                <div className="p-3 rounded-xl bg-amber-50/80 border border-amber-200/90 text-xs text-amber-900 flex items-start gap-2">
                  <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block mb-0.5">Regra de Ouro:</span>
                    <span>{tip.enemRuleOfThumb}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
