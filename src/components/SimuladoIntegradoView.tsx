import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  RotateCcw, 
  Trophy, 
  ChevronLeft, 
  ChevronRight, 
  Sparkles, 
  BookOpen, 
  ShieldCheck, 
  HelpCircle,
  Flame,
  ArrowRight,
  TrendingUp,
  History,
  Info
} from 'lucide-react';
import { 
  AuthorialQuestion, 
  SimuladoHistoryRecord, 
  generateSimuladoRound, 
  SIMULADO_BANK 
} from '../data/simuladoBank';

interface SimuladoIntegradoViewProps {
  stage: 'dia1' | 'dia2' | 'geral';
  readOnly?: boolean;
  savedAnswers: Record<string, 'A' | 'B' | 'C' | 'D' | 'E'>;
  onSaveAnswer: (questionId: string, option: 'A' | 'B' | 'C' | 'D' | 'E') => void;
  onResetAnswers: () => void;
  simuladoLabel: string;
}

const EXAM_DURATION_SECONDS = 25 * 60; // 25 minutos (1.500 segundos)

export const SimuladoIntegradoView: React.FC<SimuladoIntegradoViewProps> = ({
  stage,
  readOnly = false,
  savedAnswers,
  onSaveAnswer,
  onResetAnswers,
  simuladoLabel
}) => {
  // Chave de persistência de questões da rodada ativa para manter as mesmas 10 questões durante a sessão
  const roundStorageKey = `enem2026_simulado_round_${stage}`;
  const historyStorageKey = 'enem2026_simulado_history';

  // 1. Carrega ou gera as 10 questões da rodada (com embaralhamento e gabarito balanceado)
  const [questions, setQuestions] = useState<AuthorialQuestion[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const savedData = localStorage.getItem(`${roundStorageKey}_data`);
        if (savedData) {
          const parsed: AuthorialQuestion[] = JSON.parse(savedData);
          if (Array.isArray(parsed) && parsed.length === 10) {
            return parsed;
          }
        }
      } catch (_) {}
    }
    const fresh = generateSimuladoRound(stage);
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(`${roundStorageKey}_data`, JSON.stringify(fresh));
        localStorage.setItem(roundStorageKey, JSON.stringify(fresh.map(q => q.id)));
      } catch (_) {}
    }
    return fresh;
  });

  // Índice da questão ativa sendo exibida individualmente (0 a 9)
  const [currentIdx, setCurrentIdx] = useState<number>(0);

  // Modo: 'exam' (durante a prova de 25 min) ou 'review' (após finalizar ou em modo histórico)
  const [isFinished, setIsFinished] = useState<boolean>(() => {
    if (readOnly) return true;
    if (typeof window !== 'undefined') {
      try {
        const finishedFlag = localStorage.getItem(`${roundStorageKey}_finished`);
        return finishedFlag === 'true';
      } catch {
        return false;
      }
    }
    return false;
  });

  // Cronômetro regressivo: 25 minutos
  const [secondsLeft, setSecondsLeft] = useState<number>(() => {
    if (typeof window !== 'undefined') {
      try {
        const savedTime = localStorage.getItem(`${roundStorageKey}_seconds_left`);
        if (savedTime) {
          const num = parseInt(savedTime, 10);
          if (!isNaN(num) && num > 0 && num <= EXAM_DURATION_SECONDS) {
            return num;
          }
        }
      } catch (_) {}
    }
    return EXAM_DURATION_SECONDS;
  });

  const [timeSpent, setTimeSpent] = useState<number>(() => {
    if (typeof window !== 'undefined') {
      try {
        const savedSpent = localStorage.getItem(`${roundStorageKey}_time_spent`);
        if (savedSpent) return parseInt(savedSpent, 10) || 0;
      } catch (_) {}
    }
    return 0;
  });

  // Modal de confirmação para finalizar
  const [showConfirmFinishModal, setShowConfirmFinishModal] = useState<boolean>(false);

  // Histórico de tentativas
  const [historyList, setHistoryList] = useState<SimuladoHistoryRecord[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(historyStorageKey);
        return saved ? JSON.parse(saved) : [];
      } catch {
        return [];
      }
    }
    return [];
  });

  // Timer effect durante a prova ativa
  useEffect(() => {
    if (readOnly || isFinished) return;

    const timer = setInterval(() => {
      setSecondsLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleFinishExam(true);
          return 0;
        }
        const updated = prev - 1;
        try {
          localStorage.setItem(`${roundStorageKey}_seconds_left`, updated.toString());
        } catch (_) {}
        return updated;
      });

      setTimeSpent(prev => {
        const nextSpent = prev + 1;
        try {
          localStorage.setItem(`${roundStorageKey}_time_spent`, nextSpent.toString());
        } catch (_) {}
        return nextSpent;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [readOnly, isFinished, roundStorageKey]);

  // Contagem de respondidas e acertos
  const answeredCount = useMemo(() => {
    return questions.filter(q => savedAnswers[q.id] !== undefined).length;
  }, [questions, savedAnswers]);

  const correctCount = useMemo(() => {
    return questions.filter(q => {
      const userChoice = savedAnswers[q.id];
      if (!userChoice) return false;
      const correctOpt = q.options.find(o => o.isCorrect === true);
      return userChoice === q.correctAnswer || (correctOpt && userChoice === correctOpt.letter);
    }).length;
  }, [questions, savedAnswers]);

  // Contagem da distribuição das respostas corretas por letra (A, B, C, D, E)
  const distribution = useMemo(() => {
    const dist: Record<'A' | 'B' | 'C' | 'D' | 'E', number> = { A: 0, B: 0, C: 0, D: 0, E: 0 };
    questions.forEach(q => {
      if (dist[q.correctAnswer] !== undefined) {
        dist[q.correctAnswer]++;
      }
    });
    return dist;
  }, [questions]);

  const errorCount = answeredCount - correctCount;
  const percentage = questions.length > 0 ? Math.round((correctCount / questions.length) * 100) : 0;

  // Formatação de tempo mm:ss
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const formatElapsed = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    if (m === 0) return `${s} segundos`;
    return `${m} min e ${s} s`;
  };

  // Finalizar o simulado e registrar no histórico
  const handleFinishExam = (forcedByTimeout: boolean = false) => {
    setIsFinished(true);
    setShowConfirmFinishModal(false);

    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(`${roundStorageKey}_finished`, 'true');

        // Salva histórico de tentativas
        const record: SimuladoHistoryRecord = {
          id: `sim-rec-${Date.now()}`,
          timestamp: Date.now(),
          dateFormatted: new Intl.DateTimeFormat('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          }).format(new Date()),
          stage,
          score: correctCount,
          total: questions.length,
          percentage,
          timeSpentSeconds: timeSpent,
          questionIds: questions.map(q => q.id),
          distribution
        };

        const updatedHistory = [record, ...historyList].slice(0, 10);
        setHistoryList(updatedHistory);
        localStorage.setItem(historyStorageKey, JSON.stringify(updatedHistory));
      } catch (_) {}
    }
  };

  // Gerar Nova Rodada (10 Novas Questões com Gabarito Balanceado e Embaralhado)
  const handleNewRound = () => {
    if (readOnly) return;
    const fresh = generateSimuladoRound(stage);
    setQuestions(fresh);
    setCurrentIdx(0);
    setIsFinished(false);
    setSecondsLeft(EXAM_DURATION_SECONDS);
    setTimeSpent(0);
    onResetAnswers();

    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(`${roundStorageKey}_data`, JSON.stringify(fresh));
        localStorage.setItem(roundStorageKey, JSON.stringify(fresh.map(q => q.id)));
        localStorage.removeItem(`${roundStorageKey}_finished`);
        localStorage.removeItem(`${roundStorageKey}_seconds_left`);
        localStorage.removeItem(`${roundStorageKey}_time_spent`);
      } catch (_) {}
    }
  };

  // Refazer o mesmo simulado atual
  const handleRetryCurrentRound = () => {
    if (readOnly) return;
    setCurrentIdx(0);
    setIsFinished(false);
    setSecondsLeft(EXAM_DURATION_SECONDS);
    setTimeSpent(0);
    onResetAnswers();

    if (typeof window !== 'undefined') {
      try {
        localStorage.removeItem(`${roundStorageKey}_finished`);
        localStorage.removeItem(`${roundStorageKey}_seconds_left`);
        localStorage.removeItem(`${roundStorageKey}_time_spent`);
      } catch (_) {}
    }
  };

  const currentQ = questions[currentIdx] || questions[0];
  const userChoice = savedAnswers[currentQ?.id];

  return (
    <div className="space-y-6">
      {/* AVISO DO MODO DE CONSULTA HISTÓRICA */}
      {readOnly && (
        <div className="p-4 sm:p-5 rounded-2xl bg-amber-500/10 dark:bg-amber-950/30 border border-amber-300 dark:border-amber-800 text-amber-950 dark:text-amber-200 flex items-start gap-3 text-xs sm:text-sm shadow-xs">
          <ShieldCheck className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="font-black uppercase tracking-wider text-[11px] px-2.5 py-0.5 rounded bg-amber-200/70 dark:bg-amber-900/70 text-amber-950 dark:text-amber-200 inline-block border border-amber-300 dark:border-amber-700">
              CONSULTA HISTÓRICA — SOMENTE LEITURA
            </span>
            <p className="leading-relaxed">
              As provas do ENEM 2026 já foram realizadas. Você está no acervo permanente com questões autorais, gabaritos comentados, distratores analisados e dicas de prova.
            </p>
          </div>
        </div>
      )}

      {/* CABEÇALHO DO SIMULADO INTEGRADO (25 MINUTOS) */}
      <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white border border-indigo-900/50 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 font-extrabold text-xs uppercase tracking-wider border border-amber-500/30 flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5 text-amber-400" />
              <span>Simulado Integrado</span>
            </span>
            <span className="px-2.5 py-1 rounded-full bg-white/10 text-indigo-200 font-bold text-xs border border-white/10 flex items-center gap-1">
              <Clock className="w-3 h-3 text-indigo-300" />
              <span>25 min</span>
            </span>
            <span className="px-2.5 py-1 rounded-full bg-indigo-500/20 text-indigo-200 font-bold text-xs border border-indigo-400/20">
              10 Questões por Rodada
            </span>
          </div>

          <h3 className="text-xl sm:text-2xl font-black tracking-tight text-white pt-1">
            Simulado Rápido de Treinamento (Questões Autorais)
          </h3>
          <p className="text-xs sm:text-sm text-indigo-200 max-w-2xl leading-relaxed">
            Treine interpretação e eliminação de distratores nas questões autorais cronometradas da Central da Reta Final.
          </p>
        </div>

        {/* Cronômetro e Botão de Ação Rápida */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end pt-2 md:pt-0 border-t md:border-t-0 border-white/10">
          {!readOnly && !isFinished && (
            <div className={`flex items-center gap-2 px-4 py-2 rounded-2xl border transition-colors ${
              secondsLeft < 300 
                ? 'bg-rose-500/20 border-rose-500/50 text-rose-300 animate-pulse' 
                : 'bg-white/10 border-white/15 text-white'
            }`}>
              <Clock className="w-4 h-4 text-amber-400" />
              <div className="text-left">
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-bold">Tempo Restante</span>
                <span className="font-mono text-lg font-black">{formatTime(secondsLeft)}</span>
              </div>
            </div>
          )}

          {!readOnly && isFinished && (
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleNewRound}
                className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs transition-all shadow-md flex items-center gap-1.5 cursor-pointer"
                title="Sortear 10 novas questões do banco"
              >
                <Sparkles className="w-3.5 h-3.5 text-slate-950" />
                <span>Nova Rodada (10 Questões)</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* BARRA DE PROGRESSO E SELETOR INDIVIDUAL DE QUESTÕES (1 A 10) */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 sm:p-5 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-3">
        <div className="flex items-center justify-between text-xs font-bold text-slate-600 dark:text-slate-300">
          <span className="flex items-center gap-1.5 text-indigo-600 dark:text-indigo-400">
            <BookOpen className="w-4 h-4" />
            <span>Questão {currentIdx + 1} de {questions.length}</span>
          </span>

          <span className="text-slate-500 dark:text-slate-400">
            {answeredCount} de {questions.length} respondidas ({Math.round((answeredCount / questions.length) * 100)}%)
          </span>
        </div>

        {/* Barra de progresso visual */}
        <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-indigo-500 to-amber-400 transition-all duration-300"
            style={{ width: `${((currentIdx + 1) / questions.length) * 100}%` }}
          />
        </div>

        {/* Pílulas de Navegação Rápida entre Questões (1 a 10) */}
        <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto py-1 scrollbar-none">
          {questions.map((q, idx) => {
            const isAnswered = savedAnswers[q.id] !== undefined;
            const isCurrent = idx === currentIdx;
            const isCorrect = isAnswered && savedAnswers[q.id] === q.correctAnswer;

            let pillStyle = 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400';

            if (isFinished || readOnly) {
              if (isAnswered) {
                pillStyle = isCorrect 
                  ? 'border-emerald-500 bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-200 font-black' 
                  : 'border-rose-500 bg-rose-100 dark:bg-rose-950/80 text-rose-800 dark:text-rose-200 font-black';
              } else {
                pillStyle = 'border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800/50 text-slate-400';
              }
            } else {
              if (isAnswered) {
                pillStyle = 'border-indigo-400 bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 font-bold';
              }
            }

            if (isCurrent) {
              pillStyle += ' ring-2 ring-indigo-600 dark:ring-indigo-400 shadow-xs scale-105';
            }

            return (
              <button
                key={q.id}
                type="button"
                onClick={() => setCurrentIdx(idx)}
                className={`min-w-8 h-8 sm:min-w-9 sm:h-9 rounded-xl border text-xs flex items-center justify-center transition-all cursor-pointer ${pillStyle}`}
                title={`Ir para questão ${idx + 1}`}
              >
                <span>{idx + 1}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* CARD DA QUESTÃO ATIVA INDIVIDUAL */}
      {currentQ && (
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-md space-y-6 animate-in fade-in duration-200">
          {/* Cabeçalho da Questão: Área, Disciplina, Dificuldade e Fonte */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-3 py-1 rounded-lg bg-indigo-100 dark:bg-indigo-950 text-indigo-800 dark:text-indigo-300 text-xs font-black uppercase tracking-wider">
                Questão {currentIdx + 1} • {currentQ.discipline}
              </span>

              <span className="text-xs px-2.5 py-0.5 rounded-md font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                {currentQ.topic}
              </span>

              <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded ${
                currentQ.difficulty === 'facil'
                  ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300'
                  : currentQ.difficulty === 'media'
                    ? 'bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300'
                    : 'bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300'
              }`}>
                Dificuldade {currentQ.difficulty}
              </span>
            </div>

            <span className="text-[11px] font-medium text-slate-400 italic">
              {currentQ.sourceLabel}
            </span>
          </div>

          {/* Texto de Apoio / Contexto da Questão */}
          {currentQ.textContext && (
            <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-serif italic shadow-2xs">
              "{currentQ.textContext}"
            </div>
          )}

          {/* Enunciado / Comando da Questão */}
          <div className="space-y-1">
            <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-snug">
              {currentQ.questionPrompt}
            </h4>
          </div>

          {/* 5 Alternativas (A, B, C, D, E) */}
          <div className="space-y-3">
            {currentQ.options.map(opt => {
              const isSelected = userChoice === opt.letter;
              const isCorrectAnswer = opt.letter === currentQ.correctAnswer;

              let cardStyle = 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:border-indigo-300 dark:hover:border-indigo-600 text-slate-800 dark:text-slate-200';
              let badgeStyle = 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300';

              if (isFinished || readOnly) {
                // Modo de Revisão / Gabarito Revelado
                if (isCorrectAnswer) {
                  cardStyle = 'border-emerald-500 bg-emerald-50/70 dark:bg-emerald-950/40 text-emerald-950 dark:text-emerald-100 font-semibold shadow-xs';
                  badgeStyle = 'bg-emerald-600 text-white';
                } else if (isSelected && !isCorrectAnswer) {
                  cardStyle = 'border-rose-400 bg-rose-50/70 dark:bg-rose-950/40 text-rose-950 dark:text-rose-100 font-medium';
                  badgeStyle = 'bg-rose-600 text-white';
                } else {
                  cardStyle = 'border-slate-200/70 dark:border-slate-800/70 bg-slate-50/40 dark:bg-slate-900/30 text-slate-400 dark:text-slate-500 opacity-60';
                }
              } else {
                // Durante a realização do exame (sem mostrar se acertou ou errou)
                if (isSelected) {
                  cardStyle = 'border-indigo-600 dark:border-indigo-500 bg-indigo-50/80 dark:bg-indigo-950/60 text-indigo-950 dark:text-indigo-100 font-semibold ring-2 ring-indigo-500/30 shadow-xs';
                  badgeStyle = 'bg-indigo-600 text-white';
                }
              }

              return (
                <button
                  key={opt.letter}
                  type="button"
                  disabled={readOnly}
                  onClick={() => {
                    if (!readOnly && !isFinished) {
                      onSaveAnswer(currentQ.id, opt.letter);
                    }
                  }}
                  className={`w-full text-left p-4 rounded-2xl border transition-all flex items-start justify-between gap-3.5 select-none text-xs sm:text-sm ${cardStyle} ${
                    readOnly ? 'cursor-default' : 'cursor-pointer'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 ${badgeStyle}`}>
                      {opt.letter}
                    </span>
                    <span className="leading-relaxed pt-0.5">{opt.text}</span>
                  </div>

                  {/* Etiquetas de Gabarito no Modo Revisão */}
                  {(isFinished || readOnly) && (
                    <div className="shrink-0 flex items-center gap-1.5 pt-0.5">
                      {isCorrectAnswer && isSelected && (
                        <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-600 text-white shadow-xs">
                          Resposta correta • Sua escolha
                        </span>
                      )}
                      {isCorrectAnswer && !isSelected && (
                        <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-400/50">
                          Gabarito da Questão
                        </span>
                      )}
                      {!isCorrectAnswer && isSelected && (
                        <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300 border border-rose-300 dark:border-rose-800">
                          Sua Escolha
                        </span>
                      )}
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* GABARITO E ANÁLISE COMPLETA DOS DISTRATORES (SOMENTE APÓS FINALIZAR OU MODO HISTÓRICO) */}
          {(isFinished || readOnly) && (
            <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800 space-y-5 animate-in fade-in duration-300">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-indigo-500" />
                <h5 className="text-base font-black text-slate-900 dark:text-white">
                  Resolução Didática & Análise dos Distratores
                </h5>
              </div>

              {/* Justificativa Geral da Resposta Correta */}
              <div className="p-4 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/30 border border-indigo-200/80 dark:border-indigo-800/60 text-xs sm:text-sm text-indigo-950 dark:text-indigo-200 leading-relaxed">
                <span className="font-bold text-indigo-700 dark:text-indigo-300 block mb-1">
                  Por que a Alternativa {currentQ.correctAnswer} é a correta?
                </span>
                <p>{currentQ.explanation}</p>
              </div>

              {/* Análise Alternativa por Alternativa (A, B, C, D, E) */}
              {currentQ.optionExplanations && (
                <div className="space-y-2.5">
                  <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                    Análise das 5 Alternativas:
                  </span>
                  <div className="grid grid-cols-1 gap-2 text-xs">
                    {(['A', 'B', 'C', 'D', 'E'] as const).map(letter => {
                      const exp = currentQ.optionExplanations[letter];
                      if (!exp) return null;
                      const isCorrect = letter === currentQ.correctAnswer;
                      return (
                        <div 
                          key={letter}
                          className={`p-3 rounded-xl border flex items-start gap-2.5 ${
                            isCorrect 
                              ? 'bg-emerald-50/60 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-800/60 text-emerald-950 dark:text-emerald-200' 
                              : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200/70 dark:border-slate-700/60 text-slate-700 dark:text-slate-300'
                          }`}
                        >
                          <span className={`w-5 h-5 rounded-md flex items-center justify-center font-bold text-[10px] shrink-0 ${
                            isCorrect ? 'bg-emerald-600 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                          }`}>
                            {letter}
                          </span>
                          <span className="leading-relaxed">
                            {exp}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Dica de Ouro de Interpretação / Eliminação de Distratores */}
              {currentQ.distractorTip && (
                <div className="p-4 rounded-2xl bg-amber-500/10 dark:bg-amber-950/30 border border-amber-300 dark:border-amber-700/60 text-amber-950 dark:text-amber-200 text-xs sm:text-sm flex items-start gap-3">
                  <Flame className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-extrabold text-amber-700 dark:text-amber-400 block mb-0.5 uppercase tracking-wide text-[11px]">
                      Dica de Ouro TRI para Eliminar Distratores:
                    </span>
                    <p className="leading-relaxed">{currentQ.distractorTip}</p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* BARRA DE NAVEGAÇÃO INFERIOR ENTRE QUESTÕES (ANTERIOR / PRÓXIMA / FINALIZAR) */}
          <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
            <button
              type="button"
              disabled={currentIdx === 0}
              onClick={() => setCurrentIdx(prev => Math.max(0, prev - 1))}
              className={`w-full sm:w-auto px-4 py-2.5 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                currentIdx === 0
                  ? 'border-slate-200 dark:border-slate-800 text-slate-300 dark:text-slate-700 cursor-not-allowed opacity-50'
                  : 'border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Questão Anterior</span>
            </button>

            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
              {currentIdx < questions.length - 1 ? (
                <button
                  type="button"
                  onClick={() => setCurrentIdx(prev => Math.min(questions.length - 1, prev + 1))}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs transition-colors flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
                >
                  <span>Próxima Questão</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : null}

              {!readOnly && !isFinished && (
                <button
                  type="button"
                  onClick={() => {
                    if (answeredCount < questions.length) {
                      setShowConfirmFinishModal(true);
                    } else {
                      handleFinishExam();
                    }
                  }}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <CheckCircle2 className="w-4 h-4 text-white" />
                  <span>Finalizar Simulado ({answeredCount}/10)</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* RELATÓRIO CONSOLIDADO APÓS CONCLUSÃO */}
      {(isFinished || readOnly) && (
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-indigo-950 via-slate-900 to-indigo-900 text-white border border-indigo-800/60 shadow-xl space-y-6 animate-in fade-in duration-300">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-indigo-800/40 pb-6 text-center sm:text-left">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center shrink-0">
                <Trophy className="w-6 h-6 text-amber-400" />
              </div>
              <div>
                <h4 className="text-xl sm:text-2xl font-black">
                  Relatório do Simulado Concluído
                </h4>
                <p className="text-xs text-indigo-200">
                  {readOnly ? 'Registro consolidado da campanha' : `Simulado realizado em ${formatElapsed(timeSpent)}`}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="bg-white/10 px-4 py-2 rounded-2xl text-center border border-white/10">
                <span className="text-[10px] text-slate-300 uppercase block font-bold">Acertos</span>
                <span className="text-xl font-black text-amber-300">{correctCount} / {questions.length}</span>
              </div>
              <div className="bg-white/10 px-4 py-2 rounded-2xl text-center border border-white/10">
                <span className="text-[10px] text-slate-300 uppercase block font-bold">Aproveitamento</span>
                <span className="text-xl font-black text-emerald-300">{percentage}%</span>
              </div>
            </div>
          </div>

          {/* Feedback Pedagógico TRI */}
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-xs sm:text-sm text-indigo-100 leading-relaxed">
            {percentage >= 80 ? (
              <p>
                🔥 <strong>Desempenho Excelente!</strong> Você demonstrou forte capacidade de localizar pistas nos textos-base e escapar dos distratores clássicos. Essa precisão garante alta pontuação pela coerência TRI.
              </p>
            ) : percentage >= 60 ? (
              <p>
                👍 <strong>Bom Treinamento!</strong> Você acertou a maioria das questões. Analise as alternativas comentadas das questões que errou para eliminar pequenas armadilhas conceituais antes da prova oficial.
              </p>
            ) : (
              <p>
                💡 <strong>Treinamento Construtivo:</strong> O simulado serve exatamente para mapear os pontos de atenção. Leia atentamente a "Dica de Ouro" de cada questão acima para calibrar o método de eliminação de alternativas.
              </p>
            )}
          </div>

          {/* Relatório de Distribuição das Respostas Corretas (Gabarito Oficial) */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white/5 border border-white/10 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 text-xs font-bold text-slate-300">
              <span className="flex items-center gap-2 text-amber-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Distribuição Equilibrada do Gabarito ({questions.length} Questões):</span>
              </span>
              <span className="text-[11px] text-slate-300/80 font-normal">
                Padrão ENEM com alternância e equilíbrio rigoroso das 5 opções
              </span>
            </div>

            <div className="grid grid-cols-5 gap-2 sm:gap-3 text-center">
              {(['A', 'B', 'C', 'D', 'E'] as const).map(letter => {
                const count = distribution[letter] || 0;
                return (
                  <div key={letter} className="p-2 sm:p-3 rounded-xl bg-white/10 border border-white/10">
                    <span className="text-xs text-slate-300 font-bold block mb-0.5">Letra {letter}</span>
                    <span className="text-lg sm:text-xl font-black text-amber-300">{count}</span>
                    <span className="text-[10px] text-slate-300 block">{count === 1 ? 'resposta' : 'respostas'}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Ações pós-simulado */}
          {!readOnly && (
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 pt-2">
              <button
                type="button"
                onClick={handleNewRound}
                className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs transition-all shadow-md flex items-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-slate-950" />
                <span>Gerar Nova Rodada (10 Novas Questões)</span>
              </button>

              <button
                type="button"
                onClick={handleRetryCurrentRound}
                className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition-colors flex items-center gap-2 border border-white/15 cursor-pointer"
              >
                <RotateCcw className="w-4 h-4 text-indigo-200" />
                <span>Refazer Esta Rodada</span>
              </button>
            </div>
          )}
        </div>
      )}

      {/* HISTÓRICO DE TENTATIVAS RECENTES DO ESTUDANTE */}
      {historyList.length > 0 && !readOnly && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-slate-900 dark:text-white">
            <History className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <h5 className="text-sm font-bold">Seu Histórico de Simulados Realizados</h5>
          </div>

          <div className="space-y-2">
            {historyList.slice(0, 5).map((rec, i) => (
              <div 
                key={rec.id}
                className="p-3.5 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40 flex items-center justify-between gap-3 text-xs"
              >
                <div className="flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-lg bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 flex items-center justify-center font-bold text-[10px]">
                    #{i + 1}
                  </span>
                  <div>
                    <span className="font-semibold text-slate-800 dark:text-slate-200 block">
                      Rodada de 10 Questões • {rec.dateFormatted}
                    </span>
                    <span className="text-[11px] text-slate-400">
                      Tempo: {formatElapsed(rec.timeSpentSeconds)}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="font-black text-sm text-slate-900 dark:text-white">
                    {rec.score} / {rec.total}
                  </span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-black ${
                    rec.percentage >= 70 
                      ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300' 
                      : 'bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300'
                  }`}>
                    {rec.percentage}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* MODAL DE CONFIRMAÇÃO PARA FINALIZAR COM QUESTÕES EM BRANCO */}
      {showConfirmFinishModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-md w-full p-6 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-4 animate-in zoom-in-95 duration-150">
            <div className="flex items-center gap-3 text-amber-600 dark:text-amber-400">
              <AlertCircle className="w-6 h-6" />
              <h4 className="text-base font-bold text-slate-900 dark:text-white">
                Finalizar Simulado?
              </h4>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Você respondeu <strong>{answeredCount} de {questions.length}</strong> questões. Ainda restam {questions.length - answeredCount} em branco.
              Deseja encerrar e visualizar o relatório com gabarito comentado agora?
            </p>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowConfirmFinishModal(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
              >
                Continuar Respondendo
              </button>

              <button
                type="button"
                onClick={() => handleFinishExam()}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-colors shadow-sm cursor-pointer"
              >
                Sim, Finalizar e Ver Gabarito
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
