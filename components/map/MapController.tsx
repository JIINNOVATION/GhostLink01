
import React, { useEffect } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import type { LatLngExpression } from 'leaflet';
import type { LocationPin } from '../../types';
import LocationMarker from './LocationMarker';
import type { AppTheme } from '../../services/locationService';

interface MapControllerProps {
  locations: LocationPin[];
  onMarkerClick: (id: number) => void;
  centerOn?: LatLngExpression | null;
  theme: AppTheme;
}

const MapEventsController: React.FC<{ centerOn: LatLngExpression | null }> = ({ centerOn }) => {
  const map = useMap();

  useEffect(() => {
    if (centerOn) {
      map.flyTo(centerOn, 15, {
        animate: true,
        duration: 1.5,
      });
    }
  }, [centerOn, map]);

  return null;
};

const MapController: React.FC<MapControllerProps> = ({ locations, onMarkerClick, centerOn, theme }) => {
  const initialCenter: LatLngExpression = [39.8283, -98.5795]; // Center of the US

  return (
    <MapContainer center={initialCenter} zoom={4} style={{ height: '100vh', width: '100%' }} zoomControl={false}>
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
      />
      {locations.map((location) => (
        <LocationMarker key={location.id} location={location} onClick={onMarkerClick} theme={theme} />
      ))}
      <MapEventsController centerOn={centerOn} />
    </MapContainer>
  );
};

export default MapController;
