
import React from 'react';
import { LocationCategory } from '../../types';
import { GpsIcon, GhostIcon, CrimeIcon, MysteryIcon, UserIcon } from '../ui/Icons';

interface FilterPanelProps {
  filters: Record<LocationCategory, boolean>;
  onFilterChange: (category: LocationCategory, isChecked: boolean) => void;
  onGpsCenter: () => void;
  isLocating: boolean;
}

const categoryDetails = {
  [LocationCategory.HAUNTED]: { Icon: GhostIcon, color: 'text-pink-400' },
  [LocationCategory.CRIME]: { Icon: CrimeIcon, color: 'text-pink-400' },
  [LocationCategory.MYSTERY]: { Icon: MysteryIcon, color: 'text-pink-400' },
  [LocationCategory.USER]: { Icon: UserIcon, color: 'text-pink-400' },
};

const FilterPanel: React.FC<FilterPanelProps> = ({ filters, onFilterChange, onGpsCenter, isLocating }) => {
  return (
    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 sm:left-4 sm:translate-x-0 z-[1000] p-3 bg-black/80 border border-pink-500/30 rounded-lg shadow-2xl shadow-pink-500/10 backdrop-blur-sm">
      <div className="flex items-center space-x-2 sm:space-x-4">
        {Object.values(LocationCategory).map((category) => {
          const { Icon, color } = categoryDetails[category];
          const isChecked = filters[category];
          return (
            <label key={category} className="flex items-center space-x-2 cursor-pointer group" title={category}>
              <input
                type="checkbox"
                checked={isChecked}
                onChange={(e) => onFilterChange(category, e.target.checked)}
                className="hidden"
              />
              <div className={`p-2 rounded-full transition-all duration-300 ${isChecked ? 'bg-pink-500/30' : 'bg-gray-800/50 group-hover:bg-gray-700/50'}`}>
                <Icon className={`w-5 h-5 ${color} ${isChecked ? '' : 'opacity-60'}`} />
              </div>
            </label>
          );
        })}
        <div className="w-px h-8 bg-pink-500/30"></div>
        <button
          onClick={onGpsCenter}
          disabled={isLocating}
          title="Center on my location"
          className="p-2 rounded-full transition-all duration-300 bg-gray-800/50 hover:bg-gray-700/50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <GpsIcon className={`w-5 h-5 text-pink-400 ${isLocating ? 'animate-pulse' : ''}`} />
        </button>
      </div>
    </div>
  );
};

export default FilterPanel;
