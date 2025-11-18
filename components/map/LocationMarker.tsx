
import React from 'react';
import { Marker, Tooltip } from 'react-leaflet';
import { divIcon } from 'leaflet';
import ReactDOMServer from 'react-dom/server';
import type { LocationPin } from '../../types';
import { LocationCategory } from '../../types';
import { GhostIcon, CrimeIcon, MysteryIcon, UserIcon } from '../ui/Icons';

interface LocationMarkerProps {
  location: LocationPin;
  onClick: (id: number) => void;
}

const CategoryIcon = ({ category }: { category: LocationCategory }) => {
  const baseClasses = "w-6 h-6 text-pink-400";
  switch (category) {
    case LocationCategory.HAUNTED:
      return <GhostIcon className={baseClasses} />;
    case LocationCategory.CRIME:
      return <CrimeIcon className={baseClasses} />;
    case LocationCategory.MYSTERY:
      return <MysteryIcon className={baseClasses} />;
    case LocationCategory.USER:
      return <UserIcon className={baseClasses} />;
    default:
      return null;
  }
};

const createCustomIcon = (category: LocationCategory) => {
  const iconMarkup = ReactDOMServer.renderToString(
    <div className="relative flex items-center justify-center">
      <div className="absolute w-10 h-10 bg-pink-500 rounded-full opacity-30 animate-ping"></div>
      <div className="relative w-10 h-10 bg-black border-2 border-pink-500 rounded-full flex items-center justify-center">
        <CategoryIcon category={category} />
      </div>
    </div>
  );

  return divIcon({
    html: iconMarkup,
    className: 'leaflet-div-icon',
    iconSize: [40, 40],
    iconAnchor: [20, 20],
  });
};

const LocationMarker: React.FC<LocationMarkerProps> = ({ location, onClick }) => {
  const customIcon = createCustomIcon(location.category);

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
