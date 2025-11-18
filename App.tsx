
import * as React from 'react';
import type { LatLngExpression } from 'leaflet';
import Header from './components/layout/Header';
import MapController from './components/map/MapController';
import FilterPanel from './components/map/FilterPanel';
import LocationDossier from './components/dossier/LocationDossier';
import { locationService } from './services/locationService';
import type { LocationPin } from './types';
import { LocationCategory } from './types';
import { useGeolocation } from './hooks/useGeolocation';

const App: React.FC = () => {
  const [pins, setPins] = React.useState<LocationPin[]>([]);
  const [filteredPins, setFilteredPins] = React.useState<LocationPin[]>([]);
  const [selectedLocationId, setSelectedLocationId] = React.useState<number | null>(null);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  
  const { position: userPosition, locate, loading: isLocating } = useGeolocation();
  const [mapCenter, setMapCenter] = React.useState<LatLngExpression | null>(null);

  const [filters, setFilters] = React.useState<Record<LocationCategory, boolean>>({
    [LocationCategory.HAUNTED]: true,
    [LocationCategory.CRIME]: true,
    [LocationCategory.MYSTERY]: true,
    [LocationCategory.USER]: true,
  });

  React.useEffect(() => {
    locationService.fetchLocationPins().then(setPins);
  }, []);

  React.useEffect(() => {
    const activeCategories = Object.entries(filters)
      .filter(([, isActive]) => isActive)
      .map(([category]) => category);
    setFilteredPins(pins.filter(pin => activeCategories.includes(pin.category)));
  }, [pins, filters]);

  React.useEffect(() => {
    if (userPosition) {
      setMapCenter(userPosition);
    }
  }, [userPosition]);


  const handleFilterChange = (category: LocationCategory, isChecked: boolean) => {
    setFilters(prev => ({ ...prev, [category]: isChecked }));
  };
  
  const handleMarkerClick = React.useCallback((id: number) => {
    setSelectedLocationId(id);
  }, []);

  const handleDossierClose = React.useCallback(() => {
    setSelectedLocationId(null);
  }, []);

  const handleLoginToggle = () => {
    setIsLoggedIn(prev => !prev);
  };

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-black">
      <Header isLoggedIn={isLoggedIn} onLoginToggle={handleLoginToggle} />
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
    </div>
  );
};

export default App;