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

export const getSubjectBySlug = (slug: string): Subject | undefined => {
  return ALL_SUBJECTS.find((s) => s.slug === slug);
};

export const getSubjectsByArea = (area: EnemArea): Subject[] => {
  return ALL_SUBJECTS.filter((s) => s.area === area);
};

export const getRelatedSubjects = (currentSubject: Subject, limit = 4): Subject[] => {
  return ALL_SUBJECTS
    .filter((s) => s.area === currentSubject.area && s.slug !== currentSubject.slug)
    .slice(0, limit);
};
