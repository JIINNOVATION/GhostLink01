
import React from 'react';
import { LocationCategory } from '../../types';
import { GpsIcon, GhostIcon, CrimeIcon, MysteryIcon, UserIcon, AlienIcon, CryptidIcon, VortexIcon } from '../ui/Icons';
import type { AppTheme } from '../../services/locationService';

interface FilterPanelProps {
  filters: Record<LocationCategory, boolean>;
  onFilterChange: (category: LocationCategory, isChecked: boolean) => void;
  onGpsCenter: () => void;
  isLocating: boolean;
  theme: AppTheme;
}

const ghostCategories = [LocationCategory.HAUNTED, LocationCategory.CRIME, LocationCategory.MYSTERY, LocationCategory.USER];
const alienCategories = [LocationCategory.ALIEN, LocationCategory.CRYPTID, LocationCategory.VORTEX];

const allCategoryDetails = {
  [LocationCategory.HAUNTED]: { Icon: GhostIcon },
  [LocationCategory.CRIME]: { Icon: CrimeIcon },
  [LocationCategory.MYSTERY]: { Icon: MysteryIcon },
  [LocationCategory.USER]: { Icon: UserIcon },
  [LocationCategory.ALIEN]: { Icon: AlienIcon },
  [LocationCategory.CRYPTID]: { Icon: CryptidIcon },
  [LocationCategory.VORTEX]: { Icon: VortexIcon },
};

const FilterPanel: React.FC<FilterPanelProps> = ({ filters, onFilterChange, onGpsCenter, isLocating, theme }) => {
  const categoriesToShow = theme === 'ghost' ? ghostCategories : alienCategories;

  return (
    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 sm:left-4 sm:translate-x-0 z-[1000] p-3 bg-black/80 border border-theme-primary/30 rounded-lg shadow-2xl backdrop-blur-sm" style={{ boxShadow: '0 0 20px 0 rgba(var(--theme-primary-rgb), 0.1)' }}>
      <div className="flex items-center space-x-2 sm:space-x-4">
        {categoriesToShow.map((category) => {
          const { Icon } = allCategoryDetails[category];
          const isChecked = filters[category];
          return (
            <label key={category} className="flex items-center space-x-2 cursor-pointer group" title={category}>
              <input
                type="checkbox"
                checked={isChecked}
                onChange={(e) => onFilterChange(category, e.target.checked)}
                className="hidden"
              />
              <div className={`p-2 rounded-full transition-all duration-300 ${isChecked ? 'bg-theme-primary/30' : 'bg-gray-800/50 group-hover:bg-gray-700/50'}`}>
                <Icon className={`w-5 h-5 text-theme-primary ${isChecked ? '' : 'opacity-60'}`} />
              </div>
            </label>
          );
        })}
        <div className="w-px h-8 bg-theme-primary/30"></div>
        <button
          onClick={onGpsCenter}
          disabled={isLocating}
          title="Center on my location"
          className="p-2 rounded-full transition-all duration-300 bg-gray-800/50 hover:bg-gray-700/50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <GpsIcon className={`w-5 h-5 text-theme-primary ${isLocating ? 'animate-pulse' : ''}`} />
        </button>
      </div>
    </div>
  );
};

export default FilterPanel;
