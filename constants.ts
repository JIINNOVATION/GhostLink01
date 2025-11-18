
import type { LocationPin, LocationFull, User } from './types';
import { LocationCategory } from './types';

export const MOCK_USER: User = {
  id: 'user-123',
  username: 'GhostHunterX',
  avatarUrl: 'https://picsum.photos/seed/user/100/100',
  investigationScore: 1337,
  badges: ['EVP Specialist', 'History Buff'],
};

export const MOCK_LOCATION_PINS: LocationPin[] = [
  { id: 1, name: 'The Winchester Mystery House', coordinates: [37.3184, -121.9513], category: LocationCategory.HAUNTED },
  { id: 2, name: 'Alcatraz Island', coordinates: [37.8270, -122.4230], category: LocationCategory.CRIME },
  { id: 3, name: 'The Villisca Axe Murder House', coordinates: [40.9329, -94.9750], category: LocationCategory.MYSTERY },
  { id: 4, name: 'Eastern State Penitentiary', coordinates: [39.9683, -75.1725], category: LocationCategory.HAUNTED },
  { id: 5, name: 'Lizzie Borden House', coordinates: [41.7006, -71.1565], category: LocationCategory.CRIME },
  { id: 6, name: "Jack the Ripper's London", coordinates: [51.5186, -0.0740], category: LocationCategory.MYSTERY },
  { id: 7, name: 'Old Town Saloon (User Submitted)', coordinates: [34.0522, -118.2437], category: LocationCategory.USER },
];

export const MOCK_LOCATION_DETAILS: Record<number, LocationFull> = {
  1: {
    id: 1,
    name: 'The Winchester Mystery House',
    address: '525 S Winchester Blvd, San Jose, CA 95128',
    coordinates: [37.3184, -121.9513],
    category: LocationCategory.HAUNTED,
    dossier: {
      spiritStories: 'The house is said to be haunted by the ghost of Sarah Winchester and the spirits of those killed by Winchester rifles. Visitors report doors slamming, disembodied voices, and ghostly apparitions wandering the endless maze of hallways.',
      crimeAndPunishment: 'No specific crimes are associated with the house itself, but its construction was funded by the "blood money" from the Winchester Repeating Arms Company, a weapon that played a significant role in the American West.',
      socialHistory: 'Construction began in 1886 and continued, 24 hours a day, until Sarah Winchester\'s death in 1922. The house is an architectural marvel and a monument to one woman\'s obsession and grief, featuring stairways to nowhere and doors that open into walls.',
    },
    media: [
      { type: 'image', url: 'https://picsum.photos/seed/winchester1/600/400', caption: 'Aerial view of the sprawling mansion.' },
      { type: 'image', url: 'https://picsum.photos/seed/winchester2/600/400', caption: 'The infamous Séance Room.' },
    ],
    tags: ['19th Century', 'Gilded Age', 'Spiritualism'],
    warning: 'This is a popular tourist destination. Please respect the property and staff.'
  },
  2: {
    id: 2,
    name: 'Alcatraz Island',
    address: 'Alcatraz Island, San Francisco, CA 94133',
    coordinates: [37.8270, -122.4230],
    category: LocationCategory.CRIME,
    dossier: {
      spiritStories: 'Known as "The Rock," Alcatraz is considered one of America\'s most haunted prisons. Former inmates and guards have reported hearing screams, cell doors clanging, and the phantom sound of a banjo from Al Capone\'s old cell.',
      crimeAndPunishment: 'Housed some of the most notorious criminals in American history, including Al Capone, "Machine Gun" Kelly, and Robert Stroud, the "Birdman of Alcatraz." The prison was designed to be escape-proof, though the 1962 escape by Frank Morris and the Anglin brothers remains an enduring mystery.',
      socialHistory: 'Before becoming a federal prison in 1934, Alcatraz was a military fort. It operated as a prison until 1963. The harsh conditions and psychological isolation were legendary, making it the ultimate punishment in the U.S. justice system.',
    },
    media: [
      { type: 'image', url: 'https://picsum.photos/seed/alcatraz1/600/400', caption: 'View of the prison from the bay.' },
      { type: 'image', url: 'https://picsum.photos/seed/alcatraz2/600/400', caption: 'A typical cell block.' },
    ],
    tags: ['20th Century', 'Prohibition', 'Great Depression'],
  },
};
