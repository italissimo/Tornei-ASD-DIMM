export interface Highlight {
  id: number;
  title: string;
  description: string | null;
  file_path: string;
  file_type: 'image' | 'video';
  category: 'calcio5' | 'calcio7' | null;
  upload_date: string;
  featured: boolean;
  views: number;
  likes: number;
}

export interface HighlightWithUrl extends Highlight {
  publicUrl: string;
}

export type FilterCategory = 'all' | 'calcio5' | 'calcio7';
export type FilterType = 'all' | 'image' | 'video';