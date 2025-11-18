
import { useState, useEffect, useCallback } from 'react';
import type { LatLngTuple } from 'leaflet';

interface GeolocationState {
  loading: boolean;
  position: LatLngTuple | null;
  error: GeolocationPositionError | null;
}

export const useGeolocation = () => {
  const [state, setState] = useState<GeolocationState>({
    loading: false,
    position: null,
    error: null,
  });

  const locate = useCallback(() => {
    if (!navigator.geolocation) {
      // Not an error, just not supported
      return;
    }

    setState(prevState => ({ ...prevState, loading: true, error: null }));

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setState({
          loading: false,
          position: [position.coords.latitude, position.coords.longitude],
          error: null,
        });
      },
      (error) => {
        setState({
          loading: false,
          position: null,
          error: error,
        });
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  }, []);
  
  return { ...state, locate };
};
