import React, { useState, useEffect, useCallback } from 'react';
import type { LatLngExpression } from 'leaflet';
import Header from './components/layout/Header';
import MapController from './components/map/MapController';
import FilterPanel from './components/map/FilterPanel';
import LocationDossier from './components/dossier/LocationDossier';
import { locationService } from './services/locationService';
import type { LocationPin } from './types';
import { LocationCategory } from './types';
import { useGeolocation } from './hooks/useGeolocation';
import MainHistorianChat from './components/ai/MainHistorianChat';

const App: React.FC = () => {
  const [pins, setPins] = useState<LocationPin[]>([]);
  const [filteredPins, setFilteredPins] = useState<LocationPin[]>([]);
  const [selectedLocationId, setSelectedLocationId] = useState<number | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMainHistorianOpen, setIsMainHistorianOpen] = useState(false);
  
  const { position: userPosition, locate, loading: isLocating } = useGeolocation();
  const [mapCenter, setMapCenter] = useState<LatLngExpression | null>(null);

  const [filters, setFilters] = useState<Record<LocationCategory, boolean>>({
    [LocationCategory.HAUNTED]: true,
    [LocationCategory.CRIME]: true,
    [LocationCategory.MYSTERY]: true,
    [LocationCategory.USER]: true,
  });

  useEffect(() => {
    locationService.fetchLocationPins().then(setPins);
  }, []);

  useEffect(() => {
    const activeCategories = Object.entries(filters)
      .filter(([, isActive]) => isActive)
      .map(([category]) => category);
    setFilteredPins(pins.filter(pin => activeCategories.includes(pin.category)));
  }, [pins, filters]);

  useEffect(() => {
    if (userPosition) {
      setMapCenter(userPosition);
    }
  }, [userPosition]);


  const handleFilterChange = (category: LocationCategory, isChecked: boolean) => {
    setFilters(prev => ({ ...prev, [category]: isChecked }));
  };
  
  const handleMarkerClick = useCallback((id: number) => {
    setSelectedLocationId(id);
  }, []);

  const handleDossierClose = useCallback(() => {
    setSelectedLocationId(null);
  }, []);

  const handleLoginToggle = () => {
    setIsLoggedIn(prev => !prev);
  };

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-black">
      <Header 
        isLoggedIn={isLoggedIn} 
        onLoginToggle={handleLoginToggle}
        onOpenMainHistorian={() => setIsMainHistorianOpen(true)}
      />
      <main className="h-full w-full">
        <MapController 
          locations={filteredPins} 
          onMarkerClick={handleMarkerClick} 
          centerOn={mapCenter}
        />
      </main>
      <FilterPanel 
        filters={filters} 
        onFilterChange={handleFilterChange} 
        onGpsCenter={locate}
        isLocating={isLocating}
      />
      <LocationDossier 
        locationId={selectedLocationId} 
        onClose={handleDossierClose}
        isLoggedIn={isLoggedIn}
      />
      <MainHistorianChat
        isOpen={isMainHistorianOpen}
        onClose={() => setIsMainHistorianOpen(false)}
      />
    </div>
  );
};

export default App;