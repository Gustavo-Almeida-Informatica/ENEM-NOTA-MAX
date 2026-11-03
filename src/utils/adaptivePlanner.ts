// Sistema Inteligente de Planejamento Adaptativo ENEM 2026
// Fuso horário oficial: Brasília (America/Sao_Paulo - UTC-3)
// Adaptação dinâmica de cronograma por dias restantes, preservação de progresso em localStorage
// e suporte completo ao 1º Dia (08/11/2026) e 2º Dia (15/11/2026).

import { diffCalendarDays, formatDataBR, getBrasiliaDateString, ENEM_2026_DATAS } from './enemCountdown';

export type AdaptiveModality = 'completa' | 'intensiva' | 'expressa' | 'dia_da_prova' | 'encerrado';

export interface AdaptiveTask {
  id: string;
  title: string;
  discipline: string;
  summary: string;
  estimatedMinutes: number;
  priority: 'essencial' | 'alta' | 'media';
  actionRoute?: string;
  actionLabel: string;
  category: 'organizacao' | 'linguagens' | 'humanas' | 'redacao' | 'matematica' | 'natureza' | 'simulado' | 'checklist' | 'descanso';
}

export interface AdaptiveDayBlock {
  dayIndex: number;
  dayLabel: string;
  focusBadge: string;
  description: string;
  tasks: AdaptiveTask[];
}

export interface ExamDayGuide {
  title: string;
  motivationalMessage: string;
  schedules: { label: string; time: string; note: string; highlight?: boolean }[];
  checklistMaterials: { item: string; required: boolean; tip: string }[];
  timeManagementTips: { block: string; allocation: string; detail: string }[];
  mindsetTips: string[];
}

export interface AdaptivePlan {
  currentDateStr: string; // YYYY-MM-DD
  stage: 'dia1' | 'dia2' | 'encerrado';
  stageTitle: string;
  targetDateStr: string;
  targetDateBR: string;
  diasRestantes: number;
  modality: AdaptiveModality;
  modalityBadgeLabel: string;
  modalityDescription: string;
  dynamicMessage: string;
  disciplines: string[];
  blocks: AdaptiveDayBlock[];
  allTasks: AdaptiveTask[];
  examDayGuide?: ExamDayGuide;
  isDiaDaProva: boolean;
  isEncerrado: boolean;
}

// ==========================================
// BANCO CANÔNICO DE ATIVIDADES ADAPTATIVAS
// (IDs estáveis para preservar progresso entre modalidades)
// ==========================================

// --- ATIVIDADES DO 1º DIA ---
export const TASK_D1_ORG_DIAG: AdaptiveTask = {
  id: 'task-d1-org-diag',
  title: 'Diagnóstico Rápido e Estratégia TRI do 1º Dia',
  discipline: 'Organização & Estratégia',
  summary: 'Mapeie seus pontos fortes em Linguagens e Humanas e defina a ordem de resolução: começar pelas questões de leitura direta e tema de redação.',
  estimatedMinutes: 20,
  priority: 'alta',
  actionRoute: '/dicas',
  actionLabel: 'Ver Estratégia de Prova',
  category: 'organizacao',
};

export const TASK_D1_LING_INTERP: AdaptiveTask = {
  id: 'task-d1-ling-interp',
  title: 'Interpretação Textual & Gêneros do Cotidiano',
  discipline: 'Linguagens',
  summary: 'Fixe a identificação da tese, tom do autor e distratores clássicos (extrapolação, redução e contradição) em textos jornalísticos e publicitários.',
  estimatedMinutes: 25,
  priority: 'essencial',
  actionRoute: '/assunto/generos-textuais',
  actionLabel: 'Ver Resumo de Gêneros',
  category: 'linguagens',
};

export const TASK_D1_LING_FUNCOES: AdaptiveTask = {
  id: 'task-d1-ling-funcoes',
  title: 'Funções da Linguagem & Variação Linguística',
  discipline: 'Linguagens',
  summary: 'Revise a função conativa/apelativa (anúncios) e metalinguística (poemas e charges sobre a linguagem), além do respeito às variedades regionais.',
  estimatedMinutes: 20,
  priority: 'alta',
  actionRoute: '/assunto/funcoes-da-linguagem',
  actionLabel: 'Revisar Funções',
  category: 'linguagens',
};

export const TASK_D1_HUM_CIDADANIA: AdaptiveTask = {
  id: 'task-d1-hum-cidadania',
  title: 'Cidadania, Direitos e Contratualismo Político',
  discipline: 'Ciências Humanas',
  summary: 'Conecte a Constituição de 1988 com os conceitos de Hobbes, Locke e Rousseau sobre soberania, direitos civis e papel social do Estado.',
  estimatedMinutes: 25,
  priority: 'essencial',
  actionRoute: '/mapas',
  actionLabel: 'Mapas Mentais de Humanas',
  category: 'humanas',
};

export const TASK_D1_HUM_HIST_GEO: AdaptiveTask = {
  id: 'task-d1-hum-hist-geo',
  title: 'Processos Históricos e Dinâmicas Espaciais Brasileiras',
  discipline: 'Ciências Humanas',
  summary: 'Revisão dos momentos-chave da Era Vargas, Ditadura Militar, industrialização, urbanização acelerada e impactos agrários no Brasil.',
  estimatedMinutes: 25,
  priority: 'alta',
  actionRoute: '/#mural',
  actionLabel: 'Ver Resumos de Humanas',
  category: 'humanas',
};

export const TASK_D1_RED_ESTRUTURA: AdaptiveTask = {
  id: 'task-d1-red-estrutura',
  title: 'Estrutura da Redação & As 5 Competências do ENEM',
  discipline: 'Redação',
  summary: 'Relembre a arquitetura do texto dissertativo: Introdução com tese dupla, dois desenvolvimentos argumentativos consistentes e conclusão com proposta.',
  estimatedMinutes: 20,
  priority: 'essencial',
  actionRoute: '/corretor',
  actionLabel: 'Abrir Corretor com IA',
  category: 'redacao',
};

export const TASK_D1_RED_INTERVENCAO: AdaptiveTask = {
  id: 'task-d1-red-intervencao',
  title: 'Checklist dos 5 Elementos da Proposta de Intervenção',
  discipline: 'Redação',
  summary: 'Foque nos 5 elementos fundamentais: Agente claro, Ação no infinitivo, Meio/Modo detalhado, Efeito social e 1 Detalhamento explicativo.',
  estimatedMinutes: 20,
  priority: 'essencial',
  actionRoute: '/repertorio',
  actionLabel: 'Consultar Repertórios',
  category: 'redacao',
};

export const TASK_D1_REV_MAPAS: AdaptiveTask = {
  id: 'task-d1-rev-mapas',
  title: 'Revisão Conectada com Mapas Mentais & Repertórios',
  discipline: 'Revisão Geral',
  summary: 'Conecte repertórios de sociologia (Bauman, Bourdieu) a eixos temáticos amplos (educação, tecnologia, desigualdade, meio ambiente).',
  estimatedMinutes: 20,
  priority: 'alta',
  actionRoute: '/mapas',
  actionLabel: 'Explorar Mapas',
  category: 'humanas',
};

export const TASK_D1_SIMULADO: AdaptiveTask = {
  id: 'task-d1-simulado',
  title: 'Simulado Rápido de Treinamento (Questões Autorais)',
  discipline: 'Simulado Integrado',
  summary: 'Treine interpretação e eliminação de distratores nas questões autorais cronometradas da Central da Reta Final.',
  estimatedMinutes: 25,
  priority: 'alta',
  actionLabel: 'Fazer Simulado Abaixo',
  category: 'simulado',
};

export const TASK_D1_CHECKLIST_FINAL: AdaptiveTask = {
  id: 'task-d1-checklist-final',
  title: 'Checklist Físico & Organização para o 1º Domingo',
  discipline: 'Organização da Prova',
  summary: 'Separe 3 canetas pretas de tubo transparente, documento oficial original com foto, garrafa de água transparente sem rótulo e programe o trajeto.',
  estimatedMinutes: 15,
  priority: 'essencial',
  actionLabel: 'Ver Orientações Oficiais',
  category: 'checklist',
};

// --- ATIVIDADES DO 2º DIA ---
export const TASK_D2_ORG_TRI: AdaptiveTask = {
  id: 'task-d2-org-tri',
  title: 'Estratégia TRI de Matemática: Priorizar as Fáceis',
  discipline: 'Estratégia TRI',
  summary: 'No 2º dia, errar questões básicas pode penalizar sua coerência na TRI. Identifique e resolva primeiro proporções, escalas, média e leitura gráfica.',
  estimatedMinutes: 20,
  priority: 'essencial',
  actionRoute: '/dicas',
  actionLabel: 'Ver Calculadora de Tempo',
  category: 'organizacao',
};

export const TASK_D2_MAT_BASICA: AdaptiveTask = {
  id: 'task-d2-mat-basica',
  title: 'Proporção, Escala, Regra de Três e Porcentagem',
  discipline: 'Matemática',
  summary: 'Revise escalas cartográficas lineares, áreas e volumes, aumentos percentuais sucessivos e raciocínio proporcional rápido.',
  estimatedMinutes: 25,
  priority: 'essencial',
  actionRoute: '/#mural',
  actionLabel: 'Resumos de Matemática',
  category: 'matematica',
};

export const TASK_D2_MAT_GEO: AdaptiveTask = {
  id: 'task-d2-mat-geo',
  title: 'Geometria Espacial & Gráficos Estatísticos',
  discipline: 'Matemática',
  summary: 'Cálculo de volume de cilindros, prismas e cones, interpretação de gráficos de linha, barras e setores.',
  estimatedMinutes: 25,
  priority: 'alta',
  actionRoute: '/#mural',
  actionLabel: 'Ver Fórmulas de Geometria',
  category: 'matematica',
};

export const TASK_D2_BIO_ECOLOGIA: AdaptiveTask = {
  id: 'task-d2-bio-ecologia',
  title: 'Ecologia Aplicada: Eutrofização, Cadeias e Ciclos',
  discipline: 'Biologia',
  summary: 'Tema recorrente em Natureza: fluxo de energia, biomagnificação de poluentes, ciclos do nitrogênio e carbono e impactos ambientais.',
  estimatedMinutes: 25,
  priority: 'essencial',
  actionRoute: '/mapas?id=meio-ambiente',
  actionLabel: 'Mapa de Meio Ambiente',
  category: 'natureza',
};

export const TASK_D2_FIS_ENERGIA: AdaptiveTask = {
  id: 'task-d2-fis-energia',
  title: 'Eletrodinâmica & Consumo de Energia Elétrica',
  discipline: 'Física',
  summary: 'Associação de resistores, fusíveis e cálculo de consumo residencial (kWh = Potência em kW x tempo em horas).',
  estimatedMinutes: 20,
  priority: 'alta',
  actionRoute: '/#mural',
  actionLabel: 'Resumos de Física',
  category: 'natureza',
};

export const TASK_D2_QUI_ORGANICA: AdaptiveTask = {
  id: 'task-d2-qui-organica',
  title: 'Química Orgânica & Reações no Cotidiano',
  discipline: 'Química',
  summary: 'Identificação de funções orgânicas, forças intermoleculares, polaridade em sabões e detergentes e pH em processos biológicos.',
  estimatedMinutes: 20,
  priority: 'alta',
  actionRoute: '/#mural',
  actionLabel: 'Resumos de Química',
  category: 'natureza',
};

export const TASK_D2_SIMULADO: AdaptiveTask = {
  id: 'task-d2-simulado',
  title: 'Simulado Rápido do 2º Dia (Questões Autorais)',
  discipline: 'Simulado Integrado',
  summary: 'Resolva questões cronometradas de Matemática e Ciências da Natureza para calibrar velocidade de raciocínio.',
  estimatedMinutes: 25,
  priority: 'alta',
  actionLabel: 'Fazer Simulado do 2º Dia',
  category: 'simulado',
};

export const TASK_D2_CHECKLIST_FINAL: AdaptiveTask = {
  id: 'task-d2-checklist-final',
  title: 'Checklist Físico & Preparação do 2º Domingo',
  discipline: 'Organização da Prova',
  summary: 'Reponha as canetas pretas transparentes, confira o local e horário de fechamento (13h) e descanse a mente antes da prova de exatas.',
  estimatedMinutes: 15,
  priority: 'essencial',
  actionLabel: 'Ver Orientações Oficiais',
  category: 'checklist',
};

// ==========================================
// ORIENTAÇÕES DO DIA DA PROVA (0 DIAS)
// ==========================================

export function getExamDayGuide(stage: 'dia1' | 'dia2'): ExamDayGuide {
  const isDia1 = stage === 'dia1';

  return {
    title: isDia1 
      ? 'Orientações Oficiais — 1º Domingo do ENEM 2026' 
      : 'Orientações Oficiais — 2º Domingo do ENEM 2026',
    motivationalMessage: 'Você chegou até aqui. Confie na sua preparação! Respire fundo e dê o seu melhor.',
    schedules: [
      { label: 'Chegada Recomendada', time: '12h00', note: 'Evite imprevistos de trânsito e localize sua sala com calma.' },
      { label: 'Fechamento dos Portões', time: '13h00', note: 'Impreterível no fuso de Brasília. Os portões fecham pontualmente.', highlight: true },
      { label: 'Início das Provas', time: '13h30', note: 'Aguarde a autorização oficial do fiscal para abrir o caderno.' },
      { label: 'Saída sem Caderno', time: '15h30', note: 'Permanência mínima de 2 horas obrigatória para validação da presença.' },
      { label: 'Saída com Caderno', time: '18h30', note: 'Permitido levar o caderno nos últimos 30 minutos de prova.' },
      { 
        label: 'Término da Prova', 
        time: isDia1 ? '19h00' : '18h30', 
        note: isDia1 ? 'Total de 5h30min (inclui a Redação).' : 'Total de 5h00min (Matemática e Natureza).' 
      },
    ],
    checklistMaterials: [
      { item: 'Caneta esferográfica de tinta preta', required: true, tip: 'Fabricada em tubo transparente. Leve 3 unidades já testadas.' },
      { item: 'Documento oficial original com foto', required: true, tip: 'RG, CNH, Passaporte ou no app oficial Gov.br/e-Título com foto.' },
      { item: 'Garrafa de água transparente', required: false, tip: 'Sem rótulo. Hidrate-se em pequenos goles durante a prova.' },
      { item: 'Alimentos leves e práticos', required: false, tip: 'Embalagens transparentes (barras de cereal, castanhas, chocolate amargo).' },
      { item: 'Cartão de Confirmação de Inscrição', required: false, tip: 'Recomendável levar impresso para facilitar encontrar sua sala.' },
      { item: 'Celular e eletrônicos desligados', required: true, tip: 'Desative alarmes e coloque no envelope porta-objetos lacrado.' },
    ],
    timeManagementTips: isDia1 ? [
      { block: 'Leitura da Proposta de Redação', allocation: '10 a 15 min', detail: 'Leia os textos motivadores no início, faça a tempestade de ideias e rascunhe seu projeto de texto.' },
      { block: 'Primeiro Bloco de Questões', allocation: '90 min', detail: 'Resolva as 45 questões da área em que você tem mais facilidade (Linguagens ou Humanas).' },
      { block: 'Redação Definitiva', allocation: '50 a 60 min', detail: 'Transcreva o texto para a folha definitiva com caligrafia legível e proposta completa.' },
      { block: 'Segundo Bloco de Questões', allocation: '90 min', detail: 'Resolva a segunda área, pulando textos excessivamente longos para voltar depois.' },
      { block: 'Gabarito Final', allocation: '30 min', detail: 'Passe as respostas com atenção máxima para não inverter linhas.' },
    ] : [
      { block: 'Varredura Rápida (Questões Básicas)', allocation: '60 min', detail: 'Identifique e resolva as questões diretas de proporcionalidade, gráficos e conceitos biológicos.' },
      { block: 'Ciências da Natureza (Média Complexidade)', allocation: '80 min', detail: 'Resolva questões de física, química e biologia que exigem raciocínio conceitual.' },
      { block: 'Matemática (Média e Alta Complexidade)', allocation: '90 min', detail: 'Dedique tempo para geometria, funções e probabilidade, sem travar em contas longas.' },
      { block: 'Revisão dos Chutes Conscientes', allocation: '30 min', detail: 'Retorne às questões pendentes e elimine distratores absurdos pela lógica.' },
      { block: 'Preenchimento do Cartão-Resposta', allocation: '30 min', detail: 'Passe com concentração total para evitar rasuras no leitor óptico.' },
    ],
    mindsetTips: [
      'Não tente revisar matérias complexas hoje. Sua memória de longo prazo já está consolidada.',
      'Alimente-se com refeições leves e familiares ao seu organismo.',
      'Se travar em uma questão por mais de 3 minutos, circule e siga em frente para garantir as mais acessíveis.',
      'Lembre-se: o ENEM premia a regularidade e a coerência pedagógica pela TRI.',
    ],
  };
}

// ==========================================
// GERADOR DO PLANO ADAPTATIVO
// ==========================================

export function generateAdaptivePlan(
  dataSimulada?: string,
  forcarDia?: 'dia1' | 'dia2'
): AdaptivePlan {
  // 1. Identificar a data atual no fuso de Brasília (ou query param)
  let currentDateStr = dataSimulada;
  if (!currentDateStr && typeof window !== 'undefined') {
    const params = new URLSearchParams(window.location.search);
    const paramDate = params.get('simularData') || params.get('dataSimulada');
    if (paramDate && /^\d{4}-\d{2}-\d{2}$/.test(paramDate)) {
      currentDateStr = paramDate;
    }
  }

  if (!currentDateStr) {
    currentDateStr = getBrasiliaDateString();
  }

  const { dia1, dia2 } = ENEM_2026_DATAS;

  // 2. Identificar a etapa (1º Dia vs 2º Dia)
  let stage: 'dia1' | 'dia2' | 'encerrado';
  let targetDateStr: string;

  if (currentDateStr > dia2) {
    // Após 15/11/2026 a campanha permanece estritamente encerrada sem reativação de modo de prova
    stage = 'encerrado';
    targetDateStr = dia2;
  } else if (forcarDia) {
    stage = forcarDia;
    targetDateStr = forcarDia === 'dia1' ? dia1 : dia2;
  } else if (currentDateStr <= dia1) {
    stage = 'dia1';
    targetDateStr = dia1;
  } else {
    stage = 'dia2';
    targetDateStr = dia2;
  }

  // 3. Calcular quantos dias restam
  const diasRestantes = stage === 'encerrado' ? 0 : Math.max(0, diffCalendarDays(currentDateStr, targetDateStr));

  // 4. Selecionar modalidade automática
  let modality: AdaptiveModality;
  if (stage === 'encerrado') {
    modality = 'encerrado';
  } else if (diasRestantes === 0) {
    modality = 'dia_da_prova';
  } else if (diasRestantes >= 5) {
    modality = 'completa';
  } else if (diasRestantes >= 3) {
    modality = 'intensiva';
  } else {
    modality = 'expressa'; // 1 ou 2 dias
  }

  // 5. Mensagens dinâmicas exigidas na especificação
  let dynamicMessage: string;
  let modalityBadgeLabel: string;
  let modalityDescription: string;

  if (modality === 'dia_da_prova') {
    dynamicMessage = 'Você chegou até aqui. Confie na sua preparação! Respire fundo e dê o seu melhor.';
    modalityBadgeLabel = 'DIA DA PROVA';
    modalityDescription = 'Hoje não é dia de estudo pesado. Foco em tranquilidade, horários, checklist e gestão de tempo.';
  } else if (diasRestantes === 6) {
    dynamicMessage = 'Ainda temos tempo para uma boa preparação! Vamos construir sua base com calma e método.';
    modalityBadgeLabel = 'PREPARAÇÃO COMPLETA (6 DIAS)';
    modalityDescription = 'Cronograma estruturado com cobertura equilibrada de todas as competências em 6 blocos diários.';
  } else if (diasRestantes === 5) {
    dynamicMessage = 'Ainda temos tempo para uma boa preparação! Vamos construir sua base com calma e método.';
    modalityBadgeLabel = 'PREPARAÇÃO COMPLETA (5 DIAS)';
    modalityDescription = 'Cronograma balanceado em 5 blocos diários com diagnóstico progressivo e revisão geral.';
  } else if (diasRestantes === 4) {
    dynamicMessage = 'Vamos aproveitar cada dia com estratégia! Foco no que realmente move sua nota.';
    modalityBadgeLabel = 'PREPARAÇÃO INTENSIVA (4 DIAS)';
    modalityDescription = 'Conteúdos agrupados em 4 blocos diários com foco direcionado nas disciplinas de maior impacto.';
  } else if (diasRestantes === 3) {
    dynamicMessage = 'Vamos aproveitar cada dia com estratégia! Foco no que realmente move sua nota.';
    modalityBadgeLabel = 'PREPARAÇÃO INTENSIVA (3 DIAS)';
    modalityDescription = 'Distribuição estratégica em 3 blocos: Linguagens/Humanas, Redação/Competências e Simulado/Checklist.';
  } else if (diasRestantes === 2) {
    dynamicMessage = 'Revisão expressa: foco absoluto nos conceitos-chave sem sobrecarga cognitiva.';
    modalityBadgeLabel = 'REVISÃO EXPRESSA (2 DIAS)';
    modalityDescription = 'Síntese de alto rendimento em 2 blocos: conteúdos essenciais e véspera com simulado e descanso.';
  } else if (diasRestantes === 1) {
    dynamicMessage = 'Hoje é hora de revisar o essencial e descansar. Nada de sobrecarga na véspera!';
    modalityBadgeLabel = 'REVISÃO EXPRESSA (1 DIA)';
    modalityDescription = 'Bloco único e condensado: revisão expressa, checklist de materiais e orientação para descanso.';
  } else {
    dynamicMessage = 'A campanha do ENEM 2026 foi concluída. Parabéns por toda a dedicação!';
    modalityBadgeLabel = 'CAMPANHA ENCERRADA';
    modalityDescription = 'Provas finalizadas com sucesso.';
  }

  // 6. Disciplinas da etapa
  const disciplines = stage === 'dia1' 
    ? ['Linguagens e Códigos', 'Ciências Humanas', 'Redação Nota 1000']
    : stage === 'dia2'
      ? ['Matemática e suas Tecnologias', 'Ciências da Natureza (Física, Química, Biologia)']
      : [];

  const stageTitle = stage === 'dia1'
    ? '1º Dia: Linguagens, Redação & Humanas'
    : stage === 'dia2'
      ? '2º Dia: Natureza & Matemática'
      : 'ENEM 2026 Finalizado';

  // 7. Gerar blocos adaptativos de acordo com o estágio e dias restantes
  // REGRA: exatamente N blocos para N dias restantes (6d=6, 5d=5, 4d=4, 3d=3, 2d=2, 1d=1, 0d=0)
  const blocks: AdaptiveDayBlock[] = [];

  if (modality === 'dia_da_prova' || stage === 'encerrado') {
    // 0 blocos de estudo: dia da prova foca em orientações e checklist
  } else if (stage === 'dia1') {
    if (diasRestantes >= 6) {
      // 6 DIAS = EXATAMENTE 6 BLOCOS
      blocks.push(
        {
          dayIndex: 1,
          dayLabel: 'Dia 1 — Organização & Diagnóstico',
          focusBadge: 'ESTRATÉGIA TRI',
          description: 'Mapeamento de forças, planejamento de tempo e alinhamento com a TRI.',
          tasks: [TASK_D1_ORG_DIAG, TASK_D1_RED_ESTRUTURA],
        },
        {
          dayIndex: 2,
          dayLabel: 'Dia 2 — Linguagens & Interpretação',
          focusBadge: 'LEITURA CRÍTICA',
          description: 'Gêneros do cotidiano, funções da linguagem e estratégias de distratores.',
          tasks: [TASK_D1_LING_INTERP, TASK_D1_LING_FUNCOES],
        },
        {
          dayIndex: 3,
          dayLabel: 'Dia 3 — Ciências Humanas',
          focusBadge: 'CONCEITOS POLÍTICOS & HISTÓRIA',
          description: 'Cidadania, contratualismo, constituição e processos sociais brasileiros.',
          tasks: [TASK_D1_HUM_CIDADANIA, TASK_D1_HUM_HIST_GEO],
        },
        {
          dayIndex: 4,
          dayLabel: 'Dia 4 — Redação & Intervenção',
          focusBadge: 'COMPETÊNCIA 5',
          description: 'Os 5 elementos fundamentais e repertórios para eixos amplos.',
          tasks: [TASK_D1_RED_INTERVENCAO, TASK_D1_REV_MAPAS],
        },
        {
          dayIndex: 5,
          dayLabel: 'Dia 5 — Revisão Geral Conectada',
          focusBadge: 'FIXAÇÃO DINÂMICA',
          description: 'Resumos cruzados, alusões interdisciplinares e ajuste de pontos fracos.',
          tasks: [TASK_D1_REV_MAPAS, TASK_D1_SIMULADO],
        },
        {
          dayIndex: 6,
          dayLabel: 'Dia 6 — Simulado Leve & Checklist',
          focusBadge: 'VÉSPERA CONSCIENTE',
          description: 'Calibragem de velocidade, separação de canetas e descanso noturno.',
          tasks: [TASK_D1_SIMULADO, TASK_D1_CHECKLIST_FINAL],
        }
      );
    } else if (diasRestantes === 5) {
      // 5 DIAS = EXATAMENTE 5 BLOCOS
      blocks.push(
        {
          dayIndex: 1,
          dayLabel: 'Dia 1 — Organização, TRI & Diagnóstico',
          focusBadge: 'ESTRATÉGIA TRI',
          description: 'Mapeamento de forças e priorização de questões com leitura direta.',
          tasks: [TASK_D1_ORG_DIAG, TASK_D1_RED_ESTRUTURA],
        },
        {
          dayIndex: 2,
          dayLabel: 'Dia 2 — Linguagens & Interpretação Textual',
          focusBadge: 'LEITURA CRÍTICA',
          description: 'Gêneros do cotidiano, funções da linguagem e eliminação de distratores.',
          tasks: [TASK_D1_LING_INTERP, TASK_D1_LING_FUNCOES],
        },
        {
          dayIndex: 3,
          dayLabel: 'Dia 3 — Ciências Humanas & Cidadania',
          focusBadge: 'HUMANAS & HISTÓRIA',
          description: 'Cidadania, contratualismo, constituição e processos históricos do Brasil.',
          tasks: [TASK_D1_HUM_CIDADANIA, TASK_D1_HUM_HIST_GEO],
        },
        {
          dayIndex: 4,
          dayLabel: 'Dia 4 — Redação Nota 1000 & Revisão Geral',
          focusBadge: 'COMPETÊNCIA 5',
          description: 'Checklist dos 5 elementos da proposta e conexão com mapas mentais.',
          tasks: [TASK_D1_RED_INTERVENCAO, TASK_D1_REV_MAPAS],
        },
        {
          dayIndex: 5,
          dayLabel: 'Dia 5 — Simulado Leve & Checklist da Véspera',
          focusBadge: 'VÉSPERA CONSCIENTE',
          description: 'Simulado autoral de treinamento, checagem de canetas transparentes e descanso.',
          tasks: [TASK_D1_SIMULADO, TASK_D1_CHECKLIST_FINAL],
        }
      );
    } else if (diasRestantes === 4) {
      // 4 DIAS = EXATAMENTE 4 BLOCOS
      blocks.push(
        {
          dayIndex: 1,
          dayLabel: 'Dia 1 — Linguagens, Interpretação & Estratégia TRI',
          focusBadge: 'LEITURA & MÉTODO',
          description: 'Interpretação textual, identificação de tese e estratégia de resolução rápida.',
          tasks: [TASK_D1_ORG_DIAG, TASK_D1_LING_INTERP],
        },
        {
          dayIndex: 2,
          dayLabel: 'Dia 2 — Ciências Humanas, História & Cidadania',
          focusBadge: 'HUMANAS CONTEXTUAL',
          description: 'Conceitos de direitos, processos históricos e dinâmicas sociais brasileiras.',
          tasks: [TASK_D1_HUM_CIDADANIA, TASK_D1_HUM_HIST_GEO],
        },
        {
          dayIndex: 3,
          dayLabel: 'Dia 3 — Redação, Projeto de Texto & Intervenção',
          focusBadge: 'ESTRUTURA & NOTA',
          description: 'Estrutura dissertativa e os 5 elementos essenciais da proposta de intervenção.',
          tasks: [TASK_D1_RED_ESTRUTURA, TASK_D1_RED_INTERVENCAO],
        },
        {
          dayIndex: 4,
          dayLabel: 'Dia 4 — Simulado Leve, Checklist & Véspera',
          focusBadge: 'ORGANIZAÇÃO & DESCANSO',
          description: 'Simulado autoral cronometrado, separação de materiais e descanso noturno.',
          tasks: [TASK_D1_SIMULADO, TASK_D1_CHECKLIST_FINAL],
        }
      );
    } else if (diasRestantes === 3) {
      // 3 DIAS = EXATAMENTE 3 BLOCOS (exemplo da especificação)
      blocks.push(
        {
          dayIndex: 1,
          dayLabel: 'Dia 1 — Linguagens e Humanas',
          focusBadge: 'LEITURA & CONCEITOS',
          description: 'Interpretação textual direta e conceitos fundamentais de cidadania e história.',
          tasks: [TASK_D1_LING_INTERP, TASK_D1_HUM_CIDADANIA],
        },
        {
          dayIndex: 2,
          dayLabel: 'Dia 2 — Redação e Competências',
          focusBadge: 'ESTRUTURA & INTERVENÇÃO',
          description: 'Projeto de texto dissertativo e checklist dos 5 elementos da proposta de intervenção.',
          tasks: [TASK_D1_RED_ESTRUTURA, TASK_D1_RED_INTERVENCAO],
        },
        {
          dayIndex: 3,
          dayLabel: 'Dia 3 — Simulado Leve, Revisão e Checklist',
          focusBadge: 'SIMULADO & VÉSPERA',
          description: 'Simulado autoral de treinamento, revisão de distratores, checklist de materiais e descanso.',
          tasks: [TASK_D1_SIMULADO, TASK_D1_CHECKLIST_FINAL],
        }
      );
    } else if (diasRestantes === 2) {
      // 2 DIAS = EXATAMENTE 2 BLOCOS
      blocks.push(
        {
          dayIndex: 1,
          dayLabel: 'Dia 1 — Síntese Crítica: Linguagens, Humanas e Redação',
          focusBadge: 'CONCEITOS DECISIVOS',
          description: 'Interpretação textual, conceitos mais recorrentes de Humanas e estrutura da Redação.',
          tasks: [TASK_D1_LING_INTERP, TASK_D1_HUM_CIDADANIA, TASK_D1_RED_INTERVENCAO],
        },
        {
          dayIndex: 2,
          dayLabel: 'Dia 2 — Simulado Rápido de Treinamento, Checklist & Descanso',
          focusBadge: 'VÉSPERA TRANQUILA',
          description: 'Simulado autoral leve, revisão dos principais distratores, organização física e descanso.',
          tasks: [TASK_D1_SIMULADO, TASK_D1_CHECKLIST_FINAL],
        }
      );
    } else if (diasRestantes === 1) {
      // 1 DIA = EXATAMENTE 1 BLOCO (exemplo da especificação: sem 2º dia!)
      blocks.push(
        {
          dayIndex: 1,
          dayLabel: 'Dia Único — Revisão Expressa (Linguagens, Humanas e Redação) & Checklist',
          focusBadge: 'VÉSPERA ESSENCIAL',
          description: 'Revisão expressa dos pilares de Linguagens, Humanas e Redação, seguida de checklist de materiais e orientação para descanso.',
          tasks: [TASK_D1_LING_INTERP, TASK_D1_HUM_CIDADANIA, TASK_D1_RED_INTERVENCAO, TASK_D1_CHECKLIST_FINAL],
        }
      );
    }
  } else if (stage === 'dia2') {
    if (diasRestantes >= 6) {
      // 6 DIAS = EXATAMENTE 6 BLOCOS
      blocks.push(
        {
          dayIndex: 1,
          dayLabel: 'Dia 1 — Estratégia TRI em Exatas & Diagnóstico',
          focusBadge: 'TRI & GESTÃO DO TEMPO',
          description: 'Identificação imediata de questões de leitura direta para valorizar sua nota pela TRI.',
          tasks: [TASK_D2_ORG_TRI, TASK_D2_MAT_BASICA],
        },
        {
          dayIndex: 2,
          dayLabel: 'Dia 2 — Matemática Básica e Proporções',
          focusBadge: 'ALTA RECORRÊNCIA',
          description: 'Escalas cartográficas, porcentagens, média aritmética e raciocínio proporcional.',
          tasks: [TASK_D2_MAT_BASICA, TASK_D2_MAT_GEO],
        },
        {
          dayIndex: 3,
          dayLabel: 'Dia 3 — Biologia & Ecologia Aplicada',
          focusBadge: 'CIÊNCIAS DA NATUREZA',
          description: 'Eutrofização, biomagnificação, ciclos da matéria e impactos ambientais.',
          tasks: [TASK_D2_BIO_ECOLOGIA],
        },
        {
          dayIndex: 4,
          dayLabel: 'Dia 4 — Física & Consumo Elétrico no Cotidiano',
          focusBadge: 'FÍSICA DO COTIDIANO',
          description: 'Cálculo de kWh residencial, circuitos simples e calorimetria básica.',
          tasks: [TASK_D2_FIS_ENERGIA],
        },
        {
          dayIndex: 5,
          dayLabel: 'Dia 5 — Química Orgânica & Soluções',
          focusBadge: 'QUÍMICA APLICADA',
          description: 'Identificação de funções orgânicas, polaridade, pH e forças intermoleculares.',
          tasks: [TASK_D2_QUI_ORGANICA, TASK_D2_SIMULADO],
        },
        {
          dayIndex: 6,
          dayLabel: 'Dia 6 — Simulado Leve & Checklist da Véspera',
          focusBadge: 'VÉSPERA DO 2º DOMINGO',
          description: 'Simulado autoral cronometrado e separação de materiais para o fechamento às 13h.',
          tasks: [TASK_D2_SIMULADO, TASK_D2_CHECKLIST_FINAL],
        }
      );
    } else if (diasRestantes === 5) {
      // 5 DIAS = EXATAMENTE 5 BLOCOS
      blocks.push(
        {
          dayIndex: 1,
          dayLabel: 'Dia 1 — Estratégia TRI & Matemática Básica',
          focusBadge: 'TRI & PROPORÇÃO',
          description: 'Estratégia de resolução de questões acessíveis e leitura gráfica em Matemática.',
          tasks: [TASK_D2_ORG_TRI, TASK_D2_MAT_BASICA],
        },
        {
          dayIndex: 2,
          dayLabel: 'Dia 2 — Biologia & Ecologia Aplicada',
          focusBadge: 'ECOLOGIA & CICLOS',
          description: 'Impactos ambientais, fluxos de energia e relações ecológicas no cotidiano.',
          tasks: [TASK_D2_BIO_ECOLOGIA],
        },
        {
          dayIndex: 3,
          dayLabel: 'Dia 3 — Física do Cotidiano & Química Orgânica',
          focusBadge: 'NATUREZA APLICADA',
          description: 'Eletrodinâmica, consumo elétrico (kWh) e reconhecimento de funções orgânicas.',
          tasks: [TASK_D2_FIS_ENERGIA, TASK_D2_QUI_ORGANICA],
        },
        {
          dayIndex: 4,
          dayLabel: 'Dia 4 — Geometria Espacial & Revisão de Fórmulas',
          focusBadge: 'FÓRMULAS & GEOMETRIA',
          description: 'Volume de prismas e cilindros, áreas planas e fórmulas mais frequentes.',
          tasks: [TASK_D2_MAT_GEO, TASK_D2_SIMULADO],
        },
        {
          dayIndex: 5,
          dayLabel: 'Dia 5 — Simulado Leve, Checklist e Descanso',
          focusBadge: 'VÉSPERA CONSCIENTE',
          description: 'Simulado autoral leve do 2º dia, checklist de canetas transparentes e descanso.',
          tasks: [TASK_D2_SIMULADO, TASK_D2_CHECKLIST_FINAL],
        }
      );
    } else if (diasRestantes === 4) {
      // 4 DIAS = EXATAMENTE 4 BLOCOS
      blocks.push(
        {
          dayIndex: 1,
          dayLabel: 'Dia 1 — Matemática Básica & Leitura Gráfica',
          focusBadge: 'PROPORÇÃO & GRÁFICOS',
          description: 'Escalas cartográficas, porcentagens e leitura de tabelas para valorizar a nota TRI.',
          tasks: [TASK_D2_ORG_TRI, TASK_D2_MAT_BASICA],
        },
        {
          dayIndex: 2,
          dayLabel: 'Dia 2 — Ciências da Natureza Prioritárias (Ecologia e Energia)',
          focusBadge: 'CONCEITOS RECORRENTES',
          description: 'Cadeias alimentares, impactos ecológicos e consumo de energia elétrica residencial.',
          tasks: [TASK_D2_BIO_ECOLOGIA, TASK_D2_FIS_ENERGIA],
        },
        {
          dayIndex: 3,
          dayLabel: 'Dia 3 — Química Orgânica & Fórmulas Recorrentes',
          focusBadge: 'QUÍMICA & GEOMETRIA',
          description: 'Identificação de grupos funcionais e cálculo de volumes geométricos essenciais.',
          tasks: [TASK_D2_QUI_ORGANICA, TASK_D2_MAT_GEO],
        },
        {
          dayIndex: 4,
          dayLabel: 'Dia 4 — Simulado Leve, Checklist e Descanso na Véspera',
          focusBadge: 'ORGANIZAÇÃO & VÉSPERA',
          description: 'Simulado cronometrado de exatas, checagem de materiais e descanso noturno.',
          tasks: [TASK_D2_SIMULADO, TASK_D2_CHECKLIST_FINAL],
        }
      );
    } else if (diasRestantes === 3) {
      // 3 DIAS = EXATAMENTE 3 BLOCOS
      blocks.push(
        {
          dayIndex: 1,
          dayLabel: 'Dia 1 — Matemática Essencial e Interpretação Gráfica',
          focusBadge: 'PROPORÇÃO & TRI',
          description: 'Foco prioritário em questões de escala, porcentagem, regra de três e leitura de gráficos.',
          tasks: [TASK_D2_ORG_TRI, TASK_D2_MAT_BASICA],
        },
        {
          dayIndex: 2,
          dayLabel: 'Dia 2 — Ciências da Natureza (Ecologia, Energia e Funções)',
          focusBadge: 'NATUREZA ESSENCIAL',
          description: 'Ecologia aplicada, consumo de energia em kWh e funções orgânicas do cotidiano.',
          tasks: [TASK_D2_BIO_ECOLOGIA, TASK_D2_FIS_ENERGIA, TASK_D2_QUI_ORGANICA],
        },
        {
          dayIndex: 3,
          dayLabel: 'Dia 3 — Simulado Leve, Revisão e Checklist do 2º Domingo',
          focusBadge: 'SIMULADO & VÉSPERA',
          description: 'Simulado autoral do 2º dia, conferência de canetas transparentes e descanso.',
          tasks: [TASK_D2_SIMULADO, TASK_D2_CHECKLIST_FINAL],
        }
      );
    } else if (diasRestantes === 2) {
      // 2 DIAS = EXATAMENTE 2 BLOCOS
      blocks.push(
        {
          dayIndex: 1,
          dayLabel: 'Dia 1 — Síntese: Fórmulas de Exatas & Ecologia Essencial',
          focusBadge: 'CONCEITOS DECISIVOS',
          description: 'Revisão das fórmulas mais recorrentes, raciocínio proporcional e impactos ambientais.',
          tasks: [TASK_D2_MAT_BASICA, TASK_D2_BIO_ECOLOGIA, TASK_D2_FIS_ENERGIA],
        },
        {
          dayIndex: 2,
          dayLabel: 'Dia 2 — Simulado Rápido de Treinamento, Checklist & Descanso',
          focusBadge: 'VÉSPERA DO 2º DOMINGO',
          description: 'Simulado autoral rápido, revisão de erros conceituais e organização física para a prova.',
          tasks: [TASK_D2_SIMULADO, TASK_D2_CHECKLIST_FINAL],
        }
      );
    } else if (diasRestantes === 1) {
      // 1 DIA = EXATAMENTE 1 BLOCO (sem segundo dia!)
      blocks.push(
        {
          dayIndex: 1,
          dayLabel: 'Dia Único — Revisão Expressa (Matemática e Natureza) & Checklist',
          focusBadge: 'VÉSPERA ESSENCIAL',
          description: 'Revisão das fórmulas mais frequentes, proporções diretas, ecologia essencial, checklist de materiais e descanso.',
          tasks: [TASK_D2_MAT_BASICA, TASK_D2_BIO_ECOLOGIA, TASK_D2_CHECKLIST_FINAL],
        }
      );
    }
  }

  // Coletar todas as tarefas únicas presentes nos blocos atuais
  const taskMap = new Map<string, AdaptiveTask>();
  blocks.forEach(block => {
    block.tasks.forEach(t => {
      if (!taskMap.has(t.id)) {
        taskMap.set(t.id, t);
      }
    });
  });
  const allTasks = Array.from(taskMap.values());

  const examDayGuide = (modality === 'dia_da_prova' || diasRestantes <= 1)
    ? getExamDayGuide(stage === 'dia2' ? 'dia2' : 'dia1')
    : undefined;

  return {
    currentDateStr,
    stage,
    stageTitle,
    targetDateStr,
    targetDateBR: formatDataBR(targetDateStr),
    diasRestantes,
    modality,
    modalityBadgeLabel,
    modalityDescription,
    dynamicMessage,
    disciplines,
    blocks,
    allTasks,
    examDayGuide,
    isDiaDaProva: modality === 'dia_da_prova',
    isEncerrado: modality === 'encerrado',
  };
}

// ==========================================
// PERSISTÊNCIA E MEMÓRIA DE PROGRESSO (localStorage)
// ==========================================

const STORAGE_KEYS = {
  COMPLETED_TASKS: 'enem2026_adaptive_completed_tasks',
  LAST_ACCESS: 'enem2026_adaptive_last_access',
  MODALITY_HISTORY: 'enem2026_adaptive_modality_history',
};

export interface AdaptiveProgressState {
  completedTaskIds: string[];
  lastAccessDate: string;
  history: { date: string; modality: AdaptiveModality; completedCount: number }[];
}

export function loadAdaptiveProgress(): AdaptiveProgressState {
  if (typeof window === 'undefined') {
    return {
      completedTaskIds: [],
      lastAccessDate: getBrasiliaDateString(),
      history: [],
    };
  }

  let completedTaskIds: string[] = [];
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.COMPLETED_TASKS);
    if (raw) completedTaskIds = JSON.parse(raw);
  } catch (_) {}

  // Retrocompatibilidade com missões anteriores se existirem
  if (completedTaskIds.length === 0) {
    try {
      const oldRaw = localStorage.getItem('enem2026_completed_missions');
      if (oldRaw) {
        const oldIds: string[] = JSON.parse(oldRaw);
        const legacyMap: Record<string, string> = {
          'missao-red-1': 'task-d1-red-estrutura',
          'missao-ling-1': 'task-d1-ling-funcoes',
          'missao-hum-1': 'task-d1-hum-cidadania',
          'missao-red-2': 'task-d1-red-intervencao',
          'missao-sim-1': 'task-d1-simulado',
          'missao-mat-1': 'task-d2-mat-basica',
          'missao-bio-1': 'task-d2-bio-ecologia',
          'missao-fis-1': 'task-d2-fis-energia',
          'missao-qui-1': 'task-d2-qui-organica',
          'missao-sim-2': 'task-d2-simulado',
        };
        const mapped = oldIds.map(id => legacyMap[id] || id);
        completedTaskIds = Array.from(new Set(mapped));
      }
    } catch (_) {}
  }

  let lastAccessDate = getBrasiliaDateString();
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.LAST_ACCESS);
    if (saved) lastAccessDate = saved;
  } catch (_) {}

  let history: any[] = [];
  try {
    const histRaw = localStorage.getItem(STORAGE_KEYS.MODALITY_HISTORY);
    if (histRaw) history = JSON.parse(histRaw);
  } catch (_) {}

  return {
    completedTaskIds,
    lastAccessDate,
    history,
  };
}

export function saveAdaptiveProgress(
  completedTaskIds: string[],
  currentModality: AdaptiveModality,
  currentDate: string = getBrasiliaDateString()
): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem(STORAGE_KEYS.COMPLETED_TASKS, JSON.stringify(completedTaskIds));
    localStorage.setItem(STORAGE_KEYS.LAST_ACCESS, currentDate);

    // Atualiza histórico de modalidades sem sobrescrever
    const rawHist = localStorage.getItem(STORAGE_KEYS.MODALITY_HISTORY);
    const history: any[] = rawHist ? JSON.parse(rawHist) : [];
    
    // Registra entrada do dia se ainda não registrada hoje
    const existingIndex = history.findIndex((h: any) => h.date === currentDate);
    if (existingIndex >= 0) {
      history[existingIndex] = {
        date: currentDate,
        modality: currentModality,
        completedCount: completedTaskIds.length,
      };
    } else {
      history.push({
        date: currentDate,
        modality: currentModality,
        completedCount: completedTaskIds.length,
      });
    }

    localStorage.setItem(STORAGE_KEYS.MODALITY_HISTORY, JSON.stringify(history.slice(-30)));
  } catch (_) {}
}
