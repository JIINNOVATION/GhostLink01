import React, { useState } from 'react';
import type { LocationFull } from '../../types';
import { BrainCircuitIcon } from '../ui/Icons';
import TheLinkModal from './TheLinkModal';

interface TheLinkProps {
  allLocations: LocationFull[];
}

const TheLink: React.FC<TheLinkProps> = ({ allLocations }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-6 right-6 z-[1001] w-16 h-16 bg-black border-2 border-theme-primary rounded-full shadow-2xl flex items-center justify-center group transition-all duration-300 hover:scale-110"
        style={{
          boxShadow: '0 0 25px var(--theme-primary), 0 0 10px var(--theme-primary) inset',
        }}
        title="Ask The Link"
      >
        <BrainCircuitIcon className="w-8 h-8 text-theme-primary transition-transform duration-300 group-hover:rotate-12" />
      </button>

      <TheLinkModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        allLocations={allLocations}
      />
    </>
  );
};

export default TheLink;
