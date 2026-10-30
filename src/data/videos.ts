import { EnemArea } from '../types';
import { ALL_SUBJECTS } from './topics';

export interface VideoItem {
  id: string;
  youtubeId?: string;
  query: string;
  title: string;
  channel: string;
  durationMinutes?: number;
  area: EnemArea;
  subjectTitle: string;
  subjectSlug: string;
  description: string;
}

export const VIDEOS: VideoItem[] = ALL_SUBJECTS.map((subject) => ({
  id: `vid-${subject.slug}`,
  query: `${subject.title} ENEM`,
  title: subject.relatedVideo.title || `${subject.title} - Revisão ENEM`,
  channel: subject.relatedVideo.channel || 'ENEM Nota Max',
  durationMinutes: subject.relatedVideo.durationMinutes || 15,
  area: subject.area,
  subjectTitle: subject.title,
  subjectSlug: subject.slug,
  description: subject.shortDescription
}));

export const getVideosByArea = (area: EnemArea | 'todas'): VideoItem[] => {
  if (area === 'todas') return VIDEOS;
  return VIDEOS.filter((v) => v.area === area);
};
