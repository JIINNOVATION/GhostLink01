import React, { useState, useEffect, useCallback } from 'react';
import type { LatLngExpression } from 'leaflet';
import Header from './components/layout/Header';
import MapController from './components/map/MapController';
import FilterPanel from './components/map/FilterPanel';
import LocationDossier from './components/dossier/LocationDossier';
import LoginModal from './components/auth/LoginModal';
import { locationService, AppTheme } from './services/locationService';
import type { LocationPin, LocationFull } from './types';
import { LocationCategory } from './types';
import { useGeolocation } from './hooks/useGeolocation';
import { MOCK_GHOST_DATA, MOCK_ALIEN_DATA } from './constants';
import TheLink from './components/ai/TheLink';

const ghostFilters = {
    [LocationCategory.HAUNTED]: true,
    [LocationCategory.CRIME]: true,
    [LocationCategory.MYSTERY]: true,
    [LocationCategory.USER]: true,
};

const alienFilters = {
    [LocationCategory.ALIEN]: true,
    [LocationCategory.CRYPTID]: true,
    [LocationCategory.VORTEX]: true,
};


const App: React.FC = () => {
  const [theme, setTheme] = useState<AppTheme>('ghost');
  const [pins, setPins] = useState<LocationPin[]>([]);
  const [filteredPins, setFilteredPins] = useState<LocationPin[]>([]);
  const [selectedLocationId, setSelectedLocationId] = useState<number | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const { position: userPosition, locate, loading: isLocating } = useGeolocation();
  const [mapCenter, setMapCenter] = useState<LatLngExpression | null>(null);

  const [filters, setFilters] = useState<Record<string, boolean>>({
    ...ghostFilters,
    ...alienFilters,
  });

  const allLocations: LocationFull[] = [
    ...Object.values(MOCK_GHOST_DATA.details), 
    ...Object.values(MOCK_ALIEN_DATA.details)
  ];

  useEffect(() => {
    document.body.className = `theme-${theme} bg-black text-gray-200`;
  }, [theme]);
  
  useEffect(() => {
    locationService.fetchLocationPins(theme).then(setPins);
    setSelectedLocationId(null); // Close dossier on theme change
  }, [theme]);

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

  const handleLoginStateChange = () => {
    setIsLoggedIn(prev => !prev);
  };
  
  const openLoginModal = () => {
      setIsLoginModalOpen(true);
  };
  
  const handleThemeToggle = () => {
    setTheme(currentTheme => currentTheme === 'ghost' ? 'alien' : 'ghost');
  }

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-black">
      <Header 
        isLoggedIn={isLoggedIn} 
        onLoginClick={openLoginModal} 
        onLogoutClick={handleLoginStateChange} 
        theme={theme}
        onThemeToggle={handleThemeToggle}
      />
      <main className="h-full w-full">
        <MapController 
          locations={filteredPins} 
          onMarkerClick={handleMarkerClick} 
          centerOn={mapCenter}
          theme={theme}
        />
      </main>
      <FilterPanel 
        filters={filters} 
        onFilterChange={handleFilterChange} 
        onGpsCenter={locate}
        isLocating={isLocating}
        theme={theme}
      />
      <LocationDossier 
        locationId={selectedLocationId} 
        onClose={handleDossierClose}
        isLoggedIn={isLoggedIn}
        onLoginRequest={openLoginModal}
        theme={theme}
      />
      <LoginModal 
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLogin={handleLoginStateChange}
      />
      <TheLink allLocations={allLocations} />
    </div>
  );
};

export default App;