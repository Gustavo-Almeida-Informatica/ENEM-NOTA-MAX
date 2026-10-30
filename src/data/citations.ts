import { Citation, CitationCategory } from '../types';
import { FILOSOFIA_CITATIONS } from './citations/filosofia';
import { LEGISLACAO_CITATIONS } from './citations/legislacao';
import { LITERATURA_CITATIONS } from './citations/literatura';
import { CINEMA_MUSICA_CITATIONS } from './citations/cinema_musica';
import { DADOS_HISTORIA_CITATIONS } from './citations/dados_historia';

export const CITATIONS: Citation[] = [
  ...FILOSOFIA_CITATIONS,
  ...LEGISLACAO_CITATIONS,
  ...LITERATURA_CITATIONS,
  ...CINEMA_MUSICA_CITATIONS,
  ...DADOS_HISTORIA_CITATIONS
];

export const THEMATIC_AXES: string[] = [
  'Todos os Eixos',
  'Meio Ambiente',
  'Tecnologia',
  'Educação',
  'Saúde',
  'Desigualdade',
  'Cidadania',
  'Cultura',
  'Violência',
  'Trabalho'
];

export const CATEGORIES_CONFIG: Record<CitationCategory, { label: string; description: string }> = {
  filosofia: {
    label: 'Filosofia e Sociologia',
    description: 'Teóricos do pensamento crítico, contratualistas e sociólogos contemporâneos.'
  },
  legislacao: {
    label: 'Legislação e Leis',
    description: 'Artigos da Constituição Cidadã de 1988, estatutos e leis federais vigentes.'
  },
  literatura: {
    label: 'Literatura Brasileira e Universal',
    description: 'Obras consagradas que retratam as mazelas sociais e a condição humana.'
  },
  cinema: {
    label: 'Cinema e Séries',
    description: 'Filmes e produções audiovisuais que problematizam realidades sociais.'
  },
  musica: {
    label: 'Música Brasileira',
    description: 'Canções engajadas da MPB, rap e samba de denúncia e conscientização.'
  },
  dados: {
    label: 'Dados e Instituições (IBGE, OMS, ONU)',
    description: 'Indicadores oficiais consolidados e tendências estatísticas de órgãos de pesquisa.'
  },
  historia: {
    label: 'História e Fatos Históricos',
    description: 'Marcos e acontecimentos históricos que explicam as raízes dos impasses atuais.'
  }
};
