import React, { useState, useEffect } from 'react';
import type { LocationFull } from '../../types';
import { locationService } from '../../services/locationService';
import Spinner from '../ui/Spinner';
import { CloseIcon, GhostIcon, CrimeIcon, MysteryIcon, UserIcon } from '../ui/Icons';
import HistorianChat from './HistorianChat';
import { LocationCategory } from '../../types';
import MediaGalleryModal from './MediaGalleryModal';

interface LocationDossierProps {
  locationId: number | null;
  onClose: () => void;
  isLoggedIn: boolean;
}

const categoryDetails = {
  [LocationCategory.HAUNTED]: { Icon: GhostIcon },
  [LocationCategory.CRIME]: { Icon: CrimeIcon },
  [LocationCategory.MYSTERY]: { Icon: MysteryIcon },
  [LocationCategory.USER]: { Icon: UserIcon },
};

type Tab = 'spirit' | 'crime' | 'history';

const LocationDossier: React.FC<LocationDossierProps> = ({ locationId, onClose, isLoggedIn }) => {
  const [location, setLocation] = useState<LocationFull | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>('spirit');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isMediaModalOpen, setIsMediaModalOpen] = useState(false);
  const [selectedMediaIndex, setSelectedMediaIndex] = useState(0);

  useEffect(() => {
    if (locationId === null) {
      setLocation(null);
      return;
    }

    const fetchDetails = async () => {
      setIsLoading(true);
      const data = await locationService.fetchLocationDetails(locationId);
      if (data) {
        setLocation(data);
        setActiveTab('spirit');
      }
      setIsLoading(false);
    };

    fetchDetails();
  }, [locationId]);

  const handleMediaClick = (index: number) => {
    setSelectedMediaIndex(index);
    setIsMediaModalOpen(true);
  };

  const handleMediaModalClose = () => {
    setIsMediaModalOpen(false);
  };

  if (locationId === null) return null;

  const renderContent = () => {
    if (!location) return null;
    switch (activeTab) {
      case 'spirit': return <p className="text-gray-300 leading-relaxed">{location.dossier.spiritStories}</p>;
      case 'crime': return <p className="text-gray-300 leading-relaxed">{location.dossier.crimeAndPunishment}</p>;
      case 'history': return <p className="text-gray-300 leading-relaxed">{location.dossier.socialHistory}</p>;
      default: return null;
    }
  };

  const CategoryIcon = location ? categoryDetails[location.category].Icon : GhostIcon;

  return (
    <>
      <div className={`absolute top-0 right-0 h-full w-full md:w-1/2 lg:w-1/3 z-[1000] bg-black border-l-2 border-pink-500 shadow-2xl shadow-pink-500/20 transform transition-transform duration-500 ease-in-out ${locationId !== null ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full">
          {isLoading ? (
            <div className="flex items-center justify-center h-full">
              <Spinner size="lg" />
            </div>
          ) : location && (
            <>
              <header className="p-4 border-b border-pink-500/30">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <CategoryIcon className="w-6 h-6 text-pink-400" />
                      <h2 className="text-2xl font-bold text-pink-400">{location.name}</h2>
                    </div>
                    <p className="text-sm text-gray-500">{location.address}</p>
                  </div>
                  <button onClick={onClose} className="p-1 text-gray-400 hover:text-pink-400 transition-colors">
                    <CloseIcon className="w-6 h-6" />
                  </button>
                </div>
              </header>

              <main className="flex-grow overflow-y-auto">
                <div className="p-4">
                  <div className="mb-4">
                    <p className="text-sm font-bold text-pink-400 tracking-wider uppercase mb-2">Evidence Gallery</p>
                    <div className="relative group cursor-pointer" onClick={() => handleMediaClick(0)}>
                      <img 
                        src={location.media[0].url} 
                        alt={location.media[0].caption} 
                        className="w-full h-48 object-cover rounded-lg" 
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-lg">
                        <p className="text-white font-bold">View Gallery</p>
                      </div>
                    </div>

                    {location.media.length > 1 && (
                      <div className="grid grid-cols-4 gap-2 mt-2">
                        {location.media.map((item, index) => (
                          <div 
                            key={index}
                            className="relative group cursor-pointer"
                            onClick={() => handleMediaClick(index)}
                          >
                            <img 
                              src={item.url} 
                              alt={item.caption} 
                              className="w-full h-16 object-cover rounded" 
                            />
                             <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity rounded"></div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {location.warning && <div className="bg-yellow-900/50 border border-yellow-500 text-yellow-300 text-sm rounded-md p-3 mb-4">{location.warning}</div>}
                </div>

                <div className="border-b border-pink-500/30 px-4">
                  <nav className="flex space-x-4">
                    <button onClick={() => setActiveTab('spirit')} className={`py-2 px-1 text-sm font-medium transition-colors ${activeTab === 'spirit' ? 'text-pink-400 border-b-2 border-pink-400' : 'text-gray-400 hover:text-white'}`}>Spirit Stories</button>
                    <button onClick={() => setActiveTab('crime')} className={`py-2 px-1 text-sm font-medium transition-colors ${activeTab === 'crime' ? 'text-pink-400 border-b-2 border-pink-400' : 'text-gray-400 hover:text-white'}`}>Crime & Punishment</button>
                    <button onClick={() => setActiveTab('history')} className={`py-2 px-1 text-sm font-medium transition-colors ${activeTab === 'history' ? 'text-pink-400 border-b-2 border-pink-400' : 'text-gray-400 hover:text-white'}`}>Social History</button>
                  </nav>
                </div>

                <div className="p-4">
                  {renderContent()}
                </div>
                
                <div className="p-4 flex flex-wrap gap-2">
                    {location.tags.map(tag => (
                        <span key={tag} className="bg-pink-900/50 text-pink-300 text-xs font-medium px-2.5 py-1 rounded-full">{tag}</span>
                    ))}
                </div>
              </main>
              
              <footer className="p-4 border-t border-pink-500/30 space-y-3">
                 <button 
                  onClick={() => setIsChatOpen(true)}
                  className="w-full bg-gray-800 text-pink-400 py-3 px-4 rounded-md border border-pink-500/50 hover:bg-gray-700/70 transition-all duration-300 font-bold"
                >
                  Ask the Historian
                </button>
                {isLoggedIn && (
                   <button 
                    className="w-full bg-pink-600/50 text-white py-3 px-4 rounded-md border border-pink-500 hover:bg-pink-500/70 transition-all duration-300 font-bold"
                  >
                    Create Case File
                  </button>
                )}
              </footer>
            </>
          )}
        </div>
      </div>
      {location && isMediaModalOpen && (
        <MediaGalleryModal 
          media={location.media}
          startIndex={selectedMediaIndex}
          onClose={handleMediaModalClose}
        />
      )}
      {location && <HistorianChat key={location.id} isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} location={location} />}
    </>
  );
};

export default LocationDossier;