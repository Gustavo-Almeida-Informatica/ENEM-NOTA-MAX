import { AreaInfo, EnemArea } from '../types';

export const AREAS: Record<EnemArea, AreaInfo> = {
  linguagens: {
    id: 'linguagens',
    name: 'Linguagens, Códigos e suas Tecnologias',
    shortName: 'Linguagens',
    day: '1º Dia',
    color: '#6366F1',
    textColor: 'text-indigo-700',
    bgLight: 'bg-indigo-50/70',
    borderLight: 'border-indigo-200',
    description: 'Interpretação textual, gêneros, funções da linguagem, literatura e artes.',
    iconName: 'BookOpen'
  },
  matematica: {
    id: 'matematica',
    name: 'Matemática e suas Tecnologias',
    shortName: 'Matemática',
    day: '2º Dia',
    color: '#0284C7',
    textColor: 'text-sky-700',
    bgLight: 'bg-sky-50/70',
    borderLight: 'border-sky-200',
    description: 'Cálculo proporcional, geometria plana e espacial, estatística e funções.',
    iconName: 'Binary'
  },
  humanas: {
    id: 'humanas',
    name: 'Ciências Humanas e suas Tecnologias',
    shortName: 'Humanas',
    day: '1º Dia',
    color: '#D97706',
    textColor: 'text-amber-700',
    bgLight: 'bg-amber-50/70',
    borderLight: 'border-amber-200',
    description: 'História do Brasil e Geral, Geografia física e humana, Filosofia e Sociologia.',
    iconName: 'Globe'
  },
  natureza: {
    id: 'natureza',
    name: 'Ciências da Natureza e suas Tecnologias',
    shortName: 'Natureza',
    day: '2º Dia',
    color: '#059669',
    textColor: 'text-emerald-700',
    bgLight: 'bg-emerald-50/70',
    borderLight: 'border-emerald-200',
    description: 'Ecologia, fisiologia, química orgânica, estequiometria, ondas e circuitos.',
    iconName: 'Leaf'
  },
  redacao: {
    id: 'redacao',
    name: 'Redação Nota 1000',
    shortName: 'Redação',
    day: '1º Dia',
    color: '#E11D48',
    textColor: 'text-rose-700',
    bgLight: 'bg-rose-50/70',
    borderLight: 'border-rose-200',
    description: 'Texto dissertativo-argumentativo, projeto de texto e proposta de intervenção.',
    iconName: 'PenTool'
  }
};
