export interface User {
  id: string;
  username: string;
  isAdmin: boolean;
}

export interface Team {
  id: string;
  name: string;
  points: number;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  category: 'calcio5' | 'calcio7';
}

export interface Player {
  id: string;
  name: string;
  team: string;
  goals: number;
  category: 'calcio5' | 'calcio7';
}

export interface Highlight {
  id: string;
  title: string;
  description: string;
  type: 'photo' | 'video';
  url: string;
  thumbnail?: string;
  createdAt: string;
}

export interface Rule {
  id: string;
  title: string;
  content: string;
  order: number;
}