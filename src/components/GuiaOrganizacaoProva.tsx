import React, { useState, useEffect, useMemo } from 'react';
import { 
  ShieldCheck, 
  CheckCircle2, 
  AlertTriangle, 
  Ban, 
  Clock, 
  MapPin, 
  Heart, 
  Sparkles, 
  ExternalLink, 
  RotateCcw, 
  Coffee, 
  Moon, 
  Sun, 
  Activity, 
  Check, 
  FileText, 
  HelpCircle,
  PhoneOff,
  Compass,
  Flame,
  ChevronDown,
  ChevronUp,
  Info
} from 'lucide-react';

interface ChecklistItem {
  id: string;
  category: 'obrigatorio' | 'recomendado' | 'deslocamento';
  title: string;
  description: string;
  isOfficialMandatory?: boolean;
}

const CHECKLIST_ITEMS: ChecklistItem[] = [
  // ITENS OBRIGATÓRIOS
  {
    id: 'item-doc-foto',
    category: 'obrigatorio',
    title: 'Documento oficial de identificação com foto',
    description: 'Físico ou digital aceito pelo Inep (aplicativos Gov.br, e-Título, CNH Digital ou DNI com foto). Prints ou fotos da galeria NÃO são aceitos.',
    isOfficialMandatory: true
  },
  {
    id: 'item-caneta-preta',
    category: 'obrigatorio',
    title: 'Caneta esferográfica de tinta preta e tubo transparente',
    description: 'O leitor óptico das folhas de respostas só reconhece tinta preta. Canetas azuis ou de corpo colorido/opaco são proibidas pelo Inep.',
    isOfficialMandatory: true
  },

  // ITENS RECOMENDADOS
  {
    id: 'item-canetas-reserva',
    category: 'recomendado',
    title: 'Duas ou três canetas pretas transparentes reserva',
    description: 'Previna-se contra falhas de escrita ou esgotamento de tinta durante as mais de 5 horas de prova.'
  },
  {
    id: 'item-cartao-confirmacao',
    category: 'recomendado',
    title: 'Cartão de Confirmação de Inscrição impresso',
    description: 'Facilita a localização rápida do prédio, bloco e sala de prova na porta da instituição.'
  },
  {
    id: 'item-lanche-prova',
    category: 'recomendado',
    title: 'Lanche nutritivo e prático para o período da prova',
    description: 'Alimentos leves de fácil consumo: castanhas, frutas secas, barras de cereal, chocolate amargo ou sanduíche natural sem cheiro forte.'
  },
  {
    id: 'item-garrafa-agua',
    category: 'recomendado',
    title: 'Garrafa de água transparente e sem rótulo',
    description: 'A hidratação constante mantém o foco e reduz o cansaço cerebral ao longo das 90 questões.'
  },
  {
    id: 'item-declaracao-comparecimento',
    category: 'recomendado',
    title: 'Declaração de Comparecimento impressa (se necessária)',
    description: 'Caso precise justificar falta no trabalho ou universidade, leve a folha impressa para assinatura do chefe de sala no dia.'
  },

  // PLANEJAMENTO DO DESLOCAMENTO
  {
    id: 'item-checar-local',
    category: 'deslocamento',
    title: 'Consultar o local de prova no Cartão de Confirmação',
    description: 'Acesse a Página do Participante para conferir o nome da instituição, endereço exato e sala.'
  },
  {
    id: 'item-trajeto-simulado',
    category: 'deslocamento',
    title: 'Conferir o endereço e simular o trajeto com antecedência',
    description: 'Pesquise a rota nos aplicativos de mapas e calcule o tempo real de deslocamento no domingo.'
  },
  {
    id: 'item-transporte-domingo',
    category: 'deslocamento',
    title: 'Verificar opções de transporte e frotas de domingo',
    description: 'Lembre-se de que os ônibus e linhas de metrô operam com horários e intervalos reduzidos aos domingos.'
  },
  {
    id: 'item-saida-antecipada',
    category: 'deslocamento',
    title: 'Planejar sair com grande antecedência de casa',
    description: 'Programe-se para chegar ao portão entre 11h30 e 12h00, evitando qualquer estresse de última hora.'
  },
  {
    id: 'item-margem-transito',
    category: 'deslocamento',
    title: 'Considerar trânsito pesado e possíveis imprevistos',
    description: 'O entorno das escolas costuma congestionar intensamente entre 12h e 13h. Garanta margem de segurança.'
  }
];

export const GuiaOrganizacaoProva: React.FC = () => {
  const storageKey = 'enem2026_checklist_organizacao';

  // Estado das marcações do checklist com persistência no localStorage
  const [checkedIds, setCheckedIds] = useState<string[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(storageKey);
        return saved ? JSON.parse(saved) : [];
      } catch {
        return [];
      }
    }
    return [];
  });

  // Salva alterações no localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(storageKey, JSON.stringify(checkedIds));
      } catch (_) {}
    }
  }, [checkedIds]);

  const toggleCheck = (id: string) => {
    setCheckedIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleResetChecklist = () => {
    if (confirm('Deseja desmarcar todos os itens do checklist de preparação?')) {
      setCheckedIds([]);
      if (typeof window !== 'undefined') {
        localStorage.removeItem(storageKey);
      }
    }
  };

  const totalItems = CHECKLIST_ITEMS.length;
  const completedCount = checkedIds.length;
  const progressPercent = totalItems > 0 ? Math.round((completedCount / totalItems) * 100) : 0;
  const isAllCompleted = progressPercent === 100;

  return (
    <section 
      id="guia-organizacao-prova" 
      className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 lg:p-10 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-10 scroll-mt-24 transition-colors"
    >
      {/* 1. IDENTIDADE DO BLOCO */}
      <div className="space-y-3 border-b border-slate-200/80 dark:border-slate-800 pb-8">
        <div className="flex flex-wrap items-center gap-2.5">
          <span className="px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 font-black text-xs uppercase tracking-wider border border-emerald-300/60 dark:border-emerald-800 flex items-center gap-1.5 shadow-2xs">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>Categoria: Essencial</span>
          </span>

          <span className="px-2.5 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 font-bold text-xs border border-indigo-200 dark:border-indigo-800 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
            <span>Guia Interativo de Preparação</span>
          </span>
        </div>

        <div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            Organização da Prova
          </h2>
          <p className="text-base sm:text-lg font-bold text-indigo-600 dark:text-indigo-400 mt-1">
            Checklist Físico, Mental e Organização para o ENEM
          </p>
        </div>

        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl">
          Prepare-se para o dia da prova! Confira o que levar, como organizar sua alimentação, descansar corretamente, cuidar do corpo e evitar imprevistos antes de entrar no local de aplicação.
        </p>

        {/* Link Oficial do Inep Destacado */}
        <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
          <a
            href="https://www.gov.br/inep/pt-br/areas-de-atuacao/avaliacao-e-exames-educacionais/enem/orientacoes/no-dia-do-exame"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-xs sm:text-sm hover:bg-slate-800 dark:hover:bg-slate-100 transition-all shadow-sm"
          >
            <span>Consultar Orientações Oficiais do Inep</span>
            <ExternalLink className="w-4 h-4 opacity-75" />
          </a>

          <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5 italic">
            <Info className="w-4 h-4 text-slate-400 shrink-0" />
            <span>As normas e editais do Inep têm prioridade absoluta sobre qualquer recomendação geral.</span>
          </div>
        </div>
      </div>

      {/* BARRA DE PROGRESSO DO CHECKLIST GERAL */}
      <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white border border-indigo-800/50 shadow-md space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <span className="text-xs font-bold text-amber-300 uppercase tracking-wider block">
              Seu Progresso de Preparação
            </span>
            <h3 className="text-lg sm:text-xl font-black">
              {completedCount} de {totalItems} itens verificados ({progressPercent}%)
            </h3>
          </div>

          {completedCount > 0 && (
            <button
              onClick={handleResetChecklist}
              className="text-xs text-indigo-300 hover:text-white transition-colors flex items-center gap-1 cursor-pointer bg-white/10 px-3 py-1.5 rounded-xl border border-white/10"
              title="Desmarcar todos os itens"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reiniciar Checklist</span>
            </button>
          )}
        </div>

        {/* Barra Visual */}
        <div className="w-full h-3 rounded-full bg-white/15 overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-emerald-400 to-amber-300 transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Mensagem especial de 100% de conclusão */}
        {isAllCompleted ? (
          <div className="p-4 rounded-xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-200 text-xs sm:text-sm font-semibold flex items-center gap-2.5 animate-in fade-in duration-300 shadow-xs">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            <span>
              Você concluiu seu checklist de preparação! Agora confira seu documento, organize seus materiais e planeje seu trajeto. Boa prova!
            </span>
          </div>
        ) : (
          <p className="text-xs text-indigo-200/90 leading-relaxed">
            Marque cada item abaixo à medida que você for separando seus documentos, canetas e organizando seus horários para o exame.
          </p>
        )}
      </div>

      {/* 2. CHECKLIST INTERATIVO: O QUE LEVAR NO ENEM */}
      <div className="space-y-5">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 flex items-center justify-center font-bold">
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
              O Que Levar no ENEM (Checklist Interativo)
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Separe seus itens na véspera sobre a mesa para não esquecer nada ao sair de casa.
            </p>
          </div>
        </div>

        {/* Bloco de Itens Obrigatórios */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400">
            <AlertTriangle className="w-4 h-4" />
            <span>Itens Obrigatórios (Sem eles, você não entra ou não faz a prova)</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {CHECKLIST_ITEMS.filter(item => item.category === 'obrigatorio').map(item => {
              const isChecked = checkedIds.includes(item.id);
              return (
                <div
                  key={item.id}
                  onClick={() => toggleCheck(item.id)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 select-none ${
                    isChecked
                      ? 'border-emerald-500 bg-emerald-50/60 dark:bg-emerald-950/30 text-emerald-950 dark:text-emerald-100 shadow-2xs'
                      : 'border-rose-200 dark:border-rose-900/60 bg-rose-50/30 dark:bg-rose-950/20 text-slate-800 dark:text-slate-200 hover:border-rose-300'
                  }`}
                >
                  <div className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5 border transition-colors ${
                    isChecked 
                      ? 'bg-emerald-600 border-emerald-600 text-white' 
                      : 'border-slate-400 dark:border-slate-600 bg-white dark:bg-slate-800'
                  }`}>
                    {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`text-sm font-black ${isChecked ? 'line-through opacity-75' : ''}`}>
                        {item.title}
                      </span>
                      <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-rose-600 text-white">
                        Exigência Inep
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bloco de Itens Recomendados */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            <Sparkles className="w-4 h-4" />
            <span>Itens Recomendados para Conforto e Segurança</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {CHECKLIST_ITEMS.filter(item => item.category === 'recomendado').map(item => {
              const isChecked = checkedIds.includes(item.id);
              return (
                <div
                  key={item.id}
                  onClick={() => toggleCheck(item.id)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 select-none ${
                    isChecked
                      ? 'border-emerald-500 bg-emerald-50/60 dark:bg-emerald-950/30 text-emerald-950 dark:text-emerald-100 shadow-2xs'
                      : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 text-slate-800 dark:text-slate-200 hover:border-indigo-300'
                  }`}
                >
                  <div className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5 border transition-colors ${
                    isChecked 
                      ? 'bg-emerald-600 border-emerald-600 text-white' 
                      : 'border-slate-400 dark:border-slate-600 bg-white dark:bg-slate-800'
                  }`}>
                    {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`text-xs sm:text-sm font-bold ${isChecked ? 'line-through opacity-75' : ''}`}>
                        {item.title}
                      </span>
                      <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300">
                        Recomendado
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 3. O QUE NÃO LEVAR OU USAR NA SALA (ALERTA VISUAL - PROIBIDOS) */}
      <div className="p-6 sm:p-7 rounded-3xl bg-rose-50/70 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/60 space-y-5">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-2xl bg-rose-600 text-white flex items-center justify-center shrink-0 shadow-sm mt-0.5">
            <Ban className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded bg-rose-600 text-white">
                Risco de Eliminação Imediata
              </span>
            </div>
            <h3 className="text-lg sm:text-xl font-black text-rose-950 dark:text-rose-100 mt-1">
              O Que NÃO Levar ou Usar Durante a Prova
            </h3>
            <p className="text-xs sm:text-sm text-rose-900/90 dark:text-rose-200 leading-relaxed mt-1">
              Determinados objetos devem obrigatoriamente ficar guardados dentro do envelope porta-objetos fornecido pelo fiscal, lacrado e sob sua carteira. Os aparelhos eletrônicos devem permanecer <strong>completamente desligados</strong> (inclusive alarmes agendados).
            </p>
          </div>
        </div>

        {/* Grade de Itens Proibidos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
          {[
            {
              title: 'Celular e dispositivos eletrônicos',
              desc: 'Smartphones, smartwatches, fones de ouvido, tablets e calculadoras. Devem estar 100% desligados dentro do envelope lacrado.',
              icon: PhoneOff
            },
            {
              title: 'Relógios de qualquer tipo',
              desc: 'Relógios digitais ou analógicos são estritamente proibidos no pulso. O fiscal marca os horários na lousa a cada intervalo.',
              icon: Clock
            },
            {
              title: 'Óculos escuros, bonés e chapéus',
              desc: 'Acessórios que cubram o rosto, orelhas ou olhos (bonés, gorros, viseiras, capuzes) não são permitidos durante a aplicação.',
              icon: Ban
            },
            {
              title: 'Lápis, lapiseira, borracha e régua',
              desc: 'Não é permitido usar lápis, grafite, borrachas ou corretivo líquido para rasuras. Use apenas caneta preta transparente.',
              icon: AlertTriangle
            },
            {
              title: 'Canetas não transparentes',
              desc: 'Canetas com corpo colorido, opaco, metálico ou com tampa escura não são aceitas pelos fiscais de sala.',
              icon: Ban
            },
            {
              title: 'Livros, anotações e papéis avulsos',
              desc: 'Qualquer anotação, cola, resumo, apostila ou folha avulsa não autorizada acarreta desclassificação imediata.',
              icon: FileText
            },
            {
              title: 'Fones de ouvido e transmissores',
              desc: 'Aparelhos com tecnologia Bluetooth, fones com fio ou microfones são considerados tentativa de fraude.',
              icon: PhoneOff
            },
            {
              title: 'Armas de qualquer natureza',
              desc: 'Mesmo com porte legal, armas devem seguir protocolo especial com a coordenação do local.',
              icon: ShieldCheck
            }
          ].map((proibido, i) => {
            const Icon = proibido.icon;
            return (
              <div 
                key={i}
                className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-rose-200/80 dark:border-rose-900/50 space-y-1.5 shadow-2xs"
              >
                <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 font-bold text-xs">
                  <Icon className="w-4 h-4 shrink-0" />
                  <span className="line-clamp-1">{proibido.title}</span>
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-snug">
                  {proibido.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Alerta Destacado do Inep */}
        <div className="p-3.5 rounded-xl bg-rose-600 text-white text-xs font-semibold flex items-center gap-2.5 shadow-sm">
          <AlertTriangle className="w-4 h-4 shrink-0" />
          <span>
            <strong>Atenção máxima:</strong> Se o seu celular tocar ou vibrar durante o exame — mesmo lacrado dentro do envelope porta-objetos sob a sua carteira —, você será eliminado imediatamente da prova. Desative todos os alarmes programados!
          </span>
        </div>
      </div>

      {/* 4. PREPARAÇÃO FÍSICA ANTES DA PROVA (ORIENTAÇÕES PRÁTICAS) */}
      <div className="space-y-5">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 flex items-center justify-center font-bold">
            <Activity className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
              Preparação Física e Bem-Estar para o Exame
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Orientações gerais de saúde para garantir energia sustentada e evitar cansaço extremo nas 5 horas de prova.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Na Véspera */}
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3.5">
            <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-black text-sm">
              <Moon className="w-4 h-4" />
              <span>Na Véspera da Prova</span>
            </div>

            <ul className="space-y-2.5 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="text-indigo-500 font-bold">•</span>
                <span><strong>Dormir cedo:</strong> busque ao menos 7 a 8 horas de sono restaurador. Evite virar a noite estudando conteúdos de última hora.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-500 font-bold">•</span>
                <span><strong>Refeição equilibrada:</strong> opte por pratos habituais, leves e nutritivos. Evite comidas pesadas, gordurosas ou novos temperos.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-500 font-bold">•</span>
                <span><strong>Hidratação contínua:</strong> beba água regularmente ao longo do dia para o corpo iniciar a manhã descansado e hidratado.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-500 font-bold">•</span>
                <span><strong>Separar materiais:</strong> deixe documento, canetas e garrafa na mesa antes de deitar para dormir sem preocupações.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-500 font-bold">•</span>
                <span><strong>Descanso muscular:</strong> evite atividades físicas extenuantes ou jogos pesados que causem fadiga ou dores lombares.</span>
              </li>
            </ul>
          </div>

          {/* Na Manhã do Exame */}
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3.5">
            <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-black text-sm">
              <Sun className="w-4 h-4" />
              <span>Na Manhã do Exame</span>
            </div>

            <ul className="space-y-2.5 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="text-amber-500 font-bold">•</span>
                <span><strong>Acordar com calma:</strong> levante pelo menos 3 horas antes da abertura dos portões para evitar qualquer correria.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-500 font-bold">•</span>
                <span><strong>Café da manhã seguro:</strong> consuma alimentos familiares com carboidratos integrais e proteínas leves. Jamais faça a prova em jejum.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-500 font-bold">•</span>
                <span><strong>Cuidado com excesso de cafeína:</strong> energéticos ou doses altas de café podem desencadear taquicardia, ansiedade e idas constantes ao banheiro.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-500 font-bold">•</span>
                <span><strong>Roupas confortáveis:</strong> use sapatos já amaciados e roupas frescas, mas leve sempre um agasalho leve caso a sala tenha ar-condicionado forte.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-500 font-bold">•</span>
                <span><strong>Conferência final:</strong> cheque documento original com foto e canetas pretas transparentes no bolso da mochila.</span>
              </li>
            </ul>
          </div>

          {/* Durante a Prova */}
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3.5">
            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-black text-sm">
              <Clock className="w-4 h-4" />
              <span>Durante as Horas de Prova</span>
            </div>

            <ul className="space-y-2.5 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="text-emerald-500 font-bold">•</span>
                <span><strong>Respiração diafragmática:</strong> sentiu tensão? Pare por 20 segundos, inspire pelo nariz contando até 4 e solte o ar devagar pela boca.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-500 font-bold">•</span>
                <span><strong>Pausas estratégicas:</strong> a cada 90 minutos de prova, beba um gole d'água, alongue o pescoço e coma uma pequena porção do lanche.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-500 font-bold">•</span>
                <span><strong>Postura na carteira:</strong> mantenha a coluna apoiada e os pés no chão para evitar dores musculares prematuras.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-500 font-bold">•</span>
                <span><strong>Controle visual do tempo:</strong> consulte as marcações do quadro a cada bloco de 15 a 20 questões resolvidas.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-500 font-bold">•</span>
                <span><strong>Cartão-resposta com calma:</strong> comece a passar as respostas quando restar pelo menos 40 minutos para o término.</span>
              </li>
            </ul>
          </div>
        </div>

        <p className="text-[11px] text-slate-400 dark:text-slate-500 italic text-center">
          * Estas orientações possuem caráter educativo de bem-estar e não configuram recomendações médicas individualizadas.
        </p>
      </div>

      {/* 5. PLANEJAMENTO DO DESLOCAMENTO & HORÁRIOS OFICIAIS */}
      <div className="space-y-5">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-sky-100 dark:bg-sky-950 text-sky-700 dark:text-sky-300 flex items-center justify-center font-bold">
            <MapPin className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
              Planejamento do Deslocamento & Horários Oficiais
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              O trânsito no dia do exame é atípico e os portões fecham pontualmente às 13h no horário oficial de Brasília.
            </p>
          </div>
        </div>

        {/* Tabela Visual dos Horários Oficiais */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {[
            {
              time: '12h00',
              label: 'Abertura dos Portões',
              desc: 'Momento ideal para chegar, usar o banheiro com calma e localizar sua sala sem filas.',
              isCritical: false
            },
            {
              time: '13h00',
              label: 'Fechamento dos Portões',
              desc: 'IMPRETERÍVEL. Após às 13h00 não entra mais ninguém sob hipótese alguma.',
              isCritical: true
            },
            {
              time: '13h30',
              label: 'Início das Provas',
              desc: 'Procedimentos de segurança concluídos e autorização para romper o lacre do caderno.',
              isCritical: false
            },
            {
              time: '19h00',
              label: 'Término no 1º Domingo',
              desc: '5h30 de duração para Linguagens (45q), Ciências Humanas (45q) e Redação.',
              isCritical: false
            },
            {
              time: '18h30',
              label: 'Término no 2º Domingo',
              desc: '5h00 de duração para Matemática (45q) e Ciências da Natureza (45q).',
              isCritical: false
            }
          ].map((h, i) => (
            <div 
              key={i}
              className={`p-4 rounded-2xl border text-xs flex flex-col justify-between ${
                h.isCritical
                  ? 'bg-rose-600 text-white border-rose-700 shadow-md ring-2 ring-rose-400/50'
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className={`text-[10px] font-black uppercase tracking-wider ${h.isCritical ? 'text-rose-100' : 'text-slate-400'}`}>
                    {h.label}
                  </span>
                  <Clock className={`w-3.5 h-3.5 ${h.isCritical ? 'text-white' : 'text-indigo-500'}`} />
                </div>
                <span className={`text-xl font-black block my-1 ${h.isCritical ? 'text-white' : 'text-indigo-600 dark:text-indigo-400'}`}>
                  {h.time}
                </span>
                <p className={`text-[11px] leading-relaxed ${h.isCritical ? 'text-rose-100' : 'text-slate-500 dark:text-slate-400'}`}>
                  {h.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Checklist do Trajeto */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 pt-2">
          {CHECKLIST_ITEMS.filter(item => item.category === 'deslocamento').map(item => {
            const isChecked = checkedIds.includes(item.id);
            return (
              <div
                key={item.id}
                onClick={() => toggleCheck(item.id)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 select-none ${
                  isChecked
                    ? 'border-emerald-500 bg-emerald-50/60 dark:bg-emerald-950/30 text-emerald-950 dark:text-emerald-100 shadow-2xs'
                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 hover:border-sky-300'
                }`}
              >
                <div className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5 border transition-colors ${
                  isChecked 
                    ? 'bg-emerald-600 border-emerald-600 text-white' 
                    : 'border-slate-400 dark:border-slate-600 bg-white dark:bg-slate-800'
                }`}>
                  {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </div>

                <div className="space-y-1">
                  <span className={`text-xs sm:text-sm font-bold block ${isChecked ? 'line-through opacity-75' : ''}`}>
                    {item.title}
                  </span>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 6. ORGANIZAÇÃO EMOCIONAL E CONCENTRAÇÃO */}
      <div className="p-6 sm:p-8 rounded-3xl bg-indigo-50/70 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900/60 space-y-4">
        <div className="flex items-center gap-2.5">
          <Heart className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
            Organização Emocional e Concentração
          </h3>
        </div>

        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          O ENEM é uma prova de resistência tanto intelectual quanto psicológica. Adote estas estratégias mentais para manter o foco e a clareza durante o exame:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 pt-2">
          {[
            {
              title: 'Não tente aprender tudo na última hora',
              desc: 'Nos dias finais, o foco deve ser consolidação e segurança do que você já aprendeu, e não desespero com fórmulas inéditas.'
            },
            {
              title: 'Evite comparações com outros candidatos',
              desc: 'Não participe de rodinhas na porta debatendo apostas de temas ou gabaritos. Mantenha seus fones guardados e sua mente centrada.'
            },
            {
              title: 'Respirações lentas para controlar a ansiedade',
              desc: 'Ao sentar na carteira, pratique 3 ciclos de respirações lentas e profundas para baixar o batimento cardíaco antes de abrir o caderno.'
            },
            {
              title: 'Leia atentamente comandos e fontes',
              desc: 'Sublinhe palavras-chave no enunciado (como "destaca", "ironiza", "restringe", "exceto") para não cair em distratores clássicos.'
            },
            {
              title: 'Comece pelas questões fáceis e seguras',
              desc: 'A régua TRI valoriza a consistência: acertar todas as fáceis e médias garante a melhor pontuação. Deixe as difíceis e longas para o final.'
            },
            {
              title: 'Reserve tempo para o cartão-resposta',
              desc: 'Preencha as bolinhas com calma nos últimos 40 minutos. Erros no gabarito final por pressa não podem ser corrigidos.'
            }
          ].map((dica, i) => (
            <div 
              key={i}
              className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-indigo-100 dark:border-indigo-900/50 space-y-1 shadow-2xs text-xs"
            >
              <span className="font-bold text-slate-900 dark:text-white block text-sm">
                {dica.title}
              </span>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                {dica.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
