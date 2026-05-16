export interface Highlight {
  id: string;
  title: string;
  description: string | null;
  file_path?: string | null;
  file_type: 'image' | 'video' | null;
  category: 'calcio5' | 'calcio7' | null;
  upload_date: string;
  featured: boolean;
}

export interface HighlightWithUrl extends Highlight {
  publicUrl: string;
}

export type FilterCategory = 'all' | 'calcio5' | 'calcio7';
export type FilterType = 'all' | 'image' | 'video';