// Central da Reta Final — ENEM 2026
// Plataforma interativa com Planejamento Adaptativo Inteligente, cálculo automático no fuso de Brasília,
// preservação de progresso via localStorage, simulado de 5 alternativas com correção instantânea
// e modo especial do Dia da Prova.
import React, { useState, useEffect, useMemo } from 'react';
import { 
  Calendar, 
  Clock, 
  CheckCircle2, 
  Circle,
  AlertCircle, 
  PenTool, 
  Network, 
  BookOpen, 
  ArrowLeft, 
  Sparkles,
  Flame,
  ShieldCheck,
  Check,
  RotateCcw,
  BookMarked,
  Layers,
  ChevronRight,
  ChevronDown,
  Trophy,
  ExternalLink,
  Target,
  FileCheck,
  CalendarDays,
  HeartHandshake,
  Coffee
} from 'lucide-react';
import { getBrasiliaDateString, ENEM_2026_DATAS } from '../utils/enemCountdown';
import { 
  generateAdaptivePlan, 
  loadAdaptiveProgress, 
  saveAdaptiveProgress, 
  AdaptiveTask,
  AdaptiveModality
} from '../utils/adaptivePlanner';
import { 
  LINGUAGENS_CONTENT, 
  HUMANAS_CONTENT, 
  REDACAO_CONTENT, 
  MATEMATICA_CONTENT, 
  NATUREZA_CONTENT, 
  SIMULADO_QUESTIONS,
  ContentTopicItem,
  SimuladoQuestion
} from '../data/retaFinalData';

interface RetaFinalPageProps {
  onNavigate: (path: string) => void;
}

export const RetaFinalPage: React.FC<RetaFinalPageProps> = ({ onNavigate }) => {
  // Simulação de data para testes dinâmicos (permite testar 02/11 até 16/11 sem alterar o relógio)
  const [simulatedDate, setSimulatedDate] = useState<string | undefined>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      return params.get('simularData') || params.get('dataSimulada') || undefined;
    }
    return undefined;
  });

  // Fuso horário oficial: Brasília (America/Sao_Paulo) com auto-atualização contínua
  const [liveDate, setLiveDate] = useState(() => getBrasiliaDateString());

  useEffect(() => {
    const checkLiveDate = () => {
      const now = getBrasiliaDateString();
      setLiveDate(prev => prev !== now ? now : prev);
    };
    // Checa a cada 30 segundos
    const interval = setInterval(checkLiveDate, 30000);
    // Checa também ao alternar ou voltar para a aba
    const handleVisibility = () => {
      if (document.visibilityState === 'visible') checkLiveDate();
    };
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      clearInterval(interval);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, []);

  // Data atual de referência (simulada para testes ou data viva de Brasília)
  const effectiveCurrentDate = simulatedDate || liveDate;

  // Seleção manual de dia de estudo (durante a vigência da campanha do ENEM 2026)
  const [selectedDayOverride, setSelectedDayOverride] = useState<'dia1' | 'dia2' | null>(null);

  // Estado dedicado exclusivamente à consulta histórica após o encerramento da campanha (16/11 em diante)
  // Permite consultar os resumos e revisar gabaritos sem alterar o plano ou reativar modo de prova
  const [consultationStage, setConsultationStage] = useState<'dia1' | 'dia2'>('dia1');

  // Gera o plano adaptativo inteligente recalculado automaticamente sempre que a data mudar.
  // Se a data for posterior ao 2º dia (15/11/2026), a campanha está encerrada; forcarDia é desconsiderado.
  const plan = useMemo(() => {
    const isPastCampaign = effectiveCurrentDate > ENEM_2026_DATAS.dia2;
    return generateAdaptivePlan(
      effectiveCurrentDate, 
      isPastCampaign ? undefined : (selectedDayOverride || undefined)
    );
  }, [effectiveCurrentDate, selectedDayOverride]);

  // Etapa ativa para exibição de conteúdo:
  // Se a campanha estiver encerrada (plan.isEncerrado === true), utiliza rigorosamente o consultationStage,
  // garantindo que seleções de abas históricas jamais alterem a etapa ativa do cronograma adaptativo.
  const activeExamStage: 'dia1' | 'dia2' = plan.isEncerrado
    ? consultationStage
    : (selectedDayOverride || (plan.stage === 'dia2' ? 'dia2' : 'dia1'));

  // Aba ativa nas 4 áreas do 1º Dia
  const [activeTabDia1, setActiveTabDia1] = useState<'linguagens' | 'humanas' | 'redacao' | 'simulado'>('linguagens');

  // Aba ativa no 2º Dia
  const [activeTabDia2, setActiveTabDia2] = useState<'matematica' | 'natureza' | 'simulado'>('matematica');

  // Estado de tópicos expandidos para leitura rápida
  const [expandedTopicId, setExpandedTopicId] = useState<string | null>(null);

  // Barra de simulação recolhível
  const [showSimBar, setShowSimBar] = useState(false);

  // ==========================================
  // PROGRESSO REAL ADAPTATIVO (localStorage)
  // ==========================================
  const [progressState, setProgressState] = useState(() => loadAdaptiveProgress());

  // Salva no localStorage quando atividades mudarem (somente durante a campanha ativa)
  useEffect(() => {
    if (plan.isEncerrado) return; // NUNCA altera histórico no Modo de Consulta Histórica
    saveAdaptiveProgress(progressState.completedTaskIds, plan.modality, effectiveCurrentDate);
  }, [progressState.completedTaskIds, plan.modality, effectiveCurrentDate, plan.isEncerrado]);

  // Alterna status de conclusão de uma tarefa adaptativa (somente durante a campanha ativa)
  const toggleTask = (taskId: string) => {
    if (plan.isEncerrado) return; // Bloqueado no Modo de Consulta Histórica
    setProgressState(prev => {
      const exists = prev.completedTaskIds.includes(taskId);
      const nextIds = exists 
        ? prev.completedTaskIds.filter(id => id !== taskId) 
        : [...prev.completedTaskIds, taskId];
      return {
        ...prev,
        completedTaskIds: nextIds,
      };
    });
  };

  // ==========================================
  // ESTADO DO SIMULADO INTERATIVO (INDIVIDUAL E ISOLADO POR ETAPA)
  // ==========================================
  const currentSimuladoQuestions = SIMULADO_QUESTIONS.filter(q => q.dayType === activeExamStage);
  
  // Respostas independentes do 1º Dia (exclusivo 'enem2026_simulado_answers_dia1')
  const [simuladoAnswersDia1, setSimuladoAnswersDia1] = useState<Record<string, 'A' | 'B' | 'C' | 'D' | 'E'>>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('enem2026_simulado_answers_dia1');
        return saved ? JSON.parse(saved) : {};
      } catch {
        return {};
      }
    }
    return {};
  });

  // Respostas independentes do 2º Dia (exclusivo 'enem2026_simulado_answers_dia2')
  const [simuladoAnswersDia2, setSimuladoAnswersDia2] = useState<Record<string, 'A' | 'B' | 'C' | 'D' | 'E'>>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('enem2026_simulado_answers_dia2');
        return saved ? JSON.parse(saved) : {};
      } catch {
        return {};
      }
    }
    return {};
  });

  // Salva respostas do 1º Dia exclusivamente em enem2026_simulado_answers_dia1 (apenas durante a campanha)
  useEffect(() => {
    if (plan.isEncerrado) return; // NUNCA grava ou sobrescreve no Modo de Consulta Histórica
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('enem2026_simulado_answers_dia1', JSON.stringify(simuladoAnswersDia1));
      } catch (_) {}
    }
  }, [simuladoAnswersDia1, plan.isEncerrado]);

  // Salva respostas do 2º Dia exclusivamente em enem2026_simulado_answers_dia2 (apenas durante a campanha)
  useEffect(() => {
    if (plan.isEncerrado) return; // NUNCA grava ou sobrescreve no Modo de Consulta Histórica
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('enem2026_simulado_answers_dia2', JSON.stringify(simuladoAnswersDia2));
      } catch (_) {}
    }
  }, [simuladoAnswersDia2, plan.isEncerrado]);

  // Respostas ativas da etapa atualmente selecionada
  const userAnswers = activeExamStage === 'dia1' ? simuladoAnswersDia1 : simuladoAnswersDia2;

  // Seleção de resposta: atualiza exclusivamente a etapa ativa sem afetar a outra (bloqueado no modo histórico)
  const handleSelectAnswer = (questionId: string, optionLetter: 'A' | 'B' | 'C' | 'D' | 'E') => {
    if (plan.isEncerrado) return; // Impossível alterar respostas no Modo de Consulta Histórica
    if (activeExamStage === 'dia1') {
      setSimuladoAnswersDia1(prev => ({
        ...prev,
        [questionId]: optionLetter
      }));
    } else {
      setSimuladoAnswersDia2(prev => ({
        ...prev,
        [questionId]: optionLetter
      }));
    }
  };

  // Reiniciar simulado: apaga SOMENTE as respostas da etapa atualmente selecionada (bloqueado no modo histórico)
  const resetSimulado = () => {
    if (plan.isEncerrado) return; // Impossível reiniciar no Modo de Consulta Histórica
    if (activeExamStage === 'dia1') {
      setSimuladoAnswersDia1({});
      if (typeof window !== 'undefined') {
        localStorage.removeItem('enem2026_simulado_answers_dia1');
      }
    } else {
      setSimuladoAnswersDia2({});
      if (typeof window !== 'undefined') {
        localStorage.removeItem('enem2026_simulado_answers_dia2');
      }
    }
  };

  // ==========================================
  // CÁLCULO DE PROGRESSO GERAL DO PLANO
  // ==========================================
  const allCurrentTasks = plan.allTasks;
  const totalTasksCount = allCurrentTasks.length;
  const completedTasksCount = allCurrentTasks.filter(t => progressState.completedTaskIds.includes(t.id)).length;
  const planProgressPercent = totalTasksCount > 0 ? Math.round((completedTasksCount / totalTasksCount) * 100) : 0;

  // Perguntas respondidas no simulado atual
  const answeredQuestionsCount = currentSimuladoQuestions.filter(q => userAnswers[q.id] !== undefined).length;
  const correctAnswersCount = currentSimuladoQuestions.filter(q => userAnswers[q.id] === q.correctAnswer).length;

  const scrollToPlano = () => {
    const el = document.getElementById('cronograma-adaptativo');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleResetAllProgress = () => {
    if (plan.isEncerrado) return; // Bloqueado no Modo de Consulta Histórica
    if (confirm('Deseja realmente reiniciar todo o histórico de atividades adaptativas e simulados?')) {
      setProgressState({
        completedTaskIds: [],
        lastAccessDate: effectiveCurrentDate,
        history: [],
      });
      setSimuladoAnswersDia1({});
      setSimuladoAnswersDia2({});
      if (typeof window !== 'undefined') {
        localStorage.removeItem('enem2026_adaptive_completed_tasks');
        localStorage.removeItem('enem2026_completed_missions');
        localStorage.removeItem('enem2026_simulado_answers_dia1');
        localStorage.removeItem('enem2026_simulado_answers_dia2');
      }
    }
  };

  // Cores do Badge de Modalidade
  const getModalityBadgeStyle = (mod: AdaptiveModality) => {
    switch (mod) {
      case 'completa':
        return 'bg-emerald-500/20 text-emerald-300 border-emerald-400/40';
      case 'intensiva':
        return 'bg-amber-500/20 text-amber-300 border-amber-400/40';
      case 'expressa':
        return 'bg-rose-500/20 text-rose-300 border-rose-400/40';
      case 'dia_da_prova':
        return 'bg-purple-500/20 text-purple-200 border-purple-400/40 animate-pulse';
      case 'encerrado':
      default:
        return 'bg-slate-500/20 text-slate-300 border-slate-400/40';
    }
  };

  return (
    <div className="py-6 sm:py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8 animate-fade-in font-sans">
      
      {/* Barra de Topo com Navegação e Tag Especial */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-200/80 dark:border-slate-800 pb-4">
        <button
          onClick={() => onNavigate('/')}
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Voltar ao Mural Geral</span>
        </button>

        <div className="flex items-center gap-2 flex-wrap">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-100 dark:bg-amber-950/70 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
            CENTRAL DA RETA FINAL — ENEM 2026
          </span>

          {/* Botão de abrir/fechar simulador de datas */}
          <button
            type="button"
            onClick={() => setShowSimBar(prev => !prev)}
            className="text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-300 px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 transition-colors flex items-center gap-1 cursor-pointer"
            title="Simular datas de acesso para verificar a adaptação automática"
          >
            <CalendarDays className="w-3.5 h-3.5" />
            <span>{showSimBar ? 'Ocultar Simulador' : 'Simular Datas'}</span>
          </button>
        </div>
      </div>

      {/* BARRA DE TESTE E SIMULAÇÃO DE DATAS */}
      {showSimBar && (
        <section className="p-4 sm:p-5 rounded-2xl bg-slate-900 text-white border border-indigo-500/40 shadow-lg space-y-3 animate-fade-in text-xs">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
              <span className="font-bold uppercase tracking-wider text-amber-300">
                Simulador de Testes — Sistema Adaptativo ENEM 2026
              </span>
            </div>
            <span className="text-slate-400">
              Data Simula Ativa: <strong className="text-white">{effectiveCurrentDate}</strong> (Fuso de Brasília)
            </span>
          </div>

          <p className="text-slate-300 text-xs">
            Clique em uma das datas abaixo para testar instantaneamente a transição entre <strong>Preparação Completa</strong>, <strong>Intensiva</strong>, <strong>Expressa</strong> e <strong>Dia da Prova</strong>:
          </p>

          <div className="flex flex-wrap gap-2 pt-1">
            {/* 1º DIA */}
            <span className="text-[11px] font-bold text-indigo-300 self-center mr-1">1º DIA:</span>
            {[
              { d: '2026-11-02', label: '02/11 (6d - 6 bl.)' },
              { d: '2026-11-03', label: '03/11 (5d - 5 bl.)' },
              { d: '2026-11-04', label: '04/11 (4d - 4 bl.)' },
              { d: '2026-11-05', label: '05/11 (3d - 3 bl.)' },
              { d: '2026-11-06', label: '06/11 (2d - 2 bl.)' },
              { d: '2026-11-07', label: '07/11 (1d - 1 bl.)' },
              { d: '2026-11-08', label: '08/11 (0d - Prova 1)' },
            ].map(item => (
              <button
                key={item.d}
                type="button"
                onClick={() => setSimulatedDate(item.d)}
                className={`px-2.5 py-1 rounded-lg border text-xs font-semibold transition-all cursor-pointer ${
                  simulatedDate === item.d
                    ? 'bg-amber-400 text-slate-950 border-amber-300 font-bold shadow-xs'
                    : 'bg-white/10 hover:bg-white/20 text-slate-200 border-white/15'
                }`}
              >
                {item.label}
              </button>
            ))}

            {/* 2º DIA */}
            <span className="text-[11px] font-bold text-sky-300 self-center ml-2 mr-1">2º DIA:</span>
            {[
              { d: '2026-11-09', label: '09/11 (6d - 6 bl.)' },
              { d: '2026-11-10', label: '10/11 (5d - 5 bl.)' },
              { d: '2026-11-11', label: '11/11 (4d - 4 bl.)' },
              { d: '2026-11-12', label: '12/11 (3d - 3 bl.)' },
              { d: '2026-11-13', label: '13/11 (2d - 2 bl.)' },
              { d: '2026-11-14', label: '14/11 (1d - 1 bl.)' },
              { d: '2026-11-15', label: '15/11 (0d - Prova 2)' },
              { d: '2026-11-16', label: '16/11 (Encerrado)' },
            ].map(item => (
              <button
                key={item.d}
                type="button"
                onClick={() => setSimulatedDate(item.d)}
                className={`px-2.5 py-1 rounded-lg border text-xs font-semibold transition-all cursor-pointer ${
                  simulatedDate === item.d
                    ? 'bg-sky-400 text-slate-950 border-sky-300 font-bold shadow-xs'
                    : 'bg-white/10 hover:bg-white/20 text-slate-200 border-white/15'
                }`}
              >
                {item.label}
              </button>
            ))}

            <button
              type="button"
              onClick={() => setSimulatedDate(undefined)}
              className="px-2.5 py-1 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-400/40 font-bold transition-all ml-auto cursor-pointer"
            >
              Restaurar Hoje Real
            </button>
          </div>
        </section>
      )}

      {/* BANNER PRINCIPAL ADAPTATIVO */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-950 via-indigo-900 to-slate-900 text-white p-6 sm:p-10 shadow-2xl border border-indigo-700/50">
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white/10 backdrop-blur-md text-amber-300 text-xs font-bold uppercase tracking-wider border border-white/10">
              <Flame className="w-4 h-4 text-amber-400 animate-pulse" />
              <span>Central de Preparação para o ENEM 2026</span>
            </div>

            {/* Badge da Modalidade Adaptativa Atual */}
            <div className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider border backdrop-blur-md ${getModalityBadgeStyle(plan.modality)}`}>
              <Target className="w-3.5 h-3.5" />
              <span>{plan.modalityBadgeLabel}</span>
            </div>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            A reta final começou!
          </h1>

          <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-normal max-w-2xl">
            Seu último período de preparação para o ENEM 2026 começa aqui.
          </p>

          {/* Mensagem Motivacional Dinâmica */}
          <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-amber-400/20 text-amber-300 flex items-center justify-center shrink-0 mt-0.5">
              <Sparkles className="w-4 h-4 text-amber-300" />
            </div>
            <div className="space-y-0.5 text-left">
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-300">
                Direcionamento Estratégico de Hoje
              </span>
              <p className="text-sm font-semibold text-white leading-relaxed">
                "{plan.dynamicMessage}"
              </p>
              <p className="text-[11px] text-slate-300">
                {plan.modalityDescription}
              </p>
            </div>
          </div>

          {/* Cards de Métricas Dinâmicas da Prova */}
          <div className="pt-2 grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Próxima Prova */}
            <div className="bg-white/10 backdrop-blur-md p-3.5 rounded-2xl border border-white/15 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/30 flex items-center justify-center text-amber-300 shrink-0">
                <Calendar className="w-5 h-5" />
              </div>
              <div className="text-left">
                <div className="text-[11px] uppercase tracking-wider text-indigo-200 font-bold">Próxima Prova</div>
                <div className="text-sm font-black text-white">{plan.stageTitle}</div>
                <div className="text-[11px] text-slate-300">Data: {plan.targetDateBR}</div>
              </div>
            </div>

            {/* Dias Restantes */}
            <div className="bg-white/10 backdrop-blur-md p-3.5 rounded-2xl border border-white/15 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/30 flex items-center justify-center text-amber-300 shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div className="text-left">
                <div className="text-[11px] uppercase tracking-wider text-indigo-200 font-bold">Contagem Regressiva</div>
                <div className="text-base font-black text-amber-300">
                  {plan.isEncerrado ? 'ENCERRADO' : plan.isDiaDaProva ? 'HOJE É O DIA!' : `${plan.diasRestantes} ${plan.diasRestantes === 1 ? 'dia' : 'dias'}`}
                </div>
                <div className="text-[11px] text-slate-300">Fuso de Brasília (UTC-3)</div>
              </div>
            </div>

            {/* Modalidade de Preparação Atual */}
            <div className="bg-white/10 backdrop-blur-md p-3.5 rounded-2xl border border-white/15 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/30 flex items-center justify-center text-amber-300 shrink-0">
                <Target className="w-5 h-5" />
              </div>
              <div className="text-left">
                <div className="text-[11px] uppercase tracking-wider text-indigo-200 font-bold">Modalidade</div>
                <div className="text-sm font-black text-white capitalize">{plan.modality.replace('_', ' ')}</div>
                <div className="text-[11px] text-slate-300">{plan.allTasks.length} metas mapeadas</div>
              </div>
            </div>
          </div>

          {/* Botões de Ação do Banner */}
          <div className="pt-3 flex flex-wrap items-center gap-3">
            <button
              onClick={scrollToPlano}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 active:from-amber-600 active:to-amber-500 text-slate-950 font-black px-6 py-3.5 rounded-2xl shadow-xl shadow-amber-500/25 transition-all transform hover:-translate-y-0.5 text-sm sm:text-base cursor-pointer"
            >
              <FileCheck className="w-5 h-5 text-slate-950" />
              <span>{plan.isEncerrado ? 'Consultar Acervo e Histórico' : 'Ver meu plano de estudos'}</span>
            </button>

            <button
              onClick={() => onNavigate('/corretor')}
              className="inline-flex items-center gap-2 bg-white/15 hover:bg-white/25 active:bg-white/30 text-white font-bold px-5 py-3.5 rounded-2xl backdrop-blur-md border border-white/20 transition-all text-sm cursor-pointer"
            >
              <PenTool className="w-4 h-4 text-amber-300" />
              <span>Corretor de Redação</span>
            </button>
          </div>
        </div>

        {/* Efeito decorativo de fundo */}
        <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-indigo-500/20 blur-3xl pointer-events-none" />
      </section>

      {/* SELETOR DOS DIAS DO ENEM (1º Dia vs 2º Dia) - Oculto após o encerramento da campanha */}
      {!plan.isEncerrado && (
        <section className="bg-white dark:bg-slate-900 rounded-3xl p-4 sm:p-5 border border-slate-200/80 dark:border-slate-800 shadow-sm animate-fade-in">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
                <Layers className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                <span>Foco da Preparação</span>
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Alterne entre o 1º e 2º dia para ver cronogramas adaptativos, resumos didáticos e simulados específicos.
              </p>
            </div>

            <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 p-1.5 rounded-2xl w-full sm:w-auto">
              <button
                type="button"
                onClick={() => setSelectedDayOverride('dia1')}
                className={`flex-1 sm:flex-none px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  activeExamStage === 'dia1'
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Calendar className="w-4 h-4" />
                <span>1º Dia (08/11) — Linguagens, Humanas & Redação</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedDayOverride('dia2')}
                className={`flex-1 sm:flex-none px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  activeExamStage === 'dia2'
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Calendar className="w-4 h-4" />
                <span>2º Dia (15/11) — Natureza & Matemática</span>
              </button>
            </div>
          </div>
        </section>
      )}

      {/* PAINEL DE PROGRESSO REAL DO ESTUDANTE COM MEMÓRIA (localStorage) */}
      <section className="bg-gradient-to-r from-slate-900 to-indigo-950 text-white rounded-3xl p-5 sm:p-7 shadow-lg border border-indigo-900/60 space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-amber-400" />
              <h2 className="text-lg sm:text-xl font-black">
                {plan.isEncerrado 
                  ? 'Registro Consolidado da sua Preparação' 
                  : `Seu Progresso Adaptativo (${activeExamStage === 'dia1' ? '1º Dia' : '2º Dia'})`}
              </h2>
            </div>
            <p className="text-xs text-indigo-200">
              {plan.isEncerrado 
                ? 'Histórico completo de atividades e simulados salvos com segurança no seu navegador via localStorage.'
                : 'Registrado de forma persistente no seu navegador via localStorage. Ao mudar de data, suas tarefas concluídas são preservadas!'}
            </p>
          </div>

          {!plan.isEncerrado && (
            <button
              onClick={handleResetAllProgress}
              className="text-xs font-semibold text-slate-400 hover:text-rose-300 transition-colors flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-rose-500/10 border border-white/10 cursor-pointer"
              title="Zerar progresso para recomeçar o treinamento"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Resetar Progresso</span>
            </button>
          )}
        </div>

        {/* Métricas e Barra de Progresso */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
          <div className="bg-white/5 p-3 rounded-2xl border border-white/10">
            <span className="text-xs text-indigo-200 block">Metas Concluídas</span>
            <span className="text-2xl font-black text-emerald-400">{completedTasksCount}</span>
            <span className="text-xs text-slate-400"> de {totalTasksCount} atividades</span>
          </div>

          <div className="bg-white/5 p-3 rounded-2xl border border-white/10">
            <span className="text-xs text-indigo-200 block">Metas Pendentes</span>
            <span className="text-2xl font-black text-amber-300">{Math.max(0, totalTasksCount - completedTasksCount)}</span>
            <span className="text-xs text-slate-400"> a realizar no plano</span>
          </div>

          <div className="bg-white/5 p-3 rounded-2xl border border-white/10">
            <span className="text-xs text-indigo-200 block">Simulado Feito</span>
            <span className="text-2xl font-black text-sky-400">{answeredQuestionsCount}</span>
            <span className="text-xs text-slate-400"> de {currentSimuladoQuestions.length} questões</span>
          </div>

          <div className="bg-white/5 p-3 rounded-2xl border border-white/10">
            <span className="text-xs text-indigo-200 block">Taxa de Acertos</span>
            <span className="text-2xl font-black text-amber-400">
              {answeredQuestionsCount > 0 ? `${Math.round((correctAnswersCount / answeredQuestionsCount) * 100)}%` : '--'}
            </span>
            <span className="text-xs text-slate-400">
              {answeredQuestionsCount > 0 ? `${correctAnswersCount}/${answeredQuestionsCount} corretas` : 'Ainda não iniciado'}
            </span>
          </div>
        </div>

        {/* Barra de Progresso Percentual */}
        <div className="space-y-1.5 pt-1">
          <div className="flex items-center justify-between text-xs font-semibold text-indigo-200">
            <span>Conclusão das Metas Desta Modalidade</span>
            <span className="font-black text-amber-300">{planProgressPercent}%</span>
          </div>
          <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden p-0.5 border border-white/10">
            <div 
              className="bg-gradient-to-r from-amber-400 via-emerald-400 to-indigo-400 h-full rounded-full transition-all duration-500 ease-out shadow-sm"
              style={{ width: `${planProgressPercent}%` }}
            />
          </div>
        </div>
      </section>

      {/* SEÇÃO PRINCIPAL: SISTEMA INTELIGENTE DE PLANEJAMENTO ADAPTATIVO */}
      <section id="cronograma-adaptativo" className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-6">
        
        {/* Cabeçalho do Cronograma Adaptativo */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-5">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-xl bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold">
                <Target className="w-4 h-4" />
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                Cronograma de Estudos Adaptativo
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              Planejamento gerado automaticamente para o tempo restante ({plan.diasRestantes === 0 ? 'Hoje é o dia da prova' : `${plan.diasRestantes} dias restantes`}).
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <span className={`px-3 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider border ${getModalityBadgeStyle(plan.modality)}`}>
              {plan.modalityBadgeLabel}
            </span>
          </div>
        </div>

        {/* MENSAGEM DINÂMICA DA MODALIDADE */}
        <div className="p-4 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs sm:text-sm">
          <div className="space-y-0.5 text-indigo-900 dark:text-indigo-200">
            <span className="font-bold block">
              Orientações da Modalidade ({plan.modality.toUpperCase().replace('_', ' ')}):
            </span>
            <p className="leading-relaxed">
              {plan.modalityDescription}
            </p>
          </div>

          <span className="shrink-0 text-xs font-bold px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 shadow-xs">
            {completedTasksCount} de {totalTasksCount} metas concluídas
          </span>
        </div>

        {/* CASO ESPECIAL: CAMPANHA ENCERRADA (PÓS 15/11/2026) */}
        {plan.isEncerrado ? (
          <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-indigo-950 via-slate-900 to-indigo-900 text-white border border-indigo-700/60 shadow-2xl text-center space-y-6 animate-fade-in">
            <div className="w-16 h-16 rounded-2xl bg-amber-400/20 text-amber-300 flex items-center justify-center mx-auto shadow-inner">
              <Trophy className="w-9 h-9 text-amber-300" />
            </div>

            <div className="space-y-3 max-w-2xl mx-auto">
              <span className="text-xs font-black uppercase tracking-wider text-amber-300 bg-amber-400/10 px-4 py-1.5 rounded-full border border-amber-300/30 inline-block">
                Campanha ENEM 2026 Encerrada
              </span>
              <h3 className="text-2xl sm:text-4xl font-black">
                Parabéns! Você concluiu sua jornada no ENEM 2026.
              </h3>
              <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-normal">
                As duas etapas de aplicação do ENEM 2026 foram concluídas. Agora é o momento de descansar, respirar aliviado e aguardar a publicação dos gabaritos e resultados oficiais pelo Inep. Toda a sua dedicação valeu a pena!
              </p>
            </div>

            <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => onNavigate('/corretor')}
                className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-bold transition-all flex items-center gap-2 cursor-pointer"
              >
                <PenTool className="w-4 h-4 text-amber-300" />
                <span>Consultar Corretor de Redação</span>
              </button>
              <button
                onClick={() => onNavigate('/mapas')}
                className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-bold transition-all flex items-center gap-2 cursor-pointer"
              >
                <Network className="w-4 h-4 text-purple-300" />
                <span>Consultar Mapas Mentais</span>
              </button>
              <button
                onClick={() => onNavigate('/repertorio')}
                className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-bold transition-all flex items-center gap-2 cursor-pointer"
              >
                <BookOpen className="w-4 h-4 text-emerald-300" />
                <span>Banco de Repertórios</span>
              </button>
            </div>
          </div>
        ) : plan.isDiaDaProva && plan.examDayGuide ? (
          <div className="space-y-6 animate-fade-in">
            {/* Banner Calmo do Dia da Prova */}
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-indigo-950 via-purple-950 to-slate-900 text-white border border-purple-500/40 shadow-xl space-y-4 text-center">
              <div className="w-14 h-14 rounded-2xl bg-amber-400/20 text-amber-300 flex items-center justify-center mx-auto">
                <HeartHandshake className="w-8 h-8 text-amber-300 animate-pulse" />
              </div>

              <div className="space-y-2 max-w-2xl mx-auto">
                <span className="text-xs font-black uppercase tracking-wider text-amber-300 bg-amber-400/10 px-3 py-1 rounded-full border border-amber-300/30">
                  Chegou o Grande Momento!
                </span>
                <h3 className="text-2xl sm:text-3xl font-black">
                  {plan.examDayGuide.motivationalMessage}
                </h3>
                <p className="text-sm text-purple-200 leading-relaxed font-normal">
                  Hoje não é dia de maratona de estudos nem de absorver conteúdos novos. Sua preparação já foi feita. Respire fundo, mantenha a calma e siga as instruções abaixo para um dia tranquilo.
                </p>
              </div>
            </div>

            {/* Tabela de Horários Oficiais Impreteríveis */}
            <div className="p-5 sm:p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-4">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                <h4 className="font-black text-slate-900 dark:text-white text-base">
                  Horários Oficiais Impreteríveis (Fuso de Brasília)
                </h4>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {plan.examDayGuide.schedules.map((sch, i) => (
                  <div 
                    key={i}
                    className={`p-3.5 rounded-xl border text-xs ${
                      sch.highlight 
                        ? 'bg-rose-50 dark:bg-rose-950/40 border-rose-300 dark:border-rose-800 text-rose-950 dark:text-rose-100 font-bold shadow-xs'
                        : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700/80 text-slate-800 dark:text-slate-200'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-slate-500 dark:text-slate-400">{sch.label}</span>
                      <span className="text-sm font-black text-indigo-600 dark:text-indigo-400">{sch.time}</span>
                    </div>
                    <p className="text-[11px] leading-relaxed opacity-90">{sch.note}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Checklist de Materiais & Dicas de Tempo */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Checklist Físico */}
              <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                  <h4 className="font-black text-slate-900 dark:text-white text-sm sm:text-base">
                    Checklist de Materiais e Documentos
                  </h4>
                </div>

                <div className="space-y-2.5">
                  {plan.examDayGuide.checklistMaterials.map((mat, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300">
                      <Check className={`w-4 h-4 shrink-0 mt-0.5 ${mat.required ? 'text-emerald-500' : 'text-slate-400'}`} />
                      <div>
                        <span className="font-bold text-slate-900 dark:text-white">{mat.item}</span>
                        {mat.required && (
                          <span className="ml-1.5 text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-1.5 py-0.5 rounded">
                            Obrigatório
                          </span>
                        )}
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug">{mat.tip}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Gestão do Tempo na Prova */}
              <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                  <h4 className="font-black text-slate-900 dark:text-white text-sm sm:text-base">
                    Estratégia de Gestão do Tempo
                  </h4>
                </div>

                <div className="space-y-2.5">
                  {plan.examDayGuide.timeManagementTips.map((tip, i) => (
                    <div key={i} className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 text-xs">
                      <div className="flex items-center justify-between font-bold text-slate-900 dark:text-white mb-0.5">
                        <span>{tip.block}</span>
                        <span className="text-amber-600 dark:text-amber-400">{tip.allocation}</span>
                      </div>
                      <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">{tip.detail}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Dicas de Mindset e Descanso */}
            <div className="p-4 rounded-2xl bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800/50 space-y-2 text-xs text-purple-950 dark:text-purple-200">
              <span className="font-bold flex items-center gap-1.5 text-purple-800 dark:text-purple-300">
                <Coffee className="w-4 h-4" />
                Lembretes para a sua mente:
              </span>
              <ul className="list-disc list-inside space-y-1 text-slate-700 dark:text-slate-300">
                {plan.examDayGuide.mindsetTips.map((tip, i) => (
                  <li key={i}>{tip}</li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          /* LISTA DE BLOCOS DIÁRIOS ADAPTATIVOS */
          <div className="space-y-6">
            {plan.blocks.map((block) => (
              <div 
                key={block.dayIndex}
                className="p-5 sm:p-6 rounded-2xl bg-slate-50/70 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-700/80 space-y-4"
              >
                {/* Cabeçalho do Bloco / Dia */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-200/60 dark:border-slate-700/60 pb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-md text-[11px] font-black uppercase tracking-wider bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300">
                        {block.focusBadge}
                      </span>
                      <h3 className="font-black text-slate-900 dark:text-white text-base">
                        {block.dayLabel}
                      </h3>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      {block.description}
                    </p>
                  </div>

                  <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                    {block.tasks.length} {block.tasks.length === 1 ? 'meta' : 'metas'}
                  </span>
                </div>

                {/* Cards das Tarefas deste Bloco */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {block.tasks.map((task) => {
                    const isDone = progressState.completedTaskIds.includes(task.id);

                    return (
                      <div 
                        key={task.id}
                        className={`p-4 rounded-xl border transition-all duration-200 flex flex-col justify-between gap-3 ${
                          isDone 
                            ? 'bg-emerald-50/40 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-800/60 shadow-xs' 
                            : 'bg-white dark:bg-slate-900 border-slate-200/80 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-700 hover:shadow-xs'
                        }`}
                      >
                        <div className="space-y-2">
                          <div className="flex items-start justify-between gap-2">
                            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                              {task.discipline}
                            </span>

                            <div className="flex items-center gap-1.5">
                              {task.priority === 'essencial' && (
                                <span className="text-[10px] font-black text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/60 px-1.5 py-0.5 rounded border border-rose-200 dark:border-rose-800/50">
                                  Essencial
                                </span>
                              )}
                              <span className="text-xs font-medium text-slate-400 flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                <span>{task.estimatedMinutes} min</span>
                              </span>
                            </div>
                          </div>

                          <h4 className={`font-bold text-sm leading-snug transition-colors ${
                            isDone ? 'line-through text-slate-400 dark:text-slate-500' : 'text-slate-900 dark:text-white'
                          }`}>
                            {task.title}
                          </h4>

                          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                            {task.summary}
                          </p>
                        </div>

                        {/* Botão de Conclusão e Ação Direta */}
                        <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-2">
                          <button
                            type="button"
                            onClick={() => toggleTask(task.id)}
                            className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors cursor-pointer select-none"
                          >
                            {isDone ? (
                              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                            ) : (
                              <Circle className="w-4 h-4 text-slate-300 dark:text-slate-600 shrink-0" />
                            )}
                            <span>{isDone ? 'Concluída' : 'Marcar concluída'}</span>
                          </button>

                          {task.actionRoute ? (
                            <button
                              type="button"
                              onClick={() => onNavigate(task.actionRoute!)}
                              className="inline-flex items-center gap-1 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline py-1 px-2 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200/60 dark:border-indigo-800/60 cursor-pointer"
                            >
                              <span>{task.actionLabel}</span>
                              <ChevronRight className="w-3 h-3" />
                            </button>
                          ) : (
                            <button
                              type="button"
                              onClick={() => {
                                if (activeExamStage === 'dia1') setActiveTabDia1('simulado');
                                else setActiveTabDia2('simulado');
                                const simEl = document.getElementById('secao-simulado');
                                if (simEl) simEl.scrollIntoView({ behavior: 'smooth' });
                              }}
                              className="inline-flex items-center gap-1 text-xs font-bold text-amber-600 dark:text-amber-400 hover:underline py-1 px-2 rounded-lg bg-amber-50 dark:bg-amber-950/60 border border-amber-200/60 dark:border-amber-800/60 cursor-pointer"
                            >
                              <span>{task.actionLabel}</span>
                              <ChevronRight className="w-3 h-3" />
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* SEÇÃO DE CONSULTA HISTÓRICA DO ACERVO PEDAGÓGICO (QUANDO A CAMPANHA ESTIVER ENCERRADA) */}
      {plan.isEncerrado && (
        <section className="bg-slate-900 text-white rounded-3xl p-5 sm:p-7 border border-indigo-500/30 shadow-xl space-y-4 animate-fade-in">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-500/20 text-indigo-300 border border-indigo-400/30">
                <BookMarked className="w-3.5 h-3.5" />
                <span>Modo de Consulta Histórica — Acervo ENEM 2026</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black">
                Arquivo Pedagógico & Revisão de Simulados
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
                As provas oficiais foram concluídas. Este acervo fica aberto permanentemente para consulta dos resumos teóricos e revisão das questões com gabarito e resolução detalhada pela TRI. Suas respostas permanecem salvas para consulta.
              </p>
            </div>

            {/* Alternador de Consulta Histórica entre o 1º e o 2º Dia */}
            <div className="flex items-center gap-2 bg-slate-800 p-1.5 rounded-2xl w-full sm:w-auto shrink-0 border border-slate-700">
              <button
                type="button"
                onClick={() => setConsultationStage('dia1')}
                className={`flex-1 sm:flex-none px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  consultationStage === 'dia1'
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Calendar className="w-4 h-4" />
                <span>Acervo 1º Dia (08/11)</span>
              </button>

              <button
                type="button"
                onClick={() => setConsultationStage('dia2')}
                className={`flex-1 sm:flex-none px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  consultationStage === 'dia2'
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Calendar className="w-4 h-4" />
                <span>Acervo 2º Dia (15/11)</span>
              </button>
            </div>
          </div>
        </section>
      )}

      {/* AS ÁREAS DE CONTEÚDO E SIMULADO (MODO PREPARAÇÃO OU CONSULTA HISTÓRICA) */}
      {activeExamStage === 'dia1' ? (
        // SEÇÕES DO 1º DIA: Linguagens, Humanas, Redação, Simulado
        <section className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-5">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-1">
                <BookMarked className="w-4 h-4" />
                <span>{plan.isEncerrado ? 'Acervo Histórico — 1º Dia (08/11/2026)' : 'Primeiro Dia do ENEM (08/11/2026)'}</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                {plan.isEncerrado ? 'Consulta de Resumos e Gabarito do 1º Dia' : 'Quatro Áreas de Preparação Essencial'}
              </h2>
            </div>

            {/* Abas das 4 áreas */}
            <div className="flex flex-wrap items-center gap-1.5 bg-slate-100 dark:bg-slate-800 p-1.5 rounded-2xl w-full sm:w-auto">
              {[
                { id: 'linguagens', label: 'Linguagens', icon: BookOpen },
                { id: 'humanas', label: 'Ciências Humanas', icon: Layers },
                { id: 'redacao', label: 'Redação', icon: PenTool },
                { id: 'simulado', label: plan.isEncerrado ? 'Gabarito 1º Dia' : 'Simulado 1º Dia', icon: FileCheck },
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTabDia1 === tab.id;

                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTabDia1(tab.id as any)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                      isActive 
                        ? 'bg-indigo-600 text-white shadow-sm' 
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Conteúdo da Aba Ativa do 1º Dia */}
          {activeTabDia1 === 'linguagens' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/40 text-xs sm:text-sm text-indigo-900 dark:text-indigo-200 leading-relaxed">
                <strong>Foco em Linguagens:</strong> Interpretação contextualizada, tipologias e variação linguística. Clique nos tópicos abaixo para expandir pontos-chave e estratégias para a prova.
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {LINGUAGENS_CONTENT.map((topic) => renderContentCard(topic, expandedTopicId, setExpandedTopicId, onNavigate))}
              </div>
            </div>
          )}

          {activeTabDia1 === 'humanas' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-amber-50/60 dark:bg-amber-950/30 border border-amber-100 dark:border-amber-900/40 text-xs sm:text-sm text-amber-900 dark:text-amber-200 leading-relaxed">
                <strong>Foco em Ciências Humanas:</strong> Conexão entre história, geografia crítica, cidadania e pensamento social. O ENEM prioriza interpretação de documentos e análise de processos.
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {HUMANAS_CONTENT.map((topic) => renderContentCard(topic, expandedTopicId, setExpandedTopicId, onNavigate))}
              </div>
            </div>
          )}

          {activeTabDia1 === 'redacao' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-rose-50/60 dark:bg-rose-950/30 border border-rose-100 dark:border-rose-900/40 text-xs sm:text-sm text-rose-900 dark:text-rose-200 leading-relaxed flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <span>
                  <strong>Foco em Redação:</strong> Domínio do texto dissertativo-argumentativo, projeto de texto e os 5 elementos da proposta de intervenção.
                </span>
                <button
                  onClick={() => onNavigate('/corretor')}
                  className="shrink-0 bg-rose-600 hover:bg-rose-700 text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 transition-colors shadow-xs cursor-pointer"
                >
                  <PenTool className="w-3.5 h-3.5" />
                  <span>Abrir Corretor com IA</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {REDACAO_CONTENT.map((topic) => renderContentCard(topic, expandedTopicId, setExpandedTopicId, onNavigate))}
              </div>
            </div>
          )}

          {activeTabDia1 === 'simulado' && (
            <div id="secao-simulado" className="space-y-6">
              {renderSimuladoSection(
                currentSimuladoQuestions, 
                userAnswers, 
                handleSelectAnswer, 
                resetSimulado,
                plan.isEncerrado ? '1º Dia (Consulta e Gabarito Histórico)' : '1º Dia (Linguagens, Humanas e Redação)',
                plan.isEncerrado
              )}
            </div>
          )}
        </section>
      ) : (
        // SEÇÕES DO 2º DIA: Matemática, Ciências da Natureza, Simulado do 2º Dia
        <section className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-5">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400 mb-1">
                <BookMarked className="w-4 h-4" />
                <span>{plan.isEncerrado ? 'Acervo Histórico — 2º Dia (15/11/2026)' : 'Segundo Dia do ENEM (15/11/2026)'}</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                {plan.isEncerrado ? 'Consulta de Resumos e Gabarito do 2º Dia' : 'Preparação de Natureza & Matemática'}
              </h2>
            </div>

            {/* Abas do 2º Dia */}
            <div className="flex flex-wrap items-center gap-1.5 bg-slate-100 dark:bg-slate-800 p-1.5 rounded-2xl w-full sm:w-auto">
              {[
                { id: 'matematica', label: 'Matemática', icon: Layers },
                { id: 'natureza', label: 'Ciências da Natureza', icon: BookOpen },
                { id: 'simulado', label: plan.isEncerrado ? 'Gabarito 2º Dia' : 'Simulado 2º Dia', icon: FileCheck },
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTabDia2 === tab.id;

                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTabDia2(tab.id as any)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                      isActive 
                        ? 'bg-indigo-600 text-white shadow-sm' 
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Conteúdos do 2º Dia */}
          {activeTabDia2 === 'matematica' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-sky-50/60 dark:bg-sky-950/30 border border-sky-100 dark:border-sky-900/40 text-xs sm:text-sm text-sky-900 dark:text-sky-200 leading-relaxed">
                <strong>Estratégia TRI em Matemática:</strong> Priorize as questões de proporção, escala, leitura gráfica e porcentagem antes de gastar tempo com geometria analítica ou probabilidade complexa.
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {MATEMATICA_CONTENT.map((topic) => renderContentCard(topic, expandedTopicId, setExpandedTopicId, onNavigate))}
              </div>
            </div>
          )}

          {activeTabDia2 === 'natureza' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/40 text-xs sm:text-sm text-emerald-900 dark:text-emerald-200 leading-relaxed">
                <strong>Ciências da Natureza (Física, Química, Biologia):</strong> Fenômenos do cotidiano, impactos ambientais, circuitos elétricos e química orgânica aplicada à saúde e energia.
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {NATUREZA_CONTENT.map((topic) => renderContentCard(topic, expandedTopicId, setExpandedTopicId, onNavigate))}
              </div>
            </div>
          )}

          {activeTabDia2 === 'simulado' && (
            <div id="secao-simulado" className="space-y-6">
              {renderSimuladoSection(
                currentSimuladoQuestions, 
                userAnswers, 
                handleSelectAnswer, 
                resetSimulado,
                plan.isEncerrado ? '2º Dia (Consulta e Gabarito Histórico)' : '2º Dia (Ciências da Natureza e Matemática)',
                plan.isEncerrado
              )}
            </div>
          )}
        </section>
      )}

      {/* INTEGRAÇÃO COM AS FERRAMENTAS EXISTENTES DA PLATAFORMA */}
      <section className="bg-gradient-to-br from-indigo-50/60 via-white to-amber-50/40 dark:from-slate-900 dark:via-slate-900 dark:to-indigo-950/40 rounded-3xl p-6 sm:p-8 border border-indigo-100 dark:border-indigo-900/40 shadow-sm space-y-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-xl bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-400 flex items-center justify-center font-bold">
              <Layers className="w-4 h-4" />
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
              Recursos Integrados do ENEM Nota Máxima
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Utilize todas as ferramentas da plataforma para potencializar seus estudos sem sair do ambiente.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div 
            onClick={() => onNavigate('/corretor')}
            className="p-5 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 hover:border-indigo-500 dark:hover:border-indigo-400 hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <PenTool className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base mb-1">
                Corretor de Redação
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Envie fotos do seu texto para avaliação instantânea nas 5 competências do ENEM.
              </p>
            </div>
            <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 mt-4 flex items-center gap-1 group-hover:underline">
              <span>Abrir Corretor</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </span>
          </div>

          <div 
            onClick={() => onNavigate('/mapas')}
            className="p-5 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 hover:border-indigo-500 dark:hover:border-indigo-400 hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <Network className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base mb-1">
                Mapas Mentais
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Revisão em esquemas visuais com ramificações didáticas e dicas de prova.
              </p>
            </div>
            <span className="text-xs font-bold text-purple-600 dark:text-purple-400 mt-4 flex items-center gap-1 group-hover:underline">
              <span>Ver Mapas Mentais</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </span>
          </div>

          <div 
            onClick={() => onNavigate('/repertorio')}
            className="p-5 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 hover:border-indigo-500 dark:hover:border-indigo-400 hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <BookOpen className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base mb-1">
                Banco de Repertórios
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Citações filosóficas, históricas e literárias organizadas por eixo temático.
              </p>
            </div>
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 mt-4 flex items-center gap-1 group-hover:underline">
              <span>Consultar Repertório</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </span>
          </div>

          <div 
            onClick={() => onNavigate('/dicas')}
            className="p-5 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 hover:border-indigo-500 dark:hover:border-indigo-400 hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base mb-1">
                Gestão do Tempo na Prova
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Calculadora de minutos por questão e estratégia de preenchimento do gabarito.
              </p>
            </div>
            <span className="text-xs font-bold text-amber-600 dark:text-amber-400 mt-4 flex items-center gap-1 group-hover:underline">
              <span>Ajustar Estratégia</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>
      </section>

      {/* CHECKLIST DE VÉSPERA & INFORMAÇÕES OFICIAIS */}
      <section className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-6">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
            Orientações Oficiais e Checklist do Dia da Prova
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 space-y-1.5">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 flex items-center gap-1.5">
              <Check className="w-4 h-4" />
              Material Obrigatório
            </span>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              Caneta esferográfica de tinta preta fabricada em material transparente. Leve ao menos 2 ou 3 unidades testadas.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 space-y-1.5">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 flex items-center gap-1.5">
              <Check className="w-4 h-4" />
              Identificação Válida
            </span>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              Documento oficial de identificação original com foto (RG, CNH, Passaporte ou no app oficial Gov.br/e-Título).
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 space-y-1.5">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4" />
              Horário Impreterível
            </span>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              Os portões fecham impreterivelmente às 13h00 (horário de Brasília). Planeje seu trajeto para chegar até as 12h00.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

// ==========================================
// FUNÇÕES AUXILIARES DE RENDERIZAÇÃO
// ==========================================

// Card de Conteúdo Teórico Objetivo com Expansão
function renderContentCard(
  topic: ContentTopicItem, 
  expandedTopicId: string | null, 
  setExpandedTopicId: (id: string | null) => void,
  onNavigate: (path: string) => void
) {
  const isExpanded = expandedTopicId === topic.id;

  return (
    <div 
      key={topic.id}
      className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
        isExpanded
          ? 'bg-slate-50/80 dark:bg-slate-800/80 border-indigo-400 dark:border-indigo-600 shadow-sm'
          : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
      }`}
    >
      <div 
        onClick={() => setExpandedTopicId(isExpanded ? null : topic.id)}
        className="p-5 cursor-pointer flex items-start justify-between gap-3 select-none"
      >
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              {topic.category}
            </span>
            <span className="text-[10px] font-semibold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/50 px-2 py-0.5 rounded-md border border-amber-200 dark:border-amber-800/50">
              {topic.relevanceNotice}
            </span>
          </div>

          <h3 className="font-bold text-slate-900 dark:text-white text-base">
            {topic.title}
          </h3>
        </div>

        <button 
          type="button"
          className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 cursor-pointer"
          aria-label={isExpanded ? 'Recolher tópico' : 'Expandir tópico'}
        >
          {isExpanded ? <ChevronDown className="w-5 h-5 text-indigo-600 dark:text-indigo-400" /> : <ChevronRight className="w-5 h-5" />}
        </button>
      </div>

      {/* Conteúdo Expandido */}
      {isExpanded && (
        <div className="px-5 pb-5 pt-1 space-y-4 border-t border-slate-100 dark:border-slate-700/60 animate-fade-in text-xs sm:text-sm">
          {/* Pontos Chave */}
          <div className="space-y-2">
            <span className="font-bold text-slate-800 dark:text-slate-200 block text-xs uppercase tracking-wider">
              Pontos Fundamentais de Revisão:
            </span>
            <ul className="space-y-1.5 list-disc list-inside text-slate-600 dark:text-slate-300 leading-relaxed">
              {topic.summaryPoints.map((pt, i) => (
                <li key={i}>{pt}</li>
              ))}
            </ul>
          </div>

          {/* Dica de Estratégia de Prova */}
          <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border-l-4 border-amber-500 text-amber-900 dark:text-amber-200 font-medium leading-relaxed">
            <strong>Dica prática para a prova:</strong> {topic.examStrategyTip}
          </div>

          {/* Atalho Integrado */}
          {topic.relatedToolRoute && (
            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={() => onNavigate(topic.relatedToolRoute!)}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 hover:underline cursor-pointer"
              >
                <span>{topic.relatedToolLabel || 'Acessar Ferramenta'}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// Seção de Simulado Interativo com 5 Alternativas, Correção Automática e Modo de Consulta Histórica (Somente Leitura)
function renderSimuladoSection(
  questions: SimuladoQuestion[],
  userAnswers: Record<string, 'A' | 'B' | 'C' | 'D' | 'E'>,
  handleSelectAnswer: (questionId: string, option: 'A' | 'B' | 'C' | 'D' | 'E') => void,
  resetSimulado: () => void,
  simuladoLabel: string,
  readOnly: boolean = false
) {
  const answeredCount = questions.filter(q => userAnswers[q.id] !== undefined).length;
  const correctCount = questions.filter(q => userAnswers[q.id] === q.correctAnswer).length;

  return (
    <div className="space-y-6">
      {/* AVISO DO MODO DE CONSULTA HISTÓRICA (SOMENTE LEITURA) */}
      {readOnly && (
        <div className="p-4 sm:p-5 rounded-2xl bg-amber-500/10 dark:bg-amber-950/30 border border-amber-300 dark:border-amber-800 text-amber-950 dark:text-amber-200 flex items-start gap-3 animate-fade-in text-xs sm:text-sm shadow-xs">
          <ShieldCheck className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="font-black uppercase tracking-wider text-[11px] px-2.5 py-0.5 rounded bg-amber-200/70 dark:bg-amber-900/70 text-amber-950 dark:text-amber-200 inline-block border border-amber-300 dark:border-amber-700">
              CONSULTA HISTÓRICA — SOMENTE LEITURA
            </span>
            <p className="leading-relaxed">
              Este é o acervo de consulta do ENEM 2026. As provas já foram aplicadas. Aqui você pode revisar questões, gabaritos e explicações, mas não pode alterar suas respostas anteriores.
            </p>
          </div>
        </div>
      )}

      {/* Cabeçalho do Simulado */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-indigo-900 to-slate-900 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-amber-300 block mb-1">
            {readOnly ? `Acervo Histórico e Gabarito — ${simuladoLabel}` : `Simulado de Treinamento Rápido — ${simuladoLabel}`}
          </span>
          <h3 className="text-lg sm:text-xl font-black">
            {readOnly ? 'Revisão das Questões com Gabarito e Justificativas Didáticas' : 'Questões de Múltipla Escolha com Correção Imediata'}
          </h3>
          <p className="text-xs text-indigo-200 mt-1">
            {readOnly
              ? 'Consulte as justificativas pedagógicas detalhadas, veja a resposta correta do simulado e revise suas respostas salvas com segurança.'
              : 'Cinco alternativas (A a E), correção automática e explicação didática passo a passo para cada resposta.'}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-white/10 px-3.5 py-2 rounded-xl text-center border border-white/15">
            <span className="text-xs uppercase text-slate-300 block">{readOnly ? 'Acertos Salvos' : 'Acertos'}</span>
            <span className="text-lg font-black text-amber-300">{correctCount} / {questions.length}</span>
          </div>

          {/* O botão "Refazer" é estritamente ocultado no Modo de Consulta Histórica */}
          {!readOnly && answeredCount > 0 && (
            <button
              onClick={resetSimulado}
              className="px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold text-white transition-colors flex items-center gap-1 cursor-pointer"
              title="Refazer simulado"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Refazer</span>
            </button>
          )}
        </div>
      </div>

      {/* Lista de Questões */}
      <div className="space-y-6">
        {questions.map((q, idx) => {
          const selectedOption = userAnswers[q.id];
          const isAnswered = selectedOption !== undefined;
          const hasValidAnswerKey = !!q.correctAnswer && ['A', 'B', 'C', 'D', 'E'].includes(q.correctAnswer as any);
          const isCorrect = isAnswered && hasValidAnswerKey && selectedOption === q.correctAnswer;

          return (
            <div 
              key={q.id}
              className={`p-5 sm:p-7 rounded-2xl border transition-all ${
                isAnswered 
                  ? isCorrect 
                    ? 'border-emerald-300 dark:border-emerald-800/80 bg-emerald-50/20 dark:bg-emerald-950/10'
                    : 'border-rose-300 dark:border-rose-800/80 bg-rose-50/20 dark:bg-rose-950/10'
                  : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm'
              }`}
            >
              {/* Identificação da Questão e Status da Resposta */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-black uppercase tracking-wider px-2.5 py-1 rounded-md bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300">
                    Questão {idx + 1} • {q.discipline}
                  </span>

                  {readOnly && (
                    !isAnswered ? (
                      <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">
                        Questão não respondida anteriormente
                      </span>
                    ) : isCorrect ? (
                      <span className="text-[11px] font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950/80 px-2 py-0.5 rounded flex items-center gap-1 border border-emerald-300 dark:border-emerald-800/60">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        Sua resposta: correta
                      </span>
                    ) : (
                      <span className="text-[11px] font-bold text-rose-700 dark:text-rose-300 bg-rose-100 dark:bg-rose-950/80 px-2 py-0.5 rounded flex items-center gap-1 border border-rose-300 dark:border-rose-800/60">
                        <AlertCircle className="w-3 h-3 text-rose-600" />
                        Sua resposta: incorreta
                      </span>
                    )
                  )}
                </div>

                <span className="text-[11px] font-medium text-slate-400 italic">
                  {q.sourceLabel}
                </span>
              </div>

              {/* Texto de Apoio / Contexto */}
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-serif italic mb-4">
                "{q.textContext}"
              </div>

              {/* Comando da Questão */}
              <p className="font-bold text-slate-900 dark:text-white text-sm sm:text-base leading-snug mb-4">
                {q.questionPrompt}
              </p>

              {/* 5 Alternativas (A, B, C, D, E) */}
              <div className="space-y-2.5">
                {q.options.map((opt) => {
                  const isThisCorrect = hasValidAnswerKey && opt.letter === q.correctAnswer;
                  const isSelectedByUser = selectedOption === opt.letter;

                  // RENDERIZAÇÃO EM MODO HISTÓRICO (SOMENTE LEITURA — ZERO INTERAÇÃO OU MUTAÇÃO)
                  if (readOnly) {
                    let optStyle = 'bg-slate-50/40 dark:bg-slate-900/40 border-slate-200/80 dark:border-slate-800 text-slate-500 dark:text-slate-400 opacity-75';
                    let letterStyle = 'bg-slate-200/70 dark:bg-slate-800 text-slate-600 dark:text-slate-400';

                    if (isThisCorrect) {
                      optStyle = 'bg-emerald-50 dark:bg-emerald-950/50 border-emerald-500 text-emerald-950 dark:text-emerald-100 font-bold shadow-xs';
                      letterStyle = 'bg-emerald-600 text-white';
                    } else if (isSelectedByUser && !isThisCorrect) {
                      optStyle = 'bg-rose-50 dark:bg-rose-950/50 border-rose-400 text-rose-950 dark:text-rose-100 font-medium';
                      letterStyle = 'bg-rose-600 text-white';
                    }

                    return (
                      <div
                        key={opt.letter}
                        className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-start justify-between gap-3 select-none text-xs sm:text-sm cursor-default ${optStyle}`}
                      >
                        <div className="flex items-start gap-3">
                          <span className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 ${letterStyle}`}>
                            {opt.letter}
                          </span>
                          <span className="leading-relaxed pt-0.5">{opt.text}</span>
                        </div>

                        {/* Etiquetas explícitas de Gabarito e Resposta do Estudante */}
                        <div className="shrink-0 flex items-center gap-1.5 pt-0.5">
                          {isThisCorrect && isSelectedByUser && (
                            <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-600 text-white shadow-xs">
                              Resposta correta • Sua escolha
                            </span>
                          )}
                          {isThisCorrect && !isSelectedByUser && (
                            <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-400/50">
                              Gabarito da Questão
                            </span>
                          )}
                          {!isThisCorrect && isSelectedByUser && (
                            <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300 border border-rose-300 dark:border-rose-800">
                              Sua Resposta
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  }

                  // RENDERIZAÇÃO EM MODO DE PREPARAÇÃO (INTERATIVO)
                  let optionStyle = 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800';

                  if (isAnswered) {
                    if (isThisCorrect) {
                      optionStyle = 'bg-emerald-100 dark:bg-emerald-950/80 border-emerald-500 text-emerald-950 dark:text-emerald-100 font-bold';
                    } else if (isSelectedByUser && !isThisCorrect) {
                      optionStyle = 'bg-rose-100 dark:bg-rose-950/80 border-rose-500 text-rose-950 dark:text-rose-100 font-medium';
                    } else {
                      optionStyle = 'bg-slate-50 dark:bg-slate-900/40 border-slate-200 dark:border-slate-800 text-slate-400 dark:text-slate-500 opacity-60';
                    }
                  }

                  return (
                    <button
                      key={opt.letter}
                      type="button"
                      onClick={() => handleSelectAnswer(q.id, opt.letter)}
                      className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-start gap-3 select-none text-xs sm:text-sm cursor-pointer ${optionStyle}`}
                    >
                      <span className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 ${
                        isAnswered && isThisCorrect 
                          ? 'bg-emerald-600 text-white' 
                          : isAnswered && isSelectedByUser && !isThisCorrect
                            ? 'bg-rose-600 text-white'
                            : isSelectedByUser
                              ? 'bg-indigo-600 text-white'
                              : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                      }`}>
                        {opt.letter}
                      </span>
                      <span className="leading-relaxed pt-0.5">{opt.text}</span>
                    </button>
                  );
                })}
              </div>

              {/* Explicação da Resposta e Justificativa Pedagógica */}
              {readOnly ? (
                // No modo histórico, o gabarito e a explicação são SEMPRE exibidos para todas as questões
                <div className={`mt-5 p-4 rounded-xl border animate-fade-in ${
                  isAnswered && isCorrect
                    ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800/60 text-emerald-950 dark:text-emerald-200'
                    : isAnswered && !isCorrect
                      ? 'bg-rose-50 dark:bg-rose-950/30 border-rose-200 dark:border-rose-800/60 text-rose-950 dark:text-rose-200'
                      : 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200'
                }`}>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 font-black text-sm mb-2 pb-2 border-b border-slate-200/60 dark:border-slate-700/60">
                    <div className="flex items-center gap-2">
                      {isAnswered ? (
                        isCorrect ? (
                          <>
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                            <span>Sua resposta: correta (Alternativa {selectedOption})</span>
                          </>
                        ) : (
                          <>
                            <AlertCircle className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0" />
                            <span>Sua resposta: incorreta (Você marcou Alternativa {selectedOption})</span>
                          </>
                        )
                      ) : (
                        <>
                          <BookOpen className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
                          <span>Questão não respondida anteriormente</span>
                        </>
                      )}
                    </div>

                    <div className="text-xs font-bold text-indigo-700 dark:text-indigo-300 bg-white dark:bg-slate-800 px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-700 shrink-0">
                      {hasValidAnswerKey ? `Gabarito da Questão: Alternativa ${q.correctAnswer}` : 'Gabarito não disponível'}
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
                    <strong>Resolução Didática:</strong> {q.explanation || 'Comentário didático em consolidação.'}
                  </p>
                </div>
              ) : (
                // No modo de preparação, exibe a explicação apenas após o estudante responder
                isAnswered && (
                  <div className={`mt-5 p-4 rounded-xl border animate-fade-in ${
                    isCorrect 
                      ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800/60 text-emerald-950 dark:text-emerald-200'
                      : 'bg-rose-50 dark:bg-rose-950/30 border-rose-200 dark:border-rose-800/60 text-rose-950 dark:text-rose-200'
                  }`}>
                    <div className="flex items-center gap-2 font-black text-sm mb-1.5">
                      {isCorrect ? (
                        <>
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                          <span>Excelente! Resposta correta (Alternativa {q.correctAnswer}).</span>
                        </>
                      ) : (
                        <>
                          <AlertCircle className="w-4 h-4 text-rose-600 dark:text-rose-400" />
                          <span>Atenção! Você marcou {selectedOption}, mas a alternativa correta é a {q.correctAnswer}.</span>
                        </>
                      )}
                    </div>
                    <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
                      <strong>Resolução Didática:</strong> {q.explanation}
                    </p>
                  </div>
                )
              )}
            </div>
          );
        })}
      </div>

      {/* Card Final de Consolidação */}
      {readOnly ? (
        // No modo de consulta histórica: exibe consolidação sem botão de refazer
        <div className="p-6 rounded-3xl bg-slate-900 text-white border border-slate-700/80 shadow-xl text-center space-y-3 animate-fade-in">
          <Trophy className="w-10 h-10 text-amber-400 mx-auto" />
          <h4 className="text-xl font-black">
            Registro Histórico Consolidado
          </h4>
          <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto">
            {answeredCount > 0 
              ? `Você respondeu anteriormente a ${answeredCount} de ${questions.length} questões, com um total de ${correctCount} acertos (${Math.round((correctCount / answeredCount) * 100)}% de precisão nas respondidas).`
              : `Nenhuma resposta foi registrada para este simulado antes do encerramento oficial da campanha. O acervo segue disponível integralmente para leitura e consulta de gabaritos.`}
          </p>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-slate-300 border border-white/10">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Modo Somente Leitura • Respostas protegidas contra alteração</span>
          </div>
        </div>
      ) : (
        // No modo de preparação: exibe conclusão com botão de refazer se todas forem respondidas
        answeredCount === questions.length && (
          <div className="p-6 rounded-3xl bg-gradient-to-br from-indigo-950 via-slate-900 to-indigo-900 text-white border border-indigo-700/60 shadow-xl text-center space-y-3 animate-fade-in">
            <Trophy className="w-12 h-12 text-amber-400 mx-auto" />
            <h4 className="text-2xl font-black">
              Simulado Concluído!
            </h4>
            <p className="text-sm text-indigo-200 max-w-lg mx-auto">
              Você acertou <strong>{correctCount} de {questions.length}</strong> questões ({Math.round((correctCount / questions.length) * 100)}% de precisão).
              {correctCount === questions.length 
                ? ' Desempenho excelente! Seus conhecimentos estão afiados para o ENEM 2026.' 
                : ' Revise as explicações das questões que você errou para eliminar as dúvidas conceituais antes da prova.'}
            </p>
            <div className="pt-2">
              <button
                onClick={resetSimulado}
                className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-6 py-2.5 rounded-xl text-sm transition-all cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Refazer este Simulado</span>
              </button>
            </div>
          </div>
        )
      )}
    </div>
  );
}
