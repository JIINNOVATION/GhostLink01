
import { MOCK_GHOST_DATA, MOCK_ALIEN_DATA } from '../constants';
import type { LocationPin, LocationFull } from '../types';

export type AppTheme = 'ghost' | 'alien';

const getDataForTheme = (theme: AppTheme) => {
  return theme === 'ghost' ? MOCK_GHOST_DATA : MOCK_ALIEN_DATA;
}

// Simulates a network request
const apiCall = <T,>(data: T, delay = 500): Promise<T> =>
  new Promise((resolve) => setTimeout(() => resolve(data), delay));

export const locationService = {
  fetchLocationPins: (theme: AppTheme): Promise<LocationPin[]> => {
    console.log(`Fetching location pins for theme: ${theme}`);
    const data = getDataForTheme(theme);
    return apiCall(data.pins);
  },
  fetchLocationDetails: (id: number, theme: AppTheme): Promise<LocationFull | undefined> => {
    console.log(`Fetching details for location ID: ${id} with theme: ${theme}`);
    const data = getDataForTheme(theme);
    // Direct lookup without faulty fallback to prevent incorrect data display.
    const details = data.details[id];
    return apiCall(details);
  },
};