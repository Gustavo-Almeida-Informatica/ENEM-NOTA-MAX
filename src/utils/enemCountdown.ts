// Utilitário de cálculo da contagem regressiva e status do ENEM 2026
// Fuso horário oficial: Brasília (America/Sao_Paulo - UTC-3)

export interface EnemCountdownInfo {
  etapa: 'etapa1' | 'etapa2' | 'encerrado';
  showModal: boolean;
  diasRestantes: number;
  dataAtualFormatada: string;
  dataAlvoFormatada: string;
  titulo: string;
  subtitulo: string;
  mensagemMotivacional: string;
  rotuloContagem: string;
  isDiaDeProva: boolean;
  provaNome: string;
  disciplinas: string[];
  notificationId: string;
}

// Datas oficiais do ENEM 2026
export const ENEM_2026_DATAS = {
  dia1: '2026-11-08', // Primeiro dia: Linguagens, Redação, Ciências Humanas
  dia2: '2026-11-15', // Segundo dia: Ciências da Natureza e Matemática
};

/**
 * Retorna a data no fuso de Brasília no formato YYYY-MM-DD
 */
export function getBrasiliaDateString(date: Date = new Date()): string {
  try {
    const formatter = new Intl.DateTimeFormat('en-CA', {
      timeZone: 'America/Sao_Paulo',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
    return formatter.format(date); // 'YYYY-MM-DD'
  } catch {
    // Fallback caso Intl timeZone falhe
    const utcTime = date.getTime();
    const brasiliaOffset = -3 * 60; // UTC-3 em minutos
    const brasiliaDate = new Date(utcTime + (brasiliaOffset + date.getTimezoneOffset()) * 60000);
    return brasiliaDate.toISOString().slice(0, 10);
  }
}

/**
 * Calcula a diferença em dias corridos entre duas strings de data YYYY-MM-DD
 */
export function diffCalendarDays(fromDateStr: string, toDateStr: string): number {
  const [y1, m1, d1] = fromDateStr.split('-').map(Number);
  const [y2, m2, d2] = toDateStr.split('-').map(Number);

  const utc1 = Date.UTC(y1, m1 - 1, d1);
  const utc2 = Date.UTC(y2, m2 - 1, d2);

  const msPerDay = 1000 * 60 * 60 * 24;
  return Math.round((utc2 - utc1) / msPerDay);
}

/**
 * Formata data YYYY-MM-DD para o formato brasileiro DD/MM/YYYY
 */
export function formatDataBR(dateStr: string): string {
  const [y, m, d] = dateStr.split('-');
  return `${d}/${m}/${y}`;
}

/**
 * Calcula todas as informações da campanha do ENEM 2026 para uma data específica
 * (ou data atual no fuso de Brasília se não informada)
 */
export function getEnem2026Info(dataSimulada?: string): EnemCountdownInfo {
  // Permite simular via URL query param se estiver no navegador
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

  // Comparação cronológica
  // Etapa 1: até o final do dia 08/11/2026
  if (currentDateStr <= dia1) {
    const dias = diffCalendarDays(currentDateStr, dia1);
    const isHoje = dias === 0;

    let titulo = `Faltam apenas ${dias} dias para o ENEM!`;
    let subtitulo = 'Primeiro dia: Linguagens, Redação e Ciências Humanas';
    let mensagemMotivacional =
      'Mantenha o foco nos conteúdos mais recorrentes e reserve momentos de descanso para chegar com energia máxima.';

    if (dias === 6) {
      titulo = 'Faltam apenas 6 dias para o ENEM!';
      mensagemMotivacional =
        'Falta menos de uma semana! Revise os esquemas de redação e treine seu tempo de leitura.';
    } else if (dias === 3) {
      titulo = 'Estamos na reta final! Faltam apenas 3 dias.';
      mensagemMotivacional =
        'Hora de desacelerar, revisar seus repertórios coringas e manter a tranquilidade para o grande momento.';
    } else if (dias === 1) {
      titulo = 'Amanhã é o grande dia!';
      subtitulo = 'Atenção aos horários e documentos de identificação';
      mensagemMotivacional =
        'Separe com antecedência canetas pretas de tubo transparente, documento oficial com foto e descanse bem esta noite.';
    } else if (isHoje) {
      titulo = 'Hoje é dia de ENEM! Boa prova!';
      subtitulo = 'Primeiro Domingo de Prova (08/11/2026)';
      mensagemMotivacional =
        'Confie em tudo o que você estudou. Respire fundo, administre o tempo da redação e arrase!';
    } else if (dias < 0) {
      // Caso de borda
      titulo = 'Preparação para o ENEM 2026';
    }

    return {
      etapa: 'etapa1',
      showModal: true,
      diasRestantes: Math.max(0, dias),
      dataAtualFormatada: formatDataBR(currentDateStr),
      dataAlvoFormatada: formatDataBR(dia1),
      titulo,
      subtitulo,
      mensagemMotivacional,
      rotuloContagem: isHoje ? 'HOJE' : `${dias} ${dias === 1 ? 'dia' : 'dias'}`,
      isDiaDeProva: isHoje,
      provaNome: '1º Dia do ENEM (08/11)',
      disciplinas: ['Redação Nota 1000', 'Linguagens e Códigos', 'Ciências Humanas'],
      notificationId: isHoje ? 'notif_enem_2026_etapa1_hoje' : `notif_enem_2026_etapa1_${dias}dias`,
    };
  }

  // Etapa 2: do dia 09/11/2026 até 15/11/2026
  if (currentDateStr <= dia2) {
    const dias = diffCalendarDays(currentDateStr, dia2);
    const isHoje = dias === 0;

    let titulo = 'Primeira etapa concluída! Agora vamos nos preparar para o segundo dia.';
    let subtitulo = 'Segundo dia: Matemática e Ciências da Natureza';
    let mensagemMotivacional =
      'O primeiro domingo já foi! Foque agora nas fórmulas essenciais, gráficos e estratégias de prova para Natureza e Matemática.';

    if (dias === 1) {
      titulo = 'Amanhã é o grande dia do segundo domingo!';
      subtitulo = 'Foco em Matemática e Ciências da Natureza';
      mensagemMotivacional =
        'Revise as fórmulas principais com calma, separe seu material e tenha uma ótima noite de sono.';
    } else if (isHoje) {
      titulo = 'Hoje é o segundo dia de ENEM! Dê o seu melhor!';
      subtitulo = 'Segundo Domingo de Prova (15/11/2026)';
      mensagemMotivacional =
        'Última etapa! Cada questão de Matemática e Natureza faz a diferença na sua nota TRI. Você é capaz!';
    }

    return {
      etapa: 'etapa2',
      showModal: true,
      diasRestantes: Math.max(0, dias),
      dataAtualFormatada: formatDataBR(currentDateStr),
      dataAlvoFormatada: formatDataBR(dia2),
      titulo,
      subtitulo,
      mensagemMotivacional,
      rotuloContagem: isHoje ? 'HOJE' : `${dias} ${dias === 1 ? 'dia' : 'dias'}`,
      isDiaDeProva: isHoje,
      provaNome: '2º Dia do ENEM (15/11)',
      disciplinas: ['Matemática e suas Tecnologias', 'Física, Química e Biologia'],
      notificationId: isHoje ? 'notif_enem_2026_etapa2_hoje' : `notif_enem_2026_etapa2_${dias}dias`,
    };
  }

  // Após 15/11/2026: Campanha encerrada
  return {
    etapa: 'encerrado',
    showModal: false,
    diasRestantes: 0,
    dataAtualFormatada: formatDataBR(currentDateStr),
    dataAlvoFormatada: formatDataBR(dia2),
    titulo: 'Campanha ENEM 2026 Encerrada',
    subtitulo: 'Provas concluídas com sucesso!',
    mensagemMotivacional: 'Parabéns pela dedicação ao longo de toda a jornada!',
    rotuloContagem: 'ENCERRADO',
    isDiaDeProva: false,
    provaNome: 'ENEM 2026 Concluído',
    disciplinas: [],
    notificationId: 'notif_enem_2026_encerrado',
  };
}
