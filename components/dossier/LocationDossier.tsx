
import React, { useState, useEffect, useRef } from 'react';
import type { LocationFull, DossierSection } from '../../types';
import { locationService, AppTheme } from '../../services/locationService';
import Spinner from '../ui/Spinner';
import { CloseIcon, GhostIcon, CrimeIcon, MysteryIcon, UserIcon, AlienIcon, CryptidIcon, VortexIcon, ChevronLeftIcon, ChevronRightIcon, PlayIcon, StopIcon, UploadIcon } from '../ui/Icons';
import HistorianChat from './HistorianChat';
import { LocationCategory } from '../../types';
import ImageGalleryItem from './ImageGalleryItem';
import { generateSpeech } from '../../services/geminiService';
import { decode, decodeAudioData } from '../../utils/audioUtils';
import UploadPhotoModal from './UploadPhotoModal';
import CreateCaseFileModal from './CreateCaseFileModal';


interface LocationDossierProps {
  locationId: number | null;
  onClose: () => void;
  isLoggedIn: boolean;
  onLoginRequest: () => void;
  theme: AppTheme;
}

const allCategoryDetails = {
  [LocationCategory.HAUNTED]: { Icon: GhostIcon },
  [LocationCategory.CRIME]: { Icon: CrimeIcon },
  [LocationCategory.MYSTERY]: { Icon: MysteryIcon },
  [LocationCategory.USER]: { Icon: UserIcon },
  [LocationCategory.ALIEN]: { Icon: AlienIcon },
  [LocationCategory.CRYPTID]: { Icon: CryptidIcon },
  [LocationCategory.VORTEX]: { Icon: VortexIcon },
};

const LocationDossier: React.FC<LocationDossierProps> = ({ locationId, onClose, isLoggedIn, onLoginRequest, theme }) => {
  const [location, setLocation] = useState<LocationFull | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTabTitle, setActiveTabTitle] = useState<string>('');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const [audioState, setAudioState] = useState<'idle' | 'generating' | 'playing'>('idle');
  const audioContextRef = useRef<AudioContext | null>(null);
  const audioSourceRef = useRef<AudioBufferSourceNode | null>(null);

  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isCaseFileModalOpen, setIsCaseFileModalOpen] = useState(false);
  const [photoToUpload, setPhotoToUpload] = useState<{ file: File, previewUrl: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const stopAudio = () => {
    if (audioSourceRef.current) {
      audioSourceRef.current.onended = null;
      audioSourceRef.current.stop();
      audioSourceRef.current.disconnect();
      audioSourceRef.current = null;
    }
    setAudioState('idle');
  };

  useEffect(() => {
    if (locationId === null) {
      setLocation(null);
      return;
    }

    const fetchDetails = async () => {
      setIsLoading(true);
      const data = await locationService.fetchLocationDetails(locationId, theme);
      if (data) {
        setLocation(data);
        setActiveTabTitle(data.dossier[0]?.title || '');
        setCurrentImageIndex(0);
      }
      setIsLoading(false);
    };

    fetchDetails();
  }, [locationId, theme]);

  useEffect(() => {
    return () => {
      stopAudio();
      if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
        audioContextRef.current.close();
      }
    };
  }, []);

  useEffect(() => {
    stopAudio();
  }, [locationId, activeTabTitle]);

  const handlePlayAudio = async () => {
    if (audioState === 'playing') {
      stopAudio();
      return;
    }
    if (audioState === 'generating' || !location) return;

    setAudioState('generating');
    const activeSection = location.dossier.find(s => s.title === activeTabTitle);
    const textToSpeak = activeSection?.content || '';

    const base64Audio = await generateSpeech(textToSpeak);
    if (!base64Audio) {
      setAudioState('idle');
      console.error("Failed to generate audio.");
      return;
    }

    try {
      if (!audioContextRef.current || audioContextRef.current.state === 'closed') {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      }
      const audioContext = audioContextRef.current;
      const audioBuffer = await decodeAudioData(decode(base64Audio), audioContext, 24000, 1);
      stopAudio();
      const source = audioContext.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(audioContext.destination);
      source.start();
      source.onended = () => {
        if (audioSourceRef.current === source) {
          setAudioState('idle');
          audioSourceRef.current = null;
        }
      };
      audioSourceRef.current = source;
      setAudioState('playing');
    } catch (error) {
      console.error("Error playing audio:", error);
      setAudioState('idle');
    }
  };

  const handleNextImage = () => {
    if (!location) return;
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % location.media.length);
  };

  const handlePrevImage = () => {
    if (!location) return;
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + location.media.length) % location.media.length);
  };

  const handleUploadClick = () => {
    if (isLoggedIn) {
      fileInputRef.current?.click();
    } else {
      onLoginRequest();
    }
  };

  const handleCreateCaseFileClick = () => {
    if (isLoggedIn) {
      setIsCaseFileModalOpen(true);
    } else {
      onLoginRequest();
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setPhotoToUpload({ file, previewUrl });
      setIsUploadModalOpen(true);
    }
    if(event.target) event.target.value = "";
  };

  const handleUploadModalClose = () => {
    if (photoToUpload) URL.revokeObjectURL(photoToUpload.previewUrl);
    setIsUploadModalOpen(false);
    setPhotoToUpload(null);
  };

  const handlePhotoSubmit = async (caption: string) => {
    if (!photoToUpload || !location) return;
    console.log(`Submitting photo for ${location.name}:`, { fileName: photoToUpload.file.name, caption: caption });
    await new Promise(resolve => setTimeout(resolve, 1500));
  };

  const handleCaseFileSubmit = async (title: string, description: string) => {
    if (!location) return;
    console.log(`Saving case file for ${location.name}:`, { title, description });
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
  };

  const renderContent = () => {
    if (!location) return null;
    const activeSection = location.dossier.find(s => s.title === activeTabTitle);
    return <p className="text-gray-300 leading-relaxed">{activeSection?.content}</p>;
  };

  const CategoryIcon = location ? allCategoryDetails[location.category].Icon : GhostIcon;
  const currentMediaItem = location?.media[currentImageIndex];

  return (
    <>
      <input type="file" ref={fileInputRef} onChange={handleFileSelect} className="hidden" accept="image/png, image/jpeg" />
      <div className={`absolute top-0 right-0 h-full w-full md:w-1/2 lg:w-1/3 z-[1000] bg-black border-l-2 border-theme-primary shadow-2xl transform transition-transform duration-500 ease-in-out ${locationId !== null ? 'translate-x-0' : 'translate-x-full'}`} style={{ boxShadow: '-10px 0 30px rgba(var(--theme-primary-rgb), 0.2)' }}>
        <div className="flex flex-col h-full">
          {isLoading ? (
            <div className="flex items-center justify-center h-full"><Spinner size="lg" /></div>
          ) : location && (
            <>
              <div className="p-4 border-b border-theme-primary/30">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <CategoryIcon className="w-6 h-6 text-theme-primary" />
                      <h2 className="text-2xl font-bold text-theme-primary">{location.name}</h2>
                    </div>
                    <p className="text-sm text-gray-500">{location.address}</p>
                  </div>
                  <button onClick={onClose} className="p-1 text-gray-400 hover:text-theme-primary transition-colors"><CloseIcon className="w-6 h-6" /></button>
                </div>
              </div>

              <div className="flex-grow overflow-y-auto">
                <div className="py-4 px-4">
                  <h3 className="text-lg font-semibold text-theme-primary mb-3 tracking-wider">Visual Evidence</h3>
                  <div className="relative group">
                    {currentMediaItem && <ImageGalleryItem key={`${location.id}-${currentImageIndex}`} mediaItem={currentMediaItem} locationName={location.name} />}
                    {location.media.length > 1 && (
                      <>
                        <button onClick={handlePrevImage} className="absolute top-1/2 -translate-y-1/2 left-2 bg-black/50 p-1 rounded-full text-white hover:bg-black/80 transition-opacity opacity-0 group-hover:opacity-100"><ChevronLeftIcon className="w-6 h-6" /></button>
                        <button onClick={handleNextImage} className="absolute top-1/2 -translate-y-1/2 right-2 bg-black/50 p-1 rounded-full text-white hover:bg-black/80 transition-opacity opacity-0 group-hover:opacity-100"><ChevronRightIcon className="w-6 h-6" /></button>
                        <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-md">{currentImageIndex + 1} / {location.media.length}</div>
                      </>
                    )}
                  </div>
                </div>

                {location.warning && <div className="bg-yellow-900/50 border border-yellow-500 text-yellow-300 text-sm rounded-md p-3 mb-4 mx-4">{location.warning}</div>}

                <div className="border-b border-theme-primary/30 px-4">
                  <div className="flex justify-between items-center">
                    <nav className="flex space-x-1 sm:space-x-4 overflow-x-auto">
                      {location.dossier.map(section => (
                        <button key={section.title} onClick={() => setActiveTabTitle(section.title)} className={`py-2 px-1 text-xs sm:text-sm font-medium transition-colors whitespace-nowrap ${activeTabTitle === section.title ? 'text-theme-primary border-b-2 border-theme-primary' : 'text-gray-400 hover:text-white'}`}>{section.title}</button>
                      ))}
                    </nav>
                    <button onClick={handlePlayAudio} disabled={audioState === 'generating'} className="p-2 rounded-full text-theme-primary hover:bg-theme-primary/20 disabled:opacity-50 disabled:cursor-wait transition-colors" title={audioState === 'playing' ? 'Stop Narration' : 'Listen to Narration'}>
                      {audioState === 'generating' && <Spinner size="sm" />}
                      {audioState === 'playing' && <StopIcon className="w-5 h-5" />}
                      {audioState === 'idle' && <PlayIcon className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <div className="p-4">{renderContent()}</div>
                <div className="p-4 flex flex-wrap gap-2">
                  {location.tags.map(tag => <span key={tag} className="bg-theme-primary/20 text-theme-primary text-xs font-medium px-2.5 py-1 rounded-full">{tag}</span>)}
                </div>
              </div>
              
              <div className="p-4 border-t border-theme-primary/30 space-y-3">
                <button onClick={() => setIsChatOpen(true)} className="w-full bg-gray-800 text-theme-primary py-3 px-4 rounded-md border border-theme-primary/50 hover:bg-gray-700/70 transition-all duration-300 font-bold">Ask the Historian</button>
                <div className="grid grid-cols-2 gap-3">
                  <button onClick={handleUploadClick} className="w-full bg-gray-800 text-theme-primary py-3 px-4 rounded-md border border-theme-primary/50 hover:bg-gray-700/70 transition-all duration-300 font-bold flex items-center justify-center gap-2"><UploadIcon className="w-5 h-5" /><span>Upload Photo</span></button>
                  <button onClick={handleCreateCaseFileClick} className="w-full bg-theme-primary/50 text-white py-3 px-4 rounded-md border border-theme-primary hover:bg-theme-primary/70 transition-all duration-300 font-bold">Create Case File</button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      {location && <CreateCaseFileModal isOpen={isCaseFileModalOpen} onClose={() => setIsCaseFileModalOpen(false)} onSubmit={handleCaseFileSubmit} locationName={location.name} />}
      {location && photoToUpload && <UploadPhotoModal isOpen={isUploadModalOpen} onClose={handleUploadModalClose} onSubmit={handlePhotoSubmit} photoPreviewUrl={photoToUpload.previewUrl} locationName={location.name} />}
      {location && <HistorianChat isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} location={location} />}
    </>
  );
};

export default LocationDossier;
