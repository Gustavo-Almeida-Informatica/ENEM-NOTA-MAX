import { Subject, EnemArea } from '../types';
import { LINGUAGENS_TOPICS } from './topics/linguagens';
import { MATEMATICA_TOPICS } from './topics/matematica';
import { HUMANAS_TOPICS } from './topics/humanas';
import { NATUREZA_TOPICS } from './topics/natureza';
import { REDACAO_TOPICS } from './topics/redacao';

export const ALL_SUBJECTS: Subject[] = [
  ...LINGUAGENS_TOPICS,
  ...MATEMATICA_TOPICS,
  ...HUMANAS_TOPICS,
  ...NATUREZA_TOPICS,
  ...REDACAO_TOPICS
];

// Mapeamento de rotas alternativas / aliases para garantir que links abreviados ou variantes funcionem
export const TOPIC_SLUG_ALIASES: Record<string, string> = {
  // Gêneros e Interpretação (Linguagens)
  'generos-textuais': 'generos-e-tipos-textuais',
  'generos-e-tipos': 'generos-e-tipos-textuais',
  'tipos-textuais': 'generos-e-tipos-textuais',
  'generos': 'generos-e-tipos-textuais',
  'interpretacao-textual': 'interpretacao-textual-estrategica',
  'interpretacao-de-texto': 'interpretacao-textual-estrategica',
  'interpretacao': 'interpretacao-textual-estrategica',
  // Ortografia e pontuação alternativas
  'coesao-e-coerencia': 'coesa-e-coerencia',
  'coesao': 'coesa-e-coerencia',
  'eletroquimica-pilhas-e-eletrolise': 'eletroquimica-pilhas-e-eletrólise',
  'eletroquimica': 'eletroquimica-pilhas-e-eletrólise',
  'funcoes-linguagem': 'funcoes-da-linguagem',
  'funcoes-de-linguagem': 'funcoes-da-linguagem',
  'variacao': 'variacao-linguistica',
  'figuras': 'figuras-de-linguagem',
  'modernismo': 'modernismo-brasileiro',
};

function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();
}

export const getSubjectBySlug = (slug: string): Subject | undefined => {
  if (!slug) return undefined;
  const clean = slug.trim().toLowerCase();

  // 1. Busca direta exata
  const exact = ALL_SUBJECTS.find((s) => s.slug === clean);
  if (exact) return exact;

  // 2. Busca por alias / mapeamento direto
  const mapped = TOPIC_SLUG_ALIASES[clean];
  if (mapped) {
    const aliasSubject = ALL_SUBJECTS.find((s) => s.slug === mapped);
    if (aliasSubject) return aliasSubject;
  }

  // 3. Busca sem acentos ou traços
  const normClean = normalizeText(clean).replace(/[-_]/g, '');
  const normMatch = ALL_SUBJECTS.find((s) => {
    const sNorm = normalizeText(s.slug).replace(/[-_]/g, '');
    return sNorm === normClean;
  });
  if (normMatch) return normMatch;

  // 4. Busca aproximada por proximidade de palavras-chave
  const words = clean.split(/[-_]+/).filter((w) => w.length >= 4);
  if (words.length > 0) {
    const partialMatch = ALL_SUBJECTS.find((s) => {
      const sSlug = s.slug.toLowerCase();
      const sTitle = normalizeText(s.title);
      return words.every((w) => sSlug.includes(w) || sTitle.includes(w));
    });
    if (partialMatch) return partialMatch;
  }

  return undefined;
};

// Retorna uma lista de sugestões relevantes para quando um slug não for encontrado
export const findSuggestedSubjects = (slug: string, limit = 4): Subject[] => {
  if (!slug) return ALL_SUBJECTS.slice(0, limit);

  const clean = normalizeText(slug).replace(/[-_]+/g, ' ');
  const tokens = clean
    .split(/\s+/)
    .filter((w) => w.length >= 3 && !['de', 'da', 'do', 'das', 'dos', 'em', 'no', 'na', 'para', 'com', 'que'].includes(w));

  const scored = ALL_SUBJECTS.map((subject) => {
    let score = 0;
    const sSlugNorm = normalizeText(subject.slug).replace(/[-_]+/g, ' ');
    const sTitleNorm = normalizeText(subject.title);
    const sDescNorm = normalizeText(subject.shortDescription);
    const sSubNorm = normalizeText(subject.subtopic);

    tokens.forEach((token) => {
      if (sSlugNorm.includes(token)) score += 10;
      if (sTitleNorm.includes(token)) score += 8;
      if (sSubNorm.includes(token)) score += 5;
      if (sDescNorm.includes(token)) score += 2;
    });

    return { subject, score };
  });

  const matches = scored
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((item) => item.subject);

  if (matches.length > 0) {
    return matches.slice(0, limit);
  }

  // Fallback para assuntos mais cobrados de Linguagens e Redação
  return ALL_SUBJECTS.filter((s) => s.area === 'linguagens' || s.area === 'redacao').slice(0, limit);
};

export const getSubjectsByArea = (area: EnemArea): Subject[] => {
  return ALL_SUBJECTS.filter((s) => s.area === area);
};

export const getRelatedSubjects = (currentSubject: Subject, limit = 4): Subject[] => {
  return ALL_SUBJECTS
    .filter((s) => s.area === currentSubject.area && s.slug !== currentSubject.slug)
    .slice(0, limit);
};
