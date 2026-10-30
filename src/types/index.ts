export type EnemArea = 'linguagens' | 'matematica' | 'humanas' | 'natureza' | 'redacao';

export interface AreaInfo {
  id: EnemArea;
  name: string;
  shortName: string;
  day: '1º Dia' | '2º Dia';
  color: string;
  textColor: string;
  bgLight: string;
  borderLight: string;
  description: string;
  iconName: string;
}

export type SubjectBadge = 'resumo' | 'video' | 'mapa';

export interface RelatedVideo {
  youtubeId?: string;
  title: string;
  channel: string;
  durationMinutes?: number;
  description?: string;
  searchQuery?: string;
}

export interface Subject {
  slug: string;
  title: string;
  area: EnemArea;
  subtopic: string;
  shortDescription: string;
  readingTimeMinutes: number;
  availableFormats: SubjectBadge[];
  whatFallsMost: string[];
  keyPoints: string[];
  fullSummary: string[];
  practicalApplication: string;
  relatedVideo: RelatedVideo;
  mindMapId?: string;
  frequentlyTestedYears?: string;
}

export interface MindMapNode {
  id: string;
  label: string;
  color?: string;
  summary: string;
  enemTips?: string;
  videoQuery?: string;
  relatedSubjectSlug?: string;
  children?: MindMapNode[];
  isExpanded?: boolean;
}

export interface MindMap {
  id: string;
  title: string;
  theme: string;
  area?: EnemArea;
  description: string;
  rootNode: MindMapNode;
}

export type CitationCategory = 
  | 'filosofia' 
  | 'legislacao' 
  | 'literatura' 
  | 'cinema' 
  | 'musica' 
  | 'dados' 
  | 'historia';

export interface Citation {
  id: string;
  quote: string;
  authorOrSource: string;
  roleOrWork: string;
  category: CitationCategory;
  thematicAxes: string[];
  howToUse: string;
  contextExample: string;
}

export interface TimeTipBlock {
  id: string;
  title: string;
  tagline: string;
  icon: string;
  readingMinutes: number;
  summary: string;
  steps: {
    heading: string;
    detail: string;
  }[];
  enemRuleOfThumb: string;
}

export interface StudyPlanAllocation {
  area: EnemArea;
  areaName: string;
  hours: number;
  percentage: number;
  color: string;
  focusTopics: string[];
}
