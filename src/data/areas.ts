import { AreaInfo, EnemArea } from '../types';

export const AREAS: Record<EnemArea, AreaInfo> = {
  linguagens: {
    id: 'linguagens',
    name: 'Linguagens, Códigos e suas Tecnologias',
    shortName: 'Linguagens',
    day: '1º Dia',
    color: '#6366F1',
    textColor: 'text-indigo-700 dark:text-indigo-400',
    bgLight: 'bg-indigo-50 dark:bg-indigo-950/50',
    borderLight: 'border-indigo-200 dark:border-indigo-800',
    description: 'Interpretação textual, gêneros, funções da linguagem, literatura e artes.',
    iconName: 'BookOpen'
  },
  matematica: {
    id: 'matematica',
    name: 'Matemática e suas Tecnologias',
    shortName: 'Matemática',
    day: '2º Dia',
    color: '#2563EB',
    textColor: 'text-blue-700 dark:text-blue-400',
    bgLight: 'bg-blue-50 dark:bg-blue-950/50',
    borderLight: 'border-blue-200 dark:border-blue-800',
    description: 'Cálculo proporcional, geometria plana e espacial, estatística e funções.',
    iconName: 'Binary'
  },
  humanas: {
    id: 'humanas',
    name: 'Ciências Humanas e suas Tecnologias',
    shortName: 'Humanas',
    day: '1º Dia',
    color: '#D97706',
    textColor: 'text-amber-700 dark:text-amber-400',
    bgLight: 'bg-amber-50 dark:bg-amber-950/50',
    borderLight: 'border-amber-200 dark:border-amber-800',
    description: 'História do Brasil e Geral, Geografia física e humana, Filosofia e Sociologia.',
    iconName: 'Globe'
  },
  natureza: {
    id: 'natureza',
    name: 'Ciências da Natureza e suas Tecnologias',
    shortName: 'Natureza',
    day: '2º Dia',
    color: '#059669',
    textColor: 'text-emerald-700 dark:text-emerald-400',
    bgLight: 'bg-emerald-50 dark:bg-emerald-950/50',
    borderLight: 'border-emerald-200 dark:border-emerald-800',
    description: 'Ecologia, fisiologia, química orgânica, estequiometria, ondas e circuitos.',
    iconName: 'Leaf'
  },
  redacao: {
    id: 'redacao',
    name: 'Redação Nota 1000',
    shortName: 'Redação',
    day: '1º Dia',
    color: '#E11D48',
    textColor: 'text-rose-700 dark:text-rose-400',
    bgLight: 'bg-rose-50 dark:bg-rose-950/50',
    borderLight: 'border-rose-200 dark:border-rose-800',
    description: 'Texto dissertativo-argumentativo, projeto de texto e proposta de intervenção.',
    iconName: 'PenTool'
  }
};
