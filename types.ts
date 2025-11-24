
import { LatLngExpression } from 'leaflet';

export enum LocationCategory {
  // Ghost Theme
  HAUNTED = 'Haunted Locations',
  CRIME = 'Crime Scenes',
  MYSTERY = 'Unsolved Mysteries',
  USER = 'User-Submitted',
  // Alien Theme
  ALIEN = 'Alien & UFO Hotspots',
  CRYPTID = 'Cryptid Sightings',
  VORTEX = 'Vortex & Dimensional',
}

export interface LocationPin {
  id: number;
  name: string;
  coordinates: LatLngExpression;
  category: LocationCategory;
}

export interface DossierSection {
  title: string;
  content: string;
}

export interface LocationFull {
  id: number;
  name: string;
  address: string;
  coordinates: LatLngExpression;
  category: LocationCategory;
  dossier: DossierSection[];
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

export interface Citation {
  uri: string;
  title: string;
}

export interface ChatMessage {
    role: 'user' | 'model';
    text: string;
    citations?: Citation[];
}
