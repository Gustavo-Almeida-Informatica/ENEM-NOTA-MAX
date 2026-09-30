import { EnemArea } from '../types';
import { ALL_SUBJECTS } from './topics';

export interface VideoItem {
  id: string;
  youtubeId: string;
  title: string;
  channel: string;
  durationMinutes: number;
  area: EnemArea;
  subjectTitle: string;
  subjectSlug: string;
  description: string;
}

export const VIDEOS: VideoItem[] = ALL_SUBJECTS.map((subject) => ({
  id: `vid-${subject.slug}`,
  youtubeId: subject.relatedVideo.youtubeId,
  title: subject.relatedVideo.title,
  channel: subject.relatedVideo.channel,
  durationMinutes: subject.relatedVideo.durationMinutes,
  area: subject.area,
  subjectTitle: subject.title,
  subjectSlug: subject.slug,
  description: subject.shortDescription
}));

export const getVideosByArea = (area: EnemArea | 'todas'): VideoItem[] => {
  if (area === 'todas') return VIDEOS;
  return VIDEOS.filter((v) => v.area === area);
};
