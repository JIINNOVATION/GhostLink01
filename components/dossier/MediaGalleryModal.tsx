import React, { useState, useEffect, useCallback } from 'react';
import { CloseIcon, ChevronLeftIcon, ChevronRightIcon } from '../ui/Icons';
import Spinner from '../ui/Spinner';
import type { LocationFull } from '../../types';

type MediaItem = LocationFull['media'][0];

interface MediaGalleryModalProps {
  media: MediaItem[];
  startIndex: number;
  onClose: () => void;
}

const MediaGalleryModal: React.FC<MediaGalleryModalProps> = ({ media, startIndex, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(startIndex);
  const [isLoading, setIsLoading] = useState(true);

  const goToPrevious = useCallback(() => {
    setIsLoading(true);
    const isFirst = currentIndex === 0;
    const newIndex = isFirst ? media.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  }, [currentIndex, media.length]);

  const goToNext = useCallback(() => {
    setIsLoading(true);
    const isLast = currentIndex === media.length - 1;
    const newIndex = isLast ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  }, [currentIndex, media.length]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') goToPrevious();
      if (e.key === 'ArrowRight') goToNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, goToPrevious, goToNext]);

  const currentItem = media[currentIndex];

  return (
    <div
      className="fixed inset-0 bg-black/90 flex flex-col items-center justify-center z-[1002]"
      onClick={onClose}
    >
      <button
        className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors z-20"
        onClick={onClose}
        aria-label="Close media gallery"
      >
        <CloseIcon className="w-8 h-8" />
      </button>

      <div className="relative w-full h-full flex items-center justify-center p-4 md:p-12" onClick={e => e.stopPropagation()}>
        {media.length > 1 && (
            <>
                <button
                    className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white/70 hover:text-white p-2 rounded-full transition-colors z-20"
                    onClick={goToPrevious}
                    aria-label="Previous image"
                >
                    <ChevronLeftIcon className="w-8 h-8" />
                </button>
                <button
                    className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white/70 hover:text-white p-2 rounded-full transition-colors z-20"
                    onClick={goToNext}
                    aria-label="Next image"
                >
                    <ChevronRightIcon className="w-8 h-8" />
                </button>
            </>
        )}

        <div className="relative flex flex-col items-center justify-center max-w-screen-lg w-full max-h-full">
          <div className="flex-grow flex items-center justify-center w-full min-h-0">
             {isLoading && <Spinner size="lg" />}
             {currentItem.type === 'image' && (
                <img
                    key={currentItem.url}
                    src={currentItem.url}
                    alt={currentItem.caption}
                    className={`object-contain max-w-full max-h-full transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
                    onLoad={() => setIsLoading(false)}
                />
             )}
          </div>
          <div className="flex-shrink-0 w-full text-center p-4 bg-gradient-to-t from-black/80 to-transparent">
            <p className="text-white text-lg">{currentItem.caption}</p>
            <p className="text-gray-400 text-sm">{currentIndex + 1} / {media.length}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MediaGalleryModal;