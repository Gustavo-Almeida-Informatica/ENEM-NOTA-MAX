// Componente de Notificação Inteligente do ENEM 2026
// Exibe contagem regressiva, status das etapas, mensagens motivacionais
// e permite direcionamento para a rota /reta-final.
import React, { useState, useEffect } from 'react';
import { 
  Bell, 
  X, 
  Calendar, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  Sparkles,
  Flame,
  ShieldCheck,
  RotateCcw
} from 'lucide-react';
import { 
  getEnem2026Info, 
  getBrasiliaDateString, 
  EnemCountdownInfo, 
  ENEM_2026_DATAS 
} from '../utils/enemCountdown';
import { 
  isNotificationDismissed, 
  setNotificationDismissed, 
  clearAllDismissedNotifications 
} from '../utils/notificationStorage';

interface EnemNotificationModalProps {
  onNavigate: (path: string) => void;
}

export const EnemNotificationModal: React.FC<EnemNotificationModalProps> = ({ onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dontShowAgain, setDontShowAgain] = useState(false);
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
    // Verifica a cada 30 segundos
    const interval = setInterval(checkLiveDate, 30000);
    const handleVisibility = () => {
      if (document.visibilityState === 'visible') checkLiveDate();
    };
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      clearInterval(interval);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, []);

  const effectiveDate = simulatedDate || liveDate;
  const [info, setInfo] = useState<EnemCountdownInfo>(() => getEnem2026Info(effectiveDate));
  const [showSimulationBar, setShowSimulationBar] = useState(false);

  // Recalcula as informações quando a data simulada ou a data viva mudar
  useEffect(() => {
    setInfo(getEnem2026Info(effectiveDate));
  }, [effectiveDate]);

  // Efeito de inicialização e transição de etapa: verificar se deve abrir automaticamente
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const currentInfo = getEnem2026Info(effectiveDate);

    // Se a campanha estiver encerrada (após 15/11/2026), não exibe
    if (!currentInfo.showModal || currentInfo.etapa === 'encerrado') {
      setIsOpen(false);
      return;
    }

    // Identificador único da notificação atual
    const isDismissed = isNotificationDismissed(currentInfo.notificationId);

    // Se não foi dispensado permanentemente, abre com animação suave
    if (!isDismissed) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 400);
      return () => clearTimeout(timer);
    } else {
      setIsOpen(false);
    }
  }, [effectiveDate]);

  // Alternar checkbox "Não mostrar novamente esta notificação" com persistência imediata
  const handleToggleDontShowAgain = (checked: boolean) => {
    setDontShowAgain(checked);
    if (typeof window !== 'undefined' && info.notificationId) {
      setNotificationDismissed(info.notificationId, checked);
    }
  };

  // Fechar o modal
  const handleClose = () => {
    if (typeof window !== 'undefined' && info.notificationId) {
      if (dontShowAgain) {
        setNotificationDismissed(info.notificationId, true);
      }
    }
    setIsOpen(false);
  };

  // Clique no botão principal "COMEÇAR MINHA PREPARAÇÃO"
  const handleStartPrep = () => {
    if (typeof window !== 'undefined' && info.notificationId) {
      if (dontShowAgain) {
        setNotificationDismissed(info.notificationId, true);
      }
    }
    setIsOpen(false);
    onNavigate('/reta-final');
  };

  // Simular data para teste e validação
  const handleSelectSimulatedDate = (dateStr: string) => {
    setSimulatedDate(dateStr);
    const simulatedInfo = getEnem2026Info(dateStr);
    setDontShowAgain(isNotificationDismissed(simulatedInfo.notificationId));
    setIsOpen(true);
  };

  // Resetar simulação para a data real
  const handleResetRealDate = () => {
    setSimulatedDate(undefined);
    setDontShowAgain(false);
    clearAllDismissedNotifications();
    const realInfo = getEnem2026Info();
    if (realInfo.showModal) {
      setIsOpen(true);
    }
  };

  // Se a campanha estiver encerrada e não estivermos simulando, não renderiza o modal
  if (!info.showModal && !simulatedDate) {
    return null;
  }

  return (
    <>
      {/* Botão flutuante discreto no canto inferior direito para reabrir a contagem a qualquer momento */}
      {!isOpen && info.showModal && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-4 right-4 z-40 flex items-center gap-2.5 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white px-4 py-2.5 rounded-full shadow-lg shadow-indigo-500/25 transition-all transform hover:scale-105 active:scale-95 text-xs sm:text-sm font-semibold border border-indigo-400/30"
          aria-label="Abrir contagem regressiva ENEM 2026"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-400"></span>
          </span>
          <Flame className="w-4 h-4 text-amber-300" />
          <span>ENEM 2026: <strong className="text-amber-200">{info.rotuloContagem}</strong></span>
        </button>
      )}

      {/* Modal Centralizado */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-fade-in"
          role="dialog"
          aria-modal="true"
          aria-labelledby="enem-modal-title"
        >
          {/* Backdrop escurecido com blur */}
          <div 
            className="fixed inset-0 bg-slate-950/75 backdrop-blur-sm transition-opacity"
            onClick={handleClose}
          />

          {/* Card Principal do Modal */}
          <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-indigo-100 dark:border-indigo-950/80 overflow-hidden z-10 transition-all transform my-auto">
            {/* Faixa decorativa superior com gradiente */}
            <div className="h-2 bg-gradient-to-r from-amber-500 via-indigo-600 to-purple-600" />

            {/* Cabeçalho com identificação especial e botão fechar */}
            <div className="px-5 sm:px-7 pt-5 sm:pt-6 pb-2 flex items-start justify-between">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-300/60 dark:border-amber-700/60 shadow-xs">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                  ENEM NOTA MAX — EDIÇÃO ESPECIAL 2026
                </span>
              </div>

              {/* Botão de Fechar no canto superior */}
              <button
                onClick={handleClose}
                className="text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300 p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
                aria-label="Fechar notificação"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Conteúdo do Modal */}
            <div className="px-5 sm:px-7 pb-6 space-y-4">
              {/* Ícone de notificação e Título Dinâmico */}
              <div className="flex items-start gap-3.5 pt-1">
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/80 border border-indigo-100 dark:border-indigo-800/60 flex items-center justify-center shrink-0 shadow-inner text-indigo-600 dark:text-indigo-400">
                  {info.isDiaDeProva ? (
                    <Flame className="w-7 h-7 text-amber-500 animate-pulse" />
                  ) : (
                    <Bell className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                  )}
                </div>
                <div className="flex-1">
                  <h2 
                    id="enem-modal-title" 
                    className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white leading-tight"
                  >
                    {info.titulo}
                  </h2>
                  <p className="text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400 mt-1">
                    {info.subtitulo}
                  </p>
                </div>
              </div>

              {/* Card de Contagem Regressiva e Detalhes da Prova */}
              <div className="bg-gradient-to-br from-indigo-50 via-slate-50 to-amber-50/40 dark:from-slate-800/80 dark:via-slate-800/40 dark:to-indigo-950/30 rounded-2xl p-4 sm:p-5 border border-indigo-100/80 dark:border-indigo-900/40 text-center relative overflow-hidden shadow-inner">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  {/* Destaque numérico dos dias */}
                  <div className="flex items-center gap-3">
                    <div className="bg-white dark:bg-slate-900 px-4 py-2.5 rounded-xl border border-indigo-200/70 dark:border-indigo-800 shadow-sm flex flex-col items-center justify-center min-w-[90px]">
                      {info.isDiaDeProva ? (
                        <span className="text-2xl font-black text-amber-600 dark:text-amber-400 tracking-tight">HOJE</span>
                      ) : (
                        <>
                          <span className="text-3xl sm:text-4xl font-black text-indigo-600 dark:text-indigo-400 leading-none">
                            {info.diasRestantes}
                          </span>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mt-0.5">
                            {info.diasRestantes === 1 ? 'Dia restante' : 'Dias restantes'}
                          </span>
                        </>
                      )}
                    </div>

                    <div className="text-left">
                      <div className="text-xs uppercase font-bold tracking-wider text-indigo-700 dark:text-indigo-400">
                        Próxima Etapa
                      </div>
                      <div className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                        {info.provaNome}
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1 mt-0.5">
                        <Calendar className="w-3 h-3 text-slate-400" />
                        <span>Data: <strong>{info.dataAlvoFormatada}</strong></span>
                      </div>
                    </div>
                  </div>

                  {/* Badges de Etapas das Provas */}
                  <div className="flex sm:flex-col gap-2 w-full sm:w-auto text-xs">
                    <div className={`px-2.5 py-1.5 rounded-lg flex items-center justify-between gap-2 border ${
                      info.etapa === 'etapa1'
                        ? 'bg-indigo-600 text-white font-bold border-indigo-500 shadow-xs'
                        : 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800/50'
                    }`}>
                      <span className="flex items-center gap-1">
                        {info.etapa === 'etapa2' && <CheckCircle2 className="w-3 h-3 text-emerald-500" />}
                        1º Dia (08/11)
                      </span>
                      <span className="text-[10px] opacity-85">
                        {info.etapa === 'etapa2' ? 'Concluído' : 'Redação/Hum.'}
                      </span>
                    </div>

                    <div className={`px-2.5 py-1.5 rounded-lg flex items-center justify-between gap-2 border ${
                      info.etapa === 'etapa2'
                        ? 'bg-indigo-600 text-white font-bold border-indigo-500 shadow-xs'
                        : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700'
                    }`}>
                      <span>2º Dia (15/11)</span>
                      <span className="text-[10px] opacity-85">Mat./Nat.</span>
                    </div>
                  </div>
                </div>

                {/* Disciplinas da etapa */}
                {info.disciplinas.length > 0 && (
                  <div className="mt-3.5 pt-3 border-t border-indigo-100/70 dark:border-indigo-900/30 flex flex-wrap items-center justify-center gap-1.5">
                    {info.disciplinas.map((disc, idx) => (
                      <span 
                        key={idx}
                        className="px-2 py-0.5 rounded-md bg-white/80 dark:bg-slate-900/80 text-[11px] font-medium text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-slate-800"
                      >
                        {disc}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Mensagem Motivacional */}
              <div className="bg-amber-50/70 dark:bg-amber-950/20 border-l-4 border-amber-500 p-3.5 rounded-r-xl">
                <p className="text-xs sm:text-sm text-amber-900 dark:text-amber-200 font-medium leading-relaxed">
                  {info.mensagemMotivacional}
                </p>
              </div>

              {/* Ações: Botão Principal de Preparação e Botão de Fechar */}
              <div className="space-y-2.5 pt-1">
                <button
                  onClick={handleStartPrep}
                  className="w-full flex items-center justify-center gap-2.5 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 active:from-indigo-800 active:to-indigo-900 text-white font-bold py-3.5 px-6 rounded-2xl shadow-lg shadow-indigo-600/25 transition-all transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 text-sm sm:text-base"
                >
                  <span>COMEÇAR MINHA PREPARAÇÃO</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>

                <div className="flex items-center justify-between pt-2 px-1">
                  {/* Opção "Não mostrar novamente nesta etapa" */}
                  <label className="flex items-center gap-2 cursor-pointer select-none text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 transition-colors">
                    <input
                      type="checkbox"
                      checked={dontShowAgain}
                      onChange={(e) => handleToggleDontShowAgain(e.target.checked)}
                      className="w-4 h-4 rounded text-indigo-600 border-slate-300 dark:border-slate-700 focus:ring-indigo-500 dark:focus:ring-indigo-400 bg-white dark:bg-slate-800"
                    />
                    <span>Não mostrar novamente esta notificação</span>
                  </label>

                  {/* Botão secundário de fechar */}
                  <button
                    onClick={handleClose}
                    className="text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-colors py-1 px-2.5 rounded-lg border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
                  >
                    {dontShowAgain ? 'Salvar e fechar' : 'Fechar'}
                  </button>
                </div>
              </div>
            </div>

            {/* Rodapé interativo para Testes e Simulações (pode ser recolhido) */}
            <div className="border-t border-slate-100 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-950/60 px-5 sm:px-7 py-2.5 text-xs">
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setShowSimulationBar(!showSimulationBar)}
                  className="text-[11px] font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
                >
                  <Clock className="w-3 h-3" />
                  <span>{showSimulationBar ? 'Ocultar simulador de datas' : 'Testar/Simular datas do ENEM 2026'}</span>
                </button>

                {simulatedDate && (
                  <button
                    type="button"
                    onClick={handleResetRealDate}
                    className="text-[11px] font-medium text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-1"
                    title="Voltar para a data real do sistema"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Restaurar data real ({getBrasiliaDateString()})</span>
                  </button>
                )}
              </div>

              {/* Botões com as datas solicitadas no teste */}
              {showSimulationBar && (
                <div className="mt-2.5 pt-2 border-t border-slate-200/60 dark:border-slate-800/60 space-y-2">
                  <div className="text-[10px] font-bold uppercase text-slate-500 dark:text-slate-400">
                    Clique para simular qualquer uma das datas de teste do ENEM 2026:
                  </div>
                  <div className="grid grid-cols-4 gap-1.5">
                    {[
                      { date: '2026-11-02', label: '02/11 (6 dias)' },
                      { date: '2026-11-05', label: '05/11 (3 dias)' },
                      { date: '2026-11-07', label: '07/11 (1 dia)' },
                      { date: '2026-11-08', label: '08/11 (Hoje 1ºD)' },
                      { date: '2026-11-10', label: '10/11 (Etapa 2)' },
                      { date: '2026-11-14', label: '14/11 (1 dia 2ºD)' },
                      { date: '2026-11-15', label: '15/11 (Hoje 2ºD)' },
                      { date: '2026-11-16', label: '16/11 (Encerrado)' },
                    ].map((item) => (
                      <button
                        key={item.date}
                        type="button"
                        onClick={() => handleSelectSimulatedDate(item.date)}
                        className={`px-2 py-1.5 rounded-lg text-[10px] font-semibold text-center border transition-all ${
                          simulatedDate === item.date
                            ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                            : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800'
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
