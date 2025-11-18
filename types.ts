
import { LatLngExpression } from 'leaflet';

export enum LocationCategory {
  HAUNTED = 'Haunted Locations',
  CRIME = 'Crime Scenes',
  MYSTERY = 'Unsolved Mysteries',
  USER = 'User-Submitted',
}

export interface LocationPin {
  id: number;
  name: string;
  coordinates: LatLngExpression;
  category: LocationCategory;
}

export interface DossierContent {
  spiritStories: string;
  crimeAndPunishment: string;
  socialHistory: string;
}

export interface LocationFull {
  id: number;
  name: string;
  address: string;
  coordinates: LatLngExpression;
  category: LocationCategory;
  dossier: DossierContent;
  media: { type: 'image' | 'video'; url: string; caption: string }[];
  tags: string[];
  warning?: string;
}

export interface User {
  id: string;
  username: string;
  avatarUrl: string;
  investigationScore: number;
  badges: string[];
}

export interface ChatMessage {
    role: 'user' | 'model';
    text: string;
}
