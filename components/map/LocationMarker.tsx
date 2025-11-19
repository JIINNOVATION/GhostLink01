
import React from 'react';
import { Marker, Tooltip } from 'react-leaflet';
import { divIcon } from 'leaflet';
import type { LocationPin } from '../../types';
import { LocationCategory } from '../../types';
import type { AppTheme } from '../../services/locationService';

interface LocationMarkerProps {
  location: LocationPin;
  onClick: (id: number) => void;
  theme: AppTheme;
}

const getIconSvgString = (category: LocationCategory, theme: AppTheme): string => {
  const colorClass = theme === 'ghost' ? 'text-pink-400' : 'text-green-400';
  const classes = `w-6 h-6 ${colorClass}`;
  const commonAttributes = `xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${classes}"`;
  
  let paths = '';
  switch (category) {
    case LocationCategory.HAUNTED:
      paths = `<path d="M9 10h.01" /><path d="M15 10h.01" /><path d="M12 2a8 8 0 0 0-8 8v12l3-3 2.5 2.5L12 19l2.5 2.5L17 19l3 3V10a8 8 0 0 0-8-8z" />`;
      break;
    case LocationCategory.CRIME: // Detective Badge
      paths = `<path d="M3.85 8.62a4 4 0 0 1 4.78-4.78l1.06 1.06a1 1 0 0 0 1.41 0l1.06-1.06a4 4 0 0 1 4.78 4.78l-1.06 1.06a1 1 0 0 0 0 1.41l1.06 1.06a4 4 0 0 1-4.78 4.78l-1.06-1.06a1 1 0 0 0-1.41 0l-1.06 1.06a4 4 0 0 1-4.78-4.78l1.06-1.06a1 1 0 0 0 0-1.41z"/>`;
      break;
    case LocationCategory.MYSTERY: // Puzzle Piece
      paths = `<path d="M14 7V4.5a2.5 2.5 0 0 0-5 0V7h-.5a2.5 2.5 0 0 0 0 5H9v2.5a2.5 2.5 0 0 0 5 0V12h.5a2.5 2.5 0 0 0 0-5H14z"/>`;
      break;
    case LocationCategory.USER:
      paths = `<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />`;
      break;
    case LocationCategory.ALIEN:
      paths = `<path d="M12 12c0-3 2-5 2-5s2 2 2 5c0 1.66-1.34 3-3 3s-3-1.34-3-3Z" /><path d="M12 12c0-3-2-5-2-5S8 9 8 12c0 1.66 1.34 3 3 3s3-1.34 3-3Z" /><path d="M12 14v.01" /><path d="M12 2a10 10 0 1 0 10 10" /><path d="M18 8c0 4.42-3.58 8-8 8" />`;
      break;
    case LocationCategory.CRYPTID: // Bigfoot
      paths = `<path d="M13.3 22H11l-2.4-4.8c-.5-1-1.5-2.2-1.5-2.2s-1-1.3-1-3.2c0-2.2 1.3-4.8 1.3-4.8s1.4-2.2 3.3-2.2h.2c2.2 0 3.8 2.2 3.8 2.2s1.3 2.6 1.3 4.8c0 2-1 3.2-1 3.2s-1 1.2-1.5 2.2L13.3 22Z"/><path d="M10.3 11.8c-.3-.2-.5-.5-.6-.8s-.1-.7.1-1c.2-.3.5-.5.8-.6s.7-.1 1 .1"/>`;
      break;
    case LocationCategory.VORTEX: // Spiral
      paths = `<path d="M10.08 3.22c3.4-1.21 7.41.48 8.62 3.89s.48 7.41-3.89 8.62-7.41-.48-8.62-3.89c-1.1-3.1.05-6.55 2.94-8.1"/><path d="M6.6 6.6c-3 3-3 7.8 0 10.8s7.8 3 10.8 0"/>`;
      break;
    default:
      paths = '';
  }
  
  return `<svg ${commonAttributes}>${paths}</svg>`;
};


const createCustomIcon = (category: LocationCategory, theme: AppTheme) => {
  const colorClass = theme === 'ghost' ? 'bg-pink-500' : 'bg-green-500';
  const borderColorClass = theme === 'ghost' ? 'border-pink-500' : 'border-green-500';

  const iconMarkup = `
    <div class="relative flex items-center justify-center">
      <div class="absolute w-10 h-10 ${colorClass} rounded-full opacity-30 animate-ping"></div>
      <div class="relative w-10 h-10 bg-black border-2 ${borderColorClass} rounded-full flex items-center justify-center">
        ${getIconSvgString(category, theme)}
      </div>
    </div>
  `;

  return divIcon({
    html: iconMarkup,
    className: 'leaflet-div-icon',
    iconSize: [40, 40],
    iconAnchor: [20, 20],
  });
};

const LocationMarker: React.FC<LocationMarkerProps> = ({ location, onClick, theme }) => {
  const customIcon = createCustomIcon(location.category, theme);

  return (
    <Marker
      position={location.coordinates}
      icon={customIcon}
      eventHandlers={{
        click: () => onClick(location.id),
      }}
    >
      <Tooltip direction="top" offset={[0, -20]}>
        <span className="font-bold">{location.name}</span>
        <br />
        <span className="text-xs">{location.category}</span>
      </Tooltip>
    </Marker>
  );
};

export default LocationMarker;
