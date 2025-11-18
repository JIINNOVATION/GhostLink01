
import { MOCK_LOCATION_PINS, MOCK_LOCATION_DETAILS } from '../constants';
import type { LocationPin, LocationFull } from '../types';

// Simulates a network request
const apiCall = <T,>(data: T, delay = 500): Promise<T> =>
  new Promise((resolve) => setTimeout(() => resolve(data), delay));

export const locationService = {
  fetchLocationPins: (): Promise<LocationPin[]> => {
    console.log('Fetching location pins...');
    return apiCall(MOCK_LOCATION_PINS);
  },
  fetchLocationDetails: (id: number): Promise<LocationFull | undefined> => {
    console.log(`Fetching details for location ID: ${id}`);
    const details = MOCK_LOCATION_DETAILS[id] ?? MOCK_LOCATION_DETAILS[1]; // fallback for demo
    return apiCall(details);
  },
};
